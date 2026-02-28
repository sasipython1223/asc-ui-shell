"use client";

import { FileText, PlayCircle, Package } from "lucide-react";
import { clsx } from "clsx";

const items = [
  { id: "explorer", label: "Explorer", icon: FileText },
  { id: "runs", label: "Runs", icon: PlayCircle },
  { id: "artifacts", label: "Artifacts", icon: Package }
] as const;

export function ActivityBar() {
  return (
    <div
      data-testid="activity-bar"
      className="w-12 border-r border-[#1d2a3a] bg-[#0a111a] flex flex-col items-center py-2 gap-2"
      aria-label="Activity Bar"
    >
      {items.map((it, idx) => {
        const Icon = it.icon;
        const active = idx === 0;
        return (
          <button
            key={it.id}
            className={clsx(
              "h-10 w-10 rounded-md flex items-center justify-center outline-none focus:ring-2 focus:ring-[#3b82f6]/70",
              active ? "bg-[#102033]" : "hover:bg-[#0f1a28]"
            )}
            aria-label={it.label}
            title={it.label}
            type="button"
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
