export interface Activity {
  id: string;
  theme: {
    fr: string;
    en: string;
    nl: string;
  };
  hours: number;
  type: 'hackathon' | 'formation' | 'conference' | 'visite' | 'jobday' | 'salon' | 'projet' | 'certification' | 'stage' | 'benevolat' | 'summer_school' | 'association' | 'job_etudiant' | 'competition';
  title: {
    fr: string;
    en: string;
    nl: string;
  };
  description: {
    fr: string;
    en: string;
    nl: string;
  };
  reflection: {
    fr: string;
    en: string;
    nl: string;
  };
  date: string;
  proof?: string;
  link?: string;
  tags: string[];
}

// ============================================
// THEME 1: Data Engineering & Pipelines
// ============================================
const dataEngineeringActivities: Activity[] = [
  {
    id: 'data-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 10,
    type: 'certification',
    title: {
      fr: 'IBM Data Engineering Professional Certificate',
      en: 'IBM Data Engineering Professional Certificate',
      nl: 'IBM Data Engineering Professional Certificate',
    },
    description: {
      fr: 'Certification professionnelle IBM couvrant les fondamentaux du Data Engineering: ETL, data warehousing, SQL avance, et pipelines de donnees avec Python.',
      en: 'IBM professional certification covering Data Engineering fundamentals: ETL, data warehousing, advanced SQL, and data pipelines with Python.',
      nl: 'IBM professionele certificering over Data Engineering fundamenten: ETL, data warehousing, geavanceerde SQL, en data pipelines met Python.',
    },
    reflection: {
      fr: 'Cette certification m\'a permis de structurer mes connaissances en ingenierie des donnees. J\'ai compris l\'importance de la qualite des donnees et des architectures scalables. Les concepts de batch vs streaming processing sont devenus clairs, ce qui est crucial pour ma vision de carriere en data engineering au service des biotechnologies.',
      en: 'This certification helped me structure my data engineering knowledge. I understood the importance of data quality and scalable architectures. The concepts of batch vs streaming processing became clear, which is crucial for my career vision in data engineering serving biotechnology.',
      nl: 'Deze certificering hielp me mijn data engineering kennis te structureren. Ik begreep het belang van datakwaliteit en schaalbare architecturen.',
    },
    date: '2024-03',
    proof: '/docs/ibm-data-engineering.pdf',
    link: 'https://www.coursera.org/professional-certificates/ibm-data-engineer',
    tags: ['Python', 'SQL', 'ETL', 'Data Warehousing', 'IBM'],
  },
  {
    id: 'data-2',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 8,
    type: 'formation',
    title: {
      fr: 'Traitement du Signal avec Python - Analyse Spectrale',
      en: 'Signal Processing with Python - Spectral Analysis',
      nl: 'Signaalverwerking met Python - Spectrale Analyse',
    },
    description: {
      fr: 'Formation approfondie sur le traitement du signal numerique: transformee de Fourier, filtrage, analyse temps-frequence avec NumPy et SciPy.',
      en: 'In-depth training on digital signal processing: Fourier transform, filtering, time-frequency analysis with NumPy and SciPy.',
      nl: 'Diepgaande training over digitale signaalverwerking: Fourier-transformatie, filtering, tijd-frequentie analyse met NumPy en SciPy.',
    },
    reflection: {
      fr: 'Le traitement du signal est fondamental pour mes projets en telecommunications (QUICK-) et en imagerie medicale (Varuna). Comprendre la FFT et le filtrage m\'a permis d\'optimiser les algorithmes de compression et d\'analyse d\'images WSI. Cette competence transversale renforce ma vision d\'utiliser les donnees pour comprendre le vivant.',
      en: 'Signal processing is fundamental for my telecommunications (QUICK-) and medical imaging (Varuna) projects. Understanding FFT and filtering allowed me to optimize compression and WSI image analysis algorithms. This cross-cutting skill reinforces my vision of using data to understand living systems.',
      nl: 'Signaalverwerking is fundamenteel voor mijn telecommunicatie (QUICK-) en medische beeldvorming (Varuna) projecten.',
    },
    date: '2024-04',
    tags: ['Python', 'NumPy', 'SciPy', 'Signal Processing', 'FFT'],
  },
];

// ============================================
// THEME 2: Medical Imaging & BioTech
// ============================================
const medicalImagingActivities: Activity[] = [
  {
    id: 'bio-1',
    theme: {
      fr: 'Imagerie Medicale & BioTech',
      en: 'Medical Imaging & BioTech',
      nl: 'Medische Beeldvorming & BioTech',
    },
    hours: 10,
    type: 'projet',
    title: {
      fr: 'Varuna - Plateforme WSI pour CHU UCL Namur',
      en: 'Varuna - WSI Platform for CHU UCL Namur',
      nl: 'Varuna - WSI Platform voor CHU UCL Namur',
    },
    description: {
      fr: 'Developpement d\'une plateforme de visualisation d\'images de pathologie numerique (Whole Slide Imaging) pour le departement d\'anatomopathologie du CHU UCL Namur. Integration OpenSlide, interface React, pipeline de traitement d\'images gigapixel.',
      en: 'Development of a digital pathology visualization platform (Whole Slide Imaging) for the anatomopathology department of CHU UCL Namur. OpenSlide integration, React interface, gigapixel image processing pipeline.',
      nl: 'Ontwikkeling van een digitaal pathologie visualisatieplatform (Whole Slide Imaging) voor de afdeling anatomopathologie van CHU UCL Namur.',
    },
    reflection: {
      fr: 'Ce projet represente exactement ma vision: utiliser mes competences en data engineering pour impacter le domaine medical. Travailler avec des images de plusieurs gigapixels m\'a appris a gerer les contraintes de performance et de memoire. La collaboration avec les pathologistes m\'a sensibilise aux besoins reels du terrain medical. C\'est un premier pas vers mon objectif de contribuer aux biotechnologies et a la nanotechnologie appliquee au vivant.',
      en: 'This project represents exactly my vision: using my data engineering skills to impact the medical field. Working with multi-gigapixel images taught me to handle performance and memory constraints. Collaboration with pathologists made me aware of real medical field needs. This is a first step towards my goal of contributing to biotechnology and nanotechnology applied to living systems.',
      nl: 'Dit project vertegenwoordigt precies mijn visie: mijn data engineering vaardigheden gebruiken om het medische veld te beinvloeden.',
    },
    date: '2024-06',
    link: 'https://github.com/juniorymusic/Varuna',
    tags: ['OpenSlide', 'React', 'Python', 'Medical Imaging', 'WSI', 'FastAPI'],
  },
  {
    id: 'bio-2',
    theme: {
      fr: 'Imagerie Medicale & BioTech',
      en: 'Medical Imaging & BioTech',
      nl: 'Medische Beeldvorming & BioTech',
    },
    hours: 6,
    type: 'formation',
    title: {
      fr: 'BioInformatique - Analyse de Sequences Genomiques',
      en: 'BioInformatics - Genomic Sequence Analysis',
      nl: 'Bio-informatica - Genomische Sequentie Analyse',
    },
    description: {
      fr: 'Introduction a la bioinformatique: alignement de sequences, analyse phylogenetique, bases de donnees biologiques (NCBI, UniProt), et outils Python (Biopython).',
      en: 'Introduction to bioinformatics: sequence alignment, phylogenetic analysis, biological databases (NCBI, UniProt), and Python tools (Biopython).',
      nl: 'Introductie tot bio-informatica: sequentie-uitlijning, fylogenetische analyse, biologische databases (NCBI, UniProt), en Python tools (Biopython).',
    },
    reflection: {
      fr: 'La bioinformatique est le pont entre mes competences informatiques et ma passion pour le vivant. Comprendre comment les donnees genomiques sont traitees et analysees m\'ouvre des perspectives vers la recherche en nanotechnologie moleculaire. Cette formation renforce ma conviction que l\'informatique peut revolutionner notre comprehension du vivant.',
      en: 'Bioinformatics is the bridge between my IT skills and my passion for living systems. Understanding how genomic data is processed and analyzed opens perspectives towards molecular nanotechnology research. This training reinforces my conviction that computer science can revolutionize our understanding of life.',
      nl: 'Bio-informatica is de brug tussen mijn IT-vaardigheden en mijn passie voor levende systemen.',
    },
    date: '2024-05',
    tags: ['Biopython', 'Genomics', 'NCBI', 'Data Analysis'],
  },
  {
    id: 'med-bridge',
    theme: { fr: 'Imagerie Medicale & BioTech', en: 'Medical Imaging & BioTech', nl: 'Medische Beeldvorming & BioTech' },
    hours: 8,
    type: 'projet',
    title: {
      fr: 'Bridge - Passerelle d\'interoperabilite pour dispositifs medicaux legacy',
      en: 'Bridge - Interoperability Gateway for Legacy Medical Devices',
      nl: 'Bridge - Interoperabiliteitsgateway voor Legacy Medische Apparaten',
    },
    description: {
      fr: 'Passerelle edge qui traduit les trames proprietaires de dispositifs medicaux anciens (RS-232, BLE, HL7v2, exports fichiers) en ressources FHIR R4, pour connecter l\'ancien materiel a un systeme d\'information hospitalier moderne. Projet de la specialisation Technologies de la Sante.',
      en: 'Edge gateway that translates proprietary frames from legacy medical devices (RS-232, BLE, HL7v2, file exports) into FHIR R4 resources, connecting old equipment to a modern hospital information system. Health Technologies specialization project.',
      nl: 'Edge-gateway die propriëtaire frames van legacy medische apparaten (RS-232, BLE, HL7v2, bestandsexports) vertaalt naar FHIR R4-resources.',
    },
    reflection: {
      fr: 'Bridge m\'a plonge dans la realite du terrain hospitalier : le materiel a 15 ans, les normes evoluent, et la valeur vient de l\'interoperabilite. Comprendre HL7v2 et FHIR en profondeur m\'a donne un langage commun avec les equipes biomedicales.',
      en: 'Bridge immersed me in hospital field reality: equipment is 15 years old, standards evolve, and value comes from interoperability. Understanding HL7v2 and FHIR in depth gave me a common language with biomedical teams.',
      nl: 'Bridge dompelde me onder in de realiteit van het ziekenhuis: apparatuur is 15 jaar oud en de waarde komt van interoperabiliteit.',
    },
    date: '2026-03',
    link: 'https://github.com/Yanstart/Bridge',
    tags: ['FHIR R4', 'HL7v2', 'RS-232', 'BLE', 'Edge', 'Interoperability'],
  },
];

