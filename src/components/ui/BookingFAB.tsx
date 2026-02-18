'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function BookingFAB() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 500) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.5, x: 100 }}
                    animate={{ opacity: 1, scale: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.5, x: 100 }}
                    className="fixed bottom-6 right-6 z-[60]"
                >
                    <Link
                        href="/book"
                        className="bg-[#D4AF37] text-black p-4 rounded-full shadow-[0_4px_20px_rgba(212,175,55,0.4)] flex items-center justify-center border-2 border-[#FFD700]/50 hover:bg-[#FFD700] transition-all group"
                    >
                        <Calendar size={28} />
                        <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs group-hover:ml-3 transition-all duration-500 font-bold uppercase tracking-widest text-sm">
                            Book Now
                        </span>
                    </Link>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
