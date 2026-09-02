"use client";

import React from "react";
import {
  BellRing,
  FolderLock,
  Headset,
  FileSpreadsheet,
  Layers,
  Globe2,
  CalendarDays,
  Smartphone,
  CheckCircle2,
} from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: BellRing,
      title: "Notices with Read Receipts",
      desc: "Broadcast announcements to entire campuses or specific batches. Track exactly who read each notice and who hasn't. Supports priority pinning and threaded comments.",
      badge: "M8 Content",
      badgeColor: "bg-blue-50 text-blue-700 border-blue-200",
    },
    {
      icon: Headset,
      title: "Automated SLA Support Desk",
      desc: "Intake tickets for IT, lab maintenance, or administration. Automatically distribute across categorized staff with round-robin or skill-weighting and countdown SLA timers.",
      badge: "M10 Ticketing",
      badgeColor: "bg-purple-50 text-purple-700 border-purple-200",
    },
    {
      icon: FolderLock,
      title: "Encrypted Resource Repository",
      desc: "Distribute course syllabi, lecture slides, or sales collateral with strict role permissions, folder hierarchies, versioning, and per-plan storage quotas.",
      badge: "M8 Resources",
      badgeColor: "bg-teal-50 text-teal-700 border-teal-200",
    },
    {
      icon: Globe2,
      title: "Public Showcase & Portfolios",
      desc: "Give your institution a public profile to showcase faculty research papers, patents, student thesis projects, or company achievements with SEO-friendly pages.",
      badge: "M9 Showcase",
      badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    },
    {
      icon: FileSpreadsheet,
      title: "Tamper-Evident Analytics & Export",
      desc: "Daily, weekly, and monthly attendance exports in formatted Excel and branded PDF certificates. Every single row notes the exact physical capture method used.",
      badge: "M7 Reporting",
      badgeColor: "bg-amber-50 text-amber-700 border-amber-200",
    },
    {
      icon: CalendarDays,
      title: "Calendar & Shift Rostering",
      desc: "Setup organization-wide holiday calendars, multi-shift patterns, grace intervals, and automated leave approvals that automatically mark attendance days.",
      badge: "M2 Structure",
      badgeColor: "bg-rose-50 text-rose-700 border-rose-200",
    },
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Unified Ecosystem
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Everything Your Organization Needs. Built In.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Beyond attendance, GPI Connect delivers the core operational fabric that keeps departments, faculty, and field teams functioning with zero friction.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white p-7 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-xl bg-slate-100 text-slate-800 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}>
                    {item.badge}
                  </span>
                </div>

                <h4 className="mt-5 text-lg font-bold text-slate-900 font-sans group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
