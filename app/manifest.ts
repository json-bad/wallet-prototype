import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "LuneX Wallet",
    short_name: "LuneX",
    description: "Demonstration web wallet. Fictional data only.",
    start_url: "/ru",
    display: "standalone",
    background_color: "#050508",
    theme_color: "#050508",
    lang: "ru",
    icons: [{ src: "/logo.png", sizes: "192x192", type: "image/png" }],
  };
}
