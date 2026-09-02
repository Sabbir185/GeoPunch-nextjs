"use client";

import React from "react";
import {
  ShieldAlert,
  ShieldCheck,
  Smartphone,
  Repeat,
  Radio,
  Camera,
  MapPinOff,
  Gauge,
  Clock,
  Code2,
  FileCheck,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export default function SecurityMatrix() {
  const attacks = [
    {
      code: "A1",
      name: "Buddy Punching (Friend's Phone)",
      icon: Smartphone,
      vector: "Attempting to mark attendance using someone else's mobile device.",
      defense: "Cryptographic device binding. Each account is tied to one physical device hardware signature with an enforced cooldown period.",
    },
    {
      code: "A2",
      name: "Signal / Token Replay",
      icon: Repeat,
      vector: "Recording a past broadcast signal or QR token and re-submitting it later.",
      defense: "Tokens rotate every 3 to 15 seconds. Past signals are instantly invalidated by one-time cryptographic nonces.",
    },
    {
      code: "A3",
      name: "Relay & Proxy Forwarding",
      icon: Radio,
      vector: "Student inside class forwards token to absent friend outside via WhatsApp.",
      defense: "Enforced Two-Way BLE Confirmation. Receiving the signal is not enough; the admin's device must detect the member's device in physical room proximity.",
      highlight: true,
    },
    {
      code: "A4",
      name: "Photographed Static QR",
      icon: Camera,
      vector: "Photographing a paper QR code at an entrance and scanning it from anywhere.",
      defense: "Dynamic screen rotation at kiosks or mutual location verification. Static, non-expiring QR codes are strictly prohibited.",
    },
    {
      code: "A5",
      name: "Mock GPS & Spoofing Tools",
      icon: MapPinOff,
      vector: "Using developer mock location apps, emulators, or fake GPS injectors.",
      defense: "Kernel & OS sensor heuristics. Implausible accuracy levels, mock location providers, and rooting tools are automatically detected.",
    },
    {
      code: "A6",
      name: "Corridor / Boundary Lurking",
      icon: Gauge,
      vector: "Standing outside the classroom or hallway while within marginal radio range.",
      defense: "BLE Received Signal Strength (RSSI) attenuation filtering. Outlier signals outside room bounds are flagged.",
    },
    {
      code: "A7",
      name: "Device Clock Manipulation",
      icon: Clock,
      vector: "Manually rolling back smartphone clock to submit late attendance on time.",
      defense: "Server time is authoritative. System measures client-to-server time drift and flags clock tampering immediately.",
    },
    {
      code: "A8",
      name: "Tampered Admin Records",
      icon: FileCheck,
      vector: "Modifying SQLite local attendance cache on the phone before sync reaches the cloud.",
      defense: "HMAC signatures on each offline entry. Server independently re-validates every record and detects signature mismatch.",
    },
  ];

  return (
    <section id="security" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background cyber grid effect */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40"></div>
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-cyan-400 bg-cyan-950/80 px-3.5 py-1.5 rounded-full border border-cyan-800">
            Attendance Integrity Scope (§9)
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            If Attendance Isn&apos;t Trustworthy, It Has Zero Value.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Most digital attendance platforms fall victim to simple screenshot sharing, fake GPS apps, or proxy relaying. GPI Connect is engineered from the ground up to counteract all known attack vectors.
          </p>
        </div>

        {/* Governing Principle Callout */}
        <div className="mt-10 max-w-4xl mx-auto p-6 rounded-2xl bg-gradient-to-r from-blue-900/50 via-slate-800/60 to-teal-900/50 border border-blue-500/30 text-center">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4" /> The GPI Connect Governing Principle
          </div>
          <h4 className="text-lg sm:text-xl font-bold text-white">
            &ldquo;Suspicious records are flagged for human review — never silently rejected.&rdquo;
          </h4>
          <p className="mt-2 text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Wrongly marking a genuinely present person as absent damages institutional trust far more than occasionally questioning an anomaly. The system transparently flags discrepancies; authorized administrators decide.
          </p>
        </div>

        {/* Attacks Matrix Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {attacks.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className={`p-5 rounded-2xl transition-all duration-300 flex flex-col justify-between ${
                  item.highlight
                    ? "bg-slate-800/90 border-2 border-teal-500/80 shadow-lg shadow-teal-500/10"
                    : "bg-slate-800/50 border border-slate-700/80 hover:border-slate-600 hover:bg-slate-800/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                      {item.code}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>

                  <h5 className="mt-3 font-bold text-white text-sm">
                    {item.name}
                  </h5>

                  <div className="mt-2 pt-2 border-t border-slate-700/60 space-y-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-rose-400 block tracking-wider">
                        Attack Vector
                      </span>
                      <p className="text-xs text-slate-300 mt-0.5 leading-snug">
                        {item.vector}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-400 block tracking-wider">
                        GPI Connect Defense
                      </span>
                      <p className="text-xs text-slate-200 mt-0.5 leading-snug font-medium">
                        {item.defense}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-2 flex items-center gap-1.5 text-[11px] text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                  <span>Demonstrably Protected</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
