"use client";

import { useCallback, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
//  Model data & store (localStorage) untuk LMS + CMS.
//  Data awal (seed) di bawah bisa diubah/ditambah lewat mode CMS,
//  dan tersimpan di browser pengguna.
// ─────────────────────────────────────────────────────────────

export type Lesson = {
  id: string;
  title: string;
  duration: string; // mis. "8 menit"
  content: string; // pisahkan paragraf dengan baris kosong
};

export type Course = {
  id: string;
  title: string;
  description: string;
  category: string;
  level: "Pemula" | "Menengah" | "Lanjutan";
  gradient: string; // kelas gradient Tailwind untuk cover
  lessons: Lesson[];
};

export type Progress = Record<string, string[]>; // courseId -> daftar lessonId selesai

export const categories = [
  "Web Development",
  "Frontend",
  "Backend",
  "Database",
  "DevOps",
] as const;

export const levels: Course["level"][] = ["Pemula", "Menengah", "Lanjutan"];

export const gradients = [
  "from-indigo-500 via-purple-500 to-fuchsia-500",
  "from-rose-500 via-red-500 to-orange-500",
  "from-emerald-500 via-teal-500 to-cyan-500",
  "from-sky-500 via-blue-500 to-indigo-500",
  "from-amber-500 via-orange-500 to-red-500",
];

export const seedCourses: Course[] = [
  {
    id: "web-dasar",
    title: "Dasar Pemrograman Web",
    description:
      "Mulai dari nol: pahami HTML, CSS, dan JavaScript untuk membangun halaman web pertamamu.",
    category: "Web Development",
    level: "Pemula",
    gradient: "from-indigo-500 via-purple-500 to-fuchsia-500",
    lessons: [
      {
        id: "web-1",
        title: "Pengenalan HTML",
        duration: "10 menit",
        content:
          "HTML (HyperText Markup Language) adalah kerangka dari setiap halaman web. Dengan HTML kita menentukan struktur konten seperti judul, paragraf, gambar, dan tautan.\n\nDi pelajaran ini kamu akan mengenal elemen dasar seperti <h1>, <p>, <a>, dan <img>, serta bagaimana browser menerjemahkannya menjadi tampilan.",
      },
      {
        id: "web-2",
        title: "Styling dengan CSS",
        duration: "12 menit",
        content:
          "CSS (Cascading Style Sheets) mengatur tampilan halaman: warna, jarak, tata letak, dan tipografi. CSS memisahkan konten (HTML) dari presentasi.\n\nKamu akan belajar selektor, properti umum seperti color dan margin, serta konsep box model yang jadi fondasi tata letak.",
      },
      {
        id: "web-3",
        title: "Interaktivitas JavaScript",
        duration: "15 menit",
        content:
          "JavaScript membuat halaman menjadi interaktif — merespons klik, memvalidasi form, dan memperbarui konten tanpa reload.\n\nDi sini kamu berkenalan dengan variabel, fungsi, dan event listener untuk menangani interaksi pengguna.",
      },
      {
        id: "web-4",
        title: "Membangun Halaman Pertama",
        duration: "20 menit",
        content:
          "Saatnya menggabungkan semuanya! Kamu akan membangun satu halaman profil sederhana yang memakai HTML untuk struktur, CSS untuk gaya, dan JavaScript untuk satu interaksi kecil.\n\nProyek kecil ini menjadi bukti pertama bahwa kamu bisa membuat web dari nol.",
      },
    ],
  },
  {
    id: "laravel-pemula",
    title: "Laravel untuk Pemula",
    description:
      "Bangun aplikasi web modern dengan Laravel — framework PHP yang elegan dan produktif.",
    category: "Backend",
    level: "Menengah",
    gradient: "from-rose-500 via-red-500 to-orange-500",
    lessons: [
      {
        id: "lrv-1",
        title: "Instalasi & Struktur Proyek",
        duration: "10 menit",
        content:
          "Laravel mempercepat pengembangan dengan konvensi yang jelas. Kita mulai dengan menginstal Laravel via Composer dan mengenal struktur foldernya.\n\nKamu akan memahami peran folder app, routes, resources, dan database.",
      },
      {
        id: "lrv-2",
        title: "Routing & Controller",
        duration: "14 menit",
        content:
          "Routing menentukan bagaimana URL dipetakan ke logika aplikasi. Controller menampung logika tersebut agar rapi dan terorganisir.\n\nKamu akan membuat rute, menghubungkannya ke controller, dan mengembalikan view.",
      },
      {
        id: "lrv-3",
        title: "Eloquent ORM",
        duration: "16 menit",
        content:
          "Eloquent adalah ORM Laravel yang membuat interaksi dengan database terasa alami. Setiap tabel diwakili oleh sebuah Model.\n\nKamu akan belajar operasi CRUD, relasi antar model, dan query yang ekspresif.",
      },
      {
        id: "lrv-4",
        title: "Blade Templating",
        duration: "12 menit",
        content:
          "Blade adalah template engine Laravel yang ringkas namun powerful. Ia mendukung layout, komponen, dan penulisan yang bersih.\n\nKamu akan membuat layout utama dan menampilkan data dinamis ke halaman.",
      },
    ],
  },
  {
    id: "react-nextjs",
    title: "React & Next.js Fundamental",
    description:
      "Kuasai dasar React lalu naik level dengan Next.js untuk aplikasi yang cepat dan SEO-friendly.",
    category: "Frontend",
    level: "Menengah",
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    lessons: [
      {
        id: "rn-1",
        title: "Komponen & Props",
        duration: "12 menit",
        content:
          "React membangun UI dari komponen yang dapat digunakan ulang. Props adalah cara mengirim data dari komponen induk ke anak.\n\nKamu akan membuat komponen fungsional pertama dan mengoper props ke dalamnya.",
      },
      {
        id: "rn-2",
        title: "State & Hooks",
        duration: "15 menit",
        content:
          "State menyimpan data yang bisa berubah seiring interaksi pengguna. Hook seperti useState dan useEffect mengelola state dan efek samping.\n\nKamu akan membangun komponen interaktif yang memperbarui tampilannya sendiri.",
      },
      {
        id: "rn-3",
        title: "Routing di Next.js",
        duration: "13 menit",
        content:
          "Next.js menyediakan routing berbasis file yang intuitif. Setiap file di folder app menjadi sebuah rute.\n\nKamu akan membuat beberapa halaman dan navigasi antar halaman dengan komponen Link.",
      },
      {
        id: "rn-4",
        title: "Deploy ke Vercel",
        duration: "8 menit",
        content:
          "Vercel adalah rumah alami untuk aplikasi Next.js. Deployment semudah menghubungkan repositori GitHub.\n\nKamu akan mem-publish aplikasimu ke internet dan mendapatkan URL live.",
      },
    ],
  },
];

const COURSES_KEY = "lms.courses.v1";
const PROGRESS_KEY = "lms.progress.v1";

export function newId(prefix = "id") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  }
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function courseProgress(course: Course, progress: Progress) {
  const done = progress[course.id]?.length ?? 0;
  const total = course.lessons.length;
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);
  return { done, total, percent };
}

