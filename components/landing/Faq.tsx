import { getTranslations } from "next-intl/server";

export default async function Faq() {
  const t = await getTranslations("faq");
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="idx">{t("kicker")}</div>
        <h2>{t("title")}</h2>
        {[1, 2, 3].map((n) => (
          <div className="faq-item" key={n}>
            <strong>{t(`q${n}`)}</strong>
            <p>{t(`a${n}`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
