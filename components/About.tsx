'use client';

import React from 'react';
import Image from 'next/image';

const About: React.FC = () => {
  return (
    <section id="about" className="bg-white scroll-mt-24 relative">
      <div className="relative">
        {/* AVIXA Member Logo - Top Right - Overlay sobre el banner */}
        <div className="">
          <div className="bg-white/95 backdrop-blur-sm px-4 rounded-lg shadow-lg">
            <div className="flex items-center justify-end">
              <Image
                src="/images/logos/avixa-member.png"
                alt="AVIXA Member"
                width={300}
                height={80}
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
        {/* Main Banner Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px] lg:min-h-[600px] relative">
          {/* Left Half - Background Image */}
          <div className="relative w-full h-full min-h-[400px] lg:min-h-[600px]">
            <Image
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop"
              alt="Persona trabajando con tecnología"
              fill
              className="object-cover grayscale brightness-90"
              priority
            />
          </div>

          {/* Right Half - Blue Information Panel */}
          <div
            className="flex flex-col justify-center px-6 md:px-10 lg:px-14 xl:px-16 py-10 lg:py-16"
            style={{ backgroundColor: '#1498D5' }}
          >
            <h2 className="text-white font-bold uppercase text-xl md:text-2xl lg:text-3xl xl:text-4xl leading-tight mb-6">
              WE TECH ES UNA EMPRESA INTEGRADORA DE TECNOLOGÍAS CON EXPERTISE EN AUDIO, VIDEO, COLABORACIÓN CORPORATIVA, IT Y ESPACIOS DE TRABAJO MODERNOS
            </h2>
            <p className="text-white text-sm md:text-base lg:text-lg leading-relaxed">
              Asesoramos en las mejores tecnologías para crear el mayor impacto en el ambiente de trabajo y promover cambios positivos. Creemos en el poder de conectar personas, estamos comprometidos en ayudar a nuestros clientes a tener impactos positivos, comunicacionales y colaborativos para su negocio.
            </p>
          </div>
        </div>

        {/* Bottom Text Section */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
          <h3
            className="text-2xl md:text-3xl lg:text-2xl xl:text-2xl font-bold uppercase leading-tight mb-6 text-left"
            style={{ color: '#1498D5' }}
          >
            <span className="block">LA COMUNICACIÓN HUMANA ES EL PROCESO DE MAYOR IMPACTO PARA</span>
            <span className="block"> LAS PERSONAS Y LAS ORGANIZACIONES</span>
          </h3>
          <p className="font-montserrat text-slate-800 text-lg md:text-xl lg:text-2xl leading-relaxed text-left tracking-normal">
            Nuestra misión es simplificar los aspectos técnicos y tecnológicos para optimizar la calidad de los intercambios aumentando la productividad.
          </p>
        </div>

      </div>

    </section>
  );
};

export default About;
