'use client';

import { useState, useMemo } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Award,
  Trophy,
  BookOpen,
  Mic,
  Building2,
  Users,
  Landmark,
  Rocket,
  GraduationCap,
  Heart,
  Sun,
  Handshake,
  Briefcase,
  Database,
  Dna,
  Satellite,
  Cpu,
  Code2,
  Brain,
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { activitiesData, activityTypes, themes, type Activity } from '@/data/activities';

const ITEMS_PER_PAGE = 6; // 2 rows of 3

// Icon mapping for activity types
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Trophy, BookOpen, Mic, Building2, Users, Landmark,
  Rocket, Award, GraduationCap, Heart, Sun, Handshake, Briefcase,
};

// Icon mapping for themes
const themeIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'data-engineering': Database,
  'medical-imaging': Dna,
  'telecom': Satellite,
  'iot-embedded': Cpu,
  'fullstack': Code2,
  'ai-automation': Brain,
};

export default function Activities() {
  const t = useTranslations('activities');
  const locale = useLocale() as 'fr' | 'en' | 'nl';
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Filter activities
  const filteredActivities = useMemo(() => {
    let result = activitiesData;

    if (selectedTheme) {
      result = result.filter(
        (activity) =>
          activity.theme.fr === themes.find((th) => th.id === selectedTheme)?.name.fr ||
          activity.theme.en === themes.find((th) => th.id === selectedTheme)?.name.en ||
          activity.theme.nl === themes.find((th) => th.id === selectedTheme)?.name.nl
      );
    }

    if (selectedType) {
      result = result.filter((activity) => activity.type === selectedType);
    }

    return result;
  }, [selectedTheme, selectedType]);

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / ITEMS_PER_PAGE);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset page when filters change
  const handleThemeChange = (theme: string | null) => {
    setSelectedTheme(theme);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string | null) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // Hours data kept but not displayed - const totalHours = activitiesData.reduce((sum, activity) => sum + activity.hours, 0);
  const activityTypeKeys = Object.keys(activityTypes) as Array<keyof typeof activityTypes>;

  return (
    <section id="activities" className="py-12 relative">
      <div className="container-wide">
        {/* Header - Compact */}
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
          <p className="text-[var(--text-secondary)] text-sm mb-3" style={{ fontFamily: "'IM Fell English', serif" }}>
            {t('subtitle')}
          </p>
          {/* Stats badges */}
          <div className="inline-flex items-center gap-2 text-xs" style={{ fontFamily: "'Special Elite', monospace" }}>
            <span className="px-2 py-1 border border-[var(--western-brown-light)] text-[var(--text-muted)]">
              {themes.length} Themes
            </span>
            <span className="px-2 py-1 border border-[var(--western-brown-light)] text-[var(--text-muted)]">
              {activitiesData.length} Activities
            </span>
          </div>
        </motion.div>

        {/* Filters - Compact horizontal */}
        <div className="mb-6 space-y-3">
          {/* Theme Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            <button
              onClick={() => handleThemeChange(null)}
              className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2 ${
                selectedTheme === null
                  ? 'bg-[var(--tech-blue)] text-white border-2 border-[var(--tech-blue)]'
                  : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border-2 border-[var(--western-brown-light)] hover:border-[var(--tech-blue)]'
              }`}
              style={{ fontFamily: "'Cinzel', serif" }}
              aria-label={locale === 'fr' ? 'Afficher toutes les activités' : locale === 'nl' ? 'Toon alle activiteiten' : 'Show all activities'}
              aria-pressed={selectedTheme === null}
            >
              {locale === 'fr' ? 'Tous' : locale === 'nl' ? 'Alles' : 'All'}
            </button>
            {themes.map((theme) => {
              const ThemeIcon = themeIconMap[theme.id];
              return (
                <button
                  key={theme.id}
                  onClick={() => handleThemeChange(theme.id)}
                  className={`px-3 py-1.5 text-xs font-medium transition-all flex items-center gap-1.5 focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2 ${
                    selectedTheme === theme.id
                      ? 'bg-[var(--tech-blue)] text-white border-2 border-[var(--tech-blue)]'
                      : 'bg-[var(--card-bg)] text-[var(--text-secondary)] border-2 border-[var(--western-brown-light)] hover:border-[var(--tech-blue)]'
                  }`}
                  style={{ fontFamily: "'Cinzel', serif" }}
                  aria-label={`${locale === 'fr' ? 'Filtrer par' : locale === 'nl' ? 'Filter op' : 'Filter by'} ${theme.name[locale]}`}
                  aria-pressed={selectedTheme === theme.id}
                >
                  {ThemeIcon && <ThemeIcon className="w-3.5 h-3.5" aria-hidden="true" />}
                  <span className="hidden sm:inline">{theme.name[locale]}</span>
                  <span className="sr-only sm:hidden">{theme.name[locale]}</span>
                </button>
              );
            })}
          </div>

          {/* Type Filter */}
          <div className="flex flex-wrap justify-center gap-1.5" role="group" aria-label={locale === 'fr' ? 'Filtrer par type' : locale === 'nl' ? 'Filter op type' : 'Filter by type'}>
            <button
              onClick={() => handleTypeChange(null)}
              className={`px-2 py-1 text-xs transition-all focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2 ${
                selectedType === null
                  ? 'bg-[var(--western-gold)] text-[var(--western-ink)]'
                  : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--western-gold)]'
              }`}
              style={{ fontFamily: "'Special Elite', monospace" }}
              aria-label={locale === 'fr' ? 'Afficher tous les types' : locale === 'nl' ? 'Toon alle types' : 'Show all types'}
              aria-pressed={selectedType === null}
            >
              All types
            </button>
            {activityTypeKeys.slice(0, 6).map((key) => {
              const typeInfo = activityTypes[key];
              const IconComponent = iconMap[typeInfo.lucideIcon];
              return (
                <button
                  key={key}
                  onClick={() => handleTypeChange(key)}
                  className={`px-2 py-1 text-xs transition-all flex items-center gap-1 focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2 ${
                    selectedType === key
                      ? `${typeInfo.color} text-white`
                      : 'bg-transparent text-[var(--text-muted)] hover:text-[var(--western-gold)]'
                  }`}
                  style={{ fontFamily: "'Special Elite', monospace" }}
                  aria-label={`${locale === 'fr' ? 'Filtrer par' : locale === 'nl' ? 'Filter op' : 'Filter by'} ${typeInfo[locale]}`}
                  aria-pressed={selectedType === key}
                >
                  {IconComponent && <IconComponent className="w-3 h-3" aria-hidden="true" />}
                  <span className="hidden md:inline">{typeInfo[locale]}</span>
                  <span className="sr-only md:hidden">{typeInfo[locale]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Activities Grid - 3 columns */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <AnimatePresence mode="popLayout">
            {paginatedActivities.map((activity, index) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                index={index}
                locale={locale}
                isExpanded={expandedId === activity.id}
                onToggle={() => toggleExpand(activity.id)}
                t={t}
              />
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center gap-2"
          >
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:border-[var(--tech-blue)] hover:text-[var(--tech-blue)] disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2"
              aria-label={locale === 'fr' ? 'Page précédente' : locale === 'nl' ? 'Vorige pagina' : 'Previous page'}
            >
              <ChevronLeft className="w-4 h-4" aria-hidden="true" />
            </button>

            <div className="flex items-center gap-1" role="group" aria-label="Pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2 ${
                    currentPage === page
                      ? 'bg-[var(--tech-blue)] text-white border-2 border-[var(--tech-blue)]'
                      : 'border-2 border-[var(--western-brown-light)] text-[var(--text-muted)] hover:border-[var(--tech-blue)]'
                  }`}
                  style={{ fontFamily: "'Special Elite', monospace" }}
                  aria-label={`Page ${page}`}
                  aria-current={currentPage === page ? 'page' : undefined}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 border-2 border-[var(--western-brown)] text-[var(--text-secondary)] hover:border-[var(--tech-blue)] hover:text-[var(--tech-blue)] disabled:opacity-30 disabled:cursor-not-allowed transition-all focus-visible:ring-2 focus-visible:ring-[var(--western-gold)] focus-visible:ring-offset-2"
              aria-label={locale === 'fr' ? 'Page suivante' : locale === 'nl' ? 'Volgende pagina' : 'Next page'}
            >
              <ChevronRight className="w-4 h-4" aria-hidden="true" />
            </button>
          </motion.div>
        )}

        {/* Results count */}
        <div className="text-center mt-4">
          <span className="text-xs text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
            Showing {paginatedActivities.length} of {filteredActivities.length} activities
          </span>
        </div>
      </div>
    </section>
  );
}

interface ActivityCardProps {
  activity: Activity;
  index: number;
  locale: 'fr' | 'en' | 'nl';
  isExpanded: boolean;
  onToggle: () => void;
  t: ReturnType<typeof useTranslations<'activities'>>;
}

function ActivityCard({ activity, index, locale, isExpanded, onToggle, t }: ActivityCardProps) {
  const typeInfo = activityTypes[activity.type];
  const IconComponent = iconMap[typeInfo.lucideIcon];

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      viewport={{ once: true }}
      className="bg-[var(--card-bg)] border-3 border-[var(--western-brown)] shadow-[3px_3px_0_var(--western-brown-dark)] hover:shadow-[4px_4px_0_var(--western-brown-dark)] hover:-translate-y-0.5 transition-all duration-200"
    >
      {/* Card Header */}
      <div
        className="p-3 cursor-pointer focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--western-gold)]"
        onClick={onToggle}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onToggle()}
        aria-expanded={isExpanded}
        aria-label={`${activity.title[locale]} - ${isExpanded ? t('collapse') || 'Collapse' : t('expand') || 'Expand'}`}
      >
        {/* Type & Theme badges */}
        <div className="flex flex-wrap items-center gap-1.5 mb-2">
          <span className={`text-[10px] px-1.5 py-0.5 ${typeInfo.color} text-white font-medium flex items-center gap-1`}>
            {IconComponent && <IconComponent className="w-3 h-3" />}
            {typeInfo[locale]}
          </span>
          <span className="text-[10px] text-[var(--text-muted)] px-1.5 py-0.5 bg-[var(--background)] border border-[var(--card-border)]">
            {activity.theme[locale]}
          </span>
        </div>

        {/* Title */}
        <h3
          className="text-sm font-semibold text-[var(--text-primary)] mb-1 line-clamp-2 leading-tight"
          style={{ fontFamily: "'Cinzel', serif" }}
        >
          {activity.title[locale]}
        </h3>

        {/* Description preview */}
        <p className="text-[var(--text-secondary)] text-xs line-clamp-2 mb-2" style={{ fontFamily: "'IM Fell English', serif" }}>
          {activity.description[locale]}
        </p>

        {/* Meta info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]" style={{ fontFamily: "'Special Elite', monospace" }}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {activity.date}
            </span>
          </div>
          <span className="p-1 hover:bg-[var(--tech-blue)]/10 transition-colors" aria-hidden="true">
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-[var(--tech-blue)]" />
            ) : (
              <ChevronDown className="w-4 h-4 text-[var(--text-muted)]" />
            )}
          </span>
        </div>
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 border-t border-dashed border-[var(--western-brown-light)] pt-3 space-y-3">
              {/* Reflection */}
              <div>
                <h4 className="text-xs font-semibold text-[var(--tech-blue)] mb-1 flex items-center gap-1">
                  <span className="w-1 h-3 bg-[var(--tech-blue)]" />
                  {t('reflection')}
                </h4>
                <p className="text-[var(--text-secondary)] text-xs leading-relaxed" style={{ fontFamily: "'IM Fell English', serif" }}>
                  {activity.reflection[locale]}
                </p>
              </div>

              {/* Tags */}
              {activity.tags && activity.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {activity.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 text-[10px] bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] border border-[var(--tech-blue)]/30"
                      style={{ fontFamily: "'Special Elite', monospace" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Links */}
              {(activity.proof || activity.link) && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-dashed border-[var(--western-brown-light)]">
                  {activity.proof && (
                    <a
                      href={activity.proof}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--western-gold)]/10 text-[var(--western-gold)] text-xs hover:bg-[var(--western-gold)]/20 transition-colors"
                    >
                      <Award className="w-3 h-3" />
                      Cert
                    </a>
                  )}
                  {activity.link && (
                    <a
                      href={activity.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 px-2 py-1 bg-[var(--tech-blue)]/10 text-[var(--tech-blue)] text-xs hover:bg-[var(--tech-blue)]/20 transition-colors"
                    >
                      <ExternalLink className="w-3 h-3" />
                      Link
                    </a>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}
