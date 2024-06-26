import { defineConfig, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    collectCoverageFrom: ["src/**/*.jsx", "src/**/*.js"],
    setupFiles: "src/spec/setupTests.js",
    testMatch: ["./src/spec/*.spec.jsx"],
    environment: "jsdom",
    coverage: {
      all: true,
      exclude: ["*.config.js", "*.cjs", "**/main.jsx", "**/node_modules/**"],
      provider: "v8",
      reporter: ["text", "json", "html"],
      reportsDirectory: "./coverage",
    },
  },
  plugins: [react()],
} as UserConfig);
