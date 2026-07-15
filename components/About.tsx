import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { profile } from "@/lib/data";

export function About() {
  return (
    <section id="about" className="section-container scroll-mt-16">
      <Reveal>
        <h2 className="section-title">Tentang Saya</h2>
      </Reveal>
      <Reveal delay={0.05}>
        <p className="section-subtitle">
          Sedikit cerita tentang siapa saya dan apa yang saya kerjakan.
        </p>
      </Reveal>

      <div className="grid items-center gap-12 md:grid-cols-5">
        <Reveal className="md:col-span-3" delay={0.1}>
          <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
            {profile.about.map((p, i) => (
              <p key={i} className="leading-relaxed">
                {p}
              </p>
            ))}
            <p className="inline-flex items-center gap-2 pt-2 text-sm font-medium text-zinc-500">
              <MapPin className="h-4 w-4 text-brand-500" />
              {profile.location}
            </p>
          </div>
        </Reveal>

        <Reveal className="md:col-span-2" delay={0.2}>
          <div className="grid gap-4">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-5 text-center dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-900/50"
              >
                <div className="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-3xl font-extrabold text-transparent">
                  {s.value}
                </div>
                <div className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
