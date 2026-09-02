"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  Radio,
  Clock,
  Sparkles,
  Zap,
  Activity,
  CheckCircle2,
  GraduationCap,
  Briefcase,
  Landmark,
  Building,
  UserCheck,
  Shield,
  Smartphone,
  Lock,
  Globe,
} from "lucide-react";
import LiveActivityWidget from "./LiveActivityWidget";
import QuickAuthModal from "./QuickAuthModal";

export default function Hero() {
  const [authModalOpen, setAuthModalOpen] = useState(false);

  return (
    <section id="hero" className="relative pt-16 pb-24 md:pt-20 md:pb-32 overflow-hidden bg-gradient-to-b from-white via-slate-50 to-blue-50/30">
      {/* Premium decorative gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-br from-blue-400/20 via-indigo-300/15 to-teal-300/10 blur-3xl -z-10 pointer-events-none"></div>
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/15 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gradient-to-tr from-indigo-500/10 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Premium Launch Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/80 text-slate-900 text-xs sm:text-sm font-semibold shadow-md hover:shadow-lg hover:border-blue-300 transition-all duration-200 group">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-slate-700">Enterprise-Grade Platform</span>
            <span className="hidden sm:inline text-slate-300">·</span>
            <span className="hidden sm:inline text-slate-600">v3.0 Baseline Ready</span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-600 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>

        {/* Hero Headline - Premium Typography */}
        <div className="mt-6 text-center max-w-5xl mx-auto">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-slate-900 tracking-tight font-sans leading-[1.1]">
            Verifiable Presence.{" "}
            <span className="block mt-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 bg-clip-text text-transparent">
              Live Availability.
            </span>
            <span className="block text-transparent bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text">
              Zero Hardware Cost.
            </span>
          </h1>

          <p className="mt-7 text-xl sm:text-2xl text-slate-600 max-w-4xl mx-auto leading-relaxed font-light">
            Proxy-resistant attendance in <strong className="text-slate-900 font-semibold">90 seconds, without internet</strong>. 
            One check-in produces <strong className="text-slate-900 font-semibold">two outcomes</strong>: an official attendance record and a live availability status that eliminates endless &ldquo;Where is this person?&rdquo; phone calls.
          </p>

          {/* Trust Badges - Vertical Integration */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-800 flex items-center gap-2 hover:border-blue-300 transition-colors shadow-sm">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span className="font-semibold">Anti-Proxy Defense</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-200/60 text-teal-800 flex items-center gap-2 hover:border-teal-300 transition-colors shadow-sm">
              <Smartphone className="w-4 h-4 text-teal-600" />
              <span className="font-semibold">App-Native Offline</span>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200/60 text-purple-800 flex items-center gap-2 hover:border-purple-300 transition-colors shadow-sm">
              <Lock className="w-4 h-4 text-purple-600" />
              <span className="font-semibold">Privacy-First Design</span>
            </span>
          </div>

          {/* Sector/Industry Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs font-medium">
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 shadow-xs flex items-center gap-2 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              Universities & Schools
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 shadow-xs flex items-center gap-2 hover:border-teal-300 hover:bg-teal-50 transition-all duration-200">
              <Briefcase className="w-4 h-4 text-teal-600" />
              Corporate & Field Force
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 shadow-xs flex items-center gap-2 hover:border-amber-300 hover:bg-amber-50 transition-all duration-200">
              <Landmark className="w-4 h-4 text-amber-600" />
              Government
            </span>
            <span className="px-3.5 py-1.5 rounded-full bg-white border border-slate-200/80 text-slate-700 shadow-xs flex items-center gap-2 hover:border-purple-300 hover:bg-purple-50 transition-all duration-200">
              <Building className="w-4 h-4 text-purple-600" />
              Private Companies
            </span>
          </div>

          {/* Premium CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/activity"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-blue-600/40 transition-all duration-200 hover:-translate-y-1 active:translate-y-0 group"
            >
              <Activity className="w-5 h-5 text-cyan-300" />
              <span>Explore Live Activity Board</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-white hover:bg-slate-50 text-slate-900 font-bold text-base border border-slate-300/80 shadow-lg shadow-slate-200/40 transition-all duration-200 hover:border-blue-400 hover:shadow-lg hover:shadow-slate-300/50 group"
            >
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span>Get Started Free</span>
              <span className="text-xs bg-blue-100 text-blue-700 px-2.5 py-1 rounded-md font-semibold ml-1">
                2 mins
              </span>
            </button>
          </div>

          {/* Professional Trust Metrics Grid */}
          <div className="mt-14 pt-10 border-t border-slate-200/60 grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="group p-5 rounded-2xl bg-gradient-to-br from-blue-50/60 to-indigo-50/30 border border-blue-200/40 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200">
              <div className="text-3xl sm:text-4xl font-black text-blue-700 font-sans mb-1">
                &lt;90s
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                60-Member Session
              </div>
              <div className="text-xs text-slate-600">
                Proximity-based BLE capture without internet
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-gradient-to-br from-teal-50/60 to-emerald-50/30 border border-teal-200/40 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200">
              <div className="text-3xl sm:text-4xl font-black text-teal-700 font-sans mb-1">
                1 Tap
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                Dual Outcomes
              </div>
              <div className="text-xs text-slate-600">
                Attendance + Live availability status
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-gradient-to-br from-purple-50/60 to-indigo-50/30 border border-purple-200/40 shadow-sm hover:shadow-md hover:border-purple-300 transition-all duration-200">
              <div className="text-3xl sm:text-4xl font-black text-purple-700 font-sans mb-1">
                100%
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                Offline-First
              </div>
              <div className="text-xs text-slate-600">
                7-day zero data-loss queuing
              </div>
            </div>

            <div className="group p-5 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-green-50/30 border border-emerald-200/40 shadow-sm hover:shadow-md hover:border-emerald-300 transition-all duration-200">
              <div className="text-3xl sm:text-4xl font-black text-emerald-700 font-sans mb-1">
                $0 HW
              </div>
              <div className="text-sm font-bold text-slate-800 mb-1">
                Zero Hardware
              </div>
              <div className="text-xs text-slate-600">
                Smartphone-only, no cards or terminals
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Showcase Widget */}
        <div className="mt-12 sm:mt-16">
          <LiveActivityWidget />
        </div>
      </div>

      {/* Quick Auth Modal for Phone or Email only */}
      <QuickAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode="signin"
      />
    </section>
  );
}
