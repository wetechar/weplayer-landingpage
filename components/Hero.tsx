'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle, Instagram } from 'lucide-react';
import { useInstagramPosts } from '@/hooks/useInstagramPosts';
import { INSTAGRAM_CONFIG } from '@/utils/instagramConfig';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const hasTriggeredAutoScroll = useRef(false);

  // Obtener posts de Instagram automáticamente
  const { posts, loading, error } = useInstagramPosts({
    accessToken: INSTAGRAM_CONFIG.accessToken,
    userId: INSTAGRAM_CONFIG.userId,
    maxPosts: INSTAGRAM_CONFIG.maxPosts,
    fallbackPosts: INSTAGRAM_CONFIG.fallbackPosts,
  });

  // Obtener el último post
  const latestPost = posts[0];

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || isScrolling) return;

      const currentScrollY = window.scrollY;
      const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
      const heroTop = heroRef.current.offsetTop;
      const viewportHeight = window.innerHeight;
      
      // Detectar si el usuario está dentro del Hero
      const isInHero = currentScrollY >= heroTop - 50 && currentScrollY < heroBottom - viewportHeight * 0.5;
      const isNearHeroBottom = currentScrollY >= heroBottom - viewportHeight * 0.7;
      
      // Determinar dirección del scroll
      const scrollDelta = currentScrollY - lastScrollY.current;
      const isScrollingDown = scrollDelta > 0;
      
      // Si el usuario está cerca del final del Hero y comienza a hacer scroll hacia abajo
      if (isInHero && isScrollingDown && isNearHeroBottom && !hasTriggeredAutoScroll.current) {
        // Limpiar timeout anterior
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Esperar un momento para confirmar la intención de scroll (mínimo 50px de scroll)
        if (Math.abs(scrollDelta) > 5) {
          scrollTimeoutRef.current = setTimeout(() => {
            const nextSection = document.getElementById('partners');
            if (nextSection && !isScrolling && !hasTriggeredAutoScroll.current) {
              hasTriggeredAutoScroll.current = true;
              setIsScrolling(true);
              
              // Calcular posición objetivo (centrar el siguiente componente)
              const targetPosition = nextSection.offsetTop - 80; // Ajuste para el navbar
              
              // Scroll suave hacia el siguiente componente
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
              });

              // Resetear el estado después de la animación
              setTimeout(() => {
                setIsScrolling(false);
                // Resetear después de 2 segundos para permitir scroll manual
                setTimeout(() => {
                  hasTriggeredAutoScroll.current = false;
                }, 2000);
              }, 1000);
            }
          }, 200);
        }
      }
      
      // Resetear si el usuario hace scroll hacia arriba significativamente
      if (scrollDelta < -50) {
        hasTriggeredAutoScroll.current = false;
      }
      
      lastScrollY.current = currentScrollY;
    };

    // Inicializar posición
    lastScrollY.current = window.scrollY;

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isScrolling]);

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative h-screen flex items-center justify-center overflow-hidden snap-start" 
      style={{ backgroundColor: '#1498d5' }}
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-linear-to-br from-[#1498d5] via-[#0e7ba8] to-[#0d6b94]" />
        <div className="absolute inset-0 bg-linear-to-r from-[#1498d5]/95 via-[#1498d5]/85 to-transparent" />
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
                <span className="h-px w-12 bg-white/40" />
                <span className="text-white/90 font-bold tracking-wider uppercase text-sm">
                  AVIXA Member
                </span>
              </div>
              
              <h1 className="uppercase text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6 drop-shadow-lg">
                Creemos en el <br/>
                Poder de <span className="text-transparent bg-clip-text bg-linear-to-r from-white via-white/95 to-white/90 drop-shadow-md">
                  Conectar Personas
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white/95 mb-10 max-w-2xl font-light leading-relaxed drop-shadow-md">
                Transformamos espacios con tecnología audiovisual. Simplificamos la complejidad tecnológica para crear entornos colaborativos, eficientes y de alto impacto.
              </p>
              {/* Botones de contacto y showreel */}
              {/* <div className="flex flex-col sm:flex-row gap-4">
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
              </div> */}
            </motion.div>
          </div>
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
