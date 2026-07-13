'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Github, Lock, Star } from 'lucide-react';

type Locale = 'fr' | 'en' | 'nl';

interface WantedProject {
  id: string;
  name: string;
  alias: { fr: string; en: string; nl: string };
  crime: { fr: string; en: string; nl: string };
  bounty: string;
  bountyLabel: { fr: string; en: string; nl: string };
  tags: string[];
  link?: string;
  isPrivate?: boolean;
}

const projects: WantedProject[] = [
  {
    id: 'aegis',
    name: 'AEGIS-Rx',
    alias: {
      fr: 'Le pare-feu IA',
      en: 'The AI Firewall',
      nl: 'De AI Firewall',
    },
    crime: {
      fr: "Empêche la fuite de données réglementées vers les LLMs publics. Agent Rust, SLM local, audit trail ALCOA+, dossier de validation pharma complet (IQ/OQ/PQ, GAMP 5, 21 CFR Part 11). Né du concept vainqueur de CyberWars 2026.",
      en: 'Stops regulated data from leaking into public LLMs. Rust agent, local SLM, ALCOA+ audit trail, full pharma validation dossier (IQ/OQ/PQ, GAMP 5, 21 CFR Part 11). Born from the winning CyberWars 2026 concept.',
      nl: 'Voorkomt dat gereguleerde data naar publieke LLMs lekt. Rust-agent, lokale SLM, ALCOA+ audit trail, volledig farma-validatiedossier. Geboren uit het winnende CyberWars 2026 concept.',
    },
    bounty: '345 tests · F1 0.95 · P99 < 30 ms',
    bountyLabel: { fr: 'Vivant et sous change control', en: 'Alive and under change control', nl: 'Levend en onder change control' },
    tags: ['Rust', 'ONNX', 'GAMP 5', 'ALCOA+'],
    link: 'https://github.com/Yanstart/AEGIS-Rx',
    isPrivate: true,
  },
  {
    id: 'varuna',
    name: 'Varuna',
    alias: {
      fr: "L'imagerie gigapixel",
      en: 'The Gigapixel Viewer',
      nl: 'De Gigapixel Viewer',
    },
    crime: {
      fr: "Permet aux pathologistes du CHU UCL Namur d'analyser des lames histologiques gigapixels dans leur navigateur. Détection ML, conformité RGPD, monitoring de production. Livré en environnement hospitalier.",
      en: 'Lets pathologists at CHU UCL Namur analyse gigapixel histology slides in their browser. ML detection, GDPR compliance, production monitoring. Delivered in a hospital environment.',
      nl: 'Laat pathologen van CHU UCL Namur gigapixel histologiebeelden analyseren in hun browser. ML-detectie, GDPR-conformiteit, productiemonitoring.',
    },
    bounty: 'Gigapixels · RGPD · Prometheus',
    bountyLabel: { fr: 'Capturé par le CHU UCL Namur', en: 'Captured by CHU UCL Namur', nl: 'Gevangen door CHU UCL Namur' },
    tags: ['FastAPI', 'React', 'OpenSlide', 'Keycloak'],
    link: 'https://github.com/Yanstart/VarunaPoC',
  },
  {
    id: 'quick',
    name: 'Quick-',
    alias: {
      fr: "Le plus rapide de l'orbite",
      en: 'Fastest Gun in Orbit',
      nl: 'Snelste van de Baan',
    },
    crime: {
      fr: "Tunnel TCP-over-QUIC transparent en Rust qui accélère le trafic satellite (LEO, MEO, GEO). Fork de Cloudflare quiche, congestion BBR, benchmarks contre QPEP sur profils satellite simulés.",
      en: 'Transparent TCP-over-QUIC tunnel in Rust that accelerates satellite traffic (LEO, MEO, GEO). Cloudflare quiche fork, BBR congestion control, benchmarks against QPEP on simulated satellite profiles.',
      nl: 'Transparante TCP-over-QUIC tunnel in Rust die satellietverkeer versnelt (LEO, MEO, GEO). Cloudflare quiche fork, BBR, benchmarks tegen QPEP.',
    },
    bounty: 'RFC 9000 · BBR · CI complète',
    bountyLabel: { fr: 'Vu pour la dernière fois chez neXat', en: 'Last seen at neXat', nl: 'Laatst gezien bij neXat' },
    tags: ['Rust', 'QUIC', 'BBR', 'Satellite'],
    link: 'https://github.com/Yanstart/Quick-',
  },
  {
    id: 'bridge',
    name: 'Bridge',
    alias: {
      fr: 'Le traducteur de machines',
      en: 'The Machine Whisperer',
      nl: 'De Machinefluisteraar',
    },
    crime: {
      fr: "Passerelle edge qui traduit les trames propriétaires des dispositifs médicaux legacy (RS-232, BLE, HL7v2) en ressources FHIR R4. Connecte le vieux matériel hospitalier au monde moderne.",
      en: 'Edge gateway translating proprietary frames from legacy medical devices (RS-232, BLE, HL7v2) into FHIR R4 resources. Connects old hospital equipment to the modern world.',
      nl: 'Edge-gateway die propriëtaire frames van legacy medische apparaten (RS-232, BLE, HL7v2) vertaalt naar FHIR R4-resources.',
    },
    bounty: 'RS-232 → FHIR R4',
    bountyLabel: { fr: 'Opère entre deux époques', en: 'Operates between two eras', nl: 'Opereert tussen twee tijdperken' },
    tags: ['FHIR', 'HL7v2', 'BLE', 'Edge'],
    link: 'https://github.com/Yanstart/Bridge',
    isPrivate: false,
  },
  {
    id: 'homelab',
    name: 'HomeLab',
    alias: {
      fr: 'Le ranch numérique',
      en: 'The Digital Ranch',
      nl: 'De Digitale Ranch',
    },
    crime: {
      fr: "Laboratoire personnel évolutif : routeurs MikroTik, cluster Proxmox 4 nœuds, réseau de stockage dédié, site distant simulé. Terrain d'expérimentation ITIL, ML, cybersécurité et DevSecOps.",
      en: 'Evolving personal lab: MikroTik routers, 4-node Proxmox cluster, dedicated storage network, simulated remote site. Experimentation ground for ITIL, ML, cybersecurity and DevSecOps.',
      nl: 'Evoluerend persoonlijk lab: MikroTik-routers, Proxmox-cluster met 4 nodes, opslagnetwerk, gesimuleerde externe site. Proeftuin voor ITIL, ML, cybersecurity en DevSecOps.',
    },
    bounty: '4 nœuds · VLANs · iSCSI',
    bountyLabel: { fr: 'Retranché dans le sous-sol', en: 'Holed up in the basement', nl: 'Verschanst in de kelder' },
    tags: ['Proxmox', 'MikroTik', 'ITIL', 'DevSecOps'],
    link: 'https://github.com/Yanstart/HomeLab',
    isPrivate: true,
  },
  {
    id: 'rubyx',
    name: 'Rubyx',
    alias: {
      fr: 'Le casse-tête mécanique',
      en: 'The Puzzle Breaker',
      nl: 'De Puzzelbreker',
    },
    crime: {
      fr: "Robot qui résout un Rubik's Cube : OpenCV scanne les faces, Kociemba calcule la solution, un Arduino Nano pilote 8 servomoteurs. Construit en équipe pendant l'échange au Vietnam (IU VNU, Ho Chi Minh City).",
      en: "Robot that solves a Rubik's Cube: OpenCV scans the faces, Kociemba computes the solution, an Arduino Nano drives 8 servos. Built as a team during the exchange in Vietnam (IU VNU, Ho Chi Minh City).",
      nl: "Robot die een Rubik's Cube oplost: OpenCV scant de vlakken, Kociemba berekent de oplossing, een Arduino Nano stuurt 8 servo's. Gebouwd tijdens de uitwisseling in Vietnam.",
    },
    bounty: 'OpenCV · Kociemba · 8 servos',
    bountyLabel: { fr: 'Recherché à Ho Chi Minh City', en: 'Wanted in Ho Chi Minh City', nl: 'Gezocht in Ho Chi Minh City' },
    tags: ['OpenCV', 'Arduino', 'Python', 'C++'],
    link: 'https://github.com/Yanstart/Rubyx',
  },
];

