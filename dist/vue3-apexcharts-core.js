import { defineComponent as K, ref as V, shallowRef as W, onBeforeMount as $, onMounted as F, getCurrentInstance as G, onBeforeUnmount as H, toRefs as J, watch as p, h as N, nextTick as x } from "vue";
import j from "apexcharts/core";
const b = (t, r) => {
  if (typeof t == "function" || t === null || typeof t != "object" || t instanceof Date || t instanceof RegExp)
    return t;
  if (r.has(t))
    return r.get(t);
  if (Array.isArray(t)) {
    const n = new Array(t.length);
    return r.set(t, n), t.forEach((u, v) => {
      n[v] = b(u, r);
    }), n;
  }
  const l = {};
  r.set(t, l);
  for (const [n, u] of Object.entries(t))
    l[n] = b(u, r);
  return l;
}, h = (t) => b(t, /* @__PURE__ */ new WeakMap()), P = [
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
], S = K({
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
  setup(t, { emit: r }) {
    const l = V(null), n = W(null), u = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, v = (e, o) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(s) {
          if (s == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let m = Object(s);
          for (let a = 1; a < arguments.length; a++) {
            let d = arguments[a];
            if (d != null)
              for (let A in d)
                d.hasOwnProperty(A) && (m[A] = d[A]);
          }
          return m;
        };
      }();
      let i = Object.assign({}, e);
      return u(e) && u(o) && Object.keys(o).forEach((s) => {
        u(o[s]) ? s in e ? i[s] = v(e[s], o[s]) : Object.assign(i, {
          [s]: o[s]
        }) : Object.assign(i, {
          [s]: o[s]
        });
      }), i;
    }, y = async () => {
      if (await x(), n.value)
        return;
      const e = {
        chart: {
          type: t.type || t.options.chart && t.options.chart.type || "line",
          height: t.height,
          width: t.width,
          events: {}
        },
        series: h(t.series)
      }, o = t.options.chart ? t.options.chart.events : null;
      P.forEach((s) => {
        let m = (...a) => r(s, ...a);
        e.chart.events[s] = (...a) => {
          m(...a), o && o.hasOwnProperty(s) && o[s](...a);
        };
      });
      const i = v(t.options, e);
      return n.value = new j(l.value, i), n.value.render();
    }, g = () => (w(), y()), w = () => {
      n.value.destroy(), n.value = null;
    }, C = (e, o) => n.value.updateSeries(e, o), E = (e, o, i, s) => n.value.updateOptions(e, o, i, s), M = (e) => n.value.toggleSeries(e), D = (e) => {
      n.value.showSeries(e);
    }, R = (e) => {
      n.value.hideSeries(e);
    }, U = (e, o) => n.value.appendSeries(e, o), L = () => {
      n.value.resetSeries();
    }, X = (e, o) => {
      n.value.toggleDataPointSelection(e, o);
    }, z = (e) => n.value.appendData(e), I = (e, o) => n.value.zoomX(e, o), _ = (e) => n.value.dataURI(e), B = (e) => n.value.setLocale(e), T = (e, o) => {
      n.value.addXaxisAnnotation(e, o);
    }, Y = (e, o) => {
      n.value.addYaxisAnnotation(e, o);
    }, Z = (e, o) => {
      n.value.addPointAnnotation(e, o);
    }, k = (e, o) => {
      n.value.removeAnnotation(e, o);
    }, q = () => {
      n.value.clearAnnotations();
    };
    $(() => {
      window.ApexCharts = j;
    }), F(() => {
      l.value = G().proxy.$el, y();
    }), H(() => {
      n.value && w();
    });
    const c = J(t);
    let f = null;
    const O = (e) => {
      f || (f = { options: !1, series: !1 }, x(() => {
        const o = f;
        if (f = null, !n.value) {
          y();
          return;
        }
        if (o.options && o.series) {
          const i = h(t.options);
          i.series = h(t.series), n.value.updateOptions(i);
        } else
          o.options ? n.value.updateOptions(h(t.options)) : o.series && n.value.updateSeries(h(t.series));
      })), f[e] = !0;
    };
    return p(c.options, () => {
      O("options");
    }), p(
      c.series,
      () => {
        O("series");
      },
      { deep: !0 }
    ), p(c.type, () => {
      g();
    }), p(c.width, () => {
      g();
    }), p(c.height, () => {
      g();
    }), {
      chart: n,
      init: y,
      refresh: g,
      destroy: w,
      updateOptions: E,
      updateSeries: C,
      toggleSeries: M,
      showSeries: D,
      hideSeries: R,
      resetSeries: L,
      zoomX: I,
      toggleDataPointSelection: X,
      appendData: z,
      appendSeries: U,
      addXaxisAnnotation: T,
      addYaxisAnnotation: Y,
      addPointAnnotation: Z,
      removeAnnotation: k,
      clearAnnotations: q,
      setLocale: B,
      dataURI: _
    };
  },
  render() {
    return N("div", {
      class: "vue-apexcharts"
    });
  }
}), Q = (t) => {
  t.component(S.name, S);
};
S.install = Q;
export {
  S as default
};
