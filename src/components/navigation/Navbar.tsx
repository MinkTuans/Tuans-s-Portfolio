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

  // Scroll detection for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Accurate and reliable active section scroll detection
  useEffect(() => {
    let ticking = false;

    const calculateActiveSection = () => {
      // 1. If at the bottom of the page, activate the last section ('contact')
      const isAtBottom =
        window.innerHeight + Math.round(window.scrollY) >=
        document.documentElement.scrollHeight - 70;

      if (isAtBottom) {
        setActiveSection(navLinks[navLinks.length - 1].id);
        return;
      }

      // 2. Reading line offset: 160px from top of viewport (below fixed navbar)
      const readingLine = 160;

      // Check sections from bottom to top: the lowest section that has scrolled past the reading line is active
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

      // Fallback to first section
      setActiveSection(navLinks[0].id);
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
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
      {/* Top Fixed Header Navbar */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md border-b border-meadow-200/80 py-2.5 shadow-sm"
            : "bg-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Identity */}
            <Link
              href="#hero"
              className="group flex items-center gap-2.5 text-stone-900 transition-colors"
            >
              <div className="w-8 h-8 rounded-xl bg-meadow-100 border border-meadow-200 flex items-center justify-center text-meadow-800 group-hover:bg-meadow-800 group-hover:text-white transition-all shadow-sm">
                <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-semibold text-sm tracking-wide text-stone-900 group-hover:text-meadow-800 transition-colors">
                  {fullName}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-stone-600 uppercase">
                  The Wolf&apos;s Journey
                </span>
              </div>
            </Link>

            {/* Desktop Navigation with Active ID Color Highlighting */}
            <nav className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/90 border border-meadow-200 shadow-sm backdrop-blur-md">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setActiveSection(link.id)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-meadow-800 text-white font-semibold shadow-sm scale-105"
                        : "text-stone-600 hover:text-stone-950 hover:bg-meadow-100/70"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            {/* Action CTAs */}
            <div className="hidden sm:flex items-center gap-2.5">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium text-stone-700 bg-white hover:bg-meadow-50 border border-meadow-200 hover:border-meadow-300 transition-all shadow-sm"
              >
                <Code2 className="w-3.5 h-3.5 text-meadow-700" />
                <span>GitHub</span>
                <ArrowUpRight className="w-3 h-3 text-stone-600" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs font-medium text-white bg-meadow-800 hover:bg-meadow-900 shadow-sm transition-all font-sans font-semibold"
              >
                <span>Xem Dự Án</span>
              </a>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl text-stone-700 hover:text-stone-950 bg-white border border-meadow-200 shadow-sm"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {/* Mobile Navigation Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-3 p-4 rounded-2xl bg-white border border-meadow-200 shadow-xl flex flex-col gap-1.5">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? "bg-meadow-800 text-white font-bold"
                        : "text-stone-700 hover:bg-meadow-100/60"
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-sun-warm animate-ping" />
                    )}
                  </a>
                );
              })}
              <div className="pt-2 mt-2 border-t border-meadow-100 flex flex-col gap-2">
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono text-stone-800 bg-meadow-50 border border-meadow-200"
                >
                  <span>GitHub Profile</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Floating Section Sidebar Rail (Right Side on Desktop) */}
      <aside
        aria-label="Section Navigation Sidebar"
        className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3 p-2 rounded-full bg-white/85 backdrop-blur-md border border-meadow-200/90 shadow-lg"
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
              {/* Dot indicator */}
              <span
                className={`transition-all duration-300 rounded-full ${
                  isActive
                    ? "w-3.5 h-3.5 bg-sun-amber ring-4 ring-sun-warm/35 shadow-md scale-110"
                    : "w-2 h-2 bg-stone-300 group-hover:bg-meadow-600 group-hover:scale-125"
                }`}
              />

              {/* Tooltip on hover */}
              <span className="absolute right-9 px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium text-white bg-meadow-950/90 backdrop-blur-sm opacity-0 group-hover:opacity-100 pointer-events-none transition-all shadow-md whitespace-nowrap -translate-x-1 group-hover:translate-x-0">
                {link.label}
              </span>
            </a>
          );
        })}
      </aside>
    </>
  );
}
