"use client";

import { useState } from "react";
import { RunConsole } from "./panels/RunConsole";
import { ArtifactsPanel } from "./panels/ArtifactsPanel";

type Tab = "run" | "artifacts";

export function BottomPanel() {
  const [tab, setTab] = useState<Tab>("run");

  return (
    <section data-testid="bottom-panel" className="h-full border-t border-[#1d2a3a] bg-[#0a111a]" aria-label="Bottom Panel">
      <div className="flex items-center gap-1 border-b border-[#1d2a3a] px-2 h-9">
        <button
          type="button"
          className={`px-2 py-1 rounded-md text-sm ${tab === "run" ? "bg-[#102033]" : "hover:bg-[#0f1a28]"}`}
          onClick={() => setTab("run")}
        >
          Run Console
        </button>
        <button
          type="button"
          className={`px-2 py-1 rounded-md text-sm ${tab === "artifacts" ? "bg-[#102033]" : "hover:bg-[#0f1a28]"}`}
          onClick={() => setTab("artifacts")}
        >
          Artifacts
        </button>
      </div>
      <div className="h-[calc(100%-36px)] overflow-hidden">
        {tab === "run" ? <RunConsole /> : <ArtifactsPanel />}
      </div>
    </section>
  );
}
