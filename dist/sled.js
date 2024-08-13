import { computed as z, openBlock as f, createElementBlock as C, normalizeStyle as B, ref as x, onMounted as _, onBeforeUnmount as ee, createElementVNode as U, Fragment as R, renderList as T, createBlock as W, createVNode as X, createCommentVNode as $, withDirectives as K, toDisplayString as ue, vModelSelect as se, vModelCheckbox as oe, mergeModels as P, useModel as J, watch as H } from "vue";
const re = ["x1", "y1", "x2", "y2"], Q = {
  __name: "SvgLine",
  props: {
    x1: {
      type: [Number, String],
      required: !0
    },
    x2: {
      type: [Number, String],
      required: !0
    },
    y1: {
      type: [Number, String],
      required: !0
    },
    y2: {
      type: [Number, String],
      required: !0
    },
    scale: {
      type: [Number, String],
      required: !0
    },
    lineThickness: {
      type: [Number, String]
    }
  },
  setup(e) {
    const M = e, u = z(() => M.y1 === M.y2), o = z(() => ({
      stroke: "rgb(255,0,0)",
      strokeWidth: M.lineThickness,
      strokeLinecap: "round",
      cursor: u.value ? "ns-resize" : "ew-resize"
    }));
    return (a, i) => (f(), C("line", {
      x1: e.x1 / e.scale,
      y1: e.y1 / e.scale,
      x2: e.x2 / e.scale,
      y2: e.y2 / e.scale,
      style: B(o.value)
    }, null, 12, re));
  }
}, ce = ["cx", "cy"], Z = {
  __name: "SvgCircle",
  props: {
    hLines: {
      type: Array,
      required: !0
    },
    vLines: {
      type: Array,
      required: !0
    },
    scale: {
      type: Number,
      default: 1
    },
    ix: {
      type: Number,
      default: 0
    },
    iy: {
      type: Number,
      default: 0
    },
    strokeColor: {
      type: String,
      default: "black"
    }
  },
  emits: ["dragging"],
  setup(e, { emit: M }) {
    const u = e, o = M;
    function a() {
      o("dragging", [u.ix, u.iy]);
    }
    const i = z(
      () => u.ix < 0 ? (0.7 * u.vLines[0] + 0.3 * u.vLines[u.vLines.length - 1]) / u.scale : u.vLines[u.ix] / u.scale
    ), v = z(
      () => u.iy < 0 ? (0.7 * u.hLines[0] + 0.3 * u.hLines[u.hLines.length - 1]) / u.scale : u.hLines[u.iy] / u.scale
    ), s = z(() => ({
      stroke: u.strokeColor,
      strokeWidth: 2,
      strokeOpacity: 0.7,
      fillOpacity: 0,
      zIndex: 3
    }));
    return (L, d) => (f(), C("circle", {
      cx: i.value,
      cy: v.value,
      r: 10,
      style: B(s.value),
      onMousedown: a
    }, null, 44, ce));
  }
}, ve = ["width", "height"], de = ["width", "height", "xlink:href"], ge = {
  __name: "SvgComponent",
  props: {
    imageData: {
      type: String,
      required: !0
    },
    imageWidth: {
      type: Number,
      required: !0
    },
    imageHeight: {
      type: Number,
      required: !0
    },
    scale: {
      type: Number,
      default: 1
    },
    hLines: {
      type: Array,
      required: !0
    },
    vLines: {
      type: Array,
      required: !0
    },
    lineThickness: {
      type: Number
    }
  },
  emits: [
    "circleUL",
    "circleLR",
    "dragUL",
    "dragLR",
    "dragVline",
    "dragHline"
  ],
  setup(e, { emit: M }) {
    const u = e, o = M;
    x([0, 0, -1]), x([0, 0, -1]);
    const a = x(!1), i = x(), v = x([]), s = x(), L = x();
    function d() {
      a.value = !1, s.value = void 0;
    }
    function g(k = 0) {
      return Math.random().toString(16).substr(2, 8) + k;
    }
    function h({ clientX: k, clientY: r }) {
      var m;
      if (a.value) {
        const c = (m = L.value) == null ? void 0 : m.getBoundingClientRect();
        v.value;
        const b = k - c.left - u.vLines[v.value[0]] / u.scale, q = r - c.top - u.hLines[v.value[1]] / u.scale;
        s.value ? o(s.value, [b, q]) : v.value[0] >= 0 ? o("dragVline", [b, q, v.value[0]]) : o("dragHline", [b, q, v.value[1]]);
      }
    }
    return _(() => {
      window.addEventListener("mouseup", d), window.addEventListener("mousemove", h);
    }), ee(() => {
      window.removeEventListener("mouseup", d), window.removeEventListener("mousemove", h);
    }), (k, r) => (f(), C("svg", {
      ref_key: "rootRef",
      ref: L,
      width: e.imageWidth / e.scale,
      height: e.imageHeight / e.scale,
      style: { zIndex: 2, position: "absolute" }
    }, [
      U("image", {
        xmlns: "http://www.w3.org/2000/svg",
        "xmlns:xlink": "http://www.w3.org/1999/xlink",
        width: e.imageWidth / e.scale,
        height: e.imageHeight / e.scale,
        "xlink:href": e.imageData
      }, null, 8, de),
      e.hLines.length > 1 && e.vLines.length > 1 ? (f(), C(R, { key: 0 }, [
        (f(!0), C(R, null, T(e.hLines, (m, c) => (f(), W(Q, {
          key: g(c),
          x1: e.vLines[0],
          y1: e.hLines[c],
          x2: e.vLines[e.vLines.length - 1],
          y2: e.hLines[c],
          scale: e.scale,
          "line-thickness": e.lineThickness,
          onMousedown: () => {
            a.value = !0, v.value = [-1, c];
          }
        }, null, 8, ["x1", "y1", "x2", "y2", "scale", "line-thickness", "onMousedown"]))), 128)),
        (f(!0), C(R, null, T(e.vLines, (m, c) => (f(), W(Q, {
          key: g(c),
          x1: e.vLines[c],
          y1: e.hLines[0],
          x2: e.vLines[c],
          y2: e.hLines[e.hLines.length - 1],
          scale: e.scale,
          "line-thickness": e.lineThickness,
          index: c,
          dragging: a.value,
          onMousedown: () => {
            a.value = !0, v.value = [c, -1];
          },
          onMousemove: r[0] || (r[0] = (b) => i.value = b)
        }, null, 8, ["x1", "y1", "x2", "y2", "scale", "line-thickness", "index", "dragging", "onMousedown"]))), 128)),
        X(Z, {
          ix: 0,
          iy: 0,
          "h-lines": e.hLines,
          "v-lines": e.vLines,
          scale: e.scale,
          "stroke-color": "red",
          style: { cursor: "move" },
          onDragging: r[1] || (r[1] = (m) => {
            a.value = !0, s.value = "dragUL", v.value = m;
          })
        }, null, 8, ["h-lines", "v-lines", "scale"]),
        X(Z, {
          ix: e.vLines.length - 1,
          iy: e.hLines.length - 1,
          "h-lines": e.hLines,
          "v-lines": e.vLines,
          scale: e.scale,
          "stroke-color": "red",
          style: { cursor: "nwse-resize" },
          onDragging: r[2] || (r[2] = (m) => {
            a.value = !0, s.value = "dragLR", v.value = m;
          })
        }, null, 8, ["ix", "iy", "h-lines", "v-lines", "scale"])
      ], 64)) : $("", !0)
    ], 8, ve));
  }
}, he = ["innerHTML"], me = ["disabled"], ye = /* @__PURE__ */ U("option", { value: "none" }, "None", -1), fe = ["value"], Le = ["disabled"], I = 5, xe = {
  __name: "Cell",
  props: {
    modelValue: {
      type: Object,
      required: !0
    },
    metadata: {
      type: Object,
      default: void 0
    },
    scale: {
      type: Number,
      default: 1
    },
    locked: {
      type: Boolean,
      default: !1
    }
  },
  emits: ["update:modelValue", "onChange"],
  setup(e, { emit: M }) {
    const u = {
      position: "absolute",
      right: "10px",
      bottom: "10px"
    }, o = {
      position: "absolute",
      top: "4px",
      backgroundColor: "#FFF",
      borderRadius: "3px",
      padding: "4px",
      opacity: 0.9
    }, a = {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    }, i = e, v = M, s = z({
      get() {
        return i.modelValue;
      },
      set(g) {
        v("update:modelValue", g);
      }
    }), L = z({
      get() {
        return !s.value.metadata;
      },
      set(g) {
        s.value.metadata = g ? null : s.value.metadata || "none";
      }
    }), d = z(() => {
      const { upperCorner: g, lowerCorner: h } = s.value;
      return {
        position: "absolute",
        top: `${g.y / i.scale + I}px`,
        left: `${g.x / i.scale + I}px`,
        width: `${(h.x - g.x) / i.scale - I * 2}px`,
        height: `${(h.y - g.y) / i.scale - I * 2}px`,
        zIndex: 2
      };
    });
    return (g, h) => {
      var k;
      return f(), C("div", {
        style: B(d.value)
      }, [
        (k = s.value) != null && k.textfield ? (f(), C("span", {
          key: 0,
          class: "cell-textfield",
          style: o,
          innerHTML: s.value.textfield
        }, null, 8, he)) : $("", !0),
        L.value ? $("", !0) : K((f(), C("select", {
          key: 1,
          class: "cell-select",
          "onUpdate:modelValue": h[0] || (h[0] = (r) => s.value.metadata = r),
          disabled: e.locked,
          style: a,
          onChange: h[1] || (h[1] = (r) => v("onChange", s.value))
        }, [
          ye,
          (f(!0), C(R, null, T(e.metadata, (r, m) => (f(), C("option", {
            key: m,
            value: m
          }, ue(r), 9, fe))), 128))
        ], 40, me)), [
          [se, s.value.metadata]
        ]),
        K(U("input", {
          type: "checkbox",
          class: "cell-checkbox",
          disabled: e.locked,
          style: u,
          "onUpdate:modelValue": h[2] || (h[2] = (r) => L.value = r)
        }, null, 8, Le), [
          [oe, L.value]
        ])
      ], 4);
    };
  }
}, be = /* @__PURE__ */ Object.assign({
  name: "Sled"
}, {
  __name: "Sled",
  props: /* @__PURE__ */ P({
    metadataAssignment: {
      type: Object,
      default: () => ({})
    },
    imageWidth: {
      type: Number,
      required: !0
    },
    imageHeight: {
      type: Number,
      required: !0
    },
    fileImage: {
      type: String
    },
    lineWeight: {
      type: [Number, String],
      default: 4
    },
    autosize: {
      type: Boolean,
      default: !0
    },
    locked: {
      type: Boolean,
      default: !1
    }
  }, {
    verticalLines: {
      type: Array,
      required: !0
    },
    verticalLinesModifiers: {},
    horizontalLines: {
      type: Array,
      required: !0
    },
    horizontalLinesModifiers: {}
  }),
  emits: /* @__PURE__ */ P(["onComputeCells", "resize"], ["update:verticalLines", "update:horizontalLines"]),
  setup(e, { expose: M, emit: u }) {
    const o = e, a = J(e, "verticalLines"), i = J(e, "horizontalLines"), v = u, s = x(0), L = x(0), d = x([]), g = x(0), h = x(0), k = x(void 0), r = x(1), m = x(null), c = z(() => i.value.length - 1), b = z(() => a.value.length - 1);
    H([() => i.value.length, () => a.value.length], () => {
      V();
    }), H(
      [i, a],
      () => {
        E();
      },
      { deep: !0 }
    ), H(
      () => o.imageHeight,
      (l) => {
        L.value = l, p();
      },
      { immediate: !0 }
    ), H(
      () => o.imageWidth,
      (l) => {
        s.value = l, p();
      },
      { immediate: !0 }
    ), H(
      () => o.fileImage,
      (l) => {
        g.value = s.value, h.value = L.value, p();
      }
    ), H(
      () => o.autosize,
      (l) => {
        l ? (k.value = new ResizeObserver(G), k.value.observe(m.value)) : k.value.disconnect(), r.value = Y();
      }
    ), _(() => {
      E(), o.autosize && (k.value = new ResizeObserver(G), k.value.observe(m.value));
    }), ee(() => {
      k.value.disconnect();
    });
    function q(l, n) {
      d.value[l] = n, v("onComputeCells", d.value);
    }
    function A(l, n) {
      const [t] = l;
      return t + n < 0;
    }
    function F(l) {
      if (!A(a.value, l)) {
        for (let n = 0; n < a.value.length; n++)
          D(n, l);
        V();
      }
    }
    function j(l) {
      if (!A(i.value, l)) {
        for (let n = 0; n < i.value.length; n++)
          O(n, l);
        V();
      }
    }
    function D(l, n) {
      const t = Math.round(a.value[l] + n);
      t < 0 || t > o.imageWidth || (a.value[l] = t, V());
    }
    function O(l, n) {
      const t = Math.round(i.value[l] + n);
      t < 0 || t > o.imageHeight || (i.value[l] = t, V());
    }
    function p() {
      if (g.value > 1) {
        const l = s.value / g.value, n = a.value.length;
        let t = 0;
        for (t = 0; t < n; t++)
          a.value[t] = Math.round(a.value[t] * l);
      }
      if (h.value > 1) {
        const l = L.value / h.value, n = i.value.length;
        let t = 0;
        for (t = 0; t < n; t++)
          i.value[t] = Math.round(i.value[t] * l);
      }
      g.value = s.value, h.value = L.value, E();
    }
    function te() {
      if (i.value.length > 1 && a.value.length > 1) {
        d.value = [];
        const l = (i.value[c.value] - i.value[0]) / c.value, n = (a.value[b.value] - a.value[0]) / b.value;
        for (let t = 0; t < c.value; t++)
          i.value[t] = Math.round(i.value[0] + t * l);
        for (let t = 0; t < b.value; t++)
          a.value[t] = Math.round(a.value[0] + t * n);
        E();
      }
    }
    function E() {
      if (i.value.length > 0 && a.value.length > 0) {
        let l, n, t = -1;
        for (let w = 0; w < c.value; w++)
          for (let S = 0; S < b.value; S++) {
            t = b.value * w + S, l = { x: a.value[S], y: i.value[w] }, n = { x: a.value[S + 1], y: i.value[w + 1] };
            const { metadata: y = null, textfield: N } = d.value[t] || {};
            d.value[t] = {
              index: t,
              upperCorner: l,
              lowerCorner: n,
              row: w,
              column: S,
              metadata: y,
              textfield: N
            };
          }
        d.value = t === -1 ? [] : d.value.slice(0, t + 1), v("onComputeCells", d.value);
      }
    }
    function V() {
      a.value = a.value.toSorted((l, n) => l - n), i.value = i.value.toSorted((l, n) => l - n);
    }
    function le(l) {
      const [n, t] = l, w = a.value.at(-1), S = i.value.at(-1);
      if (!(w + n > o.imageWidth || S + t > o.imageHeight)) {
        for (let y = 1; y < a.value.length; y++) {
          const N = Math.round(a.value[y] + y * n / b.value);
          N > 0 && N <= o.imageWidth && (a.value[y] = Math.round(a.value[y] + y * n / b.value));
        }
        for (let y = 1; y < i.value.length; y++) {
          const N = Math.round(i.value[y] + y * t / c.value);
          N > 0 && N <= o.imageHeight && (i.value[y] = Math.round(i.value[y] + y * t / c.value));
        }
        V();
      }
    }
    function ne(l) {
      const [n, t] = l;
      F(n), j(t);
    }
    function ae(l) {
      const n = l[1], t = l[2];
      O(t, n);
    }
    function ie(l) {
      const n = l[0], t = l[2];
      D(t, n);
    }
    function Y() {
      if (o.autosize) {
        const l = m.value.getBoundingClientRect(), n = l.height < L.value ? L.value / l.height : 1, t = l.width < s.value ? s.value / l.width : 1;
        return n > t ? n : t;
      } else
        return 1;
    }
    function G(l, n) {
      const t = m.value.getBoundingClientRect();
      r.value = Y(), v("resize", {
        ...t,
        scale: r.value
      });
    }
    return M({
      moveX: F,
      moveY: j,
      moveH: O,
      moveV: D,
      equalizeLines: te
    }), (l, n) => (f(), C("div", {
      ref_key: "rootRef",
      ref: m,
      style: B({
        display: "block",
        position: "relative",
        height: `${L.value}px`
      })
    }, [
      e.fileImage ? (f(), W(ge, {
        key: 0,
        "image-width": s.value,
        "image-height": L.value,
        "image-data": e.fileImage,
        "h-lines": i.value,
        "v-lines": a.value,
        scale: r.value,
        "line-thickness": e.lineWeight,
        onDragUL: ne,
        onDragLR: le,
        onDragHline: ae,
        onDragVline: ie
      }, null, 8, ["image-width", "image-height", "image-data", "h-lines", "v-lines", "scale", "line-thickness"])) : $("", !0),
      (f(!0), C(R, null, T(d.value, (t, w) => (f(), W(xe, {
        key: w,
        locked: e.locked,
        metadata: e.metadataAssignment,
        scale: r.value,
        modelValue: d.value[w],
        "onUpdate:modelValue": (S) => d.value[w] = S,
        onOnChange: (S) => q(w, S)
      }, null, 8, ["locked", "metadata", "scale", "modelValue", "onUpdate:modelValue", "onOnChange"]))), 128))
    ], 4));
  }
});
export {
  be as default
};
