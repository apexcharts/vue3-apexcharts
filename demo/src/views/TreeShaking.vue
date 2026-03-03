<template>
  <div class="tree-shaking-demo">
    <h2>Tree-Shaking (apexcharts &gt;= 5.9)</h2>

    <p class="intro">
      Import only the features your app needs. Unused features (Exports, Toolbar, Annotations,
      KeyboardNavigation) are excluded from the final bundle, saving up to ~40% of the full-bundle
      size.
    </p>

    <!-- ── MINIMAL: core + line only ───────────────────────────── -->
    <section class="demo-section">
      <h3>Minimal — core + line chart + legend only</h3>
      <p class="caption">
        No toolbar, no exports, no annotations, no keyboard navigation included.
      </p>

      <div class="demo-layout">
        <div class="chart-col">
          <apexchart
            width="500"
            height="300"
            type="line"
            :options="minimalOptions"
            :series="minimalSeries"
          />
        </div>

        <pre class="code-col"><code>// app entry — only these three imports
import VueApexCharts from 'vue3-apexcharts/core'
import 'apexcharts/line'
import 'apexcharts/features/legend'

// No toolbar, exports, annotations or keyboard included.
app.use(VueApexCharts)</code></pre>
      </div>
    </section>

    <!-- ── WITH TOOLBAR ────────────────────────────────────────── -->
    <section class="demo-section">
      <h3>With toolbar + zoom</h3>
      <p class="caption">
        Adds <code>apexcharts/features/toolbar</code> (registers Toolbar &amp; ZoomPanSelection).
        Exports and annotations are still excluded.
      </p>

      <div class="demo-layout">
        <div class="chart-col">
          <apexchart
            width="500"
            height="300"
            type="bar"
            :options="toolbarOptions"
            :series="toolbarSeries"
          />
        </div>

        <pre class="code-col"><code>import VueApexCharts from 'vue3-apexcharts/core'
import 'apexcharts/bar'
import 'apexcharts/features/legend'
import 'apexcharts/features/toolbar'
// Toolbar + zoom/pan now available.
// Exports and annotations still excluded.</code></pre>
      </div>
    </section>

    <!-- ── SIZE TABLE ──────────────────────────────────────────── -->
    <section class="demo-section">
      <h3>Approximate bundle savings per excluded feature</h3>
      <table class="size-table">
        <thead>
          <tr>
            <th>Feature</th>
            <th>Approx. minzipped savings</th>
            <th>Import to include</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Exports (SVG / PNG / CSV)</td>
            <td>~8–12 KB</td>
            <td><code>apexcharts/features/exports</code></td>
          </tr>
          <tr>
            <td>Toolbar + ZoomPanSelection</td>
            <td>~10–15 KB</td>
            <td><code>apexcharts/features/toolbar</code></td>
          </tr>
          <tr>
            <td>Annotations</td>
            <td>~12–18 KB</td>
            <td><code>apexcharts/features/annotations</code></td>
          </tr>
          <tr>
            <td>KeyboardNavigation</td>
            <td>~3–5 KB</td>
            <td><code>apexcharts/features/keyboard</code></td>
          </tr>
          <tr>
            <td>Legend</td>
            <td>~8–12 KB</td>
            <td><code>apexcharts/features/legend</code></td>
          </tr>
        </tbody>
      </table>
      <p class="caption">
        A static read-only line chart with no toolbar/exports/annotations/legend/keyboard can be
        <strong>~40–45% smaller</strong> than the full bundle. Tooltip is always included (part of
        core).
      </p>
    </section>
  </div>
</template>

<script>
/* eslint-disable */
// ─── Tree-shaking pattern — all imports in one module so the bundler
// sees a single ApexCharts instance and all registrations apply to it.
// ─────────────────────────────────────────────────────────────────────────
// 1. Core class (no chart types, no optional features)
import ApexCharts from "apexcharts/core";

// 2. Chart types this page uses
import "apexcharts/line";
import "apexcharts/bar";

// 3. Only the features this page needs
import "apexcharts/features/legend";
import "apexcharts/features/toolbar";

// 4. Build the Vue component using the same ApexCharts reference
import {
  defineComponent,
  ref,
  onMounted,
  onBeforeUnmount,
  watch,
  toRefs,
  h,
  getCurrentInstance,
  nextTick,
  onBeforeMount,
} from "vue";

