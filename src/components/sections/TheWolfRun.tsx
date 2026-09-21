"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Compass,
  Sparkles,
  Layers,
  Cpu,
  Server,
  GraduationCap,
  Briefcase,
  Award,
  ChevronRight,
  Wind,
} from "lucide-react";

export default function TheWolfRun() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);

  // Track scroll progress inside this section
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Calculate how far the section has scrolled through viewport
          const totalDistance = rect.height + windowHeight;
          const currentDistance = windowHeight - rect.top;
          const progress = Math.min(Math.max(currentDistance / totalDistance, 0), 1);

          setScrollProgress(progress);

          // Update active milestone based on wolf journey position
          if (progress >= 0.65) {
            setActiveMilestone(2);
          } else if (progress >= 0.35) {
            setActiveMilestone(1);
          } else {
            setActiveMilestone(0);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const milestones = [
    {
      id: 0,
      badge: "Chặng 01 • Khởi Đầu",
      subBadge: "FPT Polytechnic • GPA 7.7/10",
      title: "Nền Tảng Tư Duy & Lập Trình Web",
      desc: "Học tập chuyên ngành Lập trình Web tại Cao đẳng FPT Polytechnic (2024 - 2026). Nắm chắc nguyên lý hướng đối tượng OOP, ngôn ngữ C#, PHP, cấu trúc MVC và nền tảng frontend HTML/CSS/JavaScript.",
      icon: GraduationCap,
      accentColor: "border-meadow-500 text-meadow-800 bg-meadow-100",
      skills: ["FPT Polytechnic GPA 7.7", "OOP & MVC", "C# & PHP", "HTML, CSS, JS", "Responsive Design"],
    },
    {
      id: 1,
      badge: "Chặng 02 • Bứt Phá",
      subBadge: "Ngọc Phi Thúy Jade & Dự Án Thực Tế",
      title: "Thực Tập Doanh Nghiệp & Kiến Trúc Backend",
      desc: "Trải nghiệm thực tế tại NGOC PHI THUY JADE A HANOI CO., LTD (05/2026 - 07/2026): xây dựng dynamic UI kho, cảnh báo tồn kho đỏ, tích hợp API. Đồng thời phát triển AI Cooking (Supabase, Spoonacular) và làm Team Lead dự án Quản trị Tour.",
      icon: Briefcase,
      accentColor: "border-sun-amber text-sun-amber bg-sun-light",
      skills: ["Web Developer Intern", "Laravel Blade & MySQL", "Supabase & PostgreSQL", "Layered Architecture", "Team Lead"],
    },
    {
      id: 2,
      badge: "Chặng 03 • Làm Chủ",
      subBadge: "MindNova AI • E-Learning Platform",
      title: "Hạ Tầng Đám Mây, AI & Realtime WebSocket",
      desc: "Chủ lực phát triển phân hệ Giảng viên cho nền tảng E-Learning MindNova AI: REST API Laravel Service Architecture, lưu trữ video bài giảng Cloudflare R2 Signed URLs, tích hợp Gemini LLM và chat thời gian thực Laravel Reverb.",
      icon: Cpu,
      accentColor: "border-emerald-600 text-emerald-800 bg-emerald-100",
      skills: ["MindNova AI", "Laravel Service", "Cloudflare R2 Signed URLs", "Gemini API (OpenAI Backup)", "Laravel Reverb Echo"],
    },
  ];

  // Running Wolf Gallop Animation Math (Calculated from scroll progress)
  // Maps progress (0.1 -> 0.9) to screen position (-10% to 110%)
  const normalizedSprint = Math.min(Math.max((scrollProgress - 0.1) / 0.8, 0), 1);
  const wolfX = normalizedSprint * 115 - 8; // in vw
  const wolfBounce = Math.sin(normalizedSprint * Math.PI * 24) * 8; // rhythmic gallop bounce
  const wolfOpacity = normalizedSprint > 0.01 && normalizedSprint < 0.99 ? 1 : 0.85;

  return (
    <section
      id="wolf-journey"
      ref={sectionRef}
      className="relative min-h-[95vh] py-20 lg:py-28 bg-gradient-to-b from-meadow-50/50 via-[#f5faf6] to-[#fbfcf9] flex flex-col justify-between overflow-hidden border-t border-meadow-200/80"
    >
      {/* 1. Header & Journey Introduction */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-900 shadow-xs mb-3">
              <Compass className="w-3.5 h-3.5 text-sun-amber animate-spin" style={{ animationDuration: "14s" }} />
              <span className="font-semibold uppercase tracking-wider">The Wolf&apos;s Journey • Hành Trình Sói Chạy</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-stone-900 tracking-tight">
              Sải Bước Bền Bỉ Trên Thảo Nguyên Tri Thức
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-2xl font-sans leading-relaxed">
              Cuộn trang để theo dõi bước chân chú sói vượt qua các chặng đường: từ giảng đường FPT Polytechnic, trui rèn tại doanh nghiệp Ngọc Phi Thúy, đến việc làm chủ hệ thống MindNova AI.
            </p>
          </div>

          {/* Current Stage Indicator */}
          <div className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-white/95 border border-meadow-200 shadow-xs text-xs font-mono self-start md:self-auto">
            <Wind className="w-4 h-4 text-sun-amber animate-pulse" />
            <span className="text-stone-500">Chặng hiện tại:</span>
            <span className="font-bold text-meadow-900 bg-meadow-100 px-2.5 py-0.5 rounded-lg">
              {milestones[activeMilestone].badge}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Three Verifiable Career Milestones Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-6">
          {milestones.map((m) => {
            const isCurrent = activeMilestone === m.id;
            const Icon = m.icon;

            return (
              <div
                key={m.id}
                onClick={() => setActiveMilestone(m.id)}
                className={`relative p-6 sm:p-7 rounded-3xl transition-all duration-300 flex flex-col justify-between cursor-pointer group ${
                  isCurrent
                    ? "bg-white border-2 border-meadow-600 shadow-xl shadow-meadow-900/10 scale-[1.02] ring-4 ring-meadow-100/70"
                    : "bg-white/90 border border-meadow-200/90 shadow-sm hover:border-meadow-400 hover:shadow-md"
                }`}
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-mono font-semibold ${
                        isCurrent
                          ? "bg-meadow-800 text-white"
                          : "bg-meadow-100 text-meadow-800"
                      }`}
                    >
                      {m.badge}
                    </span>
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                        isCurrent
                          ? "bg-sun-amber text-white shadow-md shadow-amber-500/20"
                          : "bg-meadow-100 text-meadow-700"
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Sub-badge / Institution / Company */}
                  <div className="text-[11px] font-mono text-stone-500 font-semibold mb-1">
                    {m.subBadge}
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-display font-bold text-stone-900 mb-2 leading-snug">
                    {m.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>

                {/* Skills tags */}
                <div className="mt-5 pt-4 border-t border-meadow-100 flex flex-wrap gap-1.5">
                  {m.skills.map((s) => (
                    <span
                      key={s}
                      className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-meadow-50 text-meadow-900 border border-meadow-200/80"
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

      {/* 3. DYNAMIC SCROLL-DRIVEN RUNNING WOLF MEADOW ARENA */}
      {/* 100% TRANSPARENT SILHOUETTE, ZERO BLACK BOX, ZERO WHITE BOX! */}
      <div className="relative w-full h-48 sm:h-56 mt-4 select-none overflow-hidden">
        
        {/* Layer 1: Distant Rolling Hills Vector */}
        <div className="absolute inset-x-0 bottom-12 h-28 opacity-40 pointer-events-none">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,40 C320,10 640,60 960,30 C1200,10 1340,35 1440,25 L1440,120 L0,120 Z"
              fill="#a5cfa8"
            />
          </svg>
        </div>

        {/* Layer 2: Mid-ground Lush Grass Ridge */}
        <div className="absolute inset-x-0 bottom-6 h-20 opacity-65 pointer-events-none">
          <svg viewBox="0 0 1440 100" fill="none" className="w-full h-full" preserveAspectRatio="none">
            <path
              d="M0,30 C240,55 480,15 720,40 C980,65 1220,25 1440,35 L1440,100 L0,100 Z"
              fill="#4f9556"
            />
          </svg>
        </div>

        {/* Layer 3: Foreground Earth Ground Trail Base */}
        <div className="absolute inset-x-0 bottom-0 h-10 bg-[#25462c] border-t-2 border-[#366e40] pointer-events-none">
          <div className="h-2 w-full bg-[#795548]/40 border-y border-[#3e2723]/30" />
        </div>

        {/* Layer 4: THE GALLOPING WOLF (100% Transparent PNG, NO Rectangular Box!) */}
        <div
          className="absolute bottom-6 left-0 will-change-transform pointer-events-none z-30 transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(${wolfX}vw, ${wolfBounce}px, 0)`,
            opacity: wolfOpacity,
          }}
        >
          {/* Transparent Running Wolf Silhouette */}
          <div className="relative w-28 h-16 sm:w-40 sm:h-24 md:w-48 md:h-28 filter drop-shadow-[0_6px_12px_rgba(20,40,25,0.45)]">
            <Image
              src="/images/forest/wolf-runner-transparent-dark.png"
              alt="Running Wolf Silhouette"
              fill
              sizes="(max-width: 768px) 160px, 192px"
              className="object-contain"
              priority
            />
          </div>

          {/* Gentle Dust / Wind Trail Particles Behind the Wolf Paws */}
          <div className="absolute -left-12 bottom-1 w-24 h-4 bg-gradient-to-r from-transparent via-meadow-400/30 to-transparent blur-sm pointer-events-none" />
        </div>

        {/* Journey Distance Progress Indicator */}
        <div className="absolute bottom-2 right-4 sm:right-8 z-30 text-[11px] font-mono text-meadow-100 bg-meadow-950/80 px-3 py-0.5 rounded-full backdrop-blur-sm border border-meadow-700/50">
          Tiến trình hành trình: {Math.round(normalizedSprint * 100)}%
        </div>

      </div>
    </section>
  );
}
