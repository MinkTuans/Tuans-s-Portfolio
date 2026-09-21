"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Code2, Sparkles, ShieldCheck, MapPin, Compass, Layers, Sun } from "lucide-react";
import { ProfileInfo } from "@/types/portfolio";

interface HeroProps {
  profile: ProfileInfo;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-32 pb-20 lg:pt-40 lg:pb-28 flex items-center overflow-hidden bg-gradient-to-b from-sky-morning via-[#fbfdfa] to-meadow-50/50"
    >
      {/* Morning Meadow Sunrise Glow & Ambient Atmospheric Shapes */}
      <div className="absolute top-10 right-10 w-[500px] h-[500px] rounded-full bg-sun-light/60 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[450px] h-[450px] rounded-full bg-meadow-200/50 blur-[120px] pointer-events-none" />
      
      {/* Subtle Distant Morning Cloud/Sky Silhouette */}
      <div className="absolute top-0 inset-x-0 h-40 bg-gradient-to-b from-sky-soft/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Core Identity & Proof of Capability (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Top Concept Badge & CV Verification */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 border border-meadow-200 text-xs font-mono text-meadow-900 shadow-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-sun-warm animate-pulse" />
              <span className="text-sun-amber font-semibold uppercase tracking-wider">The Wolf&apos;s Journey</span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-meadow-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-meadow-600" />
                100% Dữ Liệu Thực Tế Từ CV
              </span>
            </div>

            {/* Profile Avatar & Full Name */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-meadow-300 shadow-xl shadow-meadow-900/10 flex-shrink-0 bg-white ring-4 ring-meadow-100/60">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  fill
                  sizes="96px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2 text-xs font-mono text-meadow-700 font-medium mb-1">
                  <Sun className="w-3.5 h-3.5 text-sun-amber" />
                  <span>Morning Meadow • Thảo Nguyên Ban Mai</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-900 tracking-tight leading-none">
                  {profile.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 mt-2.5 text-xs font-mono text-stone-600">
                  <span className="flex items-center gap-1 text-stone-700">
                    <MapPin className="w-3.5 h-3.5 text-sun-amber" />
                    {profile.contact.location}
                  </span>
                  <span className="text-stone-300">•</span>
                  <span className="text-meadow-700 font-medium font-mono">
                    github.com/{profile.contact.githubUsername}
                  </span>
                </div>
              </div>
            </div>

            {/* Concise Verified Bio (No buzzwords, purely Skills + Experience + Projects) */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mt-4 font-sans">
              {profile.conciseBio}
            </p>

            {/* Featured Core Tech Stack Badges (Fresh Meadow Palette) */}
            <div className="mt-6 flex flex-wrap gap-2 max-w-2xl">
              {profile.coreSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-meadow-900 bg-white border border-meadow-200/90 hover:border-meadow-400 hover:bg-meadow-50 transition-all shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#wolf-journey"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium text-white bg-meadow-800 hover:bg-meadow-900 transition-all duration-200 shadow-lg shadow-meadow-900/15 font-sans font-semibold group"
              >
                <Compass className="w-4 h-4 text-sun-light group-hover:rotate-45 transition-transform" />
                <span>Xem Hành Trình Sói Chạy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium text-meadow-950 bg-white hover:bg-meadow-50 border border-meadow-300 transition-all font-sans shadow-sm"
              >
                <Layers className="w-4 h-4 text-meadow-600" />
                <span>Chi Tiết Dự Án</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-mono text-stone-700 hover:text-stone-900 bg-white hover:bg-meadow-50 border border-stone-200 transition-colors shadow-sm"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Quick Proof Note for Recruiter */}
            <div className="mt-8 pt-6 border-t border-meadow-200/70 flex items-center gap-3 text-xs text-stone-600">
              <Sparkles className="w-4 h-4 text-sun-amber flex-shrink-0" />
              <span>
                Toàn bộ dữ liệu dưới đây minh chứng cho những gì tôi <strong>trực tiếp viết mã</strong> trong các dự án nhóm và kinh nghiệm thực tập tại doanh nghiệp.
              </span>
            </div>

          </div>

          {/* Right Column: Visual Concept Card (Morning Landscape Showcase, NO 3D DOG!) (4 cols on lg) */}
          <div className="lg:col-span-4 w-full">
            <div className="relative rounded-3xl p-6 sm:p-8 bg-white/90 backdrop-blur-md border border-meadow-200 shadow-xl shadow-meadow-900/5 overflow-hidden flex flex-col justify-between min-h-[420px]">
              
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-meadow-100">
                <div className="flex items-center gap-2 text-xs font-mono text-meadow-800 font-semibold uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-sun-amber" />
                  <span>The Wolf&apos;s Spirit</span>
                </div>
                <span className="text-[11px] font-mono text-stone-600">Morning Meadow</span>
              </div>

              {/* Central Visual Meadow & Wolf Silhouette Artwork */}
              <div className="my-6 flex flex-col items-center text-center">
                <div className="relative w-28 h-28 rounded-3xl bg-gradient-to-b from-sky-soft to-meadow-100 flex items-center justify-center border border-meadow-200 shadow-inner mb-4">
                  {/* Stylized Majestic Wolf Silhouette Emblem */}
                  <svg className="w-16 h-16 text-meadow-800" viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,12 63,35 80,32 70,50 84,70 66,72 50,94 34,72 16,70 30,50 20,32 37,35" opacity="0.95" />
                    <polygon points="50,22 58,38 66,50 50,72 34,50 42,38" fill="#f59e0b" />
                    <circle cx="43" cy="44" r="2.5" fill="#ffffff" />
                    <circle cx="57" cy="44" r="2.5" fill="#ffffff" />
                  </svg>
                </div>

                <h3 className="text-xl font-display font-bold text-stone-900">
                  Hành Trình Bền Bỉ
                </h3>
                <p className="mt-2 text-xs text-stone-600 leading-relaxed max-w-xs font-sans">
                  Con sói bước đi giữa bình minh rộng lớn. Tượng trưng cho bản lĩnh độc lập, tinh thần nhạy bén và năng lực tự kiến tạo sản phẩm.
                </p>
              </div>

              {/* Highlights List */}
              <div className="pt-4 border-t border-meadow-100 space-y-2 text-xs font-mono text-stone-700">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Kiến trúc:</span>
                  <span className="font-semibold text-meadow-800">Laravel Service & Supabase</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Xử lý media:</span>
                  <span className="font-semibold text-meadow-800">Cloudflare R2 Signed URLs</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600">Trí tuệ nhân tạo:</span>
                  <span className="font-semibold text-sun-amber">Gemini API Integration</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
