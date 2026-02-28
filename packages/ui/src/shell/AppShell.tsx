"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { ActivityBar } from "./chrome/ActivityBar";
import { Sidebar } from "./chrome/Sidebar";
import { EditorArea } from "./chrome/EditorArea";
import { BottomPanel } from "./chrome/BottomPanel";
import { StatusBar } from "./chrome/StatusBar";
import { CommandPalette } from "./chrome/CommandPalette";
import { useEffect } from "react";

export function AppShell() {
  // Global shortcut: Ctrl/Cmd+K
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isK = e.key.toLowerCase() === "k";
      const wantsPalette = isK && (e.ctrlKey || e.metaKey);
      if (!wantsPalette) return;
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("asc:commandPaletteOpen"));
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <div className="h-screen w-screen bg-[#0b0f14] text-[#e6edf3]">
      <div className="flex h-[calc(100%-24px)] w-full">
        <ActivityBar />
        <PanelGroup direction="horizontal" className="flex-1">
          <Panel defaultSize={22} minSize={16}>
            <Sidebar />
          </Panel>
          <PanelResizeHandle className="w-[1px] bg-[#1d2a3a]" />
          <Panel minSize={40}>
            <PanelGroup direction="vertical">
              <Panel defaultSize={72} minSize={40}>
                <EditorArea />
              </Panel>
              <PanelResizeHandle className="h-[1px] bg-[#1d2a3a]" />
              <Panel defaultSize={28} minSize={18}>
                <BottomPanel />
              </Panel>
            </PanelGroup>
          </Panel>
        </PanelGroup>
      </div>

      <StatusBar />
      <CommandPalette />
    </div>
  );
}
