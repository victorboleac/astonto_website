import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    environment: "node",
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./config"),
      "@content": path.resolve(__dirname, "./content"),
      "@lib": path.resolve(__dirname, "./lib"),
    },
  },
});
