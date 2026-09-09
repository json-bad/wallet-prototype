"use client";

export default function Marquee() {
  const items = ["BTC 67 240", "ETH 3 482", "SOL 148.4", "USDT 1.00", "LNX 0.42", "— demo feed —"];
  const row = [...items, ...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {row.map((x, i) => (
          <span key={i}>{x}</span>
        ))}
      </div>
    </div>
  );
}
