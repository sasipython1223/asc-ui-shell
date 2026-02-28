import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"]
  },
  resolve: {
    alias: {
      "@web": path.resolve(__dirname, "./src"),
      "@ui": path.resolve(__dirname, "../../packages/ui/src"),
      "@utils": path.resolve(__dirname, "../../packages/utils/src")
    }
  }
});
