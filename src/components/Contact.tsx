'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, Star, Sparkles, Zap } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const locale = useLocale() as 'fr' | 'en' | 'nl';

  const contactInfo = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t('email'),
      value: 'yandofotsonoeljunior@gmail.com',
      href: 'mailto:yandofotsonoeljunior@gmail.com',
      color: '#EA4335',
      hoverGlow: '#EA433550',
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t('phone'),
      value: '+32 492 85 13 15',
      href: 'tel:+32492851315',
      color: '#10B981',
      hoverGlow: '#10B98150',
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t('location'),
      value: 'Bruxelles, Belgique',
      href: null,
      color: '#F59E0B',
      hoverGlow: '#F59E0B50',
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      label: 'LinkedIn',
      value: 'linkedin.com/in/yanstart',
      href: 'https://www.linkedin.com/in/yanstart/',
      color: '#0A66C2',
      hoverGlow: '#0A66C250',
    },
    {
      icon: <Github className="w-5 h-5" />,
      label: 'GitHub',
      value: 'github.com/Yanstart',
      href: 'https://github.com/Yanstart',
      color: '#6e5494',
      hoverGlow: '#6e549450',
    },
  ];

  const formLabels = {
    fr: { name: 'Nom', email: 'Email', message: 'Message', namePlaceholder: 'Votre nom', emailPlaceholder: 'votre@email.com', messagePlaceholder: 'Votre message...', send: 'Envoyer le Telegram' },
    en: { name: 'Name', email: 'Email', message: 'Message', namePlaceholder: 'Your name', emailPlaceholder: 'your@email.com', messagePlaceholder: 'Your message...', send: 'Send Telegram' },
    nl: { name: 'Naam', email: 'E-mail', message: 'Bericht', namePlaceholder: 'Uw naam', emailPlaceholder: 'uw@email.com', messagePlaceholder: 'Uw bericht...', send: 'Verzend Telegram' },
  };

  const labels = formLabels[locale];

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--tech-blue)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
            x: [0, 50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-80 h-80 bg-[#10B981]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            y: [0, -30, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--western-gold)]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative top with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tech-blue)] via-[var(--western-gold)] to-[#10B981]" />

      <div className="container-wide relative z-10">
        {/* Header - Telegram Office Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block">
            <div className="flex items-center justify-center gap-4 mb-2">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-[var(--tech-blue)]" />
              </motion.div>
              <h2
                className="text-3xl sm:text-4xl bg-gradient-to-r from-[var(--tech-blue)] via-[var(--western-gold)] to-[#10B981] bg-clip-text text-transparent"
                style={{ fontFamily: "'Rye', serif" }}
              >
                {t("title")}
              </h2>
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-6 h-6 text-[#10B981]" />
              </motion.div>
            </div>
            <p
              className="text-[var(--text-secondary)] text-lg mt-4"
              style={{ fontFamily: "'IM Fell English', serif" }}
            >
              {t("subtitle")}
            </p>
          </div>
        </motion.div>

        {/* Main Grid - Asymmetric layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left - Contact Info (Smaller, offset) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-5"
          >
            {/* Telegram Office Card */}
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              {/* Animated corner accent */}
              <motion.div
                className="absolute top-0 right-0 w-20 h-20"
                style={{
                  background:
                    "linear-gradient(135deg, var(--tech-blue) 0%, transparent 50%)",
                  opacity: 0.2,
                }}
                animate={{ opacity: [0.1, 0.3, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              {/* Header */}
              <div className="text-center pb-4 mb-6 border-b-4 border-double border-[var(--western-brown)]">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-[var(--tech-blue)]" />
                  <span
                    className="text-xs uppercase tracking-[0.3em] text-[var(--tech-blue)]"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    Telegram Office
                  </span>
                  <Zap className="w-4 h-4 text-[var(--tech-blue)]" />
                </div>
                <h3
                  className="text-xl text-[var(--text-primary)]"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {locale === "fr"
                    ? "Coordonnees"
                    : locale === "nl"
                    ? "Contactgegevens"
                    : "Contact Info"}
                </h3>
              </div>

              {/* Contact Items */}
              <div className="space-y-3">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {info.href ? (
                      <a
                        href={info.href}
                        target={
                          info.href.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          info.href.startsWith("http")
                            ? "noopener noreferrer"
                            : undefined
                        }
                        className="flex items-center gap-3 p-3 border-2 border-[var(--western-brown-light)] hover:border-transparent transition-all group bg-[var(--western-parchment)]/10 dark:bg-transparent relative overflow-hidden"
                        style={{
                          boxShadow: "none",
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 0 20px ${info.hoverGlow}, inset 0 0 20px ${info.hoverGlow}`;
                          e.currentTarget.style.borderColor = info.color;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "none";
                          e.currentTarget.style.borderColor = "";
                        }}
                      >
                        <motion.div
                          className="p-2 border transition-all duration-300"
                          style={{
                            backgroundColor: `${info.color}20`,
                            borderColor: info.color,
                            color: info.color,
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {info.icon}
                        </motion.div>
                        <div>
                          <p
                            className="text-[var(--text-muted)] text-xs uppercase tracking-wider"
                            style={{ fontFamily: "'Special Elite', monospace" }}
                          >
                            {info.label}
                          </p>
                          <p
                            className="text-[var(--text-primary)] text-sm group-hover:text-[var(--tech-blue)] transition-colors"
                            style={{ fontFamily: "'IM Fell English', serif" }}
                          >
                            {info.value}
                          </p>
                        </div>
                      </a>
                    ) : (
                      <div className="flex items-center gap-3 p-3 border-2 border-[var(--western-brown-light)] bg-[var(--western-parchment)]/10 dark:bg-transparent">
                        <div
                          className="p-2 border"
                          style={{
                            backgroundColor: `${info.color}20`,
                            borderColor: info.color,
                            color: info.color,
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <p
                            className="text-[var(--text-muted)] text-xs uppercase tracking-wider"
                            style={{ fontFamily: "'Special Elite', monospace" }}
                          >
                            {info.label}
                          </p>
                          <p
                            className="text-[var(--text-primary)] text-sm"
                            style={{ fontFamily: "'IM Fell English', serif" }}
                          >
                            {info.value}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* References note - Stamp style with glow */}
              <motion.div
                initial={{ opacity: 0, rotate: -5 }}
                whileInView={{ opacity: 1, rotate: -2 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                viewport={{ once: true }}
                className="mt-6 p-4 border-2 border-dashed border-[#10B981] bg-[#10B981]/10 relative"
              >
                <motion.div
                  className="absolute inset-0 bg-[#10B981]/5"
                  animate={{ opacity: [0.05, 0.15, 0.05] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <div className="absolute -top-2 -right-2 text-[#10B981] text-lg">
                  <motion.span
                    animate={{ rotate: [0, 360] }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    ★
                  </motion.span>
                </div>
                <div className="flex items-start gap-3 relative z-10">
                  <MessageSquare className="w-5 h-5 text-[#10B981] mt-0.5" />
                  <p
                    className="text-[var(--text-secondary)] text-sm"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {locale === "fr"
                      ? "References disponibles sur demande"
                      : locale === "nl"
                      ? "Referenties beschikbaar op aanvraag"
                      : "References available upon request"}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right - Telegram Form (Larger) */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              {/* Animated background gradient */}
              <motion.div
                className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, var(--tech-blue), var(--tech-cyan))",
                }}
                animate={{
                  opacity: [0.05, 0.15, 0.05],
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />

              {/* Form Header - Telegram style */}
              <div className="text-center pb-4 mb-6 border-b-4 border-double border-[var(--western-brown)] relative z-10">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Send className="w-4 h-4 text-[var(--tech-blue)]" />
                  <span
                    className="text-xs uppercase tracking-[0.3em] text-[var(--tech-blue)]"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    Send a Telegram
                  </span>
                </div>
                <h3
                  className="text-xl text-[var(--text-primary)]"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {locale === "fr"
                    ? "Envoyez un Message"
                    : locale === "nl"
                    ? "Stuur een Bericht"
                    : "Send a Message"}
                </h3>
              </div>

              <form
                action="https://formspree.io/f/maqngkze"
                method="POST"
                className="space-y-5 relative z-10"
              >
                {/* Hidden field for Formspree to know reply-to */}
                <input type="hidden" name="_replyto" />
                <input
                  type="hidden"
                  name="_subject"
                  value="Nouveau message depuis le Portfolio"
                />

                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {labels.name}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full px-4 py-3 bg-[var(--western-parchment)]/20 dark:bg-[var(--bg-primary)]/50 border-2 border-[var(--western-brown-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--tech-blue)] focus:shadow-[0_0_15px_var(--tech-blue)] transition-all"
                    placeholder={labels.namePlaceholder}
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {labels.email}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full px-4 py-3 bg-[var(--western-parchment)]/20 dark:bg-[var(--bg-primary)]/50 border-2 border-[var(--western-brown-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--tech-blue)] focus:shadow-[0_0_15px_var(--tech-blue)] transition-all"
                    placeholder={labels.emailPlaceholder}
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-[var(--text-secondary)] text-sm uppercase tracking-wider mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {labels.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[var(--western-parchment)]/20 dark:bg-[var(--bg-primary)]/50 border-2 border-[var(--western-brown-light)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--tech-blue)] focus:shadow-[0_0_15px_var(--tech-blue)] transition-all resize-none"
                    placeholder={labels.messagePlaceholder}
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  />
                </div>

                {/* Submit button - Vibrant gradient style */}
                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 uppercase tracking-wider transition-all flex items-center justify-center gap-3 border-2 border-[var(--western-brown-dark)] shadow-[4px_4px_0_var(--western-brown-dark)] relative overflow-hidden group"
                  style={{
                    fontFamily: "'Cinzel', serif",
                    background:
                      "linear-gradient(135deg, var(--tech-blue), #10B981)",
                    color: "white",
                  }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "2px 2px 0 var(--western-brown-dark)",
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                  <Send className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">{labels.send}</span>
                </motion.button>
              </form>

              {/* Decorative footer */}
              <div className="mt-6 pt-4 border-t border-dashed border-[var(--western-brown-light)] text-center relative z-10">
                <motion.span
                  className="text-[var(--tech-blue)] text-xs"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  *** END OF TELEGRAM ***
                </motion.span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[var(--western-gold)] to-[var(--tech-blue)]" />
    </section>
  );
}
