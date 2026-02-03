import Image from "next/image";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/wp";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProjectPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = await getProjectBySlug(params.slug);
  if (!project) return notFound();

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_80%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/25 blur-3xl" />
      </div>

      <section className="px-6 pt-10 pb-8 max-w-6xl mx-auto">
        <Link href="/projects" className="text-sm text-neutral-300 hover:text-white">
          ← Retour
        </Link>

        <div className="mt-6 grid gap-8 md:grid-cols-[360px_1fr] items-start">
          {/* cover plus petite (comme tu voulais) */}
          <div className="rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/40">
            <div className="relative aspect-[4/3]">
              {project.coverUrl ? (
                <Image src={project.coverUrl} alt={project.title} fill className="object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-neutral-500">
                  Pas d’image
                </div>
              )}
            </div>
          </div>

          <div>
            <h1 className="text-3xl font-semibold">{project.title}</h1>
            {project.year ? <p className="mt-1 text-neutral-400">Année — {project.year}</p> : null}
            <p className="mt-4 text-neutral-200">{project.description}</p>

            {project.tech.length ? (
              <>
                <h2 className="mt-6 text-sm tracking-widest text-neutral-400">TECHNOLOGIES</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-200 border border-neutral-700"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </>
            ) : null}

            <div className="mt-6 flex flex-wrap gap-3">
              {project.demoUrl ? (
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl bg-white text-black font-medium hover:opacity-90 transition"
                >
                  Voir la démo ↗
                </a>
              ) : null}

              {project.repoUrl ? (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 rounded-xl border border-neutral-700 hover:border-neutral-500 transition"
                >
                  Code source
                </a>
              ) : null}
            </div>

            {/* notes propres sans <p><ul> */}
            <div className="mt-10 rounded-2xl border border-neutral-800 bg-neutral-900/40 p-5">
              <h3 className="text-sm tracking-widest text-neutral-400">DÉTAILS</h3>
              <ul className="mt-3 list-disc ml-5 space-y-1 text-neutral-200">
                <li>Tu peux enrichir la fiche via WordPress (ACF) : description, technos, liens…</li>
                <li>Ajoute une cover : elle sera récupérée via l’ID media WordPress automatiquement.</li>
                <li>Tu peux aussi ajouter du contenu WordPress (éditeur) plus tard si tu veux.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
