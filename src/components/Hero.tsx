'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowDown, Download, Github, Linkedin, Mail, Star } from 'lucide-react';
import Image from 'next/image';

// Typewriter effect hook
function useTypewriter(texts: string[], typingSpeed = 100, deletingSpeed = 50, pauseTime = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (displayText.length < currentText.length) {
          setDisplayText(currentText.slice(0, displayText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      } else {
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setTextIndex((prev) => (prev + 1) % texts.length);
        }
      }
    }, isDeleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, textIndex, texts, typingSpeed, deletingSpeed, pauseTime]);

  return displayText;
}

export default function Hero() {
  const t = useTranslations('hero');
  const displayName = useTypewriter(['Noel Junior Yando', 'Yanstart'], 80, 40, 2500);

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20">
      {/* Decorative corner ornaments */}
      <div className="absolute top-24 left-8 text-[var(--western-gold)] text-4xl opacity-30 z-10" aria-hidden="true">❧</div>
      <div className="absolute top-24 right-8 text-[var(--western-gold)] text-4xl opacity-30 scale-x-[-1] z-10" aria-hidden="true">❧</div>

      <div className="container-wide py-12 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* Left Column - Wanted Poster Style Card */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: -1 }}
            transition={{ duration: 0.6, type: "spring" }}
            className="lg:col-span-5 lg:mt-8"
          >
            <div className="relative bg-[var(--western-parchment)]/95 dark:bg-[var(--card-bg)]/95 backdrop-blur-md p-6 sm:p-8 border-4 border-double border-[var(--western-brown)] shadow-[8px_8px_0_var(--western-brown-dark)]">
              {/* Wanted header */}
              <div className="text-center mb-6">
                <div className="flex items-center justify-center gap-4 mb-2">
                  <span className="text-[var(--western-gold)] text-2xl">★</span>
                  <h3
                    className="text-2xl sm:text-3xl tracking-[0.2em] text-[var(--western-rust)]"
                    style={{ fontFamily: "'Rye', serif" }}
                  >
                    WANTED
                  </h3>
                  <span className="text-[var(--western-gold)] text-2xl">★</span>
                </div>
                <div className="h-0.5 bg-gradient-to-r from-transparent via-[var(--western-brown)] to-transparent" />
              </div>

              {/* Avatar in wanted poster frame */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-40 h-40 sm:w-48 sm:h-48 overflow-hidden border-4 border-[var(--western-brown)] shadow-[4px_4px_0_var(--western-brown-dark)]">
                    <Image
                      src="/medias/profil_avatar.gif"
                      alt="Noel Junior Yando Fotso"
                      width={192}
                      height={192}
                      className="w-full h-full object-cover sepia-[.15]"
                      unoptimized
                      priority
                    />
                  </div>
                  {/* Corner decorations */}
                  <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-[var(--western-gold)]" />
                  <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-[var(--western-gold)]" />
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-[var(--western-gold)]" />
                  <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-[var(--western-gold)]" />
                </div>
              </div>

              {/* Reward section */}
              <div className="text-center">
                <p className="text-sm uppercase tracking-[0.15em] text-[var(--text-muted)] mb-1" style={{ fontFamily: "'Special Elite', monospace" }}>
                  Reward for hiring
                </p>
                <p className="text-3xl sm:text-4xl text-[var(--western-gold)] font-bold" style={{ fontFamily: "'Rye', serif" }}>
                  $∞
                </p>
                <p className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-2" style={{ fontFamily: "'Special Elite', monospace" }}>
                  Dead or Alive... preferably alive
                </p>
              </div>

              {/* Decorative bottom border */}
              <div className="mt-6 pt-4 border-t border-dashed border-[var(--western-brown-light)]">
                <p className="text-center text-xs uppercase tracking-[0.2em] text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                  Est. 2001 • Belgium
                </p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Main Content */}
          <div className="lg:col-span-7 lg:pl-8">
            {/* Name with typewriter */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[var(--western-brown)]" />
                <Star className="w-4 h-4 text-[var(--western-gold)]" />
              </div>
              <h1
                className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-[var(--text-primary)] whitespace-nowrap"
                style={{ fontFamily: "'Rye', serif", textShadow: '3px 3px 0 var(--western-brown-dark)' }}
              >
                <span className="text-gradient">
                  {displayName}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="inline-block w-1 h-8 sm:h-10 lg:h-12 bg-[var(--western-gold)] ml-1 align-middle"
                  />
                </span>
              </h1>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-xl sm:text-2xl lg:text-3xl mb-6 text-[var(--western-rust)]"
              style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic' }}
            >
              {t('title')}
            </motion.h2>

            {/* Description in telegram style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mb-8 p-4 border-l-4 border-[var(--western-gold)] bg-[var(--card-bg)]/80 backdrop-blur-md"
            >
              <p
                className="text-[var(--text-secondary)] text-base sm:text-lg leading-relaxed"
                style={{ fontFamily: "'IM Fell English', serif" }}
              >
                {t('subtitle')}
              </p>
            </motion.div>

            {/* CTA Buttons - Western Style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <a
                href="#about"
                className="group px-6 py-3 bg-[var(--western-rust)] text-[var(--western-cream)] uppercase tracking-wider hover:bg-[var(--western-brown-dark)] transition-all flex items-center gap-2 border-2 border-[var(--western-brown-dark)] shadow-[4px_4px_0_var(--western-brown-dark)] hover:shadow-[2px_2px_0_var(--western-brown-dark)] hover:translate-x-[2px] hover:translate-y-[2px]"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                {t('cta')}
                <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="https://drive.google.com/drive/u/0/folders/1pUdeRXuaKXFYtRezYkPjYE9QcwYcHJCR"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border-2 border-[var(--western-brown)] bg-[var(--card-bg)]/80 backdrop-blur-sm text-[var(--text-primary)] uppercase tracking-wider hover:bg-[var(--western-brown)]/10 hover:border-[var(--western-gold)] transition-all flex items-center gap-2"
                style={{ fontFamily: "'Cinzel', serif" }}
              >
                <Download className="w-4 h-4" />
                {t('downloadCV')}
              </a>
            </motion.div>

            {/* Social Links - Sheriff Badge Style */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex items-center gap-6"
            >
              <span className="text-sm uppercase tracking-widest text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                Find me:
              </span>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/Yanstart"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--card-bg)]/90 backdrop-blur-sm border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:text-[var(--tech-blue)] hover:border-[var(--tech-blue)] transition-all hover:shadow-[0_0_15px_var(--tech-blue)]"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="https://www.linkedin.com/in/yanstart/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-[var(--card-bg)]/90 backdrop-blur-sm border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:text-[var(--tech-blue)] hover:border-[var(--tech-blue)] transition-all hover:shadow-[0_0_15px_var(--tech-blue)]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:yandofotsonoeljunior@gmail.com"
                  className="p-3 bg-[var(--card-bg)]/90 backdrop-blur-sm border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:text-[var(--tech-blue)] hover:border-[var(--tech-blue)] transition-all hover:shadow-[0_0_15px_var(--tech-blue)]"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - Hanging sign style */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center"
        >
          <div className="w-px h-8 bg-[var(--western-brown)]" />
          <div className="p-2 border-2 border-[var(--western-brown)] bg-[var(--card-bg)]/90 backdrop-blur-sm">
            <ArrowDown className="w-5 h-5 text-[var(--tech-blue)]" />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative bottom ornament */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[var(--western-brown)]/10 to-transparent" />
    </section>
  );
}
