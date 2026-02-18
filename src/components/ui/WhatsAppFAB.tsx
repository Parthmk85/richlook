'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function WhatsAppFAB() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 300) {
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
                <motion.a
                    href="https://wa.me/919904236210"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.5, y: 100 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 100 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="fixed bottom-6 left-6 z-[60] bg-[#25D366] text-white p-4 rounded-full shadow-[0_4px_20px_rgba(37,211,102,0.4)] flex items-center justify-center border-2 border-white/20"
                >
                    <MessageCircle size={28} />
                    <span className="absolute -top-2 -right-2 bg-red-500 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-white animate-pulse">
                        1
                    </span>
                </motion.a>
            )}
        </AnimatePresence>
    );
}
