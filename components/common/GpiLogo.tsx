"use client";

import React from "react";
import Link from "next/link";

interface GpiLogoProps {
  variant?: "light" | "dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  showBadge?: boolean;
}

export default function GpiLogo({
  variant = "light",
  size = "md",
  href = "/",
  showBadge = true,
}: GpiLogoProps) {
  const iconSizes = {
    sm: "w-8 h-8",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  const titleSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const isDark = variant === "dark";

  const content = (
    <div className="flex items-center gap-3 group cursor-pointer select-none">
      {/* Premium Squircle Icon Mark */}
      <div
        className={`relative ${iconSizes[size]} rounded-xl bg-gradient-to-br from-blue-600 via-blue-600 to-indigo-700 shadow-md shadow-blue-600/25 flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-blue-600/35`}
      >
        {/* Subtle glass rim */}
        <div className="absolute inset-0 rounded-xl ring-1 ring-white/25"></div>

        {/* 3-Node Connected Network Mesh Glyph */}
        <svg
          className="w-[62%] h-[62%] text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Top Node */}
          <circle cx="12" cy="5.5" r="2.3" fill="currentColor" />
          {/* Bottom Left Node */}
          <circle cx="5.5" cy="18" r="2.3" fill="currentColor" />
          {/* Bottom Right Node */}
          <circle cx="18.5" cy="18" r="2.3" fill="currentColor" />
          {/* Connecting Lines */}
          <line x1="12" y1="8" x2="6.8" y2="15.8" stroke="currentColor" strokeWidth="2.2" />
          <line x1="12" y1="8" x2="17.2" y2="15.8" stroke="currentColor" strokeWidth="2.2" />
          <line x1="7.8" y1="18" x2="16.2" y2="18" stroke="currentColor" strokeWidth="2.2" />
        </svg>
      </div>

      {/* Brand Typography */}
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span
            className={`${titleSizes[size]} font-extrabold tracking-tight font-sans leading-none ${
              isDark ? "text-white" : "text-slate-900"
            }`}
          >
            GPI <span className="text-blue-600 font-extrabold">Connect</span>
          </span>

          {showBadge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Platform
            </span>
          )}
        </div>
        <span
          className={`text-[10px] font-medium tracking-wide mt-0.5 ${
            isDark ? "text-slate-400" : "text-slate-500"
          }`}
        >
          Presence &amp; Availability
        </span>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-block focus:outline-none">
        {content}
      </Link>
    );
  }

  return content;
}
