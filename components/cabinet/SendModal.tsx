"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { api } from "@/lib/api";
import type { Asset, AssetSymbol } from "@/lib/api/types";

export default function SendModal({
  assets,
  onClose,
  onDone,
}: {
  assets: Asset[];
  onClose: () => void;
  onDone: () => void;
}) {
  const t = useTranslations("cabinet");
  const [to, setTo] = useState("lnx1q…demo");
  const [amount, setAmount] = useState("0.01");
  const [asset, setAsset] = useState<AssetSymbol>(assets[0]?.symbol ?? "BTC");
  const [msg, setMsg] = useState("");

  async function send() {
    setMsg("");
    try {
      await api.send({ asset, to, amount: Number(amount) });
      onDone();
      onClose();
    } catch {
      setMsg(t("fail"));
    }
  }

  return (
    <div className="modal-bg" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="k">{t("sendTitle")}</div>
        <h2 style={{ fontFamily: "var(--serif)", fontWeight: 400, margin: "8px 0 8px" }}>{t("sendTitle")}</h2>
        <p className="lede" style={{ fontSize: 14 }}>
          {t("sendLead")}
        </p>
        <div className="field">
          <label>{t("asset")}</label>
          <select value={asset} onChange={(e) => setAsset(e.target.value as AssetSymbol)}>
            {assets.map((a) => (
              <option key={a.symbol} value={a.symbol}>
                {a.symbol}
              </option>
            ))}
          </select>
        </div>
        <div className="field">
          <label>{t("address")}</label>
          <input value={to} onChange={(e) => setTo(e.target.value)} />
        </div>
        <div className="field">
          <label>{t("amount")}</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
        {msg && <p className="neg" style={{ marginTop: 10, fontSize: 13 }}>{msg}</p>}
        <button className="btn btn-fill" style={{ marginTop: 22, width: "100%" }} onClick={send}>
          {t("confirm")}
        </button>
      </div>
    </div>
  );
}
