
import React from 'react';
import { motion } from 'framer-motion';
import { PARTNERS } from '../constants';

const Partners: React.FC = () => {
  return (
    <section id="partners" className="bg-white py-16 border-b border-gray-100 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-sm font-semibold text-brand-primary uppercase tracking-widest mb-2">
            Partners Tecnológicos
          </p>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
            Colaboramos con los Mejores del Mundo
          </h2>
        </motion.div>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {PARTNERS.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className="group grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-60 hover:opacity-100"
            >
              <span className="text-xl md:text-2xl font-bold text-slate-600 group-hover:text-brand-dark transition-colors">
                {partner.name}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
