/* eslint-disable */
import {
  h,
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  onBeforeMount,
  nextTick
} from "vue";
import ApexCharts from "apexcharts";

const vueApexcharts = defineComponent({
  name: "apexchart",
  props: {
    options: {
      type: Object
    },
    type: {
      type: String
    },
    series: {
      type: Array,
      required: true,
      default: () => []
    },
    width: {
      default: "100%"
    },
    height: {
      default: "auto"
    }
  },
  setup(props, ctx) {
    const el = ref(null);
    const chart = ref(null);

    const isObject = item => {
      return item && typeof item === "object" && !Array.isArray(item) && item != null;
    };

    const extend = (target, source) => {
      if (typeof Object.assign !== "function") {
        (function() {
          Object.assign = function(target) {
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
        Object.keys(source).forEach(key => {
          if (isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, {
                [key]: source[key]
              });
            } else {
              output[key] = extend(target[key], source[key]);
            }
          } else {
            Object.assign(output, {
              [key]: source[key]
            });
          }
        });
      }
      return output;
    };

    const init = async () => {
      await nextTick();

      const newOptions = {
        chart: {
          type: props.type || props.options.chart.type || "line",
          height: props.height,
          width: props.width,
          events: {}
        },
        series: props.series
      };

      // Object.keys(ctx.listeners).forEach((evt) => {
      //     newOptions.chart.value.events[evt] = ctx.listeners[evt];
      // });

      const config = extend(props.options, newOptions);
      chart.value = new ApexCharts(el.value, config);
      return chart.value.render();
    };

    const refresh = () => {
      destroy();
      return init();
    };

    const destroy = () => {
      chart.value.destroy();
    };

    const updateSeries = (newSeries, animate) => {
      return chart.value.updateSeries(newSeries, animate);
    };

    const updateOptions = (newOptions, redrawPaths, animate, updateSyncedCharts) => {
      return chart.value.updateOptions(newOptions, redrawPaths, animate, updateSyncedCharts);
    };

    const toggleSeries = seriesName => {
      return chart.value.toggleSeries(seriesName);
    };

    const showSeries = seriesName => {
      chart.value.showSeries(seriesName);
    };

    const hideSeries = seriesName => {
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

    const appendData = newData => {
      return chart.value.appendData(newData);
    };

    const addText = options => {
      chart.value.addText(options);
    };

    const dataURI = () => {
      return chart.value.dataURI();
    };

    const setLocale = localeName => {
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
      init();
    });

    onBeforeUnmount(() => {
      if (!chart.value) {
        return;
      }
      destroy();
    });

    watch(
      () => props.options,
      () => {
        if (!chart.value && props.options) {
          init();
        } else {
          chart.value.updateOptions(props.options);
        }
      }
    );

    watch(
      () => props.series,
      () => {
        if (!chart.value && props.series) {
          init();
        } else {
          chart.value.updateSeries(props.series);
        }
      }
    );

    watch(
      () => props.type,
      () => {
        refresh();
      }
    );

    watch(
      () => props.width,
      () => {
        refresh();
      }
    );

    watch(
      () => props.height,
      () => {
        refresh();
      }
    );

    return { el, chart };
  },

  render() {
    return h("div", {
      class: "vue-apexcharts",
      ref: "el"
    });
  }
});

export default vueApexcharts;
