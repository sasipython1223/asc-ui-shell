"use client";

import Editor from "@monaco-editor/react";
import { useAppStore } from "../../state/appStore";

export function EditorArea() {
  const { editorText, setEditorText } = useAppStore();

  return (
    <main data-testid="editor" className="h-full bg-[#0b0f14]" aria-label="Editor">
      <div className="h-full">
        <Editor
          height="100%"
          defaultLanguage="typescript"
          value={editorText}
          onChange={(v) => setEditorText(v ?? "")}
          theme="vs-dark"
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            smoothScrolling: true,
            scrollBeyondLastLine: false
          }}
        />
      </div>
    </main>
  );
}
