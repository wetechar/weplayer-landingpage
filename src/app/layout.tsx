import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { StructuredData } from '../components/StructuredData';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'We Player - Solución Completa para Cartelería Digital',
  description:
    'Gestiona, programa y controla tu cartelería digital desde una plataforma centralizada. Monitoreo en tiempo real, programación avanzada y análisis detallado.',
  keywords: [
    'cartelería digital',
    'pantallas digitales',
    'gestión de contenido',
    'we player',
    'digital signage',
    'cartelería interactiva',
    'pantallas publicitarias',
    'gestión de dispositivos',
    'programación de contenido',
    'monitoreo en tiempo real',
    'análisis de rendimiento',
    'sincronización automática',
    'seguridad robusta',
    'interfaz centralizada',
    'Argentina',
    'Buenos Aires',
  ].join(', '),
  authors: [{ name: 'We Tech', url: 'https://wetechar.com' }],
  creator: 'We Tech',
  publisher: 'We Tech',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://weplayer-landing.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'We Player - Solución Completa para Cartelería Digital',
    description:
      'Gestiona, programa y controla tu cartelería digital desde una plataforma centralizada. Monitoreo en tiempo real, programación avanzada y análisis detallado.',
    type: 'website',
    locale: 'es_AR',
    url: 'https://weplayer-landing.vercel.app',
    siteName: 'We Player',
    images: [
      {
        url: '/images/logos/We-player.png',
        width: 1200,
        height: 630,
        alt: 'We Player - Cartelería Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Player - Solución Completa para Cartelería Digital',
    description:
      'Gestiona, programa y controla tu cartelería digital desde una plataforma centralizada.',
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
  verification: {
    google: 'googled1e17bc0538196b9.html',
    // yandex: 'tu-yandex-verification-code',
    // yahoo: 'tu-yahoo-verification-code',
  },
};

// Google Analytics 4
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <head>
        {/* Google Analytics 4 */}
        {GA_MEASUREMENT_ID && (
          <>
            <script
              async
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_MEASUREMENT_ID}', {
                    page_title: 'We Player Landing',
                    page_location: window.location.href,
                    send_page_view: true
                  });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <StructuredData />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
