'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle,
  XCircle,
  Loader2,
  Play,
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
} from 'lucide-react';
import { WeplayerLogo } from '@/components/WeplayerLogo';
import { EMAILJS_CONFIG } from '@/config/emailjs';
import {
  useAnalytics,
  ScrollTracker,
  ButtonTracker,
  FormTracker,
} from '@/components/Analytics';

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

export default function Home() {
  const { trackEvent } = useAnalytics();

  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    mensaje: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
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

      // Simular envío exitoso (para demo)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setSubmitStatus('success');
      setFormData({ nombre: '', email: '', mensaje: '' });

      // Mostrar mensaje de éxito
      console.log('✅ Formulario enviado exitosamente');
      console.log('📧 Datos del formulario:', {
        nombre: formData.nombre,
        email: formData.email,
        mensaje: formData.mensaje,
        fecha: new Date().toISOString(),
      });
    } catch (error: any) {
      console.error('❌ Error al enviar formulario:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToDemo = () => {
    document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <ClientOnly>
      <ScrollTracker />
      <div className='min-h-screen bg-gradient-hero'>
        {/* Navigation */}
        <nav className='fixed top-0 w-full nav-glass z-50'>
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
              <div className='flex items-center'>
                <WeplayerLogo className='h-8 w-auto' />
                <span className='ml-2 text-xl font-bold text-gray-900'>
                  We Player
                </span>
              </div>
              <div className='hidden md:flex items-center space-x-8'>
                <a
                  href='#features'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Características
                </a>
                <a
                  href='#demo'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Demo
                </a>
                <a
                  href='#contact'
                  className='text-gray-600 hover:text-weplayer-blue transition-colors'
                >
                  Contacto
                </a>
                <ButtonTracker
                  action='click'
                  category='navigation'
                  label='solicitar_demo_nav'
                >
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={scrollToContact}
                    className='btn-primary text-white px-6 py-2 rounded-lg'
                  >
                    Solicitar Demo
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
            <div className='text-center'>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className='text-4xl md:text-6xl font-bold text-gray-900 mb-6'>
                  Solución Completa para
                  <span className='text-weplayer-blue block'>
                    Cartelería Digital
                  </span>
                  <span className='text-weplayer-red block text-3xl md:text-4xl font-medium mt-2'>
                    We Player
                  </span>
                </h1>
                <p className='text-xl text-gray-600 mb-8 max-w-3xl mx-auto'>
                  Gestiona, programa y controla tu cartelería digital desde una
                  plataforma centralizada. Monitoreo en tiempo real,
                  programación avanzada y análisis detallado.
                </p>
                <div className='flex flex-col sm:flex-row gap-4 justify-center'>
                  <ButtonTracker
                    action='click'
                    category='hero'
                    label='ver_demo'
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToDemo}
                      className='btn-primary text-white px-8 py-4 rounded-lg text-lg font-semibold flex items-center justify-center gap-2'
                    >
                      <Play className='w-5 h-5' />
                      Ver Demo
                    </motion.button>
                  </ButtonTracker>
                  <ButtonTracker
                    action='click'
                    category='hero'
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
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section
          id='features'
          className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-section relative'
        >
          {/* Elemento decorativo rojo */}
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
                Características Principales
                <span className='text-weplayer-red block text-2xl md:text-3xl font-medium mt-1'>
                  We Player
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Todo lo que necesitas para gestionar tu cartelería digital de
                manera eficiente
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: <Calendar className='w-8 h-8' />,
                  title: 'Programación Avanzada',
                  description:
                    'Crea programaciones complejas con días específicos, horarios personalizados y eventos anuales.',
                },
                {
                  icon: <Smartphone className='w-8 h-8' />,
                  title: 'Gestión de Dispositivos',
                  description:
                    'Monitorea y controla todos tus dispositivos desde una interfaz centralizada.',
                },
                {
                  icon: <BarChart3 className='w-8 h-8' />,
                  title: 'Análisis en Tiempo Real',
                  description:
                    'Obtén estadísticas detalladas de reproducción, estado de dispositivos y rendimiento.',
                },
                {
                  icon: <Users className='w-8 h-8' />,
                  title: 'Gestión de Grupos',
                  description:
                    'Organiza tus dispositivos en grupos para una gestión más eficiente.',
                },
                {
                  icon: <Zap className='w-8 h-8' />,
                  title: 'Sincronización Automática',
                  description:
                    'Los dispositivos se sincronizan automáticamente con el servidor central.',
                },
                {
                  icon: <Shield className='w-8 h-8' />,
                  title: 'Seguridad Robusta',
                  description:
                    'Sistema de autenticación y autorización para proteger tu contenido.',
                },
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white p-6 rounded-xl shadow-lg card-hover hover-lift'
                >
                  <div className='text-weplayer-blue mb-4'>{feature.icon}</div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {feature.title}
                  </h3>
                  <p className='text-gray-600'>{feature.description}</p>
                  <div className='mt-4 w-8 h-0.5 bg-weplayer-red rounded-full'></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id='demo' className='py-16 px-4 sm:px-6 lg:px-8 relative'>
          {/* Elemento decorativo rojo */}
          <div className='absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-transparent via-weplayer-red to-transparent opacity-40'></div>
          <div className='max-w-7xl mx-auto'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-12'
            >
              <h2 className='text-3xl md:text-4xl font-bold text-gray-900 mb-4'>
                Demo Interactivo
                <span className='text-weplayer-red block text-2xl md:text-3xl font-medium mt-1'>
                  We Player
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Explora las principales funcionalidades de We Player
              </p>
            </motion.div>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 items-center'>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <div className='bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-4 shadow-2xl border border-gray-700'>
                  <div className='aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center border border-gray-600'>
                    <div className='text-center text-white'>
                      <Play className='w-16 h-16 mx-auto mb-4 text-weplayer-blue drop-shadow-lg' />
                      <p className='text-lg font-semibold'>Demo Video</p>
                      <p className='text-sm text-gray-400'>Próximamente</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='space-y-6'
              >
                <div className='bg-white p-6 rounded-xl shadow-lg card-hover'>
                  <h3 className='text-xl font-semibold text-gray-900 mb-4'>
                    Características Destacadas
                  </h3>
                  <ul className='space-y-3'>
                    {[
                      'Programación de contenido con calendario visual',
                      'Monitoreo en tiempo real de dispositivos',
                      'Gestión de playlists y contenido multimedia',
                      'Análisis de estadísticas y reportes',
                      'Sistema de grupos y permisos',
                      'Sincronización automática de contenido',
                    ].map((feature, index) => (
                      <li key={index} className='flex items-center gap-3'>
                        <CheckCircle className='w-5 h-5 text-green-500 flex-shrink-0' />
                        <span className='text-gray-700'>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className='py-16 px-4 sm:px-6 lg:px-8 bg-gradient-section relative'>
          {/* Elemento decorativo rojo */}
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
                Casos de Uso
                <span className='text-weplayer-red block text-2xl md:text-3xl font-medium mt-1'>
                  We Player
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                Perfecto para diferentes tipos de negocios y aplicaciones
              </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {[
                {
                  icon: <Building className='w-8 h-8' />,
                  title: 'Empresas',
                  description:
                    'Cartelería corporativa, información de productos y comunicaciones internas.',
                },
                {
                  icon: <Smartphone className='w-8 h-8' />,
                  title: 'Retail',
                  description:
                    'Promociones, catálogos digitales y información de productos en tiendas.',
                },
                {
                  icon: <Users className='w-8 h-8' />,
                  title: 'Eventos',
                  description:
                    'Información de eventos, horarios y contenido dinámico en tiempo real.',
                },
              ].map((useCase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className='bg-white p-6 rounded-xl shadow-lg card-hover hover-lift'
                >
                  <div className='text-weplayer-blue mb-4'>{useCase.icon}</div>
                  <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                    {useCase.title}
                  </h3>
                  <p className='text-gray-600'>{useCase.description}</p>
                  <div className='mt-4 w-6 h-0.5 bg-weplayer-red rounded-full'></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id='contact' className='py-16 px-4 sm:px-6 lg:px-8 relative'>
          {/* Elemento decorativo rojo */}
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
                  We Player
                </span>
              </h2>
              <p className='text-xl text-gray-600 max-w-3xl mx-auto'>
                ¿Interesado en We Player? Contáctanos para más información
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
                      <p className='text-gray-600'>ingenieria@wetechar.com</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-4'>
                    <Phone className='w-6 h-6 text-weplayer-blue' />
                    <div>
                      <p className='font-semibold text-gray-900'>Teléfono</p>
                      <p className='text-gray-600'>+54 11 1234-5678</p>
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
                <FormTracker formName='contact_form'>
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
                        placeholder='Cuéntanos sobre tu proyecto...'
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
                <WeplayerLogo className='h-8 w-auto mb-4' />
                <p className='text-gray-400'>
                  Solución completa para cartelería digital. Gestiona, programa
                  y controla tu contenido desde una plataforma centralizada.
                </p>
                <div className='mt-4 w-12 h-0.5 bg-weplayer-red rounded-full'></div>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Producto</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#features'
                      className='hover:text-white transition-colors'
                    >
                      Características
                    </a>
                  </li>
                  <li>
                    <a
                      href='#demo'
                      className='hover:text-white transition-colors'
                    >
                      Demo
                    </a>
                  </li>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Contacto
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Soporte</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Contacto
                    </a>
                  </li>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Documentación
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className='text-lg font-semibold mb-4'>Empresa</h3>
                <ul className='space-y-2 text-gray-400'>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Sobre Nosotros
                    </a>
                  </li>
                  <li>
                    <a
                      href='#contact'
                      className='hover:text-white transition-colors'
                    >
                      Privacidad
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='border-t border-gray-800 mt-8 pt-8 text-center text-gray-400'>
              <p>&copy; 2025 We Tech. Todos los derechos reservados.</p>
            </div>
          </div>
        </footer>
      </div>
    </ClientOnly>
  );
}
