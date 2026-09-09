"use client";

import type { ChartPoint } from "@/lib/api/types";

export default function BarChart({ data }: { data: ChartPoint[] }) {
  const slice = data.slice(-14);
  if (!slice.length) return null;
  const max = Math.max(...slice.map((d) => d.volume));
  return (
    <svg viewBox="0 0 320 160" width="100%" height="160">
      {slice.map((d, i) => {
        const bw = 320 / slice.length;
        const bh = (d.volume / max) * 140;
        return <rect key={d.t} x={i * bw + 3} y={150 - bh} width={bw - 6} height={bh} fill={i % 2 ? "#c56a2d" : "#8a8478"} />;
      })}
    </svg>
  );
}
