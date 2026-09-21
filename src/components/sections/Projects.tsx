"use client";

import React, { useState } from "react";
import { ProjectCaseStudy, GitHubRepo } from "@/types/portfolio";
import {
  ArrowUpRight,
  Calendar,
  CheckCircle2,
  ChevronRight,
  GitFork,
  Github,
  Layers,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";
import ProjectCaseStudyModal from "../project-modal/ProjectCaseStudyModal";

interface ProjectsProps {
  projects: ProjectCaseStudy[];
  gitHubRepos?: GitHubRepo[];
}

export default function Projects({ projects, gitHubRepos = [] }: ProjectsProps) {
  const [selectedProject, setSelectedProject] = useState<ProjectCaseStudy | null>(null);
  const [activeFilter, setActiveFilter] = useState<"all" | "featured" | "github">("all");

  const totalCount = projects.length + gitHubRepos.length;

  const showFeatured = activeFilter === "all" || activeFilter === "featured";
  const showGitHub = activeFilter === "all" || activeFilter === "github";

  const getLanguageColor = (lang: string | null) => {
    switch (lang?.toLowerCase()) {
      case "typescript":
        return "bg-blue-500";
      case "javascript":
        return "bg-amber-400";
      case "python":
        return "bg-emerald-500";
      case "php":
        return "bg-indigo-500";
      case "html":
      case "css":
        return "bg-orange-500";
      default:
        return "bg-meadow-600";
    }
  };

  const formatDate = (isoStr: string) => {
    try {
      const d = new Date(isoStr);
      return `${d.getDate().toString().padStart(2, "0")}/${(d.getMonth() + 1).toString().padStart(2, "0")}/${d.getFullYear()}`;
    } catch {
      return isoStr;
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative bg-[#f4f7f3] border-t border-meadow-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-sun-amber" />
              <span>Section 03 • Dự Án Thực Tế & GitHub Repos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
              Sản Phẩm & Đóng Góp Kỹ Thuật
            </h2>
            <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
              Bao gồm các <strong>dự án thực tế trọng điểm</strong> (kèm Case Study chuyên sâu) và các <strong>repository mã nguồn mở</strong> được tự động đồng bộ từ tài khoản GitHub.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white border border-meadow-200 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeFilter === "all"
                  ? "bg-meadow-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-meadow-50"
              }`}
            >
              Tất Cả ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all ${
                activeFilter === "featured"
                  ? "bg-meadow-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-meadow-50"
              }`}
            >
              Trọng Điểm ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter("github")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all flex items-center gap-1.5 ${
                activeFilter === "github"
                  ? "bg-meadow-900 text-white shadow-sm"
                  : "text-stone-600 hover:text-stone-900 hover:bg-meadow-50"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repos ({gitHubRepos.length})</span>
            </button>
          </div>
        </div>

        {/* Featured Projects Sub-Section */}
        {showFeatured && (
          <div className="mb-14">
            {activeFilter === "all" && (
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-sun-amber" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-meadow-900 font-bold">
                  Dự Án Trọng Điểm & Case Study Chuyên Sâu
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
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
        )}

        {/* Auto-synced GitHub Repositories Sub-Section */}
        {showGitHub && gitHubRepos.length > 0 && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
              <div className="flex items-center gap-2">
                <Github className="w-4 h-4 text-stone-700" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-stone-800 font-bold">
                  Kho Repository GitHub (Tự Động Đồng Bộ)
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-mono text-emerald-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-synced • Loại trừ portfolio & profile repo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gitHubRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-white border border-meadow-200 hover:border-meadow-400 hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    {/* Top Row: Language & Updated Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span className="text-xs font-mono font-medium text-stone-700">
                          {repo.language || "Code"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-600">
                        Cập nhật: {formatDate(repo.updated_at)}
                      </span>
                    </div>

                    {/* Repo Title */}
                    <h4 className="text-lg font-display font-bold text-stone-900 hover:text-meadow-900 transition-colors">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-600" />
                      </a>
                    </h4>

                    {/* Repo Description */}
                    <p className="mt-2 text-xs text-stone-600 font-sans leading-relaxed line-clamp-3">
                      {repo.description || "Dự án phát triển mã nguồn mở trên GitHub."}
                    </p>

                    {/* Topics/Tags if any */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-stone-100 text-stone-600"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Stars & GitHub Link Button */}
                  <div className="mt-5 pt-4 border-t border-meadow-100 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-stone-600" />
                          <span>{repo.forks_count}</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-medium text-meadow-800 hover:text-meadow-950 transition-colors"
                    >
                      <span>Xem repo</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* Case Study Full Modal */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
