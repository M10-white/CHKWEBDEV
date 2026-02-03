import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/wp";

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <main className="min-h-dvh bg-neutral-950 text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 [mask-image:radial-gradient(70%_60%_at_50%_40%,#000_30%,transparent_80%)]">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/25 via-fuchsia-500/15 to-cyan-500/25 blur-3xl" />
      </div>

      <section className="px-6 pt-12 pb-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold">Projects</h1>
        <p className="mt-2 text-neutral-300">
          Tous tes projets gérés depuis WordPress (CPT + ACF).
        </p>
      </section>

      <section className="px-6 pb-20 max-w-6xl mx-auto">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.id}>
              <Link
                href={`/projects/${p.slug}`}
                className="group block rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900/50 hover:bg-neutral-900 transition focus:outline-none focus:ring-2 focus:ring-white/30"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  {p.coverUrl ? (
                    <Image
                      src={p.coverUrl}
                      alt={p.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center bg-neutral-900 text-neutral-500">
                      Pas d’image
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
                </div>

                <div className="p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    {p.year ? <span className="text-xs text-neutral-400">{p.year}</span> : null}
                  </div>

                  <p className="mt-2 text-sm text-neutral-300 line-clamp-2">
                    {p.description || "—"}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="text-xs px-2 py-1 rounded bg-neutral-800 text-neutral-200 border border-neutral-700"
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

                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-sm text-neutral-300 group-hover:text-white">
                      En savoir plus →
                    </span>

                    <div className="flex gap-3">
                      {p.demoUrl ? (
                        <a
                          href={p.demoUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-neutral-400 hover:text-white underline underline-offset-4"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Demo ↗
                        </a>
                      ) : null}
                      {p.repoUrl ? (
                        <a
                          href={p.repoUrl}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm text-neutral-400 hover:text-white"
                          target="_blank"
                          rel="noreferrer"
                        >
                          Code
                        </a>
                      ) : null}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
