'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SERVICES } from '@/data/constants';

const Services: React.FC = () => {
  return (
    <section
      id='services'
      className='py-14 md:py-20 bg-slate-100 scroll-mt-[70px]'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className='text-center max-w-3xl mx-auto mb-10 md:mb-14'
        >
          <h2 className='text-brand-primary font-semibold tracking-wide uppercase text-xs md:text-sm mb-2'>
            Nuestras Soluciones
          </h2>
          <h3 className='text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3'>
            Ingeniería Audiovisual Integral
          </h3>
          <p className='text-slate-600 text-sm md:text-base leading-relaxed'>
            Desde el diseño conceptual hasta el soporte post-venta, cubrimos
            todo el ciclo de vida de tus proyectos tecnológicos.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6'>
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                delay: index * 0.08,
                duration: 0.6,
                ease: 'easeOut',
              }}
              className='group rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col'
            >
              {service.imageUrl && (
                <div className='relative w-full h-44 sm:h-48 md:h-52 shrink-0'>
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className='object-cover transition-transform duration-500 group-hover:scale-105'
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  />
                  <div className='absolute inset-0 bg-linear-to-t from-black/30 to-transparent md:opacity-0 group-hover:opacity-100 transition-opacity' />
                </div>
              )}

              <div className='flex flex-col flex-1 p-5 md:p-6'>
                <h4 className='text-base md:text-lg font-bold text-slate-900 mb-2 group-hover:text-brand-primary transition-colors'>
                  {service.title}
                </h4>
                <p className='text-slate-600 text-sm leading-relaxed mb-4 flex-1'>
                  {service.description}
                </p>
                <a
                  href='#contact'
                  className='inline-flex items-center text-sm font-semibold text-brand-primary group-hover:text-brand-accent transition-colors'
                  onClick={(e) => {
                    e.preventDefault();
                    document
                      .getElementById('contact')
                      ?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Conocer más</span>
                  <span className='ml-2'>→</span>
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
