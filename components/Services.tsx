'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SERVICES } from '@/constants';

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand-primary font-semibold tracking-wide uppercase text-sm mb-3">
            Nuestras Soluciones
          </h2>
          <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Ingeniería Audiovisual Integral
          </h3>
          <p className="text-slate-600 text-lg">
            Desde el diseño conceptual hasta el soporte post-venta, cubrimos todo el ciclo de vida de tus proyectos tecnológicos.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              {/* Imagen del servicio */}
              {service.imageUrl && (
                <div className="relative h-48 overflow-hidden bg-slate-200">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}
              
              {/* Contenido */}
              <div className="p-8">
                <div className="w-14 h-14 rounded-xl bg-brand-light text-brand-primary flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                  <service.icon size={28} />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand-primary transition-colors">
                  {service.title}
                </h4>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <a 
                  href="#contact" 
                  className="flex items-center text-sm font-semibold text-brand-primary opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span>Conocer más</span>
                  <span className="ml-2">→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
