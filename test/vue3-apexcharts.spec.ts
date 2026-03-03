import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount, flushPromises } from "@vue/test-utils";
import VueApexCharts from "../src/vue3-apexcharts.js";

// Mock ApexCharts
vi.mock("apexcharts", () => {
  const mockChart = {
    render: vi.fn().mockResolvedValue(undefined),
    updateOptions: vi.fn().mockResolvedValue(undefined),
    updateSeries: vi.fn().mockResolvedValue(undefined),
    destroy: vi.fn(),
    toggleSeries: vi.fn(),
    showSeries: vi.fn(),
    hideSeries: vi.fn(),
    appendSeries: vi.fn().mockResolvedValue(undefined),
    resetSeries: vi.fn(),
    zoomX: vi.fn(),
    toggleDataPointSelection: vi.fn(),
    appendData: vi.fn().mockResolvedValue(undefined),
    dataURI: vi.fn().mockResolvedValue(undefined),
    setLocale: vi.fn(),
    addXaxisAnnotation: vi.fn(),
    addYaxisAnnotation: vi.fn(),
    addPointAnnotation: vi.fn(),
    removeAnnotation: vi.fn(),
    clearAnnotations: vi.fn(),
  };

  return {
    default: vi.fn(() => mockChart),
  };
});

