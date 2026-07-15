"use client";

import type { ReactNode } from "react";

export function Field({
  label,
  value,
  onChange,
  prefix,
  suffix,
  min = 0,
  step = 1,
  hint,
}: {
  label: string;
  value: number | string;
  onChange: (v: string) => void;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
  hint?: string;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </label>
      <div className="flex items-stretch overflow-hidden rounded-xl border border-zinc-300 bg-white transition focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900">
        {prefix && (
          <span className="flex items-center border-r border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {prefix}
          </span>
        )}
        <input
          type="number"
          min={min}
          step={step}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none dark:text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && (
          <span className="flex items-center border-l border-zinc-200 bg-zinc-50 px-3 text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {suffix}
          </span>
        )}
      </div>
      {hint && (
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{hint}</p>
      )}
    </div>
  );
}

export function StatCard({
  label,
  value,
  hint,
  highlight,
}: {
  label: string;
  value: string;
  hint?: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-fuchsia-50 dark:border-brand-800/50 dark:from-brand-950/60 dark:to-fuchsia-950/40"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      }`}
    >
      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold ${
          highlight
            ? "bg-gradient-to-r from-brand-600 to-fuchsia-600 bg-clip-text text-transparent dark:from-brand-400 dark:to-fuchsia-400"
            : "text-zinc-900 dark:text-white"
        }`}
      >
        {value}
      </p>
      {hint && (
        <p className="mt-1 text-xs text-zinc-400 dark:text-zinc-500">{hint}</p>
      )}
    </div>
  );
}

/** Bar proporsi dua nilai (mis. modal vs imbal hasil). */
export function SplitBar({
  segments,
}: {
  segments: { label: string; value: number; className: string }[];
}) {
  const total = segments.reduce((s, x) => s + Math.max(0, x.value), 0) || 1;
  return (
    <div>
      <div className="flex h-3 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
        {segments.map((s) => (
          <div
            key={s.label}
            className={s.className}
            style={{ width: `${(Math.max(0, s.value) / total) * 100}%` }}
          />
        ))}
      </div>
      <div className="mt-2 flex flex-wrap gap-4">
        {segments.map((s) => (
          <span
            key={s.label}
            className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400"
          >
            <span className={`h-2.5 w-2.5 rounded-full ${s.className}`} />
            {s.label}
          </span>
        ))}
      </div>
    </div>
  );
}

export function CalcLayout({
  inputs,
  results,
}: {
  inputs: ReactNode;
  results: ReactNode;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,340px)_1fr]">
      <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
        {inputs}
      </div>
      <div className="space-y-5">{results}</div>
    </div>
  );
}
