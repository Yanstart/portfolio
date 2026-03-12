export interface Skill {
  name: string;
  icon?: string;
}

export interface SkillCategory {
  id: string;
  skills: Skill[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 'frontend',
    skills: [
      { name: 'HTML5/CSS3' },
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React.js' },
      { name: 'Next.js' },
      { name: 'Tailwind CSS' },
      { name: 'Vue.js' },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Rust' },
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Go' },
      { name: 'C/C++' },
      { name: 'Java' },
      { name: 'Node.js' },
      { name: 'REST API' },
    ],
  },
  {
    id: 'systems',
    skills: [
      { name: 'QUIC (RFC 9000)' },
      { name: 'BBR Congestion Control' },
      { name: 'Linux Administration' },
      { name: 'Routing & Switching' },
      { name: 'Network Security' },
      { name: 'systemd' },
    ],
  },
  {
    id: 'database',
    skills: [
      { name: 'MySQL' },
      { name: 'PostgreSQL' },
      { name: 'MongoDB' },
      { name: 'Redis' },
      { name: 'SQL Server' },
      { name: 'Prisma' },
    ],
  },
  {
    id: 'devops',
    skills: [
      { name: 'Git/GitHub' },
      { name: 'Docker' },
      { name: 'GitHub Actions' },
      { name: 'Prometheus' },
      { name: 'Grafana' },
      { name: 'Keycloak' },
      { name: 'OpenTelemetry' },
    ],
  },
  {
    id: 'tools',
    skills: [
      { name: 'VS Code' },
      { name: 'IntelliJ IDEA' },
      { name: 'Jira' },
      { name: 'Figma' },
      { name: 'Postman' },
      { name: 'Notion' },
    ],
  },
  {
    id: 'soft',
    skills: [
      { name: 'Travail en équipe' },
      { name: 'Communication' },
      { name: 'Résolution de problèmes' },
      { name: 'Gestion du temps' },
      { name: 'Adaptabilité' },
      { name: 'Autonomie' },
    ],
  },
  {
    id: 'healthtech',
    skills: [
      { name: 'HL7/FHIR/DICOM' },
      { name: 'Patient Records & GDPR' },
      { name: 'Medical Equipment' },
      { name: 'Connected Devices' },
      { name: 'OpenSlide/WSI' },
    ],
  },
  {
    id: 'ml',
    skills: [
      { name: 'PyTorch' },
      { name: 'scikit-learn' },
      { name: 'OpenCV' },
      { name: 'MLOps' },
      { name: 'Data Pipelines' },
    ],
  },
  {
    id: 'security',
    skills: [
      { name: 'CTF / Pentesting' },
      { name: 'Reverse Engineering' },
      { name: 'Zero Trust' },
      { name: 'DevSecOps' },
      { name: 'TLS / QUIC Encryption' },
    ],
  },
  {
    id: 'compliance',
    skills: [
      { name: 'GDPR' },
      { name: 'ISO 27001' },
      { name: 'Risk Management' },
      { name: 'Audit & Traceability' },
      { name: 'Data Classification' },
    ],
  },
];

export const strengthsData = [
  {
    id: 'analytical',
    titleFr: 'Esprit analytique',
    titleEn: 'Analytical mindset',
    titleNl: 'Analytisch denken',
    descriptionFr: 'Je remonte aux causes profondes plutôt que de traiter les symptômes. Sur QUICK-, c\'est en isolant un problème de synchronisation interne que j\'ai résolu un effondrement de performance que tout le monde attribuait au réseau.',
    descriptionEn: 'I trace problems to their root cause rather than patching symptoms. On QUICK-, isolating an internal synchronization issue resolved a performance collapse everyone attributed to the network.',
    descriptionNl: 'Ik zoek de oorzaak van problemen in plaats van de symptomen te behandelen. Bij QUICK- loste het isoleren van een intern synchronisatieprobleem een prestatie-instorting op die iedereen toeschreef aan het netwerk.',
  },
  {
    id: 'learning',
    titleFr: 'Apprentissage rapide',
    titleEn: 'Fast learner',
    titleNl: 'Snelle leerling',
    descriptionFr: 'En quelques mois, je suis passé de zéro en Rust à un tunnel QUIC fonctionnel, tout en apprenant simultanément les standards d\'interopérabilité santé (DICOM, HL7) en milieu hospitalier.',
    descriptionEn: 'In a few months, I went from zero Rust experience to a working QUIC tunnel, while simultaneously learning healthcare interoperability standards (DICOM, HL7) in a clinical setting.',
    descriptionNl: 'In enkele maanden ging ik van nul Rust-ervaring naar een werkende QUIC-tunnel, terwijl ik tegelijkertijd zorginteroperabiliteitsstandaarden (DICOM, HL7) leerde in een klinische omgeving.',
  },
  {
    id: 'teamwork',
    titleFr: 'Collaboration interdisciplinaire',
    titleEn: 'Interdisciplinary collaboration',
    titleNl: 'Interdisciplinaire samenwerking',
    descriptionFr: 'Je travaille au quotidien avec des pathologistes, des radiophysiciens et des ingénieurs satellite. Mon rôle est de traduire leur expertise métier en implémentation technique.',
    descriptionEn: 'I work daily with pathologists, radiophysicists, and satellite engineers - my role is to translate their domain expertise into technical implementation.',
    descriptionNl: 'Ik werk dagelijks met pathologen, radiofysici en satellietingenieurs - mijn rol is hun domeinexpertise te vertalen naar technische implementatie.',
  },
];

export const weaknessesData = [
  {
    id: 'over_designing',
    titleFr: 'Sur-ingénierie',
    titleEn: 'Over-engineering',
    titleNl: 'Over-engineering',
    descriptionFr: 'Tendance à vouloir améliorer et optimiser des choses qui n\'ont pas encore été construites ni testées, ce qui ralentit le passage à l\'action.',
    descriptionEn: 'Tendency to want to improve and optimize things that haven\'t been built or tested yet, which delays taking action.',
    descriptionNl: 'Neiging om dingen te willen verbeteren en optimaliseren die nog niet gebouwd of getest zijn, wat de actie vertraagt.',
    improvementFr: 'J\'apprends à privilégier l\'action et les corrections progressives. Livrer un premier jet imparfait puis itérer, plutôt que de designer le système parfait dans ma tête.',
    improvementEn: 'Learning to favor action and progressive corrections - shipping an imperfect first version then iterating, rather than designing the perfect system in my head.',
    improvementNl: 'Leren om actie en progressieve correcties te verkiezen - een imperfecte eerste versie leveren en dan itereren, in plaats van het perfecte systeem in mijn hoofd te ontwerpen.',
  },
  {
    id: 'vulgarization',
    titleFr: 'Vulgarisation technique',
    titleEn: 'Technical communication',
    titleNl: 'Technische communicatie',
    descriptionFr: 'Je peux paraître trop technique dans mes prises de parole — trop de jargon, pas assez de recul pour un public non-spécialiste.',
    descriptionEn: 'I can come across as too technical when speaking - too much jargon, not enough perspective for a non-specialist audience.',
    descriptionNl: 'Ik kan te technisch overkomen bij het spreken - te veel jargon, niet genoeg perspectief voor een niet-gespecialiseerd publiek.',
    improvementFr: 'J\'apprends à expliquer simplement en utilisant des analogies concrètes et en partant du problème, pas de la solution technique.',
    improvementEn: 'Learning to explain simply using concrete analogies and starting from the problem, not the technical solution.',
    improvementNl: 'Leren om eenvoudig uit te leggen met concrete analogieen en te beginnen bij het probleem, niet de technische oplossing.',
  },
];
