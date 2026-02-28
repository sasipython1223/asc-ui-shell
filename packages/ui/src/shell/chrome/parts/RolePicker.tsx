"use client";

import { useAppStore } from "../../../state/appStore";
import type { Role } from "@utils/rbac/rbac";
import { can } from "@utils/rbac/rbac";

const roles: Role[] = ["viewer", "planner", "approver", "admin"];

export function RolePicker() {
  const { role, setRole } = useAppStore();
  const runOk = can(role, "run");

  return (
    <div className="rounded-lg border border-[#1d2a3a] bg-[#0b0f14] p-2">
      <div className="text-sm font-semibold">Role (RBAC stub)</div>
      <div className="mt-2 flex items-center gap-2">
        <label className="text-sm text-[#9fb4cc]" htmlFor="role">
          Role
        </label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value as Role)}
          className="bg-[#0a111a] border border-[#1d2a3a] rounded-md px-2 py-1 text-sm outline-none focus:ring-2 focus:ring-[#3b82f6]/70"
        >
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
        <span className={`text-xs ${runOk ? "text-[#22c55e]" : "text-amber-300"}`}>
          run: {runOk ? "allowed" : "blocked"}
        </span>
      </div>
    </div>
  );
}
