'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle, Instagram } from 'lucide-react';
import { useInstagramPosts } from '@/hooks/useInstagramPosts';
import { INSTAGRAM_CONFIG } from '@/utils/instagramConfig';

const Hero: React.FC = () => {
  // Obtener posts de Instagram automáticamente
  const { posts, loading, error } = useInstagramPosts({
    accessToken: INSTAGRAM_CONFIG.accessToken,
    userId: INSTAGRAM_CONFIG.userId,
    maxPosts: INSTAGRAM_CONFIG.maxPosts,
    fallbackPosts: INSTAGRAM_CONFIG.fallbackPosts,
  });

  // Obtener el último post
  const latestPost = posts[0];

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <span className="h-px w-12 bg-brand-accent" />
                <span className="text-brand-accent font-medium tracking-wider uppercase text-sm">
                  AVIXA Member
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                Creemos en el <br/>
                Poder de <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                  Conectar Personas
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
                Transformamos espacios con tecnología audiovisual. Simplificamos la complejidad tecnológica para crear entornos colaborativos, eficientes y de alto impacto.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <a 
                  href="#contact"
                  className="group flex items-center justify-center px-8 py-4 bg-brand-primary hover:bg-brand-accent text-white font-semibold rounded-lg transition-all shadow-lg shadow-brand-primary/25"
                >
                  Solicitar Cotización
                  <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
                </a>
                
                <button className="group flex items-center justify-center px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-lg transition-all">
                  <PlayCircle className="mr-2 text-brand-accent" size={20} />
                  Ver Showreel
                </button>
              </div>
            </motion.div>
          </div>

          {/* Instagram Post - Solo imagen/video */}
          {loading ? (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <div className="relative w-full max-w-md rounded-lg overflow-hidden shadow-2xl bg-slate-800 aspect-square flex items-center justify-center">
                <div className="animate-pulse">
                  <Instagram className="w-16 h-16 text-slate-600" />
                </div>
              </div>
            </motion.div>
          ) : latestPost ? (
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="hidden lg:flex justify-center items-center"
            >
              <a
                href={latestPost.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative w-full max-w-md rounded-lg overflow-hidden shadow-2xl group"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-800">
                  {latestPost.media_type === 'VIDEO' ? (
                    <video
                      src={latestPost.media_url}
                      poster={latestPost.thumbnail_url}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      autoPlay
                      loop
                      muted
                      playsInline
                      preload="metadata"
                      onError={(e) => {
                        // Si falla el video, intentar mostrar el thumbnail
                        const target = e.target as HTMLVideoElement;
                        if (latestPost.thumbnail_url) {
                          target.style.display = 'none';
                          const img = document.createElement('img');
                          img.src = latestPost.thumbnail_url;
                          img.className = 'w-full h-full object-cover';
                          target.parentElement?.appendChild(img);
                        }
                      }}
                    />
                  ) : (
                    <img
                      src={latestPost.media_url}
                      alt={latestPost.caption || 'Última publicación de Instagram - We Tech'}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      loading="lazy"
                      onError={(e) => {
                        // Si falla la carga, ocultar la imagen
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                      }}
                    />
                  )}
                  
                  {/* Overlay sutil al hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Instagram className="w-12 h-12 text-white drop-shadow-lg" />
                    </div>
                  </div>
                </div>
              </a>
            </motion.div>
          ) : null}
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center p-2">
          <div className="w-1 h-1 bg-current rounded-full" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
