"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Compass, Sparkles, Layers, Cpu, Server, Play, Zap, Shield, RotateCw } from "lucide-react";
import type { WolfAnimationMode } from "@/components/3d/Wolf3DScene";

// Dynamically import Wolf3DScene with SSR disabled for WebGL safety
const Wolf3DScene = dynamic(() => import("@/components/3d/Wolf3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/40 backdrop-blur-sm rounded-3xl">
      <div className="w-10 h-10 border-3 border-meadow-300 border-t-meadow-600 rounded-full animate-spin mb-3" />
      <span className="text-xs font-mono font-semibold text-meadow-800">
        Khởi tạo không gian 3D Sói trên đồng cỏ...
      </span>
    </div>
  ),
});

export default function TheWolfRun() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [userSelectedAnim, setUserSelectedAnim] = useState<WolfAnimationMode | null>(null);

  // Compute scroll progress within this 220vh section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(clamped);

      if (clamped < 0.35) {
        setActiveMilestone(0);
      } else if (clamped < 0.7) {
        setActiveMilestone(1);
      } else {
        setActiveMilestone(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Determine current wolf animation based on scroll or user override
  const currentAnimation: WolfAnimationMode = userSelectedAnim
    ? userSelectedAnim
    : scrollProgress < 0.35
    ? "walk"
    : scrollProgress < 0.75
    ? "gallop"
    : "gallop";

  // Calculate playback speed based on journey momentum
  const playbackSpeed = userSelectedAnim
    ? 1.0
    : scrollProgress < 0.35
    ? 0.95
    : 1.0 + (scrollProgress - 0.35) * 0.5;

  const milestones = [
    {
      id: 0,
      badge: "Chặng 01 • Khởi Đầu",
      title: "Nền Tảng Tư Duy & Lập Trình",
      desc: "Nắm vững lập trình hướng đối tượng (OOP), ngôn ngữ C#, PHP và nền tảng Web hiện đại (HTML/CSS/JS). Bước đi đầu tiên đầy kiên định của con sói trẻ khám phá thảo nguyên tri thức.",
      icon: Layers,
      skills: ["OOP", "C#", "HTML/CSS/JS", "MVC Architecture"],
      suggestedMode: "walk" as WolfAnimationMode,
    },
    {
      id: 1,
      badge: "Chặng 02 • Bứt Phá",
      title: "Chuyên Sâu Kiến Trúc Hệ Thống",
      desc: "Chinh phục kiến trúc dịch vụ Laravel Service Architecture, thiết kế RESTful API chuẩn mực, tối ưu hóa cơ sở dữ liệu MySQL và kiểm thử tự động với Postman.",
      icon: Server,
      skills: ["PHP & Laravel", "MySQL", "REST API", "Layered Architecture"],
      suggestedMode: "gallop" as WolfAnimationMode,
    },
    {
      id: 2,
      badge: "Chặng 03 • Làm Chủ",
      title: "Đám Mây & Trí Tuệ Nhân Tạo",
      desc: "Hiện thực hoá các sản phẩm quy mô lớn: Lưu trữ media Cloudflare R2 với Signed URLs, quản trị Supabase PostgreSQL, tích hợp Gemini LLM và WebSocket thời gian thực (Laravel Reverb).",
      icon: Cpu,
      skills: ["Cloudflare R2", "Gemini API", "Supabase", "Laravel Reverb"],
      suggestedMode: "jump" as WolfAnimationMode,
    },
  ];

  return (
    <section
      ref={containerRef}
      id="wolf-journey"
      className="relative min-h-[220vh] bg-gradient-to-b from-sky-morning via-[#f4f9f4] to-meadow-50/70"
    >
      {/* Sticky Panoramic Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-8 sm:py-12">
        
        {/* Top Header & Context Guide */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-meadow-200/80 text-xs font-mono text-meadow-800 shadow-sm mb-2">
                <Compass className="w-3.5 h-3.5 text-sun-amber animate-spin" style={{ animationDuration: "12s" }} />
                <span className="font-semibold uppercase tracking-wider">The Wolf Run • Cinematic 3D Journey</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-meadow-950 tracking-tight">
                Hành Trình Sải Bước Trên Đồng Cỏ
              </h2>
            </div>

            {/* Scroll & 3D Interactive Status */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <div className="flex items-center gap-2.5 px-3.5 py-1.5 rounded-2xl bg-white/90 backdrop-blur-sm border border-meadow-200 text-xs font-mono text-meadow-800 shadow-sm">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-warm opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-sun-amber" />
                </span>
                <span>Cuộn chuột:</span>
                <span className="font-bold text-meadow-900 bg-meadow-100 px-2 py-0.5 rounded">
                  {Math.round(scrollProgress * 100)}%
                </span>
              </div>

              {userSelectedAnim && (
                <button
                  type="button"
                  onClick={() => setUserSelectedAnim(null)}
                  className="px-3 py-1.5 rounded-2xl bg-meadow-800 text-white text-xs font-mono font-medium hover:bg-meadow-700 transition-all shadow-sm"
                >
                  ↺ Trả về chế độ cuộn tự động
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Milestone Dynamic Story Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 my-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {milestones.map((m) => {
              const isPastOrCurrent = scrollProgress >= (m.id === 0 ? 0 : m.id === 1 ? 0.35 : 0.7);
              const isCurrent = activeMilestone === m.id;
              const Icon = m.icon;

              return (
                <div
                  key={m.id}
                  onClick={() => setUserSelectedAnim(m.suggestedMode)}
                  className={`relative p-5 sm:p-6 rounded-3xl transition-all duration-500 flex flex-col justify-between cursor-pointer ${
                    isCurrent
                      ? "bg-white border-2 border-meadow-500 shadow-xl shadow-meadow-900/10 scale-[1.02]"
                      : isPastOrCurrent
                      ? "bg-white/90 border border-meadow-200/90 shadow-md hover:border-meadow-300"
                      : "bg-white/40 border border-dashed border-meadow-200/60 opacity-60"
                  }`}
                  title={`Click để chuyển sói sang trạng thái ${m.suggestedMode}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2.5">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                          isCurrent
                            ? "bg-sun-amber text-white"
                            : "bg-meadow-100 text-meadow-800"
                        }`}
                      >
                        {m.badge}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isCurrent ? "bg-meadow-800 text-white" : "bg-meadow-100 text-meadow-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-base sm:text-lg font-display font-bold text-meadow-950 mb-1.5">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans line-clamp-3 sm:line-clamp-none">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-meadow-100 flex flex-wrap gap-1.5">
                    {m.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-meadow-50 text-meadow-800 border border-meadow-200/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Cinematic 3D Wolf Stage & Parallax Meadow Background */}
        <div className="relative w-full h-[360px] sm:h-[430px] z-10 select-none">
          
          {/* Layer 1: Distant Misty Rolling Hills (Parallax offset) */}
          <div
            className="absolute inset-x-0 bottom-16 h-44 opacity-35 transition-transform duration-75 pointer-events-none"
            style={{
              transform: `translateX(${-scrollProgress * 70}px)`,
            }}
          >
            <svg viewBox="0 0 1440 220" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <path
                d="M0,90 C280,30 520,130 800,70 C1080,10 1280,100 1440,60 L1440,220 L0,220 Z"
                fill="#9cc7a0"
              />
            </svg>
          </div>

          {/* Layer 2: Middle Meadow Hills (Moves faster) */}
          <div
            className="absolute inset-x-0 bottom-8 h-36 opacity-60 transition-transform duration-75 pointer-events-none"
            style={{
              transform: `translateX(${-scrollProgress * 150}px)`,
            }}
          >
            <svg viewBox="0 0 1440 180" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,60 C320,110 640,30 960,80 C1200,120 1340,40 1440,70 L1440,180 L0,180 Z"
                fill="#619e68"
              />
            </svg>
          </div>

          {/* Layer 3: The Running Trail Path Ground */}
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#27442d] via-[#355b3c] to-transparent pointer-events-none">
            <svg viewBox="0 0 1440 90" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,45 C360,15 720,55 1080,25 C1260,10 1380,40 1440,30 L1440,90 L0,90 Z"
                fill="#27442d"
              />
            </svg>
          </div>

          {/* Layer 4: TRUE 3D CINEMATIC WOLF CANVAS */}
          <div className="absolute inset-0 w-full h-full">
            <Wolf3DScene
              currentAnimation={currentAnimation}
              playbackSpeed={playbackSpeed}
              scrollProgress={scrollProgress}
              showUIControls={true}
              className="w-full h-full"
            />
          </div>

          {/* Layer 5: Foreground Prairie Grass Blades (Moving fastest) */}
          <div
            className="absolute inset-x-0 -bottom-2 h-14 opacity-90 transition-transform duration-75 pointer-events-none"
            style={{
              transform: `translateX(${-scrollProgress * 280}px)`,
            }}
          >
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,35 Q40,10 80,35 Q140,5 200,40 Q260,15 320,38 Q380,8 440,42 Q520,12 600,38 Q680,5 760,40 Q840,15 920,36 Q1000,10 1080,40 Q1160,8 1240,38 Q1340,12 1440,35 L1440,60 L0,60 Z"
                fill="#182e1d"
              />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
