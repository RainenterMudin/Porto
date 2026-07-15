"use client";

import { useState } from "react";
import { Plus, Save, Trash2, X, ArrowLeft } from "lucide-react";
import {
  categories,
  gradients,
  levels,
  newId,
  type Course,
  type Lesson,
} from "@/lib/lms";

function blankCourse(): Course {
  return {
    id: newId("course"),
    title: "",
    description: "",
    category: categories[0],
    level: "Pemula",
    gradient: gradients[Math.floor(Math.random() * gradients.length)],
    lessons: [],
  };
}

const input =
  "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
const label =
  "mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400";

export function CourseEditor({
  initial,
  onSave,
  onCancel,
}: {
  initial: Course | null;
  onSave: (course: Course) => void;
  onCancel: () => void;
}) {
  const [course, setCourse] = useState<Course>(initial ?? blankCourse());
  const [error, setError] = useState("");

  const set = <K extends keyof Course>(key: K, value: Course[K]) =>
    setCourse((c) => ({ ...c, [key]: value }));

  const addLesson = () =>
    setCourse((c) => ({
      ...c,
      lessons: [
        ...c.lessons,
        { id: newId("lesson"), title: "", duration: "10 menit", content: "" },
      ],
    }));

  const updateLesson = (id: string, patch: Partial<Lesson>) =>
    setCourse((c) => ({
      ...c,
      lessons: c.lessons.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }));

  const removeLesson = (id: string) =>
    setCourse((c) => ({
      ...c,
      lessons: c.lessons.filter((l) => l.id !== id),
    }));

  const submit = () => {
    if (!course.title.trim()) {
      setError("Judul kursus wajib diisi.");
      return;
    }
    const cleaned: Course = {
      ...course,
      title: course.title.trim(),
      lessons: course.lessons
        .filter((l) => l.title.trim() !== "")
        .map((l) => ({ ...l, title: l.title.trim() })),
    };
    onSave(cleaned);
  };

  return (
    <div>
      <button
        type="button"
        onClick={onCancel}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke daftar
      </button>

      <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
        {initial ? "Edit Kursus" : "Kursus Baru"}
      </h2>

      {/* Detail kursus */}
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div>
          <label className={label}>Judul kursus</label>
          <input
            className={input}
            value={course.title}
            onChange={(e) => set("title", e.target.value)}
            placeholder="mis. Dasar Pemrograman Web"
          />
        </div>
        <div>
          <label className={label}>Deskripsi</label>
          <textarea
            className={`${input} resize-none`}
            rows={2}
            value={course.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Ringkasan singkat tentang kursus ini…"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className={label}>Kategori</label>
            <select
              className={input}
              value={course.category}
              onChange={(e) => set("category", e.target.value)}
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Level</label>
            <select
              className={input}
              value={course.level}
              onChange={(e) => set("level", e.target.value as Course["level"])}
            >
              {levels.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className={label}>Warna cover</label>
            <div className="flex gap-2 pt-1">
              {gradients.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-label="Pilih warna"
                  onClick={() => set("gradient", g)}
                  className={`h-8 w-8 rounded-lg bg-gradient-to-br ${g} transition ${
                    course.gradient === g
                      ? "ring-2 ring-brand-500 ring-offset-2 dark:ring-offset-zinc-950"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pelajaran */}
      <div className="mt-6 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">
          Pelajaran ({course.lessons.length})
        </h3>
        <button
          type="button"
          onClick={addLesson}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Tambah pelajaran
        </button>
      </div>

      <div className="mt-4 space-y-4">
        {course.lessons.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-400 dark:border-zinc-700">
            Belum ada pelajaran. Klik “Tambah pelajaran” untuk memulai.
          </p>
        )}
        {course.lessons.map((l, i) => (
          <div
            key={l.id}
            className="rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950"
          >
            <div className="mb-3 flex items-center gap-3">
              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-brand-50 text-xs font-semibold text-brand-600 dark:bg-brand-950 dark:text-brand-300">
                {i + 1}
              </span>
              <input
                className={input}
                value={l.title}
                onChange={(e) => updateLesson(l.id, { title: e.target.value })}
                placeholder="Judul pelajaran"
              />
              <input
                className="w-32 rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
                value={l.duration}
                onChange={(e) =>
                  updateLesson(l.id, { duration: e.target.value })
                }
                placeholder="Durasi"
              />
              <button
                type="button"
                aria-label="Hapus pelajaran"
                onClick={() => removeLesson(l.id)}
                className="flex-shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
            <textarea
              className={`${input} resize-none`}
              rows={3}
              value={l.content}
              onChange={(e) => updateLesson(l.id, { content: e.target.value })}
              placeholder="Isi materi pelajaran… (pisahkan paragraf dengan baris kosong)"
            />
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <div className="mt-6 flex gap-3">
        <button
          type="button"
          onClick={submit}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <Save className="h-4 w-4" />
          Simpan Kursus
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <X className="h-4 w-4" />
          Batal
        </button>
      </div>
    </div>
  );
}
