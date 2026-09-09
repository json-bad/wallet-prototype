"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import HeroCanvas from "@/components/three/HeroCanvas";

export default function Hero() {
  const t = useTranslations("hero");
  return (
    <section className="hero">
      <div className="wrap hero-copy">
        <div className="idx">{t("kicker")}</div>
        <h1>
          {t("title1")}
          <br />
          {t("title2")}
        </h1>
        <p className="lede">{t("lead")}</p>
        <div className="hero-actions">
          <Link className="btn btn-fill" href="/auth">
            {t("cta")}
          </Link>
          <a className="btn" href="#atelier">
            {t("secondary")}
          </a>
        </div>
      </div>
      <HeroCanvas />
    </section>
  );
}
