"use client";

import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Circle,
  Clock,
  GraduationCap,
  Pencil,
  Plus,
  RotateCcw,
  Settings,
  Trash2,
} from "lucide-react";
import {
  courseProgress,
  useLms,
  type Course,
  type Lesson,
} from "@/lib/lms";
import { CourseEditor } from "./CourseEditor";

type View =
  | { name: "catalog" }
  | { name: "course"; courseId: string }
  | { name: "lesson"; courseId: string; lessonId: string }
  | { name: "admin" }
  | { name: "editor"; courseId: string | null };

export function LmsApp() {
  const store = useLms();
  const { courses, progress, loaded } = store;
  const [view, setView] = useState<View>({ name: "catalog" });

  const findCourse = (id: string) => courses.find((c) => c.id === id);
  const isAdmin = view.name === "admin" || view.name === "editor";

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-zinc-400">
        Memuat…
      </div>
    );
  }

  return (
    <div>
      {/* Mode switch: Siswa / Admin */}
      <div className="mb-8 inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
        <button
          type="button"
          onClick={() => setView({ name: "catalog" })}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            !isAdmin
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <GraduationCap className="h-4 w-4" />
          Siswa
        </button>
        <button
          type="button"
          onClick={() => setView({ name: "admin" })}
          className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition ${
            isAdmin
              ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
              : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
          }`}
        >
          <Settings className="h-4 w-4" />
          Admin (CMS)
        </button>
      </div>

      {view.name === "catalog" && (
        <Catalog
          courses={courses}
          progress={progress}
          onOpen={(courseId) => setView({ name: "course", courseId })}
        />
      )}

      {view.name === "course" &&
        (findCourse(view.courseId) ? (
          <CourseDetail
            course={findCourse(view.courseId)!}
            progress={progress}
            onBack={() => setView({ name: "catalog" })}
            onOpenLesson={(lessonId) =>
              setView({ name: "lesson", courseId: view.courseId, lessonId })
            }
          />
        ) : (
          <Missing onBack={() => setView({ name: "catalog" })} />
        ))}

      {view.name === "lesson" &&
        (findCourse(view.courseId) ? (
          <LessonView
            course={findCourse(view.courseId)!}
            lessonId={view.lessonId}
            progress={progress}
            onToggle={store.toggleLesson}
            onBack={() =>
              setView({ name: "course", courseId: view.courseId })
            }
            onNavigate={(lessonId) =>
              setView({ name: "lesson", courseId: view.courseId, lessonId })
            }
          />
        ) : (
          <Missing onBack={() => setView({ name: "catalog" })} />
        ))}

      {view.name === "admin" && (
        <Admin
          courses={courses}
          onNew={() => setView({ name: "editor", courseId: null })}
          onEdit={(courseId) => setView({ name: "editor", courseId })}
          onDelete={store.deleteCourse}
          onReset={store.resetData}
        />
      )}

      {view.name === "editor" && (
        <CourseEditor
          initial={view.courseId ? findCourse(view.courseId) ?? null : null}
          onSave={(course) => {
            store.saveCourse(course);
            setView({ name: "admin" });
          }}
          onCancel={() => setView({ name: "admin" })}
        />
      )}
    </div>
  );
}

function Missing({ onBack }: { onBack: () => void }) {
  return (
    <div className="py-16 text-center">
      <p className="text-sm text-zinc-500">Kursus tidak ditemukan.</p>
      <button
        onClick={onBack}
        className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-500"
      >
        Kembali ke katalog
      </button>
    </div>
  );
}

// ── Katalog (siswa) ──────────────────────────────────────────
function Catalog({
  courses,
  progress,
  onOpen,
}: {
  courses: Course[];
  progress: Record<string, string[]>;
  onOpen: (courseId: string) => void;
}) {
  if (courses.length === 0) {
    return (
      <p className="rounded-2xl border border-dashed border-zinc-300 px-4 py-16 text-center text-sm text-zinc-400 dark:border-zinc-700">
        Belum ada kursus. Tambahkan lewat mode Admin (CMS).
      </p>
    );
  }
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {courses.map((c) => {
        const { percent, done, total } = courseProgress(c, progress);
        return (
          <button
            key={c.id}
            type="button"
            onClick={() => onOpen(c.id)}
            className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white text-left transition hover:-translate-y-1 hover:border-brand-300 hover:shadow-xl hover:shadow-brand-500/5 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand-700"
          >
            <div
              className={`flex h-28 items-center justify-between bg-gradient-to-br ${c.gradient} p-5`}
            >
              <BookOpen className="h-8 w-8 text-white/90" />
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium text-white backdrop-blur">
                {c.level}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-5">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-brand-500">
                {c.category}
              </p>
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                {c.title}
              </h3>
              <p className="mt-1 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {c.description}
              </p>

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                  <span>
                    {done}/{total} pelajaran
                  </span>
                  <span className="font-medium">{percent}%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-brand-500 transition-all"
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="mt-3 inline-block text-sm font-medium text-brand-600 group-hover:text-brand-500 dark:text-brand-400">
                  {percent === 0
                    ? "Mulai belajar →"
                    : percent === 100
                      ? "Tinjau ulang →"
                      : "Lanjutkan →"}
                </span>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ── Detail kursus (siswa) ────────────────────────────────────
function CourseDetail({
  course,
  progress,
  onBack,
  onOpenLesson,
}: {
  course: Course;
  progress: Record<string, string[]>;
  onBack: () => void;
  onOpenLesson: (lessonId: string) => void;
}) {
  const done = new Set(progress[course.id] ?? []);
  const { percent } = courseProgress(course, progress);

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Kembali ke katalog
      </button>

      <div
        className={`flex flex-col justify-end rounded-3xl bg-gradient-to-br ${course.gradient} p-8`}
      >
        <div className="flex items-center gap-2 text-sm text-white/80">
          <span>{course.category}</span>
          <span>·</span>
          <span>{course.level}</span>
        </div>
        <h2 className="mt-1 text-3xl font-bold text-white">{course.title}</h2>
        <p className="mt-2 max-w-2xl text-white/90">{course.description}</p>
      </div>

      <div className="mt-6">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-zinc-700 dark:text-zinc-300">
            Progres kursus
          </span>
          <span className="text-zinc-500 dark:text-zinc-400">{percent}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
          <div
            className="h-full rounded-full bg-brand-500 transition-all"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      <h3 className="mb-4 mt-8 font-semibold text-zinc-900 dark:text-white">
        Daftar Pelajaran
      </h3>
      <div className="space-y-2">
        {course.lessons.map((l, i) => {
          const complete = done.has(l.id);
          return (
            <button
              key={l.id}
              type="button"
              onClick={() => onOpenLesson(l.id)}
              className="group flex w-full items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:hover:border-brand-700 dark:hover:bg-zinc-900"
            >
              {complete ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-emerald-500" />
              ) : (
                <Circle className="h-5 w-5 flex-shrink-0 text-zinc-300 dark:text-zinc-600" />
              )}
              <div className="flex-1">
                <p className="text-sm font-medium text-zinc-900 dark:text-white">
                  {i + 1}. {l.title}
                </p>
                <p className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                  <Clock className="h-3 w-3" />
                  {l.duration}
                </p>
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-300 transition group-hover:text-brand-500 dark:text-zinc-600" />
            </button>
          );
        })}
        {course.lessons.length === 0 && (
          <p className="rounded-xl border border-dashed border-zinc-300 px-4 py-8 text-center text-sm text-zinc-400 dark:border-zinc-700">
            Kursus ini belum memiliki pelajaran.
          </p>
        )}
      </div>
    </div>
  );
}

// ── Viewer pelajaran (siswa) ─────────────────────────────────
function LessonView({
  course,
  lessonId,
  progress,
  onToggle,
  onBack,
  onNavigate,
}: {
  course: Course;
  lessonId: string;
  progress: Record<string, string[]>;
  onToggle: (courseId: string, lessonId: string) => void;
  onBack: () => void;
  onNavigate: (lessonId: string) => void;
}) {
  const index = course.lessons.findIndex((l) => l.id === lessonId);
  const lesson: Lesson | undefined = course.lessons[index];
  if (!lesson) return <Missing onBack={onBack} />;

  const complete = (progress[course.id] ?? []).includes(lesson.id);
  const prev = course.lessons[index - 1];
  const next = course.lessons[index + 1];

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
      >
        <ArrowLeft className="h-4 w-4" />
        {course.title}
      </button>

      <p className="text-xs font-medium uppercase tracking-wide text-brand-500">
        Pelajaran {index + 1} dari {course.lessons.length}
      </p>
      <h2 className="mt-1 text-3xl font-bold text-zinc-900 dark:text-white">
        {lesson.title}
      </h2>
      <p className="mt-2 inline-flex items-center gap-1 text-sm text-zinc-500 dark:text-zinc-400">
        <Clock className="h-4 w-4" />
        {lesson.duration}
      </p>

      <article className="mt-8 space-y-4 leading-relaxed text-zinc-600 dark:text-zinc-300">
        {lesson.content.split("\n\n").map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </article>

      <button
        type="button"
        onClick={() => onToggle(course.id, lesson.id)}
        className={`mt-8 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-semibold transition ${
          complete
            ? "border border-emerald-300 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-400"
            : "bg-brand-600 text-white shadow-lg shadow-brand-600/25 hover:bg-brand-700"
        }`}
      >
        <Check className="h-4 w-4" />
        {complete ? "Selesai — tandai belum" : "Tandai selesai"}
      </button>

      <div className="mt-10 flex items-center justify-between border-t border-zinc-200 pt-6 dark:border-zinc-800">
        <button
          type="button"
          disabled={!prev}
          onClick={() => prev && onNavigate(prev.id)}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition enabled:hover:text-brand-500 disabled:opacity-40 dark:text-zinc-400"
        >
          <ArrowLeft className="h-4 w-4" />
          Sebelumnya
        </button>
        <button
          type="button"
          disabled={!next}
          onClick={() => next && onNavigate(next.id)}
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition enabled:hover:text-brand-500 disabled:opacity-40 dark:text-zinc-400"
        >
          Selanjutnya
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

// ── Dashboard admin (CMS) ────────────────────────────────────
function Admin({
  courses,
  onNew,
  onEdit,
  onDelete,
  onReset,
}: {
  courses: Course[];
  onNew: () => void;
  onEdit: (courseId: string) => void;
  onDelete: (courseId: string) => void;
  onReset: () => void;
}) {
  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
            Kelola Kursus
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Buat, ubah, dan hapus kursus beserta materinya.
          </p>
        </div>
        <button
          type="button"
          onClick={onNew}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Kursus
        </button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {courses.map((c) => (
          <div
            key={c.id}
            className="flex items-center gap-4 border-b border-zinc-100 p-4 last:border-0 dark:border-zinc-800/60"
          >
            <div
              className={`hidden h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-br sm:flex ${c.gradient}`}
            >
              <BookOpen className="h-5 w-5 text-white" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-zinc-900 dark:text-white">
                {c.title}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {c.category} · {c.level} · {c.lessons.length} pelajaran
              </p>
            </div>
            <button
              type="button"
              onClick={() => onEdit(c.id)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Pencil className="h-3.5 w-3.5" />
              Edit
            </button>
            <button
              type="button"
              aria-label="Hapus kursus"
              onClick={() => {
                if (
                  window.confirm(`Hapus kursus "${c.title}"? Tindakan ini tidak bisa dibatalkan.`)
                )
                  onDelete(c.id);
              }}
              className="rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {courses.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-zinc-400">
            Belum ada kursus. Klik “Tambah Kursus”.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Kembalikan semua data ke kondisi awal?")) onReset();
        }}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <RotateCcw className="h-4 w-4" />
        Reset ke data awal
      </button>
    </div>
  );
}
