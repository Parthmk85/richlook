'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, CheckCircle, Loader } from 'lucide-react';

const services = [
    'Bridal Makeup',
    'Party Makeup',
    'Hair Styling',
    'Nail Art',
    'Facial Treatment',
];

const timeSlots = [
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '01:00 PM',
    '02:00 PM',
    '03:00 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM',
];

export default function BookingForm() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        service: services[0],
        date: '',
        time: timeSlots[0],
    });

    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        // Simulate API call & Payment
        setTimeout(() => {
            const newBooking = {
                id: Math.random().toString(36).substr(2, 9),
                paymentId: 'PAY_' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                ...formData,
                status: 'Pending',
                paymentStatus: 'Paid (Advance)',
                createdAt: new Date().toISOString(),
            };

            // Save to localStorage for Admin Panel to read
            const existing = JSON.parse(localStorage.getItem('bookings') || '[]');
            localStorage.setItem('bookings', JSON.stringify([newBooking, ...existing]));

            setStatus('success');
            setFormData({ name: '', phone: '', service: services[0], date: '', time: timeSlots[0] });
        }, 2000);
    };

    return (
        <div className="max-w-md mx-auto p-8 rounded-2xl glass border border-[#D4AF37]/30 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />

            <h3 className="text-2xl font-playfair font-bold text-center mb-6 gold-text">
                Book Your Session
            </h3>

            <AnimatePresence mode="wait">
                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-center py-6 space-y-4"
                    >
                        <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
                        <h4 className="text-xl font-semibold text-white">Booking Confirmed! 🎉</h4>
                        <p className="text-gray-400 text-sm">
                            Scan the QR code below to complete your payment
                        </p>

                        {/* UPI QR Code */}
                        <div className="flex flex-col items-center gap-3">
                            <div className="p-3 bg-white rounded-2xl shadow-[0_0_25px_rgba(212,175,55,0.4)] border-2 border-[#D4AF37]">
                                <img
                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent('upi://pay?pa=richlookbeautystudio@upi&pn=Rich%20Look%20Beauty%20Studio&cu=INR')}`}
                                    alt="UPI QR Code"
                                    width={180}
                                    height={180}
                                    className="rounded-lg"
                                />
                            </div>
                            <div className="bg-[#1a1a1a] border border-[#D4AF37]/40 rounded-xl px-4 py-3 text-sm space-y-1">
                                <p className="text-[#FFD700] font-bold text-base">💳 UPI Payment</p>
                                <p className="text-gray-300">UPI ID: <span className="text-white font-semibold">richlookbeautystudio@upi</span></p>
                                <p className="text-gray-400 text-xs mt-1">Pay via Google Pay, PhonePe, Paytm or any UPI app</p>
                            </div>
                            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg px-4 py-2 text-xs text-yellow-400">
                                ⚡ After payment, your booking will be approved by admin
                            </div>
                        </div>

                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-4 px-6 py-2 bg-[#D4AF37] text-black rounded-full font-bold hover:bg-[#FFD700] transition-colors"
                        >
                            Book Another
                        </button>
                    </motion.div>
                ) : (
                    <motion.form
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >
                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <input
                                    required
                                    type="text"
                                    placeholder="Enter your name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                <input
                                    required
                                    type="tel"
                                    placeholder="+91 98765 43210"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Date</label>
                                <div className="relative">
                                    <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <input
                                        required
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-3 pl-10 pr-2 text-white placeholder-gray-500 focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none"
                                        style={{ colorScheme: 'dark' }}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm text-gray-400 ml-1">Time</label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-3 w-5 h-5 text-gray-500" />
                                    <select
                                        required
                                        value={formData.time}
                                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                                        className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-3 pl-10 pr-8 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all appearance-none"
                                    >
                                        {timeSlots.map((slot) => (
                                            <option key={slot} value={slot}>{slot}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm text-gray-400 ml-1">Service</label>
                            <select
                                required
                                value={formData.service}
                                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                                className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] transition-all"
                            >
                                {services.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>

                        <button
                            disabled={status === 'loading'}
                            type="submit"
                            className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold uppercase tracking-widest rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.4)] hover:shadow-[0_0_30px_rgba(212,175,55,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2"
                        >
                            {status === 'loading' ? (
                                <Loader className="animate-spin w-5 h-5" />
                            ) : (
                                'Pay Advance & Book'
                            )}
                        </button>
                    </motion.form>
                )}
            </AnimatePresence>
        </div>
    );
}
