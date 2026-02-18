'use client';

import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const reviews = [
    {
        name: 'Priya Sharma',
        role: 'Happy Bride',
        text: 'Rich Look Studio made my wedding day absolutely magical. The makeup was exactly what I dreamed of - elegant and long-lasting.',
        rating: 5,
    },
    {
        name: 'Anjali Gupta',
        role: 'Fashion Model',
        text: 'The most professional studio I have visited. Their attention to detail and knowledge of current trends is unmatched.',
        rating: 5,
    },
    {
        name: 'Sneha Kapoor',
        role: 'Regular Client',
        text: 'Consistent perfection every single time. Whether it is a quick hair styling or a detailed facial, they never disappoint.',
        rating: 5,
    },
];

export default function Testimonials() {
    return (
        <section className="py-24 bg-[#0f0f0f] text-white">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="flex justify-center mb-4"
                    >
                        <Quote className="text-[#D4AF37] opacity-50" size={48} />
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-5xl font-playfair font-bold gold-text"
                    >
                        Client Stories
                    </motion.h2>
                    <p className="mt-4 text-gray-400 font-light tracking-wide uppercase text-xs">Testimonials from our valued patrons</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {reviews.map((review, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2 }}
                            viewport={{ once: true }}
                            className="glass p-8 rounded-2xl relative border border-[#333] hover:border-[#D4AF37]/40 transition-all duration-300 group"
                        >
                            <div className="flex gap-1 mb-4">
                                {[...Array(review.rating)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-[#D4AF37] text-[#D4AF37]" />
                                ))}
                            </div>

                            <p className="text-gray-300 italic mb-8 leading-relaxed">
                                &quot;{review.text}&quot;
                            </p>

                            <div className="flex items-center gap-4 border-t border-[#333] pt-6 group-hover:border-[#D4AF37]/20 transition-all">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#333] border border-[#D4AF37]/30 flex items-center justify-center font-bold text-[#D4AF37]">
                                    {review.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-bold text-white tracking-wide">{review.name}</h4>
                                    <p className="text-xs text-[#D4AF37] uppercase font-semibold">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
