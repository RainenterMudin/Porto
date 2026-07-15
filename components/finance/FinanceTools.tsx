"use client";

import { useState } from "react";
import {
  LineChart,
  TrendingUp,
  PiggyBank,
  GraduationCap,
} from "lucide-react";
import { StockScreener } from "@/components/screener/StockScreener";
import { InvestmentCalculator } from "./InvestmentCalculator";
import { PensionCalculator } from "./PensionCalculator";
import { EducationCalculator } from "./EducationCalculator";

const tabs = [
  { key: "screener", label: "Screener Saham", icon: LineChart },
  { key: "investasi", label: "Kalkulator Investasi", icon: TrendingUp },
  { key: "pensiun", label: "Dana Pensiun", icon: PiggyBank },
  { key: "pendidikan", label: "Dana Pendidikan", icon: GraduationCap },
] as const;

type TabKey = (typeof tabs)[number]["key"];

export function FinanceTools() {
  const [tab, setTab] = useState<TabKey>("screener");

  return (
    <div>
      {/* Tab nav */}
      <div className="mb-8 flex gap-2 overflow-x-auto border-b border-zinc-200 pb-px dark:border-zinc-800">
        {tabs.map((t) => {
          const active = tab === t.key;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => setTab(t.key)}
              className={`inline-flex flex-shrink-0 items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
                active
                  ? "border-brand-600 text-brand-600 dark:border-brand-400 dark:text-brand-400"
                  : "border-transparent text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          );
        })}
      </div>

      {tab === "screener" && <StockScreener />}
      {tab === "investasi" && <InvestmentCalculator />}
      {tab === "pensiun" && <PensionCalculator />}
      {tab === "pendidikan" && <EducationCalculator />}
    </div>
  );
}
