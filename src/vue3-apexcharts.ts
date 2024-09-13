import {
  h,
  ref,
  defineComponent,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount,
  watch,
  onBeforeMount,
  nextTick,
  toRefs,
  type PropType,
  type ComponentOptionsMixin,
  type VNodeProps,
  type AllowedComponentProps,
  type ComponentCustomProps
} from 'vue';
import ApexCharts, { type ApexOptions } from 'apexcharts';

const events = [
  'animationEnd',
  'beforeMount',
  'mounted',
  'updated',
  'click',
  'mouseMove',
  'mouseLeave',
  'legendClick',
  'markerClick',
  'selection',
  'dataPointSelection',
  'dataPointMouseEnter',
  'dataPointMouseLeave',
  'beforeZoom',
  'beforeResetZoom',
  'zoomed',
  'scrolled',
  'brushScrolled'
] as const;

type ApexChartType =
  | 'line'
  | 'area'
  | 'bar'
  | 'pie'
  | 'donut'
  | 'radialBar'
  | 'scatter'
  | 'bubble'
  | 'heatmap'
  | 'candlestick'
  | 'boxPlot'
  | 'radar'
  | 'polarArea'
  | 'rangeBar'
  | 'rangeArea'
  | 'treemap';

type EventType = (typeof events)[number];

type EmitsType = {
  [K in EventType]: (...args: any[]) => void;
};

interface VueApexChartsProps {
  options: ApexOptions;
  type?: string;
  series: any[];
  width: string | number;
  height: string | number;
}

export default defineComponent({
  name: 'ApexChart',
  props: {
    options: {
      type: Object as PropType<ApexOptions>,
      required: true
    },
    type: {
      type: String as PropType<ApexChartType>,
      validator: (value: string): boolean => {
        return [
          'line',
          'area',
          'bar',
          'pie',
          'donut',
          'radialBar',
          'scatter',
          'bubble',
          'heatmap',
          'candlestick',
          'boxPlot',
          'radar',
          'polarArea',
          'rangeBar',
          'rangeArea',
          'treemap'
        ].includes(value);
      }
    },
    series: {
      type: Array as PropType<any[]>,
      required: true
    },
    width: {
      type: [String, Number] as PropType<string | number>,
      default: '100%'
    },
    height: {
      type: [String, Number] as PropType<string | number>,
      default: 'auto'
    }
  },
  emits: ['events'],
  setup(props, { emit }) {
    const __el = ref<HTMLElement | null>(null);
    const chart = ref<ApexCharts | null>(null);

    const isObject = (item: any): item is Record<string, any> => {
      return item && typeof item === 'object' && !Array.isArray(item) && item != null;
    };

    const extend = <T extends Record<string, any>, U extends Record<string, any>>(target: T, source: U): T & U => {
      let output = Object.assign({}, target) as Record<any, any>;
      if (isObject(target) && isObject(source)) {
        Object.keys(source).forEach((key) => {
          if (isObject(source[key])) {
            if (!(key in target)) {
              Object.assign(output, { [key]: source[key] });
            } else {
               output[key] = extend(target[key], source[key]);
            }
          } else {
            Object.assign(output, { [key]: source[key] });
          }
        });
      }
      return output;
    };

    const init = async () => {
      await nextTick();

      if (chart.value) {
        return;
      }

      const newOptions: ApexOptions = {
        chart: {
          type: props.type || props.options.chart?.type || 'line',
          height: props.height,
          width: props.width,
          events: {}
        },
        series: props.series
      };

      const optionsEvents = props.options.chart?.events;
      events.forEach((event) => {
        const callback = (...args: any[]) => emit('events', ...args);
        if (newOptions.chart?.events) {
          newOptions.chart.events[event] = (...args: any[]) => {
            callback(...args);
            if (optionsEvents && event in optionsEvents) {
              (optionsEvents[event as keyof typeof optionsEvents] as Function)?.(...args);
            }
          };
        }
      });

      const config = extend(props.options, newOptions);
      if (__el.value) {
        chart.value = new ApexCharts(__el.value, config);
        return chart.value.render();
      }
    };

    // ... (other methods remain the same)

    onBeforeMount(() => {
      (window as any).ApexCharts = ApexCharts;
    });

    onMounted(() => {
      const instance = getCurrentInstance();
      if (instance) {
        __el.value = instance.proxy?.$el as HTMLElement;
        init();
      }
    });

    onBeforeUnmount(() => {
      if (!chart.value) {
        return;
      }
      chart.value.destroy();
    });

    const { options, series, type, width, height } = toRefs(props);

    watch(options, () => {
      if (!chart.value && options.value) {
        init();
      } else {
        chart.value?.updateOptions(options.value);
      }
    });

    watch(
      series,
      () => {
        if (!chart.value && series.value) {
          init();
        } else {
          chart.value?.updateSeries(series.value);
        }
      },
      { deep: true }
    );

    watch(type, () => {
      if (chart.value) {
        chart.value.destroy();
        init();
      }
    });

    watch([width, height], () => {
      if (chart.value) {
        chart.value.destroy();
        init();
      }
    });

    return {
      chart,
      init
      // ... (other methods)
    };
  },
  render() {
    return h('div', {
      class: 'vue-apexcharts'
    });
  }
}) as unknown as new () => {
  $props: VNodeProps & AllowedComponentProps & ComponentCustomProps & VueApexChartsProps;
  $emit: EmitsType;
} & ComponentOptionsMixin;
