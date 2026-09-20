"use client";

import React from "react";
import { ExperienceItem } from "@/types/portfolio";
import { Building2, Calendar, CheckCircle2, Compass, ShieldCheck } from "lucide-react";

interface ExperienceProps {
  experience: ExperienceItem[];
}

export default function Experience({ experience }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-steppe-950/70 border-t border-steppe-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steppe-900 border border-steppe-750 text-xs font-mono text-amber-sun uppercase tracking-wider mb-3">
            <span>Section 04 • Journey Milestones</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-steppe-50 tracking-tight">
            Kinh Nghiệm Thực Tế Tại Doanh Nghiệp
          </h2>
          <p className="mt-3 text-base text-steppe-300 leading-relaxed">
            Các chặng dừng chân trên hành trình rèn luyện bản lĩnh. Nơi kỹ năng được tôi luyện qua các hệ thống vận hành thực thụ trong môi trường doanh nghiệp.
          </p>
        </div>

        {/* Steppe Journey Timeline */}
        <div className="relative border-l-2 border-steppe-800 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          {experience.map((item, idx) => (
            <div key={item.id} className="relative group">
              
              {/* Steppe Milestone Compass Marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-steppe-900 border-2 border-amber-sun flex items-center justify-center text-amber-sun shadow-md shadow-amber-sun/20">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform duration-500" />
              </div>

              {/* Milestone Content Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-steppe-900/60 hover:bg-steppe-900/90 border border-steppe-800/80 hover:border-steppe-700 transition-all duration-300 shadow-xl shadow-black/20">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-sm sm:text-base font-display font-bold text-steppe-100">
                    <Building2 className="w-4 h-4 text-tech-emerald" />
                    <span>{item.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-amber-sun bg-amber-sun/10 px-3 py-1 rounded-full border border-amber-sun/20 self-start sm:self-auto">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.timeframe}</span>
                  </div>
                </div>

                {/* Role Title */}
                <div className="text-sm font-mono font-semibold text-steppe-200 mb-4">
                  Vai trò: <span className="text-tech-emerald">{item.position}</span>
                </div>

                {/* Direct Responsibilities & Real Work */}
                <div className="space-y-3 mb-6">
                  {item.accomplishments.map((acc, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-sm text-steppe-200 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-tech-emerald mt-0.5 flex-shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Used */}
                <div className="pt-4 border-t border-steppe-850 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-steppe-400 mr-2">Công nghệ:</span>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-steppe-850 text-steppe-200 border border-steppe-750"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
