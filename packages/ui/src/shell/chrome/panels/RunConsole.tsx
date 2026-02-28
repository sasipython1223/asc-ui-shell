"use client";

import { useAppStore } from "../../../state/appStore";
import { telemetry } from "@utils/telemetry/telemetry";
import { useEffect } from "react";

export function RunConsole() {
  const { jobId, jobStatus, jobProgressPct, logs } = useAppStore();

  useEffect(() => {
    if (!jobId) return;
    telemetry.metric("run_progress_pct", jobProgressPct, { runId: jobId });
  }, [jobId, jobProgressPct]);

  return (
    <div className="h-full grid grid-cols-12 gap-2 p-2">
      <div className="col-span-3 rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2">
        <div className="text-sm font-semibold">Run</div>
        <div className="mt-2 text-sm">
          <div><span className="text-[#9fb4cc]">ID:</span> {jobId ?? "-"}</div>
          <div><span className="text-[#9fb4cc]">Status:</span> {jobStatus}</div>
          <div><span className="text-[#9fb4cc]">Progress:</span> {jobProgressPct}%</div>
        </div>
      </div>

      <div className="col-span-9 rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2 overflow-auto">
        <div className="text-sm font-semibold mb-2">Logs</div>
        <div className="font-mono text-xs space-y-1">
          {logs.length === 0 ? (
            <div className="text-[#9fb4cc]">No logs yet.</div>
          ) : (
            logs.map((l) => (
              <div key={l.id}>
                <span className="text-[#9fb4cc]">{l.at}</span>{" "}
                <span className={l.level === "error" ? "text-red-400" : l.level === "warn" ? "text-amber-300" : ""}>
                  [{l.level}]
                </span>{" "}
                {l.msg}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
