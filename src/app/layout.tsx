import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
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
  keywords:
    'cartelería digital, pantallas digitales, gestión de contenido, we player, digital signage',
  authors: [{ name: 'We Tech' }],
  openGraph: {
    title: 'We Player - Solución Completa para Cartelería Digital',
    description:
      'Gestiona, programa y controla tu cartelería digital desde una plataforma centralizada.',
    type: 'website',
    locale: 'es_AR',
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
      <body>{children}</body>
    </html>
  );
}
