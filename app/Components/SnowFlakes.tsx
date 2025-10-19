'use client'

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

// Define the type for a single snowflake
interface Snowflake {
  id: number;
  x: number;
  size: number;
  duration: number;
  delay: number;
}

export function Snowflakes() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const flakes: Snowflake[] = [];
    for (let i = 0; i < 50; i++) {
      flakes.push({
        id: i,
        x: Math.random() * 100,
        size: Math.random() * 10 + 5,
        duration: Math.random() * 3 + 7,
        delay: Math.random() * 5,
      });
    }
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-20">
      {snowflakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-white drop-shadow-lg"
          style={{
            left: `${flake.x}%`,
            fontSize: `${flake.size}px`,
            top: '-20px',
            filter: 'drop-shadow(0 0 2px rgba(255,255,255,0.8))',
          }}
          animate={{
            y: ['0vh', '105vh'],
            x: [0, Math.sin(flake.id) * 50, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: flake.duration,
            repeat: Infinity,
            delay: flake.delay,
            ease: 'linear',
          }}
        >
          ❄
        </motion.div>
      ))}
    </div>
  );
}