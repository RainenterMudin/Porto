"use client";

import { useMemo, useState } from "react";
import { pensionResult, rupiah } from "@/lib/finance";
import { CalcLayout, Field, SplitBar, StatCard } from "./ui";

const num = (s: string) => {
  const n = parseFloat(s);
  return isNaN(n) ? 0 : n;
};

export function PensionCalculator() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("56");
  const [currentSavings, setCurrentSavings] = useState("20000000");
  const [monthly, setMonthly] = useState("1500000");
  const [annualReturn, setAnnualReturn] = useState("9");
  const [yearsInRetirement, setYearsInRetirement] = useState("20");

  const r = useMemo(
    () =>
      pensionResult({
        currentAge: num(currentAge),
        retirementAge: num(retirementAge),
        currentSavings: num(currentSavings),
        monthly: num(monthly),
        annualReturnPct: num(annualReturn),
        yearsInRetirement: num(yearsInRetirement),
      }),
    [currentAge, retirementAge, currentSavings, monthly, annualReturn, yearsInRetirement],
  );

  return (
    <CalcLayout
      inputs={
        <>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Usia sekarang" suffix="th" value={currentAge} onChange={setCurrentAge} />
            <Field label="Usia pensiun" suffix="th" value={retirementAge} onChange={setRetirementAge} />
          </div>
          <Field label="Dana terkumpul saat ini" prefix="Rp" value={currentSavings} onChange={setCurrentSavings} step={1000000} />
          <Field label="Setoran per bulan" prefix="Rp" value={monthly} onChange={setMonthly} step={100000} />
          <Field label="Estimasi imbal hasil / tahun" suffix="%" value={annualReturn} onChange={setAnnualReturn} step={0.5} />
          <Field label="Perkiraan masa pensiun" suffix="tahun" value={yearsInRetirement} onChange={setYearsInRetirement} hint="Lama dana ingin dipakai setelah pensiun" />
        </>
      }
      results={
        <>
          <StatCard
            label="Dana pensiun saat usia pensiun"
            value={rupiah(r.corpus)}
            hint={`Terkumpul dalam ${r.years} tahun`}
            highlight
          />
          <StatCard
            label="Estimasi penghasilan bulanan saat pensiun"
            value={rupiah(r.monthlyIncome)}
            hint={`Selama ${num(yearsInRetirement)} tahun masa pensiun`}
            highlight
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <StatCard label="Total setoran" value={rupiah(r.invested)} />
            <StatCard label="Total imbal hasil" value={rupiah(r.gain)} />
          </div>
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
            <p className="mb-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Komposisi dana pensiun
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
