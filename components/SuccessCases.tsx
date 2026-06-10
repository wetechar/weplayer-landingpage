'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, ArrowUpRight } from 'lucide-react';
import { SUCCESS_CASES } from '@/data/constants';
import type { SuccessCase } from '@/types';

function CaseCard({
  project,
  index,
  className = '',
}: {
  project: SuccessCase;
  index: number;
  className?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const showVideo = Boolean(project.videoUrl) && videoReady && !videoFailed;

  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => undefined);
  };

  const handleMouseLeave = () => {
    const video = videoRef.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`group relative overflow-hidden rounded-2xl bg-slate-800 border border-white/10 ${className}`}
    >
      <div className='relative aspect-[4/3] md:aspect-auto md:absolute md:inset-0'>
        <Image
          src={project.imageUrl}
          alt={project.client}
          fill
          className={`object-cover transition-all duration-700 ${
            showVideo ? 'opacity-0 scale-105' : 'opacity-100 group-hover:scale-105'
          }`}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />

        {project.videoUrl && !videoFailed && (
          <video
            ref={videoRef}
            muted
            loop
            playsInline
            preload='metadata'
            poster={project.imageUrl}
            onLoadedData={() => setVideoReady(true)}
            onError={() => setVideoFailed(true)}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
              showVideo ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <source src={project.videoUrl} type='video/mp4' />
          </video>
        )}

        <div className='absolute inset-0 bg-linear-to-t from-slate-950 via-slate-950/50 to-transparent' />
      </div>

      <div className='relative md:absolute md:inset-x-0 md:bottom-0 p-5 md:p-6'>
        <div className='flex flex-wrap items-center gap-2 mb-3'>
          <span className='px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-brand-primary/90 text-white'>
            {project.sector}
          </span>
          {project.year && (
            <span className='px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/10 text-slate-300'>
              {project.year}
            </span>
          )}
          {project.featured && (
            <span className='px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full bg-white/15 text-brand-accent'>
              Destacado
            </span>
          )}
        </div>

        <h3 className='text-xl md:text-2xl font-bold text-white mb-1 group-hover:text-brand-accent transition-colors'>
          {project.client}
        </h3>
        <p className='text-sm font-medium text-brand-accent/90 mb-2'>
          {project.title}
        </p>

        <div className='flex items-center gap-1.5 text-slate-400 text-xs mb-3'>
          <MapPin size={13} className='shrink-0' />
          <span>{project.location}</span>
        </div>

        <p className='text-slate-300 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4'>
          {project.description}
        </p>

        <div className='flex flex-wrap gap-1.5 mb-4'>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className='px-2 py-0.5 text-[11px] rounded-md bg-white/8 text-slate-300 border border-white/10'
            >
              {tag}
            </span>
          ))}
        </div>

        <a
          href='#contact'
          className='inline-flex items-center gap-1.5 text-sm font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity'
          onClick={(e) => {
            e.preventDefault();
            document
              .getElementById('contact')
              ?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          Proyecto similar
          <ArrowUpRight size={16} />
        </a>
      </div>
    </motion.article>
  );
}

const SuccessCases: React.FC = () => {
  const featured = SUCCESS_CASES.find((c) => c.featured);
  const rest = SUCCESS_CASES.filter((c) => !c.featured);

  return (
    <section
      id='casos-exito'
      className='py-20 md:py-28 bg-slate-950 text-white overflow-hidden scroll-mt-[70px]'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12 md:mb-16 max-w-3xl mx-auto'
        >
          <p className='text-brand-accent font-semibold tracking-widest uppercase text-xs md:text-sm mb-3'>
            Portafolio
          </p>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4'>
            Casos de Éxito
          </h2>
          <p className='text-slate-400 text-base md:text-lg leading-relaxed'>
            Las últimas instalaciones de relevancia que demuestran nuestra
            capacidad de ingeniería, integración y soporte en proyectos
            audiovisuales de alto impacto.
          </p>
        </motion.div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 md:gap-6'>
          {featured && (
            <CaseCard
              project={featured}
              index={0}
              className='lg:col-span-7 lg:row-span-2 min-h-[420px] md:min-h-[520px]'
            />
          )}

          <div className='lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 md:gap-6'>
            {rest.slice(0, 2).map((project, index) => (
              <CaseCard
                key={project.id}
                project={project}
                index={index + 1}
                className='min-h-[320px] md:min-h-[248px]'
              />
            ))}
          </div>

          {rest.slice(2).map((project, index) => (
            <CaseCard
              key={project.id}
              project={project}
              index={index + 3}
              className='lg:col-span-4 min-h-[320px] md:min-h-[360px]'
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className='mt-12 text-center'
        >
          <a
            href='#contact'
            className='inline-flex items-center justify-center px-8 py-3.5 rounded-full bg-brand-primary text-white font-semibold hover:bg-brand-accent transition-colors shadow-lg shadow-brand-primary/25'
            onClick={(e) => {
              e.preventDefault();
              document
                .getElementById('contact')
                ?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            Consultá por tu próximo proyecto
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default SuccessCases;
