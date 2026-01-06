'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Download, Briefcase, GraduationCap, Award, Calendar, MapPin, ExternalLink, Languages, Star, Rocket, Sparkles, Trophy, Globe } from 'lucide-react';

const experiences = [
  {
    id: 'exp-0',
    title: {
      fr: 'Stagiaire Network & Cloud Integration',
      en: 'Network & Cloud Integration Intern',
      nl: 'Stagiair Network & Cloud Integratie'
    },
    company: 'neXat',
    companyUrl: 'https://nexat.be/',
    location: 'Belgique',
    period: '10/2025 - 01/2026',
    upcoming: true,
    description: {
      fr: 'Installation et validation de la plateforme de demonstration neXat Service Delivery Platform. Focus sur le module Traffic Shaping and Routing (TSR) pour les communications satellite. Integration MANO avec OpenShift et orchestration Cisco CSR.',
      en: 'Installation and validation of neXat Service Delivery Platform demonstration. Focus on Traffic Shaping and Routing (TSR) module for satellite communications. MANO integration with OpenShift and Cisco CSR orchestration.',
      nl: 'Installatie en validatie van neXat Service Delivery Platform demonstratie. Focus op Traffic Shaping and Routing (TSR) module voor satellietcommunicatie. MANO integratie met OpenShift en Cisco CSR orchestratie.',
    },
    tags: ['OpenShift', 'Cisco CSR', 'MANO', 'Network Orchestration', 'Python', 'Linux'],
    color: '#326CE5',
  },
  {
    id: 'exp-1',
    title: {
      fr: 'Stagiaire Data & Medical Imaging',
      en: 'Data & Medical Imaging Intern',
      nl: 'Stagiair Data & Medische Beeldvorming'
    },
    company: 'CHU UCL Namur',
    location: 'Namur, Belgique',
    period: '2024 - 2025',
    description: {
      fr: 'Developpement de solutions pour l\'imagerie medicale et l\'analyse de donnees pathologiques. Travail sur des projets de detection automatique et visualisation de lames medicales.',
      en: 'Development of solutions for medical imaging and pathological data analysis. Work on automatic detection projects and visualization of medical slides.',
      nl: 'Ontwikkeling van oplossingen voor medische beeldvorming en pathologische data-analyse. Werken aan automatische detectieprojecten en visualisatie van medische dia\'s.',
    },
    tags: ['Python', 'OpenSlide', 'Medical Imaging', 'Data Analysis'],
    color: '#10B981',
  },
  {
    id: 'exp-2',
    title: {
      fr: 'Data Quality Student',
      en: 'Data Quality Student',
      nl: 'Data Quality Student'
    },
    company: 'Wequity',
    companyUrl: 'https://www.wequity.app/',
    location: 'Bruxelles, Belgique',
    period: '2024',
    description: {
      fr: 'Collaboration avec des Data Engineers sur des projets de qualite des donnees. Decouverte des coulisses de l\'AI scraping et utilisation des APIs (OpenAI). Innovation sur les pipelines de donnees.',
      en: 'Collaboration with Data Engineers on data quality projects. Discovery of AI scraping behind the scenes and API usage (OpenAI). Innovation on data pipelines.',
      nl: 'Samenwerking met Data Engineers aan datakwaliteitsprojecten. Ontdekking van AI scraping achter de schermen en API-gebruik (OpenAI). Innovatie op datapipelines.',
    },
    tags: ['Python', 'OpenAI API', 'Data Quality', 'Web Scraping'],
    color: '#8B5CF6',
  },
  {
    id: 'exp-3',
    title: {
      fr: 'Etudiant benevole international',
      en: 'International Student Volunteer',
      nl: 'Internationale Studentenvrijwilliger'
    },
    company: 'EPHEC & Schola ULB',
    companyUrl: 'https://www.schola-ulb.be/',
    location: 'Bruxelles, Belgique',
    period: '2023 - Present',
    description: {
      fr: 'Accompagnement d\'etudiants internationaux, soutien scolaire via Schola ULB, et participation active a la vie associative de l\'EPHEC.',
      en: 'Support for international students, tutoring via Schola ULB, and active participation in EPHEC\'s student associations.',
      nl: 'Begeleiding van internationale studenten, bijles via Schola ULB, en actieve deelname aan het studentenleven van EPHEC.',
    },
    color: '#F59E0B',
  },
];

