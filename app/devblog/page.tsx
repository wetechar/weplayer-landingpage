import Link from 'next/link';
import { ArrowRight, Cpu, Radio, ShieldCheck, Waypoints } from 'lucide-react';
import PostCard from '@/components/devblog/PostCard';
import { getAllPosts, getAllTags } from '@/lib/devblog';

export const dynamic = 'force-static';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Zero Trust por defecto',
    body: 'El navegador jamás toca el broker. Una sola puerta que auditar: el backend.',
  },
  {
    icon: Waypoints,
    title: 'Contrato antes que UI',
    body: 'MQTT v2 documentado, versionado y validado. Todo se construye encima.',
  },
  {
    icon: Cpu,
    title: 'Multi-tenant y RBAC',
    body: 'Organizaciones, roles y auditoría — no un if agregado tarde.',
  },
  {
    icon: Radio,
    title: 'Firmware honesto',
    body: 'ESP32 + Ethernet. Timing en microsegundos, sin adivinar por el nombre.',
  },
];

export default function DevBlogIndexPage() {
  const posts = getAllPosts();
  const tags = getAllTags();
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Hero */}
      <section className='relative overflow-hidden border-b border-white/10'>
        <div
          aria-hidden
          className='absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.15),transparent_60%)]'
        />
        <div
          aria-hidden
          className='absolute inset-0 -z-10 opacity-[0.04] bg-[linear-gradient(to_right,rgba(255,255,255,.6)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.6)_1px,transparent_1px)] bg-[size:32px_32px]'
        />

        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28'>
          <p className='font-mono text-xs uppercase tracking-widest text-brand-accent mb-6'>
            $ wetech --devblog
          </p>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6 max-w-4xl'>
            Cómo se construye una plataforma IoT que{' '}
            <span className='text-brand-accent'>no colapsa</span> cuando pasa a
            producción.
          </h1>
          <p className='text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed mb-8'>
            Arquitectura, contratos, firmware y decisiones detrás de{' '}
            <span className='text-slate-200 font-semibold'>WEKODA IoT</span> —
            la plataforma de automatización y domótica de We Tech. Escrito para
            desarrolladores, CTOs, integradores y entusiastas de la
            infraestructura.
          </p>

          <div className='flex flex-wrap gap-3 mb-10'>
            <a
              href='#posts'
              className='inline-flex items-center gap-2 px-5 py-3 rounded-md bg-brand-primary hover:bg-brand-accent text-white font-semibold transition-colors'
            >
              Leer los posts
              <ArrowRight size={18} />
            </a>
            <Link
              href='/#contact'
              className='inline-flex items-center gap-2 px-5 py-3 rounded-md border border-white/15 hover:border-white/30 hover:bg-white/5 text-slate-200 font-medium transition-colors'
            >
              Hablar con ingeniería
            </Link>
          </div>

          <dl className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 max-w-3xl'>
            {[
              { k: 'posts', v: posts.length },
              { k: 'pilares', v: 4 },
              { k: 'ESP32 SKUs', v: '2+' },
              { k: 'stack', v: 'edge + cloud' },
            ].map((s) => (
              <div
                key={s.k}
                className='rounded-lg border border-white/10 bg-white/[0.02] px-4 py-3'
              >
                <dt className='font-mono text-[11px] uppercase tracking-widest text-slate-500'>
                  {s.k}
                </dt>
                <dd className='text-xl font-bold text-white mt-1'>{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Pillars */}
      <section className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20'>
        <div className='flex items-end justify-between flex-wrap gap-4 mb-10'>
          <div>
            <p className='font-mono text-xs uppercase tracking-widest text-brand-accent mb-2'>
              Los cuatro pilares
            </p>
            <h2 className='text-2xl md:text-3xl font-bold text-white'>
              Decisiones de diseño, no eslóganes.
            </h2>
          </div>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
          {PILLARS.map((p) => (
            <div
              key={p.title}
              className='rounded-xl border border-white/10 bg-slate-900/50 p-6 hover:border-brand-primary/30 transition-colors'
            >
              <div className='inline-flex items-center justify-center w-10 h-10 rounded-md bg-brand-primary/15 text-brand-accent ring-1 ring-brand-primary/30 mb-4'>
                <p.icon size={18} />
              </div>
              <h3 className='text-base font-semibold text-white mb-2'>
                {p.title}
              </h3>
              <p className='text-sm text-slate-400 leading-relaxed'>{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Posts */}
      <section
        id='posts'
        className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 scroll-mt-20'
      >
        <div className='flex items-end justify-between flex-wrap gap-4 mb-8'>
          <div>
            <p className='font-mono text-xs uppercase tracking-widest text-brand-accent mb-2'>
              Últimos posts
            </p>
            <h2 className='text-2xl md:text-3xl font-bold text-white'>
              Un pilar por post, una idea por lectura.
            </h2>
          </div>

          {tags.length > 0 && (
            <div className='flex flex-wrap gap-1.5 max-w-md'>
              {tags.slice(0, 8).map(({ tag, count }) => (
                <span
                  key={tag}
                  className='text-[11px] font-mono px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-slate-400'
                  title={`${count} post${count > 1 ? 's' : ''}`}
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {posts.length === 0 ? (
          <p className='text-slate-400'>Todavía no hay posts publicados.</p>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {featured && <PostCard post={featured} featured />}
            {rest.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
