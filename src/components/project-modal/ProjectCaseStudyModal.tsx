"use client";

import React, { useEffect } from "react";
import { ProjectCaseStudy } from "@/types/portfolio";
import { X, Github, ExternalLink, CheckCircle, Code, Layers, Calendar, Users, Cpu, ShieldCheck } from "lucide-react";

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
  // Prevent body scroll when modal is open and handle ESC key
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl bg-steppe-950 border border-steppe-750 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-steppe-800 bg-steppe-900/60 flex-shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium bg-amber-sun/10 text-amber-sun border border-amber-sun/20">
                {project.projectType}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono text-steppe-400 bg-steppe-850 border border-steppe-750 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.timeframe}
              </span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-steppe-50">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-tech-emerald font-mono font-medium">
              Vai trò: {project.role}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-steppe-400 hover:text-white bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
            aria-label="Đóng Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-steppe-850/80">

          {/* 01 — Overview */}
          <div className="pt-0">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono uppercase tracking-widest text-amber-sun font-semibold">
              <span>01 — Overview</span>
            </div>
            <p className="text-base text-steppe-200 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          {/* 02 — What I Worked On */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono uppercase tracking-widest text-amber-sun font-semibold">
              <span>02 — What I Worked On</span>
            </div>
            <div className="p-4 rounded-xl bg-steppe-900/80 border border-steppe-800 text-steppe-200 text-sm leading-relaxed">
              {project.whatIWorkedOn}
            </div>
          </div>

          {/* 03 — Technologies */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-amber-sun font-semibold">
              <span>03 — Technologies</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-steppe-900 border border-steppe-750 text-steppe-200"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 04 — Key Features */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-amber-sun font-semibold">
              <span>04 — Key Features</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 p-3 rounded-xl bg-steppe-900/40 border border-steppe-850 text-sm text-steppe-300"
                >
                  <Layers className="w-4 h-4 text-amber-sun mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 05 — My Contribution (WHAT I ACTUALLY BUILT) */}
          <div className="pt-6">
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-tech-emerald font-bold">
                <ShieldCheck className="w-4 h-4" />
                <span>05 — WHAT I ACTUALLY BUILT (Những phần tôi trực tiếp lập trình)</span>
              </div>
            </div>
            <div className="space-y-3">
              {project.myContribution.map((contrib, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-3.5 rounded-xl bg-steppe-900 border border-steppe-750 text-sm text-steppe-100"
                >
                  <CheckCircle className="w-4 h-4 text-tech-emerald mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed font-sans">{contrib}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 06 — Result / Current Status */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-2.5 text-xs font-mono uppercase tracking-widest text-amber-sun font-semibold">
              <span>06 — Result & Current Status</span>
            </div>
            <p className="text-sm text-steppe-300 leading-relaxed font-mono">
              {project.resultAndStatus}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:px-8 border-t border-steppe-800 bg-steppe-900/80 flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-steppe-100 bg-steppe-800 hover:bg-steppe-750 border border-steppe-700 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Mã Nguồn GitHub</span>
                <ExternalLink className="w-3 h-3 text-steppe-400" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-steppe-950 bg-amber-sun hover:bg-amber-warm transition-colors font-sans font-semibold"
          >
            Đóng Lại
          </button>
        </div>

      </div>
    </div>
  );
}
