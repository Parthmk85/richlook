'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Instagram, Facebook, MessageSquare } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSend = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => setFormStatus('sent'), 1500);
    };

    return (
        <section className="py-24 bg-[#0a0a0a] text-white" id="contact">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-playfair font-bold gold-text"
                    >
                        Get In Touch
                    </motion.h2>
                    <p className="mt-4 text-gray-400">We'd love to hear from you. Visit us or send a message.</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        <div className="glass p-8 rounded-2xl border border-[#D4AF37]/20">
                            <h3 className="text-2xl font-playfair font-bold mb-6 text-[#FFD700]">Studio Information</h3>

                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full">
                                        <MapPin className="text-[#D4AF37]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Location</h4>
                                        <p className="text-gray-400">123 Luxury Lane, Fashion District<br />Mumbai, Maharashtra 400001</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full">
                                        <Phone className="text-[#D4AF37]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Phone</h4>
                                        <p className="text-gray-400">+91 99042 36210</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="p-3 bg-[#D4AF37]/10 rounded-full">
                                        <Mail className="text-[#D4AF37]" size={24} />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-1">Email</h4>
                                        <p className="text-gray-400">hello@richlookstudio.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-10 pt-10 border-t border-[#333]">
                                <h4 className="font-bold text-white uppercase text-xs tracking-widest mb-4">Follow Our Work</h4>
                                <div className="flex gap-4">
                                    <a href="#" className="p-3 bg-[#1a1a1a] rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-[#333]">
                                        <Instagram size={20} />
                                    </a>
                                    <a href="#" className="p-3 bg-[#1a1a1a] rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-[#333]">
                                        <Facebook size={20} />
                                    </a>
                                    <a href="#" className="p-3 bg-[#1a1a1a] rounded-full text-gray-400 hover:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all border border-[#333]">
                                        <MessageSquare size={20} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Map Placeholder */}
                        <div className="h-64 rounded-2xl overflow-hidden border border-[#333] relative grayscale hover:grayscale-0 transition-all duration-500">
                            <div className="absolute inset-0 bg-[#1a1a1a] flex items-center justify-center">
                                <MapPin size={48} className="text-[#D4AF37] animate-bounce" />
                                <span className="absolute bottom-4 text-xs tracking-widest text-[#D4AF37] uppercase font-bold">Find Us on Google Maps</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass p-8 md:p-12 rounded-2xl border border-[#D4AF37]/30 shadow-2xl relative"
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/5 rounded-full blur-3xl" />

                        <h3 className="text-3xl font-playfair font-bold mb-8 gold-text">Send a Message</h3>

                        {formStatus === 'sent' ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center py-12 space-y-4"
                            >
                                <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/30">
                                    <Send className="text-green-500" size={32} />
                                </div>
                                <h4 className="text-2xl font-bold">Message Sent!</h4>
                                <p className="text-gray-400">Our team will get back to you within 24 hours.</p>
                                <button
                                    onClick={() => setFormStatus('idle')}
                                    className="mt-6 text-[#D4AF37] font-bold uppercase text-xs tracking-widest border-b border-[#D4AF37]/50 hover:border-[#D4AF37]"
                                >
                                    Send Another
                                </button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSend} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Full Name</label>
                                        <input required type="text" className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="Jane Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Email Address</label>
                                        <input required type="email" className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all" placeholder="jane@example.com" />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Subject</label>
                                    <select className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all appearance-none">
                                        <option>General Inquiry</option>
                                        <option>Bridal Consultation</option>
                                        <option>Career Opportunities</option>
                                        <option>Press & Media</option>
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">Your Message</label>
                                    <textarea required rows={4} className="w-full bg-[#0f0f0f] border border-[#333] rounded-lg p-4 text-white focus:outline-none focus:border-[#D4AF37] transition-all resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button
                                    disabled={formStatus === 'sending'}
                                    type="submit"
                                    className="w-full py-4 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] text-black font-bold uppercase tracking-widest rounded-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {formStatus === 'sending' ? 'Sending...' : (
                                        <>
                                            Send Message
                                            <Send size={18} />
                                        </>
                                    )}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
