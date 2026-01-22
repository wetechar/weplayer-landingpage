"use client";

import React, { useState, useEffect, useRef } from 'react';

interface VideoClip {
  id: number;
  src: string;
  title: string;
  subtitle: string;
}

const clips: VideoClip[] = [
  { id: 1, src: '/videos/Bose-Oficina.mp4', title: 'Ingeniería', subtitle: 'Sistemas Bose Professional' },
  { id: 2, src: '/videos/Instalacion-RockFellerUnicenter.mp4', title: 'Experiencia', subtitle: 'Rock Feller’s Unicenter' },
  { id: 3, src: '/videos/Instalacion-Criba.mp4', title: 'Innovación', subtitle: 'Integración Corporativa' },
];

export default function HeroTriptico() {
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});
  // Referencias para monitorear los elementos de video directamente
  const videoRefs = useRef<Record<number, HTMLVideoElement | null>>({});

  const handleVideoLoad = (id: number) => {
    setLoadedVideos((prev) => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    // Verificación de seguridad para videos ya cargados (caché)
    clips.forEach((video) => {
      const el = videoRefs.current[video.id];
      if (el && el.readyState >= 3) { // HAVE_FUTURE_DATA o superior
        handleVideoLoad(video.id);
      }
    });
  }, []);

  return (
    <section className="relative w-full h-full">
      <div className="flex flex-col md:flex-row h-full w-full gap-2 p-2">
        {clips.map((video) => (
          <div 
            key={video.id}
            className="group relative flex-1 overflow-hidden rounded-2xl transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:flex-[2.5] bg-neutral-900"
          >
            {/* SKELETON: Se oculta solo cuando loadedVideos[id] es true */}
            {!loadedVideos[video.id] && (
              <div className="absolute inset-0 z-50 bg-neutral-900">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/5 to-transparent" />
                <div className="absolute bottom-10 left-8 space-y-3">
                  <div className="h-8 w-32 rounded-md bg-neutral-800" />
                  <div className="h-4 w-48 rounded-md bg-neutral-800" />
                </div>
              </div>
            )}

            {/* Overlay y Video */}
            <div className={`absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-1000 ${loadedVideos[video.id] ? 'opacity-80 group-hover:opacity-40' : 'opacity-0'}`} />
            
            <video
              ref={(el) => { videoRefs.current[video.id] = el; }}
              autoPlay
              loop
              muted
              playsInline
              onLoadedData={() => handleVideoLoad(video.id)}
              className={`absolute inset-0 h-full w-full object-cover scale-115 group-hover:scale-100 transition-all duration-[2s] ease-out
                ${loadedVideos[video.id] ? 'opacity-100' : 'opacity-0'}`}
            >
              <source src={video.src} type="video/mp4" />
            </video>

          </div>
        ))}
      </div>


      <style jsx global>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}