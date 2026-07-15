import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Landmark } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FinanceManager } from "@/components/finance-mgmt/FinanceManager";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Finance Management System — ${profile.name}`,
  description:
    "Sistem manajemen keuangan multi-pool dengan Kas Pusat: kelola beberapa pool kas, catat pemasukan/pengeluaran, dan transfer antar pool termasuk setor ke pusat.",
};

export default function KeuanganPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-6xl px-6 pb-20 pt-28">
        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke beranda
        </Link>

        <div className="mb-8 flex items-start gap-4">
          <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500 to-fuchsia-500 text-white">
            <Landmark className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Finance Management System
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
              Manajemen keuangan multi-pool dengan{" "}
              <strong className="font-semibold text-zinc-700 dark:text-zinc-300">
                Kas Pusat
              </strong>
              . Kelola beberapa pool kas (cabang/divisi), catat pemasukan &
              pengeluaran, serta transfer antar pool — termasuk setor ke pusat.
            </p>
          </div>
        </div>

        <FinanceManager />
      </main>
      <Footer />
    </>
  );
}
