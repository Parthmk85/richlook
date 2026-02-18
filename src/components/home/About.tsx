'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import * as THREE from 'three';

function RotatingGoldCircle() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef}>
                <torusGeometry args={[2.2, 0.15, 16, 100]} />
                <meshStandardMaterial
                    color="#FFD700"
                    metalness={1}
                    roughness={0.1}
                    emissive="#D4AF37"
                    emissiveIntensity={0.2}
                />
            </mesh>
        </Float>
    );
}

export default function About() {
    return (
        <section className="py-24 bg-[#050505] text-white relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-12">
                {/* Left: 3D Image Composition */}
                <div className="w-full md:w-1/2 relative h-[500px] flex items-center justify-center">
                    {/* Background 3D Canvas */}
                    <div className="absolute inset-0 w-full h-full z-0">
                        <Canvas camera={{ position: [0, 0, 6] }}>
                            <ambientLight intensity={0.5} />
                            <pointLight position={[10, 10, 10]} intensity={1} color="#FFD700" />
                            <RotatingGoldCircle />
                        </Canvas>
                    </div>

                    {/* Foreground Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative z-10 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-[0_0_50px_rgba(212,175,55,0.3)] w-64 h-64 md:w-80 md:h-80"
                    >
                        {/* Placeholder for Studio Image */}
                        <div className="w-full h-full bg-gradient-to-br from-[#1a1a1a] via-[#333] to-[#000] flex items-center justify-center">
                            <span className="text-4xl text-[#FFD700]">Studio</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right: Text Content */}
                <div className="w-full md:w-1/2 space-y-8">
                    <motion.h2
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-5xl font-playfair font-bold gold-text leading-tight"
                    >
                        Crafting Beauty <br /> Since 2018
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6 text-gray-300 text-lg font-light leading-relaxed"
                    >
                        <p>
                            Welcome to <span className="text-[#FFD700] font-semibold">Rich Look Beauty Studio</span>, where we believe that beauty is an art form. With over <strong>5+ years of experience</strong> in the industry, we have mastered the delicate balance between timeless elegance and modern trends.
                        </p>
                        <p>
                            From bridal makeovers that leave a lasting impression to rejuvenating facial treatments, we use only <strong>premium, high-end products</strong> to ensure your skin's health and radiance. Hygiene and perfection are our top priorities.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="grid grid-cols-2 gap-6 pt-4"
                    >
                        <div className="border-l-2 border-[#D4AF37] pl-4">
                            <h4 className="text-3xl font-bold text-[#FFD700]">500+</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Happy Brides</p>
                        </div>
                        <div className="border-l-2 border-[#D4AF37] pl-4">
                            <h4 className="text-3xl font-bold text-[#FFD700]">5★</h4>
                            <p className="text-sm text-gray-400 uppercase tracking-widest mt-1">Customer Rating</p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
