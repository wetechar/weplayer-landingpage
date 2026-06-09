'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import LogoVector from './logos/LogoVector';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Ajustar la velocidad de reproducción del video
      // Valores: 0.5 = 50% más lento, 0.75 = 25% más lento, 1.0 = velocidad normal, 1.5 = 50% más rápido
      videoRef.current.playbackRate = 0.5; // ← AQUÍ SE AJUSTA LA VELOCIDAD (0.75 = 75% de velocidad normal)
    }
  }, []);

  return (
    <div className='relative h-full w-full overflow-hidden'>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className='absolute left-1/2 top-1/2 h-full w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover z-0'
      >
        <source src='/videos/Hero3.mp4' type='video/mp4' />
      </video>

      {/* Overlay opcional */}
      <div className='absolute inset-0 bg-black/20 z-10' />

      {/* LogoVector centrado - La estrella */}
      <div className='absolute inset-0 flex items-end justify-center md: pb-10 lg: xl: z-20'>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        >
          <LogoVector
            size='w-40 h-40 md:w-40 md:h-40 w-40 lg:h-40 lg:w-40 xl:w-50 xl:h-50'
            priority={true}
          />
        </motion.div>
      </div>
    </div>
  );
}
