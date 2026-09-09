import { getTranslations } from "next-intl/server";

const keys = ["portfolio", "send", "history", "api", "auth", "adaptive"] as const;

export default async function Atelier() {
  const t = await getTranslations("product");
  return (
    <section className="section" id="atelier">
      <div className="wrap">
        <div className="idx">{t("kicker")}</div>
        <h2>{t("title")}</h2>
        <p className="lede" style={{ marginBottom: 28 }}>
          {t("lead")}
        </p>
        <div className="grid-feat">
          {keys.map((k, i) => (
            <article className="feat" key={k}>
              <div className="n">0{i + 1}</div>
              <h3>{t(`items.${k}.t`)}</h3>
              <p>{t(`items.${k}.d`)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
