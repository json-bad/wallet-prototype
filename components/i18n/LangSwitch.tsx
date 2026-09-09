"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { locales } from "@/i18n/routing";

export default function LangSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div className="lang" aria-label="Language">
      {locales.map((l) => (
        <a
          key={l}
          href={`/${l}${pathname === "/" ? "" : pathname}`}
          className={l === locale ? "active" : ""}
          hrefLang={l}
          onClick={(e) => {
            e.preventDefault();
            router.replace(pathname, { locale: l });
          }}
        >
          {l}
        </a>
      ))}
    </div>
  );
}
