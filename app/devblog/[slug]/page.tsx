import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock, Calendar, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import { getAllSlugs, getAllPosts, getPost, formatDate } from '@/lib/devblog';
import PostCard from '@/components/devblog/PostCard';

export const dynamic = 'force-static';

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: 'Post no encontrado — DevBlog' };
  return {
    title: `${post.title} — DevBlog | We Tech`,
    description: post.summary,
    keywords: post.tags.join(', '),
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.summary,
      url: `https://wetechlatam.com/devblog/${post.slug}`,
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return notFound();

  const related = getAllPosts()
    .filter(
      (p) =>
        p.slug !== post.slug &&
        p.tags.some((t) => post.tags.includes(t)),
    )
    .slice(0, 2);

  return (
    <article className='max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16'>
      <Link
        href='/devblog'
        className='inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white mb-8 transition-colors'
      >
        <ArrowLeft size={14} />
        Volver al DevBlog
      </Link>

      <header className='mb-10 pb-8 border-b border-white/10'>
        <div className='flex flex-wrap items-center gap-3 mb-5 text-xs font-mono text-slate-500'>
          <span className='inline-flex items-center gap-1'>
            <Calendar size={12} />
            {formatDate(post.date)}
          </span>
          <span aria-hidden>·</span>
          <span className='inline-flex items-center gap-1'>
            <Clock size={12} />
            {post.readingMinutes} min de lectura
          </span>
          {post.audience && (
            <>
              <span aria-hidden>·</span>
              <span className='uppercase tracking-widest text-brand-accent'>
                {post.audience}
              </span>
            </>
          )}
        </div>

        <h1 className='text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5'>
          {post.title}
        </h1>

        <p className='text-lg text-slate-400 leading-relaxed mb-6'>
          {post.summary}
        </p>

        <div className='flex flex-wrap gap-1.5'>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className='text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300'
            >
              #{tag}
            </span>
          ))}
        </div>
      </header>

      <div
        className='devblog-prose'
        dangerouslySetInnerHTML={{ __html: post.html }}
      />

      {post.canonical && (
        <aside className='mt-12 p-5 rounded-lg border border-white/10 bg-white/[0.03] flex items-start gap-4'>
          <div className='inline-flex items-center justify-center w-10 h-10 rounded-md bg-brand-primary/15 text-brand-accent ring-1 ring-brand-primary/30 shrink-0'>
            <BookOpen size={18} />
          </div>
          <div>
            <p className='font-mono text-[11px] uppercase tracking-widest text-slate-500 mb-1'>
              Documento canónico
            </p>
            <p className='text-slate-300 text-sm'>
              La fuente de verdad de este tema vive en{' '}
              <code className='px-1.5 py-0.5 rounded bg-slate-900 border border-white/10 text-brand-accent text-xs'>
                {post.canonical}
              </code>
              , dentro del monorepo de la plataforma.
            </p>
          </div>
        </aside>
      )}

      {/* CTA */}
      <div className='mt-14 rounded-xl border border-white/10 bg-linear-to-br from-brand-primary/15 to-transparent p-6 md:p-8'>
        <h3 className='text-xl font-bold text-white mb-2'>
          ¿Este es el tipo de infraestructura que tu proyecto necesita?
        </h3>
        <p className='text-slate-300 mb-5'>
          Hablemos de tu caso: automatización, domótica, integración AV o IoT a
          medida. Nuestro equipo trabaja con la misma plataforma que describimos
          en estos posts.
        </p>
        <Link
          href='/#contact'
          className='inline-flex items-center px-5 py-3 rounded-md bg-brand-primary hover:bg-brand-accent text-white font-semibold transition-colors'
        >
          Contactar al equipo
        </Link>
      </div>

      {related.length > 0 && (
        <section className='mt-16 pt-10 border-t border-white/10'>
          <p className='font-mono text-xs uppercase tracking-widest text-brand-accent mb-6'>
            Seguí leyendo
          </p>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