const VueApexChartsCore = defineComponent({
  name: "apexchart",
  props: {
    options: Object,
    type: String,
    series: { type: Array, required: true },
    width: { default: "100%" },
    height: { default: "auto" },
  },
  setup(props) {
    const el = ref(null);
    const chart = ref(null);
    const init = async () => {
      await nextTick();
      if (chart.value) return;
      const config = Object.assign({}, props.options, {
        chart: Object.assign({}, props.options && props.options.chart, {
          type:
            props.type ||
            (props.options && props.options.chart && props.options.chart.type) ||
            "line",
          height: props.height,
          width: props.width,
        }),
        series: props.series,
      });
      chart.value = new ApexCharts(el.value, config);
      return chart.value.render();
    };
    const destroy = () => {
      chart.value && chart.value.destroy();
      chart.value = null;
    };
    onBeforeMount(() => {
      window.ApexCharts = ApexCharts;
    });
    onMounted(() => {
      el.value = getCurrentInstance().proxy.$el;
      init();
    });
    onBeforeUnmount(() => {
      if (chart.value) destroy();
    });
    const { options, series, type, width, height } = toRefs(props);
    watch(options, () => (chart.value ? chart.value.updateOptions(props.options) : init()));
    watch(series, () => (chart.value ? chart.value.updateSeries(props.series) : init()), {
      deep: true,
    });
    watch([type, width, height], () => {
      destroy();
      init();
    });
    return () => h("div", { class: "vue-apexcharts" });
  },
});

// ─────────────────────────────────────────────────────────────────────────
export default {
  name: "TreeShakingDemo",

  components: {
    apexchart: VueApexChartsCore,
  },

  data() {
    return {
      // ── minimal chart (line + legend, no toolbar) ─────────────────────
      minimalOptions: {
        chart: {
          toolbar: { show: false },
        },
        legend: { show: true },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
        },
        title: {
          text: "Monthly Revenue",
          align: "left",
        },
      },
      minimalSeries: [
        {
          name: "Product A",
          data: [31, 40, 28, 51, 42, 59],
        },
        {
          name: "Product B",
          data: [11, 32, 45, 32, 34, 52],
        },
      ],

      // ── toolbar chart (bar + legend + toolbar) ─────────────────────────
      toolbarOptions: {
        chart: {
          toolbar: { show: true },
        },
        legend: { show: true },
        plotOptions: {
          bar: { borderRadius: 4 },
        },
        xaxis: {
          categories: ["Q1", "Q2", "Q3", "Q4"],
        },
        title: {
          text: "Quarterly Sales",
          align: "left",
        },
      },
      toolbarSeries: [
        {
          name: "2023",
          data: [44, 55, 57, 56],
        },
        {
          name: "2024",
          data: [76, 85, 101, 98],
        },
      ],
    };
  },
};
</script>

<style scoped>
.tree-shaking-demo {
  padding: 0 24px 40px;
}

.intro {
  max-width: 680px;
  color: #555;
  line-height: 1.6;
  margin-bottom: 32px;
}

.demo-section {
  border-top: 2px solid #e8e8e8;
  padding-top: 24px;
  margin-bottom: 32px;
}

.demo-section h3 {
  margin-bottom: 4px;
}

.caption {
  color: #666;
  font-size: 14px;
  margin-bottom: 16px;
}

.demo-layout {
  display: flex;
  gap: 32px;
  align-items: flex-start;
  flex-wrap: wrap;
}

.chart-col {
  flex-shrink: 0;
}

.code-col {
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 16px 20px;
  border-radius: 6px;
  font-size: 13px;
  line-height: 1.6;
  flex: 1;
  min-width: 280px;
  margin: 0;
  white-space: pre;
  overflow-x: auto;
}

.size-table {
  width: 100%;
  max-width: 680px;
  border-collapse: collapse;
  font-size: 14px;
}

.size-table th,
.size-table td {
  text-align: left;
  padding: 8px 12px;
  border: 1px solid #e0e0e0;
}

.size-table thead {
  background: #f5f5f5;
  font-weight: 600;
}

.size-table tbody tr:nth-child(even) {
  background: #fafafa;
}
</style>
