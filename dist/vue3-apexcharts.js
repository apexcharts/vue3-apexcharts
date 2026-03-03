import { defineComponent as A, ref as w, onBeforeMount as K, onMounted as L, getCurrentInstance as G, onBeforeUnmount as E, toRefs as Q, watch as f, h as V, nextTick as j, onServerPrefetch as W, openBlock as ee, createElementBlock as te, normalizeClass as ne } from "vue";
import _ from "apexcharts";
const C = [
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
], x = A({
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
  emits: C,
  setup(t, { emit: s }) {
    const r = w(null), n = w(null), l = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, g = (e, o) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(a) {
          if (a == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let m = Object(a);
          for (let c = 1; c < arguments.length; c++) {
            let p = arguments[c];
            if (p != null)
              for (let O in p)
                p.hasOwnProperty(O) && (m[O] = p[O]);
          }
          return m;
        };
      }();
      let i = Object.assign({}, e);
      return l(e) && l(o) && Object.keys(o).forEach((a) => {
        l(o[a]) ? a in e ? i[a] = g(e[a], o[a]) : Object.assign(i, {
          [a]: o[a]
        }) : Object.assign(i, {
          [a]: o[a]
        });
      }), i;
    }, u = (e) => JSON.parse(JSON.stringify(e)), v = async () => {
      if (await j(), n.value)
        return;
      const e = {
        chart: {
          type: t.type || t.options.chart && t.options.chart.type || "line",
          height: t.height,
          width: t.width,
          events: {}
        },
        series: u(t.series)
      }, o = t.options.chart ? t.options.chart.events : null;
      C.forEach((a) => {
        let m = (...c) => s(a, ...c);
        e.chart.events[a] = (...c) => {
          m(...c), o && o.hasOwnProperty(a) && o[a](...c);
        };
      });
      const i = g(t.options, e);
      return n.value = new _(r.value, i), n.value.render();
    }, y = () => (S(), v()), S = () => {
      n.value.destroy(), n.value = null;
    }, T = (e, o) => n.value.updateSeries(e, o), H = (e, o, i, a) => n.value.updateOptions(e, o, i, a), N = (e) => n.value.toggleSeries(e), $ = (e) => {
      n.value.showSeries(e);
    }, D = (e) => {
      n.value.hideSeries(e);
    }, U = (e, o) => n.value.appendSeries(e, o), z = () => {
      n.value.resetSeries();
    }, B = (e, o) => {
      n.value.toggleDataPointSelection(e, o);
    }, I = (e) => n.value.appendData(e), R = (e, o) => n.value.zoomX(e, o), X = (e) => n.value.dataURI(e), k = (e) => n.value.setLocale(e), F = (e, o) => {
      n.value.addXaxisAnnotation(e, o);
    }, J = (e, o) => {
      n.value.addYaxisAnnotation(e, o);
    }, Y = (e, o) => {
      n.value.addPointAnnotation(e, o);
    }, Z = (e, o) => {
      n.value.removeAnnotation(e, o);
    }, q = () => {
      n.value.clearAnnotations();
    };
    K(() => {
      window.ApexCharts = _;
    }), L(() => {
      r.value = G().proxy.$el, v();
    }), E(() => {
      n.value && S();
    });
    const d = Q(t);
    let h = null;
    const b = (e) => {
      h || (h = { options: !1, series: !1 }, j(() => {
        const o = h;
        if (h = null, !n.value) {
          v();
          return;
        }
        if (o.options && o.series) {
          const i = u(t.options);
          i.series = u(t.series), n.value.updateOptions(i);
        } else
          o.options ? n.value.updateOptions(u(t.options)) : o.series && n.value.updateSeries(u(t.series));
      })), h[e] = !0;
    };
    return f(d.options, () => {
      b("options");
    }), f(
      d.series,
      () => {
        b("series");
      },
      { deep: !0 }
    ), f(d.type, () => {
      y();
    }), f(d.width, () => {
      y();
    }), f(d.height, () => {
      y();
    }), {
      chart: n,
      init: v,
      refresh: y,
      destroy: S,
      updateOptions: H,
      updateSeries: T,
      toggleSeries: N,
      showSeries: $,
      hideSeries: D,
      resetSeries: z,
      zoomX: R,
      toggleDataPointSelection: B,
      appendData: I,
      appendSeries: U,
      addXaxisAnnotation: F,
      addYaxisAnnotation: J,
      addPointAnnotation: Y,
      removeAnnotation: Z,
      clearAnnotations: q,
      setLocale: k,
      dataURI: X
    };
  },
  render() {
    return V("div", {
      class: "vue-apexcharts"
    });
  }
}), oe = (t, s) => {
  const r = t.__vccOpts || t;
  for (const [n, l] of s)
    r[n] = l;
  return r;
}, ae = A({
  name: "apexchart-server",
  props: {
    type: {
      type: String,
      default: "line"
    },
    width: {
      type: [Number, String],
      default: 400
    },
    height: {
      type: [Number, String],
      default: 300
    },
    series: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => ({})
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(t) {
    const s = w("");
    return W(async () => {
      try {
        const { default: r } = await import("./apexcharts.ssr.esm-fe46cd2d.js"), n = Object.assign({}, t.options, {
          chart: Object.assign({}, t.options.chart, {
            type: t.type,
            width: t.width,
            height: t.height
          }),
          series: t.series
        });
        s.value = await r.renderToHTML(n, {
          width: t.width,
          height: t.height
        });
      } catch (r) {
        console.error("Failed to render ApexChart on server:", r);
      }
    }), {
      chartHTML: s
    };
  }
}), re = ["innerHTML"];
function se(t, s, r, n, l, g) {
  return ee(), te("div", {
    innerHTML: t.chartHTML,
    class: ne(t.className)
  }, null, 10, re);
}
const M = /* @__PURE__ */ oe(ae, [["render", se]]), P = A({
  name: "apexchart-hydrate",
  props: {
    clientOptions: {
      type: Object,
      default: () => ({})
    },
    selector: {
      type: String,
      default: "[data-apexcharts-hydrate]"
    }
  },
  setup(t) {
    let s = [];
    L(async () => {
      try {
        const { default: r } = await import("./apexcharts.ssr.esm-fe46cd2d.js");
        s = r.hydrateAll(t.selector, t.clientOptions);
      } catch (r) {
        console.error("Failed to hydrate ApexCharts:", r);
      }
    }), E(() => {
      s.forEach((r) => {
        r && r.destroy && r.destroy();
      }), s = [];
    });
  },
  render() {
    return null;
  }
}), ie = (t) => {
  t.component(x.name, x), t.component(M.name, M), t.component(P.name, P);
};
x.install = ie;
export {
  P as ApexChartsHydrate,
  M as ApexChartsServer,
  x as default
};
