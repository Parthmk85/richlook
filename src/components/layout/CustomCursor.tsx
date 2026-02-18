'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
    const [isPointer, setIsPointer] = useState(false);

    const mouseX = useSpring(0, { damping: 20, stiffness: 200 });
    const mouseY = useSpring(0, { damping: 20, stiffness: 200 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX - 20);
            mouseY.set(e.clientY - 20);

            const target = e.target as HTMLElement;
            setIsPointer(window.getComputedStyle(target).cursor === 'pointer');
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    return (
        <motion.div
            className="cursor-glow hidden md:block"
            style={{
                x: mouseX,
                y: mouseY,
                scale: isPointer ? 1.5 : 1,
                backgroundColor: isPointer ? 'rgba(212, 175, 55, 0.6)' : 'rgba(212, 175, 55, 0.2)',
            }}
        />
    );
}
