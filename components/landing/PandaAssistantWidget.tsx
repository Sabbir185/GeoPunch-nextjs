"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { X, Mail, Activity, Tag, MessageCircleQuestion } from "lucide-react";
import { faqs } from "./faqData";

function PandaIcon({ size = 40, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      aria-hidden="true"
    >
      <circle cx="14" cy="14" r="9" fill="#0f172a" />
      <circle cx="50" cy="14" r="9" fill="#0f172a" />
      <circle cx="32" cy="34" r="22" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
      <ellipse cx="21" cy="32" rx="8" ry="10" fill="#0f172a" transform="rotate(-15 21 32)" />
      <ellipse cx="43" cy="32" rx="8" ry="10" fill="#0f172a" transform="rotate(15 43 32)" />
      <circle cx="22" cy="33" r="2.6" fill="#ffffff" />
      <circle cx="22.6" cy="33.6" r="1.1" fill="#0f172a" />
      <circle cx="42" cy="33" r="2.6" fill="#ffffff" />
      <circle cx="41.4" cy="33.6" r="1.1" fill="#0f172a" />
      <ellipse cx="32" cy="40" rx="3" ry="2.2" fill="#0f172a" />
      <path d="M27 45 Q32 49 37 45" stroke="#0f172a" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="16" cy="41" r="3" fill="#fca5a5" opacity="0.55" />
      <circle cx="48" cy="41" r="3" fill="#fca5a5" opacity="0.55" />
    </svg>
  );
}

interface Message {
  id: string;
  role: "assistant" | "user";
  text: string;
}

const GREETING: Message = {
  id: "greeting",
  role: "assistant",
  text: "Hi, I'm the GPI Connect assistant 🐼 I can answer common questions instantly. Pick one below, or reach our team for anything else.",
};

export default function PandaAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTeaser, setShowTeaser] = useState(false);
  const [teaserDismissed, setTeaserDismissed] = useState(false);
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [askedIdx, setAskedIdx] = useState<number[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTeaser((prev) => !isOpen && !teaserDismissed ? true : prev);
    }, 2500);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isOpen]);

  const openPanel = () => {
    setIsOpen(true);
    setShowTeaser(false);
    setTeaserDismissed(true);
  };

  const closePanel = () => setIsOpen(false);

  const askFaq = (idx: number) => {
    const item = faqs[idx];
    if (!item) return;
    setMessages((prev) => [
      ...prev,
      { id: `q-${idx}-${Date.now()}`, role: "user", text: item.short },
    ]);
    setAskedIdx((prev) => [...prev, idx]);
    window.setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: `a-${idx}-${Date.now()}`, role: "assistant", text: item.a },
      ]);
    }, 350);
  };

  const remaining = faqs
    .map((f, idx) => ({ ...f, idx }))
    .filter((f) => !askedIdx.includes(f.idx));

  return (
    <>
      {/* Proactive teaser bubble */}
      {showTeaser && !isOpen && (
        <div className="fixed bottom-24 right-5 sm:bottom-28 sm:right-6 z-50 max-w-[220px] animate-in fade-in slide-in-from-bottom-2 duration-300">
          <div className="relative bg-white rounded-2xl rounded-br-sm shadow-xl border border-slate-200 px-4 py-3 text-sm text-slate-700">
            <button
              onClick={() => {
                setShowTeaser(false);
                setTeaserDismissed(true);
              }}
              aria-label="Dismiss"
              className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md hover:bg-slate-700"
            >
              <X className="w-3 h-3" />
            </button>
            Need help? Ask me anything about GPI Connect 👋
          </div>
        </div>
      )}

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:bottom-28 sm:right-6 z-50 w-[calc(100vw-2rem)] max-w-sm sm:max-w-[380px] max-h-[70vh] sm:max-h-[560px] flex flex-col rounded-3xl shadow-2xl border border-slate-200 bg-white overflow-hidden animate-in fade-in slide-in-from-bottom-4 zoom-in-95 duration-200">
          {/* Header */}
          <div className="shrink-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500 px-4 py-3.5 flex items-center gap-3 text-white">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0">
              <PandaIcon size={30} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-bold text-sm leading-tight">GPI Connect Assistant</div>
              <div className="flex items-center gap-1.5 text-[11px] text-blue-100">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Answers common questions instantly
              </div>
            </div>
            <button
              onClick={closePanel}
              aria-label="Close assistant"
              className="p-1.5 rounded-full hover:bg-white/15 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Transcript */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[85%] text-sm leading-relaxed px-3.5 py-2.5 rounded-2xl ${
                  m.role === "assistant"
                    ? "bg-white border border-slate-200 text-slate-700 rounded-bl-sm shadow-sm"
                    : "bg-blue-600 text-white rounded-br-sm ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}

            {remaining.length > 0 && (
              <div className="pt-1 flex flex-wrap gap-2">
                {remaining.map((f) => (
                  <button
                    key={f.idx}
                    onClick={() => askFaq(f.idx)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-colors"
                  >
                    <MessageCircleQuestion className="w-3.5 h-3.5 text-blue-500" />
                    {f.short}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Quick actions */}
          <div className="shrink-0 border-t border-slate-200 p-2.5 flex items-center gap-2 bg-white">
            <Link
              href="/activity"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Activity className="w-3.5 h-3.5" />
              Live Board
            </Link>
            <Link
              href="/#pricing"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
            >
              <Tag className="w-3.5 h-3.5" />
              Pricing
            </Link>
            <a
              href="mailto:support@gpiconnect.com"
              className="flex-1 inline-flex items-center justify-center gap-1.5 px-2 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              Email us
            </a>
          </div>
        </div>
      )}

      {/* Floating trigger button */}
      <button
        onClick={() => (isOpen ? closePanel() : openPanel())}
        aria-label={isOpen ? "Close assistant" : "Open GPI Connect assistant"}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 w-16 h-16 rounded-full bg-white shadow-2xl shadow-slate-400/30 border border-slate-200 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform duration-200 animate-float"
      >
        {!isOpen && !teaserDismissed && (
          <span className="absolute inset-0 rounded-full bg-blue-500/30 animate-ping-slow" />
        )}
        {isOpen ? (
          <X className="w-6 h-6 text-slate-700" />
        ) : (
          <PandaIcon size={44} />
        )}
      </button>
    </>
  );
}
