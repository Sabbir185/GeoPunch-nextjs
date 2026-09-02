"use client";

import React, { useState } from "react";
import {
  Sparkles,
  Bot,
  Send,
  CheckCircle2,
  AlertTriangle,
  TrendingUp,
  BrainCircuit,
  MessageSquare,
  FileText,
  UserCheck,
  Search,
} from "lucide-react";

interface QueryExample {
  id: string;
  prompt: string;
  category: string;
  response: {
    title: string;
    summary: string;
    metrics?: { label: string; val: string }[];
    badge: string;
    badgeColor: string;
  };
}

const QUERIES: QueryExample[] = [
  {
    id: "q1",
    prompt: "Who is available in the Engineering department right now?",
    category: "Live Availability",
    response: {
      title: "Active Engineering Faculty (Live Query)",
      summary:
        "18 of 22 professors currently checked in. Dr. Tariq Rahman is at Seminar Hall B-401 until 2:30 PM. 3 faculty in Robotics Lab. Dr. Fahim is currently Away in Academic Council.",
      metrics: [
        { label: "On Campus", val: "18 / 22" },
        { label: "In Class", val: "7" },
        { label: "Office Available", val: "11" },
      ],
      badge: "Natural Language Presence",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
    },
  },
  {
    id: "q2",
    prompt: "Show field sales reps who have not checked into their territory today",
    category: "Territory Anomaly",
    response: {
      title: "Field Force Absence & Geofence Alert",
      summary:
        "142 of 145 medical reps are verified inside designated sales zones. 3 reps have not checked in: Rep #104 (Khulna South), Rep #209 (Jessore), Rep #311 (Barisal). All 3 were sent auto-reminders via WhatsApp.",
      metrics: [
        { label: "Zone Compliance", val: "97.9%" },
        { label: "Unchecked", val: "3 Reps" },
        { label: "Reminders Sent", val: "3" },
      ],
      badge: "Real-time Auditing",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-300",
    },
  },
  {
    id: "q3",
    prompt: "Predict students at risk of falling below the 75% attendance exam quota",
    category: "Predictive Analytics",
    response: {
      title: "Attendance Risk Prediction (CSE-3101)",
      summary:
        "Based on recent 4-week absence patterns, 4 students in Section A have a >85% probability of falling below the 75% eligibility cutoff before finals. Early counseling notice drafted.",
      metrics: [
        { label: "At-Risk Students", val: "4" },
        { label: "Confidence Score", val: "94%" },
        { label: "Auto Draft", val: "Ready" },
      ],
      badge: "Predictive AI",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-300",
    },
  },
  {
    id: "q4",
    prompt: "Draft an automated notice for tomorrow's scheduled maintenance & shift swap",
    category: "Operations Assistant",
    response: {
      title: "Notice Generated with Targeted Distribution",
      summary:
        "Notice created for Morning Shift (Depot Gate 2). Shift timing adjusted to 09:00 AM. Read receipts enabled. Ready to broadcast to 45 staff members with 1 click.",
      metrics: [
        { label: "Target Recipients", val: "45 Staff" },
        { label: "Delivery", val: "Push + SMS" },
        { label: "Status", val: "Awaiting Confirmation" },
      ],
      badge: "Auto Operations",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
    },
  },
];

