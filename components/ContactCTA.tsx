'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Download } from 'lucide-react';

const ContactCTA: React.FC = () => {
  return (
    <section
      id='contact-cta'
      className='py-24 bg-brand-primary relative overflow-hidden scroll-mt-[112px]'
    >
      {/* Abstract patterns */}
      <div className='absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl' />
      <div className='absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-brand-dark/10 blur-3xl' />

      <div className='relative max-w-4xl mx-auto px-4 text-center'>
        <h2 className='text-3xl md:text-5xl font-bold text-white mb-6'>
          ¿Listo para modernizar tu espacio?
        </h2>
        <p className='text-xl text-white/90 mb-10 leading-relaxed'>
          Agenda una demostración técnica o solicita una auditoría gratuita de
          tus instalaciones actuales. Nuestro equipo de ingenieros está listo
          para ayudarte.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className='flex flex-col sm:flex-row justify-center gap-4'
        >
          <a
            href='#contact'
            className='group flex items-center justify-center px-8 py-4 bg-white text-brand-primary font-bold rounded-lg shadow-xl hover:bg-gray-50 transition-all transform hover:-translate-y-1'
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Mail className='mr-2' size={20} />
            Contactar Especialista
          </a>
          <a
            href='#contact'
            className='group flex items-center justify-center px-8 py-4 bg-brand-dark/20 text-white border border-white/30 font-semibold rounded-lg hover:bg-brand-dark/30 transition-all'
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <Download className='mr-2' size={20} />
            Descargar Brochure
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactCTA;
