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
        <TrustMetrics />

        {/* 2. All Institutes: Educational, Corporate, Govt, Private Company */}
        <InstitutesSection />

        {/* 3. The Three Core Pillars */}
        <PillarsSection />

        {/* 4. Dual-Track Attendance: Track 1 Org Members & Track 2 Classroom BLE */}
        <DualTrackSection />

        {/* 5. AI Assistance: GPI Copilot & Natural Language Presence Queries */}
        <AiAssistantSection />

        {/* 6. Anti-Proxy Attendance Integrity Engine */}
        <SecurityMatrix />

        {/* 7. How It Works (4-Step Rollout) */}
        <HowItWorks />

        {/* 8. About Us Section */}
        <AboutSection />

        {/* 9. Transparent Pricing Plans */}
        <PricingSection />

        {/* 10. Frequently Asked Questions */}
        <FaqSection />

        {/* 11. Final High-Conversion CTA Banner */}
        <CtaSection />
      </main>

      {/* Corporate Footer */}
      <Footer />
    </div>
  );
}
