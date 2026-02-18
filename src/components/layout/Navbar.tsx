'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const links = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Gallery', href: '/gallery' },
    { name: 'Contact', href: '/contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 w-full z-50 bg-[#0f0f0f]/80 backdrop-blur-md border-b border-[#333]"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-playfair font-bold">
                    <span className="text-white">Rich</span> <span className="gold-text">Look</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex space-x-8">
                    {links.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className="text-gray-300 hover:text-[#FFD700] transition-colors uppercase text-sm tracking-widest font-medium"
                        >
                            {link.name}
                        </Link>
                    ))}
                    <Link
                        href="/book"
                        className="px-6 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all text-sm font-bold uppercase tracking-wide"
                    >
                        Book Now
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white hover:text-[#FFD700] transition-colors"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-[#0f0f0f] border-b border-[#333] overflow-hidden"
                    >
                        <div className="flex flex-col items-center py-8 space-y-6">
                            {links.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-300 hover:text-[#FFD700] text-lg font-medium tracking-wide"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link
                                href="/book"
                                onClick={() => setIsOpen(false)}
                                className="px-8 py-3 bg-[#D4AF37] text-black font-bold uppercase tracking-widest rounded-full"
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
}
