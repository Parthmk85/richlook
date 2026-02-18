'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { GoldScissors } from '@/components/ui/GoldScissors';
import { GoldComb } from '@/components/ui/GoldComb';
import Link from 'next/link';
import { Suspense } from 'react';

export default function Hero() {
    return (
        <section className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-[#1a1a1a] to-black opacity-90 z-0" />

            {/* 3D Canvas */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
                    <ambientLight intensity={0.5} color="#FFD700" />
                    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} color="#FFD700" />
                    <pointLight position={[-10, -10, -10]} intensity={0.5} color="#FFF" />

                    <Suspense fallback={null}>
                        <Environment preset="city" />
                        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
                            {/* Repositioned floating elements */}
                            <group position={[3.5, 0, 0]} rotation={[0, -0.5, 0]}>
                                <GoldScissors />
                            </group>
                            <group position={[-3.5, 0, 0]} rotation={[0, 0.5, 0]}>
                                <GoldComb />
                            </group>
                        </Float>
                    </Suspense>
                    <OrbitControls enableZoom={false} enablePan={false} maxPolarAngle={Math.PI / 1.5} minPolarAngle={Math.PI / 3} />
                </Canvas>
            </div>

            {/* Hero Content */}
            <div className="relative z-20 text-center px-4 max-w-5xl mx-auto space-y-8 pointer-events-none">
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="flex flex-col items-center"
                >
                    <h1 className="text-6xl md:text-8xl font-playfair font-bold tracking-tight gold-text drop-shadow-2xl">
                        Rich Look <br /> Beauty Studio
                    </h1>
                    <motion.div
                        initial={{ width: 0 }} animate={{ width: '8rem' }}
                        className="h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mt-4"
                    />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 1 }}
                    className="text-xl md:text-2xl text-gray-300 font-light tracking-widest uppercase"
                >
                    Where Elegance Meets Perfection
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.5 }}
                    className="pointer-events-auto pt-8"
                >
                    <Link href="/book" className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium tracking-wide text-black transition-all duration-300 bg-gradient-to-r from-[#D4AF37] to-[#FFD700] rounded-full hover:scale-105 hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#D4AF37] shimmer btn-glow">
                        <span className="absolute inset-0 w-full h-full bg-white rounded-full opacity-0 group-hover:opacity-20 animate-pulse"></span>
                        Book Appointment
                        <svg className="w-5 h-5 ml-2 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
