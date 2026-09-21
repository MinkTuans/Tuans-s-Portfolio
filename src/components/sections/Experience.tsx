"use client";

import React from "react";
import Image from "next/image";
import { ExperienceItem, EducationItem } from "@/types/portfolio";
import {
  Building2,
  Calendar,
  CheckCircle2,
  Compass,
  GraduationCap,
  Award,
  Trees,
  Tent,
  Sparkles,
  MapPin,
  Flame,
} from "lucide-react";

interface ExperienceProps {
  experience: ExperienceItem[];
  education?: EducationItem;
}

export default function Experience({ experience, education }: ExperienceProps) {
  return (
    <section id="experience" className="py-20 lg:py-28 relative overflow-hidden border-t border-[#A8C9AD]/40">
      {/* Background Natural Gradient & Ambient Foliage Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f4]/95 via-white/80 to-[#f4f8f4]/90 pointer-events-none" />
      <div className="absolute top-1/4 left-10 w-[550px] h-[550px] rounded-full bg-[#A8C9AD]/20 blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-[#CFE8F5]/25 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep uppercase tracking-wider mb-3 shadow-xs">
            <Tent className="w-3.5 h-3.5 text-nature-forest" />
            <span>Section 04 • Rừng Kinh Nghiệm & Trạm Dừng Chân</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-nature-deep tracking-tight">
            Kinh Nghiệm Thực Tế & Nền Tảng Học Vấn
          </h2>
          <p className="mt-3 text-base text-stone-700 leading-relaxed font-sans">
            Mỗi chặng đường là một <strong>trạm dừng chân (Camp)</strong> giữa khu rừng sự nghiệp — nơi năng lực lập trình web được tôi luyện qua môi trường doanh nghiệp thực thụ và đào tạo chính quy bài bản.
          </p>
        </div>

        {/* Forest Trail Vertical Timeline (Tree Trunk / Forest Trail Aesthetic) */}
        <div className="relative border-l-3 border-[#6F9F72]/50 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {/* Camp 01: Enterprise Work Experience (Ngọc Phi Thúy Jade) */}
          {experience.map((item, idx) => (
            <div key={item.id} className="relative group">
              
              {/* Waypoint Marker On Trunk */}
              <div className="absolute -left-[35px] sm:-left-[53px] top-2 w-7 h-7 sm:w-8 sm:h-8 rounded-2xl bg-white border-2 border-nature-forest flex items-center justify-center text-nature-forest shadow-md group-hover:bg-nature-forest group-hover:text-white transition-all duration-300">
                <Flame className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>

              {/* Camp Content Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-forest transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-nature-forest/10">
                
                {/* Camp Badge & Timeline */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-nature-forest/10 text-nature-forest border border-nature-forest/20">
                      Camp 0{idx + 1} • Thực Tập Doanh Nghiệp
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-nature-deep flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-nature-forest" />
                      <span>{item.company}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-nature-amber bg-nature-sun/15 px-3 py-1 rounded-full border border-nature-amber/25 self-start sm:self-auto font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.timeframe}</span>
                  </div>
                </div>

                {/* Position */}
                <div className="text-sm font-mono font-bold text-stone-800 mb-4">
                  Vị trí: <span className="text-nature-forest">{item.position}</span>
                </div>

                {/* Accomplishments & Responsibilities */}
                <div className="space-y-3 mb-6">
                  {item.accomplishments.map((acc, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-3 text-sm text-stone-800 leading-relaxed font-sans">
                      <CheckCircle2 className="w-4 h-4 text-nature-forest mt-0.5 flex-shrink-0" />
                      <span>{acc}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Used */}
                <div className="pt-5 border-t border-[#A8C9AD]/30 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-mono text-stone-600 font-semibold mr-2">Công nghệ:</span>
                  {item.technologies.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-[#F7F6EC] text-nature-deep border border-[#A8C9AD]/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>

              </div>
            </div>
          ))}

          {/* Camp 02: Formal Education (Cao đẳng FPT Polytechnic) */}
          {education && (
            <div className="relative group">
              {/* Waypoint Graduation Cap Marker On Trunk */}
              <div className="absolute -left-[35px] sm:-left-[53px] top-2 w-7 h-7 sm:w-8 sm:h-8 rounded-2xl bg-white border-2 border-nature-amber flex items-center justify-center text-nature-amber shadow-md group-hover:bg-nature-amber group-hover:text-white transition-all duration-300">
                <GraduationCap className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </div>

              {/* Education Camp Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-amber transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-nature-amber/10">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-nature-amber/10 text-nature-amber border border-nature-amber/20">
                      Camp Nền Tảng • Đào Tạo Chính Quy
                    </span>
                    <h3 className="text-base sm:text-lg font-display font-bold text-nature-deep flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-nature-amber" />
                      <span>{education.school}</span>
                    </h3>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-mono text-nature-forest bg-nature-forest/10 px-3 py-1 rounded-full border border-nature-forest/20 self-start sm:self-auto font-bold">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{education.timeframe}</span>
                  </div>
                </div>

                <div className="text-sm font-mono text-stone-800 mb-3">
                  Chuyên ngành: <span className="font-bold text-nature-deep">{education.major}</span>
                </div>

                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#F7F6EC] border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep font-bold mb-4 shadow-2xs">
                  <Award className="w-4 h-4 text-nature-amber" />
                  <span>Điểm trung bình tích lũy: GPA {education.gpa}</span>
                </div>

                <p className="text-sm text-stone-700 font-sans leading-relaxed">
                  Đào tạo chính quy bài bản về phát triển ứng dụng web hiện đại, cấu trúc dữ liệu và giải thuật, lập trình hướng đối tượng (OOP), ngôn ngữ C#, PHP, cơ sở dữ liệu quan hệ MySQL và các nguyên lý kiến trúc phần mềm tiêu chuẩn.
                </p>
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
