"use client";

import React, { useState } from "react";
import {
  X,
  Smartphone,
  Mail,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Loader2,
  KeyRound,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";

interface QuickAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export default function QuickAuthModal({
  isOpen,
  onClose,
  defaultMode = "signin",
}: QuickAuthModalProps) {
  const [authMethod, setAuthMethod] = useState<"phone" | "email">("phone");
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+880");
  const [email, setEmail] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (authMethod === "phone" && !phoneNumber.trim()) {
      toast.error("Please enter your phone number");
      return;
    }
    if (authMethod === "email" && (!email.trim() || !email.includes("@"))) {
      toast.error("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOtpSent(true);
      toast.success(
        authMethod === "phone"
          ? `6-digit passcode sent via SMS/WhatsApp to ${countryCode} ${phoneNumber}`
          : `Magic sign-in code sent to ${email}`
      );
    }, 900);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 6) {
      toast.error("Please enter all 6 digits of your verification code");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.success(
        mode === "signin"
          ? "Welcome back to GPI Connect!"
          : "Account created successfully! Redirecting..."
      );
      onClose();
      // Redirect to activity or dashboard
      window.location.href = "/activity";
    }, 1000);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden">
        {/* Top gradient bar */}
        <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-teal-500"></div>

        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="text-center">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold border border-blue-200 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Frictionless Access · No Passwords</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              {mode === "signin" ? "Quick Sign In" : "Create Your Account"}
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Access your campus, organization, or team workspace in 10 seconds.
            </p>
          </div>

          {!otpSent ? (
            <>
              {/* Method Switcher: Phone vs Email */}
              <div className="mt-6 grid grid-cols-2 p-1 bg-slate-100 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setAuthMethod("phone")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                    authMethod === "phone"
                      ? "bg-white text-blue-700 shadow-sm font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  <span>Phone Number</span>
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMethod("email")}
                  className={`flex items-center justify-center gap-2 py-2 rounded-lg transition-all ${
                    authMethod === "email"
                      ? "bg-white text-blue-700 shadow-sm font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span>Email Only</span>
                </button>
              </div>

              {/* Form Input */}
              <form onSubmit={handleSendOtp} className="mt-5 space-y-4">
                {authMethod === "phone" ? (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Mobile Number
                    </label>
                    <div className="flex gap-2">
                      <select
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        className="px-3 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="+880">🇧🇩 +880 (BD)</option>
                        <option value="+1">🇺🇸 +1 (US)</option>
                        <option value="+44">🇬🇧 +44 (UK)</option>
                        <option value="+91">🇮🇳 +91 (IN)</option>
                        <option value="+971">🇦🇪 +971 (UAE)</option>
                      </select>
                      <input
                        type="tel"
                        placeholder="1712-345678"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                    </div>
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      We will send a 6-digit OTP via SMS or WhatsApp.
                    </span>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Institutional or Work Email
                    </label>
                    <input
                      type="email"
                      placeholder="name@university.edu or name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <span className="text-[11px] text-slate-400 mt-1 block">
                      We will send a secure one-click sign-in code.
                    </span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Code...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue with One-Time Passcode</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* OTP Verification Screen */
            <form onSubmit={handleVerifyOtp} className="mt-6 space-y-4">
              <div className="text-center">
                <span className="text-xs text-slate-600">
                  Enter the 6-digit code sent to{" "}
                  <strong className="text-slate-900 font-semibold">
                    {authMethod === "phone" ? `${countryCode} ${phoneNumber}` : email}
                  </strong>
                </span>
              </div>

              {/* 6-box OTP digits */}
              <div className="flex justify-center gap-2 pt-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-input-${idx}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    className="w-11 h-12 text-center text-lg font-bold rounded-xl border border-slate-300 text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                ))}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-3 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md shadow-emerald-600/25 flex items-center justify-center gap-2 transition-all disabled:opacity-70"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Verifying...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify &amp; Enter Workspace</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
                <button
                  type="button"
                  onClick={() => setOtpSent(false)}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" /> Change Number
                </button>
                <button
                  type="button"
                  onClick={() => {
                    toast.success("New code sent!");
                  }}
                  className="text-blue-600 hover:underline font-medium"
                >
                  Resend Code
                </button>
              </div>
            </form>
          )}

          {/* Toggle between Sign In & Sign Up */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center text-xs text-slate-500">
            {mode === "signin" ? (
              <span>
                New to GPI Connect?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setOtpSent(false);
                  }}
                  className="text-blue-600 hover:underline font-bold"
                >
                  Create an account
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setMode("signin");
                    setOtpSent(false);
                  }}
                  className="text-blue-600 hover:underline font-bold"
                >
                  Sign in here
                </button>
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
