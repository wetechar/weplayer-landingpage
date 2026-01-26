'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NAV_ITEMS } from '@/data/constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 min-h-[70px] ${isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm py-2 border-b border-gray-100'
          : 'bg-transparent py-4'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center group cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
            <div className={`relative transition-all duration-300 ${isScrolled ? 'h-14 brightness-0' : 'h-20 brightness-0 invert drop-shadow-lg'} w-auto`}>
              <Image
                src="/images/logos/logo.png"
                alt="We Tech - Integración Audiovisual"
                width={isScrolled ? 56 : 80}
                height={isScrolled ? 56 : 80}
                className="h-full w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.label === 'Contacto'
                    ? `px-4 py-2 text-sm font-semibold rounded-full transition-all transform hover:scale-105 ${
                        isScrolled
                          ? 'bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg'
                          : 'bg-transparent text-white border-2 border-brand-primary hover:border-brand-accent hover:bg-brand-primary'
                      }`
                    : `text-sm font-medium transition-colors hover:text-brand-accent ${
                        isScrolled ? 'text-slate-600' : 'text-white/90'
                      }`
                }
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md ${isScrolled ? 'text-slate-900' : 'text-white'}`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.label === 'Contacto'
                    ? 'block w-full text-center mt-4 px-5 py-3 text-base font-bold text-white bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105'
                    : 'block px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-md'
                }
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
