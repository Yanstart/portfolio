'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { Menu, X, Globe, Sun, Moon, Star } from 'lucide-react';
import { useParams } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { useTheme } from '@/context/ThemeContext';

export default function Navbar() {
  const t = useTranslations('nav');
  const tLang = useTranslations('language');
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const currentLocale = params.locale as string;

  const navItems = [
    { href: '#home', label: t('home') },
    { href: '#about', label: t('about') },
    { href: '#skills', label: t('skills') },
    { href: '#activities', label: t('activities') },
    { href: '#cv', label: t('cv') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 bg-[var(--card-bg)] border-b-4 border-[var(--western-brown)] shadow-[0_4px_0_var(--western-brown-dark)]"
      role="navigation"
      aria-label="Main navigation"
    >
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--western-gold)] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Western Style */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <Star className="w-5 h-5 text-[var(--western-gold)]" aria-hidden="true" />
            <a
              href="#home"
              className="font-western text-2xl tracking-wider text-gradient hover:scale-105 transition-transform"
              aria-label="Noel Yando Fotso - Home"
              style={{ fontFamily: "'Rye', serif" }}
            >
              NYF
            </a>
            <Star className="w-5 h-5 text-[var(--western-gold)]" aria-hidden="true" />
          </div>

          {/* Desktop Navigation - Saloon Menu Style */}
          <div className="hidden md:block">
            <div className="flex items-center gap-1">
              {navItems.map((item, index) => (
                <div key={item.href} className="flex items-center">
                  <a
                    href={item.href}
                    className="px-4 py-2 text-sm font-medium uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--western-gold)] hover:bg-[var(--western-brown)]/20 transition-all duration-200 border-b-2 border-transparent hover:border-[var(--western-gold)]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {item.label}
                  </a>
                  {index < navItems.length - 1 && (
                    <span className="text-[var(--western-gold)] opacity-50 mx-1" aria-hidden="true">◆</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle - Lantern Style */}
            <button
              onClick={toggleTheme}
              className="relative p-2 text-[var(--western-gold)] hover:text-[var(--western-gold-light)] rounded-full border-2 border-[var(--western-brown)] hover:border-[var(--western-gold)] bg-[var(--card-bg)] transition-all duration-200 hover:shadow-[0_0_10px_var(--western-gold)]"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-pressed={theme === 'dark'}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Moon className="w-5 h-5" aria-hidden="true" />
              )}
            </button>

            {/* Language Switcher - Telegram Style */}
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--western-gold)] border-2 border-[var(--western-brown)] hover:border-[var(--western-gold)] rounded transition-all duration-200"
                aria-expanded={langOpen}
                aria-haspopup="true"
                aria-label="Select language"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                <Globe className="w-4 h-4" aria-hidden="true" />
                <span className="hidden sm:inline">{currentLocale.toUpperCase()}</span>
              </button>
              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-[var(--card-bg)] border-2 border-[var(--western-brown)] shadow-[4px_4px_0_var(--western-brown-dark)] py-1"
                  role="menu"
                  aria-orientation="vertical"
                >
                  <div className="absolute -top-px left-0 right-0 h-0.5 bg-[var(--western-gold)]" />
                  {routing.locales.map((locale) => (
                    <Link
                      key={locale}
                      href={pathname}
                      locale={locale}
                      className={`flex items-center gap-2 px-4 py-2 text-sm uppercase tracking-wider hover:bg-[var(--western-brown)]/20 transition-colors ${
                        currentLocale === locale
                          ? 'text-[var(--western-gold)] bg-[var(--western-brown)]/10'
                          : 'text-[var(--text-secondary)]'
                      }`}
                      onClick={() => setLangOpen(false)}
                      role="menuitem"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      {currentLocale === locale && <Star className="w-3 h-3" aria-hidden="true" />}
                      {tLang(locale)}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:text-[var(--western-gold)] hover:border-[var(--western-gold)] transition-all duration-200"
                aria-expanded={isOpen}
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? (
                  <X className="w-6 h-6" aria-hidden="true" />
                ) : (
                  <Menu className="w-6 h-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation - Wanted Poster Style */}
      {isOpen && (
        <div className="md:hidden bg-[var(--card-bg)] border-t-2 border-[var(--western-brown)]">
          <div className="px-4 pt-4 pb-4 space-y-1">
            <div className="text-center mb-4 pb-2 border-b border-dashed border-[var(--western-brown-light)]">
              <span
                className="text-xs uppercase tracking-[0.3em] text-[var(--western-rust)]"
                style={{ fontFamily: "'Rye', serif" }}
              >
                Navigation
              </span>
            </div>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center gap-3 px-4 py-3 text-base font-medium uppercase tracking-wider text-[var(--text-secondary)] hover:text-[var(--western-gold)] hover:bg-[var(--western-brown)]/10 border-l-2 border-transparent hover:border-[var(--western-gold)] transition-all"
                onClick={() => setIsOpen(false)}
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <span className="text-[var(--western-gold)] text-xs">★</span>
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
