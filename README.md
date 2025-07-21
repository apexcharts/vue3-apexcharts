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

## Download and Installation

##### Installing via npm

```bash
npm install --save apexcharts
npm install --save vue3-apexcharts
```

If you're looking for Vue 2.x.x compatibile component, check-out <a href="https://github.com/apexcharts/vue-apexcharts">vue-apexcharts</a>

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

## Running the examples

Basic Examples are included to show how to get started using ApexCharts with Vue 3 easily.

To run the examples,

```bash
cd demo
yarn install
yarn start
```

## Development

#### Install dependencies

```bash
yarn install
```

#### Bundling

```bash
yarn build
```
