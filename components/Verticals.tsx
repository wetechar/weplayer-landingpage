'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { VERTICALS } from '@/data/constants';
import { CheckCircle2 } from 'lucide-react';

const Verticals: React.FC = () => {
  const [activeVertical, setActiveVertical] = useState(VERTICALS[0]);

  return (
    <section id="verticals" className="py-24 bg-slate-900 text-white overflow-hidden scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">

          {/* Navigation/List Side */}
          <div className="lg:col-span-5">
            <h2 className="text-brand-accent font-semibold tracking-wide uppercase text-sm mb-3">
              Por Industria
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">
              Especialistas en tu Sector
            </h3>

            <div className="space-y-4">
              {VERTICALS.map((vertical) => (
                <button
                  key={vertical.id}
                  onClick={() => setActiveVertical(vertical)}
                  className={`w-full text-left p-6 rounded-xl transition-all duration-300 border ${activeVertical.id === vertical.id
                      ? 'bg-white/10 border-brand-primary shadow-lg shadow-brand-primary/10'
                      : 'bg-transparent border-transparent hover:bg-white/5'
                    }`}
                >
                  <h4 className={`text-xl font-bold mb-1 ${activeVertical.id === vertical.id ? 'text-brand-accent' : 'text-slate-300'}`}>
                    {vertical.title}
                  </h4>
                  <p className="text-sm text-slate-400 line-clamp-2">
                    {vertical.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Image & Detail Side */}
          <div className="lg:col-span-7 relative h-[500px] lg:h-auto rounded-2xl overflow-hidden bg-slate-800">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeVertical.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={activeVertical.imageUrl}
                  alt={activeVertical.title}
                  fill
                  className="object-cover opacity-60"
                  sizes="(max-width: 1024px) 100vw, 58vw"
                />
                <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-transparent to-transparent" />

                <div className="absolute bottom-0 left-0 p-8 sm:p-12">
                  <h4 className="text-2xl font-bold mb-4">{activeVertical.title}</h4>
                  <div className="flex flex-wrap gap-3">
                    {activeVertical.features.map((feature, idx) => (
                      <span key={idx} className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-sm">
                        <CheckCircle2 size={16} className="mr-2 text-brand-accent" />
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#contact"
                    className="inline-block mt-8 px-6 py-3 bg-brand-primary hover:bg-brand-accent rounded-lg text-white font-semibold transition-colors"
                  >
                    Ver casos de éxito
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Verticals;
