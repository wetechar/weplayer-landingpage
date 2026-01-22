'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { PARTNERS } from '@/data/constants';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="bg-white py-24 border-b border-gray-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-2">
            Partners Tecnológicos
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Colaboramos con los Mejores del Mundo
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Trabajamos con las marcas líderes en tecnología audiovisual y comunicaciones unificadas.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {PARTNERS.map((partner, index) => (
            <motion.a
              key={partner.name}
              href={partner.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden block"
            >
              {/* Imagen del partner */}
              {partner.imageUrl && (
                <div className="relative h-56 overflow-hidden bg-slate-200">
                  <Image
                    src={partner.imageUrl}
                    alt={partner.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              )}

              {/* Contenido */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors">
                  {partner.name}
                </h3>
                {partner.subtitle && (
                  <p className="text-sm font-semibold text-brand-primary mb-3">
                    {partner.subtitle}
                  </p>
                )}
                {partner.description && (
                  <p className="text-slate-600 leading-relaxed text-sm">
                    {partner.description}
                  </p>
                )}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
