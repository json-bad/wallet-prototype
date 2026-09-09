import { getTranslations } from "next-intl/server";

export default async function Quote() {
  const t = await getTranslations("quote");
  return (
    <section className="section">
      <div className="wrap split">
        <blockquote className="quote">
          {t("text")}
          <cite>{t("cite")}</cite>
        </blockquote>
        <figure className="photo">
          <img src="/visuals/hands.jpg" alt="" />
        </figure>
      </div>
    </section>
  );
}
