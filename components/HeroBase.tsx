'use client';

import React from 'react';
import Image from 'next/image';

const HeroBase: React.FC = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black">
      {/* Contenedor para mantener relación de aspecto - Ajustado para navbar fija */}
      <div className="absolute inset-x-0 top-20 md:top-24 bottom-0 w-full">
        <Image
          src="/images/hero/hero-base.png"
          alt="We Tech - Creemos en el Poder de Conectar Personas"
          fill
          className="object-contain"
          priority
          quality={95}
          sizes="100vw"
        />
      </div>
    </section>
  );
};

export default HeroBase;
