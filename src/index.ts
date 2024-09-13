import Vue3Apexcharts from "./vue3-apexcharts";
import { App } from "vue";

export default {
    install(app: App) {
        app.component(Vue3Apexcharts.name, Vue3Apexcharts);
    }
}