const education = [
  {
    id: 'edu-0',
    degree: {
      fr: 'Bachelier de specialisation en Technologies de la Sante',
      en: 'Specialization Bachelor in Health Technologies',
      nl: 'Specialisatie Bachelor in Gezondheidstechnologieen'
    },
    school: 'EPHEC & Haute Ecole Leonard de Vinci',
    location: 'Bruxelles, Belgique',
    period: '2025 - 2026',
    upcoming: true,
    description: {
      fr: 'Formation interdisciplinaire: E-Health, dispositifs (para)medicaux connectes, maintenance des equipements, bio-informatique. Pont entre IT et sciences de la vie.',
      en: 'Interdisciplinary program: E-Health, connected (para)medical devices, equipment maintenance, bioinformatics. Bridge between IT and life sciences.',
      nl: 'Interdisciplinair programma: E-Health, verbonden (para)medische apparaten, apparatuuronderhoud, bio-informatica. Brug tussen IT en levenswetenschappen.',
    },
    courses: ['E-Health', 'Medical Devices', 'BioInformatics', 'Healthcare IT'],
    color: '#EC4899',
  },
  {
    id: 'edu-1',
    degree: {
      fr: 'Bachelier en Technologies de l\'Informatique',
      en: 'Bachelor in Information Technology',
      nl: 'Bachelor in Informatietechnologie'
    },
    school: 'EPHEC',
    location: 'Louvain-la-Neuve, Belgique',
    period: '2022 - 2025',
    description: {
      fr: 'Specialisation en developpement logiciel, data engineering, reseaux et systemes embarques. Projets: Varuna (monitoring IoT), QUICK- (telecom).',
      en: 'Specialization in software development, data engineering, networks and embedded systems. Projects: Varuna (IoT monitoring), QUICK- (telecom).',
      nl: 'Specialisatie in softwareontwikkeling, data engineering, netwerken en embedded systemen. Projecten: Varuna (IoT monitoring), QUICK- (telecom).',
    },
    color: '#0EA5E9',
  },
];

const certifications = [
  {
    id: "cert-1",
    name: "System Administration and IT Infrastructure Services",
    issuer: "Google IT- Coursera",
    date: "jan 2026",
    verifyUrl: "https://coursera.org/verify/XFNR4AHOPBQF",
    color: "#4285F4",
  },
  {
    id: "cert-2",
    name: "Entrepreneurship 1: Developing the Opportunity",
    issuer: "University of Pennsylvania - Coursera",
    date: "jan 2026",
    verifyUrl: "https://coursera.org/verify/U7OTCO0NXOFJ",
    color: "#011F5B",
  },
  {
    id: "cert-3",
    name: "Cybersecurity Architecture",
    issuer: "IBM Cybersecurity Analyst - Coursera",
    date: "jan 2026",
    verifyUrl: "https://coursera.org/verify/GDCT625IG9NQ",
    color: "#054ADA",
  },
  {
    id: "cert-4",
    name: "Introduction to Data Engineering",
    issuer: "IBM Data Warehouse Engineer - Coursera",
    date: "Jul 2025",
    verifyUrl: "https://coursera.org/verify/UMDMRZTNZTYB",
    color: "#3B82F6",
  },
  {
    id: "cert-5",
    name: "Introduction to Enterprise Computing",
    issuer: "IBM z/OS Mainframe Practitioner - Coursera",
    date: "Jul 2025",
    verifyUrl: "https://coursera.org/verify/P6770WCTLSVY",
    color: "#6366F1",
  },
  {
    id: "cert-6",
    name: "Introduction to Project Management",
    issuer: "IBM IT Project Manager - Coursera",
    date: "Jul 2025",
    verifyUrl: "https://coursera.org/verify/",
    color: "#6366F1",
  },
  {
    id: "cert-7",
    name: "GitHub CoPilot for Beginners",
    issuer: "CopilotCoursera",
    date: "Mar 2025",
    verifyUrl: "https://coursera.org/verify/UJCAS77WLF6A",
    color: "#8B5CF6",
  },
];

