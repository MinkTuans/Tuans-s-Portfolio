import React from "react";
import { getPortfolioData } from "@/lib/data-service";
import { getGitHubRepos } from "@/lib/github";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import TheWolfRun from "@/components/sections/TheWolfRun";
import WhatIHaveBuilt from "@/components/sections/WhatIHaveBuilt";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/navigation/Footer";
import FloatingFoliage from "@/components/forest/FloatingFoliage";

import ScrollReveal from "@/components/ui/ScrollReveal";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const [data, gitHubRepos] = await Promise.all([
    getPortfolioData(),
    getGitHubRepos("MinkTuans"),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#f4f8f4] text-stone-900 selection:bg-nature-forest selection:text-white relative overflow-hidden font-sans">
      {/* 1. Subtle Floating Foliage & Golden Sun Motes (100% Transparent Canvas) */}
      <FloatingFoliage />

      {/* 2. Floating Glass Nature Navigation */}
      <Navbar
        fullName={data.profile.fullName}
        githubUrl={data.profile.contact.github}
      />

      {/* 3. Main The Wolf's Journey Portfolio Content with Scroll-Driven Revelations */}
      <main className="flex-grow relative z-10">
        {/* 01. Hero Section (Cinematic Mountain Valley with Wolf on Cliff) */}
        <Hero profile={data.profile} />

        {/* 02. The Wolf Run (Scroll-Driven Running Wolf Across Nature Grassland & Milestones) */}
        <ScrollReveal direction="up" distance={35} threshold={0.05}>
          <TheWolfRun />
        </ScrollReveal>

        {/* 03. What I Have Built (Skill -> Project -> Contribution Matrix) */}
        <ScrollReveal direction="up" distance={35} threshold={0.08}>
          <WhatIHaveBuilt mappings={data.skillContributions} />
        </ScrollReveal>

        {/* 04. Projects Showcase with Case Studies & Auto-synced GitHub Repos */}
        <ScrollReveal direction="up" distance={35} threshold={0.08}>
          <Projects projects={data.projects} gitHubRepos={gitHubRepos} />
        </ScrollReveal>

        {/* 05. Experience & Education Milestones (Forest Trail Camps) */}
        <ScrollReveal direction="up" distance={35} threshold={0.08}>
          <Experience experience={data.experience} education={data.education} />
        </ScrollReveal>

        {/* 06. Natural Skill Map (Forest, Mountain, Lake, Sky, Camp, Meadow) */}
        <ScrollReveal direction="up" distance={35} threshold={0.08}>
          <Skills categories={data.skillCategories} />
        </ScrollReveal>

        {/* 07. Verified Direct Contact Channels (Sunset Campsite Trail End) */}
        <ScrollReveal direction="up" distance={35} threshold={0.08}>
          <Contact contact={data.profile.contact} fullName={data.profile.fullName} />
        </ScrollReveal>
      </main>

      {/* 4. Deep Forest Green Footer */}
      <Footer
        fullName={data.profile.fullName}
        contact={data.profile.contact}
      />
    </div>
  );
}
