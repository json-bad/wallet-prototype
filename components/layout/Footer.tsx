import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Logo from "@/components/brand/Logo";

export default async function Footer() {
  const t = await getTranslations("footer");
  const n = await getTranslations("nav");
  return (
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <Logo />
              LuneX
            </div>
            <p>{t("blurb")}</p>
          </div>
          <div>
            <h4>{t("product")}</h4>
            <ul>
              <li>
                <a href="#atelier">{t("features")}</a>
              </li>
              <li>
                <Link href="/auth">{t("cabinet")}</Link>
              </li>
            </ul>
          </div>
          <div>
            <h4>{t("company")}</h4>
            <ul>
              <li>{t("about")}</li>
              <li>{t("press")}</li>
            </ul>
          </div>
          <div>
            <h4>{t("legal")}</h4>
            <ul>
              <li>
                <Link href="/privacy">{n("privacy")}</Link>
              </li>
              <li>
                <Link href="/terms">{n("terms")}</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>{t("copy")}</span>
          <span>{t("notFinance")}</span>
        </div>
      </div>
    </footer>
  );
}
