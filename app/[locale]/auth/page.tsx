import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AuthForm from "@/components/auth/AuthForm";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "auth" });
  return { title: t("title"), description: t("lead"), robots: { index: false, follow: false } };
}

export default async function AuthPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AuthForm />;
}
