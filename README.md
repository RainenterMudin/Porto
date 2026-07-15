# 🚀 Portfolio Website

Website portfolio pribadi yang modern, responsif, dan cepat — dibangun dengan **Next.js 14 (App Router)**, **TypeScript**, dan **Tailwind CSS**. Siap deploy ke Vercel tanpa konfigurasi tambahan.

## ✨ Fitur

- 🌗 **Dark / Light mode** dengan deteksi preferensi sistem
- 📱 **Fully responsive** — mobile, tablet, desktop
- 🎞️ **Animasi halus** menggunakan Framer Motion
- ⚡ **Cepat & SEO-friendly** (Server Components + metadata)
- 🧩 **Mudah dikustom** — semua konten diatur dari satu file: [`lib/data.ts`](lib/data.ts)
- 📬 **Form kontak** yang langsung membuka email (tanpa backend)

## 🛠️ Menjalankan Secara Lokal

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## ✏️ Kustomisasi

Cukup edit **satu file** — [`lib/data.ts`](lib/data.ts):

- `profile` — nama, role, tagline, bio, email, statistik
- `socials` — link GitHub, LinkedIn, Twitter, dll.
- `skills` — daftar keahlian per kategori
- `projects` — daftar proyek (judul, deskripsi, tag, link demo/repo)

Ganti juga warna aksen di [`tailwind.config.ts`](tailwind.config.ts) (`colors.brand`) sesuai selera.

## ☁️ Deploy ke Vercel

1. Push project ini ke GitHub.
2. Buka [vercel.com/new](https://vercel.com/new) → **Import** repository-nya.
3. Vercel otomatis mendeteksi Next.js. Klik **Deploy**. Selesai! 🎉

Atau lewat CLI:

```bash
npm i -g vercel
vercel
```

## 📦 Struktur Proyek

```
app/            # App Router: layout, halaman, global CSS
components/     # Komponen UI (Hero, About, Skills, Projects, dll.)
lib/data.ts     # 👈 Sumber konten tunggal — edit di sini
tailwind.config.ts
```

## 📄 Lisensi

MIT — bebas dipakai dan dimodifikasi.
