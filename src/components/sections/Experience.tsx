"use client";

import React from "react";
import { ExperienceItem, EducationItem } from "@/types/portfolio";
import { Building2, Calendar, CheckCircle2, Compass, GraduationCap, Award } from "lucide-react";

interface ExperienceProps {
  experience: ExperienceItem[];
  education?: EducationItem;
}

export default function Experience({ experience, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 lg:py-28 relative bg-[#fbfcf9] border-t border-meadow-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-sun-amber" />
            <span>Section 04 • Kinh Nghiệm & Học Vấn</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            Kinh Nghiệm Thực Tế & Nền Tảng Học Vấn
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
            Nơi năng lực kỹ thuật được trui rèn qua các hệ thống nghiệp vụ thực thụ trong môi trường doanh nghiệp cùng nền tảng đào tạo bài bản.
          </p>
        </div>

        {/* Steppe Morning Timeline */}
        <div className="relative border-l-2 border-meadow-200 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {/* 1. Enterprise Work Experience */}
          {experience.map((item) => (
            <div key={item.id} className="relative group">
              
              {/* Steppe Milestone Compass Marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-meadow-600 flex items-center justify-center text-meadow-700 shadow-md">
                <Compass className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:rotate-45 transition-transform duration-500" />
              </div>

              {/* Milestone Content Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white hover:bg-white border border-meadow-200/90 hover:border-meadow-400 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-meadow-900/5">
                
                {/* Header Info */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-base sm:text-lg font-display font-bold text-stone-900">
                    <Building2 className="w-4 h-4 text-meadow-700" />
                    <span>{item.company}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-sun-amber bg-sun-light px-3 py-1 rounded-full border border-sun-amber/20 self-start sm:self-auto font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.timeframe}</span>
                  </div>
                </div>

                {/* Role Title */}
                <div className="text-sm font-mono font-bold text-stone-700 mb-4">
                  Vị trí: <span className="text-meadow-800">{item.position}</span>
                </div>

                {/* Direct Responsibilities & Real Work */}
                <div className="space-y-3 mb-6">
                  {item.accomplishments.map((acc, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-sm text-stone-700 leading-relaxed font-sans">
                      <CheckCircle2 className="w-4 h-4 text-meadow-600 mt-1 flex-shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Used */}
                <div className="pt-5 border-t border-meadow-100 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-stone-600 mr-2">Công nghệ:</span>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl text-xs font-mono bg-meadow-50 text-meadow-900 border border-meadow-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

          {/* 2. Formal Education (FPT Polytechnic College) */}
          {education && (
            <div className="relative group">
              {/* Steppe Milestone Graduation Marker */}
              <div className="absolute -left-[35px] sm:-left-[51px] top-2 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-sun-amber flex items-center justify-center text-sun-amber shadow-md">
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:scale-110 transition-transform duration-300" />
              </div>

              {/* Education Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-meadow-200/90 hover:border-sun-amber/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-amber-900/5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 text-base sm:text-lg font-display font-bold text-stone-900">
                    <GraduationCap className="w-5 h-5 text-sun-amber" />
                    <span>{education.school}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-meadow-800 bg-meadow-100 px-3 py-1 rounded-full border border-meadow-200 self-start sm:self-auto font-semibold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{education.timeframe}</span>
                  </div>
                </div>

                <div className="text-sm font-mono text-stone-700 mb-3">
                  Chuyên ngành: <span className="font-bold text-meadow-900">{education.major}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-50 border border-amber-200 text-xs font-mono text-amber-900 font-bold mb-4">
                  <Award className="w-4 h-4 text-sun-amber" />
                  <span>Điểm trung bình tích lũy: GPA {education.gpa}</span>
                </div>

                <p className="text-sm text-stone-600 font-sans leading-relaxed">
                  Đào tạo chính quy về phát triển ứng dụng web, cấu trúc dữ liệu, lập trình hướng đối tượng (OOP), ngôn ngữ C#, PHP, cơ sở dữ liệu MySQL và các nguyên lý kiến trúc phần mềm tiêu chuẩn.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
