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
      { name: 'Node.js' },
      { name: 'Python' },
      { name: 'FastAPI' },
      { name: 'Java' },
      { name: 'C#/.NET' },
      { name: 'PHP' },
      { name: 'REST API' },
      { name: 'GraphQL' },
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
      { name: 'Kubernetes' },
      { name: 'CI/CD' },
      { name: 'Linux' },
      { name: 'AWS' },
      { name: 'Azure' },
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
      { name: 'Travail en equipe' },
      { name: 'Communication' },
      { name: 'Resolution de problemes' },
      { name: 'Gestion du temps' },
      { name: 'Adaptabilite' },
      { name: 'Autonomie' },
    ],
  },
  {
    id: 'healthtech',
    skills: [
      { name: 'E-Health & IoMT' },
      { name: 'Dispositifs Medicaux' },
      { name: 'Bio-Informatique' },
      { name: 'DICOM/HL7' },
      { name: 'Normes Sante' },
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
