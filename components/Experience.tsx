import { Briefcase, Dot } from "lucide-react";
import { Reveal } from "./Reveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="section-container scroll-mt-16">
      <Reveal>
        <h2 className="section-title">Pengalaman</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="section-subtitle">
          Perjalanan karier saya sebagai developer.
        </p>
      </Reveal>

      <div className="relative mx-auto max-w-2xl">
        {/* Garis timeline */}
        <div className="absolute left-[19px] top-2 h-full w-px bg-zinc-200 dark:bg-zinc-800" />

        <div className="space-y-10">
          {experience.map((item, i) => (
            <Reveal key={item.role + item.company} delay={i * 0.05}>
              <div className="relative flex gap-6">
                <div className="relative z-10 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-zinc-200 bg-white text-brand-500 dark:border-zinc-800 dark:bg-zinc-950">
                  <Briefcase className="h-4 w-4" />
                </div>
                <div className="flex-1 pb-2">
                  <span className="text-xs font-medium uppercase tracking-wide text-brand-500">
                    {item.period}
                  </span>
                  <h3 className="mt-1 font-semibold text-zinc-900 dark:text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {item.company}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {item.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex gap-1.5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400"
                      >
                        <Dot className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((t) => (
                      <span
                        key={t}
                        className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
