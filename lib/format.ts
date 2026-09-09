export const money = (n: number, locale = "en-US") =>
  n.toLocaleString(locale, { style: "currency", currency: "USD", maximumFractionDigits: 2 });

export const compact = (n: number) =>
  n.toLocaleString("en-US", { notation: "compact", maximumFractionDigits: 1 });
