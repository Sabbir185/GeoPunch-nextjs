"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Download,
  Smartphone,
  Copy,
  Check,
  QrCode,
  ShieldCheck,
  WifiOff,
  Sparkles,
  ExternalLink,
  Info,
  KeyRound,
  User,
  Shield,
} from "lucide-react";

export const APK_DOWNLOAD_URL =
  "https://drive.google.com/drive/folders/15Gm0P7r6Bh7juwhLDszv9zmIaqo4EbHr";

export const DEMO_CREDENTIALS = {
  app: {
    role: "Mobile App Access",
    email: "sabbir.ku.cse@gmail.com",
    password: "123456",
  },
  admin: {
    role: "Admin Web Panel Access",
    email: "admin@gmail.com",
    password: "123456",
  },
};

interface AppDownloadCardProps {
  compact?: boolean;
}

export default function AppDownloadCard({ compact = false }: AppDownloadCardProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey((prev) => (prev === key ? null : prev));
    }, 2000);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white border border-indigo-900/60 shadow-2xl p-6 sm:p-8 lg:p-10">
      {/* Ambient background glow */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-teal-500/15 blur-3xl pointer-events-none" />

      <div className="relative z-10">
        {/* Top Header Badge */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-blue-500/20 to-teal-500/20 border border-blue-400/30 text-cyan-300 text-xs font-bold uppercase tracking-wider">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Android APK Build Available</span>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Safe
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <WifiOff className="w-3.5 h-3.5 text-cyan-400" />
              Offline Capable
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="max-w-2xl">
          <h3 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight font-sans">
            Get the GPI Connect Mobile App
          </h3>
          <p className="mt-3 text-sm sm:text-base text-slate-300 leading-relaxed">
            Install the native Android companion app for 1-tap presence verification, 
            automated geofencing check-ins, and zero-hardware attendance management.
          </p>
        </div>

        {/* Main Action Area: Download Buttons + QR Code + Credentials */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Download button + Quick Steps */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <a
                href={APK_DOWNLOAD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-600 hover:from-blue-500 hover:via-indigo-500 hover:to-teal-500 text-white font-bold text-base shadow-xl shadow-blue-600/30 hover:shadow-2xl hover:shadow-teal-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Download Android APK (Direct)</span>
                <ExternalLink className="w-4 h-4 text-cyan-200 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                <span>Compatibility: Android 8.0+</span>
                <span>Format: Direct APK Install</span>
              </div>
            </div>

            {/* Quick 2-Step Installation Guide */}
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold text-cyan-300 uppercase tracking-wide">
                <Info className="w-4 h-4" />
                <span>Simple Installation (2 Steps)</span>
              </div>
              <ol className="text-xs text-slate-300 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>
                  Tap the download button above or scan the QR code to open Google Drive and save the <code className="text-cyan-200 bg-white/10 px-1.5 py-0.5 rounded">.apk</code> file.
                </li>
                <li>
                  Open the downloaded file and tap <strong>Install</strong> (allow <em>&ldquo;Install Unknown Apps&rdquo;</em> in your browser if prompted).
                </li>
              </ol>
            </div>
          </div>

          {/* Right Column: QR Code + Demo Credentials */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-5">
            {/* QR Code Card */}
            <div className="shrink-0 p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center text-center">
              <div className="relative w-36 h-36 bg-white p-2 rounded-xl shadow-md">
                <Image
                  src="/images/apk-qr.png"
                  alt="Scan QR code to download GPI Connect APK"
                  width={144}
                  height={144}
                  className="object-contain rounded-lg"
                />
              </div>
              <span className="mt-2.5 text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
                <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                Scan to download on phone
              </span>
            </div>

            {/* Instant Demo Credentials Box */}
            <div className="grow p-4.5 rounded-2xl bg-white/5 border border-white/10 flex flex-col justify-between space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wide">
                  <KeyRound className="w-4 h-4" />
                  <span>Demo Credentials</span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">1-Click Copy</span>
              </div>

              {/* Mobile App Credentials */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-cyan-300">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> App Account
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${DEMO_CREDENTIALS.app.email}\n${DEMO_CREDENTIALS.app.password}`,
                        "app_all"
                      )
                    }
                    className="text-[10px] text-slate-400 hover:text-white inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    {copiedKey === "app_all" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span className="truncate max-w-[170px]">{DEMO_CREDENTIALS.app.email}</span>
                  <button
                    onClick={() => handleCopy(DEMO_CREDENTIALS.app.email, "app_email")}
                    className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedKey === "app_email" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center justify-between pt-0.5 border-t border-slate-800">
                  <span>pass: {DEMO_CREDENTIALS.app.password}</span>
                  <button
                    onClick={() => handleCopy(DEMO_CREDENTIALS.app.password, "app_pass")}
                    className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                    title="Copy Password"
                  >
                    {copiedKey === "app_pass" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>

              {/* Admin Panel Credentials */}
              <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-bold text-teal-300">
                  <span className="flex items-center gap-1">
                    <Shield className="w-3 h-3" /> Admin Web Panel
                  </span>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${DEMO_CREDENTIALS.admin.email}\n${DEMO_CREDENTIALS.admin.password}`,
                        "admin_all"
                      )
                    }
                    className="text-[10px] text-slate-400 hover:text-white inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/10 hover:bg-white/20 transition-all cursor-pointer"
                  >
                    {copiedKey === "admin_all" ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy All</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center justify-between">
                  <span className="truncate max-w-[170px]">{DEMO_CREDENTIALS.admin.email}</span>
                  <button
                    onClick={() => handleCopy(DEMO_CREDENTIALS.admin.email, "admin_email")}
                    className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                    title="Copy Email"
                  >
                    {copiedKey === "admin_email" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
                <div className="text-xs text-slate-300 font-mono flex items-center justify-between pt-0.5 border-t border-slate-800">
                  <span>pass: {DEMO_CREDENTIALS.admin.password}</span>
                  <button
                    onClick={() => handleCopy(DEMO_CREDENTIALS.admin.password, "admin_pass")}
                    className="text-slate-400 hover:text-white p-1 hover:bg-white/10 rounded transition-colors cursor-pointer"
                    title="Copy Password"
                  >
                    {copiedKey === "admin_pass" ? (
                      <Check className="w-3 h-3 text-emerald-400" />
                    ) : (
                      <Copy className="w-3 h-3" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
