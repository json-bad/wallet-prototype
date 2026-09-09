import type {
  AssetSymbol,
  AuthSession,
  ChartPoint,
  LoginPayload,
  Portfolio,
  Range,
  SendPayload,
  SparkPoint,
  Transaction,
  User,
  WalletApi,
} from "./types";

const delay = (ms = 380) => new Promise((r) => setTimeout(r, ms));

const USER: User = {
  id: "u_lunex_01",
  name: "Aria Novak",
  email: "aria@lunex.demo",
  address: "lnx1q9f2k7m4p8s3w6e1r5t0y2u",
  kyc: "verified",
};

let assets = [
  { symbol: "BTC" as const, name: "Bitcoin", balance: 0.8421, priceUsd: 67240, change24h: 1.8, color: "#c56a2d" },
  { symbol: "ETH" as const, name: "Ethereum", balance: 12.44, priceUsd: 3482, change24h: -0.6, color: "#8a8478" },
  { symbol: "SOL" as const, name: "Solana", balance: 186.2, priceUsd: 148.4, change24h: 4.2, color: "#d8c3a5" },
  { symbol: "USDT" as const, name: "Tether", balance: 8420, priceUsd: 1, change24h: 0.01, color: "#5c6b52" },
  { symbol: "LNX" as const, name: "LuneX", balance: 12500, priceUsd: 0.42, change24h: 8.4, color: "#e8e0d4" },
];

let txs: Transaction[] = [
  { id: "tx_1", type: "in", asset: "BTC", amount: 0.12, usd: 8068, counterparty: "lnx1q…k9a2", status: "confirmed", createdAt: "2026-09-08T14:22:00Z" },
  { id: "tx_2", type: "out", asset: "ETH", amount: 1.4, usd: 4874, counterparty: "0x8f…c21d", status: "confirmed", createdAt: "2026-09-07T09:10:00Z" },
  { id: "tx_3", type: "swap", asset: "SOL", amount: 40, usd: 5936, counterparty: "LuneX DEX", status: "confirmed", createdAt: "2026-09-06T18:41:00Z" },
  { id: "tx_4", type: "in", asset: "USDT", amount: 2500, usd: 2500, counterparty: "Payroll", status: "pending", createdAt: "2026-09-09T08:02:00Z" },
  { id: "tx_5", type: "out", asset: "LNX", amount: 800, usd: 336, counterparty: "lnx1q…m4p8", status: "confirmed", createdAt: "2026-09-04T11:55:00Z" },
];

function portfolio(): Portfolio {
  const totalUsd = assets.reduce((s, a) => s + a.balance * a.priceUsd, 0);
  const weighted = assets.reduce((s, a) => s + a.change24h * a.balance * a.priceUsd, 0);
  return { totalUsd, change24hPct: weighted / totalUsd, assets: [...assets] };
}

function makeHistory(days: number): ChartPoint[] {
  const out: ChartPoint[] = [];
  let eq = 92000;
  for (let i = days; i >= 0; i--) {
    const d = new Date("2026-09-09T12:00:00Z");
    d.setDate(d.getDate() - i);
    eq += Math.sin(i / 3) * 420 + (Math.random() - 0.42) * 900;
    out.push({
      t: d.toISOString().slice(0, 10),
      equity: Math.round(eq),
      volume: Math.round(1200 + Math.abs(Math.sin(i / 2)) * 4800),
    });
  }
  return out;
}

function spark(): SparkPoint[] {
  let v = 50;
  return Array.from({ length: 24 }, () => {
    v += (Math.random() - 0.45) * 6;
    return { v: Math.max(8, v) };
  });
}

export const mockApi: WalletApi = {
  async login(_payload: LoginPayload): Promise<AuthSession> {
    await delay();
    if (typeof window !== "undefined") localStorage.setItem("lunex_token", "demo-token");
    return { token: "demo-token", user: USER };
  },
  async logout() {
    await delay(120);
    if (typeof window !== "undefined") localStorage.removeItem("lunex_token");
  },
  async me() {
    await delay(180);
    if (typeof window !== "undefined" && !localStorage.getItem("lunex_token")) throw new Error("UNAUTH");
    return USER;
  },
  async portfolio() {
    await delay();
    return portfolio();
  },
  async transactions() {
    await delay();
    return [...txs];
  },
  async history(range: Range) {
    await delay();
    const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
    return makeHistory(days);
  },
  async sparks() {
    await delay(200);
    const map = {} as Record<AssetSymbol, SparkPoint[]>;
    for (const a of assets) map[a.symbol] = spark();
    return map;
  },
  async send(payload: SendPayload) {
    await delay(700);
    const asset = assets.find((a) => a.symbol === payload.asset);
    if (!asset || asset.balance < payload.amount) throw new Error("INSUFFICIENT");
    asset.balance -= payload.amount;
    const tx: Transaction = {
      id: `tx_${Date.now()}`,
      type: "out",
      asset: payload.asset,
      amount: payload.amount,
      usd: payload.amount * asset.priceUsd,
      counterparty: payload.to,
      status: "pending",
      createdAt: new Date().toISOString(),
    };
    txs = [tx, ...txs];
    return tx;
  },
};
