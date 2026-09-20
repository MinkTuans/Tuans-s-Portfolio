"use client";

import React, { useState } from "react";
import { ProjectCaseStudy } from "@/types/portfolio";
import { ArrowUpRight, Calendar, CheckCircle2, ChevronRight, Code2, Layers, Users, Zap } from "lucide-react";
import ProjectCaseStudyModal from "../project-modal/ProjectCaseStudyModal";

interface ProjectsProps {
  projects: ProjectCaseStudy[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-steppe-950 border-t border-steppe-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steppe-900 border border-steppe-750 text-xs font-mono text-amber-sun uppercase tracking-wider mb-3">
            <span>Section 03 • Engineering Projects</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-steppe-50 tracking-tight">
            Dự Án Đã Triển Khai
          </h2>
          <p className="mt-3 text-base text-steppe-300 leading-relaxed">
            Mỗi dự án đều thể hiện rõ vai trò, kiến trúc kỹ thuật và trọng tâm <strong>những phần tôi trực tiếp xây dựng</strong>. Nhấp vào bất kỳ dự án nào để xem toàn bộ Case Study chuyên sâu (01 — 06).
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project, idx) => (
            <div
              key={project.id}
              className="group relative flex flex-col justify-between rounded-3xl bg-steppe-900/60 hover:bg-steppe-900/90 border border-steppe-800/80 hover:border-steppe-700 p-6 sm:p-7 transition-all duration-300 shadow-lg shadow-black/20 hover:shadow-black/40"
            >
              <div>
                {/* Top Info Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-medium text-amber-sun bg-amber-sun/10 border border-amber-sun/20">
                    {project.projectType}
                  </span>
                  <span className="text-xs font-mono text-steppe-400 flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-steppe-500" />
                    {project.timeframe}
                  </span>
                </div>

                {/* Project Title & Role */}
                <h3 className="text-2xl font-display font-bold text-steppe-100 group-hover:text-white transition-colors">
                  {project.name}
                </h3>
                <div className="mt-1 text-xs font-mono font-semibold text-tech-emerald">
                  Vai trò: {project.role}
                </div>

                {/* Short Tagline / Summary */}
                <p className="mt-3 text-sm text-steppe-300 leading-relaxed font-sans line-clamp-3">
                  {project.tagline}
                </p>

                {/* What I Directly Built Highlights */}
                <div className="mt-6 pt-5 border-t border-steppe-850">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-steppe-400 font-semibold mb-2.5 flex items-center gap-1.5">
                    <Zap className="w-3 h-3 text-amber-sun" />
                    <span>Trực tiếp viết mã (Highlights):</span>
                  </div>
                  <ul className="space-y-2">
                    {project.myContribution.slice(0, 2).map((contrib, cIdx) => (
                      <li key={cIdx} className="flex items-start gap-2 text-xs text-steppe-200 leading-relaxed">
                        <CheckCircle2 className="w-3.5 h-3.5 text-tech-emerald mt-0.5 flex-shrink-0" />
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
                      className="px-2.5 py-0.5 rounded-md text-[11px] font-mono bg-steppe-850 text-steppe-300 border border-steppe-750"
                    >
                      {t}
                    </span>
                  ))}
                  {project.technologies.length > 5 && (
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-mono text-steppe-400 bg-steppe-900 border border-steppe-800">
                      +{project.technologies.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Action Area */}
              <div className="mt-8 pt-4 border-t border-steppe-850 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="inline-flex items-center gap-1 text-xs font-mono font-medium text-amber-sun hover:text-amber-warm transition-colors group/btn"
                >
                  <span>Xem Full Case Study (01-06)</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>

                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg text-steppe-400 hover:text-white bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
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
