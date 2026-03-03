import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// Build config for the tree-shakeable core variant.
// Produces vue3-apexcharts-core.js (ESM) and vue3-apexcharts-core.umd.cjs (UMD).
// The core entry imports ApexCharts from 'apexcharts/core' so bundlers can
// exclude unneeded features when the app does not import them.
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, "src/index-core.js"),
      name: "VueApexChartsCore",
      fileName: "vue3-apexcharts-core",
    },
    rollupOptions: {
      external: ["vue", /^apexcharts(\/.*)?$/],
      output: {
        globals: (id) => {
          if (id === "vue") return "Vue";
          if (id.startsWith("apexcharts")) return "ApexCharts";
        },
      },
    },
  },
});
