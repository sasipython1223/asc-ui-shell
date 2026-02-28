"use client";

import { Command } from "cmdk";
import { useEffect } from "react";
import { useAppStore } from "../../state/appStore";
import { can } from "@utils/rbac/rbac";

export function CommandPalette() {
  const { commandPaletteOpen, setCommandPaletteOpen, startRun, role } = useAppStore();

  useEffect(() => {
    const onOpen = () => setCommandPaletteOpen(true);
    window.addEventListener("asc:commandPaletteOpen", onOpen as EventListener);
    return () => window.removeEventListener("asc:commandPaletteOpen", onOpen as EventListener);
  }, [setCommandPaletteOpen]);

  return (
    <Command.Dialog
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      label="Command Palette"
      aria-label="Command Palette"
      className="fixed inset-0 z-50 flex items-start justify-center pt-24"
    >
      <div className="absolute inset-0 bg-black/50" onClick={() => setCommandPaletteOpen(false)} />
      <div className="relative w-[720px] max-w-[92vw] rounded-xl border border-[#1d2a3a] bg-[#0b0f14] shadow-xl overflow-hidden">
        <Command.Input
          autoFocus
          placeholder="Type a command..."
          className="w-full px-3 py-3 bg-transparent outline-none border-b border-[#1d2a3a]"
        />
        <Command.List className="max-h-[360px] overflow-auto p-2">
          <Command.Empty className="p-3 text-sm text-[#9fb4cc]">No results.</Command.Empty>
          <Command.Group heading="Runs" className="text-xs text-[#9fb4cc]">
            <Command.Item
              disabled={!can(role, "run")}
              onSelect={() => {
                startRun();
                setCommandPaletteOpen(false);
              }}
              className="px-3 py-2 rounded-md aria-disabled:opacity-50 hover:bg-[#0f1a28] cursor-pointer"
            >
              Run Schedule
            </Command.Item>
          </Command.Group>
          <Command.Group heading="UI" className="text-xs text-[#9fb4cc] mt-2">
            <Command.Item
              onSelect={() => setCommandPaletteOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[#0f1a28] cursor-pointer"
            >
              Close Palette
            </Command.Item>
          </Command.Group>
        </Command.List>
      </div>
    </Command.Dialog>
  );
}
