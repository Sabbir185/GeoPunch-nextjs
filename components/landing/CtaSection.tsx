"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Activity, ShieldCheck, Sparkles } from "lucide-react";

export default function CtaSection() {
  return (
    <section className="py-20 bg-gradient-to-tr from-blue-900 via-slate-900 to-indigo-950 text-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/30 mb-6">
          <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
          <span>Transform Institutional Presence Today</span>
        </div>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight font-sans leading-tight">
          Ready to Modernize Attendance and Eliminate &ldquo;Where Are You?&rdquo; Calls?
        </h2>

        <p className="mt-6 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Get started in 5 minutes with nothing more than a smartphone. Capture 60 students in 90 seconds without internet and publish your team&apos;s live availability status in 2 taps.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/activity"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 transition-all hover:-translate-y-0.5"
          >
            <Activity className="w-5 h-5 text-emerald-300" />
            <span>Launch Live Activity Board</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/login"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-white font-semibold text-base border border-slate-700 transition-all"
          >
            <span>Create Free Account</span>
          </Link>
        </div>

        <div className="mt-10 pt-8 border-t border-slate-800 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> No Credit Card Required
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> Zero Hardware Procurement
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" /> 100% Offline Session Capture
          </span>
        </div>
      </div>
    </section>
  );
}
