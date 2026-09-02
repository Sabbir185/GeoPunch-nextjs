"use client";

import React, { useState } from "react";
import {
  Building2,
  Users2,
  MapPin,
  QrCode,
  Radio,
  Sliders,
  CheckCircle2,
  Clock,
  WifiOff,
  AlertCircle,
  Smartphone,
  Check,
} from "lucide-react";

export default function DualTrackSection() {
  const [activeView, setActiveView] = useState<"track1" | "track2">("track1");

  return (
    <section className="py-20 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            Purpose-Built Separation
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Two Distinct Attendance Tracks. One Cohesive System.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            A staff member&apos;s daily presence and a student&apos;s 45-minute lecture attendance are fundamentally different problems. GPI Connect separates them into two dedicated tracks.
          </p>

          {/* Track Switcher Tabs */}
          <div className="mt-8 inline-flex p-1.5 rounded-xl bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setActiveView("track1")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeView === "track1"
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Building2 className="w-4 h-4" />
              <span>Track 1: Organization Members</span>
            </button>
            <button
              onClick={() => setActiveView("track2")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
                activeView === "track2"
                  ? "bg-teal-600 text-white shadow-md shadow-teal-600/20"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Users2 className="w-4 h-4" />
              <span>Track 2: Group Sessions</span>
            </button>
          </div>
        </div>

        {/* Content Container */}
        <div className="mt-12 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
          {activeView === "track1" ? (
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    For Faculty, Employees, Area Managers &amp; Staff
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                    &ldquo;Is this person at work today, and from when until when?&rdquo;
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed">
                    Designed for institution-wide daily accountability. Staff check in upon arrival at campus or territory, immediately unlocking availability tagging without having to maintain separate timesheets.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                        <MapPin className="w-4 h-4" /> Geofence
                      </div>
                      <p className="text-xs text-slate-600">
                        Check-in inside campus boundary or depot. Auto checkout on perimeter departure.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                        <QrCode className="w-4 h-4" /> Dynamic QR
                      </div>
                      <p className="text-xs text-slate-600">
                        Fast scan at entrance kiosks. Code refreshes every few seconds to stop photograph fraud.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-blue-700 font-bold text-sm mb-1">
                        <Sliders className="w-4 h-4" /> Shift Policies
                      </div>
                      <p className="text-xs text-slate-600">
                        Configurable grace periods, late thresholds, half-day rules, and official leave sync.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-blue-900">
                      <Check className="w-4 h-4 text-blue-600" />
                      Two Outcomes from One Action
                    </div>
                    <p className="text-xs text-blue-800 leading-normal">
                      When Dr. Rahman scans in at the university gate, the system registers his arrival time AND marks him as <strong>Available</strong> on the public &amp; department board. Duplicate effort is eliminated completely.
                    </p>
                  </div>
                </div>

                {/* Right Interactive Mock */}
                <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-blue-950 p-6 rounded-2xl text-white shadow-lg space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-cyan-300">track1 // live-status-stream</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                      GEOFENCE ACTIVE
                    </span>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs">
                          TR
                        </div>
                        <div>
                          <div className="font-semibold text-white">Dr. Tariq Rahman</div>
                          <div className="text-slate-400 text-[11px]">Campus Gate 1 (08:45 AM)</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
                        Available · Room 302
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center font-bold text-white text-xs">
                          NH
                        </div>
                        <div>
                          <div className="font-semibold text-white">Nazmul Hasan</div>
                          <div className="text-slate-400 text-[11px]">Territory Geofence (09:12 AM)</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold text-[11px]">
                        Available · Field
                      </span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-amber-600 flex items-center justify-center font-bold text-white text-xs">
                          SA
                        </div>
                        <div>
                          <div className="font-semibold text-white">Samira Akter</div>
                          <div className="text-slate-400 text-[11px]">CSE Building QR (09:30 AM)</div>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-400 font-semibold text-[11px]">
                        Busy · Lab 401
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Working Hours: 08:30 - 17:00</span>
                    <span className="text-cyan-300">Grace: 15 mins</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-6 sm:p-10 lg:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-800 text-xs font-bold border border-teal-200">
                    <Users2 className="w-3.5 h-3.5 text-teal-600" />
                    For Classrooms, Meetings, Training &amp; Field Briefings
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
                    &ldquo;Who attended this specific session, class, or meeting?&rdquo;
                  </h3>

                  <p className="text-slate-600 text-base leading-relaxed">
                    Designed for fast group attendance where internet cannot be guaranteed. A single session handles 60 or more students within 90 seconds, displaying a live real-time roster to the group instructor.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                        <Radio className="w-4 h-4" /> Proximity BLE
                      </div>
                      <p className="text-xs text-slate-600">
                        Admin phone &amp; members detect each other in the room without pairing or passwords.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                        <WifiOff className="w-4 h-4" /> Zero Internet
                      </div>
                      <p className="text-xs text-slate-600">
                        Works when mobile signal is dead. Records store locally on device and sync later.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80">
                      <div className="flex items-center gap-2 text-teal-700 font-bold text-sm mb-1">
                        <Clock className="w-4 h-4" /> Rotating Code Fallback
                      </div>
                      <p className="text-xs text-slate-600">
                        Universal fallback for legacy handsets via short-lived rotating screen codes.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200/80 space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold text-amber-900">
                      <AlertCircle className="w-4 h-4 text-amber-700" />
                      Two-Way Confirmation Mandatory (§M5.3 Scope Requirement)
                    </div>
                    <p className="text-xs text-amber-800 leading-normal">
                      One-way broadcasts are vulnerable: students inside can forward broadcast tokens to absent friends outside. GPI Connect enforces <strong>mutual two-way device detection</strong>, guaranteeing only physical attendees are marked present.
                    </p>
                  </div>
                </div>

                {/* Right Interactive Mock */}
                <div className="lg:col-span-5 bg-gradient-to-tr from-slate-900 to-teal-950 p-6 rounded-2xl text-white shadow-lg space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <span className="text-xs font-mono text-teal-300">session // cse-3101-sec-a</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-teal-500/20 text-teal-300 font-bold">
                      ROSTER LIVE (58/60)
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-between">
                      <div>
                        <div className="font-semibold text-white">Course CSE-3101: Distributed Systems</div>
                        <div className="text-slate-400 text-[11px]">Instructor: Dr. Tariq Rahman</div>
                      </div>
                      <div className="text-right">
                        <span className="text-emerald-400 font-bold">96.6%</span>
                        <span className="block text-[10px] text-slate-400">Time: 00:54 / 01:30</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 pt-1">
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 text-[11px]">
                        <span className="flex items-center gap-2 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Roll 210201 - Tanmoy Roy
                        </span>
                        <span className="text-emerald-400 font-mono">Present (BLE verified)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 text-[11px]">
                        <span className="flex items-center gap-2 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                          Roll 210202 - Nafisa Anjum
                        </span>
                        <span className="text-emerald-400 font-mono">Present (BLE verified)</span>
                      </div>
                      <div className="flex items-center justify-between p-2 rounded-lg bg-slate-800/50 text-[11px]">
                        <span className="flex items-center gap-2 text-slate-200">
                          <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                          Roll 210203 - Sazzad Hossain
                        </span>
                        <span className="text-rose-400 font-mono">Unmarked / Absent</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400 border-t border-slate-800">
                    <span>Range: Room Boundary Only</span>
                    <span className="text-teal-300">Offline Queue: 0 pending</span>
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
