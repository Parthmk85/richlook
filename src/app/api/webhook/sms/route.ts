import { NextRequest, NextResponse } from 'next/server';

// ✅ Webhook URL: https://richlook18.in/api/webhook/sms
// SMS Forwarder App → POST અહીં → Payment detect → payments store

// In-memory store (Vercel serverless - resets on cold start, but works for notifications)
// For persistent storage, MongoDB add કરી શકાય
const payments: PaymentRecord[] = [];

export interface PaymentRecord {
    id: string;
    timestamp: string;
    bank: string;
    sender: string;
    amount: number;
    utr: string;
    account: string;
    smsText: string;
    status: 'payment_received';
}

// ─── Payment Patterns (SBI, IDBI, HDFC, etc.) ─────────────────────────────────
const PAYMENT_PATTERNS = [
    /credited\s+by\s+(?:Rs\.?|INR)\s*([\d,]+\.?\d*)/i,
    /credited\s+for\s+(?:Rs\.?|INR)\s*([\d,]+\.?\d*)/i, // IDBI style
    /(?:Rs\.?|INR)\s*([\d,]+\.?\d*)\s+credited/i,
    /(?:Rs\.?|INR)\s*([\d,]+\.?\d*)\s+is\s+received/i,
    /received.*?(?:Rs\.?|INR)\s*([\d,]+\.?\d*)/i,
    /credited.*?(?:Rs\.?|INR)\s*([\d,]+\.?\d*)/i,
];

const UTR_PATTERNS = [
    /upi\s+ref\s+no\s*[:\.]?\s*(\d{12,})/i,
    /upi\s+ref[:\s#]*(\d{12,})/i,
    /ref\s+no\s*[:\.]?\s*(\d{12,})/i,
    /utr[:\s#]*([a-z0-9]{12,22})/i,
];

const BANK_VPA_MAP: Record<string, string> = {
    'SBI': 'SBI',
    'IDBI': 'IDBI',
    'HDFC': 'HDFC',
    'ICICI': 'ICICI',
    'AXIS': 'AXIS',
    'KOTAK': 'KOTAK',
    'BOB': 'BOB',
    'PNB': 'PNB'
};

function detectBank(sender: string, body: string): string {
    const text = (sender + " " + body).toUpperCase();
    for (const [key, val] of Object.entries(BANK_VPA_MAP)) {
        if (text.includes(key)) return val;
    }
    return 'OTHER';
}

function isPaymentSMS(sms: string): boolean {
    const lower = sms.toLowerCase();
    return ['credited', 'received', 'upi ref', 'upi ref no', 'txn'].some(k => lower.includes(k));
}

function extractAmount(sms: string): number | null {
    for (const pattern of PAYMENT_PATTERNS) {
        const match = sms.match(pattern);
        if (match?.[1]) {
            const amount = parseFloat(match[1].replace(/,/g, ''));
            if (!isNaN(amount) && amount > 0) return amount;
        }
    }
    return null;
}

function extractUTR(sms: string): string {
    for (const pattern of UTR_PATTERNS) {
        const match = sms.match(pattern);
        if (match?.[1]) return match[1].toUpperCase();
    }
    return 'N/A';
}

function extractAccount(sms: string): string {
    // Matches: A/c XXXX1234 or A/c NN66888
    const match = sms.match(/[Aa]\/c\s+([A-Za-z0-9]*\d{3,})/i);
    return match ? `...${match[1].slice(-4)}` : 'N/A';
}

// ─── POST: SMS Forwarder → Webhook ────────────────────────────────────────────
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const smsText = body.sms || body.message || body.body || body.text || '';
        const sender = body.from || body.sender || body.address || 'UNKNOWN';

        console.log('📱 SMS from:', sender, '| Text:', smsText);

        if (!smsText) {
            return NextResponse.json({ success: false, error: 'No SMS text' }, { status: 400 });
        }

        // 🚨 IMPORTANT: Have temporarily disabled strict checks so YOU can see ALL SMS
        // This means ANY SMS sent to this webhook will show up in Admin Panel

        // Try to extract amount/UTR if possible, but don't fail if not found
        const amount = extractAmount(smsText) || 0;
        const utr = extractUTR(smsText);
        const bank = detectBank(sender, smsText);

        // ✅ Store EVERY SMS for now
        const record: PaymentRecord = {
            id: `SMS_${Date.now()}`,
            timestamp: new Date().toISOString(),
            bank: bank === 'OTHER' ? 'Unknown' : bank,
            sender,
            amount: amount, // will be 0 if not a payment
            utr: utr,
            account: extractAccount(smsText),
            smsText,
            status: 'payment_received', // labeling all as received for display
        };

        payments.unshift(record); // newest first
        if (payments.length > 50) payments.pop(); // max 50 records

        console.log('✅ Payment stored:', record);

        return NextResponse.json({
            success: true,
            action: 'payment_stored',
            data: record,
        });

    } catch (error) {
        console.error('❌ Webhook Error:', error);
        return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
    }
}

// ─── GET: Admin panel poll કરે - નવા payments check ───────────────────────────
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const test = searchParams.get('test');

    // Test mode - fake payment inject
    if (test === '1') {
        const fakePayment: PaymentRecord = {
            id: `PAY_TEST_${Date.now()}`,
            timestamp: new Date().toISOString(),
            bank: 'SBI',
            sender: 'SBIUPI',
            amount: 500,
            utr: 'SBIUPI123456789012',
            account: 'XXXX1234',
            smsText: 'Your A/c XXXX1234 is credited by Rs.500.00 by UPI. UPI Ref No SBIUPI123456789012. -SBI',
            status: 'payment_received',
        };
        payments.unshift(fakePayment);
        return NextResponse.json({ success: true, action: 'test_payment_added', data: fakePayment });
    }

    // Return all stored payments for admin panel
    return NextResponse.json({
        success: true,
        count: payments.length,
        payments: payments,
    });
}
