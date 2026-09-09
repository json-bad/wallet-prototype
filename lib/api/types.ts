export type AssetSymbol = "BTC" | "ETH" | "SOL" | "USDT" | "LNX";
export type Range = "7d" | "30d" | "90d";

export interface Asset {
  symbol: AssetSymbol;
  name: string;
  balance: number;
  priceUsd: number;
  change24h: number;
  color: string;
}

export interface Transaction {
  id: string;
  type: "in" | "out" | "swap";
  asset: AssetSymbol;
  amount: number;
  usd: number;
  counterparty: string;
  status: "confirmed" | "pending" | "failed";
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  kyc: "none" | "pending" | "verified";
}

export interface Portfolio {
  totalUsd: number;
  change24hPct: number;
  assets: Asset[];
}

export interface ChartPoint {
  t: string;
  equity: number;
  volume: number;
}

export interface SparkPoint {
  v: number;
}

export interface AuthSession {
  token: string;
  user: User;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SendPayload {
  asset: AssetSymbol;
  to: string;
  amount: number;
}

export interface WalletApi {
  login(payload: LoginPayload): Promise<AuthSession>;
  logout(): Promise<void>;
  me(): Promise<User>;
  portfolio(): Promise<Portfolio>;
  transactions(): Promise<Transaction[]>;
  history(range: Range): Promise<ChartPoint[]>;
  sparks(): Promise<Record<AssetSymbol, SparkPoint[]>>;
  send(payload: SendPayload): Promise<Transaction>;
}
