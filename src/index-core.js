/* eslint-disable */
/**
 * Core entry point for vue3-apexcharts.
 *
 * Use this when you want tree-shakeable ApexCharts bundles. This entry imports
 * ApexCharts from 'apexcharts/core' (bare class, tooltip always included).
 * No optional features (Exports, Legend, Toolbar, Annotations, KeyboardNavigation)
 * are registered — import only what you need:
 *
 *   import 'apexcharts/features/legend'
 *   import 'apexcharts/features/toolbar'
 *   import 'apexcharts/features/annotations'
 *   import 'apexcharts/features/exports'
 *   import 'apexcharts/features/keyboard'
 *
 * Example:
 *
 *   import VueApexCharts from 'vue3-apexcharts/core'
 *   import 'apexcharts/line'
 *   import 'apexcharts/features/legend'
 *
 *   app.use(VueApexCharts)
 */
import VueApexChartsCore from "./vue3-apexcharts-core";

const install = (app) => {
  app.component(VueApexChartsCore.name, VueApexChartsCore);
};

VueApexChartsCore.install = install;

export default VueApexChartsCore;
