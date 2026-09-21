"use client";

import React from "react";
import Image from "next/image";
import {
  ArrowRight,
  Code2,
  Sparkles,
  ShieldCheck,
  Sun,
  Target,
  GraduationCap,
  Briefcase,
  Phone,
  Mail,
  Calendar,
  Layers,
  Compass,
} from "lucide-react";
import { ProfileInfo } from "@/types/portfolio";
import InteractiveWolfAvatar from "./InteractiveWolfAvatar";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HeroProps {
  profile: ProfileInfo;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[95vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* 1. Cinematic Full-Width Nature Landscape Background */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/forest/nature-hero-landscape.jpg"
          alt="Cinematic Morning Mountain Landscape with Wolf on Cliff"
          fill
          priority
          quality={90}
          className="object-cover object-center sm:object-right-top transform scale-[1.02] transition-transform duration-1000 ease-out"
        />

        {/* Cinematic atmospheric overlays: subtle vignette & soft bottom gradient fade to meadow */}
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/50 to-transparent sm:from-white/75 sm:via-white/35 sm:to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#f4f8f4] via-[#f4f8f4]/60 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-sky-100/30 to-transparent" />

        {/* Soft morning sun ray pulse */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-nature-sun/15 blur-[120px] animate-sun-pulse" />
      </div>

      {/* 2. Ambient Floating Elements: Soaring Eagle Silhouette */}
      <div className="absolute top-20 right-10 sm:right-32 md:right-72 w-28 h-16 pointer-events-none opacity-50 z-10 animate-float-slow">
        <Image
          src="/images/forest/eagle-transparent-dark.png"
          alt="Soaring Eagle Silhouette"
          fill
          className="object-contain"
        />
      </div>

      {/* 3. Main Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Column: Developer Profile, Bio & Goals (8 cols on lg) */}
          <div className="lg:col-span-8 flex flex-col items-start text-left">
            
            {/* Top Concept Pill Badge & Verified CV Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep shadow-xs mb-5">
              <span className="w-2 h-2 rounded-full bg-nature-sun animate-pulse" />
              <span className="text-nature-amber font-bold uppercase tracking-wider">
                The Wolf&apos;s Journey
              </span>
              <span className="text-stone-300">•</span>
              <span className="flex items-center gap-1 text-nature-forest font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-nature-forest" />
                100% Dữ Liệu Thực Tế Từ CV
              </span>
            </div>

            {/* Profile Avatar, Full Name & Role */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-6 mb-4">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-3xl overflow-hidden border-2 border-[#A8C9AD] shadow-xl shadow-nature-deep/15 flex-shrink-0 bg-white ring-4 ring-white/80">
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
                <div className="flex items-center gap-2 text-xs font-mono text-nature-deep font-semibold uppercase tracking-wider mb-1">
                  <Sun className="w-3.5 h-3.5 text-nature-amber" />
                  <span className="px-2.5 py-0.5 rounded-lg bg-nature-forest/10 text-nature-forest font-bold">
                    {profile.role || "Frontend Intern"}
                  </span>
                  <span className="text-stone-400">•</span>
                  <span className="text-stone-700 font-normal">Quảng Ninh, Việt Nam</span>
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-nature-deep tracking-tight leading-none drop-shadow-xs">
                  {profile.fullName}
                </h1>
                <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-2.5 text-xs font-mono text-stone-700">
                  <a
                    href={`tel:${profile.contact.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-1 text-nature-deep hover:text-nature-forest font-medium transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-nature-amber" />
                    {profile.contact.phone}
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="flex items-center gap-1 text-nature-deep hover:text-nature-forest font-medium transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-nature-amber" />
                    {profile.contact.email}
                  </a>
                  <span className="text-stone-300 hidden sm:inline">•</span>
                  <span className="flex items-center gap-1 text-stone-700">
                    <Calendar className="w-3.5 h-3.5 text-nature-forest" />
                    {profile.contact.birthDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Concise Verified Bio */}
            <p className="text-base sm:text-lg text-stone-800 leading-relaxed max-w-2xl mt-3 font-sans font-normal drop-shadow-xs">
              {profile.conciseBio}
            </p>

            {/* Career Objectives Card (From CV: Short-term & Long-term goals) */}
            {profile.careerObjectives && (
              <div className="mt-5 p-4 sm:p-5 rounded-3xl bg-white/85 backdrop-blur-md border border-[#A8C9AD]/50 shadow-sm max-w-2xl">
                <div className="text-xs font-mono font-bold text-nature-deep uppercase tracking-wider mb-2.5 flex items-center gap-2">
                  <Target className="w-4 h-4 text-nature-amber" />
                  <span>Mục Tiêu Nghề Nghiệp (Career Objectives)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-stone-700 leading-relaxed font-sans">
                  <div className="p-3 rounded-2xl bg-white/80 border border-[#A8C9AD]/40">
                    <div className="font-semibold text-nature-forest mb-1 flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-nature-amber" />
                      Mục tiêu ngắn hạn:
                    </div>
                    <p className="text-stone-800">{profile.careerObjectives.shortTerm}</p>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/80 border border-[#A8C9AD]/40">
                    <div className="font-semibold text-nature-forest mb-1 flex items-center gap-1.5 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-nature-forest" />
                      Mục tiêu dài hạn:
                    </div>
                    <p className="text-stone-800">{profile.careerObjectives.longTerm}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Featured Core Tech Stack Badges */}
            <div className="mt-5 flex flex-wrap gap-2 max-w-2xl">
              {profile.coreSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold text-nature-deep bg-white/85 backdrop-blur-sm border border-[#A8C9AD]/50 hover:border-nature-forest hover:bg-white transition-all shadow-xs"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-7 flex flex-wrap items-center gap-3 sm:gap-4">
              <a
                href="#wolf-journey"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-white bg-nature-forest hover:bg-nature-deep transition-all duration-200 shadow-md shadow-nature-forest/20 font-sans group"
              >
                <Compass className="w-4 h-4 text-nature-sun group-hover:rotate-45 transition-transform" />
                <span>Hành Trình Sói Chạy</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl text-sm font-semibold text-nature-deep bg-white/90 hover:bg-white border border-[#A8C9AD]/60 transition-all font-sans shadow-xs backdrop-blur-sm"
              >
                <Layers className="w-4 h-4 text-nature-forest" />
                <span>Dự Án Thực Tế</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-2xl text-sm font-mono text-stone-700 hover:text-nature-deep bg-white/85 hover:bg-white border border-[#A8C9AD]/50 transition-colors shadow-xs backdrop-blur-sm"
              >
                <Code2 className="w-4 h-4 text-nature-forest" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Recruiter Trust Note */}
            <div className="mt-7 pt-4 border-t border-[#A8C9AD]/40 flex items-center gap-3 text-xs text-stone-700">
              <Sparkles className="w-4 h-4 text-nature-amber flex-shrink-0" />
              <span>
                Toàn bộ dữ liệu minh chứng cho những gì tôi <strong>trực tiếp viết mã</strong> trong dự án nhóm và kinh nghiệm thực tập tại doanh nghiệp.
              </span>
            </div>

          </div>

          {/* Right Column: The Wolf's Spirit Card & Key Credentials */}
          <div className="lg:col-span-4 w-full">
            <ScrollReveal direction="up" delay={150} className="w-full">
              <div className="relative rounded-3xl p-6 sm:p-7 bg-white/85 backdrop-blur-xl border border-[#A8C9AD]/60 shadow-xl shadow-nature-deep/10 overflow-hidden flex flex-col justify-between min-h-[440px]">
                
                {/* Card Header */}
                <div className="flex items-center justify-between gap-2 pb-4 border-b border-[#A8C9AD]/30">
                  <div className="flex items-center gap-2 text-xs font-mono text-nature-deep font-bold uppercase tracking-wider">
                    <span className="w-2.5 h-2.5 rounded-full bg-nature-sun" />
                    <span>The Wolf&apos;s Spirit</span>
                  </div>
                  <span className="text-[11px] font-mono text-nature-forest bg-nature-forest/10 px-2.5 py-0.5 rounded-full font-bold">
                    Morning Meadow
                  </span>
                </div>

                {/* Central Interactive Wolf Avatar */}
                <div className="my-5 flex flex-col items-center text-center">
                  <InteractiveWolfAvatar />

                  <h3 className="text-lg font-display font-bold text-nature-deep mt-2">
                    Hành Trình Bền Bỉ
                  </h3>
                  <p className="mt-1.5 text-xs text-stone-600 leading-relaxed max-w-xs font-sans">
                    Tượng trưng cho bản lĩnh độc lập, nhạy bén và năng lực tự kiến tạo sản phẩm từ gốc rễ.
                  </p>
                </div>

                {/* Key Credentials Highlights */}
                <div className="pt-4 border-t border-[#A8C9AD]/30 space-y-2.5 text-xs font-mono text-stone-800">
                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/80 border border-[#A8C9AD]/30">
                    <span className="flex items-center gap-1.5 text-stone-600">
                      <GraduationCap className="w-3.5 h-3.5 text-nature-forest" />
                      Học vấn:
                    </span>
                    <span className="font-bold text-nature-deep">FPT Poly (GPA 7.7/10)</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/80 border border-[#A8C9AD]/30">
                    <span className="flex items-center gap-1.5 text-stone-600">
                      <Briefcase className="w-3.5 h-3.5 text-nature-forest" />
                      Thực tập:
                    </span>
                    <span className="font-bold text-nature-deep">Ngọc Phi Thúy Jade</span>
                  </div>

                  <div className="flex items-center justify-between p-2.5 rounded-2xl bg-white/80 border border-[#A8C9AD]/30">
                    <span className="flex items-center gap-1.5 text-stone-600">
                      <Layers className="w-3.5 h-3.5 text-nature-amber" />
                      Dự án tiêu biểu:
                    </span>
                    <span className="font-bold text-nature-amber">MindNova AI, Cook, Tour</span>
                  </div>
                </div>

                {/* Bottom Availability Status */}
                <div className="mt-4 pt-3 border-t border-[#A8C9AD]/30 flex items-center justify-between text-[11px] font-mono">
                  <span className="flex items-center gap-1.5 text-nature-forest font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                    Sẵn sàng gia nhập
                  </span>
                  <span className="text-stone-600 font-medium">Frontend Intern</span>
                </div>

              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
