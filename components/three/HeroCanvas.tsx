"use client";

import dynamic from "next/dynamic";

const MoonScene = dynamic(() => import("./MoonScene"), { ssr: false });

export default function HeroCanvas() {
  return (
    <div className="hero-stage" aria-hidden>
      <MoonScene />
    </div>
  );
}
