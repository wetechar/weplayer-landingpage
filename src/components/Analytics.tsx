'use client';

import { useEffect } from 'react';

// Tipos para eventos de analytics
interface AnalyticsEvent {
  action: string;
  category: string;
  label?: string;
  value?: number;
}

// Hook para tracking de eventos
export const useAnalytics = () => {
  const trackEvent = (event: AnalyticsEvent) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event.action, {
        event_category: event.category,
        event_label: event.label,
        value: event.value,
      });
    }
  };

  const trackPageView = (page: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag(
        'config',
        process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
        {
          page_path: page,
        }
      );
    }
  };

  return { trackEvent, trackPageView };
};

// Componente para tracking automático de scroll
export const ScrollTracker = () => {
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      // Track scroll milestones
      if (scrollPercent >= 25 && scrollPercent < 50) {
        trackScrollEvent('25%');
      } else if (scrollPercent >= 50 && scrollPercent < 75) {
        trackScrollEvent('50%');
      } else if (scrollPercent >= 75 && scrollPercent < 100) {
        trackScrollEvent('75%');
      } else if (scrollPercent >= 100) {
        trackScrollEvent('100%');
      }
    };

    const trackScrollEvent = (milestone: string) => {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'scroll', {
          event_category: 'engagement',
          event_label: `scroll_${milestone}`,
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
};

// Componente para tracking de clicks en botones
export const ButtonTracker = ({
  children,
  action,
  category = 'engagement',
  label,
}: {
  children: React.ReactNode;
  action: string;
  category?: string;
  label?: string;
}) => {
  const handleClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', action, {
        event_category: category,
        event_label: label,
      });
    }
  };

  return <div onClick={handleClick}>{children}</div>;
};

// Componente para tracking de formularios
export const FormTracker = ({
  children,
  formName,
}: {
  children: React.ReactNode;
  formName: string;
}) => {
  const handleSubmit = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'form_submit', {
        event_category: 'form',
        event_label: formName,
      });
    }
  };

  return <div onSubmit={handleSubmit}>{children}</div>;
};
