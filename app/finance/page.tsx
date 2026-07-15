import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, Wallet } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FinanceTools } from "@/components/finance/FinanceTools";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Financial Toolkit — ${profile.name}`,
  description:
    "Kumpulan alat keuangan: screener saham IDX, kalkulator investasi, kalkulator dana pensiun, dan kalkulator dana pendidikan — semua dalam satu tempat.",
};

export default function FinancePage() {
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
            <Wallet className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Financial Toolkit
            </h1>
            <p className="mt-2 max-w-2xl text-zinc-500 dark:text-zinc-400">
              Empat alat keuangan dalam satu tempat: screener saham IDX,
              kalkulator investasi, dana pensiun, dan dana pendidikan. Semua
              berjalan langsung di browser.
            </p>
          </div>
        </div>

        <FinanceTools />
      </main>
      <Footer />
    </>
  );
}
