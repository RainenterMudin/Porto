import type { LucideIcon } from "lucide-react";
import {
  Github,
  Linkedin,
  Mail,
  Phone,
  Server,
  Database,
  Palette,
  Wrench,
} from "lucide-react";

// ─────────────────────────────────────────────────────────────
//  Edit everything about your portfolio from this single file.
// ─────────────────────────────────────────────────────────────

export const profile = {
  name: "Rianikha",
  role: "Fullstack Web Developer",
  tagline:
    "Membangun aplikasi web yang solid dengan Laravel, CodeIgniter, React, dan Node.js — dari database hingga antarmuka.",
  location: "Subang, Jawa Barat",
  email: "rianikhamudin152@gmail.com",
  phone: "+62 812-1440-8175",
  whatsapp: "6281214408175",
  linkedin: "https://linkedin.com/in/rianikha-rianikha",
  resumeUrl: "#", // ganti dengan link CV/PDF kamu
  about: [
    "Halo! Saya Rianikha, seorang Fullstack Web Developer dengan lebih dari 5 tahun pengalaman mengembangkan aplikasi web menggunakan Laravel, CodeIgniter, React, dan Node.js.",
    "Saya terbiasa bekerja dalam tim agile, membangun RESTful API, serta mengintegrasikan layanan pihak ketiga. Pengalaman saya mencakup lingkungan konsultan digital-kreatif hingga platform edukasi digital.",
  ],
  stats: [
    { label: "Tahun Pengalaman", value: "5+" },
    { label: "Proyek Dikerjakan", value: "20+" },
    // { label: "Perusahaan", value: "2" },
  ],
};

export type SocialLink = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export const socials: SocialLink[] = [
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/rianikha-rianikha",
    icon: Linkedin,
  },
  { label: "GitHub", href: "https://github.com/RainenterMudin", icon: Github },
  { label: "WhatsApp", href: "https://wa.me/6281214408175", icon: Phone },
  { label: "Email", href: "mailto:rianikhamudin152@gmail.com", icon: Mail },
];

export type SkillGroup = {
  title: string;
  icon: LucideIcon;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Back-End",
    icon: Server,
    items: ["PHP", "Laravel", "CodeIgniter", "Node.js", "RESTful API"],
  },
  {
    title: "Front-End",
    icon: Palette,
    items: ["React", "JavaScript", "jQuery", "AJAX", "HTML", "CSS", "Bootstrap"],
  },
  {
    title: "Database",
    icon: Database,
    items: ["MySQL"],
  },
  {
    title: "Tools & Metodologi",
    icon: Wrench,
    items: ["Git", "VS Code", "Agile / Scrum"],
  },
];

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  overview: string[];
  features: string[];
  tags: string[];
  tech: string[];
  year: string;
  role: string;
  gradient: string; // kelas gradient Tailwind untuk cover visual
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  hidden?: boolean; // true = jangan tampilkan di beranda (tetap tersimpan)
};

