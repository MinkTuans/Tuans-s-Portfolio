import React from "react";
import ForestNav from "@/components/forest/ForestNav";
import ForestHero from "@/components/forest/ForestHero";
import SectionDeer from "@/components/forest/SectionDeer";
import SectionFox from "@/components/forest/SectionFox";
import SectionWolf from "@/components/forest/SectionWolf";
import SectionBear from "@/components/forest/SectionBear";
import ForestEpilogue from "@/components/forest/ForestEpilogue";
import FloatingFoliage from "@/components/forest/FloatingFoliage";

export const revalidate = 3600;

export default function AnimalsInTheForestPage() {
  return (
    <div className="relative min-h-screen bg-forest-950 text-[#f4efe6] selection:bg-emerald-800 selection:text-white overflow-hidden">
      {/* 1. Subtle Floating Nature Leaves & Dust Motes Canvas */}
      <FloatingFoliage />

      {/* 2. Minimalist Floating Header & Ambient Audio Toggle */}
      <ForestNav />

      {/* 3. Main Living Storytelling Journey */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section: Morning Forest Vista */}
        <ForestHero />

        {/* 01 — The Deer: Old Growth Grove */}
        <SectionDeer />

        {/* 02 — The Fox: Sunlit Woodland Clearing */}
        <SectionFox />

        {/* 03 — The Wolf: Deep Misty Wilderness */}
        <SectionWolf />

        {/* 04 — The Bear: Alpine River Basin */}
        <SectionBear />
      </main>

      {/* 4. Poetic Epilogue & Conservation Footer */}
      <ForestEpilogue />
    </div>
  );
}