export default function AiAssistantSection() {
  const [selectedQuery, setSelectedQuery] = useState<QueryExample>(QUERIES[0]);
  const [customInput, setCustomInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSelectQuery = (q: QueryExample) => {
    setIsTyping(true);
    setSelectedQuery(q);
    setTimeout(() => {
      setIsTyping(false);
    }, 400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customInput.trim()) return;
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setSelectedQuery({
        id: "custom",
        prompt: customInput,
        category: "Custom Analysis",
        response: {
          title: `AI Synthesis: "${customInput.slice(0, 35)}..."`,
          summary:
            "GPI Intelligence scanned all active departments, geofences, and attendance records. Query processed against institutional policies with zero data exposure.",
          metrics: [
            { label: "Response Time", val: "180ms" },
            { label: "Accuracy", val: "99.8%" },
            { label: "Audit Logged", val: "Yes" },
          ],
          badge: "GPI Copilot",
          badgeColor: "bg-blue-100 text-blue-800 border-blue-300",
        },
      });
      setCustomInput("");
    }, 600);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-tr from-purple-600/15 via-blue-600/15 to-teal-500/15 blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/80 border border-purple-800 text-purple-300 text-xs font-bold mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            <span>AI-Powered Intelligence</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-sans">
            Meet GPI Copilot: AI-Assisted Presence &amp; Operations
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            Ask questions in plain English or Bengali. Instantly uncover attendance trends, locate available personnel, detect proxy anomalies, and auto-triage support tickets.
          </p>
        </div>

        {/* Interactive AI Interface Mockup */}
        <div className="mt-14 max-w-5xl mx-auto rounded-3xl bg-slate-900/90 border border-slate-700/80 shadow-2xl overflow-hidden">
          {/* Top terminal bar */}
          <div className="p-4 bg-slate-800/80 border-b border-slate-700/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
              </div>
              <span className="text-xs font-mono text-purple-300 ml-2 flex items-center gap-1.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" />
                gpi-intelligence // copilot-v3
              </span>
            </div>
            <span className="text-[11px] font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800">
              ● Neural Index Active
            </span>
          </div>

          <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Quick Prompts to Click */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-2">
                Click a Sample Prompt:
              </span>
              {QUERIES.map((q) => {
                const isSelected = selectedQuery.id === q.id;
                return (
                  <button
                    key={q.id}
                    onClick={() => handleSelectQuery(q)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all text-xs flex flex-col gap-1 ${
                      isSelected
                        ? "bg-purple-900/40 border-purple-500 text-white shadow-md shadow-purple-500/10"
                        : "bg-slate-800/50 border-slate-700/70 text-slate-300 hover:bg-slate-800 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold text-purple-400">
                        {q.category}
                      </span>
                      {isSelected && (
                        <span className="text-[10px] text-emerald-400 font-bold">Active</span>
                      )}
                    </div>
                    <span className="font-semibold text-slate-100">{q.prompt}</span>
                  </button>
                );
              })}

              {/* Custom Input */}
              <form onSubmit={handleCustomSubmit} className="pt-2 relative">
                <input
                  type="text"
                  placeholder="Ask anything about your campus or team..."
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  className="w-full pr-10 pl-3.5 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-4 p-1.5 rounded-lg bg-purple-600 hover:bg-purple-700 text-white"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

            {/* Right: AI Output Console */}
            <div className="lg:col-span-7 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-inner space-y-4 min-h-[340px] flex flex-col justify-between">
              <div>
                {/* User Prompt */}
                <div className="flex items-start gap-3 pb-4 border-b border-slate-800/80">
                  <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    U
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Operator Prompt:</span>
                    <p className="text-sm font-semibold text-white">
                      &ldquo;{selectedQuery.prompt}&rdquo;
                    </p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="mt-4 flex items-start gap-3">
                  <div className="w-7 h-7 rounded-lg bg-purple-600 flex items-center justify-center text-white text-xs font-bold shrink-0">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] text-purple-400 font-mono font-bold">
                        GPI Intelligence Synthesizer
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${selectedQuery.response.badgeColor}`}>
                        {selectedQuery.response.badge}
                      </span>
                    </div>

                    <h5 className="mt-2 text-base font-bold text-white">
                      {selectedQuery.response.title}
                    </h5>

                    {isTyping ? (
                      <div className="mt-3 flex items-center gap-2 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>
                        <span>Analyzing presence telemetry across org nodes...</span>
                      </div>
                    ) : (
                      <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {selectedQuery.response.summary}
                      </p>
                    )}

                    {/* Metrics Grid */}
                    {selectedQuery.response.metrics && !isTyping && (
                      <div className="mt-4 grid grid-cols-3 gap-2">
                        {selectedQuery.response.metrics.map((m, mIdx) => (
                          <div
                            key={mIdx}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-center"
                          >
                            <span className="text-[10px] text-slate-400 block">{m.label}</span>
                            <span className="text-sm font-extrabold text-white mt-0.5 block">
                              {m.val}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Bottom security assurance */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  Zero Data Shared with Public LLMs · Isolated Tenant Memory
                </span>
                <span className="text-purple-400 font-mono font-bold">GPI AI Engine</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
