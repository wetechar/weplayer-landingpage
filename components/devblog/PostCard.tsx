import Link from 'next/link';
import { ArrowUpRight, Clock } from 'lucide-react';
import { formatDate, type PostMeta } from '@/lib/devblog';

interface PostCardProps {
  post: PostMeta;
  featured?: boolean;
}

const TAG_STYLES = 'text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300';

export default function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Link
      href={`/devblog/${post.slug}`}
      className={`group relative flex flex-col justify-between rounded-xl border border-white/10 bg-slate-900/60 hover:bg-slate-900 hover:border-brand-primary/40 transition-all p-6 md:p-7 overflow-hidden ${
        featured ? 'md:col-span-2 md:min-h-[280px]' : ''
      }`}
    >
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity'
      />

      <div>
        <div className='flex items-center gap-3 mb-4 text-xs text-slate-500 font-mono'>
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span className='inline-flex items-center gap-1'>
            <Clock size={12} />
            {post.readingMinutes} min
          </span>
        </div>

        <h3
          className={`font-semibold text-white mb-3 group-hover:text-brand-accent transition-colors leading-tight ${
            featured ? 'text-2xl md:text-3xl' : 'text-xl'
          }`}
        >
          {post.title}
        </h3>

        <p className='text-slate-400 leading-relaxed text-sm md:text-base mb-5'>
          {post.summary}
        </p>
      </div>

      <div className='flex items-end justify-between gap-4 mt-4'>
        <div className='flex flex-wrap gap-1.5'>
          {post.tags.slice(0, featured ? 5 : 3).map((tag) => (
            <span key={tag} className={TAG_STYLES}>
              #{tag}
            </span>
          ))}
        </div>

        <span className='inline-flex items-center gap-1 text-brand-accent text-sm font-semibold shrink-0 opacity-0 group-hover:opacity-100 transition-opacity'>
          Leer
          <ArrowUpRight size={16} />
        </span>
      </div>
    </Link>
  );
}
