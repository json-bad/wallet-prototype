"use client";

import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { api } from "@/lib/api";
import { money } from "@/lib/format";
import type { ChartPoint, Portfolio, Range, SparkPoint, Transaction, AssetSymbol } from "@/lib/api/types";
import Sidebar from "./Sidebar";
import SendModal from "./SendModal";
import AreaChart from "@/components/charts/AreaChart";
import BarChart from "@/components/charts/BarChart";
import Donut from "@/components/charts/Donut";
import Sparkline from "@/components/charts/Sparkline";

export default function CabinetApp() {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const router = useRouter();
  const [pf, setPf] = useState<Portfolio | null>(null);
  const [txs, setTxs] = useState<Transaction[]>([]);
  const [hist, setHist] = useState<ChartPoint[]>([]);
  const [sparks, setSparks] = useState<Partial<Record<AssetSymbol, SparkPoint[]>>>({});
  const [range, setRange] = useState<Range>("30d");
  const [open, setOpen] = useState(false);

  async function load(r = range) {
    const [p, x, h, s] = await Promise.all([api.portfolio(), api.transactions(), api.history(r), api.sparks()]);
    setPf(p);
    setTxs(x);
    setHist(h);
    setSparks(s);
  }

  useEffect(() => {
    if (typeof window !== "undefined" && !localStorage.getItem("lunex_token")) {
      router.replace("/auth");
      return;
    }
    load().catch(() => router.replace("/auth"));
  }, []);

  useEffect(() => {
    if (pf) api.history(range).then(setHist);
  }, [range]);

  const typeLabel = (ty: Transaction["type"]) => (ty === "in" ? t("in") : ty === "out" ? t("out") : t("swap"));

  return (
    <div className="shell">
      <Sidebar onSend={() => setOpen(true)} />
      <section className="main">
        <div className="row-between">
          <div>
            <div className="k">{t("portfolio")}</div>
            <div className="bal">{pf ? money(pf.totalUsd, locale === "ru" ? "ru-RU" : "en-US") : "—"}</div>
            {pf && (
              <div className={pf.change24hPct >= 0 ? "pos" : "neg"} style={{ fontFamily: "var(--mono)", fontSize: 13 }}>
                {pf.change24hPct >= 0 ? "+" : ""}
                {pf.change24hPct.toFixed(2)}% {t("change24")}
              </div>
            )}
          </div>
          <button className="btn btn-fill" onClick={() => setOpen(true)}>
            {t("send")}
          </button>
        </div>

        <div className="dash-grid">
          <div className="panel">
            <div className="row-between">
              <h3>{t("equity")}</h3>
              <div className="range">
                {(["7d", "30d", "90d"] as Range[]).map((r) => (
                  <button key={r} className={r === range ? "on" : ""} onClick={() => setRange(r)}>
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <AreaChart data={hist} />
          </div>
          <div className="panel">
            <h3>{t("alloc")}</h3>
            <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
              {pf && <Donut assets={pf.assets} />}
              <ul style={{ listStyle: "none", fontSize: 13, display: "grid", gap: 6 }}>
                {pf?.assets.map((a) => (
                  <li key={a.symbol} style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <i style={{ width: 8, height: 8, background: a.color, display: "inline-block" }} />
                    {a.symbol}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="dash-grid">
          <div className="panel">
            <h3>{t("volume")}</h3>
            <BarChart data={hist} />
          </div>
          <div className="panel">
            <h3>{t("assets")}</h3>
            <div className="assets" style={{ border: 0 }}>
              {pf?.assets.map((a) => (
                <div className="asset" key={a.symbol} style={{ border: 0, padding: "8px 0" }}>
                  <span className="sym">{a.symbol}</span>
                  <span>
                    {a.balance}
                    <div style={{ color: "var(--bone-dim)", fontSize: 12 }}>{a.name}</div>
                  </span>
                  <Sparkline data={sparks[a.symbol] ?? []} color={a.color} />
                  <span className={a.change24h >= 0 ? "pos" : "neg"}>
                    {a.change24h >= 0 ? "+" : ""}
                    {a.change24h}%
                  </span>
                  <span>{money(a.balance * a.priceUsd)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h3 style={{ margin: "28px 0 10px", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--bone-dim)" }}>
          {t("ops")}
        </h3>
        <div className="panel" style={{ padding: 8 }}>
          <table className="table">
            <thead>
              <tr>
                <th>{t("type")}</th>
                <th>{t("asset")}</th>
                <th>{t("amount")}</th>
                <th>{t("counterparty")}</th>
                <th>{t("status")}</th>
              </tr>
            </thead>
            <tbody>
              {txs.map((row) => (
                <tr key={row.id}>
                  <td>{typeLabel(row.type)}</td>
                  <td>{row.asset}</td>
                  <td>
                    {row.amount} · {money(row.usd)}
                  </td>
                  <td>{row.counterparty}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="note">{t("demoNote")}</p>
      </section>
      {open && pf && <SendModal assets={pf.assets} onClose={() => setOpen(false)} onDone={() => load()} />}
    </div>
  );
}
