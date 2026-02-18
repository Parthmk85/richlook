'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, CheckCircle, XCircle, Lock, LogOut, Bell, BellRing, IndianRupee, RefreshCw } from 'lucide-react';
import Link from 'next/link';

interface Booking {
    id: string;
    name: string;
    phone: string;
    service: string;
    date: string;
    time: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    paymentStatus: string;
    paymentId?: string;
    createdAt: string;
}

interface PaymentAlert {
    id: string;
    timestamp: string;
    bank: string;
    amount: number;
    utr: string;
    account: string;
    smsText: string;
}

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Payment Alerts state
    const [payments, setPayments] = useState<PaymentAlert[]>([]);
    const [lastChecked, setLastChecked] = useState<string>('');
    const [newPaymentCount, setNewPaymentCount] = useState(0);
    const [isPolling, setIsPolling] = useState(false);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('bookings') : null;
        if (stored) setBookings(JSON.parse(stored));

        const auth = typeof window !== 'undefined' ? sessionStorage.getItem('isAdminAuth') : null;
        if (auth === 'true') setIsAuthenticated(true);

        setIsLoaded(true);
    }, []);

    // ─── Poll for new payments every 15 seconds ──────────────────────────────
    const fetchPayments = useCallback(async () => {
        try {
            setIsPolling(true);
            const res = await fetch('/api/webhook/sms');
            const data = await res.json();
            if (data.success && data.payments) {
                const prev = payments.length;
                setPayments(data.payments);
                const newCount = data.payments.length - prev;
                if (newCount > 0) setNewPaymentCount(c => c + newCount);
                setLastChecked(new Date().toLocaleTimeString('en-IN'));
            }
        } catch (e) {
            console.error('Poll error:', e);
        } finally {
            setIsPolling(false);
        }
    }, [payments.length]);

    useEffect(() => {
        if (!isAuthenticated) return;
        fetchPayments(); // initial fetch
        const interval = setInterval(fetchPayments, 15000); // every 15s
        return () => clearInterval(interval);
    }, [isAuthenticated, fetchPayments]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === 'admin123') {
            setIsAuthenticated(true);
            sessionStorage.setItem('isAdminAuth', 'true');
        } else {
            alert('Invalid credentials');
        }
    };

    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        sessionStorage.removeItem('isAdminAuth');
    }, []);

    const updateStatus = (id: string, newStatus: 'Approved' | 'Rejected') => {
        const updated = bookings.map((b) =>
            b.id === id ? { ...b, status: newStatus } : b
        );
        setBookings(updated);
        localStorage.setItem('bookings', JSON.stringify(updated));
    };

    const deleteBooking = (id: string) => {
        if (confirm('Are you sure you want to delete this booking?')) {
            const updated = bookings.filter((b) => b.id !== id);
            setBookings(updated);
            localStorage.setItem('bookings', JSON.stringify(updated));
        }
    };

    if (!isLoaded) return null;

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center p-4">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-[#1a1a1a] p-8 rounded-2xl border border-[#D4AF37]/30 shadow-2xl w-full max-w-md"
                >
                    <div className="text-center mb-8">
                        <div className="mx-auto w-16 h-16 bg-[#D4AF37]/10 rounded-full flex items-center justify-center mb-4">
                            <Lock className="w-8 h-8 text-[#D4AF37]" />
                        </div>
                        <h2 className="text-3xl font-playfair font-bold text-white mb-2">Admin Portal</h2>
                        <p className="text-gray-400">Secure access for Rich Look Staff</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400">Security Key</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-lg hover:bg-[#FFD700] transition-colors"
                        >
                            Enter Dashboard
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <Link href="/" className="text-sm text-gray-500 hover:text-[#D4AF37] transition-colors">
                            Return to Website
                        </Link>
                    </div>
                </motion.div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] text-white p-4 md:p-8">
            <div className="max-w-7xl mx-auto space-y-8">

                {/* Header */}
                <header className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-[#333] pb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold gold-text">Management</h1>
                        <p className="text-gray-400 mt-2">Oversee your studio operations and bookings</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white transition-colors"
                        >
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                        <Link href="/" className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all font-bold">
                            View Site
                        </Link>
                    </div>
                </header>

                {/* ─── SBI Payment Alerts ─────────────────────────────────────── */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#D4AF37]/30 overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-[#333]">
                        <div className="flex items-center gap-3">
                            {newPaymentCount > 0 ? (
                                <BellRing className="text-[#FFD700] animate-bounce" size={22} />
                            ) : (
                                <Bell className="text-[#D4AF37]" size={22} />
                            )}
                            <h2 className="text-lg font-bold text-[#D4AF37] uppercase tracking-widest">
                                SBI Payment Alerts
                            </h2>
                            {newPaymentCount > 0 && (
                                <span className="bg-green-500 text-black text-xs font-bold px-2 py-0.5 rounded-full">
                                    +{newPaymentCount} New
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-3">
                            {lastChecked && (
                                <span className="text-xs text-gray-500">Last: {lastChecked}</span>
                            )}
                            <button
                                onClick={() => { fetchPayments(); setNewPaymentCount(0); }}
                                className="flex items-center gap-1 text-xs text-gray-400 hover:text-[#D4AF37] transition-colors"
                            >
                                <RefreshCw size={14} className={isPolling ? 'animate-spin' : ''} />
                                Refresh
                            </button>
                        </div>
                    </div>

                    {payments.length === 0 ? (
                        <div className="p-10 text-center">
                            <IndianRupee className="mx-auto mb-3 text-gray-600" size={40} />
                            <p className="text-gray-500 italic">No payments received yet.</p>
                            <p className="text-xs text-gray-600 mt-1">SMS Forwarder app payment આવ્યે auto-show થશે</p>
                            <button
                                onClick={async () => {
                                    await fetch('/api/webhook/sms?test=1');
                                    fetchPayments();
                                }}
                                className="mt-4 px-4 py-2 text-xs border border-[#333] text-gray-500 hover:border-[#D4AF37] hover:text-[#D4AF37] rounded-lg transition-all"
                            >
                                🧪 Test Payment Inject
                            </button>
                        </div>
                    ) : (
                        <div className="divide-y divide-[#333]">
                            <AnimatePresence>
                                {payments.map((p) => (
                                    <motion.div
                                        key={p.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-6 py-4 hover:bg-[#252525]/30 transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-green-900/30 border border-green-700/40 flex items-center justify-center shrink-0">
                                                <IndianRupee size={18} className="text-green-400" />
                                            </div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-bold text-lg">₹{p.amount.toLocaleString('en-IN')}</span>
                                                    <span className="text-xs bg-blue-900/30 text-blue-400 border border-blue-800/30 px-2 py-0.5 rounded-full font-bold">{p.bank}</span>
                                                </div>
                                                <div className="text-xs text-gray-500 mt-0.5">
                                                    A/c: {p.account} &nbsp;|&nbsp; UTR: <span className="text-gray-400 font-mono">{p.utr}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-xs text-gray-500">
                                                {new Date(p.timestamp).toLocaleDateString('en-IN')} {new Date(p.timestamp).toLocaleTimeString('en-IN')}
                                            </div>
                                            <span className="inline-block mt-1 text-[10px] bg-green-900/20 text-green-400 border border-green-800/30 px-2 py-0.5 rounded-full font-bold uppercase">
                                                ✅ Received
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

                {/* ─── Bookings Table ──────────────────────────────────────────── */}
                <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden shadow-2xl">
                    <div className="px-6 py-4 border-b border-[#333]">
                        <h2 className="text-lg font-bold text-[#D4AF37] uppercase tracking-widest">Booking Appointments</h2>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead className="bg-[#222] text-[#D4AF37] uppercase text-xs font-bold tracking-widest">
                                <tr>
                                    <th className="p-5">Client Info</th>
                                    <th className="p-5">Service Type</th>
                                    <th className="p-5">Scheduled</th>
                                    <th className="p-5">Transaction</th>
                                    <th className="p-5">Payment</th>
                                    <th className="p-5">Status</th>
                                    <th className="p-5 text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                {bookings.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="p-20 text-center text-gray-500 italic">
                                            No appointment records found.
                                        </td>
                                    </tr>
                                ) : (
                                    bookings.map((booking) => (
                                        <motion.tr
                                            key={booking.id}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="hover:bg-[#252525]/30 transition-colors"
                                        >
                                            <td className="p-5">
                                                <div className="font-bold text-white">{booking.name}</div>
                                                <div className="text-xs text-gray-500">{booking.phone}</div>
                                            </td>
                                            <td className="p-5 text-sm text-gray-300">{booking.service}</td>
                                            <td className="p-5 text-sm">
                                                <div className="text-gray-300">{booking.date}</div>
                                                <div className="text-[#D4AF37] font-semibold">{booking.time}</div>
                                            </td>
                                            <td className="p-5 text-xs font-mono text-gray-500">
                                                {booking.paymentId || 'N/A'}
                                            </td>
                                            <td className="p-5">
                                                <span className="px-2 py-1 bg-green-900/20 text-green-400 rounded border border-green-800/30 text-[10px] font-bold uppercase">
                                                    {booking.paymentStatus}
                                                </span>
                                            </td>
                                            <td className="p-5">
                                                <span className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${booking.status === 'Approved'
                                                    ? 'bg-blue-900/20 text-blue-400 border-blue-800/30'
                                                    : booking.status === 'Rejected'
                                                        ? 'bg-red-900/20 text-red-400 border-red-800/30'
                                                        : 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30'
                                                    }`}>
                                                    {booking.status}
                                                </span>
                                            </td>
                                            <td className="p-5 text-center">
                                                <div className="flex justify-center items-center gap-1">
                                                    {booking.status === 'Pending' && (
                                                        <>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, 'Approved')}
                                                                className="p-2 text-green-400 hover:bg-green-400/10 rounded-lg transition-colors"
                                                                title="Approve"
                                                            >
                                                                <CheckCircle size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => updateStatus(booking.id, 'Rejected')}
                                                                className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                                                                title="Reject"
                                                            >
                                                                <XCircle size={18} />
                                                            </button>
                                                        </>
                                                    )}
                                                    <button
                                                        onClick={() => deleteBooking(booking.id)}
                                                        className="p-2 text-gray-500 hover:text-white hover:bg-red-900/20 rounded-lg transition-colors"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
}
