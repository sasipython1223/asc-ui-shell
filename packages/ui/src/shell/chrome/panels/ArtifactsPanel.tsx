"use client";

import { useAppStore } from "../../../state/appStore";
import { useState } from "react";

export function ArtifactsPanel() {
  const { artifacts } = useAppStore();
  const [selectedId, setSelectedId] = useState<string | null>(artifacts[0]?.id ?? null);

  const selected = artifacts.find((a) => a.id === selectedId) ?? null;

  return (
    <div className="h-full grid grid-cols-12 gap-2 p-2">
      <div className="col-span-3 rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2 overflow-auto">
        <div className="text-sm font-semibold mb-2">Artifacts</div>
        {artifacts.length === 0 ? (
          <div className="text-sm text-[#9fb4cc]">No artifacts yet. Run a job.</div>
        ) : (
          <ul className="space-y-1">
            {artifacts.map((a) => (
              <li key={a.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(a.id)}
                  className={`w-full text-left px-2 py-1 rounded-md text-sm ${a.id === selectedId ? "bg-[#102033]" : "hover:bg-[#0f1a28]"}`}
                >
                  {a.name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="col-span-9 rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2 overflow-auto">
        <div className="text-sm font-semibold mb-2">Preview</div>
        {!selected ? (
          <div className="text-sm text-[#9fb4cc]">Select an artifact.</div>
        ) : (
          <pre className="text-xs font-mono whitespace-pre-wrap">{selected.content}</pre>
        )}
      </div>
    </div>
  );
}
