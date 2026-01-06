export interface Skill {
  name: string;
  level: number; // 0-100
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
      { name: 'HTML5/CSS3', level: 90 },
      { name: 'JavaScript/TypeScript', level: 85 },
      { name: 'React.js', level: 80 },
      { name: 'Next.js', level: 75 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Vue.js', level: 70 },
    ],
  },
  {
    id: 'backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Python', level: 75 },
      { name: 'Java', level: 70 },
      { name: 'C#/.NET', level: 65 },
      { name: 'PHP', level: 60 },
      { name: 'REST API', level: 85 },
    ],
  },
  {
    id: 'database',
    skills: [
      { name: 'MySQL', level: 80 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MongoDB', level: 70 },
      { name: 'Redis', level: 60 },
      { name: 'SQL Server', level: 65 },
    ],
  },
  {
    id: 'devops',
    skills: [
      { name: 'Git/GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'CI/CD', level: 65 },
      { name: 'Linux', level: 75 },
      { name: 'AWS/Azure', level: 60 },
    ],
  },
  {
    id: 'tools',
    skills: [
      { name: 'VS Code', level: 95 },
      { name: 'Jira/Trello', level: 80 },
      { name: 'Figma', level: 65 },
      { name: 'Postman', level: 85 },
      { name: 'IntelliJ IDEA', level: 75 },
    ],
  },
  {
    id: 'soft',
    skills: [
      { name: 'Travail en equipe', level: 90 },
      { name: 'Communication', level: 85 },
      { name: 'Resolution de problemes', level: 88 },
      { name: 'Gestion du temps', level: 80 },
      { name: 'Adaptabilite', level: 85 },
    ],
  },
  {
    id: 'healthtech',
    skills: [
      { name: 'E-Health & IoMT', level: 70 },
      { name: 'Dispositifs Medicaux Connectes', level: 65 },
      { name: 'Maintenance Equipements', level: 60 },
      { name: 'Bio-Informatique', level: 65 },
      { name: 'Normes & Reglementations Sante', level: 55 },
    ],
  },
];

export const strengthsData = [
  {
    id: 'analytical',
    titleFr: 'Esprit analytique',
    titleEn: 'Analytical mindset',
    titleNl: 'Analytisch denken',
    descriptionFr: 'Capacite a decomposer des problemes complexes en elements simples et a trouver des solutions efficaces.',
    descriptionEn: 'Ability to break down complex problems into simple elements and find efficient solutions.',
    descriptionNl: 'Vermogen om complexe problemen op te splitsen in eenvoudige elementen en efficiente oplossingen te vinden.',
  },
  {
    id: 'learning',
    titleFr: 'Apprentissage rapide',
    titleEn: 'Fast learner',
    titleNl: 'Snelle leerling',
    descriptionFr: 'Grande capacite d\'adaptation et d\'apprentissage de nouvelles technologies.',
    descriptionEn: 'Strong ability to adapt and learn new technologies quickly.',
    descriptionNl: 'Sterk vermogen om nieuwe technologieen snel aan te passen en te leren.',
  },
  {
    id: 'teamwork',
    titleFr: 'Travail d\'equipe',
    titleEn: 'Teamwork',
    titleNl: 'Teamwerk',
    descriptionFr: 'Excellent collaborateur, capable de travailler efficacement en equipe multiculturelle.',
    descriptionEn: 'Excellent collaborator, able to work effectively in multicultural teams.',
    descriptionNl: 'Uitstekende medewerker, in staat om effectief te werken in multiculturele teams.',
  },
];

export const weaknessesData = [
  {
    id: 'perfectionism',
    titleFr: 'Perfectionnisme',
    titleEn: 'Perfectionism',
    titleNl: 'Perfectionisme',
    descriptionFr: 'Tendance a vouloir que tout soit parfait, ce qui peut parfois ralentir la livraison.',
    descriptionEn: 'Tendency to want everything perfect, which can sometimes slow down delivery.',
    descriptionNl: 'Neiging om alles perfect te willen, wat soms de levering kan vertragen.',
    improvementFr: 'J\'apprends a equilibrer qualite et delais en utilisant des methodologies agiles.',
    improvementEn: 'Learning to balance quality and deadlines using agile methodologies.',
    improvementNl: 'Leren om kwaliteit en deadlines in balans te brengen met agile methodologieen.',
  },
  {
    id: 'public_speaking',
    titleFr: 'Prise de parole en public',
    titleEn: 'Public speaking',
    titleNl: 'Spreken in het openbaar',
    descriptionFr: 'Inconfort initial lors de presentations devant un large public.',
    descriptionEn: 'Initial discomfort when presenting to large audiences.',
    descriptionNl: 'Aanvankelijk ongemak bij presentaties voor een groot publiek.',
    improvementFr: 'Je participe activement a des presentations et des conferences pour ameliorer cette competence.',
    improvementEn: 'Actively participating in presentations and conferences to improve this skill.',
    improvementNl: 'Actief deelnemen aan presentaties en conferenties om deze vaardigheid te verbeteren.',
  },
];
