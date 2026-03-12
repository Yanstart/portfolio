'use client';

import { useTranslations } from 'next-intl';
import { Heart, Github, Linkedin, Mail, Star } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('footer');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[var(--card-bg)] border-t-4 border-[var(--western-brown)]">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[var(--western-gold)] to-transparent" />

      <div className="container-wide py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Decorative divider */}
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-[var(--western-brown-light)]" />
            <Star className="w-4 h-4 text-[var(--western-gold)]" />
            <div className="h-px w-16 bg-[var(--western-brown-light)]" />
          </div>

          {/* Main content */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
            {/* Copyright */}
            <div className="text-[var(--text-muted)] text-center md:text-left" style={{ fontFamily: "'Special Elite', monospace" }}>
              <span className="text-sm">&copy; {currentYear} Noel Junior Yando Fotso</span>
              <span className="hidden md:inline mx-2">|</span>
              <span className="block md:inline text-xs">{t('rights')}</span>
            </div>

            {/* Made with love */}
            <div className="flex items-center gap-2 text-[var(--text-muted)]" style={{ fontFamily: "'IM Fell English', serif" }}>
              <span>{t('madeWith')}</span>
              <Heart className="w-4 h-4 text-[var(--western-rust)] fill-[var(--western-rust)]" />
              <span className="text-[var(--western-gold)]">&</span>
              <span>Next.js</span>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4">
              <a
                href="https://github.com/Yanstart"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-[var(--western-brown-light)] text-[var(--text-muted)] hover:text-[var(--western-gold)] hover:border-[var(--western-gold)] transition-all"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/in/yanstart/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border-2 border-[var(--western-brown-light)] text-[var(--text-muted)] hover:text-[var(--western-gold)] hover:border-[var(--western-gold)] transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="mailto:n.yandofotso@students.ephec.be"
                className="p-2 border-2 border-[var(--western-brown-light)] text-[var(--text-muted)] hover:text-[var(--western-gold)] hover:border-[var(--western-gold)] transition-all"
                aria-label="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Bottom decorative text */}
          <div className="text-center">
            <span
              className="text-xs uppercase tracking-[0.2em] text-[var(--text-muted)] opacity-50"
              style={{ fontFamily: "'Rye', serif" }}
            >
              Est. 2001 Belgium
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
