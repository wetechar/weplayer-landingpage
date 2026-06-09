import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({ subsets: ['latin'] });
const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
});

export const metadata: Metadata = {
  title: 'We Tech | Integración Audiovisual y Soluciones Tecnológicas',
  description:
    'Transformamos espacios con tecnología audiovisual. Soluciones de colaboración, comunicaciones unificadas, señalización digital y domótica para empresas en Argentina.',
  keywords:
    'integración audiovisual, AV, comunicaciones unificadas, señalización digital, domótica, videoconferencia, Zoom, Teams, Crestron, Logitech, Argentina',
  authors: [{ name: 'We Tech' }],
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    url: 'https://wetechlatam.com/',
    title: 'We Tech | Integración Audiovisual y Soluciones Tecnológicas',
    description:
      'Transformamos espacios con tecnología audiovisual. Soluciones de colaboración, comunicaciones unificadas, señalización digital y domótica para empresas en Argentina.',
    images: ['https://wetechlatam.com/images/og-image.jpg'],
    locale: 'es_AR',
    siteName: 'We Tech',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'We Tech | Integración Audiovisual y Soluciones Tecnológicas',
    description:
      'Transformamos espacios con tecnología audiovisual. Soluciones de colaboración, comunicaciones unificadas, señalización digital y domótica para empresas en Argentina.',
    images: ['https://wetechlatam.com/images/og-image.jpg'],
  },
  icons: {
    icon: '/images/Vector-Wetechar.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='es'>
      <head>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'We Tech',
              url: 'https://wetechlatam.com',
              logo: 'https://wetechlatam.com/images/Vector-Wetechar.svg',
              description:
                'Empresa integradora de tecnología audiovisual enfocada en crear experiencias conectadas para entornos corporativos, comerciales y residenciales.',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Buenos Aires',
                addressCountry: 'AR',
              },
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+54-11-5555-0123',
                contactType: 'customer service',
                email: 'info@wetech.com.ar',
              },
              sameAs: [
                'https://www.linkedin.com/company/wetech',
                'https://www.instagram.com/wetech',
                'https://www.facebook.com/wetech',
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${inter.className} ${montserrat.variable}`}
        suppressHydrationWarning
      >
        <UserProvider>
          <div className='min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-brand-primary selection:text-white'>
            <Navbar />
            <main>{children}</main>
            <Footer />
          </div>
        </UserProvider>
      </body>
    </html>
  );
}
