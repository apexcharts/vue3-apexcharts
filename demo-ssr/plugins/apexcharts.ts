import VueApexCharts from 'vue3-apexcharts'

// Must run on both server and client so that onServerPrefetch works
// and components are registered in the SSR render pass
export default defineNuxtPlugin({
  name: 'apexcharts',
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.use(VueApexCharts)
  },
})
