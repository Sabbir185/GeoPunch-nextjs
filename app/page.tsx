"use client";

import React from "react";
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import TrustMetrics from "@/components/landing/TrustMetrics";
import InstitutesSection from "@/components/landing/InstitutesSection";
import PillarsSection from "@/components/landing/PillarsSection";
import DualTrackSection from "@/components/landing/DualTrackSection";
import AiAssistantSection from "@/components/landing/AiAssistantSection";
import SecurityMatrix from "@/components/landing/SecurityMatrix";
import HowItWorks from "@/components/landing/HowItWorks";
import AboutSection from "@/components/landing/AboutSection";
import PricingSection from "@/components/landing/PricingSection";
import FaqSection from "@/components/landing/FaqSection";
import CtaSection from "@/components/landing/CtaSection";
import Footer from "@/components/landing/Footer";
import Reveal from "@/components/landing/Reveal";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
      {/* Navigation Header - Strict sequence: Home, Activites, How it works, about us, pricing, signin/signup */}
      <Navbar />

      {/* Main Corporate Sections */}
      <main>
        {/* 1. Hero Section with Quick Sign In/Sign Up & Interactive Showcase */}
        <Hero />

        {/* 1.5. Professional Trust & Metrics Section */}
        <Reveal>
          <TrustMetrics />
        </Reveal>

        {/* 2. All Institutes: Educational, Corporate, Govt, Private Company */}
        <Reveal>
          <InstitutesSection />
        </Reveal>

        {/* 3. The Three Core Pillars */}
        <Reveal>
          <PillarsSection />
        </Reveal>

        {/* 4. Dual-Track Attendance: Track 1 Org Members & Track 2 Classroom BLE */}
        <Reveal>
          <DualTrackSection />
        </Reveal>

        {/* 5. AI Assistance: GPI Copilot & Natural Language Presence Queries */}
        <Reveal>
          <AiAssistantSection />
        </Reveal>

        {/* 6. Anti-Proxy Attendance Integrity Engine */}
        <Reveal>
          <SecurityMatrix />
        </Reveal>

        {/* 7. How It Works (4-Step Rollout) */}
        <Reveal>
          <HowItWorks />
        </Reveal>

        {/* 8. About Us Section */}
        <Reveal>
          <AboutSection />
        </Reveal>

        {/* 9. Transparent Pricing Plans */}
        <Reveal>
          <PricingSection />
        </Reveal>

        {/* 10. Frequently Asked Questions */}
        <Reveal>
          <FaqSection />
        </Reveal>

        {/* 11. Final High-Conversion CTA Banner */}
        <Reveal>
          <CtaSection />
        </Reveal>
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
