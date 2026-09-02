"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Briefcase,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Clock,
  BookOpen,
  TrendingUp,
} from "lucide-react";

export default function VerticalsSection() {
  const [activeVertical, setActiveVertical] = useState<"edu" | "corporate" | "individual">("edu");

  return (
    <section id="verticals" className="py-20 bg-white border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-700 bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-200">
            Multi-Tenant Adaptability
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            One Single Platform. Three Configurable Shapes.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            GPI Connect dynamically adapts its terminology and hierarchy to your domain. Whether you run a university campus, a nationwide pharmaceutical field force, or a tuition circle.
          </p>

          {/* Vertical Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-2xl bg-slate-100 border border-slate-200/80">
            <button
              onClick={() => setActiveVertical("edu")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeVertical === "edu"
                  ? "bg-white text-blue-700 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Higher Education</span>
            </button>
            <button
              onClick={() => setActiveVertical("corporate")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeVertical === "corporate"
                  ? "bg-white text-teal-700 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Corporate &amp; Field Force</span>
            </button>
            <button
              onClick={() => setActiveVertical("individual")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeVertical === "individual"
                  ? "bg-white text-purple-700 shadow-md"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <UserCheck className="w-4 h-4" />
              <span>Tuition &amp; Project Teams</span>
            </button>
          </div>
        </div>

        {/* Dynamic Vertical Panel */}
        <div className="mt-12 rounded-3xl bg-slate-50 border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">
          {activeVertical === "edu" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold">
                  <GraduationCap className="w-4 h-4" /> University &amp; College Implementation
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                  Khulna University Case Pattern
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Professors check in upon arriving on campus. Students no longer crowd departmental offices asking if faculty are available — they check the live Activity Board in seconds.
                </p>

                {/* Terminology mapping table */}
                <div className="rounded-xl bg-white border border-slate-200 overflow-hidden text-xs">
                  <div className="grid grid-cols-2 bg-slate-100/80 p-2.5 font-bold text-slate-700">
                    <span>Platform Concept</span>
                    <span>University Mapping</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Organization</span>
                      <span>Khulna University</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Departments</span>
                      <span>CSE, EEE, Pharmacy, Business</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Groups / Batches</span>
                      <span>Section-A, Batch-2021, Course CSE-3101</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Live Availability</span>
                      <span className="text-blue-700 font-semibold">
                        Dr. Rahman → Available · Library · &ldquo;Back at 2:30 PM&rdquo;
                      </span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Public Showcase</span>
                      <span>Research papers, theses, senior design projects</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">CSE Department Live Roster</h5>
                    <p className="text-xs text-slate-500">Academic Year 2026-2027</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Faculty on Campus</span>
                    <span className="text-emerald-700 font-bold">24 / 28 Present</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Class Sessions Completed</span>
                    <span className="text-blue-700 font-bold">18 Classes (100% Verified)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Student Proxy Incidents</span>
                    <span className="text-slate-500 font-bold">0 Flagged</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic">
                  &ldquo;GPI Connect saved 10-15 minutes of every lecture that used to be lost calling names on paper sheets.&rdquo;
                </p>
              </div>
            </div>
          )}

          {activeVertical === "corporate" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-bold">
                  <Briefcase className="w-4 h-4" /> Enterprise &amp; Field Force Operations
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                  Square Pharmaceuticals Case Pattern
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Medical representatives and field officers verify presence inside designated territorial zones. Depot teams scan kiosk QR codes upon entering warehouses.
                </p>

                {/* Terminology mapping table */}
                <div className="rounded-xl bg-white border border-slate-200 overflow-hidden text-xs">
                  <div className="grid grid-cols-2 bg-slate-100/80 p-2.5 font-bold text-slate-700">
                    <span>Platform Concept</span>
                    <span>Corporate Mapping</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Organization</span>
                      <span>Square Pharmaceuticals PLC.</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Departments</span>
                      <span>Sales, Marketing, Supply Chain &amp; Depot</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Groups / Teams</span>
                      <span>Zone-Khulna, Team-North, Depot-Shift-1</span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Live Availability</span>
                      <span className="text-teal-700 font-semibold">
                        Nazmul Hasan → Available · Khulna Market · &ldquo;Until 5 PM&rdquo;
                      </span>
                    </div>
                    <div className="grid grid-cols-2 p-2.5 text-slate-600">
                      <span className="font-medium text-slate-900">Reporting</span>
                      <span>Field coverage rate, territory compliance, automated Excel</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-teal-100 flex items-center justify-center text-teal-700">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">Territory Coverage Console</h5>
                    <p className="text-xs text-slate-500">Khulna &amp; Barisal Division</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Active Reps in Field</span>
                    <span className="text-teal-700 font-bold">142 Reps Active</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Geofence Compliance</span>
                    <span className="text-emerald-700 font-bold">99.4% Territory Verified</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">Daily Sync Latency</span>
                    <span className="text-slate-600 font-bold">&lt; 1.2 seconds</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic">
                  &ldquo;Headquarters knows exactly which territory has active coverage without making a single disturbance call.&rdquo;
                </p>
              </div>
            </div>
          )}

          {activeVertical === "individual" && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-100 text-purple-800 text-xs font-bold">
                  <UserCheck className="w-4 h-4" /> Personal &amp; Community Workspace
                </div>

                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                  Tuition Batches, Clubs &amp; Project Circles
                </h3>

                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  An organization is completely optional! Any tutor, mentor, or student leader can create a group with just a phone number, share a join link or QR code, and take attendance immediately.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>No complex IT setup or enterprise approval required.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Invite students or members with a simple 6-digit Join Code or WhatsApp link.</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0" />
                    <span>Seamlessly attach personal groups to an institution later without losing history.</span>
                  </div>
                </div>
              </div>

              {/* Visual Card */}
              <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-md space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">HSC Physics Tuition Batch</h5>
                    <p className="text-xs text-slate-500">Join Code: #782-901</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-800">
                    Standalone
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-600">Total Enrolled:</span>
                    <span className="font-bold text-slate-900">32 Students</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Attendance Session:</span>
                    <span className="font-bold text-emerald-600">Completed in 45s (BLE)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">Study Notes:</span>
                    <span className="font-bold text-blue-600">Shared PDF (32/32 Downloaded)</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
