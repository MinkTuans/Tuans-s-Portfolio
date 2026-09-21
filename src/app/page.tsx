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
    <div className="flex flex-col min-h-screen bg-[#fbfcf9] text-stone-900 selection:bg-meadow-800 selection:text-white relative overflow-hidden">
      {/* 1. Subtle Floating Foliage & Sun Motes (100% Transparent Canvas, NO solid box) */}
      <FloatingFoliage />

      {/* 2. Sticky Navigation (Morning Meadow) */}
      <Navbar
        fullName={data.profile.fullName}
        githubUrl={data.profile.contact.github}
      />

      {/* 3. Main The Wolf's Journey Portfolio Content with Scroll-Driven Revelations */}
      <main className="flex-grow relative z-10">
        {/* 01. Hero Section */}
        <Hero profile={data.profile} />

        {/* 02. The Wolf Run (Scroll-Driven Running Wolf Across Grassland) */}
        <ScrollReveal direction="up" distance={40} threshold={0.05}>
          <TheWolfRun />
        </ScrollReveal>

        {/* 03. What I Have Built (Skill -> Project -> Contribution Matrix) */}
        <ScrollReveal direction="up" distance={40} threshold={0.08}>
          <WhatIHaveBuilt mappings={data.skillContributions} />
        </ScrollReveal>

        {/* 04. Projects Showcase with Case Studies & Auto-synced GitHub Repos */}
        <ScrollReveal direction="up" distance={40} threshold={0.08}>
          <Projects projects={data.projects} gitHubRepos={gitHubRepos} />
        </ScrollReveal>

        {/* 05. Experience & Education Milestones */}
        <ScrollReveal direction="up" distance={40} threshold={0.08}>
          <Experience experience={data.experience} education={data.education} />
        </ScrollReveal>

        {/* 06. Categorized Skill Ecosystem */}
        <ScrollReveal direction="up" distance={40} threshold={0.08}>
          <Skills categories={data.skillCategories} />
        </ScrollReveal>

        {/* 07. Verified Direct Contact Channels */}
        <ScrollReveal direction="up" distance={40} threshold={0.08}>
          <Contact contact={data.profile.contact} fullName={data.profile.fullName} />
        </ScrollReveal>
      </main>

      {/* 4. Public Footer */}
      <Footer
        fullName={data.profile.fullName}
        contact={data.profile.contact}
      />
    </div>
  );
}
