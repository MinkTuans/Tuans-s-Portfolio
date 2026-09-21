"use client";

import React, { useState } from "react";
import { SkillContributionMapping } from "@/types/portfolio";
import { ArrowRight, CheckCircle2, Layers, Server, Layout, Database, Cpu } from "lucide-react";

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
    <section id="what-i-built" className="py-20 lg:py-28 relative bg-[#f8faf7] border-t border-meadow-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sun-amber" />
              <span>Section 02 • Cột Mốc Kiến Tạo Thực Tế</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
              Kỹ Năng Đã Chuyển Hóa Thành Sản Phẩm Gì?
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
              Mỗi kỹ năng đều đi kèm với sản phẩm và <strong>đóng góp mã nguồn cụ thể</strong> tôi trực tiếp thực hiện trong CV, minh chứng rõ ràng cho năng lực thực tế.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white border border-meadow-200 shadow-sm self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-meadow-800 text-white font-semibold shadow-sm"
                      : "text-stone-600 hover:text-stone-900 hover:bg-meadow-50"
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
          {filteredMappings.map((item, idx) => (
            <div
              key={item.id}
              className="group relative p-6 sm:p-7 rounded-3xl bg-white hover:bg-white border border-meadow-200/90 hover:border-meadow-400 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-meadow-900/5 flex flex-col justify-between"
            >
              <div>
                {/* Top Flow: Skill -> Project */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-semibold bg-meadow-50 text-meadow-900 border border-meadow-200">
                    {item.skill}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-600" />
                  <span className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-sun-light text-sun-amber border border-sun-amber/20">
                    {item.project}
                  </span>
                  <span className="ml-auto text-xs font-mono text-stone-600">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>

                {/* Direct Verifiable Contribution */}
                <div className="flex items-start gap-3 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-meadow-600 mt-1 flex-shrink-0" />
                  <p className="text-sm text-stone-800 leading-relaxed font-sans font-normal">
                    {item.contribution}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-5 pt-3 border-t border-meadow-100 flex items-center justify-between text-[11px] font-mono text-stone-600">
                <span>Phân loại: <strong className="text-stone-700">{item.category}</strong></span>
                <span className="text-meadow-700 font-semibold">✓ Đã kiểm chứng CV</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
