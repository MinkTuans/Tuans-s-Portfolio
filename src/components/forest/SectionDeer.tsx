"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Sparkles, Compass } from "lucide-react";

export default function SectionDeer() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) return;
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          // Progress from 0 (entering screen) to 1 (leaving top)
          const progress = Math.min(
            Math.max((windowHeight - rect.top) / (windowHeight + rect.height), 0),
            1
          );
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Parallax offsets
  const deerParallax = (scrollProgress - 0.5) * -45;
  const deerScale = 1 + scrollProgress * 0.05;

  // Text reveal thresholds
  const showHeading = scrollProgress > 0.15;
  const showLine1 = scrollProgress > 0.28;
  const showLine2 = scrollProgress > 0.38;

  return (
    <section
      id="deer"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-forest-950 py-24 md:py-32 flex items-center overflow-hidden"
    >
      {/* 1. Deep Atmospheric Forest Backdrop with Emerald Glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-[#102a1b] to-forest-950 pointer-events-none" />

      {/* Subtle dappled sunlight accent */}
      <div className="absolute top-1/4 right-1/3 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-duration:8s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Narrative Storytelling (01 / 04 The Deer) */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
          {/* Index tag */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-6 blur-sm"
            }`}
          >
            <span className="text-sm font-mono tracking-widest text-emerald-400 font-semibold uppercase">
              01 / 04
            </span>
            <span className="w-8 h-[1px] bg-emerald-500/40" />
            <span className="text-xs font-sans tracking-wider text-forest-300 uppercase flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-emerald-400" />
              Old Growth Grove
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-hand text-5xl sm:text-6xl md:text-7xl font-bold text-[#f5f1e8] mt-3 tracking-wide transition-all duration-700 delay-100 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-md"
            }`}
          >
            The Deer
          </h2>

          {/* Story Paragraph 1 */}
          <p
            className={`mt-6 text-lg sm:text-xl text-[#e4eee6] font-sans font-light leading-relaxed transition-all duration-700 delay-200 ${
              showLine1
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            Graceful and gentle, deer are one of the most beloved animals in the forest. Their silent steps navigate the mossy clearings with quiet dignity.
          </p>

          {/* Story Paragraph 2 */}
          <p
            className={`mt-4 text-base sm:text-lg text-forest-200/80 font-sans font-light leading-relaxed transition-all duration-700 delay-300 ${
              showLine2
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            They help keep the forest healthy by spreading native seeds and pruning vegetation, ensuring a balanced, thriving woodland ecosystem for all who dwell here.
          </p>

          {/* Subtle Accent Line */}
          <div
            className={`mt-8 flex items-center gap-4 transition-all duration-700 delay-400 ${
              showLine2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-emerald-400 to-transparent rounded-full" />
            <div className="flex items-center gap-2 text-xs font-sans text-forest-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Quiet Majesty & Balance</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Deer Portrait with Parallax */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] max-w-2xl rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.85)] border border-emerald-900/30 group">
            {/* Parallax Image Container */}
            <div
              className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(0, ${deerParallax}px, 0) scale(${deerScale})`,
              }}
            >
              <Image
                src="/images/forest/deer-portrait.jpg"
                alt="Majestic Deer in Sunlit Forest"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>

            {/* Natural Vignette & Inner Lighting */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Tag on Photo */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="backdrop-blur-md bg-forest-950/60 px-4 py-1.5 rounded-full border border-forest-700/50 text-xs text-forest-100 font-sans flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Cervus elaphus — Red Deer</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Transition to Next Section (The Fox) */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-forest-900 via-forest-950/90 to-transparent pointer-events-none" />
    </section>
  );
}
