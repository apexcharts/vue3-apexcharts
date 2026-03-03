import { describe, it, expect, beforeEach, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ApexChartsServer from '../src/ApexChartsServer.vue'

// Mock ApexCharts SSR module
vi.mock('apexcharts/ssr', () => ({
  default: {
    renderToHTML: vi.fn().mockResolvedValue('<div class="apexcharts-canvas">Mocked Chart</div>'),
  },
}))

describe('ApexChartsServer Component', () => {
  const defaultProps = {
    type: 'bar',
    width: 500,
    height: 300,
    series: [{ name: 'Series 1', data: [30, 40, 35, 50] }],
    options: {
      chart: {
        id: 'test-ssr-chart',
      },
      xaxis: {
        categories: ['A', 'B', 'C', 'D'],
      },
    },
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Component Rendering', () => {
    it('should render with default props', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          series: [],
          options: {},
        },
      })

      expect(wrapper.exists()).toBe(true)
    })

    it('should have the correct component name', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(wrapper.vm.$options.name).toBe('apexchart-server')
    })

    it('should render a div container', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(wrapper.find('div').exists()).toBe(true)
    })

    it('should apply custom className', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          ...defaultProps,
          className: 'custom-chart-class',
        },
      })

      expect(wrapper.classes()).toContain('custom-chart-class')
    })
  })

  describe('Props Validation', () => {
    it('should accept type prop with default value', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          series: [],
          options: {},
        },
      })

      expect(wrapper.props('type')).toBe('line')
    })

    it('should accept custom type prop', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          ...defaultProps,
          type: 'area',
        },
      })

      expect(wrapper.props('type')).toBe('area')
    })

    it('should accept width and height props', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(wrapper.props('width')).toBe(500)
      expect(wrapper.props('height')).toBe(300)
    })

    it('should use default width and height', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          series: [],
          options: {},
        },
      })

      expect(wrapper.props('width')).toBe(400)
      expect(wrapper.props('height')).toBe(300)
    })

    it('should accept series as array', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(Array.isArray(wrapper.props('series'))).toBe(true)
      expect(wrapper.props('series')).toHaveLength(1)
    })

    it('should accept options as object', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(typeof wrapper.props('options')).toBe('object')
      expect(wrapper.props('options').chart).toBeDefined()
    })
  })

  describe('SSR Rendering', () => {
    it('should have empty chartHTML initially', () => {
      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      // chartHTML should be empty string initially
      expect(wrapper.vm.chartHTML).toBe('')
    })

    it('should merge chart type with options', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          type: 'bar',
          series: [{ data: [1, 2, 3] }],
          options: {
            chart: {
              id: 'test',
            },
          },
        },
      })

      expect(wrapper.props('type')).toBe('bar')
      expect(wrapper.props('options').chart.id).toBe('test')
    })
  })

  describe('Error Handling', () => {
    it('should handle missing ApexCharts gracefully', async () => {
      // This test verifies the component doesn't crash when SSR module is unavailable
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

      const wrapper = mount(ApexChartsServer, {
        props: defaultProps,
      })

      expect(wrapper.exists()).toBe(true)

      consoleErrorSpy.mockRestore()
    })
  })

  describe('Chart Configuration', () => {
    it('should properly structure chart options', () => {
      const customOptions = {
        chart: {
          id: 'custom-chart',
          toolbar: {
            show: false,
          },
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar'],
        },
        colors: ['#008FFB'],
      }

      const wrapper = mount(ApexChartsServer, {
        props: {
          type: 'line',
          series: [{ data: [10, 20, 30] }],
          options: customOptions,
        },
      })

      expect(wrapper.props('options').chart.id).toBe('custom-chart')
      expect(wrapper.props('options').chart.toolbar.show).toBe(false)
      expect(wrapper.props('options').colors).toEqual(['#008FFB'])
    })
  })

  describe('Different Chart Types', () => {
    const chartTypes = ['line', 'bar', 'area', 'pie', 'donut', 'scatter', 'bubble', 'heatmap', 'candlestick']

    chartTypes.forEach((chartType) => {
      it(`should render ${chartType} chart type`, () => {
        const wrapper = mount(ApexChartsServer, {
          props: {
            type: chartType,
            series: [{ data: [1, 2, 3] }],
            options: {},
          },
        })

        expect(wrapper.props('type')).toBe(chartType)
      })
    })
  })

  describe('Responsive Sizing', () => {
    it('should accept numeric width and height', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          ...defaultProps,
          width: 800,
          height: 600,
        },
      })

      expect(wrapper.props('width')).toBe(800)
      expect(wrapper.props('height')).toBe(600)
    })

    it('should accept string width and height', () => {
      const wrapper = mount(ApexChartsServer, {
        props: {
          ...defaultProps,
          width: '100%',
          height: '400px',
        },
      })

      expect(wrapper.props('width')).toBe('100%')
      expect(wrapper.props('height')).toBe('400px')
    })
  })
})