// ============================================
// THEME 3: Telecom & Satellite Networks
// ============================================
const telecomActivities: Activity[] = [
  {
    id: 'telecom-1',
    theme: {
      fr: 'Telecom & Reseaux Satellites',
      en: 'Telecom & Satellite Networks',
      nl: 'Telecom & Satelliet Netwerken',
    },
    hours: 10,
    type: 'stage',
    title: {
      fr: 'Stage neXat - Platform Service Delivery & OpenShift',
      en: 'neXat Internship - Platform Service Delivery & OpenShift',
      nl: 'neXat Stage - Platform Service Delivery & OpenShift',
    },
    description: {
      fr: 'Installation et validation d\'une plateforme de demonstration pour neXat Service Delivery Platform. Migration de la plateforme MANO vers OpenShift, integration du module TSR (Terrestrial Service Router) pour la gestion des terminaux de communication par satellite.',
      en: 'Installation and validation of a demonstration platform for neXat Service Delivery Platform. Migration of MANO platform to OpenShift, integration of TSR (Terrestrial Service Router) module for satellite communication terminal management.',
      nl: 'Installatie en validatie van een demonstratieplatform voor neXat Service Delivery Platform. Migratie van MANO platform naar OpenShift.',
    },
    reflection: {
      fr: 'Ce stage chez neXat m\'a immerge dans l\'industrie spatiale belge et les defis des communications par satellite. La migration vers OpenShift m\'a enseigne la conteneurisation a grande echelle et l\'orchestration Kubernetes en environnement de production. Comprendre le TSR et les protocoles de communication spatiale renforce ma comprehension des systemes complexes. Cette experience est complementaire a mon TFE QUICK- sur l\'acceleration QUIC pour les liens satellites.',
      en: 'This internship at neXat immersed me in the Belgian space industry and satellite communication challenges. The OpenShift migration taught me large-scale containerization and Kubernetes orchestration in production environments. Understanding TSR and space communication protocols strengthens my understanding of complex systems.',
      nl: 'Deze stage bij neXat dompelde me onder in de Belgische ruimte-industrie en uitdagingen van satellietcommunicatie.',
    },
    date: '2024-09',
    link: 'https://nexat.be',
    tags: ['OpenShift', 'Kubernetes', 'MANO', 'TSR', 'Satellite', 'DevOps'],
  },
  {
    id: 'telecom-2',
    theme: {
      fr: 'Telecom & Reseaux Satellites',
      en: 'Telecom & Satellite Networks',
      nl: 'Telecom & Satelliet Netwerken',
    },
    hours: 10,
    type: 'projet',
    title: {
      fr: 'QUICK- : Accelerateur QUIC pour Communications Satellites',
      en: 'QUICK-: QUIC Accelerator for Satellite Communications',
      nl: 'QUICK-: QUIC Accelerator voor Satelliet Communicatie',
    },
    description: {
      fr: 'Travail de fin d\'etudes sur l\'optimisation du protocole QUIC pour les liens satellites. Developpement d\'un PEP (Performance Enhancing Proxy) base sur QUIC pour reduire la latence et ameliorer le debit sur les liens GEO/LEO. Analyse des mecanismes de controle de congestion adaptes aux hautes latences.',
      en: 'Final year thesis on QUIC protocol optimization for satellite links. Development of a QUIC-based PEP (Performance Enhancing Proxy) to reduce latency and improve throughput on GEO/LEO links. Analysis of congestion control mechanisms adapted to high latencies.',
      nl: 'Eindwerk over QUIC protocol optimalisatie voor satelliet verbindingen. Ontwikkeling van een QUIC-gebaseerde PEP.',
    },
    reflection: {
      fr: 'QUICK- est le projet technique le plus ambitieux de ma formation. Il combine reseaux, protocoles de transport, et optimisation de performance. Comprendre les subtilites de QUIC et son potentiel pour les communications spatiales m\'a convaincu que l\'innovation en telecommunications est essentielle pour connecter le monde, y compris pour les applications medicales et scientifiques en zones isolees.',
      en: 'QUICK- is the most ambitious technical project of my education. It combines networking, transport protocols, and performance optimization. Understanding QUIC subtleties and its potential for space communications convinced me that telecommunications innovation is essential for connecting the world.',
      nl: 'QUICK- is het meest ambitieuze technische project van mijn opleiding. Het combineert netwerken, transportprotocollen, en prestatie-optimalisatie.',
    },
    date: '2024-10',
    link: 'https://github.com/juniorymusic/quick-',
    tags: ['QUIC', 'Networking', 'Satellite', 'C++', 'Performance', 'TFE'],
  },
  {
    id: 'telecom-3',
    theme: {
      fr: 'Telecom & Réseaux Satellites',
      en: 'Telecom & Satellite Networks',
      nl: 'Telecom & Satelliet Netwerken',
    },
    hours: 10,
    type: 'competition',
    title: {
      fr: 'Cyber Security Challenge Belgium 2026 (11e place)',
      en: 'Cyber Security Challenge Belgium 2026 (11th place)',
      nl: 'Cyber Security Challenge Belgium 2026 (11e plaats)',
    },
    description: {
      fr: 'Plus grande compétition de cybersécurité de Belgique (1 000+ participants, 30+ entreprises partenaires). Qualifications en ligne (jeopardy CTF solo) puis finale sur site à Bruxelles. Épreuves : cryptographie, reverse engineering, pwn, web, forensics, programmation, hardware. 11e place, qualifié pour la sélection Team Red Daemon (équipe nationale ECSC Europe).',
      en: 'Belgium\'s largest cybersecurity competition (1,000+ participants, 30+ partner companies). Online qualifiers (solo jeopardy CTF) then on-site finals in Brussels. Challenges: cryptography, reverse engineering, pwn, web, forensics, programming, hardware. 11th place, qualified for Team Red Daemon selection (national ECSC Europe team).',
      nl: 'Grootste cybersecuritycompetitie van België (1.000+ deelnemers, 30+ partnersbedrijven). Online kwalificaties (solo jeopardy CTF) en finale op locatie in Brussel. Uitdagingen: cryptografie, reverse engineering, pwn, web, forensics, programmering, hardware. 11e plaats, gekwalificeerd voor Team Red Daemon selectie (nationaal ECSC Europe team).',
    },
    reflection: {
      fr: 'Ce challenge m\'a confronté à des problèmes de sécurité réels sous pression : analyser un binaire, exploiter une vulnérabilité web, casser un chiffrement, le tout en temps limité. La 11e place sur 1 000+ participants valide une compétence transversale : la sécurité n\'est pas un domaine à part, c\'est une dimension de tout système que je construis.',
      en: 'This challenge confronted me with real security problems under pressure: analyzing a binary, exploiting a web vulnerability, breaking encryption, all under time constraints. 11th place out of 1,000+ participants validates a cross-cutting skill: security is not a separate domain, it\'s a dimension of every system I build.',
      nl: 'Deze challenge confronteerde me met echte beveiligingsproblemen onder druk: een binary analyseren, een webkwetsbaarheid exploiteren, encryptie breken, allemaal onder tijdsdruk. 11e plaats van 1.000+ deelnemers valideert een transversale vaardigheid: beveiliging is geen apart domein, het is een dimensie van elk systeem dat ik bouw.',
    },
    date: '2026-02',
    link: 'https://www.cybersecuritychallenge.be/',
    tags: ['CTF', 'Cybersecurity', 'Reverse Engineering', 'Cryptography', 'Forensics', 'Web Security'],
  },
];

