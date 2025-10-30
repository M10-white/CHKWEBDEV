'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Home, Gamepad2, Github, ChevronRight, ChevronLeft } from 'lucide-react';
import { useEffect, useState, ComponentType } from 'react';

const NAV = [
  { href: '/', label: 'Projets', icon: Home },
  { href: '/games', label: 'Jeux', icon: Gamepad2 },
] as const;

const COLLAPSED_W = 60;
const EXPANDED_W = 150;

type ItemProps = {
  href: string;
  label: string;
  icon: ComponentType<{ size?: number; className?: string }>;
  expanded: boolean;
  active: boolean;
};

function NavItem({ href, label, icon: Icon, expanded, active }: ItemProps) {
  return (
    <Link
      href={href}
      title={label}
      className={[
        // largeur + chevauchement 1px côté droit
        'group relative flex w-full items-center gap-3 px-3 py-2 text-sm transition mr-[-1px]',
        // arrondi à gauche uniquement
        'rounded-l-[12px] rounded-r-none',
        // petit trait de raccord (peint par-dessus la border de l’aside)
        'after:content-[""] after:absolute after:right-[-1px] after:top-0 after:bottom-0 after:w-[1px]',
        // couleurs
        active
          ? 'bg-[#0b0b0b] text-white after:bg-[#0b0b0b]'
          : 'text-neutral-300 hover:text-white hover:bg-neutral-800/60 after:bg-transparent hover:after:bg-neutral-800/60',
      ].join(' ')}
    >
      <Icon size={18} className={active ? '' : 'opacity-80 group-hover:opacity-100'} />
      <span className={expanded ? 'block' : 'hidden'}>{label}</span>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const w = expanded ? `${EXPANDED_W}px` : `${COLLAPSED_W}px`;
    document.documentElement.style.setProperty('--sidebar-w', w);
  }, [expanded]);

  const isActive = (href: string) =>
    pathname === href || (href !== '/' && pathname.startsWith(href));

  return (
    <>
      {/* bouton mobile */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed left-3 top-3 z-40 rounded-xl border border-neutral-800 bg-neutral-900/80 px-3 py-2 text-sm text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50"
        aria-label="Ouvrir le menu"
      >
        Menu
      </button>

      {/* rail desktop (fixe) */}
      <aside
        className="hidden md:flex fixed left-0 top-0 z-30 h-dvh flex-col border-r border-neutral-900 bg-neutral-900 pl-2 pr-0 py-3 transition-[width]"
        style={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
        role="navigation"
        aria-label="Barre latérale"
      >
        <nav className="grid gap-2">
          {NAV.map((n) => (
            <NavItem
              key={n.href}
              href={n.href}
              label={n.label}
              icon={n.icon}
              expanded={expanded}
              active={isActive(n.href)}
            />
          ))}
        </nav>

        <div className="mt-auto grid gap-2 pr-2 pl-0 pb-2">
          <a
            href="https://github.com/M10-white"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center w-full text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50"
            title="GitHub"
          >
            <Github size={18} />
            <span className={expanded ? 'block' : 'hidden'}>GitHub</span>
          </a>
        </div>

        {/* bouton dépliage/repliage */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="ml-0 mr-2 mb-1 mt-2 flex items-center justify-center rounded-lg border border-neutral-800 bg-neutral-900/80 py-2 hover:bg-neutral-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50"
          title={expanded ? 'Replier' : 'Déplier'}
          aria-expanded={expanded}
        >
          {expanded ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
      </aside>

      {/* tiroir mobile */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 z-50 h-dvh w-[260px] border-r border-neutral-800 bg-neutral-950 px-3 py-4"
              role="dialog"
              aria-label="Menu latéral"
            >
              <div className="flex items-center justify-between px-2">
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-md border border-neutral-800 px-2 py-1 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50"
                >
                  Fermer
                </button>
              </div>
              <nav className="mt-4 grid gap-1">
                {NAV.map((n) => (
                  <Link
                    key={n.href}
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/50"
                    aria-current={isActive(n.href) ? 'page' : undefined}
                  >
                    <n.icon size={18} />
                    <span>{n.label}</span>
                  </Link>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
