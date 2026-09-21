"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  MapPin,
  Compass,
  Layers,
  Sun,
  Target,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  Calendar,
} from "lucide-react";
import { ProfileInfo } from "@/types/portfolio";

interface HeroProps {
  profile: ProfileInfo;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden bg-gradient-to-b from-sky-morning via-[#fbfdfa] to-meadow-50/50"
    >
      {/* 1. Natural Morning Meadow Sunrise Glow & Ambient Atmospheric Lighting */}
      <div className="absolute top-10 right-10 w-[550px] h-[550px] rounded-full bg-sun-light/60 blur-[130px] pointer-events-none" />
      <div className="absolute top-1/3 -left-20 w-[480px] h-[480px] rounded-full bg-meadow-200/50 blur-[120px] pointer-events-none" />
      
      {/* Subtle Distant Morning Cloud/Sky Gradient */}
      <div className="absolute top-0 inset-x-0 h-44 bg-gradient-to-b from-sky-soft/40 to-transparent pointer-events-none" />

      {/* 2. Soaring Eagle Silhouette (100% Transparent PNG, ZERO rectangular box!) */}
      <div className="absolute top-16 right-8 sm:right-24 md:right-40 w-24 h-16 sm:w-36 sm:h-24 pointer-events-none opacity-40 hover:opacity-75 transition-opacity z-10 animate-float-slow">
        <Image
          src="/images/forest/eagle-transparent-dark.png"
          alt="Soaring Eagle Silhouette"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Core Identity & Proof of Capability (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Top Concept Badge & CV Verification */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-meadow-200 text-xs font-mono text-meadow-900 shadow-sm mb-5">
              <span className="w-2 h-2 rounded-full bg-sun-warm animate-pulse" />
              <span className="text-sun-amber font-semibold uppercase tracking-wider">The Wolf&apos;s Journey</span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-meadow-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5 text-meadow-600" />
                100% Dữ Liệu Thực Tế Từ CV
              </span>
            </div>

            {/* Profile Avatar, Full Name & Role */}
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
                <div className="flex items-center gap-2 text-xs font-mono text-meadow-800 font-semibold uppercase tracking-wider mb-1">
                  <Sun className="w-3.5 h-3.5 text-sun-amber" />
                  <span className="px-2.5 py-0.5 rounded-md bg-meadow-100/80 text-meadow-900 font-bold">
                    {profile.role || "Frontend Intern"}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-600 font-normal">Quảng Ninh, Việt Nam</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold text-stone-900 tracking-tight leading-none">
                  {profile.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs font-mono text-stone-600">
                  <a
                    href={`tel:${profile.contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1 text-stone-700 hover:text-meadow-800 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-sun-amber" />
                    {profile.contact.phone}
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-1 text-stone-700 hover:text-meadow-800 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-sun-amber" />
                    {profile.contact.email}
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 text-stone-600">
                    <Calendar className="w-3.5 h-3.5 text-meadow-600" />
                    {profile.contact.birthDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Concise Verified Bio */}
            <p className="text-base sm:text-lg text-stone-700 leading-relaxed max-w-2xl mt-3 font-sans">
              {profile.conciseBio}
            </p>

            {/* Career Objectives Card (From CV: Short-term & Long-term goals) */}
            {profile.careerObjectives && (
              <div className="mt-5 p-4 sm:p-5 rounded-2xl bg-white/90 border border-meadow-200/90 shadow-xs max-w-2xl">
                <div className="text-xs font-mono font-bold text-meadow-900 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Target className="w-4 h-4 text-sun-amber" />
                  <span>Mục Tiêu Nghề Nghiệp (Career Objectives)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 leading-relaxed font-sans">
                  <div className="p-3 rounded-xl bg-meadow-50/60 border border-meadow-100">
                    <div className="font-semibold text-meadow-900 mb-1 flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-sun-amber" />
                      Mục tiêu ngắn hạn:
                    </div>
                    <p className="text-stone-700">{profile.careerObjectives.shortTerm}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-meadow-50/60 border border-meadow-100">
                    <div className="font-semibold text-meadow-900 mb-1 flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-meadow-600" />
                      Mục tiêu dài hạn:
                    </div>
                    <p className="text-stone-700">{profile.careerObjectives.longTerm}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Core Tech Stack Badges */}
            <div className="mt-5 flex flex-wrap gap-2 max-w-2xl">
              {profile.coreSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-medium text-meadow-900 bg-white border border-meadow-200/90 hover:border-meadow-400 hover:bg-meadow-50 transition-all shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#wolf-journey"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium text-white bg-meadow-800 hover:bg-meadow-900 transition-all duration-200 shadow-md shadow-meadow-900/15 font-sans font-semibold group"
              >
                <Compass className="w-4 h-4 text-sun-light group-hover:rotate-45 transition-transform" />
                <span>Hành Trình Sói Chạy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-medium text-meadow-950 bg-white hover:bg-meadow-50 border border-meadow-300 transition-all font-sans shadow-xs"
              >
                <Layers className="w-4 h-4 text-meadow-700" />
                <span>Dự Án Thực Tế</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-mono text-stone-700 hover:text-stone-900 bg-white hover:bg-meadow-50 border border-stone-200 transition-colors shadow-xs"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Recruiter Trust Note */}
            <div className="mt-7 pt-5 border-t border-meadow-200/70 flex items-center gap-3 text-xs text-stone-600">
              <Sparkles className="w-4 h-4 text-sun-amber flex-shrink-0" />
              <span>
                Toàn bộ dữ liệu minh chứng cho những gì tôi <strong>trực tiếp viết mã</strong> trong dự án nhóm và kinh nghiệm thực tập tại doanh nghiệp.
              </span>
            </div>

          </div>

          {/* Right Column: Visual Profile Card & Key Credentials */}
          <div className="lg:col-span-4 w-full">
            <div className="relative rounded-3xl p-6 sm:p-7 bg-white/95 backdrop-blur-md border border-meadow-200 shadow-xl shadow-meadow-900/5 overflow-hidden flex flex-col justify-between min-h-[440px]">
              
              {/* Card Header */}
              <div className="flex items-center justify-between gap-2 pb-4 border-b border-meadow-100">
                <div className="flex items-center gap-2 text-xs font-mono text-meadow-800 font-semibold uppercase tracking-wider">
                  <span className="w-2.5 h-2.5 rounded-full bg-sun-amber" />
                  <span>The Wolf&apos;s Spirit</span>
                </div>
                <span className="text-[11px] font-mono text-meadow-700 bg-meadow-100 px-2.5 py-0.5 rounded-full font-semibold">
                  Morning Meadow
                </span>
              </div>

              {/* Central Visual Meadow & Wolf Emblem */}
              <div className="my-5 flex flex-col items-center text-center">
                <div className="relative w-24 h-24 rounded-2xl bg-gradient-to-b from-sky-soft to-meadow-100 flex items-center justify-center border border-meadow-200 shadow-inner mb-3">
                  <svg className="w-14 h-14 text-meadow-800" viewBox="0 0 100 100" fill="currentColor">
                    <polygon points="50,12 63,35 80,32 70,50 84,70 66,72 50,94 34,72 16,70 30,50 20,32 37,35" opacity="0.95" />
                    <polygon points="50,22 58,38 66,50 50,72 34,50 42,38" fill="#f59e0b" />
                    <circle cx="43" cy="44" r="2.5" fill="#ffffff" />
                    <circle cx="57" cy="44" r="2.5" fill="#ffffff" />
                  </svg>
                </div>

                <h3 className="text-lg font-display font-bold text-stone-900">
                  Hành Trình Bền Bỉ
                </h3>
                <p className="mt-1.5 text-xs text-stone-600 leading-relaxed max-w-xs font-sans">
                  Tượng trưng cho bản lĩnh độc lập, nhạy bén và năng lực tự kiến tạo sản phẩm từ gốc rễ.
                </p>
              </div>

              {/* Key Credentials Highlights */}
              <div className="pt-4 border-t border-meadow-100 space-y-2.5 text-xs font-mono text-stone-700">
                <div className="flex items-center justify-between p-2 rounded-xl bg-meadow-50/50">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <GraduationCap className="w-3.5 h-3.5 text-meadow-700" />
                    Học vấn:
                  </span>
                  <span className="font-semibold text-meadow-900">FPT Poly (GPA 7.7/10)</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-meadow-50/50">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <Briefcase className="w-3.5 h-3.5 text-meadow-700" />
                    Thực tập:
                  </span>
                  <span className="font-semibold text-meadow-900">Ngọc Phi Thúy Jade</span>
                </div>

                <div className="flex items-center justify-between p-2 rounded-xl bg-meadow-50/50">
                  <span className="flex items-center gap-1.5 text-stone-600">
                    <Layers className="w-3.5 h-3.5 text-sun-amber" />
                    Dự án tiêu biểu:
                  </span>
                  <span className="font-semibold text-sun-amber">MindNova AI, Cook, Tour</span>
                </div>
              </div>

              {/* Bottom Availability Status */}
              <div className="mt-4 pt-3 border-t border-meadow-100 flex items-center justify-between text-[11px] font-mono">
                <span className="flex items-center gap-1.5 text-meadow-800 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Sẵn sàng gia nhập
                </span>
                <span className="text-stone-500">Frontend Intern</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
