'use client';

export const StructuredData = () => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'We Player',
    url: 'https://weplayer-landing.vercel.app',
    logo: 'https://weplayer-landing.vercel.app/images/logos/We-player.png',
    description:
      'Solución completa para cartelería digital. Gestiona, programa y controla tu cartelería digital desde una plataforma centralizada.',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buenos Aires',
      addressCountry: 'AR',
      addressRegion: 'Buenos Aires',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+54-11-1234-5678',
      email: 'ingenieria@wetechar.com',
      contactType: 'customer service',
      availableLanguage: 'Spanish',
    },
    sameAs: ['https://wetechar.com'],
    offers: {
      '@type': 'Offer',
      name: 'We Player - Solución de Cartelería Digital',
      description:
        'Plataforma completa para gestión de cartelería digital con monitoreo en tiempo real',
      category: 'Digital Signage Software',
      price: '0',
      priceCurrency: 'ARS',
      availability: 'https://schema.org/InStock',
    },
  };

  const softwareApplication = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'We Player',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web Browser',
    description:
      'Solución completa para cartelería digital con programación avanzada y monitoreo en tiempo real',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'ARS',
    },
    featureList: [
      'Programación Avanzada',
      'Gestión de Dispositivos',
      'Análisis en Tiempo Real',
      'Gestión de Grupos',
      'Sincronización Automática',
      'Seguridad Robusta',
    ],
  };

  const webSite = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'We Player Landing',
    url: 'https://weplayer-landing.vercel.app',
    description:
      'Landing page oficial de We Player - Solución de Cartelería Digital',
    potentialAction: {
      '@type': 'SearchAction',
      target:
        'https://weplayer-landing.vercel.app/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
  };

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplication),
        }}
      />
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webSite),
        }}
      />
    </>
  );
};
