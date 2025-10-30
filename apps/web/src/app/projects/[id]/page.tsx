import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

/** --- Types & data ------------------------------------------------------- */
type LinkItem = { label: string; href: string };

type Project = {
  id: string;
  title: string;
  description: string;
  year?: number;
  tech: string[];
  cover: string;
  href?: string;
  repo?: string;
  // Optionnels pour enrichir la page
  highlights?: string[];
  shots?: string[]; // ex: ['/projects/<id>/shots/1.jpg', ...]
  links?: LinkItem[];
};

const PROJECTS: Project[] = [
  {
    id: "ghostwriting",
    title: "GhostWriting — Éditeur IA",
    description:
      "Éditeur React avec suggestions de style/grammaire, auto-save et export.",
    year: 2025,
    tech: ["React", "Next.js", "Tailwind", "Node.js"],
    cover: "/projects/ghostwriting.jpg",
    highlights: [
      "Auto-save local et export Markdown",
      "Composants réutilisables (éditeur + panneau de suggestions)",
    ],
    // shots: ["/projects/ghostwriting/shots/1.jpg", "/projects/ghostwriting/shots/2.jpg"],
  },
  {
    id: "netflux",
    title: "Netflux — OMDB API",
    description:
      "Carrousel de films populaires, recherche, et liste infinie de films aléatoires.",
    tech: ["HTML", "CSS", "JavaScript", "OMDB API"],
    cover: "/projects/netflux.jpg",
    href: "https://m10-white.github.io/netflux/",
    repo: "https://github.com/M10-white/netflux.git",
    highlights: [
      "Appels API OMDB + filtrage",
      "Liste infinie de suggestions",
    ],
  },
  {
    id: "doc-summarizer",
    title: "DocSummarizer — App IA",
    description:
      "Résumé automatique multi-langue pour textes/PDF/Word via NLP.",
    tech: ["React", "Tailwind", "FastAPI", "HuggingFace", "TypeScript"],
    cover: "/projects/doc-summarizer.jpg",
    repo: "https://github.com/M10-white/DocSummarizer-AI-frontend.git",
  },
  {
    id: "covit",
    title: "CovIT — Plateforme OMS (COVID-19)",
    description:
      "Suivi/visualisation et manipulation sécurisé des données épidémiques.",
    tech: [
      "Node.js",
      "TypeScript",
      "Python",
      "Angular",
      "MongoDB",
      "Jupyter",
      "Power BI",
      "Docker",
    ],
    cover: "/projects/covit.jpg",
  },
  {
    id: "apiavocado",
    title: "APIavocado — Prédiction de prix",
    description:
      "UI Vue.js qui consomme une API Flask pour prédire le prix de l'avocat + affichage CSV.",
    tech: ["Vue.js", "Flask", "Python", "JavaScript", "HTML", "SCSS", "Node.js"],
    cover: "/projects/apiavocado.jpg",
    repo: "https://github.com/M10-white/APIavocado.git",
  },
  {
    id: "timelapse-counter",
    title: "Timelapse Counter — Générateur vidéo",
    description:
      "Décompte animé jusqu’à N, export en .webm pour présentations/shorts.",
    tech: ["HTML", "CSS", "JavaScript", "Node.js"],
    cover: "/projects/timelapse-counter.jpg",
    href: "https://m10-white.github.io/timelapse-counter/",
    repo: "https://github.com/M10-white/timelapse-counter.git",
  },
  {
    id: "monplusbeauvoyage",
    title: "MonPlusBeauVoyage — Site d’agence",
    description:
      "Mise en ligne du catalogue voyages de l’agence avec présentation claire des offres.",
    tech: ["WordPress", "HTML", "SCSS", "PHP", "REST API"],
    cover: "/projects/monplusbeauvoyage.jpg",
    href: "https://monplusbeauvoyage1.wordpress.com/",
  },
  {
    id: "siinfo",
    title: "SIINFO — Site vitrine",
    description:
      "Présentation des services SIInfo (systèmes d’information fiables et sécurisés).",
    tech: ["WordPress", "HTML", "SCSS", "PHP", "REST API"],
    cover: "/projects/siinfo.jpg",
    href: "https://siinfo07.wordpress.com/",
  },
  {
    id: "boissier",
    title: "Boissier Électricité — Site vitrine",
    description:
      "Site de présentation (électricité, informatique, air comprimé, eau) via CMS amen.fr.",
    tech: ["SimplySite", "HTML", "SCSS", "PHP"],
    cover: "/projects/boissier.jpg",
    href: "https://www.electricite-boissier.fr/",
  },
  {
    id: "bigroup-client",
    title: "BIGroup — CLIENT (CRM)",
    description:
      "Logiciel interne pour centraliser, organiser, rechercher et exporter les infos clients.",
    tech: ["HTML", "SCSS", "PHP", "JavaScript", "MySQL"],
    cover: "/projects/bigroup-client.jpg",
  },
  {
    id: "asa-du-vercors",
    title: "A.S.A du Vercors — Site vitrine",
    description:
      "Création sur-mesure puis migration vers WordPress, ajout de pages et amélioration des modules existants.",
    tech: ["WordPress", "HTML", "SCSS", "PHP", "JavaScript", "REST API"],
    cover: "/projects/asa-vercors.jpg",
    href: "https://asaduvercors.fr/",
  },
  {
    id: "bigroup-stock",
    title: "BIGroup — STOCK (Matériel IT)",
    description:
      "Gestion de stock : entrées/sorties, historique détaillé, traçabilité du matériel.",
    tech: ["HTML", "SCSS", "PHP", "JavaScript", "MySQL"],
    cover: "/projects/bigroup-stock.jpg",
  },
  {
    id: "scf-cordeliere",
    title: "SCF Cordelière — Site vitrine",
    description:
      "Plateforme pour présenter activités, objectifs et services de la SCF.",
    tech: ["WordPress", "HTML", "SCSS", "PHP", "JavaScript", "REST API"],
    cover: "/projects/scf-cordeliere.jpg",
    href: "https://scfcordeliere.fr/",
  },
];

