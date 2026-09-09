/**
 * Пример: скопируйте в client.ts вместо mockApi.
 *
 * const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.example.com";
 *
 * async function req<T>(path: string, init?: RequestInit): Promise<T> {
 *   const token = typeof window !== "undefined" ? localStorage.getItem("lunex_token") : null;
 *   const res = await fetch(`${API_BASE}${path}`, {
 *     ...init,
 *     headers: {
 *       "Content-Type": "application/json",
 *       ...(token ? { Authorization: `Bearer ${token}` } : {}),
 *       ...init?.headers,
 *     },
 *   });
 *   if (!res.ok) throw new Error(await res.text());
 *   return res.json();
 * }
 *
 * export const httpApi: WalletApi = {
 *   login: (p) => req("/auth/login", { method: "POST", body: JSON.stringify(p) }),
 *   logout: () => req("/auth/logout", { method: "POST" }),
 *   me: () => req("/me"),
 *   portfolio: () => req("/portfolio"),
 *   transactions: () => req("/transactions"),
 *   send: (p) => req("/send", { method: "POST", body: JSON.stringify(p) }),
 * };
 */
export {};