// ============================================
// THEME 4: IoT & Embedded Systems
// ============================================
const iotActivities: Activity[] = [
  {
    id: 'iot-1',
    theme: {
      fr: 'IoT & Systemes Embarques',
      en: 'IoT & Embedded Systems',
      nl: 'IoT & Ingebedde Systemen',
    },
    hours: 8,
    type: 'projet',
    title: {
      fr: 'Serr_picoW - Domotique avec Raspberry Pi Pico W',
      en: 'Serr_picoW - Home Automation with Raspberry Pi Pico W',
      nl: 'Serr_picoW - Domotica met Raspberry Pi Pico W',
    },
    description: {
      fr: 'Conception d\'un systeme domotique base sur Raspberry Pi Pico W: controle de serrure connectee, capteurs de temperature/humidite, interface web pour le monitoring, communication MQTT pour l\'integration avec Home Assistant.',
      en: 'Design of a home automation system based on Raspberry Pi Pico W: connected lock control, temperature/humidity sensors, web interface for monitoring, MQTT communication for Home Assistant integration.',
      nl: 'Ontwerp van een domoticasysteem gebaseerd op Raspberry Pi Pico W: verbonden slotbesturing, temperatuur/vochtigheid sensoren.',
    },
    reflection: {
      fr: 'Ce projet m\'a permis de maitriser MicroPython et les contraintes des systemes embarques: memoire limitee, consommation energetique, fiabilite. La conception d\'un systeme IoT complet, du firmware a l\'interface web, m\'a donne une vision full-stack de l\'embarque. Ces competences sont transferables vers les dispositifs medicaux connectes et les nanocapteurs du futur.',
      en: 'This project allowed me to master MicroPython and embedded system constraints: limited memory, power consumption, reliability. Designing a complete IoT system from firmware to web interface gave me a full-stack view of embedded systems. These skills are transferable to connected medical devices and future nanosensors.',
      nl: 'Dit project stelde me in staat MicroPython en ingebedde systeembeperkingen te beheersen.',
    },
    date: '2024-02',
    link: 'https://github.com/juniorymusic/Serr_picoW',
    tags: ['Raspberry Pi', 'MicroPython', 'IoT', 'MQTT', 'Home Assistant'],
  },
  {
    id: 'iot-2',
    theme: {
      fr: 'IoT & Systemes Embarques',
      en: 'IoT & Embedded Systems',
      nl: 'IoT & Ingebedde Systemen',
    },
    hours: 6,
    type: 'projet',
    title: {
      fr: 'Rubyx - Robot resolveur de Rubik\'s Cube',
      en: 'Rubyx - Rubik\'s Cube Solving Robot',
      nl: 'Rubyx - Rubik\'s Cube Oplossende Robot',
    },
    description: {
      fr: 'Robot qui resout un Rubik\'s Cube automatiquement : OpenCV scanne les six faces, l\'algorithme de Kociemba calcule la solution, un Arduino Nano pilote 8 servomoteurs sur un PCB fait maison. Projet d\'equipe realise pendant l\'echange international a l\'International University (VNU), Ho Chi Minh City.',
      en: 'Robot that solves a Rubik\'s Cube automatically: OpenCV scans the six faces, the Kociemba algorithm computes the solution, an Arduino Nano drives 8 servo motors on a custom PCB. Team project built during the international exchange at International University (VNU), Ho Chi Minh City.',
      nl: 'Robot die automatisch een Rubik\'s Cube oplost: OpenCV scant de zes vlakken, het Kociemba-algoritme berekent de oplossing, een Arduino Nano stuurt 8 servomotoren op een zelfgemaakte PCB. Teamproject tijdens de internationale uitwisseling aan de International University (VNU), Ho Chi Minh City.',
    },
    reflection: {
      fr: 'Rubyx m\'a appris a faire cooperer vision par ordinateur, algorithmique et hardware dans un systeme physique complet, en equipe internationale. Valider le modele numerique avant d\'agir sur le monde reel : un reflexe directement transposable a la qualite et au controle de process.',
      en: 'Rubyx taught me to make computer vision, algorithms and hardware cooperate in a complete physical system, within an international team. Validating the digital model before acting on the real world: a reflex directly transferable to quality and process control.',
      nl: 'Rubyx leerde me computervisie, algoritmen en hardware laten samenwerken in een compleet fysiek systeem, in een internationaal team.',
    },
    date: '2024-01',
    link: 'https://github.com/Yanstart/Rubyx',
    tags: ['Arduino', 'LoRa', 'D3.js', 'BME280', 'Data Visualization'],
  },
  {
    id: 'iot-3',
    theme: {
      fr: 'IoT & Systemes Embarques',
      en: 'IoT & Embedded Systems',
      nl: 'IoT & Ingebedde Systemen',
    },
    hours: 6,
    type: 'projet',
    title: {
      fr: 'HomeLab - Infrastructure Serveur Personnelle',
      en: 'HomeLab - Personal Server Infrastructure',
      nl: 'HomeLab - Persoonlijke Server Infrastructuur',
    },
    description: {
      fr: 'Creation d\'un laboratoire personnel: serveur Proxmox, conteneurs Docker, reverse proxy Traefik, monitoring Grafana/Prometheus, stockage NAS avec ZFS, VPN WireGuard.',
      en: 'Creation of a personal lab: Proxmox server, Docker containers, Traefik reverse proxy, Grafana/Prometheus monitoring, NAS storage with ZFS, WireGuard VPN.',
      nl: 'Creatie van een persoonlijk lab: Proxmox server, Docker containers, Traefik reverse proxy, Grafana/Prometheus monitoring.',
    },
    reflection: {
      fr: 'Mon HomeLab est mon terrain d\'experimentation permanent. Il m\'a permis de comprendre l\'administration systeme, la virtualisation, et le monitoring a un niveau professionnel. Cette infrastructure me sert pour tester mes projets (Varuna, QUICK-) dans des conditions proches de la production.',
      en: 'My HomeLab is my permanent experimentation ground. It allowed me to understand system administration, virtualization, and monitoring at a professional level. This infrastructure serves me to test my projects (Varuna, QUICK-) under near-production conditions.',
      nl: 'Mijn HomeLab is mijn permanente experimenteerterrein.',
    },
    date: '2023-12',
    tags: ['Proxmox', 'Docker', 'Grafana', 'Linux', 'Networking', 'ZFS'],
  },
];

// ============================================
// THEME 5: Full-Stack Development
// ============================================
const fullStackActivities: Activity[] = [
  {
    id: 'fullstack-1',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 10,
    type: 'projet',
    title: {
      fr: 'RoadBook - Application de Suivi de Trajets',
      en: 'RoadBook - Journey Tracking Application',
      nl: 'RoadBook - Reis Tracking Applicatie',
    },
    description: {
      fr: 'Application web complete pour le suivi des trajets professionnels: authentification JWT, API REST FastAPI, base de donnees PostgreSQL, frontend React avec cartes Leaflet, export PDF des rapports.',
      en: 'Complete web application for professional journey tracking: JWT authentication, FastAPI REST API, PostgreSQL database, React frontend with Leaflet maps, PDF report export.',
      nl: 'Complete webapplicatie voor professionele reisregistratie: JWT authenticatie, FastAPI REST API, PostgreSQL database.',
    },
    reflection: {
      fr: 'RoadBook est ma premiere application full-stack complete. J\'ai appris a concevoir une architecture propre avec separation frontend/backend, gestion des sessions, et generation de documents. Cette experience m\'a prepare aux projets plus complexes comme Varuna.',
      en: 'RoadBook is my first complete full-stack application. I learned to design a clean architecture with frontend/backend separation, session management, and document generation. This experience prepared me for more complex projects like Varuna.',
      nl: 'RoadBook is mijn eerste complete full-stack applicatie.',
    },
    date: '2024-03',
    link: 'https://github.com/juniorymusic/RoadBook',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'JWT', 'Leaflet'],
  },
  {
    id: 'fullstack-2',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 8,
    type: 'projet',
    title: {
      fr: 'WorkHub - Plateforme de Gestion de Projets',
      en: 'WorkHub - Project Management Platform',
      nl: 'WorkHub - Project Management Platform',
    },
    description: {
      fr: 'Plateforme collaborative de gestion de projets: tableaux Kanban, assignation de taches, notifications temps reel avec WebSockets, integration calendrier, API GraphQL.',
      en: 'Collaborative project management platform: Kanban boards, task assignment, real-time notifications with WebSockets, calendar integration, GraphQL API.',
      nl: 'Collaboratief projectmanagement platform: Kanban borden, taaktoewijzing, real-time notificaties met WebSockets.',
    },
    reflection: {
      fr: 'WorkHub m\'a initie a GraphQL et aux communications temps reel. La conception d\'une interface utilisateur intuitive pour la gestion de projets m\'a sensibilise aux principes UX. Ces competences sont essentielles pour creer des outils scientifiques accessibles aux non-informaticiens.',
      en: 'WorkHub introduced me to GraphQL and real-time communications. Designing an intuitive user interface for project management made me aware of UX principles. These skills are essential for creating scientific tools accessible to non-IT professionals.',
      nl: 'WorkHub introduceerde me tot GraphQL en real-time communicatie.',
    },
    date: '2024-05',
    link: 'https://github.com/juniorymusic/WorkHub',
    tags: ['GraphQL', 'WebSockets', 'React', 'Node.js', 'MongoDB'],
  },
  {
    id: 'fullstack-3',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 6,
    type: 'hackathon',
    title: {
      fr: 'MakeitGreen - Hackathon Developpement Durable',
      en: 'MakeitGreen - Sustainable Development Hackathon',
      nl: 'MakeitGreen - Duurzame Ontwikkeling Hackathon',
    },
    description: {
      fr: 'Application mobile developpee en 48h lors d\'un hackathon: calcul d\'empreinte carbone, suggestions de transports ecologiques, gamification pour encourager les comportements durables.',
      en: 'Mobile application developed in 48 hours during a hackathon: carbon footprint calculation, eco-friendly transport suggestions, gamification to encourage sustainable behaviors.',
      nl: 'Mobiele applicatie ontwikkeld in 48 uur tijdens een hackathon: berekening van CO2-voetafdruk.',
    },
    reflection: {
      fr: 'Ce hackathon m\'a appris a livrer rapidement un produit fonctionnel sous pression. Travailler en equipe pluridisciplinaire (designers, marketeurs, devs) m\'a montre l\'importance de la communication et du prototypage rapide. L\'ecologie et la durabilite sont des valeurs qui guident aussi ma vision de la technologie au service du vivant.',
      en: 'This hackathon taught me to rapidly deliver a functional product under pressure. Working in a multidisciplinary team (designers, marketers, devs) showed me the importance of communication and rapid prototyping. Ecology and sustainability are values that also guide my vision of technology serving living systems.',
      nl: 'Deze hackathon leerde me snel een functioneel product te leveren onder druk.',
    },
    date: '2024-04',
    proof: '/docs/makeitgreen-certificate.pdf',
    tags: ['React Native', 'Hackathon', 'Mobile', 'Sustainability'],
  },
  {
    id: 'fs-summerschool',
    theme: { fr: 'Developpement Full-Stack', en: 'Full-Stack Development', nl: 'Full-Stack Ontwikkeling' },
    hours: 10,
    type: 'summer_school',
    title: {
      fr: 'Summer School React Native (2024)',
      en: 'React Native Summer School (2024)',
      nl: 'React Native Summer School (2024)',
    },
    description: {
      fr: 'Summer school internationale de developpement mobile React Native, avec des etudiants de Seneca Polytechnic (Canada) et de Business Academy Aarhus (Danemark). Travail en equipes mixtes sur un projet mobile complet.',
      en: 'International React Native mobile development summer school, with students from Seneca Polytechnic (Canada) and Business Academy Aarhus (Denmark). Mixed international teams working on a complete mobile project.',
      nl: 'Internationale React Native summer school, met studenten van Seneca Polytechnic (Canada) en Business Academy Aarhus (Denemarken).',
    },
    reflection: {
      fr: 'Premiere vraie experience de collaboration internationale en anglais, avant le Vietnam et Porto. J\'y ai appris a m\'aligner vite avec des coequipiers aux methodes differentes : la base du travail en environnement matriciel.',
      en: 'First real international collaboration experience in English, before Vietnam and Porto. I learned to align quickly with teammates who work differently: the basis of working in a matrix environment.',
      nl: 'Eerste echte internationale samenwerkingservaring in het Engels, voor Vietnam en Porto.',
    },
    date: '2024-07',
    tags: ['React Native', 'Mobile', 'International', 'Teamwork'],
  },
];

