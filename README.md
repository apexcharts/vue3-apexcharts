<p align="center"><img src="https://apexcharts.com/media/vue-apexcharts.png"></p>

<p align="center">
  <a href="https://travis-ci.com/apexcharts/vue3-apexcharts"><img src="https://api.travis-ci.com/apexcharts/vue3-apexcharts.svg?branch=master" alt="build" /></a>
  <a href="https://www.npmjs.com/package/vue3-apexcharts"><img src="https://img.shields.io/npm/v/vue3-apexcharts.svg" alt="ver"></a>
</p>

<p align="center">
  <a href="https://twitter.com/intent/tweet?text=Vue3-ApexCharts%20A%20Vue.js%20Chart%20library%20built%20on%20ApexCharts.js&url=https://www.apexcharts.com&hashtags=javascript,charts,vue.js,vue,apexcharts"><img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=social"> </a>
</p>

<p align="center">Vue 3 component for <a href="https://github.com/apexcharts/apexcharts.js">ApexCharts</a> to build interactive visualizations in vue.</p>

<p align="center"><a href="https://apexcharts.com/vue-chart-demos/"><img src="https://apexcharts.com/media/apexcharts-banner.png"></a></p>

## Features

- Reactive chart updates — change props and the chart re-renders automatically
- **Tree-shaking** — import only the chart types and features you use via `vue3-apexcharts/core`
- **Server-Side Rendering (SSR)** — render charts to HTML on the server with `<apexchart-server>` and hydrate on the client with `<apexchart-hydrate>`
- Full TypeScript support

## Download and Installation

```bash
npm install apexcharts vue3-apexcharts
```

If you're looking for Vue 2.x.x compatible component, check-out <a href="https://github.com/apexcharts/vue-apexcharts">vue-apexcharts</a>

## Usage

```js
import VueApexCharts from "vue3-apexcharts";

const app = createApp(App);
app.use(VueApexCharts);
// The app.use(VueApexCharts) will make <apexchart> component available everywhere.
```

OR

```js
// you can import in a particular component and register the component like below
import VueApexCharts from "vue3-apexcharts";
export default {
  components: {
    apexchart: VueApexCharts,
  },
};
```

To provide a `$apexcharts` reference inside Vue instance

```ts
import ApexCharts from "apexcharts";

app.config.globalProperties.$apexcharts = ApexCharts;

// Add this when into a TypeScript codebase
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $apexcharts: typeof ApexCharts;
  }
}
```

To create a basic bar chart with minimal configuration, write as follows:

```vue
<template>
  <div>
    <apexchart
      width="500"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
  </div>
</template>
```

```js
export default {
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 35, 50, 49, 60, 70, 91],
        },
      ],
    };
  },
};
```

This will render the following chart

<p><a href="https://apexcharts.com/javascript-chart-demos/column-charts/"><img src="https://apexcharts.com/media/first-bar-chart.svg"></a></p>

### How do I update the chart?

Simple! Just change the `series` or any `option` and it will automatically re-render the chart. <br/> Click on the below example to see this in action

<p><img src="https://apexcharts.com/media/vue-chart-updation.gif"></p>

```vue
<template>
  <div class="app">
    <apexchart
      width="550"
      type="bar"
      :options="chartOptions"
      :series="series"
    ></apexchart>
    <div>
      <button @click="updateChart">Update!</button>
    </div>
  </div>
</template>
```

```js
export default {
  data: function () {
    return {
      chartOptions: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      series: [
        {
          name: "series-1",
          data: [30, 40, 45, 50, 49, 60, 70, 81],
        },
      ],
    };
  },
  methods: {
    updateChart() {
      const max = 90;
      const min = 20;
      const newData = this.series[0].data.map(() => {
        return Math.floor(Math.random() * (max - min + 1)) + min;
      });

      const colors = ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"];

      // Make sure to update the whole options config and not just a single property to allow the Vue watch catch the change.
      this.chartOptions = {
        colors: [colors[Math.floor(Math.random() * colors.length)]],
      };
      // In the same way, update the series option
      this.series = [
        {
          data: newData,
        },
      ];
    },
  },
};
```

**Important:** While updating the options, make sure to update the outermost property even when you need to update the nested property.

✅ Do this

```javascript
this.chartOptions = {
  ...this.chartOptions,
  ...{
    xaxis: {
      labels: {
        style: {
          colors: ["red"],
        },
      },
    },
  },
};
```

❌ Not this

```javascript
this.chartOptions.xaxis = {
    labels: {
        style: {
          colors: ['red']
        }
    }
}}
```

## Props

