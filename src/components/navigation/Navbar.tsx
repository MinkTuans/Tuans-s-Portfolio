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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bắt Đầu", href: "#hero" },
    { label: "Hành Trình Sói", href: "#wolf-journey" },
    { label: "Đã Xây Dựng", href: "#what-i-built" },
    { label: "Dự Án", href: "#projects" },
    { label: "Kinh Nghiệm", href: "#experience" },
    { label: "Kỹ Năng", href: "#skills" },
    { label: "Liên Hệ", href: "#contact" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md border-b border-meadow-200/80 py-3 shadow-sm"
          : "bg-transparent py-5"
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-1.5 px-3 py-1.5 rounded-full bg-white/80 border border-meadow-200 shadow-sm backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1 rounded-full text-xs font-medium text-stone-600 hover:text-stone-950 hover:bg-meadow-100/70 transition-all"
              >
                {link.label}
              </a>
            ))}
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
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-stone-700 hover:bg-meadow-100/60 transition-colors"
              >
                {link.label}
              </a>
            ))}
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
  );
}
