import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// No apexcharts aliases needed — apexcharts@5.9+ sub-entry dist files
// correctly externalize apexcharts/core so all registrations share one instance.

export default defineConfig({
  plugins: [vue()],
  base: "/vue3-apexcharts/",
  build: {
    outDir: resolve(__dirname, "../docs"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
