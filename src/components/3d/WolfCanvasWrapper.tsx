"use client";

import dynamic from "next/dynamic";
import SceneFallback from "./SceneFallback";

const WolfScene = dynamic(() => import("./WolfScene"), {
  ssr: false,
  loading: () => <SceneFallback reason="loading" />,
});

export default function WolfCanvasWrapper({ className }: { className?: string }) {
  return <WolfScene className={className} />;
}
