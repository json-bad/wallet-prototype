import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { locales } from "@/i18n/routing";

const paths = ["", "/privacy", "/terms"];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-09-09");
  return locales.flatMap((locale) =>
    paths.map((p) => ({
      url: `${SITE_URL}/${locale}${p}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: p === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${p}`])),
      },
    }))
  );
}
