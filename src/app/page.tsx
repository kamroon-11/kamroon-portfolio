"use client";

import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import MarqueeBanner from "@/components/MarqueeBanner";
import ServicesSection from "@/components/ServicesSection";
import WorkExperience from "@/components/WorkExperience";
import ProjectsSection from "@/components/ProjectsSection";
import SkillsSection from "@/components/SkillsSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      {/* Grain overlay */}
      <div className="grain" aria-hidden="true" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        {/* 01 Hero */}
        <HeroSection />

        {/* Marquee banner */}
        <MarqueeBanner />

        {/* 02 Services */}
        <ServicesSection />

        {/* 03 Work Experience */}
        <WorkExperience />

        {/* 04 Projects */}
        <ProjectsSection />

        {/* 05 Skills */}
        <SkillsSection />

        {/* 06 Testimonials */}
        <TestimonialsSection />

        {/* 07 Contact */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
