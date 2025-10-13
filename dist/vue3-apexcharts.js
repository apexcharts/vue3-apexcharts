import { defineComponent as Z, ref as b, onBeforeMount as _, onMounted as q, getCurrentInstance as K, onBeforeUnmount as $, toRefs as F, watch as c, h as G, nextTick as H } from "vue";
import w from "apexcharts";
const A = [
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
], m = Z({
  name: "apexchart",
  props: {
    options: {
      type: Object
    },
    type: {
      type: String
    },
    series: {
      type: Array,
      required: !0
    },
    width: {
      default: "100%"
    },
    height: {
      default: "auto"
    }
  },
  // events emitted by this component
  emits: A,
  setup(a, { emit: x }) {
    const g = b(null), t = b(null), f = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, S = (e, n) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(o) {
          if (o == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let v = Object(o);
          for (let i = 1; i < arguments.length; i++) {
            let l = arguments[i];
            if (l != null)
              for (let p in l)
                l.hasOwnProperty(p) && (v[p] = l[p]);
          }
          return v;
        };
      }();
      let s = Object.assign({}, e);
      return f(e) && f(n) && Object.keys(n).forEach((o) => {
        f(n[o]) ? o in e ? s[o] = S(e[o], n[o]) : Object.assign(s, {
          [o]: n[o]
        }) : Object.assign(s, {
          [o]: n[o]
        });
      }), s;
    }, r = async () => {
      if (await H(), t.value)
        return;
      const e = {
        chart: {
          type: a.type || a.options.chart.type || "line",
          height: a.height,
          width: a.width,
          events: {}
        },
        series: a.series
      }, n = a.options.chart ? a.options.chart.events : null;
      A.forEach((o) => {
        let v = (...i) => x(o, ...i);
        e.chart.events[o] = (...i) => {
          v(...i), n && n.hasOwnProperty(o) && n[o](...i);
        };
      });
      const s = S(a.options, e);
      return t.value = new w(g.value, s), t.value.render();
    }, d = () => (h(), r()), h = () => {
      t.value.destroy(), t.value = null;
    }, O = (e, n) => t.value.updateSeries(e, n), y = (e, n, s, o) => t.value.updateOptions(e, n, s, o), j = (e) => t.value.toggleSeries(e), P = (e) => {
      t.value.showSeries(e);
    }, C = (e) => {
      t.value.hideSeries(e);
    }, E = (e, n) => t.value.appendSeries(e, n), M = () => {
      t.value.resetSeries();
    }, D = (e, n) => {
      t.value.toggleDataPointSelection(e, n);
    }, L = (e) => t.value.appendData(e), R = (e, n) => t.value.zoomX(e, n), X = (e) => t.value.dataURI(e), z = (e) => t.value.setLocale(e), I = (e, n) => {
      t.value.addXaxisAnnotation(e, n);
    }, U = (e, n) => {
      t.value.addYaxisAnnotation(e, n);
    }, B = (e, n) => {
      t.value.addPointAnnotation(e, n);
    }, T = (e, n) => {
      t.value.removeAnnotation(e, n);
    }, Y = () => {
      t.value.clearAnnotations();
    };
    _(() => {
      window.ApexCharts = w;
    }), q(() => {
      g.value = K().proxy.$el, r();
    }), $(() => {
      t.value && h();
    });
    const u = F(a);
    return c(u.options, () => {
      !t.value && a.options ? r() : t.value.updateOptions(a.options);
    }), c(
      u.series,
      () => {
        !t.value && a.series ? r() : t.value.updateSeries(a.series);
      },
      { deep: !0 }
    ), c(u.type, () => {
      d();
    }), c(u.width, () => {
      d();
    }), c(u.height, () => {
      d();
    }), {
      chart: t,
      init: r,
      refresh: d,
      destroy: h,
      updateOptions: y,
      updateSeries: O,
      toggleSeries: j,
      showSeries: P,
      hideSeries: C,
      resetSeries: M,
      zoomX: R,
      toggleDataPointSelection: D,
      appendData: L,
      appendSeries: E,
      addXaxisAnnotation: I,
      addYaxisAnnotation: U,
      addPointAnnotation: B,
      removeAnnotation: T,
      clearAnnotations: Y,
      setLocale: z,
      dataURI: X
    };
  },
  render() {
    return G("div", {
      class: "vue-apexcharts"
    });
  }
}), J = (a) => {
  a.component(m.name, m);
};
m.install = J;
export {
  m as default
};