const languages = [
  { name: { fr: 'Francais', en: 'French', nl: 'Frans' }, level: { fr: 'Natif', en: 'Native', nl: 'Moedertaal' }, color: '#3B82F6', percent: 100 },
  { name: { fr: 'Anglais', en: 'English', nl: 'Engels' }, level: 'B2', color: '#10B981', percent: 75 },
  { name: { fr: 'Neerlandais', en: 'Dutch', nl: 'Nederlands' }, level: 'B1', color: '#F59E0B', percent: 60 },
  { name: { fr: 'Allemand', en: 'German', nl: 'Duits' }, level: 'A2', color: '#EF4444', percent: 40 },
];

export default function CV() {
  const t = useTranslations('cv');
  const locale = useLocale() as 'fr' | 'en' | 'nl';

  return (
    <section id="cv" className="py-20 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 right-1/4 w-80 h-80 bg-[var(--tech-blue)]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.2, 0.1],
            y: [0, -50, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-1/4 w-96 h-96 bg-[#10B981]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.1, 0.15, 0.1],
            x: [0, 30, 0],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#8B5CF6]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.05, 0.1, 0.05],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Decorative top with gradient */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--tech-blue)] via-[#8B5CF6] to-[#10B981]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header - Newspaper Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-block mb-6">
            <div className="flex items-center justify-center gap-4 mb-2">
              <motion.div animate={{ rotate: [0, 360] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-6 h-6 text-[var(--tech-blue)]" />
              </motion.div>
              <h2
                className="text-4xl sm:text-5xl bg-gradient-to-r from-[var(--tech-blue)] via-[#8B5CF6] to-[#10B981] bg-clip-text text-transparent"
                style={{ fontFamily: "'Rye', serif" }}
              >
                {t('title')}
              </h2>
              <motion.div animate={{ rotate: [360, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
                <Sparkles className="w-6 h-6 text-[#10B981]" />
              </motion.div>
            </div>
            <div className="h-1 bg-gradient-to-r from-transparent via-[var(--tech-blue)] to-transparent" />
          </div>

          <motion.a
            href="https://drive.google.com/drive/u/0/folders/1pUdeRXuaKXFYtRezYkPjYE9QcwYcHJCR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 uppercase tracking-wider transition-all border-2 border-[var(--western-brown-dark)] shadow-[4px_4px_0_var(--western-brown-dark)] relative overflow-hidden group"
            style={{
              fontFamily: "'Cinzel', serif",
              background: 'linear-gradient(135deg, var(--tech-blue), #8B5CF6)',
              color: 'white',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '2px 2px 0 var(--western-brown-dark)',
            }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ['-100%', '100%'] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
            />
            <Download className="w-5 h-5 relative z-10" />
            <span className="relative z-10">{t('download')}</span>
          </motion.a>
        </motion.div>

        {/* Main Grid - Asymmetric newspaper layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Column - Experience (Larger) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              {/* Animated corner */}
              <motion.div
                className="absolute top-0 left-0 w-24 h-24"
                style={{ background: 'linear-gradient(135deg, var(--tech-blue) 0%, transparent 50%)', opacity: 0.1 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-double border-[var(--western-brown)] relative z-10">
                <motion.div
                  className="p-2 border-2"
                  style={{ backgroundColor: 'var(--tech-blue)20', borderColor: 'var(--tech-blue)' }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Briefcase className="w-6 h-6 text-[var(--tech-blue)]" />
                </motion.div>
                <h3
                  className="text-2xl uppercase tracking-wider bg-gradient-to-r from-[var(--tech-blue)] to-[#8B5CF6] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {t('experience')}
                </h3>
                <Rocket className="w-5 h-5 text-[var(--tech-blue)] ml-auto" />
              </div>

              <div className="space-y-6 relative z-10">
                {experiences.map((exp, index) => (
                  <CVCard key={exp.id} item={exp} index={index} locale={locale} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column - Education, Certs, Languages */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-5 space-y-8"
          >
            {/* Education */}
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 right-0 w-20 h-20"
                style={{ background: 'linear-gradient(-45deg, #10B981 0%, transparent 50%)', opacity: 0.1 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b-4 border-double border-[var(--western-brown)]">
                <motion.div
                  className="p-2 border-2"
                  style={{ backgroundColor: '#10B98120', borderColor: '#10B981' }}
                  whileHover={{ rotate: -10, scale: 1.1 }}
                >
                  <GraduationCap className="w-6 h-6 text-[#10B981]" />
                </motion.div>
                <h3
                  className="text-xl uppercase tracking-wider bg-gradient-to-r from-[#10B981] to-[var(--tech-cyan)] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {t('education')}
                </h3>
              </div>

              <div className="space-y-4 relative z-10">
                {education.map((edu, index) => (
                  <CVCard key={edu.id} item={edu} index={index} locale={locale} isEducation />
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              <motion.div
                className="absolute top-0 right-0 w-16 h-16"
                style={{ background: 'linear-gradient(135deg, #F59E0B 0%, transparent 50%)', opacity: 0.15 }}
                animate={{ opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 3, repeat: Infinity }}
              />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[var(--western-brown-light)]">
                <motion.div
                  className="p-2 border-2"
                  style={{ backgroundColor: '#F59E0B20', borderColor: '#F59E0B' }}
                  whileHover={{ rotate: 10, scale: 1.1 }}
                >
                  <Trophy className="w-5 h-5 text-[#F59E0B]" />
                </motion.div>
                <h3
                  className="text-lg uppercase tracking-wider bg-gradient-to-r from-[#F59E0B] to-[#EF4444] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {t('certifications')}
                </h3>
              </div>

              <div className="space-y-3 relative z-10">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group p-3 border-2 border-[var(--western-brown-light)] transition-all bg-[var(--western-parchment)]/10 dark:bg-transparent relative overflow-hidden"
                    whileHover={{
                      borderColor: cert.color,
                      boxShadow: `0 0 15px ${cert.color}40`,
                    }}
                  >
                    <motion.div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(90deg, ${cert.color}10, transparent)` }}
                      initial={{ x: '-100%' }}
                      whileHover={{ x: '0%' }}
                      transition={{ duration: 0.3 }}
                    />
                    <div className="flex items-start justify-between gap-2 relative z-10">
                      <div>
                        <h4
                          className="font-semibold text-[var(--text-primary)] text-sm group-hover:text-[var(--tech-blue)] transition-colors"
                          style={{ fontFamily: "'Cinzel', serif" }}
                        >
                          {cert.name}
                        </h4>
                        <p className="text-[var(--text-muted)] text-xs" style={{ fontFamily: "'Special Elite', monospace" }}>
                          {cert.issuer}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold" style={{ color: cert.color }}>{cert.date}</span>
                        {cert.verifyUrl && (
                          <motion.a
                            href={cert.verifyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 transition-colors"
                            style={{ color: cert.color }}
                            aria-label="Verify certificate"
                            whileHover={{ scale: 1.2 }}
                          >
                            <ExternalLink className="w-3 h-3" />
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-[var(--card-bg)]/90 backdrop-blur-md border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)] relative overflow-hidden">
              <motion.div
                className="absolute bottom-0 left-0 w-20 h-20"
                style={{ background: 'linear-gradient(45deg, #8B5CF6 0%, transparent 50%)', opacity: 0.1 }}
                animate={{ opacity: [0.05, 0.15, 0.05] }}
                transition={{ duration: 4, repeat: Infinity }}
              />

              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[var(--western-brown-light)]">
                <motion.div
                  className="p-2 border-2"
                  style={{ backgroundColor: '#8B5CF620', borderColor: '#8B5CF6' }}
                  whileHover={{ rotate: -10, scale: 1.1 }}
                >
                  <Globe className="w-5 h-5 text-[#8B5CF6]" />
                </motion.div>
                <h3
                  className="text-lg uppercase tracking-wider bg-gradient-to-r from-[#8B5CF6] to-[#EC4899] bg-clip-text text-transparent"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {locale === 'fr' ? 'Langues' : locale === 'nl' ? 'Talen' : 'Languages'}
                </h3>
              </div>

              <div className="space-y-4 relative z-10">
                {languages.map((lang, index) => (
                  <motion.div
                    key={typeof lang.name === 'string' ? lang.name : lang.name[locale]}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span
                        className="text-[var(--text-primary)] font-medium text-sm"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {typeof lang.name === 'string' ? lang.name : lang.name[locale]}
                      </span>
                      <span className="text-xs font-bold" style={{ color: lang.color }}>
                        {typeof lang.level === 'string' ? lang.level : lang.level[locale]}
                      </span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 bg-[var(--western-brown-dark)]/20 border border-[var(--western-brown-light)] overflow-hidden">
                      <motion.div
                        className="h-full"
                        style={{ backgroundColor: lang.color }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                        viewport={{ once: true }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#10B981] via-[#8B5CF6] to-[var(--tech-blue)]" />
    </section>
  );
}

interface CVCardProps {
  item: {
    title?: { fr: string; en: string; nl: string };
    degree?: { fr: string; en: string; nl: string };
    company?: string;
    companyUrl?: string;
    school?: string;
    location: string;
    period: string;
    description: { fr: string; en: string; nl: string };
    upcoming?: boolean;
    tags?: string[];
    courses?: string[];
    color?: string;
  };
  index: number;
  locale: 'fr' | 'en' | 'nl';
  isEducation?: boolean;
}

function CVCard({ item, index, locale, isEducation }: CVCardProps) {
  const accentColor = item.color || 'var(--tech-blue)';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      viewport={{ once: true }}
      className="relative group"
    >
      <motion.div
        className={`p-4 border-2 transition-all ${item.upcoming ? 'border-[var(--western-gold)]' : 'border-[var(--western-brown-light)]'} relative overflow-hidden`}
        whileHover={{
          borderColor: accentColor,
          boxShadow: `0 0 20px ${accentColor}30`,
        }}
      >
        {/* Animated background on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ background: `linear-gradient(135deg, ${accentColor}05, transparent)` }}
        />

        {/* Upcoming badge */}
        {item.upcoming && (
          <motion.div
            className="absolute -top-3 -right-2 px-2 py-0.5 text-xs uppercase tracking-wider flex items-center gap-1"
            style={{
              backgroundColor: accentColor,
              color: 'white',
              fontFamily: "'Special Elite', monospace"
            }}
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Rocket className="w-3 h-3" />
            {locale === 'fr' ? 'A venir' : locale === 'nl' ? 'Binnenkort' : 'Upcoming'}
          </motion.div>
        )}

        {/* Color accent line */}
        <div className="absolute left-0 top-0 bottom-0 w-1" style={{ backgroundColor: accentColor }} />

        {/* Content */}
        <div className="relative z-10 pl-3">
          {/* Title */}
          <h4
            className="text-base font-bold text-[var(--text-primary)] mb-1 group-hover:text-[var(--tech-blue)] transition-colors"
            style={{ fontFamily: "'Cinzel', serif" }}
          >
            {isEducation ? item.degree?.[locale] : item.title?.[locale]}
          </h4>

          {/* Company/School */}
          {item.companyUrl ? (
            <a
              href={item.companyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-sm inline-flex items-center gap-1 transition-colors hover:underline"
              style={{ color: accentColor }}
            >
              {isEducation ? item.school : item.company}
              <ExternalLink className="w-3 h-3" />
            </a>
          ) : (
            <p className="font-medium text-sm" style={{ color: accentColor }}>
              {isEducation ? item.school : item.company}
            </p>
          )}

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 text-xs text-[var(--text-muted)] my-2" style={{ fontFamily: "'Special Elite', monospace" }}>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" style={{ color: accentColor }} />
              {item.period}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" style={{ color: accentColor }} />
              {item.location}
            </span>
          </div>

          {/* Description */}
          <p className="text-[var(--text-secondary)] text-sm leading-relaxed" style={{ fontFamily: "'IM Fell English', serif" }}>
            {item.description[locale]}
          </p>

          {/* Tags */}
          {item.tags && item.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-[var(--western-brown-light)]">
              {item.tags.map((tag) => (
                <motion.span
                  key={tag}
                  className="px-2 py-0.5 text-xs border"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                    fontFamily: "'Special Elite', monospace"
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: `${accentColor}25` }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          {/* Courses */}
          {item.courses && item.courses.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-dashed border-[var(--western-brown-light)]">
              {item.courses.map((course) => (
                <motion.span
                  key={course}
                  className="px-2 py-0.5 text-xs border"
                  style={{
                    backgroundColor: `${accentColor}15`,
                    color: accentColor,
                    borderColor: `${accentColor}40`,
                    fontFamily: "'Special Elite', monospace"
                  }}
                  whileHover={{ scale: 1.05, backgroundColor: `${accentColor}25` }}
                >
                  {course}
                </motion.span>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
