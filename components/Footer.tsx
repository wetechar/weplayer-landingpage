'use client';

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Hexagon, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  const [currentYear, setCurrentYear] = useState<number | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  // El DevBlog tiene su propio footer
  if (pathname?.startsWith('/devblog')) return null;

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-6">
              <Hexagon size={24} className="text-brand-primary fill-brand-primary" />
              <span className="text-xl font-bold text-white">WE TECH</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 mb-6">
              Somos una empresa integradora de tecnología audiovisual enfocada en crear experiencias conectadas para entornos corporativos, comerciales y residenciales.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/wetech-ar" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de We Tech" className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/wetech" target="_blank" rel="noopener noreferrer" aria-label="Instagram de We Tech" className="text-slate-400 hover:text-white transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-white font-semibold mb-6">Soluciones</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Workspace Collaboration</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Unified IT & Cloud</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Digital Signage</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Auditorios & Eventos</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Domótica Residencial</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold mb-6">Compañía</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#about" className="hover:text-brand-primary transition-colors">Sobre Nosotros</a></li>
              <li><a href="#casos-exito" className="hover:text-brand-primary transition-colors">Casos de Éxito</a></li>
              <li><a href="#services" className="hover:text-brand-primary transition-colors">Partners</a></li>
              <li><a href="#contact" className="hover:text-brand-primary transition-colors">Carreras</a></li>
              <li><a href="#contact" className="hover:text-brand-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-6">Contacto</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start">
                <MapPin size={18} className="mr-3 text-brand-primary mt-0.5" />
                <span>Olleros 3916,<br/>Chacarita, Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-brand-primary" />
                <span>+54 11 2016-1074</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-brand-primary" />
                <a href="mailto:ventas@wetechar.com" className="hover:text-white transition-colors">ventas@wetechar.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {currentYear ?? 2026} We Tech Integration. Todos los derechos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#privacy" className="hover:text-slate-300">Política de Privacidad</a>
            <a href="#terms" className="hover:text-slate-300">Términos de Uso</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;