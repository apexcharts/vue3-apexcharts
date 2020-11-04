import ApexCharts from "apexcharts";
import Vue3ApexCharts from './ApexCharts.component';

window.ApexCharts = ApexCharts;

const install = (app) => {
    window.ApexCharts = ApexCharts;
    app.component(Vue3ApexCharts.name, Vue3ApexCharts);
};

Vue3ApexCharts.install = install;

export default Vue3ApexCharts