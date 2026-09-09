import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Nav from "@/components/layout/Nav";
import Footer from "@/components/layout/Footer";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });
  return { title: t("termsTitle"), description: t("termsBody") };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("legal");
  return (
    <>
      <Nav />
      <article className="wrap" style={{ padding: "80px 0", maxWidth: 720 }}>
        <h1>{t("termsTitle")}</h1>
        <p className="lede" style={{ marginTop: 16 }}>
          {t("termsBody")}
        </p>
        <p className="note">{t("updated")}</p>
      </article>
      <Footer />
    </>
  );
}
