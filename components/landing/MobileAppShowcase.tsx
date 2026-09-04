"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Maximize2,
  X,
  Smartphone,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Sparkles,
  Download,
  KeyRound,
  ExternalLink,
  Layers,
} from "lucide-react";
import AppDownloadCard, { APK_DOWNLOAD_URL } from "./AppDownloadCard";

interface ScreenshotItem {
  id: string;
  src: string;
  category: "all" | "auth" | "presence" | "history";
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

const SCREENSHOTS: ScreenshotItem[] = [
  {
    id: "0",
    src: "/android/0.png",
    category: "auth",
    title: "Android Home Launcher",
    subtitle: "Native Android Companion",
    description:
      "Installed directly on any modern Android smartphone. Ultra-lightweight APK with instant home screen launcher access.",
    tags: ["Native APK", "Zero Bloatware", "Quick Launch"],
  },
  {
    id: "1",
    src: "/android/1.png",
    category: "auth",
    title: "Branded Splash Screen",
    subtitle: "Sub-Second Startup",
    description:
      "Warm, engaging cold-start animation. Automatically checks cached session tokens and geofencing configurations in milliseconds.",
    tags: ["Instant Load", "Token Verification", "GPI Connect"],
  },
  {
    id: "2",
    src: "/android/2.png",
    category: "auth",
    title: "Enterprise Sign In",
    subtitle: "Secure Single Identity",
    description:
      "Role-based authentication supporting teachers, students, corporate staff, and field personnel with end-to-end credential encryption.",
    tags: ["Encrypted Auth", "Role-Based", "Password Visibility"],
  },
  {
    id: "3.0",
    src: "/android/3.0.png",
    category: "auth",
    title: "Self-Service Password Recovery",
    subtitle: "Automated OTP Verification",
    description:
      "Self-service password reset workflow sending secure one-time verification codes (OTP) without burdening system administrators.",
    tags: ["OTP Recovery", "Zero Admin Overhead", "Instant Delivery"],
  },
  {
    id: "3.1",
    src: "/android/3.1.png",
    category: "auth",
    title: "Session Verified",
    subtitle: "Instant Handshake",
    description:
      "Immediate toast notification confirming authentication. Syncs personal workspace data and offline presence tokens to the device.",
    tags: ["Fast Handshake", "Local Cache Sync", "Session Loaded"],
  },
  {
    id: "4",
    src: "/android/4.png",
    category: "presence",
    title: "Presence Control Dashboard",
    subtitle: "Real-Time Location & Status",
    description:
      "Live clock, verified geofenced street address, prominent Check In/Out toggles, and instant workspace tagging (Meeting Room, Library, Office).",
    tags: ["Live Geocoding", "1-Tap Check-In", "Active Workspace Tag"],
  },
  {
    id: "5",
    src: "/android/5.png",
    category: "presence",
    title: "Anti-Proxy Verification",
    subtitle: "Cryptographic Presence Check",
    description:
      "Runs device integrity, proximity BLE validation, and spatial geofencing in under 2 seconds to prevent proxy attendance.",
    tags: ["Anti-Proxy Engine", "BLE Proximity", "Sub-2s Check"],
  },
  {
    id: "6",
    src: "/android/6.png",
    category: "presence",
    title: "Active Presence Confirmed",
    subtitle: "Dual Outcome Produced",
    description:
      "Check-in complete! Produces official attendance compliance while updating team-wide live availability status instantly.",
    tags: ["Active Status", "Dual Outcome", "Zero Phone Calls"],
  },
  {
    id: "7",
    src: "/android/7.png",
    category: "presence",
    title: "Add Custom Workplace",
    subtitle: "Dynamic Department Labeling",
    description:
      "Users and managers can add custom locations like Conference Rooms, Labs, Dean's Office, or Examination Halls on the fly.",
    tags: ["Custom Rooms", "Categorized Places", "Instant Update"],
  },
  {
    id: "8",
    src: "/android/8.png",
    category: "history",
    title: "Attendance Activity Timeline",
    subtitle: "Full Historical Audit Trail",
    description:
      "Chronological ledger of every check-in and check-out event with street location, precise timestamps, and session durations.",
    tags: ["Immutable Log", "Precise Timestamps", "Street Address"],
  },
  {
    id: "9",
    src: "/android/9.png",
    category: "history",
    title: "Activity Date Filter",
    subtitle: "Fast Historical Search",
    description:
      "Filter past records by specific year and calendar month. Easily audit monthly compliance or generate attendance summaries.",
    tags: ["Month/Year Filter", "Audit Ready", "Fast Lookup"],
  },
  {
    id: "10",
    src: "/android/10.png",
    category: "history",
    title: "Institutional Profile",
    subtitle: "Verified Member Identity",
    description:
      "Displays user designation, academic department, phone number, and verified profile picture bound to the organization.",
    tags: ["Designation & Dept", "Verified Identity", "Contact Info"],
  },
  {
    id: "11",
    src: "/android/11.png",
    category: "history",
    title: "Options & Account Settings",
    subtitle: "Device & Session Management",
    description:
      "Quick access to personal information, application settings, and secure session logout with device state clearing.",
    tags: ["Account Settings", "Device Clear", "Secure Logout"],
  },
];

const CATEGORIES = [
  { key: "all", label: "All Screens", count: 13 },
  { key: "auth", label: "Auth & Setup", count: 5 },
  { key: "presence", label: "Check-In & Presence", count: 4 },
  { key: "history", label: "Activity & Profile", count: 4 },
];

export default function MobileAppShowcase() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [currentIndex, setCurrentIndex] = useState<number>(5); // Default to Dashboard (index 5)
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Filter items based on active category
  const filteredScreens = SCREENSHOTS.filter(
    (item) => activeCategory === "all" || item.category === activeCategory
  );

