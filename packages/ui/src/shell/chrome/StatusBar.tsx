"use client";

import { useAppStore } from "../../state/appStore";

export function StatusBar() {
  const { jobStatus, jobProgressPct } = useAppStore();
  return (
    <div
      data-testid="status-bar"
      className="h-6 border-t border-[#1d2a3a] bg-[#0b0f14] flex items-center justify-between px-2 text-xs text-[#9fb4cc]"
      aria-label="Status Bar"
    >
      <div>ASC • UI Shell</div>
      <div>
        {jobStatus === "running" ? `Run: ${jobProgressPct}%` : `Run: ${jobStatus}`}
      </div>
    </div>
  );
}
