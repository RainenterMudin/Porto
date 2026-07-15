"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";
import { profile, socials } from "@/lib/data";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden pb-16 pt-28 sm:flex sm:min-h-dvh sm:items-center sm:pb-0 sm:pt-0"
    >
      {/* Decorative gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/4 h-72 w-72 animate-float rounded-full bg-brand-400/30 blur-3xl dark:bg-brand-600/20"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-1/4 h-72 w-72 animate-float rounded-full bg-fuchsia-400/20 blur-3xl [animation-delay:2s] dark:bg-fuchsia-700/20"
      />

      <div className="mx-auto w-full max-w-5xl px-6 sm:pt-16">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/60 px-4 py-1.5 text-sm text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-400"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          Tersedia untuk proyek baru
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
        >
          Halo, saya {profile.name.split(" ")[0]}.{" "}
          <span className="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-transparent">
            {profile.role}.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-zinc-600 dark:text-zinc-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
          >
            Lihat Proyek
          </a>
          <a
            href={profile.resumeUrl}
            className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Download className="h-4 w-4" />
            Unduh CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="mt-10 flex items-center gap-4"
        >
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
            >
              <s.icon className="h-5 w-5" />
            </a>
          ))}
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll ke bawah"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 text-zinc-400 transition hover:text-brand-500 sm:block"
      >
        <ArrowDown className="h-5 w-5 animate-bounce" />
      </a>
    </section>
  );
}
