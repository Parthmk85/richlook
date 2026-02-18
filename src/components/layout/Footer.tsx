'use client';

import { Facebook, Instagram, Twitter, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#050505] text-white pt-20 pb-10 border-t border-[#333]">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand */}
                <div className="space-y-4">
                    <Link href="/" className="text-3xl font-playfair font-bold gold-text">
                        Rich Look
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        Where luxury meets artistry. Elevate your beauty with our premium services and expert stylists.
                    </p>
                    <div className="flex space-x-4 pt-4">
                        <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Instagram size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Facebook size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors"><Twitter size={20} /></a>
                        <a href="#" className="text-gray-400 hover:text-[#FFD700] transition-colors"><MessageCircle size={20} /></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-lg font-bold text-[#FFD700] mb-6 uppercase tracking-widest">Explore</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                        <li><Link href="/services" className="hover:text-white transition-colors">Services</Link></li>
                        <li><Link href="/gallery" className="hover:text-white transition-colors">Gallery</Link></li>
                        <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                    </ul>
                </div>

                {/* Services */}
                <div>
                    <h4 className="text-lg font-bold text-[#FFD700] mb-6 uppercase tracking-widest">Services</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li>Bridal Makeup</li>
                        <li>Party Glam</li>
                        <li>Hair Styling</li>
                        <li>Nail Artistry</li>
                        <li>Skin Care</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h4 className="text-lg font-bold text-[#FFD700] mb-6 uppercase tracking-widest">Contact</h4>
                    <ul className="space-y-3 text-gray-400 text-sm">
                        <li>123 Luxury Lane, Fashion District</li>
                        <li>New York, NY 10001</li>
                        <li className="pt-2 text-[#D4AF37]">+91 99042 36210</li>
                        <li>hello@richlookstudio.com</li>
                    </ul>
                </div>
            </div>

            <div className="border-t border-[#333] mt-16 pt-8 text-center text-gray-600 text-xs uppercase tracking-widest">
                &copy; {new Date().getFullYear()} Rich Look Beauty Studio. All rights reserved.
            </div>
        </footer>
    );
}
