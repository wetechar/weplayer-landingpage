import React from 'react';
import { Hexagon, Mail, Phone, MapPin, Linkedin, Instagram, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
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
              <a href="https://www.linkedin.com/company/wetech" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn de We Tech" className="text-slate-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/wetech" target="_blank" rel="noopener noreferrer" aria-label="Instagram de We Tech" className="text-slate-400 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/wetech" target="_blank" rel="noopener noreferrer" aria-label="Facebook de We Tech" className="text-slate-400 hover:text-white transition-colors">
                <Facebook size={20} />
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
              <li><a href="#verticals" className="hover:text-brand-primary transition-colors">Casos de Éxito</a></li>
              <li><a href="#partners" className="hover:text-brand-primary transition-colors">Partners</a></li>
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
                <span>Av. Del Libertador 1000,<br/>Buenos Aires, Argentina</span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-3 text-brand-primary" />
                <span>+54 11 5555-0123</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-3 text-brand-primary" />
                <a href="mailto:info@wetech.com.ar" className="hover:text-white transition-colors">info@wetech.com.ar</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} We Tech Integration. Todos los derechos reservados.</p>
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