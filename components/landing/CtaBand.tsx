import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export default async function CtaBand() {
  const t = await getTranslations("cta");
  const d = await getTranslations();
  return (
    <section className="cta-band">
      <img src="/visuals/city-night.jpg" alt="" />
      <div className="inner">
        <div className="idx">{t("kicker")}</div>
        <h2>{t("title")}</h2>
        <p className="lede" style={{ margin: "12px auto 24px" }}>
          {t("lead")}
        </p>
        <Link className="btn btn-fill" href="/auth">
          {t("btn")}
        </Link>
        <p className="note" style={{ maxWidth: 640, margin: "28px auto 0", textAlign: "left" }}>
          {d("disclaimer")}
        </p>
      </div>
    </section>
  );
}
