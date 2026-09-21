"use client";

import React, { useState } from "react";
import Image from "next/image";
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
  ExternalLink,
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
        return "bg-nature-forest";
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

  // Dedicated Nature Illustration for each project ("Technology Inside Nature" Aesthetic)
  const getProjectImage = (id: string) => {
    switch (id) {
      case "mindnova-ai":
        return "/images/forest/project-mindnova-nature.jpg";
      case "ai-cooking":
        return "/images/forest/hero-morning.jpg";
      case "tour-management":
      default:
        return "/images/forest/nature-campsite-contact.jpg";
    }
  };

  return (
    <section id="projects" className="py-20 lg:py-28 relative overflow-hidden border-t border-[#A8C9AD]/40">
      {/* Background Gradient & Ambient Meadow Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8f4]/95 via-white/85 to-[#f4f8f4]/95 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] rounded-full bg-[#CFE8F5]/25 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-10 w-[550px] h-[550px] rounded-full bg-[#A8C9AD]/20 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep uppercase tracking-wider mb-3 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-nature-sun" />
              <span>Section 03 • Dự Án Trọng Điểm & Mã Nguồn Mở</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-nature-deep tracking-tight">
              Sản Phẩm & Đóng Góp Kỹ Thuật
            </h2>
            <p className="mt-3 text-base text-stone-700 leading-relaxed font-sans">
              Bao gồm các <strong>dự án thực tế trọng điểm</strong> (kèm Case Study chuyên sâu) và các <strong>repository mã nguồn mở</strong> được tự động đồng bộ từ GitHub cá nhân.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/85 backdrop-blur-md border border-[#A8C9AD]/50 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeFilter === "all"
                  ? "bg-nature-forest text-white shadow-xs"
                  : "text-stone-700 hover:text-nature-deep hover:bg-[#A8C9AD]/20"
              }`}
            >
              Tất Cả ({totalCount})
            </button>
            <button
              onClick={() => setActiveFilter("featured")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                activeFilter === "featured"
                  ? "bg-nature-forest text-white shadow-xs"
                  : "text-stone-700 hover:text-nature-deep hover:bg-[#A8C9AD]/20"
              }`}
            >
              Trọng Điểm ({projects.length})
            </button>
            <button
              onClick={() => setActiveFilter("github")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                activeFilter === "github"
                  ? "bg-nature-forest text-white shadow-xs"
                  : "text-stone-700 hover:text-nature-deep hover:bg-[#A8C9AD]/20"
              }`}
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repos ({gitHubRepos.length})</span>
            </button>
          </div>
        </div>

        {/* Featured Projects Grid (Large, Prominent Cards with Technology inside Nature aesthetic) */}
        {showFeatured && (
          <div className="mb-14">
            {activeFilter === "all" && (
              <div className="flex items-center gap-2 mb-6">
                <Sparkles className="w-4 h-4 text-nature-amber" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-nature-deep font-bold">
                  Dự Án Trọng Điểm & Case Study Chuyên Sâu
                </h3>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white/90 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-forest transition-all duration-300 shadow-sm hover:shadow-2xl hover:shadow-nature-forest/15 hover:-translate-y-1.5 overflow-hidden"
                >
                  {/* Technology Inside Nature Project Visual Banner */}
                  <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-stone-100">
                    <Image
                      src={getProjectImage(project.id)}
                      alt={project.name}
                      fill
                      quality={85}
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />

                    {/* Top Badges over banner */}
                    <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold text-white bg-nature-forest/90 backdrop-blur-md border border-white/20 shadow-sm">
                        {project.projectType}
                      </span>
                      <span className="px-3 py-1 rounded-full text-[11px] font-mono text-white/90 bg-black/40 backdrop-blur-md border border-white/10 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-nature-sun" />
                        {project.timeframe}
                      </span>
                    </div>

                    {/* Project Title inside banner bottom */}
                    <div className="absolute bottom-3 left-4 right-4 z-10">
                      <h3 className="text-xl sm:text-2xl font-display font-bold text-white tracking-tight drop-shadow-sm">
                        {project.name}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-nature-sun">
                        Vai trò: {project.role}
                      </p>
                    </div>
                  </div>

                  {/* Card Content Area */}
                  <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
                    <div>
                      {/* Short Tagline / Summary */}
                      <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-sans line-clamp-3">
                        {project.tagline}
                      </p>

                      {/* What I Directly Built Highlights */}
                      <div className="mt-5 pt-4 border-t border-[#A8C9AD]/30">
                        <div className="text-[11px] font-mono uppercase tracking-wider text-nature-deep font-bold mb-2.5 flex items-center gap-1.5">
                          <Zap className="w-3.5 h-3.5 text-nature-amber" />
                          <span>Trực tiếp viết mã (Highlights):</span>
                        </div>
                        <ul className="space-y-2">
                          {project.myContribution.slice(0, 2).map((contrib, cIdx) => (
                            <li key={cIdx} className="flex items-start gap-2 text-xs text-stone-800 leading-relaxed font-sans">
                              <CheckCircle2 className="w-3.5 h-3.5 text-nature-forest mt-0.5 flex-shrink-0" />
                              <span className="line-clamp-2">{contrib}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Technologies Badges */}
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {project.technologies.slice(0, 5).map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-0.5 rounded-lg text-[11px] font-mono font-medium bg-[#F7F6EC] text-nature-deep border border-[#A8C9AD]/50"
                          >
                            {t}
                          </span>
                        ))}
                        {project.technologies.length > 5 && (
                          <span className="px-2 py-0.5 rounded-lg text-[10px] font-mono text-stone-500 bg-white border border-stone-200">
                            +{project.technologies.length - 5}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="mt-6 pt-5 border-t border-[#A8C9AD]/30 flex items-center justify-between gap-3">
                      <button
                        onClick={() => setSelectedProject(project)}
                        className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-nature-forest hover:text-nature-deep transition-colors group/btn"
                      >
                        <span>Xem Case Study (01-06)</span>
                        <ChevronRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform text-nature-forest" />
                      </button>

                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-xl text-stone-700 hover:text-white bg-white hover:bg-nature-forest border border-[#A8C9AD]/50 transition-all shadow-2xs"
                          title="Xem trên GitHub"
                          aria-label={`Mã nguồn ${project.name} trên GitHub`}
                        >
                          <ArrowUpRight className="w-4 h-4" />
                        </a>
                      )}
                    </div>
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
                <Github className="w-4 h-4 text-nature-deep" />
                <h3 className="text-sm font-mono uppercase tracking-wider text-nature-deep font-bold">
                  Kho Repository GitHub (Tự Động Đồng Bộ)
                </h3>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-300 text-[11px] font-mono text-emerald-800 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Auto-synced • Loại trừ portfolio & profile repo</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gitHubRepos.map((repo) => (
                <div
                  key={repo.id}
                  className="flex flex-col justify-between p-6 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/50 hover:border-nature-forest hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
                >
                  <div>
                    {/* Top Row: Language & Updated Date */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2.5 h-2.5 rounded-full ${getLanguageColor(repo.language)}`} />
                        <span className="text-xs font-mono font-bold text-stone-800">
                          {repo.language || "Code"}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono text-stone-500">
                        {formatDate(repo.updated_at)}
                      </span>
                    </div>

                    {/* Repo Title */}
                    <h4 className="text-lg font-display font-bold text-nature-deep hover:text-nature-forest transition-colors">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        <span>{repo.name}</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-stone-400" />
                      </a>
                    </h4>

                    {/* Repo Description */}
                    <p className="mt-2 text-xs text-stone-700 font-sans leading-relaxed line-clamp-3">
                      {repo.description || "Dự án phát triển mã nguồn mở trên GitHub."}
                    </p>

                    {/* Topics if any */}
                    {repo.topics && repo.topics.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1">
                        {repo.topics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-[#F7F6EC] text-nature-deep border border-[#A8C9AD]/40"
                          >
                            #{topic}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Row: Stars & GitHub Link Button */}
                  <div className="mt-5 pt-4 border-t border-[#A8C9AD]/30 flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs font-mono text-stone-600">
                      <span className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 text-amber-500" />
                        <span>{repo.stargazers_count}</span>
                      </span>
                      {repo.forks_count > 0 && (
                        <span className="flex items-center gap-1">
                          <GitFork className="w-3.5 h-3.5 text-stone-500" />
                          <span>{repo.forks_count}</span>
                        </span>
                      )}
                    </div>

                    <a
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold text-nature-forest hover:text-nature-deep transition-colors"
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

      {/* Case Study Full Modal (Preserved 100% functionality) */}
      <ProjectCaseStudyModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </section>
  );
}
