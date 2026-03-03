/* eslint-disable */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import VueApexCharts from "../../src/index.js";

const app = createApp(App);
app.use(router);
app.use(VueApexCharts);
app.mount("#app");
