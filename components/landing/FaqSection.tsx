"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, Activity } from "lucide-react";

export default function FaqSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "Does Track 2 proximity session attendance really work without internet?",
      a: "Yes, 100%. The group admin's phone and member phones establish presence directly with each other using Bluetooth Low Energy (BLE). Neither the instructor nor the students require active cellular data or Wi-Fi during the session. All records are cryptographically stored locally and synced automatically when connectivity returns.",
    },
    {
      q: "What does the 'Activity' tab in the header show?",
      a: "The 'Activity' tab opens the live Availability Board. Whenever a teacher or team member checks in, they can publish a human-readable location tag (e.g., 'Seminar Hall B-401', 'Library', or 'Khulna Market until 5 PM'). This eliminates endless phone calls from students or colleagues asking 'Where is this person?'.",
    },
    {
      q: "Does GPI Connect continuously track background location?",
      a: "Strictly NO. Continuous background tracking is deliberately excluded on privacy and battery grounds. Location is read ONLY at the exact moment of an explicit check-in or status update. Exact GPS coordinates are never published publicly — only human-readable tags.",
    },
    {
      q: "How does GPI Connect stop students forwarding tokens to absent friends?",
      a: "Unlike simple apps that broadcast a token, GPI Connect mandates Two-Way Confirmation. A forwarded token is useless because the admin's device must detect the student's physical hardware in the room. In addition, entrance QR codes dynamically rotate every few seconds to defeat static photographs.",
    },
    {
      q: "Can I use GPI Connect for a small tuition batch or student club without an institution?",
      a: "Absolutely. An organization is completely optional. A tutor or team lead can create standalone personal groups with nothing more than a phone number and invite members via a 6-digit Join Code or WhatsApp link. If your team joins an institution later, your history carries over seamlessly.",
    },
    {
      q: "What if a student has an older smartphone that struggles with Bluetooth?",
      a: "Every session includes a Universal Rotating On-Screen Code fallback. The instructor's phone displays a code that rotates at short intervals; members can simply enter or scan it in under 5 seconds.",
    },
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-3.5 py-1.5 rounded-full border border-blue-200">
            Frequently Asked Questions
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-sans">
            Everything You Need to Know
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Clear, transparent answers about our offline architecture, anti-proxy mechanics, and live activity tracking.
          </p>
        </div>

        <div className="mt-12 space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 text-base sm:text-lg focus:outline-none hover:text-blue-600 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-blue-600" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-6 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-200/60 pt-4 animate-in fade-in duration-200">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
