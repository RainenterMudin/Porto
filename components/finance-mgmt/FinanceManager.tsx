"use client";

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDownLeft,
  ArrowLeftRight,
  ArrowUpRight,
  Landmark,
  Layers,
  Plus,
  RotateCcw,
  Trash2,
  TrendingDown,
  TrendingUp,
  Wallet,
  X,
} from "lucide-react";
import { rupiah } from "@/lib/finance";
import {
  expenseCategories,
  incomeCategories,
  monthlyNet,
  poolBalance,
  poolColors,
  totalAssets,
  useFinance,
  type TxType,
} from "@/lib/pools";

const transferCategories = [
  "Setoran Cabang",
  "Dana Operasional",
  "Alokasi Anggaran",
  "Lainnya",
];

const input =
  "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
const labelCls =
  "mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400";

const typeFilters: { key: TxType | "all"; label: string }[] = [
  { key: "all", label: "Semua" },
  { key: "income", label: "Masuk" },
  { key: "expense", label: "Keluar" },
  { key: "transfer", label: "Transfer" },
];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function FinanceManager() {
  const { pools, txs, loaded, addTx, deleteTx, addPool, deletePool, resetData } =
    useFinance();

  const [selectedPool, setSelectedPool] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<TxType | "all">("all");
  const [showTxForm, setShowTxForm] = useState(false);
  const [showPoolForm, setShowPoolForm] = useState(false);

  const [form, setForm] = useState({
    type: "income" as TxType,
    poolId: "",
    toPoolId: "",
    amount: "",
    category: incomeCategories[0],
    date: "",
    note: "",
  });
  const [newPool, setNewPool] = useState({ name: "", color: poolColors[1] });
  const [error, setError] = useState("");

  const central = pools.find((p) => p.type === "central");
  const period = useMemo(
    () => txs.reduce((mx, t) => (t.date > mx ? t.date : mx), "0000-00").slice(0, 7),
    [txs],
  );
  const flow = useMemo(() => monthlyNet(txs, period), [txs, period]);

  const filteredTxs = useMemo(() => {
    return txs.filter((t) => {
      if (typeFilter !== "all" && t.type !== typeFilter) return false;
      if (
        selectedPool &&
        t.poolId !== selectedPool &&
        t.toPoolId !== selectedPool
      )
        return false;
      return true;
    });
  }, [txs, typeFilter, selectedPool]);

  const poolName = (id?: string) =>
    pools.find((p) => p.id === id)?.name ?? "—";

  const categoriesFor = (type: TxType) =>
    type === "income"
      ? incomeCategories
      : type === "expense"
        ? expenseCategories
        : transferCategories;

  if (!loaded) {
    return (
      <div className="flex items-center justify-center py-24 text-sm text-zinc-400">
        Memuat…
      </div>
    );
  }

  const openTxForm = () => {
    setForm({
      type: "income",
      poolId: pools[0]?.id ?? "",
      toPoolId: central?.id ?? "",
      amount: "",
      category: incomeCategories[0],
      date: todayISO(),
      note: "",
    });
    setError("");
    setShowPoolForm(false);
    setShowTxForm(true);
  };

  const setType = (type: TxType) =>
    setForm((f) => ({ ...f, type, category: categoriesFor(type)[0] }));

  const submitTx = () => {
    const amount = Number(form.amount);
    if (!amount || amount <= 0) return setError("Jumlah harus lebih dari 0.");
    if (!form.poolId) return setError("Pilih pool.");
    if (form.type === "transfer") {
      if (!form.toPoolId) return setError("Pilih pool tujuan.");
      if (form.toPoolId === form.poolId)
        return setError("Pool asal dan tujuan tidak boleh sama.");
    }
    addTx({
      date: form.date || todayISO(),
      type: form.type,
      poolId: form.poolId,
      toPoolId: form.type === "transfer" ? form.toPoolId : undefined,
      amount,
      category: form.category,
      note: form.note.trim() || undefined,
    });
    setShowTxForm(false);
    setError("");
  };

  const submitPool = () => {
    if (!newPool.name.trim()) return setError("Nama pool wajib diisi.");
    addPool(newPool.name.trim(), newPool.color);
    setNewPool({ name: "", color: poolColors[1] });
    setShowPoolForm(false);
    setError("");
  };

  return (
    <div>
      {/* Ringkasan */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Summary
          icon={<Wallet className="h-5 w-5" />}
          label="Total Aset"
          value={rupiah(totalAssets(pools, txs))}
          // highlight
        />
        <Summary
          icon={<Landmark className="h-5 w-5" />}
          label="Kas Pusat"
          value={central ? rupiah(poolBalance(central.id, txs)) : "—"}
        />
        <Summary
          icon={
            flow.net >= 0 ? (
              <TrendingUp className="h-5 w-5" />
            ) : (
              <TrendingDown className="h-5 w-5" />
            )
          }
          label="Arus Kas (periode terakhir)"
          value={`${flow.net >= 0 ? "+" : "−"}${rupiah(Math.abs(flow.net))}`}
          tone={flow.net >= 0 ? "up" : "down"}
        />
        <Summary
          icon={<Layers className="h-5 w-5" />}
          label="Jumlah Pool"
          value={`${pools.length}`}
        />
      </div>

      {/* Pools */}
      <div className="mb-4 mt-10 flex items-center justify-between">
        <h3 className="font-semibold text-zinc-900 dark:text-white">
          Pool Kas
        </h3>
        <button
          type="button"
          onClick={() => {
            setShowPoolForm((v) => !v);
            setShowTxForm(false);
            setError("");
          }}
          className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Plus className="h-4 w-4" />
          Tambah Pool
        </button>
      </div>

      {showPoolForm && (
        <div className="mb-4 flex flex-wrap items-end gap-3 rounded-2xl border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex-1">
            <label className={labelCls}>Nama pool</label>
            <input
              className={input}
              value={newPool.name}
              onChange={(e) => setNewPool((p) => ({ ...p, name: e.target.value }))}
              placeholder="mis. Cabang Cirebon"
            />
          </div>
          <div>
            <label className={labelCls}>Warna</label>
            <div className="flex gap-1.5">
              {poolColors.map((c) => (
                <button
                  key={c}
                  type="button"
                  aria-label="Pilih warna"
                  onClick={() => setNewPool((p) => ({ ...p, color: c }))}
                  className={`h-8 w-8 rounded-lg ${c} transition ${
                    newPool.color === c
                      ? "ring-2 ring-offset-2 ring-zinc-400 dark:ring-offset-zinc-950"
                      : ""
                  }`}
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={submitPool}
            className="rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Simpan
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {pools.map((p) => {
          const bal = poolBalance(p.id, txs);
          const active = selectedPool === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setSelectedPool(active ? null : p.id)}
              className={`rounded-2xl border p-5 text-left transition hover:-translate-y-0.5 ${
                active
                  ? "border-brand-400 ring-2 ring-brand-500/20"
                  : "border-zinc-200 dark:border-zinc-800"
              } bg-white dark:bg-zinc-950`}
            >
              <div className="mb-3 flex items-center justify-between">
                <span
                  className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-white ${p.color}`}
                >
                  {p.type === "central" ? (
                    <Landmark className="h-4 w-4" />
                  ) : (
                    <Wallet className="h-4 w-4" />
                  )}
                </span>
                {p.type === "central" ? (
                  <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 dark:bg-brand-950 dark:text-brand-300">
                    Pusat
                  </span>
                ) : (
                  <span
                    role="button"
                    tabIndex={0}
                    aria-label="Hapus pool"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          `Hapus pool "${p.name}" beserta transaksinya?`,
                        )
                      )
                        deletePool(p.id);
                    }}
                    className="rounded-lg p-1 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{p.name}</p>
              <p
                className={`mt-0.5 text-lg font-bold ${
                  bal < 0
                    ? "text-red-600 dark:text-red-400"
                    : "text-zinc-900 dark:text-white"
                }`}
              >
                {rupiah(bal)}
              </p>
            </button>
          );
        })}
      </div>

      {/* Transaksi */}
      <div className="mb-4 mt-10 flex flex-wrap items-center justify-between gap-3">
        <h3 className="font-semibold text-zinc-900 dark:text-white">
          Transaksi
          {selectedPool && (
            <span className="ml-2 text-sm font-normal text-zinc-500">
              · {poolName(selectedPool)}
              <button
                type="button"
                onClick={() => setSelectedPool(null)}
                className="ml-1 text-brand-600 hover:underline dark:text-brand-400"
              >
                (hapus filter)
              </button>
            </span>
          )}
        </h3>
        <button
          type="button"
          onClick={openTxForm}
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          <Plus className="h-4 w-4" />
          Tambah Transaksi
        </button>
      </div>

      {/* Form transaksi */}
      {showTxForm && (
        <div className="mb-5 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="mb-4 flex items-center justify-between">
            <h4 className="font-semibold text-zinc-900 dark:text-white">
              Transaksi Baru
            </h4>
            <button
              type="button"
              onClick={() => setShowTxForm(false)}
              className="rounded-lg p-1 text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Jenis */}
          <div className="mb-4 inline-flex rounded-xl border border-zinc-200 bg-zinc-100 p-1 dark:border-zinc-800 dark:bg-zinc-900">
            {(["income", "expense", "transfer"] as TxType[]).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                  form.type === t
                    ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-950 dark:text-white"
                    : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
                }`}
              >
                {t === "income"
                  ? "Pemasukan"
                  : t === "expense"
                    ? "Pengeluaran"
                    : "Transfer"}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>
                {form.type === "income"
                  ? "Masuk ke pool"
                  : form.type === "expense"
                    ? "Keluar dari pool"
                    : "Dari pool"}
              </label>
              <select
                className={input}
                value={form.poolId}
                onChange={(e) => setForm((f) => ({ ...f, poolId: e.target.value }))}
              >
                {pools.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
            </div>

            {form.type === "transfer" && (
              <div>
                <label className={labelCls}>Ke pool</label>
                <select
                  className={input}
                  value={form.toPoolId}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, toPoolId: e.target.value }))
                  }
                >
                  {pools.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div>
              <label className={labelCls}>Jumlah</label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-zinc-300 focus-within:border-brand-500 focus-within:ring-2 focus-within:ring-brand-500/20 dark:border-zinc-700">
                <span className="flex items-center bg-zinc-50 px-3 text-sm text-zinc-500 dark:bg-zinc-800/60 dark:text-zinc-400">
                  Rp
                </span>
                <input
                  type="number"
                  min={0}
                  className="w-full bg-white px-3 py-2.5 text-sm outline-none dark:bg-zinc-900 dark:text-white [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none"
                  value={form.amount}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, amount: e.target.value }))
                  }
                  placeholder="0"
                />
              </div>
            </div>

            <div>
              <label className={labelCls}>Kategori</label>
              <select
                className={input}
                value={form.category}
                onChange={(e) =>
                  setForm((f) => ({ ...f, category: e.target.value }))
                }
              >
                {categoriesFor(form.type).map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelCls}>Tanggal</label>
              <input
                type="date"
                className={input}
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>

            <div>
              <label className={labelCls}>Catatan (opsional)</label>
              <input
                className={input}
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="Keterangan singkat…"
              />
            </div>
          </div>

          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}

          <button
            type="button"
            onClick={submitTx}
            className="mt-4 rounded-xl bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
          >
            Simpan Transaksi
          </button>
        </div>
      )}

      {/* Filter jenis */}
      <div className="mb-4 flex gap-2">
        {typeFilters.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setTypeFilter(f.key)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              typeFilter === f.key
                ? "bg-brand-600 text-white"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Daftar transaksi */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
        {filteredTxs.map((t) => (
          <div
            key={t.id}
            className="flex items-center gap-4 border-b border-zinc-100 p-4 last:border-0 dark:border-zinc-800/60"
          >
            <span
              className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full ${
                t.type === "income"
                  ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                  : t.type === "expense"
                    ? "bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                    : "bg-sky-50 text-sky-600 dark:bg-sky-500/10 dark:text-sky-400"
              }`}
            >
              {t.type === "income" ? (
                <ArrowDownLeft className="h-4 w-4" />
              ) : t.type === "expense" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowLeftRight className="h-4 w-4" />
              )}
            </span>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                {t.category}
                {t.note ? (
                  <span className="font-normal text-zinc-400"> · {t.note}</span>
                ) : null}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {t.type === "transfer"
                  ? `${poolName(t.poolId)} → ${poolName(t.toPoolId)}`
                  : poolName(t.poolId)}{" "}
                · {t.date}
              </p>
            </div>

            <span
              className={`flex-shrink-0 text-sm font-semibold tabular-nums ${
                t.type === "income"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : t.type === "expense"
                    ? "text-red-600 dark:text-red-400"
                    : "text-zinc-600 dark:text-zinc-300"
              }`}
            >
              {t.type === "income" ? "+" : t.type === "expense" ? "−" : ""}
              {rupiah(t.amount)}
            </span>

            <button
              type="button"
              aria-label="Hapus transaksi"
              onClick={() => deleteTx(t.id)}
              className="flex-shrink-0 rounded-lg p-2 text-zinc-400 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
        {filteredTxs.length === 0 && (
          <p className="px-4 py-12 text-center text-sm text-zinc-400">
            Tidak ada transaksi untuk filter ini.
          </p>
        )}
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("Kembalikan semua data keuangan ke kondisi awal?"))
            resetData();
        }}
        className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 transition hover:text-zinc-800 dark:hover:text-zinc-200"
      >
        <RotateCcw className="h-4 w-4" />
        Reset ke data awal
      </button>

      <p className="mt-6 text-xs text-zinc-400 dark:text-zinc-500">
        * Demo. Seluruh data keuangan bersifat contoh dan tersimpan di browser
        kamu (localStorage).
      </p>
    </div>
  );
}

function Summary({
  icon,
  label,
  value,
  highlight,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
  tone?: "up" | "down";
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-brand-200 bg-gradient-to-br from-brand-50 to-fuchsia-50 dark:border-brand-800/50 dark:from-brand-950/60 dark:to-fuchsia-950/40"
          : "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
        <span
          className={
            tone === "up"
              ? "text-emerald-500"
              : tone === "down"
                ? "text-red-500"
                : highlight
                  ? "text-brand-500"
                  : ""
          }
        >
          {icon}
        </span>
        <span className="text-xs font-medium">{label}</span>
      </div>
      <p
        className={`text-xl font-bold ${
          tone === "up"
            ? "text-emerald-600 dark:text-emerald-400"
            : tone === "down"
              ? "text-red-600 dark:text-red-400"
              : "text-zinc-900 dark:text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}
