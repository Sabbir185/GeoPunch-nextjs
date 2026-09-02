"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Activity,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  ArrowUpRight,
  LogIn,
  UserCheck,
} from "lucide-react";
import GpiLogo from "@/components/common/GpiLogo";
import QuickAuthModal from "./QuickAuthModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authDefaultMode, setAuthDefaultMode] = useState<"signin" | "signup">("signin");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 15) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openAuth = (mode: "signin" | "signup") => {
    setAuthDefaultMode(mode);
    setAuthModalOpen(true);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Banner - Premium Look */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-950 text-white text-xs font-medium py-2.5 px-4 text-center relative z-50 border-b border-indigo-900/50">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-[11px] font-bold border border-indigo-400/30 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-pulse" />
            <span className="uppercase tracking-widest">Enterprise Platform</span>
          </span>
          <span className="text-indigo-100 text-xs">
            Education · Corporate · Government · Private Sector
          </span>
          <Link
            href="/activity"
            className="inline-flex items-center gap-1.5 text-cyan-300 hover:text-cyan-200 font-bold transition-colors group"
          >
            <span>View Live Board</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Sticky Navigation - Premium Styling */}
      <header
        className={`sticky top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-slate-200/30 border-b border-slate-200/80 py-2.5"
            : "bg-white/70 backdrop-blur-lg border-b border-slate-200/40 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Premium Logo */}
            <GpiLogo size="md" href="/" showBadge={true} />

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-3">
              <Link
                href="/"
                className="text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-blue-50/50"
              >
                Home
              </Link>

              {/* Activities - Premium Live Badge */}
              <Link
                href="/activity"
                className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-md shadow-blue-600/25 hover:shadow-lg hover:shadow-blue-600/35 transition-all duration-200 group"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-300 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-400"></span>
                </span>
                <Activity className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Live Board</span>
              </Link>

              <Link
                href="#how-it-works"
                className="text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-blue-50/50"
              >
                How it works
              </Link>

              <Link
                href="#about"
                className="text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-blue-50/50"
              >
                About
              </Link>

              <Link
                href="#pricing"
                className="text-slate-700 hover:text-blue-600 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all hover:bg-blue-50/50"
              >
                Pricing
              </Link>
            </nav>

            {/* Desktop Sign In / Sign Up Button - Premium */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-slate-700 hover:text-blue-600 text-sm font-semibold hover:bg-blue-50/50 transition-all"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <button
                onClick={() => openAuth("signin")}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold shadow-lg shadow-blue-600/30 hover:shadow-xl hover:shadow-blue-600/40 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group"
              >
                <UserCheck className="w-4.5 h-4.5 group-hover:scale-110 transition-transform" />
                <span>Get Started</span>
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="flex md:hidden items-center gap-2">
              <Link
                href="/activity"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 text-xs font-bold border border-blue-300 shadow-sm hover:shadow-md transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Live</span>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-700 hover:bg-slate-100 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer - Enhanced */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white/98 backdrop-blur-lg px-4 pt-4 pb-6 space-y-2 shadow-2xl animate-in slide-in-from-top duration-200">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Home
            </Link>

            <Link
              href="/activity"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between p-3.5 rounded-xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-300 text-blue-800 font-bold shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <Activity className="w-5 h-5 text-blue-600" />
                <span>Live Activity Board</span>
              </div>
              <span className="text-[10px] font-bold uppercase bg-emerald-200 text-emerald-900 px-2 py-0.5 rounded-full">
                Live
              </span>
            </Link>

            <Link
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              How it works
            </Link>

            <Link
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              About us
            </Link>

            <Link
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100 transition-colors"
            >
              Pricing
            </Link>

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full py-3 rounded-xl text-sm font-bold border border-slate-300 text-slate-700 hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4" />
                <span>Login</span>
              </Link>
              <button
                onClick={() => openAuth("signin")}
                className="w-full py-3 rounded-xl text-sm font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/25 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>Get Started Free</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Quick Auth Modal (Email or Phone only) */}
      <QuickAuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        defaultMode={authDefaultMode}
      />
    </>
  );
}
