"use client";

import type { Asset } from "@/lib/api/types";

export default function Donut({ assets }: { assets: Asset[] }) {
  const total = assets.reduce((s, a) => s + a.balance * a.priceUsd, 0) || 1;
  const r = 54;
  const c = 2 * Math.PI * r;
  let off = 0;
  return (
    <svg viewBox="0 0 160 160" width="160" height="160">
      <circle cx="80" cy="80" r={r} fill="none" stroke="#241f18" strokeWidth="16" />
      {assets.map((a) => {
        const pct = (a.balance * a.priceUsd) / total;
        const dash = pct * c;
        const el = (
          <circle
            key={a.symbol}
            cx="80"
            cy="80"
            r={r}
            fill="none"
            stroke={a.color}
            strokeWidth="16"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={-off}
            transform="rotate(-90 80 80)"
          />
        );
        off += dash;
        return el;
      })}
    </svg>
  );
}
