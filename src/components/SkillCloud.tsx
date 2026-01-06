'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface Skill {
  name: string;
  color: string;
  category: string;
}

const skills: Skill[] = [
  // Data & Analytics
  { name: 'Python', color: '#3776AB', category: 'data' },
  { name: 'Pandas', color: '#150458', category: 'data' },
  { name: 'NumPy', color: '#013243', category: 'data' },
  { name: 'Jupyter', color: '#F37626', category: 'data' },
  { name: 'SQL', color: '#336791', category: 'data' },
  { name: 'PostgreSQL', color: '#336791', category: 'data' },

  // Web Development
  { name: 'TypeScript', color: '#3178C6', category: 'web' },
  { name: 'React', color: '#61DAFB', category: 'web' },
  { name: 'Next.js', color: '#000000', category: 'web' },
  { name: 'Node.js', color: '#339933', category: 'web' },
  { name: 'FastAPI', color: '#009688', category: 'web' },
  { name: 'Django', color: '#092E20', category: 'web' },

  // DevOps & Cloud
  { name: 'Docker', color: '#2496ED', category: 'devops' },
  { name: 'Kubernetes', color: '#326CE5', category: 'devops' },
  { name: 'Linux', color: '#FCC624', category: 'devops' },
  { name: 'Git', color: '#F05032', category: 'devops' },
  { name: 'CI/CD', color: '#4A154B', category: 'devops' },

  // Embedded & IoT
  { name: 'Arduino', color: '#00979D', category: 'iot' },
  { name: 'Raspberry Pi', color: '#C51A4A', category: 'iot' },
  { name: 'C/C++', color: '#00599C', category: 'iot' },
  { name: 'MicroPython', color: '#2B2728', category: 'iot' },

  // Bio & Medical
  { name: 'OpenSlide', color: '#8B5CF6', category: 'bio' },
  { name: 'ImageJ', color: '#5A5A5A', category: 'bio' },
  { name: 'BioInformatics', color: '#10B981', category: 'bio' },

  // Tools
  { name: 'VS Code', color: '#007ACC', category: 'tools' },
  { name: 'Figma', color: '#F24E1E', category: 'tools' },
  { name: 'Postman', color: '#FF6C37', category: 'tools' },
];

const categoryColors: Record<string, string> = {
  data: '#3776AB',
  web: '#61DAFB',
  devops: '#2496ED',
  iot: '#00979D',
  bio: '#10B981',
  tools: '#F24E1E',
};

// Generate orbital animation parameters for each skill
function generateOrbitalParams(index: number, total: number) {
  const baseAngle = (index / total) * 2 * Math.PI;
  const orbitRadius = 100 + (index % 3) * 50 + Math.random() * 30;
  const speed = 20 + Math.random() * 15; // Duration in seconds
  const direction = index % 2 === 0 ? 1 : -1;
  const verticalOffset = (Math.random() - 0.5) * 40;

  return { baseAngle, orbitRadius, speed, direction, verticalOffset };
}

export default function SkillCloud() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [orbitalParams] = useState(() =>
    skills.map((_, index) => generateOrbitalParams(index, skills.length))
  );
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[500px] flex items-center justify-center overflow-hidden stars-bg rounded-2xl"
      role="img"
      aria-label="Interactive cloud of technical skills"
    >
      {/* Animated center glow effect */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.2, 0.3, 0.2]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-64 h-64 bg-[var(--accent)] rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-48 h-48 bg-[var(--accent-secondary)] rounded-full blur-2xl"
      />

      {/* Rotating outer ring */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute w-[400px] h-[400px] rounded-full border border-dashed border-[var(--accent)]/20"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        className="absolute w-[300px] h-[300px] rounded-full border border-dashed border-[var(--accent-secondary)]/20"
      />

      {/* Skills in orbital motion */}
      <div className="relative">
        {skills.map((skill, index) => {
          const params = orbitalParams[index];
          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: 1,
                scale: hoveredSkill === skill.name ? 1.3 : 1,
                x: [
                  Math.cos(params.baseAngle) * params.orbitRadius,
                  Math.cos(params.baseAngle + Math.PI * 0.5 * params.direction) * params.orbitRadius,
                  Math.cos(params.baseAngle + Math.PI * params.direction) * params.orbitRadius,
                  Math.cos(params.baseAngle + Math.PI * 1.5 * params.direction) * params.orbitRadius,
                  Math.cos(params.baseAngle + Math.PI * 2 * params.direction) * params.orbitRadius,
                ],
                y: [
                  Math.sin(params.baseAngle) * params.orbitRadius * 0.5 + params.verticalOffset,
                  Math.sin(params.baseAngle + Math.PI * 0.5 * params.direction) * params.orbitRadius * 0.5 + params.verticalOffset,
                  Math.sin(params.baseAngle + Math.PI * params.direction) * params.orbitRadius * 0.5 + params.verticalOffset,
                  Math.sin(params.baseAngle + Math.PI * 1.5 * params.direction) * params.orbitRadius * 0.5 + params.verticalOffset,
                  Math.sin(params.baseAngle + Math.PI * 2 * params.direction) * params.orbitRadius * 0.5 + params.verticalOffset,
                ],
              }}
              transition={{
                opacity: { delay: index * 0.05, duration: 0.5 },
                scale: { duration: 0.2 },
                x: { duration: params.speed, repeat: Infinity, ease: "linear" },
                y: { duration: params.speed, repeat: Infinity, ease: "linear" },
              }}
              whileHover={{ scale: 1.4, zIndex: 50 }}
              className="absolute cursor-pointer"
              onMouseEnter={() => setHoveredSkill(skill.name)}
              onMouseLeave={() => setHoveredSkill(null)}
              onFocus={() => setHoveredSkill(skill.name)}
              onBlur={() => setHoveredSkill(null)}
              tabIndex={0}
              role="button"
              aria-label={`${skill.name} - ${skill.category}`}
            >
              <div
                className={`
                  flex flex-col items-center justify-center px-4 py-2.5 rounded-lg
                  bg-[var(--card-bg)]/90 border border-[var(--card-border)]
                  backdrop-blur-sm transition-all duration-300
                  hover:border-[var(--accent)] hover:shadow-lg
                  focus:outline-none focus:ring-2 focus:ring-[var(--accent)]
                  ${hoveredSkill === skill.name ? 'border-[var(--accent)] shadow-lg' : ''}
                `}
                style={{
                  boxShadow: hoveredSkill === skill.name
                    ? `0 0 20px ${skill.color}40, 0 4px 12px rgba(0,0,0,0.1)`
                    : '0 2px 8px rgba(0,0,0,0.05)'
                }}
              >
                <div
                  className="w-2 h-2 rounded-full mb-1.5"
                  style={{ backgroundColor: skill.color }}
                />
                <span className={`
                  text-xs font-medium whitespace-nowrap transition-colors
                  ${hoveredSkill === skill.name ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}
                `}>
                  {skill.name}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Hovered skill info */}
      {hoveredSkill && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 px-5 py-2.5 bg-[var(--card-bg)] rounded-lg border border-[var(--accent)]/50 shadow-lg z-50"
        >
          <span className="text-[var(--accent)] font-semibold">{hoveredSkill}</span>
        </motion.div>
      )}

      {/* Category Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-wrap justify-center gap-4 p-3 bg-[var(--card-bg)]/80 backdrop-blur-sm rounded-lg border border-[var(--card-border)]">
        {Object.entries(categoryColors).map(([category, color]) => (
          <div key={category} className="flex items-center gap-1.5">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="text-xs text-[var(--text-muted)] capitalize">{category}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
