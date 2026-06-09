'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Send,
  CheckCircle,
  AlertCircle,
  User,
  Phone,
  MessageSquare,
  Building,
} from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    'idle' | 'success' | 'error'
  >('idle');

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'El teléfono es requerido';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'El mensaje es requerido';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'El mensaje debe tener al menos 10 caracteres';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Enviar con Resend a través de la API de Next.js
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          message: formData.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.error || 'Error al enviar el mensaje');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', company: '', message: '' });
    } catch (error) {
      console.error('Error al enviar el formulario:', error);

      // Fallback a mailto si la API no está disponible
      const subject = encodeURIComponent(
        `Contacto desde Web - ${formData.name}`,
      );
      const body = encodeURIComponent(
        `Nombre: ${formData.name}\n` +
          `Email: ${formData.email}\n` +
          `Teléfono: ${formData.phone}\n` +
          `Empresa: ${formData.company || 'No especificada'}\n\n` +
          `Mensaje:\n${formData.message}`,
      );

      // Mostrar error pero también ofrecer mailto como alternativa
      setSubmitStatus('error');

      // Opcional: abrir mailto automáticamente como fallback
      // window.location.href = `mailto:ingenieria@wetechar.com?subject=${subject}&body=${body}`;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <section
      id='contact'
      className='py-24 bg-linear-to-br from-slate-50 to-slate-100 scroll-mt-[112px]'
    >
      <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <p className='text-sm font-semibold text-brand-primary uppercase tracking-widest mb-2'>
            Contacto
          </p>
          <h2 className='text-3xl md:text-4xl font-bold text-slate-900 mb-4'>
            Hablemos de tu Proyecto
          </h2>
          <p className='text-slate-600 text-lg max-w-2xl mx-auto'>
            Completa el formulario y nuestro equipo de ingeniería se pondrá en
            contacto contigo a la brevedad.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className='bg-white rounded-2xl shadow-xl p-8 md:p-12'
        >
          {submitStatus === 'success' ? (
            <div className='text-center py-12'>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', duration: 0.5 }}
              >
                <CheckCircle className='w-20 h-20 text-green-500 mx-auto mb-6' />
                <h3 className='text-2xl font-bold text-slate-900 mb-2'>
                  ¡Mensaje Enviado!
                </h3>
                <p className='text-slate-600 mb-6'>
                  Gracias por contactarnos. Nos pondremos en contacto contigo
                  pronto.
                </p>
                <button
                  onClick={() => setSubmitStatus('idle')}
                  className='px-6 py-3 bg-brand-primary text-white rounded-lg font-semibold hover:bg-brand-accent transition-colors'
                >
                  Enviar Otro Mensaje
                </button>
              </motion.div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                {/* Nombre */}
                <div>
                  <label
                    htmlFor='name'
                    className='block text-sm font-semibold text-slate-700 mb-2'
                  >
                    <User size={16} className='inline mr-2' />
                    Nombre Completo *
                  </label>
                  <input
                    type='text'
                    id='name'
                    name='name'
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all`}
                    placeholder='Juan Pérez'
                  />
                  {errors.name && (
                    <p className='mt-1 text-sm text-red-500 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor='email'
                    className='block text-sm font-semibold text-slate-700 mb-2'
                  >
                    <Mail size={16} className='inline mr-2' />
                    Email *
                  </label>
                  <input
                    type='email'
                    id='email'
                    name='email'
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all`}
                    placeholder='juan@empresa.com'
                  />
                  {errors.email && (
                    <p className='mt-1 text-sm text-red-500 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Teléfono */}
                <div>
                  <label
                    htmlFor='phone'
                    className='block text-sm font-semibold text-slate-700 mb-2'
                  >
                    <Phone size={16} className='inline mr-2' />
                    Teléfono *
                  </label>
                  <input
                    type='tel'
                    id='phone'
                    name='phone'
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all`}
                    placeholder='+54 11 1234-5678'
                  />
                  {errors.phone && (
                    <p className='mt-1 text-sm text-red-500 flex items-center'>
                      <AlertCircle size={14} className='mr-1' />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Empresa */}
                <div>
                  <label
                    htmlFor='company'
                    className='block text-sm font-semibold text-slate-700 mb-2'
                  >
                    <Building size={16} className='inline mr-2' />
                    Empresa
                  </label>
                  <input
                    type='text'
                    id='company'
                    name='company'
                    value={formData.company}
                    onChange={handleChange}
                    className='w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all'
                    placeholder='Nombre de tu empresa'
                  />
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label
                  htmlFor='message'
                  className='block text-sm font-semibold text-slate-700 mb-2'
                >
                  <MessageSquare size={16} className='inline mr-2' />
                  Mensaje *
                </label>
                <textarea
                  id='message'
                  name='message'
                  value={formData.message}
                  onChange={handleChange}
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition-all resize-none`}
                  placeholder='Cuéntanos sobre tu proyecto o consulta...'
                />
                {errors.message && (
                  <p className='mt-1 text-sm text-red-500 flex items-center'>
                    <AlertCircle size={14} className='mr-1' />
                    {errors.message}
                  </p>
                )}
              </div>

              {/* Botón de envío */}
              <div className='pt-4'>
                <button
                  type='submit'
                  disabled={isSubmitting}
                  className='w-full md:w-auto px-8 py-4 bg-brand-primary text-white font-bold rounded-lg shadow-lg hover:bg-brand-accent transition-all transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
                >
                  {isSubmitting ? (
                    <>
                      <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Enviar Mensaje
                    </>
                  )}
                </button>
              </div>

              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start'
                >
                  <AlertCircle
                    className='text-red-500 mr-3 flex-shrink-0 mt-0.5'
                    size={20}
                  />
                  <div className='flex-1'>
                    <p className='text-red-800 font-semibold'>
                      Error al enviar el mensaje
                    </p>
                    <p className='text-red-600 text-sm mt-1'>
                      Por favor, intenta nuevamente o contáctanos directamente a{' '}
                      <a
                        href='mailto:ingenieria@wetechar.com'
                        className='underline font-semibold hover:text-red-800'
                      >
                        ingenieria@wetechar.com
                      </a>
                    </p>
                    <p className='text-red-600 text-xs mt-2 italic'>
                      Nota: Asegúrate de que el servidor de la API esté
                      corriendo en el puerto 3001.
                    </p>
                  </div>
                </motion.div>
              )}

              <p className='text-xs text-slate-500 text-center mt-6'>
                Al enviar este formulario, aceptas que nos pongamos en contacto
                contigo.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
