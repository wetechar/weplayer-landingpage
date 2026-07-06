import Link from 'next/link';

export default function DevBlogFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className='mt-24 border-t border-white/10 bg-slate-950 text-slate-400'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-8 md:grid-cols-3'>
        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-brand-accent mb-3'>
            DevBlog
          </p>
          <p className='text-sm leading-relaxed text-slate-400'>
            Ingeniería, arquitectura y decisiones detrás de{' '}
            <span className='text-slate-200'>WEKODA IoT</span> — la plataforma
            de automatización y domótica de We Tech.
          </p>
        </div>

        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-slate-500 mb-3'>
            Navegar
          </p>
          <ul className='space-y-2 text-sm'>
            <li>
              <Link
                href='/devblog'
                className='hover:text-white transition-colors'
              >
                Todos los posts
              </Link>
            </li>
            <li>
              <Link href='/' className='hover:text-white transition-colors'>
                Landing principal
              </Link>
            </li>
            <li>
              <a
                href='/#contact'
                className='hover:text-white transition-colors'
              >
                Hablar con ingeniería
              </a>
            </li>
          </ul>
        </div>

        <div>
          <p className='font-mono text-xs uppercase tracking-widest text-slate-500 mb-3'>
            ¿Integrás IoT?
          </p>
          <p className='text-sm leading-relaxed mb-4'>
            Si estás evaluando una plataforma para tu producto o proyecto,
            hablemos.
          </p>
          <a
            href='/#contact'
            className='inline-flex items-center px-4 py-2 rounded-md bg-brand-primary hover:bg-brand-accent text-white font-semibold text-sm transition-colors'
          >
            Contactar
          </a>
        </div>
      </div>
      <div className='border-t border-white/5'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500 flex flex-col md:flex-row justify-between gap-2'>
          <p>© {year} We Tech Integration — WEKODA IoT.</p>
          <p className='font-mono'>Made for developers & integrators.</p>
        </div>
      </div>
    </footer>
  );
}
