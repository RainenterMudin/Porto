import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="bg-gradient-to-r from-brand-500 to-fuchsia-500 bg-clip-text text-7xl font-extrabold text-transparent sm:text-9xl">
        404
      </p>
      <h1 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-white">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-2 max-w-md text-zinc-500 dark:text-zinc-400">
        Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
      >
        <Home className="h-4 w-4" />
        Kembali ke Beranda
      </Link>
    </main>
  );
}
