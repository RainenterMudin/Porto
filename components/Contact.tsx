"use client";

import { useState, type FormEvent } from "react";
import { Mail, Phone, Send } from "lucide-react";
import { Reveal } from "./Reveal";
import { profile, socials } from "@/lib/data";

export function Contact() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Halo dari ${name || "portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <section
      id="contact"
      className="scroll-mt-16 bg-zinc-50 dark:bg-zinc-900/40"
    >
      <div className="section-container">
        <Reveal>
          <h2 className="section-title">Mari Bekerja Sama</h2>
        </Reveal>
        <Reveal delay={0.05}>
          <p className="section-subtitle">
            Punya proyek atau sekadar ingin menyapa? Kirim pesan, saya akan
            balas secepatnya.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <form
            onSubmit={onSubmit}
            className="mx-auto max-w-xl space-y-4 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Nama
              </label>
              <input
                id="name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nama kamu"
                className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1.5 block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Pesan
              </label>
              <textarea
                id="message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ceritakan tentang proyekmu..."
                className="w-full resize-none rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
            >
              <Send className="h-4 w-4" />
              Kirim Pesan
            </button>

            <div className="flex flex-col items-center gap-4 border-t border-zinc-100 pt-5 dark:border-zinc-800">
              <div className="flex flex-col items-center gap-2 sm:flex-row sm:gap-6">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-brand-500 dark:text-zinc-400"
                >
                  <Mail className="h-4 w-4" />
                  {profile.email}
                </a>
                <a
                  href={`https://wa.me/${profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-zinc-600 transition hover:text-brand-500 dark:text-zinc-400"
                >
                  <Phone className="h-4 w-4" />
                  {profile.phone}
                </a>
              </div>
              <div className="flex items-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="text-zinc-400 transition hover:text-brand-500"
                  >
                    <s.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
}
