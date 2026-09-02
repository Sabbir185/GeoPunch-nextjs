"use client";

import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Activity,
  Layers,
  CheckCircle2,
  ArrowRight,
  WifiOff,
  PhoneOff,
  FolderSync,
} from "lucide-react";

export default function PillarsSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      badge: "Pillar 01",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      title: "Verifiable Presence",
      subtitle: "Attendance that is trustworthy, not merely digital — works without internet.",
      description:
        "Conventional apps simply record when someone clicks a button. GPI Connect validates physical presence using peer-to-peer BLE, geofencing, and rotating codes. Even if mobile network drops, your records are cryptographically verified and queued for sync.",
      bulletPoints: [
        "60 members verified in 90s without internet",
        "Mutual BLE confirmation prevents token forwarding",
        "Device binding prevents friends marking attendance",
        "Zero expensive biometric or card terminals needed",
      ],
      linkText: "Explore Anti-Proxy Defense",
      linkHref: "#security",
      accentBg: "from-blue-600/10 to-indigo-600/5",
      borderColor: "border-blue-200/80 hover:border-blue-400",
      iconBg: "bg-gradient-to-br from-blue-600 to-indigo-600 text-white",
    },
    {
      icon: Activity,
      badge: "Pillar 02",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-200",
      title: "Live Availability",
      subtitle: "See who is on campus or in the field right now, without making a phone call.",
      description:
        "Finding a professor, technician, or field sales manager traditionally requires calling multiple extensions or walking room to room. In GPI Connect, checking in produces two outcomes from one single action: an official attendance record and a live, consent-governed availability status.",
      bulletPoints: [
        "Automatic transition to Available upon check-in",
        "Human tags: 'Room 302', 'Library', 'Depot', 'Field'",
        "Two-tap status updates with expected return times",
        "Privacy-first: exact GPS coordinates are never published",
      ],
      linkText: "View Live Activity Board",
      linkHref: "/activity",
      accentBg: "from-teal-600/10 to-emerald-600/5",
      borderColor: "border-teal-200/80 hover:border-teal-400",
      iconBg: "bg-gradient-to-br from-teal-600 to-emerald-600 text-white",
      highlightBadge: "Direct Link in Header",
    },
    {
      icon: Layers,
      badge: "Pillar 03",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      title: "Structured Collaboration",
      subtitle: "Notices, resources, tasks, and SLA ticketing inside your real organization tree.",
      description:
        "No more scattered WhatsApp groups or unread broadcast emails. GPI Connect maps your actual organization hierarchy — departments, batches, sections, or sales zones — with unified notices, versioned resource drive, and categorized support ticketing.",
      bulletPoints: [
        "Multi-level hierarchy: Org → Department → Group",
        "Important notices with priority pinning & read receipts",
        "Support ticketing with automated skill-based routing & SLA",
        "Public showcase for academic research & company portfolios",
      ],
      linkText: "See Enterprise Modules",
      linkHref: "#solutions",
      accentBg: "from-purple-600/10 to-violet-600/5",
      borderColor: "border-purple-200/80 hover:border-purple-400",
      iconBg: "bg-gradient-to-br from-purple-600 to-violet-600 text-white",
    },
  ];

  return (
    <section id="solutions" className="py-20 bg-gradient-to-b from-white via-slate-50/30 to-white border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute -top-40 right-0 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute -bottom-40 left-0 w-96 h-96 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading - Premium */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-800 text-xs font-bold uppercase tracking-wider">
            🏗️ Core Architecture
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            The Three Pillars of GPI Connect
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Engineered from first principles to solve fundamental breakdowns of presence, communication, and transparency in institutions and distributed teams worldwide.
          </p>
        </div>

        {/* 3 Pillars Grid - Premium Cards */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-3 gap-8"
>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`relative flex flex-col justify-between p-7 sm:p-8 rounded-2xl bg-gradient-to-b ${pillar.accentBg} bg-white border ${pillar.borderColor} shadow-lg shadow-slate-200/50 hover:shadow-2xl hover:shadow-slate-300/60 transition-all duration-300 group overflow-hidden`}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${pillar.accentBg} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>

                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-xl ${pillar.iconBg} shadow-md shadow-slate-300/50 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${pillar.badgeColor}`}>
                      {pillar.badge}
                    </span>
                  </div>

                  <h3 className="text-2xl font-black text-slate-900 font-sans group-hover:text-blue-700 transition-colors duration-200 mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm font-semibold text-slate-700 mb-3">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>

                  <div className="mt-7 pt-5 border-t border-slate-200/80 space-y-3">
                    {pillar.bulletPoints.map((pt, pIdx) => (
                      <div key={pIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200/60">
                  <Link
                    href={pillar.linkHref}
                    className="inline-flex items-center gap-2.5 text-sm font-bold text-blue-700 hover:text-blue-800 transition-all group-hover:translate-x-1 duration-200"
                  >
                    <span>{pillar.linkText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
