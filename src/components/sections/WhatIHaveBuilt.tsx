"use client";

import React, { useState } from "react";
import { SkillContributionMapping } from "@/types/portfolio";
import { ArrowRight, CheckCircle2, Layers, Server, Layout, Database, Cpu, Compass } from "lucide-react";

interface WhatIHaveBuiltProps {
  mappings: SkillContributionMapping[];
}

export default function WhatIHaveBuilt({ mappings }: WhatIHaveBuiltProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = [
    { id: "All", label: "Tất Cả Năng Lực", icon: Layers },
    { id: "Backend", label: "Backend & Kiến Trúc", icon: Server },
    { id: "Frontend", label: "Frontend & UI", icon: Layout },
    { id: "Database & Cloud", label: "Cơ Sở Dữ Liệu & Cloud", icon: Database },
    { id: "AI", label: "Tích Hợp AI & Realtime", icon: Cpu },
  ];

  const filteredMappings = selectedCategory === "All"
    ? mappings
    : selectedCategory === "AI"
      ? mappings.filter(m => m.category === "AI" || m.category === "Realtime & Tools")
      : mappings.filter(m => m.category === selectedCategory);

  return (
    <section id="what-i-built" className="py-20 lg:py-28 relative overflow-hidden border-t border-[#A8C9AD]/40">
      {/* Background Gradient & Nature Mist Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f4] via-white/80 to-[#f4f8f4]/90 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] rounded-full bg-[#CFE8F5]/30 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] rounded-full bg-[#A8C9AD]/25 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-nature-sun" />
              <span>Section 02 • Cột Mốc Kiến Tạo Thực Tế</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-nature-deep tracking-tight">
              Kỹ Năng Đã Chuyển Hóa Thành Sản Phẩm Gì?
            </h2>
            <p className="mt-3 text-base text-stone-700 leading-relaxed font-sans">
              Mỗi kỹ năng đều đi kèm với sản phẩm và <strong>đóng góp mã nguồn cụ thể</strong> tôi trực tiếp thực hiện trong CV, minh chứng rõ ràng cho năng lực thực tế.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#A8C9AD]/50 shadow-sm self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-nature-forest text-white shadow-xs"
                      : "text-stone-700 hover:text-nature-deep hover:bg-[#A8C9AD]/20"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Matrix Grid of Proof-of-Work Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredMappings.map((item, idx) => (
            <div
              key={item.id}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/50 hover:border-nature-forest transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-nature-forest/10 hover:-translate-y-0.5 flex flex-col justify-between"
            >
              <div>
                {/* Top Flow: Skill -> Project */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-[#F7F6EC] text-nature-forest border border-[#A8C9AD]/60 shadow-xs">
                    {item.skill}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-nature-amber" />
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-bold bg-white text-nature-deep border border-[#A8C9AD]/50 shadow-xs">
                    {item.project}
                  </span>
                  <span className="ml-auto text-xs font-mono text-stone-500 font-semibold">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>

                {/* Direct Verifiable Contribution */}
                <div className="flex items-start gap-3 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-nature-forest mt-1 flex-shrink-0" />
                  <p className="text-sm text-stone-800 leading-relaxed font-sans font-normal">
                    {item.contribution}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-5 pt-3.5 border-t border-[#A8C9AD]/30 flex items-center justify-between text-[11px] font-mono text-stone-600">
                <span>Vùng sinh thái: <strong className="text-nature-deep font-bold">{item.category}</strong></span>
                <span className="text-nature-forest font-bold">✓ Đã kiểm chứng CV</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