export default function WantedBoard() {
  const t = useTranslations('wanted');
  const locale = useLocale() as Locale;

  return (
    <section id="wanted" className="py-20 relative">
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-[var(--western-brown)] to-transparent opacity-30" />
      <div className="container-wide">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mb-4"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px flex-1 max-w-32 bg-gradient-to-r from-transparent to-[var(--western-brown)]" />
            <Star className="w-6 h-6 text-[var(--western-gold)]" />
            <h2 className="text-3xl sm:text-4xl text-center text-gradient" style={{ fontFamily: "'Rye', serif" }}>
              {t('title')}
            </h2>
            <Star className="w-6 h-6 text-[var(--western-gold)]" />
            <div className="h-px flex-1 max-w-32 bg-gradient-to-l from-transparent to-[var(--western-brown)]" />
          </div>
          <p
            className="text-center text-[var(--text-muted)] mb-12 uppercase tracking-[0.15em] text-sm"
            style={{ fontFamily: "'Special Elite', monospace" }}
          >
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Posters grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30, rotate: i % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ rotate: 0, scale: 1.02 }}
              transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
              viewport={{ once: true }}
              className="relative bg-[var(--western-parchment)] dark:bg-[var(--card-bg)] border-4 border-double border-[var(--western-brown)] shadow-[6px_6px_0_var(--western-brown-dark)] p-6 flex flex-col"
              style={{ rotate: `${i % 2 === 0 ? -1 : 1}deg` }}
            >
              {/* Nail */}
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[var(--western-brown-dark)] shadow-inner" />

              {/* WANTED header */}
              <p
                className="text-center text-lg tracking-[0.35em] text-[var(--western-rust)] mb-1"
                style={{ fontFamily: "'Rye', serif" }}
              >
                WANTED
              </p>
              <p
                className="text-center text-[11px] uppercase tracking-[0.2em] text-[var(--text-muted)] mb-3"
                style={{ fontFamily: "'Special Elite', monospace" }}
              >
                {p.bountyLabel[locale]}
              </p>
              <div className="h-0.5 bg-gradient-to-r from-transparent via-[var(--western-brown)] to-transparent mb-4" />

              {/* Name + alias */}
              <h3 className="text-center text-2xl text-[var(--text-primary)]" style={{ fontFamily: "'Rye', serif" }}>
                {p.name}
              </h3>
              <p
                className="text-center italic text-[var(--western-rust)] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                « {p.alias[locale]} »
              </p>

              {/* Crime */}
              <p
                className="text-sm leading-relaxed text-[var(--text-secondary)] mb-4 flex-1"
                style={{ fontFamily: "'IM Fell English', serif" }}
              >
                {p.crime[locale]}
              </p>

              {/* Bounty */}
              <div className="text-center border-t border-dashed border-[var(--western-brown-light)] pt-3 mb-4">
                <p
                  className="text-[10px] uppercase tracking-[0.25em] text-[var(--text-muted)]"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  {t('bounty')}
                </p>
                <p className="text-lg font-bold text-[var(--western-gold)]" style={{ fontFamily: "'Rye', serif" }}>
                  {p.bounty}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {p.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] border border-[var(--western-brown-light)] text-[var(--text-muted)] uppercase tracking-wide"
                    style={{ fontFamily: "'Special Elite', monospace" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Link */}
              {p.link && !p.isPrivate && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[var(--western-rust)] text-[var(--western-cream)] uppercase tracking-wider text-sm hover:bg-[var(--western-brown-dark)] transition-colors border-2 border-[var(--western-brown-dark)]"
                  style={{ fontFamily: "'Cinzel', serif" }}
                >
                  <Github className="w-4 h-4" />
                  {t('viewCode')}
                </a>
              )}
              {p.isPrivate && (
                <p
                  className="flex items-center justify-center gap-2 text-[11px] uppercase tracking-wider text-[var(--text-muted)]"
                  style={{ fontFamily: "'Special Elite', monospace" }}
                >
                  <Lock className="w-3.5 h-3.5" />
                  {t('private')}
                </p>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
