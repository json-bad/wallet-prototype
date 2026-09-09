export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://lunex-wallet.example";

export function absUrl(path = "") {
  return new URL(path, SITE_URL).toString();
}
