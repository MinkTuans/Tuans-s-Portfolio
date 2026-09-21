import React from "react";
import { getPortfolioData } from "@/lib/data-service";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
import TheWolfRun from "@/components/sections/TheWolfRun";
import WhatIHaveBuilt from "@/components/sections/WhatIHaveBuilt";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Skills from "@/components/sections/Skills";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/navigation/Footer";

export const revalidate = 60; // ISR revalidate every 60 seconds

export default async function HomePage() {
  const data = await getPortfolioData();

  return (
    <div className="flex flex-col min-h-screen bg-[#fbfcf9] text-stone-900">
      {/* Sticky Navigation (Morning Meadow) */}
      <Navbar
        fullName={data.profile.fullName}
        githubUrl={data.profile.contact.github}
      />

      {/* Main Wolf's Journey Scroll Content */}
      <main className="flex-grow">
        {/* 01. Hero Section (Morning Meadow, Verified CV Bio, No 3D dog) */}
        <Hero profile={data.profile} />

        {/* 02. The Wolf Run (Scroll-Driven Interactive Running Wolf Storytelling) */}
        <TheWolfRun />

        {/* 03. What I Have Built (Skill -> Project -> Contribution Matrix) */}
        <WhatIHaveBuilt mappings={data.skillContributions} />

        {/* 04. Projects Showcase with 6-Part Case Studies */}
        <Projects projects={data.projects} />

        {/* 05. Experience Milestones */}
        <Experience experience={data.experience} />

        {/* 06. Categorized Skill Ecosystem */}
        <Skills categories={data.skillCategories} />

        {/* 07. Verified Direct Contact */}
        <Contact contact={data.profile.contact} fullName={data.profile.fullName} />
      </main>

      {/* Public Footer */}
      <Footer
        fullName={data.profile.fullName}
        contact={data.profile.contact}
      />
    </div>
  );
}