// ============================================
// THEME 6: AI & Automation
// ============================================
const aiActivities: Activity[] = [
  {
    id: 'ai-1',
    theme: {
      fr: 'IA & Automatisation',
      en: 'AI & Automation',
      nl: 'AI & Automatisering',
    },
    hours: 8,
    type: 'formation',
    title: {
      fr: 'MLOps - Deploiement de Modeles en Production',
      en: 'MLOps - Model Deployment in Production',
      nl: 'MLOps - Model Deployment in Productie',
    },
    description: {
      fr: 'Formation sur les pratiques MLOps: versioning de modeles avec MLflow, pipelines CI/CD pour ML, containerisation de modeles, monitoring de drift, A/B testing.',
      en: 'Training on MLOps practices: model versioning with MLflow, CI/CD pipelines for ML, model containerization, drift monitoring, A/B testing.',
      nl: 'Training over MLOps praktijken: model versioning met MLflow, CI/CD pipelines voor ML.',
    },
    reflection: {
      fr: 'Le MLOps est essentiel pour transformer les prototypes ML en produits fiables. Dans le contexte de Varuna, ces competences me permettent d\'envisager le deploiement de modeles de detection automatique sur les images WSI. L\'automatisation du cycle de vie des modeles est cle pour les applications medicales ou la fiabilite est critique.',
      en: 'MLOps is essential for transforming ML prototypes into reliable products. In the context of Varuna, these skills allow me to consider deploying automatic detection models on WSI images. Automating the model lifecycle is key for medical applications where reliability is critical.',
      nl: 'MLOps is essentieel voor het transformeren van ML prototypes naar betrouwbare producten.',
    },
    date: '2024-07',
    tags: ['MLflow', 'Docker', 'CI/CD', 'Python', 'Kubernetes'],
  },
  {
    id: 'ai-2',
    theme: {
      fr: 'IA & Automatisation',
      en: 'AI & Automation',
      nl: 'AI & Automatisering',
    },
    hours: 6,
    type: 'formation',
    title: {
      fr: 'GitHub Copilot & Productivite Developpeur',
      en: 'GitHub Copilot & Developer Productivity',
      nl: 'GitHub Copilot & Ontwikkelaar Productiviteit',
    },
    description: {
      fr: 'Exploration des outils d\'assistance au code par IA: GitHub Copilot, prompt engineering pour la generation de code, bonnes pratiques d\'utilisation, limites et risques.',
      en: 'Exploration of AI code assistance tools: GitHub Copilot, prompt engineering for code generation, usage best practices, limitations and risks.',
      nl: 'Verkenning van AI code-assistentie tools: GitHub Copilot, prompt engineering voor codegeneratie.',
    },
    reflection: {
      fr: 'L\'IA generative transforme le developpement logiciel. Apprendre a utiliser efficacement ces outils tout en gardant un regard critique sur le code genere est une competence differenciante. Je vois dans ces technologies un potentiel enorme pour accelerer la recherche scientifique et biomedicale.',
      en: 'Generative AI is transforming software development. Learning to effectively use these tools while maintaining a critical eye on generated code is a differentiating skill. I see enormous potential in these technologies to accelerate scientific and biomedical research.',
      nl: 'Generatieve AI transformeert softwareontwikkeling.',
    },
    date: '2024-08',
    tags: ['GitHub Copilot', 'AI', 'Productivity', 'Prompt Engineering'],
  },
  {
    id: 'ai-3',
    theme: {
      fr: 'IA & Automatisation',
      en: 'AI & Automation',
      nl: 'AI & Automatisering',
    },
    hours: 6,
    type: 'projet',
    title: {
      fr: 'Pipeline de Detection Automatique - Varuna ML',
      en: 'Automatic Detection Pipeline - Varuna ML',
      nl: 'Automatische Detectie Pipeline - Varuna ML',
    },
    description: {
      fr: 'Developpement d\'un pipeline de detection automatique de regions d\'interet sur images WSI: preprocessing avec OpenSlide, segmentation avec U-Net, classification de patches, interface d\'annotation pour les pathologistes.',
      en: 'Development of an automatic detection pipeline for regions of interest on WSI images: preprocessing with OpenSlide, U-Net segmentation, patch classification, annotation interface for pathologists.',
      nl: 'Ontwikkeling van een automatische detectiepipeline voor interessegebieden op WSI-beelden.',
    },
    reflection: {
      fr: 'Ce module ML de Varuna est l\'aboutissement de mes apprentissages en IA appliquee a l\'imagerie medicale. Combiner traitement d\'images, deep learning, et interface utilisateur pour assister les pathologistes concretise ma vision de l\'informatique au service de la medecine. C\'est un premier pas vers l\'application de l\'IA aux nanotechnologies et a la biologie moleculaire.',
      en: 'This Varuna ML module is the culmination of my learning in AI applied to medical imaging. Combining image processing, deep learning, and user interface to assist pathologists realizes my vision of IT serving medicine. This is a first step towards applying AI to nanotechnology and molecular biology.',
      nl: 'Deze Varuna ML module is het hoogtepunt van mijn leren in AI toegepast op medische beeldvorming.',
    },
    date: '2024-09',
    link: 'https://github.com/juniorymusic/Varuna',
    tags: ['PyTorch', 'U-Net', 'OpenSlide', 'Computer Vision', 'Medical AI'],
  },
  {
    id: 'ai-cyberwars',
    theme: { fr: 'IA & Automatisation', en: 'AI & Automation', nl: 'AI & Automatisering' },
    hours: 10,
    type: 'competition',
    title: {
      fr: 'CyberWars 2026 (Porto) - Vainqueur',
      en: 'CyberWars 2026 (Porto) - Winner',
      nl: 'CyberWars 2026 (Porto) - Winnaar',
    },
    description: {
      fr: 'Programme intensif Erasmus+ (ISLA Gaia, Porto) melant cybersecurite et entrepreneuriat : defis d\'entreprises reelles, prototype, business model et pitch final devant jury (Dragon\'s Den). Notre equipe internationale a remporte la competition avec le concept AEGIS-Rx.',
      en: 'Erasmus+ intensive programme (ISLA Gaia, Porto) mixing cybersecurity and entrepreneurship: real company challenges, prototype, business model and final pitch in front of a jury (Dragon\'s Den). Our international team won the competition with the AEGIS-Rx concept.',
      nl: 'Erasmus+ intensief programma (ISLA Gaia, Porto) dat cybersecurity en ondernemerschap combineert: echte bedrijfsuitdagingen, prototype, businessmodel en eindpitch voor een jury. Ons internationale team won de competitie met het AEGIS-Rx concept.',
    },
    reflection: {
      fr: 'CyberWars m\'a confirme que je suis aussi a l\'aise sur un business model que sur une architecture technique. Cadrer un probleme client, prioriser, pitcher : exactement les competences que je veux professionnaliser en gestion de projet.',
      en: 'CyberWars confirmed that I am as comfortable with a business model as with a technical architecture. Framing a client problem, prioritising, pitching: exactly the skills I want to professionalise in project management.',
      nl: 'CyberWars bevestigde dat ik me even comfortabel voel bij een businessmodel als bij een technische architectuur.',
    },
    date: '2026-05',
    link: 'https://ehub.islagaia.pt/events/cyberwars',
    tags: ['Entrepreneurship', 'Cybersecurity', 'Pitch', 'Erasmus+', 'Winner'],
  },
  {
    id: 'ai-aegis',
    theme: { fr: 'IA & Automatisation', en: 'AI & Automation', nl: 'AI & Automatisering' },
    hours: 10,
    type: 'projet',
    title: {
      fr: 'AEGIS-Rx - Pare-feu IA pour donnees reglementees',
      en: 'AEGIS-Rx - AI Firewall for Regulated Data',
      nl: 'AEGIS-Rx - AI Firewall voor Gereguleerde Data',
    },
    description: {
      fr: 'Suite du concept gagnant de CyberWars, developpe comme un vrai produit : agent Rust avec SLM local (ONNX), aucune donnee ne quitte le poste, audit trail ALCOA+ (HMAC chaine), extensions Chrome/Firefox/Safari, management node on-premise. Pack pharma cle en main : dossier de validation IQ/OQ/PQ, GAMP 5, 21 CFR Part 11, 13 change controls. 345 tests Rust, F1 > 0,95, latence P99 < 30 ms.',
      en: 'Follow-up of the winning CyberWars concept, developed as a real product: Rust agent with local SLM (ONNX), no data leaves the device, ALCOA+ audit trail (chained HMAC), Chrome/Firefox/Safari extensions, on-premise management node. Turnkey pharma pack: IQ/OQ/PQ validation dossier, GAMP 5, 21 CFR Part 11, 13 change controls. 345 Rust tests, F1 > 0.95, P99 latency < 30 ms.',
      nl: 'Vervolg op het winnende CyberWars-concept, ontwikkeld als een echt product: Rust-agent met lokale SLM (ONNX), geen data verlaat het toestel, ALCOA+ audit trail, Chrome/Firefox/Safari-extensies, on-premise management node. Kant-en-klaar farmapakket: IQ/OQ/PQ-validatiedossier, GAMP 5, 21 CFR Part 11, 13 change controls.',
    },
    reflection: {
      fr: 'AEGIS-Rx est mon ecole de la qualite pharma : j\'y vis le change control, la tracabilite ALCOA+ et la validation IQ/OQ/PQ au quotidien, sur un produit que je pilote de bout en bout.',
      en: 'AEGIS-Rx is my pharma quality school: I live change control, ALCOA+ traceability and IQ/OQ/PQ validation daily, on a product I manage end to end.',
      nl: 'AEGIS-Rx is mijn school voor farmakwaliteit: change control, ALCOA+ traceerbaarheid en IQ/OQ/PQ-validatie, dagelijks.',
    },
    date: '2026-04',
    link: 'https://github.com/Yanstart/AEGIS-Rx',
    tags: ['Rust', 'ONNX', 'GAMP 5', '21 CFR Part 11', 'ALCOA+', 'Change Control'],
  },
];

