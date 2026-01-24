'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/constants';

const Services: React.FC = () => {
  return (
    <section
      id="services"
      className="min-h-[calc(100vh-70px)] md:h-[calc(100vh-70px)] flex items-start md:items-center overflow-hidden snap-start"
    >
      {/* Content Container */}
      <div className="relative bg-slate-100 grid grid-cols-1 grid-rows-[minmax(0,auto)_minmax(0,1fr)] 
      md:grid-rows-[minmax(0,auto)_minmax(0,1fr)] w-full h-full">
        {/* Header Section */}
        <div className="min-h-0 w-full col-start-1 row-start-1 flex justify-center items-center py-2 md:py-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto px-4 md:px-0"
          >
            <h2 className="text-brand-primary font-semibold tracking-wide uppercase text-xs md:text-sm mb-1 md:mb-2">
              Nuestras Soluciones
            </h2>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-slate-900 mb-1 md:mb-2">
              Ingeniería Audiovisual Integral
            </h3>
            <p className="text-slate-600 text-sm md:text-base">
              Desde el diseño conceptual hasta el soporte post-venta, cubrimos todo el ciclo de vida de tus proyectos tecnológicos.
            </p>
          </motion.div>
        </div>

        {/* Services Grid Section */}
        <div className="min-h-0 overflow-hidden w-full col-start-1 row-start-2 flex justify-center items-center py-2 md:py-4">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 h-full">
              {SERVICES.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.8, ease: "easeOut" }}
                  className="group rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col h-full relative"
                >
                  {/* Imagen de fondo completa - solo en desktop */}
                  {service.imageUrl && (
                    <div className="hidden md:block absolute inset-0 z-0">
                      <Image
                        src={service.imageUrl}
                        alt={service.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                      {/* Overlay con gradiente de difuminado gradual - más claro en la parte superior */}
                      <div className="absolute inset-0" 
                           style={{ background: 'linear-gradient(to bottom, transparent 0%, transparent 55%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.4) 70%, rgba(0,0,0,0.7) 100%)' }} />
                    </div>
                  )}

                  {/* Contenido superpuesto - desde la mitad hacia abajo */}
                  <div className="relative z-10 p-4 md:p-6 flex flex-col flex-grow mt-[50%] md:mt-[50%]">
                    <h4 className="text-base md:text-lg font-bold text-slate-900 md:text-white mb-2 group-hover:text-white transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-slate-600 md:text-white/90 text-xs md:text-sm leading-relaxed mb-3 md:mb-4 flex-grow line-clamp-3">
                      {service.description}
                    </p>
                    <a
                      href="#contact"
                      className="flex items-center text-xs md:text-sm font-semibold text-brand-primary md:text-white opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0"
                    >
                      <span>Conocer más</span>
                      <span className="ml-2">→</span>
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
