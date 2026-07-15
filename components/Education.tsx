import { GraduationCap, Award, Languages as LanguagesIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { education, certifications, languages } from "@/lib/data";

export function Education() {
  return (
    <section
      id="education"
      className="scroll-mt-16 bg-zinc-50 dark:bg-zinc-900/40"
    >
      <div className="section-container">
        <Reveal>
          <h2 className="section-title">Pendidikan & Sertifikasi</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="section-subtitle">
            Latar belakang pendidikan, sertifikasi, dan kemampuan bahasa.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Pendidikan */}
          <Reveal>
            <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="mb-5 inline-flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                <GraduationCap className="h-5 w-5 text-brand-500" />
                Pendidikan
              </h3>
              <div className="space-y-5">
                {education.map((e) => (
                  <div
                    key={e.degree}
                    className="border-l-2 border-zinc-200 pl-4 dark:border-zinc-800"
                  >
                    <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
                      {e.period}
                    </p>
                    <p className="mt-0.5 font-medium text-zinc-900 dark:text-white">
                      {e.degree}
                    </p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      {e.school}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Sertifikasi + Bahasa */}
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col gap-6">
              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="mb-5 inline-flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                  <Award className="h-5 w-5 text-brand-500" />
                  Sertifikasi
                </h3>
                <div className="space-y-4">
                  {certifications.map((c) => (
                    <div key={c.name}>
                      <p className="font-medium text-zinc-900 dark:text-white">
                        {c.name}
                      </p>
                      <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        {c.issuer} · {c.date}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-950">
                <h3 className="mb-5 inline-flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                  <LanguagesIcon className="h-5 w-5 text-brand-500" />
                  Bahasa
                </h3>
                <div className="space-y-3">
                  {languages.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="font-medium text-zinc-700 dark:text-zinc-300">
                        {l.name}
                      </span>
                      <span className="rounded-md bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                        {l.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
