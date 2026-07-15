"use client";

import { useMemo, useState } from "react";
import { educationResult, rupiah } from "@/lib/finance";
import { CalcLayout, Field, StatCard } from "./ui";

const num = (s: string) => {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

export function EducationCalculator() {
  const [currentCost, setCurrentCost] = useState("50000000");
  const [years, setYears] = useState("15");
  const [eduInflation, setEduInflation] = useState("10");
  const [expectedReturn, setExpectedReturn] = useState("9");
  const [currentSavings, setCurrentSavings] = useState("5000000");

  const r = useMemo(
    () =>
      educationResult({
        currentCost: num(currentCost),
        years: num(years),
        eduInflationPct: num(eduInflation),
        expectedReturnPct: num(expectedReturn),
        currentSavings: num(currentSavings),
      }),
    [currentCost, years, eduInflation, expectedReturn, currentSavings],
  );

  return (
    <CalcLayout
      inputs={
        <>
          <Field label="Biaya pendidikan saat ini" prefix="Rp" value={currentCost} onChange={setCurrentCost} step={1000000} hint="Total biaya bila kuliah/sekolah dimulai sekarang" />
          <Field label="Butuh dana dalam" suffix="tahun" value={years} onChange={setYears} />
          <Field label="Inflasi biaya pendidikan / tahun" suffix="%" value={eduInflation} onChange={setEduInflation} step={0.5} hint="Biaya pendidikan biasanya naik 8–15% / tahun" />
          <Field label="Estimasi imbal hasil investasi / tahun" suffix="%" value={expectedReturn} onChange={setExpectedReturn} step={0.5} />
          <Field label="Dana pendidikan terkumpul saat ini" prefix="Rp" value={currentSavings} onChange={setCurrentSavings} step={1000000} />
        </>
      }
      results={
        <>
          <StatCard
            label="Perkiraan biaya di masa depan"
            value={rupiah(r.futureCost)}
            hint={`${num(years)} tahun lagi, dengan inflasi ${num(eduInflation)}%`}
            highlight
          />
          <StatCard
            label="Setoran per bulan yang dibutuhkan"
            value={rupiah(r.requiredMonthly)}
            hint="Agar target dana tercapai tepat waktu"
            highlight
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard
              label="Proyeksi dari dana saat ini"
              value={rupiah(r.fvSavings)}
              hint="Nilai tabungan saat ini di masa depan"
            />
            <StatCard
              label="Kekurangan yang harus ditutup"
              value={rupiah(r.gap)}
              hint="Selisih dari target biaya"
            />
          </div>
          {r.gap === 0 && (
            <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
              🎉 Dana yang kamu miliki saat ini diproyeksikan sudah cukup untuk
              menutup biaya pendidikan di masa depan.
            </p>
          )}
        </>
      }
    />
  );
}
