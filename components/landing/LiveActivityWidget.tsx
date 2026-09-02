"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  Radio,
  QrCode,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  Users,
  Search,
  RefreshCw,
  Smartphone,
  WifiOff,
  ChevronRight,
  ExternalLink,
} from "lucide-react";

interface StaffMember {
  id: string;
  name: string;
  role: string;
  dept: string;
  status: "available" | "busy" | "away" | "offline";
  locationTag: string;
  note: string;
  time: string;
  avatar: string;
}

const INITIAL_STAFF: StaffMember[] = [
  {
    id: "1",
    name: "Dr. Tariq Rahman",
    role: "Associate Professor",
    dept: "Computer Science",
    status: "available",
    locationTag: "Seminar Hall B-401",
    note: "Back in office at 2:30 PM",
    time: "Checked in 08:45 AM",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "2",
    name: "Nazmul Hasan",
    role: "Area Sales Manager",
    dept: "Field Operations",
    status: "available",
    locationTag: "Khulna Market Zone",
    note: "Territory dealer visits until 5 PM",
    time: "Checked in 09:12 AM",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "3",
    name: "Samira Akter",
    role: "Senior Lecturer",
    dept: "Computer Science",
    status: "busy",
    locationTag: "Robotics & IoT Lab",
    note: "Conducting CSE-3102 Lab Session",
    time: "Checked in 09:30 AM",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "4",
    name: "Tanvir Ahmed",
    role: "Depot Supervisor",
    dept: "Supply Chain",
    status: "available",
    locationTag: "Central Depot Kiosk",
    note: "Receiving morning batch shipment",
    time: "Checked in 08:00 AM",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80",
  },
  {
    id: "5",
    name: "Dr. Fahim Chowdhury",
    role: "Dean of Engineering",
    dept: "Administration",
    status: "away",
    locationTag: "Academic Council Hall",
    note: "Syndicate committee meeting",
    time: "Checked in 08:30 AM",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&auto=format&fit=crop&q=80",
  },
];

