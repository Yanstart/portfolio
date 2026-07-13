"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Rocket,
  GraduationCap,
  Briefcase,
  Users,
  Star,
} from "lucide-react";
import { strengthsData, weaknessesData } from "@/data/skills";

const professionalProjectText = {
  fr: {
    vision: "Du pilotage de systèmes au pilotage de projets, de la qualité et de la performance",
    intro:
      "J'aime comprendre les systèmes en profondeur avant d'agir. C'est ce qui m'a mené à livrer deux systèmes en production réelle : Varuna, plateforme d'imagerie médicale utilisée par des pathologistes au CHU UCL Namur, et la mise en service de la plateforme satellite de neXat. Ma spécialisation en Technologies de la Santé y a ajouté le contexte qui manquait : normes pharma (GMP, GAMP 5, 21 CFR Part 11), gestion des risques (ISO 14971), maintenance d'équipements et collaboration quotidienne avec des cliniciens. En mai 2026, j'ai remporté CyberWars à Porto avec AEGIS-Rx, un pare-feu IA pour données réglementées, aujourd'hui développé comme un vrai produit : dossier de validation IQ/OQ/PQ, audit trail ALCOA+, 13 change controls. Ces projets m'ont appris plus que le code : cadrer un besoin avec des experts métier, tenir des exigences qualité, piloter par indicateurs et livrer en environnement critique.",
    shortTerm:
      "Décrocher une alternance en qualité, production ou business (septembre 2026) dans le cadre d'un master en alternance, et transformer mes réflexes de terrain en méthode professionnelle.",
    mediumTerm:
      "Piloter des projets et la performance dans un environnement réglementé (pharma, santé, industrie) : KPIs, change control, coordination de parties prenantes.",
    longTerm:
      "Lancer mon activité de conseil et former des équipes autour d'une vision : exploiter les forces de l'informatique et les mettre au service d'autres métiers.",
  },
  en: {
    vision: "From managing systems to managing projects, quality and performance",
    intro:
      "I like to understand systems deeply before I act. That led me to ship two systems to real production: Varuna, a medical imaging platform used by pathologists at CHU UCL Namur, and the commissioning of neXat's satellite service platform. My Health Technologies specialization added the context I was missing: pharma standards (GMP, GAMP 5, 21 CFR Part 11), risk management (ISO 14971), equipment maintenance and daily collaboration with clinicians. In May 2026 I won CyberWars in Porto with AEGIS-Rx, an AI firewall for regulated data, now developed as a real product: IQ/OQ/PQ validation dossier, ALCOA+ audit trail, 13 change controls. These projects taught me more than code: framing needs with domain experts, meeting quality requirements, managing by indicators and delivering in critical environments.",
    shortTerm:
      "Land a work-study contract in quality, production or business (September 2026) as part of a work-study master, and turn my field reflexes into professional method.",
    mediumTerm:
      "Manage projects and performance in a regulated environment (pharma, health, industry): KPIs, change control, stakeholder coordination.",
    longTerm:
      "Launch my own consultancy and build teams around a vision: leverage the strengths of IT and put them at the service of other disciplines.",
  },
  nl: {
    vision: "Van systeembeheer naar project-, kwaliteits- en performantiebeheer",
    intro:
      "Ik begrijp systemen graag in de diepte voordat ik handel. Zo leverde ik twee systemen in echte productie: Varuna, een medisch beeldvormingsplatform gebruikt door pathologen bij CHU UCL Namur, en de ingebruikname van het satellietplatform van neXat. Mijn specialisatie Gezondheidstechnologieën voegde de ontbrekende context toe: farmanormen (GMP, GAMP 5, 21 CFR Part 11), risicobeheer (ISO 14971), onderhoud van apparatuur en dagelijkse samenwerking met clinici. In mei 2026 won ik CyberWars in Porto met AEGIS-Rx, een AI-firewall voor gereguleerde data, nu ontwikkeld als een echt product: IQ/OQ/PQ-validatiedossier, ALCOA+ audit trail, 13 change controls. Deze projecten leerden me meer dan code: behoeften kaderen met domeinexperts, kwaliteitseisen halen, sturen op indicatoren en leveren in kritieke omgevingen.",
    shortTerm:
      "Een werk-leertraject vinden in kwaliteit, productie of business (september 2026) binnen een alternerende master, en mijn veldreflexen omzetten in professionele methode.",
    mediumTerm:
      "Projecten en performantie beheren in een gereguleerde omgeving (farma, gezondheid, industrie): KPI's, change control, stakeholdercoördinatie.",
    longTerm:
      "Mijn eigen adviesbureau starten en teams vormen rond een visie: de kracht van IT benutten en ten dienste stellen van andere disciplines.",
  },
};

