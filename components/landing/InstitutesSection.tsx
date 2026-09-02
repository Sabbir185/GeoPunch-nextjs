"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  Landmark,
  Building,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Users,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function InstitutesSection() {
  const [activeTab, setActiveTab] = useState<"edu" | "corp" | "govt" | "private">("edu");

  const sectors = [
    {
      id: "edu" as const,
      label: "Educational",
      icon: GraduationCap,
      title: "Universities, Colleges & Polytechnics",
      badge: "Campus Ready",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
      accentColor: "from-blue-600 to-indigo-600",
      description:
        "Replace paper roll-calls and chaotic WhatsApp groups with 90-second offline session attendance and an automated campus faculty availability board.",
      features: [
        "60 students marked in 90s without needing internet or Wi-Fi",
        "Faculty availability board eliminates 'Where is the teacher?' office visits",
        "Public showcase for academic research, publications, and thesis projects",
        "Anti-proxy mutual BLE verification prevents token sharing",
      ],
      stats: [
        { label: "Class Time Saved", val: "15 mins / session" },
        { label: "Proxy Rate", val: "0.0% Verified" },
        { label: "Hardware Cost", val: "$0 per classroom" },
      ],
    },
    {
      id: "corp" as const,
      label: "Corporate",
      icon: Briefcase,
      title: "Enterprises, FMCG & Field Forces",
      badge: "Enterprise Scale",
      badgeColor: "bg-teal-100 text-teal-800 border-teal-300",
      accentColor: "from-teal-600 to-emerald-600",
      description:
        "Manage distributed sales reps, medical representatives, and logistics teams across multiple sales zones and supply chain depots.",
      features: [
        "Polygon geofence boundaries for territorial markets & field zones",
        "Dynamic rotating QR scan at entrance kiosks and warehouse gates",
        "Automated check-out triggered when exiting work territory",
        "Exportable timesheets with shift rules, overtime, and leave sync",
      ],
      stats: [
        { label: "Territory Compliance", val: "99.4%" },
        { label: "Check-In Speed", val: "< 1 second" },
        { label: "Field Tracking", val: "Zero Battery Drain" },
      ],
    },
    {
      id: "govt" as const,
      label: "Government",
      icon: Landmark,
      title: "Government Bodies & Public Sector",
      badge: "High Governance",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
      accentColor: "from-amber-600 to-orange-600",
      description:
        "Ensure indisputable transparency in public administration, municipal services, regional directorates, and government depots.",
      features: [
        "Tamper-evident audit trails with cryptographic HMAC verification",
        "Citizen-facing availability board for designated public office desks",
        "Server-authoritative clocks prevent smartphone time rollback",
        "Strict multi-tenant data isolation and complete sovereign privacy",
      ],
      stats: [
        { label: "Audit Integrity", val: "100% Verifiable" },
        { label: "Deployment Time", val: "Under 2 Days" },
        { label: "Hardware Savings", val: "Millions in Capex" },
      ],
    },
    {
      id: "private" as const,
      label: "Private Company",
      icon: Building,
      title: "Agencies, Startups & Private SMEs",
      badge: "Fast & Agile",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
      accentColor: "from-purple-600 to-pink-600",
      description:
        "Streamlined operational hub for tech startups, law firms, creative agencies, and multi-branch private offices.",
      features: [
        "Self-serve onboarding: Create company workspace with just a phone number",
        "Integrated Support Desk with automatic SLA routing and assignment",
        "Unified notices with read receipts to replace internal email clutter",
        "Hybrid workplace availability: Office, Remote, Client Meeting, or Off-site",
      ],
      stats: [
        { label: "Onboarding Time", val: "3 Minutes" },
        { label: "Team Productivity", val: "+28% Visible" },
        { label: "Active Plans", val: "Flexible Monthly" },
      ],
    },
  ];

  const currentSector = sectors.find((s) => s.id === activeTab)!;
  const CurrentIcon = currentSector.icon;

  return (
    <section className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-slate-800">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800">
            Universal Institutional Architecture
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Engineered for Every Type of Organization
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-300">
            GPI Connect doesn&apos;t force a rigid corporate template onto a university, nor an academic structure onto a field sales team. Our configurable multi-tier engine adapts seamlessly.
          </p>

          {/* 4-Sector Navigation Buttons */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-1.5 rounded-2xl bg-slate-800/80 border border-slate-700/80">
            {sectors.map((sector) => {
              const Icon = sector.icon;
              const isActive = activeTab === sector.id;
              return (
                <button
                  key={sector.id}
                  onClick={() => setActiveTab(sector.id)}
                  className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                      : "text-slate-400 hover:text-white hover:bg-slate-750"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{sector.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Sector Card */}
        <div className="mt-12 rounded-3xl bg-slate-800/80 border border-slate-700/90 p-6 sm:p-10 lg:p-12 shadow-2xl backdrop-blur-sm animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-700 text-white shadow-sm">
                  <CurrentIcon className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${currentSector.badgeColor}`}>
                    {currentSector.badge}
                  </span>
                  <h3 className="mt-1 text-2xl sm:text-3xl font-bold text-white font-sans">
                    {currentSector.title}
                  </h3>
                </div>
              </div>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {currentSector.description}
              </p>

              <div className="space-y-3 pt-2">
                {currentSector.features.map((feat, fIdx) => (
                  <div key={fIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Metrics & Case Card */}
            <div className="lg:col-span-5 bg-slate-900/90 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-5">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider block">
                Impact Telemetry // {currentSector.label}
              </span>

              <div className="space-y-3">
                {currentSector.stats.map((st, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3.5 rounded-xl bg-slate-800/80 border border-slate-700/70 flex items-center justify-between"
                  >
                    <span className="text-xs text-slate-400 font-medium">{st.label}</span>
                    <span className="text-sm font-extrabold text-white font-sans">{st.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-400" /> Instant Cloud Provisioning
                </span>
                <span className="text-cyan-400 font-bold">14-Day Pilot</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
