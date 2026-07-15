// ─────────────────────────────────────────────────────────────
//  Data contoh saham IDX untuk demo Stock Screener.
//  CATATAN: angka di bawah adalah DATA DUMMY untuk demonstrasi,
//  bukan data pasar real-time.
// ─────────────────────────────────────────────────────────────

export type Stock = {
  ticker: string;
  name: string;
  sector: string;
  price: number; // IDR
  change: number; // perubahan harian dalam %
  marketCap: number; // kapitalisasi pasar dalam triliun IDR
  per: number | null; // Price to Earnings Ratio (null = rugi / N/A)
  pbv: number; // Price to Book Value
  roe: number; // Return on Equity dalam %
  dividendYield: number; // dividend yield dalam %
};

export const sectors = [
  "Perbankan",
  "Telekomunikasi",
  "Konsumer",
  "Kesehatan",
  "Energi",
  "Pertambangan",
  "Infrastruktur",
  "Properti",
  "Otomotif",
  "Teknologi",
] as const;

export const stocks: Stock[] = [
  { ticker: "BBCA", name: "Bank Central Asia", sector: "Perbankan", price: 10200, change: 0.8, marketCap: 1257, per: 24.5, pbv: 5.1, roe: 21.3, dividendYield: 2.6 },
  { ticker: "BBRI", name: "Bank Rakyat Indonesia", sector: "Perbankan", price: 4520, change: 1.2, marketCap: 685, per: 12.8, pbv: 2.5, roe: 19.8, dividendYield: 6.1 },
  { ticker: "BMRI", name: "Bank Mandiri", sector: "Perbankan", price: 6900, change: -0.5, marketCap: 644, per: 11.2, pbv: 2.3, roe: 22.1, dividendYield: 5.8 },
  { ticker: "BBNI", name: "Bank Negara Indonesia", sector: "Perbankan", price: 5450, change: 0.3, marketCap: 203, per: 9.4, pbv: 1.3, roe: 14.2, dividendYield: 4.9 },
  { ticker: "TLKM", name: "Telkom Indonesia", sector: "Telekomunikasi", price: 3150, change: -1.1, marketCap: 312, per: 13.6, pbv: 2.6, roe: 19.5, dividendYield: 4.8 },
  { ticker: "ISAT", name: "Indosat Ooredoo Hutchison", sector: "Telekomunikasi", price: 10500, change: 2.3, marketCap: 84, per: 18.2, pbv: 2.9, roe: 16.1, dividendYield: 2.1 },
  { ticker: "EXCL", name: "XL Axiata", sector: "Telekomunikasi", price: 2380, change: 0.9, marketCap: 31, per: 22.4, pbv: 1.4, roe: 6.3, dividendYield: 1.8 },
  { ticker: "ASII", name: "Astra International", sector: "Otomotif", price: 5100, change: -0.4, marketCap: 206, per: 7.2, pbv: 1.1, roe: 15.4, dividendYield: 6.5 },
  { ticker: "UNVR", name: "Unilever Indonesia", sector: "Konsumer", price: 2950, change: -2.1, marketCap: 113, per: 22.8, pbv: 28.5, roe: 92.4, dividendYield: 5.2 },
  { ticker: "ICBP", name: "Indofood CBP Sukses Makmur", sector: "Konsumer", price: 11800, change: 0.6, marketCap: 138, per: 15.3, pbv: 3.2, roe: 21.6, dividendYield: 2.3 },
  { ticker: "INDF", name: "Indofood Sukses Makmur", sector: "Konsumer", price: 6650, change: 0.2, marketCap: 58, per: 6.8, pbv: 1.0, roe: 14.1, dividendYield: 4.5 },
  { ticker: "MYOR", name: "Mayora Indah", sector: "Konsumer", price: 2620, change: 1.5, marketCap: 59, per: 26.1, pbv: 4.3, roe: 17.2, dividendYield: 1.6 },
  { ticker: "HMSP", name: "HM Sampoerna", sector: "Konsumer", price: 745, change: -0.7, marketCap: 87, per: 12.1, pbv: 3.8, roe: 30.5, dividendYield: 8.4 },
  { ticker: "GGRM", name: "Gudang Garam", sector: "Konsumer", price: 18500, change: 0.4, marketCap: 36, per: 9.6, pbv: 0.9, roe: 9.8, dividendYield: 5.1 },
  { ticker: "KLBF", name: "Kalbe Farma", sector: "Kesehatan", price: 1620, change: 0.9, marketCap: 76, per: 24.3, pbv: 3.6, roe: 15.3, dividendYield: 2.0 },
  { ticker: "SIDO", name: "Sido Muncul", sector: "Kesehatan", price: 640, change: 1.1, marketCap: 19, per: 18.9, pbv: 6.1, roe: 32.4, dividendYield: 4.2 },
  { ticker: "MIKA", name: "Mitra Keluarga Karyasehat", sector: "Kesehatan", price: 2790, change: -0.3, marketCap: 40, per: 38.7, pbv: 6.8, roe: 18.1, dividendYield: 1.2 },
  { ticker: "ADRO", name: "Adaro Energy Indonesia", sector: "Energi", price: 2750, change: 3.2, marketCap: 88, per: 4.1, pbv: 0.9, roe: 24.6, dividendYield: 12.3 },
  { ticker: "PTBA", name: "Bukit Asam", sector: "Energi", price: 2680, change: 2.1, marketCap: 31, per: 6.9, pbv: 1.7, roe: 25.1, dividendYield: 9.8 },
  { ticker: "ITMG", name: "Indo Tambangraya Megah", sector: "Energi", price: 26500, change: 1.8, marketCap: 30, per: 5.2, pbv: 1.3, roe: 26.8, dividendYield: 11.5 },
  { ticker: "PGAS", name: "Perusahaan Gas Negara", sector: "Energi", price: 1585, change: -0.6, marketCap: 38, per: 8.4, pbv: 0.9, roe: 11.2, dividendYield: 6.7 },
  { ticker: "ANTM", name: "Aneka Tambang", sector: "Pertambangan", price: 1720, change: 2.6, marketCap: 41, per: 13.7, pbv: 1.9, roe: 14.8, dividendYield: 3.1 },
  { ticker: "INCO", name: "Vale Indonesia", sector: "Pertambangan", price: 3900, change: -1.3, marketCap: 39, per: 15.2, pbv: 1.2, roe: 8.4, dividendYield: 1.4 },
  { ticker: "MDKA", name: "Merdeka Copper Gold", sector: "Pertambangan", price: 2410, change: 4.1, marketCap: 59, per: 45.3, pbv: 3.4, roe: 4.2, dividendYield: 0.0 },
  { ticker: "TINS", name: "Timah", sector: "Pertambangan", price: 1045, change: 3.7, marketCap: 8, per: 32.1, pbv: 1.1, roe: 3.8, dividendYield: 0.0 },
  { ticker: "SMGR", name: "Semen Indonesia", sector: "Infrastruktur", price: 3980, change: -0.9, marketCap: 24, per: 14.6, pbv: 0.8, roe: 6.1, dividendYield: 3.4 },
  { ticker: "INTP", name: "Indocement Tunggal Prakarsa", sector: "Infrastruktur", price: 7250, change: 0.3, marketCap: 27, per: 15.8, pbv: 1.4, roe: 9.2, dividendYield: 3.8 },
  { ticker: "JSMR", name: "Jasa Marga", sector: "Infrastruktur", price: 4870, change: 1.4, marketCap: 35, per: 9.1, pbv: 1.2, roe: 13.6, dividendYield: 2.9 },
  { ticker: "BSDE", name: "Bumi Serpong Damai", sector: "Properti", price: 1080, change: 0.5, marketCap: 23, per: 7.3, pbv: 0.6, roe: 8.9, dividendYield: 0.9 },
  { ticker: "CTRA", name: "Ciputra Development", sector: "Properti", price: 1310, change: 1.0, marketCap: 24, per: 11.8, pbv: 1.0, roe: 9.4, dividendYield: 1.3 },
  { ticker: "GOTO", name: "GoTo Gojek Tokopedia", sector: "Teknologi", price: 68, change: 5.2, marketCap: 82, per: null, pbv: 1.8, roe: -8.5, dividendYield: 0.0 },
  { ticker: "BUKA", name: "Bukalapak.com", sector: "Teknologi", price: 130, change: 2.4, marketCap: 13, per: null, pbv: 0.7, roe: -4.2, dividendYield: 0.0 },
  { ticker: "EMTK", name: "Elang Mahkota Teknologi", sector: "Teknologi", price: 448, change: -1.8, marketCap: 27, per: 38.4, pbv: 1.5, roe: 3.9, dividendYield: 0.5 },
];
