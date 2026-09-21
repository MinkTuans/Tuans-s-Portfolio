"use client";

import React, { useState } from "react";
import { SkillCategory } from "@/types/portfolio";
import { Layout, Server, Database, Wrench, Cpu, CheckSquare, Search, Sparkles } from "lucide-react";

interface SkillsProps {
  categories: SkillCategory[];
}

export default function Skills({ categories }: SkillsProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case "frontend":
        return Layout;
      case "backend":
        return Server;
      case "database-cloud":
        return Database;
      case "realtime-tools":
        return Wrench;
      case "ai-integration":
        return Cpu;
      default:
        return CheckSquare;
    }
  };

  return (
    <section id="skills" className="py-20 lg:py-28 relative bg-[#f4f8f4] border-t border-meadow-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sun-amber" />
              <span>Section 05 • Hệ Sinh Thái Kỹ Năng</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
              Bản Đồ Năng Lực Kỹ Thuật
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
              Phân nhóm logic theo chuẩn công nghiệp kèm <strong>ngữ cảnh áp dụng thực tế</strong>. Không tự nhận điểm số phần trăm cảm tính.
            </p>
          </div>

          {/* Quick Filter/Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-stone-600 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm nhanh công nghệ (e.g. Laravel, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white border border-meadow-200 text-xs font-mono text-stone-900 placeholder-stone-600 focus:outline-none focus:border-meadow-500 shadow-sm transition-colors"
            />
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const Icon = getCategoryIcon(category.id);
            const matchingSkills = category.skills.filter((s) =>
              s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              (s.roleOrContext && s.roleOrContext.toLowerCase().includes(searchQuery.toLowerCase()))
            );

            if (searchQuery && matchingSkills.length === 0) return null;

            return (
              <div
                key={category.id}
                className="flex flex-col rounded-3xl bg-white border border-meadow-200/90 hover:border-meadow-400 p-6 sm:p-7 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-meadow-900/5"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-meadow-100 border border-meadow-200 flex items-center justify-center text-meadow-800 flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-stone-900">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-stone-600 mb-5 leading-relaxed font-sans">
                  {category.description}
                </p>

                {/* Skills List in this Category */}
                <div className="space-y-2.5 mt-auto">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-2xl bg-meadow-50/50 border border-meadow-200/70 hover:border-meadow-300 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-stone-900">
                          {skill.name}
                        </span>
                        {skill.isCore && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold text-sun-amber bg-sun-light border border-sun-amber/20">
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
