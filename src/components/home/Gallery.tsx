'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

const images = [
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Bridal+1',
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Party+Look',
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Hair+Color',
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Engagement',
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Subtle+Glam',
    'https://placehold.co/600x800/1a1a1a/D4AF37/png?text=Reception',
];

export default function Gallery() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="py-24 bg-[#0a0a0a] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-playfair font-bold gold-text"
                    >
                        Our Masterpieces
                    </motion.h2>
                    <p className="mt-4 text-gray-400">Captured moments of perfection.</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-[300px]">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                            className="relative overflow-hidden group rounded-lg border border-[#D4AF37]/20 shadow-lg cursor-pointer"
                        >
                            <Image
                                src={src}
                                alt={`Rich Look Gallery ${index + 1}`}
                                width={600}
                                height={800}
                                className="w-full h-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
                            />

                            {/* Gold Overlay */}
                            <div
                                className={`absolute inset-0 bg-[#D4AF37]/20 mix-blend-overlay transition-opacity duration-300 ${hoveredIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}
                            />

                            {/* Fade In Content */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-[#FFD700] uppercase tracking-widest text-sm font-semibold translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                    View Style &rarr;
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
