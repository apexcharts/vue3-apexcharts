<template>
  <div>
    <div class="header">
      <h1>Vue3 Apexcharts</h1>
      <h3></h3>
    </div>

    <div class="container">
      <LineChart />
      <AreaChart />
      <BarChart />
      <MixedChart />
      <DonutChart />
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import AreaChart from "@/components/AreaChart.vue";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import MixedChart from "@/components/MixedChart.vue";
import DonutChart from "@/components/DonutChart.vue";

export default {
  name: "App",
  components: {
    AreaChart,
    BarChart,
    DonutChart,
    LineChart,
    MixedChart
  },
  data: function() {
    return {};
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 12px;
}

.container {
  display: flex;
  flex-direction: column;
  padding: 0 24px;
}

.container__item {
  padding: 12px;
  width: 100%;
  margin-top: 24px;
}

.example {
  margin: 0 auto 40px;
  border-bottom: 2px solid #aaa;
  padding-bottom: 20px;
}
</style>
