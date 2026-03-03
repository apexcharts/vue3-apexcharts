/* eslint-disable */
import Vue3Apexcharts from "./vue3-apexcharts";
import ApexChartsServer from "./ApexChartsServer.vue";
import ApexChartsHydrate from "./ApexChartsHydrate.vue";

const install = app => {
  app.component(Vue3Apexcharts.name, Vue3Apexcharts);
  app.component(ApexChartsServer.name, ApexChartsServer);
  app.component(ApexChartsHydrate.name, ApexChartsHydrate);
};

Vue3Apexcharts.install = install;

export default Vue3Apexcharts;
export { ApexChartsServer, ApexChartsHydrate };
