import { getTranslations } from "next-intl/server";

export default async function Stats() {
  const t = await getTranslations("stats");
  const items: [string, string][] = [
    ["02.4B", t("volume")],
    ["48ms", t("render")],
    ["0 $", t("real")],
    ["01:1", t("visual")],
  ];
  return (
    <div className="wrap stats-row">
      {items.map(([v, l]) => (
        <div className="stat" key={l}>
          <b>{v}</b>
          <span>{l}</span>
        </div>
      ))}
    </div>
  );
}
