'use client';

import { useEffect, useRef } from 'react';

// Componente para tracking de engagement con Vercel Analytics
export const VercelAnalyticsTracker = () => {
  const pageLoadTime = useRef<number>(Date.now());
  const hasTrackedPageView = useRef<boolean>(false);

  useEffect(() => {
    // Track page view
    if (!hasTrackedPageView.current) {
      // Vercel Analytics automáticamente trackea page views
      hasTrackedPageView.current = true;
    }

    // Track page load time
    const trackPageLoadTime = () => {
      const loadTime = Date.now() - pageLoadTime.current;
      
      // Enviar métrica de tiempo de carga a Vercel Analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'page_load_time', {
          value: loadTime,
          category: 'performance',
        });
      }
    };

    // Track después de que la página esté completamente cargada
    if (document.readyState === 'complete') {
      trackPageLoadTime();
    } else {
      window.addEventListener('load', trackPageLoadTime);
    }

    return () => {
      window.removeEventListener('load', trackPageLoadTime);
    };
  }, []);

  return null;
};

// Componente para tracking de interacciones específicas
export const InteractionTracker = () => {
  const interactionCount = useRef<number>(0);

  useEffect(() => {
    const trackInteraction = (type: string, element: string) => {
      interactionCount.current += 1;
      
      // Track con Vercel Analytics
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', type, {
          element,
          interaction_count: interactionCount.current,
          category: 'engagement',
        });
      }
    };

    // Track clicks en elementos importantes
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const elementType = target.tagName.toLowerCase();
      const elementClass = target.className || '';
      const elementId = target.id || '';

      // Identificar elementos importantes
      if (elementClass.includes('btn') || elementClass.includes('button')) {
        trackInteraction('button_click', elementId || elementClass);
      } else if (elementType === 'a') {
        trackInteraction('link_click', elementId || elementClass);
      } else if (elementClass.includes('form')) {
        trackInteraction('form_interaction', elementId || elementClass);
      }
    };

    // Track scroll depth
    let maxScrollDepth = 0;
    const handleScroll = () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScrollDepth) {
        maxScrollDepth = scrollPercent;
        
        // Track milestones de scroll
        if (maxScrollDepth >= 25 && maxScrollDepth < 50) {
          trackInteraction('scroll_milestone', '25%');
        } else if (maxScrollDepth >= 50 && maxScrollDepth < 75) {
          trackInteraction('scroll_milestone', '50%');
        } else if (maxScrollDepth >= 75 && maxScrollDepth < 100) {
          trackInteraction('scroll_milestone', '75%');
        } else if (maxScrollDepth >= 100) {
          trackInteraction('scroll_milestone', '100%');
        }
      }
    };

    // Track tiempo en página
    let timeOnPage = 0;
    const startTime = Date.now();
    
    const trackTimeOnPage = () => {
      timeOnPage = Math.round((Date.now() - startTime) / 1000);
      
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'time_on_page', {
          value: timeOnPage,
          category: 'engagement',
        });
      }
    };

    // Event listeners
    document.addEventListener('click', handleClick);
    window.addEventListener('scroll', handleScroll);
    
    // Track tiempo cada 30 segundos
    const timeInterval = setInterval(trackTimeOnPage, 30000);
    
    // Track cuando el usuario sale de la página
    const handleBeforeUnload = () => {
      trackTimeOnPage();
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      document.removeEventListener('click', handleClick);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      clearInterval(timeInterval);
      trackTimeOnPage(); // Track final time
    };
  }, []);

  return null;
};

// Componente para tracking de performance
export const PerformanceTracker = () => {
  useEffect(() => {
    // Track Core Web Vitals cuando estén disponibles
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            const lcp = entry.startTime;
            
            if (typeof window !== 'undefined' && (window as any).va) {
              (window as any).va('track', 'lcp', {
                value: lcp,
                category: 'performance',
              });
            }
          }
          
          if (entry.entryType === 'first-input') {
            const fid = entry.processingStart - entry.startTime;
            
            if (typeof window !== 'undefined' && (window as any).va) {
              (window as any).va('track', 'fid', {
                value: fid,
                category: 'performance',
              });
            }
          }
        }
      });

      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });

      return () => observer.disconnect();
    }
  }, []);

  return null;
};

// Componente para tracking de errores
export const ErrorTracker = () => {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'error', {
          message: event.message,
          filename: event.filename,
          lineno: event.lineno,
          category: 'error',
        });
      }
    };

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      if (typeof window !== 'undefined' && (window as any).va) {
        (window as any).va('track', 'unhandled_rejection', {
          reason: event.reason,
          category: 'error',
        });
      }
    };

    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handleUnhandledRejection);

    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handleUnhandledRejection);
    };
  }, []);

  return null;
};

// Hook para tracking personalizado con Vercel Analytics
export const useVercelAnalytics = () => {
  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (typeof window !== 'undefined' && (window as any).va) {
      (window as any).va('track', eventName, {
        ...properties,
        timestamp: Date.now(),
      });
    }
  };

  const trackConversion = (conversionType: string, value?: number) => {
    trackEvent('conversion', {
      type: conversionType,
      value,
      category: 'conversion',
    });
  };

  const trackFeatureUsage = (featureName: string) => {
    trackEvent('feature_usage', {
      feature: featureName,
      category: 'engagement',
    });
  };

  return { trackEvent, trackConversion, trackFeatureUsage };
}; 