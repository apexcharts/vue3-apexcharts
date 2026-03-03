import { defineComponent as q, ref as y, onBeforeMount as K, onMounted as $, getCurrentInstance as F, onBeforeUnmount as G, toRefs as H, watch as d, h as Q, nextTick as A } from "vue";
import x from "apexcharts/core";
const j = [
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
], S = q({
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
  emits: j,
  setup(s, { emit: P }) {
    const O = y(null), n = y(null), h = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, b = (e, t) => {
      typeof Object.assign != "function" && function() {
        Object.assign = function(o) {
          if (o == null)
            throw new TypeError("Cannot convert undefined or null to object");
          let v = Object(o);
          for (let i = 1; i < arguments.length; i++) {
            let c = arguments[i];
            if (c != null)
              for (let m in c)
                c.hasOwnProperty(m) && (v[m] = c[m]);
          }
          return v;
        };
      }();
      let a = Object.assign({}, e);
      return h(e) && h(t) && Object.keys(t).forEach((o) => {
        h(t[o]) ? o in e ? a[o] = b(e[o], t[o]) : Object.assign(a, {
          [o]: t[o]
        }) : Object.assign(a, {
          [o]: t[o]
        });
      }), a;
    }, r = (e) => JSON.parse(JSON.stringify(e)), p = async () => {
      if (await A(), n.value)
        return;
      const e = {
        chart: {
          type: s.type || s.options.chart && s.options.chart.type || "line",
          height: s.height,
          width: s.width,
          events: {}
        },
        series: r(s.series)
      }, t = s.options.chart ? s.options.chart.events : null;
      j.forEach((o) => {
        let v = (...i) => P(o, ...i);
        e.chart.events[o] = (...i) => {
          v(...i), t && t.hasOwnProperty(o) && t[o](...i);
        };
      });
      const a = b(s.options, e);
      return n.value = new x(O.value, a), n.value.render();
    }, f = () => (g(), p()), g = () => {
      n.value.destroy(), n.value = null;
    }, C = (e, t) => n.value.updateSeries(e, t), E = (e, t, a, o) => n.value.updateOptions(e, t, a, o), M = (e) => n.value.toggleSeries(e), D = (e) => {
      n.value.showSeries(e);
    }, U = (e) => {
      n.value.hideSeries(e);
    }, L = (e, t) => n.value.appendSeries(e, t), R = () => {
      n.value.resetSeries();
    }, X = (e, t) => {
      n.value.toggleDataPointSelection(e, t);
    }, z = (e) => n.value.appendData(e), I = (e, t) => n.value.zoomX(e, t), _ = (e) => n.value.dataURI(e), B = (e) => n.value.setLocale(e), J = (e, t) => {
      n.value.addXaxisAnnotation(e, t);
    }, N = (e, t) => {
      n.value.addYaxisAnnotation(e, t);
    }, T = (e, t) => {
      n.value.addPointAnnotation(e, t);
    }, Y = (e, t) => {
      n.value.removeAnnotation(e, t);
    }, Z = () => {
      n.value.clearAnnotations();
    };
    K(() => {
      window.ApexCharts = x;
    }), $(() => {
      O.value = F().proxy.$el, p();
    }), G(() => {
      n.value && g();
    });
    const l = H(s);
    let u = null;
    const w = (e) => {
      u || (u = { options: !1, series: !1 }, A(() => {
        const t = u;
        if (u = null, !n.value) {
          p();
          return;
        }
        if (t.options && t.series) {
          const a = r(s.options);
          a.series = r(s.series), n.value.updateOptions(a);
        } else
          t.options ? n.value.updateOptions(r(s.options)) : t.series && n.value.updateSeries(r(s.series));
      })), u[e] = !0;
    };
    return d(l.options, () => {
      w("options");
    }), d(
      l.series,
      () => {
        w("series");
      },
      { deep: !0 }
    ), d(l.type, () => {
      f();
    }), d(l.width, () => {
      f();
    }), d(l.height, () => {
      f();
    }), {
      chart: n,
      init: p,
      refresh: f,
      destroy: g,
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
      addXaxisAnnotation: J,
      addYaxisAnnotation: N,
      addPointAnnotation: T,
      removeAnnotation: Y,
      clearAnnotations: Z,
      setLocale: B,
      dataURI: _
    };
  },
  render() {
    return Q("div", {
      class: "vue-apexcharts"
    });
  }
}), V = (s) => {
  s.component(S.name, S);
};
S.install = V;
export {
  S as default
};
