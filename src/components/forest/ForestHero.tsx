"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronDown, Sparkles } from "lucide-react";

export default function ForestHero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToFirst = () => {
    const el = document.getElementById("deer");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Parallax calculations
  const bgTranslate = scrollY * 0.35;
  const eagleX = scrollY * 0.45;
  const eagleY = scrollY * -0.15;
  const textTranslate = scrollY * 0.22;
  const textOpacity = Math.max(0, 1 - scrollY / 550);
  const canopyTranslate = scrollY * 0.6;

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-forest-950 flex items-center justify-center">
      {/* 1. Deep Background Canvas: Morning Forest Landscape */}
      <div
        className="absolute inset-0 w-full h-[120%] -top-[10%] will-change-transform pointer-events-none"
        style={{
          transform: `translate3d(0, ${bgTranslate}px, 0) scale(${1 + scrollY * 0.0003})`,
        }}
      >
        <Image
          src="/images/forest/hero-morning.jpg"
          alt="Animals in the Forest — Morning Canopy & Waterfall"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic Atmospheric Lighting Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-950/40 via-transparent to-forest-950/80" />
      </div>

      {/* 2. Soaring Eagle Layer (Moves across sky with scroll) */}
      <div
        className="absolute top-16 right-12 md:right-28 pointer-events-none z-10 will-change-transform transition-transform ease-out"
        style={{
          transform: `translate3d(${eagleX}px, ${eagleY}px, 0) scale(${1 - Math.min(scrollY * 0.0004, 0.4)})`,
          opacity: textOpacity,
        }}
      >
        <div className="relative w-24 h-16 md:w-36 md:h-24">
          <Image
            src="/images/forest/eagle-glider.jpg"
            alt="Soaring Eagle"
            fill
            className="object-contain mix-blend-multiply opacity-85 filter drop-shadow-md"
          />
        </div>
      </div>

      {/* 3. Luminous God Rays / Sun Motes */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[700px] pointer-events-none z-10 opacity-35 bg-gradient-to-br from-amber-100/40 via-amber-200/10 to-transparent transform -rotate-12 blur-3xl animate-god-rays" />

      {/* 4. Foreground Canopy Framing (Moves faster to create depth) */}
      <div
        className="absolute -top-10 left-0 right-0 h-48 md:h-64 pointer-events-none z-20 will-change-transform opacity-75"
        style={{
          transform: `translate3d(0, ${-canopyTranslate}px, 0)`,
        }}
      >
        <Image
          src="/images/forest/canopy-leaves.jpg"
          alt="Forest Canopy Leaves"
          fill
          className="object-cover object-top mix-blend-multiply filter contrast-125"
        />
      </div>

      {/* 5. Center Hero Typography (Inspired by Reference Mockup) */}
      <div
        className="relative z-30 max-w-4xl mx-auto px-6 text-center will-change-transform flex flex-col items-center"
        style={{
          transform: `translate3d(0, ${textTranslate}px, 0)`,
          opacity: textOpacity,
        }}
      >
        {/* Organic Leaf Deco */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest-900/60 backdrop-blur-md border border-emerald-500/30 text-emerald-300 text-xs sm:text-sm font-sans tracking-wide mb-4 shadow-lg animate-fadeIn">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin [animation-duration:12s]" />
          <span>A Living Nature Experience</span>
        </div>

        {/* Large Cinematic Title */}
        <h1 className="font-hand text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-[#f4efe4] drop-shadow-[0_8px_24px_rgba(0,0,0,0.85)] leading-[1.05]">
          Animals
          <span className="block text-emerald-300 font-hand drop-shadow-[0_8px_30px_rgba(16,35,19,0.9)]">
            in the Forest
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-base sm:text-lg md:text-xl text-[#f3ede2]/90 max-w-xl mx-auto font-sans font-light leading-relaxed drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
          Discover the amazing creatures that call the ancient forest home.
        </p>

        {/* Scroll Down Indicator */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center">
          <button
            onClick={scrollToFirst}
            className="group flex flex-col items-center text-forest-200 hover:text-white transition-colors focus:outline-none"
            aria-label="Scroll down to begin journey"
          >
            {/* Mouse Pill Indicator */}
            <div className="w-7 h-11 rounded-full border-2 border-forest-300/60 flex items-start justify-center p-1.5 backdrop-blur-sm bg-forest-950/30 group-hover:border-emerald-400 group-hover:bg-forest-900/50 transition-all shadow-md">
              <div className="w-1.5 h-2.5 bg-emerald-400 rounded-full animate-bounce [animation-duration:1.6s]" />
            </div>
            <span className="mt-2 text-xs tracking-widest uppercase font-sans text-forest-200/90 font-medium group-hover:text-emerald-300 transition-colors">
              Scroll Down
            </span>
            <ChevronDown className="w-4 h-4 text-emerald-400/80 animate-pulse mt-0.5" />
          </button>
        </div>
      </div>

      {/* 6. Seamless Bottom Transition into Section 01 */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent pointer-events-none z-20" />
    </section>
  );
}
