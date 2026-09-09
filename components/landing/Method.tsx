import { getTranslations } from "next-intl/server";

export default async function Method() {
  const t = await getTranslations("method");
  return (
    <section className="section" id="method">
      <div className="wrap split">
        <figure className="photo">
          <img src="/visuals/vault.jpg" alt="" />
          <figcaption>{t("cap")}</figcaption>
        </figure>
        <div>
          <div className="idx">{t("kicker")}</div>
          <h2>{t("title")}</h2>
          <ol className="steps">
            {[1, 2, 3].map((n) => (
              <li key={n}>
                <div className="num">0{n}</div>
                <div className="body">
                  <h3>{t(`s${n}t`)}</h3>
                  <p>{t(`s${n}d`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