export const projects: Project[] = [
  {
    slug: "mini-lms-cms",
    title: "Mini LMS + CMS",
    subtitle: "Platform Edukasi Digital",
    description:
      "Learning Management System dengan CMS bawaan yang berfungsi penuh: mode Siswa untuk belajar & melacak progres, dan mode Admin untuk mengelola kursus. Demo live tersedia.",
    overview: [
      "Mini LMS + CMS adalah platform pembelajaran interaktif dengan dua peran. Sebagai Siswa, pengguna dapat menjelajah katalog kursus, mengikuti pelajaran satu per satu, menandai penyelesaian, dan melihat progres belajarnya secara real-time.",
      "Sebagai Admin, pengguna mendapatkan CMS lengkap untuk membuat, mengedit, dan menghapus kursus beserta materinya. Seluruh data dikelola di sisi klien dan disimpan di browser (localStorage), sehingga aplikasi berjalan penuh tanpa server — cocok untuk deployment statis di Vercel.",
    ],
    features: [
      "Katalog kursus dengan indikator progres",
      "Viewer pelajaran + navigasi antar materi",
      "Pelacakan penyelesaian & progres per kursus",
      "CMS: buat, edit, hapus kursus & pelajaran",
      "Data persisten di browser (localStorage)",
      "Responsif dengan mode gelap",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "localStorage"],
    year: "2026",
    role: "Fullstack Web Developer",
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
    liveUrl: "/lms",
    repoUrl: "https://github.com/RainenterMudin/Porto",
    featured: true,
  },
  {
    slug: "korporaweb",
    title: "KorporaWeb",
    subtitle: "Aplikasi Manajemen Korporat",
    description:
      "Aplikasi web untuk klien korporat: manajemen data, laporan, dan alur persetujuan. Dibangun dengan Laravel dan MySQL.",
    overview: [
      "KorporaWeb adalah aplikasi manajemen internal yang dikembangkan untuk klien korporat, mencakup pengelolaan data, pelaporan, dan alur persetujuan berjenjang.",
      "Dibangun dengan Laravel sebagai fondasi back-end yang kokoh, dengan database MySQL yang dirancang untuk menangani beragam kebutuhan bisnis serta antarmuka yang bersih menggunakan Bootstrap.",
    ],
    features: [
      "Manajemen data multi-modul",
      "Alur persetujuan (approval) berjenjang",
      "Laporan dinamis dengan ekspor ke Excel/PDF",
      "Hak akses berbasis peran (role-based)",
      "Perancangan & optimasi database MySQL",
      "Antarmuka admin dengan Bootstrap",
    ],
    tags: ["Laravel", "MySQL", "Bootstrap"],
    tech: ["Laravel", "PHP", "MySQL", "Bootstrap", "jQuery"],
    year: "2024",
    role: "Fullstack Web Developer",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    liveUrl: "#",
    repoUrl: "#",
    featured: true,
    hidden: true,
  },
  {
    slug: "inventrack",
    title: "InvenTrack",
    subtitle: "Sistem Inventori",
    description:
      "Sistem pencatatan stok barang keluar-masuk dengan antarmuka interaktif berbasis jQuery & AJAX. Dibangun dengan CodeIgniter.",
    overview: [
      "InvenTrack membantu bisnis mencatat pergerakan stok barang secara real-time, mulai dari barang masuk, keluar, hingga penyesuaian stok, lengkap dengan riwayat transaksi.",
      "Menggunakan CodeIgniter di sisi server dan interaksi dinamis via jQuery + AJAX sehingga pengguna dapat mengelola data tanpa perlu memuat ulang halaman.",
    ],
    features: [
      "Pencatatan barang masuk & keluar",
      "Pembaruan stok real-time tanpa reload (AJAX)",
      "Riwayat transaksi & pencarian cepat",
      "Notifikasi stok menipis",
      "Laporan stok per periode",
      "Manajemen kategori & supplier",
    ],
    tags: ["CodeIgniter", "jQuery", "AJAX", "MySQL"],
    tech: ["CodeIgniter", "PHP", "jQuery", "AJAX", "MySQL", "Bootstrap"],
    year: "2023",
    role: "Fullstack Web Developer",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    liveUrl: "#",
    repoUrl: "#",
    hidden: true,
  },
  {
    slug: "financial-toolkit",
    title: "Financial Toolkit",
    subtitle: "Screener & Kalkulator Keuangan",
    description:
      "Empat alat keuangan dalam satu aplikasi: screener saham IDX plus kalkulator investasi, dana pensiun, dan dana pendidikan. Semua interaktif & berfungsi penuh.",
    overview: [
      "Financial Toolkit menggabungkan beberapa alat keuangan dalam satu antarmuka bertab. Screener Saham memungkinkan penyaringan saham IDX berdasarkan sektor, PER, dividend yield, dan kapitalisasi pasar dengan sortir per kolom.",
      "Dilengkapi tiga kalkulator berbasis bunga majemuk: kalkulator investasi (proyeksi nilai akhir), dana pensiun (proyeksi korpus & estimasi penghasilan bulanan), dan dana pendidikan (perkiraan biaya masa depan & setoran bulanan yang dibutuhkan). Seluruh perhitungan berjalan di sisi klien sehingga responsnya instan tanpa server.",
    ],
    features: [
      "Screener saham IDX: filter sektor, PER, yield & kap. pasar",
      "Kalkulator investasi dengan setoran rutin",
      "Kalkulator dana pensiun + estimasi penghasilan bulanan",
      "Kalkulator dana pendidikan dengan inflasi biaya",
      "Perhitungan bunga majemuk & visualisasi komposisi",
      "Responsif dengan mode gelap",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    year: "2026",
    role: "Frontend Developer",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    liveUrl: "/finance",
    repoUrl: "https://github.com/RainenterMudin/Porto",
    featured: true,
  },
  {
    slug: "ticketing-travel",
    title: "Ticketing Travel",
    subtitle: "Sistem Pemesanan Tiket",
    description:
      "Alur pemesanan tiket travel/shuttle yang lengkap: cari jadwal, pilih kursi lewat seat map interaktif, isi data, dan terbitkan e-tiket.",
    overview: [
      "Ticketing Travel adalah simulasi sistem pemesanan tiket antar kota dengan alur lengkap: pencarian jadwal berdasarkan rute & tanggal, pemilihan kursi melalui seat map interaktif, pengisian data penumpang, hingga penerbitan e-tiket dengan kode booking.",
      "Proyek ini terinspirasi dari pengalaman saya membangun sistem ticketing dan finance untuk sebuah perusahaan travel. Versi demo ini berjalan sepenuhnya di sisi klien dengan ketersediaan kursi yang dihasilkan secara deterministik, sehingga bisa dijalankan sebagai situs statis.",
    ],
    features: [
      "Pencarian jadwal antar kota + tukar arah rute",
      "Seat map interaktif dengan kursi terisi & terpilih",
      "Ringkasan harga otomatis sesuai jumlah penumpang",
      "Formulir data pemesan dengan validasi",
      "E-tiket dengan kode booking",
      "Alur multi-langkah dengan indikator progres",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    year: "2024",
    role: "Fullstack Web Developer",
    gradient: "from-amber-500 via-orange-500 to-red-500",
    liveUrl: "/tiket",
    repoUrl: "https://github.com/RainenterMudin/Porto",
    featured: true,
  },
  {
    slug: "finance-management",
    title: "Finance Management System",
    subtitle: "Multi-Pool + Kas Pusat",
    description:
      "Sistem manajemen keuangan multi-pool dengan Kas Pusat: kelola banyak pool kas, catat pemasukan/pengeluaran, dan transfer antar pool termasuk setor ke pusat.",
    overview: [
      "Finance Management System mengelola keuangan yang terbagi ke dalam beberapa pool kas — misalnya per cabang atau divisi — dengan satu Kas Pusat sebagai pusat konsolidasi. Setiap pool memiliki saldo yang dihitung otomatis dari transaksinya.",
      "Aplikasi mendukung tiga jenis transaksi (pemasukan, pengeluaran, dan transfer antar pool termasuk setor ke pusat), lengkap dengan dashboard total aset, saldo kas pusat, dan arus kas. Seluruh data dikelola di sisi klien dan disimpan di browser, sehingga berjalan penuh tanpa server.",
    ],
    features: [
      "Multi-pool kas dengan satu Kas Pusat",
      "Saldo tiap pool dihitung otomatis dari transaksi",
      "Pemasukan, pengeluaran, dan transfer antar pool",
      "Dashboard: total aset, kas pusat, arus kas",
      "Filter transaksi per pool & per jenis",
      "Tambah/hapus pool & transaksi, persisten di browser",
    ],
    tags: ["Next.js", "React", "TypeScript", "Tailwind"],
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS", "localStorage"],
    year: "2025",
    role: "Fullstack Web Developer",
    gradient: "from-violet-500 via-indigo-500 to-blue-500",
    liveUrl: "/keuangan",
    repoUrl: "https://github.com/RainenterMudin/Porto",
    featured: true,
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  points: string[];
  tech: string[];
};

export const experience: ExperienceItem[] = [
  {
    role: "Fullstack Web Developer",
    company: "CV Hexant Digital & Education",
    period: "Mei 2025 — Juni 2026",
    points: [
      "Mengembangkan dan memelihara aplikasi web fullstack untuk platform edukasi digital.",
      "Membangun RESTful API dan mengintegrasikan layanan pihak ketiga.",
      "Mengimplementasikan front-end responsif menggunakan React dan framework CSS modern.",
      "Berkolaborasi dalam tim agile untuk delivery fitur sesuai timeline proyek.",
    ],
    tech: ["React", "Node.js", "RESTful API"],
  },
  {
    role: "Fullstack Web Developer",
    company: "RDPL (PT Rancang Desain Program Linimasa)",
    period: "Feb 2022 — Mei 2025",
    points: [
      "Mengembangkan aplikasi web untuk klien korporat menggunakan Laravel dan CodeIgniter.",
      "Merancang dan mengelola database MySQL untuk berbagai kebutuhan aplikasi.",
      "Membangun antarmuka pengguna interaktif dengan JavaScript, jQuery, dan AJAX.",
      "Berkontribusi dalam konsultan digital-kreatif melayani berbagai industri.",
    ],
    tech: ["Laravel", "CodeIgniter", "MySQL", "jQuery"],
  },
];

export type EducationItem = {
  degree: string;
  school: string;
  period: string;
};

export const education: EducationItem[] = [
  {
    degree: "S1 Sistem Informasi",
    school: "Universitas Terbuka",
    period: "2025 — Sekarang",
  },
  {
    degree: "D3 Sistem Informasi",
    school: "Politeknik Negeri Subang",
    period: "2018 — 2021",
  },
];

export type Certification = {
  name: string;
  issuer: string;
  date: string;
};

export const certifications: Certification[] = [
  {
    name: "MTA: Database Fundamentals",
    issuer: "Microsoft",
    date: "Januari 2020",
  },
];

export type Language = {
  name: string;
  level: string;
};

export const languages: Language[] = [
  { name: "Bahasa Indonesia", level: "Native" },
  { name: "English", level: "Basic" },
];
