import { defineComponent as w, ref as b, onBeforeMount as G, onMounted as E, getCurrentInstance as J, onBeforeUnmount as L, toRefs as Q, watch as f, h as V, nextTick as j, onServerPrefetch as W, openBlock as ee, createElementBlock as te, normalizeClass as ne } from "vue";
import _ from "apexcharts";
const l = (e) => typeof e == "function" ? e : Array.isArray(e) ? e.map(l) : e !== null && typeof e == "object" ? Object.fromEntries(
  Object.entries(e).map(([a, r]) => [a, l(r)])
) : e, C = [
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
], S = w({
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
  setup(e, { emit: a }) {
    const r = b(null), n = b(null), u = (t) => t && typeof t == "object" && !Array.isArray(t) && t != null, g = (t, o) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(s) {
          if (s == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let m = Object(s);
          for (let c = 1; c < arguments.length; c++) {
            let p = arguments[c];
            if (p != null)
              for (let O in p)
                p.hasOwnProperty(O) && (m[O] = p[O]);
          }
          return m;
        };
      }();
      let i = Object.assign({}, t);
      return u(t) && u(o) && Object.keys(o).forEach((s) => {
        u(o[s]) ? s in t ? i[s] = g(t[s], o[s]) : Object.assign(i, {
          [s]: o[s]
        }) : Object.assign(i, {
          [s]: o[s]
        });
      }), i;
    }, v = async () => {
      if (await j(), n.value)
        return;
      const t = {
        chart: {
          type: e.type || e.options.chart && e.options.chart.type || "line",
          height: e.height,
          width: e.width,
          events: {}
        },
        series: l(e.series)
      }, o = e.options.chart ? e.options.chart.events : null;
      C.forEach((s) => {
        let m = (...c) => a(s, ...c);
        t.chart.events[s] = (...c) => {
          m(...c), o && o.hasOwnProperty(s) && o[s](...c);
        };
      });
      const i = g(e.options, t);
      return n.value = new _(r.value, i), n.value.render();
    }, y = () => (A(), v()), A = () => {
      n.value.destroy(), n.value = null;
    }, T = (t, o) => n.value.updateSeries(t, o), H = (t, o, i, s) => n.value.updateOptions(t, o, i, s), $ = (t) => n.value.toggleSeries(t), D = (t) => {
      n.value.showSeries(t);
    }, U = (t) => {
      n.value.hideSeries(t);
    }, z = (t, o) => n.value.appendSeries(t, o), B = () => {
      n.value.resetSeries();
    }, I = (t, o) => {
      n.value.toggleDataPointSelection(t, o);
    }, N = (t) => n.value.appendData(t), R = (t, o) => n.value.zoomX(t, o), X = (t) => n.value.dataURI(t), k = (t) => n.value.setLocale(t), F = (t, o) => {
      n.value.addXaxisAnnotation(t, o);
    }, Y = (t, o) => {
      n.value.addYaxisAnnotation(t, o);
    }, Z = (t, o) => {
      n.value.addPointAnnotation(t, o);
    }, q = (t, o) => {
      n.value.removeAnnotation(t, o);
    }, K = () => {
      n.value.clearAnnotations();
    };
    G(() => {
      window.ApexCharts = _;
    }), E(() => {
      r.value = J().proxy.$el, v();
    }), L(() => {
      n.value && A();
    });
    const d = Q(e);
    let h = null;
    const x = (t) => {
      h || (h = { options: !1, series: !1 }, j(() => {
        const o = h;
        if (h = null, !n.value) {
          v();
          return;
        }
        if (o.options && o.series) {
          const i = l(e.options);
          i.series = l(e.series), n.value.updateOptions(i);
        } else
          o.options ? n.value.updateOptions(l(e.options)) : o.series && n.value.updateSeries(l(e.series));
      })), h[t] = !0;
    };
    return f(d.options, () => {
      x("options");
    }), f(
      d.series,
      () => {
        x("series");
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
      destroy: A,
      updateOptions: H,
      updateSeries: T,
      toggleSeries: $,
      showSeries: D,
      hideSeries: U,
      resetSeries: B,
      zoomX: R,
      toggleDataPointSelection: I,
      appendData: N,
      appendSeries: z,
      addXaxisAnnotation: F,
      addYaxisAnnotation: Y,
      addPointAnnotation: Z,
      removeAnnotation: q,
      clearAnnotations: K,
      setLocale: k,
      dataURI: X
    };
  },
  render() {
    return V("div", {
      class: "vue-apexcharts"
    });
  }
}), oe = (e, a) => {
  const r = e.__vccOpts || e;
  for (const [n, u] of a)
    r[n] = u;
  return r;
}, re = w({
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
  setup(e) {
    const a = b("");
    return W(async () => {
      try {
        const { default: r } = await import("apexcharts/ssr"), n = Object.assign({}, e.options, {
          chart: Object.assign({}, e.options.chart, {
            type: e.type,
            width: e.width,
            height: e.height
          }),
          series: e.series
        });
        a.value = await r.renderToHTML(n, {
          width: e.width,
          height: e.height
        });
      } catch (r) {
        console.error("Failed to render ApexChart on server:", r);
      }
    }), {
      chartHTML: a
    };
  }
}), se = ["innerHTML"];
function ae(e, a, r, n, u, g) {
  return ee(), te("div", {
    innerHTML: e.chartHTML,
    class: ne(e.className)
  }, null, 10, se);
}
const M = /* @__PURE__ */ oe(re, [["render", ae]]), P = w({
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
  setup(e) {
    let a = [];
    E(async () => {
      try {
        const { default: r } = await import("apexcharts/ssr");
        a = r.hydrateAll(e.selector, e.clientOptions);
      } catch (r) {
        console.error("Failed to hydrate ApexCharts:", r);
      }
    }), L(() => {
      a.forEach((r) => {
        r && r.destroy && r.destroy();
      }), a = [];
    });
  },
  render() {
    return null;
  }
}), ie = (e) => {
  e.component(S.name, S), e.component(M.name, M), e.component(P.name, P);
};
S.install = ie;
export {
  P as ApexChartsHydrate,
  M as ApexChartsServer,
  S as default
};
