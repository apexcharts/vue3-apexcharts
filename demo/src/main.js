/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
//import VueApexCharts from "vue3-apexcharts";
import VueApexCharts from "../../dist/vue3-apexcharts.common";

const app = createApp(App);
app.use(VueApexCharts);
app.mount("#app");
