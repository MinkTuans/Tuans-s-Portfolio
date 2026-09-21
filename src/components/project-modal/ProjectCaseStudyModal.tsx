"use client";

import React, { useEffect } from "react";
import { ProjectCaseStudy } from "@/types/portfolio";
import { X, Github, ExternalLink, CheckCircle, Layers, Calendar, ShieldCheck } from "lucide-react";

interface ProjectCaseStudyModalProps {
  project: ProjectCaseStudy | null;
  onClose: () => void;
}

export default function ProjectCaseStudyModal({ project, onClose }: ProjectCaseStudyModalProps) {
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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-stone-900/60 backdrop-blur-md overflow-y-auto animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
    >
      <div
        className="relative w-full max-w-4xl bg-white border border-meadow-200 rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 sm:p-8 border-b border-meadow-100 bg-meadow-50/50 flex-shrink-0">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-0.5 rounded-full text-xs font-mono font-medium bg-sun-light text-sun-amber border border-sun-amber/20">
                {project.projectType}
              </span>
              <span className="px-3 py-0.5 rounded-full text-xs font-mono text-stone-600 bg-white border border-meadow-200 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {project.timeframe}
              </span>
            </div>
            <h2 id="modal-project-title" className="text-2xl sm:text-3xl font-display font-bold text-stone-900">
              {project.name}
            </h2>
            <p className="mt-1 text-sm text-meadow-800 font-mono font-semibold">
              Vai trò: {project.role}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl text-stone-500 hover:text-stone-900 bg-white hover:bg-meadow-100 border border-meadow-200 transition-colors shadow-sm"
            aria-label="Đóng Case Study"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 divide-y divide-meadow-100">

          {/* 01 — Overview */}
          <div className="pt-0">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-sun-amber font-bold">
              <span>01 — Overview (Tổng Quan)</span>
            </div>
            <p className="text-base text-stone-700 leading-relaxed font-sans">
              {project.overview}
            </p>
          </div>

          {/* 02 — What I Worked On */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-sun-amber font-bold">
              <span>02 — What I Worked On (Trọng Tâm Thực Hiện)</span>
            </div>
            <div className="p-4 rounded-2xl bg-meadow-50/70 border border-meadow-200 text-stone-800 text-sm leading-relaxed">
              {project.whatIWorkedOn}
            </div>
          </div>

          {/* 03 — Technologies */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-sun-amber font-bold">
              <span>03 — Technologies (Công Nghệ Sử Dụng)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 rounded-xl text-xs font-mono font-medium bg-white border border-meadow-200 text-meadow-900 shadow-sm"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* 04 — Key Features */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-sun-amber font-bold">
              <span>04 — Key Features (Tính Năng Nổi Bật)</span>
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {project.keyFeatures.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-meadow-200/90 text-sm text-stone-700 shadow-sm"
                >
                  <Layers className="w-4 h-4 text-sun-amber mt-0.5 flex-shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 05 — My Contribution (WHAT I ACTUALLY BUILT) */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-3 text-xs font-mono uppercase tracking-widest text-meadow-800 font-bold">
              <ShieldCheck className="w-4 h-4 text-meadow-600" />
              <span>05 — WHAT I ACTUALLY BUILT (Những phần tôi trực tiếp lập trình)</span>
            </div>
            <div className="space-y-3">
              {project.myContribution.map((contrib, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 rounded-2xl bg-meadow-50/60 border border-meadow-200 text-sm text-stone-900"
                >
                  <CheckCircle className="w-4 h-4 text-meadow-600 mt-0.5 flex-shrink-0" />
                  <span className="leading-relaxed font-sans">{contrib}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 06 — Result / Current Status */}
          <div className="pt-6">
            <div className="flex items-center gap-2 mb-2 text-xs font-mono uppercase tracking-widest text-sun-amber font-bold">
              <span>06 — Result & Current Status (Trạng Thái Hiện Tại)</span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-mono">
              {project.resultAndStatus}
            </p>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-6 sm:px-8 border-t border-meadow-100 bg-white flex flex-wrap items-center justify-between gap-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-medium text-stone-800 bg-white hover:bg-meadow-50 border border-meadow-200 shadow-sm transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>Mã Nguồn GitHub</span>
                <ExternalLink className="w-3 h-3 text-stone-400" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl text-xs font-medium text-white bg-meadow-800 hover:bg-meadow-900 transition-colors font-sans font-semibold shadow-sm"
          >
            Đóng Lại
          </button>
        </div>

      </div>
    </div>
  );
}
