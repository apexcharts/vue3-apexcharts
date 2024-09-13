import { defineComponent as M, ref as y, onBeforeMount as S, onMounted as B, getCurrentInstance as P, onBeforeUnmount as E, toRefs as q, watch as l, h as L, nextTick as N } from "vue";
import g from "apexcharts";
const R = [
  "animationEnd",
  "beforeMount",
  "mounted",
  "updated",
  "click",
  "mouseMove",
  "mouseLeave",
  "legendClick",
  "markerClick",
  "selection",
  "dataPointSelection",
  "dataPointMouseEnter",
  "dataPointMouseLeave",
  "beforeZoom",
  "beforeResetZoom",
  "zoomed",
  "scrolled",
  "brushScrolled"
], x = M({
  name: "ApexChart",
  props: {
    options: {
      type: Object,
      required: !0
    },
    type: {
      type: String,
      validator: (a) => [
        "line",
        "area",
        "bar",
        "pie",
        "donut",
        "radialBar",
        "scatter",
        "bubble",
        "heatmap",
        "candlestick",
        "boxPlot",
        "radar",
        "polarArea",
        "rangeBar",
        "rangeArea",
        "treemap"
      ].includes(a)
    },
    series: {
      type: Array,
      required: !0
    },
    width: {
      type: [String, Number],
      default: "100%"
    },
    height: {
      type: [String, Number],
      default: "auto"
    }
  },
  emits: ["events"],
  setup(a, { emit: w }) {
    const u = y(null), n = y(null), c = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, h = (e, t) => {
      let o = Object.assign({}, e);
      return c(e) && c(t) && Object.keys(t).forEach((r) => {
        c(t[r]) ? r in e ? o[r] = h(e[r], t[r]) : Object.assign(o, { [r]: t[r] }) : Object.assign(o, { [r]: t[r] });
      }), o;
    }, i = async () => {
      var r, p;
      if (await N(), n.value)
        return;
      const e = {
        chart: {
          type: a.type || ((r = a.options.chart) == null ? void 0 : r.type) || "line",
          height: a.height,
          width: a.width,
          events: {}
        },
        series: a.series
      }, t = (p = a.options.chart) == null ? void 0 : p.events;
      R.forEach((v) => {
        var b;
        const C = (...s) => w("events", ...s);
        (b = e.chart) != null && b.events && (e.chart.events[v] = (...s) => {
          var m;
          C(...s), t && v in t && ((m = t[v]) == null || m.call(t, ...s));
        });
      });
      const o = h(a.options, e);
      if (u.value)
        return n.value = new g(u.value, o), n.value.render();
    };
    S(() => {
      window.ApexCharts = g;
    }), B(() => {
      var t;
      const e = P();
      e && (u.value = (t = e.proxy) == null ? void 0 : t.$el, i());
    }), E(() => {
      n.value && n.value.destroy();
    });
    const { options: d, series: f, type: A, width: O, height: j } = q(a);
    return l(d, () => {
      var e;
      !n.value && d.value ? i() : (e = n.value) == null || e.updateOptions(d.value);
    }), l(
      f,
      () => {
        var e;
        !n.value && f.value ? i() : (e = n.value) == null || e.updateSeries(f.value);
      },
      { deep: !0 }
    ), l(A, () => {
      n.value && (n.value.destroy(), i());
    }), l([O, j], () => {
      n.value && (n.value.destroy(), i());
    }), {
      chart: n,
      init: i
      // ... (other methods)
    };
  },
  render() {
    return L("div", {
      class: "vue-apexcharts"
    });
  }
}), z = {
  install(a) {
    a.component(x.name, x);
  }
};
export {
  z as default
};
