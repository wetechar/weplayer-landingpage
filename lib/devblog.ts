import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';

export interface PostFrontmatter {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  canonical?: string;
  audience?: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingMinutes: number;
}

export interface Post extends PostMeta {
  html: string;
  raw: string;
}

const POSTS_DIR = path.join(process.cwd(), 'devblog', 'posts');

marked.setOptions({
  gfm: true,
  breaks: false,
});

function estimateReadingMinutes(raw: string): number {
  const words = raw
    .replace(/```[\s\S]*?```/g, '')
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalizeFrontmatter(data: Record<string, unknown>): PostFrontmatter {
  return {
    title: String(data.title ?? 'Sin título'),
    date: String(data.date ?? ''),
    summary: String(data.summary ?? ''),
    tags: Array.isArray(data.tags) ? (data.tags as string[]) : [],
    canonical: data.canonical ? String(data.canonical) : undefined,
    audience: data.audience ? String(data.audience) : undefined,
  };
}

function readPostFile(filename: string): Post {
  const slug = filename.replace(/\.md$/i, '');
  const filePath = path.join(POSTS_DIR, filename);
  const source = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(source);
  const fm = normalizeFrontmatter(parsed.data);
  const html = marked.parse(parsed.content, { async: false }) as string;
  return {
    ...fm,
    slug,
    readingMinutes: estimateReadingMinutes(parsed.content),
    html,
    raw: parsed.content,
  };
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const p = readPostFile(f);
      const { html: _html, raw: _raw, ...meta } = p;
      return meta;
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | null {
  const filename = `${slug}.md`;
  const filePath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;
  return readPostFile(filename);
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/i, ''));
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count);
}

export function formatDate(iso: string): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('es-AR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
