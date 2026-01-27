'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Menu, X, LogIn, LogOut, User, ArrowLeft, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useUser } from '@auth0/nextjs-auth0/client';
import { NAV_ITEMS } from '@/data/constants';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, isLoading } = useUser();

  // Detectar si estamos en rutas de shop
  const isShopRoute = pathname?.startsWith('/shop') || pathname?.startsWith('/product');

  // Filtrar items de navegación - excluir "Tienda" cuando estamos en shop
  const navItems = isShopRoute
    ? NAV_ITEMS.filter(item => item.label !== 'Tienda' && item.label !== 'Servicios' && item.label !== 'Nosotros')
    : NAV_ITEMS;

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
        ? 'bg-white/98 backdrop-blur-md shadow-md py-2 border-b border-slate-200'
        : 'bg-white/90 backdrop-blur-sm shadow-sm py-4 border-b border-slate-100'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a
            href={isShopRoute ? '/' : '#'}
            className="flex items-center group cursor-pointer"
            onClick={(e) => {
              if (!isShopRoute) {
                e.preventDefault();
                window.scrollTo(0, 0);
              }
            }}
          >
            <div className={`relative transition-all duration-300 ${isScrolled ? 'h-14' : 'h-20'
              } w-auto`}>
              <Image
                src="/images/logos/logo.png"
                alt="We Tech - Integración Audiovisual"
                width={isScrolled ? 56 : 80}
                height={isScrolled ? 56 : 80}
                className="h-full w-auto object-contain opacity-90 group-hover:opacity-100 transition-opacity"
                style={{
                  filter: 'brightness(0) saturate(100%) invert(27%) sepia(51%) saturate(2878%) hue-rotate(162deg) brightness(96%) contrast(101%)'
                }}
                priority
              />
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Enlaces de navegación - ocultos en shop */}
            {!isShopRoute && navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className={
                  item.label === 'Contacto'
                    ? `px-4 py-2 text-sm font-semibold rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg hover:shadow-brand-primary/30`
                    : `text-sm font-medium transition-colors hover:text-brand-primary ${isScrolled ? 'text-slate-700' : 'text-slate-700'
                    }`
                }
              >
                {item.label}
              </a>
            ))}

            {/* Botones de autenticación - solo en shop */}
            {isShopRoute && (
              <>
                {!isLoading && !user && (
                  <a
                    href={`/api/auth/login?returnTo=${encodeURIComponent(pathname || '/shop')}`}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-slate-100 text-slate-700 hover:text-brand-primary"
                  >
                    <LogIn size={18} />
                    <span>Iniciar Sesión</span>
                  </a>
                )}
                {!isLoading && user && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600">
                      <User size={18} />
                      <span className="hidden lg:inline">{user.name || user.email}</span>
                    </div>
                    <a
                      href={`/api/auth/logout?returnTo=${encodeURIComponent('/')}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-slate-100 text-slate-700 hover:text-brand-primary"
                    >
                      <LogOut size={18} />
                      <span>Salir</span>
                    </a>
                  </>
                )}
              </>
            )}

            {/* Botón Salir de la Tienda - solo en shop */}
            {isShopRoute && (
              <a
                href="/"
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all hover:bg-slate-100 text-slate-700 hover:text-brand-primary border border-slate-200 hover:border-brand-primary"
              >
                <ArrowLeft size={18} />
                <span>Salir de la Tienda</span>
              </a>
            )}

            {/* Botón de Contacto - siempre visible */}
            {isShopRoute && (
              <a
                href="#contact"
                className="px-4 py-2 text-sm font-semibold rounded-full transition-all transform hover:scale-105 bg-gradient-to-r from-brand-primary to-brand-accent text-white hover:shadow-lg hover:shadow-brand-primary/30"
              >
                Contacto
              </a>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-brand-primary transition-colors"
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
            {/* Enlaces de navegación - ocultos en shop */}
            {!isShopRoute && navItems.map((item) => (
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

            {/* Botones de autenticación - solo en shop */}
            {isShopRoute && (
              <>
                {!isLoading && !user && (
                  <a
                    href={`/api/auth/login?returnTo=${encodeURIComponent(pathname || '/shop')}`}
                    className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-md"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <LogIn size={20} />
                    <span>Iniciar Sesión</span>
                  </a>
                )}
                {!isLoading && user && (
                  <>
                    <div className="flex items-center gap-2 px-3 py-3 text-base text-slate-600 border-b border-slate-200">
                      <User size={20} />
                      <span>{user.name || user.email}</span>
                    </div>
                    <a
                      href={`/api/auth/logout?returnTo=${encodeURIComponent('/')}`}
                      className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-md"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LogOut size={20} />
                      <span>Salir</span>
                    </a>
                  </>
                )}
              </>
            )}

            {/* Botón Salir de la Tienda - solo en shop */}
            {isShopRoute && (
              <a
                href="/"
                className="flex items-center gap-2 px-3 py-3 text-base font-medium text-slate-700 hover:text-brand-primary hover:bg-slate-50 rounded-md border border-slate-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <ArrowLeft size={20} />
                <span>Salir de la Tienda</span>
              </a>
            )}

            {/* Botón de Contacto - siempre visible */}
            {isShopRoute && (
              <a
                href="#contact"
                className="block w-full text-center mt-4 px-5 py-3 text-base font-bold text-white bg-gradient-to-r from-brand-primary to-brand-accent rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contacto
              </a>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