| Prop         | Type          | Description                                                                                                                                                                                      |
| ------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **series\*** | Array         | The series is an array which accepts an object in the following format. To know more about the format of dataSeries, checkout [Series](https://apexcharts.com/docs/series/) docs on the website. |
| **type\***   | String        | `line`, `area`, `bar`, `pie`, `donut`, `scatter`, `bubble`, `heatmap`, `radialBar`, `candlestick`                                                                                                |
| **width**    | Number/String | Possible values for width can be `100%` or `400px` or `400`                                                                                                                                      |
| **height**   | Number/String | Possible values for height can be `100%` or `300px` or `300`                                                                                                                                     |
| **options**  | Object        | The configuration object, see options on [API (Reference)](https://apexcharts.com/docs/options/chart/type/)                                                                                      |

## Methods

You don't actually need to call updateSeries() or updateOptions() manually. Changing the props will automatically update the chart. You only need to call these methods to update the chart forcefully.

| Method                                                                                   | Description                                                                                        |
| ---------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| <a href="https://apexcharts.com/docs/methods/#updateSeries">updateSeries</a>             | Allows you to update the series array overriding the existing one                                  |
| <a href="https://apexcharts.com/docs/methods/#updateOptions">updateOptions</a>           | Allows you to update the configuration object                                                      |
| <a href="https://apexcharts.com/docs/methods/#toggleSeries">toggleSeries</a>             | Allows you to toggle the visibility of series programatically. Useful when you have custom legend. |
| <a href="https://apexcharts.com/docs/methods/#appendData">appendData</a>                 | Allows you to append new data to the series array.                                                 |
| <a href="https://apexcharts.com/docs/methods/#addxaxisannotation">addXaxisAnnotation</a> | Draw x-axis annotations after chart is rendered.                                                   |
| <a href="https://apexcharts.com/docs/methods/#addyaxisannotation">addYaxisAnnotation</a> | Draw y-axis annotations after chart is rendered.                                                   |
| <a href="https://apexcharts.com/docs/methods/#addpointannotation">addPointAnnotation</a> | Draw point (xy) annotations after chart is rendered.                                               |

## How to call methods of ApexCharts without referencing the chart element?

Sometimes, you may want to call methods of the core ApexCharts library from some other place, and you can do so on `window.ApexCharts` global variable directly. You need to target the chart by <code>chart.id</code> while calling this method

Example

```js
window.ApexCharts.exec("vuechart-example", "updateSeries", [
  {
    data: [40, 55, 65, 11, 23, 44, 54, 33],
  },
]);
```

In the above method, `vuechart-example` is the ID of chart, `updateSeries` is the name of the method you want to call and the third parameter is the new Series you want to update.

More info on the `.exec()` method can be found <a href="https://apexcharts.com/docs/methods/#exec">here</a>

All other methods of ApexCharts can be called the same way.

## Tree-Shaking (Core Entry)

The default entry (`vue3-apexcharts`) bundles the full ApexCharts library. If you want to reduce your bundle size by importing only the chart types and features you need, use the **core** entry point:

```js
import VueApexCharts from "vue3-apexcharts/core";

// Import by the exact chart type name you use in :type or chart.type
import "apexcharts/line";
import "apexcharts/bar";
import "apexcharts/donut";
import "apexcharts/treemap";

// Import only the features you need
import "apexcharts/features/legend";
import "apexcharts/features/toolbar";

const app = createApp(App);
app.use(VueApexCharts);
```

The core entry imports ApexCharts from `apexcharts/core`, which is the bare class with only tooltip included. You must explicitly import the chart types and optional features your app uses.

Each chart type has its own import that matches the type name you pass to the component — no need to know which internal module it maps to:

**Chart types:**

| Import | type string |
|--------|-------------|
| `apexcharts/line` | `"line"` |
| `apexcharts/area` | `"area"` |
| `apexcharts/scatter` | `"scatter"` |
| `apexcharts/bubble` | `"bubble"` |
| `apexcharts/rangeArea` | `"rangeArea"` |
| `apexcharts/bar` | `"bar"` |
| `apexcharts/column` | `"column"` |
| `apexcharts/barStacked` | `"barStacked"` |
| `apexcharts/rangeBar` | `"rangeBar"` |
| `apexcharts/pie` | `"pie"` |
| `apexcharts/donut` | `"donut"` |
| `apexcharts/polarArea` | `"polarArea"` |
| `apexcharts/radialBar` | `"radialBar"` |
| `apexcharts/radar` | `"radar"` |
| `apexcharts/candlestick` | `"candlestick"` |
| `apexcharts/boxPlot` | `"boxPlot"` |
| `apexcharts/heatmap` | `"heatmap"` |
| `apexcharts/treemap` | `"treemap"` |

**Optional features:**
| Import | Description |
|--------|-------------|
| `apexcharts/features/legend` | Chart legend |
| `apexcharts/features/toolbar` | Toolbar (zoom, pan, download) |
| `apexcharts/features/annotations` | X/Y-axis and point annotations |
| `apexcharts/features/exports` | PNG/SVG/CSV export |
| `apexcharts/features/keyboard` | Keyboard navigation & accessibility |

> **Note:** Tree-shaking requires ApexCharts v5.8.1+.

### Vite: preventing "chart type X is not registered" errors

Vite's dependency pre-bundler can create two separate copies of the ApexCharts module — one for `apexcharts/core` and separate ones for each sub-entry — causing registrations to be lost. If you see this error even though you have the correct imports, add your apexcharts entries to `optimizeDeps.include`:

```js
// vite.config.js
export default {
  optimizeDeps: {
    include: [
      'apexcharts/core',
      'apexcharts/line',
      'apexcharts/bar',
      // ...all apexcharts/* entries you import
      'apexcharts/features/legend',
      'apexcharts/features/toolbar',
    ],
  },
}
```

This forces Vite to pre-bundle all sub-entries together so they share a single ApexCharts instance and all registrations are preserved.

## Server-Side Rendering (SSR)

Vue3-ApexCharts includes dedicated components for SSR that work with Nuxt 3 and other Vue SSR frameworks.

> **Note:** SSR support requires ApexCharts v5.6.0+.

### Nuxt 3 Setup

Register the plugin so that components are available during both server and client render passes:

```ts
// plugins/apexcharts.ts
import VueApexCharts from "vue3-apexcharts";

export default defineNuxtPlugin({
  name: "apexcharts",
  parallel: true,
  setup(nuxtApp) {
    nuxtApp.vueApp.use(VueApexCharts);
  },
});
```

### Server-Side Rendering with `<apexchart-server>`

Render charts to HTML on the server — the chart markup is included in the initial page load for better SEO and faster perceived performance:

```vue
<template>
  <apexchart-server
    type="bar"
    :series="series"
    :options="options"
    :width="500"
    :height="300"
  />
</template>

<script setup>
const series = [{ data: [30, 40, 35, 50, 49, 60, 70] }];
const options = {
  chart: { type: "bar" },
  xaxis: { categories: ["A", "B", "C", "D", "E", "F", "G"] },
};
</script>
```

### SSR + Client Hydration

For interactive charts, pair server rendering with client-side hydration. The chart is rendered on the server, then `<apexchart-hydrate>` finds all server-rendered charts on the page and attaches client-side interactivity (tooltips, animations, click handlers):

```vue
<template>
  <apexchart-server
    type="line"
    :series="series"
    :options="options"
    :width="700"
    :height="350"
  />

  <!-- Place once per page — hydrates all server-rendered charts -->
  <apexchart-hydrate
    :client-options="{
      chart: { animations: { enabled: true } },
    }"
  />
</template>

<script setup>
const series = [{ name: "Sales", data: [30, 40, 35, 50, 49, 60, 70] }];
const options = {
  chart: { type: "line" },
  xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] },
};
</script>
```

### Client-Only Rendering (Traditional)

For purely client-side rendering in Nuxt, wrap the standard component in `<ClientOnly>`:

```vue
<template>
  <ClientOnly>
    <apexchart
      type="bar"
      :series="series"
      :options="options"
      width="500"
      height="300"
    />
  </ClientOnly>
</template>
```

### SSR Component Reference

#### `<apexchart-server>`

| Prop          | Type          | Default  | Description                 |
| ------------- | ------------- | -------- | --------------------------- |
| **type**      | String        | `'line'` | Chart type                  |
| **width**     | Number/String | `400`    | Chart width                 |
| **height**    | Number/String | `300`    | Chart height                |
| **series**    | Array         | `[]`     | Chart data series           |
| **options**   | Object        | `{}`     | ApexCharts configuration    |
| **className** | String        | `''`     | CSS class for the container |

#### `<apexchart-hydrate>`

| Prop              | Type   | Default                       | Description                                 |
| ----------------- | ------ | ----------------------------- | ------------------------------------------- |
| **clientOptions** | Object | `{}`                          | Client-side options merged during hydration |
| **selector**      | String | `'[data-apexcharts-hydrate]'` | CSS selector for charts to hydrate          |

## Running the examples

Basic Examples are included to show how to get started using ApexCharts with Vue 3 easily.

```bash
cd demo
npm install
npm run dev
```

An SSR demo using Nuxt 3 is also available:

```bash
cd demo-ssr
npm install
npm run dev
```

## Development

#### Install dependencies

```bash
npm install
```

#### Bundling

```bash
npm run build
```

#### Running tests

```bash
npm test
```
