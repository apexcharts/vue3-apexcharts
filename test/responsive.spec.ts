import { describe, it, expect, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { isProxy } from 'vue'
import ApexChartsComponent from '../src/vue3-apexcharts.js'
import ApexChartsCoreComponent from '../src/vue3-apexcharts-core.js'

// Uses the real ApexCharts library: what matters here is the object ApexCharts
// runs on and registers, and its responsive code path, both of which a mock
// would replace.

const flush = (ms = 50) => new Promise((resolve) => setTimeout(resolve, ms))

const initialWidth = window.innerWidth
const setViewportWidth = (width: number) =>
  Object.defineProperty(window, 'innerWidth', { value: width, configurable: true, writable: true })

const registered = (id: string) =>
  (window as any).Apex._chartInstances.find((entry: any) => entry.id === id)

afterEach(() => {
  setViewportWidth(initialWidth)
})

describe.each([
  ['default', ApexChartsComponent],
  ['core', ApexChartsCoreComponent],
])('%s component', (variant, component) => {
  it('holds the ApexCharts instance itself, not a reactive proxy', async () => {
    const id = `instance-${variant}`
    const wrapper = mount(component as any, {
      props: { type: 'line', options: { chart: { id } }, series: [{ data: [1, 2, 3] }] },
      attachTo: document.body,
    })
    await flush()

    const chart = (wrapper.vm as any).chart
    expect(chart).toBeTruthy()
    expect(isProxy(chart)).toBe(false)
    expect(isProxy(registered(id).chart)).toBe(false)
    expect(registered(id).chart).toBe(chart)

    wrapper.unmount()
  })
})

// #125: with chart.id set, the chart registry ends up inside every chart's
// config, so the config can reach the chart itself. Leaving a responsive
// breakpoint clones that config, and ApexCharts before 4.3.0 cloned without a
// cycle guard, so the update overflowed the stack ("too much recursion"). The
// supported range (>=5.10.0) is past that; this keeps it there.
describe('responsive option with chart.id (#125)', () => {
  const donut = (id: string, title?: string) => ({
    chart: { id, animations: { enabled: false } },
    labels: ['Total', 'Partial'],
    title: { text: title },
    responsive: [{ breakpoint: 1024, options: { legend: { position: 'bottom' } } }],
  })

  it('keeps updating across the breakpoint, and after moving to a second chart', async () => {
    const errors: unknown[] = []
    const onRejection = (reason: unknown) => errors.push(reason)
    process.on('unhandledRejection', onRejection)
    const errorHandler = (err: unknown) => {
      errors.push(err)
    }

    const page = (id: string, series: number[]) =>
      mount(ApexChartsComponent as any, {
        props: { type: 'donut', options: donut(id), series },
        attachTo: document.body,
        global: { config: { errorHandler } },
      })

    // Each update re-runs the responsive check; widening past the breakpoint
    // after narrowing below it is the step that cloned the config.
    const crossBreakpoint = async (wrapper: any, id: string, widths: number[]) => {
      for (const width of widths) {
        setViewportWidth(width)
        await wrapper.setProps({ options: donut(id, `at ${width}px`) })
        await flush()
        expect((wrapper.vm as any).chart.w.config.title.text).toBe(`at ${width}px`)
      }
    }

    try {
      setViewportWidth(1200)
      const pageA = page('responsive-a', [23, 42])
      await flush()
      await crossBreakpoint(pageA, 'responsive-a', [800, 1200, 800, 1200])
      pageA.unmount()
      await flush()

      // The second chart is created while the registry already exists, the
      // case where the original report stopped rendering.
      setViewportWidth(800)
      const pageB = page('responsive-b', [75, 18])
      await flush()
      expect(pageB.element.querySelector('svg')).not.toBeNull()
      await crossBreakpoint(pageB, 'responsive-b', [1200, 800, 1200])
      pageB.unmount()
      await flush()

      expect(errors).toEqual([])
    } finally {
      process.off('unhandledRejection', onRejection)
    }
  })
})
