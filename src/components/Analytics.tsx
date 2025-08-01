'use client';

import { useEffect, useRef } from 'react';

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

  const trackTiming = (category: string, variable: string, time: number) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'timing_complete', {
        name: variable,
        value: time,
        event_category: category,
      });
    }
  };

  return { trackEvent, trackPageView, trackTiming };
};

// Componente para tracking automático de scroll
export const ScrollTracker = () => {
  const scrollMilestones = useRef<Set<number>>(new Set());

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100
      );

      // Track scroll milestones (solo una vez por milestone)
      if (scrollPercent >= 25 && !scrollMilestones.current.has(25)) {
        trackScrollEvent('25%');
        scrollMilestones.current.add(25);
      } else if (scrollPercent >= 50 && !scrollMilestones.current.has(50)) {
        trackScrollEvent('50%');
        scrollMilestones.current.add(50);
      } else if (scrollPercent >= 75 && !scrollMilestones.current.has(75)) {
        trackScrollEvent('75%');
        scrollMilestones.current.add(75);
      } else if (scrollPercent >= 100 && !scrollMilestones.current.has(100)) {
        trackScrollEvent('100%');
        scrollMilestones.current.add(100);
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

// Componente para tracking de tiempo en página
export const TimeOnPageTracker = () => {
  const startTime = useRef<number>(Date.now());
  const hasTracked = useRef<boolean>(false);

  useEffect(() => {
    const trackTimeOnPage = () => {
      if (!hasTracked.current) {
        const timeSpent = Math.round((Date.now() - startTime.current) / 1000);
        
        if (typeof window !== 'undefined' && (window as any).gtag) {
          (window as any).gtag('event', 'timing_complete', {
            name: 'time_on_page',
            value: timeSpent,
            event_category: 'engagement',
            event_label: 'page_visit',
          });
        }
        
        hasTracked.current = true;
      }
    };

    // Track cuando el usuario sale de la página
    const handleBeforeUnload = () => {
      trackTimeOnPage();
    };

    // Track después de 30 segundos
    const timeoutId = setTimeout(trackTimeOnPage, 30000);

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      trackTimeOnPage();
    };
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

// Componente para tracking de interacciones con videos
export const VideoTracker = ({
  children,
  videoName,
}: {
  children: React.ReactNode;
  videoName: string;
}) => {
  const handleVideoEvent = (event: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', event, {
        event_category: 'video',
        event_label: videoName,
      });
    }
  };

  return (
    <div
      onPlay={() => handleVideoEvent('video_play')}
      onPause={() => handleVideoEvent('video_pause')}
      onEnded={() => handleVideoEvent('video_complete')}
    >
      {children}
    </div>
  );
};

// Componente para tracking de hover en elementos
export const HoverTracker = ({
  children,
  elementName,
}: {
  children: React.ReactNode;
  elementName: string;
}) => {
  const hasTracked = useRef<boolean>(false);

  const handleMouseEnter = () => {
    if (!hasTracked.current) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'hover', {
          event_category: 'engagement',
          event_label: elementName,
        });
      }
      hasTracked.current = true;
    }
  };

  return <div onMouseEnter={handleMouseEnter}>{children}</div>;
};
