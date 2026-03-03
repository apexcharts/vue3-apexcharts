<script>
import { onMounted, onBeforeUnmount, defineComponent } from 'vue'

/**
 * ApexChartsHydrate Component
 * Client-side hydration component for server-rendered ApexCharts.
 * Must be used alongside <apexchart-server> on the same page.
 * Finds all [data-apexcharts-hydrate] elements rendered by <apexchart-server>
 * and hydrates them with client-side interactivity.
 * Requires ApexCharts v5.7.0+
 */
export default defineComponent({
  name: 'apexchart-hydrate',
  props: {
    clientOptions: {
      type: Object,
      default: () => ({}),
    },
    selector: {
      type: String,
      default: '[data-apexcharts-hydrate]',
    },
  },
  setup(props) {
    let chartInstances = []

    onMounted(async () => {
      try {
        const { default: ApexCharts } = await import('apexcharts/ssr')
        chartInstances = ApexCharts.hydrateAll(props.selector, props.clientOptions)
      } catch (error) {
        console.error('Failed to hydrate ApexCharts:', error)
      }
    })

    onBeforeUnmount(() => {
      chartInstances.forEach((instance) => {
        if (instance && instance.destroy) instance.destroy()
      })
      chartInstances = []
    })
  },
  render() {
    return null
  },
})
</script>
