'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section
      id="about"
      className="min-h-[calc(100vh-70px)] md:h-[calc(100vh-70px)] flex items-start md:items-center overflow-hidden snap-start"
    >
      {/* Content Container */}
      <div className="relative bg-white/95 grid grid-cols-1 md:grid-cols-1 grid-rows-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] md:grid-rows-[minmax(0,1fr)_minmax(0,4fr)_minmax(0,2fr)] w-full h-full">
        {/* AVIXA Member Logo - Top Right - Overlay sobre el banner */}
        <div className="min-h-0 w-full col-start-1 row-start-1 place-self-end md:place-self-end-safe bg-white/95 backdrop-blur-sm px-4 rounded-lg shadow-lg z-10 py-2 md:py-0">
          <div className="relative h-[50px] md:h-[70px] flex justify-end">
            <Image
              src="/images/logos/avixa.png"
              alt="AVIXA Member"
              width={100}
              height={100}
              className="object-contain h-full w-auto"
            />
          </div>
        </div>
        {/* Main Banner Section */}
        <div className="min-h-0 overflow-hidden w-full col-start-1 row-start-2">
          <div className="grid grid-cols-1 md:grid-cols-2 relative h-full">
            {/* Left Half - Background Image */}
            <div className="relative w-full h-full min-h-[250px] md:min-h-0">
              <Image
                src="/images/about/about-workspace.avif"
                alt="Persona trabajando con tecnología"
                fill
                className="object-cover grayscale brightness-90"
                priority
              />
            </div>
            {/* Right Half - Blue Information Panel */}
            <div
              className="flex flex-col justify-center px-4 md:px-10 lg:px-14 xl:px-16 py-6 md:py-6 lg:py-8 overflow-auto min-h-[300px] md:min-h-0"
              style={{ backgroundColor: '#1498D5' }}
            >
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-right text-white font-bold uppercase text-lg md:text-xl lg:text-2xl xl:text-3xl leading-tight mb-4 md:mb-6">
                  WE TECH ES UNA EMPRESA INTEGRADORA DE TECNOLOGÍAS CON EXPERTISE EN AUDIO, VIDEO, COLABORACIÓN CORPORATIVA, IT Y ESPACIOS DE TRABAJO MODERNOS
                </h2>
                <p className="text-right text-white text-xs md:text-sm lg:text-base leading-relaxed">
                  Asesoramos en las mejores tecnologías para crear el mayor impacto en el ambiente de trabajo y promover cambios positivos. Creemos en el poder de conectar personas, estamos comprometidos en ayudar a nuestros clientes a tener impactos positivos, comunicacionales y colaborativos para su negocio.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
        {/* Bottom Text Section */}
        <div className="min-h-0 overflow-auto w-full col-start-1 row-start-3 flex justify-center items-start md:items-center py-4 md:py-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <div className="mx-auto flex flex-col justify-start gap-4 md:gap-6 w-full max-w-3xl px-4 md:px-0">
              <h3
                className="text-left text-xl text-blue-500 font-bold uppercase leading-tight"
                style={{ color: '#1498D5' }}
              >
                <span className="block">LA COMUNICACIÓN HUMANA ES EL PROCESO DE MAYOR IMPACTO PARA</span>
                <span className="block">LAS PERSONAS Y LAS ORGANIZACIONES</span>
              </h3>
              <p className="font-montserrat text-slate-800 text-left text-base">
                Nuestra misión es simplificar los aspectos técnicos y tecnológicos para optimizar la calidad de los intercambios aumentando la productividad.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
