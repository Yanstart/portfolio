'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';
import { Code, Server, Database, Cloud, Wrench, Users, Star, Zap, HeartPulse, Network, Brain, Shield, Scale } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Code className="w-4 h-4" />,
  backend: <Server className="w-4 h-4" />,
  systems: <Network className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  devops: <Cloud className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
  soft: <Users className="w-4 h-4" />,
  healthtech: <HeartPulse className="w-4 h-4" />,
  ml: <Brain className="w-4 h-4" />,
  security: <Shield className="w-4 h-4" />,
  compliance: <Scale className="w-4 h-4" />,
};

const categoryColors: Record<string, string> = {
  frontend: 'var(--tech-blue)',
  backend: '#10B981',
  systems: '#F97316',
  database: '#8B5CF6',
  devops: '#F59E0B',
  tools: '#EC4899',
  soft: '#06B6D4',
  healthtech: '#EF4444',
  ml: '#7C3AED',
  security: '#DC2626',
  compliance: '#0D9488',
};

const techHighlights = [
  { name: 'Rust', color: '#DEA584' },
  { name: 'Python', color: '#3776AB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'QUIC', color: '#F97316' },
  { name: 'Prometheus', color: '#E6522C' },
];

export default function Skills() {
  const t = useTranslations('skills');
  const locale = useLocale();

  return (
    <section id="skills" className="py-12 relative">
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Star className="w-4 h-4 text-[var(--western-gold)]" />
            <h2
              className="text-2xl sm:text-3xl text-gradient"
              style={{ fontFamily: "'Rye', serif" }}
            >
              {t('title')}
            </h2>
            <Star className="w-4 h-4 text-[var(--western-gold)]" />
          </div>
          <p className="text-[var(--text-secondary)] text-sm" style={{ fontFamily: "'IM Fell English', serif" }}>
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Skills Grid - 4 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((category, categoryIndex) => {
            const accentColor = categoryColors[category.id] || 'var(--tech-blue)';
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
                viewport={{ once: true }}
              >
                <div className="bg-[var(--card-bg)] border-3 border-[var(--western-brown)] p-4 shadow-[3px_3px_0_var(--western-brown-dark)] hover:shadow-[4px_4px_0_var(--western-brown-dark)] hover:-translate-y-0.5 transition-all duration-200 h-full">
                  <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[var(--western-brown-light)]">
                    <div
                      className="p-1.5 border"
                      style={{
                        backgroundColor: `${accentColor}20`,
                        borderColor: accentColor,
                        color: accentColor,
                      }}
                    >
                      {categoryIcons[category.id]}
                    </div>
                    <h3
                      className="text-sm uppercase tracking-wider text-[var(--text-primary)]"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {t(`categories.${category.id}` as const)}
                    </h3>
                  </div>
                  {/* Skills as tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.span
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.2, delay: skillIndex * 0.03 }}
                        viewport={{ once: true }}
                        className="px-2 py-1 text-[11px] border transition-all cursor-default hover:scale-105"
                        style={{
                          fontFamily: "'Special Elite', monospace",
                          borderColor: `${accentColor}50`,
                          backgroundColor: `${accentColor}10`,
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {skill.name}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}

          {/* Tech Stack Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="bg-[var(--card-bg)] border-3 border-[var(--western-brown)] p-4 shadow-[3px_3px_0_var(--western-brown-dark)] hover:shadow-[4px_4px_0_var(--western-brown-dark)] hover:-translate-y-0.5 transition-all duration-200 h-full">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[var(--western-brown-light)]">
                <div className="p-1.5 bg-[var(--western-gold)]/20 border border-[var(--western-gold)] text-[var(--western-gold)]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3
                  className="text-sm uppercase tracking-wider text-[var(--text-primary)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {locale === 'fr' ? 'Favoris' : locale === 'nl' ? 'Favorieten' : 'Favorites'}
                </h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {techHighlights.map((tech, index) => (
                  <motion.div
                    key={tech.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, delay: index * 0.03 }}
                    viewport={{ once: true }}
                  >
                    <div
                      className="px-2 py-1 text-[11px] border border-[var(--western-brown-light)] bg-[var(--card-bg)] hover:border-[var(--western-gold)] hover:bg-[var(--western-gold)]/10 transition-all cursor-default flex items-center gap-1.5"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
