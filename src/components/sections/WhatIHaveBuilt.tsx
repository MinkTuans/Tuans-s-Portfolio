"use client";

import React, { useState } from "react";
import { SkillContributionMapping } from "@/types/portfolio";
import { ArrowRight, CheckCircle2, Filter, Layers, Server, Layout, Database, Cpu } from "lucide-react";

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
    <section id="what-i-built" className="py-20 lg:py-28 relative bg-steppe-950/60 border-t border-steppe-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steppe-900 border border-steppe-750 text-xs font-mono text-amber-sun uppercase tracking-wider mb-3">
              <span>Section 02 • Proof of Work</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-steppe-50 tracking-tight">
              Kỹ Năng Đã Chuyển Thành Sản Phẩm Gì?
            </h2>
            <p className="mt-3 text-base text-steppe-300 leading-relaxed">
              Không chỉ là danh sách lý thuyết. Đây là mối liên hệ thực tế giữa <strong>Kỹ năng</strong> ➔ <strong>Dự án triển khai</strong> ➔ <strong>Những phần tôi trực tiếp viết mã</strong> trong CV.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-xl bg-steppe-900/90 border border-steppe-800 self-start md:self-auto overflow-x-auto max-w-full">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                    isActive
                      ? "bg-steppe-800 text-amber-sun font-semibold shadow-sm border border-steppe-700"
                      : "text-steppe-400 hover:text-steppe-200 hover:bg-steppe-850/60"
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
              className="group relative p-6 rounded-2xl bg-steppe-900/60 hover:bg-steppe-900 border border-steppe-800/80 hover:border-steppe-700 transition-all duration-300 shadow-sm flex flex-col justify-between"
            >
              <div>
                {/* Top Flow: Skill -> Project */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold bg-steppe-800 text-steppe-100 border border-steppe-700">
                    {item.skill}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 text-steppe-500" />
                  <span className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-amber-sun/10 text-amber-sun border border-amber-sun/20">
                    {item.project}
                  </span>
                  <span className="ml-auto text-[11px] font-mono text-steppe-400">
                    #{idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                  </span>
                </div>

                {/* Direct Verifiable Contribution */}
                <div className="flex items-start gap-3 mt-3">
                  <CheckCircle2 className="w-4 h-4 text-tech-emerald mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-steppe-200 leading-relaxed font-sans">
                    {item.contribution}
                  </p>
                </div>
              </div>

              {/* Bottom Subtle Tag */}
              <div className="mt-5 pt-3 border-t border-steppe-850 flex items-center justify-between text-[11px] font-mono text-steppe-400">
                <span>Phân loại: {item.category}</span>
                <span className="text-tech-emerald">Đã kiểm chứng CV</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
