'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Trash2, CheckCircle, XCircle, Lock, LogOut } from 'lucide-react';
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

export default function AdminDashboard() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const stored = typeof window !== 'undefined' ? localStorage.getItem('bookings') : null;
        if (stored) {
            setBookings(JSON.parse(stored));
        }

        const auth = typeof window !== 'undefined' ? sessionStorage.getItem('isAdminAuth') : null;
        if (auth === 'true') {
            setIsAuthenticated(true);
        }
        setIsLoaded(true);
    }, []);

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

    // Prevent hydration mismatch
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
            <div className="max-w-7xl mx-auto">
                <header className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 border-b border-[#333] pb-8">
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

                <div className="bg-[#1a1a1a] rounded-2xl border border-[#333] overflow-hidden shadow-2xl">
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
                                                <span
                                                    className={`px-3 py-1 rounded-full text-[10px] uppercase font-bold border ${booking.status === 'Approved'
                                                        ? 'bg-blue-900/20 text-blue-400 border-blue-800/30'
                                                        : booking.status === 'Rejected'
                                                            ? 'bg-red-900/20 text-red-400 border-red-800/30'
                                                            : 'bg-yellow-900/20 text-yellow-400 border-yellow-800/30'
                                                        }`}
                                                >
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
