import ApexCharts, { ApexOptions } from "apexcharts";
import { DefineComponent, Plugin } from "vue";

export interface VueApexChartsComponentProps {
  // data
  readonly chart?: ApexCharts;
  // props
  options?: ApexOptions;
  type?:
    | "line"
    | "area"
    | "bar"
    | "histogram"
    | "pie"
    | "donut"
    | "radialBar"
    | "rangeBar"
    | "scatter"
    | "bubble"
    | "heatmap"
    | "candlestick"
    | "radar"
    | "polarArea";
  series: any;
  width?: string | number;
  height?: string | number;
}

export interface VueApexChartsComponentMethods {
  init(): Promise<void>;
  refresh(): Promise<void>;
  destroy(): void;
  updateOptions(
    options: any,
    redrawPaths?: boolean,
    animate?: boolean,
    updateSyncedCharts?: boolean
  ): Promise<void>;
  updateSeries(newSeries: any, animate?: boolean): Promise<void>;
  toggleSeries(seriesName: string): any;
  highlightSeries(seriesName: string): any;
  showSeries(seriesName: string): void;
  hideSeries(seriesName: string): void;
  resetSeries(): void;
  zoomX(min: number, max: number): void;
  toggleDataPointSelection(seriesIndex: number, dataPointIndex?: number): any;
  appendData(newData: any): Promise<void>;
  appendSeries(newSeries: any, animate?: boolean): Promise<void>;
  addXaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
  addYaxisAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
  addPointAnnotation(options: any, pushToMemory?: boolean, context?: any): void;
  removeAnnotation(id: string, options?: any): void;
  clearAnnotations(): void;
  dataURI(options?: { scale?: number; width?: number }): Promise<void>;
}

type VueApexChartsComponentType = DefineComponent<VueApexChartsComponentProps, VueApexChartsComponentMethods>;

declare const VueApexCharts: VueApexChartsComponentType & Plugin;

export default VueApexCharts;
