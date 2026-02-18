'use client';

import { motion, Variants } from 'framer-motion';
import { Palette, Scissors, Sparkles, Smile, Star } from 'lucide-react';
import Link from 'next/link';

const services = [
    {
        title: 'Bridal Makeup',
        description: 'Exquisite bridal looks tailored for your special day.',
        icon: <Star className="w-12 h-12 text-[#FFD700]" />,
        price: 'Starting at ₹15,000',
    },
    {
        title: 'Party Makeup',
        description: 'Glamorous makeover for any occasion.',
        icon: <Palette className="w-12 h-12 text-[#FFD700]" />,
        price: 'Starting at ₹3,000',
    },
    {
        title: 'Hair Styling',
        description: 'Modern cuts, coloring, and treatments.',
        icon: <Scissors className="w-12 h-12 text-[#FFD700]" />,
        price: 'Starting at ₹1,000',
    },
    {
        title: 'Nail Art',
        description: 'Creative and elegant nail designs.',
        icon: <Sparkles className="w-12 h-12 text-[#FFD700]" />,
        price: 'Starting at ₹800',
    },
    {
        title: 'Facial Treatment',
        description: 'Rejuvenating facials for glowing skin.',
        icon: <Smile className="w-12 h-12 text-[#FFD700]" />,
        price: 'Starting at ₹2,500',
    },
];

const container: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
        },
    },
};

const item: Variants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 50 } },
};

export default function Services() {
    return (
        <section className="py-20 px-4 bg-[#0a0a0a] text-white relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-playfair font-bold mb-4 gold-text"
                    >
                        Our Premium Services
                    </motion.h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto" />
                    <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
                        Experience luxury and perfection with our wide range of beauty treatments designed to enhance your natural glow.
                    </p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={item}
                            whileHover={{ scale: 1.05 }}
                            className="glass p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-[#D4AF37] border border-transparent shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center space-y-4">
                                <div className="p-4 bg-black/50 rounded-full border border-[#D4AF37]/30 group-hover:border-[#D4AF37] transition-colors duration-300">
                                    {service.icon}
                                </div>
                                <h3 className="text-2xl font-playfair font-bold text-white group-hover:text-[#FFD700] transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    {service.description}
                                </p>
                                <div className="text-[#D4AF37] font-semibold text-lg pt-2">
                                    {service.price}
                                </div>

                                <Link href={`/book?service=${encodeURIComponent(service.title)}`} className="mt-4 px-6 py-2 border border-[#D4AF37] text-[#D4AF37] rounded-full hover:bg-[#D4AF37] hover:text-black transition-all duration-300 uppercase text-xs tracking-widest font-bold">
                                    Book Now
                                </Link>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
