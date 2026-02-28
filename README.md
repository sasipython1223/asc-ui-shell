# ASC UI Shell (VS Code-like) — CodePack v0.1.0

This pack bootstraps a **web-first VS Code-like UI shell** (Monaco editor + docked panels + command palette + run console)
designed to visualize background processing (runs, logs, artifacts) and later wrap into desktop (Tauri/Electron).

## What you get (MVP)
- VS Code-like layout: Activity Bar, Sidebar, Editor, Bottom Panel, Status Bar
- Monaco editor embedded in the Editor area
- Command Palette (Ctrl/Cmd+K)
- “Runs” panel with live progress + logs (simulated job stream)
- “Artifacts” panel showing job outputs (simulated)
- RBAC stub (viewer/planner/approver/admin) to gate “Run”
- Telemetry stubs using the platform metric dictionary

## Run locally
Prereq: Node 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000

## Tests
```bash
pnpm test
```

## Notes / Next steps
- Replace the simulated job runner with real SSE/WebSocket events from `apps/api`.
- Plug in OpenAPI-generated client types and real endpoints.
- Add xterm.js terminal emulation if you want full terminal UX.

