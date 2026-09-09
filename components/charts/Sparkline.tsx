"use client";

import type { SparkPoint } from "@/lib/api/types";

export default function Sparkline({ data, color = "#c56a2d" }: { data: SparkPoint[]; color?: string }) {
  if (!data.length) return null;
  const w = 88;
  const h = 28;
  const min = Math.min(...data.map((d) => d.v));
  const max = Math.max(...data.map((d) => d.v));
  const d = data
    .map((p, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((p.v - min) / (max - min || 1)) * h;
      return `${i ? "L" : "M"}${x},${y}`;
    })
    .join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
      <path d={d} fill="none" stroke={color} strokeWidth="1.3" />
    </svg>
  );
}
