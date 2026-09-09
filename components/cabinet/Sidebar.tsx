"use client";

import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";
import LangSwitch from "@/components/i18n/LangSwitch";
import { api } from "@/lib/api";

export default function Sidebar({ onSend }: { onSend: () => void }) {
  const t = useTranslations("cabinet");
  const router = useRouter();
  return (
    <aside className="side">
      <Link href="/" className="brand">
        <Logo />
        LuneX
      </Link>
      <nav>
        <Link href="/cabinet" className="on">
          {t("overview")}
        </Link>
        <button className="ghost" onClick={onSend}>
          {t("send")}
        </button>
        <Link href="/">{t("site")}</Link>
        <button
          className="ghost"
          onClick={async () => {
            await api.logout();
            router.push("/");
          }}
        >
          {t("logout")}
        </button>
        <div style={{ marginTop: 24 }}>
          <LangSwitch />
        </div>
      </nav>
    </aside>
  );
}