export default function LiveActivityWidget() {
  const [activeTab, setActiveTab] = useState<"board" | "proximity" | "geofence">("board");
  const [staff, setStaff] = useState<StaffMember[]>(INITIAL_STAFF);
  const [selectedDept, setSelectedDept] = useState("all");
  const [qrCodeIndex, setQrCodeIndex] = useState(1482);
  const [sessionProgress, setSessionProgress] = useState(58);

  // Rotate QR code token every 4 seconds to visually demonstrate dynamic security
  useEffect(() => {
    const interval = setInterval(() => {
      setQrCodeIndex((prev) => (prev > 9000 ? 1200 : prev + 17));
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Quick toggle interactive demo for user status
  const handleToggleDemoStatus = (id: string) => {
    setStaff((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const nextStatus =
            s.status === "available"
              ? "busy"
              : s.status === "busy"
              ? "away"
              : "available";
          const nextTag =
            nextStatus === "available"
              ? "Faculty Office 204"
              : nextStatus === "busy"
              ? "Classroom C-102"
              : "Campus Library";
          return {
            ...s,
            status: nextStatus,
            locationTag: nextTag,
            note: nextStatus === "available" ? "Open for consultation" : "Busy until 4 PM",
          };
        }
        return s;
      })
    );
  };

  const filteredStaff =
    selectedDept === "all"
      ? staff
      : staff.filter((s) => s.dept.toLowerCase().includes(selectedDept.toLowerCase()));

  return (
    <div className="w-full max-w-5xl mx-auto rounded-2xl bg-white border border-slate-200/90 shadow-2xl shadow-blue-900/10 overflow-hidden">
      {/* Header bar of interactive widget */}
      <div className="bg-slate-900 text-white px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-800">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
            <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block"></span>
          </div>
          <span className="text-xs font-mono text-slate-300 ml-2">
            gpi-connect // interactive-system-preview
          </span>
        </div>

        {/* Tab switcher */}
        <div className="flex items-center p-1 bg-slate-800/90 rounded-xl border border-slate-700/60 text-xs">
          <button
            onClick={() => setActiveTab("board")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "board"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>Live Activity Board</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </button>
          <button
            onClick={() => setActiveTab("proximity")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "proximity"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Radio className="w-3.5 h-3.5" />
            <span>90s Proximity BLE</span>
          </button>
          <button
            onClick={() => setActiveTab("geofence")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition-all ${
              activeTab === "geofence"
                ? "bg-blue-600 text-white shadow-sm"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <QrCode className="w-3.5 h-3.5" />
            <span>Dynamic QR &amp; Geofence</span>
          </button>
        </div>
      </div>

      {/* TAB 1: LIVE ACTIVITY BOARD */}
      {activeTab === "board" && (
        <div className="p-4 sm:p-6 bg-slate-50/50">
          {/* Controls row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h4 className="text-base font-bold text-slate-900 flex items-center gap-2">
                Live Availability Board
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Zero Phone Calls Needed
                </span>
              </h4>
              <p className="text-xs text-slate-500 mt-0.5">
                One check-in records official attendance AND publishes real-time location tags to students and peers.
              </p>
            </div>

            {/* Department filters */}
            <div className="flex items-center gap-1.5 overflow-x-auto text-xs pb-1 sm:pb-0">
              <button
                onClick={() => setSelectedDept("all")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedDept === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                All (5)
              </button>
              <button
                onClick={() => setSelectedDept("computer")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedDept === "computer"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                CSE Faculty
              </button>
              <button
                onClick={() => setSelectedDept("field")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedDept === "field"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Field Ops
              </button>
              <button
                onClick={() => setSelectedDept("supply")}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  selectedDept === "supply"
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100"
                }`}
              >
                Supply Chain
              </button>
            </div>
          </div>

          {/* Live Staff Cards Grid */}
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredStaff.map((member) => (
              <div
                key={member.id}
                className="bg-white p-3.5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group relative"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-11 h-11 rounded-full object-cover ring-2 ring-slate-100"
                      />
                      <span
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          member.status === "available"
                            ? "bg-emerald-500"
                            : member.status === "busy"
                            ? "bg-amber-500"
                            : member.status === "away"
                            ? "bg-blue-500"
                            : "bg-slate-400"
                        }`}
                      ></span>
                    </div>

                    <div>
                      <h5 className="font-semibold text-slate-900 text-sm leading-snug group-hover:text-blue-600 transition-colors">
                        {member.name}
                      </h5>
                      <p className="text-xs text-slate-500">
                        {member.role} · <span className="text-slate-600 font-medium">{member.dept}</span>
                      </p>
                    </div>
                  </div>

                  {/* Status chip */}
                  <span
                    className={`text-[11px] font-semibold px-2 py-0.5 rounded-full capitalize flex items-center gap-1 ${
                      member.status === "available"
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : member.status === "busy"
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : "bg-blue-50 text-blue-700 border border-blue-200"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        member.status === "available"
                          ? "bg-emerald-500"
                          : member.status === "busy"
                          ? "bg-amber-500"
                          : "bg-blue-500"
                      }`}
                    ></span>
                    {member.status}
                  </span>
                </div>

                {/* Location tag banner */}
                <div className="mt-2.5 p-2 rounded-lg bg-slate-50 flex items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-800 font-medium truncate">
                    <MapPin className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="truncate">{member.locationTag}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 whitespace-nowrap">
                    {member.time}
                  </span>
                </div>

                {/* Note and interactive toggle button */}
                <div className="mt-2 flex items-center justify-between text-xs pt-1">
                  <span className="text-slate-500 text-[11px] italic truncate max-w-[200px]">
                    &ldquo;{member.note}&rdquo;
                  </span>
                  <button
                    onClick={() => handleToggleDemoStatus(member.id)}
                    title="Click to simulate 2-tap status update"
                    className="text-[11px] text-blue-600 hover:text-blue-800 font-medium flex items-center gap-1 hover:underline ml-2 shrink-0"
                  >
                    <RefreshCw className="w-2.5 h-2.5" />
                    Tap Status
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom callout to dedicated Activity page */}
          <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-teal-600" />
              Privacy-Protected: Human-readable tags published only with user consent. Exact GPS coordinates are never exposed.
            </span>
            <Link
              href="/activity"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-800"
            >
              Open Full Live Activity Table <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      )}

      {/* TAB 2: TRACK 2 PROXIMITY BLE ATTENDANCE */}
      {activeTab === "proximity" && (
        <div className="p-6 bg-slate-900 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Radar animation */}
            <div className="relative flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800/80 border border-slate-700/80 overflow-hidden min-h-[300px]">
              {/* Radar waves */}
              <div className="absolute w-56 h-56 rounded-full border border-teal-500/20 animate-ping"></div>
              <div className="absolute w-40 h-40 rounded-full border border-teal-500/30"></div>
              <div className="absolute w-24 h-24 rounded-full border border-teal-400/40"></div>

              {/* Central Admin Phone */}
              <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-tr from-teal-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-teal-500/30 text-slate-950 font-bold">
                <Smartphone className="w-8 h-8 text-slate-900" />
              </div>
              <span className="mt-3 text-xs font-bold text-teal-300 tracking-wider uppercase">
                Admin Phone · Broadcasting BLE
              </span>
              <span className="text-[11px] text-slate-400 flex items-center gap-1 mt-1">
                <WifiOff className="w-3 h-3 text-amber-400" /> Zero Internet Required
              </span>

              {/* Floating verified members */}
              <div className="absolute top-4 left-6 px-2 py-1 rounded-md bg-emerald-500/20 text-emerald-300 text-[10px] border border-emerald-500/40 flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> CSE-3101 (Section A)
              </div>
              <div className="absolute bottom-4 right-6 px-2 py-1 rounded-md bg-blue-500/20 text-blue-300 text-[10px] border border-blue-500/40">
                Peer Mutual Proof ✓
              </div>
            </div>

            {/* Right: Real-time Stats & Guarantees */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
                <Radio className="w-3.5 h-3.5 animate-pulse text-teal-400" />
                Track 2 · Classroom &amp; Session Presence
              </div>

              <h4 className="text-xl font-bold text-white leading-tight">
                60 Students Verified in under 90 Seconds. Completely Offline.
              </h4>

              <p className="text-sm text-slate-300">
                The teacher taps &ldquo;Take Attendance&rdquo;. Every student&apos;s phone in the room mutually confirms presence through Bluetooth Low Energy. No passwords, no pairing, and no Wi-Fi router needed.
              </p>

              {/* Live Session Progress Metric */}
              <div className="p-4 rounded-xl bg-slate-800/90 border border-slate-700/80 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-300 font-medium">Session Progress (Ad-hoc)</span>
                  <span className="text-teal-400 font-bold">{sessionProgress} / 60 Members Marked</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-teal-400 to-emerald-400 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(sessionProgress / 60) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 pt-1">
                  <span>Elapsed: 44s</span>
                  <span className="text-emerald-400 font-medium">Anti-Relay Shield: 100% Protected</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px]">Cross-Platform</span>
                  <span className="text-white font-medium">iOS &amp; Android Interop</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60">
                  <span className="text-slate-400 block text-[10px]">Local Storage</span>
                  <span className="text-white font-medium">7-Day Zero-Loss Cache</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: DYNAMIC QR & GEOFENCE */}
      {activeTab === "geofence" && (
        <div className="p-6 bg-slate-900 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            {/* Left: Dynamic Rotating QR */}
            <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-800 border border-slate-700 text-center">
              <div className="p-3 bg-white rounded-2xl shadow-xl border-4 border-blue-500/40 relative">
                {/* Simulated QR Code */}
                <div className="w-40 h-40 bg-slate-900 rounded-lg p-2 flex flex-col items-center justify-center relative overflow-hidden">
                  <QrCode className="w-32 h-32 text-white" />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/20 to-transparent animate-pulse"></div>
                </div>
              </div>

              <div className="mt-3 flex items-center gap-1.5 text-xs text-cyan-300 font-mono">
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Token Rotating: #{qrCodeIndex} (Cycle: 4s)
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                Static photos taken from afar fail immediately. Must scan live screen at kiosk or campus gate.
              </p>
            </div>

            {/* Right: Geofence perimeter details */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold">
                <MapPin className="w-3.5 h-3.5 text-blue-400" />
                Track 1 · Geofence &amp; Kiosk Check-In
              </div>

              <h4 className="text-xl font-bold text-white leading-tight">
                Anti-Spoof Geofence Perimeter + Dual Signal Validation
              </h4>

              <p className="text-sm text-slate-300">
                Every organization member check-in is verified against polygon geofences (e.g. Khulna University campus, Square Pharma depot). Mock location injection and developer mock tools are instantly detected and flagged.
              </p>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Automatic check-out triggered when leaving the geofence perimeter.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Support for multi-shift schedules, grace intervals, and half-day policies.</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Tamper-evident audit trail showing exact verification method for every record.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
