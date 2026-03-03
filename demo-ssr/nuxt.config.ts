// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  app: {
    head: {
      title: 'Vue3-ApexCharts SSR Demo',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Demonstration of vue3-apexcharts with SSR support' }
      ],
    }
  },

  css: ['~/assets/css/main.css'],

  compatibilityDate: '2024-01-01',
})
