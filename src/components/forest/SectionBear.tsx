"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Waves, Mountain, ShieldCheck } from "lucide-react";

export default function SectionBear() {
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
  const bearParallax = (scrollProgress - 0.5) * -50;
  const bearScale = 1 + scrollProgress * 0.04;

  const showHeading = scrollProgress > 0.16;
  const showText = scrollProgress > 0.30;
  const showDetails = scrollProgress > 0.42;

  return (
    <section
      id="bear"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-forest-950 py-24 md:py-36 flex items-center overflow-hidden"
    >
      {/* 1. Serene Valley Backdrop with Golden Hour Warmth */}
      <div className="absolute inset-0 bg-gradient-to-b from-forest-950 via-[#162a1c] to-forest-950 pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-3xl pointer-events-none animate-pulse [animation-duration:10s]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Bear High-Res River Landscape with Deep Parallax */}
        <div className="lg:col-span-7 flex justify-center order-1">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.85)] border border-forest-700/40 group">
            {/* Parallax Container */}
            <div
              className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(0, ${bearParallax}px, 0) scale(${bearScale})`,
              }}
            >
              <Image
                src="/images/forest/bear-river.jpg"
                alt="Majestic Brown Bear in Crystal Mountain River"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>

            {/* Natural River Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-forest-950/20 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-l from-forest-950/40 via-transparent to-transparent pointer-events-none" />

            {/* Habitat Marker */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="backdrop-blur-md bg-forest-950/60 px-4 py-1.5 rounded-full border border-forest-600/50 text-xs text-forest-100 font-sans flex items-center gap-2 shadow-lg">
                <Waves className="w-3.5 h-3.5 text-sky-400" />
                <span>Ursus arctos — River Valley Sanctuary</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Narrative Storytelling */}
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
              04 / 04
            </span>
            <span className="w-8 h-[1px] bg-amber-400/40" />
            <span className="text-xs font-sans tracking-wider text-forest-300 uppercase flex items-center gap-1.5">
              <Mountain className="w-3.5 h-3.5 text-amber-400" />
              Alpine River Basin
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
            The Bear
          </h2>

          {/* Story Paragraph 1 */}
          <p
            className={`mt-6 text-lg sm:text-xl text-[#e8f1e9] font-sans font-light leading-relaxed transition-all duration-700 delay-200 ${
              showText
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            Where alpine streams meet deep old-growth forests, the brown bear commands respect not through aggression, but quiet, patient majesty.
          </p>

          {/* Story Paragraph 2 */}
          <p
            className={`mt-4 text-base sm:text-lg text-forest-200/80 font-sans font-light leading-relaxed transition-all duration-700 delay-300 ${
              showText
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            As a vital keystone species, their foraging connects mountain rivers to woodland soils, transporting rich ocean nutrients deep inland and sustaining centuries of ancient forest renewal.
          </p>

          {/* Highlight badges */}
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
              showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/70 border border-amber-800/40 text-xs text-amber-200">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Keystone Forest Guardian</span>
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-forest-900/70 border border-emerald-800/40 text-xs text-emerald-200">
              <Waves className="w-3.5 h-3.5 text-sky-400" />
              <span>Crystal Waters & Solitude</span>
            </div>
          </div>
        </div>
      </div>

      {/* Seamless Transition to Epilogue */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-950 via-forest-950/80 to-transparent pointer-events-none" />
    </section>
  );
}
