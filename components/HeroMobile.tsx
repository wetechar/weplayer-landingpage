"use client";

import React, { useState } from 'react';

export default function HeroMobileFocus() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Usamos el video de RockFeller por su gran impacto visual
  const mainVideo = "/videos/Instalacion-RockFellerUnicenter.mp4";

  return (
    <section className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center">
      
      {/* 1. FONDO AMBIENTAL (Blur Layer) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <video
          autoPlay loop muted playsInline
          className={`h-full w-full object-cover scale-150 blur-[100px] opacity-40 transition-opacity duration-[2s]
            ${isLoaded ? 'opacity-40' : 'opacity-0'}`}
        >
          <source src={mainVideo} type="video/mp4" />
        </video>
        {/* Capa de viñeta para oscurecer los bordes */}
        <div className="absolute inset-0 bg-radial-to-c from-transparent to-black/80" />
      </div>

      {/* 2. CONTENEDOR MÓVIL (The Frame) */}
      <div 
        className={`relative z-10 w-[85%] max-w-[360px] aspect-[9/19.5] transition-all duration-[1.5s] ease-out-expo
          ${isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
      >
        {/* Marco físico simulado (Minimalista) */}
        <div className="absolute inset-0 rounded-[3rem] border-[8px] border-neutral-800/50 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-neutral-900 overflow-hidden">
          
          {/* Skeleton interno */}
          {!isLoaded && (
            <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
          )}

          {/* Video Principal */}
          <video
            autoPlay loop muted playsInline
            onLoadedData={() => setIsLoaded(true)}
            className={`h-full w-full object-cover transition-opacity duration-1000
              ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
          >
            <source src={mainVideo} type="video/mp4" />
          </video>

          {/* Reflejo de cristal sobre la pantalla */}
          <div className="absolute inset-0 bg-linear-to-tr from-white/5 via-transparent to-white/10 pointer-events-none" />
        </div>

        {/* Brillo sutil externo (Glow) */}
        <div className="absolute -inset-4 bg-white/5 blur-2xl rounded-[4rem] -z-10 opacity-50" />
      </div>

      {/* 3. ELEMENTOS DE INTEGRACIÓN (Luces dinámicas) */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-20">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-amber-500/10 blur-[120px] rounded-full animate-pulse" />
      </div>

      <style jsx global>{`
        .ease-out-expo {
          transition-timing-function: cubic-bezier(0.19, 1, 0.22, 1);
        }
      `}</style>
    </section>
  );
}