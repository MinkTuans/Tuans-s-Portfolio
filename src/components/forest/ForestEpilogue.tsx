"use client";

import React from "react";
import { ArrowUp, Trees, Heart } from "lucide-react";

export default function ForestEpilogue() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-forest-950 text-[#f4efe6] py-20 md:py-28 overflow-hidden border-t border-forest-800/40">
      {/* Background ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-[#0a1811] to-[#050c08] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Emblem */}
        <div className="w-14 h-14 rounded-full bg-forest-900/80 border border-emerald-600/40 flex items-center justify-center text-emerald-300 mx-auto shadow-lg mb-6">
          <Trees className="w-7 h-7" />
        </div>

        {/* Closing Title */}
        <h3 className="font-hand text-4xl sm:text-5xl md:text-6xl font-bold text-[#f7f2e8] tracking-wide">
          Preserve the Ancient Wild
        </h3>

        {/* Poetic quote */}
        <p className="mt-4 text-base sm:text-lg text-forest-200/90 font-sans font-light max-w-xl mx-auto leading-relaxed">
          &ldquo;In every walk with nature, one receives far more than he seeks. Leave only footprints, carry only memories.&rdquo;
        </p>

        {/* Back to Top CTA */}
        <div className="mt-10">
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-forest-900/80 hover:bg-forest-800 border border-emerald-500/40 text-emerald-300 hover:text-white font-sans text-sm font-medium transition-all duration-300 shadow-lg group hover:scale-105"
          >
            <span>Return to Canopy</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Subtle Bottom Credits */}
        <div className="mt-16 pt-8 border-t border-forest-900/80 flex flex-col sm:flex-row items-center justify-between text-xs text-forest-400 font-sans gap-4">
          <div className="flex items-center gap-1.5">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 inline" />
            <span>for Wildlife Conservation</span>
          </div>
          <div>
            <span>Animals in the Forest — Visual Storytelling Experience</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
