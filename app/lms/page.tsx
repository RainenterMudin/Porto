import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { LmsApp } from "@/components/lms/LmsApp";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Mini LMS + CMS — ${profile.name}`,
  description:
    "Learning Management System dengan CMS bawaan: kelola kursus & materi (admin), belajar dan lacak progres (siswa). Berjalan penuh di browser.",
};

export default function LmsPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-5xl px-6 pb-20 pt-28">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke beranda
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Mini LMS + CMS
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
              Platform belajar dengan CMS bawaan. Sebagai{" "}
              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                Siswa
              </strong>{" "}
              kamu bisa mengikuti kursus & melacak progres; sebagai{" "}
              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                Admin
              </strong>{" "}
              kamu bisa membuat dan mengelola kursus beserta materinya. Semua
              tersimpan di browser.
            </p>
          </div>
        </div>

        <LmsApp />
      </main>
      <Footer />
    </>
  );
}
