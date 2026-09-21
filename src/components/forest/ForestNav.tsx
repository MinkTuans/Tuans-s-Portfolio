"use client";

import React, { useState, useEffect } from "react";
import ForestAudioToggle from "./ForestAudioToggle";
import { Trees } from "lucide-react";

const NAV_ITEMS = [
  { id: "deer", label: "01 The Deer" },
  { id: "fox", label: "02 The Fox" },
  { id: "wolf", label: "03 The Wolf" },
  { id: "bear", label: "04 The Bear" },
];

export default function ForestNav() {
  const [activeSection, setActiveSection] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 80);

      const sections = NAV_ITEMS.map((item) => {
        const el = document.getElementById(item.id);
        if (!el) return { id: item.id, top: 0, bottom: 0 };
        const rect = el.getBoundingClientRect();
        return { id: item.id, top: rect.top, bottom: rect.bottom };
      });

      const current = sections.find(
        (s) => s.top <= window.innerHeight * 0.45 && s.bottom >= window.innerHeight * 0.2
      );

      if (current) {
        setActiveSection(current.id);
      } else if (scrollY < 300) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-forest-950/80 backdrop-blur-md border-b border-forest-800/30 py-3 shadow-lg"
          : "bg-gradient-to-b from-forest-950/60 via-forest-950/20 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Leaf Mark */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 group text-left focus:outline-none"
          title="Back to Canopy"
        >
          <div className="w-8 h-8 rounded-full bg-forest-800/80 border border-forest-600/50 flex items-center justify-center text-emerald-400 group-hover:scale-105 group-hover:bg-forest-700/80 transition-all">
            <Trees className="w-4 h-4" />
          </div>
          <div>
            <span className="font-hand text-xl font-bold text-[#f2ede4] tracking-wide block leading-none group-hover:text-emerald-300 transition-colors">
              Animals in the Forest
            </span>
            <span className="text-[10px] uppercase tracking-widest text-forest-300/80 font-sans block mt-0.5">
              Visual Journey
            </span>
          </div>
        </button>

        {/* Story Section Navigation Indicators */}
        <nav className="hidden md:flex items-center gap-1 bg-forest-950/40 backdrop-blur-md px-3 py-1 rounded-full border border-forest-800/40">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-3 py-1 text-xs rounded-full transition-all duration-300 font-sans ${
                  isActive
                    ? "bg-emerald-900/60 text-emerald-200 border border-emerald-500/40 shadow-sm"
                    : "text-forest-300 hover:text-white hover:bg-forest-800/40"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Audio Toggle & Sound Controls */}
        <div className="flex items-center gap-3">
          <ForestAudioToggle />
        </div>
      </div>
    </header>
  );
}
