"use client";

import React from "react";
import Link from "next/link";
import { Activity, ShieldCheck, Mail, Lock, Globe, Smartphone, Download } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-400 border-t border-slate-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand & Description */}
          <div className="col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30 group-hover:shadow-xl group-hover:shadow-blue-500/40 transition-all duration-200">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="5" r="2.5" fill="currentColor" />
                  <circle cx="5" cy="18" r="2.5" fill="currentColor" />
                  <circle cx="19" cy="18" r="2.5" fill="currentColor" />
                  <line x1="12" y1="7.5" x2="6.5" y2="15.5" />
                  <line x1="12" y1="7.5" x2="17.5" y2="15.5" />
                  <line x1="7.5" y1="18" x2="16.5" y2="18" />
                </svg>
              </div>
              <div>
                <span className="block text-xl font-black tracking-tight text-white font-sans">
                  GPI <span className="text-blue-500">Connect</span>
                </span>
              </div>
            </Link>

            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Enterprise attendance infrastructure. Verifiable presence, live availability, and structured collaboration—without hardware costs.
            </p>

            {/* Contact */}
            <div className="pt-2 flex items-center gap-3">
              <a href="mailto:support@gpiconnect.com" className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 text-slate-300 hover:bg-emerald-600/30 hover:text-emerald-300 transition-all duration-200 text-xs font-semibold">
                <Mail className="w-4 h-4" />
                <span>support@gpiconnect.com</span>
              </a>
            </div>
          </div>

          {/* Column 1: Core Features */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Platform
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/activity" className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-2 transition-colors group">
                  <Activity className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  Live Activity Board
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  → Track 1: Check-in
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  → Track 2: Sessions
                </Link>
              </li>
              <li>
                <Link href="#security" className="text-slate-400 hover:text-white transition-colors">
                  Anti-Proxy Defense
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="text-slate-400 hover:text-white transition-colors">
                  Pricing Plans
                </Link>
              </li>
              <li className="pt-2 border-t border-slate-800/80">
                <Link href="#mobile-app" className="text-teal-400 hover:text-teal-300 font-semibold flex items-center gap-1.5 transition-colors">
                  <Smartphone className="w-3.5 h-3.5" />
                  Mobile App (APK)
                </Link>
              </li>
              <li>
                <Link href="#download-card" className="text-slate-400 hover:text-white text-xs transition-colors">
                  Demo Credentials
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Solutions */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Industries
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="#verticals" className="text-slate-400 hover:text-white transition-colors">
                  Higher Education
                </Link>
              </li>
              <li>
                <Link href="#verticals" className="text-slate-400 hover:text-white transition-colors">
                  Corporate & Field
                </Link>
              </li>
              <li>
                <Link href="#verticals" className="text-slate-400 hover:text-white transition-colors">
                  Government
                </Link>
              </li>
              <li>
                <Link href="#verticals" className="text-slate-400 hover:text-white transition-colors">
                  Private Companies
                </Link>
              </li>
              <li>
                <Link href="#solutions" className="text-slate-400 hover:text-white transition-colors">
                  Research Showcase
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Compliance */}
          <div className="space-y-4">
            <h5 className="font-bold text-white text-xs uppercase tracking-wider font-sans">
              Trust & Security
            </h5>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Anti-Relay Defense</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Lock className="w-4 h-4 text-blue-500" />
                <span>AES-256 Encryption</span>
              </li>
              <li className="flex items-center gap-2 text-slate-400">
                <Globe className="w-4 h-4 text-cyan-500" />
                <span>WCAG 2.1 AA</span>
              </li>
              <li className="text-slate-500">
                বাংলা & English
              </li>
              <li className="text-slate-500">
                Multi-timezone Support
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance & Certifications Section */}
        <div className="mt-12 pt-10 border-t border-slate-800/50">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <ShieldCheck className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Enterprise Security</div>
                <div className="text-xs text-slate-400 mt-0.5">Data encryption in transit & at rest</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <Lock className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Privacy First</div>
                <div className="text-xs text-slate-400 mt-0.5">No background tracking · User consent</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
              <Globe className="w-5 h-5 text-cyan-500 shrink-0 mt-0.5" />
              <div>
                <div className="text-sm font-bold text-white">Globally Ready</div>
                <div className="text-xs text-slate-400 mt-0.5">Multi-language · Multi-timezone · Multi-currency</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom - Legal & Links */}
        <div className="mt-10 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500">
          <div className="text-center sm:text-left">
            &copy; {currentYear} <strong className="text-white">GPI Connect</strong>. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/terms" className="hover:text-slate-300 transition-colors">
              Terms
            </Link>
            <span className="text-slate-700">·</span>
            <Link href="/privacy" className="hover:text-slate-300 transition-colors">
              Privacy
            </Link>
            <span className="text-slate-700">·</span>
            <a href="mailto:support@gpiconnect.com" className="hover:text-slate-300 transition-colors">
              Contact
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
