"use client";

import { useMemo, useState } from "react";
import { investmentResult, rupiah } from "@/lib/finance";
import { CalcLayout, Field, SplitBar, StatCard } from "./ui";

const num = (s: string) => {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

export function InvestmentCalculator() {
  const [initial, setInitial] = useState("10000000");
  const [monthly, setMonthly] = useState("1000000");
  const [annualReturn, setAnnualReturn] = useState("10");
  const [years, setYears] = useState("10");

  const r = useMemo(
    () =>
      investmentResult({
        initial: num(initial),
        monthly: num(monthly),
        annualReturnPct: num(annualReturn),
        years: num(years),
      }),
    [initial, monthly, annualReturn, years],
  );

  return (
    <CalcLayout
      inputs={
        <>
          <Field label="Setoran awal" prefix="Rp" value={initial} onChange={setInitial} step={1000000} />
          <Field label="Setoran per bulan" prefix="Rp" value={monthly} onChange={setMonthly} step={100000} />
          <Field label="Estimasi imbal hasil / tahun" suffix="%" value={annualReturn} onChange={setAnnualReturn} step={0.5} />
          <Field label="Lama investasi" suffix="tahun" value={years} onChange={setYears} step={1} />
        </>
      }
      results={
        <>
          <StatCard
            label="Nilai akhir investasi"
            value={rupiah(r.futureValue)}
            hint={`Setelah ${num(years)} tahun`}
            highlight
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Total setoran" value={rupiah(r.invested)} />
            <StatCard label="Total imbal hasil" value={rupiah(r.gain)} />
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Komposisi nilai akhir
            </p>
            <SplitBar
              segments={[
                { label: "Modal disetor", value: r.invested, className: "bg-brand-500" },
                { label: "Imbal hasil", value: r.gain, className: "bg-emerald-500" },
              ]}
            />
          </div>
        </>
      }
    />
  );
}
