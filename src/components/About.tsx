"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  Target,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  Rocket,
  Dna,
  Database,
  Microscope,
  Star,
} from "lucide-react";
import { strengthsData, weaknessesData } from "@/data/skills";

const professionalProjectText = {
  fr: {
    vision: "Data Engineer avec une vision vers les technologies du vivant",
    intro:
      "Actuellement etudiant en 3eme annee de  a l'EPHEC, je me specialise dans l'ingenierie des donnees avec une passion profonde pour les biotechnologies et la nanotechnologie. Je complete mon profil avec un Bachelier en Technologies de la Sante, me permettant de mettre mes competences IT au service du domaine medical - un secteur rigoureux ou la precision compte. Les competences acquises dans ce milieu exigeant sont transferables a tout autre domaine.",
    shortTerm:
      "A court terme, je vise a consolider mon expertise en pipelines de donnees, imagerie medicale et systemes embarques a travers mes stages et projets academiques.",
    mediumTerm:
      "A moyen terme, je souhaite integrer une entreprise innovante dans le domaine de la sante numerique ou des biotechnologies, ou je pourrai combiner mes competences en data engineering avec ma fascination pour les sciences du vivant.",
    longTerm:
      "A long terme, mon ambition est de contribuer au developpement de solutions technologiques qui font le pont entre l'informatique et les sciences de la vie, notamment dans les domaines de la bio-informatique et des nanotechnologies medicales.",
  },
  en: {
    vision: "Data Engineer with a vision towards living technologies",
    intro:
      "Currently a 3rd year student in Bachelor of Information Technology at EPHEC, I specialize in data engineering with a deep passion for biotechnology and nanotechnology. I'm complementing my profile with a Bachelor in Health Technologies, allowing me to apply my IT skills in the medical field - a rigorous domain where precision matters. The skills acquired in this demanding environment are transferable to any other field.",
    shortTerm:
      "In the short term, I aim to consolidate my expertise in data pipelines, medical imaging, and embedded systems through my internships and academic projects.",
    mediumTerm:
      "In the medium term, I want to join an innovative company in digital health or biotechnology, where I can combine my data engineering skills with my fascination for life sciences.",
    longTerm:
      "In the long term, my ambition is to contribute to developing technological solutions that bridge computer science and life sciences, particularly in bioinformatics and medical nanotechnology.",
  },
  nl: {
    vision: "Data Engineer met een visie op levenswetenschappen",
    intro:
      "Momenteel 3e jaars student Bachelor Informatietechnologie aan EPHEC, specialiseer ik me in data engineering met een diepe passie voor biotechnologie en nanotechnologie. Ik vul mijn profiel aan met een Bachelor in Gezondheidstechnologieen, waardoor ik mijn IT-vaardigheden kan inzetten in de medische sector - een rigoureus domein waar precisie telt. De vaardigheden die in deze veeleisende omgeving worden verworven, zijn overdraagbaar naar elk ander domein.",
    shortTerm:
      "Op korte termijn wil ik mijn expertise in datapipelines, medische beeldvorming en embedded systemen consolideren via mijn stages en academische projecten.",
    mediumTerm:
      "Op middellange termijn wil ik bij een innovatief bedrijf in digitale gezondheid of biotechnologie werken, waar ik mijn data engineering vaardigheden kan combineren met mijn fascinatie voor levenswetenschappen.",
    longTerm:
      "Op lange termijn is mijn ambitie om bij te dragen aan technologische oplossingen die informatica en levenswetenschappen verbinden, met name in bio-informatica en medische nanotechnologie.",
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  <Database className="w-5 h-5 text-[var(--western-rust)]" />
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
                  <Microscope className="w-5 h-5 text-[var(--western-gold)]" />
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
                  <Dna className="w-5 h-5 text-emerald-600" />
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
