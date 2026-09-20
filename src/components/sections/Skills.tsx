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
    <section id="skills" className="py-20 lg:py-28 relative bg-steppe-950 border-t border-steppe-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steppe-900 border border-steppe-750 text-xs font-mono text-amber-sun uppercase tracking-wider mb-3">
              <span>Section 05 • Skill Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-steppe-50 tracking-tight">
              Bản Đồ Kỹ Năng Kỹ Thuật
            </h2>
            <p className="mt-3 text-base text-steppe-300 leading-relaxed">
              Phân nhóm mạch lạc theo taxonomy chuẩn công nghiệp, kèm theo <strong>ngữ cảnh ứng dụng thực tế</strong> trong các sản phẩm đã thực hiện. Không đánh giá phần trăm cảm tính.
            </p>
          </div>

          {/* Quick Filter/Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-steppe-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Tìm nhanh công nghệ (e.g. Laravel, React)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-steppe-900 border border-steppe-750 text-xs font-mono text-steppe-100 placeholder-steppe-400 focus:outline-none focus:border-amber-sun/60 transition-colors"
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
                className="flex flex-col rounded-3xl bg-steppe-900/50 hover:bg-steppe-900/80 border border-steppe-800/80 hover:border-steppe-750 p-6 transition-all duration-300 shadow-md shadow-black/10"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-steppe-800 border border-steppe-700 flex items-center justify-center text-amber-sun flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-display font-bold text-steppe-100">
                      {category.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs text-steppe-400 mb-5 leading-relaxed">
                  {category.description}
                </p>

                {/* Skills List in this Category */}
                <div className="space-y-2.5 mt-auto">
                  {matchingSkills.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-3 rounded-xl bg-steppe-850/70 border border-steppe-800 hover:border-steppe-700 transition-colors"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-semibold text-steppe-100">
                          {skill.name}
                        </span>
                        {skill.isCore && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono text-amber-sun bg-amber-sun/10 border border-amber-sun/20">
                            Core
                          </span>
                        )}
                      </div>
                      {skill.roleOrContext && (
                        <p className="mt-1 text-[11px] text-steppe-400 font-sans leading-relaxed">
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
