"use client";

import { AppShell } from "@ui/shell/AppShell";
import { useEffect } from "react";
import { telemetry } from "@utils/telemetry/telemetry";

export default function HomePage() {
  useEffect(() => {
    const t0 = performance.now();
    const id = window.requestAnimationFrame(() => {
      telemetry.metric("view_load_ms", performance.now() - t0, { route: "/" });
    });
    return () => window.cancelAnimationFrame(id);
  }, []);

  return <AppShell />;
}
