import Link from "next/link";
import { ArrowUpRight, ExternalLink, Github, Star } from "lucide-react";
import { Reveal } from "./Reveal";
import { projects } from "@/lib/data";

export function Projects() {
  return (
    <section id="projects" className="section-container scroll-mt-16">
      <Reveal>
        <h2 className="section-title">Proyek Pilihan</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="section-subtitle">
          Beberapa proyek yang paling saya banggakan. Klik untuk melihat detail.
        </p>
      </Reveal>

      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05}>
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand-700">
              {/* Cover visual */}
              <Link
                href={`/projects/${p.slug}`}
                className={`relative flex h-40 items-end bg-gradient-to-br ${p.gradient} p-5`}
              >
                <span className="text-2xl font-extrabold text-white drop-shadow">
                  {p.title}
                </span>
                {p.featured && (
                  <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-amber-700 backdrop-blur">
                    <Star className="h-3 w-3 fill-current" />
                    Unggulan
                  </span>
                )}
                <span className="absolute right-4 bottom-4 rounded-full bg-white/20 p-1.5 text-white transition group-hover:bg-white/30">
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </Link>

              <div className="flex flex-1 flex-col p-6">
                <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
                  {p.subtitle} · {p.year}
                </p>
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="transition hover:text-brand-600 dark:hover:text-brand-400"
                  >
                    {p.title}
                  </Link>
                </h3>
                <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {p.description}
                </p>

                <div className="mb-5 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-4 border-t border-zinc-100 pt-4 dark:border-zinc-800">
                  <Link
                    href={`/projects/${p.slug}`}
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 transition hover:text-brand-500 dark:text-brand-400"
                  >
                    Lihat detail
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                  {p.repoUrl && (
                    <a
                      href={p.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <Github className="h-4 w-4" />
                      Kode
                    </a>
                  )}
                  {p.liveUrl && (
                    <a
                      href={p.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-600 transition hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
