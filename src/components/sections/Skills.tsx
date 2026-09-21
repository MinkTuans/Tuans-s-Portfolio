"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/types/portfolio";
import {
  Trees,
  Mountain,
  Waves,
  Cloud,
  Tent,
  Sprout,
  Search,
  Sparkles,
  Map,
} from "lucide-react";

interface SkillsProps {
  categories: SkillCategory[];
}

interface BiomeMeta {
  biomeName: string;
  biomeEn: string;
  icon: React.ElementType;
  gradient: string;
  badgeColor: string;
}

export default function Skills({ categories }: SkillsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getBiomeMeta = (id: string): BiomeMeta => {
    switch (id) {
      case "frontend":
        return {
          biomeName: "Khu Rừng Thông",
          biomeEn: "Forest",
          icon: Trees,
          gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
          badgeColor: "bg-emerald-100 text-emerald-900 border-emerald-300",
        };
      case "backend":
        return {
          biomeName: "Dãy Núi Đá",
          biomeEn: "Mountain",
          icon: Mountain,
          gradient: "from-stone-500/10 via-stone-500/5 to-transparent",
          badgeColor: "bg-stone-100 text-stone-900 border-stone-300",
        };
      case "database-cloud":
        return {
          biomeName: "Lòng Hồ Nước",
          biomeEn: "Lake",
          icon: Waves,
          gradient: "from-cyan-500/10 via-cyan-500/5 to-transparent",
          badgeColor: "bg-cyan-100 text-cyan-900 border-cyan-300",
        };
      case "ai-integration":
        return {
          biomeName: "Bầu Trời Mở",
          biomeEn: "Sky",
          icon: Cloud,
          gradient: "from-sky-500/10 via-sky-500/5 to-transparent",
          badgeColor: "bg-sky-100 text-sky-900 border-sky-300",
        };
      case "realtime-tools":
        return {
          biomeName: "Khu Trại",
          biomeEn: "Camp",
          icon: Tent,
          gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
          badgeColor: "bg-amber-100 text-amber-900 border-amber-300",
        };
      case "practices":
      default:
        return {
          biomeName: "Đồng Cỏ Thảo Nguyên",
          biomeEn: "Meadow",
          icon: Sprout,
          gradient: "from-green-500/10 via-green-500/5 to-transparent",
          badgeColor: "bg-green-100 text-green-900 border-green-300",
        };
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative overflow-hidden border-t border-[#A8C9AD]/40">
      {/* Nature Mist & Ambient Landscape Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f4] via-white/80 to-[#f4f8f4]/95 pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#A8C9AD]/20 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] rounded-full bg-[#CFE8F5]/25 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep uppercase tracking-wider mb-3 shadow-xs">
              <Map className="w-3.5 h-3.5 text-nature-forest" />
              <span>Section 05 • Natural Skill Map</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-nature-deep tracking-tight">
              Bản Đồ Năng Lực Kỹ Thuật (Natural Skill Map)
            </h2>
            <p className="mt-3 text-base text-stone-700 leading-relaxed font-sans">
              Các kỹ năng được quy hoạch thành các vùng sinh thái tự nhiên: <strong>Forest</strong> (Frontend), <strong>Mountain</strong> (Backend), <strong>Lake</strong> (Database), <strong>Sky</strong> (AI), <strong>Camp</strong> (Dev Tools) và <strong>Meadow</strong> (Kỹ năng mềm), phản ánh chính xác năng lực thực chiến trong CV.
            </p>
          </div>

          {/* Quick Filter/Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-500 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm công nghệ (Laravel, React, MySQL)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-stone-900 placeholder-stone-500 focus:outline-none focus:border-nature-forest shadow-xs transition-all"
            />
          </div>
        </div>

        {/* Natural Skill Map Grid (2-3 columns with nature biomes) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const biome = getBiomeMeta(category.id);
            const BiomeIcon = biome.icon;

            const matchingSkills = category.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (s.roleOrContext && s.roleOrContext.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (searchQuery && matchingSkills.length === 0) return null;

            return (
              <div
                key={category.id}
                className="group relative flex flex-col rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/55 hover:border-nature-forest p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-nature-forest/10 hover:-translate-y-1 overflow-hidden"
              >
                {/* Subtle Biome Nature Gradient Background on Top Right */}
                <div
                  className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-bl ${biome.gradient} rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500`}
                />

                {/* Biome Region Badge & Icon */}
                <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-2xl bg-white border border-[#A8C9AD]/60 flex items-center justify-center text-nature-forest shadow-xs group-hover:bg-nature-forest group-hover:text-white transition-colors duration-300">
                      <BiomeIcon className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono font-bold text-stone-500 uppercase tracking-wider block">
                        Biome: {biome.biomeEn}
                      </span>
                      <h3 className="text-base font-display font-bold text-nature-deep leading-tight">
                        {category.title}
                      </h3>
                    </div>
                  </div>
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border shadow-2xs ${biome.badgeColor}`}>
                    {biome.biomeName}
                  </span>
                </div>

                <p className="text-xs text-stone-600 mb-5 leading-relaxed font-sans relative z-10">
                  {category.description}
                </p>

                {/* Skills List Inside Biome */}
                <div className="space-y-2.5 mt-auto relative z-10">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-2xl bg-white/80 border border-[#A8C9AD]/40 hover:border-nature-forest hover:bg-white transition-all shadow-2xs group/item"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-nature-deep group-hover/item:text-nature-forest transition-colors">
                          {skill.name}
                        </span>
                        {skill.isCore && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold text-nature-amber bg-nature-sun/20 border border-nature-amber/30">
                            Core
                          </span>
                        )}
                      </div>
                      {skill.roleOrContext && (
                        <p className="mt-1 text-[11px] text-stone-600 font-sans leading-relaxed">
                          {skill.roleOrContext}
                        </p>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
