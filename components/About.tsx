'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Target, Zap } from 'lucide-react';

const About: React.FC = () => {
  const stats = [
    { icon: Award, value: '15+', label: 'Años de Experiencia' },
    { icon: Users, value: '500+', label: 'Proyectos Completados' },
    { icon: Target, value: '98%', label: 'Satisfacción del Cliente' },
    { icon: Zap, value: '24/7', label: 'Soporte Técnico' },
  ];

  return (
    <section id="about" className="py-24 bg-white scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-brand-primary font-semibold tracking-wide uppercase text-sm mb-3">
              Quiénes Somos
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Líderes en Integración Audiovisual
            </h3>
            <p className="text-lg text-slate-600 mb-6 leading-relaxed">
              Somos una empresa integradora de tecnología audiovisual enfocada en crear experiencias conectadas para entornos corporativos, comerciales y residenciales. Con más de 15 años de experiencia, transformamos espacios con soluciones tecnológicas de vanguardia.
            </p>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Nuestro equipo de ingenieros certificados diseña, implementa y gestiona proyectos AV/UC desde la concepción hasta el soporte post-venta, asegurando la máxima eficiencia y satisfacción del cliente.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-brand-light text-brand-primary rounded-full text-sm font-semibold">
                AVIXA Member
              </span>
              <span className="px-4 py-2 bg-brand-light text-brand-primary rounded-full text-sm font-semibold">
                Certificados Crestron
              </span>
              <span className="px-4 py-2 bg-brand-light text-brand-primary rounded-full text-sm font-semibold">
                Partners Autorizados
              </span>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-linear-to-br from-brand-light to-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow"
              >
                <stat.icon className="text-brand-primary mb-4" size={32} />
                <div className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
