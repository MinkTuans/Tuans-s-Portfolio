"use client";

import React, { useState } from "react";
import { ProjectCaseStudy } from "@/types/portfolio";
import { ArrowUpRight, Calendar, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import ProjectCaseStudyModal from "../project-modal/ProjectCaseStudyModal";

interface ProjectsProps {
  projects: ProjectCaseStudy[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#f4f7f3] border-t border-meadow-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sun-amber" />
            <span>Section 03 • Dự Án Thực Tế</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            Sản Phẩm & Đóng Góp Kỹ Thuật
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
            Mỗi dự án đều tập trung làm nổi bật vai trò và <strong>những phần tôi trực tiếp xây dựng</strong>. Nhấp vào bất kỳ dự án nào để xem toàn bộ Case Study chuyên sâu (01 — 06).
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-white hover:bg-white border border-meadow-200/90 hover:border-meadow-400 p-6 sm:p-8 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-meadow-900/5 hover:-translate-y-1"
            >
              <div>
                {/* Top Info Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono font-semibold text-sun-amber bg-sun-light border border-sun-amber/20">
                    {project.projectType}
                  </span>
                  <span className="text-xs font-mono text-stone-600 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-stone-600" />
                    {project.timeframe}
                  </span>
                </div>

                {/* Project Title & Role */}
                <h3 className="text-2xl font-display font-bold text-stone-900 group-hover:text-meadow-900 transition-colors">
                  {project.name}
                </h3>
                <div className="mt-1 text-xs font-mono font-semibold text-meadow-800">
                  Vai trò: {project.role}
                </div>

                {/* Short Tagline / Summary */}
                <p className="mt-3 text-sm text-stone-600 leading-relaxed font-sans line-clamp-3">
                  {project.tagline}
                </p>

                {/* What I Directly Built Highlights */}
                <div className="mt-6 pt-5 border-t border-meadow-100">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-stone-700 font-semibold mb-2.5 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-sun-amber" />
                    <span>Trực tiếp viết mã (Highlights):</span>
                  </div>
                  <ul className="space-y-2">
                    {project.myContribution.slice(0, 2).map((contrib, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-stone-800 leading-relaxed font-sans">
                        <CheckCircle2 className="w-3.5 h-3.5 text-meadow-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">{contrib}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Badges */}
                <div className="mt-6 flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 5).map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono bg-meadow-50 text-meadow-900 border border-meadow-200"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-stone-600 bg-stone-100 border border-stone-200">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-8 pt-5 border-t border-meadow-100 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-meadow-800 hover:text-meadow-950 transition-colors group/btn"
                >
                  <span>Xem Full Case Study (01-06)</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-stone-600 hover:text-stone-900 bg-meadow-50 hover:bg-meadow-100 border border-meadow-200 transition-colors shadow-sm"
                    title="Xem trên GitHub"
                    aria-label={`Mã nguồn ${project.name} trên GitHub`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Case Study Full Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
