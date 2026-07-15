"use client";

import { useCallback, useEffect, useState } from "react";

// ─────────────────────────────────────────────────────────────
//  Finance Management System — multi-pool dengan satu Kas Pusat.
//  Data disimpan di browser (localStorage). Nilai awal (seed) di
//  bawah adalah CONTOH untuk demonstrasi.
// ─────────────────────────────────────────────────────────────

export type PoolType = "central" | "branch";

export type Pool = {
  id: string;
  name: string;
  type: PoolType;
  color: string; // kelas warna aksen Tailwind
};

export type TxType = "income" | "expense" | "transfer";

export type Tx = {
  id: string;
  date: string; // YYYY-MM-DD
  type: TxType;
  poolId: string; // sumber (income: tujuan, expense/transfer: sumber)
  toPoolId?: string; // hanya untuk transfer
  amount: number;
  category: string;
  note?: string;
};

export const poolColors = [
  "bg-indigo-500",
  "bg-emerald-500",
  "bg-amber-500",
  "bg-sky-500",
  "bg-rose-500",
  "bg-violet-500",
  "bg-teal-500",
];

export const incomeCategories = [
  "Penjualan Tiket",
  "Sewa Kendaraan",
  "Setoran Cabang",
  "Lainnya",
];

export const expenseCategories = [
  "Gaji Karyawan",
  "BBM & Tol",
  "Perawatan Armada",
  "Operasional",
  "Sewa Kantor",
  "Lainnya",
];

const seedPools: Pool[] = [
  { id: "pusat", name: "Kas Pusat", type: "central", color: "bg-indigo-500" },
  { id: "bandung", name: "Cabang Bandung", type: "branch", color: "bg-emerald-500" },
  { id: "jakarta", name: "Cabang Jakarta", type: "branch", color: "bg-amber-500" },
  { id: "operasional", name: "Operasional", type: "branch", color: "bg-sky-500" },
];

const seedTxs: Tx[] = [
  { id: "t1", date: "2026-07-01", type: "income", poolId: "bandung", amount: 24500000, category: "Penjualan Tiket", note: "Penjualan minggu 1" },
  { id: "t2", date: "2026-07-01", type: "income", poolId: "jakarta", amount: 31200000, category: "Penjualan Tiket", note: "Penjualan minggu 1" },
  { id: "t3", date: "2026-07-02", type: "expense", poolId: "operasional", amount: 6800000, category: "BBM & Tol" },
  { id: "t4", date: "2026-07-03", type: "transfer", poolId: "bandung", toPoolId: "pusat", amount: 15000000, category: "Setoran Cabang", note: "Setor ke pusat" },
  { id: "t5", date: "2026-07-03", type: "transfer", poolId: "jakarta", toPoolId: "pusat", amount: 20000000, category: "Setoran Cabang", note: "Setor ke pusat" },
  { id: "t6", date: "2026-07-05", type: "expense", poolId: "pusat", amount: 18000000, category: "Gaji Karyawan", note: "Gaji Juli" },
  { id: "t7", date: "2026-07-06", type: "transfer", poolId: "pusat", toPoolId: "operasional", amount: 10000000, category: "Operasional", note: "Dana operasional" },
  { id: "t8", date: "2026-07-08", type: "expense", poolId: "operasional", amount: 4200000, category: "Perawatan Armada" },
  { id: "t9", date: "2026-07-10", type: "income", poolId: "bandung", amount: 19800000, category: "Penjualan Tiket", note: "Penjualan minggu 2" },
];

const POOLS_KEY = "fms.pools.v1";
const TXS_KEY = "fms.txs.v1";

export function newId(prefix = "id") {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto)
    return `${prefix}-${crypto.randomUUID().slice(0, 8)}`;
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

export function poolBalance(poolId: string, txs: Tx[]): number {
  let b = 0;
  for (const t of txs) {
    if (t.type === "income" && t.poolId === poolId) b += t.amount;
    else if (t.type === "expense" && t.poolId === poolId) b -= t.amount;
    else if (t.type === "transfer") {
      if (t.poolId === poolId) b -= t.amount;
      if (t.toPoolId === poolId) b += t.amount;
    }
  }
  return b;
}

export function totalAssets(pools: Pool[], txs: Tx[]): number {
  return pools.reduce((sum, p) => sum + poolBalance(p.id, txs), 0);
}

/** Arus kas bersih (pemasukan - pengeluaran) pada bulan tertentu (YYYY-MM). */
export function monthlyNet(txs: Tx[], month: string) {
  let income = 0;
  let expense = 0;
  for (const t of txs) {
    if (!t.date.startsWith(month)) continue;
    if (t.type === "income") income += t.amount;
    else if (t.type === "expense") expense += t.amount;
  }
  return { income, expense, net: income - expense };
}

export function useFinance() {
  const [pools, setPools] = useState<Pool[]>(seedPools);
  const [txs, setTxs] = useState<Tx[]>(seedTxs);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const p = localStorage.getItem(POOLS_KEY);
      const t = localStorage.getItem(TXS_KEY);
      if (p) setPools(JSON.parse(p));
      if (t) setTxs(JSON.parse(t));
    } catch {
      // pakai seed
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) localStorage.setItem(POOLS_KEY, JSON.stringify(pools));
  }, [pools, loaded]);

  useEffect(() => {
    if (loaded) localStorage.setItem(TXS_KEY, JSON.stringify(txs));
  }, [txs, loaded]);

  const addTx = useCallback((tx: Omit<Tx, "id">) => {
    setTxs((prev) => [{ ...tx, id: newId("tx") }, ...prev]);
  }, []);

  const deleteTx = useCallback((id: string) => {
    setTxs((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addPool = useCallback((name: string, color: string) => {
    setPools((prev) => [
      ...prev,
      { id: newId("pool"), name, type: "branch", color },
    ]);
  }, []);

  const deletePool = useCallback((id: string) => {
    setPools((prev) => prev.filter((p) => p.id !== id || p.type === "central"));
    setTxs((prev) => prev.filter((t) => t.poolId !== id && t.toPoolId !== id));
  }, []);

  const resetData = useCallback(() => {
    setPools(seedPools);
    setTxs(seedTxs);
  }, []);

  return {
    pools,
    txs,
    loaded,
    addTx,
    deleteTx,
    addPool,
    deletePool,
    resetData,
  };
}