// ============================================
// ADDITIONAL CROSS-CUTTING ACTIVITIES
// ============================================
const additionalActivities: Activity[] = [
  // Cybersecurity & DevSecOps
  {
    id: 'security-1',
    theme: {
      fr: 'Telecom & Reseaux Satellites',
      en: 'Telecom & Satellite Networks',
      nl: 'Telecom & Satelliet Netwerken',
    },
    hours: 8,
    type: 'certification',
    title: {
      fr: 'Cybersecurity Architecture - Coursera',
      en: 'Cybersecurity Architecture - Coursera',
      nl: 'Cybersecurity Architecture - Coursera',
    },
    description: {
      fr: 'Formation Coursera sur l\'architecture de securite: conception de systemes securises, defense en profondeur, zero trust architecture, gestion des identites et acces (IAM), securisation des communications.',
      en: 'Coursera training on security architecture: secure system design, defense in depth, zero trust architecture, identity and access management (IAM), communication security.',
      nl: 'Coursera training over beveiligingsarchitectuur: veilig systeemontwerp, verdediging in de diepte, zero trust architectuur.',
    },
    reflection: {
      fr: 'La securite est un pilier fondamental de toute infrastructure. Cette formation m\'a appris a penser "security by design" plutot que d\'ajouter la securite apres coup. Dans le contexte spatial (neXat) et medical (Varuna), ou les donnees sont critiques, cette mentalite est indispensable. L\'architecture zero trust correspond parfaitement aux environnements distribues modernes.',
      en: 'Security is a fundamental pillar of any infrastructure. This training taught me to think "security by design" rather than adding security as an afterthought. In spatial (neXat) and medical (Varuna) contexts, where data is critical, this mindset is essential. Zero trust architecture perfectly fits modern distributed environments.',
      nl: 'Beveiliging is een fundamentele pijler van elke infrastructuur. Deze training leerde me "security by design" te denken.',
    },
    date: '2024-10',
    link: 'https://www.coursera.org/learn/cybersecurity-architecture',
    tags: ['Cybersecurity', 'Zero Trust', 'IAM', 'Architecture', 'Defense in Depth'],
  },
  {
    id: 'security-2',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 6,
    type: 'formation',
    title: {
      fr: 'DevSecOps - Securite dans le Pipeline CI/CD',
      en: 'DevSecOps - Security in CI/CD Pipeline',
      nl: 'DevSecOps - Beveiliging in CI/CD Pipeline',
    },
    description: {
      fr: 'Integration de la securite dans le cycle de developpement: SAST/DAST, analyse de vulnerabilites, gestion des secrets, scanning des conteneurs, conformite automatisee.',
      en: 'Security integration in the development cycle: SAST/DAST, vulnerability analysis, secrets management, container scanning, automated compliance.',
      nl: 'Beveiliging integratie in de ontwikkelingscyclus: SAST/DAST, kwetsbaarheidsanalyse, secrets management.',
    },
    reflection: {
      fr: 'Le DevSecOps transforme la securite d\'un goulot d\'etranglement en accelerateur. Automatiser les controles de securite dans le pipeline permet de livrer plus vite tout en maintenant un haut niveau de protection. J\'applique ces principes dans mes projets personnels avec des outils comme Trivy pour le scanning de conteneurs et SonarQube pour l\'analyse de code.',
      en: 'DevSecOps transforms security from a bottleneck into an accelerator. Automating security checks in the pipeline allows faster delivery while maintaining high protection. I apply these principles in personal projects with tools like Trivy for container scanning and SonarQube for code analysis.',
      nl: 'DevSecOps transformeert beveiliging van een knelpunt naar een versneller.',
    },
    date: '2024-11',
    tags: ['DevSecOps', 'SAST', 'DAST', 'Trivy', 'SonarQube', 'CI/CD'],
  },
  // Project Management
  {
    id: 'pm-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 6,
    type: 'certification',
    title: {
      fr: 'Introduction to Project Management - Coursera',
      en: 'Introduction to Project Management - Coursera',
      nl: 'Introduction to Project Management - Coursera',
    },
    description: {
      fr: 'Fondamentaux de la gestion de projet: methodologies Agile et Waterfall, planification, gestion des risques, communication avec les parties prenantes, outils de suivi (Jira, Trello).',
      en: 'Project management fundamentals: Agile and Waterfall methodologies, planning, risk management, stakeholder communication, tracking tools (Jira, Trello).',
      nl: 'Projectmanagement fundamenten: Agile en Waterfall methodologieen, planning, risicobeheer, stakeholder communicatie.',
    },
    reflection: {
      fr: 'La gestion de projet est essentielle pour livrer des systemes complexes. Cette formation m\'a appris a structurer mes projets (Varuna, QUICK-) avec une vision claire des jalons et des risques. L\'assertivite et la communication sont des competences cles pour negocier les priorites avec les parties prenantes et defendre les choix techniques.',
      en: 'Project management is essential for delivering complex systems. This training taught me to structure my projects (Varuna, QUICK-) with a clear vision of milestones and risks. Assertiveness and communication are key skills for negotiating priorities with stakeholders and defending technical choices.',
      nl: 'Projectmanagement is essentieel voor het leveren van complexe systemen.',
    },
    date: '2024-09',
    link: 'https://www.coursera.org/learn/introduction-to-project-management',
    tags: ['Project Management', 'Agile', 'Scrum', 'Risk Management', 'Jira'],
  },
  // Design Patterns & Architecture
  {
    id: 'arch-1',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 8,
    type: 'formation',
    title: {
      fr: 'Design Patterns & Architecture Logicielle',
      en: 'Design Patterns & Software Architecture',
      nl: 'Design Patterns & Software Architectuur',
    },
    description: {
      fr: 'Etude approfondie des design patterns (GoF): Singleton, Factory, Observer, Strategy, Decorator. Architecture hexagonale, CQRS, Event Sourcing, et principes SOLID.',
      en: 'In-depth study of design patterns (GoF): Singleton, Factory, Observer, Strategy, Decorator. Hexagonal architecture, CQRS, Event Sourcing, and SOLID principles.',
      nl: 'Diepgaande studie van design patterns (GoF): Singleton, Factory, Observer, Strategy, Decorator.',
    },
    reflection: {
      fr: 'Les design patterns sont le vocabulaire commun des architectes logiciels. Maitriser ces patterns me permet de concevoir des systemes maintenables et evolutifs. L\'architecture hexagonale est particulierement pertinente pour Varuna, ou le domaine metier (imagerie medicale) doit etre isole des details d\'infrastructure. Penser en termes de systemes plutot que de code est une competence differenciante.',
      en: 'Design patterns are the common vocabulary of software architects. Mastering these patterns allows me to design maintainable and scalable systems. Hexagonal architecture is particularly relevant for Varuna, where the business domain (medical imaging) must be isolated from infrastructure details.',
      nl: 'Design patterns zijn de gemeenschappelijke woordenschat van software architecten.',
    },
    date: '2024-06',
    tags: ['Design Patterns', 'SOLID', 'Hexagonal', 'CQRS', 'Clean Architecture'],
  },
  {
    id: 'arch-2',
    theme: {
      fr: 'IoT & Systemes Embarques',
      en: 'IoT & Embedded Systems',
      nl: 'IoT & Ingebedde Systemen',
    },
    hours: 6,
    type: 'formation',
    title: {
      fr: 'System Design - Infrastructure Distribuee',
      en: 'System Design - Distributed Infrastructure',
      nl: 'System Design - Gedistribueerde Infrastructuur',
    },
    description: {
      fr: 'Conception de systemes distribues: load balancing, caching (Redis), message queues (RabbitMQ, Kafka), bases de donnees distribuees, CAP theorem, eventual consistency.',
      en: 'Distributed system design: load balancing, caching (Redis), message queues (RabbitMQ, Kafka), distributed databases, CAP theorem, eventual consistency.',
      nl: 'Gedistribueerd systeemontwerp: load balancing, caching (Redis), message queues (RabbitMQ, Kafka).',
    },
    reflection: {
      fr: 'La conception de systemes distribues est fascinante par sa complexite. Comprendre les compromis (CAP theorem) et les patterns de resilience (circuit breaker, retry) est essentiel pour les applications critiques. Mon HomeLab me sert de terrain d\'experimentation pour tester ces architectures a petite echelle avant de les appliquer en production.',
      en: 'Distributed system design is fascinating in its complexity. Understanding trade-offs (CAP theorem) and resilience patterns (circuit breaker, retry) is essential for critical applications. My HomeLab serves as an experimentation ground to test these architectures at small scale.',
      nl: 'Gedistribueerd systeemontwerp is fascinerend in zijn complexiteit.',
    },
    date: '2024-05',
    tags: ['System Design', 'Redis', 'Kafka', 'CAP Theorem', 'Distributed Systems'],
  },
  // Soft Skills & Communication
  {
    id: 'soft-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 4,
    type: 'formation',
    title: {
      fr: 'Communication Assertive & Negociation',
      en: 'Assertive Communication & Negotiation',
      nl: 'Assertieve Communicatie & Onderhandeling',
    },
    description: {
      fr: 'Developpement des competences en communication: ecoute active, feedback constructif, gestion des conflits, techniques de negociation, presentation efficace devant des publics techniques et non-techniques.',
      en: 'Communication skills development: active listening, constructive feedback, conflict management, negotiation techniques, effective presentation to technical and non-technical audiences.',
      nl: 'Communicatievaardigheden ontwikkeling: actief luisteren, constructieve feedback, conflictbeheer.',
    },
    reflection: {
      fr: 'Les competences techniques seules ne suffisent pas. Savoir communiquer efficacement avec les pathologistes (Varuna), les ingenieurs satellites (neXat), ou les decideurs est crucial. L\'assertivite permet de defendre ses idees tout en restant ouvert aux feedbacks. Cette competence est particulierement importante pour expliquer des concepts techniques complexes a des non-specialistes.',
      en: 'Technical skills alone are not enough. Knowing how to communicate effectively with pathologists (Varuna), satellite engineers (neXat), or decision-makers is crucial. Assertiveness allows defending ideas while remaining open to feedback.',
      nl: 'Technische vaardigheden alleen zijn niet genoeg. Weten hoe effectief te communiceren is cruciaal.',
    },
    date: '2024-08',
    tags: ['Communication', 'Negotiation', 'Soft Skills', 'Leadership'],
  },
  // Biology & Law intersection
  {
    id: 'bio-law-1',
    theme: {
      fr: 'Imagerie Medicale & BioTech',
      en: 'Medical Imaging & BioTech',
      nl: 'Medische Beeldvorming & BioTech',
    },
    hours: 4,
    type: 'formation',
    title: {
      fr: 'Ethique & Droit des Donnees Medicales',
      en: 'Ethics & Medical Data Law',
      nl: 'Ethiek & Medische Data Wetgeving',
    },
    description: {
      fr: 'Cadre legal des donnees de sante: RGPD applique au medical, consentement eclaire, anonymisation, droit a l\'oubli, responsabilite en cas de diagnostic assiste par IA.',
      en: 'Legal framework for health data: GDPR applied to medical field, informed consent, anonymization, right to be forgotten, liability in AI-assisted diagnosis.',
      nl: 'Juridisch kader voor gezondheidsgegevens: GDPR toegepast op medisch gebied, geinformeerde toestemming.',
    },
    reflection: {
      fr: 'Developper des outils pour le medical implique une responsabilite ethique et legale. Comprendre le RGPD et les specificites des donnees de sante est indispensable pour Varuna. La question de la responsabilite en cas d\'erreur d\'un modele IA est particulierement complexe et merite une reflexion approfondie avant tout deploiement clinique.',
      en: 'Developing medical tools implies ethical and legal responsibility. Understanding GDPR and health data specificities is essential for Varuna. The liability question in case of AI model error is particularly complex and requires deep reflection before any clinical deployment.',
      nl: 'Het ontwikkelen van medische tools impliceert ethische en juridische verantwoordelijkheid.',
    },
    date: '2024-07',
    tags: ['GDPR', 'Medical Law', 'Ethics', 'Data Privacy', 'AI Liability'],
  },
  {
    id: 'bio-3',
    theme: {
      fr: 'Imagerie Medicale & BioTech',
      en: 'Medical Imaging & BioTech',
      nl: 'Medische Beeldvorming & BioTech',
    },
    hours: 6,
    type: 'formation',
    title: {
      fr: 'Biologie Cellulaire pour Informaticiens',
      en: 'Cell Biology for Computer Scientists',
      nl: 'Celbiologie voor Informatici',
    },
    description: {
      fr: 'Fondamentaux de biologie: structure cellulaire, ADN/ARN, proteines, mecanismes de division cellulaire, introduction a la nanotechnologie moleculaire et aux applications bio-informatiques.',
      en: 'Biology fundamentals: cell structure, DNA/RNA, proteins, cell division mechanisms, introduction to molecular nanotechnology and bioinformatics applications.',
      nl: 'Biologie fundamenten: celstructuur, DNA/RNA, eiwitten, celdeling mechanismen.',
    },
    reflection: {
      fr: 'Ma passion pour le vivant m\'a pousse a approfondir mes connaissances en biologie. Comprendre les mecanismes cellulaires est essentiel pour concevoir des outils pertinents en imagerie medicale. A terme, je souhaite contribuer a la nanotechnologie appliquee au vivant, ou l\'informatique et la biologie convergent pour creer des solutions innovantes en sante.',
      en: 'My passion for living systems pushed me to deepen my biology knowledge. Understanding cellular mechanisms is essential for designing relevant medical imaging tools. In the long term, I wish to contribute to nanotechnology applied to living systems, where IT and biology converge.',
      nl: 'Mijn passie voor levende systemen dreef me om mijn biologiekennis te verdiepen.',
    },
    date: '2024-04',
    tags: ['Biology', 'Cell Biology', 'Nanotechnology', 'DNA', 'BioTech'],
  },
  // Algorithms
  {
    id: 'algo-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 8,
    type: 'formation',
    title: {
      fr: 'Algorithmique Avancee & Structures de Donnees',
      en: 'Advanced Algorithms & Data Structures',
      nl: 'Geavanceerde Algoritmen & Datastructuren',
    },
    description: {
      fr: 'Approfondissement algorithmique: arbres (B-tree, Red-Black), graphes (Dijkstra, A*), programmation dynamique, complexite algorithmique, optimisation combinatoire.',
      en: 'Advanced algorithmic study: trees (B-tree, Red-Black), graphs (Dijkstra, A*), dynamic programming, algorithmic complexity, combinatorial optimization.',
      nl: 'Geavanceerde algoritmische studie: bomen (B-tree, Red-Black), grafen (Dijkstra, A*).',
    },
    reflection: {
      fr: 'L\'algorithmique est le fondement de l\'informatique. Maitriser les structures de donnees avancees et les algorithmes d\'optimisation est essentiel pour traiter efficacement les donnees massives (images WSI, telemetrie satellite). La complexite algorithmique guide mes choix de conception pour garantir des performances acceptables a l\'echelle.',
      en: 'Algorithms are the foundation of computer science. Mastering advanced data structures and optimization algorithms is essential for efficiently processing massive data (WSI images, satellite telemetry). Algorithmic complexity guides my design choices to ensure acceptable performance at scale.',
      nl: 'Algoritmen zijn de basis van informatica. Het beheersen van geavanceerde datastructuren is essentieel.',
    },
    date: '2024-03',
    tags: ['Algorithms', 'Data Structures', 'B-tree', 'Graph Theory', 'Optimization'],
  },
  // Professional Experience
  {
    id: 'wequity-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 10,
    type: 'job_etudiant',
    title: {
      fr: 'Data Quality Student - Wequity',
      en: 'Data Quality Student - Wequity',
      nl: 'Data Quality Student - Wequity',
    },
    description: {
      fr: 'Job etudiant chez Wequity, startup specialisee dans les solutions de donnees. Collaboration avec les data engineers sur la qualite des donnees, decouverte des techniques d\'AI scraping, utilisation de l\'API OpenAI et autres plateformes d\'IA generative pour l\'extraction et le traitement de donnees.',
      en: 'Student job at Wequity, a startup specialized in data solutions. Collaboration with data engineers on data quality, discovery of AI scraping techniques, use of OpenAI API and other generative AI platforms for data extraction and processing.',
      nl: 'Studentenjob bij Wequity, een startup gespecialiseerd in data-oplossingen. Samenwerking met data engineers over datakwaliteit, ontdekking van AI scraping technieken.',
    },
    reflection: {
      fr: 'Cette experience chez Wequity a ete une immersion dans le monde professionnel de la data. Travailler aux cotes de data engineers m\'a permis de comprendre les enjeux reels de la qualite des donnees en production. L\'utilisation de l\'API OpenAI pour l\'AI scraping m\'a ouvert les yeux sur le potentiel des LLMs pour automatiser l\'extraction d\'informations structurees. Cette experience renforce mon profil de futur data engineer et ma comprehension des pipelines de donnees modernes.',
      en: 'This experience at Wequity was an immersion into the professional data world. Working alongside data engineers helped me understand real data quality challenges in production. Using the OpenAI API for AI scraping opened my eyes to the potential of LLMs for automating structured information extraction. This experience strengthens my future data engineer profile and understanding of modern data pipelines.',
      nl: 'Deze ervaring bij Wequity was een onderdompeling in de professionele datawereld.',
    },
    date: '2024-05',
    link: 'https://www.wequity.app/',
    tags: ['Data Quality', 'OpenAI API', 'AI Scraping', 'LLM', 'Python', 'Data Engineering'],
  },
  // EPHEC & Community Activities
  {
    id: 'ephec-1',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 10,
    type: 'summer_school',
    title: {
      fr: 'React Native Summer School 2024 - EPHEC',
      en: 'React Native Summer School 2024 - EPHEC',
      nl: 'React Native Summer School 2024 - EPHEC',
    },
    description: {
      fr: 'Formation intensive d\'une semaine sur le developpement mobile avec React Native: composants natifs, navigation, gestion d\'etat, integration API, et deploiement sur iOS/Android.',
      en: 'One-week intensive training on mobile development with React Native: native components, navigation, state management, API integration, and iOS/Android deployment.',
      nl: 'Intensieve weektraining over mobiele ontwikkeling met React Native: native componenten, navigatie, state management, API-integratie.',
    },
    reflection: {
      fr: 'Cette summer school m\'a permis d\'acquerir rapidement les competences en developpement mobile cross-platform. L\'intensite du format (une semaine complete) m\'a appris a absorber beaucoup d\'informations en peu de temps et a les appliquer immediatement. React Native partage beaucoup de concepts avec React web, ce qui renforce ma polyvalence full-stack.',
      en: 'This summer school allowed me to quickly acquire cross-platform mobile development skills. The intensity of the format (one full week) taught me to absorb a lot of information quickly and apply it immediately. React Native shares many concepts with React web, reinforcing my full-stack versatility.',
      nl: 'Deze summer school stelde me in staat snel cross-platform mobiele ontwikkelingsvaardigheden te verwerven.',
    },
    date: '2024-07',
    tags: ['React Native', 'Mobile', 'JavaScript', 'iOS', 'Android', 'EPHEC'],
  },
  {
    id: 'ephec-2',
    theme: {
      fr: 'Developpement Full-Stack',
      en: 'Full-Stack Development',
      nl: 'Full-Stack Ontwikkeling',
    },
    hours: 8,
    type: 'hackathon',
    title: {
      fr: 'Hackathon EPHEC 2024',
      en: 'EPHEC Hackathon 2024',
      nl: 'EPHEC Hackathon 2024',
    },
    description: {
      fr: 'Competition de developpement de 24h a l\'EPHEC: conception et implementation d\'une solution innovante en equipe pluridisciplinaire, pitch devant jury, et demonstration technique.',
      en: '24-hour development competition at EPHEC: design and implementation of an innovative solution in a multidisciplinary team, pitch to jury, and technical demonstration.',
      nl: '24-uur ontwikkelingscompetitie bij EPHEC: ontwerp en implementatie van een innovatieve oplossing in een multidisciplinair team.',
    },
    reflection: {
      fr: 'Le hackathon EPHEC a ete une experience intense de collaboration et d\'innovation. Travailler sous pression avec une deadline serree m\'a appris a prioriser les fonctionnalites essentielles et a communiquer efficacement avec mon equipe. Le pitch final devant le jury a renforce mes competences en presentation et en argumentation technique.',
      en: 'The EPHEC hackathon was an intense experience of collaboration and innovation. Working under pressure with a tight deadline taught me to prioritize essential features and communicate effectively with my team. The final pitch to the jury strengthened my presentation and technical argumentation skills.',
      nl: 'De EPHEC hackathon was een intense ervaring van samenwerking en innovatie.',
    },
    date: '2024-11',
    tags: ['Hackathon', 'Teamwork', 'Innovation', 'Pitch', 'EPHEC'],
  },
  {
    id: 'ephec-3',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 6,
    type: 'association',
    title: {
      fr: 'EPHEC Entreprendre - Membre Actif',
      en: 'EPHEC Entreprendre - Active Member',
      nl: 'EPHEC Entreprendre - Actief Lid',
    },
    description: {
      fr: 'Membre de l\'association EPHEC Entreprendre: participation aux ateliers sur l\'entrepreneuriat, networking avec des startups et PME, developpement de projets innovants, et mentorat.',
      en: 'Member of EPHEC Entreprendre association: participation in entrepreneurship workshops, networking with startups and SMEs, development of innovative projects, and mentoring.',
      nl: 'Lid van EPHEC Entreprendre vereniging: deelname aan ondernemerschap workshops, netwerken met startups en KMO\'s.',
    },
    reflection: {
      fr: 'EPHEC Entreprendre m\'a ouvert les yeux sur l\'aspect business de l\'informatique. Comprendre comment transformer une idee technique en produit viable est essentiel. Cette experience renforce ma capacite a communiquer la valeur de mes projets techniques (Varuna, QUICK-) a des non-techniciens et a identifier des opportunites de marche.',
      en: 'EPHEC Entreprendre opened my eyes to the business aspect of IT. Understanding how to transform a technical idea into a viable product is essential. This experience reinforces my ability to communicate the value of my technical projects to non-technicians and identify market opportunities.',
      nl: 'EPHEC Entreprendre opende mijn ogen voor het zakelijke aspect van IT.',
    },
    date: '2024-09',
    tags: ['Entrepreneurship', 'Networking', 'Business', 'Innovation', 'EPHEC'],
  },
  {
    id: 'volunteer-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 10,
    type: 'benevolat',
    title: {
      fr: 'Benevole Schola ULB - Soutien Scolaire',
      en: 'Schola ULB Volunteer - Academic Support',
      nl: 'Schola ULB Vrijwilliger - Academische Ondersteuning',
    },
    description: {
      fr: 'Etudiant benevole pour l\'association Schola ULB: accompagnement scolaire d\'eleves du secondaire, aide aux devoirs en mathematiques et sciences, et mentorat pour l\'orientation.',
      en: 'Student volunteer for Schola ULB association: academic support for high school students, homework help in mathematics and sciences, and guidance mentoring.',
      nl: 'Student vrijwilliger voor Schola ULB vereniging: academische ondersteuning voor middelbare scholieren, huiswerkhulp in wiskunde en wetenschappen.',
    },
    reflection: {
      fr: 'Le benevolat chez Schola ULB est une experience humaine enrichissante. Transmettre mes connaissances a des jeunes en difficulte m\'a appris la patience et l\'adaptation pedagogique. Expliquer des concepts complexes de maniere simple est une competence directement transferable a ma future carriere, que ce soit pour former des collegues ou presenter des projets techniques.',
      en: 'Volunteering at Schola ULB is an enriching human experience. Passing on my knowledge to struggling youth taught me patience and pedagogical adaptation. Explaining complex concepts simply is a skill directly transferable to my future career.',
      nl: 'Vrijwilligerswerk bij Schola ULB is een verrijkende menselijke ervaring.',
    },
    date: '2024-02',
    link: 'https://www.schola-ulb.be/',
    tags: ['Volunteer', 'Teaching', 'Mentoring', 'Social Impact', 'Education'],
  },
  {
    id: 'salon-1',
    theme: {
      fr: 'Telecom & Reseaux Satellites',
      en: 'Telecom & Satellite Networks',
      nl: 'Telecom & Satelliet Netwerken',
    },
    hours: 4,
    type: 'salon',
    title: {
      fr: 'Salon IT & Tech Brussels 2024',
      en: 'IT & Tech Brussels Fair 2024',
      nl: 'IT & Tech Brussels Beurs 2024',
    },
    description: {
      fr: 'Participation a des salons IT en Belgique: decouverte des nouvelles technologies, networking avec des professionnels du secteur, et veille technologique sur les tendances du marche.',
      en: 'Participation in IT fairs in Belgium: discovery of new technologies, networking with industry professionals, and technology watch on market trends.',
      nl: 'Deelname aan IT beurzen in Belgie: ontdekking van nieuwe technologieen, netwerken met professionals uit de sector.',
    },
    reflection: {
      fr: 'Les salons IT sont essentiels pour rester a jour sur les evolutions du secteur. J\'ai pu echanger avec des professionnels sur les tendances en cloud computing, IA, et cybersecurite. Ces contacts sont precieux pour comprendre les attentes du marche et orienter mes apprentissages vers les competences les plus demandees.',
      en: 'IT fairs are essential to stay up-to-date on industry developments. I was able to discuss with professionals about trends in cloud computing, AI, and cybersecurity. These contacts are valuable for understanding market expectations.',
      nl: 'IT beurzen zijn essentieel om op de hoogte te blijven van ontwikkelingen in de sector.',
    },
    date: '2024-10',
    tags: ['Networking', 'IT Fair', 'Technology Watch', 'Professional Development'],
  },
  {
    id: 'lang-1',
    theme: {
      fr: 'Data Engineering & Pipelines',
      en: 'Data Engineering & Pipelines',
      nl: 'Data Engineering & Pipelines',
    },
    hours: 4,
    type: 'certification',
    title: {
      fr: 'Certificat de Neerlandais - Niveau 2.3',
      en: 'Dutch Language Certificate - Level 2.3',
      nl: 'Nederlands Taalcertificaat - Niveau 2.3',
    },
    description: {
      fr: 'Certification en langue neerlandaise niveau 2.3: comprehension orale et ecrite, expression dans un contexte professionnel, vocabulaire technique IT.',
      en: 'Dutch language certification level 2.3: oral and written comprehension, expression in a professional context, IT technical vocabulary.',
      nl: 'Nederlands taalcertificaat niveau 2.3: mondelinge en schriftelijke begrip, expressie in een professionele context, IT technische woordenschat.',
    },
    reflection: {
      fr: 'En Belgique, le neerlandais est un atout professionnel majeur. Ce certificat valide ma capacite a communiquer dans un contexte professionnel flamand. Dans l\'industrie spatiale belge (neXat) et le secteur medical, la maitrise du neerlandais ouvre des portes vers des opportunites a Bruxelles et en Flandre.',
      en: 'In Belgium, Dutch is a major professional asset. This certificate validates my ability to communicate in a Flemish professional context. In the Belgian space industry (neXat) and medical sector, Dutch proficiency opens doors to opportunities in Brussels and Flanders.',
      nl: 'In Belgie is Nederlands een belangrijk professioneel voordeel. Dit certificaat valideert mijn vermogen om te communiceren in een Vlaamse professionele context.',
    },
    date: '2024-06',
    tags: ['Dutch', 'Language', 'Belgium', 'Professional Skills', 'Multilingual'],
  },
];

