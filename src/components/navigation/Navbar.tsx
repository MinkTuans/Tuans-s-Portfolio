"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Compass, Menu, X, ArrowUpRight, Code2 } from "lucide-react";

interface NavbarProps {
  fullName: string;
  githubUrl: string;
}

export default function Navbar({ fullName, githubUrl }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  const navLinks = [
    { id: "hero", label: "Bắt Đầu", href: "#hero" },
    { id: "wolf-journey", label: "Hành Trình Sói", href: "#wolf-journey" },
    { id: "what-i-built", label: "Đã Xây Dựng", href: "#what-i-built" },
    { id: "projects", label: "Dự Án", href: "#projects" },
    { id: "experience", label: "Kinh Nghiệm", href: "#experience" },
    { id: "skills", label: "Kỹ Năng", href: "#skills" },
    { id: "contact", label: "Liên Hệ", href: "#contact" },
  ];

  // Scroll detection for navbar shadow & elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section tracking with offset for active nav highlight
  useEffect(() => {
    let ticking = false;

    const calculateActiveSection = () => {
      const isAtBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 80;

      if (isAtBottom) {
        setActiveSection(navLinks[navLinks.length - 1].id);
        return;
      }

      const readingLine = 180;

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const link = navLinks[i];
        const el = document.getElementById(link.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= readingLine) {
            setActiveSection(link.id);
            return;
          }
        }
      }

      setActiveSection(navLinks[0].id);
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          calculateActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && navLinks.some((l) => l.id === hash)) {
        setActiveSection(hash);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("hashchange", handleHashChange);
    calculateActiveSection();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return (
    <>
      {/* Top Floating Glass Nature Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "py-2.5 sm:py-3 bg-white/80 backdrop-blur-md border-b border-[#A8C9AD]/40 shadow-[0_8px_30px_rgb(22,59,40,0.06)]"
            : "py-3.5 sm:py-5 bg-white/70 backdrop-blur-sm border-b border-[#A8C9AD]/25"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Tagline */}
            <Link
              href="#hero"
              className="group flex items-center gap-3 text-nature-deep transition-all"
            >
              <div className="w-9 h-9 rounded-2xl bg-white/90 border border-[#A8C9AD]/60 flex items-center justify-center text-nature-forest group-hover:bg-nature-forest group-hover:text-white transition-all shadow-sm">
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-nature-deep group-hover:text-nature-forest transition-colors">
                  {fullName}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#4f7756] uppercase font-semibold">
                  The Wolf&apos;s Journey
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Pill Bar */}
            <nav className="hidden lg:flex items-center gap-1 px-2 py-1.5 rounded-full bg-white/85 border border-[#A8C9AD]/50 shadow-sm backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-nature-forest text-white font-semibold shadow-sm scale-105"
                        : "text-stone-700 hover:text-nature-deep hover:bg-[#A8C9AD]/20"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Right Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-nature-deep bg-white/90 hover:bg-[#F7F6EC] border border-[#A8C9AD]/50 hover:border-[#6F9F72] transition-all shadow-xs"
              >
                <Code2 className="w-3.5 h-3.5 text-nature-forest" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-stone-500" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-semibold text-white bg-nature-forest hover:bg-nature-deep shadow-sm hover:shadow-md transition-all font-sans"
              >
                <span>Xem Dự Án</span>
              </a>
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-nature-deep hover:text-nature-forest bg-white/90 border border-[#A8C9AD]/50 shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-3 p-4 rounded-3xl bg-white/95 backdrop-blur-xl border border-[#A8C9AD]/60 shadow-xl flex flex-col gap-1.5 animate-fadeIn">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-2xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-nature-forest text-white font-bold shadow-sm"
                        : "text-stone-700 hover:bg-[#A8C9AD]/20"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-nature-sun animate-ping" />
                    )}
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-[#A8C9AD]/30 flex flex-col gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-2xl text-sm font-mono text-nature-deep bg-[#F7F6EC] border border-[#A8C9AD]/50"
                >
                  <span className="font-semibold">GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
                <a
                  href="#projects"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2.5 rounded-2xl text-sm font-semibold text-white bg-nature-forest hover:bg-nature-deep transition-all"
                >
                  <span>Xem Dự Án Trọng Điểm</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating Section Sidebar Rail (Right Side on Desktop) */}
      <aside
        aria-label="Section Navigation Sidebar"
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden xl:flex flex-col items-center gap-3 p-2 rounded-full bg-white/80 backdrop-blur-md border border-[#A8C9AD]/60 shadow-md"
      >
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <a
              key={`rail-${link.id}`}
              href={link.href}
              onClick={() => setActiveSection(link.id)}
              className="group relative flex items-center justify-center w-7 h-7 rounded-full transition-all"
              aria-label={link.label}
            >
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-3.5 h-3.5 bg-nature-sun ring-4 ring-[#F3C77A]/40 shadow-sm scale-110"
                    : "w-2 h-2 bg-stone-300 group-hover:bg-nature-moss group-hover:scale-125"
                }`}
              />

              <span className="absolute right-9 px-2.5 py-1 rounded-xl text-[11px] font-mono font-semibold text-white bg-nature-deep/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-md whitespace-nowrap -translate-x-1 group-hover:translate-x-0 border border-[#A8C9AD]/30">
                {link.label}
              </span>
            </a>
          );
        })}
      </aside>
    </>
  );
}
