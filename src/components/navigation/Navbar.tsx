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
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Bắt Đầu", href: "#hero" },
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
          ? "bg-steppe-950/85 backdrop-blur-md border-b border-steppe-800/80 py-3 shadow-lg shadow-black/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            href="#hero"
            className="group flex items-center gap-2.5 text-steppe-100 hover:text-white transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-steppe-800 border border-steppe-700 flex items-center justify-center text-amber-sun group-hover:border-amber-sun/50 transition-colors shadow-sm">
              <Compass className="w-4 h-4 group-hover:rotate-45 transition-transform duration-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-semibold text-sm tracking-wide text-steppe-100 group-hover:text-amber-sun transition-colors">
                {fullName}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-steppe-400 uppercase">
                The Wolf&apos;s Journey
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-steppe-900/60 border border-steppe-800/60 backdrop-blur-sm">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3.5 py-1.5 rounded-full text-xs font-medium text-steppe-300 hover:text-steppe-100 hover:bg-steppe-800/60 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-mono font-medium text-steppe-200 bg-steppe-900/80 hover:bg-steppe-800 border border-steppe-700/60 hover:border-steppe-600 transition-all"
            >
              <Code2 className="w-3.5 h-3.5 text-tech-emerald" />
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-steppe-400" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-medium text-steppe-950 bg-amber-sun hover:bg-amber-warm shadow-md shadow-amber-sun/10 transition-all font-sans"
            >
              <span>Xem Dự Án</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-steppe-300 hover:text-white bg-steppe-900 border border-steppe-800"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-steppe-900/95 border border-steppe-800 backdrop-blur-xl shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-xl text-sm font-medium text-steppe-200 hover:bg-steppe-800 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 mt-2 border-t border-steppe-800/80 flex flex-col gap-2">
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between px-4 py-2.5 rounded-xl text-sm font-mono text-steppe-200 bg-steppe-850 border border-steppe-750"
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
