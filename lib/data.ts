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
};

export const projects: Project[] = [
  {
    slug: "edulearn",
    title: "EduLearn",
    subtitle: "Platform Edukasi Digital",
    description:
      "Platform pembelajaran online dengan manajemen kelas, materi, dan kuis. Front-end React yang responsif didukung REST API Node.js.",
    overview: [
      "EduLearn adalah platform edukasi digital yang memungkinkan pengajar mengelola kelas, mengunggah materi, dan membuat kuis interaktif, sementara siswa dapat belajar dan memantau progres mereka.",
      "Front-end dibangun dengan React untuk pengalaman yang cepat dan responsif, didukung RESTful API di sisi Node.js serta integrasi layanan pihak ketiga untuk notifikasi dan penyimpanan berkas.",
    ],
    features: [
      "Manajemen kelas, materi, dan tugas",
      "Kuis interaktif dengan penilaian otomatis",
      "Dashboard progres untuk siswa & pengajar",
      "RESTful API dengan autentikasi token",
      "Integrasi layanan pihak ketiga (email & storage)",
      "Antarmuka responsif dengan React",
    ],
    tags: ["React", "Node.js", "REST API", "MySQL"],
    tech: ["React", "Node.js", "Express", "RESTful API", "MySQL", "CSS"],
    year: "2025",
    role: "Fullstack Web Developer",
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
    liveUrl: "#",
    repoUrl: "#",
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
  },
  {
    slug: "paygate-api",
    title: "PayGate API",
    subtitle: "Integrasi Layanan Pihak Ketiga",
    description:
      "Layanan RESTful API untuk integrasi pembayaran dan notifikasi. Ringan, aman, dan terdokumentasi dengan baik.",
    overview: [
      "PayGate API adalah lapisan layanan yang menjembatani aplikasi dengan penyedia pembayaran dan notifikasi pihak ketiga, menyediakan endpoint yang konsisten dan mudah dikonsumsi.",
      "Dibangun dengan Node.js dan Express, dengan fokus pada keamanan (validasi & autentikasi token), penanganan error yang rapi, serta dokumentasi endpoint yang jelas.",
    ],
    features: [
      "Endpoint RESTful yang konsisten",
      "Integrasi payment gateway pihak ketiga",
      "Webhook untuk notifikasi status transaksi",
      "Autentikasi berbasis token & validasi input",
      "Penanganan error & logging terstruktur",
      "Dokumentasi API yang lengkap",
    ],
    tags: ["Node.js", "Express", "REST API"],
    tech: ["Node.js", "Express", "RESTful API", "JWT", "MySQL"],
    year: "2023",
    role: "Back-End Developer",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    liveUrl: "#",
    repoUrl: "#",
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
