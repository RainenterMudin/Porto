// ─────────────────────────────────────────────────────────────
//  Fungsi perhitungan untuk kalkulator keuangan.
//  Semua fungsi murni (pure) sehingga mudah diuji & dipakai ulang.
//  Perhitungan memakai bunga majemuk bulanan.
// ─────────────────────────────────────────────────────────────

export const rupiah = (n: number) =>
  "Rp " + new Intl.NumberFormat("id-ID").format(Math.round(n));

/** Format ringkas: Rp 1,2 M / Rp 350 jt / Rp 90 rb */
export function rupiahShort(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1_000_000_000)
    return `Rp ${(n / 1_000_000_000).toFixed(1).replace(".", ",")} M`;
  if (abs >= 1_000_000)
    return `Rp ${(n / 1_000_000).toFixed(0)} jt`;
  if (abs >= 1_000) return `Rp ${(n / 1_000).toFixed(0)} rb`;
  return rupiah(n);
}

/** Future value dari setoran awal + setoran bulanan rutin. */
export function investmentResult(params: {
  initial: number;
  monthly: number;
  annualReturnPct: number;
  years: number;
}) {
  const { initial, monthly, annualReturnPct, years } = params;
  const i = annualReturnPct / 100 / 12;
  const m = Math.round(years * 12);
  const fvInitial = initial * Math.pow(1 + i, m);
  const fvMonthly =
    i === 0 ? monthly * m : monthly * ((Math.pow(1 + i, m) - 1) / i);
  const futureValue = fvInitial + fvMonthly;
  const invested = initial + monthly * m;
  const gain = futureValue - invested;
  return { futureValue, invested, gain, months: m };
}

/** Proyeksi dana pensiun + estimasi penghasilan bulanan saat pensiun. */
export function pensionResult(params: {
  currentAge: number;
  retirementAge: number;
  currentSavings: number;
  monthly: number;
  annualReturnPct: number;
  yearsInRetirement: number;
}) {
  const {
    currentAge,
    retirementAge,
    currentSavings,
    monthly,
    annualReturnPct,
    yearsInRetirement,
  } = params;
  const years = Math.max(0, retirementAge - currentAge);
  const acc = investmentResult({
    initial: currentSavings,
    monthly,
    annualReturnPct,
    years,
  });
  const corpus = acc.futureValue;
  const i = annualReturnPct / 100 / 12;
  const n = Math.round(yearsInRetirement * 12);
  const monthlyIncome =
    n <= 0
      ? 0
      : i === 0
        ? corpus / n
        : (corpus * i) / (1 - Math.pow(1 + i, -n));
  return { years, corpus, invested: acc.invested, gain: acc.gain, monthlyIncome };
}

/** Kebutuhan dana pendidikan di masa depan + setoran bulanan yang diperlukan. */
export function educationResult(params: {
  currentCost: number;
  years: number;
  eduInflationPct: number;
  expectedReturnPct: number;
  currentSavings: number;
}) {
  const { currentCost, years, eduInflationPct, expectedReturnPct, currentSavings } =
    params;
  const futureCost = currentCost * Math.pow(1 + eduInflationPct / 100, years);
  const i = expectedReturnPct / 100 / 12;
  const m = Math.round(years * 12);
  const fvSavings = currentSavings * Math.pow(1 + i, m);
  const gap = Math.max(0, futureCost - fvSavings);
  const requiredMonthly =
    m <= 0
      ? gap
      : i === 0
        ? gap / m
        : (gap * i) / (Math.pow(1 + i, m) - 1);
  return { futureCost, fvSavings, gap, requiredMonthly };
}
