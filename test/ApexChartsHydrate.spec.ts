import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import ApexChartsHydrate from '../src/ApexChartsHydrate.vue'

// Mock ApexCharts SSR module
const mockChartInstance = {
  destroy: vi.fn(),
}

vi.mock('apexcharts/ssr', () => ({
  default: {
    hydrateAll: vi.fn(() => [mockChartInstance]),
  },
}))

describe('ApexChartsHydrate Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Definition', () => {
    it('should have the correct component name', () => {
      expect(ApexChartsHydrate.name).toBe('apexchart-hydrate')
    })

    it('should define clientOptions prop with empty object default', () => {
      const props = (ApexChartsHydrate as any).props
      expect(props.clientOptions).toBeDefined()
      expect(props.clientOptions.default()).toEqual({})
    })

    it('should define selector prop with default value', () => {
      const props = (ApexChartsHydrate as any).props
      expect(props.selector).toBeDefined()
      expect(props.selector.default).toBe('[data-apexcharts-hydrate]')
    })
  })

  describe('Client-Side Hydration', () => {
    it('should call ApexCharts.hydrateAll on mount', async () => {
      const ApexChartsSSR = (await import('apexcharts/ssr')).default

      mount(ApexChartsHydrate, {
        props: {},
      })

      await flushPromises()

      expect(ApexChartsSSR.hydrateAll).toHaveBeenCalled()
    })

    it('should pass clientOptions to hydrateAll', async () => {
      const ApexChartsSSR = (await import('apexcharts/ssr')).default

      const customOptions = {
        chart: {
          animations: { enabled: true, speed: 800 },
        },
      }

      mount(ApexChartsHydrate, {
        props: { clientOptions: customOptions },
      })

      await flushPromises()

      expect(ApexChartsSSR.hydrateAll).toHaveBeenCalledWith(
        '[data-apexcharts-hydrate]',
        customOptions
      )
    })

    it('should pass custom selector to hydrateAll', async () => {
      const ApexChartsSSR = (await import('apexcharts/ssr')).default

      mount(ApexChartsHydrate, {
        props: { selector: '#my-chart' },
      })

      await flushPromises()

      expect(ApexChartsSSR.hydrateAll).toHaveBeenCalledWith(
        '#my-chart',
        {}
      )
    })
  })

  describe('Cleanup', () => {
    it('should destroy all chart instances on unmount', async () => {
      const wrapper = mount(ApexChartsHydrate, {
        props: {},
      })

      await flushPromises()

      wrapper.unmount()

      expect(mockChartInstance.destroy).toHaveBeenCalled()
    })

    it('should not throw when unmounting before hydration completes', () => {
      const wrapper = mount(ApexChartsHydrate, {
        props: {},
      })

      expect(() => wrapper.unmount()).not.toThrow()
    })
  })

  describe('Error Handling', () => {
    it('should handle hydrateAll errors gracefully', async () => {
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const ApexChartsSSR = (await import('apexcharts/ssr')).default
      ;(ApexChartsSSR.hydrateAll as any).mockImplementationOnce(() => {
        throw new Error('Hydration failed')
      })

      mount(ApexChartsHydrate, { props: {} })

      await flushPromises()

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to hydrate ApexCharts:',
        expect.any(Error)
      )

      consoleErrorSpy.mockRestore()
    })
  })

  describe('Renderless', () => {
    it('should render null (no DOM output)', () => {
      const wrapper = mount(ApexChartsHydrate, {
        props: {},
      })

      expect(wrapper.html()).toBe('')
    })
  })
})
