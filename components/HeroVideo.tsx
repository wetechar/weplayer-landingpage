'use client';

import { useEffect, useRef } from 'react';

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      // Ajustar la velocidad de reproducción del video
      // Valores: 0.5 = 50% más lento, 0.75 = 25% más lento, 1.0 = velocidad normal, 1.5 = 50% más rápido
      videoRef.current.playbackRate = 0.3; // ← AQUÍ SE AJUSTA LA VELOCIDAD (0.75 = 75% de velocidad normal)
    }
  }, []);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute left-1/2 top-1/2 h-full w-full min-h-full -translate-x-1/2 -translate-y-1/2 object-cover"
      >
        <source src="/videos/Hero.mp4" type="video/mp4" />
      </video>

      {/* Overlay opcional */}
      <div className="absolute inset-0 bg-black/20" />
    </div>
  );
}
  