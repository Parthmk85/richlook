'use client';

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import About from '@/components/home/About';
import Testimonials from '@/components/home/Testimonials';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#0f0f0f] text-white">
            <Navbar />
            <div className="pt-24 min-h-[50vh] flex flex-col items-center justify-center bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] px-4 text-center border-b border-[#333]">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-5xl md:text-7xl font-playfair font-bold gold-text mb-6"
                >
                    The Studio Story
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-gray-400 max-w-2xl text-lg uppercase tracking-widest"
                >
                    Defining luxury and beauty standards since 2018.
                </motion.p>
            </div>
            <About />
            <Testimonials />
            <Footer />
        </main>
    );
}
