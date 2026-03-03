<template>
  <div v-html="chartHTML" :class="className"></div>
</template>

<script>
import { ref, onServerPrefetch, defineComponent } from 'vue'

/**
 * ApexChartsServer Component
 * Server-side rendering component for ApexCharts
 * Requires ApexCharts v5.6.0+
 */
export default defineComponent({
  name: 'apexchart-server',
  props: {
    type: {
      type: String,
      default: 'line',
    },
    width: {
      type: [Number, String],
      default: 400,
    },
    height: {
      type: [Number, String],
      default: 300,
    },
    series: {
      type: Array,
      default: () => [],
    },
    options: {
      type: Object,
      default: () => ({}),
    },
    className: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    const chartHTML = ref('')

    // Runs only on server during SSR
    onServerPrefetch(async () => {
      try {
        // Dynamic import for SSR-specific ApexCharts
        const { default: ApexCharts } = await import('apexcharts/ssr')

        // Mirror the React implementation: width/height go inside chart: {}
        const chartOptions = Object.assign({}, props.options, {
          chart: Object.assign({}, props.options.chart, {
            type: props.type,
            width: props.width,
            height: props.height,
          }),
          series: props.series,
        })

        chartHTML.value = await ApexCharts.renderToHTML(chartOptions, {
          width: props.width,
          height: props.height,
        })
      } catch (error) {
        console.error('Failed to render ApexChart on server:', error)
      }
    })

    return {
      chartHTML,
    }
  },
})
</script>
