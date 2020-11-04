/* eslint-disable */
import Vue3Apexcharts from "./vue3-apexcharts";

const install = app => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
};

Vue3Apexcharts.install = install;

export default Vue3Apexcharts;
