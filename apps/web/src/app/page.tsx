'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Project = {
  id: string;
  title: string;
  description: string;
  year?: number;
  tech: string[];
  cover: string;
  href?: string;
  repo?: string;
};

const PROJECTS: Project[] = [
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
    href: 'https://m10-white.github.io/filmJavascript/',
    repo: '#',
  },
  {
    id: 'doc-summarizer',
    title: 'DocSummarizer — App IA',
    description: 'Résumé automatique multi-langue pour textes/PDF/Word via NLP.',
    tech: ['React', 'Tailwind', 'FastAPI', 'HuggingFace', 'TypeScript'],
    cover: '/projects/doc-summarizer.jpg',
    repo: '#',
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
    repo: '#',
  },
  {
    id: 'timelapse-counter',
    title: 'Timelapse Counter — Générateur vidéo',
    description: 'Décompte animé jusqu’à N, export en .webm pour présentations/shorts.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Node.js'],
    cover: '/projects/timelapse-counter.jpg',
    href: 'https://m10-white.github.io/timelapse-counter/',
    repo: '#',
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

const PINNED_TECHS = [
  'All',
  'WordPress',
  'PHP',
  'React',
  'Vue.js',
  'Angular',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Python',
  'FastAPI',
  'MongoDB',
  'MySQL',
  'Docker',
  'Tailwind',
  'PostgreSQL',
] as const;

const ALL_TECHS = Array.from(new Set(PROJECTS.flatMap(p => p.tech))).sort();

export default function Home() {
  const [query, setQuery] = useState('');
  const [tech, setTech] = useState<string>('All');
  const [showAllTechs, setShowAllTechs] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS
      .filter(p => (tech === 'All' ? true : p.tech.includes(tech)))
      .filter(p => {
        if (!q) return true;
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tech.some(t => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [query, tech]);

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      {/* décor */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_80%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/25 blur-3xl" />
      </div>

      {/* header */}
      <section className="px-6 pt-16 pb-6 md:pt-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <img
            src="/logo.svg"
            alt="CHKWEBDEV logo"
            className="w-[600px] h-auto ml-[-150px]"
          />
        </motion.div>

        {/* petite citation */}
        <p className="mt-4 text-neutral-300 max-w-2xl italic">
          « Chaque ligne de code est une brique posée vers un monde plus créatif. »
        </p>

        {/* barre de recherche */}
        <div className="mt-25">
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Rechercher (titre, techno...)"
            className="w-full md:max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-600"
          />
        </div>

        {/* filtres*/}
        <div className="mt-5 space-y-3">
          {/* rangée scrollable, scrollbar masquée + bords en dégradé */}
          <div className="relative">
            {/* bords en fondu */}
            <div className="pointer-events-none absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-neutral-950 to-transparent" />

            <div className="relative flex items-center gap-2">
              {/* zone scrollable */}
              <div
                className={[
                  'flex-1 overflow-x-auto scroll-smooth whitespace-nowrap pr-10',
                  '[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
                ].join(' ')}
              >
                <div className="inline-flex items-center gap-2">
                  {PINNED_TECHS.map((label) => (
                    <Chip
                      key={label}
                      active={tech === label}
                      onClick={() => setTech(label)}
                    >
                      {label}
                    </Chip>
                  ))}
                </div>
              </div>

              {/* bouton + fondu */}
              <div className="relative shrink-0">
                {/* le fondu à gauche du bouton */}
                <div className="absolute left-[-24px] top-0 bottom-0 w-6 bg-gradient-to-l from-neutral-950/80 to-transparent pointer-events-none" />
                <button
                  onClick={() => setShowAllTechs(s => !s)}
                  className="relative z-10 px-4 py-2 rounded-full text-sm border border-neutral-700 bg-neutral-900 hover:border-neutral-500"
                >
                  {showAllTechs ? 'Masquer les technos' : 'Toutes les technos'}
                </button>
              </div>
            </div>
          </div>

          {/* grille complète repliable */}
          <AnimatePresence initial={false}>
            {showAllTechs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900/50 p-3"
              >
                <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {ALL_TECHS.map((t) => (
                    <Chip key={t} active={tech === t} onClick={() => setTech(t)}>
                      {t}
                    </Chip>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* grille projets */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neutral-400">
              Aucun projet ne correspond à la recherche.
            </motion.p>
          ) : (
            <motion.ul key="grid" layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(p => (
                <ProjectCard key={p.id} p={p} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={[
        'shrink-0 px-4 py-2 rounded-full text-sm transition',
        'border backdrop-blur',
        active
          ? 'bg-white text-black border-white shadow-[0_0_0_1px_#fff]'
          : 'bg-neutral-900/70 border-neutral-800 hover:border-neutral-600 hover:bg-neutral-900',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 18 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="group rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition"
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <Image
          src={p.cover}
          alt={p.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{p.title}</h3>
          {p.year ? <span className="text-xs text-neutral-400">{p.year}</span> : null}
        </div>

        <p className="mt-2 text-sm text-neutral-300 line-clamp-2">{p.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {p.tech.slice(0, 4).map(t => (
            <span
              key={t}
              className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
            >
              {t}
            </span>
          ))}
          {p.tech.length > 4 && (
            <span className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              +{p.tech.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-3">
          {p.href && (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm underline underline-offset-4 hover:no-underline"
            >
              Voir le projet ↗
            </a>
          )}
          {p.repo && (
            <a href={p.repo} target="_blank" rel="noreferrer" className="text-sm text-neutral-400 hover:text-white">
              Code
            </a>
          )}
        </div>
      </div>
    </motion.li>
  );
}
