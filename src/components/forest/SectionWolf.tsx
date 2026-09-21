"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Moon, Shield, Eye } from "lucide-react";

export default function SectionWolf() {
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

  // Running Wolf Sprint Calculation (dashes across screen from left to right as you scroll)
  // Activates between progress 0.15 and 0.85
  const sprintNormalized = Math.min(Math.max((scrollProgress - 0.15) / 0.7, 0), 1);
  const wolfRunX = sprintNormalized * 130 - 15; // from -15% to 115% of container width
  const wolfRunBounce = Math.sin(sprintNormalized * Math.PI * 18) * 10; // galloping bounce
  const wolfRunOpacity = sprintNormalized > 0.02 && sprintNormalized < 0.98 ? 0.95 : 0;

  // Parallax for the main portrait
  const wolfParallax = (scrollProgress - 0.5) * -40;

  const showHeading = scrollProgress > 0.18;
  const showText = scrollProgress > 0.32;
  const showDetails = scrollProgress > 0.45;

  return (
    <section
      id="wolf"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-twilight-950 py-24 md:py-36 flex items-center overflow-hidden"
    >
      {/* 1. Deep Atmospheric Dark Pine Woods Background with Silver Fog */}
      <div className="absolute inset-0 bg-gradient-to-b from-twilight-950 via-[#061217] to-twilight-950 pointer-events-none" />

      {/* Ground Mist Layer */}
      <div className="absolute bottom-0 left-0 right-0 h-96 pointer-events-none opacity-40 bg-gradient-to-t from-cyan-900/20 via-slate-700/10 to-transparent blur-2xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Storytelling narrative */}
        <div className="lg:col-span-5 order-2 lg:order-1 flex flex-col justify-center">
          {/* Index tag */}
          <div
            className={`flex items-center gap-3 transition-all duration-700 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-6 blur-sm"
            }`}
          >
            <span className="text-sm font-mono tracking-widest text-cyan-300 font-semibold uppercase">
              03 / 04
            </span>
            <span className="w-8 h-[1px] bg-cyan-400/40" />
            <span className="text-xs font-sans tracking-wider text-slate-300 uppercase flex items-center gap-1.5">
              <Moon className="w-3.5 h-3.5 text-cyan-300" />
              Deep Misty Wilderness
            </span>
          </div>

          {/* Heading */}
          <h2
            className={`font-hand text-5xl sm:text-6xl md:text-7xl font-bold text-[#eef6f8] mt-3 tracking-wide transition-all duration-700 delay-100 ${
              showHeading
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-md"
            }`}
          >
            The Wolf
          </h2>

          {/* Story Paragraph 1 */}
          <p
            className={`mt-6 text-lg sm:text-xl text-[#d2e4ea] font-sans font-light leading-relaxed transition-all duration-700 delay-200 ${
              showText
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            As twilight descends and fog settles between ancient pines, the forest deepens into shadow. Here walks the wolf — guardian of the deep woods and symbol of enduring untamed wilderness.
          </p>

          {/* Story Paragraph 2 */}
          <p
            className={`mt-4 text-base sm:text-lg text-slate-300/80 font-sans font-light leading-relaxed transition-all duration-700 delay-300 ${
              showText
                ? "opacity-100 translate-y-0 filter-none"
                : "opacity-0 translate-y-8 blur-sm"
            }`}
          >
            Fiercely loyal, intelligent and perceptive, wolves communicate across vast miles through haunting calls. Their presence maintains the natural harmony and strength of the forest herds.
          </p>

          {/* Traits highlight */}
          <div
            className={`mt-8 flex flex-wrap gap-4 transition-all duration-700 delay-400 ${
              showDetails ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
            }`}
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-800/40 text-xs text-cyan-200">
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>Nocturnal Vision & Keen Scent</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/80 border border-cyan-800/40 text-xs text-slate-200">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pack Loyalty & Silent Stride</span>
            </div>
          </div>
        </div>

        {/* Right Column: High-Res Nightfall Wolf Portrait with Parallax */}
        <div className="lg:col-span-7 order-1 lg:order-2 flex justify-center">
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9] lg:aspect-[4/3] max-w-2xl rounded-3xl overflow-hidden shadow-[0_25px_70px_-20px_rgba(0,0,0,0.95)] border border-cyan-950/60 group">
            {/* Parallax Image Container */}
            <div
              className="absolute inset-0 w-full h-[115%] -top-[7.5%] will-change-transform transition-transform duration-300 ease-out"
              style={{
                transform: `translate3d(0, ${wolfParallax}px, 0)`,
              }}
            >
              <Image
                src="/images/forest/wolf-night.jpg"
                alt="Lone Wolf Prowling on Mossy Fallen Log"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
            </div>

            {/* Deep Twilight Moonlit Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-twilight-950/90 via-transparent to-twilight-950/30 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-twilight-950/50 via-transparent to-transparent pointer-events-none" />

            {/* Glowing Tag on Photo */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-none">
              <div className="backdrop-blur-md bg-twilight-950/70 px-4 py-1.5 rounded-full border border-cyan-900/50 text-xs text-cyan-100 font-sans flex items-center gap-2 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)] animate-pulse" />
                <span>Canis lupus — Grey Wolf of the North</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DYNAMIC RUNNING WOLF SCROLL ANIMATION (Dashes across the screen as user scrolls!) */}
      <div
        className="absolute bottom-10 left-0 w-full pointer-events-none z-30 will-change-transform transition-opacity duration-300"
        style={{
          opacity: wolfRunOpacity,
        }}
      >
        <div
          className="relative will-change-transform inline-block"
          style={{
            transform: `translate3d(${wolfRunX}vw, ${wolfRunBounce}px, 0)`,
          }}
        >
          {/* Running wolf sprite with realistic motion blur and inverted silhouette */}
          <div className="relative w-28 h-16 sm:w-44 sm:h-24 md:w-56 md:h-32 filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]">
            <Image
              src="/images/forest/wolf-runner.jpg"
              alt="Running Wolf Animation"
              fill
              className="object-contain filter invert opacity-90"
            />
          </div>

          {/* Ethereal Mist Particle Trail Behind the Galloping Wolf */}
          <div className="absolute -left-16 bottom-2 w-32 h-8 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent blur-md pointer-events-none" />
        </div>
      </div>

      {/* Transition to Bright Peaceful River Valley (Section 04 The Bear) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-forest-950 via-[#0a1813] to-transparent pointer-events-none" />
    </section>
  );
}