export default function About() {
  const t = useTranslations("about");
  const locale = useLocale() as "fr" | "en" | "nl";

  const titleKey = `title${
    locale.charAt(0).toUpperCase() + locale.slice(1)
  }` as "titleFr" | "titleEn" | "titleNl";
  const descKey = `description${
    locale.charAt(0).toUpperCase() + locale.slice(1)
  }` as "descriptionFr" | "descriptionEn" | "descriptionNl";
  const improvementKey = `improvement${
    locale.charAt(0).toUpperCase() + locale.slice(1)
  }` as "improvementFr" | "improvementEn" | "improvementNl";

  const project = professionalProjectText[locale];

  return (
    <section id="about" className="py-20 relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[var(--western-brown)] to-transparent opacity-30" />

      <div className="container-wide">
        {/* Section Header - Western Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[var(--western-brown)]" />
            <Star className="w-6 h-6 text-[var(--western-gold)]" />
            <h2
              className="text-3xl sm:text-4xl text-center text-gradient"
              style={{ fontFamily: "'Rye', serif" }}
            >
              {t("title")}
            </h2>
            <Star className="w-6 h-6 text-[var(--western-gold)]" />
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[var(--western-brown)]" />
          </div>
        </motion.div>

        {/* Professional Project - Newspaper Style */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="relative bg-[var(--card-bg)] border-4 border-[var(--western-brown)] p-6 sm:p-8 shadow-[6px_6px_0_var(--western-brown-dark)]">
            {/* Newspaper header */}
            <div className="border-b-4 border-double border-[var(--western-brown)] pb-4 mb-6">
              <div className="text-center">
                <span
                  className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  Breaking News
                </span>
                <h3
                  className="text-2xl sm:text-3xl mt-2 text-[var(--text-primary)]"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {t("professionalProject")}
                </h3>
              </div>
            </div>

            {/* Vision badge */}
            <div className="flex justify-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--western-rust)]/10 border-2 border-dashed border-[var(--western-rust)]">
                <Target className="w-5 h-5 text-[var(--western-rust)]" />
                <span
                  className="text-sm uppercase tracking-wider text-[var(--western-rust)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  {project.vision}
                </span>
              </div>
            </div>

            {/* Intro text - Telegram style */}
            <div className="mb-8 p-4 bg-[var(--western-parchment)]/30 dark:bg-[var(--western-brown)]/10 border-l-4 border-[var(--western-gold)]">
              <p
                className="text-[var(--text-secondary)] text-lg leading-relaxed first-letter:text-4xl first-letter:font-bold first-letter:text-[var(--western-rust)] first-letter:float-left first-letter:mr-2"
                style={{ fontFamily: "'IM Fell English', serif" }}
              >
                {project.intro}
              </p>
            </div>

            {/* Timeline Cards - Staggered Layout */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Short term - Left aligned */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-3 left-4 bg-[var(--card-bg)] px-2">
                  <GraduationCap className="w-5 h-5 text-[var(--western-rust)]" />
                </div>
                <div className="p-4 border-2 border-[var(--western-brown)] bg-[var(--card-bg)] h-full">
                  <span
                    className="text-xs font-medium text-[var(--western-rust)] uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {locale === "fr"
                      ? "Court terme"
                      : locale === "nl"
                      ? "Korte termijn"
                      : "Short term"}
                  </span>
                  <p
                    className="text-[var(--text-secondary)] text-sm leading-relaxed"
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  >
                    {project.shortTerm}
                  </p>
                </div>
              </motion.div>

              {/* Medium term - Center, elevated */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                viewport={{ once: true }}
                className="relative lg:-mt-4"
              >
                <div className="absolute -top-3 left-4 bg-[var(--card-bg)] px-2">
                  <Briefcase className="w-5 h-5 text-[var(--western-gold)]" />
                </div>
                <div className="p-4 border-2 border-[var(--western-gold)] bg-[var(--card-bg)] shadow-[4px_4px_0_var(--western-brown-dark)] h-full">
                  <span
                    className="text-xs font-medium text-[var(--western-gold)] uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {locale === "fr"
                      ? "Moyen terme"
                      : locale === "nl"
                      ? "Middellange termijn"
                      : "Medium term"}
                  </span>
                  <p
                    className="text-[var(--text-secondary)] text-sm leading-relaxed"
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  >
                    {project.mediumTerm}
                  </p>
                </div>
              </motion.div>

              {/* Long term - Right aligned */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute -top-3 left-4 bg-[var(--card-bg)] px-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="p-4 border-2 border-[var(--western-brown)] bg-[var(--card-bg)] h-full">
                  <span
                    className="text-xs font-medium text-emerald-600 uppercase tracking-widest block mb-2"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {locale === "fr"
                      ? "Long terme"
                      : locale === "nl"
                      ? "Lange termijn"
                      : "Long term"}
                  </span>
                  <p
                    className="text-[var(--text-secondary)] text-sm leading-relaxed"
                    style={{ fontFamily: "'IM Fell English', serif" }}
                  >
                    {project.longTerm}
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Strengths & Weaknesses - Asymmetric Layout */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Strengths - Takes more space */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="lg:col-span-7"
          >
            <div className="bg-[var(--card-bg)] border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)]">
              {/* Header with decorative elements */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[var(--western-brown-light)]">
                <div className="p-2 bg-emerald-600/20 border-2 border-emerald-600">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <h3
                  className="text-xl uppercase tracking-wider text-[var(--text-primary)]"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {t("strengths")}
                </h3>
                <div className="ml-auto flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <span key={i} className="text-[var(--western-gold)]">
                      ★
                    </span>
                  ))}
                </div>
              </div>

              <p
                className="text-[var(--text-muted)] mb-6 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("strengthsIntro")}
              </p>

              <div className="space-y-4">
                {strengthsData.map((strength, index) => (
                  <motion.div
                    key={strength.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex gap-4 p-4 bg-emerald-600/5 border-l-4 border-emerald-600 hover:bg-emerald-600/10 transition-colors"
                  >
                    <Lightbulb className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h4
                        className="font-semibold text-[var(--text-primary)] mb-1"
                        style={{ fontFamily: "'Cinzel', serif" }}
                      >
                        {strength[titleKey]}
                      </h4>
                      <p
                        className="text-[var(--text-muted)] text-sm"
                        style={{ fontFamily: "'IM Fell English', serif" }}
                      >
                        {strength[descKey]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Weaknesses - Smaller, offset */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-5 lg:mt-12"
          >
            <div className="bg-[var(--card-bg)] border-4 border-[var(--western-brown)] p-6 shadow-[6px_6px_0_var(--western-brown-dark)]">
              {/* Header */}
              <div className="flex items-center gap-3 mb-6 pb-4 border-b-2 border-dashed border-[var(--western-brown-light)]">
                <div className="p-2 bg-[var(--western-gold)]/20 border-2 border-[var(--western-gold)]">
                  <TrendingDown className="w-5 h-5 text-[var(--western-gold)]" />
                </div>
                <h3
                  className="text-xl uppercase tracking-wider text-[var(--text-primary)]"
                  style={{ fontFamily: "'Rye', serif" }}
                >
                  {t("weaknesses")}
                </h3>
              </div>

              <p
                className="text-[var(--text-muted)] mb-6 italic"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                {t("weaknessesIntro")}
              </p>

              <div className="space-y-4">
                {weaknessesData.map((weakness, index) => (
                  <motion.div
                    key={weakness.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="p-4 bg-[var(--western-gold)]/5 border-l-4 border-[var(--western-gold)] hover:bg-[var(--western-gold)]/10 transition-colors"
                  >
                    <h4
                      className="font-semibold text-[var(--text-primary)] mb-1"
                      style={{ fontFamily: "'Cinzel', serif" }}
                    >
                      {weakness[titleKey]}
                    </h4>
                    <p
                      className="text-[var(--text-muted)] text-sm mb-3"
                      style={{ fontFamily: "'IM Fell English', serif" }}
                    >
                      {weakness[descKey]}
                    </p>
                    <div className="flex items-start gap-2 p-2 bg-emerald-600/10 border border-dashed border-emerald-600">
                      <Rocket className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <p
                        className="text-emerald-600 text-xs"
                        style={{ fontFamily: "'Special Elite', monospace" }}
                      >
                        {weakness[improvementKey]}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex justify-center">
        <div className="text-[var(--western-gold)] text-2xl opacity-30">❦</div>
      </div>
    </section>
  );
}
