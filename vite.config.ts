import { defineConfig } from "vite";
import { resolve } from "path";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    emptyOutDir: false,
    lib: {
      // src/indext.ts is where we have exported the component(s)
      entry: resolve(__dirname, "src/index.js"),
      name: "VueApexCharts",
      // the name of the output files when the build is run
      fileName: "vue3-apexcharts",
    },
    rollupOptions: {
      // Every apexcharts path, not just the bare name. Rollup compares a
      // string entry against the whole import id, so "apexcharts" never
      // matched the server components' import('apexcharts/ssr'): Vite bundled
      // the apexcharts installed here at build time into
      // dist/apexcharts.ssr.esm-*.js, and <apexchart-server> and
      // <apexchart-hydrate> rendered with that copy (5.10.0 in 1.11.1)
      // whatever version the app had installed. Same rule as
      // vite.config.core.ts.
      external: ["vue", /^apexcharts(\/.*)?$/],
      output: {
        // Provide global variables to use in the UMD build
        // for externalized deps
        exports: "named",
        globals: (id) => {
          if (id === "vue") return "Vue";
          if (id.startsWith("apexcharts")) return "ApexCharts";
        },
      },
    },
  },
});
