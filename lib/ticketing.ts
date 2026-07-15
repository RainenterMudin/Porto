// ─────────────────────────────────────────────────────────────
//  Data & helper untuk demo sistem Ticketing travel/shuttle.
//  Seluruh data di sini adalah CONTOH (dummy) untuk demonstrasi,
//  bukan jadwal atau harga sungguhan, dan tidak memproses
//  pembayaran nyata.
// ─────────────────────────────────────────────────────────────

export const cities = [
  "Bandung",
  "Jakarta",
  "Bogor",
  "Bekasi",
  "Subang",
  "Cirebon",
  "Tasikmalaya",
  "Sumedang",
] as const;

export type Route = {
  origin: string;
  destination: string;
  durationMin: number;
  price: number;
};

const baseRoutes: Route[] = [
  { origin: "Bandung", destination: "Jakarta", durationMin: 180, price: 120000 },
  { origin: "Bandung", destination: "Subang", durationMin: 90, price: 55000 },
  { origin: "Bandung", destination: "Bogor", durationMin: 210, price: 130000 },
  { origin: "Bandung", destination: "Cirebon", durationMin: 180, price: 110000 },
  { origin: "Bandung", destination: "Bekasi", durationMin: 180, price: 115000 },
  { origin: "Bandung", destination: "Tasikmalaya", durationMin: 150, price: 85000 },
  { origin: "Bandung", destination: "Sumedang", durationMin: 75, price: 45000 },
  { origin: "Subang", destination: "Jakarta", durationMin: 150, price: 95000 },
];

export const routes: Route[] = [
  ...baseRoutes,
  ...baseRoutes.map((r) => ({
    origin: r.destination,
    destination: r.origin,
    durationMin: r.durationMin,
    price: r.price,
  })),
];

export function findRoute(origin: string, destination: string) {
  return routes.find(
    (r) => r.origin === origin && r.destination === destination,
  );
}

export type SeatClass = "Reguler" | "Eksekutif";

export type Schedule = {
  id: string;
  origin: string;
  destination: string;
  date: string; // YYYY-MM-DD
  departure: string; // "06:00"
  arrival: string; // "09:00"
  durationMin: number;
  price: number;
  seatClass: SeatClass;
  seatsTotal: number;
  seatsAvailable: number;
};

const DEPARTURE_TIMES = ["06:00", "08:30", "11:00", "13:30", "16:00", "19:00"];

// ── Format helper ────────────────────────────────────────────
export const rupiah = (n: number) =>
  "Rp " + new Intl.NumberFormat("id-ID").format(n);

export function formatDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = min % 60;
  return m === 0 ? `${h}j` : `${h}j ${m}m`;
}

function addMinutes(time: string, add: number) {
  const [h, m] = time.split(":").map(Number);
  const total = (h * 60 + m + add) % (24 * 60);
  const hh = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const mm = (total % 60).toString().padStart(2, "0");
  return `${hh}:${mm}`;
}

// ── PRNG deterministik (mulberry32) ──────────────────────────
function hashString(str: string) {
  let h = 1779033703 ^ str.length;
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ── Seat map ─────────────────────────────────────────────────
export const SEAT_COLUMNS = ["A", "B", "C", "D"] as const;
export const SEAT_ROWS = 10;
export const SEAT_TOTAL = SEAT_COLUMNS.length * SEAT_ROWS; // 40

export function allSeats(): string[] {
  const seats: string[] = [];
  for (let r = 1; r <= SEAT_ROWS; r++) {
    for (const c of SEAT_COLUMNS) seats.push(`${r}${c}`);
  }
  return seats;
}

/** Kursi yang sudah terisi (deterministik per jadwal). */
export function occupiedSeats(scheduleId: string): Set<string> {
  const rand = mulberry32(hashString(scheduleId));
  const occupied = new Set<string>();
  for (const seat of allSeats()) {
    if (rand() < 0.35) occupied.add(seat);
  }
  return occupied;
}

export function getSchedules(
  origin: string,
  destination: string,
  date: string,
): Schedule[] {
  const route = findRoute(origin, destination);
  if (!route) return [];

  return DEPARTURE_TIMES.map((departure, i) => {
    const seatClass: SeatClass = i % 2 === 0 ? "Reguler" : "Eksekutif";
    const price = seatClass === "Eksekutif" ? route.price + 25000 : route.price;
    const id = `${origin}-${destination}-${date}-${departure}`;
    const occupied = occupiedSeats(id).size;
    return {
      id,
      origin,
      destination,
      date,
      departure,
      arrival: addMinutes(departure, route.durationMin),
      durationMin: route.durationMin,
      price,
      seatClass,
      seatsTotal: SEAT_TOTAL,
      seatsAvailable: SEAT_TOTAL - occupied,
    };
  });
}

export function bookingCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++)
    code += chars[Math.floor(Math.random() * chars.length)];
  return `TN-${code}`;
}
