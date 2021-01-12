/* eslint-disable */
import Vue3Apexcharts from "./vue3-apexcharts";
import ApexCharts from 'apexcharts/dist/apexcharts.min';

const install = app => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
  app.config.globalProperties.$apexcharts = ApexCharts;
};

Vue3Apexcharts.install = install;

export default Vue3Apexcharts;
