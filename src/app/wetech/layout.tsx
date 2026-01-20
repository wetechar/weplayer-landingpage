import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WeTech LatAm - Integración de Tecnologías Audiovisuales',
  description:
    'WeTech es una empresa integradora de tecnologías con expertise en audio, video, colaboración corporativa, IT y espacios de trabajo modernos.',
  keywords: [
    'WeTech',
    'WeTech LatAm',
    'integración audiovisual',
    'audio profesional',
    'video conferencia',
    'colaboración corporativa',
    'IT empresarial',
    'catch box',
    'jabra',
    'logitech',
    'casio',
    'workspace collaboration',
    'managed services',
    'unified IT',
    'home entertainment',
    'Argentina',
    'Buenos Aires',
  ].join(', '),
  authors: [{ name: 'WeTech LatAm', url: 'https://wetechar.com' }],
  creator: 'WeTech LatAm',
  publisher: 'WeTech LatAm',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weplayer-landing.vercel.app'),
  alternates: {
    canonical: '/wetech',
  },
  openGraph: {
    title: 'WeTech LatAm - Integración de Tecnologías Audiovisuales',
    description:
      'WeTech es una empresa integradora de tecnologías con expertise en audio, video, colaboración corporativa, IT y espacios de trabajo modernos.',
    type: 'website',
    locale: 'es_AR',
    url: 'https://weplayer-landing.vercel.app/wetech',
    siteName: 'WeTech LatAm',
    images: [
      {
        url: '/images/logos/We-player.png',
        width: 1200,
        height: 630,
        alt: 'WeTech LatAm - Integración Audiovisual',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WeTech LatAm - Integración de Tecnologías Audiovisuales',
    description:
      'Empresa integradora de tecnologías con expertise en audio, video, colaboración corporativa, IT.',
    images: ['/images/logos/We-player.png'],
    creator: '@wetechar',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function WeTechLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
