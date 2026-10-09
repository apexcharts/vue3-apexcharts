import { defineComponent as $, ref as w, onBeforeMount as F, onMounted as G, getCurrentInstance as H, onBeforeUnmount as J, toRefs as N, watch as d, h as Q, nextTick as x } from "vue";
import j from "apexcharts/core";
const a = (o) => typeof o == "function" ? o : Array.isArray(o) ? o.map(a) : o !== null && typeof o == "object" ? Object.fromEntries(
  Object.entries(o).map(([m, f]) => [m, a(f)])
) : o, P = [
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
], A = $({
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
  emits: P,
  setup(o, { emit: m }) {
    const f = w(null), n = w(null), g = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, O = (e, t) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(s) {
          if (s == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let h = Object(s);
          for (let r = 1; r < arguments.length; r++) {
            let c = arguments[r];
            if (c != null)
              for (let y in c)
                c.hasOwnProperty(y) && (h[y] = c[y]);
          }
          return h;
        };
      }();
      let i = Object.assign({}, e);
      return g(e) && g(t) && Object.keys(t).forEach((s) => {
        g(t[s]) ? s in e ? i[s] = O(e[s], t[s]) : Object.assign(i, {
          [s]: t[s]
        }) : Object.assign(i, {
          [s]: t[s]
        });
      }), i;
    }, p = async () => {
      if (await x(), n.value)
        return;
      const e = {
        chart: {
          type: o.type || o.options.chart && o.options.chart.type || "line",
          height: o.height,
          width: o.width,
          events: {}
        },
        series: a(o.series)
      }, t = o.options.chart ? o.options.chart.events : null;
      P.forEach((s) => {
        let h = (...r) => m(s, ...r);
        e.chart.events[s] = (...r) => {
          h(...r), t && t.hasOwnProperty(s) && t[s](...r);
        };
      });
      const i = O(o.options, e);
      return n.value = new j(f.value, i), n.value.render();
    }, v = () => (b(), p()), b = () => {
      n.value.destroy(), n.value = null;
    }, C = (e, t) => n.value.updateSeries(e, t), E = (e, t, i, s) => n.value.updateOptions(e, t, i, s), M = (e) => n.value.toggleSeries(e), D = (e) => {
      n.value.showSeries(e);
    }, U = (e) => {
      n.value.hideSeries(e);
    }, L = (e, t) => n.value.appendSeries(e, t), R = () => {
      n.value.resetSeries();
    }, X = (e, t) => {
      n.value.toggleDataPointSelection(e, t);
    }, z = (e) => n.value.appendData(e), I = (e, t) => n.value.zoomX(e, t), _ = (e) => n.value.dataURI(e), B = (e) => n.value.setLocale(e), T = (e, t) => {
      n.value.addXaxisAnnotation(e, t);
    }, Y = (e, t) => {
      n.value.addYaxisAnnotation(e, t);
    }, Z = (e, t) => {
      n.value.addPointAnnotation(e, t);
    }, q = (e, t) => {
      n.value.removeAnnotation(e, t);
    }, K = () => {
      n.value.clearAnnotations();
    };
    F(() => {
      window.ApexCharts = j;
    }), G(() => {
      f.value = H().proxy.$el, p();
    }), J(() => {
      n.value && b();
    });
    const u = N(o);
    let l = null;
    const S = (e) => {
      l || (l = { options: !1, series: !1 }, x(() => {
        const t = l;
        if (l = null, !n.value) {
          p();
          return;
        }
        if (t.options && t.series) {
          const i = a(o.options);
          i.series = a(o.series), n.value.updateOptions(i);
        } else
          t.options ? n.value.updateOptions(a(o.options)) : t.series && n.value.updateSeries(a(o.series));
      })), l[e] = !0;
    };
    return d(u.options, () => {
      S("options");
    }), d(
      u.series,
      () => {
        S("series");
      },
      { deep: !0 }
    ), d(u.type, () => {
      v();
    }), d(u.width, () => {
      v();
    }), d(u.height, () => {
      v();
    }), {
      chart: n,
      init: p,
      refresh: v,
      destroy: b,
      updateOptions: E,
      updateSeries: C,
      toggleSeries: M,
      showSeries: D,
      hideSeries: U,
      resetSeries: R,
      zoomX: I,
      toggleDataPointSelection: X,
      appendData: z,
      appendSeries: L,
      addXaxisAnnotation: T,
      addYaxisAnnotation: Y,
      addPointAnnotation: Z,
      removeAnnotation: q,
      clearAnnotations: K,
      setLocale: B,
      dataURI: _
    };
  },
  render() {
    return Q("div", {
      class: "vue-apexcharts"
    });
  }
}), V = (o) => {
  o.component(A.name, A);
};
A.install = V;
export {
  A as default
};