export function useLms() {
  const [courses, setCourses] = useState<Course[]>(seedCourses);
  const [progress, setProgress] = useState<Progress>({});
  const [loaded, setLoaded] = useState(false);

  // Muat dari localStorage setelah mount (hindari mismatch hydration)
  useEffect(() => {
    try {
      const c = localStorage.getItem(COURSES_KEY);
      const p = localStorage.getItem(PROGRESS_KEY);
      if (c) setCourses(JSON.parse(c));
      if (p) setProgress(JSON.parse(p));
    } catch {
      // abaikan; pakai seed
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
  }, [courses, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  }, [progress, loaded]);

  const toggleLesson = useCallback((courseId: string, lessonId: string) => {
    setProgress((prev) => {
      const done = new Set(prev[courseId] ?? []);
      if (done.has(lessonId)) done.delete(lessonId);
      else done.add(lessonId);
      return { ...prev, [courseId]: [...done] };
    });
  }, []);

  const saveCourse = useCallback((course: Course) => {
    setCourses((prev) => {
      const exists = prev.some((c) => c.id === course.id);
      return exists
        ? prev.map((c) => (c.id === course.id ? course : c))
        : [...prev, course];
    });
  }, []);

  const deleteCourse = useCallback((courseId: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== courseId));
    setProgress((prev) => {
      const next = { ...prev };
      delete next[courseId];
      return next;
    });
  }, []);

  const resetData = useCallback(() => {
    setCourses(seedCourses);
    setProgress({});
  }, []);

  return {
    courses,
    progress,
    loaded,
    toggleLesson,
    saveCourse,
    deleteCourse,
    resetData,
  };
}
