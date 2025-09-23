'use client';

import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

type Game = {
  slug: string;
  title: string;
  description: string;
  year?: number;
  tags: string[]; 
  cover: string;
  src: string; 
};

const GAMES: Game[] = [
  {
    slug: 'silent-talk',
    title: 'Silent Talk',
    description: 'Petit jeu narratif/quiz psychologique avec ambiance sonore.',
    year: 2025,
    tags: ['Narratif', 'Quiz', 'Audio'],
    cover: '/games/silent-talk/cover.jpg',
    src: '/games/silent-talk/index.html',
  },
  {
    slug: 'runner-neo',
    title: 'Runner NEO',
    description: 'Runner arcade minimaliste — réflexes et patterns.',
    year: 2024,
    tags: ['Arcade', 'Action'],
    cover: '/games/runner-neo/cover.jpg',
    src: '/games/runner-neo/index.html',
  },
];

const PINNED_TAGS = ['All', 'Arcade', 'Narratif', 'Puzzle', 'Action', 'Jam'] as const;
const ALL_TAGS = Array.from(new Set(GAMES.flatMap(g => g.tags))).sort();

export default function GamesPage() {
  const [query, setQuery] = useState('');
  const [tag, setTag] = useState<string>('All');
  const [showAllTags, setShowAllTags] = useState(false);
  const [openSlug, setOpenSlug] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return GAMES
      .filter(g => (tag === 'All' ? true : g.tags.includes(tag)))
      .filter(g => {
        if (!q) return true;
        return (
          g.title.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q))
        );
      })
      .sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
  }, [query, tag]);

  // Empêche le scroll de la page quand la modal est ouverte
  useEffect(() => {
    if (openSlug) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = prev; };
    }
  }, [openSlug]);

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      {/* décor doux */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_80%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/25 blur-3xl" />
      </div>

      <section className="px-6 pt-16 pb-6 md:pt-8 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="relative"
        >
          <img
            src="/logo-game.svg"
            alt="CHKWEBDEV game logo"
            className="w-[900px] h-auto ml-[-100px]"
          />
        </motion.div>

        {/* tagline simple */}
        <p className="mt-4 text-neutral-300 max-w-2xl italic">          
            Une petite sélection perso — faits pour s’amuser, directement dans le navigateur.
        </p>

        {/* recherche */}
        <div className="mt-25">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Rechercher un jeu (titre, tag...)"
            className="w-full md:max-w-xl rounded-2xl bg-neutral-900 border border-neutral-800 px-4 py-3 outline-none focus:border-neutral-600"
          />
        </div>

        {/* filtres */}
        <div className="mt-5 flex flex-col gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {PINNED_TAGS.map(label => (
              <Chip key={label} active={tag === label} onClick={() => setTag(label)}>{label}</Chip>
            ))}
            <button
              onClick={() => setShowAllTags(s => !s)}
              className="ml-auto shrink-0 text-sm px-3 py-2 rounded-full border border-neutral-700 bg-neutral-900 hover:border-neutral-500"
            >
              {showAllTags ? 'Masquer tous les tags' : 'Tous les tags'}
            </button>
          </div>

          <AnimatePresence initial={false}>
            {showAllTags && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="grid gap-2 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
              >
                {ALL_TAGS.map(t => (
                  <Chip key={t} active={tag === t} onClick={() => setTag(t)}>{t}</Chip>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* grille */}
      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.p key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-neutral-400">
              Aucun jeu ne correspond à la recherche.
            </motion.p>
          ) : (
            <motion.ul key="grid" layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((g) => (
                <GameCard key={g.slug} g={g} onPlay={() => setOpenSlug(g.slug)} />
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </section>

      {/* modal lecteur */}
      <GamePlayerModal
        game={GAMES.find(g => g.slug === openSlug) ?? null}
        onClose={() => setOpenSlug(null)}
      />
    </main>
  );
}

/** UI bits */
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
        'shrink-0 px-4 py-2 rounded-full text-sm border transition',
        active ? 'bg-white text-black border-white'
               : 'bg-neutral-900 border-neutral-800 hover:border-neutral-600',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function GameCard({ g, onPlay }: { g: Game; onPlay: () => void }) {
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
          src={g.cover}
          alt={g.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          priority={false}
        />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-lg font-semibold">{g.title}</h3>
          {g.year ? <span className="text-xs text-neutral-400">{g.year}</span> : null}
        </div>

        <p className="mt-2 text-sm text-neutral-300 line-clamp-2">{g.description}</p>

        <div className="mt-3 flex flex-wrap gap-2">
          {g.tags.slice(0, 4).map(t => (
            <span key={t} className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700">
              {t}
            </span>
          ))}
          {g.tags.length > 4 && (
            <span className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-400 border border-neutral-700">
              +{g.tags.length - 4}
            </span>
          )}
        </div>

        <div className="mt-4 flex gap-3">
            <button
                onClick={onPlay}
                className="text-sm px-4 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
            >
                Jouer
            </button>
            <a
                href={`/games/${g.slug}`}
                className="text-sm text-neutral-300 hover:text-white underline underline-offset-4"
            >
                En savoir plus
            </a>
        </div>
      </div>
    </motion.li>
  );
}

/** Modal lecteur avec <iframe> */
function GamePlayerModal({ game, onClose }: { game: Game | null; onClose: () => void }) {
    if (!game) return null;

    return (
    <AnimatePresence>
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm grid place-items-center p-4"
        onClick={onClose}
        >
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden border border-neutral-800"
            onClick={(e) => e.stopPropagation()}
        >
            {/* barre d’actions */}
            <div className="absolute top-2 right-2 z-10 flex gap-2">
            <a
                href={`/games/${game.slug}`}
                className="px-3 py-1.5 text-sm rounded-md bg-white text-black"
                title="Ouvrir en plein écran"
            >
                Plein écran ↗
            </a>
            <button
                onClick={onClose}
                className="px-3 py-1.5 text-sm rounded-md bg-white/90 text-black hover:bg-white"
            >
                Fermer
            </button>
            </div>

            <iframe
            src={game.src}
            title={game.title}
            className="absolute inset-0 w-full h-full"
            allow="autoplay; fullscreen; gamepad; xr-spatial-tracking; encrypted-media"
            loading="eager"
            />
        </motion.div>
        </motion.div>
    </AnimatePresence>
    );
}  