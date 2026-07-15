import { Reveal } from "./Reveal";
import { skills } from "@/lib/data";

export function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 bg-zinc-50 dark:bg-zinc-900/40"
    >
      <div className="section-container">
        <Reveal>
          <h2 className="section-title">Keahlian</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="section-subtitle">
            Teknologi dan alat yang saya gunakan untuk membangun produk.
          </p>
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.05}>
              <div className="group h-full rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-brand-300 hover:shadow-lg hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand-700">
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:scale-110 dark:bg-brand-950 dark:text-brand-400">
                  <group.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-3 font-semibold text-zinc-900 dark:text-white">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-lg bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
