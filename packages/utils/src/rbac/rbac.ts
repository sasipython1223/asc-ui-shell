export type Role = "viewer" | "planner" | "approver" | "admin";
export type Capability = "view" | "edit" | "approve" | "run" | "admin";

const matrix: Record<Role, Capability[]> = {
  viewer: ["view"],
  planner: ["view", "edit", "run"],
  approver: ["view", "edit", "approve", "run"],
  admin: ["view", "edit", "approve", "run", "admin"]
};

export function can(role: Role, cap: Capability): boolean {
  return matrix[role].includes(cap);
}
