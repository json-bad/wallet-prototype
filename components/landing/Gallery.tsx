import { getTranslations } from "next-intl/server";

export default async function Gallery() {
  const t = await getTranslations("gallery");
  return (
    <section className="section">
      <div className="wrap split">
        <figure className="photo">
          <img src="/visuals/eclipse.jpg" alt={t("eclipse")} />
          <figcaption>{t("eclipse")}</figcaption>
        </figure>
        <div>
          <div className="idx">{t("kicker")}</div>
          <h2>{t("title")}</h2>
          <p className="lede">{t("lead")}</p>
          <figure className="photo" style={{ marginTop: 24, minHeight: 240 }}>
            <img src="/visuals/circuit-moon.jpg" alt={t("object")} />
            <figcaption>{t("object")}</figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