/** --- Next.js metadata / params (async) ---------------------------------- */
type Params = { id: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  return {
    title: project ? `${project.title}` : "Projet introuvable",
    description: project?.description,
  };
}

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ id: p.id }));
}

/** --- Page ---------------------------------------------------------------- */
export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { id } = await params;
  const project = PROJECTS.find((p) => p.id === id);
  if (!project) return notFound();

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      {/* Décor doux */}
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_80%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 via-fuchsia-500/10 to-cyan-500/20 blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pt-10 pb-24">
        {/* Header compact: cover à gauche (260px), texte à droite */}
        <div className="mt-4 grid gap-8 md:grid-cols-[260px,1fr]">
          {/* media */}
          <div className="relative h-[180px] md:h-[200px] rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-sm">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 260px"
              priority
            />
          </div>

          {/* infos */}
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold">
              {project.title}
            </h1>
            <div className="mt-1 text-neutral-400 text-sm">
              Année — {project.year ?? "—"}
            </div>

            <p className="mt-3 text-neutral-200 max-w-prose">
              {project.description}
            </p>

            <div className="mt-4">
              <h4 className="font-medium text-neutral-200 text-sm">
                TECHNOLOGIES
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-300 border border-neutral-700"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.href && (
                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg bg-white text-black px-3 py-1.5 text-sm font-medium hover:opacity-90"
                  >
                    Voir la démo ↗
                  </a>
                )}
                {project.repo && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200 hover:border-neutral-500"
                  >
                    Code source
                  </a>
                )}
                <Link
                  href="/"
                  className="rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-300 hover:border-neutral-600"
                >
                  ← Retour
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        {project.highlights?.length ? (
          <section className="mt-10">
            <h3 className="text-lg font-medium text-neutral-100">
              Points clés
            </h3>
            <ul className="list-disc ml-5 mt-3 text-neutral-300 space-y-1">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Shots */}
        {project.shots?.length ? (
          <section className="mt-10">
            <h3 className="text-lg font-medium text-neutral-100">Aperçus</h3>
            <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
              {project.shots.map((src) => (
                <a
                  key={src}
                  href={src}
                  target="_blank"
                  rel="noreferrer"
                  className="group block rounded-xl overflow-hidden border border-neutral-800 bg-neutral-900"
                >
                  <Image
                    src={src}
                    alt=""
                    width={640}
                    height={400}
                    className="aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* Liens complémentaires */}
        {project.links?.length ? (
          <section className="mt-10">
            <h3 className="text-lg font-medium text-neutral-100">
              Ressources
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-neutral-700 bg-neutral-900 px-3 py-1.5 text-sm text-neutral-200 hover:border-neutral-500"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* Placeholder d'intro si rien d'autre */}
        {!project.highlights?.length &&
        !project.shots?.length &&
        !project.links?.length ? (
          <section className="mt-10">
            <h3 className="text-lg font-medium text-neutral-100">
              Détails & notes
            </h3>
            <div className="mt-3 text-neutral-300">
              <p>
                Ce projet est décrit rapidement ici — si tu veux, on peut
                enrichir chaque fiche avec :
              </p>
              <ul className="list-disc ml-5 mt-2">
                <li>aperçus (screenshots),</li>
                <li>challenges techniques,</li>
                <li>extraits de code,</li>
                <li>démo intégrée (iframe) si le projet est statique.</li>
              </ul>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
