import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ExternalLink,
  User,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getProject, profile, projects } from "@/lib/data";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Proyek tidak ditemukan" };
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-6 pb-20 pt-28">
        <Link
          href="/#projects"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke proyek
        </Link>

        {/* Cover */}
        <div
          className={`flex h-56 items-end rounded-3xl bg-gradient-to-br ${project.gradient} p-8`}
        >
          <div>
            <p className="text-sm font-medium text-white/80">
              {project.subtitle}
            </p>
            <h1 className="text-4xl font-extrabold text-white drop-shadow sm:text-5xl">
              {project.title}
            </h1>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-b border-zinc-200 pb-8 text-sm dark:border-zinc-800">
          <span className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <Calendar className="h-4 w-4 text-brand-500" />
            Tahun: <strong className="font-semibold">{project.year}</strong>
          </span>
          <span className="inline-flex items-center gap-2 text-zinc-600 dark:text-zinc-400">
            <User className="h-4 w-4 text-brand-500" />
            Peran: <strong className="font-semibold">{project.role}</strong>
          </span>
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-wrap gap-3">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              <ExternalLink className="h-4 w-4" />
              Lihat Demo
            </a>
          )}
          {/* Tombol "Kode Sumber" sementara disembunyikan — uncomment untuk menampilkan lagi
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Github className="h-4 w-4" />
              Kode Sumber
            </a>
          )} */}
        </div>

        {/* Overview */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
            Ringkasan
          </h2>
          <div className="space-y-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            {project.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
            Fitur Utama
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.features.map((f) => (
              <li
                key={f}
                className="flex items-start gap-2 text-sm text-zinc-600 dark:text-zinc-400"
              >
                <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-500" />
                {f}
              </li>
            ))}
          </ul>
        </section>

        {/* Tech stack */}
        <section className="mt-12">
          <h2 className="mb-4 text-xl font-bold text-zinc-900 dark:text-white">
            Teknologi
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-lg bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300"
              >
                {t}
              </span>
            ))}
          </div>
        </section>

        {/* Next project */}
        <Link
          href={`/projects/${next.slug}`}
          className="group mt-16 flex items-center justify-between rounded-2xl border border-zinc-200 p-6 transition hover:border-brand-300 hover:bg-zinc-50 dark:border-zinc-800 dark:hover:border-brand-700 dark:hover:bg-zinc-900"
        >
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">
              Proyek selanjutnya
            </p>
            <p className="mt-1 text-lg font-semibold text-zinc-900 dark:text-white">
              {next.title}
            </p>
          </div>
          <ArrowUpRight className="h-6 w-6 text-zinc-400 transition group-hover:text-brand-500" />
        </Link>
      </main>
      <Footer />
    </>
  );
}
