"use client";

import type { ChartPoint } from "@/lib/api/types";

export default function AreaChart({ data }: { data: ChartPoint[] }) {
  if (!data.length) return <div style={{ height: 220 }} />;
  const w = 640;
  const h = 220;
  const pad = 8;
  const min = Math.min(...data.map((d) => d.equity));
  const max = Math.max(...data.map((d) => d.equity));
  const xs = (i: number) => pad + (i / (data.length - 1)) * (w - pad * 2);
  const ys = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const line = data.map((d, i) => `${i ? "L" : "M"}${xs(i)},${ys(d.equity)}`).join(" ");
  const area = `${line} L${xs(data.length - 1)},${h - pad} L${xs(0)},${h - pad} Z`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} width="100%" height="220" role="img">
      <path d={area} fill="rgba(197,106,45,0.16)" />
      <path d={line} fill="none" stroke="#c56a2d" strokeWidth="1.6" />
    </svg>
  );
}
