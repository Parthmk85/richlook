'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import { ComponentProps } from 'react';

export function GoldComb(props: ComponentProps<'group'>) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y -= 0.005;
            group.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: '#D4AF37',
        metalness: 1,
        roughness: 0.1,
        emissive: '#FF8800',
        emissiveIntensity: 0.4,
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={group} {...props} dispose={null}>
                {/* Comb Spine */}
                <mesh position={[0, 0, 0]} material={goldMaterial}>
                    <boxGeometry args={[4, 0.5, 0.1]} />
                </mesh>

                {/* Teeth */}
                {[...Array(20)].map((_, i) => (
                    <mesh key={i} position={[(i * 0.2) - 1.9, -0.6, 0]} material={goldMaterial}>
                        <boxGeometry args={[0.08, 0.8, 0.08]} />
                    </mesh>
                ))}
            </group>
        </Float>
    );
}
