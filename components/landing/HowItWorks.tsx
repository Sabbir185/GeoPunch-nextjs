"use client";

import React from "react";
import {
  Smartphone,
  MapPin,
  CheckCircle2,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      num: "01",
      title: "Define Workspace & Sites",
      desc: "Create your organization with just a phone number. Name your departments and draw your campus or depot geofence boundaries on an interactive map.",
      badge: "Fast Onboarding",
    },
    {
      num: "02",
      title: "Invite Members & Groups",
      desc: "Share unique 6-digit Join Codes, QR codes, or import members via CSV. Organize courses, batches, or sales zones with configurable admin permissions.",
      badge: "Zero Password Friction",
    },
    {
      num: "03",
      title: "Take Presence in 90 Seconds",
      desc: "Faculty or group leads tap 'Start Session'. BLE mutual presence records the room in 90 seconds without internet. Staff check in at gates via Geofence or Dynamic QR.",
      badge: "Offline Capable",
    },
    {
      num: "04",
      title: "Automated Availability & Audit",
      desc: "Live Activity Board reflects real-time status instantly. Discrepancies are flagged for human review. Branded PDF & Excel compliance reports export on demand.",
      badge: "Dual Outcomes",
    },
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3.5 py-1.5 rounded-full border border-teal-200">
            Simple 4-Step Rollout
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            From Sign-Up to First Attendance in 5 Minutes
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            No procurement delays, no cabling, and no biometric fingerprint sensors to install. Run trustworthy presence operations directly from smartphones.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-blue-300 hover:shadow-md transition-all group"
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold text-blue-600/30 font-sans group-hover:text-blue-600 transition-colors">
                  {step.num}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                  {step.badge}
                </span>
              </div>

              <h4 className="mt-4 text-lg font-bold text-slate-900 font-sans">
                {step.title}
              </h4>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
