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
    const g = b(null), n = b(null), f = (e) => e && typeof e == "object" && !Array.isArray(e) && e != null, S = (e, t) => {
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
      return f(e) && f(t) && Object.keys(t).forEach((o) => {
        f(t[o]) ? o in e ? s[o] = S(e[o], t[o]) : Object.assign(s, {
          [o]: t[o]
        }) : Object.assign(s, {
          [o]: t[o]
        });
      }), s;
    }, r = async () => {
      if (await H(), n.value)
        return;
      const e = {
        chart: {
          type: a.type || a.options.chart.type || "line",
          height: a.height,
          width: a.width,
          events: {}
        },
        series: a.series
      }, t = a.options.chart.events;
      A.forEach((o) => {
        let v = (...i) => x(o, ...i);
        e.chart.events[o] = (...i) => {
          v(...i), t && t.hasOwnProperty(o) && t[o](...i);
        };
      });
      const s = S(a.options, e);
      return n.value = new w(g.value, s), n.value.render();
    }, d = () => (h(), r()), h = () => {
      n.value.destroy();
    }, O = (e, t) => n.value.updateSeries(e, t), y = (e, t, s, o) => n.value.updateOptions(e, t, s, o), j = (e) => n.value.toggleSeries(e), P = (e) => {
      n.value.showSeries(e);
    }, C = (e) => {
      n.value.hideSeries(e);
    }, E = (e, t) => n.value.appendSeries(e, t), M = () => {
      n.value.resetSeries();
    }, D = (e, t) => {
      n.value.toggleDataPointSelection(e, t);
    }, L = (e) => n.value.appendData(e), R = (e, t) => n.value.zoomX(e, t), X = (e) => n.value.dataURI(e), z = (e) => n.value.setLocale(e), I = (e, t) => {
      n.value.addXaxisAnnotation(e, t);
    }, U = (e, t) => {
      n.value.addYaxisAnnotation(e, t);
    }, B = (e, t) => {
      n.value.addPointAnnotation(e, t);
    }, T = (e, t) => {
      n.value.removeAnnotation(e, t);
    }, Y = () => {
      n.value.clearAnnotations();
    };
    _(() => {
      window.ApexCharts = w;
    }), q(() => {
      g.value = K().proxy.$el, r();
    }), $(() => {
      n.value && h();
    });
    const u = F(a);
    return c(u.options, () => {
      !n.value && a.options ? r() : n.value.updateOptions(a.options);
    }), c(
      u.series,
      () => {
        !n.value && a.series ? r() : n.value.updateSeries(a.series);
      },
      { deep: !0 }
    ), c(u.type, () => {
      d();
    }), c(u.width, () => {
      d();
    }), c(u.height, () => {
      d();
    }), {
      chart: n,
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
