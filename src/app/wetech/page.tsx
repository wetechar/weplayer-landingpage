'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  XCircle,
  Loader2,
  Mail,
  Phone,
  MapPin,
  Clock,
  Users,
  Zap,
  Shield,
  BarChart3,
  Calendar,
  Smartphone,
  Building,
  ArrowRight,
  ChevronRight,
  Headphones,
  Monitor,
  Settings,
  Video,
  Mic,
  WifiIcon,
  Home,
  ArrowLeft,
} from 'lucide-react';
import { WeplayerLogo } from '../../components/WeplayerLogo';
import Link from 'next/link';

import {
  useAnalytics,
  ScrollTracker,
  ButtonTracker,
  FormTracker,
  TimeOnPageTracker,
  HoverTracker,
} from '../../components/Analytics';
import {
  VercelAnalyticsTracker,
  InteractionTracker,
  PerformanceTracker,
  ErrorTracker,
  useVercelAnalytics,
} from '../../components/VercelAnalytics';

function ClientOnly({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
}

export default function WeTechPage() {
  const { trackEvent } = useAnalytics();
  const {
    trackEvent: trackVercelEvent,
    trackConversion,
    trackFeatureUsage,
  } = useVercelAnalytics();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Validación básica
      if (
        !formData.nombre.trim() ||
        !formData.email.trim() ||
        !formData.mensaje.trim()
      ) {
        throw new Error('Por favor completa todos los campos');
      }

      // Validación de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Por favor ingresa un email válido');
      }

      // Enviar datos a la API route
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre.trim(),
          email: formData.email.trim(),
          mensaje: `[WeTech LatAm] ${formData.mensaje.trim()}`,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Error al enviar el formulario');
      }

      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', mensaje: '' });

      // Trackear evento de éxito
      trackEvent({
        action: 'form_submit_success',
        category: 'wetech_contact',
        label: 'wetech_contact_form',
      });

      // Trackear conversión con Vercel Analytics
      trackConversion('wetech_contact_form_submit', 1);
      trackVercelEvent('wetech_form_submit_success', {
        form_type: 'wetech_contact',
        user_email: formData.email,
      });

      console.log('✅ Formulario WeTech enviado exitosamente');
    } catch (error: any) {
      console.error('❌ Error al enviar formulario WeTech:', error);
      setSubmitStatus('error');

      // Trackear evento de error
      trackEvent({
        action: 'form_submit_error',
        category: 'wetech_contact',
        label: 'wetech_contact_form',
      });

      // Trackear error con Vercel Analytics
      trackVercelEvent('wetech_form_submit_error', {
        form_type: 'wetech_contact',
        error_message: error.message,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ClientOnly>
      <ScrollTracker />
      <TimeOnPageTracker />
      <VercelAnalyticsTracker />
      <InteractionTracker />
      <PerformanceTracker />
      <ErrorTracker />
      <div className='min-h-screen bg-gradient-hero'>
        {/* Navigation */}
        <nav className='fixed top-0 w-full nav-glass z-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <Link href='/' className='flex items-center gap-3'>
                  <ArrowLeft className='w-5 h-5 text-gray-600 hover:text-weplayer-blue transition-colors' />
                  <WeplayerLogo className='h-8 w-auto' />
                </Link>
                <div className='ml-6 h-6 w-px bg-gray-300'></div>
                <h1 className='ml-6 text-xl font-bold text-gray-900'>
                  WeTech LatAm
                </h1>
              </div>
              <div className='hidden md:flex items-center space-x-8'>
                <a
                  href='#services'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Servicios
                </a>
                <a
                  href='#products'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Productos
                </a>
                <a
                  href='#contact'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Contacto
                </a>
                <ButtonTracker
                  action='click'
                  category='wetech_navigation'
                  label='solicitar_info_nav'
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className='btn-primary text-white px-6 py-2 rounded-lg'
                  >
                    Solicitar Información
                  </motion.button>
                </ButtonTracker>
              </div>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className='pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative'>
          {/* Elemento decorativo rojo */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-60'></div>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
              {/* Contenido de texto */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className='text-center lg:text-left'
              >
                <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
                  CREEMOS EN
                  <span className='text-weplayer-blue block'>
                    EL PODER DE CONECTAR
                  </span>
                  <span className='text-weplayer-red block'>PERSONAS</span>
                </h1>
                <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto lg:mx-0'>
                  WeTech es una empresa integradora de tecnologías con expertise
                  en audio, video, colaboración corporativa, IT y espacios de
                  trabajo modernos.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center lg:justify-start'>
                  <ButtonTracker
                    action='click'
                    category='wetech_hero'
                    label='ver_servicios'
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToServices}
                      className='btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2'
                    >
                      <ArrowRight className='w-5 h-5' />
                      Ver Servicios
                    </motion.button>
                  </ButtonTracker>
                  <ButtonTracker
                    action='click'
                    category='wetech_hero'
                    label='solicitar_informacion'
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToContact}
                      className='btn-accent text-white px-8 py-4 rounded-lg text-lg font-semibold'
                    >
                      Solicitar Información
                    </motion.button>
                  </ButtonTracker>
                </div>
              </motion.div>

              {/* Imagen corporativa */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className='relative'
              >
                <div className='bg-white p-8 rounded-xl shadow-2xl card-hover border border-gray-200'>
                  <h3 className='text-2xl font-semibold text-gray-900 mb-6 text-center'>
                    Integración Audiovisual Profesional
                  </h3>

                  <div className='grid grid-cols-2 gap-4 mb-6'>
                    <div className='text-center p-4 bg-gradient-to-br from-weplayer-blue/10 to-weplayer-blue/5 rounded-lg'>
                      <Headphones className='w-8 h-8 text-weplayer-blue mx-auto mb-2' />
                      <p className='text-sm font-medium text-gray-700'>AUDIO</p>
                    </div>
                    <div className='text-center p-4 bg-gradient-to-br from-weplayer-red/10 to-weplayer-red/5 rounded-lg'>
                      <Video className='w-8 h-8 text-weplayer-red mx-auto mb-2' />
                      <p className='text-sm font-medium text-gray-700'>VIDEO</p>
                    </div>
                    <div className='text-center p-4 bg-gradient-to-br from-green-500/10 to-green-500/5 rounded-lg'>
                      <Settings className='w-8 h-8 text-green-500 mx-auto mb-2' />
                      <p className='text-sm font-medium text-gray-700'>
                        CONTROL
                      </p>
                    </div>
                    <div className='text-center p-4 bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-lg'>
                      <Users className='w-8 h-8 text-purple-500 mx-auto mb-2' />
                      <p className='text-sm font-medium text-gray-700'>
                        COLABORACIÓN
                      </p>
                    </div>
                  </div>

                  <div className='text-center'>
                    <div className='inline-flex items-center gap-2 bg-gradient-to-r from-weplayer-red/10 to-weplayer-blue/10 px-6 py-3 rounded-full'>
                      <Zap className='w-5 h-5 text-weplayer-red' />
                      <span className='text-sm font-medium text-gray-700'>
                        Soluciones Integrales de Tecnología
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-section relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-50'></div>
          <div className='max-w-7xl mx-auto text-center'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='max-w-4xl mx-auto'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-8'>
                La comunicación humana es el proceso de mayor impacto para las
                personas y las organizaciones
              </h2>
              <div className='w-20 h-1 bg-weplayer-red mx-auto rounded-full'></div>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section id='services' className='py-16 px-4 sm:px-6 lg:px-8 relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-28 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-50'></div>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Servicios
                <span className='text-weplayer-red block text-2xl md:text-3xl font-medium mt-1'>
                  WeTech LatAm
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Soluciones tecnológicas integrales para empresas modernas
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: <Users className='w-8 h-8' />,
                  title: 'Workspace Collaboration',
                  description:
                    'Soluciones de colaboración para espacios de trabajo modernos y eficientes.',
                },
                {
                  icon: <WifiIcon className='w-8 h-8' />,
                  title: 'Unified IT',
                  description:
                    'Integración y gestión unificada de infraestructura tecnológica.',
                },
                {
                  icon: <Shield className='w-8 h-8' />,
                  title: 'Managed Services Provider',
                  description:
                    'Proveedor de servicios gestionados para mantener tu tecnología funcionando.',
                },
                {
                  icon: <Home className='w-8 h-8' />,
                  title: 'Home Entertainment Gear',
                  description:
                    'Equipos y sistemas de entretenimiento para el hogar.',
                },
                {
                  icon: <Building className='w-8 h-8' />,
                  title: 'Vertical Market Solutions',
                  description:
                    'Soluciones especializadas para mercados verticales específicos.',
                },
                {
                  icon: <Zap className='w-8 h-8' />,
                  title: 'Professional Partnership',
                  description:
                    'Alianzas profesionales para proyectos de integración tecnológica.',
                },
              ].map((service, index) => (
                <HoverTracker
                  key={index}
                  elementName={service.title.toLowerCase().replace(/\s+/g, '_')}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className='group bg-white p-6 rounded-xl shadow-lg card-hover hover-lift'
                    onMouseEnter={() => {
                      setHoveredCard(index);
                      trackEvent({
                        action: 'service_hover',
                        category: 'wetech_engagement',
                        label: service.title.toLowerCase().replace(/\s+/g, '_'),
                      });
                      trackFeatureUsage(
                        service.title.toLowerCase().replace(/\s+/g, '_')
                      );
                    }}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <div className='text-weplayer-blue mb-4'>
                      {service.icon}
                    </div>
                    <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                      {service.title}
                    </h3>
                    <p className='text-gray-600'>{service.description}</p>
                    <div className='mt-4 w-8 h-0.5 bg-weplayer-red rounded-full'></div>
                  </motion.div>
                </HoverTracker>
              ))}
            </div>
          </div>
        </section>

        {/* Technologies Section */}
        <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-section relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-60'></div>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                SONIDO | VIDEO | CONTROL | COLABORACIÓN | IT
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Tecnologías integradas para una experiencia completa
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8'>
              {[
                {
                  icon: <Headphones className='w-12 h-12' />,
                  title: 'SONIDO',
                  description: 'Sistemas de audio profesional',
                },
                {
                  icon: <Video className='w-12 h-12' />,
                  title: 'VIDEO',
                  description: 'Soluciones audiovisuales avanzadas',
                },
                {
                  icon: <Settings className='w-12 h-12' />,
                  title: 'CONTROL',
                  description: 'Sistemas de control inteligente',
                },
                {
                  icon: <Users className='w-12 h-12' />,
                  title: 'Colaboración',
                  description: 'Herramientas de trabajo colaborativo',
                },
                {
                  icon: <Monitor className='w-12 h-12' />,
                  title: 'IT',
                  description: 'Infraestructura tecnológica',
                },
              ].map((tech, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='text-center'
                >
                  <div className='bg-white p-6 rounded-xl shadow-lg card-hover hover-lift'>
                    <div className='text-weplayer-blue mb-4 flex justify-center'>
                      {tech.icon}
                    </div>
                    <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                      {tech.title}
                    </h3>
                    <p className='text-sm text-gray-600'>{tech.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Products Section */}
        <section id='products' className='py-16 px-4 sm:px-6 lg:px-8 relative'>
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-50'></div>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Productos Destacados
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Solicite una prueba gratuita de producto
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
              {[
                {
                  icon: <Mic className='w-8 h-8' />,
                  title: 'CATCH-BOX',
                  subtitle: 'El Micrófono Móvil',
                  description:
                    'Solución innovadora para presentaciones interactivas',
                },
                {
                  icon: <Headphones className='w-8 h-8' />,
                  title: 'JABRA',
                  subtitle: 'Altavoces, auriculares y cámaras PRO',
                  description:
                    'Equipos profesionales para comunicación empresarial',
                },
                {
                  icon: <Monitor className='w-8 h-8' />,
                  title: 'CASIO',
                  subtitle: 'Proyector LED-Lamp FREE',
                  description: 'Proyectores sin mantenimiento de lámpara',
                },
                {
                  icon: <Video className='w-8 h-8' />,
                  title: 'LOGITECH',
                  subtitle: 'Videoconferencia simplificada',
                  description: 'Soluciones completas para salas de reuniones',
                },
              ].map((product, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white p-6 rounded-xl shadow-lg card-hover hover-lift'
                >
                  <div className='text-weplayer-blue mb-4'>{product.icon}</div>
                  <h3 className='text-xl font-bold text-gray-900 mb-1'>
                    {product.title}
                  </h3>
                  <h4 className='text-sm font-medium text-weplayer-red mb-3'>
                    {product.subtitle}
                  </h4>
                  <p className='text-gray-600 text-sm'>{product.description}</p>
                  <div className='mt-4 w-6 h-0.5 bg-weplayer-red rounded-full'></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id='contact'
          className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-section relative'
        >
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-60'></div>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Contacto
                <span className='text-weplayer-red block text-2xl md:text-3xl font-medium mt-1'>
                  WeTech LatAm
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                ¿Interesado en nuestros servicios? Contáctanos para más
                información
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h3 className='text-2xl font-semibold text-gray-900 mb-6'>
                  Información de Contacto
                </h3>
                <div className='space-y-6'>
                  <div className='flex items-center gap-4'>
                    <Mail className='w-6 h-6 text-weplayer-blue' />
                    <div>
                      <p className='font-semibold text-gray-900'>Email</p>
                      <p className='text-gray-600'>ventas@wetechar.com</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Phone className='w-6 h-6 text-weplayer-blue' />
                    <div>
                      <p className='font-semibold text-gray-900'>Teléfono</p>
                      <p className='text-gray-600'>+54 11 58230996</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <MapPin className='w-6 h-6 text-weplayer-blue' />
                    <div>
                      <p className='font-semibold text-gray-900'>Ubicación</p>
                      <p className='text-gray-600'>Buenos Aires, Argentina</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Clock className='w-6 h-6 text-weplayer-blue' />
                    <div>
                      <p className='font-semibold text-gray-900'>Horario</p>
                      <p className='text-gray-600'>Lun - Vie: 9:00 - 18:00</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <FormTracker formName='wetech_contact_form'>
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div>
                      <label
                        htmlFor='nombre'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Nombre *
                      </label>
                      <input
                        type='text'
                        id='nombre'
                        name='nombre'
                        value={formData.nombre}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 rounded-lg form-input text-gray-900'
                        placeholder='Tu nombre completo'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='email'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Email *
                      </label>
                      <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className='w-full px-4 py-3 rounded-lg form-input text-gray-900'
                        placeholder='tu@email.com'
                      />
                    </div>
                    <div>
                      <label
                        htmlFor='mensaje'
                        className='block text-sm font-medium text-gray-700 mb-2'
                      >
                        Mensaje *
                      </label>
                      <textarea
                        id='mensaje'
                        name='mensaje'
                        value={formData.mensaje}
                        onChange={handleInputChange}
                        required
                        rows={4}
                        className='w-full px-4 py-3 rounded-lg form-input text-gray-900'
                        placeholder='Cuéntanos sobre tu proyecto de integración tecnológica...'
                      />
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className='flex items-center gap-2 p-4 bg-green-50 border border-green-200 rounded-lg'>
                        <CheckCircle className='w-5 h-5 text-green-500' />
                        <p className='text-green-700'>
                          ¡Mensaje enviado exitosamente! Te contactaremos
                          pronto.
                        </p>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className='flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg'>
                        <XCircle className='w-5 h-5 text-red-500' />
                        <p className='text-red-700'>
                          Error al enviar el mensaje. Por favor intenta
                          nuevamente.
                        </p>
                      </div>
                    )}

                    <motion.button
                      type='submit'
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full py-3 px-6 rounded-lg font-semibold flex items-center justify-center gap-2 ${
                        isSubmitting
                          ? 'bg-gray-400 text-white cursor-not-allowed'
                          : 'btn-primary text-white'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className='w-5 h-5 animate-spin' />
                          Enviando...
                        </>
                      ) : (
                        <>
                          <Send className='w-5 h-5' />
                          Enviar Mensaje
                        </>
                      )}
                    </motion.button>
                  </form>
                </FormTracker>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className='footer-gradient text-white py-12 px-4 sm:px-6 lg:px-8'>
          <div className='max-w-7xl mx-auto'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
              <div>
                <div className='flex items-center gap-3 mb-4'>
                  <WeplayerLogo className='h-8 w-auto' />
                  <span className='text-xl font-bold'>WeTech LatAm</span>
                </div>
                <p className='text-gray-400'>
                  Empresa integradora de tecnologías con expertise en audio,
                  video, colaboración corporativa, IT y espacios de trabajo
                  modernos.
                </p>
                <div className='mt-4 w-12 h-0.5 bg-weplayer-red rounded-full'></div>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Servicios</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#services'
                      className='hover:text-white transition-colors'
                    >
                      Workspace Collaboration
                    </a>
                  </li>
                  <li>
                    <a
                      href='#services'
                      className='hover:text-white transition-colors'
                    >
                      Unified IT
                    </a>
                  </li>
                  <li>
                    <a
                      href='#services'
                      className='hover:text-white transition-colors'
                    >
                      Managed Services
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Productos</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#products'
                      className='hover:text-white transition-colors'
                    >
                      Catch-Box
                    </a>
                  </li>
                  <li>
                    <a
                      href='#products'
                      className='hover:text-white transition-colors'
                    >
                      Jabra
                    </a>
                  </li>
                  <li>
                    <a
                      href='#products'
                      className='hover:text-white transition-colors'
                    >
                      Logitech
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Contacto</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Información
                    </a>
                  </li>
                  <li>
                    <a href='/' className='hover:text-white transition-colors'>
                      We Player
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
              <p>&copy; 2025 WeTech LatAm. Todos los derechos reservados.</p>
              <p className='mt-2 text-sm'>
                Una división de{' '}
                <Link
                  href='/'
                  className='text-weplayer-blue hover:text-white transition-colors'
                >
                  We Tech
                </Link>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </ClientOnly>
  );
}
