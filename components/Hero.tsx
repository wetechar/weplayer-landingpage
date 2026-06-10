'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import LogoHexagonal from './logos/LogoHexagonal';
import HeroTriptico from './HeroTriptico';
import HeroVideo from './HeroVideo';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollY = useRef(0);
  const hasTriggeredAutoScroll = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!heroRef.current || isScrolling) return;

      const currentScrollY = window.scrollY;
      const heroBottom =
        heroRef.current.offsetTop + heroRef.current.offsetHeight;
      const heroTop = heroRef.current.offsetTop;
      const viewportHeight = window.innerHeight;

      // Detectar si el usuario está dentro del Hero
      const isInHero =
        currentScrollY >= heroTop - 50 &&
        currentScrollY < heroBottom - viewportHeight * 0.5;
      const isNearHeroBottom =
        currentScrollY >= heroBottom - viewportHeight * 0.7;

      // Determinar dirección del scroll
      const scrollDelta = currentScrollY - lastScrollY.current;
      const isScrollingDown = scrollDelta > 0;

      // Si el usuario está cerca del final del Hero y comienza a hacer scroll hacia abajo
      if (
        isInHero &&
        isScrollingDown &&
        isNearHeroBottom &&
        !hasTriggeredAutoScroll.current
      ) {
        // Limpiar timeout anterior
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        // Esperar un momento para confirmar la intención de scroll (mínimo 50px de scroll)
        if (Math.abs(scrollDelta) > 5) {
          scrollTimeoutRef.current = setTimeout(() => {
            const nextSection = document.getElementById('partners');
            if (
              nextSection &&
              !isScrolling &&
              !hasTriggeredAutoScroll.current
            ) {
              hasTriggeredAutoScroll.current = true;
              setIsScrolling(true);

              // Calcular posición objetivo (centrar el siguiente componente)
              const targetPosition = nextSection.offsetTop - 112; // Ajuste para el navbar (min-h-[112px])

              // Scroll suave hacia el siguiente componente
              window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
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
      id='hero'
      className='relative h-[calc(100vh-10px)] flex items-center overflow-hidden snap-start bg-brand-blue'
    >
      {/* Sombra muy leve en el fondo */}
      <div className='absolute inset-0 z-0 shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]' />
      {/* Content Container */}
      <div className='relative grid grid-cols-1 grid-rows-2 
                                                md:grid-rows-[55%_45%]
                                                w-full h-full'>
        {/* Video Section - Full Width */}
        <div className='flex items-center justify-center w-full h-full'>
          <HeroVideo />
        </div>
        {/* Text Content Section - With max-width */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-20 xl:gap-24 items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full'>
          {/* Text Content - Left Side */}
          <div className='flex flex-col justify-center text-left'>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <h1 className='text-white font-black uppercase leading-tight mb-6'>
                <span className='block text-4xl md:text-4xl lg:text-5xl xl:text-6xl mb-2'>
                  CREEMOS EN
                </span>
                <span className='block text-4xl md:text-4xl lg:text-5xl xl:text-6xl mb-2'>
                  EL PODER
                </span>
                <span className='block text-4xl md:text-4xl lg:text-5xl xl:text-6xl mb-2'>
                  DE CONECTAR
                </span>
                <span className='block text-4xl md:text-4xl lg:text-5xl xl:text-6xl mb-6'>
                  PERSONAS
                </span>
              </h1>

              {/* Línea de subrayado final - ancho total del texto */}
              <div className='h-1 bg-white w-full' />
            </motion.div>
          </div>

          {/* Logo - Right Side (oculto en mobile, visible desde md) */}
          <div className='hidden md:flex items-center justify-end'>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
              className='relative'
            >
              <div className='relative w-48 h-48 md:w-56 md:h-56 lg:w-72 lg:h-72 xl:w-80 xl:h-80 text-white'>
                <LogoHexagonal color='white' />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className='absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-white/30'
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className='w-6 h-10 border-2 border-current rounded-full flex justify-center p-2'>
          <div className='w-1 h-1 bg-current rounded-full' />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
