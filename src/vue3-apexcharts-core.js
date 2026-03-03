/* eslint-disable */
/**
 * Core variant of the vue3-apexcharts component.
 *
 * Imports ApexCharts from 'apexcharts/core' (bare class, no features registered).
 * Feature registration (legend, toolbar, annotations, exports, keyboard) is the
 * responsibility of the application:
 *
 *   import 'apexcharts/features/legend'
 *   import 'apexcharts/features/toolbar'
 *   // etc.
 *
 * The component logic is identical to the default variant — only the ApexCharts
 * import entry point differs.
 */
import {
  h,
  defineComponent,
  ref,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  watch,
  onBeforeMount,
  nextTick,
  toRefs,
} from "vue";
import ApexCharts from "apexcharts/core";

// define all emitted events in order to better
// document how the component should work
const events = [
  "animationEnd",
  "beforeMount",
  "mounted",
  "updated",
  "click",
  "mouseMove",
  "mouseLeave",
  "legendClick",
  "markerClick",
  "selection",
  "dataPointSelection",
  "dataPointMouseEnter",
  "dataPointMouseLeave",
  "beforeZoom",
  "beforeResetZoom",
  "zoomed",
  "scrolled",
  "brushScrolled",
];

const vueApexchartsCore = defineComponent({
  name: "apexchart",
  props: {
    options: {
      type: Object,
    },
    type: {
      type: String,
    },
    series: {
      type: Array,
      required: true,
    },
    width: {
      default: "100%",
    },
    height: {
      default: "auto",
    },
  },

  // events emitted by this component
  emits: events,

  setup(props, { emit }) {
    const __el = ref(null);
    const chart = ref(null);

    const isObject = (item) => {
      return item && typeof item === "object" && !Array.isArray(item) && item != null;
    };

    const extend = (target, source) => {
      if (typeof Object.assign !== "function") {
        (function () {
          Object.assign = function (target) {
            // We must check against these specific cases.
            if (target === undefined || target === null) {
              throw new TypeError("Cannot convert undefined or null to object");
            }

            let output = Object(target);
            for (let index = 1; index < arguments.length; index++) {
              let source = arguments[index];
              if (source !== undefined && source !== null) {
                for (let nextKey in source) {
                  if (source.hasOwnProperty(nextKey)) {
                    output[nextKey] = source[nextKey];
                  }
                }
              }
            }
            return output;
          };
        })();
      }

      let output = Object.assign({}, target);
      if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
          if (isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, {
                [key]: source[key],
              });
            } else {
              output[key] = extend(target[key], source[key]);
            }
          } else {
            Object.assign(output, {
              [key]: source[key],
            });
          }
        });
      }
      return output;
    };

    // Deep clone helper to break reactive references before passing data to ApexCharts.
    // This prevents ApexCharts' internal mutations from triggering Vue's deep watchers,
    // which would cause a feedback loop that kills animations.
    const copyData = (data) => JSON.parse(JSON.stringify(data));

    const init = async () => {
      await nextTick();

      if (chart.value) {
        return;
      }

      const newOptions = {
        chart: {
          type: props.type || (props.options.chart && props.options.chart.type) || "line",
          height: props.height,
          width: props.width,
          events: {},
        },
        series: copyData(props.series),
      };

      // emit events to the parent component
      // to allow for two-way data binding, while
      // also allowing chart options to define callbacks
      const optionsEvents = props.options.chart ? props.options.chart.events : null;
      events.forEach((event) => {
        let callback = (...args) => emit(event, ...args); // args => chartContext, options
        newOptions.chart.events[event] = (...args) => {
          callback(...args);
          if (optionsEvents && optionsEvents.hasOwnProperty(event)) {
            optionsEvents[event](...args);
          }
        };
      });

      const config = extend(props.options, newOptions);
      chart.value = new ApexCharts(__el.value, config);
      return chart.value.render();
    };

    const refresh = () => {
      destroy();
      return init();
    };

    const destroy = () => {
      chart.value.destroy();
      chart.value = null;
    };

    const updateSeries = (newSeries, animate) => {
      return chart.value.updateSeries(newSeries, animate);
    };

    const updateOptions = (newOptions, redrawPaths, animate, updateSyncedCharts) => {
      return chart.value.updateOptions(newOptions, redrawPaths, animate, updateSyncedCharts);
    };

    const toggleSeries = (seriesName) => {
      return chart.value.toggleSeries(seriesName);
    };

    const showSeries = (seriesName) => {
      chart.value.showSeries(seriesName);
    };

    const hideSeries = (seriesName) => {
      chart.value.hideSeries(seriesName);
    };

    const appendSeries = (newSeries, animate) => {
      return chart.value.appendSeries(newSeries, animate);
    };

    const resetSeries = () => {
      chart.value.resetSeries();
    };

    const toggleDataPointSelection = (seriesIndex, dataPointIndex) => {
      chart.value.toggleDataPointSelection(seriesIndex, dataPointIndex);
    };

    const appendData = (newData) => {
      return chart.value.appendData(newData);
    };

    const zoomX = (start, end) => {
      return chart.value.zoomX(start, end);
    };

    const dataURI = (options) => {
      return chart.value.dataURI(options);
    };

    const setLocale = (localeName) => {
      return chart.value.setLocale(localeName);
    };

    const addXaxisAnnotation = (options, pushToMemory) => {
      chart.value.addXaxisAnnotation(options, pushToMemory);
    };

    const addYaxisAnnotation = (options, pushToMemory) => {
      chart.value.addYaxisAnnotation(options, pushToMemory);
    };

    const addPointAnnotation = (options, pushToMemory) => {
      chart.value.addPointAnnotation(options, pushToMemory);
    };

    const removeAnnotation = (id, options) => {
      chart.value.removeAnnotation(id, options);
    };

    const clearAnnotations = () => {
      chart.value.clearAnnotations();
    };

    onBeforeMount(() => {
      window.ApexCharts = ApexCharts;
    });

    onMounted(() => {
      __el.value = getCurrentInstance().proxy.$el;
      init();
    });

    onBeforeUnmount(() => {
      if (!chart.value) {
        return;
      }
      destroy();
    });

    const reactiveProps = toRefs(props);

    // Debounce mechanism: when both options and series change in the same tick
    // (e.g. user sets this.chartOptions = {...}; this.series = [...] together),
    // we coalesce them into a single updateOptions() call so one update doesn't
    // cancel the other's animation.
    let _pendingUpdate = null;

    const scheduleUpdate = (kind) => {
      if (!_pendingUpdate) {
        _pendingUpdate = { options: false, series: false };
        nextTick(() => {
          const pending = _pendingUpdate;
          _pendingUpdate = null;

          if (!chart.value) {
            init();
            return;
          }

          if (pending.options && pending.series) {
            // Both changed — merge series into options for a single update call
            const opts = copyData(props.options);
            opts.series = copyData(props.series);
            chart.value.updateOptions(opts);
          } else if (pending.options) {
            chart.value.updateOptions(copyData(props.options));
          } else if (pending.series) {
            chart.value.updateSeries(copyData(props.series));
          }
        });
      }
      _pendingUpdate[kind] = true;
    };

    watch(reactiveProps.options, () => {
      scheduleUpdate("options");
    });

    watch(
      reactiveProps.series,
      () => {
        scheduleUpdate("series");
      },
      { deep: true },
    );

    watch(reactiveProps.type, () => {
      refresh();
    });

    watch(reactiveProps.width, () => {
      refresh();
    });

    watch(reactiveProps.height, () => {
      refresh();
    });

    return {
      chart,
      init,
      refresh,
      destroy,
      updateOptions,
      updateSeries,
      toggleSeries,
      showSeries,
      hideSeries,
      resetSeries,
      zoomX,
      toggleDataPointSelection,
      appendData,
      appendSeries,
      addXaxisAnnotation,
      addYaxisAnnotation,
      addPointAnnotation,
      removeAnnotation,
      clearAnnotations,
      setLocale,
      dataURI,
    };
  },

  render() {
    return h("div", {
      class: "vue-apexcharts",
    });
  },
});

export default vueApexchartsCore;
