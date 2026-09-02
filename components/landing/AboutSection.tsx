"use client";

import React from "react";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  Target,
  Users2,
  Lock,
  HeartHandshake,
  CheckCircle2,
} from "lucide-react";

export default function AboutSection() {
  const values = [
    {
      icon: Target,
      title: "Presence That Is Trustworthy",
      desc: "Attendance is worthless if anyone can fake their location or send a token to an absent classmate. We built two-way cryptographic verification so digital attendance can be trusted without question.",
    },
    {
      icon: Users2,
      title: "Radical Availability Transparency",
      desc: "No student or colleague should ever have to make three phone calls or walk floor-to-floor just to find out if someone is on campus. One check-in powers live availability automatically.",
    },
    {
      icon: Zap,
      title: "Zero Hardware Dependency",
      desc: "Organizations waste millions buying fingerprint machines, face terminals, and RFID cards that break constantly. GPI Connect leverages the smartphone already in everyone's pocket.",
    },
    {
      icon: Lock,
      title: "Uncompromising Privacy",
      desc: "We believe in verification, not surveillance. GPI Connect strictly rejects continuous background location tracking. Location is only read at the moment of an explicit check-in.",
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50 border-b border-slate-200 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            About GPI Connect
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Built to End Attendance Friction and Communication Chaos
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            GPI Connect was conceived from a simple, frustrating reality: universities were wasting 15 minutes of every lecture taking attendance on paper, while companies were calling field reps daily asking &ldquo;Where are you?&rdquo;
          </p>
        </div>

        {/* Story Card */}
        <div className="mt-12 p-8 sm:p-10 rounded-3xl bg-white border border-slate-200 shadow-xl shadow-slate-200/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-2xl font-bold text-slate-900 font-sans">
                Our Mission: One Check-In. Total Transparency.
              </h3>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We engineered a platform that works without internet in crowded lecture halls, validates campus and territory boundaries through intelligent geofencing, and turns every check-in into a live availability beacon.
              </p>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Today, GPI Connect empowers universities, enterprises, government directorates, and private organizations across the region — proving that enterprise-grade presence does not require complex hardware.
              </p>
            </div>

            <div className="lg:col-span-5 bg-gradient-to-tr from-blue-600 via-blue-700 to-indigo-800 text-white p-6 sm:p-8 rounded-2xl shadow-lg space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                The GPI Connect Guarantee
              </span>
              <h4 className="text-xl font-bold font-sans">
                &ldquo;60 Members in 90 Seconds. Offline. Zero Hardware.&rdquo;
              </h4>
              <div className="space-y-2 pt-2 text-xs text-blue-100">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Works cross-platform (Android &amp; iOS interop)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>Strict organization-level data isolation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  <span>99.9% verifiable presence accuracy</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values 4-Card Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((val, idx) => {
            const Icon = val.icon;
            return (
              <div
                key={idx}
                className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="p-3 rounded-xl bg-blue-50 text-blue-700 w-fit">
                  <Icon className="w-5 h-5" />
                </div>
                <h4 className="mt-4 font-bold text-slate-900 text-base font-sans">
                  {val.title}
                </h4>
                <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                  {val.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