  // Ensure currentIndex is in bounds when category switches
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeCategory]);

  const currentItem = filteredScreens[currentIndex] || filteredScreens[0];

  // Next Slide
  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % filteredScreens.length);
  }, [filteredScreens.length]);

  // Prev Slide
  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + filteredScreens.length) % filteredScreens.length);
  }, [filteredScreens.length]);

  // Auto-play effect
  useEffect(() => {
    if (isPlaying && !lightboxOpen) {
      timerRef.current = setInterval(() => {
        handleNext();
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, lightboxOpen, handleNext]);

  // Touch Swipe Handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;
    const distance = touchStartX - touchEndX;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" && lightboxOpen) setLightboxOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, lightboxOpen]);

  return (
    <section
      id="mobile-app"
      ref={containerRef}
      className="py-20 md:py-28 bg-gradient-to-b from-slate-50 via-white to-slate-50 border-y border-slate-200/80 relative overflow-hidden"
    >
      {/* Decorative background blurs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] bg-gradient-to-br from-blue-400/10 via-indigo-300/10 to-teal-400/10 blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-800 text-xs font-bold uppercase tracking-wider shadow-xs">
            <Smartphone className="w-4 h-4 text-blue-600" />
            <span>Official Mobile Companion</span>
          </div>

          <h2 className="mt-5 text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight font-sans">
            Native Mobile App.{" "}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
              Verifiable Attendance
            </span>{" "}
            in Your Pocket.
          </h2>

          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Take a hands-on walkthrough through our production Android client. 
            Designed for 1-tap check-in, geofence validation, and reliable offline attendance with zero hardware cost.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.key;
            return (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/20 scale-105"
                    : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-600"
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Interactive Showcase: Smartphone Frame + Feature Panel */}
        <div className="mt-12 lg:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left / Center Column: 3D Smartphone Device Mockup */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            {/* Phone Container with Hover & Swipe */}
            <div
              className="relative group select-none"
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseEnter={() => setIsPlaying(false)}
              onMouseLeave={() => setIsPlaying(true)}
            >
              {/* Device Ambient Shadow & Glow */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-indigo-500/20 to-teal-400/20 rounded-[56px] blur-2xl opacity-70 group-hover:opacity-100 transition-opacity pointer-events-none" />

              {/* Smartphone Frame */}
              <div className="relative w-[280px] sm:w-[320px] md:w-[340px] aspect-[720/1640] rounded-[44px] bg-slate-950 p-3 shadow-2xl ring-1 ring-white/20 border-4 border-slate-800">
                {/* Outer Volume & Power Button Indicators */}
                <div className="absolute -left-[7px] top-24 w-[3px] h-10 bg-slate-700 rounded-l-md" />
                <div className="absolute -left-[7px] top-38 w-[3px] h-10 bg-slate-700 rounded-l-md" />
                <div className="absolute -right-[7px] top-28 w-[3px] h-12 bg-slate-700 rounded-r-md" />

                {/* Inner Screen Area */}
                <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-slate-900 flex items-center justify-center">
                  {/* Dynamic Camera Punch Hole Notch */}
                  <div className="absolute top-2.5 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80 animate-pulse" />
                  </div>

                  {/* Active Screen Image */}
                  <div className="relative w-full h-full">
                    <Image
                      src={currentItem.src}
                      alt={currentItem.title}
                      fill
                      priority
                      className="object-cover transition-opacity duration-300"
                      sizes="(max-width: 640px) 280px, (max-width: 768px) 320px, 340px"
                    />
                  </div>

                  {/* Subtle Glass Glare Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />

                  {/* Lightbox Trigger Icon Button */}
                  <button
                    onClick={() => setLightboxOpen(true)}
                    className="absolute bottom-4 right-4 z-30 p-2.5 rounded-full bg-slate-950/70 hover:bg-slate-950 text-white backdrop-blur-md shadow-lg opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:scale-110"
                    title="Zoom Fullscreen"
                    aria-label="View screenshot in full size"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Next / Prev Floating Arrow Controls (Mobile & Tablet) */}
              <button
                onClick={handlePrev}
                className="absolute left-0 sm:-left-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200 transition-all hover:scale-110 cursor-pointer active:scale-95"
                aria-label="Previous screenshot"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={handleNext}
                className="absolute right-0 sm:-right-6 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-white/95 hover:bg-white text-slate-800 shadow-xl border border-slate-200 transition-all hover:scale-110 cursor-pointer active:scale-95"
                aria-label="Next screenshot"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Play/Pause & Step Controls below phone */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pause Auto-play</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                    <span>Play Slideshow</span>
                  </>
                )}
              </button>

              <span className="text-xs text-slate-500 font-medium">
                Swipe or use arrows to navigate
              </span>
            </div>
          </div>

          {/* Right Column: Dynamic Screen Details & Feature Information */}
          <div className="lg:col-span-6 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-200/50 relative overflow-hidden">
              {/* Screen Counter Badge */}
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-extrabold font-mono">
                  STEP {String(currentIndex + 1).padStart(2, "0")} / {String(filteredScreens.length).padStart(2, "0")}
                </span>

                <span className="text-xs font-bold uppercase tracking-wider text-teal-600 bg-teal-50 px-2.5 py-1 rounded-md border border-teal-100">
                  {currentItem.subtitle}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight font-sans">
                {currentItem.title}
              </h3>

              <p className="mt-3 text-base text-slate-600 leading-relaxed">
                {currentItem.description}
              </p>

              {/* Feature Tags */}
              <div className="mt-5 flex flex-wrap gap-2">
                {currentItem.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* Screen Quick Selector Strip (Mini Thumbnails) */}
              <div className="mt-8 pt-6 border-t border-slate-100">
                <div className="flex items-center justify-between text-xs font-bold text-slate-600 mb-3">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-blue-600" />
                    Jump to Specific Screen:
                  </span>
                  <span className="text-slate-400">Click thumbnail</span>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
                  {filteredScreens.map((item, idx) => {
                    const isSelected = idx === currentIndex;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setCurrentIndex(idx)}
                        className={`relative shrink-0 w-11 h-20 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                          isSelected
                            ? "border-blue-600 scale-105 shadow-md shadow-blue-500/20 ring-2 ring-blue-400/30"
                            : "border-slate-200 opacity-60 hover:opacity-100 hover:border-slate-300"
                        }`}
                        title={item.title}
                        aria-label={`Jump to screen: ${item.title}`}
                      >
                        <Image
                          src={item.src}
                          alt={item.title}
                          fill
                          className="object-cover"
                          sizes="44px"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Call to Action */}
              <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                <a
                  href={APK_DOWNLOAD_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white text-xs font-bold shadow-md shadow-blue-600/20 hover:shadow-lg transition-all"
                >
                  <Download className="w-4 h-4 text-cyan-300" />
                  <span>Download APK & Test Flow</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#download-card"
                  className="w-full sm:w-auto text-center text-xs font-bold text-slate-600 hover:text-blue-600 transition-colors"
                >
                  View Demo Credentials ↓
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section: APK Download Card & Demo Credentials */}
        <div id="download-card" className="mt-16 lg:mt-24">
          <AppDownloadCard />
        </div>
      </div>

      {/* Lightbox / Fullscreen Modal */}
      {lightboxOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            aria-label="Close fullscreen view"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="relative max-w-sm max-h-[90vh] aspect-[720/1640] rounded-3xl overflow-hidden shadow-2xl ring-2 ring-white/20">
            <Image
              src={currentItem.src}
              alt={currentItem.title}
              fill
              className="object-contain"
              sizes="400px"
            />
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center text-white bg-black/60 backdrop-blur-md px-4 py-2 rounded-full text-xs font-medium">
            {currentItem.title} &mdash; ({currentIndex + 1}/{filteredScreens.length})
          </div>
        </div>
      )}
    </section>
  );
}
