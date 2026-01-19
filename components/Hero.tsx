
import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, PlayCircle } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-brand-dark">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="w-full h-full bg-gradient-to-br from-brand-dark via-slate-800 to-brand-dark" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/95 via-brand-dark/85 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <span className="h-px w-12 bg-brand-accent" />
              <span className="text-brand-accent font-medium tracking-wider uppercase text-sm">
                AVIXA Member
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
              Soluciones tecnológicas <br/>
              para experiencias <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                excepcionales
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl font-light leading-relaxed">
              Servicios audiovisuales y de comunicaciones unificadas para TI. Transformamos espacios con tecnología de vanguardia que simplifica la complejidad y potencia la colaboración.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
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
            </div>
          </motion.div>
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
