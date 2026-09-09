import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import LangSwitch from "@/components/i18n/LangSwitch";
import Logo from "@/components/brand/Logo";

export default async function Nav() {
  const t = await getTranslations("nav");
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand">
          <Logo />
          LuneX
        </Link>
        <nav className="nav-mid">
          <a href="#atelier">{t("product")}</a>
          <a href="#method">{t("method")}</a>
          <a href="#faq">{t("faq")}</a>
        </nav>
        <div className="nav-end">
          <LangSwitch />
          <Link className="btn" href="/auth">
            {t("login")}
          </Link>
          <Link className="btn btn-fill" href="/auth">
            {t("cabinet")}
          </Link>
        </div>
      </div>
    </header>
  );
}
