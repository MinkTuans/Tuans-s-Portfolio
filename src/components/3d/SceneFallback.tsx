"use client";

import React from "react";
import Image from "next/image";

interface SceneFallbackProps {
  reason?: "loading" | "unsupported" | "reduced-motion" | "mobile";
}

export default function SceneFallback({ reason = "loading" }: SceneFallbackProps) {
  return (
    <div
      className="relative w-full h-full min-h-[420px] lg:min-h-[560px] rounded-3xl overflow-hidden flex items-center justify-center border border-steppe-700/40 bg-gradient-to-b from-steppe-900 via-steppe-950 to-steppe-900 shadow-2xl"
      role="img"
      aria-label="Minh họa 3D phong cách nghệ thuật The Wolf's Journey trên thảo nguyên mênh mông"
    >
      {/* Prairie Sun Glow */}
      <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-amber-sun/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-10 left-1/3 w-96 h-48 rounded-full bg-tech-emerald/10 blur-3xl pointer-events-none" />

      {/* Atmospheric Silhouette Graphic */}
      <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
        {/* Stylized Wolf Icon Badge */}
        <div className="relative mb-6 p-4 rounded-2xl bg-steppe-850/80 border border-steppe-700/60 shadow-inner">
          <svg
            className="w-20 h-20 text-amber-sun/90"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Geometric Low-Poly Wolf Head Silhouette */}
            <polygon points="50,15 62,38 78,35 68,52 82,70 65,72 50,92 35,72 18,70 32,52 22,35 38,38" fill="currentColor" opacity="0.9" />
            <polygon points="50,25 58,42 66,54 50,75 34,54 42,42" fill="#e5b452" />
            <polygon points="50,32 54,48 50,60 46,48" fill="#14251c" />
            <circle cx="43" cy="46" r="2" fill="#10b981" />
            <circle cx="57" cy="46" r="2" fill="#10b981" />
          </svg>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-steppe-900 text-[10px] font-mono uppercase tracking-widest text-steppe-300 border border-steppe-700">
            The Wolf&apos;s Spirit
          </div>
        </div>

        <h3 className="text-xl font-display font-semibold text-steppe-100 tracking-wide">
          Hành Trình Thảo Nguyên
        </h3>
        <p className="mt-2 text-sm text-steppe-400 leading-relaxed">
          {reason === "reduced-motion"
            ? "Chế độ giảm chuyển động được kích hoạt. Trải nghiệm tối ưu tĩnh và trực diện."
            : "Không gian 3D tối ưu hóa cho hiệu năng cao. Sẵn sàng bứt phá trên mọi thiết bị."}
        </p>
      </div>

      {/* Gentle Bottom Mist */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-steppe-950 via-steppe-950/60 to-transparent pointer-events-none" />
    </div>
  );
}