describe("VueApexCharts Component", () => {
  const defaultProps = {
    series: [{ name: "Series 1", data: [30, 40, 35, 50] }],
    options: {
      chart: {
        id: "test-chart",
        type: "line",
      },
      xaxis: {
        categories: ["A", "B", "C", "D"],
      },
    },
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Component Rendering", () => {
    it("should render a div with class vue-apexcharts", () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      expect(wrapper.find(".vue-apexcharts").exists()).toBe(true);
    });

    it("should have the correct component name", () => {
      expect(VueApexCharts.name).toBe("apexchart");
    });
  });

  describe("Props Validation", () => {
    it("should accept valid series prop", () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      expect(wrapper.props("series")).toEqual(defaultProps.series);
    });

    it("should accept type prop", () => {
      const wrapper = mount(VueApexCharts, {
        props: {
          ...defaultProps,
          type: "bar",
        },
      });

      expect(wrapper.props("type")).toBe("bar");
    });

    it("should accept width and height props", () => {
      const wrapper = mount(VueApexCharts, {
        props: {
          ...defaultProps,
          width: 500,
          height: 300,
        },
      });

      expect(wrapper.props("width")).toBe(500);
      expect(wrapper.props("height")).toBe(300);
    });

    it("should use default width and height when not provided", () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      expect(wrapper.props("width")).toBe("100%");
      expect(wrapper.props("height")).toBe("auto");
    });
  });

  describe("Chart Initialization", () => {
    it("should initialize ApexCharts on mount", async () => {
      const ApexCharts = (await import("apexcharts")).default;

      mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      expect(ApexCharts).toHaveBeenCalled();
    });

    it("should call render method after initialization", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();
      await wrapper.vm.$nextTick();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;

      expect(mockInstance.render).toHaveBeenCalled();
    });
  });

  describe("Chart Updates", () => {
    it("should update chart when series prop changes", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const newSeries = [{ name: "Series 2", data: [10, 20, 30, 40] }];
      await wrapper.setProps({ series: newSeries });

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;

      expect(mockInstance.updateSeries).toHaveBeenCalledWith(newSeries);
    });

    it("should update chart when options prop changes", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const newOptions = { ...defaultProps.options, title: { text: "New Title" } };
      await wrapper.setProps({ options: newOptions });

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;

      expect(mockInstance.updateOptions).toHaveBeenCalled();
    });

    it("should refresh chart when type prop changes", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const initialCallCount = ApexCharts.mock.calls.length;

      await wrapper.setProps({ type: "bar" });
      await flushPromises();

      // Should create a new chart instance (refresh)
      expect(ApexCharts.mock.calls.length).toBeGreaterThan(initialCallCount);
    });
  });

  describe("Chart Methods", () => {
    it("should expose updateSeries method", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      expect(wrapper.vm.updateSeries).toBeDefined();
      expect(typeof wrapper.vm.updateSeries).toBe("function");
    });

    it("should expose updateOptions method", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      expect(wrapper.vm.updateOptions).toBeDefined();
      expect(typeof wrapper.vm.updateOptions).toBe("function");
    });

    it("should expose toggleSeries method", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      expect(wrapper.vm.toggleSeries).toBeDefined();
      expect(typeof wrapper.vm.toggleSeries).toBe("function");
    });

    it("should expose destroy method", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      expect(wrapper.vm.destroy).toBeDefined();
      expect(typeof wrapper.vm.destroy).toBe("function");
    });
  });

  describe("Chart Cleanup", () => {
    it("should destroy chart on unmount", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;

      wrapper.unmount();

      expect(mockInstance.destroy).toHaveBeenCalled();
    });
  });

  describe("Event Handling", () => {
    it("should emit chart events", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      // Check that component declares emitted events
      expect(VueApexCharts.emits).toBeDefined();
      expect(VueApexCharts.emits).toContain("mounted");
      expect(VueApexCharts.emits).toContain("updated");
      expect(VueApexCharts.emits).toContain("click");
    });
  });

  describe("Backward Compatibility", () => {
    it("should work with legacy options format", async () => {
      const legacyProps = {
        series: [{ data: [30, 40, 35, 50] }],
        options: {
          chart: {
            type: "line",
          },
          xaxis: {
            categories: ["A", "B", "C", "D"],
          },
        },
      };

      const wrapper = mount(VueApexCharts, {
        props: legacyProps,
      });

      await flushPromises();

      expect(wrapper.exists()).toBe(true);
    });

    it("should handle chart type from options.chart.type", async () => {
      const wrapper = mount(VueApexCharts, {
        props: {
          series: [{ data: [30, 40, 35, 50] }],
          options: {
            chart: {
              type: "bar",
            },
          },
        },
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      expect(ApexCharts).toHaveBeenCalled();
    });

    it("should prioritize type prop over options.chart.type", async () => {
      const wrapper = mount(VueApexCharts, {
        props: {
          type: "line",
          series: [{ data: [30, 40, 35, 50] }],
          options: {
            chart: {
              type: "bar",
            },
          },
        },
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const chartConfig = ApexCharts.mock.calls[0][1];

      expect(chartConfig.chart.type).toBe("line");
    });
  });

  describe("Animation Fixes", () => {
    it("should pass cloned series data to ApexCharts (not the reactive reference)", async () => {
      const originalSeries = [{ name: "Series 1", data: [30, 40, 35, 50] }];
      const wrapper = mount(VueApexCharts, {
        props: {
          ...defaultProps,
          series: originalSeries,
        },
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const chartConfig = ApexCharts.mock.calls[0][1];

      // The series passed to ApexCharts constructor should be a deep clone,
      // not the same reference as the prop, to prevent internal mutations
      // from triggering Vue's deep watcher and killing animations.
      expect(chartConfig.series).toEqual(originalSeries);
      expect(chartConfig.series).not.toBe(originalSeries);
    });

    it("should pass cloned series data on updateSeries calls", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const newSeries = [{ name: "Series 2", data: [10, 20, 30, 40] }];
      await wrapper.setProps({ series: newSeries });
      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;

      const calledWith = mockInstance.updateSeries.mock.calls[0][0];
      expect(calledWith).toEqual(newSeries);
      expect(calledWith).not.toBe(newSeries);
    });

    it("should coalesce simultaneous options and series changes into a single updateOptions call", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;
      mockInstance.updateOptions.mockClear();
      mockInstance.updateSeries.mockClear();

      // Change both options and series in the same synchronous tick
      const newOptions = { ...defaultProps.options, title: { text: "New Title" } };
      const newSeries = [{ name: "Series 2", data: [10, 20, 30, 40] }];

      // Use setProps to change both at once — triggers both watchers in one tick
      await wrapper.setProps({ options: newOptions, series: newSeries });
      await flushPromises();

      // Should have called updateOptions (with series merged in), not updateSeries separately
      expect(mockInstance.updateOptions).toHaveBeenCalledTimes(1);
      expect(mockInstance.updateSeries).not.toHaveBeenCalled();

      // The updateOptions call should include the series data
      const optionsArg = mockInstance.updateOptions.mock.calls[0][0];
      expect(optionsArg.series).toEqual(newSeries);
    });

    it("should use updateSeries when only series changes (not updateOptions)", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;
      mockInstance.updateOptions.mockClear();
      mockInstance.updateSeries.mockClear();

      const newSeries = [{ name: "Series 2", data: [10, 20, 30, 40] }];
      await wrapper.setProps({ series: newSeries });
      await flushPromises();

      expect(mockInstance.updateSeries).toHaveBeenCalledTimes(1);
      expect(mockInstance.updateOptions).not.toHaveBeenCalled();
    });

    it("should use updateOptions when only options change (not updateSeries)", async () => {
      const wrapper = mount(VueApexCharts, {
        props: defaultProps,
      });

      await flushPromises();

      const ApexCharts = (await import("apexcharts")).default;
      const mockInstance = ApexCharts.mock.results[0].value;
      mockInstance.updateOptions.mockClear();
      mockInstance.updateSeries.mockClear();

      const newOptions = { ...defaultProps.options, title: { text: "Updated" } };
      await wrapper.setProps({ options: newOptions });
      await flushPromises();

      expect(mockInstance.updateOptions).toHaveBeenCalledTimes(1);
      expect(mockInstance.updateSeries).not.toHaveBeenCalled();
    });
  });
});
