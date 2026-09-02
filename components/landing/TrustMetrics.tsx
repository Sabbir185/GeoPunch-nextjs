"use client";

import React from "react";
import {
  Clock,
  WifiOff,
  Wallet,
  ShieldCheck,
  Award,
  TrendingUp,
  CheckCircle2,
  Zap,
} from "lucide-react";

export default function TrustMetrics() {
  const metrics = [
    {
      icon: Clock,
      value: "<90s",
      label: "60-Member Session",
      description: "Proximity-based capture, start to finish",
      color: "from-blue-600 to-indigo-600",
      light: "from-blue-50 to-indigo-50",
    },
    {
      icon: WifiOff,
      value: "100%",
      label: "Offline-First",
      description: "7-day zero data-loss queuing",
      color: "from-teal-600 to-emerald-600",
      light: "from-teal-50 to-emerald-50",
    },
    {
      icon: Wallet,
      value: "$0",
      label: "Hardware Cost",
      description: "Smartphone-only, no cards or terminals",
      color: "from-purple-600 to-indigo-600",
      light: "from-purple-50 to-indigo-50",
    },
    {
      icon: ShieldCheck,
      value: "99.9%",
      label: "Anti-Proxy Accuracy",
      description: "Geofence + liveness verified presence",
      color: "from-emerald-600 to-teal-600",
      light: "from-emerald-50 to-teal-50",
    },
  ];

  const features = [
    "Anti-Proxy Defense Engine",
    "End-to-End Encryption",
    "WCAG 2.1 AA Accessible",
    "Multi-Language Support",
    "Zero Background Tracking",
    "Privacy-First Architecture",
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50/50 to-white border-y border-slate-200/60 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-teal-500/10 to-transparent rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200/60 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Award className="w-4 h-4" />
            Engineered for Enterprise
          </span>
          <h2 className="mt-5 text-4xl sm:text-5xl font-black text-slate-900 tracking-tight font-sans">
            Platform at a Glance
          </h2>
          <p className="mt-4 text-lg text-slate-600 leading-relaxed">
            Built to hold up under real classroom and field conditions &mdash; not just in a demo.
          </p>
        </div>

        {/* Main Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-white to-slate-50 border border-slate-200/80 shadow-sm hover:shadow-xl hover:border-blue-300/50 transition-all duration-300"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${metric.light} opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10`}></div>

                {/* Icon Badge */}
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${metric.color} text-white shadow-md shadow-slate-300/50 group-hover:scale-110 transition-transform duration-300 mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="text-4xl sm:text-5xl font-black text-slate-900 font-sans mb-1">
                    {metric.value}
                  </div>
                  <div className="text-base font-bold text-slate-900 mb-1">
                    {metric.label}
                  </div>
                  <div className="text-sm text-slate-600">
                    {metric.description}
                  </div>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <TrendingUp className="w-5 h-5 text-emerald-500" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Professional Features Grid */}
        <div className="bg-gradient-to-r from-blue-600/10 via-indigo-600/5 to-purple-600/10 border border-blue-200/40 rounded-3xl p-8 sm:p-10 lg:p-12">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
            Enterprise Features & Compliance
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 rounded-lg bg-white/70 border border-slate-200/80 hover:border-blue-300/60 hover:shadow-md transition-all duration-200 group"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-slate-900">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-4 pt-12 border-t border-slate-200/60 text-center">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Ready to Try It With Your Own Team?
            </h3>
            <p className="text-slate-600 mb-8">
              Explore the live activity board or set up your organization in minutes &mdash; no hardware to order, nothing to install on campus.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/activity"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-600/30 hover:shadow-xl transition-all duration-200 hover:-translate-y-0.5"
              >
                <span>View Live Board</span>
                <Zap className="w-4 h-4 text-cyan-300" />
              </a>
              <a
                href="#pricing"
                className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-900 font-bold shadow-sm hover:shadow-md hover:border-blue-400 transition-all duration-200"
              >
                <span>See Pricing Plans</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
