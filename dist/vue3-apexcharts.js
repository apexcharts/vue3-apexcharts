import { defineComponent as S, ref as E, shallowRef as W, onBeforeMount as G, onMounted as L, getCurrentInstance as J, onBeforeUnmount as T, toRefs as Q, watch as p, h as ee, nextTick as j, onServerPrefetch as te, openBlock as ne, createElementBlock as oe, normalizeClass as re } from "vue";
import _ from "apexcharts";
const x = (e, a) => {
  if (typeof e == "function" || e === null || typeof e != "object" || e instanceof Date || e instanceof RegExp)
    return e;
  if (a.has(e))
    return a.get(e);
  if (Array.isArray(e)) {
    const n = new Array(e.length);
    return a.set(e, n), e.forEach((c, u) => {
      n[u] = x(c, a);
    }), n;
  }
  const r = {};
  a.set(e, r);
  for (const [n, c] of Object.entries(e))
    r[n] = x(c, a);
  return r;
}, v = (e) => x(e, /* @__PURE__ */ new WeakMap()), C = [
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
], O = S({
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
    const r = E(null), n = W(null), c = (t) => t && typeof t == "object" && !Array.isArray(t) && t != null, u = (t, o) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(s) {
          if (s == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let g = Object(s);
          for (let l = 1; l < arguments.length; l++) {
            let f = arguments[l];
            if (f != null)
              for (let A in f)
                f.hasOwnProperty(A) && (g[A] = f[A]);
          }
          return g;
        };
      }();
      let i = Object.assign({}, t);
      return c(t) && c(o) && Object.keys(o).forEach((s) => {
        c(o[s]) ? s in t ? i[s] = u(t[s], o[s]) : Object.assign(i, {
          [s]: o[s]
        }) : Object.assign(i, {
          [s]: o[s]
        });
      }), i;
    }, y = async () => {
      if (await j(), n.value)
        return;
      const t = {
        chart: {
          type: e.type || e.options.chart && e.options.chart.type || "line",
          height: e.height,
          width: e.width,
          events: {}
        },
        series: v(e.series)
      }, o = e.options.chart ? e.options.chart.events : null;
      C.forEach((s) => {
        let g = (...l) => a(s, ...l);
        t.chart.events[s] = (...l) => {
          g(...l), o && o.hasOwnProperty(s) && o[s](...l);
        };
      });
      const i = u(e.options, t);
      return n.value = new _(r.value, i), n.value.render();
    }, m = () => (w(), y()), w = () => {
      n.value.destroy(), n.value = null;
    }, D = (t, o) => n.value.updateSeries(t, o), H = (t, o, i, s) => n.value.updateOptions(t, o, i, s), R = (t) => n.value.toggleSeries(t), $ = (t) => {
      n.value.showSeries(t);
    }, U = (t) => {
      n.value.hideSeries(t);
    }, k = (t, o) => n.value.appendSeries(t, o), z = () => {
      n.value.resetSeries();
    }, B = (t, o) => {
      n.value.toggleDataPointSelection(t, o);
    }, I = (t) => n.value.appendData(t), N = (t, o) => n.value.zoomX(t, o), X = (t) => n.value.dataURI(t), F = (t) => n.value.setLocale(t), Y = (t, o) => {
      n.value.addXaxisAnnotation(t, o);
    }, Z = (t, o) => {
      n.value.addYaxisAnnotation(t, o);
    }, q = (t, o) => {
      n.value.addPointAnnotation(t, o);
    }, K = (t, o) => {
      n.value.removeAnnotation(t, o);
    }, V = () => {
      n.value.clearAnnotations();
    };
    G(() => {
      window.ApexCharts = _;
    }), L(() => {
      r.value = J().proxy.$el, y();
    }), T(() => {
      n.value && w();
    });
    const d = Q(e);
    let h = null;
    const b = (t) => {
      h || (h = { options: !1, series: !1 }, j(() => {
        const o = h;
        if (h = null, !n.value) {
          y();
          return;
        }
        if (o.options && o.series) {
          const i = v(e.options);
          i.series = v(e.series), n.value.updateOptions(i);
        } else
          o.options ? n.value.updateOptions(v(e.options)) : o.series && n.value.updateSeries(v(e.series));
      })), h[t] = !0;
    };
    return p(d.options, () => {
      b("options");
    }), p(
      d.series,
      () => {
        b("series");
      },
      { deep: !0 }
    ), p(d.type, () => {
      m();
    }), p(d.width, () => {
      m();
    }), p(d.height, () => {
      m();
    }), {
      chart: n,
      init: y,
      refresh: m,
      destroy: w,
      updateOptions: H,
      updateSeries: D,
      toggleSeries: R,
      showSeries: $,
      hideSeries: U,
      resetSeries: z,
      zoomX: N,
      toggleDataPointSelection: B,
      appendData: I,
      appendSeries: k,
      addXaxisAnnotation: Y,
      addYaxisAnnotation: Z,
      addPointAnnotation: q,
      removeAnnotation: K,
      clearAnnotations: V,
      setLocale: F,
      dataURI: X
    };
  },
  render() {
    return ee("div", {
      class: "vue-apexcharts"
    });
  }
}), se = (e, a) => {
  const r = e.__vccOpts || e;
  for (const [n, c] of a)
    r[n] = c;
  return r;
}, ae = S({
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
    const a = E("");
    return te(async () => {
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
}), ie = ["innerHTML"];
function ce(e, a, r, n, c, u) {
  return ne(), oe("div", {
    innerHTML: e.chartHTML,
    class: re(e.className)
  }, null, 10, ie);
}
const M = /* @__PURE__ */ se(ae, [["render", ce]]), P = S({
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
    L(async () => {
      try {
        const { default: r } = await import("apexcharts/ssr");
        a = r.hydrateAll(e.selector, e.clientOptions);
      } catch (r) {
        console.error("Failed to hydrate ApexCharts:", r);
      }
    }), T(() => {
      a.forEach((r) => {
        r && r.destroy && r.destroy();
      }), a = [];
    });
  },
  render() {
    return null;
  }
}), le = (e) => {
  e.component(O.name, O), e.component(M.name, M), e.component(P.name, P);
};
O.install = le;
export {
  P as ApexChartsHydrate,
  M as ApexChartsServer,
  O as default
};
