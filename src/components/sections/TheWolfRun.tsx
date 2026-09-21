"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Compass, Sparkles, Layers, Cpu, Server, Gamepad2, Award, Zap } from "lucide-react";

// Dynamically load Wolf3DScene without SSR for WebGL safety
const Wolf3DScene = dynamic(() => import("@/components/3d/Wolf3DScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-white/50 backdrop-blur-md rounded-3xl">
      <div className="w-12 h-12 border-3 border-meadow-300 border-t-meadow-600 rounded-full animate-spin mb-3" />
      <span className="text-xs font-mono font-semibold text-meadow-900">
        Khởi tạo đấu trường Dino Wolf 3D...
      </span>
    </div>
  ),
});

export default function TheWolfRun() {
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [liveDistance, setLiveDistance] = useState(0);
  const [liveScore, setLiveScore] = useState(0);

  const milestones = [
    {
      id: 0,
      unlockDistance: 0,
      badge: "Chặng 01 • Khởi Đầu",
      title: "Nền Tảng Tư Duy & Lập Trình",
      desc: "Nắm vững lập trình hướng đối tượng (OOP), ngôn ngữ C#, PHP và nền tảng Web hiện đại (HTML/CSS/JS). Bước chạy đầu tiên kiên định khám phá thảo nguyên tri thức.",
      icon: Layers,
      skills: ["OOP", "C#", "HTML/CSS/JS", "MVC Architecture"],
    },
    {
      id: 1,
      unlockDistance: 800,
      badge: "Chặng 02 • Bứt Phá",
      title: "Chuyên Sâu Kiến Trúc Hệ Thống",
      desc: "Chinh phục kiến trúc dịch vụ Laravel Service Architecture, thiết kế RESTful API chuẩn mực, tối ưu hóa cơ sở dữ liệu MySQL và kiểm thử tự động với Postman.",
      icon: Server,
      skills: ["PHP & Laravel", "MySQL", "REST API", "Layered Architecture"],
    },
    {
      id: 2,
      unlockDistance: 1800,
      badge: "Chặng 03 • Làm Chủ",
      title: "Đám Mây & Trí Tuệ Nhân Tạo",
      desc: "Hiện thực hoá các sản phẩm quy mô lớn: Lưu trữ media Cloudflare R2 với Signed URLs, quản trị Supabase PostgreSQL, tích hợp Gemini LLM và WebSocket thời gian thực.",
      icon: Cpu,
      skills: ["Cloudflare R2", "Gemini API", "Supabase", "Laravel Reverb"],
    },
  ];

  // Sync game score and unlock milestone cards
  const handleScoreUpdate = (score: number, distance: number) => {
    setLiveScore(score);
    setLiveDistance(distance);

    if (distance >= 1800) {
      setActiveMilestone(2);
    } else if (distance >= 800) {
      setActiveMilestone(1);
    } else {
      setActiveMilestone(0);
    }
  };

  return (
    <section
      id="wolf-journey"
      className="relative min-h-screen py-16 sm:py-20 bg-gradient-to-b from-sky-morning via-[#f3f9f4] to-meadow-50/80 flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header & Game Status */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-meadow-200/90 text-xs font-mono text-meadow-800 shadow-sm mb-2">
              <Compass className="w-3.5 h-3.5 text-sun-amber animate-spin" style={{ animationDuration: "12s" }} />
              <span className="font-semibold uppercase tracking-wider">The Wolf Run • Dino Runner Game</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-meadow-950 tracking-tight">
              Hành Trình Sải Bước Trên Đồng Cỏ
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-1 font-sans">
              Điều khiển sói chạy vô tận, bấm <kbd className="px-1.5 py-0.5 rounded bg-white border border-stone-300 font-mono text-xs font-bold text-meadow-900 shadow-xs">Space</kbd> hoặc click để nhảy qua chướng ngại vật mở khóa mốc sự nghiệp!
            </p>
          </div>

          {/* Quick Mini-game Badge */}
          <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/90 backdrop-blur-md border border-meadow-200 text-xs font-mono text-meadow-800 shadow-sm self-start sm:self-auto">
            <Gamepad2 className="w-4 h-4 text-sun-amber" />
            <span>Mục tiêu hiện tại:</span>
            <span className="font-bold text-meadow-950 bg-meadow-100 px-2 py-0.5 rounded-md">
              {milestones[activeMilestone].badge.split("•")[1] || "Khởi Đầu"}
            </span>
          </div>
        </div>
      </div>

      {/* 3 Milestone Progress Cards (Highlight dynamically as wolf runs) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
          {milestones.map((m) => {
            const isUnlocked = liveDistance >= m.unlockDistance;
            const isCurrent = activeMilestone === m.id;
            const Icon = m.icon;

            return (
              <div
                key={m.id}
                onClick={() => setActiveMilestone(m.id)}
                className={`relative p-5 sm:p-6 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isCurrent
                    ? "bg-white border-2 border-meadow-500 shadow-xl shadow-meadow-900/10 scale-[1.02]"
                    : isUnlocked
                    ? "bg-white/90 border border-meadow-200/90 shadow-md hover:border-meadow-300"
                    : "bg-white/40 border border-dashed border-meadow-200/60 opacity-60"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                        isCurrent
                          ? "bg-sun-amber text-white"
                          : isUnlocked
                          ? "bg-meadow-100 text-meadow-800"
                          : "bg-stone-100 text-stone-600"
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

      {/* Main Continuous 3D Dino Wolf Runner Arena */}
      <div className="relative w-full h-[420px] sm:h-[480px] z-10 select-none">
        
        {/* Layer 1: Distant Misty Rolling Hills (100% full width, edge-to-edge) */}
        <div className="absolute inset-x-0 bottom-16 h-36 opacity-30 pointer-events-none">
          <svg viewBox="0 0 1440 180" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,60 C360,10 720,80 1080,40 C1260,20 1380,50 1440,30 L1440,180 L0,180 Z"
              fill="#86b88b"
            />
          </svg>
        </div>

        {/* Layer 2: Mid-distance Meadow Ridge */}
        <div className="absolute inset-x-0 bottom-8 h-28 opacity-55 pointer-events-none">
          <svg viewBox="0 0 1440 140" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,40 C280,70 560,20 840,50 C1120,80 1320,30 1440,45 L1440,140 L0,140 Z"
              fill="#528a59"
            />
          </svg>
        </div>

        {/* Layer 3: Solid Continuous Flat Road Bed Ground Base (Zero cut-off, always flush to the bottom edge) */}
        <div className="absolute inset-x-0 bottom-0 h-16 bg-[#2d5234] border-t-2 border-[#3d6e46] pointer-events-none">
          {/* Subtle trail strip */}
          <div className="h-4 w-full bg-[#59442e] border-y border-[#70563b]" />
        </div>

        {/* Layer 4: TRUE 3D DINO RUNNER CANVAS STAGE */}
        <div className="absolute inset-0 w-full h-full">
          <Wolf3DScene
            onScoreUpdate={handleScoreUpdate}
            onMilestoneReached={(id) => setActiveMilestone(id)}
            className="w-full h-full"
          />
        </div>

      </div>
    </section>
  );
}