// ============================================
// COMBINED ACTIVITIES DATA
// ============================================
export const activitiesData: Activity[] = [
  ...dataEngineeringActivities,
  ...medicalImagingActivities,
  ...telecomActivities,
  ...iotActivities,
  ...fullStackActivities,
  ...aiActivities,
  ...additionalActivities,
];

// ============================================
// ACTIVITY TYPES
// ============================================
export const activityTypes = {
  hackathon: { fr: 'Hackathon', en: 'Hackathon', nl: 'Hackathon', color: 'bg-purple-500', lucideIcon: 'Trophy' },
  formation: { fr: 'Formation', en: 'Training', nl: 'Training', color: 'bg-blue-500', lucideIcon: 'BookOpen' },
  conference: { fr: 'Conference', en: 'Conference', nl: 'Conferentie', color: 'bg-green-500', lucideIcon: 'Mic' },
  visite: { fr: 'Visite', en: 'Company Visit', nl: 'Bedrijfsbezoek', color: 'bg-orange-500', lucideIcon: 'Building2' },
  jobday: { fr: 'Job Day', en: 'Job Day', nl: 'Job Day', color: 'bg-yellow-500', lucideIcon: 'Users' },
  salon: { fr: 'Salon IT', en: 'IT Fair', nl: 'IT Beurs', color: 'bg-pink-500', lucideIcon: 'Landmark' },
  projet: { fr: 'Projet', en: 'Project', nl: 'Project', color: 'bg-indigo-500', lucideIcon: 'Rocket' },
  certification: { fr: 'Certification', en: 'Certification', nl: 'Certificering', color: 'bg-emerald-500', lucideIcon: 'Award' },
  stage: { fr: 'Stage', en: 'Internship', nl: 'Stage', color: 'bg-amber-500', lucideIcon: 'GraduationCap' },
  benevolat: { fr: 'Benevolat', en: 'Volunteering', nl: 'Vrijwilligerswerk', color: 'bg-rose-500', lucideIcon: 'Heart' },
  summer_school: { fr: 'Summer School', en: 'Summer School', nl: 'Summer School', color: 'bg-cyan-500', lucideIcon: 'Sun' },
  association: { fr: 'Association', en: 'Association', nl: 'Vereniging', color: 'bg-teal-500', lucideIcon: 'Handshake' },
  job_etudiant: { fr: 'Job Etudiant', en: 'Student Job', nl: 'Studentenjob', color: 'bg-violet-500', lucideIcon: 'Briefcase' },
  competition: { fr: 'Compétition', en: 'Competition', nl: 'Competitie', color: 'bg-red-500', lucideIcon: 'Swords' },
};

