"use client";

import { useMemo, useState } from "react";
import {
  Search,
  ArrowUp,
  ArrowDown,
  ArrowUpDown,
  RotateCcw,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { stocks, sectors, type Stock } from "@/lib/stocks";

type SortKey = keyof Pick<
  Stock,
  "ticker" | "price" | "change" | "marketCap" | "per" | "pbv" | "roe" | "dividendYield"
>;
type SortDir = "asc" | "desc";

const columns: { key: SortKey; label: string; align: "left" | "right" }[] = [
  { key: "ticker", label: "Ticker", align: "left" },
  { key: "price", label: "Harga", align: "right" },
  { key: "change", label: "Perubahan", align: "right" },
  { key: "marketCap", label: "Kap. Pasar", align: "right" },
  { key: "per", label: "PER", align: "right" },
  { key: "pbv", label: "PBV", align: "right" },
  { key: "roe", label: "ROE", align: "right" },
  { key: "dividendYield", label: "Div. Yield", align: "right" },
];

const rupiah = (n: number) =>
  new Intl.NumberFormat("id-ID", { maximumFractionDigits: 0 }).format(n);

const initialFilters = {
  query: "",
  sector: "Semua",
  perMax: "",
  divMin: "",
  mcapMin: "",
  profitableOnly: false,
};

export function StockScreener() {
  const [filters, setFilters] = useState(initialFilters);
  const [sortKey, setSortKey] = useState<SortKey>("marketCap");
  const [sortDir, setSortDir] = useState<SortDir>("desc");

  const set = <K extends keyof typeof filters>(
    key: K,
    value: (typeof filters)[K],
  ) => setFilters((f) => ({ ...f, [key]: value }));

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir(key === "ticker" ? "asc" : "desc");
    }
  };

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    const perMax = filters.perMax === "" ? null : Number(filters.perMax);
    const divMin = filters.divMin === "" ? null : Number(filters.divMin);
    const mcapMin = filters.mcapMin === "" ? null : Number(filters.mcapMin);

    const filtered = stocks.filter((s) => {
      if (q && !s.ticker.toLowerCase().includes(q) && !s.name.toLowerCase().includes(q))
        return false;
      if (filters.sector !== "Semua" && s.sector !== filters.sector) return false;
      if (filters.profitableOnly && s.per === null) return false;
      if (perMax !== null && (s.per === null || s.per > perMax)) return false;
      if (divMin !== null && s.dividendYield < divMin) return false;
      if (mcapMin !== null && s.marketCap < mcapMin) return false;
      return true;
    });

    const dir = sortDir === "asc" ? 1 : -1;
    return [...filtered].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      // ticker: alfabetis
      if (typeof av === "string" && typeof bv === "string")
        return av.localeCompare(bv) * dir;
      // angka; null (PER N/A) selalu di bawah
      const an = av === null ? Number.NEGATIVE_INFINITY : (av as number);
      const bn = bv === null ? Number.NEGATIVE_INFINITY : (bv as number);
      if (av === null && bv === null) return 0;
      if (av === null) return 1;
      if (bv === null) return -1;
      return (an - bn) * dir;
    });
  }, [filters, sortKey, sortDir]);

  const activeFilters =
    filters.query !== "" ||
    filters.sector !== "Semua" ||
    filters.perMax !== "" ||
    filters.divMin !== "" ||
    filters.mcapMin !== "" ||
    filters.profitableOnly;

  return (
    <div>
      {/* Filter panel */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-4 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {/* Search */}
          <div className="sm:col-span-2 lg:col-span-1">
            <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Cari saham
            </label>
            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                value={filters.query}
                onChange={(e) => set("query", e.target.value)}
                placeholder="Ticker atau nama…"
                className="w-full rounded-xl border border-zinc-300 bg-white py-2 pl-9 pr-3 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
              />
            </div>
          </div>

          {/* Sector */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Sektor
            </label>
            <select
              value={filters.sector}
              onChange={(e) => set("sector", e.target.value)}
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            >
              <option value="Semua">Semua sektor</option>
              {sectors.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* PER max */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              PER maksimum
            </label>
            <input
              type="number"
              min={0}
              value={filters.perMax}
              onChange={(e) => set("perMax", e.target.value)}
              placeholder="mis. 15"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          {/* Div yield min */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Div. Yield minimum (%)
            </label>
            <input
              type="number"
              min={0}
              step={0.1}
              value={filters.divMin}
              onChange={(e) => set("divMin", e.target.value)}
              placeholder="mis. 4"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>

          {/* Market cap min */}
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Kap. Pasar min. (triliun)
            </label>
            <input
              type="number"
              min={0}
              value={filters.mcapMin}
              onChange={(e) => set("mcapMin", e.target.value)}
              placeholder="mis. 50"
              className="w-full rounded-xl border border-zinc-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white"
            />
          </div>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={filters.profitableOnly}
              onChange={(e) => set("profitableOnly", e.target.checked)}
              className="h-4 w-4 rounded border-zinc-300 text-brand-600 focus:ring-brand-500 dark:border-zinc-600 dark:bg-zinc-900"
            />
            Hanya emiten yang untung (PER tersedia)
          </label>

          {activeFilters && (
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-zinc-500 transition hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filter
            </button>
          )}
        </div>
      </div>

      {/* Results count */}
      <div className="mb-3 mt-6 flex items-baseline justify-between">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Menampilkan{" "}
          <strong className="text-zinc-900 dark:text-white">
            {results.length}
          </strong>{" "}
          dari {stocks.length} saham
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-2xl border border-zinc-200 dark:border-zinc-800">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-zinc-200 bg-zinc-50 text-left dark:border-zinc-800 dark:bg-zinc-900/50">
              {columns.map((c) => {
                const active = sortKey === c.key;
                return (
                  <th
                    key={c.key}
                    className={`px-4 py-3 font-semibold text-zinc-600 dark:text-zinc-300 ${
                      c.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(c.key)}
                      className={`inline-flex items-center gap-1 transition hover:text-brand-600 dark:hover:text-brand-400 ${
                        c.align === "right" ? "flex-row-reverse" : ""
                      } ${active ? "text-brand-600 dark:text-brand-400" : ""}`}
                    >
                      {c.label}
                      {active ? (
                        sortDir === "asc" ? (
                          <ArrowUp className="h-3.5 w-3.5" />
                        ) : (
                          <ArrowDown className="h-3.5 w-3.5" />
                        )
                      ) : (
                        <ArrowUpDown className="h-3.5 w-3.5 opacity-40" />
                      )}
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {results.map((s) => (
              <tr
                key={s.ticker}
                className="border-b border-zinc-100 transition last:border-0 hover:bg-zinc-50 dark:border-zinc-800/60 dark:hover:bg-zinc-900/40"
              >
                <td className="px-4 py-3">
                  <div className="font-semibold text-zinc-900 dark:text-white">
                    {s.ticker}
                  </div>
                  <div className="max-w-[180px] truncate text-xs text-zinc-500 dark:text-zinc-400">
                    {s.name} · {s.sector}
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {rupiah(s.price)}
                </td>
                <td className="px-4 py-3 text-right">
                  <span
                    className={`inline-flex items-center gap-0.5 tabular-nums font-medium ${
                      s.change >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-red-600 dark:text-red-400"
                    }`}
                  >
                    {s.change >= 0 ? (
                      <TrendingUp className="h-3.5 w-3.5" />
                    ) : (
                      <TrendingDown className="h-3.5 w-3.5" />
                    )}
                    {s.change >= 0 ? "+" : ""}
                    {s.change.toFixed(1)}%
                  </span>
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {s.marketCap} T
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {s.per === null ? (
                    <span className="text-zinc-400">—</span>
                  ) : (
                    s.per.toFixed(1)
                  )}
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {s.pbv.toFixed(1)}
                </td>
                <td
                  className={`px-4 py-3 text-right tabular-nums ${
                    s.roe < 0
                      ? "text-red-600 dark:text-red-400"
                      : "text-zinc-700 dark:text-zinc-300"
                  }`}
                >
                  {s.roe.toFixed(1)}%
                </td>
                <td className="px-4 py-3 text-right tabular-nums text-zinc-700 dark:text-zinc-300">
                  {s.dividendYield.toFixed(1)}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {results.length === 0 && (
          <div className="px-4 py-16 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tidak ada saham yang cocok dengan filter.
            </p>
            <button
              type="button"
              onClick={() => setFilters(initialFilters)}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-brand-600 hover:text-brand-500 dark:text-brand-400"
            >
              <RotateCcw className="h-4 w-4" />
              Reset filter
            </button>
          </div>
        )}
      </div>

      <p className="mt-4 text-xs text-zinc-400 dark:text-zinc-500">
        * Data pada halaman ini adalah data contoh (dummy) untuk demonstrasi, bukan
        data pasar real-time. Bukan rekomendasi investasi.
      </p>
    </div>
  );
}
