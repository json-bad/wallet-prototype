/**
 * Точка входа API. Замените mockApi своей реализацией WalletApi.
 * NEXT_PUBLIC_API_BASE_URL
 */
import { mockApi } from "./mock";
import type { WalletApi } from "./types";

export const api: WalletApi = mockApi;
export const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/api";
export type { WalletApi } from "./types";