// ============================================
// THEMES SUMMARY
// ============================================
export const themes = [
  {
    id: 'data-engineering',
    name: { fr: 'Data Engineering & Pipelines', en: 'Data Engineering & Pipelines', nl: 'Data Engineering & Pipelines' },
    description: {
      fr: 'Maitrise des outils de traitement de donnees, ETL, algorithmique avancee, gestion de projet et engagement communautaire.',
      en: 'Mastery of data processing tools, ETL, advanced algorithms, project management and community engagement.',
      nl: 'Beheersing van data processing tools, ETL, geavanceerde algoritmen, projectmanagement en gemeenschapsbetrokkenheid.'
    },
    lucideIcon: 'Database',
    color: '#3776AB',
    totalHours: 66,
  },
  {
    id: 'medical-imaging',
    name: { fr: 'Imagerie Medicale & BioTech', en: 'Medical Imaging & BioTech', nl: 'Medische Beeldvorming & BioTech' },
    description: {
      fr: 'Developpement de solutions pour la pathologie numerique, bioinformatique, ethique et droit medical.',
      en: 'Development of solutions for digital pathology, bioinformatics, ethics and medical law.',
      nl: 'Ontwikkeling van oplossingen voor digitale pathologie, bio-informatica, ethiek en medisch recht.'
    },
    lucideIcon: 'Dna',
    color: '#10B981',
    totalHours: 26,
  },
  {
    id: 'telecom',
    name: { fr: 'Telecom & Reseaux Satellites', en: 'Telecom & Satellite Networks', nl: 'Telecom & Satelliet Netwerken' },
    description: {
      fr: 'Expertise en communications spatiales, protocoles de transport, cybersecurite et veille technologique.',
      en: 'Expertise in space communications, transport protocols, cybersecurity and technology watch.',
      nl: 'Expertise in ruimtecommunicatie, transportprotocollen, cybersecurity en technologie-watch.'
    },
    lucideIcon: 'Satellite',
    color: '#6366F1',
    totalHours: 32,
  },
  {
    id: 'iot-embedded',
    name: { fr: 'IoT & Systemes Embarques', en: 'IoT & Embedded Systems', nl: 'IoT & Ingebedde Systemen' },
    description: {
      fr: 'Conception de systemes connectes, domotique, infrastructure serveur et architectures distribuees.',
      en: 'Design of connected systems, home automation, server infrastructure and distributed architectures.',
      nl: 'Ontwerp van verbonden systemen, domotica, server-infrastructuur en gedistribueerde architecturen.'
    },
    lucideIcon: 'Cpu',
    color: '#F59E0B',
    totalHours: 26,
  },
  {
    id: 'fullstack',
    name: { fr: 'Developpement Full-Stack', en: 'Full-Stack Development', nl: 'Full-Stack Ontwikkeling' },
    description: {
      fr: 'Creation d\'applications web et mobiles, design patterns, DevSecOps, hackathons et summer schools.',
      en: 'Web and mobile application creation, design patterns, DevSecOps, hackathons and summer schools.',
      nl: 'Web- en mobiele applicatie creatie, design patterns, DevSecOps, hackathons en summer schools.'
    },
    lucideIcon: 'Code2',
    color: '#EC4899',
    totalHours: 56,
  },
  {
    id: 'ai-automation',
    name: { fr: 'IA & Automatisation', en: 'AI & Automation', nl: 'AI & Automatisering' },
    description: {
      fr: 'Application du machine learning, MLOps et outils d\'IA a l\'imagerie medicale et au developpement.',
      en: 'Application of machine learning, MLOps and AI tools to medical imaging and development.',
      nl: 'Toepassing van machine learning, MLOps en AI-tools op medische beeldvorming en ontwikkeling.'
    },
    lucideIcon: 'Brain',
    color: '#8B5CF6',
    totalHours: 20,
  },
];

// Get activities by theme
export function getActivitiesByTheme(themeId: string): Activity[] {
  const themeNames: Record<string, string[]> = {
    'data-engineering': ['Data Engineering & Pipelines'],
    'medical-imaging': ['Imagerie Medicale & BioTech', 'Medical Imaging & BioTech', 'Medische Beeldvorming & BioTech'],
    'telecom': ['Telecom & Reseaux Satellites', 'Telecom & Satellite Networks', 'Telecom & Satelliet Netwerken'],
    'iot-embedded': ['IoT & Systemes Embarques', 'IoT & Embedded Systems', 'IoT & Ingebedde Systemen'],
    'fullstack': ['Developpement Full-Stack', 'Full-Stack Development', 'Full-Stack Ontwikkeling'],
    'ai-automation': ['IA & Automatisation', 'AI & Automation', 'AI & Automatisering'],
  };

  const names = themeNames[themeId] || [];
  return activitiesData.filter(activity =>
    names.includes(activity.theme.fr) ||
    names.includes(activity.theme.en) ||
    names.includes(activity.theme.nl)
  );
}

// Calculate total hours
export function getTotalHours(): number {
  return activitiesData.reduce((sum, activity) => sum + activity.hours, 0);
}
