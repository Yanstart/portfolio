'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { skillsData } from '@/data/skills';
import { Code, Server, Database, Cloud, Wrench, Users, Star, Zap, HeartPulse } from 'lucide-react';

const categoryIcons: Record<string, React.ReactNode> = {
  frontend: <Code className="w-4 h-4" />,
  backend: <Server className="w-4 h-4" />,
  database: <Database className="w-4 h-4" />,
  devops: <Cloud className="w-4 h-4" />,
  tools: <Wrench className="w-4 h-4" />,
  soft: <Users className="w-4 h-4" />,
  healthtech: <HeartPulse className="w-4 h-4" />,
};

const techHighlights = [
  { name: 'Python', color: '#3776AB' },
  { name: 'TypeScript', color: '#3178C6' },
  { name: 'React', color: '#61DAFB' },
  { name: 'Next.js', color: '#000000' },
  { name: 'Docker', color: '#2496ED' },
  { name: 'PostgreSQL', color: '#336791' },
  { name: 'FastAPI', color: '#009688' },
  { name: 'Kubernetes', color: '#326CE5' },
];

export default function Skills() {
  const t = useTranslations('skills');

  return (
    <section id="skills" className="py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        {/* Skills Grid - 4 columns, 8 items (4+4) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillsData.map((category, categoryIndex) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: categoryIndex * 0.05 }}
              viewport={{ once: true }}
            >
              <div className="bg-[var(--card-bg)] border-3 border-[var(--western-brown)] p-4 shadow-[3px_3px_0_var(--western-brown-dark)] hover:shadow-[4px_4px_0_var(--western-brown-dark)] hover:-translate-y-0.5 transition-all duration-200 h-full">
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[var(--western-brown-light)]">
                  <div className="p-1.5 bg-[var(--tech-blue)]/20 border border-[var(--tech-blue)] text-[var(--tech-blue)]">
                    {categoryIcons[category.id]}
                  </div>
                  <h3
                    className="text-sm uppercase tracking-wider text-[var(--text-primary)]"
                    style={{ fontFamily: "'Cinzel', serif" }}
                  >
                    {t(`categories.${category.id}` as const)}
                  </h3>
                </div>
                <div className="space-y-2">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1">
                        <span
                          className="text-[var(--text-secondary)] text-xs"
                          style={{ fontFamily: "'Special Elite', monospace" }}
                        >
                          {skill.name}
                        </span>
                        <span className="text-[var(--tech-blue)] text-xs font-bold">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="relative h-2 bg-[var(--western-brown-dark)]/20 border border-[var(--western-brown)]">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 0.6, delay: skillIndex * 0.05 }}
                          viewport={{ once: true }}
                          className="h-full bg-gradient-to-r from-[var(--tech-blue)] to-[var(--tech-cyan)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Tech Stack - 8th item */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35 }}
            viewport={{ once: true }}
          >
            <div className="bg-[var(--card-bg)] border-3 border-[var(--western-brown)] p-4 shadow-[3px_3px_0_var(--western-brown-dark)] hover:shadow-[4px_4px_0_var(--western-brown-dark)] hover:-translate-y-0.5 transition-all duration-200 h-full">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-dashed border-[var(--western-brown-light)]">
                <div className="p-1.5 bg-[var(--tech-blue)]/20 border border-[var(--tech-blue)] text-[var(--tech-blue)]">
                  <Zap className="w-4 h-4" />
                </div>
                <h3
                  className="text-sm uppercase tracking-wider text-[var(--text-primary)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  Tech Stack
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
                      className="px-2 py-1 text-[10px] border border-[var(--western-brown-light)] bg-[var(--card-bg)] hover:border-[var(--tech-blue)] hover:bg-[var(--tech-blue)]/10 transition-all cursor-default flex items-center gap-1"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ backgroundColor: tech.color }}
                      />
                      {tech.name}
                    </div>
                  </motion.div>
                ))}
                <span className="px-2 py-1 text-[10px] text-[var(--tech-blue)]" style={{ fontFamily: "'Special Elite', monospace" }}>
                  +20
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
