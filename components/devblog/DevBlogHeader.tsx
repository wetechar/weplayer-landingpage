'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft, Terminal } from 'lucide-react';

export default function DevBlogHeader() {
  const pathname = usePathname();
  const isIndex = pathname === '/devblog';

  return (
    <header className='fixed top-0 inset-x-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between'>
        <Link
          href='/devblog'
          className='flex items-center gap-2 group'
          aria-label='DevBlog'
        >
          <span className='inline-flex items-center justify-center w-8 h-8 rounded-md bg-brand-primary/15 text-brand-accent ring-1 ring-brand-primary/30 group-hover:bg-brand-primary/25 transition-colors'>
            <Terminal size={16} />
          </span>
          <span className='font-mono text-sm text-slate-200'>
            <span className='text-slate-500'>wetech</span>
            <span className='text-brand-accent'>/</span>
            <span className='font-semibold'>devblog</span>
          </span>
        </Link>

        <nav className='flex items-center gap-1 md:gap-4 text-sm'>
          {!isIndex && (
            <Link
              href='/devblog'
              className='hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-white/5 transition-colors'
            >
              <ArrowLeft size={14} />
              Todos los posts
            </Link>
          )}
          <a
            href='/#casos-exito'
            className='hidden md:inline-block px-3 py-1.5 text-slate-300 hover:text-white transition-colors'
          >
            Casos de éxito
          </a>
          <Link
            href='/'
            className='inline-flex items-center gap-1.5 px-4 py-1.5 rounded-md bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 transition-colors'
          >
            wetechlatam.com
          </Link>
        </nav>
      </div>
    </header>
  );
}
