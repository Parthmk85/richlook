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

// ─── SBI SMS Patterns ─────────────────────────────────────────────────────────
const SBI_PATTERNS = [
    /credited\s+by\s+rs\.?\s*([\d,]+\.?\d*)/i,
    /rs\.?\s*([\d,]+\.?\d*)\s+credited/i,
    /rs\.?\s*([\d,]+\.?\d*)\s+is\s+received/i,
    /received.*?rs\.?\s*([\d,]+\.?\d*)/i,
    /credited.*?rs\.?\s*([\d,]+\.?\d*)/i,
];

const SBI_UTR_PATTERNS = [
    /upi\s+ref\s+no\s*[:\.]?\s*(\d{12,})/i,
    /upi\s+ref[:\s#]*(\d{12,})/i,
    /ref\s+no\s*[:\.]?\s*(\d{12,})/i,
    /utr[:\s#]*([a-z0-9]{12,22})/i,
];

const SBI_SENDERS = ['SBIUPI', 'SBIINB', 'SBIPSG', 'SBI', 'SBIALRT', 'SBIBNK'];

function isSBISender(sender: string): boolean {
    return SBI_SENDERS.some(s => sender.toUpperCase().includes(s));
}

function isPaymentSMS(sms: string): boolean {
    const lower = sms.toLowerCase();
    return ['credited', 'received', 'upi ref', 'upi ref no'].some(k => lower.includes(k));
}

function extractAmount(sms: string): number | null {
    for (const pattern of SBI_PATTERNS) {
        const match = sms.match(pattern);
        if (match?.[1]) {
            const amount = parseFloat(match[1].replace(/,/g, ''));
            if (!isNaN(amount) && amount > 0) return amount;
        }
    }
    return null;
}

function extractUTR(sms: string): string {
    for (const pattern of SBI_UTR_PATTERNS) {
        const match = sms.match(pattern);
        if (match?.[1]) return match[1].toUpperCase();
    }
    return 'N/A';
}

function extractAccount(sms: string): string {
    const match = sms.match(/a\/c\s+[xX*]+(\d{4})/i);
    return match ? `XXXX${match[1]}` : 'N/A';
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

        if (!isPaymentSMS(smsText)) {
            return NextResponse.json({ success: true, action: 'ignored', reason: 'Not a payment SMS' });
        }

        const amount = extractAmount(smsText);
        if (!amount) {
            return NextResponse.json({ success: true, action: 'ignored', reason: 'Amount not found' });
        }

        // ✅ Payment confirmed - store it
        const record: PaymentRecord = {
            id: `PAY_${Date.now()}`,
            timestamp: new Date().toISOString(),
            bank: isSBISender(sender) ? 'SBI' : 'OTHER',
            sender,
            amount,
            utr: extractUTR(smsText),
            account: extractAccount(smsText),
            smsText,
            status: 'payment_received',
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
