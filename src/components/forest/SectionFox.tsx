"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Zap, Leaf, Footprints, Sun } from "lucide-react";

export default function SectionFox() {
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
  const foxTranslateX = Math.max((1 - scrollProgress * 2.2) * -60, 0);
  const foxParallaxY = (scrollProgress - 0.5) * -35;

  const showHeading = scrollProgress > 0.18;
  const showText = scrollProgress > 0.32;
  const showBadges = scrollProgress > 0.44;

  return (
    <section
      id="fox"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#132c1c] py-24 md:py-36 flex items-center overflow-hidden"
    >
      {/* 1. Organic Torn / Foliage Top Transition Divider */}
      <div className="absolute top-0 left-0 right-0 h-16 sm:h-24 pointer-events-none z-20 overflow-hidden">
        <svg
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-full text-forest-950 fill-current opacity-95"
        >
          <path d="M0,0 L1200,0 L1200,45 Q1050,110 900,40 T600,65 T300,35 Q150,90 0,40 Z" />
        </svg>
      </div>

      {/* 2. Warm Sunlit Forest Glade Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1b3a26] via-[#153120] to-[#0f2316] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Fox Portrait (Appears from left with smooth slide-in & parallax) */}
        <div className="lg:col-span-7 flex justify-center order-1">
          <div
            className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] max-w-2xl rounded-3xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)] border border-emerald-800/40 group will-change-transform transition-all duration-700 ease-out"
            style={{
              transform: `translate3d(${foxTranslateX}px, ${foxParallaxY}px, 0)`,
            }}
          >
            <Image
              src="/images/forest/fox-portrait.jpg"
              alt="Red Fox on Mossy Boulder"
              fill
              sizes="(max-width: 1024px) 100vw, 55vw"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
            />

            {/* Cinematic Warm Golden Sunlight Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f2316]/80 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-[#0f2316]/30 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Habitat Badge */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="backdrop-blur-md bg-forest-950/60 px-4 py-1.5 rounded-full border border-forest-600/40 text-xs text-forest-100 font-sans flex items-center gap-2 shadow-lg">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span>Vulpes vulpes — Red Fox Clearing</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Storytelling & Ecological Badges */}
        <div className="lg:col-span-5 flex flex-col justify-center order-2">
          {/* Index tag */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-6 blur-sm"
            }`}
          >
            <span className="text-sm font-mono tracking-widest text-amber-400 font-semibold uppercase">
              02 / 04
            </span>
            <span className="w-8 h-[1px] bg-amber-400/40" />
            <span className="text-xs font-sans tracking-wider text-forest-300 uppercase">
              Sunlit Woodland Clearing
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-hand text-5xl sm:text-6xl md:text-7xl font-bold text-[#f8f5ee] mt-3 tracking-wide transition-all duration-700 delay-100 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-md"
            }`}
          >
            The Fox
          </h2>

          {/* Story Paragraph */}
          <p
            className={`mt-6 text-lg sm:text-xl text-[#e6efe7] font-sans font-light leading-relaxed transition-all duration-700 delay-200 ${
              showText
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            Smart, quick and adaptable, foxes can thrive in many diverse environments across the temperate forest. With boundless curiosity and acute senses, they walk the edges between daylight and dusk.
          </p>

          {/* 3 Interactive Trait Badges (Matches Reference Design) */}
          <div
            className={`mt-10 grid grid-cols-3 gap-3 sm:gap-4 transition-all duration-700 delay-300 ${
              showBadges
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            {/* Badge 1 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-forest-900/60 border border-emerald-700/30 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-forest-900/80 transition-all group">
              <div className="w-10 h-10 rounded-full bg-emerald-900/50 text-emerald-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Footprints className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-sans font-medium text-forest-100">
                Very clever
              </span>
              <span className="text-[10px] text-forest-400 mt-0.5">Tactical mind</span>
            </div>

            {/* Badge 2 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-forest-900/60 border border-emerald-700/30 backdrop-blur-sm hover:border-amber-500/50 hover:bg-forest-900/80 transition-all group">
              <div className="w-10 h-10 rounded-full bg-amber-900/50 text-amber-300 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Zap className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-sans font-medium text-forest-100">
                Fast runner
              </span>
              <span className="text-[10px] text-amber-300/80 mt-0.5">50 km/h sprint</span>
            </div>

            {/* Badge 3 */}
            <div className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-forest-900/60 border border-emerald-700/30 backdrop-blur-sm hover:border-emerald-500/50 hover:bg-forest-900/80 transition-all group">
              <div className="w-10 h-10 rounded-full bg-emerald-800/50 text-emerald-200 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="text-xs sm:text-sm font-sans font-medium text-forest-100">
                Good adapting
              </span>
              <span className="text-[10px] text-forest-400 mt-0.5">All seasons</span>
            </div>
          </div>
        </div>
      </div>

      {/* Transition into Deeper Darker Forest (Section 03 The Wolf) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-twilight-950 via-[#0d1d16] to-transparent pointer-events-none" />
    </section>
  );
}
