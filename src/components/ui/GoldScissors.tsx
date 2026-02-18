'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

import { ComponentProps } from 'react';

export function GoldScissors(props: ComponentProps<'group'>) {
    const group = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (group.current) {
            group.current.rotation.y += 0.005;
            group.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2;
        }
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
        color: '#FFD700',
        metalness: 1,
        roughness: 0.1,
        emissive: '#D4AF37',
        emissiveIntensity: 0.2,
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={group} {...props} dispose={null}>
                {/* Blade 1 */}
                <mesh position={[0, 1.5, 0]} rotation={[0, 0, -0.1]} material={goldMaterial}>
                    <boxGeometry args={[0.2, 3, 0.05]} />
                </mesh>
                {/* Blade 2 */}
                <mesh position={[0, 1.5, 0]} rotation={[0, 0, 0.1]} material={goldMaterial}>
                    <boxGeometry args={[0.2, 3, 0.05]} />
                </mesh>

                {/* Handle 1 */}
                <mesh position={[-0.5, -0.5, 0]} material={goldMaterial}>
                    <torusGeometry args={[0.4, 0.08, 16, 32]} />
                </mesh>

                {/* Handle 2 */}
                <mesh position={[0.5, -0.5, 0]} material={goldMaterial}>
                    <torusGeometry args={[0.4, 0.08, 16, 32]} />
                </mesh>

                {/* Pivot */}
                <mesh position={[0, 0.8, 0]} rotation={[1.57, 0, 0]} material={goldMaterial}>
                    <cylinderGeometry args={[0.1, 0.1, 0.1, 32]} />
                </mesh>
            </group>
        </Float>
    );
}
