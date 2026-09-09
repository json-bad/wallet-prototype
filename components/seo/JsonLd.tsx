import { SITE_URL } from "@/lib/site";

export default function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "LuneX Labs",
        url: SITE_URL,
        logo: `${SITE_URL}/logo.png`,
      },
      { "@type": "WebSite", name: "LuneX Wallet", url: SITE_URL, inLanguage: ["ru", "en"] },
    ],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}
