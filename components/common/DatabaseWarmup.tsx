"use client";

import { useEffect } from "react";

/**
 * DatabaseWarmup Component
 * Triggers a silent, non-blocking background wakeup call to the database
 * whenever a visitor lands on any page of the website.
 * Throttled using sessionStorage so it only pings once per 3 minutes per browser session.
 */
export default function DatabaseWarmup() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === "undefined") return;

    const THROTTLE_MS = 3 * 60 * 1000; // 3 minutes
    const lastWarmup = sessionStorage.getItem("gpi_db_warmup_ts");
    const now = Date.now();

    if (lastWarmup && now - Number(lastWarmup) < THROTTLE_MS) {
      return; // Already triggered recently in this session
    }

    // Use requestIdleCallback if available, or a small timeout to not block main thread
    const triggerWarmup = () => {
      fetch("/api/db-warmup", {
        method: "GET",
        headers: { "Cache-Control": "no-cache" },
      })
        .then((res) => res.json())
        .then(() => {
          sessionStorage.setItem("gpi_db_warmup_ts", Date.now().toString());
        })
        .catch((err) => {
          // Silent failure - do not interrupt user
          console.debug("Warmup ping skipped:", err);
        });
    };

    if ("requestIdleCallback" in window) {
      (window as any).requestIdleCallback(triggerWarmup, { timeout: 2000 });
    } else {
      setTimeout(triggerWarmup, 500);
    }
  }, []);

  return null;
}
