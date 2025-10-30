export type Project = {
    id: string;
    title: string;
    description: string;
    year?: number;
    tech: string[];
    cover: string;
    href?: string;
    repo?: string;
  };
  
  export const PROJECTS: Project[] = [
    {
      id: 'ghostwriting',
      title: 'GhostWriting — Éditeur IA',
      description: 'Éditeur React avec suggestions de style/grammaire, auto-save et export.',
      year: 2025,
      tech: ['React', 'Next.js', 'Tailwind', 'Node.js'],
      cover: '/projects/ghostwriting.jpg',
    },
    {
      id: 'netflux',
      title: 'Netflux — OMDB API',
      description: 'Carrousel de films populaires, recherche, et liste infinie de films aléatoires.',
      tech: ['HTML', 'CSS', 'JavaScript', 'OMDB API'],
      cover: '/projects/netflux.jpg',
      href: 'https://m10-white.github.io/netflux/',
      repo: 'https://github.com/M10-white/netflux.git',
    },
    {
      id: 'doc-summarizer',
      title: 'DocSummarizer — App IA',
      description: 'Résumé automatique multi-langue pour textes/PDF/Word via NLP.',
      tech: ['React', 'Tailwind', 'FastAPI', 'HuggingFace', 'TypeScript'],
      cover: '/projects/doc-summarizer.jpg',
      repo: 'https://github.com/M10-white/DocSummarizer-AI-frontend.git',
    },
    {
      id: 'covit',
      title: 'CovIT — Plateforme OMS (COVID-19)',
      description: 'Suivi/visualisation et manipulation sécurisé des données épidémiques.',
      tech: ['Node.js', 'TypeScript', 'Python', 'Angular', 'MongoDB', 'Jupyter', 'Power BI', 'Docker'],
      cover: '/projects/covit.jpg',
    },
    {
      id: 'apiavocado',
      title: 'APIavocado — Prédiction de prix',
      description: "UI Vue.js qui consomme une API Flask pour prédire le prix de l'avocat + affichage CSV.",
      tech: ['Vue.js', 'Flask', 'Python', 'JavaScript', 'HTML', 'SCSS', 'Node.js'],
      cover: '/projects/apiavocado.jpg',
      repo: 'https://github.com/M10-white/APIavocado.git',
    },
    {
      id: 'timelapse-counter',
      title: 'Timelapse Counter — Générateur vidéo',
      description: 'Décompte animé jusqu’à N, export en .webm pour présentations/shorts.',
      tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
      cover: '/projects/timelapse-counter.jpg',
      href: 'https://m10-white.github.io/timelapse-counter/',
      repo: 'https://github.com/M10-white/timelapse-counter.git',
    },
    {
      id: 'monplusbeauvoyage',
      title: 'MonPlusBeauVoyage — Site d’agence',
      description: 'Mise en ligne du catalogue voyages de l’agence avec présentation claire des offres.',
      tech: ['WordPress', 'HTML', 'SCSS', 'PHP', 'REST API'],
      cover: '/projects/monplusbeauvoyage.jpg',
      href: 'https://monplusbeauvoyage1.wordpress.com/',
    },
    {
      id: 'siinfo',
      title: 'SIINFO — Site vitrine',
      description: "Présentation des services SIInfo (systèmes d’information fiables et sécurisés).",
      tech: ['WordPress', 'HTML', 'SCSS', 'PHP', 'REST API'],
      cover: '/projects/siinfo.jpg',
      href: 'https://siinfo07.wordpress.com/',
    },
    {
      id: 'boissier',
      title: 'Boissier Électricité — Site vitrine',
      description: 'Site de présentation (électricité, informatique, air comprimé, eau) via CMS amen.fr.',
      tech: ['SimplySite', 'HTML', 'SCSS', 'PHP'],
      cover: '/projects/boissier.jpg',
      href: 'https://www.electricite-boissier.fr/',
    },
    {
      id: 'bigroup-client',
      title: 'BIGroup — CLIENT (CRM)',
      description: 'Logiciel interne pour centraliser, organiser, rechercher et exporter les infos clients.',
      tech: ['HTML', 'SCSS', 'PHP', 'JavaScript', 'MySQL'],
      cover: '/projects/bigroup-client.jpg',
    },
    {
      id: 'asa-du-vercors',
      title: 'A.S.A du Vercors — Site vitrine',
      description: 'Création sur-mesure puis migration vers WordPress, ajout de pages et amélioration des modules existants.',
      tech: ['WordPress', 'HTML', 'SCSS', 'PHP', 'JavaScript', 'REST API'],
      cover: '/projects/asa-vercors.jpg',
      href: 'https://asaduvercors.fr/',
    },
    {
      id: 'bigroup-stock',
      title: 'BIGroup — STOCK (Matériel IT)',
      description: 'Gestion de stock : entrées/sorties, historique détaillé, traçabilité du matériel.',
      tech: ['HTML', 'SCSS', 'PHP', 'JavaScript', 'MySQL'],
      cover: '/projects/bigroup-stock.jpg',
    },
    {
      id: 'scf-cordeliere',
      title: 'SCF Cordelière — Site vitrine',
      description: 'Plateforme pour présenter activités, objectifs et services de la SCF.',
      tech: ['WordPress', 'HTML', 'SCSS', 'PHP', 'JavaScript', 'REST API'],
      cover: '/projects/scf-cordeliere.jpg',
      href: 'https://scfcordeliere.fr/',
    }
  ];
  
  export function getProject(id: string) {
    return PROJECTS.find(p => p.id === id) ?? null;
  }
  
  export function getAllProjectIds() {
    return PROJECTS.map(p => p.id);
  }
  