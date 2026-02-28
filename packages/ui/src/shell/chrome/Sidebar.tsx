"use client";

import { useAppStore } from "../../state/appStore";
import { RolePicker } from "./parts/RolePicker";

export function Sidebar() {
  const { jobStatus, jobProgressPct, jobStep, startRun, cancelRun } = useAppStore();

  return (
    <aside
      data-testid="sidebar"
      className="h-full border-r border-[#1d2a3a] bg-[#0a111a] p-3 flex flex-col gap-3"
      aria-label="Sidebar"
    >
      <div className="text-xs uppercase tracking-wide text-[#9fb4cc]">Explorer</div>

      <div className="rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2">
        <div className="text-sm font-semibold">Quick Actions</div>
        <div className="mt-2 flex gap-2">
          <button
            type="button"
            onClick={startRun}
            className="px-2 py-1 rounded-md bg-[#1d4ed8] hover:bg-[#1e40af] text-white text-sm focus:ring-2 focus:ring-[#3b82f6]/70"
            aria-label="Run Schedule"
          >
            Run Schedule
          </button>
          <button
            type="button"
            onClick={cancelRun}
            className="px-2 py-1 rounded-md bg-[#334155] hover:bg-[#475569] text-white text-sm focus:ring-2 focus:ring-[#3b82f6]/70"
            aria-label="Cancel Run"
          >
            Cancel
          </button>
        </div>
      </div>

      <div className="rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2">
        <div className="text-sm font-semibold">Run Status</div>
        <div className="mt-2 text-sm">
          <div>
            <span className="text-[#9fb4cc]">Status:</span> {jobStatus}
          </div>
          <div>
            <span className="text-[#9fb4cc]">Step:</span> {jobStep}
          </div>
          <div className="mt-2 h-2 rounded bg-[#0f1a28] overflow-hidden" aria-label="Run progress">
            <div className="h-2 bg-[#22c55e]" style={{ width: `${jobProgressPct}%` }} />
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <RolePicker />
      </div>
    </aside>
  );
}
