"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Sparkles, HelpCircle, ArrowRight } from "lucide-react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Community & Teams",
      badge: "Free Forever",
      priceMonthly: "$0",
      priceAnnual: "$0",
      period: "forever",
      desc: "For individual teachers, study circles, tuition batches, and student clubs.",
      features: [
        "Up to 3 standalone groups",
        "Up to 60 members per session",
        "Track 2 Offline Proximity BLE attendance",
        "Rotating code universal fallback",
        "Basic attendance CSV export",
        "Real-time chat & resource sharing",
      ],
      ctaText: "Get Started Free",
      ctaHref: "/login",
      popular: false,
      buttonStyle: "bg-slate-100 hover:bg-slate-200 text-slate-800",
    },
    {
      name: "Campus Pro",
      badge: "Most Popular for Universities",
      priceMonthly: "$1.80",
      priceAnnual: "$1.40",
      period: "per user / month",
      desc: "Complete presence & live availability infrastructure for colleges and universities.",
      features: [
        "Unlimited departments & batch hierarchies",
        "Track 1 Geofencing & Dynamic Rotating QR Kiosks",
        "Track 2 (60 students in 90 seconds, offline)",
        "Live Activity Board with department filters",
        "Digital notices with read receipts & priority pinning",
        "Public Research & Senior Thesis Showcase",
        "Automated class routine sync & absence alerts",
        "Branded PDF certificates & Excel compliance reports",
      ],
      ctaText: "Start 14-Day Campus Trial",
      ctaHref: "/login",
      popular: true,
      buttonStyle: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/30",
    },
    {
      name: "Enterprise & Field",
      badge: "For Field Sales & Depots",
      priceMonthly: "$3.50",
      priceAnnual: "$2.80",
      period: "per user / month",
      desc: "High-integrity territorial tracking and support desk for corporate & sales operations.",
      features: [
        "All Campus Pro capabilities included",
        "Multi-territory geofence mapping (e.g. Sales zones)",
        "SLA Support Ticketing with skill-based auto distribution",
        "Automated check-out on geofence departure",
        "Shift patterns, grace periods & overtime rules",
        "Full tamper-evident audit trail & anomaly logs",
        "Dedicated account manager & 99.9% SLA uptime",
        "Custom API & webhooks for payroll/ERP integration",
      ],
      ctaText: "Contact Enterprise Sales",
      ctaHref: "/activity",
      popular: false,
      buttonStyle: "bg-slate-900 hover:bg-slate-800 text-white",
    },
  ];

  return (
    <section id="pricing" className="py-20 bg-slate-50 border-b border-slate-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Transparent Pricing
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Predictable Plans. Zero Hidden Hardware Costs.
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600">
            Say goodbye to buying $500 fingerprint machines and replacing RFID badges every semester. Start free and scale seamlessly.
          </p>

          {/* Billing Switcher */}
          <div className="mt-8 inline-flex items-center gap-3 p-1.5 rounded-full bg-white border border-slate-200 shadow-sm">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                !isAnnual ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                isAnnual ? "bg-blue-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <span>Annual Billing</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] px-1.5 py-0.2 rounded-full font-extrabold">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`relative flex flex-col justify-between p-8 rounded-3xl bg-white transition-all duration-300 ${
                plan.popular
                  ? "border-2 border-blue-600 shadow-2xl shadow-blue-600/10 scale-105 z-10"
                  : "border border-slate-200 shadow-lg shadow-slate-200/50 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-slate-900 font-sans">
                    {plan.name}
                  </h3>
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                      plan.popular
                        ? "bg-blue-100 text-blue-800"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>

                <p className="mt-2 text-xs text-slate-500 leading-relaxed">
                  {plan.desc}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="text-4xl font-extrabold text-slate-900 font-sans">
                    {isAnnual ? plan.priceAnnual : plan.priceMonthly}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{plan.period}</span>
                </div>

                <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                    What&apos;s included
                  </span>
                  {plan.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2.5 text-xs text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  href={plan.ctaHref}
                  className={`w-full py-3 px-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${plan.buttonStyle}`}
                >
                  <span>{plan.ctaText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
