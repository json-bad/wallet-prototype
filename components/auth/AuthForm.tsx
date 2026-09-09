"use client";

import { FormEvent, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import { api } from "@/lib/api";
import Logo from "@/components/brand/Logo";

export default function AuthForm() {
  const t = useTranslations("auth");
  const router = useRouter();
  const [email, setEmail] = useState("aria@lunex.demo");
  const [password, setPassword] = useState("demo-pass");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr("");
    try {
      await api.login({ email, password });
      router.push("/cabinet");
    } catch {
      setErr(t("error"));
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-visual">
        <img src="/visuals/eclipse.jpg" alt="" />
      </div>
      <div className="auth-panel">
        <form className="auth-card" onSubmit={onSubmit}>
          <Link href="/" className="brand" style={{ marginBottom: 28 }}>
            <Logo />
            LuneX
          </Link>
          <div className="idx">{t("title")}</div>
          <h1>{t("title")}</h1>
          <p className="lede" style={{ fontSize: 15, marginTop: 8 }}>
            {t("lead")}
          </p>
          <div className="field">
            <label htmlFor="email">{t("email")}</label>
            <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" required />
          </div>
          <div className="field">
            <label htmlFor="password">{t("password")}</label>
            <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" required />
          </div>
          {err && <p className="neg" style={{ marginTop: 10, fontSize: 13 }}>{err}</p>}
          <button className="btn btn-fill" style={{ width: "100%", marginTop: 28 }} disabled={busy}>
            {busy ? t("busy") : t("submit")}
          </button>
          <p className="note">{t("note")}</p>
        </form>
      </div>
    </div>
  );
}
