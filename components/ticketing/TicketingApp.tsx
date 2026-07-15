"use client";

import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Bus,
  CheckCircle2,
  Clock,
  MapPin,
  Repeat,
  Search,
  Ticket,
} from "lucide-react";
import {
  bookingCode,
  cities,
  formatDuration,
  getSchedules,
  occupiedSeats,
  rupiah,
  SEAT_COLUMNS,
  SEAT_ROWS,
  type Schedule,
} from "@/lib/ticketing";

type Step = "search" | "schedules" | "seats" | "passenger" | "ticket";

const steps: { key: Step; label: string }[] = [
  { key: "search", label: "Cari" },
  { key: "schedules", label: "Jadwal" },
  { key: "seats", label: "Kursi" },
  { key: "passenger", label: "Data" },
  { key: "ticket", label: "Tiket" },
];

const input =
  "w-full rounded-xl border border-zinc-300 bg-white px-3 py-2.5 text-sm outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-zinc-700 dark:bg-zinc-900 dark:text-white";
const labelCls =
  "mb-1.5 block text-xs font-medium text-zinc-500 dark:text-zinc-400";

export function TicketingApp() {
  const [step, setStep] = useState<Step>("search");
  const [search, setSearch] = useState({
    origin: "Bandung",
    destination: "Jakarta",
    date: "",
    passengers: 1,
  });
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [seats, setSeats] = useState<string[]>([]);
  const [passenger, setPassenger] = useState({ name: "", phone: "", email: "" });
  const [code, setCode] = useState<string | null>(null);
  const [error, setError] = useState("");

  // Default tanggal = hari ini (di-set setelah mount agar tak mismatch)
  useEffect(() => {
    const today = new Date();
    const iso = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
    setSearch((s) => ({ ...s, date: iso }));
  }, []);

  const schedules = useMemo(
    () =>
      search.date
        ? getSchedules(search.origin, search.destination, search.date)
        : [],
    [search.origin, search.destination, search.date],
  );

  const occupied = useMemo(
    () => (schedule ? occupiedSeats(schedule.id) : new Set<string>()),
    [schedule],
  );

  const currentStepIndex = steps.findIndex((s) => s.key === step);

  const submitSearch = () => {
    if (search.origin === search.destination) {
      setError("Kota asal dan tujuan tidak boleh sama.");
      return;
    }
    setError("");
    setStep("schedules");
  };

  const chooseSchedule = (s: Schedule) => {
    setSchedule(s);
    setSeats([]);
    setStep("seats");
  };

  const toggleSeat = (seat: string) => {
    if (occupied.has(seat)) return;
    setSeats((prev) => {
      if (prev.includes(seat)) return prev.filter((s) => s !== seat);
      if (prev.length >= search.passengers) return prev; // batas = jumlah penumpang
      return [...prev, seat];
    });
  };

  const confirmSeats = () => {
    if (seats.length !== search.passengers) {
      setError(`Pilih tepat ${search.passengers} kursi.`);
      return;
    }
    setError("");
    setStep("passenger");
  };

  const submitPassenger = () => {
    if (!passenger.name.trim() || !passenger.phone.trim()) {
      setError("Nama dan nomor telepon wajib diisi.");
      return;
    }
    setError("");
    setCode(bookingCode());
    setStep("ticket");
  };

  const reset = () => {
    setSchedule(null);
    setSeats([]);
    setPassenger({ name: "", phone: "", email: "" });
    setCode(null);
    setError("");
    setStep("search");
  };

  const total = schedule ? schedule.price * search.passengers : 0;

  return (
    <div>
      {/* Stepper */}
      <div className="mb-8 flex items-center">
        {steps.map((s, i) => {
          const active = i === currentStepIndex;
          const done = i < currentStepIndex;
          return (
            <div key={s.key} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                    active
                      ? "bg-brand-600 text-white"
                      : done
                        ? "bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300"
                        : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800"
                  }`}
                >
                  {done ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`hidden text-xs sm:block ${active ? "font-medium text-zinc-900 dark:text-white" : "text-zinc-400"}`}
                >
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`mx-2 h-px flex-1 ${done ? "bg-brand-400" : "bg-zinc-200 dark:bg-zinc-800"}`}
                />
              )}
            </div>
          );
        })}
      </div>

      {error && (
        <p className="mb-4 rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-500/10 dark:text-red-400">
          {error}
        </p>
      )}

      {/* ── Step: Cari ── */}
      {step === "search" && (
        <div className="rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelCls}>Kota Asal</label>
              <select
                className={input}
                value={search.origin}
                onChange={(e) =>
                  setSearch((s) => ({ ...s, origin: e.target.value }))
                }
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="relative">
              <label className={labelCls}>Kota Tujuan</label>
              <select
                className={input}
                value={search.destination}
                onChange={(e) =>
                  setSearch((s) => ({ ...s, destination: e.target.value }))
                }
              >
                {cities.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <button
                type="button"
                aria-label="Tukar asal & tujuan"
                onClick={() =>
                  setSearch((s) => ({
                    ...s,
                    origin: s.destination,
                    destination: s.origin,
                  }))
                }
                className="absolute -left-3 top-8 hidden h-7 w-7 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition hover:text-brand-500 sm:flex dark:border-zinc-700 dark:bg-zinc-900"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" />
              </button>
            </div>
            <div>
              <label className={labelCls}>Tanggal Berangkat</label>
              <input
                type="date"
                className={input}
                value={search.date}
                onChange={(e) =>
                  setSearch((s) => ({ ...s, date: e.target.value }))
                }
              />
            </div>
            <div>
              <label className={labelCls}>Jumlah Penumpang</label>
              <select
                className={input}
                value={search.passengers}
                onChange={(e) =>
                  setSearch((s) => ({
                    ...s,
                    passengers: Number(e.target.value),
                  }))
                }
              >
                {[1, 2, 3, 4, 5].map((n) => (
                  <option key={n} value={n}>
                    {n} penumpang
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={submitSearch}
            className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700 sm:w-auto"
          >
            <Search className="h-4 w-4" />
            Cari Jadwal
          </button>
        </div>
      )}

      {/* ── Step: Jadwal ── */}
      {step === "schedules" && (
        <div>
          <button
            type="button"
            onClick={() => setStep("search")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Ubah pencarian
          </button>

          <div className="mb-4 flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300">
            <MapPin className="h-4 w-4 text-brand-500" />
            <strong className="font-semibold">{search.origin}</strong>
            <ArrowRight className="h-4 w-4 text-zinc-400" />
            <strong className="font-semibold">{search.destination}</strong>
            <span className="text-zinc-400">·</span>
            <span>{search.date}</span>
            <span className="text-zinc-400">·</span>
            <span>{search.passengers} penumpang</span>
          </div>

          {schedules.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-300 px-4 py-12 text-center text-sm text-zinc-400 dark:border-zinc-700">
              Belum ada rute untuk kota tersebut. Coba kombinasi kota lain
              (mis. Bandung ⇄ Jakarta).
            </p>
          ) : (
            <div className="space-y-3">
              {schedules.map((s) => {
                const enough = s.seatsAvailable >= search.passengers;
                return (
                  <div
                    key={s.id}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                        <Bus className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 font-semibold text-zinc-900 dark:text-white">
                          {s.departure}
                          <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                          {s.arrival}
                        </div>
                        <p className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                          <Clock className="h-3 w-3" />
                          {formatDuration(s.durationMin)} · Trans Nusantara
                        </p>
                      </div>
                    </div>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        s.seatClass === "Eksekutif"
                          ? "bg-amber-100 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"
                          : "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                      }`}
                    >
                      {s.seatClass}
                    </span>

                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {s.seatsAvailable} kursi tersisa
                    </span>

                    <div className="ml-auto flex items-center gap-4">
                      <div className="text-right">
                        <div className="font-bold text-zinc-900 dark:text-white">
                          {rupiah(s.price)}
                        </div>
                        <div className="text-xs text-zinc-400">/ kursi</div>
                      </div>
                      <button
                        type="button"
                        disabled={!enough}
                        onClick={() => chooseSchedule(s)}
                        className="rounded-xl bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Pilih
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── Step: Kursi ── */}
      {step === "seats" && schedule && (
        <div>
          <button
            type="button"
            onClick={() => setStep("schedules")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Ganti jadwal
          </button>

          <div className="grid gap-8 lg:grid-cols-[1fr_260px]">
            <div>
              <h3 className="mb-1 font-semibold text-zinc-900 dark:text-white">
                Pilih Kursi
              </h3>
              <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400">
                Pilih {search.passengers} kursi ({seats.length}/
                {search.passengers} terpilih)
              </p>

              {/* Legenda */}
              <div className="mb-5 flex flex-wrap gap-4 text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded border border-zinc-300 bg-white dark:border-zinc-600 dark:bg-zinc-800" />
                  Tersedia
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded bg-brand-600" />
                  Dipilih
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-4 w-4 rounded bg-zinc-300 dark:bg-zinc-700" />
                  Terisi
                </span>
              </div>

              {/* Seat map */}
              <div className="inline-block rounded-2xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/40">
                <div className="mb-4 flex items-center justify-end gap-1 text-xs text-zinc-400">
                  <Bus className="h-4 w-4" /> Depan
                </div>
                <div className="space-y-2">
                  {Array.from({ length: SEAT_ROWS }, (_, r) => r + 1).map(
                    (row) => (
                      <div key={row} className="flex items-center gap-2">
                        {SEAT_COLUMNS.map((col, ci) => {
                          const seat = `${row}${col}`;
                          const isOccupied = occupied.has(seat);
                          const isSelected = seats.includes(seat);
                          return (
                            <span key={seat} className="flex items-center">
                              {ci === 2 && <span className="w-5" />}
                              <button
                                type="button"
                                disabled={isOccupied}
                                onClick={() => toggleSeat(seat)}
                                className={`flex h-9 w-9 items-center justify-center rounded-lg text-[11px] font-medium transition ${
                                  isOccupied
                                    ? "cursor-not-allowed bg-zinc-300 text-zinc-400 dark:bg-zinc-700 dark:text-zinc-500"
                                    : isSelected
                                      ? "bg-brand-600 text-white"
                                      : "border border-zinc-300 bg-white text-zinc-600 hover:border-brand-400 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                                }`}
                              >
                                {seat}
                              </button>
                            </span>
                          );
                        })}
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>

            {/* Ringkasan */}
            <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <h4 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                Ringkasan
              </h4>
              <dl className="space-y-2 text-sm">
                <Row label="Rute" value={`${schedule.origin} → ${schedule.destination}`} />
                <Row label="Tanggal" value={schedule.date} />
                <Row label="Berangkat" value={`${schedule.departure} WIB`} />
                <Row label="Kelas" value={schedule.seatClass} />
                <Row
                  label="Kursi"
                  value={seats.length ? [...seats].sort().join(", ") : "—"}
                />
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">Total</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  {rupiah(schedule.price * search.passengers)}
                </span>
              </div>
              <button
                type="button"
                onClick={confirmSeats}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                Lanjutkan
                <ArrowRight className="h-4 w-4" />
              </button>
            </aside>
          </div>
        </div>
      )}

      {/* ── Step: Data penumpang ── */}
      {step === "passenger" && schedule && (
        <div>
          <button
            type="button"
            onClick={() => setStep("seats")}
            className="mb-5 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition hover:text-brand-500 dark:text-zinc-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Ganti kursi
          </button>

          <div className="grid gap-6 lg:grid-cols-[1fr_260px]">
            <div className="space-y-4 rounded-2xl border border-zinc-200 bg-white p-5 sm:p-6 dark:border-zinc-800 dark:bg-zinc-950">
              <h3 className="font-semibold text-zinc-900 dark:text-white">
                Data Pemesan
              </h3>
              <div>
                <label className={labelCls}>Nama Lengkap</label>
                <input
                  className={input}
                  value={passenger.name}
                  onChange={(e) =>
                    setPassenger((p) => ({ ...p, name: e.target.value }))
                  }
                  placeholder="Nama sesuai identitas"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={labelCls}>Nomor Telepon</label>
                  <input
                    className={input}
                    value={passenger.phone}
                    onChange={(e) =>
                      setPassenger((p) => ({ ...p, phone: e.target.value }))
                    }
                    placeholder="08xxxxxxxxxx"
                  />
                </div>
                <div>
                  <label className={labelCls}>Email (opsional)</label>
                  <input
                    className={input}
                    value={passenger.email}
                    onChange={(e) =>
                      setPassenger((p) => ({ ...p, email: e.target.value }))
                    }
                    placeholder="email@contoh.com"
                  />
                </div>
              </div>
            </div>

            <aside className="h-fit rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-950">
              <h4 className="mb-4 font-semibold text-zinc-900 dark:text-white">
                Ringkasan
              </h4>
              <dl className="space-y-2 text-sm">
                <Row label="Rute" value={`${schedule.origin} → ${schedule.destination}`} />
                <Row label="Tanggal" value={schedule.date} />
                <Row label="Berangkat" value={`${schedule.departure} WIB`} />
                <Row label="Kursi" value={[...seats].sort().join(", ")} />
                <Row label="Penumpang" value={`${search.passengers} orang`} />
              </dl>
              <div className="mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 dark:border-zinc-800">
                <span className="text-sm text-zinc-500">Total</span>
                <span className="text-lg font-bold text-zinc-900 dark:text-white">
                  {rupiah(total)}
                </span>
              </div>
              <button
                type="button"
                onClick={submitPassenger}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                <Ticket className="h-4 w-4" />
                Pesan Tiket
              </button>
            </aside>
          </div>
        </div>
      )}

      {/* ── Step: E-tiket ── */}
      {step === "ticket" && schedule && code && (
        <div className="mx-auto max-w-md">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
              Pemesanan Berhasil!
            </h3>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              E-tiket kamu sudah terbit.
            </p>
          </div>

          {/* Tiket */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex items-center justify-between bg-gradient-to-br from-brand-600 to-fuchsia-600 p-5 text-white">
              <div className="flex items-center gap-2">
                <Bus className="h-5 w-5" />
                <span className="font-bold">Trans Nusantara</span>
              </div>
              <span className="rounded-full bg-white/20 px-2.5 py-1 text-xs font-medium backdrop-blur">
                {schedule.seatClass}
              </span>
            </div>

            <div className="p-5">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {schedule.departure}
                  </div>
                  <div className="text-xs text-zinc-500">{schedule.origin}</div>
                </div>
                <div className="flex flex-1 flex-col items-center px-3">
                  <span className="text-[11px] text-zinc-400">
                    {formatDuration(schedule.durationMin)}
                  </span>
                  <div className="my-1 h-px w-full bg-zinc-200 dark:bg-zinc-700" />
                  <Bus className="h-4 w-4 text-brand-500" />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                    {schedule.arrival}
                  </div>
                  <div className="text-xs text-zinc-500">
                    {schedule.destination}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-dashed border-zinc-200 pt-4 text-sm dark:border-zinc-700">
                <Info label="Kode Booking" value={code} strong />
                <Info label="Tanggal" value={schedule.date} />
                <Info label="Penumpang" value={passenger.name} />
                <Info label="Kursi" value={[...seats].sort().join(", ")} />
                <Info label="Jumlah" value={`${search.passengers} orang`} />
                <Info label="Total" value={rupiah(total)} strong />
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={reset}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            <Repeat className="h-4 w-4" />
            Pesan Tiket Lain
          </button>
        </div>
      )}

      <p className="mt-8 text-xs text-zinc-400 dark:text-zinc-500">
        * Demo prototipe. Jadwal, harga, dan ketersediaan kursi adalah data
        contoh — tidak ada pembayaran atau pemesanan sungguhan yang diproses.
      </p>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <dt className="text-zinc-500 dark:text-zinc-400">{label}</dt>
      <dd className="text-right font-medium text-zinc-800 dark:text-zinc-200">
        {value}
      </dd>
    </div>
  );
}

function Info({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <div className="text-xs text-zinc-400">{label}</div>
      <div
        className={`${strong ? "font-bold" : "font-medium"} text-zinc-900 dark:text-white`}
      >
        {value}
      </div>
    </div>
  );
}
