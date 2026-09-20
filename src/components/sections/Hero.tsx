"use client";

import React from "react";
import Image from "next/image";
import { ArrowRight, Code2, Sparkles, ShieldCheck, MapPin, Layers } from "lucide-react";
import { ProfileInfo } from "@/types/portfolio";
import WolfCanvasWrapper from "../3d/WolfCanvasWrapper";

interface HeroProps {
  profile: ProfileInfo;
}

export default function Hero({ profile }: HeroProps) {
  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center overflow-hidden"
    >
      {/* Cinematic Steppe Mist & Amber Horizon */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full bg-steppe-700/15 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[600px] h-[600px] rounded-full bg-amber-sun/10 blur-[140px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Core Identity & Proof of Capability (7 cols on lg) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Top Concept Badge & Verification */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-steppe-900/90 border border-steppe-750 text-xs font-mono text-steppe-300 mb-6 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-sun animate-pulse" />
              <span className="text-amber-sun font-semibold uppercase tracking-wider">The Wolf&apos;s Journey</span>
              <span className="text-steppe-600">•</span>
              <span className="flex items-center gap-1 text-steppe-300">
                <ShieldCheck className="w-3.5 h-3.5 text-tech-emerald" />
                100% Thực Tế Từ CV
              </span>
            </div>

            {/* Profile Avatar & Full Name */}
            <div className="flex items-center gap-4 sm:gap-5 mb-4">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-steppe-600/80 shadow-xl shadow-black/40 flex-shrink-0 bg-steppe-850">
                <Image
                  src={profile.avatarUrl}
                  alt={profile.fullName}
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-steppe-50 tracking-tight leading-none">
                  {profile.fullName}
                </h1>
                <div className="flex items-center gap-2 mt-2 text-xs font-mono text-steppe-400">
                  <MapPin className="w-3.5 h-3.5 text-amber-sun" />
                  <span>{profile.contact.location}</span>
                  <span className="text-steppe-600">•</span>
                  <span className="text-tech-emerald">github.com/{profile.contact.githubUsername}</span>
                </div>
              </div>
            </div>

            {/* Concise Verified Bio (No buzzwords, purely Skills + Experience + Projects) */}
            <p className="text-base sm:text-lg text-steppe-200 leading-relaxed max-w-2xl mt-4 font-sans font-normal">
              {profile.conciseBio}
            </p>

            {/* Featured Core Tech Stack Badges */}
            <div className="mt-6 flex flex-wrap gap-2 max-w-2xl">
              {profile.coreSkills.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium text-steppe-200 bg-steppe-900/80 border border-steppe-750/70 hover:border-tech-emerald/50 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Primary Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#what-i-built"
                className="inline-flex items-center gap-2.5 px-5 py-3 rounded-xl text-sm font-medium text-steppe-950 bg-amber-sun hover:bg-amber-warm transition-all duration-200 shadow-lg shadow-amber-sun/15 font-sans font-semibold group"
              >
                <span>Năng Lực Đã Xây Dựng</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium text-steppe-200 bg-steppe-900 hover:bg-steppe-850 border border-steppe-750 transition-all font-sans"
              >
                <Layers className="w-4 h-4 text-tech-emerald" />
                <span>Chi Tiết Dự Án</span>
              </a>

              <a
                href={profile.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-mono text-steppe-300 hover:text-white bg-steppe-950/60 hover:bg-steppe-900 border border-steppe-800 transition-colors"
              >
                <Code2 className="w-4 h-4" />
                <span>GitHub</span>
              </a>
            </div>

            {/* Quick Proof Note for Recruiter */}
            <div className="mt-8 pt-6 border-t border-steppe-850/80 flex items-center gap-3 text-xs text-steppe-400">
              <Sparkles className="w-4 h-4 text-amber-sun flex-shrink-0" />
              <span>
                Toàn bộ dữ liệu dưới đây minh chứng cho những gì tôi <strong>trực tiếp viết mã</strong> trong các dự án nhóm và kinh nghiệm thực tập tại doanh nghiệp.
              </span>
            </div>

          </div>

          {/* Right Column: The 3D Wolf Canvas (5 cols on lg) */}
          <div className="lg:col-span-5 w-full">
            <div className="relative w-full">
              <WolfCanvasWrapper className="h-[440px] sm:h-[500px] lg:h-[560px]" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
