"use client";

import React, { useState, useEffect, useRef } from 'react';

// Interfaz simplificada (ya no necesitamos títulos)
interface VideoClip {
  id: number;
  src: string;
  gridClass: string;
}

// Configuración del Grid ajustada para 2 columnas y 3 elementos
const clips: VideoClip[] = [
  { 
    id: 1, 
    src: '/videos/Instalacion-RockFellerUnicenter.mp4', 
    // Columna izquierda completa
    gridClass: 'md:col-span-1 md:row-span-2 h-full' 
  },
  { 
    id: 2, 
    src: '/videos/Bose-Oficina.mp4', 
    // Arriba derecha
    gridClass: 'md:col-span-1 md:row-span-1 h-full' 
  },
  { 
    id: 3, 
    src: '/videos/Instalacion-Criba.mp4', 
    // Abajo derecha
    gridClass: 'md:col-span-1 md:row-span-1 h-full' 
  },
];

export default function HeroBento() {
  const [scrollY, setScrollY] = useState(0);
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    // Padding mínimo (p-2) para maximizar el espacio visual
    <section className="relative w-full h-screen bg-black p-2">
      
      {/* Grid Layout: 2 columnas, gap muy ajustado (gap-2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 h-full w-full">
        
        {clips.map((video, index) => {
          // Parallax muy sutil
          const parallaxOffset = scrollY * (0.02 + index * 0.01);
          
          return (
            <div 
              key={video.id}
              // Bordes menos redondeados (rounded-2xl) para un look más integrado
              className={`group relative overflow-hidden rounded-2xl bg-neutral-950 border border-white/10 ${video.gridClass}`}
            >
              {/* Skeleton de carga */}
              {!loadedVideos[video.id] && (
                <div className="absolute inset-0 z-50 bg-neutral-900 animate-pulse" />
              )}

              {/* Contenedor del Video con Parallax */}
              <div 
                className="absolute inset-0 w-full h-[115%] will-change-transform"
                style={{ transform: `translateY(${parallaxOffset}px)` }}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[video.id] = el;
                  }}
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="auto"
                  onLoadedData={() => {
                    setLoadedVideos(prev => ({ ...prev, [video.id]: true }));
                    // Ajustar velocidad de reproducción para mayor agrado visual
                    // Velocidad ligeramente reducida (0.85x) para un efecto más cinematográfico y elegante
                    const videoElement = videoRefs.current[video.id];
                    if (videoElement) {
                      videoElement.playbackRate = 0.85; // 85% de velocidad normal (más lento y elegante)
                      videoElement.play().catch((error) => {
                        console.warn(`Error al reproducir video ${video.id}:`, error);
                      });
                    }
                  }}
                  onPlay={() => {
                    // Asegurar que la velocidad se mantenga incluso si el video se pausa y reanuda
                    const videoElement = videoRefs.current[video.id];
                    if (videoElement && videoElement.playbackRate !== 0.85) {
                      videoElement.playbackRate = 0.85;
                    }
                  }}
                  onError={(e) => {
                    console.error(`Error al cargar video ${video.id}:`, e);
                  }}
                  // Mantengo el grayscale leve para que no sea visualmente abrumador hasta el hover
                  className={`h-full w-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-all duration-1000
                    ${loadedVideos[video.id] ? 'opacity-80 group-hover:opacity-100' : 'opacity-0'}`}
                >
                  <source src={video.src} type="video/mp4" />
                </video>
              </div>

              {/* Overlay sutil para unificar tonos, sin textos encima */}
              <div className="absolute inset-0 z-10 bg-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
            </div>
          );
        })}
      </div>
    </section>
  );
}