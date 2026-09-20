import React from "react";
import { getPortfolioData } from "@/lib/data-service";
import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/sections/Hero";
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
    <div className="flex flex-col min-h-screen bg-steppe-950 text-steppe-50">
      {/* Sticky Navigation */}
      <Navbar
        fullName={data.profile.fullName}
        githubUrl={data.profile.contact.github}
      />

      {/* Main Wolf's Journey Scroll Content */}
      <main className="flex-grow">
        {/* 01. Hero Section */}
        <Hero profile={data.profile} />

        {/* 02. What I Have Built (Skill -> Project -> Contribution Matrix) */}
        <WhatIHaveBuilt mappings={data.skillContributions} />

        {/* 03. Projects Showcase with 6-Part Case Studies */}
        <Projects projects={data.projects} />

        {/* 04. Experience Milestones */}
        <Experience experience={data.experience} />

        {/* 05. Categorized Skill Ecosystem */}
        <Skills categories={data.skillCategories} />

        {/* 06. Verified Direct Contact */}
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
