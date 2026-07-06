import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import DevBlogHeader from '@/components/devblog/DevBlogHeader';
import DevBlogFooter from '@/components/devblog/DevBlogFooter';

export const metadata: Metadata = {
  title: 'DevBlog — WEKODA IoT | We Tech',
  description:
    'Blog técnico de We Tech y la plataforma WEKODA IoT. Arquitectura, MQTT, ESP32, edge computing y automatización para desarrolladores, CTOs e integradores.',
  keywords:
    'IoT, MQTT, ESP32, domótica, automatización, edge computing, WEKODA, plataforma IoT, arquitectura, zero trust, device shadow',
  openGraph: {
    type: 'website',
    url: 'https://wetechlatam.com/devblog',
    title: 'DevBlog — WEKODA IoT | We Tech',
    description:
      'Cómo construimos una plataforma IoT que integradores y desarrolladores pueden desplegar sin sorpresas.',
    siteName: 'We Tech DevBlog',
  },
};

export default function DevBlogLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen bg-slate-950 text-slate-100 selection:bg-brand-primary selection:text-white'>
      <DevBlogHeader />
      <main className='pt-20'>{children}</main>
      <DevBlogFooter />
    </div>
  );
}
