<template>
  <div class="container">
    <LineChart />
    <LineChartCompositionApi />
    <AreaChart />
    <BarChart />
    <MixedChart />
    <DonutChart />
  </div>
</template>

<script>
/* eslint-disable */
import AreaChart from "@/components/AreaChart.vue";
import BarChart from "@/components/BarChart.vue";
import LineChart from "@/components/LineChart.vue";
import LineChartCompositionApi from "@/components-composition-api/LineChart.vue";
import MixedChart from "@/components/MixedChart.vue";
import DonutChart from "@/components/DonutChart.vue";

export default {
  name: "Home",
  components: {
    AreaChart,
    BarChart,
    DonutChart,
    LineChart,
    MixedChart,
    LineChartCompositionApi,
  },
};
</script>
