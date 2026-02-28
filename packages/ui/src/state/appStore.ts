import { uid } from "@utils/ids/ids";
import type { Role } from "@utils/rbac/rbac";
import { create } from "zustand";

export type JobStatus = "idle" | "running" | "success" | "error" | "canceled";

export type JobLog = {
  id: string;
  at: string;
  level: "info" | "warn" | "error";
  msg: string;
};
export type Artifact = {
  id: string;
  name: string;
  kind: "diff" | "report" | "export";
  content: string;
};

type AppState = {
  role: Role;
  setRole: (r: Role) => void;

  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (v: boolean) => void;

  editorText: string;
  setEditorText: (t: string) => void;

  jobId: string | null;
  jobStatus: JobStatus;
  jobProgressPct: number;
  jobStep: string;
  logs: JobLog[];
  artifacts: Artifact[];

  startRun: () => void;
  cancelRun: () => void;
  clearArtifacts: () => void;
};

function isoNow() {
  return new Date().toISOString();
}

export const useAppStore = create<AppState>((set, get) => ({
  role: "planner",
  setRole: (role) => set({ role }),

  commandPaletteOpen: false,
  setCommandPaletteOpen: (commandPaletteOpen) => set({ commandPaletteOpen }),

  editorText: "// Welcome. Use Ctrl/Cmd+K for commands. Click Run Schedule to simulate a background job.\\n",

  setEditorText: (editorText) => set({ editorText }),

  jobId: null,
  jobStatus: "idle",
  jobProgressPct: 0,
  jobStep: "Idle",
  logs: [],
  artifacts: [],

  startRun: () => {
    const id = uid("run");
    set({
      jobId: id,
      jobStatus: "running",
      jobProgressPct: 0,
      jobStep: "Queueing",
      logs: [
        {
          id: uid("log"),
          at: isoNow(),
          level: "info",
          msg: `Run ${id} queued`,
        },
      ],
      artifacts: [],
    });

    // Simulated background run stream
    const steps = [
      "Snapshot scenario",
      "Compute schedule",
      "Persist results",
      "Generate diff",
      "Finalize artifacts",
    ];
    let i = 0;
    const tick = () => {
      const s = get();
      if (s.jobStatus !== "running") return;

      const step = steps[Math.min(i, steps.length - 1)]!;
      const pct = Math.min(100, Math.round(((i + 1) / steps.length) * 100));
      set({
        jobProgressPct: pct,
        jobStep: step,
        logs: [
          ...get().logs,
          { id: uid("log"), at: isoNow(), level: "info", msg: `Step: ${step}` },
        ],
      });

      i += 1;

      if (i >= steps.length) {
        set({
          jobStatus: "success",
          jobStep: "Completed",
          logs: [
            ...get().logs,
            {
              id: uid("log"),
              at: isoNow(),
              level: "info",
              msg: "Run completed",
            },
          ],
          artifacts: [
            {
              id: uid("art"),
              name: "schedule.diff.json",
              kind: "diff",
              content: '{\n  "changed": 42\n}\n',
            },
            {
              id: uid("art"),
              name: "summary.report.md",
              kind: "report",
              content: "# Run Summary\n\n- OK\n",
            },
          ],
        });
        return;
      }

      window.setTimeout(tick, 450);
    };

    window.setTimeout(tick, 450);
  },

  cancelRun: () => {
    if (get().jobStatus !== "running") return;
    set({
      jobStatus: "canceled",
      jobStep: "Canceled",
      logs: [
        ...get().logs,
        {
          id: uid("log"),
          at: isoNow(),
          level: "warn",
          msg: "Run canceled by user",
        },
      ],
    });
  },

  clearArtifacts: () => set({ artifacts: [] }),
}));
