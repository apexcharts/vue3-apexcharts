var De = Object.defineProperty, Te = Object.defineProperties, Me = Object.getOwnPropertyDescriptors, Vt = Object.getOwnPropertySymbols, Pe = Object.prototype.hasOwnProperty, Fe = Object.prototype.propertyIsEnumerable, Xt = (A, t, e) => t in A ? De(A, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : A[t] = e, I = (A, t) => {
  for (var e in t || (t = {}))
    Pe.call(t, e) && Xt(A, e, t[e]);
  if (Vt)
    for (var e of Vt(t))
      Fe.call(t, e) && Xt(A, e, t[e]);
  return A;
}, O = (A, t) => Te(A, Me(t)), Ee = (A, t, e) => Xt(A, typeof t != "symbol" ? t + "" : t, e), Ut = (A, t, e) => new Promise((s, i) => {
  var a = (n) => {
    try {
      r(e.next(n));
    } catch (l) {
      i(l);
    }
  }, o = (n) => {
    try {
      r(e.throw(n));
    } catch (l) {
      i(l);
    }
  }, r = (n) => n.done ? s(n.value) : Promise.resolve(n.value).then(a, o);
  r((e = e.apply(A, t)).next());
});
/*!
 * ApexCharts v5.10.0
 * (c) 2018-2026 ApexCharts
 */
class B {
  /**
   * Check if running in server-side rendering environment (Node.js)
   * @returns {boolean} True if in SSR/Node.js, false if in browser
   */
  static isSSR() {
    return typeof window > "u" || typeof document > "u";
  }
  /**
   * Check if running in browser environment
   * @returns {boolean} True if in browser, false if in SSR/Node.js
   */
  static isBrowser() {
    return !this.isSSR();
  }
  /**
   * Check if a specific browser API is available
   * @param {string} api - Name of the API to check (e.g., 'ResizeObserver')
   * @returns {boolean} True if API is available
   */
  static hasAPI(t) {
    return this.isSSR() ? !1 : typeof window[t] < "u";
  }
  /**
   * Returns the global Apex config object regardless of environment.
   * In browser: window.Apex; in SSR/Node.js: global.Apex; fallback: {}.
   * @returns {object}
   */
  static getApex() {
    return typeof window < "u" && window.Apex ? window.Apex : typeof global < "u" && global.Apex ? global.Apex : {};
  }
}
class Lt {
  constructor(t, e = null) {
    this.nodeName = t, this.namespaceURI = e, this.attributes = /* @__PURE__ */ new Map(), this.children = [], this.textContent = "", this.style = {}, this.classList = new Xe(), this.parentNode = null;
  }
  setAttribute(t, e) {
    this.attributes.set(t, e);
  }
  getAttribute(t) {
    return this.attributes.get(t);
  }
  removeAttribute(t) {
    this.attributes.delete(t);
  }
  hasAttribute(t) {
    return this.attributes.has(t);
  }
  appendChild(t) {
    return t && t !== this && (t.parentNode = this, this.children.push(t)), t;
  }
  removeChild(t) {
    const e = this.children.indexOf(t);
    return e !== -1 && (this.children.splice(e, 1), t.parentNode = null), t;
  }
  insertBefore(t, e) {
    if (!e)
      return this.appendChild(t);
    const s = this.children.indexOf(e);
    return s !== -1 && (t.parentNode = this, this.children.splice(s, 0, t)), t;
  }
  cloneNode(t = !1) {
    const e = new Lt(this.nodeName, this.namespaceURI);
    return e.textContent = this.textContent, this.attributes.forEach((s, i) => {
      e.attributes.set(i, s);
    }), Object.assign(e.style, this.style), t && this.children.forEach((s) => {
      s.cloneNode && e.appendChild(s.cloneNode(!0));
    }), e;
  }
  getBoundingClientRect() {
    return {
      width: this._ssrWidth || 0,
      height: this._ssrHeight || 0,
      top: 0,
      left: 0,
      right: this._ssrWidth || 0,
      bottom: this._ssrHeight || 0,
      x: 0,
      y: 0
    };
  }
  getRootNode() {
    let t = this;
    for (; t.parentNode; )
      t = t.parentNode;
    return t;
  }
  querySelector() {
    return null;
  }
  querySelectorAll() {
    return [];
  }
  getElementsByClassName() {
    return [];
  }
  addEventListener() {
  }
  removeEventListener() {
  }
  get childNodes() {
    return this.children;
  }
  toString() {
    let t = "";
    if (this.attributes.forEach((s, i) => {
      t += ` ${i}="${s}"`;
    }), this.children.length === 0 && !this.textContent)
      return `<${this.nodeName}${t}/>`;
    const e = this.children.map((s) => s.toString()).join("");
    return `<${this.nodeName}${t}>${this.textContent}${e}</${this.nodeName}>`;
  }
  // Property getters/setters
  get innerHTML() {
    return this.children.map((t) => t.toString()).join("");
  }
  set innerHTML(t) {
    this.children = [], this.textContent = t;
  }
  get outerHTML() {
    return this.toString();
  }
  get isConnected() {
    return !0;
  }
}
class Xe {
  constructor() {
    this.classes = /* @__PURE__ */ new Set();
  }
  add(...t) {
    t.forEach((e) => this.classes.add(e));
  }
  remove(...t) {
    t.forEach((e) => this.classes.delete(e));
  }
  contains(t) {
    return this.classes.has(t);
  }
  toggle(t, e) {
    return e === !0 ? (this.classes.add(t), !0) : e === !1 ? (this.classes.delete(t), !1) : this.classes.has(t) ? (this.classes.delete(t), !1) : (this.classes.add(t), !0);
  }
  toString() {
    return Array.from(this.classes).join(" ");
  }
}
class Re {
  constructor() {
    this.SVGNS = "http://www.w3.org/2000/svg", this.XLINKNS = "http://www.w3.org/1999/xlink";
  }
  /**
   * Create SVG element with namespace
   * @param {string} namespaceURI - Namespace URI
   * @param {string} qualifiedName - Element tag name
   * @returns {SSRElement} Mock SVG element
   */
  createElementNS(t, e) {
    return new Lt(e, t);
  }
  /**
   * Create text node
   * @param {string} data - Text content
   * @returns {object} Text node mock
   */
  createTextNode(t) {
    return {
      nodeName: "#text",
      nodeType: 3,
      textContent: t,
      toString() {
        return this.textContent;
      }
    };
  }
  /**
   * Query selector (returns null in SSR)
   * @returns {null}
   */
  querySelector() {
    return null;
  }
  /**
   * Query selector all (returns empty array in SSR)
   * @returns {Array}
   */
  querySelectorAll() {
    return [];
  }
  /**
   * Get computed style (returns empty object in SSR)
   * @returns {object}
   */
  getComputedStyle() {
    return {};
  }
  /**
   * Get bounding client rect for element
   * @param {SSRElement} element - Element to measure
   * @returns {object} Mock dimensions
   */
  getBoundingClientRect(t) {
    return t && t.getBoundingClientRect ? t.getBoundingClientRect() : {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0
    };
  }
  /**
   * Create mock XMLSerializer for SSR
   * @returns {object} XMLSerializer mock
   */
  createXMLSerializer() {
    return {
      serializeToString(t) {
        return t.toString ? t.toString() : "";
      }
    };
  }
  /**
   * Create mock DOMParser for SSR
   * @returns {object} DOMParser mock
   */
  createDOMParser() {
    return {
      parseFromString(t, e) {
        const s = new Lt("root");
        return s.innerHTML = t, {
          documentElement: s
        };
      }
    };
  }
}
let j = null, ot = null, rt = null;
class N {
  /**
   * Initialize the SSR shim if in SSR environment
   * Must be called before using other methods
   */
  static init() {
    B.isSSR() && !j && (j = new Re());
  }
  /**
   * Create an HTML element
   * @param {string} tagName - Element tag name
   * @returns {Element|SSRElement} HTML element
   */
  static createElement(t) {
    return B.isSSR() ? (j || this.init(), j.createElementNS(null, t)) : document.createElement(t);
  }
  /**
   * Create an SVG element with namespace
   * @param {string} namespaceURI - Namespace URI
   * @param {string} qualifiedName - Element tag name
   * @returns {Element|SSRElement} SVG element
   */
  static createElementNS(t, e) {
    return B.isSSR() ? (j || this.init(), j.createElementNS(t, e)) : document.createElementNS(t, e);
  }
  /**
   * Create a text node
   * @param {string} data - Text content
   * @returns {Text|object} Text node
   */
  static createTextNode(t) {
    return B.isSSR() ? (j || this.init(), j.createTextNode(t)) : document.createTextNode(t);
  }
  /**
   * Query selector
   * @param {string} selector - CSS selector
   * @returns {Element|null}
   */
  static querySelector(t) {
    return B.isSSR() ? null : document.querySelector(t);
  }
  /**
   * Query selector all
   * @param {string} selector - CSS selector
   * @returns {NodeList|Array}
   */
  static querySelectorAll(t) {
    return B.isSSR() ? [] : document.querySelectorAll(t);
  }
  /**
   * Get computed style for an element
   * @param {Element} element - Element to get styles for
   * @returns {CSSStyleDeclaration|object}
   */
  static getComputedStyle(t) {
    return B.isSSR() ? {} : window.getComputedStyle(t);
  }
  /**
   * Get bounding client rect for an element
   * @param {Element} element - Element to measure
   * @returns {DOMRect|object}
   */
  static getBoundingClientRect(t) {
    return B.isSSR() ? (j || this.init(), j.getBoundingClientRect(t)) : t ? t.getBoundingClientRect() : {
      width: 0,
      height: 0,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      x: 0,
      y: 0
    };
  }
  /**
   * Get XMLSerializer instance
   * @returns {XMLSerializer|object}
   */
  static getXMLSerializer() {
    return B.isSSR() ? (j || this.init(), ot || (ot = j.createXMLSerializer()), ot) : (ot || (ot = new XMLSerializer()), ot);
  }
  /**
   * Get DOMParser instance
   * @returns {DOMParser|object}
   */
  static getDOMParser() {
    return B.isSSR() ? (j || this.init(), rt || (rt = j.createDOMParser()), rt) : (rt || (rt = new DOMParser()), rt);
  }
  /**
   * Add event listener to window
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {object} options - Event options
   */
  static addWindowEventListener(t, e, s) {
    B.isBrowser() && window.addEventListener(t, e, s);
  }
  /**
   * Remove event listener from window
   * @param {string} event - Event name
   * @param {Function} handler - Event handler
   * @param {object} options - Event options
   */
  static removeWindowEventListener(t, e, s) {
    B.isBrowser() && window.removeEventListener(t, e, s);
  }
  /**
   * Request animation frame
   * @param {Function} callback - Callback function
   * @returns {number|null}
   */
  static requestAnimationFrame(t) {
    return B.isBrowser() ? window.requestAnimationFrame(t) : (t(), null);
  }
  /**
   * Cancel animation frame
   * @param {number} id - Animation frame ID
   */
  static cancelAnimationFrame(t) {
    B.isBrowser() && t && window.cancelAnimationFrame(t);
  }
  /**
   * Check if element exists
   * @param {Element} element - Element to check
   * @returns {boolean}
   */
  static elementExists(t) {
    return t ? B.isSSR() ? t._ssrMode === !0 || t.nodeName !== void 0 : t.getRootNode ? t.getRootNode({ composed: !0 }) === document || t.isConnected : !1 : !1;
  }
  /**
   * Get window object (or null in SSR)
   * @returns {Window|null}
   */
  static getWindow() {
    return B.isBrowser() ? window : null;
  }
  /**
   * Get document object (or null in SSR)
   * @returns {Document|null}
   */
  static getDocument() {
    return B.isBrowser() ? document : null;
  }
  /**
   * Get the shim instance (for testing purposes)
   * @returns {SSRDOMShim|null}
   */
  static _getShim() {
    return j;
  }
  /**
   * Reset the shim instance (for testing purposes)
   */
  static _resetShim() {
    j = null, ot = null, rt = null;
  }
}
let L = class ht {
  static isObject(t) {
    return t && typeof t == "object" && !Array.isArray(t);
  }
  // Type checking that works across different window objects
  static is(t, e) {
    return Object.prototype.toString.call(e) === "[object " + t + "]";
  }
  static isSafari() {
    return B.isBrowser() && /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
  }
  // to extend defaults with user options
  // credit: http://stackoverflow.com/questions/27936772/deep-object-merging-in-es6-es7#answer-34749873
  static extend(t, e) {
    const s = Object.assign({}, t);
    return this.isObject(t) && this.isObject(e) && Object.keys(e).forEach((i) => {
      this.isObject(e[i]) ? i in t ? s[i] = this.extend(t[i], e[i]) : Object.assign(s, {
        [i]: e[i]
      }) : Object.assign(s, {
        [i]: e[i]
      });
    }), s;
  }
  static extendArray(t, e) {
    const s = [];
    return t.map((i) => {
      s.push(ht.extend(e, i));
    }), t = s, t;
  }
  // If month counter exceeds 12, it starts again from 1
  static monthMod(t) {
    return t % 12;
  }
  /**
   * clone object with optional shallow copy for performance
   * @param {*} source - Source object to clone
   * @param {WeakMap} visited - Circular reference tracker
   * @param {boolean} shallow - If true, performs shallow copy (default: false)
   * @returns {*} Cloned object
   */
  static clone(t, e = /* @__PURE__ */ new WeakMap(), s = !1) {
    if (t === null || typeof t != "object")
      return t;
    if (e.has(t))
      return e.get(t);
    let i;
    if (Array.isArray(t))
      if (s)
        i = t.slice();
      else {
        i = [], e.set(t, i);
        for (let a = 0; a < t.length; a++)
          i[a] = this.clone(t[a], e, !1);
      }
    else if (t instanceof Date)
      i = new Date(t.getTime());
    else if (s)
      i = Object.assign({}, t);
    else {
      i = {}, e.set(t, i);
      for (const a in t)
        Object.prototype.hasOwnProperty.call(t, a) && (i[a] = this.clone(t[a], e, !1));
    }
    return i;
  }
  /**
   * Shallow clone for performance when deep clone isn't needed
   * @param {*} source - Source to clone
   * @returns {*} Shallow cloned object
   */
  static shallowClone(t) {
    return t === null || typeof t != "object" ? t : Array.isArray(t) ? t.slice() : Object.assign({}, t);
  }
  /**
   * Fast shallow equality check for objects
   * @param {Object} obj1 - First object
   * @param {Object} obj2 - Second object
   * @returns {boolean} True if shallowly equal
   */
  static shallowEqual(t, e) {
    if (t === e)
      return !0;
    if (!t || !e)
      return !1;
    if (typeof t != "object" || typeof e != "object")
      return t === e;
    const s = Object.keys(t), i = Object.keys(e);
    if (s.length !== i.length)
      return !1;
    for (const a of s)
      if (t[a] !== e[a])
        return !1;
    return !0;
  }
  static log10(t) {
    return Math.log(t) / Math.LN10;
  }
  static roundToBase10(t) {
    return Math.pow(10, Math.floor(Math.log10(t)));
  }
  static roundToBase(t, e) {
    return Math.pow(e, Math.floor(Math.log(t) / Math.log(e)));
  }
  static parseNumber(t) {
    return typeof t == "number" || t === null ? t : parseFloat(t);
  }
  static stripNumber(t, e = 2) {
    return Number.isInteger(t) ? t : parseFloat(t.toPrecision(e));
  }
  static randomId() {
    return (Math.random() + 1).toString(36).substring(4);
  }
  static noExponents(t) {
    return t.toString().includes("e") ? Math.round(t) : t;
  }
  static elementExists(t) {
    return !(!t || !t.isConnected);
  }
  /**
   * detects if an element is inside a Shadow DOM
   */
  static isInShadowDOM(t) {
    if (!t || !t.getRootNode)
      return !1;
    const e = t.getRootNode();
    return e && e !== document && ht.is("ShadowRoot", e);
  }
  /**
   * gets the shadow root host element
   */
  static getShadowRootHost(t) {
    return ht.isInShadowDOM(t) && t.getRootNode().host || null;
  }
  static getDimensions(t) {
    if (!t)
      return [0, 0];
    if (B.isSSR())
      return [t._ssrWidth || 400, t._ssrHeight || 300];
    const e = t.getRootNode && t.getRootNode();
    if (e && e !== document && e.host) {
      const r = e.host.getBoundingClientRect();
      return [r.width, r.height];
    }
    let i;
    try {
      i = getComputedStyle(t, null);
    } catch {
      return [t.clientWidth || 0, t.clientHeight || 0];
    }
    let a = t.clientHeight, o = t.clientWidth;
    return a -= parseFloat(i.paddingTop) + parseFloat(i.paddingBottom), o -= parseFloat(i.paddingLeft) + parseFloat(i.paddingRight), [o, a];
  }
  static getBoundingClientRect(t) {
    if (!t)
      return {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        width: 0,
        height: 0,
        x: 0,
        y: 0
      };
    if (B.isSSR())
      return N.getBoundingClientRect(t);
    const e = t.getBoundingClientRect();
    return {
      top: e.top,
      right: e.right,
      bottom: e.bottom,
      left: e.left,
      width: t.clientWidth,
      height: t.clientHeight,
      x: e.left,
      y: e.top
    };
  }
  static getLargestStringFromArr(t) {
    return t.reduce((e, s) => (Array.isArray(s) && (s = s.reduce((i, a) => i.length > a.length ? i : a)), e.length > s.length ? e : s), 0);
  }
  // http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb#answer-12342275
  static hexToRgba(t = "#999999", e = 0.6) {
    t.substring(0, 1) !== "#" && (t = "#999999");
    let s = t.replace("#", "");
    s = s.match(new RegExp("(.{" + s.length / 3 + "})", "g"));
    for (let i = 0; i < s.length; i++)
      s[i] = parseInt(s[i].length === 1 ? s[i] + s[i] : s[i], 16);
    return typeof e < "u" && s.push(e), "rgba(" + s.join(",") + ")";
  }
  static getOpacityFromRGBA(t) {
    return parseFloat(t.replace(/^.*,(.+)\)/, "$1"));
  }
  static rgb2hex(t) {
    return t = t.match(
      /^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
    ), t && t.length === 4 ? "#" + ("0" + parseInt(t[1], 10).toString(16)).slice(-2) + ("0" + parseInt(t[2], 10).toString(16)).slice(-2) + ("0" + parseInt(t[3], 10).toString(16)).slice(-2) : "";
  }
  shadeRGBColor(t, e) {
    const s = e.split(","), i = t < 0 ? 0 : 255, a = t < 0 ? t * -1 : t, o = parseInt(s[0].slice(4), 10), r = parseInt(s[1], 10), n = parseInt(s[2], 10);
    return "rgb(" + (Math.round((i - o) * a) + o) + "," + (Math.round((i - r) * a) + r) + "," + (Math.round((i - n) * a) + n) + ")";
  }
  shadeHexColor(t, e) {
    const s = parseInt(e.slice(1), 16), i = t < 0 ? 0 : 255, a = t < 0 ? t * -1 : t, o = s >> 16, r = s >> 8 & 255, n = s & 255;
    return "#" + (16777216 + (Math.round((i - o) * a) + o) * 65536 + (Math.round((i - r) * a) + r) * 256 + (Math.round((i - n) * a) + n)).toString(16).slice(1);
  }
  // beautiful color shading blending code
  // http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
  shadeColor(t, e) {
    return ht.isColorHex(e) ? this.shadeHexColor(t, e) : this.shadeRGBColor(t, e);
  }
  static isColorHex(t) {
    return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9A-F]{8}$)/i.test(t);
  }
  static isCSSVariable(t) {
    if (typeof t != "string")
      return !1;
    const e = t.trim();
    return e.startsWith("var(") && e.endsWith(")");
  }
  static getThemeColor(t) {
    if (!ht.isCSSVariable(t) || B.isSSR())
      return t;
    const e = document.createElement("div");
    e.style.cssText = "position:fixed; left: -9999px; visibility:hidden;", e.style.color = t, document.body.appendChild(e);
    let s;
    try {
      s = window.getComputedStyle(e).color;
    } finally {
      e.parentNode && e.parentNode.removeChild(e);
    }
    return s;
  }
  static getPolygonPos(t, e) {
    const s = [], i = Math.PI * 2 / e;
    for (let a = 0; a < e; a++) {
      const o = {};
      o.x = t * Math.sin(a * i), o.y = -t * Math.cos(a * i), s.push(o);
    }
    return s;
  }
  static polarToCartesian(t, e, s, i) {
    const a = (i - 90) * Math.PI / 180;
    return {
      x: t + s * Math.cos(a),
      y: e + s * Math.sin(a)
    };
  }
  static escapeString(t, e = "x") {
    let s = t.toString().slice();
    return s = s.replace(
      /[` ~!@#$%^&*()|+=?;:'",.<>{}[\]\\/]/gi,
      e
    ), s;
  }
  static negToZero(t) {
    return t < 0 ? 0 : t;
  }
  static moveIndexInArray(t, e, s) {
    if (s >= t.length) {
      let i = s - t.length + 1;
      for (; i--; )
        t.push(void 0);
    }
    return t.splice(s, 0, t.splice(e, 1)[0]), t;
  }
  static extractNumber(t) {
    return parseFloat(t.replace(/[^\d.]*/g, ""));
  }
  static findAncestor(t, e) {
    for (; (t = t.parentElement) && !t.classList.contains(e); )
      ;
    return t;
  }
  static setELstyles(t, e) {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && (t.style.key = e[s]);
  }
  // prevents JS prevision errors when adding
  static preciseAddition(t, e) {
    const s = (String(t).split(".")[1] || "").length, i = (String(e).split(".")[1] || "").length, a = Math.pow(10, Math.max(s, i));
    return (Math.round(t * a) + Math.round(e * a)) / a;
  }
  static isNumber(t) {
    return !isNaN(t) && parseFloat(Number(t)) === t && !isNaN(parseInt(t, 10));
  }
  static isFloat(t) {
    return Number(t) === t && t % 1 !== 0;
  }
  static isMsEdge() {
    if (B.isSSR())
      return !1;
    const t = window.navigator.userAgent, e = t.indexOf("Edge/");
    return e > 0 ? parseInt(t.substring(e + 5, t.indexOf(".", e)), 10) : !1;
  }
  //
  // Find the Greatest Common Divisor of two numbers
  //
  static getGCD(t, e, s = 7) {
    let i = Math.pow(10, s - Math.floor(Math.log10(Math.max(t, e))));
    for (i > 1 ? (t = Math.round(Math.abs(t) * i), e = Math.round(Math.abs(e) * i)) : i = 1; e; ) {
      const a = e;
      e = t % e, t = a;
    }
    return t / i;
  }
  static getPrimeFactors(t) {
    const e = [];
    let s = 2;
    for (; t >= 2; )
      t % s == 0 ? (e.push(s), t = t / s) : s++;
    return e;
  }
  static mod(t, e, s = 7) {
    const i = Math.pow(10, s - Math.floor(Math.log10(Math.max(t, e))));
    return t = Math.round(Math.abs(t) * i), e = Math.round(Math.abs(e) * i), t % e / i;
  }
};
class q {
  constructor(t) {
    this.w = t, this.months31 = [1, 3, 5, 7, 8, 10, 12], this.months30 = [2, 4, 6, 9, 11], this.daysCntOfYear = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
  }
  isValidDate(t) {
    return typeof t == "number" ? !1 : !isNaN(this.parseDate(t));
  }
  getTimeStamp(t) {
    return Date.parse(t) ? this.w.config.xaxis.labels.datetimeUTC ? new Date(new Date(t).toISOString().substr(0, 25)).getTime() : new Date(t).getTime() : t;
  }
  getDate(t) {
    return this.w.config.xaxis.labels.datetimeUTC ? new Date(new Date(t).toUTCString()) : new Date(t);
  }
  parseDate(t) {
    const e = Date.parse(t);
    if (!isNaN(e))
      return this.getTimeStamp(t);
    let s = Date.parse(t.replace(/-/g, "/").replace(/[a-z]+/gi, " "));
    return s = this.getTimeStamp(s), s;
  }
  // This fixes the difference of x-axis labels between chrome/safari
  // Fixes #1726, #1544, #1485, #1255
  parseDateWithTimezone(t) {
    return Date.parse(t.replace(/-/g, "/").replace(/[a-z]+/gi, " "));
  }
  // http://stackoverflow.com/questions/14638018/current-time-formatting-with-javascript#answer-14638191
  formatDate(t, e) {
    const s = this.w.globals.locale, i = this.w.config.xaxis.labels.datetimeUTC, a = ["\0", ...s.months], o = ["", ...s.shortMonths], r = ["", ...s.days], n = ["", ...s.shortDays];
    function l(C, D) {
      let S = C + "";
      for (D = D || 2; S.length < D; )
        S = "0" + S;
      return S;
    }
    const c = i ? t.getUTCFullYear() : t.getFullYear();
    e = e.replace(/(^|[^\\])yyyy+/g, "$1" + c), e = e.replace(/(^|[^\\])yy/g, "$1" + c.toString().substr(2, 2)), e = e.replace(/(^|[^\\])y/g, "$1" + c);
    const h = (i ? t.getUTCMonth() : t.getMonth()) + 1;
    e = e.replace(/(^|[^\\])MMMM+/g, "$1" + a[0]), e = e.replace(/(^|[^\\])MMM/g, "$1" + o[0]), e = e.replace(/(^|[^\\])MM/g, "$1" + l(h)), e = e.replace(/(^|[^\\])M/g, "$1" + h);
    const d = i ? t.getUTCDate() : t.getDate();
    e = e.replace(/(^|[^\\])dddd+/g, "$1" + r[0]), e = e.replace(/(^|[^\\])ddd/g, "$1" + n[0]), e = e.replace(/(^|[^\\])dd/g, "$1" + l(d)), e = e.replace(/(^|[^\\])d/g, "$1" + d);
    const p = i ? t.getUTCHours() : t.getHours();
    e = e.replace(/(^|[^\\])HH+/g, "$1" + l(p)), e = e.replace(/(^|[^\\])H/g, "$1" + p);
    const g = p > 12 ? p - 12 : p === 0 ? 12 : p;
    e = e.replace(/(^|[^\\])hh+/g, "$1" + l(g)), e = e.replace(/(^|[^\\])h/g, "$1" + g);
    const f = i ? t.getUTCMinutes() : t.getMinutes();
    e = e.replace(/(^|[^\\])mm+/g, "$1" + l(f)), e = e.replace(/(^|[^\\])m/g, "$1" + f);
    const x = i ? t.getUTCSeconds() : t.getSeconds();
    e = e.replace(/(^|[^\\])ss+/g, "$1" + l(x)), e = e.replace(/(^|[^\\])s/g, "$1" + x);
    let m = i ? t.getUTCMilliseconds() : t.getMilliseconds();
    e = e.replace(/(^|[^\\])fff+/g, "$1" + l(m, 3)), m = Math.round(m / 10), e = e.replace(/(^|[^\\])ff/g, "$1" + l(m)), m = Math.round(m / 10), e = e.replace(/(^|[^\\])f/g, "$1" + m);
    const u = p < 12 ? "AM" : "PM";
    e = e.replace(/(^|[^\\])TT+/g, "$1" + u), e = e.replace(/(^|[^\\])T/g, "$1" + u.charAt(0));
    const y = u.toLowerCase();
    e = e.replace(/(^|[^\\])tt+/g, "$1" + y), e = e.replace(/(^|[^\\])t/g, "$1" + y.charAt(0));
    let b = -t.getTimezoneOffset(), w = i || !b ? "Z" : b > 0 ? "+" : "-";
    if (!i) {
      b = Math.abs(b);
      const C = Math.floor(b / 60), D = b % 60;
      w += l(C) + ":" + l(D);
    }
    e = e.replace(/(^|[^\\])K/g, "$1" + w);
    const v = (i ? t.getUTCDay() : t.getDay()) + 1;
    return e = e.replace(new RegExp(r[0], "g"), r[v]), e = e.replace(new RegExp(n[0], "g"), n[v]), e = e.replace(new RegExp(a[0], "g"), a[h]), e = e.replace(new RegExp(o[0], "g"), o[h]), e = e.replace(/\\(.)/g, "$1"), e;
  }
  getTimeUnitsfromTimestamp(t, e) {
    const s = this.w;
    s.config.xaxis.min !== void 0 && (t = s.config.xaxis.min), s.config.xaxis.max !== void 0 && (e = s.config.xaxis.max);
    const i = this.getDate(t), a = this.getDate(e), o = this.formatDate(i, "yyyy MM dd HH mm ss fff").split(" "), r = this.formatDate(a, "yyyy MM dd HH mm ss fff").split(" ");
    return {
      minMillisecond: parseInt(o[6], 10),
      maxMillisecond: parseInt(r[6], 10),
      minSecond: parseInt(o[5], 10),
      maxSecond: parseInt(r[5], 10),
      minMinute: parseInt(o[4], 10),
      maxMinute: parseInt(r[4], 10),
      minHour: parseInt(o[3], 10),
      maxHour: parseInt(r[3], 10),
      minDate: parseInt(o[2], 10),
      maxDate: parseInt(r[2], 10),
      minMonth: parseInt(o[1], 10) - 1,
      maxMonth: parseInt(r[1], 10) - 1,
      minYear: parseInt(o[0], 10),
      maxYear: parseInt(r[0], 10)
    };
  }
  isLeapYear(t) {
    return t % 4 === 0 && t % 100 !== 0 || t % 400 === 0;
  }
  calculcateLastDaysOfMonth(t, e, s) {
    return this.determineDaysOfMonths(t, e) - s;
  }
  determineDaysOfYear(t) {
    let e = 365;
    return this.isLeapYear(t) && (e = 366), e;
  }
  determineRemainingDaysOfYear(t, e, s) {
    let i = this.daysCntOfYear[e] + s;
    return e > 1 && this.isLeapYear() && i++, i;
  }
  determineDaysOfMonths(t, e) {
    let s = 30;
    switch (t = L.monthMod(t), !0) {
      case this.months30.indexOf(t) > -1:
        t === 2 && (this.isLeapYear(e) ? s = 29 : s = 28);
        break;
      case this.months31.indexOf(t) > -1:
        s = 31;
        break;
      default:
        s = 31;
        break;
    }
    return s;
  }
}
class vt {
  constructor(t) {
    this.w = t, this.tooltipKeyFormat = "dd MMM";
  }
  xLabelFormat(t, e, s, i) {
    const a = this.w;
    if (a.config.xaxis.type === "datetime" && a.config.xaxis.labels.formatter === void 0 && a.config.tooltip.x.formatter === void 0) {
      const o = new q(this.w);
      return o.formatDate(
        o.getDate(e),
        a.config.tooltip.x.format
      );
    }
    return t(e, s, i);
  }
  defaultGeneralFormatter(t) {
    return Array.isArray(t) ? t.map((e) => e) : t;
  }
  defaultYFormatter(t, e) {
    const s = this.w;
    if (L.isNumber(t))
      if (s.globals.yValueDecimal !== 0)
        t = t.toFixed(
          e.decimalsInFloat !== void 0 ? e.decimalsInFloat : s.globals.yValueDecimal
        );
      else {
        const i = t.toFixed(0);
        t = t == i ? i : t.toFixed(1);
      }
    return t;
  }
  setLabelFormatters() {
    const t = this.w, e = t.formatters;
    return e.xaxisTooltipFormatter = (s) => this.defaultGeneralFormatter(s), e.ttKeyFormatter = (s) => this.defaultGeneralFormatter(s), e.ttZFormatter = (s) => s, e.legendFormatter = (s) => this.defaultGeneralFormatter(s), t.config.xaxis.labels.formatter !== void 0 ? e.xLabelFormatter = t.config.xaxis.labels.formatter : e.xLabelFormatter = (s) => {
      if (L.isNumber(s)) {
        if (!t.config.xaxis.convertedCatToNumeric && t.config.xaxis.type === "numeric") {
          if (L.isNumber(t.config.xaxis.decimalsInFloat))
            return s.toFixed(t.config.xaxis.decimalsInFloat);
          {
            const i = t.globals.maxX - t.globals.minX;
            return i > 0 && i < 100 ? s.toFixed(1) : s.toFixed(0);
          }
        }
        return t.globals.isBarHorizontal && t.globals.maxY - t.globals.minYArr < 4 ? s.toFixed(1) : s.toFixed(0);
      }
      return s;
    }, typeof t.config.tooltip.x.formatter == "function" ? e.ttKeyFormatter = t.config.tooltip.x.formatter : e.ttKeyFormatter = e.xLabelFormatter, typeof t.config.xaxis.tooltip.formatter == "function" && (e.xaxisTooltipFormatter = t.config.xaxis.tooltip.formatter), (Array.isArray(t.config.tooltip.y) || t.config.tooltip.y.formatter !== void 0) && (e.ttVal = t.config.tooltip.y), t.config.tooltip.z.formatter !== void 0 && (e.ttZFormatter = t.config.tooltip.z.formatter), t.config.legend.formatter !== void 0 && (e.legendFormatter = t.config.legend.formatter), e.yLabelFormatters = [], t.config.yaxis.forEach((s, i) => {
      s.labels.formatter !== void 0 ? e.yLabelFormatters[i] = s.labels.formatter : e.yLabelFormatters[i] = (a) => t.globals.xyCharts ? Array.isArray(a) ? a.map((o) => this.defaultYFormatter(o, s, i)) : this.defaultYFormatter(a, s, i) : a;
    }), t.globals;
  }
  heatmapLabelFormatters() {
    const t = this.w;
    if (t.config.chart.type === "heatmap") {
      t.globals.yAxisScale[0].result = t.seriesData.seriesNames.slice();
      const e = t.seriesData.seriesNames.reduce(
        (s, i) => s.length > i.length ? s : i,
        0
      );
      t.globals.yAxisScale[0].niceMax = e, t.globals.yAxisScale[0].niceMin = e;
    }
  }
}
const Ft = ({
  isTimeline: A,
  seriesIndex: t,
  dataPointIndex: e,
  y1: s,
  y2: i,
  w: a
}) => {
  var o;
  let r = a.rangeData.seriesRangeStart[t][e], n = a.rangeData.seriesRangeEnd[t][e], l = a.labelData.labels[e], c = a.config.series[t].name ? a.config.series[t].name : "";
  const h = a.formatters.ttKeyFormatter, d = a.config.tooltip.y.title.formatter, p = {
    w: a,
    seriesIndex: t,
    dataPointIndex: e,
    start: r,
    end: n
  };
  typeof d == "function" && (c = d(c, p)), (o = a.config.series[t].data[e]) != null && o.x && (l = a.config.series[t].data[e].x), A || a.config.xaxis.type === "datetime" && (l = new vt(a).xLabelFormat(a.formatters.ttKeyFormatter, l, l, {
    i: void 0,
    dateFormatter: new q(a).formatDate,
    w: a
  })), typeof h == "function" && (l = h(l, p)), Number.isFinite(s) && Number.isFinite(i) && (r = s, n = i);
  let g = "", f = "";
  const x = a.globals.colors[t];
  if (a.config.tooltip.x.formatter === void 0)
    if (a.config.xaxis.type === "datetime") {
      const m = new q(a);
      g = m.formatDate(
        m.getDate(r),
        a.config.tooltip.x.format
      ), f = m.formatDate(
        m.getDate(n),
        a.config.tooltip.x.format
      );
    } else
      g = r, f = n;
  else
    g = a.config.tooltip.x.formatter(r), f = a.config.tooltip.x.formatter(n);
  return { start: r, end: n, startVal: g, endVal: f, ylabel: l, color: x, seriesName: c };
}, Et = (A) => {
  let { color: t, seriesName: e, ylabel: s, start: i, end: a, seriesIndex: o, dataPointIndex: r } = A;
  const n = A.w.globals.tooltip.tooltipLabels.getFormatters(o);
  i = n.yLbFormatter(i), a = n.yLbFormatter(a);
  const l = n.yLbFormatter(
    A.w.seriesData.series[o][r]
  );
  let c = "";
  const h = `<span class="value start-value">
  ${i}
  </span> <span class="separator">-</span> <span class="value end-value">
  ${a}
  </span>`;
  return A.w.globals.comboCharts ? A.w.config.series[o].type === "rangeArea" || A.w.config.series[o].type === "rangeBar" ? c = h : c = `<span>${l}</span>` : c = h, '<div class="apexcharts-tooltip-rangebar"><div> <span class="series-name" style="color: ' + t + '">' + (e || "") + '</span></div><div> <span class="category">' + s + ": </span> " + c + " </div></div>";
};
class bt {
  constructor(t) {
    this.opts = t;
  }
  hideYAxis() {
    this.opts.yaxis[0].show = !1, this.opts.yaxis[0].title.text = "", this.opts.yaxis[0].axisBorder.show = !1, this.opts.yaxis[0].axisTicks.show = !1, this.opts.yaxis[0].floating = !0;
  }
  line() {
    return {
      dataLabels: {
        enabled: !1
      },
      stroke: {
        width: 5,
        curve: "straight"
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        crosshairs: {
          width: 1
        }
      }
    };
  }
  sparkline(t) {
    this.hideYAxis();
    const e = {
      grid: {
        show: !1,
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      legend: {
        show: !1
      },
      xaxis: {
        labels: {
          show: !1
        },
        tooltip: {
          enabled: !1
        },
        axisBorder: {
          show: !1
        },
        axisTicks: {
          show: !1
        }
      },
      chart: {
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        }
      },
      dataLabels: {
        enabled: !1
      }
    };
    return L.extend(t, e);
  }
  slope() {
    return this.hideYAxis(), {
      chart: {
        toolbar: {
          show: !1
        },
        zoom: {
          enabled: !1
        }
      },
      dataLabels: {
        enabled: !0,
        formatter(t, e) {
          const s = e.w.config.series[e.seriesIndex].name;
          return t !== null ? s + ": " + t : "";
        },
        background: {
          enabled: !1
        },
        offsetX: -5
      },
      grid: {
        xaxis: {
          lines: {
            show: !0
          }
        },
        yaxis: {
          lines: {
            show: !1
          }
        }
      },
      xaxis: {
        position: "top",
        labels: {
          style: {
            fontSize: 14,
            fontWeight: 900
          }
        },
        tooltip: {
          enabled: !1
        },
        crosshairs: {
          show: !1
        }
      },
      markers: {
        size: 8,
        hover: {
          sizeOffset: 1
        }
      },
      legend: {
        show: !1
      },
      tooltip: {
        shared: !1,
        intersect: !0,
        followCursor: !0
      },
      stroke: {
        width: 5,
        curve: "straight"
      }
    };
  }
  bar() {
    return {
      chart: {
        stacked: !1
      },
      plotOptions: {
        bar: {
          dataLabels: {
            position: "center"
          }
        }
      },
      dataLabels: {
        style: {
          colors: ["#fff"]
        },
        background: {
          enabled: !1
        }
      },
      stroke: {
        width: 0,
        lineCap: "square"
      },
      fill: {
        opacity: 0.85
      },
      legend: {
        markers: {
          shape: "square"
        }
      },
      tooltip: {
        shared: !1,
        intersect: !0
      },
      xaxis: {
        tooltip: {
          enabled: !1
        },
        tickPlacement: "between",
        crosshairs: {
          width: "barWidth",
          position: "back",
          fill: {
            type: "gradient"
          },
          dropShadow: {
            enabled: !1
          },
          stroke: {
            width: 0
          }
        }
      }
    };
  }
  funnel() {
    return this.hideYAxis(), O(I({}, this.bar()), {
      chart: {
        animations: {
          speed: 800,
          animateGradually: {
            enabled: !1
          }
        }
      },
      plotOptions: {
        bar: {
          horizontal: !0,
          borderRadiusApplication: "around",
          borderRadius: 0,
          dataLabels: {
            position: "center"
          }
        }
      },
      grid: {
        show: !1,
        padding: {
          left: 0,
          right: 0
        }
      },
      xaxis: {
        labels: {
          show: !1
        },
        tooltip: {
          enabled: !1
        },
        axisBorder: {
          show: !1
        },
        axisTicks: {
          show: !1
        }
      }
    });
  }
  candlestick() {
    return {
      stroke: {
        width: 1
      },
      fill: {
        opacity: 1
      },
      dataLabels: {
        enabled: !1
      },
      tooltip: {
        shared: !0,
        custom: ({ seriesIndex: t, dataPointIndex: e, w: s }) => this._getBoxTooltip(
          s,
          t,
          e,
          ["Open", "High", "", "Low", "Close"],
          "candlestick"
        )
      },
      states: {
        active: {
          filter: {
            type: "none"
          }
        }
      },
      xaxis: {
        crosshairs: {
          width: 1
        }
      }
    };
  }
  boxPlot() {
    return {
      chart: {
        animations: {
          dynamicAnimation: {
            enabled: !1
          }
        }
      },
      stroke: {
        width: 1,
        colors: ["#24292e"]
      },
      dataLabels: {
        enabled: !1
      },
      tooltip: {
        shared: !0,
        custom: ({ seriesIndex: t, dataPointIndex: e, w: s }) => this._getBoxTooltip(
          s,
          t,
          e,
          ["Minimum", "Q1", "Median", "Q3", "Maximum"],
          "boxPlot"
        )
      },
      markers: {
        size: 7,
        strokeWidth: 1,
        strokeColors: "#111"
      },
      xaxis: {
        crosshairs: {
          width: 1
        }
      }
    };
  }
  rangeBar() {
    const t = (s) => {
      const { color: i, seriesName: a, ylabel: o, startVal: r, endVal: n } = Ft(O(I({}, s), {
        isTimeline: !0
      }));
      return Et(O(I({}, s), {
        color: i,
        seriesName: a,
        ylabel: o,
        start: r,
        end: n
      }));
    }, e = (s) => {
      const { color: i, seriesName: a, ylabel: o, start: r, end: n } = Ft(s);
      return Et(O(I({}, s), {
        color: i,
        seriesName: a,
        ylabel: o,
        start: r,
        end: n
      }));
    };
    return {
      chart: {
        animations: {
          animateGradually: !1
        }
      },
      stroke: {
        width: 0,
        lineCap: "square"
      },
      plotOptions: {
        bar: {
          borderRadius: 0,
          dataLabels: {
            position: "center"
          }
        }
      },
      dataLabels: {
        enabled: !1,
        formatter(s, { seriesIndex: i, dataPointIndex: a, w: o }) {
          const r = () => {
            const n = o.rangeData.seriesRangeStart[i][a];
            return o.rangeData.seriesRangeEnd[i][a] - n;
          };
          return o.globals.comboCharts ? o.config.series[i].type === "rangeBar" || o.config.series[i].type === "rangeArea" ? r() : s : r();
        },
        background: {
          enabled: !1
        },
        style: {
          colors: ["#fff"]
        }
      },
      markers: {
        size: 10
      },
      tooltip: {
        shared: !1,
        followCursor: !0,
        custom(s) {
          return s.w.config.plotOptions && s.w.config.plotOptions.bar && s.w.config.plotOptions.bar.horizontal ? t(s) : e(s);
        }
      },
      xaxis: {
        tickPlacement: "between",
        tooltip: {
          enabled: !1
        },
        crosshairs: {
          stroke: {
            width: 0
          }
        }
      }
    };
  }
  dumbbell(t) {
    var e, s;
    return (e = t.plotOptions.bar) != null && e.barHeight || (t.plotOptions.bar.barHeight = 2), (s = t.plotOptions.bar) != null && s.columnWidth || (t.plotOptions.bar.columnWidth = 2), t;
  }
  area() {
    return {
      stroke: {
        width: 4,
        fill: {
          type: "solid",
          gradient: {
            inverseColors: !1,
            shade: "light",
            type: "vertical",
            opacityFrom: 0.65,
            opacityTo: 0.5,
            stops: [0, 100, 100]
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          inverseColors: !1,
          shade: "light",
          type: "vertical",
          opacityFrom: 0.65,
          opacityTo: 0.5,
          stops: [0, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          sizeOffset: 6
        }
      },
      tooltip: {
        followCursor: !1
      }
    };
  }
  rangeArea() {
    const t = (e) => {
      const { color: s, seriesName: i, ylabel: a, start: o, end: r } = Ft(e);
      return Et(O(I({}, e), {
        color: s,
        seriesName: i,
        ylabel: a,
        start: o,
        end: r
      }));
    };
    return {
      stroke: {
        curve: "straight",
        width: 0
      },
      fill: {
        type: "solid",
        opacity: 0.6
      },
      markers: {
        size: 0
      },
      states: {
        hover: {
          filter: {
            type: "none"
          }
        },
        active: {
          filter: {
            type: "none"
          }
        }
      },
      tooltip: {
        intersect: !1,
        shared: !0,
        followCursor: !0,
        custom(e) {
          return t(e);
        }
      }
    };
  }
  brush(t) {
    const e = {
      chart: {
        toolbar: {
          autoSelected: "selection",
          show: !1
        },
        zoom: {
          enabled: !1
        }
      },
      dataLabels: {
        enabled: !1
      },
      stroke: {
        width: 1
      },
      tooltip: {
        enabled: !1
      },
      xaxis: {
        tooltip: {
          enabled: !1
        }
      }
    };
    return L.extend(t, e);
  }
  stacked100(t) {
    t.dataLabels = t.dataLabels || {}, t.dataLabels.formatter = t.dataLabels.formatter || void 0;
    const e = t.dataLabels.formatter;
    return t.yaxis.forEach((i, a) => {
      t.yaxis[a].min = 0, t.yaxis[a].max = 100;
    }), t.chart.type === "bar" && (t.dataLabels.formatter = e || function(i) {
      return typeof i == "number" ? i && i.toFixed(0) + "%" : i;
    }), t;
  }
  stackedBars() {
    const t = this.bar();
    return O(I({}, t), {
      plotOptions: O(I({}, t.plotOptions), {
        bar: O(I({}, t.plotOptions.bar), {
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last"
        })
      })
    });
  }
  // This function removes the left and right spacing in chart for line/area/scatter if xaxis type = category for those charts by converting xaxis = numeric. Numeric/Datetime xaxis prevents the unnecessary spacing in the left/right of the chart area
  convertCatToNumeric(t) {
    return t.xaxis.convertedCatToNumeric = !0, t;
  }
  convertCatToNumericXaxis(t, e) {
    t.xaxis.type = "numeric", t.xaxis.labels = t.xaxis.labels || {}, t.xaxis.labels.formatter = t.xaxis.labels.formatter || function(a) {
      return L.isNumber(a) ? Math.floor(a) : a;
    };
    const s = t.xaxis.labels.formatter;
    let i = t.xaxis.categories && t.xaxis.categories.length ? t.xaxis.categories : t.labels;
    return e && e.length && (i = e.map((a) => Array.isArray(a) ? a : String(a))), i && i.length && (t.xaxis.labels.formatter = function(a) {
      return L.isNumber(a) ? s(i[Math.floor(a) - 1]) : s(a);
    }), t.xaxis.categories = [], t.labels = [], t.xaxis.tickAmount = t.xaxis.tickAmount || "dataPoints", t;
  }
  bubble() {
    return {
      dataLabels: {
        style: {
          colors: ["#fff"]
        }
      },
      tooltip: {
        shared: !1,
        intersect: !0
      },
      xaxis: {
        crosshairs: {
          width: 0
        }
      },
      fill: {
        type: "solid",
        gradient: {
          shade: "light",
          inverse: !0,
          shadeIntensity: 0.55,
          opacityFrom: 0.4,
          opacityTo: 0.8
        }
      }
    };
  }
  scatter() {
    return {
      dataLabels: {
        enabled: !1
      },
      tooltip: {
        shared: !1,
        intersect: !0
      },
      markers: {
        size: 6,
        strokeWidth: 1,
        hover: {
          sizeOffset: 2
        }
      }
    };
  }
  heatmap() {
    return {
      chart: {
        stacked: !1
      },
      fill: {
        opacity: 1
      },
      dataLabels: {
        style: {
          colors: ["#fff"]
        }
      },
      stroke: {
        colors: ["#fff"]
      },
      tooltip: {
        followCursor: !0,
        marker: {
          show: !1
        },
        x: {
          show: !1
        }
      },
      legend: {
        position: "top",
        markers: {
          shape: "square"
        }
      },
      grid: {
        padding: {
          right: 20
        }
      }
    };
  }
  treemap() {
    return {
      chart: {
        zoom: {
          enabled: !1
        }
      },
      dataLabels: {
        style: {
          fontSize: 14,
          fontWeight: 600,
          colors: ["#fff"]
        }
      },
      stroke: {
        show: !0,
        width: 2,
        colors: ["#fff"]
      },
      legend: {
        show: !1
      },
      fill: {
        opacity: 1,
        gradient: {
          stops: [0, 100]
        }
      },
      tooltip: {
        followCursor: !0,
        x: {
          show: !1
        }
      },
      grid: {
        padding: {
          left: 0,
          right: 0
        }
      },
      xaxis: {
        crosshairs: {
          show: !1
        },
        tooltip: {
          enabled: !1
        }
      }
    };
  }
  pie() {
    return {
      chart: {
        toolbar: {
          show: !1
        }
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: !1
            }
          }
        }
      },
      dataLabels: {
        formatter(t) {
          return t.toFixed(1) + "%";
        },
        style: {
          colors: ["#fff"]
        },
        background: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0
        }
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 1,
        gradient: {
          shade: "light",
          stops: [0, 100]
        }
      },
      tooltip: {
        theme: "dark",
        fillSeriesColor: !0
      },
      legend: {
        position: "right"
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  donut() {
    return {
      chart: {
        toolbar: {
          show: !1
        }
      },
      dataLabels: {
        formatter(t) {
          return t.toFixed(1) + "%";
        },
        style: {
          colors: ["#fff"]
        },
        background: {
          enabled: !1
        },
        dropShadow: {
          enabled: !0
        }
      },
      stroke: {
        colors: ["#fff"]
      },
      fill: {
        opacity: 1,
        gradient: {
          shade: "light",
          shadeIntensity: 0.35,
          stops: [80, 100],
          opacityFrom: 1,
          opacityTo: 1
        }
      },
      tooltip: {
        theme: "dark",
        fillSeriesColor: !0
      },
      legend: {
        position: "right"
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  polarArea() {
    return {
      chart: {
        toolbar: {
          show: !1
        }
      },
      dataLabels: {
        formatter(t) {
          return t.toFixed(1) + "%";
        },
        enabled: !1
      },
      stroke: {
        show: !0,
        width: 2
      },
      fill: {
        opacity: 0.7
      },
      tooltip: {
        theme: "dark",
        fillSeriesColor: !0
      },
      legend: {
        position: "right"
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  radar() {
    return this.opts.yaxis[0].labels.offsetY = this.opts.yaxis[0].labels.offsetY ? this.opts.yaxis[0].labels.offsetY : 6, {
      dataLabels: {
        enabled: !1,
        style: {
          fontSize: "11px"
        }
      },
      stroke: {
        width: 2
      },
      markers: {
        size: 5,
        strokeWidth: 1,
        strokeOpacity: 1
      },
      fill: {
        opacity: 0.2
      },
      tooltip: {
        shared: !1,
        intersect: !0,
        followCursor: !0
      },
      grid: {
        show: !1,
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      },
      xaxis: {
        labels: {
          formatter: (t) => t,
          style: {
            colors: ["#a8a8a8"],
            fontSize: "11px"
          }
        },
        tooltip: {
          enabled: !1
        },
        crosshairs: {
          show: !1
        }
      }
    };
  }
  radialBar() {
    return {
      chart: {
        animations: {
          dynamicAnimation: {
            enabled: !0,
            speed: 800
          }
        },
        toolbar: {
          show: !1
        }
      },
      fill: {
        gradient: {
          shade: "dark",
          shadeIntensity: 0.4,
          inverseColors: !1,
          type: "diagonal2",
          opacityFrom: 1,
          opacityTo: 1,
          stops: [70, 98, 100]
        }
      },
      legend: {
        show: !1,
        position: "right"
      },
      tooltip: {
        enabled: !1,
        fillSeriesColor: !0
      },
      grid: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0
        }
      }
    };
  }
  _getBoxTooltip(t, e, s, i, a) {
    const o = t.candleData.seriesCandleO[e][s], r = t.candleData.seriesCandleH[e][s], n = t.candleData.seriesCandleM[e][s], l = t.candleData.seriesCandleL[e][s], c = t.candleData.seriesCandleC[e][s];
    return t.config.series[e].type && t.config.series[e].type !== a ? `<div class="apexcharts-custom-tooltip">
          ${t.config.series[e].name ? t.config.series[e].name : "series-" + (e + 1)}: <strong>${t.seriesData.series[e][s]}</strong>
        </div>` : `<div class="apexcharts-tooltip-box apexcharts-tooltip-${t.config.chart.type}"><div>${i[0]}: <span class="value">` + o + `</span></div><div>${i[1]}: <span class="value">` + r + "</span></div>" + (n ? `<div>${i[2]}: <span class="value">` + n + "</span></div>" : "") + `<div>${i[3]}: <span class="value">` + l + `</span></div><div>${i[4]}: <span class="value">` + c + "</span></div></div>";
  }
}
const Ie = "en", Ye = { months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"], shortMonths: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], shortDays: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], toolbar: { exportToSVG: "Download SVG", exportToPNG: "Download PNG", exportToCSV: "Download CSV", menu: "Menu", selection: "Selection", selectionZoom: "Selection Zoom", zoomIn: "Zoom In", zoomOut: "Zoom Out", pan: "Panning", reset: "Reset Zoom" } }, le = {
  name: Ie,
  options: Ye
};
class nt {
  constructor() {
    this.yAxis = {
      show: !0,
      showAlways: !1,
      showForNullSeries: !0,
      seriesName: void 0,
      opposite: !1,
      reversed: !1,
      logarithmic: !1,
      logBase: 10,
      tickAmount: void 0,
      stepSize: void 0,
      forceNiceScale: !1,
      max: void 0,
      min: void 0,
      floating: !1,
      decimalsInFloat: void 0,
      labels: {
        show: !0,
        showDuplicates: !1,
        minWidth: 0,
        maxWidth: 160,
        offsetX: 0,
        offsetY: 0,
        align: void 0,
        rotate: 0,
        padding: 20,
        style: {
          colors: [],
          fontSize: "11px",
          fontWeight: 400,
          fontFamily: void 0,
          cssClass: ""
        },
        formatter: void 0
      },
      axisBorder: {
        show: !1,
        color: "#e0e0e0",
        width: 1,
        offsetX: 0,
        offsetY: 0
      },
      axisTicks: {
        show: !1,
        color: "#e0e0e0",
        width: 6,
        offsetX: 0,
        offsetY: 0
      },
      title: {
        text: void 0,
        rotate: -90,
        offsetY: 0,
        offsetX: 0,
        style: {
          color: void 0,
          fontSize: "11px",
          fontWeight: 900,
          fontFamily: void 0,
          cssClass: ""
        }
      },
      tooltip: {
        enabled: !1,
        offsetX: 0
      },
      crosshairs: {
        show: !0,
        position: "front",
        stroke: {
          color: "#b6b6b6",
          width: 1,
          dashArray: 0
        }
      }
    }, this.pointAnnotation = {
      id: void 0,
      x: 0,
      y: null,
      yAxisIndex: 0,
      seriesIndex: void 0,
      mouseEnter: void 0,
      mouseLeave: void 0,
      click: void 0,
      marker: {
        size: 4,
        fillColor: "#fff",
        strokeWidth: 2,
        strokeColor: "#333",
        shape: "circle",
        offsetX: 0,
        offsetY: 0,
        // radius: 2, // DEPRECATED
        cssClass: ""
      },
      label: {
        borderColor: "#c2c2c2",
        borderWidth: 1,
        borderRadius: 2,
        text: void 0,
        textAnchor: "middle",
        offsetX: 0,
        offsetY: 0,
        mouseEnter: void 0,
        mouseLeave: void 0,
        click: void 0,
        style: {
          background: "#fff",
          color: void 0,
          fontSize: "11px",
          fontFamily: void 0,
          fontWeight: 400,
          cssClass: "",
          padding: {
            left: 5,
            right: 5,
            top: 2,
            bottom: 2
          }
        }
      },
      customSVG: {
        // this will be deprecated in the next major version as it is going to be replaced with a better alternative below (image)
        SVG: void 0,
        cssClass: void 0,
        offsetX: 0,
        offsetY: 0
      },
      image: {
        path: void 0,
        width: 20,
        height: 20,
        offsetX: 0,
        offsetY: 0
      }
    }, this.yAxisAnnotation = {
      id: void 0,
      y: 0,
      y2: null,
      strokeDashArray: 1,
      fillColor: "#c2c2c2",
      borderColor: "#c2c2c2",
      borderWidth: 1,
      opacity: 0.3,
      offsetX: 0,
      offsetY: 0,
      width: "100%",
      yAxisIndex: 0,
      label: {
        borderColor: "#c2c2c2",
        borderWidth: 1,
        borderRadius: 2,
        text: void 0,
        textAnchor: "end",
        position: "right",
        offsetX: 0,
        offsetY: -3,
        mouseEnter: void 0,
        mouseLeave: void 0,
        click: void 0,
        style: {
          background: "#fff",
          color: void 0,
          fontSize: "11px",
          fontFamily: void 0,
          fontWeight: 400,
          cssClass: "",
          padding: {
            left: 5,
            right: 5,
            top: 2,
            bottom: 2
          }
        }
      }
    }, this.xAxisAnnotation = {
      id: void 0,
      x: 0,
      x2: null,
      strokeDashArray: 1,
      fillColor: "#c2c2c2",
      borderColor: "#c2c2c2",
      borderWidth: 1,
      opacity: 0.3,
      offsetX: 0,
      offsetY: 0,
      label: {
        borderColor: "#c2c2c2",
        borderWidth: 1,
        borderRadius: 2,
        text: void 0,
        textAnchor: "middle",
        orientation: "vertical",
        position: "top",
        offsetX: 0,
        offsetY: 0,
        mouseEnter: void 0,
        mouseLeave: void 0,
        click: void 0,
        style: {
          background: "#fff",
          color: void 0,
          fontSize: "11px",
          fontFamily: void 0,
          fontWeight: 400,
          cssClass: "",
          padding: {
            left: 5,
            right: 5,
            top: 2,
            bottom: 2
          }
        }
      }
    }, this.text = {
      x: 0,
      y: 0,
      text: "",
      textAnchor: "start",
      foreColor: void 0,
      fontSize: "13px",
      fontFamily: void 0,
      fontWeight: 400,
      appendTo: ".apexcharts-annotations",
      backgroundColor: "transparent",
      borderColor: "#c2c2c2",
      borderRadius: 0,
      borderWidth: 0,
      paddingLeft: 4,
      paddingRight: 4,
      paddingTop: 2,
      paddingBottom: 2
    };
  }
  init() {
    return {
      annotations: {
        yaxis: [this.yAxisAnnotation],
        xaxis: [this.xAxisAnnotation],
        points: [this.pointAnnotation],
        texts: [],
        images: [],
        shapes: []
      },
      chart: {
        animations: {
          enabled: !0,
          speed: 800,
          animateGradually: {
            delay: 150,
            enabled: !0
          },
          dynamicAnimation: {
            enabled: !0,
            speed: 350
          }
        },
        background: "",
        locales: [le],
        defaultLocale: "en",
        dropShadow: {
          enabled: !1,
          enabledOnSeries: void 0,
          top: 2,
          left: 2,
          blur: 4,
          color: "#000",
          opacity: 0.7
        },
        events: {
          animationEnd: void 0,
          beforeMount: void 0,
          mounted: void 0,
          updated: void 0,
          click: void 0,
          mouseMove: void 0,
          mouseLeave: void 0,
          xAxisLabelClick: void 0,
          legendClick: void 0,
          markerClick: void 0,
          selection: void 0,
          dataPointSelection: void 0,
          dataPointMouseEnter: void 0,
          dataPointMouseLeave: void 0,
          beforeZoom: void 0,
          beforeResetZoom: void 0,
          zoomed: void 0,
          scrolled: void 0,
          brushScrolled: void 0,
          keyDown: void 0,
          keyUp: void 0
        },
        foreColor: "#373d3f",
        fontFamily: "Helvetica, Arial, sans-serif",
        height: "auto",
        parentHeightOffset: 15,
        redrawOnParentResize: !0,
        redrawOnWindowResize: !0,
        id: void 0,
        group: void 0,
        nonce: void 0,
        offsetX: 0,
        offsetY: 0,
        injectStyleSheet: !0,
        selection: {
          enabled: !1,
          type: "x",
          // selectedPoints: undefined, // default datapoints that should be selected automatically
          fill: {
            color: "#24292e",
            opacity: 0.1
          },
          stroke: {
            width: 1,
            color: "#24292e",
            opacity: 0.4,
            dashArray: 3
          },
          xaxis: {
            min: void 0,
            max: void 0
          },
          yaxis: {
            min: void 0,
            max: void 0
          }
        },
        sparkline: {
          enabled: !1
        },
        brush: {
          enabled: !1,
          autoScaleYaxis: !0,
          target: void 0,
          targets: void 0
        },
        stacked: !1,
        stackOnlyBar: !0,
        // mixed chart with stacked bars and line series - incorrect line draw #907
        stackType: "normal",
        toolbar: {
          show: !0,
          offsetX: 0,
          offsetY: 0,
          tools: {
            download: !0,
            selection: !0,
            zoom: !0,
            zoomin: !0,
            zoomout: !0,
            pan: !0,
            reset: !0,
            customIcons: []
          },
          export: {
            csv: {
              filename: void 0,
              columnDelimiter: ",",
              headerCategory: "category",
              headerValue: "value",
              categoryFormatter: void 0,
              valueFormatter: void 0
            },
            png: {
              filename: void 0
            },
            svg: {
              filename: void 0
            },
            scale: void 0,
            width: void 0
          },
          autoSelected: "zoom"
          // accepts -> zoom, pan, selection
        },
        type: "line",
        width: "100%",
        zoom: {
          enabled: !0,
          type: "x",
          autoScaleYaxis: !1,
          allowMouseWheelZoom: !0,
          zoomedArea: {
            fill: {
              color: "#90CAF9",
              opacity: 0.4
            },
            stroke: {
              color: "#0D47A1",
              opacity: 0.4,
              width: 1
            }
          }
        },
        accessibility: {
          enabled: !0,
          description: void 0,
          announcements: {
            enabled: !0
          },
          keyboard: {
            enabled: !0,
            navigation: {
              enabled: !0,
              wrapAround: !1
            }
          }
        }
      },
      parsing: {
        x: void 0,
        y: void 0
      },
      plotOptions: {
        line: {
          isSlopeChart: !1,
          colors: {
            threshold: 0,
            colorAboveThreshold: void 0,
            colorBelowThreshold: void 0
          }
        },
        area: {
          fillTo: "origin"
        },
        bar: {
          horizontal: !1,
          columnWidth: "70%",
          // should be in percent 0 - 100
          barHeight: "70%",
          // should be in percent 0 - 100
          distributed: !1,
          borderRadius: 0,
          borderRadiusApplication: "around",
          // [around, end]
          borderRadiusWhenStacked: "last",
          // [all, last]
          rangeBarOverlap: !0,
          rangeBarGroupRows: !1,
          hideZeroBarsWhenGrouped: !1,
          isDumbbell: !1,
          dumbbellColors: void 0,
          isFunnel: !1,
          isFunnel3d: !0,
          colors: {
            ranges: [],
            backgroundBarColors: [],
            backgroundBarOpacity: 1,
            backgroundBarRadius: 0
          },
          dataLabels: {
            position: "top",
            // top, center, bottom
            maxItems: 100,
            hideOverflowingLabels: !0,
            orientation: "horizontal",
            total: {
              enabled: !1,
              formatter: void 0,
              offsetX: 0,
              offsetY: 0,
              style: {
                color: "#373d3f",
                fontSize: "12px",
                fontFamily: void 0,
                fontWeight: 600
              }
            }
          }
        },
        bubble: {
          zScaling: !0,
          minBubbleRadius: void 0,
          maxBubbleRadius: void 0
        },
        candlestick: {
          colors: {
            upward: "#00B746",
            downward: "#EF403C"
          },
          wick: {
            useFillColor: !0
          }
        },
        boxPlot: {
          colors: {
            upper: "#00E396",
            lower: "#008FFB"
          }
        },
        heatmap: {
          radius: 2,
          enableShades: !0,
          shadeIntensity: 0.5,
          reverseNegativeShade: !1,
          distributed: !1,
          useFillColorAsStroke: !1,
          colorScale: {
            inverse: !1,
            ranges: [],
            min: void 0,
            max: void 0
          }
        },
        treemap: {
          enableShades: !0,
          shadeIntensity: 0.5,
          distributed: !1,
          reverseNegativeShade: !1,
          useFillColorAsStroke: !1,
          borderRadius: 4,
          dataLabels: {
            format: "scale"
            // scale | truncate
          },
          colorScale: {
            inverse: !1,
            ranges: [],
            min: void 0,
            max: void 0
          },
          seriesTitle: {
            show: !0,
            offsetY: 1,
            offsetX: 1,
            borderColor: "#000",
            borderWidth: 1,
            borderRadius: 2,
            style: {
              background: "rgba(0, 0, 0, 0.6)",
              color: "#fff",
              fontSize: "12px",
              fontFamily: void 0,
              fontWeight: 400,
              cssClass: "",
              padding: {
                left: 6,
                right: 6,
                top: 2,
                bottom: 2
              }
            }
          }
        },
        radialBar: {
          inverseOrder: !1,
          startAngle: 0,
          endAngle: 360,
          offsetX: 0,
          offsetY: 0,
          hollow: {
            margin: 5,
            size: "50%",
            background: "transparent",
            image: void 0,
            imageWidth: 150,
            imageHeight: 150,
            imageOffsetX: 0,
            imageOffsetY: 0,
            imageClipped: !0,
            position: "front",
            dropShadow: {
              enabled: !1,
              top: 0,
              left: 0,
              blur: 3,
              color: "#000",
              opacity: 0.5
            }
          },
          track: {
            show: !0,
            startAngle: void 0,
            endAngle: void 0,
            background: "#f2f2f2",
            strokeWidth: "97%",
            opacity: 1,
            margin: 5,
            // margin is in pixels
            dropShadow: {
              enabled: !1,
              top: 0,
              left: 0,
              blur: 3,
              color: "#000",
              opacity: 0.5
            }
          },
          dataLabels: {
            show: !0,
            name: {
              show: !0,
              fontSize: "16px",
              fontFamily: void 0,
              fontWeight: 600,
              color: void 0,
              offsetY: 0,
              formatter(t) {
                return t;
              }
            },
            value: {
              show: !0,
              fontSize: "14px",
              fontFamily: void 0,
              fontWeight: 400,
              color: void 0,
              offsetY: 16,
              formatter(t) {
                return t + "%";
              }
            },
            total: {
              show: !1,
              label: "Total",
              fontSize: "16px",
              fontWeight: 600,
              fontFamily: void 0,
              color: void 0,
              formatter(t) {
                return t.globals.seriesTotals.reduce((e, s) => e + s, 0) / t.seriesData.series.length + "%";
              }
            }
          },
          barLabels: {
            enabled: !1,
            offsetX: 0,
            offsetY: 0,
            useSeriesColors: !0,
            fontFamily: void 0,
            fontWeight: 600,
            fontSize: "16px",
            formatter(t) {
              return t;
            },
            onClick: void 0
          }
        },
        pie: {
          customScale: 1,
          offsetX: 0,
          offsetY: 0,
          startAngle: 0,
          endAngle: 360,
          expandOnClick: !0,
          dataLabels: {
            // These are the percentage values which are displayed on slice
            offset: 0,
            // offset by which labels will move outside
            minAngleToShowLabel: 10
          },
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              // These are the inner labels appearing inside donut
              show: !1,
              name: {
                show: !0,
                fontSize: "16px",
                fontFamily: void 0,
                fontWeight: 600,
                color: void 0,
                offsetY: -10,
                formatter(t) {
                  return t;
                }
              },
              value: {
                show: !0,
                fontSize: "20px",
                fontFamily: void 0,
                fontWeight: 400,
                color: void 0,
                offsetY: 10,
                formatter(t) {
                  return t;
                }
              },
              total: {
                show: !1,
                showAlways: !1,
                label: "Total",
                fontSize: "16px",
                fontWeight: 400,
                fontFamily: void 0,
                color: void 0,
                formatter(t) {
                  return t.globals.seriesTotals.reduce((e, s) => e + s, 0);
                }
              }
            }
          }
        },
        polarArea: {
          rings: {
            strokeWidth: 1,
            strokeColor: "#e8e8e8"
          },
          spokes: {
            strokeWidth: 1,
            connectorColors: "#e8e8e8"
          }
        },
        radar: {
          size: void 0,
          offsetX: 0,
          offsetY: 0,
          polygons: {
            // strokeColor: '#e8e8e8', // should be deprecated in the minor version i.e 3.2
            strokeWidth: 1,
            strokeColors: "#e8e8e8",
            connectorColors: "#e8e8e8",
            fill: {
              colors: void 0
            }
          }
        }
      },
      colors: void 0,
      dataLabels: {
        enabled: !0,
        enabledOnSeries: void 0,
        formatter(t) {
          return t !== null ? t : "";
        },
        textAnchor: "middle",
        distributed: !1,
        offsetX: 0,
        offsetY: 0,
        style: {
          fontSize: "12px",
          fontFamily: void 0,
          fontWeight: 600,
          colors: void 0
        },
        background: {
          enabled: !0,
          foreColor: "#fff",
          backgroundColor: void 0,
          borderRadius: 2,
          padding: 4,
          opacity: 0.9,
          borderWidth: 1,
          borderColor: "#fff",
          dropShadow: {
            enabled: !1,
            top: 1,
            left: 1,
            blur: 1,
            color: "#000",
            opacity: 0.8
          }
        },
        dropShadow: {
          enabled: !1,
          top: 1,
          left: 1,
          blur: 1,
          color: "#000",
          opacity: 0.8
        }
      },
      fill: {
        type: "solid",
        colors: void 0,
        // array of colors
        opacity: 0.85,
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: void 0,
          inverseColors: !0,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 50, 100],
          colorStops: []
        },
        image: {
          src: [],
          width: void 0,
          // optional
          height: void 0
          // optional
        },
        pattern: {
          style: "squares",
          // String | Array of Strings
          width: 6,
          height: 6,
          strokeWidth: 2
        }
      },
      forecastDataPoints: {
        count: 0,
        fillOpacity: 0.5,
        strokeWidth: void 0,
        dashArray: 4
      },
      grid: {
        show: !0,
        borderColor: "#e0e0e0",
        strokeDashArray: 0,
        position: "back",
        xaxis: {
          lines: {
            show: !1
          }
        },
        yaxis: {
          lines: {
            show: !0
          }
        },
        row: {
          colors: void 0,
          // takes as array which will be repeated on rows
          opacity: 0.5
        },
        column: {
          colors: void 0,
          // takes an array which will be repeated on columns
          opacity: 0.5
        },
        padding: {
          top: 0,
          right: 10,
          bottom: 0,
          left: 12
        }
      },
      labels: [],
      legend: {
        show: !0,
        showForSingleSeries: !1,
        showForNullSeries: !0,
        showForZeroSeries: !0,
        floating: !1,
        position: "bottom",
        // whether to position legends in 1 of 4
        // direction - top, bottom, left, right
        horizontalAlign: "center",
        // when position top/bottom, you can specify whether to align legends left, right or center
        inverseOrder: !1,
        fontSize: "12px",
        fontFamily: void 0,
        fontWeight: 400,
        width: void 0,
        height: void 0,
        formatter: void 0,
        tooltipHoverFormatter: void 0,
        offsetX: -20,
        offsetY: 4,
        customLegendItems: [],
        clusterGroupedSeries: !0,
        clusterGroupedSeriesOrientation: "vertical",
        labels: {
          colors: void 0,
          useSeriesColors: !1
        },
        markers: {
          size: 7,
          fillColors: void 0,
          strokeWidth: 1,
          shape: void 0,
          offsetX: 0,
          offsetY: 0,
          customHTML: void 0,
          onClick: void 0
        },
        itemMargin: {
          horizontal: 5,
          vertical: 4
        },
        onItemClick: {
          toggleDataSeries: !0
        },
        onItemHover: {
          highlightDataSeries: !0
        }
      },
      markers: {
        discrete: [],
        size: 0,
        colors: void 0,
        strokeColors: "#fff",
        strokeWidth: 2,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        shape: "circle",
        offsetX: 0,
        offsetY: 0,
        showNullDataPoints: !0,
        onClick: void 0,
        onDblClick: void 0,
        hover: {
          size: void 0,
          sizeOffset: 3
        }
      },
      noData: {
        text: void 0,
        align: "center",
        verticalAlign: "middle",
        offsetX: 0,
        offsetY: 0,
        style: {
          color: void 0,
          fontSize: "14px",
          fontFamily: void 0
        }
      },
      responsive: [],
      // breakpoints should follow ascending order 400, then 700, then 1000
      series: void 0,
      states: {
        hover: {
          filter: {
            type: "lighten"
          }
        },
        active: {
          allowMultipleDataPointsSelection: !1,
          filter: {
            type: "darken"
          }
        }
      },
      title: {
        text: void 0,
        align: "left",
        margin: 5,
        offsetX: 0,
        offsetY: 0,
        floating: !1,
        style: {
          fontSize: "14px",
          fontWeight: 900,
          fontFamily: void 0,
          color: void 0
        }
      },
      subtitle: {
        text: void 0,
        align: "left",
        margin: 5,
        offsetX: 0,
        offsetY: 30,
        floating: !1,
        style: {
          fontSize: "12px",
          fontWeight: 400,
          fontFamily: void 0,
          color: void 0
        }
      },
      stroke: {
        show: !0,
        curve: "smooth",
        // "smooth" / "straight" / "monotoneCubic" / "stepline" / "linestep"
        lineCap: "butt",
        // round, butt , square
        width: 2,
        colors: void 0,
        // array of colors
        dashArray: 0,
        // single value or array of values
        fill: {
          type: "solid",
          colors: void 0,
          // array of colors
          opacity: 0.85,
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: void 0,
            inverseColors: !0,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
            colorStops: []
          }
        }
      },
      tooltip: {
        enabled: !0,
        enabledOnSeries: void 0,
        shared: !0,
        hideEmptySeries: !1,
        followCursor: !1,
        // when disabled, the tooltip will show on top of the series instead of mouse position
        intersect: !1,
        // when enabled, tooltip will only show when user directly hovers over point
        inverseOrder: !1,
        custom: void 0,
        fillSeriesColor: !1,
        theme: "light",
        cssClass: "",
        style: {
          fontSize: "12px",
          fontFamily: void 0
        },
        onDatasetHover: {
          highlightDataSeries: !1
        },
        x: {
          // x value
          show: !0,
          format: "dd MMM",
          // dd/MM, dd MMM yy, dd MMM yyyy
          formatter: void 0
          // a custom user supplied formatter function
        },
        y: {
          formatter: void 0,
          title: {
            formatter(t) {
              return t ? t + ": " : "";
            }
          }
        },
        z: {
          formatter: void 0,
          title: "Size: "
        },
        marker: {
          show: !0,
          fillColors: void 0
        },
        items: {
          display: "flex"
        },
        fixed: {
          enabled: !1,
          position: "topRight",
          // topRight, topLeft, bottomRight, bottomLeft
          offsetX: 0,
          offsetY: 0
        }
      },
      xaxis: {
        type: "category",
        categories: [],
        convertedCatToNumeric: !1,
        // internal property which should not be altered outside
        offsetX: 0,
        offsetY: 0,
        overwriteCategories: void 0,
        labels: {
          show: !0,
          rotate: -45,
          rotateAlways: !1,
          hideOverlappingLabels: !0,
          trim: !1,
          minHeight: void 0,
          maxHeight: 120,
          showDuplicates: !0,
          style: {
            colors: [],
            fontSize: "12px",
            fontWeight: 400,
            fontFamily: void 0,
            cssClass: ""
          },
          offsetX: 0,
          offsetY: 0,
          format: void 0,
          formatter: void 0,
          // custom formatter function which will override format
          datetimeUTC: !0,
          datetimeFormatter: {
            year: "yyyy",
            month: "MMM 'yy",
            day: "dd MMM",
            hour: "HH:mm",
            minute: "HH:mm:ss",
            second: "HH:mm:ss"
          }
        },
        group: {
          groups: [],
          style: {
            colors: [],
            fontSize: "12px",
            fontWeight: 400,
            fontFamily: void 0,
            cssClass: ""
          }
        },
        axisBorder: {
          show: !0,
          color: "#e0e0e0",
          width: "100%",
          height: 1,
          offsetX: 0,
          offsetY: 0
        },
        axisTicks: {
          show: !0,
          color: "#e0e0e0",
          height: 6,
          offsetX: 0,
          offsetY: 0
        },
        stepSize: void 0,
        tickAmount: void 0,
        tickPlacement: "on",
        min: void 0,
        max: void 0,
        range: void 0,
        floating: !1,
        decimalsInFloat: void 0,
        position: "bottom",
        title: {
          text: void 0,
          offsetX: 0,
          offsetY: 0,
          style: {
            color: void 0,
            fontSize: "12px",
            fontWeight: 900,
            fontFamily: void 0,
            cssClass: ""
          }
        },
        crosshairs: {
          show: !0,
          width: 1,
          // tickWidth/barWidth or an integer
          position: "back",
          opacity: 0.9,
          stroke: {
            color: "#b6b6b6",
            width: 1,
            dashArray: 3
          },
          fill: {
            type: "solid",
            // solid, gradient
            color: "#B1B9C4",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          },
          dropShadow: {
            enabled: !1,
            left: 0,
            top: 0,
            blur: 1,
            opacity: 0.8
          }
        },
        tooltip: {
          enabled: !0,
          offsetY: 0,
          formatter: void 0,
          style: {
            fontSize: "12px",
            fontFamily: void 0
          }
        }
      },
      yaxis: this.yAxis,
      theme: {
        mode: "",
        palette: "palette1",
        // If defined, it will overwrite globals.colors variable
        monochrome: {
          // monochrome allows you to select just 1 color and fill out the rest with light/dark shade (intensity can be selected)
          enabled: !1,
          color: "#008FFB",
          shadeTo: "light",
          shadeIntensity: 0.65
        },
        accessibility: {
          colorBlindMode: ""
          // '' | 'deuteranopia' | 'protanopia' | 'tritanopia' | 'highContrast'
        }
      }
    };
  }
}
class yt {
  constructor(t) {
    this.opts = t;
  }
  init({ responsiveOverride: t }) {
    var e, s, i, a, o, r, n, l, c, h;
    let d = this.opts;
    const p = new nt(), g = new bt(d);
    this.chartType = d.chart.type, d = this.extendYAxis(d), d = this.extendAnnotations(d);
    let f = p.init(), x = {};
    if (d && typeof d == "object") {
      let u = {};
      [
        "line",
        "area",
        "bar",
        "candlestick",
        "boxPlot",
        "rangeBar",
        "rangeArea",
        "bubble",
        "scatter",
        "heatmap",
        "treemap",
        "pie",
        "polarArea",
        "donut",
        "radar",
        "radialBar"
      ].indexOf(d.chart.type) !== -1 ? u = g[d.chart.type]() : u = g.line(), (s = (e = d.plotOptions) == null ? void 0 : e.bar) != null && s.isFunnel && (u = g.funnel()), d.chart.stacked && d.chart.type === "bar" && (u = g.stackedBars()), (i = d.chart.brush) != null && i.enabled && (u = g.brush(u)), (o = (a = d.plotOptions) == null ? void 0 : a.line) != null && o.isSlopeChart && (u = g.slope()), d.chart.stacked && d.chart.stackType === "100%" && (d = g.stacked100(d)), (n = (r = d.plotOptions) == null ? void 0 : r.bar) != null && n.isDumbbell && (d = g.dumbbell(d)), this.checkForDarkTheme(B.getApex()), this.checkForDarkTheme(d), d.xaxis = d.xaxis || B.getApex().xaxis || {}, t || (d.xaxis.convertedCatToNumeric = !1), d = this.checkForCatToNumericXAxis(this.chartType, u, d), ((l = d.chart.sparkline) != null && l.enabled || (h = (c = B.getApex().chart) == null ? void 0 : c.sparkline) != null && h.enabled) && (u = g.sparkline(u)), x = L.extend(f, u);
    }
    const m = L.extend(x, B.getApex());
    return f = L.extend(m, d), f = this.handleUserInputErrors(f), f;
  }
  checkForCatToNumericXAxis(t, e, s) {
    var i, a;
    const o = new bt(s), r = (t === "bar" || t === "boxPlot") && ((a = (i = s.plotOptions) == null ? void 0 : i.bar) == null ? void 0 : a.horizontal), n = t === "pie" || t === "polarArea" || t === "donut" || t === "radar" || t === "radialBar" || t === "heatmap", l = s.xaxis.type !== "datetime" && s.xaxis.type !== "numeric", c = s.xaxis.tickPlacement ? s.xaxis.tickPlacement : e.xaxis && e.xaxis.tickPlacement;
    return !r && !n && l && c !== "between" && (s = o.convertCatToNumeric(s)), s;
  }
  extendYAxis(t, e) {
    const s = new nt();
    (typeof t.yaxis > "u" || !t.yaxis || Array.isArray(t.yaxis) && t.yaxis.length === 0) && (t.yaxis = {});
    const i = B.getApex();
    t.yaxis.constructor !== Array && i.yaxis && i.yaxis.constructor !== Array && (t.yaxis = L.extend(t.yaxis, i.yaxis)), t.yaxis.constructor !== Array ? t.yaxis = [L.extend(s.yAxis, t.yaxis)] : t.yaxis = L.extendArray(t.yaxis, s.yAxis);
    let a = !1;
    t.yaxis.forEach((r) => {
      r.logarithmic && (a = !0);
    });
    let o = t.series;
    return e && !o && (o = e.config.series), a && o.length !== t.yaxis.length && o.length && (t.yaxis = o.map((r, n) => {
      if (r.name || (o[n].name = `series-${n + 1}`), t.yaxis[n])
        return t.yaxis[n].seriesName = o[n].name, t.yaxis[n];
      {
        const l = L.extend(s.yAxis, t.yaxis[0]);
        return l.show = !1, l;
      }
    })), a && o.length > 1 && o.length !== t.yaxis.length && console.warn(
      "A multi-series logarithmic chart should have equal number of series and y-axes"
    ), t;
  }
  // annotations also accepts array, so we need to extend them manually
  extendAnnotations(t) {
    return typeof t.annotations > "u" && (t.annotations = {}, t.annotations.yaxis = [], t.annotations.xaxis = [], t.annotations.points = []), t = this.extendYAxisAnnotations(t), t = this.extendXAxisAnnotations(t), t = this.extendPointAnnotations(t), t;
  }
  extendYAxisAnnotations(t) {
    const e = new nt();
    return t.annotations.yaxis = L.extendArray(
      typeof t.annotations.yaxis < "u" ? t.annotations.yaxis : [],
      e.yAxisAnnotation
    ), t;
  }
  extendXAxisAnnotations(t) {
    const e = new nt();
    return t.annotations.xaxis = L.extendArray(
      typeof t.annotations.xaxis < "u" ? t.annotations.xaxis : [],
      e.xAxisAnnotation
    ), t;
  }
  extendPointAnnotations(t) {
    const e = new nt();
    return t.annotations.points = L.extendArray(
      typeof t.annotations.points < "u" ? t.annotations.points : [],
      e.pointAnnotation
    ), t;
  }
  checkForDarkTheme(t) {
    t.theme && t.theme.mode === "dark" && (t.tooltip || (t.tooltip = {}), t.tooltip.theme !== "light" && (t.tooltip.theme = "dark"), t.chart.foreColor || (t.chart.foreColor = "#f6f7f8"), t.theme.palette || (t.theme.palette = "palette4"));
  }
  handleUserInputErrors(t) {
    const e = t;
    if (e.tooltip.shared && e.tooltip.intersect)
      throw new Error(
        "tooltip.shared cannot be enabled when tooltip.intersect is true. Turn off any other option by setting it to false."
      );
    if (e.chart.type === "bar" && e.plotOptions.bar.horizontal) {
      if (e.yaxis.length > 1)
        throw new Error(
          "Multiple Y Axis for bars are not supported. Switch to column chart by setting plotOptions.bar.horizontal=false"
        );
      e.yaxis[0].reversed && (e.yaxis[0].opposite = !0), e.xaxis.tooltip.enabled = !1, e.yaxis[0].tooltip.enabled = !1, e.chart.zoom.enabled = !1;
    }
    return (e.chart.type === "bar" || e.chart.type === "rangeBar") && e.tooltip.shared && e.xaxis.crosshairs.width === "barWidth" && e.series.length > 1 && (e.xaxis.crosshairs.width = "tickWidth"), (e.chart.type === "candlestick" || e.chart.type === "boxPlot") && e.yaxis[0].reversed && (console.warn(
      `Reversed y-axis in ${e.chart.type} chart is not supported.`
    ), e.yaxis[0].reversed = !1), e;
  }
}
const ce = 1.618, he = [
  [1, 1, 2, 5, 5, 5, 10, 10, 10, 10, 10],
  [1, 1, 2, 5, 5, 5, 10, 10, 10, 10, 10]
], Rt = [
  1,
  2,
  4,
  4,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  6,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  12,
  24
];
class de {
  initGlobalVars(t) {
    t.series = [], t.seriesCandleO = [], t.seriesCandleH = [], t.seriesCandleM = [], t.seriesCandleL = [], t.seriesCandleC = [], t.seriesRangeStart = [], t.seriesRangeEnd = [], t.seriesRange = [], t.seriesPercent = [], t.seriesGoals = [], t.seriesX = [], t.seriesZ = [], t.seriesNames = [], t.seriesTotals = [], t.seriesLog = [], t.seriesColors = [], t.stackedSeriesTotals = [], t.seriesXvalues = [], t.seriesYvalues = [], t.dataWasParsed = !1, t.originalSeries = null, t.maxValsInArrayIndex = 0, t.yValueDecimal = 0, t.allSeriesHasEqualX = !0, t.labels = [], t.hasXaxisGroups = !1, t.groups = [], t.barGroups = [], t.lineGroups = [], t.areaGroups = [], t.hasSeriesGroups = !1, t.seriesGroups = [], t.categoryLabels = [], t.timescaleLabels = [], t.noLabelsProvided = !1, t.isXNumeric = !1, t.skipLastTimelinelabel = !1, t.skipFirstTimelinelabel = !1, t.isDataXYZ = !1, t.isMultiLineX = !1, t.isMultipleYAxis = !1, t.maxY = -Number.MAX_VALUE, t.minY = Number.MIN_VALUE, t.minYArr = [], t.maxYArr = [], t.maxX = -Number.MAX_VALUE, t.minX = Number.MAX_VALUE, t.initialMaxX = -Number.MAX_VALUE, t.initialMinX = Number.MAX_VALUE, t.maxDate = 0, t.minDate = Number.MAX_VALUE, t.minZ = Number.MAX_VALUE, t.maxZ = -Number.MAX_VALUE, t.minXDiff = Number.MAX_VALUE, t.yAxisScale = [], t.xAxisScale = null, t.xAxisTicksPositions = [], t.xRange = 0, t.yRange = [], t.zRange = 0, t.dataPoints = 0, t.xTickAmount = 0, t.multiAxisTickAmount = 0, t.disableZoomIn = !1, t.disableZoomOut = !1, t.yLabelsCoords = [], t.yTitleCoords = [], t.barPadForNumericAxis = 0, t.padHorizontal = 0, t.rotateXLabels = !1, t.overlappingXLabels = !1, t.radialSize = 0, t.barHeight = 0, t.barWidth = 0, t.animationEnded = !1, t.resizeTimer = null, t.selectionResizeTimer = null, t.lastWheelExecution = 0, t.delayedElements = [], t.pointsArray = [], t.dataLabelsRects = [], t.lastDrawnDataLabelsIndexes = [], t.textRectsCache = /* @__PURE__ */ new Map(), t.domCache = /* @__PURE__ */ new Map(), t.dimensionCache = {}, t.cachedSelectors = {}, t.seriesNS || this._attachNamespaces(t);
  }
  /**
   * Attach domain-grouped namespace sub-objects onto gl.
   * Each sub-object is a plain object whose properties are defined as
   * getters/setters that read/write the canonical flat properties on gl.
   * This means there is exactly ONE storage location per value — no copies,
   * no sync needed.
   *
   * Namespaces:
   *   gl.series  — parsed series data and chart-type-specific arrays
   *   gl.axes    — axis bounds, scales, ranges, tick state
   *   gl.layout  — SVG/grid dimensions, translations, label sizes
   *   gl.cache   — DOM caches, timers, observers, drawing scratch space
   *
   * Note: interact state lives on w.interact (not gl) — see Base.js.
   */
  _attachNamespaces(t) {
    const e = (r, n, l = n) => {
      Object.defineProperty(r, l, {
        get() {
          return t[n];
        },
        set(c) {
          t[n] = c;
        },
        enumerable: !0,
        configurable: !0
      });
    }, s = {};
    e(s, "series", "data");
    for (const r of [
      "seriesNames",
      "seriesX",
      "seriesZ",
      "seriesXvalues",
      "seriesYvalues",
      "seriesGoals",
      "seriesLog",
      "seriesColors",
      "seriesPercent",
      "seriesTotals",
      "stackedSeriesTotals",
      "seriesCandleO",
      "seriesCandleH",
      "seriesCandleM",
      "seriesCandleL",
      "seriesCandleC",
      "seriesRangeStart",
      "seriesRangeEnd",
      "seriesRange",
      "seriesYAxisMap",
      "seriesYAxisReverseMap",
      "seriesGroups",
      "barGroups",
      "lineGroups",
      "areaGroups",
      "originalSeries",
      "collapsedSeries",
      "collapsedSeriesIndices",
      "ancillaryCollapsedSeries",
      "ancillaryCollapsedSeriesIndices",
      "allSeriesCollapsed",
      "risingSeries",
      "previousPaths",
      "ignoreYAxisIndexes",
      "labels",
      "categoryLabels",
      "timescaleLabels",
      "groups"
    ])
      e(s, r);
    Object.defineProperty(t, "seriesNS", {
      value: s,
      writable: !1,
      enumerable: !1,
      configurable: !0
    });
    const i = {};
    for (const r of [
      "minX",
      "maxX",
      "initialMinX",
      "initialMaxX",
      "minY",
      "maxY",
      "minYArr",
      "maxYArr",
      "minZ",
      "maxZ",
      "minDate",
      "maxDate",
      "minXDiff",
      "xRange",
      "yRange",
      "zRange",
      "xAxisScale",
      "yAxisScale",
      "xAxisTicksPositions",
      "xTickAmount",
      "multiAxisTickAmount",
      "dataPoints",
      "maxValsInArrayIndex",
      "isXNumeric",
      "isMultipleYAxis",
      "isMultiLineX",
      "isDataXYZ",
      "dataFormatXNumeric",
      "allSeriesHasEqualX",
      "hasNullValues",
      "dataWasParsed",
      "hasXaxisGroups",
      "hasSeriesGroups",
      "skipFirstTimelinelabel",
      "skipLastTimelinelabel",
      "yValueDecimal",
      "invalidLogScale",
      "noLabelsProvided"
    ])
      e(i, r);
    Object.defineProperty(t, "axes", {
      value: i,
      writable: !1,
      enumerable: !1,
      configurable: !0
    });
    const a = {};
    for (const r of [
      "svgWidth",
      "svgHeight",
      "gridWidth",
      "gridHeight",
      "translateX",
      "translateY",
      "translateXAxisX",
      "translateXAxisY",
      "translateYAxisX",
      "xAxisLabelsHeight",
      "xAxisGroupLabelsHeight",
      "xAxisLabelsWidth",
      "yAxisLabelsWidth",
      "yAxisWidths",
      "yLabelsCoords",
      "yTitleCoords",
      "padHorizontal",
      "barPadForNumericAxis",
      "rotateXLabels",
      "scaleX",
      "scaleY",
      "radialSize",
      "defaultLabels",
      "overlappingXLabels"
    ])
      e(a, r);
    Object.defineProperty(t, "layout", {
      value: a,
      writable: !1,
      enumerable: !1,
      configurable: !0
    });
    const o = {};
    for (const r of [
      "domCache",
      "dimensionCache",
      "cachedSelectors",
      "textRectsCache",
      "pointsArray",
      "dataLabelsRects",
      "lastDrawnDataLabelsIndexes",
      "delayedElements",
      "resizeTimer",
      "selectionResizeTimer",
      "resizeObserver"
    ])
      e(o, r);
    Object.defineProperty(t, "cache", {
      value: o,
      writable: !1,
      enumerable: !1,
      configurable: !0
    });
  }
  /**
   * Persistent chart state — set ONCE at chart construction and intentionally NOT
   * reset by initGlobalVars.  These values must survive updateSeries / re-render.
   *
   * Rule: if a value is recalculated fresh on every render it belongs in
   * initGlobalVars instead, not here.
   */
  globalVars(t) {
    return {
      // ── Identity (set once, never changes) ───────────────────────────────────
      chartID: null,
      // full chart ID: "apexcharts-<cuid>"
      cuid: null,
      // random suffix only
      // ── Event registry (accumulates listeners, never reset) ───────────────────
      events: {
        beforeMount: [],
        mounted: [],
        updated: [],
        clicked: [],
        selection: [],
        dataPointSelection: [],
        zoomed: [],
        scrolled: []
      },
      // ── Theme colors (set by Theme module after config merge) ─────────────────
      colors: [],
      fill: { colors: [] },
      stroke: { colors: [] },
      dataLabels: { style: { colors: [] } },
      radarPolygons: { fill: { colors: [] } },
      markers: {
        colors: [],
        size: t.markers.size,
        largestSize: 0
      },
      // ── Device / environment detected once at startup ─────────────────────────
      // Note: isTouchDevice lives on w.interact — see Base.js. Shim installed there.
      LINE_HEIGHT_RATIO: ce,
      // ── Chart-type flags (derived from config, set during Core.mount) ─────────
      axisCharts: !0,
      // false for pie/radial/treemap etc.
      isSlopeChart: t.plotOptions.line.isSlopeChart,
      comboCharts: !1,
      // true when mixing line + column series
      // ── Config snapshots (backups for zoom-reset / updateOptions) ────────────
      initialConfig: null,
      // deep clone of the original user config
      initialSeries: [],
      lastXAxis: [],
      lastYAxis: [],
      // ── User interaction state (must survive re-renders) ──────────────────────
      // Note: zoomEnabled, panEnabled, selectionEnabled, zoomed, selection,
      //       visibleXRange, selectedDataPoints, mousedown, clientX, clientY,
      //       lastClientPosition, lastWheelExecution, capturedSeriesIndex,
      //       capturedDataPointIndex, disableZoomIn, disableZoomOut, isTouchDevice
      //       live on w.interact — see Base.js. Backward-compat shims installed there.
      // Series collapse state (user-driven, must persist across re-renders)
      allSeriesCollapsed: !1,
      collapsedSeries: [],
      collapsedSeriesIndices: [],
      ancillaryCollapsedSeries: [],
      ancillaryCollapsedSeriesIndices: [],
      risingSeries: [],
      // series being re-shown after collapse
      ignoreYAxisIndexes: [],
      // y-axis indices excluded during series collapse
      // ── Lifecycle / update flags ──────────────────────────────────────────────
      isDirty: !1,
      // true when user called an update method manually
      isExecCalled: !1,
      // true when update came via exec()
      dataChanged: !1,
      // true when series data was changed dynamically
      resized: !1,
      // true after a container resize
      // ── Data format flags (derived from config/series, stable between renders) ─
      // Note: dataFormatXNumeric lives on w.axisFlags — see Base.js. Shim installed there.
      invalidLogScale: !1,
      // true when log scale requested but data is invalid
      hasNullValues: !1,
      // true when any series contains null values
      // Persistent data tracking
      columnSeries: null,
      // tracks which series are rendered as bars/columns
      yaxis: null,
      // resolved yaxis config array
      total: 0,
      // running total (used by pie/radial)
      // ── Animation control ─────────────────────────────────────────────────────
      shouldAnimate: !0,
      previousPaths: [],
      // paths from previous render — source for enter animation
      // ── SVG viewport (set by Dimensions, but persistent as layout anchor) ─────
      svgWidth: 0,
      svgHeight: 0,
      // Note: gridWidth, gridHeight, translateX, translateY, translateXAxisX,
      // translateXAxisY, xAxisLabelsHeight, xAxisGroupLabelsHeight, xAxisLabelsWidth,
      // rotateXLabels, xAxisHeight, yLabelsCoords, yTitleCoords live on w.layout —
      // see Base.js. Backward-compat shims installed there.
      defaultLabels: !1,
      // Note: formatter properties (xLabelFormatter, yLabelFormatters, etc.) live on
      // w.formatters — see Base.js. Backward-compat shims installed there.
      yAxisLabelsWidth: 0,
      scaleX: 1,
      scaleY: 1,
      translateYAxisX: [],
      yAxisWidths: [],
      // ── Instances (created once, replaced only on full re-init) ──────────────
      tooltip: null,
      resizeObserver: null,
      // ── Locale (loaded once; changes only via setLocale()) ───────────────────
      locale: {},
      // ── Method queue (deferred calls during async operations) ────────────────
      memory: {
        methodsToExec: []
      },
      // ── Scale configuration constants — imported from utils/Constants.js ──────
      niceScaleAllowedMagMsd: he,
      niceScaleDefaultTicks: Rt,
      // ── Multi-axis series mapping ─────────────────────────────────────────────
      seriesYAxisMap: [],
      // yAxis index → series indices[]
      seriesYAxisReverseMap: [],
      // series index → yAxis index
      noData: !1
      // true when there is nothing to render
    };
  }
  init(t) {
    const e = this.globalVars(t);
    return this.initGlobalVars(e), e.initialConfig = L.extend({}, t), e.initialSeries = L.clone(t.series), e.lastXAxis = L.clone(e.initialConfig.xaxis), e.lastYAxis = L.clone(e.initialConfig.yaxis), e;
  }
}
class Be {
  constructor(t) {
    this.opts = t;
  }
  init() {
    const t = new yt(this.opts).init({ responsiveOverride: !1 }), e = new de().init(t), s = {
      config: t,
      globals: e,
      dom: {},
      // DOM node cache — lives here, not inside globals
      interact: {
        // Tool mode (derived from toolbar config at construction, updated by Toolbar)
        zoomEnabled: t.chart.toolbar.autoSelected === "zoom" && t.chart.toolbar.tools.zoom && t.chart.zoom.enabled,
        panEnabled: t.chart.toolbar.autoSelected === "pan" && t.chart.toolbar.tools.pan,
        selectionEnabled: t.chart.toolbar.autoSelected === "selection" && t.chart.toolbar.tools.selection,
        // Zoom / pan state (user-driven, must persist across re-renders)
        zoomed: !1,
        selection: void 0,
        visibleXRange: void 0,
        selectedDataPoints: [],
        // Mouse / pointer state
        mousedown: !1,
        clientX: null,
        clientY: null,
        lastClientPosition: {},
        lastWheelExecution: 0,
        // Tooltip capture state
        capturedSeriesIndex: -1,
        capturedDataPointIndex: -1,
        // Timescale zoom bounds (reset per render by TimeScale)
        disableZoomIn: !1,
        disableZoomOut: !1,
        // Device detection (set once at construction)
        isTouchDevice: B.isBrowser() ? "ontouchstart" in window || navigator.msMaxTouchPoints > 0 : !1
      },
      formatters: {
        // Populated by Formatters.setLabelFormatters() each render
        xLabelFormatter: void 0,
        yLabelFormatters: [],
        xaxisTooltipFormatter: void 0,
        ttKeyFormatter: void 0,
        ttVal: void 0,
        ttZFormatter: void 0,
        legendFormatter: void 0
      },
      // Candlestick / boxplot OHLC arrays — written by Data.handleCandleStickBoxData()
      // each render; empty for all other chart types.
      candleData: {
        seriesCandleO: [],
        seriesCandleH: [],
        seriesCandleM: [],
        seriesCandleL: [],
        seriesCandleC: []
      },
      // Range chart arrays — written by Data.handleRangeData() each render;
      // empty for all other chart types.
      rangeData: {
        seriesRangeStart: [],
        seriesRangeEnd: [],
        seriesRange: []
      },
      // Label / category data — written by Data.parseData() and TimeScale each render.
      labelData: {
        labels: [],
        categoryLabels: [],
        timescaleLabels: [],
        // written by TimeScale.calculateTimeScaleMinMax()
        hasXaxisGroups: !1,
        groups: [],
        seriesGroups: []
      },
      // Axis / parsing behaviour flags — written by Data.parseData() each render.
      axisFlags: {
        isXNumeric: !1,
        dataFormatXNumeric: !1,
        isDataXYZ: !1,
        isRangeData: !1,
        isRangeBar: !1,
        isMultiLineX: !1,
        noLabelsProvided: !1,
        dataWasParsed: !1
      },
      // Parsed series data — written by Data.parseData() each render.
      // Note: initialSeries and originalSeries are intentionally excluded —
      // they are persistent (survive re-renders) and remain on w.globals.
      seriesData: {
        series: [],
        // main y-values array
        seriesNames: [],
        seriesX: [],
        seriesZ: [],
        seriesColors: [],
        seriesGoals: [],
        stackedSeriesTotals: [],
        stackedSeriesTotalsByGroups: []
      },
      // Grid / axis layout computed by Dimensions.plotCoords() each render.
      // gridWidth/gridHeight/translateX/translateY are also used as starting
      // points by Dimensions on the next render (accumulated values), so the
      // shim must be bidirectional — reads and writes both route correctly.
      layout: {
        gridHeight: 0,
        gridWidth: 0,
        translateX: 0,
        translateY: 0,
        translateXAxisX: 0,
        translateXAxisY: 0,
        rotateXLabels: !1,
        xAxisHeight: 0,
        xAxisLabelsHeight: 0,
        xAxisGroupLabelsHeight: 0,
        xAxisLabelsWidth: 0,
        yLabelsCoords: [],
        yTitleCoords: []
      }
    };
    Object.defineProperty(e, "dom", {
      get() {
        return s.dom;
      },
      set(i) {
        s.dom = i;
      },
      enumerable: !1,
      configurable: !0
    });
    for (const i of [
      "xLabelFormatter",
      "yLabelFormatters",
      "xaxisTooltipFormatter",
      "ttKeyFormatter",
      "ttVal",
      "ttZFormatter",
      "legendFormatter"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.formatters[i];
        },
        set(a) {
          s.formatters[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "zoomEnabled",
      "panEnabled",
      "selectionEnabled",
      "zoomed",
      "selection",
      "visibleXRange",
      "selectedDataPoints",
      "mousedown",
      "clientX",
      "clientY",
      "lastClientPosition",
      "lastWheelExecution",
      "capturedSeriesIndex",
      "capturedDataPointIndex",
      "disableZoomIn",
      "disableZoomOut",
      "isTouchDevice"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.interact[i];
        },
        set(a) {
          s.interact[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "gridHeight",
      "gridWidth",
      "translateX",
      "translateY",
      "translateXAxisX",
      "translateXAxisY",
      "rotateXLabels",
      "xAxisHeight",
      "xAxisLabelsHeight",
      "xAxisGroupLabelsHeight",
      "xAxisLabelsWidth",
      "yLabelsCoords",
      "yTitleCoords"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.layout[i];
        },
        set(a) {
          s.layout[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "series",
      "seriesNames",
      "seriesX",
      "seriesZ",
      "seriesColors",
      "seriesGoals",
      "stackedSeriesTotals",
      "stackedSeriesTotalsByGroups"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.seriesData[i];
        },
        set(a) {
          s.seriesData[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "isXNumeric",
      "dataFormatXNumeric",
      "isDataXYZ",
      "isRangeData",
      "isRangeBar",
      "isMultiLineX",
      "noLabelsProvided",
      "dataWasParsed"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.axisFlags[i];
        },
        set(a) {
          s.axisFlags[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "labels",
      "categoryLabels",
      "timescaleLabels",
      "hasXaxisGroups",
      "groups",
      "seriesGroups"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.labelData[i];
        },
        set(a) {
          s.labelData[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of ["seriesRangeStart", "seriesRangeEnd", "seriesRange"])
      Object.defineProperty(e, i, {
        get() {
          return s.rangeData[i];
        },
        set(a) {
          s.rangeData[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    for (const i of [
      "seriesCandleO",
      "seriesCandleH",
      "seriesCandleM",
      "seriesCandleL",
      "seriesCandleC"
    ])
      Object.defineProperty(e, i, {
        get() {
          return s.candleData[i];
        },
        set(a) {
          s.candleData[i] = a;
        },
        enumerable: !1,
        configurable: !0
      });
    return s;
  }
}
class V {
  constructor(t) {
    this.w = t;
  }
  static checkComboSeries(t, e) {
    let s = !1, i = 0, a = 0;
    return e === void 0 && (e = "line"), t.length && typeof t[0].type < "u" && t.forEach((o) => {
      (o.type === "bar" || o.type === "column" || o.type === "candlestick" || o.type === "boxPlot") && i++, typeof o.type < "u" && o.type !== e && a++;
    }), a > 0 && (s = !0), {
      comboBarCount: i,
      comboCharts: s
    };
  }
  /**
   * @memberof CoreUtils
   * returns the sum of all individual values in a multiple stacked series
   * Eg. w.seriesData.series = [[32,33,43,12], [2,3,5,1]]
   *  @return [34,36,48,13]
   **/
  getStackedSeriesTotals(t = []) {
    const e = this.w, s = [];
    if (e.seriesData.series.length === 0)
      return s;
    for (let i = 0; i < e.seriesData.series[e.globals.maxValsInArrayIndex].length; i++) {
      let a = 0;
      for (let o = 0; o < e.seriesData.series.length; o++)
        typeof e.seriesData.series[o][i] < "u" && t.indexOf(o) === -1 && (a += e.seriesData.series[o][i]);
      s.push(a);
    }
    return s;
  }
  // get total of the all values inside all series
  getSeriesTotalByIndex(t = null) {
    return t === null ? this.w.config.series.reduce((e, s) => e + s, 0) : this.w.seriesData.series[t].reduce((e, s) => e + s, 0);
  }
  /**
   * @memberof CoreUtils
   * returns the sum of values in a multiple stacked grouped charts
   * Eg. w.seriesData.series = [[32,33,43,12], [2,3,5,1], [43, 23, 34, 22]]
   * series 1 and 2 are in a group, while series 3 is in another group
   *  @return [[34, 36, 48, 12], [43, 23, 34, 22]]
   **/
  getStackedSeriesTotalsByGroups() {
    const t = this.w, e = [];
    return t.labelData.seriesGroups.forEach((s) => {
      const i = [];
      t.config.series.forEach((o, r) => {
        s.indexOf(t.seriesData.seriesNames[r]) > -1 && i.push(r);
      });
      const a = t.seriesData.series.map((o, r) => i.indexOf(r) === -1 ? r : -1).filter((o) => o !== -1);
      e.push(this.getStackedSeriesTotals(a));
    }), e;
  }
  setSeriesYAxisMappings() {
    const t = this.w.globals, e = this.w.config;
    let s = [];
    const i = [], a = [], o = this.w.seriesData.series.length > e.yaxis.length || e.yaxis.some((l) => Array.isArray(l.seriesName));
    e.series.forEach((l, c) => {
      a.push(c), i.push(null);
    }), e.yaxis.forEach((l, c) => {
      s[c] = [];
    });
    const r = [];
    e.yaxis.forEach((l, c) => {
      let h = !1;
      if (l.seriesName) {
        let d = [];
        Array.isArray(l.seriesName) ? d = l.seriesName : d.push(l.seriesName), d.forEach((p) => {
          e.series.forEach((g, f) => {
            if (g.name === p) {
              let x = f;
              c === f || o ? !o || a.indexOf(f) > -1 ? s[c].push([c, f]) : console.warn(
                "Series '" + g.name + "' referenced more than once in what looks like the new style. That is, when using either seriesName: [], or when there are more series than yaxes."
              ) : (s[f].push([f, c]), x = c), h = !0, x = a.indexOf(x), x !== -1 && a.splice(x, 1);
            }
          });
        });
      }
      h || r.push(c);
    }), s = s.map((l) => {
      const c = [];
      return l.forEach((h) => {
        i[h[1]] = h[0], c.push(h[1]);
      }), c;
    });
    let n = e.yaxis.length - 1;
    for (let l = 0; l < r.length && (n = r[l], s[n] = [], a); l++) {
      const c = a[0];
      a.shift(), s[n].push(c), i[c] = n;
    }
    a.forEach((l) => {
      s[n].push(l), i[l] = n;
    }), t.seriesYAxisMap = s.map((l) => l), t.seriesYAxisReverseMap = i.map((l) => l), t.seriesYAxisMap.forEach((l, c) => {
      l.forEach((h) => {
        e.series[h] && e.series[h].group === void 0 && (e.series[h].group = "apexcharts-axis-".concat(c.toString()));
      });
    });
  }
  isSeriesNull(t = null) {
    let e = [];
    return t === null ? e = this.w.config.series.filter((s) => s !== null) : e = this.w.config.series[t].data.filter((s) => s !== null), e.length === 0;
  }
  seriesHaveSameValues(t) {
    return this.w.seriesData.series[t].every((e, s, i) => e === i[0]);
  }
  getCategoryLabels(t) {
    const e = this.w;
    let s = t.slice();
    return e.config.xaxis.convertedCatToNumeric && (s = t.map((i) => e.config.xaxis.labels.formatter(i - e.globals.minX + 1))), s;
  }
  // maxValsInArrayIndex is the index of series[] which has the largest number of items
  getLargestSeries() {
    const t = this.w;
    t.globals.maxValsInArrayIndex = t.seriesData.series.map((e) => e.length).indexOf(
      Math.max.apply(
        Math,
        t.seriesData.series.map((e) => e.length)
      )
    );
  }
  getLargestMarkerSize() {
    const t = this.w;
    let e = 0;
    return t.globals.markers.size.forEach((s) => {
      e = Math.max(e, s);
    }), t.config.markers.discrete && t.config.markers.discrete.length && t.config.markers.discrete.forEach((s) => {
      e = Math.max(e, s.size);
    }), e > 0 && (t.config.markers.hover.size > 0 ? e = t.config.markers.hover.size : e += t.config.markers.hover.sizeOffset), t.globals.markers.largestSize = e, e;
  }
  /**
   * @memberof Core
   * returns the sum of all values in a series
   * Eg. w.seriesData.series = [[32,33,43,12], [2,3,5,1]]
   *  @return [120, 11]
   **/
  getSeriesTotals() {
    const t = this.w;
    t.globals.seriesTotals = t.seriesData.series.map((e) => {
      let s = 0;
      if (Array.isArray(e))
        for (let i = 0; i < e.length; i++)
          s += e[i];
      else
        s += e;
      return s;
    });
  }
  getSeriesTotalsXRange(t, e) {
    const s = this.w;
    return s.seriesData.series.map((a, o) => {
      let r = 0;
      for (let n = 0; n < a.length; n++)
        s.seriesData.seriesX[o][n] > t && s.seriesData.seriesX[o][n] < e && (r += a[n]);
      return r;
    });
  }
  /**
   * @memberof CoreUtils
   * returns the percentage value of all individual values which can be used in a 100% stacked series
   * Eg. w.seriesData.series = [[32, 33, 43, 12], [2, 3, 5, 1]]
   *  @return [[94.11, 91.66, 89.58, 92.30], [5.88, 8.33, 10.41, 7.7]]
   **/
  getPercentSeries() {
    const t = this.w;
    t.globals.seriesPercent = t.seriesData.series.map((e) => {
      const s = [];
      if (Array.isArray(e))
        for (let i = 0; i < e.length; i++) {
          const a = t.seriesData.stackedSeriesTotals[i];
          let o = 0;
          a && (o = 100 * e[i] / a), s.push(o);
        }
      else {
        const i = t.globals.seriesTotals.reduce((o, r) => o + r, 0), a = 100 * e / i;
        s.push(a);
      }
      return s;
    });
  }
  getCalculatedRatios() {
    const t = this.w, e = t.globals, s = [];
    let i = 0, a = 0, o = 0, r = 0, n = [], l = 0.1, c = 0;
    if (e.yRange = [], e.isMultipleYAxis)
      for (let h = 0; h < e.minYArr.length; h++)
        e.yRange.push(Math.abs(e.minYArr[h] - e.maxYArr[h])), n.push(0);
    else
      e.yRange.push(Math.abs(e.minY - e.maxY));
    e.xRange = Math.abs(e.maxX - e.minX), e.zRange = Math.abs(e.maxZ - e.minZ);
    for (let h = 0; h < e.yRange.length; h++)
      s.push(e.yRange[h] / this.w.layout.gridHeight);
    if (a = e.xRange / this.w.layout.gridWidth, i = e.yRange / this.w.layout.gridWidth, o = e.xRange / this.w.layout.gridHeight, r = e.zRange / this.w.layout.gridHeight * 16, r || (r = 1), e.minY !== Number.MIN_VALUE && Math.abs(e.minY) !== 0 && (e.hasNegs = !0), t.globals.seriesYAxisReverseMap.length > 0) {
      const h = (d, p) => {
        const g = t.config.yaxis[t.globals.seriesYAxisReverseMap[p]], f = d < 0 ? -1 : 1;
        return d = Math.abs(d), g.logarithmic && (d = this.getBaseLog(g.logBase, d)), -f * d / s[p];
      };
      if (e.isMultipleYAxis) {
        n = [];
        for (let d = 0; d < s.length; d++)
          n.push(h(e.minYArr[d], d));
      } else
        n = [], n.push(h(e.minY, 0)), e.minY !== Number.MIN_VALUE && Math.abs(e.minY) !== 0 && (l = -e.minY / i, c = e.minX / a);
    } else
      n = [], n.push(0), l = 0, c = 0;
    return {
      yRatio: s,
      invertedYRatio: i,
      zRatio: r,
      xRatio: a,
      invertedXRatio: o,
      baseLineInvertedY: l,
      baseLineY: n,
      baseLineX: c
    };
  }
  getLogSeries(t) {
    const e = this.w;
    return e.globals.seriesLog = t.map((s, i) => {
      const a = e.globals.seriesYAxisReverseMap[i];
      return e.config.yaxis[a] && e.config.yaxis[a].logarithmic ? s.map((o) => o === null ? null : this.getLogVal(e.config.yaxis[a].logBase, o, i)) : s;
    }), e.globals.invalidLogScale ? t : e.globals.seriesLog;
  }
  getLogValAtSeriesIndex(t, e) {
    if (t === null)
      return null;
    const s = this.w, i = s.globals.seriesYAxisReverseMap[e];
    return s.config.yaxis[i] && s.config.yaxis[i].logarithmic ? this.getLogVal(
      s.config.yaxis[i].logBase,
      t,
      e
    ) : t;
  }
  getBaseLog(t, e) {
    return Math.log(e) / Math.log(t);
  }
  getLogVal(t, e, s) {
    if (e <= 0)
      return 0;
    const i = this.w, a = i.globals.minYArr[s] === 0 ? -1 : this.getBaseLog(t, i.globals.minYArr[s]), r = (i.globals.maxYArr[s] === 0 ? 0 : this.getBaseLog(t, i.globals.maxYArr[s])) - a;
    return e < 1 ? e / r : (this.getBaseLog(t, e) - a) / r;
  }
  getLogYRatios(t) {
    const e = this.w, s = this.w.globals;
    return s.yLogRatio = t.slice(), s.logYRange = s.yRange.map((i, a) => {
      const o = e.globals.seriesYAxisReverseMap[a];
      if (e.config.yaxis[o] && this.w.config.yaxis[o].logarithmic) {
        let r = -Number.MAX_VALUE, n = Number.MIN_VALUE, l = 1;
        return s.seriesLog.forEach((c, h) => {
          c.forEach((d) => {
            e.config.yaxis[h] && e.config.yaxis[h].logarithmic && (r = Math.max(d, r), n = Math.min(d, n));
          });
        }), l = Math.pow(s.yRange[a], Math.abs(n - r) / s.yRange[a]), s.yLogRatio[a] = l / this.w.layout.gridHeight, l;
      }
    }), s.invalidLogScale ? t.slice() : s.yLogRatio;
  }
  // Some config objects can be array - and we need to extend them correctly
  static extendArrayProps(t, e, s) {
    var i, a;
    return e != null && e.yaxis && (e = t.extendYAxis(e, s)), e != null && e.annotations && (e.annotations.yaxis && (e = t.extendYAxisAnnotations(e)), (i = e == null ? void 0 : e.annotations) != null && i.xaxis && (e = t.extendXAxisAnnotations(e)), (a = e == null ? void 0 : e.annotations) != null && a.points && (e = t.extendPointAnnotations(e))), e;
  }
  // Series of the same group and type can be stacked together distinct from
  // other series of the same type on the same axis.
  drawSeriesByGroup(t, e, s, i) {
    const a = this.w, o = [];
    return t.series.length > 0 && e.forEach((r) => {
      const n = [], l = [];
      t.i.forEach((c, h) => {
        a.config.series[c].group === r && (n.push(t.series[h]), l.push(c));
      }), n.length > 0 && o.push(i.draw(n, s, l));
    }), o;
  }
}
class ut {
  constructor(t, e) {
    this.w = t, this.ctx = e;
  }
  animateLine(t, e, s, i) {
    t.attr(e).animate(i).attr(s);
  }
  /*
   ** Animate radius of a circle element
   */
  animateMarker(t, e, s, i) {
    t.attr({
      opacity: 0
    }).animate(e).attr({
      opacity: 1
    }).after(() => {
      i();
    });
  }
  /*
   ** Animate rect properties
   */
  animateRect(t, e, s, i, a) {
    t.attr(e).animate(i).attr(s).after(() => a());
  }
  animatePathsGradually(t) {
    const { el: e, realIndex: s, j: i, fill: a, pathFrom: o, pathTo: r, speed: n, delay: l } = t, c = this, h = this.w;
    let d = 0;
    h.config.chart.animations.animateGradually.enabled && (d = h.config.chart.animations.animateGradually.delay), h.config.chart.animations.dynamicAnimation.enabled && h.globals.dataChanged && h.config.chart.type !== "bar" && (d = 0), c.morphSVG(
      e,
      s,
      i,
      h.config.chart.type === "line" && !h.globals.comboCharts ? "stroke" : a,
      o,
      r,
      n,
      l * d
    );
  }
  showDelayedElements() {
    this.w.globals.delayedElements.forEach((t) => {
      const e = t.el;
      e.classList.remove("apexcharts-element-hidden"), e.classList.add("apexcharts-hidden-element-shown");
    });
  }
  animationCompleted(t) {
    const e = this.w;
    e.globals.animationEnded || (e.globals.animationEnded = !0, this.showDelayedElements(), typeof e.config.chart.events.animationEnd == "function" && e.config.chart.events.animationEnd(this.ctx, { el: t, w: e }));
  }
  // SVG.js animation for morphing one path to another
  morphSVG(t, e, s, i, a, o, r, n) {
    const l = this.w;
    a || (a = t.attr("pathFrom")), o || (o = t.attr("pathTo"));
    const c = () => (l.config.chart.type === "radar" && (r = 1), `M 0 ${l.layout.gridHeight}`);
    (!a || a.indexOf("undefined") > -1 || a.indexOf("NaN") > -1) && (a = c()), (!o.trim() || o.indexOf("undefined") > -1 || o.indexOf("NaN") > -1) && (o = c()), l.globals.shouldAnimate || (r = 1), t.plot(a).animate(1, n).plot(a).animate(r, n).plot(o).after(() => {
      L.isNumber(s) ? s === l.seriesData.series[l.globals.maxValsInArrayIndex].length - 2 && l.globals.shouldAnimate && this.animationCompleted(t) : i !== "none" && l.globals.shouldAnimate && (!l.globals.comboCharts && e === l.seriesData.series.length - 1 || l.globals.comboCharts) && this.animationCompleted(t), this.showDelayedElements();
    });
  }
}
class Z {
  constructor(t) {
    this.w = t;
  }
  // create a re-usable filter which can be appended other filter effects and applied to multiple elements
  getDefaultFilter(t, e) {
    const s = this.w;
    t.unfilter && t.unfilter(!0), s.config.chart.dropShadow.enabled && this.dropShadow(t, s.config.chart.dropShadow, e);
  }
  applyFilter(t, e, s) {
    var i, a, o;
    const r = this.w;
    if (t.unfilter && t.unfilter(!0), s === "none") {
      this.getDefaultFilter(t, e);
      return;
    }
    const n = r.config.chart.dropShadow, l = s === "lighten" ? 2 : 0.3;
    t.filterWith && (t.filterWith((c) => {
      c.colorMatrix({
        type: "matrix",
        values: `
            ${l} 0 0 0 0
            0 ${l} 0 0 0
            0 0 ${l} 0 0
            0 0 0 1 0
          `,
        in: "SourceGraphic",
        result: "brightness"
      }), n.enabled && this.addShadow(c, e, n, "brightness");
    }), n.noUserSpaceOnUse || (a = (i = t.filterer()) == null ? void 0 : i.node) == null || a.setAttribute("filterUnits", "userSpaceOnUse"), this._scaleFilterSize((o = t.filterer()) == null ? void 0 : o.node));
  }
  // appends dropShadow to the filter object which can be chained with other filter effects
  addShadow(t, e, s, i) {
    var a;
    const o = this.w;
    let { blur: r, top: n, left: l, color: c, opacity: h } = s;
    if (c = Array.isArray(c) ? c[e] : c, ((a = o.config.chart.dropShadow.enabledOnSeries) == null ? void 0 : a.length) > 0 && o.config.chart.dropShadow.enabledOnSeries.indexOf(e) === -1)
      return t;
    t.offset({
      in: i,
      dx: l,
      dy: n,
      result: "offset"
    }), t.gaussianBlur({
      in: "offset",
      stdDeviation: r,
      result: "blur"
    }), t.flood({
      "flood-color": c,
      "flood-opacity": h,
      result: "flood"
    }), t.composite({
      in: "flood",
      in2: "blur",
      operator: "in",
      result: "shadow"
    }), t.merge(["shadow", i]);
  }
  // directly adds dropShadow to the element and returns the same element.
  dropShadow(t, e, s = 0) {
    var i, a, o, r, n;
    const l = this.w;
    return t.unfilter && t.unfilter(!0), L.isMsEdge() && l.config.chart.type === "radialBar" || ((i = l.config.chart.dropShadow.enabledOnSeries) == null ? void 0 : i.length) > 0 && ((a = l.config.chart.dropShadow.enabledOnSeries) == null ? void 0 : a.indexOf(s)) === -1 || t.filterWith && (t.filterWith((c) => {
      this.addShadow(c, s, e, "SourceGraphic");
    }), e.noUserSpaceOnUse || (r = (o = t.filterer()) == null ? void 0 : o.node) == null || r.setAttribute("filterUnits", "userSpaceOnUse"), this._scaleFilterSize((n = t.filterer()) == null ? void 0 : n.node)), t;
  }
  setSelectionFilter(t, e, s) {
    const i = this.w;
    if (typeof i.interact.selectedDataPoints[e] < "u" && i.interact.selectedDataPoints[e].indexOf(s) > -1) {
      t.node.setAttribute("selected", !0);
      const a = i.config.states.active.filter;
      a !== "none" && this.applyFilter(t, e, a.type);
    }
  }
  _scaleFilterSize(t) {
    if (!t)
      return;
    ((s) => {
      for (const i in s)
        Object.prototype.hasOwnProperty.call(s, i) && t.setAttribute(i, s[i]);
    })({
      width: "200%",
      height: "200%",
      x: "-50%",
      y: "-50%"
    });
  }
}
class P {
  constructor(t, e = null) {
    this.w = t, this.ctx = e;
  }
  /*****************************************************************************
   *                                                                            *
   *  SVG Path Rounding Function                                                *
   *  Copyright (C) 2014 Yona Appletree                                         *
   *                                                                            *
   *  Licensed under the Apache License, Version 2.0 (the "License");           *
   *  you may not use this file except in compliance with the License.          *
   *  You may obtain a copy of the License at                                   *
   *                                                                            *
   *      http://www.apache.org/licenses/LICENSE-2.0                            *
   *                                                                            *
   *  Unless required by applicable law or agreed to in writing, software       *
   *  distributed under the License is distributed on an "AS IS" BASIS,         *
   *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.  *
   *  See the License for the specific language governing permissions and       *
   *  limitations under the License.                                            *
   *                                                                            *
   *****************************************************************************/
  /**
   * SVG Path rounding function. Takes an input path string and outputs a path
   * string where all line-line corners have been rounded. Only supports absolute
   * commands at the moment.
   *
   * @param pathString The SVG input path
   * @param radius The amount to round the corners, either a value in the SVG
   *               coordinate space, or, if useFractionalRadius is true, a value
   *               from 0 to 1.
   * @returns A new SVG path string with the rounding
   */
  roundPathCorners(t, e) {
    t.indexOf("NaN") > -1 && (t = "");
    function s(S, k, F) {
      var T = k.x - S.x, M = k.y - S.y, E = Math.sqrt(T * T + M * M);
      return i(
        S,
        k,
        Math.min(1, F / E)
      );
    }
    function i(S, k, F) {
      return {
        x: S.x + (k.x - S.x) * F,
        y: S.y + (k.y - S.y) * F
      };
    }
    function a(S, k) {
      S.length > 2 && (S[S.length - 2] = k.x, S[S.length - 1] = k.y);
    }
    function o(S) {
      return {
        x: parseFloat(S[S.length - 2]),
        y: parseFloat(S[S.length - 1])
      };
    }
    var r = t.split(/[,\s]/).reduce(function(S, k) {
      var F = k.match(/^([a-zA-Z])(.+)/);
      return F ? (S.push(F[1]), S.push(F[2])) : S.push(k), S;
    }, []), n = r.reduce(function(S, k) {
      return parseFloat(k) == k && S.length ? S[S.length - 1].push(k) : S.push([k]), S;
    }, []), l = [];
    if (n.length > 1) {
      var c = o(n[0]), h = null;
      n[n.length - 1][0] == "Z" && n[0].length > 2 && (h = ["L", c.x, c.y], n[n.length - 1] = h), l.push(n[0]);
      for (var d = 1; d < n.length; d++) {
        var p = l[l.length - 1], g = n[d], f = g == h ? n[1] : n[d + 1];
        if (f && p && p.length > 2 && g[0] == "L" && f.length > 2 && f[0] == "L") {
          var x = o(p), m = o(g), u = o(f), y, b;
          y = s(m, x, e), b = s(m, u, e), a(g, y), g.origPoint = m, l.push(g);
          var w = i(y, m, 0.5), v = i(m, b, 0.5), C = [
            "C",
            w.x,
            w.y,
            v.x,
            v.y,
            b.x,
            b.y
          ];
          C.origPoint = m, l.push(C);
        } else
          l.push(g);
      }
      if (h) {
        var D = o(
          l[l.length - 1]
        );
        l.push(["Z"]), a(l[0], D);
      }
    } else
      l = n;
    return l.reduce(function(S, k) {
      return S + k.join(" ") + " ";
    }, "");
  }
  drawLine(t, e, s, i, a = "#a8a8a8", o = 0, r = null, n = "butt") {
    return this.w.dom.Paper.line().attr({
      x1: t,
      y1: e,
      x2: s,
      y2: i,
      stroke: a,
      "stroke-dasharray": o,
      "stroke-width": r,
      "stroke-linecap": n
    });
  }
  drawRect(t = 0, e = 0, s = 0, i = 0, a = 0, o = "#fefefe", r = 1, n = null, l = null, c = 0) {
    const d = this.w.dom.Paper.rect();
    return d.attr({
      x: t,
      y: e,
      width: s > 0 ? s : 0,
      height: i > 0 ? i : 0,
      rx: a,
      ry: a,
      opacity: r,
      "stroke-width": n !== null ? n : 0,
      stroke: l !== null ? l : "none",
      "stroke-dasharray": c
    }), d.node.setAttribute("fill", o), d;
  }
  drawPolygon(t, e = "#e1e1e1", s = 1, i = "none") {
    return this.w.dom.Paper.polygon(t).attr({
      fill: i,
      stroke: e,
      "stroke-width": s
    });
  }
  drawCircle(t, e = null) {
    const s = this.w;
    t < 0 && (t = 0);
    const i = s.dom.Paper.circle(t * 2);
    return e !== null && i.attr(e), i;
  }
  drawPath({
    d: t = "",
    stroke: e = "#a8a8a8",
    strokeWidth: s = 1,
    fill: i,
    fillOpacity: a = 1,
    strokeOpacity: o = 1,
    classes: r,
    strokeLinecap: n = null,
    strokeDashArray: l = 0
  }) {
    const c = this.w;
    return n === null && (n = c.config.stroke.lineCap), (t.indexOf("undefined") > -1 || t.indexOf("NaN") > -1) && (t = `M 0 ${c.layout.gridHeight}`), c.dom.Paper.path(t).attr({
      fill: i,
      "fill-opacity": a,
      stroke: e,
      "stroke-opacity": o,
      "stroke-linecap": n,
      "stroke-width": s,
      "stroke-dasharray": l,
      class: r
    });
  }
  group(t = null) {
    const s = this.w.dom.Paper.group();
    return t !== null && s.attr(t), s;
  }
  move(t, e) {
    return ["M", t, e].join(" ");
  }
  line(t, e, s = null) {
    let i = null;
    return s === null ? i = [" L", t, e].join(" ") : s === "H" ? i = [" H", t].join(" ") : s === "V" && (i = [" V", e].join(" ")), i;
  }
  curve(t, e, s, i, a, o) {
    return ["C", t, e, s, i, a, o].join(" ");
  }
  quadraticCurve(t, e, s, i) {
    return ["Q", t, e, s, i].join(" ");
  }
  arc(t, e, s, i, a, o, r, n = !1) {
    let l = "A";
    return n && (l = "a"), [l, t, e, s, i, a, o, r].join(
      " "
    );
  }
  /**
   * @memberof Graphics
   * @param {object}
   *  i = series's index
   *  realIndex = realIndex is series's actual index when it was drawn time. After several redraws, the iterating "i" may change in loops, but realIndex doesn't
   *  pathFrom = existing pathFrom to animateTo
   *  pathTo = new Path to which d attr will be animated from pathFrom to pathTo
   *  stroke = line Color
   *  strokeWidth = width of path Line
   *  fill = it can be gradient, single color, pattern or image
   *  animationDelay = how much to delay when starting animation (in milliseconds)
   *  dataChangeSpeed = for dynamic animations, when data changes
   *  className = class attribute to add
   * @return {object} svg.js path object
   **/
  renderPaths({
    j: t,
    realIndex: e,
    pathFrom: s,
    pathTo: i,
    stroke: a,
    strokeWidth: o,
    strokeLinecap: r,
    fill: n,
    animationDelay: l,
    initialSpeed: c,
    dataChangeSpeed: h,
    className: d,
    chartType: p,
    shouldClipToGrid: g = !0,
    bindEventsOnPaths: f = !0,
    drawShadow: x = !0
  }) {
    const m = this.w, u = new Z(this.w), y = new ut(this.w), b = this.w.config.chart.animations.enabled, w = b && this.w.config.chart.animations.dynamicAnimation.enabled;
    if (s && s.startsWith("M 0 0") && i) {
      const T = i.match(/^M\s+[\d.-]+\s+[\d.-]+/);
      T && (s = s.replace(/^M\s+0\s+0/, T[0]));
    }
    let v;
    const C = !!(b && !m.globals.resized || w && m.globals.dataChanged && m.globals.shouldAnimate);
    C ? v = s : (v = i, m.globals.animationEnded = !0);
    const D = m.config.stroke.dashArray;
    let S = 0;
    Array.isArray(D) ? S = D[e] : S = m.config.stroke.dashArray;
    const k = this.drawPath({
      d: v,
      stroke: a,
      strokeWidth: o,
      fill: n,
      fillOpacity: 1,
      classes: d,
      strokeLinecap: r,
      strokeDashArray: S
    });
    k.attr("index", e), g && (p === "bar" && !m.globals.isHorizontal || m.globals.comboCharts ? k.attr({
      "clip-path": `url(#gridRectBarMask${m.globals.cuid})`
    }) : k.attr({
      "clip-path": `url(#gridRectMask${m.globals.cuid})`
    })), m.config.chart.dropShadow.enabled && x && u.dropShadow(k, m.config.chart.dropShadow, e), f && (k.node.addEventListener("mouseenter", this.pathMouseEnter.bind(this, k)), k.node.addEventListener("mouseleave", this.pathMouseLeave.bind(this, k)), k.node.addEventListener("mousedown", this.pathMouseDown.bind(this, k))), k.attr({
      pathTo: i,
      pathFrom: s
    });
    const F = {
      el: k,
      j: t,
      realIndex: e,
      pathFrom: s,
      pathTo: i,
      fill: n,
      strokeWidth: o,
      delay: l
    };
    return b && !m.globals.resized && !m.globals.dataChanged ? y.animatePathsGradually(O(I({}, F), {
      speed: c
    })) : (m.globals.resized || !m.globals.dataChanged) && y.showDelayedElements(), m.globals.dataChanged && w && C && y.animatePathsGradually(O(I({}, F), {
      speed: h
    })), k;
  }
  drawPattern(t, e, s, i = "#a8a8a8", a = 0) {
    return this.w.dom.Paper.pattern(e, s, (n) => {
      t === "horizontalLines" ? n.line(0, 0, s, 0).stroke({ color: i, width: a + 1 }) : t === "verticalLines" ? n.line(0, 0, 0, e).stroke({ color: i, width: a + 1 }) : t === "slantedLines" ? n.line(0, 0, e, s).stroke({ color: i, width: a }) : t === "squares" ? n.rect(e, s).fill("none").stroke({ color: i, width: a }) : t === "circles" && n.circle(e).fill("none").stroke({ color: i, width: a });
    });
  }
  drawGradient(t, e, s, i, a, o = null, r = null, n = [], l = 0) {
    const c = this.w;
    let h;
    e.length < 9 && e.indexOf("#") === 0 && (e = L.hexToRgba(e, i)), s.length < 9 && s.indexOf("#") === 0 && (s = L.hexToRgba(s, a));
    let d = 0, p = 1, g = 1, f = null;
    r !== null && (d = typeof r[0] < "u" ? r[0] / 100 : 0, p = typeof r[1] < "u" ? r[1] / 100 : 1, g = typeof r[2] < "u" ? r[2] / 100 : 1, f = typeof r[3] < "u" ? r[3] / 100 : null);
    const x = c.config.chart.type === "donut" || c.config.chart.type === "pie" || c.config.chart.type === "polarArea" || c.config.chart.type === "bubble";
    if (!n || n.length === 0 ? h = c.dom.Paper.gradient(x ? "radial" : "linear", (m) => {
      m.stop(d, e, i), m.stop(p, s, a), m.stop(g, s, a), f !== null && m.stop(f, e, i);
    }) : h = c.dom.Paper.gradient(x ? "radial" : "linear", (m) => {
      (Array.isArray(n[l]) ? n[l] : n).forEach((y) => {
        m.stop(y.offset / 100, y.color, y.opacity);
      });
    }), !x)
      t === "vertical" ? h.from(0, 0).to(0, 1) : t === "diagonal" ? h.from(0, 0).to(1, 1) : t === "horizontal" ? h.from(0, 1).to(1, 1) : t === "diagonal2" && h.from(1, 0).to(0, 1);
    else {
      const m = c.layout.gridWidth / 2, u = c.layout.gridHeight / 2;
      c.config.chart.type !== "bubble" ? h.attr({
        gradientUnits: "userSpaceOnUse",
        cx: m,
        cy: u,
        r: o
      }) : h.attr({
        cx: 0.5,
        cy: 0.5,
        r: 0.8,
        fx: 0.2,
        fy: 0.2
      });
    }
    return h;
  }
  getTextBasedOnMaxWidth({ text: t, maxWidth: e, fontSize: s, fontFamily: i }) {
    const a = this.getTextRects(t, s, i), o = a.width / t.length, r = Math.floor(e / o);
    return e < a.width ? t.slice(0, r - 3) + "..." : t;
  }
  drawText({
    x: t,
    y: e,
    text: s,
    textAnchor: i,
    fontSize: a,
    fontFamily: o,
    fontWeight: r,
    foreColor: n,
    opacity: l,
    maxWidth: c,
    cssClass: h = "",
    isPlainText: d = !0,
    dominantBaseline: p = "auto"
  }) {
    const g = this.w;
    typeof s > "u" && (s = "");
    let f = s;
    i || (i = "start"), (!n || !n.length) && (n = g.config.chart.foreColor), o = o || g.config.chart.fontFamily, a = a || "11px", r = r || "regular";
    const x = {
      maxWidth: c,
      fontSize: a,
      fontFamily: o
    };
    let m;
    return Array.isArray(s) ? m = g.dom.Paper.text((u) => {
      for (let y = 0; y < s.length; y++)
        f = s[y], c && (f = this.getTextBasedOnMaxWidth(I({
          text: s[y]
        }, x))), y === 0 ? u.tspan(f) : u.tspan(f).newLine();
    }) : (c && (f = this.getTextBasedOnMaxWidth(I({
      text: s
    }, x))), m = d ? g.dom.Paper.plain(s) : g.dom.Paper.text((u) => u.tspan(f))), m.attr({
      x: t,
      y: e,
      "text-anchor": i,
      "dominant-baseline": p,
      "font-size": a,
      "font-family": o,
      "font-weight": r,
      fill: n,
      class: "apexcharts-text " + h
    }), m.node.style.fontFamily = o, m.node.style.opacity = l, m;
  }
  getMarkerPath(t, e, s, i) {
    let a = "";
    switch (s) {
      case "cross":
        i = i / 1.4, a = `M ${t - i} ${e - i} L ${t + i} ${e + i}  M ${t - i} ${e + i} L ${t + i} ${e - i}`;
        break;
      case "plus":
        i = i / 1.12, a = `M ${t - i} ${e} L ${t + i} ${e}  M ${t} ${e - i} L ${t} ${e + i}`;
        break;
      case "star":
      case "sparkle": {
        let o = 5;
        i = i * 1.15, s === "sparkle" && (i = i / 1.1, o = 4);
        const r = Math.PI / o;
        for (let n = 0; n <= 2 * o; n++) {
          const l = n * r, c = n % 2 === 0 ? i : i / 2, h = t + c * Math.sin(l), d = e - c * Math.cos(l);
          a += (n === 0 ? "M" : "L") + h + "," + d;
        }
        a += "Z";
        break;
      }
      case "triangle":
        a = `M ${t} ${e - i} 
             L ${t + i} ${e + i} 
             L ${t - i} ${e + i} 
             Z`;
        break;
      case "square":
      case "rect":
        i = i / 1.125, a = `M ${t - i} ${e - i} 
           L ${t + i} ${e - i} 
           L ${t + i} ${e + i} 
           L ${t - i} ${e + i} 
           Z`;
        break;
      case "diamond":
        i = i * 1.05, a = `M ${t} ${e - i} 
             L ${t + i} ${e} 
             L ${t} ${e + i} 
             L ${t - i} ${e} 
            Z`;
        break;
      case "line":
        i = i / 1.1, a = `M ${t - i} ${e} 
           L ${t + i} ${e}`;
        break;
      case "circle":
      default:
        i = i * 2, a = `M ${t}, ${e} 
           m -${i / 2}, 0 
           a ${i / 2},${i / 2} 0 1,0 ${i},0 
           a ${i / 2},${i / 2} 0 1,0 -${i},0`;
        break;
    }
    return a;
  }
  /**
   * @param {number} x - The x-coordinate of the marker
   * @param {number} y - The y-coordinate of the marker.
   * @param {number} size - The size of the marker
   * @param {Object} opts - The options for the marker.
   * @returns {Object} The created marker.
   */
  drawMarkerShape(t, e, s, i, a) {
    const o = this.drawPath({
      d: this.getMarkerPath(t, e, s, i, a),
      stroke: a.pointStrokeColor,
      strokeDashArray: a.pointStrokeDashArray,
      strokeWidth: a.pointStrokeWidth,
      fill: a.pointFillColor,
      fillOpacity: a.pointFillOpacity,
      strokeOpacity: a.pointStrokeOpacity
    });
    return o.attr({
      cx: t,
      cy: e,
      shape: a.shape,
      class: a.class ? a.class : ""
    }), o;
  }
  drawMarker(t, e, s) {
    t = t || 0;
    let i = s.pSize || 0;
    return L.isNumber(e) || (i = 0, e = 0), this.drawMarkerShape(t, e, s == null ? void 0 : s.shape, i, I(I({}, s), s.shape === "line" || s.shape === "plus" || s.shape === "cross" ? {
      pointStrokeColor: s.pointFillColor,
      pointStrokeOpacity: s.pointFillOpacity
    } : {}));
  }
  pathMouseEnter(t, e) {
    const s = this.w, i = new Z(this.w), a = parseInt(t.node.getAttribute("index"), 10), o = parseInt(t.node.getAttribute("j"), 10);
    if (typeof s.config.chart.events.dataPointMouseEnter == "function" && s.config.chart.events.dataPointMouseEnter(e, this.ctx, {
      seriesIndex: a,
      dataPointIndex: o,
      w: s
    }), P._fireEvent(s, "dataPointMouseEnter", [
      e,
      this.ctx,
      { seriesIndex: a, dataPointIndex: o, w: s }
    ]), !(s.config.states.active.filter.type !== "none" && t.node.getAttribute("selected") === "true") && s.config.states.hover.filter.type !== "none" && !s.interact.isTouchDevice) {
      const r = s.config.states.hover.filter;
      i.applyFilter(t, a, r.type);
    }
  }
  pathMouseLeave(t, e) {
    const s = this.w, i = new Z(this.w), a = parseInt(t.node.getAttribute("index"), 10), o = parseInt(t.node.getAttribute("j"), 10);
    typeof s.config.chart.events.dataPointMouseLeave == "function" && s.config.chart.events.dataPointMouseLeave(e, this.ctx, {
      seriesIndex: a,
      dataPointIndex: o,
      w: s
    }), P._fireEvent(s, "dataPointMouseLeave", [
      e,
      this.ctx,
      { seriesIndex: a, dataPointIndex: o, w: s }
    ]), !(s.config.states.active.filter.type !== "none" && t.node.getAttribute("selected") === "true") && s.config.states.hover.filter.type !== "none" && i.getDefaultFilter(t, a);
  }
  pathMouseDown(t, e) {
    const s = this.w, i = new Z(this.w), a = parseInt(t.node.getAttribute("index"), 10), o = parseInt(t.node.getAttribute("j"), 10);
    let r = "false";
    if (t.node.getAttribute("selected") === "true") {
      if (t.node.setAttribute("selected", "false"), s.interact.selectedDataPoints[a].indexOf(o) > -1) {
        const n = s.interact.selectedDataPoints[a].indexOf(o);
        s.interact.selectedDataPoints[a].splice(n, 1);
      }
    } else {
      if (!s.config.states.active.allowMultipleDataPointsSelection && s.interact.selectedDataPoints.length > 0) {
        s.interact.selectedDataPoints = [];
        const n = s.dom.Paper.find(
          ".apexcharts-series path:not(.apexcharts-decoration-element)"
        ), l = s.dom.Paper.find(
          ".apexcharts-series circle:not(.apexcharts-decoration-element), .apexcharts-series rect:not(.apexcharts-decoration-element)"
        ), c = (h) => {
          Array.prototype.forEach.call(h, (d) => {
            d.node.setAttribute("selected", "false"), i.getDefaultFilter(d, a);
          });
        };
        c(n), c(l);
      }
      t.node.setAttribute("selected", "true"), r = "true", typeof s.interact.selectedDataPoints[a] > "u" && (s.interact.selectedDataPoints[a] = []), s.interact.selectedDataPoints[a].push(o);
    }
    if (r === "true") {
      const n = s.config.states.active.filter;
      if (n !== "none")
        i.applyFilter(t, a, n.type);
      else if (s.config.states.hover.filter !== "none" && !s.interact.isTouchDevice) {
        const l = s.config.states.hover.filter;
        i.applyFilter(t, a, l.type);
      }
    } else if (s.config.states.active.filter.type !== "none")
      if (s.config.states.hover.filter.type !== "none" && !s.interact.isTouchDevice) {
        const n = s.config.states.hover.filter;
        i.applyFilter(t, a, n.type);
      } else
        i.getDefaultFilter(t, a);
    typeof s.config.chart.events.dataPointSelection == "function" && s.config.chart.events.dataPointSelection(e, this.ctx, {
      selectedDataPoints: s.interact.selectedDataPoints,
      seriesIndex: a,
      dataPointIndex: o,
      w: s
    }), e && P._fireEvent(s, "dataPointSelection", [
      e,
      this.ctx,
      {
        selectedDataPoints: s.interact.selectedDataPoints,
        seriesIndex: a,
        dataPointIndex: o,
        w: s
      }
    ]);
  }
  rotateAroundCenter(t) {
    let e = {};
    t && typeof t.getBBox == "function" && (e = t.getBBox());
    const s = e.x + e.width / 2, i = e.y + e.height / 2;
    return {
      x: s,
      y: i
    };
  }
  /**
   * Sets up event delegation on a parent group element.
   * Uses mouseover/mouseout (which bubble) to simulate mouseenter/mouseleave
   * on matching child elements, reducing per-element listener overhead.
   */
  setupEventDelegation(t, e) {
    let s = null;
    t.node.addEventListener("mouseover", (i) => {
      const a = P._findDelegateTarget(
        i.target,
        t.node,
        e
      );
      !a || a === s || (s && s.instance && this.pathMouseLeave(s.instance, i), s = a, a.instance && this.pathMouseEnter(a.instance, i));
    }), t.node.addEventListener("mouseout", (i) => {
      if (!s)
        return;
      (i.relatedTarget ? P._findDelegateTarget(
        i.relatedTarget,
        t.node,
        e
      ) : null) !== s && (s && s.instance && this.pathMouseLeave(s.instance, i), s = null);
    }), t.node.addEventListener("mousedown", (i) => {
      const a = P._findDelegateTarget(
        i.target,
        t.node,
        e
      );
      a && a.instance && this.pathMouseDown(a.instance, i);
    });
  }
  // Fire a named event from w.globals.events without requiring a ctx reference.
  // Mirrors Events.fireEvent() but reads the registry directly from w so that
  // pathMouseEnter/Leave/Down work even when this.ctx is null (Graphics instances
  // created without a ctx arg for drawing-only use cases).
  static _fireEvent(t, e, s) {
    const i = t.globals.events;
    if (!i || !Object.prototype.hasOwnProperty.call(i, e))
      return;
    const a = i[e];
    for (let o = 0; o < a.length; o++)
      a[o].apply(null, s);
  }
  static _findDelegateTarget(t, e, s) {
    for (; t && t !== e && t !== document; ) {
      if (t.matches && t.matches(s))
        return t;
      t = t.parentNode;
    }
    return null;
  }
  static setAttrs(t, e) {
    for (const s in e)
      Object.prototype.hasOwnProperty.call(e, s) && t.setAttribute(s, e[s]);
  }
  getTextRects(t, e, s, i, a = !0) {
    const o = this.w, r = `${t}|${e}|${s}|${i}|${a}`, n = o.globals.textRectsCache;
    if (n && n.has(r))
      return n.get(r);
    const l = this.drawText({
      x: -200,
      y: -200,
      text: t,
      textAnchor: "start",
      fontSize: e,
      fontFamily: s,
      foreColor: "#fff",
      opacity: 0
    });
    i && l.attr("transform", i), o.dom.Paper.add(l);
    let c = l.bbox();
    a || (c = l.node.getBoundingClientRect()), l.remove();
    const h = {
      width: c.width,
      height: c.height
    };
    return n && n.set(r, h), h;
  }
  /**
   * append ... to long text
   * http://stackoverflow.com/questions/9241315/trimming-text-to-a-given-pixel-width-in-svg
   * @memberof Graphics
   **/
  placeTextWithEllipsis(t, e, s) {
    if (typeof t.getComputedTextLength == "function" && (t.textContent = e, e.length > 0 && t.getComputedTextLength() >= s / 1.1)) {
      for (let i = e.length - 3; i > 0; i -= 3)
        if (t.getSubStringLength(0, i) <= s / 1.1) {
          t.textContent = e.substring(0, i) + "...";
          return;
        }
      t.textContent = ".";
    }
  }
}
const G = "http://www.w3.org/2000/svg";
class et {
  constructor(t, e) {
    typeof t == "object" ? (this.x = t.x, this.y = t.y) : (this.x = t || 0, this.y = e || 0);
  }
  transform(t) {
    return t.apply(this);
  }
  clone() {
    return new et(this.x, this.y);
  }
}
class lt {
  constructor(t, e, s, i, a, o) {
    this.a = t ?? 1, this.b = e ?? 0, this.c = s ?? 0, this.d = i ?? 1, this.e = a ?? 0, this.f = o ?? 0;
  }
  rotate(t) {
    const e = t * Math.PI / 180, s = Math.cos(e), i = Math.sin(e);
    return this.multiply(new lt(s, i, -i, s, 0, 0));
  }
  scale(t, e) {
    return this.multiply(new lt(t, 0, 0, e ?? t, 0, 0));
  }
  multiply(t) {
    return new lt(
      this.a * t.a + this.c * t.b,
      this.b * t.a + this.d * t.b,
      this.a * t.c + this.c * t.d,
      this.b * t.c + this.d * t.d,
      this.a * t.e + this.c * t.f + this.e,
      this.b * t.e + this.d * t.f + this.f
    );
  }
  apply(t) {
    return new et(
      this.a * t.x + this.c * t.y + this.e,
      this.b * t.x + this.d * t.y + this.f
    );
  }
}
class Ne {
  constructor(t, e, s, i) {
    this.x = t, this.y = e, this.w = s, this.h = i, this.width = s, this.height = i, this.x2 = t + s, this.y2 = e + i;
  }
}
class st {
  constructor(t) {
    this.w = t, this.opts = null, this.seriesIndex = 0, this.patternIDs = [];
  }
  clippedImgArea(t) {
    const e = this.w, s = e.config, i = parseInt(e.layout.gridWidth, 10), a = parseInt(e.layout.gridHeight, 10), o = i > a ? i : a, r = t.image;
    let n = 0, l = 0;
    typeof t.width > "u" && typeof t.height > "u" ? s.fill.image.width !== void 0 && s.fill.image.height !== void 0 ? (n = s.fill.image.width + 1, l = s.fill.image.height) : (n = o + 1, l = o) : (n = t.width, l = t.height);
    const c = N.createElementNS(G, "pattern");
    P.setAttrs(c, {
      id: t.patternID,
      patternUnits: t.patternUnits ? t.patternUnits : "userSpaceOnUse",
      width: n + "px",
      height: l + "px"
    });
    const h = N.createElementNS(G, "image");
    c.appendChild(h);
    const d = B.isBrowser() ? window.SVG : global.SVG;
    h.setAttributeNS(d.xlink, "href", r), P.setAttrs(h, {
      x: 0,
      y: 0,
      preserveAspectRatio: "none",
      width: n + "px",
      height: l + "px"
    }), h.style.opacity = t.opacity, e.dom.elDefs.node.appendChild(c);
  }
  getSeriesIndex(t) {
    const e = this.w, s = e.config.chart.type;
    return (s === "bar" || s === "rangeBar") && e.config.plotOptions.bar.distributed || s === "heatmap" || s === "treemap" ? this.seriesIndex = t.seriesNumber : this.seriesIndex = t.seriesNumber % e.seriesData.series.length, this.seriesIndex;
  }
  computeColorStops(t, e) {
    const s = this.w;
    let i = null, a = null;
    for (const l of t)
      l >= e.threshold ? (i === null || l > i) && (i = l) : (a === null || l < a) && (a = l);
    i === null && (i = e.threshold), a === null && (a = e.threshold);
    let o = i - e.threshold + (e.threshold - a);
    o === 0 && (o = 1);
    let n = 100 - (e.threshold - a) / o * 100;
    return n = Math.max(0, Math.min(n, 100)), [
      {
        offset: n,
        color: e.colorAboveThreshold,
        opacity: s.config.fill.opacity
      },
      {
        offset: 0,
        color: e.colorBelowThreshold,
        opacity: s.config.fill.opacity
      }
    ];
  }
  fillPath(t) {
    var e, s, i, a, o, r;
    const n = this.w;
    this.opts = t;
    const l = this.w.config;
    let c, h, d;
    this.seriesIndex = this.getSeriesIndex(t);
    const p = l.plotOptions.line.colors.colorAboveThreshold && l.plotOptions.line.colors.colorBelowThreshold;
    let f = this.getFillColors()[this.seriesIndex];
    n.seriesData.seriesColors[this.seriesIndex] !== void 0 && (f = n.seriesData.seriesColors[this.seriesIndex]), typeof f == "function" && (f = f({
      seriesIndex: this.seriesIndex,
      dataPointIndex: t.dataPointIndex,
      value: t.value,
      w: n
    }));
    const x = t.fillType ? t.fillType : this.getFillType(this.seriesIndex);
    let m = Array.isArray(l.fill.opacity) ? l.fill.opacity[this.seriesIndex] : l.fill.opacity;
    const u = x === "gradient" || p;
    t.color && (f = t.color), (i = (s = (e = n.config.series[this.seriesIndex]) == null ? void 0 : e.data) == null ? void 0 : s[t.dataPointIndex]) != null && i.fillColor && (f = (r = (o = (a = n.config.series[this.seriesIndex]) == null ? void 0 : a.data) == null ? void 0 : o[t.dataPointIndex]) == null ? void 0 : r.fillColor), f || (f = "#fff", console.warn("undefined color - ApexCharts")), L.isCSSVariable(f) && (f = L.getThemeColor(f));
    let y = f;
    if (f.indexOf("rgb") === -1 ? f.indexOf("#") === -1 ? y = f : f.length < 9 && (y = L.hexToRgba(f, m)) : f.indexOf("rgba") > -1 ? m = L.getOpacityFromRGBA(f) : y = L.hexToRgba(L.rgb2hex(f), m), t.opacity && (m = t.opacity), x === "pattern" && (h = this.handlePatternFill({
      fillConfig: t.fillConfig,
      patternFill: h,
      fillColor: f,
      fillOpacity: m,
      defaultColor: y
    })), u) {
      const b = l.fill.gradient.colorStops ? [...l.fill.gradient.colorStops] : [];
      let w = l.fill.gradient.type;
      p && (b[this.seriesIndex] = this.computeColorStops(
        n.seriesData.series[this.seriesIndex],
        l.plotOptions.line.colors
      ), w = "vertical"), d = this.handleGradientFill({
        type: w,
        fillConfig: t.fillConfig,
        fillColor: f,
        fillOpacity: m,
        colorStops: b,
        i: this.seriesIndex
      });
    }
    if (x === "image") {
      const b = l.fill.image.src, w = t.patternID ? t.patternID : "", v = `pattern${n.globals.cuid}${t.seriesNumber + 1}${w}`;
      this.patternIDs.indexOf(v) === -1 && (this.clippedImgArea({
        opacity: m,
        image: Array.isArray(b) ? t.seriesNumber < b.length ? b[t.seriesNumber] : b[0] : b,
        width: t.width ? t.width : void 0,
        height: t.height ? t.height : void 0,
        patternUnits: t.patternUnits,
        patternID: v
      }), this.patternIDs.push(v)), c = `url(#${v})`;
    } else
      u ? c = d : x === "pattern" ? c = h : c = y;
    return t.solid && (c = y), c;
  }
  getFillType(t) {
    const e = this.w;
    return Array.isArray(e.config.fill.type) ? e.config.fill.type[t] : e.config.fill.type;
  }
  getFillColors() {
    const t = this.w, e = t.config, s = this.opts;
    let i = [];
    return t.globals.comboCharts ? t.config.series[this.seriesIndex].type === "line" ? Array.isArray(t.globals.stroke.colors) ? i = t.globals.stroke.colors : i.push(t.globals.stroke.colors) : Array.isArray(t.globals.fill.colors) ? i = t.globals.fill.colors : i.push(t.globals.fill.colors) : e.chart.type === "line" ? Array.isArray(t.globals.stroke.colors) ? i = t.globals.stroke.colors : i.push(t.globals.stroke.colors) : Array.isArray(t.globals.fill.colors) ? i = t.globals.fill.colors : i.push(t.globals.fill.colors), typeof s.fillColors < "u" && (i = [], Array.isArray(s.fillColors) ? i = s.fillColors.slice() : i.push(s.fillColors)), i;
  }
  handlePatternFill({
    fillConfig: t,
    patternFill: e,
    fillColor: s,
    fillOpacity: i,
    defaultColor: a
  }) {
    let o = this.w.config.fill;
    t && (o = t);
    const r = this.opts, n = new P(this.w), l = Array.isArray(o.pattern.strokeWidth) ? o.pattern.strokeWidth[this.seriesIndex] : o.pattern.strokeWidth, c = s;
    return Array.isArray(o.pattern.style) ? typeof o.pattern.style[r.seriesNumber] < "u" ? e = n.drawPattern(
      o.pattern.style[r.seriesNumber],
      o.pattern.width,
      o.pattern.height,
      c,
      l,
      i
    ) : e = a : e = n.drawPattern(
      o.pattern.style,
      o.pattern.width,
      o.pattern.height,
      c,
      l,
      i
    ), e;
  }
  handleGradientFill({
    type: t,
    fillColor: e,
    fillOpacity: s,
    fillConfig: i,
    colorStops: a,
    i: o
  }) {
    let r = this.w.config.fill;
    i && (r = I(I({}, r), i));
    const n = this.opts, l = new P(this.w), c = new L();
    t = t || r.gradient.type;
    let h = e, d, p = r.gradient.opacityFrom === void 0 ? s : Array.isArray(r.gradient.opacityFrom) ? r.gradient.opacityFrom[o] : r.gradient.opacityFrom;
    h.indexOf("rgba") > -1 && (p = L.getOpacityFromRGBA(h));
    let g = r.gradient.opacityTo === void 0 ? s : Array.isArray(r.gradient.opacityTo) ? r.gradient.opacityTo[o] : r.gradient.opacityTo;
    if (r.gradient.gradientToColors === void 0 || r.gradient.gradientToColors.length === 0)
      r.gradient.shade === "dark" ? d = c.shadeColor(
        parseFloat(r.gradient.shadeIntensity) * -1,
        e.indexOf("rgb") > -1 ? L.rgb2hex(e) : e
      ) : d = c.shadeColor(
        parseFloat(r.gradient.shadeIntensity),
        e.indexOf("rgb") > -1 ? L.rgb2hex(e) : e
      );
    else if (r.gradient.gradientToColors[n.seriesNumber]) {
      const f = r.gradient.gradientToColors[n.seriesNumber];
      d = f, f.indexOf("rgba") > -1 && (g = L.getOpacityFromRGBA(f));
    } else
      d = e;
    if (r.gradient.gradientFrom && (h = r.gradient.gradientFrom), r.gradient.gradientTo && (d = r.gradient.gradientTo), r.gradient.inverseColors) {
      const f = h;
      h = d, d = f;
    }
    return h.indexOf("rgb") > -1 && (h = L.rgb2hex(h)), d.indexOf("rgb") > -1 && (d = L.rgb2hex(d)), l.drawGradient(
      t,
      h,
      d,
      p,
      g,
      n.size,
      r.gradient.stops,
      a,
      o
    );
  }
}
class xt {
  constructor(t, e) {
    this.w = t, this.ctx = e, this._filters = new Z(this.w), this._graphics = new P(this.w, this.ctx);
  }
  setGlobalMarkerSize() {
    const t = this.w;
    if (t.globals.markers.size = Array.isArray(t.config.markers.size) ? t.config.markers.size : [t.config.markers.size], t.globals.markers.size.length > 0) {
      if (t.globals.markers.size.length < t.seriesData.series.length + 1)
        for (let e = 0; e <= t.seriesData.series.length; e++)
          typeof t.globals.markers.size[e] > "u" && t.globals.markers.size.push(t.globals.markers.size[0]);
    } else
      t.globals.markers.size = t.config.series.map(() => t.config.markers.size);
  }
  plotChartMarkers({
    pointsPos: t,
    seriesIndex: e,
    j: s,
    pSize: i,
    alwaysDrawMarker: a = !1,
    isVirtualPoint: o = !1
  }) {
    const r = this.w, n = e, l = t;
    let c = null;
    const h = new P(this.w), d = r.config.markers.discrete && r.config.markers.discrete.length;
    if (Array.isArray(l.x))
      for (let p = 0; p < l.x.length; p++) {
        let g, f = s, x = !L.isNumber(l.y[p]);
        r.globals.markers.largestSize === 0 && r.globals.hasNullValues && r.seriesData.series[n][s + 1] !== null && !o && (x = !0), s === 1 && p === 0 && (f = 0), s === 1 && p === 1 && (f = 1);
        let m = "apexcharts-marker";
        if ((r.config.chart.type === "line" || r.config.chart.type === "area") && !r.globals.comboCharts && !r.config.tooltip.intersect && (m += " no-pointer-events"), (Array.isArray(r.config.markers.size) ? r.globals.markers.size[e] > 0 : r.config.markers.size > 0) || a || d) {
          x || (m += ` w${L.randomId()}`);
          const y = this.getMarkerConfig({
            cssClass: m,
            seriesIndex: e,
            dataPointIndex: f
          });
          r.config.series[n].data[f] && (r.config.series[n].data[f].fillColor && (y.pointFillColor = r.config.series[n].data[f].fillColor), r.config.series[n].data[f].strokeColor && (y.pointStrokeColor = r.config.series[n].data[f].strokeColor)), typeof i < "u" && (y.pSize = i), (l.x[p] < -r.globals.markers.largestSize || l.x[p] > r.layout.gridWidth + r.globals.markers.largestSize || l.y[p] < -r.globals.markers.largestSize || l.y[p] > r.layout.gridHeight + r.globals.markers.largestSize) && (y.pSize = 0), x || ((r.globals.markers.size[e] > 0 || a || d) && !c && (c = h.group({
            class: a || d ? "" : "apexcharts-series-markers"
          }), c.attr(
            "clip-path",
            `url(#gridRectMarkerMask${r.globals.cuid})`
          ), this.setupMarkerDelegation(c)), g = h.drawMarker(l.x[p], l.y[p], y), g.attr("rel", f), g.attr("j", f), g.attr("index", e), g.node.setAttribute("default-marker-size", y.pSize), this._filters.setSelectionFilter(
            g,
            e,
            f
          ), c && c.add(g));
        } else
          typeof r.globals.pointsArray[e] > "u" && (r.globals.pointsArray[e] = []), r.globals.pointsArray[e].push([l.x[p], l.y[p]]);
      }
    return c;
  }
  getMarkerConfig({
    cssClass: t,
    seriesIndex: e,
    dataPointIndex: s = null,
    radius: i = null,
    size: a = null,
    strokeWidth: o = null
  }) {
    const r = this.w, n = this.getMarkerStyle(e);
    let l = a === null ? r.globals.markers.size[e] : a;
    const c = r.config.markers;
    return s !== null && c.discrete.length && c.discrete.map((h) => {
      h.seriesIndex === e && h.dataPointIndex === s && (n.pointStrokeColor = h.strokeColor, n.pointFillColor = h.fillColor, l = h.size, n.pointShape = h.shape);
    }), {
      pSize: i === null ? l : i,
      pRadius: i !== null ? i : c.radius,
      pointStrokeWidth: o !== null ? o : Array.isArray(c.strokeWidth) ? c.strokeWidth[e] : c.strokeWidth,
      pointStrokeColor: n.pointStrokeColor,
      pointFillColor: n.pointFillColor,
      shape: n.pointShape || (Array.isArray(c.shape) ? c.shape[e] : c.shape),
      class: t,
      pointStrokeOpacity: Array.isArray(c.strokeOpacity) ? c.strokeOpacity[e] : c.strokeOpacity,
      pointStrokeDashArray: Array.isArray(c.strokeDashArray) ? c.strokeDashArray[e] : c.strokeDashArray,
      pointFillOpacity: Array.isArray(c.fillOpacity) ? c.fillOpacity[e] : c.fillOpacity,
      seriesIndex: e
    };
  }
  setupMarkerDelegation(t) {
    const e = this.w, s = ".apexcharts-marker";
    this._graphics.setupEventDelegation(t, s), t.node.addEventListener("click", (i) => {
      e.config.markers.onClick && P._findDelegateTarget(
        i.target,
        t.node,
        s
      ) && e.config.markers.onClick(i);
    }), t.node.addEventListener("dblclick", (i) => {
      e.config.markers.onDblClick && P._findDelegateTarget(
        i.target,
        t.node,
        s
      ) && e.config.markers.onDblClick(i);
    }), t.node.addEventListener(
      "touchstart",
      (i) => {
        const a = P._findDelegateTarget(
          i.target,
          t.node,
          s
        );
        a && a.instance && this._graphics.pathMouseDown(a.instance, i);
      },
      { passive: !0 }
    );
  }
  addEvents(t) {
    const e = this.w;
    t.node.addEventListener(
      "mouseenter",
      this._graphics.pathMouseEnter.bind(this.ctx, t)
    ), t.node.addEventListener(
      "mouseleave",
      this._graphics.pathMouseLeave.bind(this.ctx, t)
    ), t.node.addEventListener(
      "mousedown",
      this._graphics.pathMouseDown.bind(this.ctx, t)
    ), t.node.addEventListener("click", e.config.markers.onClick), t.node.addEventListener("dblclick", e.config.markers.onDblClick), t.node.addEventListener(
      "touchstart",
      this._graphics.pathMouseDown.bind(this.ctx, t),
      { passive: !0 }
    );
  }
  getMarkerStyle(t) {
    const e = this.w, s = e.globals.markers.colors, i = e.config.markers.strokeColor || e.config.markers.strokeColors, a = Array.isArray(i) ? i[t] : i, o = Array.isArray(s) ? s[t] : s;
    return {
      pointStrokeColor: a,
      pointFillColor: o
    };
  }
}
class ge {
  constructor(t, e) {
    this.ctx = e, this.w = t, this.initialAnim = this.w.config.chart.animations.enabled, this.anim = new ut(this.w), this.filters = new Z(this.w), this.fill = new st(this.w), this.markers = new xt(this.w, this.ctx), this.graphics = new P(this.w);
  }
  draw(t, e, s) {
    const i = this.w, a = this.graphics, o = s.realIndex, r = s.pointsPos, n = s.zRatio, l = s.elParent, c = a.group({
      class: `apexcharts-series-markers apexcharts-series-${i.config.chart.type}`
    });
    if (c.attr("clip-path", `url(#gridRectMarkerMask${i.globals.cuid})`), this.markers.setupMarkerDelegation(c), Array.isArray(r.x))
      for (let h = 0; h < r.x.length; h++) {
        let d = e + 1, p = !0;
        e === 0 && h === 0 && (d = 0), e === 0 && h === 1 && (d = 1);
        let g = i.globals.markers.size[o];
        if (n !== 1 / 0) {
          const m = i.config.plotOptions.bubble;
          g = i.seriesData.seriesZ[o][d], m.zScaling && (g /= n), m.minBubbleRadius && g < m.minBubbleRadius && (g = m.minBubbleRadius), m.maxBubbleRadius && g > m.maxBubbleRadius && (g = m.maxBubbleRadius);
        }
        const f = r.x[h], x = r.y[h];
        if (g = g || 0, (x === null || typeof i.seriesData.series[o][d] > "u") && (p = !1), p) {
          const m = this.drawPoint(
            f,
            x,
            g,
            o,
            d,
            e
          );
          c.add(m);
        }
        l.add(c);
      }
  }
  drawPoint(t, e, s, i, a, o) {
    const r = this.w, n = i, l = this.anim, c = this.filters, h = this.fill, d = this.markers, p = this.graphics, g = d.getMarkerConfig({
      cssClass: "apexcharts-marker",
      seriesIndex: n,
      dataPointIndex: a,
      radius: r.config.chart.type === "bubble" || r.globals.comboCharts && r.config.series[i] && r.config.series[i].type === "bubble" ? s : null
    });
    let f = h.fillPath({
      seriesNumber: i,
      dataPointIndex: a,
      color: g.pointFillColor,
      patternUnits: "objectBoundingBox",
      value: r.seriesData.series[i][o]
    });
    const x = p.drawMarker(t, e, g);
    if (r.config.series[n].data[a] && r.config.series[n].data[a].fillColor && (f = r.config.series[n].data[a].fillColor), x.attr({
      fill: f
    }), r.config.chart.dropShadow.enabled) {
      const m = r.config.chart.dropShadow;
      c.dropShadow(x, m, i);
    }
    if (this.initialAnim && !r.globals.dataChanged && !r.globals.resized) {
      const m = r.config.chart.animations.speed;
      l.animateMarker(x, m, r.globals.easing, () => {
        window.setTimeout(() => {
          l.animationCompleted(x);
        }, 100);
      });
    } else
      r.globals.animationEnded = !0;
    return x.attr({
      rel: a,
      j: a,
      index: i,
      "default-marker-size": g.pSize
    }), c.setSelectionFilter(x, i, a), x.node.classList.add("apexcharts-marker"), x;
  }
  centerTextInBubble(t) {
    const e = this.w;
    return t = t + parseInt(e.config.dataLabels.style.fontSize, 10) / 4, {
      y: t
    };
  }
}
class gt {
  constructor(t, e = null) {
    this.w = t, this.ctx = e;
  }
  // When there are many datalabels to be printed, and some of them overlaps each other in the same series, this method will take care of that
  // Also, when datalabels exceeds the drawable area and get clipped off, we need to adjust and move some pixels to make them visible again
  dataLabelsCorrection(t, e, s, i, a, o, r) {
    const n = this.w, l = new P(this.w);
    let c = !1;
    const h = l.getTextRects(s, r), d = h.width, p = h.height;
    e < 0 && (e = 0), e > n.layout.gridHeight + p && (e = n.layout.gridHeight + p / 2), typeof n.globals.dataLabelsRects[i] > "u" && (n.globals.dataLabelsRects[i] = []), n.globals.dataLabelsRects[i].push({ x: t, y: e, width: d, height: p });
    const g = n.globals.dataLabelsRects[i].length - 2, f = typeof n.globals.lastDrawnDataLabelsIndexes[i] < "u" ? n.globals.lastDrawnDataLabelsIndexes[i][n.globals.lastDrawnDataLabelsIndexes[i].length - 1] : 0;
    if (typeof n.globals.dataLabelsRects[i][g] < "u") {
      const x = n.globals.dataLabelsRects[i][f];
      // next label forward and x not intersecting
      (t > x.x + x.width || e > x.y + x.height || e + p < x.y || t + d < x.x) && (c = !0);
    }
    return (a === 0 || o) && (c = !0), {
      x: t,
      y: e,
      textRects: h,
      drawnextLabel: c
    };
  }
  drawDataLabel({ type: t, pos: e, i: s, j: i, isRangeStart: a, strokeWidth: o = 2 }) {
    const r = this.w, n = new P(this.w), l = r.config.dataLabels;
    let c = 0, h = 0, d = i, p = null;
    if (r.globals.collapsedSeriesIndices.indexOf(s) !== -1 || !l.enabled || !Array.isArray(e.x))
      return p;
    p = n.group({
      class: "apexcharts-data-labels"
    });
    for (let f = 0; f < e.x.length; f++)
      if (c = e.x[f] + l.offsetX, h = e.y[f] + l.offsetY + o, !isNaN(c)) {
        i === 1 && f === 0 && (d = 0), i === 1 && f === 1 && (d = 1);
        let x = r.seriesData.series[s][d];
        t === "rangeArea" && (a ? x = r.rangeData.seriesRangeStart[s][d] : x = r.rangeData.seriesRangeEnd[s][d]);
        let m = "";
        const u = (b) => r.config.dataLabels.formatter(b, {
          seriesIndex: s,
          dataPointIndex: d,
          w: r
        });
        r.config.chart.type === "bubble" ? (x = r.seriesData.seriesZ[s][d], m = u(x), h = e.y[f], h = new ge(this.w, this.ctx).centerTextInBubble(
          h,
          s,
          d
        ).y) : typeof x < "u" && (m = u(x));
        let y = r.config.dataLabels.textAnchor;
        r.globals.isSlopeChart && (d === 0 ? y = "end" : d === r.config.series[s].data.length - 1 ? y = "start" : y = "middle"), this.plotDataLabelsText({
          x: c,
          y: h,
          text: m,
          i: s,
          j: d,
          parent: p,
          offsetCorrection: !0,
          dataLabelsConfig: r.config.dataLabels,
          textAnchor: y
        });
      }
    return p;
  }
  plotDataLabelsText(t) {
    const e = this.w, s = new P(this.w);
    let {
      x: i,
      y: a,
      i: o,
      j: r,
      text: n,
      textAnchor: l,
      fontSize: c,
      parent: h,
      dataLabelsConfig: d,
      color: p,
      alwaysDrawDataLabel: g,
      offsetCorrection: f,
      className: x
    } = t, m = null;
    if (Array.isArray(e.config.dataLabels.enabledOnSeries) && e.config.dataLabels.enabledOnSeries.indexOf(o) < 0)
      return m;
    let u = {
      x: i,
      y: a,
      drawnextLabel: !0,
      textRects: null
    };
    f && (u = this.dataLabelsCorrection(
      i,
      a,
      n,
      o,
      r,
      g,
      parseInt(d.style.fontSize, 10)
    )), e.interact.zoomed || (i = u.x, a = u.y), u.textRects && (i < -20 - u.textRects.width || i > e.layout.gridWidth + u.textRects.width + 30) && (n = "");
    let y = e.globals.dataLabels.style.colors[o];
    ((e.config.chart.type === "bar" || e.config.chart.type === "rangeBar") && e.config.plotOptions.bar.distributed || e.config.dataLabels.distributed) && (y = e.globals.dataLabels.style.colors[r]), typeof y == "function" && (y = y({
      series: e.seriesData.series,
      seriesIndex: o,
      dataPointIndex: r,
      w: e
    })), p && (y = p);
    let b = d.offsetX, w = d.offsetY;
    if ((e.config.chart.type === "bar" || e.config.chart.type === "rangeBar") && (b = 0, w = 0), e.globals.isSlopeChart && (r !== 0 && (b = d.offsetX * -2 + 5), r !== 0 && r !== e.config.series[o].data.length - 1 && (b = 0)), u.drawnextLabel) {
      if (l === "middle" && i === e.layout.gridWidth && (l = "end"), m = s.drawText({
        width: 100,
        height: parseInt(d.style.fontSize, 10),
        x: i + b,
        y: a + w,
        foreColor: y,
        textAnchor: l || d.textAnchor,
        text: n,
        fontSize: c || d.style.fontSize,
        fontFamily: d.style.fontFamily,
        fontWeight: d.style.fontWeight || "normal"
      }), m.attr({
        class: x || "apexcharts-datalabel",
        cx: i,
        cy: a
      }), d.dropShadow.enabled) {
        const v = d.dropShadow;
        new Z(this.w).dropShadow(m, v);
      }
      h.add(m), typeof e.globals.lastDrawnDataLabelsIndexes[o] > "u" && (e.globals.lastDrawnDataLabelsIndexes[o] = []), e.globals.lastDrawnDataLabelsIndexes[o].push(r);
    }
    return m;
  }
  addBackgroundToDataLabel(t, e) {
    const s = this.w, i = s.config.dataLabels.background, a = i.padding, o = i.padding / 2, r = e.width, n = e.height, c = new P(this.w).drawRect(
      e.x - a,
      e.y - o / 2,
      r + a * 2,
      n + o,
      i.borderRadius,
      s.config.chart.background === "transparent" || !s.config.chart.background ? "#fff" : s.config.chart.background,
      i.opacity,
      i.borderWidth,
      i.borderColor
    );
    return i.dropShadow.enabled && new Z(this.w).dropShadow(c, i.dropShadow), c;
  }
  dataLabelsBackground() {
    const t = this.w;
    if (t.config.chart.type === "bubble")
      return;
    const e = t.dom.baseEl.querySelectorAll(
      ".apexcharts-datalabels text"
    );
    for (let s = 0; s < e.length; s++) {
      const i = e[s], a = i.getBBox();
      let o = null;
      if (a.width && a.height && (o = this.addBackgroundToDataLabel(i, a)), o) {
        i.parentNode.insertBefore(o.node, i);
        const r = t.config.dataLabels.background.backgroundColor || i.getAttribute("fill");
        t.config.chart.animations.enabled && !t.globals.resized && !t.globals.dataChanged ? o.animate().attr({ fill: r }) : o.attr({ fill: r }), i.setAttribute("fill", t.config.dataLabels.background.foreColor);
      }
    }
  }
  bringForward() {
    const t = this.w, e = t.dom.baseEl.querySelectorAll(
      ".apexcharts-datalabels"
    ), s = t.dom.baseEl.querySelector(
      ".apexcharts-plot-series:last-child"
    );
    for (let i = 0; i < e.length; i++)
      s && s.insertBefore(e[i], s.nextSibling);
  }
}
class at {
  constructor(t, { theme: e = null, timeScale: s = null } = {}) {
    this.w = t, this.theme = e, this.timeScale = s;
  }
  // Based on the formatter function, get the label text and position
  getLabel(t, e, s, i, a = [], o = "12px", r = !0) {
    const n = this.w, l = typeof t[i] > "u" ? "" : t[i];
    let c = l;
    const h = n.formatters.xLabelFormatter, d = n.config.xaxis.labels.formatter;
    let p = !1;
    const g = new vt(this.w), f = l;
    r && (c = g.xLabelFormat(h, l, f, {
      i,
      dateFormatter: new q(this.w).formatDate,
      w: n
    }), d !== void 0 && (c = d(l, t[i], {
      i,
      dateFormatter: new q(this.w).formatDate,
      w: n
    })));
    const x = (b) => {
      let w = null;
      return e.forEach((v) => {
        v.unit === "month" ? w = "year" : v.unit === "day" ? w = "month" : v.unit === "hour" ? w = "day" : v.unit === "minute" && (w = "hour");
      }), w === b;
    };
    e.length > 0 ? (p = x(e[i].unit), s = e[i].position, c = e[i].value) : n.config.xaxis.type === "datetime" && d === void 0 && (c = ""), typeof c > "u" && (c = ""), c = Array.isArray(c) ? c : c.toString();
    const m = new P(this.w);
    let u = {};
    n.layout.rotateXLabels && r ? u = m.getTextRects(
      c,
      parseInt(o, 10),
      null,
      `rotate(${n.config.xaxis.labels.rotate} 0 0)`,
      !1
    ) : u = m.getTextRects(c, parseInt(o, 10));
    const y = !n.config.xaxis.labels.showDuplicates && this.timeScale;
    return !Array.isArray(c) && (String(c) === "NaN" || a.indexOf(c) >= 0 && y) && (c = ""), {
      x: s,
      text: c,
      textRect: u,
      isBold: p
    };
  }
  checkLabelBasedOnTickamount(t, e, s) {
    const i = this.w;
    let a = i.config.xaxis.tickAmount;
    if (a === "dataPoints" && (a = Math.round(i.layout.gridWidth / 120)), a > s)
      return e;
    const o = Math.round(s / (a + 1));
    return t % o === 0 || (e.text = ""), e;
  }
  checkForOverflowingLabels(t, e, s, i, a) {
    const o = this.w;
    if (t === 0 && o.globals.skipFirstTimelinelabel && (e.text = ""), t === s - 1 && o.globals.skipLastTimelinelabel && (e.text = ""), o.config.xaxis.labels.hideOverlappingLabels && i.length > 0) {
      const r = a[a.length - 1];
      if (o.config.xaxis.labels.trim && o.config.xaxis.type !== "datetime")
        return e;
      e.x < r.textRect.width / (o.layout.rotateXLabels ? Math.abs(o.config.xaxis.labels.rotate) / 12 : 1.01) + r.x && (e.text = "");
    }
    return e;
  }
  checkForReversedLabels(t, e) {
    const s = this.w;
    return s.config.yaxis[t] && s.config.yaxis[t].reversed && e.reverse(), e;
  }
  yAxisAllSeriesCollapsed(t) {
    const e = this.w.globals;
    return !e.seriesYAxisMap[t].some((s) => e.collapsedSeriesIndices.indexOf(s) === -1);
  }
  // Method to translate annotation.yAxisIndex values from
  // seriesName-as-a-string values to seriesName-as-an-array values (old style
  // series mapping to new style).
  translateYAxisIndex(t) {
    const e = this.w, s = e.globals, i = e.config.yaxis;
    return e.seriesData.series.length > i.length || i.some((o) => Array.isArray(o.seriesName)) ? t : s.seriesYAxisReverseMap[t];
  }
  isYAxisHidden(t) {
    const e = this.w, s = e.config.yaxis[t];
    if (!s.show || this.yAxisAllSeriesCollapsed(t))
      return !0;
    if (!s.showForNullSeries) {
      const i = e.globals.seriesYAxisMap[t], a = new V(this.w);
      return i.every((o) => a.isSeriesNull(o));
    }
    return !1;
  }
  // get the label color for y-axis
  // realIndex is the actual series index, while i is the tick Index
  getYAxisForeColor(t, e) {
    var s;
    const i = this.w;
    return Array.isArray(t) && i.globals.yAxisScale[e] && ((s = this.theme) == null || s.pushExtraColors(
      t,
      i.globals.yAxisScale[e].result.length,
      !1
    )), t;
  }
  drawYAxisTicks(t, e, s, i, a, o, r) {
    const n = this.w, l = new P(this.w);
    let c = n.layout.translateY + n.config.yaxis[a].labels.offsetY;
    if (n.globals.isBarHorizontal ? c = 0 : n.config.chart.type === "heatmap" && (c += o / 2), i.show && e > 0) {
      n.config.yaxis[a].opposite === !0 && (t = t + i.width);
      for (let h = e; h >= 0; h--) {
        const d = l.drawLine(
          t + s.offsetX - i.width + i.offsetX,
          c + i.offsetY,
          t + s.offsetX + i.offsetX,
          c + i.offsetY,
          i.color
        );
        r.add(d), c += o;
      }
    }
  }
}
class wt {
  constructor(t, e, s) {
    this.w = t, this.ctx = e, this.elgrid = s, this.axesUtils = new at(t, { theme: e.theme, timeScale: e.timeScale }), this.xaxisLabels = t.labelData.labels.slice(), t.labelData.timescaleLabels.length > 0 && !t.globals.isBarHorizontal && (this.xaxisLabels = t.labelData.timescaleLabels.slice()), t.config.xaxis.overwriteCategories && (this.xaxisLabels = t.config.xaxis.overwriteCategories), this.drawnLabels = [], this.drawnLabelsRects = [], t.config.xaxis.position === "top" ? this.offY = 0 : this.offY = t.layout.gridHeight, this.offY = this.offY + t.config.xaxis.axisBorder.offsetY, this.isCategoryBarHorizontal = t.config.chart.type === "bar" && t.config.plotOptions.bar.horizontal, this.xaxisFontSize = t.config.xaxis.labels.style.fontSize, this.xaxisFontFamily = t.config.xaxis.labels.style.fontFamily, this.xaxisForeColors = t.config.xaxis.labels.style.colors, this.xaxisBorderWidth = t.config.xaxis.axisBorder.width, this.isCategoryBarHorizontal && (this.xaxisBorderWidth = t.config.yaxis[0].axisBorder.width.toString()), String(this.xaxisBorderWidth).indexOf("%") > -1 ? this.xaxisBorderWidth = t.layout.gridWidth * parseInt(this.xaxisBorderWidth, 10) / 100 : this.xaxisBorderWidth = parseInt(this.xaxisBorderWidth, 10), this.xaxisBorderHeight = t.config.xaxis.axisBorder.height, this.yaxis = t.config.yaxis[0];
  }
  drawXaxis() {
    const t = this.w, e = new P(this.w), s = e.group({
      class: "apexcharts-xaxis",
      transform: `translate(${t.config.xaxis.offsetX}, ${t.config.xaxis.offsetY})`
    }), i = e.group({
      class: "apexcharts-xaxis-texts-g",
      transform: `translate(${t.layout.translateXAxisX}, ${t.layout.translateXAxisY})`
    });
    s.add(i);
    let a = [];
    for (let o = 0; o < this.xaxisLabels.length; o++)
      a.push(this.xaxisLabels[o]);
    if (this.drawXAxisLabelAndGroup(
      !0,
      e,
      i,
      a,
      t.axisFlags.isXNumeric,
      (o, r) => r
    ), t.labelData.hasXaxisGroups) {
      const o = t.labelData.groups;
      a = [];
      for (let n = 0; n < o.length; n++)
        a.push(o[n].title);
      const r = {};
      t.config.xaxis.group.style && (r.xaxisFontSize = t.config.xaxis.group.style.fontSize, r.xaxisFontFamily = t.config.xaxis.group.style.fontFamily, r.xaxisForeColors = t.config.xaxis.group.style.colors, r.fontWeight = t.config.xaxis.group.style.fontWeight, r.cssClass = t.config.xaxis.group.style.cssClass), this.drawXAxisLabelAndGroup(
        !1,
        e,
        i,
        a,
        !1,
        (n, l) => o[n].cols * l,
        r
      );
    }
    if (t.config.xaxis.title.text !== void 0) {
      const o = e.group({
        class: "apexcharts-xaxis-title"
      }), r = e.drawText({
        x: t.layout.gridWidth / 2 + t.config.xaxis.title.offsetX,
        y: this.offY + parseFloat(this.xaxisFontSize) + (t.config.xaxis.position === "bottom" ? t.layout.xAxisLabelsHeight : -t.layout.xAxisLabelsHeight - 10) + t.config.xaxis.title.offsetY,
        text: t.config.xaxis.title.text,
        textAnchor: "middle",
        fontSize: t.config.xaxis.title.style.fontSize,
        fontFamily: t.config.xaxis.title.style.fontFamily,
        fontWeight: t.config.xaxis.title.style.fontWeight,
        foreColor: t.config.xaxis.title.style.color,
        cssClass: "apexcharts-xaxis-title-text " + t.config.xaxis.title.style.cssClass
      });
      o.add(r), s.add(o);
    }
    if (t.config.xaxis.axisBorder.show) {
      const o = t.globals.barPadForNumericAxis, r = e.drawLine(
        t.globals.padHorizontal + t.config.xaxis.axisBorder.offsetX - o,
        this.offY,
        this.xaxisBorderWidth + o,
        this.offY,
        t.config.xaxis.axisBorder.color,
        0,
        this.xaxisBorderHeight
      );
      this.elgrid && this.elgrid.elGridBorders && t.config.grid.show ? this.elgrid.elGridBorders.add(r) : s.add(r);
    }
    return s;
  }
  drawXAxisLabelAndGroup(t, e, s, i, a, o, r = {}) {
    const n = [], l = [], c = this.w, h = r.xaxisFontSize || this.xaxisFontSize, d = r.xaxisFontFamily || this.xaxisFontFamily, p = r.xaxisForeColors || this.xaxisForeColors, g = r.fontWeight || c.config.xaxis.labels.style.fontWeight, f = r.cssClass || c.config.xaxis.labels.style.cssClass;
    let x, m = c.globals.padHorizontal;
    const u = i.length;
    let y = c.config.xaxis.type === "category" ? c.globals.dataPoints : u;
    if (y === 0 && u > y && (y = u), a) {
      const b = Math.max(
        Number(c.config.xaxis.tickAmount) || 1,
        y > 1 ? y - 1 : y
      );
      x = c.layout.gridWidth / Math.min(b, u - 1), m = m + o(0, x) / 2 + c.config.xaxis.labels.offsetX;
    } else
      x = c.layout.gridWidth / y, m = m + o(0, x) + c.config.xaxis.labels.offsetX;
    for (let b = 0; b <= u - 1; b++) {
      let w = m - o(b, x) / 2 + c.config.xaxis.labels.offsetX;
      b === 0 && u === 1 && x / 2 === m && y === 1 && (w = c.layout.gridWidth / 2);
      let v = this.axesUtils.getLabel(
        i,
        c.labelData.timescaleLabels,
        w,
        b,
        n,
        h,
        t
      ), C = 28;
      c.layout.rotateXLabels && t && (C = 22), c.config.xaxis.title.text && c.config.xaxis.position === "top" && (C += parseFloat(c.config.xaxis.title.style.fontSize) + 2), t || (C = C + parseFloat(h) + (c.layout.xAxisLabelsHeight - c.layout.xAxisGroupLabelsHeight) + (c.layout.rotateXLabels ? 10 : 0)), typeof c.config.xaxis.tickAmount < "u" && c.config.xaxis.tickAmount !== "dataPoints" && c.config.xaxis.type !== "datetime" ? v = this.axesUtils.checkLabelBasedOnTickamount(b, v, u) : v = this.axesUtils.checkForOverflowingLabels(
        b,
        v,
        u,
        n,
        l
      );
      const S = () => t && c.config.xaxis.convertedCatToNumeric ? p[c.globals.minX + b - 1] : p[b];
      if (c.config.xaxis.labels.show) {
        const k = e.drawText({
          x: v.x,
          y: this.offY + c.config.xaxis.labels.offsetY + C - (c.config.xaxis.position === "top" ? c.layout.xAxisHeight + c.config.xaxis.axisTicks.height - 2 : 0),
          text: v.text,
          textAnchor: "middle",
          fontWeight: v.isBold ? 600 : g,
          fontSize: h,
          fontFamily: d,
          foreColor: Array.isArray(p) ? S() : p,
          isPlainText: !1,
          cssClass: (t ? "apexcharts-xaxis-label " : "apexcharts-xaxis-group-label ") + f
        });
        if (s.add(k), k.on("click", (F) => {
          if (typeof c.config.chart.events.xAxisLabelClick == "function") {
            const T = Object.assign({}, c, {
              labelIndex: b
            });
            c.config.chart.events.xAxisLabelClick(F, this.ctx, T);
          }
        }), t) {
          const F = N.createElementNS(
            G,
            "title"
          );
          F.textContent = Array.isArray(v.text) ? v.text.join(" ") : v.text, k.node.appendChild(F), v.text !== "" && (n.push(v.text), l.push(v));
        }
      }
      b < u - 1 && (m = m + o(b + 1, x));
    }
  }
  // this actually becomes the vertical axis (for bar charts)
  drawXaxisInversed(t) {
    const e = this.w, s = new P(this.w), i = e.config.yaxis[0].opposite ? e.globals.translateYAxisX[t] : 0, a = s.group({
      class: "apexcharts-yaxis apexcharts-xaxis-inversed",
      rel: t
    }), o = s.group({
      class: "apexcharts-yaxis-texts-g apexcharts-xaxis-inversed-texts-g",
      transform: "translate(" + i + ", 0)"
    });
    a.add(o);
    const r = [];
    if (e.config.yaxis[t].show)
      for (let g = 0; g < this.xaxisLabels.length; g++)
        r.push(this.xaxisLabels[g]);
    const n = e.layout.gridHeight / r.length;
    let l = -(n / 2.2);
    const c = e.formatters.yLabelFormatters[0], h = e.config.yaxis[0].labels;
    if (h.show)
      for (let g = 0; g <= r.length - 1; g++) {
        let f = typeof r[g] > "u" ? "" : r[g];
        f = c(f, {
          seriesIndex: t,
          dataPointIndex: g,
          w: e
        });
        const x = this.axesUtils.getYAxisForeColor(
          h.style.colors,
          t
        ), m = () => Array.isArray(x) ? x[g] : x;
        let u = 0;
        Array.isArray(f) && (u = f.length / 2 * parseInt(h.style.fontSize, 10));
        let y = h.offsetX - 15, b = "end";
        this.yaxis.opposite && (b = "start"), e.config.yaxis[0].labels.align === "left" ? (y = h.offsetX, b = "start") : e.config.yaxis[0].labels.align === "center" ? (y = h.offsetX, b = "middle") : e.config.yaxis[0].labels.align === "right" && (b = "end");
        const w = s.drawText({
          x: y,
          y: l + n + h.offsetY - u,
          text: f,
          textAnchor: b,
          foreColor: m(),
          fontSize: h.style.fontSize,
          fontFamily: h.style.fontFamily,
          fontWeight: h.style.fontWeight,
          isPlainText: !1,
          cssClass: "apexcharts-yaxis-label " + h.style.cssClass,
          maxWidth: h.maxWidth
        });
        o.add(w), w.on("click", (C) => {
          if (typeof e.config.chart.events.xAxisLabelClick == "function") {
            const D = Object.assign({}, e, {
              labelIndex: g
            });
            e.config.chart.events.xAxisLabelClick(C, this.ctx, D);
          }
        });
        const v = N.createElementNS(G, "title");
        if (v.textContent = Array.isArray(f) ? f.join(" ") : f, w.node.appendChild(v), e.config.yaxis[t].labels.rotate !== 0) {
          const C = s.rotateAroundCenter(w.node);
          w.node.setAttribute(
            "transform",
            `rotate(${e.config.yaxis[t].labels.rotate} 0 ${C.y})`
          );
        }
        l = l + n;
      }
    if (e.config.yaxis[0].title.text !== void 0) {
      const g = s.group({
        class: "apexcharts-yaxis-title apexcharts-xaxis-title-inversed",
        transform: "translate(" + i + ", 0)"
      }), f = s.drawText({
        x: e.config.yaxis[0].title.offsetX,
        y: e.layout.gridHeight / 2 + e.config.yaxis[0].title.offsetY,
        text: e.config.yaxis[0].title.text,
        textAnchor: "middle",
        foreColor: e.config.yaxis[0].title.style.color,
        fontSize: e.config.yaxis[0].title.style.fontSize,
        fontWeight: e.config.yaxis[0].title.style.fontWeight,
        fontFamily: e.config.yaxis[0].title.style.fontFamily,
        cssClass: "apexcharts-yaxis-title-text " + e.config.yaxis[0].title.style.cssClass
      });
      g.add(f), a.add(g);
    }
    let d = 0;
    this.isCategoryBarHorizontal && e.config.yaxis[0].opposite && (d = e.layout.gridWidth);
    const p = e.config.xaxis.axisBorder;
    if (p.show) {
      const g = s.drawLine(
        e.globals.padHorizontal + p.offsetX + d,
        1 + p.offsetY,
        e.globals.padHorizontal + p.offsetX + d,
        e.layout.gridHeight + p.offsetY,
        p.color,
        0
      );
      this.elgrid && this.elgrid.elGridBorders && e.config.grid.show ? this.elgrid.elGridBorders.add(g) : a.add(g);
    }
    return e.config.yaxis[0].axisTicks.show && this.axesUtils.drawYAxisTicks(
      d,
      r.length,
      e.config.yaxis[0].axisBorder,
      e.config.yaxis[0].axisTicks,
      0,
      n,
      a
    ), a;
  }
  drawXaxisTicks(t, e, s) {
    const i = this.w, a = t;
    if (t < 0 || t - 2 > i.layout.gridWidth)
      return;
    const o = this.offY + i.config.xaxis.axisTicks.offsetY;
    if (e = e + o + i.config.xaxis.axisTicks.height, i.config.xaxis.position === "top" && (e = o - i.config.xaxis.axisTicks.height), i.config.xaxis.axisTicks.show) {
      const n = new P(this.w).drawLine(
        t + i.config.xaxis.axisTicks.offsetX,
        o + i.config.xaxis.offsetY,
        a + i.config.xaxis.axisTicks.offsetX,
        e + i.config.xaxis.offsetY,
        i.config.xaxis.axisTicks.color
      );
      s.add(n), n.node.classList.add("apexcharts-xaxis-tick");
    }
  }
  getXAxisTicksPositions() {
    const t = this.w, e = [], s = this.xaxisLabels.length;
    let i = t.globals.padHorizontal;
    if (t.labelData.timescaleLabels.length > 0)
      for (let a = 0; a < s; a++)
        i = this.xaxisLabels[a].position, e.push(i);
    else {
      const a = s;
      for (let o = 0; o < a; o++) {
        let r = a;
        t.axisFlags.isXNumeric && t.config.chart.type !== "bar" && (r -= 1), i = i + t.layout.gridWidth / r, e.push(i);
      }
    }
    return e;
  }
  // to rotate x-axis labels or to put ... for longer text in xaxis
  xAxisLabelCorrections() {
    const t = this.w, e = new P(this.w), s = t.dom.baseEl.querySelector(".apexcharts-xaxis-texts-g"), i = t.dom.baseEl.querySelectorAll(
      ".apexcharts-xaxis-texts-g text:not(.apexcharts-xaxis-group-label)"
    ), a = t.dom.baseEl.querySelectorAll(
      ".apexcharts-yaxis-inversed text"
    ), o = t.dom.baseEl.querySelectorAll(
      ".apexcharts-xaxis-inversed-texts-g text tspan"
    );
    if (t.layout.rotateXLabels || t.config.xaxis.labels.rotateAlways)
      for (let r = 0; r < i.length; r++) {
        const n = e.rotateAroundCenter(i[r]);
        n.y = n.y - 1, n.x = n.x + 1, i[r].setAttribute(
          "transform",
          `rotate(${t.config.xaxis.labels.rotate} ${n.x} ${n.y})`
        ), i[r].setAttribute("text-anchor", "end"), s.setAttribute("transform", "translate(0, -10)");
        const l = i[r].childNodes;
        t.config.xaxis.labels.trim && Array.prototype.forEach.call(l, (c) => {
          e.placeTextWithEllipsis(
            c,
            c.textContent,
            t.layout.xAxisLabelsHeight - (t.config.legend.position === "bottom" ? 20 : 10)
          );
        });
      }
    else {
      const r = t.layout.gridWidth / (t.labelData.labels.length + 1);
      for (let n = 0; n < i.length; n++) {
        const l = i[n].childNodes;
        t.config.xaxis.labels.trim && t.config.xaxis.type !== "datetime" && Array.prototype.forEach.call(l, (c) => {
          e.placeTextWithEllipsis(c, c.textContent, r);
        });
      }
    }
    if (a.length > 0) {
      const r = a[a.length - 1].getBBox(), n = a[0].getBBox();
      r.x < -20 && a[a.length - 1].parentNode.removeChild(
        a[a.length - 1]
      ), n.x + n.width > t.layout.gridWidth && !t.globals.isBarHorizontal && a[0].parentNode.removeChild(a[0]);
      for (let l = 0; l < o.length; l++)
        e.placeTextWithEllipsis(
          o[l],
          o[l].textContent,
          t.config.yaxis[0].labels.maxWidth - (t.config.yaxis[0].title.text ? parseFloat(t.config.yaxis[0].title.style.fontSize) * 2 : 0) - 15
        );
    }
  }
  // renderXAxisBands() {
  //   let w = this.w;
  //   let plotBand = document.createElementNS(SVGNS, 'rect')
  //   w.dom.elGraphical.add(plotBand)
  // }
}
class fe {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.xaxisLabels = t.labelData.labels.slice(), this.axesUtils = new at(e.w, { theme: e.theme, timeScale: e.timeScale }), this.isRangeBar = t.rangeData.seriesRange.length && t.globals.isBarHorizontal, t.labelData.timescaleLabels.length > 0 && (this.xaxisLabels = t.labelData.timescaleLabels.slice());
  }
  drawGridArea(t = null) {
    const e = this.w, s = new P(this.w);
    t || (t = s.group({ class: "apexcharts-grid" }));
    const i = s.drawLine(
      e.globals.padHorizontal,
      1,
      e.globals.padHorizontal,
      e.layout.gridHeight,
      "transparent"
    ), a = s.drawLine(
      e.globals.padHorizontal,
      e.layout.gridHeight,
      e.layout.gridWidth,
      e.layout.gridHeight,
      "transparent"
    );
    return t.add(a), t.add(i), t;
  }
  drawGrid() {
    if (this.w.globals.axisCharts) {
      const e = this.renderGrid();
      return this.drawGridArea(e.el), e;
    }
    return null;
  }
  createGridMask() {
    const t = this.w, e = t.globals, s = new P(this.w), i = Array.isArray(t.config.stroke.width) ? Math.max(...t.config.stroke.width) : t.config.stroke.width, a = (h) => {
      const d = N.createElementNS(G, "clipPath");
      return d.setAttribute("id", h), d;
    };
    t.dom.elGridRectMask = a(`gridRectMask${e.cuid}`), t.dom.elGridRectBarMask = a(`gridRectBarMask${e.cuid}`), t.dom.elGridRectMarkerMask = a(`gridRectMarkerMask${e.cuid}`), t.dom.elForecastMask = a(`forecastMask${e.cuid}`), t.dom.elNonForecastMask = a(`nonForecastMask${e.cuid}`);
    const o = ["bar", "rangeBar", "candlestick", "boxPlot"].includes(
      t.config.chart.type
    ) || t.globals.comboBarCount > 0;
    let r = 0, n = 0;
    o && t.axisFlags.isXNumeric && !t.globals.isBarHorizontal && (r = Math.max(
      t.config.grid.padding.left,
      e.barPadForNumericAxis
    ), n = Math.max(
      t.config.grid.padding.right,
      e.barPadForNumericAxis
    )), t.dom.elGridRect = s.drawRect(
      -i / 2 - 2,
      -i / 2 - 2,
      t.layout.gridWidth + i + 4,
      t.layout.gridHeight + i + 4,
      0,
      "#fff"
    ), t.dom.elGridRectBar = s.drawRect(
      -i / 2 - r - 2,
      -i / 2 - 2,
      t.layout.gridWidth + i + n + r + 4,
      t.layout.gridHeight + i + 4,
      0,
      "#fff"
    );
    const l = t.globals.markers.largestSize;
    t.dom.elGridRectMarker = s.drawRect(
      Math.min(-i / 2 - r - 2, -l),
      -l,
      t.layout.gridWidth + Math.max(i + n + r + 4, l * 2),
      t.layout.gridHeight + l * 2,
      0,
      "#fff"
    ), t.dom.elGridRectMask.appendChild(t.dom.elGridRect.node), t.dom.elGridRectBarMask.appendChild(t.dom.elGridRectBar.node), t.dom.elGridRectMarkerMask.appendChild(t.dom.elGridRectMarker.node);
    const c = t.dom.elDefs.node;
    c.appendChild(t.dom.elGridRectMask), c.appendChild(t.dom.elGridRectBarMask), c.appendChild(t.dom.elGridRectMarkerMask), c.appendChild(t.dom.elForecastMask), c.appendChild(t.dom.elNonForecastMask);
  }
  _drawGridLines({ i: t, x1: e, y1: s, x2: i, y2: a, xCount: o, parent: r }) {
    const n = this.w;
    if ((() => !(t === 0 && n.globals.skipFirstTimelinelabel || t === o - 1 && n.globals.skipLastTimelinelabel && !n.config.xaxis.labels.formatter || n.config.chart.type === "radar"))()) {
      n.config.grid.xaxis.lines.show && this._drawGridLine({ i: t, x1: e, y1: s, x2: i, y2: a, xCount: o, parent: r });
      let c = 0;
      if (n.labelData.hasXaxisGroups && n.config.xaxis.tickPlacement === "between") {
        const d = n.labelData.groups;
        if (d) {
          let p = 0;
          for (let g = 0; p < t && g < d.length; g++)
            p += d[g].cols;
          p === t && (c = n.layout.xAxisLabelsHeight * 0.6);
        }
      }
      new wt(this.w, this.ctx).drawXaxisTicks(e, c, n.dom.elGraphical);
    }
  }
  _drawGridLine({ i: t, x1: e, y1: s, x2: i, y2: a, xCount: o, parent: r }) {
    const n = this.w, l = r.node.classList.contains(
      "apexcharts-gridlines-horizontal"
    ), c = n.globals.barPadForNumericAxis, h = s === 0 && a === 0 || e === 0 && i === 0 || s === n.layout.gridHeight && a === n.layout.gridHeight || n.globals.isBarHorizontal && (t === 0 || t === o - 1), p = new P(this.w).drawLine(
      e - (l ? c : 0),
      s,
      i + (l ? c : 0),
      a,
      n.config.grid.borderColor,
      n.config.grid.strokeDashArray
    );
    p.node.classList.add("apexcharts-gridline"), h && n.config.grid.show ? this.elGridBorders.add(p) : r.add(p);
  }
  _drawGridBandRect({ c: t, x1: e, y1: s, x2: i, y2: a, type: o }) {
    const r = this.w, n = new P(this.w), l = r.globals.barPadForNumericAxis, c = r.config.grid[o].colors[t], h = n.drawRect(
      e - (o === "row" ? l : 0),
      s,
      i + (o === "row" ? l * 2 : 0),
      a,
      0,
      c,
      r.config.grid[o].opacity
    );
    this.elg.add(h), h.attr("clip-path", `url(#gridRectMask${r.globals.cuid})`), h.node.classList.add(`apexcharts-grid-${o}`);
  }
  _drawXYLines({ xCount: t, tickAmount: e }) {
    const s = this.w, i = ({ xC: o, x1: r, y1: n, x2: l, y2: c }) => {
      for (let h = 0; h < o; h++)
        r = this.xaxisLabels[h].position, l = this.xaxisLabels[h].position, this._drawGridLines({
          i: h,
          x1: r,
          y1: n,
          x2: l,
          y2: c,
          xCount: t,
          parent: this.elgridLinesV
        });
    }, a = ({ xC: o, x1: r, y1: n, x2: l, y2: c }) => {
      for (let h = 0; h < o + (s.axisFlags.isXNumeric ? 0 : 1); h++)
        h === 0 && o === 1 && s.globals.dataPoints === 1 && (r = s.layout.gridWidth / 2, l = r), this._drawGridLines({
          i: h,
          x1: r,
          y1: n,
          x2: l,
          y2: c,
          xCount: t,
          parent: this.elgridLinesV
        }), r += s.layout.gridWidth / (s.axisFlags.isXNumeric ? o - 1 : o), l = r;
    };
    if (s.config.grid.xaxis.lines.show || s.config.xaxis.axisTicks.show) {
      const o = s.globals.padHorizontal, r = 0;
      let n;
      const l = s.layout.gridHeight;
      s.labelData.timescaleLabels.length ? i({ xC: t, x1: o, y1: r, x2: n, y2: l }) : (s.axisFlags.isXNumeric && (t = s.globals.xAxisScale.result.length), a({ xC: t, x1: o, y1: r, x2: n, y2: l }));
    }
    if (s.config.grid.yaxis.lines.show) {
      let r = 0, n = 0;
      const l = s.layout.gridWidth;
      let c = e + 1;
      this.isRangeBar && (c = s.labelData.labels.length);
      for (let h = 0; h < c + (this.isRangeBar ? 1 : 0); h++)
        this._drawGridLine({
          i: h,
          xCount: c + (this.isRangeBar ? 1 : 0),
          x1: 0,
          y1: r,
          x2: l,
          y2: n,
          parent: this.elgridLinesH
        }), r += s.layout.gridHeight / (this.isRangeBar ? c : e), n = r;
    }
  }
  _drawInvertedXYLines({ xCount: t }) {
    const e = this.w;
    if (e.config.grid.xaxis.lines.show || e.config.xaxis.axisTicks.show) {
      let s = e.globals.padHorizontal;
      const i = 0;
      let a;
      const o = e.layout.gridHeight;
      for (let r = 0; r < t + 1; r++)
        e.config.grid.xaxis.lines.show && this._drawGridLine({
          i: r,
          xCount: t + 1,
          x1: s,
          y1: i,
          x2: a,
          y2: o,
          parent: this.elgridLinesV
        }), new wt(this.w, this.ctx).drawXaxisTicks(s, 0, e.dom.elGraphical), s += e.layout.gridWidth / t, a = s;
    }
    if (e.config.grid.yaxis.lines.show) {
      let i = 0, a = 0;
      const o = e.layout.gridWidth;
      for (let r = 0; r < e.globals.dataPoints + 1; r++)
        this._drawGridLine({
          i: r,
          xCount: e.globals.dataPoints + 1,
          x1: 0,
          y1: i,
          x2: o,
          y2: a,
          parent: this.elgridLinesH
        }), i += e.layout.gridHeight / e.globals.dataPoints, a = i;
    }
  }
  renderGrid() {
    var t, e, s;
    const i = this.w, a = i.globals, o = new P(this.w);
    this.elg = o.group({ class: "apexcharts-grid" }), this.elgridLinesH = o.group({
      class: "apexcharts-gridlines-horizontal"
    }), this.elgridLinesV = o.group({
      class: "apexcharts-gridlines-vertical"
    }), this.elGridBorders = o.group({ class: "apexcharts-grid-borders" }), this.elg.add(this.elgridLinesH), this.elg.add(this.elgridLinesV), i.config.grid.show || (this.elgridLinesV.hide(), this.elgridLinesH.hide(), this.elGridBorders.hide());
    let r = 0;
    for (; r < a.seriesYAxisMap.length && a.ignoreYAxisIndexes.includes(r); )
      r++;
    r === a.seriesYAxisMap.length && (r = 0);
    let n = a.yAxisScale[r].result.length - 1, l;
    return !a.isBarHorizontal || this.isRangeBar ? (l = this.xaxisLabels.length, this.isRangeBar && (n = i.labelData.labels.length, i.config.xaxis.tickAmount && i.config.xaxis.labels.formatter && (l = i.config.xaxis.tickAmount), ((s = (e = (t = a.yAxisScale) == null ? void 0 : t[r]) == null ? void 0 : e.result) == null ? void 0 : s.length) > 0 && i.config.xaxis.type !== "datetime" && (l = a.yAxisScale[r].result.length - 1)), this._drawXYLines({ xCount: l, tickAmount: n })) : (l = n, n = a.xTickAmount, this._drawInvertedXYLines({ xCount: l, tickAmount: n })), this.drawGridBands(l, n), {
      el: this.elg,
      elGridBorders: this.elGridBorders,
      xAxisTickWidth: i.layout.gridWidth / l
    };
  }
  drawGridBands(t, e) {
    var s, i, a;
    const o = this.w, r = (n, l, c, h, d, p) => {
      for (let g = 0, f = 0; g < l; g++, f++)
        f >= o.config.grid[n].colors.length && (f = 0), this._drawGridBandRect({ c: f, x1: c, y1: h, x2: d, y2: p, type: n }), h += o.layout.gridHeight / e;
    };
    if (((s = o.config.grid.row.colors) == null ? void 0 : s.length) > 0 && r(
      "row",
      e,
      0,
      0,
      o.layout.gridWidth,
      o.layout.gridHeight / e
    ), ((i = o.config.grid.column.colors) == null ? void 0 : i.length) > 0) {
      let n = !o.globals.isBarHorizontal && o.config.xaxis.tickPlacement === "on" && (o.config.xaxis.type === "category" || o.config.xaxis.convertedCatToNumeric) ? t - 1 : t;
      o.axisFlags.isXNumeric && (n = o.globals.xAxisScale.result.length - 1);
      let l = o.globals.padHorizontal;
      const c = 0;
      let h = o.globals.padHorizontal + o.layout.gridWidth / n;
      const d = o.layout.gridHeight;
      for (let p = 0, g = 0; p < t; p++, g++)
        g >= o.config.grid.column.colors.length && (g = 0), o.config.xaxis.type === "datetime" && (l = this.xaxisLabels[p].position, h = (((a = this.xaxisLabels[p + 1]) == null ? void 0 : a.position) || o.layout.gridWidth) - this.xaxisLabels[p].position), this._drawGridBandRect({ c: g, x1: l, y1: c, x2: h, y2: d, type: "column" }), l += o.layout.gridWidth / n;
    }
  }
}
class pe {
  constructor(t) {
    this.w = t, this.coreUtils = new V(this.w);
  }
  // http://stackoverflow.com/questions/326679/choosing-an-attractive-linear-scale-for-a-graphs-y-axis
  // This routine creates the Y axis values for a graph.
  niceScale(t, e, s = 0) {
    const a = this.w, o = a.globals;
    let r, n, l, c;
    o.isBarHorizontal ? (r = a.config.xaxis, n = Math.max((o.svgWidth - 100) / 25, 2)) : (r = a.config.yaxis[s], n = Math.max((o.svgHeight - 100) / 15, 2)), L.isNumber(n) || (n = 10), l = r.min !== void 0 && r.min !== null, c = r.max !== void 0 && r.min !== null;
    let h = r.stepSize !== void 0 && r.stepSize !== null, d = r.tickAmount !== void 0 && r.tickAmount !== null, p = d ? r.tickAmount : Rt[Math.min(
      Math.round(n / 2),
      Rt.length - 1
    )];
    if (o.isMultipleYAxis && !d && o.multiAxisTickAmount > 0 && (p = o.multiAxisTickAmount, d = !0), p === "dataPoints" ? p = o.dataPoints - 1 : p = Math.abs(Math.round(p)), (t === Number.MIN_VALUE && e === 0 || !L.isNumber(t) && !L.isNumber(e) || t === Number.MIN_VALUE && e === -Number.MAX_VALUE) && (t = L.isNumber(r.min) ? r.min : 0, e = L.isNumber(r.max) ? r.max : t + p, o.allSeriesCollapsed = !1), t > e) {
      console.warn(
        "axis.min cannot be greater than axis.max: swapping min and max"
      );
      const T = e;
      e = t, t = T;
    } else
      t === e && (t = t === 0 ? 0 : t - 1, e = e === 0 ? 2 : e + 1);
    const g = [];
    p < 1 && (p = 1);
    let f = p, x = Math.abs(e - t);
    const m = 0.15;
    !l && t > 0 && t / x < m && (t = 0, l = !0), !c && e < 0 && -e / x < m && (e = 0, c = !0), x = Math.abs(e - t);
    let u = x / f, y = u;
    const b = Math.floor(Math.log10(y)), w = Math.pow(10, b);
    let v = Math.ceil(y / w);
    if (v = he[o.yValueDecimal === 0 ? 0 : 1][v], y = v * w, u = y, o.isBarHorizontal && r.stepSize && r.type !== "datetime" ? (u = r.stepSize, h = !0) : h && (u = r.stepSize), h && r.forceNiceScale) {
      const T = Math.floor(Math.log10(u));
      u *= Math.pow(10, b - T);
    }
    if (l && c) {
      let T = x / f;
      if (d)
        if (h)
          if (L.mod(x, u) != 0) {
            const M = L.getGCD(u, T);
            T / M < 10 ? u = M : u = T;
          } else
            L.mod(u, T) == 0 ? u = T : (T = u, d = !1);
        else
          u = T;
      else if (h)
        L.mod(x, u) == 0 ? T = u : u = T;
      else if (L.mod(x, u) == 0)
        T = u;
      else {
        f = Math.ceil(x / u), T = x / f;
        const M = L.getGCD(x, u);
        x / M < n && (T = M), u = T;
      }
      f = Math.round(x / u);
    } else {
      if (!l && !c)
        if (o.isMultipleYAxis && d) {
          const T = u * Math.floor(t / u);
          let M = T + u * f;
          M < e && (u *= 2), t = T, M = e, e = t + u * f, x = Math.abs(e - t), t > 0 && t < Math.abs(M - e) && (t = 0, e = u * f), e < 0 && -e < Math.abs(T - t) && (e = 0, t = -u * f);
        } else
          t = u * Math.floor(t / u), e = u * Math.ceil(e / u);
      else if (c)
        if (d)
          t = e - u * f;
        else {
          const T = t;
          t = u * Math.floor(t / u), Math.abs(e - t) / L.getGCD(x, u) > n && (t = e - u * p, t += u * Math.floor((T - t) / u));
        }
      else if (l)
        if (d)
          e = t + u * f;
        else {
          const T = e;
          e = u * Math.ceil(e / u), Math.abs(e - t) / L.getGCD(x, u) > n && (e = t + u * p, e += u * Math.ceil((T - e) / u));
        }
      x = Math.abs(e - t), u = L.getGCD(x, u), f = Math.round(x / u);
    }
    if (!d && !(l || c) && (f = Math.ceil((x - 1e-11) / (u + 1e-11)), f > 16 && L.getPrimeFactors(f).length < 2 && f++), !d && r.forceNiceScale && o.yValueDecimal === 0 && f > x && (f = x, u = Math.round(x / f)), f > n && (!(d || h) || r.forceNiceScale)) {
      const T = L.getPrimeFactors(f), M = T.length - 1;
      let E = f;
      t:
        for (var C = 0; C < M; C++)
          for (var D = 0; D <= M - C; D++) {
            const X = Math.min(D + C, M);
            let R = E, Y = 1;
            for (var S = D; S <= X; S++)
              Y *= T[S];
            if (R /= Y, R < n) {
              E = R;
              break t;
            }
          }
      E === f ? u = x : u = x / E, f = Math.round(x / u);
    }
    o.isMultipleYAxis && o.multiAxisTickAmount == 0 && o.ignoreYAxisIndexes.indexOf(s) < 0 && (o.multiAxisTickAmount = f);
    let k = t - u;
    const F = u * 1e-11;
    do
      k += u, g.push(L.stripNumber(k, 7));
    while (e - k > F);
    return {
      result: g,
      niceMin: g[0],
      niceMax: g[g.length - 1]
    };
  }
  linearScale(t, e, s = 10, i = 0, a = void 0) {
    const o = Math.abs(e - t);
    let r = [];
    if (t === e)
      return r = [t], {
        result: r,
        niceMin: r[0],
        niceMax: r[r.length - 1]
      };
    s = this._adjustTicksForSmallRange(s, i, o), s === "dataPoints" && (s = this.w.globals.dataPoints - 1), a || (a = o / s);
    const n = 2;
    if (a !== 0 && isFinite(a)) {
      const c = Math.floor(Math.log10(Math.abs(a))), h = Math.max(n, -c + n), d = Math.pow(10, h);
      a = Math.round((a + Number.EPSILON) * d) / d;
    }
    s === Number.MAX_VALUE && (s = 5, a = 1);
    let l = t;
    for (; s >= 0; )
      r.push(l), l = L.preciseAddition(l, a), s -= 1;
    return {
      result: r,
      niceMin: r[0],
      niceMax: r[r.length - 1]
    };
  }
  logarithmicScaleNice(t, e, s) {
    e <= 0 && (e = Math.max(t, s)), t <= 0 && (t = Math.min(e, s));
    const i = [], a = Math.ceil(Math.log(e) / Math.log(s) + 1), o = Math.floor(Math.log(t) / Math.log(s));
    for (let r = o; r < a; r++)
      i.push(Math.pow(s, r));
    return {
      result: i,
      niceMin: i[0],
      niceMax: i[i.length - 1]
    };
  }
  logarithmicScale(t, e, s) {
    e <= 0 && (e = Math.max(t, s)), t <= 0 && (t = Math.min(e, s));
    const i = [], a = Math.log(e) / Math.log(s), o = Math.log(t) / Math.log(s), r = a - o, n = Math.round(r), l = r / n;
    for (let c = 0, h = o; c < n; c++, h += l)
      i.push(Math.pow(s, h));
    return i.push(Math.pow(s, a)), {
      result: i,
      niceMin: t,
      niceMax: e
    };
  }
  _adjustTicksForSmallRange(t, e, s) {
    let i = t;
    if (typeof e < "u" && this.w.config.yaxis[e].labels.formatter && this.w.config.yaxis[e].tickAmount === void 0) {
      const a = Number(
        this.w.config.yaxis[e].labels.formatter(1)
      );
      L.isNumber(a) && this.w.globals.yValueDecimal === 0 && (i = Math.ceil(s));
    }
    return i < t ? i : t;
  }
  setYScaleForIndex(t, e, s) {
    const i = this.w.globals, a = this.w.config, o = i.isBarHorizontal ? a.xaxis : a.yaxis[t];
    typeof i.yAxisScale[t] > "u" && (i.yAxisScale[t] = []);
    const r = Math.abs(s - e);
    o.logarithmic && r <= 5 && (i.invalidLogScale = !0), o.logarithmic && r > 5 ? (i.allSeriesCollapsed = !1, i.yAxisScale[t] = o.forceNiceScale ? this.logarithmicScaleNice(e, s, o.logBase) : this.logarithmicScale(e, s, o.logBase)) : s === -Number.MAX_VALUE || !L.isNumber(s) || e === Number.MAX_VALUE || !L.isNumber(e) ? i.yAxisScale[t] = this.niceScale(Number.MIN_VALUE, 0, t) : (i.allSeriesCollapsed = !1, i.yAxisScale[t] = this.niceScale(e, s, t));
  }
  setXScale(t, e) {
    const s = this.w, i = s.globals;
    if (e === -Number.MAX_VALUE || !L.isNumber(e))
      i.xAxisScale = this.linearScale(0, 10, 10);
    else {
      const a = i.xTickAmount;
      i.xAxisScale = this.linearScale(
        t,
        e,
        a,
        0,
        s.config.xaxis.max === void 0 ? s.config.xaxis.stepSize : void 0
      );
    }
    return i.xAxisScale;
  }
  scaleMultipleYAxes() {
    const t = this.w.config, e = this.w.globals;
    this.coreUtils.setSeriesYAxisMappings();
    const s = e.seriesYAxisMap, i = e.minYArr, a = e.maxYArr;
    e.allSeriesCollapsed = !0, e.barGroups = [], s.forEach((o, r) => {
      const n = [];
      if (o.forEach((l) => {
        var c;
        const h = (c = t.series[l]) == null ? void 0 : c.group;
        n.indexOf(h) < 0 && n.push(h);
      }), o.length > 0) {
        let l = Number.MAX_VALUE, c = -Number.MAX_VALUE, h = l, d = c, p, g;
        if (t.chart.stacked) {
          const f = new Array(e.dataPoints).fill(0), x = [], m = [], u = [];
          n.forEach(() => {
            x.push(f.map(() => Number.MIN_VALUE)), m.push(f.map(() => Number.MIN_VALUE)), u.push(f.map(() => Number.MIN_VALUE));
          });
          for (let y = 0; y < o.length; y++) {
            !p && t.series[o[y]].type && (p = t.series[o[y]].type);
            const b = o[y];
            t.series[b].group ? g = t.series[b].group : g = "axis-".concat(r), !(e.collapsedSeriesIndices.indexOf(b) < 0 && e.ancillaryCollapsedSeriesIndices.indexOf(b) < 0) || (e.allSeriesCollapsed = !1, n.forEach((v, C) => {
              if (t.series[b].group === v)
                for (let D = 0; D < this.w.seriesData.series[b].length; D++) {
                  const S = this.w.seriesData.series[b][D];
                  S >= 0 ? m[C][D] += S : u[C][D] += S, x[C][D] += S, h = Math.min(h, S), d = Math.max(d, S);
                }
            })), (p === "bar" || p === "column") && e.barGroups.push(g);
          }
          p || (p = t.chart.type), p === "bar" || p === "column" ? n.forEach((y, b) => {
            l = Math.min(l, Math.min.apply(null, u[b])), c = Math.max(c, Math.max.apply(null, m[b]));
          }) : (n.forEach((y, b) => {
            h = Math.min(h, Math.min.apply(null, x[b])), d = Math.max(
              d,
              Math.max.apply(null, x[b])
            );
          }), l = h, c = d), l === Number.MIN_VALUE && c === Number.MIN_VALUE && (c = -Number.MAX_VALUE);
        } else
          for (let f = 0; f < o.length; f++) {
            const x = o[f];
            l = Math.min(l, i[x]), c = Math.max(c, a[x]), !(e.collapsedSeriesIndices.indexOf(x) < 0 && e.ancillaryCollapsedSeriesIndices.indexOf(x) < 0) || (e.allSeriesCollapsed = !1);
          }
        t.yaxis[r].min !== void 0 && (typeof t.yaxis[r].min == "function" ? l = t.yaxis[r].min(l) : l = t.yaxis[r].min), t.yaxis[r].max !== void 0 && (typeof t.yaxis[r].max == "function" ? c = t.yaxis[r].max(c) : c = t.yaxis[r].max), e.barGroups = e.barGroups.filter((f, x, m) => m.indexOf(f) === x), this.setYScaleForIndex(r, l, c), o.forEach((f) => {
          i[f] = e.yAxisScale[r].niceMin, a[f] = e.yAxisScale[r].niceMax;
        });
      } else
        this.setYScaleForIndex(r, 0, -Number.MAX_VALUE);
    });
  }
}
class It {
  constructor(t) {
    this.w = t, this.scales = new pe(this.w);
  }
  init() {
    this.setYRange(), this.setXRange(), this.setZRange();
  }
  getMinYMaxY(t, e = Number.MAX_VALUE, s = -Number.MAX_VALUE, i = null) {
    var a, o, r, n, l;
    const c = this.w.config, h = this.w.globals;
    let d = -Number.MAX_VALUE, p = Number.MIN_VALUE;
    i === null && (i = t + 1);
    const g = this.w.seriesData.series;
    let f = g, x = g;
    c.chart.type === "candlestick" ? (f = this.w.candleData.seriesCandleL, x = this.w.candleData.seriesCandleH) : c.chart.type === "boxPlot" ? (f = this.w.candleData.seriesCandleO, x = this.w.candleData.seriesCandleC) : this.w.axisFlags.isRangeData && (f = this.w.rangeData.seriesRangeStart, x = this.w.rangeData.seriesRangeEnd);
    let m = !1;
    if (this.w.seriesData.seriesX.length >= i) {
      const u = (a = h.brushSource) == null ? void 0 : a.w.config.chart.brush;
      (c.chart.zoom.enabled && c.chart.zoom.autoScaleYaxis || u != null && u.enabled && (u != null && u.autoScaleYaxis)) && (m = !0);
    }
    for (let u = t; u < i; u++) {
      h.dataPoints = Math.max(h.dataPoints, g[u].length);
      const y = c.series[u].type;
      this.w.labelData.categoryLabels.length && (h.dataPoints = this.w.labelData.categoryLabels.filter(
        (v) => typeof v < "u"
      ).length), this.w.labelData.labels.length && c.xaxis.type !== "datetime" && this.w.seriesData.series.reduce((v, C) => v + C.length, 0) !== 0 && (h.dataPoints = Math.max(h.dataPoints, this.w.labelData.labels.length));
      let b = 0, w = g[u].length - 1;
      if (m) {
        if (c.xaxis.min)
          for (; b < w && this.w.seriesData.seriesX[u][b] < c.xaxis.min; b++)
            ;
        if (c.xaxis.max)
          for (; w > b && this.w.seriesData.seriesX[u][w] > c.xaxis.max; w--)
            ;
      }
      for (let v = b; v <= w && v < this.w.seriesData.series[u].length; v++) {
        let C = g[u][v];
        if (C !== null && L.isNumber(C)) {
          switch (typeof ((o = x[u]) == null ? void 0 : o[v]) < "u" && (d = Math.max(d, x[u][v]), e = Math.min(e, x[u][v])), typeof ((r = f[u]) == null ? void 0 : r[v]) < "u" && (e = Math.min(e, f[u][v]), s = Math.max(s, f[u][v])), y) {
            case "candlestick":
              typeof this.w.candleData.seriesCandleC[u][v] < "u" && (d = Math.max(d, this.w.candleData.seriesCandleH[u][v]), e = Math.min(e, this.w.candleData.seriesCandleL[u][v]));
              break;
            case "boxPlot":
              typeof this.w.candleData.seriesCandleC[u][v] < "u" && (d = Math.max(d, this.w.candleData.seriesCandleC[u][v]), e = Math.min(e, this.w.candleData.seriesCandleO[u][v]));
              break;
          }
          y && y !== "candlestick" && y !== "boxPlot" && y !== "rangeArea" && y !== "rangeBar" && (d = Math.max(d, this.w.seriesData.series[u][v]), e = Math.min(e, this.w.seriesData.series[u][v])), this.w.seriesData.seriesGoals[u] && this.w.seriesData.seriesGoals[u][v] && Array.isArray(this.w.seriesData.seriesGoals[u][v]) && this.w.seriesData.seriesGoals[u][v].forEach((D) => {
            d = Math.max(d, D.value), e = Math.min(e, D.value);
          }), s = d, C = L.noExponents(C), L.isFloat(C) && (h.yValueDecimal = Math.max(
            h.yValueDecimal,
            C.toString().split(".")[1].length
          )), p > ((n = f[u]) == null ? void 0 : n[v]) && ((l = f[u]) == null ? void 0 : l[v]) < 0 && (p = f[u][v]);
        } else
          h.hasNullValues = !0;
      }
      (y === "bar" || y === "column") && (p < 0 && d < 0 && (d = 0, s = Math.max(s, 0)), p === Number.MIN_VALUE && (p = 0, e = Math.min(e, 0)));
    }
    return c.chart.type === "rangeBar" && this.w.rangeData.seriesRangeStart.length && h.isBarHorizontal && (p = e), c.chart.type === "bar" && (p < 0 && d < 0 && (d = 0), p === Number.MIN_VALUE && (p = 0)), {
      minY: p,
      maxY: d,
      lowestY: e,
      highestY: s
    };
  }
  setYRange() {
    const t = this.w.globals, e = this.w.config;
    t.maxY = -Number.MAX_VALUE, t.minY = Number.MIN_VALUE;
    let s = Number.MAX_VALUE, i;
    if (t.isMultipleYAxis) {
      s = Number.MAX_VALUE;
      for (let a = 0; a < this.w.seriesData.series.length; a++)
        i = this.getMinYMaxY(a), t.minYArr[a] = i.lowestY, t.maxYArr[a] = i.highestY, s = Math.min(s, i.lowestY);
    }
    return i = this.getMinYMaxY(0, s, null, this.w.seriesData.series.length), e.chart.type === "bar" ? (t.minY = i.minY, t.maxY = i.maxY) : (t.minY = i.lowestY, t.maxY = i.highestY), s = i.lowestY, e.chart.stacked && this._setStackedMinMax(), e.chart.type === "line" || e.chart.type === "area" || e.chart.type === "scatter" || e.chart.type === "candlestick" || e.chart.type === "boxPlot" || e.chart.type === "rangeBar" && !t.isBarHorizontal ? t.minY === Number.MIN_VALUE && s !== -Number.MAX_VALUE && s !== t.maxY && (t.minY = s) : t.minY = t.minY !== Number.MIN_VALUE ? Math.min(i.minY, t.minY) : i.minY, e.yaxis.forEach((a, o) => {
      a.max !== void 0 && (typeof a.max == "number" ? t.maxYArr[o] = a.max : typeof a.max == "function" && (t.maxYArr[o] = a.max(
        t.isMultipleYAxis ? t.maxYArr[o] : t.maxY
      )), t.maxY = t.maxYArr[o]), a.min !== void 0 && (typeof a.min == "number" ? t.minYArr[o] = a.min : typeof a.min == "function" && (t.minYArr[o] = a.min(
        t.isMultipleYAxis ? t.minYArr[o] === Number.MIN_VALUE ? 0 : t.minYArr[o] : t.minY
      )), t.minY = t.minYArr[o]);
    }), t.isBarHorizontal && ["min", "max"].forEach((o) => {
      e.xaxis[o] !== void 0 && typeof e.xaxis[o] == "number" && (o === "min" ? t.minY = e.xaxis[o] : t.maxY = e.xaxis[o]);
    }), t.isMultipleYAxis ? (this.scales.scaleMultipleYAxes(), t.minY = s) : (this.scales.setYScaleForIndex(0, t.minY, t.maxY), t.minY = t.yAxisScale[0].niceMin, t.maxY = t.yAxisScale[0].niceMax, t.minYArr[0] = t.minY, t.maxYArr[0] = t.maxY), t.barGroups = [], t.lineGroups = [], t.areaGroups = [], e.series.forEach((a) => {
      switch (a.type || e.chart.type) {
        case "bar":
        case "column":
          t.barGroups.push(a.group);
          break;
        case "line":
          t.lineGroups.push(a.group);
          break;
        case "area":
          t.areaGroups.push(a.group);
          break;
      }
    }), t.barGroups = t.barGroups.filter((a, o, r) => r.indexOf(a) === o), t.lineGroups = t.lineGroups.filter((a, o, r) => r.indexOf(a) === o), t.areaGroups = t.areaGroups.filter((a, o, r) => r.indexOf(a) === o), {
      minY: t.minY,
      maxY: t.maxY,
      minYArr: t.minYArr,
      maxYArr: t.maxYArr,
      yAxisScale: t.yAxisScale
    };
  }
  setXRange() {
    const t = this.w.globals, e = this.w.config, s = e.xaxis.type === "numeric" || e.xaxis.type === "datetime" || e.xaxis.type === "category" && !this.w.axisFlags.noLabelsProvided || this.w.axisFlags.noLabelsProvided || this.w.axisFlags.isXNumeric, i = () => {
      for (let a = 0; a < this.w.seriesData.series.length; a++)
        if (this.w.labelData.labels[a])
          for (let o = 0; o < this.w.labelData.labels[a].length; o++)
            this.w.labelData.labels[a][o] !== null && L.isNumber(this.w.labelData.labels[a][o]) && (t.maxX = Math.max(t.maxX, this.w.labelData.labels[a][o]), t.initialMaxX = Math.max(t.maxX, this.w.labelData.labels[a][o]), t.minX = Math.min(t.minX, this.w.labelData.labels[a][o]), t.initialMinX = Math.min(t.minX, this.w.labelData.labels[a][o]));
    };
    if (this.w.axisFlags.isXNumeric && i(), this.w.axisFlags.noLabelsProvided && e.xaxis.categories.length === 0 && (t.maxX = this.w.labelData.labels[this.w.labelData.labels.length - 1], t.initialMaxX = this.w.labelData.labels[this.w.labelData.labels.length - 1], t.minX = 1, t.initialMinX = 1), this.w.axisFlags.isXNumeric || this.w.axisFlags.noLabelsProvided || this.w.axisFlags.dataFormatXNumeric) {
      let a = 10;
      if (e.xaxis.tickAmount === void 0)
        a = Math.round(t.svgWidth / 150), e.xaxis.type === "numeric" && t.dataPoints < 30 && (a = t.dataPoints - 1), a > t.dataPoints && t.dataPoints !== 0 && (a = t.dataPoints - 1);
      else if (e.xaxis.tickAmount === "dataPoints") {
        if (this.w.seriesData.series.length > 1 && (a = this.w.seriesData.series[t.maxValsInArrayIndex].length - 1), this.w.axisFlags.isXNumeric) {
          const o = Math.round(t.maxX - t.minX);
          o < 30 && (a = o);
        }
      } else
        a = e.xaxis.tickAmount;
      if (t.xTickAmount = a, e.xaxis.max !== void 0 && typeof e.xaxis.max == "number" && (t.maxX = e.xaxis.max), e.xaxis.min !== void 0 && typeof e.xaxis.min == "number" && (t.minX = e.xaxis.min), e.xaxis.range !== void 0 && (t.minX = t.maxX - e.xaxis.range), t.minX !== Number.MAX_VALUE && t.maxX !== -Number.MAX_VALUE)
        if (e.xaxis.convertedCatToNumeric && !this.w.axisFlags.dataFormatXNumeric) {
          const o = [];
          for (let r = t.minX - 1; r < t.maxX; r++)
            o.push(r + 1);
          t.xAxisScale = {
            result: o,
            niceMin: o[0],
            niceMax: o[o.length - 1]
          };
        } else
          t.xAxisScale = this.scales.setXScale(t.minX, t.maxX);
      else
        t.xAxisScale = this.scales.linearScale(
          0,
          a,
          a,
          0,
          e.xaxis.stepSize
        ), this.w.axisFlags.noLabelsProvided && this.w.labelData.labels.length > 0 && (t.xAxisScale = this.scales.linearScale(
          1,
          this.w.labelData.labels.length,
          a - 1,
          0,
          e.xaxis.stepSize
        ), this.w.seriesData.seriesX = this.w.labelData.labels.slice());
      s && (this.w.labelData.labels = t.xAxisScale.result.slice());
    }
    return t.isBarHorizontal && this.w.labelData.labels.length && (t.xTickAmount = this.w.labelData.labels.length), this._handleSingleDataPoint(), this._getMinXDiff(), {
      minX: t.minX,
      maxX: t.maxX
    };
  }
  setZRange() {
    const t = this.w.globals;
    if (this.w.axisFlags.isDataXYZ) {
      for (let e = 0; e < this.w.seriesData.series.length; e++)
        if (typeof this.w.seriesData.seriesZ[e] < "u")
          for (let s = 0; s < this.w.seriesData.seriesZ[e].length; s++)
            this.w.seriesData.seriesZ[e][s] !== null && L.isNumber(this.w.seriesData.seriesZ[e][s]) && (t.maxZ = Math.max(t.maxZ, this.w.seriesData.seriesZ[e][s]), t.minZ = Math.min(t.minZ, this.w.seriesData.seriesZ[e][s]));
    }
  }
  _handleSingleDataPoint() {
    const t = this.w.globals, e = this.w.config;
    if (t.minX === t.maxX) {
      const s = new q(this.w);
      if (e.xaxis.type === "datetime") {
        const i = s.getDate(t.minX);
        e.xaxis.labels.datetimeUTC ? i.setUTCDate(i.getUTCDate() - 2) : i.setDate(i.getDate() - 2), t.minX = new Date(i).getTime();
        const a = s.getDate(t.maxX);
        e.xaxis.labels.datetimeUTC ? a.setUTCDate(a.getUTCDate() + 2) : a.setDate(a.getDate() + 2), t.maxX = new Date(a).getTime();
      } else
        (e.xaxis.type === "numeric" || e.xaxis.type === "category" && !this.w.axisFlags.noLabelsProvided) && (t.minX = t.minX - 2, t.initialMinX = t.minX, t.maxX = t.maxX + 2, t.initialMaxX = t.maxX);
    }
  }
  _getMinXDiff() {
    const t = this.w.globals;
    this.w.axisFlags.isXNumeric && this.w.seriesData.seriesX.forEach((e) => {
      if (e.length) {
        e.length === 1 && e.push(
          this.w.seriesData.seriesX[t.maxValsInArrayIndex][this.w.seriesData.seriesX[t.maxValsInArrayIndex].length - 1]
        );
        const s = e.slice();
        s.sort((i, a) => i - a), s.forEach((i, a) => {
          if (a > 0) {
            const o = i - s[a - 1];
            o > 0 && (t.minXDiff = Math.min(o, t.minXDiff));
          }
        }), (t.dataPoints === 1 || t.minXDiff === Number.MAX_VALUE) && (t.minXDiff = 0.5);
      }
    });
  }
  _setStackedMinMax() {
    const t = this.w.globals;
    if (!this.w.seriesData.series.length)
      return;
    let e = this.w.labelData.seriesGroups;
    e.length || (e = [this.w.seriesData.seriesNames.map((a) => a)]);
    const s = {}, i = {};
    e.forEach((a) => {
      s[a] = [], i[a] = [], this.w.config.series.map(
        (r, n) => a.indexOf(this.w.seriesData.seriesNames[n]) > -1 ? n : null
      ).filter((r) => r !== null).forEach((r) => {
        var n, l, c, h;
        for (let d = 0; d < this.w.seriesData.series[t.maxValsInArrayIndex].length; d++)
          typeof s[a][d] > "u" && (s[a][d] = 0, i[a][d] = 0), (this.w.config.chart.stacked && !t.comboCharts || this.w.config.chart.stacked && t.comboCharts && (!this.w.config.chart.stackOnlyBar || ((l = (n = this.w.config.series) == null ? void 0 : n[r]) == null ? void 0 : l.type) === "bar" || ((h = (c = this.w.config.series) == null ? void 0 : c[r]) == null ? void 0 : h.type) === "column")) && this.w.seriesData.series[r][d] !== null && L.isNumber(this.w.seriesData.series[r][d]) && (this.w.seriesData.series[r][d] > 0 ? s[a][d] += parseFloat(this.w.seriesData.series[r][d]) + 1e-4 : i[a][d] += parseFloat(this.w.seriesData.series[r][d]));
      });
    }), Object.entries(s).forEach(([a]) => {
      s[a].forEach((o, r) => {
        t.maxY = Math.max(t.maxY, s[a][r]), t.minY = Math.min(t.minY, i[a][r]);
      });
    });
  }
}
function Yt() {
  return {
    palette1: ["#008FFB", "#00E396", "#FEB019", "#FF4560", "#775DD0"],
    palette2: ["#3F51B5", "#03A9F4", "#4CAF50", "#F9CE1D", "#FF9800"],
    palette3: ["#33B2DF", "#546E7A", "#D4526E", "#13D8AA", "#A5978B"],
    palette4: ["#4ECDC4", "#C7F464", "#81D4FA", "#FD6A6A", "#546E7A"],
    palette5: ["#2B908F", "#F9A3A4", "#90EE7E", "#FA4443", "#69D2E7"],
    palette6: ["#449DD1", "#F86624", "#EA3546", "#662E9B", "#C5D86D"],
    palette7: ["#D7263D", "#1B998B", "#2E294E", "#F46036", "#E2C044"],
    palette8: ["#662E9B", "#F86624", "#F9C80E", "#EA3546", "#43BCCD"],
    palette9: ["#5C4742", "#A5978B", "#8D5B4C", "#5A2A27", "#C4BBAF"],
    palette10: ["#A300D6", "#7D02EB", "#5653FE", "#2983FF", "#00B1F2"],
    // CVD-safe palettes (Wong 2011 / IBM design)
    cvdDeuteranopia: ["#0072B2", "#E69F00", "#56B4E9", "#009E73", "#F0E442", "#D55E00", "#CC79A7"],
    cvdProtanopia: ["#0077BB", "#EE7733", "#009988", "#EE3377", "#BBBBBB", "#33BBEE", "#CC3311"],
    cvdTritanopia: ["#CC3311", "#009988", "#EE7733", "#0077BB", "#EE3377", "#BBBBBB", "#33BBEE"],
    highContrast: ["#005A9C", "#C00000", "#007A33", "#6C3483", "#7B3F00", "#0097A7", "#4A235A"]
  };
}
class _t {
  constructor(t, { theme: e = null, timeScale: s = null } = {}, i) {
    this.w = t, this.elgrid = i, this.xaxisFontSize = t.config.xaxis.labels.style.fontSize, this.axisFontFamily = t.config.xaxis.labels.style.fontFamily, this.xaxisForeColors = t.config.xaxis.labels.style.colors, this.isCategoryBarHorizontal = t.config.chart.type === "bar" && t.config.plotOptions.bar.horizontal, this.xAxisoffX = t.config.xaxis.position === "bottom" ? t.layout.gridHeight : 0, this.drawnLabels = [], this.axesUtils = new at(t, { theme: e, timeScale: s });
  }
  drawYaxis(t) {
    const e = this.w, s = new P(this.w), i = e.config.yaxis[t].labels.style, {
      fontSize: a,
      fontFamily: o,
      fontWeight: r
    } = i, n = s.group({
      class: "apexcharts-yaxis",
      rel: t,
      transform: `translate(${e.globals.translateYAxisX[t]}, 0)`
    });
    if (this.axesUtils.isYAxisHidden(t))
      return n;
    const l = s.group({ class: "apexcharts-yaxis-texts-g" });
    n.add(l);
    const c = e.globals.yAxisScale[t].result.length - 1, h = e.layout.gridHeight / c, d = e.formatters.yLabelFormatters[t], p = this.axesUtils.checkForReversedLabels(
      t,
      e.globals.yAxisScale[t].result.slice()
    );
    if (e.config.yaxis[t].labels.show) {
      let g = e.layout.translateY + e.config.yaxis[t].labels.offsetY;
      e.globals.isBarHorizontal ? g = 0 : e.config.chart.type === "heatmap" && (g -= h / 2), g += parseInt(a, 10) / 3;
      let f = null;
      for (let x = c; x >= 0; x--) {
        const m = d(p[x], x, e);
        let u = e.config.yaxis[t].labels.padding;
        e.config.yaxis[t].opposite && e.config.yaxis.length !== 0 && (u *= -1);
        const y = this.getTextAnchor(
          e.config.yaxis[t].labels.align,
          e.config.yaxis[t].opposite
        ), b = this.axesUtils.getYAxisForeColor(
          i.colors,
          t
        ), w = Array.isArray(b) ? b[x] : b, v = Array.from(
          e.dom.baseEl.querySelectorAll(
            `.apexcharts-yaxis[rel='${t}'] .apexcharts-yaxis-label tspan`
          )
        ).map((D) => D.textContent), C = s.drawText({
          x: u,
          y: g,
          text: v.includes(m) && !e.config.yaxis[t].labels.showDuplicates ? "" : m,
          textAnchor: y,
          fontSize: a,
          fontFamily: o,
          fontWeight: r,
          maxWidth: e.config.yaxis[t].labels.maxWidth,
          foreColor: w,
          isPlainText: !1,
          cssClass: `apexcharts-yaxis-label ${i.cssClass}`
        });
        l.add(C), this.addTooltip(C, m), f === null && (f = C), e.config.yaxis[t].labels.rotate !== 0 && this.rotateLabel(
          s,
          C,
          f,
          e.config.yaxis[t].labels.rotate
        ), g += h;
      }
    }
    return this.addYAxisTitle(s, n, t), this.addAxisBorder(s, n, t, c, h), n;
  }
  getTextAnchor(t, e) {
    return t === "left" ? "start" : t === "center" ? "middle" : t === "right" ? "end" : e ? "start" : "end";
  }
  addTooltip(t, e) {
    const s = N.createElementNS(
      G,
      "title"
    );
    s.textContent = Array.isArray(e) ? e.join(" ") : e, t.node.appendChild(s);
  }
  rotateLabel(t, e, s, i) {
    const a = t.rotateAroundCenter(s.node), o = t.rotateAroundCenter(e.node);
    e.node.setAttribute(
      "transform",
      `rotate(${i} ${a.x} ${o.y})`
    );
  }
  addYAxisTitle(t, e, s) {
    const i = this.w;
    if (i.config.yaxis[s].title.text !== void 0) {
      const a = t.group({ class: "apexcharts-yaxis-title" }), o = i.config.yaxis[s].opposite ? i.globals.translateYAxisX[s] : 0, r = t.drawText({
        x: o,
        y: i.layout.gridHeight / 2 + i.layout.translateY + i.config.yaxis[s].title.offsetY,
        text: i.config.yaxis[s].title.text,
        textAnchor: "end",
        foreColor: i.config.yaxis[s].title.style.color,
        fontSize: i.config.yaxis[s].title.style.fontSize,
        fontWeight: i.config.yaxis[s].title.style.fontWeight,
        fontFamily: i.config.yaxis[s].title.style.fontFamily,
        cssClass: `apexcharts-yaxis-title-text ${i.config.yaxis[s].title.style.cssClass}`
      });
      a.add(r), e.add(a);
    }
  }
  addAxisBorder(t, e, s, i, a) {
    const o = this.w, r = o.config.yaxis[s].axisBorder;
    let n = 31 + r.offsetX;
    if (o.config.yaxis[s].opposite && (n = -31 - r.offsetX), r.show) {
      const l = t.drawLine(
        n,
        o.layout.translateY + r.offsetY - 2,
        n,
        o.layout.gridHeight + o.layout.translateY + r.offsetY + 2,
        r.color,
        0,
        r.width
      );
      e.add(l);
    }
    o.config.yaxis[s].axisTicks.show && this.axesUtils.drawYAxisTicks(
      n,
      i,
      r,
      o.config.yaxis[s].axisTicks,
      s,
      a,
      e
    );
  }
  drawYaxisInversed(t) {
    const e = this.w, s = new P(this.w), i = s.group({
      class: "apexcharts-xaxis apexcharts-yaxis-inversed"
    }), a = s.group({
      class: "apexcharts-xaxis-texts-g",
      transform: `translate(${e.layout.translateXAxisX}, ${e.layout.translateXAxisY})`
    });
    i.add(a);
    let o = e.globals.yAxisScale[t].result.length - 1;
    const r = e.layout.gridWidth / o + 0.1;
    let n = r + e.config.xaxis.labels.offsetX;
    const l = e.formatters.xLabelFormatter;
    let c = this.axesUtils.checkForReversedLabels(
      t,
      e.globals.yAxisScale[t].result.slice()
    );
    const h = e.labelData.timescaleLabels;
    if (h.length > 0 && (this.xaxisLabels = h.slice(), c = h.slice(), o = c.length), e.config.xaxis.labels.show)
      for (let d = h.length ? 0 : o; h.length ? d < h.length : d >= 0; h.length ? d++ : d--) {
        let p = l(c[d], d, e), g = e.layout.gridWidth + e.globals.padHorizontal - (n - r + e.config.xaxis.labels.offsetX);
        if (h.length) {
          const x = this.axesUtils.getLabel(
            c,
            h,
            g,
            d,
            this.drawnLabels,
            this.xaxisFontSize
          );
          g = x.x, p = x.text, this.drawnLabels.push(x.text), d === 0 && e.globals.skipFirstTimelinelabel && (p = ""), d === c.length - 1 && e.globals.skipLastTimelinelabel && (p = "");
        }
        const f = s.drawText({
          x: g,
          y: this.xAxisoffX + e.config.xaxis.labels.offsetY + 30 - (e.config.xaxis.position === "top" ? e.layout.xAxisHeight + e.config.xaxis.axisTicks.height - 2 : 0),
          text: p,
          textAnchor: "middle",
          foreColor: Array.isArray(this.xaxisForeColors) ? this.xaxisForeColors[t] : this.xaxisForeColors,
          fontSize: this.xaxisFontSize,
          fontFamily: this.xaxisFontFamily,
          fontWeight: e.config.xaxis.labels.style.fontWeight,
          isPlainText: !1,
          cssClass: `apexcharts-xaxis-label ${e.config.xaxis.labels.style.cssClass}`
        });
        a.add(f), this.addTooltip(f, p), n += r;
      }
    return this.inversedYAxisTitleText(i), this.inversedYAxisBorder(i), i;
  }
  inversedYAxisBorder(t) {
    const e = this.w, s = new P(this.w), i = e.config.xaxis.axisBorder;
    if (i.show) {
      let a = 0;
      e.config.chart.type === "bar" && e.axisFlags.isXNumeric && (a -= 15);
      const o = s.drawLine(
        e.globals.padHorizontal + a + i.offsetX,
        this.xAxisoffX,
        e.layout.gridWidth,
        this.xAxisoffX,
        i.color,
        0,
        i.height
      );
      this.elgrid && this.elgrid.elGridBorders && e.config.grid.show ? this.elgrid.elGridBorders.add(o) : t.add(o);
    }
  }
  inversedYAxisTitleText(t) {
    const e = this.w, s = new P(this.w);
    if (e.config.xaxis.title.text !== void 0) {
      const i = s.group({
        class: "apexcharts-xaxis-title apexcharts-yaxis-title-inversed"
      }), a = s.drawText({
        x: e.layout.gridWidth / 2 + e.config.xaxis.title.offsetX,
        y: this.xAxisoffX + parseFloat(this.xaxisFontSize) + parseFloat(e.config.xaxis.title.style.fontSize) + e.config.xaxis.title.offsetY + 20,
        text: e.config.xaxis.title.text,
        textAnchor: "middle",
        fontSize: e.config.xaxis.title.style.fontSize,
        fontFamily: e.config.xaxis.title.style.fontFamily,
        fontWeight: e.config.xaxis.title.style.fontWeight,
        foreColor: e.config.xaxis.title.style.color,
        cssClass: `apexcharts-xaxis-title-text ${e.config.xaxis.title.style.cssClass}`
      });
      i.add(a), t.add(i);
    }
  }
  yAxisTitleRotate(t, e) {
    const s = this.w, i = new P(this.w), a = s.dom.baseEl.querySelector(
      `.apexcharts-yaxis[rel='${t}'] .apexcharts-yaxis-texts-g`
    ), o = a ? a.getBoundingClientRect() : { width: 0, height: 0 }, r = s.dom.baseEl.querySelector(
      `.apexcharts-yaxis[rel='${t}'] .apexcharts-yaxis-title text`
    ), n = r ? r.getBoundingClientRect() : { width: 0, height: 0 };
    if (r) {
      const l = this.xPaddingForYAxisTitle(
        t,
        o,
        n,
        e
      );
      r.setAttribute("x", l.xPos - (e ? 10 : 0));
      const c = i.rotateAroundCenter(r);
      r.setAttribute(
        "transform",
        `rotate(${e ? s.config.yaxis[t].title.rotate * -1 : s.config.yaxis[t].title.rotate} ${c.x} ${c.y})`
      );
    }
  }
  xPaddingForYAxisTitle(t, e, s, i) {
    const a = this.w;
    let o = 0, r = 10;
    return a.config.yaxis[t].title.text === void 0 || t < 0 ? { xPos: o, padd: 0 } : (i ? o = e.width + a.config.yaxis[t].title.offsetX + s.width / 2 + r / 2 : (o = e.width * -1 + a.config.yaxis[t].title.offsetX + r / 2 + s.width / 2, a.globals.isBarHorizontal && (r = 25, o = e.width * -1 - a.config.yaxis[t].title.offsetX - r)), { xPos: o, padd: r });
  }
  setYAxisXPosition(t, e) {
    const s = this.w;
    let i = 0, a = 0, o = 18, r = 1;
    s.config.yaxis.length > 1 && (this.multipleYs = !0), s.config.yaxis.forEach((n, l) => {
      const c = s.globals.ignoreYAxisIndexes.includes(l) || !n.show || n.floating || t[l].width === 0, h = t[l].width + e[l].width;
      n.opposite ? s.globals.isBarHorizontal ? (a = s.layout.gridWidth + s.layout.translateX - 1, s.globals.translateYAxisX[l] = a - n.labels.offsetX) : (a = s.layout.gridWidth + s.layout.translateX + r, c || (r += h + 20), s.globals.translateYAxisX[l] = a - n.labels.offsetX + 20) : (i = s.layout.translateX - o, c || (o += h + 20), s.globals.translateYAxisX[l] = i + n.labels.offsetX);
    });
  }
  setYAxisTextAlignments() {
    const t = this.w;
    Array.from(
      t.dom.baseEl.getElementsByClassName("apexcharts-yaxis")
    ).forEach((s, i) => {
      const a = t.config.yaxis[i];
      if (a && !a.floating && a.labels.align !== void 0) {
        const o = t.dom.baseEl.querySelector(
          `.apexcharts-yaxis[rel='${i}'] .apexcharts-yaxis-texts-g`
        ), r = Array.from(
          t.dom.baseEl.querySelectorAll(
            `.apexcharts-yaxis[rel='${i}'] .apexcharts-yaxis-label`
          )
        ), n = o.getBoundingClientRect();
        r.forEach((l) => {
          l.setAttribute("text-anchor", a.labels.align);
        }), a.labels.align === "left" && !a.opposite ? o.setAttribute("transform", `translate(-${n.width}, 0)`) : a.labels.align === "center" ? o.setAttribute(
          "transform",
          `translate(${n.width / 2 * (a.opposite ? 1 : -1)}, 0)`
        ) : a.labels.align === "right" && a.opposite && o.setAttribute("transform", `translate(${n.width}, 0)`);
      }
    });
  }
}
class ze {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.documentEvent = this.documentEvent.bind(this);
  }
  addEventListener(t, e) {
    const s = this.w;
    Object.prototype.hasOwnProperty.call(s.globals.events, t) ? s.globals.events[t].push(e) : s.globals.events[t] = [e];
  }
  removeEventListener(t, e) {
    const s = this.w;
    if (!Object.prototype.hasOwnProperty.call(s.globals.events, t))
      return;
    const i = s.globals.events[t].indexOf(e);
    i !== -1 && s.globals.events[t].splice(i, 1);
  }
  fireEvent(t, e) {
    const s = this.w;
    if (!Object.prototype.hasOwnProperty.call(s.globals.events, t))
      return;
    (!e || !e.length) && (e = []);
    const i = s.globals.events[t], a = i.length;
    for (let o = 0; o < a; o++)
      i[o].apply(null, e);
  }
  setupEventHandlers() {
    const t = this.w, e = this.ctx, s = t.dom.baseEl.querySelector(t.globals.chartClass);
    this.ctx.eventList.forEach((i) => {
      s.addEventListener(
        i,
        (a) => {
          const o = a.target.getAttribute("i") === null && t.interact.capturedSeriesIndex !== -1 ? t.interact.capturedSeriesIndex : a.target.getAttribute("i"), r = a.target.getAttribute("j") === null && t.interact.capturedDataPointIndex !== -1 ? t.interact.capturedDataPointIndex : a.target.getAttribute("j"), n = Object.assign({}, t, {
            seriesIndex: t.globals.axisCharts ? o : 0,
            dataPointIndex: r
          });
          a.type === "keydown" ? t.config.chart.accessibility.enabled && t.config.chart.accessibility.keyboard.enabled && (e.ctx.keyboardNavigation && e.ctx.keyboardNavigation.handleKey(a), typeof t.config.chart.events.keyDown == "function" && t.config.chart.events.keyDown(a, e, n), e.ctx.events.fireEvent("keydown", [a, e, n])) : a.type === "keyup" ? t.config.chart.accessibility.enabled && t.config.chart.accessibility.keyboard.enabled && (typeof t.config.chart.events.keyUp == "function" && t.config.chart.events.keyUp(a, e, n), e.ctx.events.fireEvent("keyup", [a, e, n])) : a.type === "mousemove" || a.type === "touchmove" ? typeof t.config.chart.events.mouseMove == "function" && t.config.chart.events.mouseMove(a, e, n) : a.type === "mouseleave" || a.type === "touchleave" ? typeof t.config.chart.events.mouseLeave == "function" && t.config.chart.events.mouseLeave(a, e, n) : (a.type === "mouseup" && a.which === 1 || a.type === "touchend") && (typeof t.config.chart.events.click == "function" && t.config.chart.events.click(a, e, n), e.ctx.events.fireEvent("click", [a, e, n]));
        },
        { capture: !1, passive: !0 }
      );
    }), this.ctx.eventList.forEach((i) => {
      t.dom.baseEl.addEventListener(i, this.documentEvent, {
        passive: !0
      });
    }), this.ctx.core.setupBrushHandler();
  }
  documentEvent(t) {
    const e = this.w, s = t.target.className;
    if (t.type === "click") {
      const i = e.dom.baseEl.querySelector(".apexcharts-menu");
      i && i.classList.contains("apexcharts-menu-open") && s !== "apexcharts-menu-icon" && i.classList.remove("apexcharts-menu-open");
    }
    e.interact.clientX = t.type === "touchmove" ? t.touches[0].clientX : t.clientX, e.interact.clientY = t.type === "touchmove" ? t.touches[0].clientY : t.clientY;
  }
}
class He {
  constructor(t) {
    this.w = t;
  }
  setCurrentLocaleValues(t) {
    let e = this.w.config.chart.locales;
    const s = B.getApex();
    s.chart && s.chart.locales && s.chart.locales.length > 0 && (e = this.w.config.chart.locales.concat(s.chart.locales));
    const i = e.filter((a) => a.name === t)[0];
    if (i) {
      const a = L.extend(le, i);
      this.w.globals.locale = a.options;
    } else
      throw new Error(
        "Wrong locale name provided. Please make sure you set the correct locale name in options"
      );
  }
}
class Oe {
  constructor(t, e) {
    this.w = t, this.ctx = e;
  }
  drawAxis(t, e) {
    const s = this.w.globals, i = this.w.config, a = new wt(this.w, this.ctx, e), o = new _t(this.w, { theme: this.ctx.theme, timeScale: this.ctx.timeScale }, e);
    if (s.axisCharts && t !== "radar") {
      let r, n;
      s.isBarHorizontal ? (n = o.drawYaxisInversed(0), r = a.drawXaxisInversed(0), this.w.dom.elGraphical.add(r), this.w.dom.elGraphical.add(n)) : (r = a.drawXaxis(), this.w.dom.elGraphical.add(r), i.yaxis.map((l, c) => {
        if (s.ignoreYAxisIndexes.indexOf(c) === -1 && (n = o.drawYaxis(c), this.w.dom.Paper.add(n), this.w.config.grid.position === "back")) {
          const h = this.w.dom.Paper.children()[1];
          h && (h.remove(), this.w.dom.Paper.add(h));
        }
      }));
    }
  }
}
class Bt {
  constructor(t) {
    this.w = t;
  }
  drawXCrosshairs() {
    const t = this.w, e = new P(this.w), s = new Z(this.w), i = t.config.xaxis.crosshairs.fill.gradient, a = t.config.xaxis.crosshairs.dropShadow, o = t.config.xaxis.crosshairs.fill.type, r = i.colorFrom, n = i.colorTo, l = i.opacityFrom, c = i.opacityTo, h = i.stops, d = "none", p = a.enabled, g = a.left, f = a.top, x = a.blur, m = a.color, u = a.opacity;
    let y = t.config.xaxis.crosshairs.fill.color;
    if (t.config.xaxis.crosshairs.show) {
      o === "gradient" && (y = e.drawGradient(
        "vertical",
        r,
        n,
        l,
        c,
        null,
        h,
        null
      ));
      let b = e.drawRect();
      t.config.xaxis.crosshairs.width === 1 && (b = e.drawLine());
      let w = t.layout.gridHeight;
      (!L.isNumber(w) || w < 0) && (w = 0);
      let v = t.config.xaxis.crosshairs.width;
      (!L.isNumber(v) || v < 0) && (v = 0), b.attr({
        class: "apexcharts-xcrosshairs",
        x: 0,
        y: 0,
        y2: w,
        width: v,
        height: w,
        fill: y,
        filter: d,
        "fill-opacity": t.config.xaxis.crosshairs.opacity,
        stroke: t.config.xaxis.crosshairs.stroke.color,
        "stroke-width": t.config.xaxis.crosshairs.stroke.width,
        "stroke-dasharray": t.config.xaxis.crosshairs.stroke.dashArray
      }), p && (b = s.dropShadow(b, {
        left: g,
        top: f,
        blur: x,
        color: m,
        opacity: u
      })), t.dom.elGraphical.add(b);
    }
  }
  drawYCrosshairs() {
    const t = this.w, e = new P(this.w), s = t.config.yaxis[0].crosshairs, i = t.globals.barPadForNumericAxis;
    if (t.config.yaxis[0].crosshairs.show) {
      const o = e.drawLine(
        -i,
        0,
        t.layout.gridWidth + i,
        0,
        s.stroke.color,
        s.stroke.dashArray,
        s.stroke.width
      );
      o.attr({
        class: "apexcharts-ycrosshairs"
      }), t.dom.elGraphical.add(o);
    }
    const a = e.drawLine(
      -i,
      0,
      t.layout.gridWidth + i,
      0,
      s.stroke.color,
      0,
      0
    );
    a.attr({
      class: "apexcharts-ycrosshairs-hidden"
    }), t.dom.elGraphical.add(a);
  }
}
class _e {
  constructor(t) {
    this.w = t;
  }
  // the opts parameter if not null has to be set overriding everything
  // as the opts is set by user externally
  checkResponsiveConfig(t) {
    const e = this.w, s = e.config;
    if (s.responsive.length === 0)
      return;
    const i = s.responsive.slice();
    i.sort(
      (r, n) => r.breakpoint > n.breakpoint ? 1 : n.breakpoint > r.breakpoint ? -1 : 0
    ).reverse();
    const a = new yt({}), o = (r = {}) => {
      const n = i[0].breakpoint, l = B.isBrowser() ? window.innerWidth > 0 ? window.innerWidth : screen.width : 0;
      if (l > n) {
        const c = L.clone(e.globals.initialConfig);
        c.series = L.clone(e.config.series);
        const h = V.extendArrayProps(
          a,
          c,
          e
        );
        r = L.extend(h, r), r = L.extend(e.config, r), this.overrideResponsiveOptions(r);
      } else
        for (let c = 0; c < i.length; c++)
          l < i[c].breakpoint && (r = V.extendArrayProps(a, i[c].options, e), r = L.extend(e.config, r), this.overrideResponsiveOptions(r));
    };
    if (t) {
      let r = V.extendArrayProps(a, t, e);
      r = L.extend(e.config, r), r = L.extend(r, t), o(r);
    } else
      o({});
  }
  overrideResponsiveOptions(t) {
    const e = new yt(t).init({ responsiveOverride: !0 });
    this.w.config = e;
  }
}
class U {
  constructor(t, { toggleDataSeries: e, revertDefaultAxisMinMax: s, updateSeries: i } = {}) {
    this.w = t, this._toggleDataSeries = e || null, this._revertDefaultAxisMinMax = s || null, this._updateSeries = i || null, this.legendInactiveClass = "legend-mouseover-inactive";
  }
  clearSeriesCache() {
    const t = this.w;
    t.globals.cachedSelectors && (delete t.globals.cachedSelectors.allSeriesEls, delete t.globals.cachedSelectors.highlightSeriesEls);
  }
  getAllSeriesEls() {
    const t = this.w, e = "allSeriesEls";
    return t.globals.cachedSelectors[e] || (t.globals.cachedSelectors[e] = t.dom.baseEl.getElementsByClassName("apexcharts-series")), t.globals.cachedSelectors[e];
  }
  getSeriesByName(t) {
    return this.w.dom.baseEl.querySelector(
      `.apexcharts-inner .apexcharts-series[seriesName='${L.escapeString(
        t
      )}']`
    );
  }
  isSeriesHidden(t) {
    const e = this.getSeriesByName(t), s = parseInt(e.getAttribute("data:realIndex"), 10);
    return { isHidden: e.classList.contains(
      "apexcharts-series-collapsed"
    ), realIndex: s };
  }
  addCollapsedClassToSeries(t, e) {
    U.addCollapsedClassToSeries(this.w, t, e);
  }
  static addCollapsedClassToSeries(t, e, s) {
    function i(a) {
      for (let o = 0; o < a.length; o++)
        a[o].index === s && e.node.classList.add("apexcharts-series-collapsed");
    }
    i(t.globals.collapsedSeries), i(t.globals.ancillaryCollapsedSeries);
  }
  toggleSeries(t) {
    var e;
    const s = this.isSeriesHidden(t);
    return (e = this._toggleDataSeries) == null || e.call(this, s.realIndex, s.isHidden), s.isHidden;
  }
  showSeries(t) {
    var e;
    const s = this.isSeriesHidden(t);
    s.isHidden && ((e = this._toggleDataSeries) == null || e.call(this, s.realIndex, !0));
  }
  hideSeries(t) {
    var e;
    const s = this.isSeriesHidden(t);
    s.isHidden || (e = this._toggleDataSeries) == null || e.call(this, s.realIndex, !1);
  }
  resetSeries(t = !0, e = !0, s = !0) {
    var i, a;
    const o = this.w;
    this.clearSeriesCache();
    let r = L.clone(o.globals.initialSeries);
    o.globals.previousPaths = [], s ? (o.globals.collapsedSeries = [], o.globals.ancillaryCollapsedSeries = [], o.globals.collapsedSeriesIndices = [], o.globals.ancillaryCollapsedSeriesIndices = []) : r = this.emptyCollapsedSeries(r), o.config.series = r, t && (e && (o.interact.zoomed = !1, (i = this._revertDefaultAxisMinMax) == null || i.call(this)), (a = this._updateSeries) == null || a.call(
      this,
      r,
      o.config.chart.animations.dynamicAnimation.enabled
    ));
  }
  emptyCollapsedSeries(t) {
    const e = this.w;
    for (let s = 0; s < t.length; s++)
      e.globals.collapsedSeriesIndices.indexOf(s) > -1 && (t[s].data = []);
    return t;
  }
  highlightSeries(t) {
    const e = this.w, s = this.getSeriesByName(t), i = parseInt(s == null ? void 0 : s.getAttribute("data:realIndex"), 10), a = "highlightSeriesEls";
    let o = e.globals.cachedSelectors[a];
    o || (o = e.dom.baseEl.querySelectorAll(
      ".apexcharts-series, .apexcharts-datalabels, .apexcharts-yaxis"
    ), e.globals.cachedSelectors[a] = o);
    let r = null, n = null, l = null;
    if (e.globals.axisCharts || e.config.chart.type === "radialBar")
      if (e.globals.axisCharts) {
        r = e.dom.baseEl.querySelector(
          `.apexcharts-series[data\\:realIndex='${i}']`
        ), n = e.dom.baseEl.querySelector(
          `.apexcharts-datalabels[data\\:realIndex='${i}']`
        );
        const c = e.globals.seriesYAxisReverseMap[i];
        l = e.dom.baseEl.querySelector(
          `.apexcharts-yaxis[rel='${c}']`
        );
      } else
        r = e.dom.baseEl.querySelector(
          `.apexcharts-series[rel='${i + 1}']`
        );
    else
      r = e.dom.baseEl.querySelector(
        `.apexcharts-series[rel='${i + 1}'] path`
      );
    for (let c = 0; c < o.length; c++)
      o[c].classList.add(this.legendInactiveClass);
    if (r)
      e.globals.axisCharts || r.parentNode.classList.remove(this.legendInactiveClass), r.classList.remove(this.legendInactiveClass), n !== null && n.classList.remove(this.legendInactiveClass), l !== null && l.classList.remove(this.legendInactiveClass);
    else
      for (let c = 0; c < o.length; c++)
        o[c].classList.remove(this.legendInactiveClass);
  }
  toggleSeriesOnHover(t, e) {
    const s = this.w;
    e || (e = t.target);
    const i = s.dom.baseEl.querySelectorAll(
      ".apexcharts-series, .apexcharts-datalabels, .apexcharts-yaxis"
    );
    if (t.type === "mousemove") {
      const a = parseInt(e.getAttribute("rel"), 10) - 1;
      this.highlightSeries(s.seriesData.seriesNames[a]);
    } else if (t.type === "mouseout")
      for (let a = 0; a < i.length; a++)
        i[a].classList.remove(this.legendInactiveClass);
  }
  highlightRangeInSeries(t, e) {
    const s = this.w, i = s.dom.baseEl.getElementsByClassName(
      "apexcharts-heatmap-rect"
    ), a = (r) => {
      for (let n = 0; n < i.length; n++)
        i[n].classList[r](this.legendInactiveClass);
    }, o = (r, n) => {
      for (let l = 0; l < i.length; l++) {
        const c = Number(i[l].getAttribute("val"));
        c >= r.from && (c < r.to || r.to === n && c === n) && i[l].classList.remove(this.legendInactiveClass);
      }
    };
    if (t.type === "mousemove") {
      const r = parseInt(e.getAttribute("rel"), 10) - 1;
      a("add");
      const n = s.config.plotOptions.heatmap.colorScale.ranges, l = n[r], c = n.reduce((h, d) => Math.max(h, d.to), 0);
      o(l, c);
    } else
      t.type === "mouseout" && a("remove");
  }
  getActiveConfigSeriesIndex(t = "asc", e = []) {
    const s = this.w;
    let i = 0;
    if (s.config.series.length > 1) {
      const a = s.config.series.map((o, r) => {
        const n = () => s.globals.comboCharts ? e.length === 0 || e.length && e.indexOf(s.config.series[r].type) > -1 : !0;
        return o.data && o.data.length > 0 && s.globals.collapsedSeriesIndices.indexOf(r) === -1 && n() ? r : -1;
      });
      for (let o = t === "asc" ? 0 : a.length - 1; t === "asc" ? o < a.length : o >= 0; t === "asc" ? o++ : o--)
        if (a[o] !== -1) {
          i = a[o];
          break;
        }
    }
    return i;
  }
  getBarSeriesIndices() {
    return this.w.globals.comboCharts ? this.w.config.series.map((e, s) => e.type === "bar" || e.type === "column" ? s : -1).filter((e) => e !== -1) : this.w.config.series.map((e, s) => s);
  }
  getPreviousPaths() {
    const t = this.w;
    t.globals.previousPaths = [];
    function e(o, r, n) {
      const l = o[r].childNodes, c = {
        type: n,
        paths: [],
        realIndex: o[r].getAttribute("data:realIndex")
      };
      for (let h = 0; h < l.length; h++)
        if (l[h].hasAttribute("pathTo")) {
          const d = l[h].getAttribute("pathTo");
          c.paths.push({
            d
          });
        }
      t.globals.previousPaths.push(c);
    }
    const s = (o) => t.dom.baseEl.querySelectorAll(
      `.apexcharts-${o}-series .apexcharts-series`
    );
    [
      "line",
      "area",
      "bar",
      "rangebar",
      "rangeArea",
      "candlestick",
      "radar"
    ].forEach((o) => {
      const r = s(o);
      for (let n = 0; n < r.length; n++)
        e(r, n, o);
    });
    const a = t.dom.baseEl.querySelectorAll(
      `.apexcharts-${t.config.chart.type} .apexcharts-series`
    );
    if (a.length > 0)
      for (let o = 0; o < a.length; o++) {
        const r = t.dom.baseEl.querySelectorAll(
          `.apexcharts-${t.config.chart.type} .apexcharts-series[data\\:realIndex='${o}'] rect`
        ), n = [];
        for (let l = 0; l < r.length; l++) {
          const c = (d) => r[l].getAttribute(d), h = {
            x: parseFloat(c("x")),
            y: parseFloat(c("y")),
            width: parseFloat(c("width")),
            height: parseFloat(c("height"))
          };
          n.push({
            rect: h,
            color: r[l].getAttribute("color")
          });
        }
        t.globals.previousPaths.push(n);
      }
    t.globals.axisCharts || (t.globals.previousPaths = t.seriesData.series);
  }
  clearPreviousPaths() {
    const t = this.w;
    t.globals.previousPaths = [], t.globals.allSeriesCollapsed = !1;
  }
  handleNoData() {
    const t = this.w, e = this, s = t.config.noData, i = new P(e.w);
    let a = t.globals.svgWidth / 2, o = t.globals.svgHeight / 2, r = "middle";
    if (t.globals.noData = !0, t.globals.animationEnded = !0, s.align === "left" ? (a = 10, r = "start") : s.align === "right" && (a = t.globals.svgWidth - 10, r = "end"), s.verticalAlign === "top" ? o = 50 : s.verticalAlign === "bottom" && (o = t.globals.svgHeight - 50), a = a + s.offsetX, o = o + parseInt(s.style.fontSize, 10) + 2 + s.offsetY, s.text !== void 0 && s.text !== "") {
      const n = i.drawText({
        x: a,
        y: o,
        text: s.text,
        textAnchor: r,
        fontSize: s.style.fontSize,
        fontFamily: s.style.fontFamily,
        foreColor: s.style.color,
        opacity: 1,
        class: "apexcharts-text-nodata"
      });
      t.dom.Paper.add(n);
    }
  }
  // When user clicks on legends, the collapsed series is filled with [0,0,0,...,0]
  // This is because we don't want to alter the series' length as it is used at many places
  setNullSeriesToZeroValues(t) {
    const e = this.w;
    for (let s = 0; s < t.length; s++)
      if (t[s].length === 0)
        for (let i = 0; i < t[e.globals.maxValsInArrayIndex].length; i++)
          t[s].push(0);
    return t;
  }
  hasAllSeriesEqualX() {
    let t = !0;
    const e = this.w, s = this.filteredSeriesX();
    for (let i = 0; i < s.length - 1; i++)
      if (s[i][0] !== s[i + 1][0]) {
        t = !1;
        break;
      }
    return e.globals.allSeriesHasEqualX = t, t;
  }
  filteredSeriesX() {
    return this.w.seriesData.seriesX.map(
      (s) => s.length > 0 ? s : []
    );
  }
}
class We {
  constructor(t) {
    this.w = t, this.colors = [], this.isColorFn = !1, this.isHeatmapDistributed = this.checkHeatmapDistributed(), this.isBarDistributed = this.checkBarDistributed();
  }
  checkHeatmapDistributed() {
    const { chart: t, plotOptions: e } = this.w.config;
    return t.type === "treemap" && e.treemap && e.treemap.distributed || t.type === "heatmap" && e.heatmap && e.heatmap.distributed;
  }
  checkBarDistributed() {
    const { chart: t, plotOptions: e } = this.w.config;
    return e.bar && e.bar.distributed && (t.type === "bar" || t.type === "rangeBar");
  }
  init() {
    this.setDefaultColors();
  }
  setDefaultColors() {
    var t;
    const e = this.w, s = new L();
    e.dom.elWrap.classList.add(
      `apexcharts-theme-${e.config.theme.mode || "light"}`
    );
    const i = (t = e.config.theme.accessibility) == null ? void 0 : t.colorBlindMode;
    if (i) {
      e.globals.colors = this.getColorBlindColors(i), this.applySeriesColors(e.seriesData.seriesColors, e.globals.colors);
      const r = e.globals.colors.slice();
      this.pushExtraColors(e.globals.colors), this.applyColorTypes(["fill", "stroke"], r), this.applyDataLabelsColors(r), this.applyRadarPolygonsColors(), this.applyMarkersColors(r), i === "highContrast" && e.dom.elWrap.classList.add("apexcharts-high-contrast");
      return;
    }
    const a = [...e.config.colors || e.config.fill.colors || []];
    e.globals.colors = this.getColors(a), this.applySeriesColors(e.seriesData.seriesColors, e.globals.colors), e.config.theme.monochrome.enabled && (e.globals.colors = this.getMonochromeColors(
      e.config.theme.monochrome,
      e.seriesData.series,
      s
    ));
    const o = e.globals.colors.slice();
    this.pushExtraColors(e.globals.colors), this.applyColorTypes(["fill", "stroke"], o), this.applyDataLabelsColors(o), this.applyRadarPolygonsColors(), this.applyMarkersColors(o);
  }
  getColors(t) {
    const e = this.w;
    return !t || t.length === 0 ? this.predefined() : Array.isArray(t) && t.length > 0 && typeof t[0] == "function" ? (this.isColorFn = !0, e.config.series.map((s, i) => {
      const a = t[i] || t[0];
      return typeof a == "function" ? a({
        value: e.globals.axisCharts ? e.seriesData.series[i][0] || 0 : e.seriesData.series[i],
        seriesIndex: i,
        dataPointIndex: i,
        w: this.w
      }) : a;
    })) : t;
  }
  applySeriesColors(t, e) {
    t.forEach((s, i) => {
      s && (e[i] = s);
    });
  }
  getMonochromeColors(t, e, s) {
    const { color: i, shadeIntensity: a, shadeTo: o } = t, r = this.isBarDistributed || this.isHeatmapDistributed ? e[0].length * e.length : e.length, n = 1 / (r / a);
    let l = 0;
    return Array.from({ length: r }, () => {
      const c = o === "dark" ? s.shadeColor(l * -1, i) : s.shadeColor(l, i);
      return l += n, c;
    });
  }
  applyColorTypes(t, e) {
    const s = this.w;
    t.forEach((i) => {
      s.globals[i].colors = s.config[i].colors === void 0 ? this.isColorFn ? s.config.colors : e : s.config[i].colors.slice(), this.pushExtraColors(s.globals[i].colors);
    });
  }
  applyDataLabelsColors(t) {
    const e = this.w;
    e.globals.dataLabels.style.colors = e.config.dataLabels.style.colors === void 0 ? t : e.config.dataLabels.style.colors.slice(), this.pushExtraColors(e.globals.dataLabels.style.colors, 50);
  }
  applyRadarPolygonsColors() {
    const t = this.w;
    t.globals.radarPolygons.fill.colors = t.config.plotOptions.radar.polygons.fill.colors === void 0 ? [t.config.theme.mode === "dark" ? "#343A3F" : "none"] : t.config.plotOptions.radar.polygons.fill.colors.slice(), this.pushExtraColors(t.globals.radarPolygons.fill.colors, 20);
  }
  applyMarkersColors(t) {
    const e = this.w;
    e.globals.markers.colors = e.config.markers.colors === void 0 ? t : e.config.markers.colors.slice(), this.pushExtraColors(e.globals.markers.colors);
  }
  pushExtraColors(t, e, s = null) {
    const i = this.w;
    let a = e || i.seriesData.series.length;
    if (s === null && (s = this.isBarDistributed || this.isHeatmapDistributed || i.config.chart.type === "heatmap" && i.config.plotOptions.heatmap && i.config.plotOptions.heatmap.colorScale.inverse), s && i.seriesData.series.length && (a = i.seriesData.series[i.globals.maxValsInArrayIndex].length * i.seriesData.series.length), t.length < a) {
      const o = a - t.length;
      for (let r = 0; r < o; r++)
        t.push(t[r]);
    }
  }
  getColorBlindColors(t) {
    const e = Yt();
    return ({
      deuteranopia: e.cvdDeuteranopia,
      protanopia: e.cvdProtanopia,
      tritanopia: e.cvdTritanopia,
      highContrast: e.highContrast
    }[t] || e.palette1).slice();
  }
  updateThemeOptions(t) {
    t.chart = t.chart || {}, t.tooltip = t.tooltip || {};
    const e = t.theme.mode, s = e === "dark" ? "palette4" : e === "light" ? "palette1" : t.theme.palette || "palette1", i = e === "dark" ? "#f6f7f8" : e === "light" ? "#373d3f" : t.chart.foreColor || "#373d3f";
    return t.tooltip.theme = e || "light", t.chart.foreColor = i, t.theme.palette = s, t;
  }
  predefined() {
    const t = this.w.config.theme.palette, e = Yt();
    return e[t] || e.palette1;
  }
}
class Ge {
  constructor(t) {
    this.w = t;
  }
  draw() {
    this.drawTitleSubtitle("title"), this.drawTitleSubtitle("subtitle");
  }
  drawTitleSubtitle(t) {
    const e = this.w, s = t === "title" ? e.config.title : e.config.subtitle;
    let i = e.globals.svgWidth / 2, a = s.offsetY, o = "middle";
    if (s.align === "left" ? (i = 10, o = "start") : s.align === "right" && (i = e.globals.svgWidth - 10, o = "end"), i = i + s.offsetX, a = a + parseInt(s.style.fontSize, 10) + s.margin / 2, s.text !== void 0) {
      const n = new P(this.w).drawText({
        x: i,
        y: a,
        text: s.text,
        textAnchor: o,
        fontSize: s.style.fontSize,
        fontFamily: s.style.fontFamily,
        fontWeight: s.style.fontWeight,
        foreColor: s.style.color,
        opacity: 1
      });
      n.node.setAttribute("class", `apexcharts-${t}-text`), e.dom.Paper.add(n);
    }
  }
}
let $e = class {
  constructor(t) {
    this.w = t.w, this.dCtx = t;
  }
  /**
   * Get Chart Title/Subtitle Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getTitleSubtitleCoords(t) {
    const e = this.w;
    let s = 0, i = 0;
    const a = t === "title" ? e.config.title.floating : e.config.subtitle.floating, o = e.dom.baseEl.querySelector(`.apexcharts-${t}-text`);
    if (o !== null && !a) {
      const r = o.getBoundingClientRect();
      s = r.width, i = e.globals.axisCharts ? r.height + 5 : r.height;
    }
    return {
      width: s,
      height: i
    };
  }
  getLegendsRect() {
    const t = this.w, e = t.dom.elLegendWrap;
    !t.config.legend.height && (t.config.legend.position === "top" || t.config.legend.position === "bottom") && (e.style.maxHeight = t.globals.svgHeight / 2 + "px");
    const s = Object.assign({}, L.getBoundingClientRect(e));
    return e !== null && !t.config.legend.floating && t.config.legend.show ? this.dCtx.lgRect = {
      x: s.x,
      y: s.y,
      height: s.height,
      width: s.height === 0 ? 0 : s.width
    } : this.dCtx.lgRect = {
      x: 0,
      y: 0,
      height: 0,
      width: 0
    }, (t.config.legend.position === "left" || t.config.legend.position === "right") && this.dCtx.lgRect.width * 1.5 > t.globals.svgWidth && (this.dCtx.lgRect.width = t.globals.svgWidth / 1.5), this.dCtx.lgRect;
  }
  /**
   * Get Y Axis Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getDatalabelsRect() {
    const t = this.w, e = [];
    t.config.series.forEach((r, n) => {
      r.data.forEach((l, c) => {
        const d = ((p) => t.config.dataLabels.formatter(p, {
          seriesIndex: n,
          dataPointIndex: c,
          w: t
        }))(t.seriesData.series[n][c]);
        e.push(d);
      });
    });
    const s = L.getLargestStringFromArr(e), i = new P(this.w), a = t.config.dataLabels.style, o = i.getTextRects(
      s,
      parseInt(a.fontSize),
      a.fontFamily
    );
    return {
      width: o.width * 1.05,
      height: o.height
    };
  }
  getLargestStringFromMultiArr(t, e) {
    const s = this.w;
    let i = t;
    if (s.axisFlags.isMultiLineX) {
      const a = e.map((n) => Array.isArray(n) ? n.length : 1), o = Math.max(...a), r = a.indexOf(o);
      i = e[r];
    }
    return i;
  }
};
class Ve {
  constructor(t) {
    this.w = t.w, this.dCtx = t;
  }
  /**
   * Get X Axis Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getxAxisLabelsCoords() {
    const t = this.w;
    let e = t.labelData.labels.slice();
    t.config.xaxis.convertedCatToNumeric && e.length === 0 && (e = t.labelData.categoryLabels);
    let s;
    if (t.labelData.timescaleLabels.length > 0) {
      const i = this.getxAxisTimeScaleLabelsCoords();
      s = {
        width: i.width,
        height: i.height
      }, t.layout.rotateXLabels = !1;
    } else {
      this.dCtx.lgWidthForSideLegends = (t.config.legend.position === "left" || t.config.legend.position === "right") && !t.config.legend.floating ? this.dCtx.lgRect.width : 0;
      const i = t.formatters.xLabelFormatter;
      let a = L.getLargestStringFromArr(e), o = this.dCtx.dimHelpers.getLargestStringFromMultiArr(
        a,
        e
      );
      t.globals.isBarHorizontal && (a = t.globals.yAxisScale[0].result.reduce(
        (d, p) => d.length > p.length ? d : p,
        0
      ), o = a);
      const r = new vt(this.w), n = a;
      a = r.xLabelFormat(i, a, n, {
        i: void 0,
        dateFormatter: new q(this.w).formatDate,
        w: t
      }), o = r.xLabelFormat(i, o, n, {
        i: void 0,
        dateFormatter: new q(this.w).formatDate,
        w: t
      }), (t.config.xaxis.convertedCatToNumeric && typeof a > "u" || String(a).trim() === "") && (a = "1", o = a);
      const l = new P(this.w);
      let c = l.getTextRects(
        a,
        t.config.xaxis.labels.style.fontSize
      ), h = c;
      if (a !== o && (h = l.getTextRects(
        o,
        t.config.xaxis.labels.style.fontSize
      )), s = {
        width: c.width >= h.width ? c.width : h.width,
        height: c.height >= h.height ? c.height : h.height
      }, s.width * e.length > t.globals.svgWidth - this.dCtx.lgWidthForSideLegends - this.dCtx.yAxisWidth - this.dCtx.gridPad.left - this.dCtx.gridPad.right && t.config.xaxis.labels.rotate !== 0 || t.config.xaxis.labels.rotateAlways) {
        if (!t.globals.isBarHorizontal) {
          t.layout.rotateXLabels = !0;
          const d = (p) => l.getTextRects(
            p,
            t.config.xaxis.labels.style.fontSize,
            t.config.xaxis.labels.style.fontFamily,
            `rotate(${t.config.xaxis.labels.rotate} 0 0)`,
            !1
          );
          c = d(a), a !== o && (h = d(o)), s.height = (c.height > h.height ? c.height : h.height) / 1.5, s.width = c.width > h.width ? c.width : h.width;
        }
      } else
        t.layout.rotateXLabels = !1;
    }
    return t.config.xaxis.labels.show || (s = {
      width: 0,
      height: 0
    }), {
      width: s.width,
      height: s.height
    };
  }
  /**
   * Get X Axis Label Group height
   * @memberof Dimensions
   * @return {{width, height}}
   */
  getxAxisGroupLabelsCoords() {
    var t;
    const e = this.w;
    if (!e.labelData.hasXaxisGroups)
      return { width: 0, height: 0 };
    const s = ((t = e.config.xaxis.group.style) == null ? void 0 : t.fontSize) || e.config.xaxis.labels.style.fontSize, i = e.labelData.groups.map((h) => h.title);
    let a;
    const o = L.getLargestStringFromArr(i), r = this.dCtx.dimHelpers.getLargestStringFromMultiArr(
      o,
      i
    ), n = new P(this.w), l = n.getTextRects(o, s);
    let c = l;
    return o !== r && (c = n.getTextRects(r, s)), a = {
      width: l.width >= c.width ? l.width : c.width,
      height: l.height >= c.height ? l.height : c.height
    }, e.config.xaxis.labels.show || (a = {
      width: 0,
      height: 0
    }), {
      width: a.width,
      height: a.height
    };
  }
  /**
   * Get X Axis Title Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getxAxisTitleCoords() {
    const t = this.w;
    let e = 0, s = 0;
    if (t.config.xaxis.title.text !== void 0) {
      const a = new P(this.w).getTextRects(
        t.config.xaxis.title.text,
        t.config.xaxis.title.style.fontSize
      );
      e = a.width, s = a.height;
    }
    return {
      width: e,
      height: s
    };
  }
  getxAxisTimeScaleLabelsCoords() {
    const t = this.w;
    this.dCtx.timescaleLabels = t.labelData.timescaleLabels.slice();
    const e = this.dCtx.timescaleLabels.map((r) => r.value), s = e.reduce((r, n) => typeof r > "u" ? (console.error(
      "You have possibly supplied invalid Date format. Please supply a valid JavaScript Date"
    ), 0) : r.length > n.length ? r : n, 0), a = new P(this.w).getTextRects(s, t.config.xaxis.labels.style.fontSize);
    return a.width * 1.05 * e.length > t.layout.gridWidth && t.config.xaxis.labels.rotate !== 0 && (t.globals.overlappingXLabels = !0), a;
  }
  // In certain cases, the last labels gets cropped in xaxis.
  // Hence, we add some additional padding based on the label length to avoid the last label being cropped or we don't draw it at all
  additionalPaddingXLabels(t) {
    const e = this.w, s = e.globals, i = e.config, a = i.xaxis.type, o = t.width;
    s.skipLastTimelinelabel = !1, s.skipFirstTimelinelabel = !1;
    const r = e.config.yaxis[0].opposite && e.globals.isBarHorizontal, n = (h) => s.collapsedSeriesIndices.indexOf(h) !== -1, l = (h) => {
      if (this.dCtx.timescaleLabels && this.dCtx.timescaleLabels.length) {
        const d = this.dCtx.timescaleLabels[0], g = this.dCtx.timescaleLabels[this.dCtx.timescaleLabels.length - 1].position + o / 1.75 - this.dCtx.yAxisWidthRight, f = d.position - o / 1.75 + this.dCtx.yAxisWidthLeft, x = e.config.legend.position === "right" && this.dCtx.lgRect.width > 0 ? this.dCtx.lgRect.width : 0;
        g > s.svgWidth - e.layout.translateX - x && (s.skipLastTimelinelabel = !0), f < -((!h.show || h.floating) && (i.chart.type === "bar" || i.chart.type === "candlestick" || i.chart.type === "rangeBar" || i.chart.type === "boxPlot") ? o / 1.75 : 10) && (s.skipFirstTimelinelabel = !0);
      } else
        a === "datetime" ? this.dCtx.gridPad.right < o && !e.layout.rotateXLabels && (s.skipLastTimelinelabel = !0) : a !== "datetime" && this.dCtx.gridPad.right < o / 2 - this.dCtx.yAxisWidthRight && !e.layout.rotateXLabels && !e.config.xaxis.labels.trim && (this.dCtx.xPadRight = o / 2 + 1);
    }, c = (h, d) => {
      i.yaxis.length > 1 && n(d) || l(h);
    };
    i.yaxis.forEach((h, d) => {
      r ? (this.dCtx.gridPad.left < o && (this.dCtx.xPadLeft = o / 2 + 1), this.dCtx.xPadRight = o / 2 + 1) : c(h, d);
    });
  }
}
class Ue {
  constructor(t) {
    this.w = t.w, this.dCtx = t;
  }
  /**
   * Get Y Axis Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getyAxisLabelsCoords() {
    const t = this.w, e = 0, s = 0, i = [];
    let a = 10;
    const o = new at(this.w, { theme: this.dCtx.theme, timeScale: this.dCtx.timeScale });
    return t.config.yaxis.map((r, n) => {
      const l = {
        seriesIndex: n,
        dataPointIndex: -1,
        w: t
      }, c = t.globals.yAxisScale[n];
      let h = 0;
      if (!o.isYAxisHidden(n) && r.labels.show && r.labels.minWidth !== void 0 && (h = r.labels.minWidth), !o.isYAxisHidden(n) && r.labels.show && c.result.length) {
        const d = t.formatters.yLabelFormatters[n], p = c.niceMin === Number.MIN_VALUE ? 0 : c.niceMin;
        let g = c.result.reduce((b, w) => {
          var v, C;
          return ((v = String(d(b, l))) == null ? void 0 : v.length) > ((C = String(d(w, l))) == null ? void 0 : C.length) ? b : w;
        }, p);
        g = d(g, l);
        let f = g;
        if ((typeof g > "u" || g.length === 0) && (g = c.niceMax), String(g).length === 1 && (g = g + ".0", f = g), t.globals.isBarHorizontal) {
          a = 0;
          const b = t.labelData.labels.slice();
          g = L.getLargestStringFromArr(b), g = d(g, { seriesIndex: n, dataPointIndex: -1, w: t }), f = this.dCtx.dimHelpers.getLargestStringFromMultiArr(
            g,
            b
          );
        }
        const x = new P(this.w), m = "rotate(".concat(r.labels.rotate, " 0 0)"), u = x.getTextRects(
          g,
          r.labels.style.fontSize,
          r.labels.style.fontFamily,
          m,
          !1
        );
        let y = u;
        g !== f && (y = x.getTextRects(
          f,
          r.labels.style.fontSize,
          r.labels.style.fontFamily,
          m,
          !1
        )), i.push({
          width: (h > y.width || h > u.width ? h : y.width > u.width ? y.width : u.width) + a,
          height: y.height > u.height ? y.height : u.height
        });
      } else
        i.push({
          width: e,
          height: s
        });
    }), i;
  }
  /**
   * Get Y Axis Dimensions
   * @memberof Dimensions
   * @return {{width, height}}
   **/
  getyAxisTitleCoords() {
    const t = this.w, e = [];
    return t.config.yaxis.map((s) => {
      if (s.show && s.title.text !== void 0) {
        const i = new P(this.w), a = "rotate(".concat(s.title.rotate, " 0 0)"), o = i.getTextRects(
          s.title.text,
          s.title.style.fontSize,
          s.title.style.fontFamily,
          a,
          !1
        );
        e.push({
          width: o.width,
          height: o.height
        });
      } else
        e.push({
          width: 0,
          height: 0
        });
    }), e;
  }
  getTotalYAxisWidth() {
    const t = this.w;
    let e = 0, s = 0, i = 0;
    const a = t.globals.yAxisScale.length > 1 ? 10 : 0, o = new at(this.w, { theme: this.dCtx.theme, timeScale: this.dCtx.timeScale }), r = function(l) {
      return t.globals.ignoreYAxisIndexes.indexOf(l) > -1;
    }, n = (l, c) => {
      const h = t.config.yaxis[c].floating;
      let d = 0;
      l.width > 0 && !h ? (d = l.width + a, r(c) && (d = d - l.width - a)) : d = h || o.isYAxisHidden(c) ? 0 : 5, t.config.yaxis[c].opposite ? i = i + d : s = s + d, e = e + d;
    };
    return t.layout.yLabelsCoords.map((l, c) => {
      n(l, c);
    }), t.layout.yTitleCoords.map((l, c) => {
      n(l, c);
    }), t.globals.isBarHorizontal && !t.config.yaxis[0].floating && (e = t.layout.yLabelsCoords[0].width + t.layout.yTitleCoords[0].width + 15), this.dCtx.yAxisWidthLeft = s, this.dCtx.yAxisWidthRight = i, e;
  }
}
class qe {
  constructor(t) {
    this.w = t.w, this.dCtx = t;
  }
  gridPadForColumnsInNumericAxis(t) {
    const { w: e } = this, { config: s, globals: i } = e;
    if (i.noData || i.collapsedSeries.length + i.ancillaryCollapsedSeries.length === s.series.length)
      return 0;
    const a = (h) => ["bar", "rangeBar", "candlestick", "boxPlot"].includes(h), o = s.chart.type;
    let r = 0, n = a(o) ? s.series.length : 1;
    i.comboBarCount > 0 && (n = i.comboBarCount), i.collapsedSeries.forEach((h) => {
      a(h.type) && (n -= 1);
    }), s.chart.stacked && (n = 1);
    const l = a(o) || i.comboBarCount > 0;
    let c = Math.abs(i.initialMaxX - i.initialMinX);
    if (l && e.axisFlags.isXNumeric && !i.isBarHorizontal && n > 0 && c !== 0) {
      c <= 3 && (c = i.dataPoints);
      const h = c / t;
      let d = i.minXDiff && i.minXDiff / h > 0 ? i.minXDiff / h : 0;
      d > t / 2 && (d /= 2), r = d * parseInt(s.plotOptions.bar.columnWidth, 10) / 100, r < 1 && (r = 1), i.barPadForNumericAxis = r;
    }
    return r;
  }
  gridPadFortitleSubtitle() {
    const { w: t } = this, { globals: e } = t;
    let s = this.dCtx.isSparkline || !e.axisCharts ? 0 : 10;
    ["title", "subtitle"].forEach((r) => {
      t.config[r].text !== void 0 ? s += t.config[r].margin : s += this.dCtx.isSparkline || !e.axisCharts ? 0 : 5;
    }), t.config.legend.show && t.config.legend.position === "bottom" && !t.config.legend.floating && !e.axisCharts && (s += 10);
    const a = this.dCtx.dimHelpers.getTitleSubtitleCoords("title"), o = this.dCtx.dimHelpers.getTitleSubtitleCoords("subtitle");
    t.layout.gridHeight -= a.height + o.height + s, t.layout.translateY += a.height + o.height + s;
  }
  setGridXPosForDualYAxis(t, e) {
    const { w: s } = this, i = new at(this.w, { theme: this.dCtx.theme, timeScale: this.dCtx.timeScale });
    s.config.yaxis.forEach((a, o) => {
      s.globals.ignoreYAxisIndexes.indexOf(o) === -1 && !a.floating && !i.isYAxisHidden(o) && (a.opposite && (s.layout.translateX -= e[o].width + t[o].width + parseInt(a.labels.style.fontSize, 10) / 1.2 + 12), s.layout.translateX < 2 && (s.layout.translateX = 2));
    });
  }
}
class Dt {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.theme = e.theme, this.timeScale = e.timeScale, this.lgRect = {}, this.yAxisWidth = 0, this.yAxisWidthLeft = 0, this.yAxisWidthRight = 0, this.xAxisHeight = 0, this.isSparkline = this.w.config.chart.sparkline.enabled, this.dimHelpers = new $e(this), this.dimYAxis = new Ue(this), this.dimXAxis = new Ve(this), this.dimGrid = new qe(this), this.lgWidthForSideLegends = 0, this.gridPad = this.w.config.grid.padding, this.xPadRight = 0, this.xPadLeft = 0;
  }
  /**
   * @memberof Dimensions
   * @param {object} w - chart context
   **/
  plotCoords() {
    const t = this.w, e = t.globals;
    this.lgRect = this.dimHelpers.getLegendsRect(), this.datalabelsCoords = { width: 0, height: 0 };
    const s = Array.isArray(t.config.stroke.width) ? Math.max(...t.config.stroke.width) : t.config.stroke.width;
    this.isSparkline && ((t.config.markers.discrete.length > 0 || t.config.markers.size > 0) && Object.entries(this.gridPad).forEach(([a, o]) => {
      this.gridPad[a] = Math.max(
        o,
        this.w.globals.markers.largestSize / 1.5
      );
    }), this.gridPad.top = Math.max(s / 2, this.gridPad.top), this.gridPad.bottom = Math.max(s / 2, this.gridPad.bottom)), e.axisCharts ? this.setDimensionsForAxisCharts() : this.setDimensionsForNonAxisCharts(), this.dimGrid.gridPadFortitleSubtitle(), t.layout.gridHeight = t.layout.gridHeight - this.gridPad.top - this.gridPad.bottom, t.layout.gridWidth = t.layout.gridWidth - this.gridPad.left - this.gridPad.right - this.xPadRight - this.xPadLeft;
    const i = this.dimGrid.gridPadForColumnsInNumericAxis(t.layout.gridWidth);
    return t.layout.gridWidth = t.layout.gridWidth - i * 2, t.layout.translateX = t.layout.translateX + this.gridPad.left + this.xPadLeft + (i > 0 ? i : 0), t.layout.translateY = t.layout.translateY + this.gridPad.top, {
      // w.layout (future slice)
      layout: {
        gridHeight: t.layout.gridHeight,
        gridWidth: t.layout.gridWidth,
        translateX: t.layout.translateX,
        translateY: t.layout.translateY,
        translateXAxisX: t.layout.translateXAxisX,
        translateXAxisY: t.layout.translateXAxisY,
        rotateXLabels: t.layout.rotateXLabels,
        xAxisHeight: t.layout.xAxisHeight,
        xAxisLabelsHeight: t.layout.xAxisLabelsHeight,
        xAxisGroupLabelsHeight: t.layout.xAxisGroupLabelsHeight,
        xAxisLabelsWidth: t.layout.xAxisLabelsWidth,
        yLabelsCoords: t.layout.yLabelsCoords,
        yTitleCoords: t.layout.yTitleCoords
      }
    };
  }
  setDimensionsForAxisCharts() {
    const t = this.w, e = t.globals, s = this.dimYAxis.getyAxisLabelsCoords(), i = this.dimYAxis.getyAxisTitleCoords();
    e.isSlopeChart && (this.datalabelsCoords = this.dimHelpers.getDatalabelsRect()), t.layout.yLabelsCoords = [], t.layout.yTitleCoords = [], t.config.yaxis.map((p, g) => {
      t.layout.yLabelsCoords.push({
        width: s[g].width,
        index: g
      }), t.layout.yTitleCoords.push({
        width: i[g].width,
        index: g
      });
    }), this.yAxisWidth = this.dimYAxis.getTotalYAxisWidth();
    const a = this.dimXAxis.getxAxisLabelsCoords(), o = this.dimXAxis.getxAxisGroupLabelsCoords(), r = this.dimXAxis.getxAxisTitleCoords();
    this.conditionalChecksForAxisCoords(
      a,
      r,
      o
    ), t.layout.translateXAxisY = t.layout.rotateXLabels ? this.xAxisHeight / 8 : -4, t.layout.translateXAxisX = t.layout.rotateXLabels && t.axisFlags.isXNumeric && t.config.xaxis.labels.rotate <= -45 ? -this.xAxisWidth / 4 : 0, t.globals.isBarHorizontal && (t.layout.rotateXLabels = !1, t.layout.translateXAxisY = -1 * (parseInt(t.config.xaxis.labels.style.fontSize, 10) / 1.5)), t.layout.translateXAxisY = t.layout.translateXAxisY + t.config.xaxis.labels.offsetY, t.layout.translateXAxisX = t.layout.translateXAxisX + t.config.xaxis.labels.offsetX;
    let n = this.yAxisWidth, l = this.xAxisHeight;
    t.layout.xAxisLabelsHeight = this.xAxisHeight - r.height, t.layout.xAxisGroupLabelsHeight = t.layout.xAxisLabelsHeight - a.height, t.layout.xAxisLabelsWidth = this.xAxisWidth, t.layout.xAxisHeight = this.xAxisHeight;
    let c = 10;
    (t.config.chart.type === "radar" || this.isSparkline) && (n = 0, l = 0), this.isSparkline && (this.lgRect = {
      height: 0,
      width: 0
    }), (this.isSparkline || t.config.chart.type === "treemap") && (n = 0, l = 0, c = 0), !this.isSparkline && t.config.chart.type !== "treemap" && this.dimXAxis.additionalPaddingXLabels(a);
    const h = () => {
      t.layout.translateX = n + this.datalabelsCoords.width, t.layout.gridHeight = e.svgHeight - this.lgRect.height - l - (!this.isSparkline && t.config.chart.type !== "treemap" ? t.layout.rotateXLabels ? 10 : 15 : 0), t.layout.gridWidth = e.svgWidth - n - this.datalabelsCoords.width * 2;
    };
    switch (t.config.xaxis.position === "top" && (c = t.layout.xAxisHeight - t.config.xaxis.axisTicks.height - 5), t.config.legend.position) {
      case "bottom":
        t.layout.translateY = c, h();
        break;
      case "top":
        t.layout.translateY = this.lgRect.height + c, h();
        break;
      case "left":
        t.layout.translateY = c, t.layout.translateX = this.lgRect.width + n + this.datalabelsCoords.width, t.layout.gridHeight = e.svgHeight - l - 12, t.layout.gridWidth = e.svgWidth - this.lgRect.width - n - this.datalabelsCoords.width * 2;
        break;
      case "right":
        t.layout.translateY = c, t.layout.translateX = n + this.datalabelsCoords.width, t.layout.gridHeight = e.svgHeight - l - 12, t.layout.gridWidth = e.svgWidth - this.lgRect.width - n - this.datalabelsCoords.width * 2 - 5;
        break;
      default:
        throw new Error("Legend position not supported");
    }
    this.dimGrid.setGridXPosForDualYAxis(i, s), new _t(this.w, { theme: this.theme, timeScale: this.timeScale }).setYAxisXPosition(s, i);
  }
  setDimensionsForNonAxisCharts() {
    const t = this.w, e = t.globals, s = t.config;
    let i = 0;
    t.config.legend.show && !t.config.legend.floating && (i = 20);
    const a = s.chart.type === "pie" || s.chart.type === "polarArea" || s.chart.type === "donut" ? "pie" : "radialBar", o = s.plotOptions[a].offsetY, r = s.plotOptions[a].offsetX;
    if (!s.legend.show || s.legend.floating) {
      t.layout.gridHeight = e.svgHeight;
      const n = t.dom.elWrap.getBoundingClientRect().width;
      t.layout.gridWidth = Math.min(n, t.layout.gridHeight), t.layout.translateY = o, t.layout.translateX = r + (e.svgWidth - t.layout.gridWidth) / 2;
      return;
    }
    switch (s.legend.position) {
      case "bottom":
        t.layout.gridHeight = e.svgHeight - this.lgRect.height, t.layout.gridWidth = e.svgWidth, t.layout.translateY = o - 10, t.layout.translateX = r + (e.svgWidth - t.layout.gridWidth) / 2;
        break;
      case "top":
        t.layout.gridHeight = e.svgHeight - this.lgRect.height, t.layout.gridWidth = e.svgWidth, t.layout.translateY = this.lgRect.height + o + 10, t.layout.translateX = r + (e.svgWidth - t.layout.gridWidth) / 2;
        break;
      case "left":
        t.layout.gridWidth = e.svgWidth - this.lgRect.width - i, t.layout.gridHeight = s.chart.height !== "auto" ? e.svgHeight : t.layout.gridWidth, t.layout.translateY = o, t.layout.translateX = r + this.lgRect.width + i;
        break;
      case "right":
        t.layout.gridWidth = e.svgWidth - this.lgRect.width - i - 5, t.layout.gridHeight = s.chart.height !== "auto" ? e.svgHeight : t.layout.gridWidth, t.layout.translateY = o, t.layout.translateX = r + 10;
        break;
      default:
        throw new Error("Legend position not supported");
    }
  }
  conditionalChecksForAxisCoords(t, e, s) {
    const i = this.w, a = i.labelData.hasXaxisGroups ? 2 : 1, o = s.height + t.height + e.height, r = i.axisFlags.isMultiLineX ? 1.2 : ce, n = i.layout.rotateXLabels ? 22 : 10, c = i.layout.rotateXLabels && i.config.legend.position === "bottom" ? 10 : 0;
    this.xAxisHeight = o * r + a * n + c, this.xAxisWidth = t.width, this.xAxisHeight - e.height > i.config.xaxis.labels.maxHeight && (this.xAxisHeight = i.config.xaxis.labels.maxHeight), i.config.xaxis.labels.minHeight && this.xAxisHeight < i.config.xaxis.labels.minHeight && (this.xAxisHeight = i.config.xaxis.labels.minHeight), i.config.xaxis.floating && (this.xAxisHeight = 0);
    let h = 0, d = 0;
    i.config.yaxis.forEach((p) => {
      h += p.labels.minWidth, d += p.labels.maxWidth;
    }), this.yAxisWidth < h && (this.yAxisWidth = h), this.yAxisWidth > d && (this.yAxisWidth = d);
  }
}
const ue = 24 * 60, Nt = ue * 60, Ze = 10 / Nt;
class je {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.timeScaleArray = [], this.utc = this.w.config.xaxis.labels.datetimeUTC;
  }
  calculateTimeScaleTicks(t, e) {
    const s = this.w;
    if (s.globals.allSeriesCollapsed)
      return s.labelData.labels = [], s.labelData.timescaleLabels = [], [];
    const i = new q(this.w), a = (e - t) / (1e3 * Nt);
    this.determineInterval(a), s.interact.disableZoomIn = !1, s.interact.disableZoomOut = !1, a < Ze ? s.interact.disableZoomIn = !0 : a > 5e4 && (s.interact.disableZoomOut = !0);
    const o = i.getTimeUnitsfromTimestamp(t, e, this.utc), r = s.layout.gridWidth / a, n = r / 24, l = n / 60, c = l / 60, h = Math.floor(a * 24), d = Math.floor(a * ue), p = Math.floor(a * Nt), g = Math.floor(a), f = Math.floor(a / 30), x = Math.floor(a / 365), m = {
      minMillisecond: o.minMillisecond,
      minSecond: o.minSecond,
      minMinute: o.minMinute,
      minHour: o.minHour,
      minDate: o.minDate,
      minMonth: o.minMonth,
      minYear: o.minYear
    }, u = m.minMillisecond, y = m.minSecond, b = m.minMinute, w = m.minHour, v = m.minDate, C = m.minDate, D = m.minMonth, S = m.minYear, k = {
      firstVal: m,
      currentMillisecond: u,
      currentSecond: y,
      currentMinute: b,
      currentHour: w,
      currentMonthDate: v,
      currentDate: C,
      currentMonth: D,
      currentYear: S,
      daysWidthOnXAxis: r,
      hoursWidthOnXAxis: n,
      minutesWidthOnXAxis: l,
      secondsWidthOnXAxis: c,
      numberOfSeconds: p,
      numberOfMinutes: d,
      numberOfHours: h,
      numberOfDays: g,
      numberOfMonths: f,
      numberOfYears: x
    };
    switch (this.tickInterval) {
      case "years": {
        this.generateYearScale(k);
        break;
      }
      case "months":
      case "half_year": {
        this.generateMonthScale(k);
        break;
      }
      case "months_days":
      case "months_fortnight":
      case "days":
      case "week_days": {
        this.generateDayScale(k);
        break;
      }
      case "hours": {
        this.generateHourScale(k);
        break;
      }
      case "minutes_fives":
      case "minutes":
        this.generateMinuteScale(k);
        break;
      case "seconds_tens":
      case "seconds_fives":
      case "seconds":
        this.generateSecondScale(k);
        break;
    }
    const F = this.timeScaleArray.map((M) => {
      const E = {
        position: M.position,
        unit: M.unit,
        year: M.year,
        day: M.day ? M.day : 1,
        hour: M.hour ? M.hour : 0,
        month: M.month + 1
      };
      return M.unit === "month" ? O(I({}, E), {
        day: 1,
        value: M.value + 1
      }) : M.unit === "day" || M.unit === "hour" ? O(I({}, E), {
        value: M.value
      }) : M.unit === "minute" ? O(I({}, E), {
        value: M.value,
        minute: M.value
      }) : M.unit === "second" ? O(I({}, E), {
        value: M.value,
        minute: M.minute,
        second: M.second
      }) : M;
    });
    return F.filter((M) => {
      let E = 1, X = Math.ceil(s.layout.gridWidth / 120);
      const R = M.value;
      s.config.xaxis.tickAmount !== void 0 && (X = s.config.xaxis.tickAmount), F.length > X && (E = Math.floor(F.length / X));
      let Y = !1, z = !1;
      switch (this.tickInterval) {
        case "years":
          M.unit === "year" && (Y = !0);
          break;
        case "half_year":
          E = 7, M.unit === "year" && (Y = !0);
          break;
        case "months":
          E = 1, M.unit === "year" && (Y = !0);
          break;
        case "months_fortnight":
          E = 15, (M.unit === "year" || M.unit === "month") && (Y = !0), R === 30 && (z = !0);
          break;
        case "months_days":
          E = 10, M.unit === "month" && (Y = !0), R === 30 && (z = !0);
          break;
        case "week_days":
          E = 8, M.unit === "month" && (Y = !0);
          break;
        case "days":
          E = 1, M.unit === "month" && (Y = !0);
          break;
        case "hours":
          M.unit === "day" && (Y = !0);
          break;
        case "minutes_fives":
          R % 5 !== 0 && (z = !0);
          break;
        case "seconds_tens":
          R % 10 !== 0 && (z = !0);
          break;
        case "seconds_fives":
          R % 5 !== 0 && (z = !0);
          break;
      }
      if (this.tickInterval === "hours" || this.tickInterval === "minutes_fives" || this.tickInterval === "seconds_tens" || this.tickInterval === "seconds_fives") {
        if (!z)
          return !0;
      } else if ((R % E === 0 || Y) && !z)
        return !0;
    });
  }
  recalcDimensionsBasedOnFormat(t) {
    const e = this.w, s = this.formatDates(t), i = this.removeOverlappingTS(
      s
    );
    e.labelData.timescaleLabels = i.slice();
    const o = new Dt(this.w, this.ctx).plotCoords();
    this.ctx._writeLayoutCoords(o.layout);
  }
  determineInterval(t) {
    const e = t / 365, s = t * 24, i = s * 60, a = i * 60;
    switch (!0) {
      case e > 5:
        this.tickInterval = "years";
        break;
      case t > 800:
        this.tickInterval = "half_year";
        break;
      case t > 180:
        this.tickInterval = "months";
        break;
      case t > 90:
        this.tickInterval = "months_fortnight";
        break;
      case t > 60:
        this.tickInterval = "months_days";
        break;
      case t > 30:
        this.tickInterval = "week_days";
        break;
      case t > 2:
        this.tickInterval = "days";
        break;
      case s > 2.4:
        this.tickInterval = "hours";
        break;
      case i > 15:
        this.tickInterval = "minutes_fives";
        break;
      case i > 5:
        this.tickInterval = "minutes";
        break;
      case i > 1:
        this.tickInterval = "seconds_tens";
        break;
      case a > 20:
        this.tickInterval = "seconds_fives";
        break;
      default:
        this.tickInterval = "seconds";
        break;
    }
  }
  generateYearScale({
    firstVal: t,
    currentMonth: e,
    currentYear: s,
    daysWidthOnXAxis: i,
    numberOfYears: a
  }) {
    let o = t.minYear, r = 0;
    const n = new q(this.w), l = "year";
    if (t.minDate > 1 || t.minMonth > 0) {
      const d = n.determineRemainingDaysOfYear(
        t.minYear,
        t.minMonth,
        t.minDate
      );
      r = (n.determineDaysOfYear(t.minYear) - d + 1) * i, o = t.minYear + 1, this.timeScaleArray.push({
        position: r,
        value: o,
        unit: l,
        year: o,
        month: L.monthMod(e + 1)
      });
    } else
      t.minDate === 1 && t.minMonth === 0 && this.timeScaleArray.push({
        position: r,
        value: o,
        unit: l,
        year: s,
        month: L.monthMod(e + 1)
      });
    let c = o, h = r;
    for (let d = 0; d < a; d++)
      c++, h = n.determineDaysOfYear(c - 1) * i + h, this.timeScaleArray.push({
        position: h,
        value: c,
        unit: l,
        year: c,
        month: 1
      });
  }
  generateMonthScale({
    firstVal: t,
    currentMonthDate: e,
    currentMonth: s,
    currentYear: i,
    daysWidthOnXAxis: a,
    numberOfMonths: o
  }) {
    let r = s, n = 0;
    const l = new q(this.w);
    let c = "month", h = 0;
    if (t.minDate > 1) {
      n = (l.determineDaysOfMonths(s + 1, t.minYear) - e + 1) * a, r = L.monthMod(s + 1);
      let f = i + h, x = L.monthMod(r), m = r;
      r === 0 && (c = "year", m = f, x = 1, h += 1, f = f + h), this.timeScaleArray.push({
        position: n,
        value: m,
        unit: c,
        year: f,
        month: x
      });
    } else
      this.timeScaleArray.push({
        position: n,
        value: r,
        unit: c,
        year: i,
        month: L.monthMod(s)
      });
    let d = r + 1, p = n;
    for (let g = 0, f = 1; g < o; g++, f++) {
      d = L.monthMod(d), d === 0 ? (c = "year", h += 1) : c = "month";
      const x = this._getYear(i, d, h);
      p = l.determineDaysOfMonths(d, x) * a + p;
      const m = d === 0 ? x : d;
      this.timeScaleArray.push({
        position: p,
        value: m,
        unit: c,
        year: x,
        month: d === 0 ? 1 : d
      }), d++;
    }
  }
  generateDayScale({
    firstVal: t,
    currentMonth: e,
    currentYear: s,
    hoursWidthOnXAxis: i,
    numberOfDays: a
  }) {
    const o = new q(this.w);
    let r = "day", n = t.minDate + 1, l = n;
    const c = (m, u, y) => {
      const b = o.determineDaysOfMonths(u + 1, y);
      return m > b && (u = u + 1, l = 1, r = "month", g = u), u;
    }, h = 24 - t.minHour, d = 0;
    let p = h * i, g = n, f = c(l, e, s);
    t.minHour === 0 && t.minDate === 1 ? (p = 0, g = L.monthMod(t.minMonth), r = "month", l = t.minDate) : t.minDate !== 1 && t.minHour === 0 && t.minMinute === 0 && (p = 0, n = t.minDate, l = n, g = n, f = c(l, e, s), g !== 1 && (r = "day")), this.timeScaleArray.push({
      position: p,
      value: g,
      unit: r,
      year: this._getYear(s, f, d),
      month: L.monthMod(f),
      day: l
    });
    let x = p;
    for (let m = 0; m < a; m++) {
      l += 1, r = "day", f = c(
        l,
        f,
        this._getYear(s, f, d)
      );
      const u = this._getYear(s, f, d);
      x = 24 * i + x;
      const y = l === 1 ? L.monthMod(f) : l;
      this.timeScaleArray.push({
        position: x,
        value: y,
        unit: r,
        year: u,
        month: L.monthMod(f),
        day: y
      });
    }
  }
  generateHourScale({
    firstVal: t,
    currentDate: e,
    currentMonth: s,
    currentYear: i,
    minutesWidthOnXAxis: a,
    numberOfHours: o
  }) {
    const r = new q(this.w), n = 0;
    let l = "hour";
    const c = (b, w) => {
      const v = r.determineDaysOfMonths(w + 1, i);
      return b > v && (x = 1, w = w + 1), { month: w, date: x };
    }, h = (b, w) => {
      const v = r.determineDaysOfMonths(w + 1, i);
      return b > v && (w = w + 1), w;
    }, d = 60 - (t.minMinute + t.minSecond / 60);
    let p = d * a, g = t.minHour + 1, f = g;
    d === 60 && (p = 0, g = t.minHour, f = g);
    let x = e;
    f >= 24 && (f = 0, x += 1, l = "day", g = x);
    let u = c(x, s).month;
    u = h(x, u), g > 31 && (x = 1, g = x), this.timeScaleArray.push({
      position: p,
      value: g,
      unit: l,
      day: x,
      hour: f,
      year: i,
      month: L.monthMod(u)
    }), f++;
    let y = p;
    for (let b = 0; b < o; b++) {
      l = "hour", f >= 24 && (f = 0, x += 1, l = "day", u = c(x, u).month, u = h(x, u));
      const w = this._getYear(i, u, n);
      y = 60 * a + y;
      const v = f === 0 ? x : f;
      this.timeScaleArray.push({
        position: y,
        value: v,
        unit: l,
        hour: f,
        day: x,
        year: w,
        month: L.monthMod(u)
      }), f++;
    }
  }
  generateMinuteScale({
    currentMillisecond: t,
    currentSecond: e,
    currentMinute: s,
    currentHour: i,
    currentDate: a,
    currentMonth: o,
    currentYear: r,
    minutesWidthOnXAxis: n,
    secondsWidthOnXAxis: l,
    numberOfMinutes: c
  }) {
    const d = "minute", g = (60 - e - t / 1e3) * l;
    let f = s + 1;
    const x = a, m = o, u = r;
    let y = i, b = g;
    for (let w = 0; w < c; w++)
      f >= 60 && (f = 0, y += 1, y === 24 && (y = 0)), this.timeScaleArray.push({
        position: b,
        value: f,
        unit: d,
        hour: y,
        minute: f,
        day: x,
        year: this._getYear(u, m, 0),
        month: L.monthMod(m)
      }), b += n, f++;
  }
  generateSecondScale({
    currentMillisecond: t,
    currentSecond: e,
    currentMinute: s,
    currentHour: i,
    currentDate: a,
    currentMonth: o,
    currentYear: r,
    secondsWidthOnXAxis: n,
    numberOfSeconds: l
  }) {
    const h = "second", p = (1e3 - t) / 1e3 * n;
    let g = e + 1, f = s;
    const x = a, m = o, u = r;
    let y = i, b = p;
    for (let w = 0; w < l; w++)
      g >= 60 && (f++, g = 0, f >= 60 && (y++, f = 0, y === 24 && (y = 0))), this.timeScaleArray.push({
        position: b,
        value: g,
        unit: h,
        hour: y,
        minute: f,
        second: g,
        day: x,
        year: this._getYear(u, m, 0),
        month: L.monthMod(m)
      }), b += n, g++;
  }
  createRawDateString(t, e) {
    let s = t.year;
    return t.month === 0 && (t.month = 1), s += "-" + ("0" + t.month.toString()).slice(-2), t.unit === "day" ? s += t.unit === "day" ? "-" + ("0" + e).slice(-2) : "-01" : s += "-" + ("0" + (t.day ? t.day : "1")).slice(-2), t.unit === "hour" ? s += t.unit === "hour" ? "T" + ("0" + e).slice(-2) : "T00" : s += "T" + ("0" + (t.hour ? t.hour : "0")).slice(-2), t.unit === "minute" ? s += ":" + ("0" + e).slice(-2) : s += ":" + (t.minute ? ("0" + t.minute).slice(-2) : "00"), t.unit === "second" ? s += ":" + ("0" + e).slice(-2) : s += ":00", this.utc && (s += ".000Z"), s;
  }
  formatDates(t) {
    const e = this.w;
    return t.map((i) => {
      let a = i.value.toString();
      const o = new q(this.w), r = this.createRawDateString(i, a);
      let n = o.getDate(o.parseDate(r));
      if (this.utc || (n = o.getDate(o.parseDateWithTimezone(r))), e.config.xaxis.labels.format === void 0) {
        let l = "dd MMM";
        const c = e.config.xaxis.labels.datetimeFormatter;
        i.unit === "year" && (l = c.year), i.unit === "month" && (l = c.month), i.unit === "day" && (l = c.day), i.unit === "hour" && (l = c.hour), i.unit === "minute" && (l = c.minute), i.unit === "second" && (l = c.second), a = o.formatDate(n, l);
      } else
        a = o.formatDate(n, e.config.xaxis.labels.format);
      return {
        dateString: r,
        position: i.position,
        value: a,
        unit: i.unit,
        year: i.year,
        month: i.month
      };
    });
  }
  removeOverlappingTS(t) {
    const e = new P(this.w);
    let s = !1, i;
    t.length > 0 && // check arr length
    t[0].value && // check arr[0] contains value
    t.every((r) => r.value.length === t[0].value.length) && (s = !0, i = e.getTextRects(t[0].value).width);
    let a = 0, o = t.map((r, n) => {
      if (n > 0 && this.w.config.xaxis.labels.hideOverlappingLabels) {
        const l = s ? i : e.getTextRects(t[a].value).width, c = t[a].position;
        return r.position > c + l + 10 ? (a = n, r) : null;
      } else
        return r;
    });
    return o = o.filter((r) => r !== null), o;
  }
  _getYear(t, e, s) {
    return t + Math.floor(e / 12) + s;
  }
}
const xe = {};
function Ke(A) {
  Object.assign(xe, A);
}
function Q(A) {
  const t = xe[A];
  if (!t)
    throw new Error(
      `ApexCharts: chart type "${A}" is not registered. Import it via ApexCharts.use() or use the full apexcharts bundle.
If you already imported the entry (e.g. 'apexcharts/${A}'), your bundler may have created two separate copies of the ApexCharts module so the registration was lost. Add all apexcharts sub-entries to your bundler's deduplication config — for Vite add them to optimizeDeps.include in vite.config.`
    );
  return t;
}
class Je {
  constructor(t, e, s) {
    this.w = e, this.ctx = s, this.el = t;
  }
  setupElements() {
    const { globals: t, config: e } = this.w, s = e.chart.type, i = [
      "line",
      "area",
      "bar",
      "rangeBar",
      "rangeArea",
      "candlestick",
      "boxPlot",
      "scatter",
      "bubble",
      "radar",
      "heatmap",
      "treemap"
    ], a = [
      "line",
      "area",
      "bar",
      "rangeBar",
      "rangeArea",
      "candlestick",
      "boxPlot",
      "scatter",
      "bubble"
    ];
    t.axisCharts = i.includes(s), t.xyCharts = a.includes(s), t.isBarHorizontal = ["bar", "rangeBar", "boxPlot"].includes(s) && e.plotOptions.bar.horizontal, t.chartClass = `.apexcharts${t.chartID}`, this.w.dom.baseEl = this.el, this.w.dom.elWrap = N.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    ), P.setAttrs(this.w.dom.elWrap, {
      id: t.chartClass.substring(1),
      class: `apexcharts-canvas ${t.chartClass.substring(1)}`
    }), this.el.appendChild(this.w.dom.elWrap);
    const o = B.isBrowser() ? window.SVG : global.SVG;
    if (this.w.dom.Paper = o().addTo(this.w.dom.elWrap), this.w.dom.Paper.attr({
      class: "apexcharts-svg",
      "xmlns:data": "ApexChartsNS",
      transform: `translate(${e.chart.offsetX}, ${e.chart.offsetY})`
    }), this.w.dom.Paper.node.style.background = e.theme.mode === "dark" && !e.chart.background ? "#343A3F" : e.theme.mode === "light" && !e.chart.background ? "#fff" : e.chart.background, this.setSVGDimensions(), this.w.dom.elLegendForeign = N.createElementNS(
      G,
      "foreignObject"
    ), P.setAttrs(this.w.dom.elLegendForeign, {
      x: 0,
      y: 0,
      width: t.svgWidth,
      height: t.svgHeight
    }), this.w.dom.elLegendWrap = N.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    ), this.w.dom.elLegendWrap.classList.add("apexcharts-legend"), this.w.dom.elWrap.appendChild(this.w.dom.elLegendWrap), this.w.dom.Paper.node.appendChild(this.w.dom.elLegendForeign), e.chart.accessibility.enabled) {
      const r = this.getAccessibleChartLabel(), n = e.chart.accessibility.keyboard.enabled && e.chart.accessibility.keyboard.navigation.enabled ? "application" : "img";
      this.w.dom.Paper.attr({
        role: n,
        "aria-label": r
      });
      const l = N.createElementNS(G, "title");
      if (l.textContent = e.title.text || "Chart", this.w.dom.Paper.node.insertBefore(
        l,
        this.w.dom.elLegendForeign.nextSibling
      ), e.chart.accessibility.description) {
        const c = N.createElementNS(G, "desc");
        c.textContent = e.chart.accessibility.description, this.w.dom.Paper.node.insertBefore(c, l.nextSibling);
      }
    }
    this.w.dom.elGraphical = this.w.dom.Paper.group().attr({
      class: "apexcharts-inner apexcharts-graphical"
    }), this.w.dom.elDefs = this.w.dom.Paper.defs(), this.w.dom.Paper.add(this.w.dom.elGraphical), this.w.dom.elGraphical.add(this.w.dom.elDefs);
  }
  plotChartType(t, e) {
    const { w: s, ctx: i } = this, { config: a, globals: o } = s, r = {
      line: { series: [], i: [] },
      area: { series: [], i: [] },
      scatter: { series: [], i: [] },
      bubble: { series: [], i: [] },
      bar: { series: [], i: [] },
      candlestick: { series: [], i: [] },
      boxPlot: { series: [], i: [] },
      rangeBar: { series: [], i: [] },
      rangeArea: { series: [], seriesRangeEnd: [], i: [] }
    }, n = a.chart.type || "line";
    let l = null, c = 0;
    this.w.seriesData.series.forEach((u, y) => {
      var b, w;
      const v = ((b = t[y]) == null ? void 0 : b.type) === "column" ? "bar" : ((w = t[y]) == null ? void 0 : w.type) || (n === "column" ? "bar" : n);
      r[v] ? (v === "rangeArea" ? (r[v].series.push(
        this.w.rangeData.seriesRangeStart[y]
      ), r[v].seriesRangeEnd.push(
        this.w.rangeData.seriesRangeEnd[y]
      )) : r[v].series.push(u), r[v].i.push(y), v === "bar" && (s.globals.columnSeries = r.bar)) : [
        "heatmap",
        "treemap",
        "pie",
        "donut",
        "polarArea",
        "radialBar",
        "radar"
      ].includes(v) ? l = v : console.warn(
        `You have specified an unrecognized series type (${v}).`
      ), n !== v && v !== "scatter" && c++;
    }), c > 0 && (l && console.warn(
      `Chart or series type ${l} cannot appear with other chart or series types.`
    ), r.bar.series.length > 0 && a.plotOptions.bar.horizontal && (c -= r.bar.series.length, r.bar = { series: [], i: [] }, s.globals.columnSeries = { series: [], i: [] }, console.warn(
      "Horizontal bars are not supported in a mixed/combo chart. Please turn off `plotOptions.bar.horizontal`"
    ))), o.comboCharts || (o.comboCharts = c > 0);
    const d = r.line.series.length > 0 || r.area.series.length > 0 || r.scatter.series.length > 0 || r.bubble.series.length > 0 || r.rangeArea.series.length > 0 || !o.comboCharts && ["line", "area", "scatter", "bubble", "rangeArea"].includes(
      a.chart.type
    ) ? new (Q("line"))(i.w, i, e) : null, g = r.candlestick.series.length > 0 || r.boxPlot.series.length > 0 || !o.comboCharts && ["candlestick", "boxPlot"].includes(a.chart.type) ? new (Q("candlestick"))(i.w, i, e) : null, f = !o.comboCharts && ["pie", "donut", "polarArea"].includes(a.chart.type);
    i.pie = f ? new (Q("pie"))(i.w, i) : null;
    const x = r.rangeBar.series.length > 0 || !o.comboCharts && a.chart.type === "rangeBar";
    i.rangeBar = x ? new (Q("rangeBar"))(i.w, i, e) : null;
    let m = [];
    if (o.comboCharts) {
      const u = new V(this.w);
      if (r.area.series.length > 0 && m.push(
        ...u.drawSeriesByGroup(
          r.area,
          o.areaGroups,
          "area",
          d
        )
      ), r.bar.series.length > 0)
        if (a.chart.stacked) {
          const y = new (Q("barStacked"))(i.w, i, e);
          m.push(
            y.draw(r.bar.series, r.bar.i)
          );
        } else
          i.bar = new (Q("bar"))(i.w, i, e), m.push(i.bar.draw(r.bar.series, r.bar.i));
      if (r.rangeArea.series.length > 0 && m.push(
        d.draw(
          r.rangeArea.series,
          "rangeArea",
          r.rangeArea.i,
          r.rangeArea.seriesRangeEnd
        )
      ), r.line.series.length > 0 && m.push(
        ...u.drawSeriesByGroup(
          r.line,
          o.lineGroups,
          "line",
          d
        )
      ), r.candlestick.series.length > 0 && m.push(
        g.draw(
          r.candlestick.series,
          "candlestick",
          r.candlestick.i
        )
      ), r.boxPlot.series.length > 0 && m.push(
        g.draw(
          r.boxPlot.series,
          "boxPlot",
          r.boxPlot.i
        )
      ), r.rangeBar.series.length > 0 && m.push(
        i.rangeBar.draw(
          r.rangeBar.series,
          r.rangeBar.i
        )
      ), r.scatter.series.length > 0) {
        const y = new (Q("line"))(i.w, i, e, !0);
        m.push(
          y.draw(
            r.scatter.series,
            "scatter",
            r.scatter.i
          )
        );
      }
      if (r.bubble.series.length > 0) {
        const y = new (Q("line"))(i.w, i, e, !0);
        m.push(
          y.draw(
            r.bubble.series,
            "bubble",
            r.bubble.i
          )
        );
      }
    } else {
      const u = a.chart.type;
      switch (u) {
        case "line":
          m = d.draw(this.w.seriesData.series, "line");
          break;
        case "area":
          m = d.draw(this.w.seriesData.series, "area");
          break;
        case "bar":
          a.chart.stacked ? m = new (Q("barStacked"))(i.w, i, e).draw(this.w.seriesData.series) : (i.bar = new (Q("bar"))(i.w, i, e), m = i.bar.draw(this.w.seriesData.series));
          break;
        case "candlestick":
          m = g.draw(this.w.seriesData.series, "candlestick");
          break;
        case "boxPlot":
          m = g.draw(this.w.seriesData.series, u);
          break;
        case "rangeBar":
          m = i.rangeBar.draw(this.w.seriesData.series);
          break;
        case "rangeArea":
          m = d.draw(
            this.w.rangeData.seriesRangeStart,
            "rangeArea",
            void 0,
            this.w.rangeData.seriesRangeEnd
          );
          break;
        case "heatmap": {
          m = new (Q("heatmap"))(i.w, i, e).draw(this.w.seriesData.series);
          break;
        }
        case "treemap": {
          m = new (Q("treemap"))(i.w, i).draw(this.w.seriesData.series);
          break;
        }
        case "pie":
        case "donut":
        case "polarArea":
          m = i.pie.draw(this.w.seriesData.series);
          break;
        case "radialBar": {
          m = new (Q("radialBar"))(i.w, i).draw(this.w.seriesData.series);
          break;
        }
        case "radar": {
          m = new (Q("radar"))(i.w, i).draw(this.w.seriesData.series);
          break;
        }
        default:
          m = d.draw(this.w.seriesData.series);
      }
    }
    return m;
  }
  setSVGDimensions() {
    const { globals: t, config: e } = this.w;
    e.chart.width = e.chart.width || "100%", e.chart.height = e.chart.height || "auto", t.svgWidth = e.chart.width, t.svgHeight = e.chart.height;
    let s = L.getDimensions(this.el);
    const i = e.chart.width.toString().split(/[0-9]+/g).pop();
    i === "%" ? L.isNumber(s[0]) && (s[0].width === 0 && (s = L.getDimensions(this.el.parentNode)), t.svgWidth = s[0] * parseInt(e.chart.width, 10) / 100) : (i === "px" || i === "") && (t.svgWidth = parseInt(e.chart.width, 10));
    const a = String(e.chart.height).toString().split(/[0-9]+/g).pop();
    if (t.svgHeight !== "auto" && t.svgHeight !== "")
      if (a === "%") {
        const o = L.getDimensions(this.el.parentNode);
        t.svgHeight = o[1] * parseInt(e.chart.height, 10) / 100;
      } else
        t.svgHeight = parseInt(e.chart.height, 10);
    else
      t.svgHeight = t.axisCharts ? t.svgWidth / 1.61 : t.svgWidth / 1.2;
    if (t.svgWidth = Math.max(t.svgWidth, 0), t.svgHeight = Math.max(t.svgHeight, 0), P.setAttrs(this.w.dom.Paper.node, {
      width: t.svgWidth,
      height: t.svgHeight
    }), a !== "%" && B.isBrowser()) {
      const o = e.chart.sparkline.enabled ? 0 : t.axisCharts ? e.chart.parentHeightOffset : 0;
      this.w.dom.Paper.node.parentNode.parentNode.style.minHeight = `${t.svgHeight + o}px`;
    }
    this.w.dom.elWrap.style.width = `${t.svgWidth}px`, this.w.dom.elWrap.style.height = `${t.svgHeight}px`;
  }
  shiftGraphPosition() {
    const { globals: t } = this.w, { translateY: e, translateX: s } = t;
    P.setAttrs(this.w.dom.elGraphical.node, {
      transform: `translate(${s}, ${e})`
    });
  }
  resizeNonAxisCharts() {
    var t, e;
    const { w: s } = this;
    let i = 0, a = s.config.chart.sparkline.enabled ? 1 : 15;
    a += s.config.grid.padding.bottom, ["top", "bottom"].includes(s.config.legend.position) && s.config.legend.show && !s.config.legend.floating && (i = ((e = (t = this.ctx.legend) == null ? void 0 : t.legendHelpers.getLegendDimensions().clwh) != null ? e : 0) + 7);
    const o = s.dom.baseEl.querySelector(
      ".apexcharts-radialbar, .apexcharts-pie"
    );
    let r = s.globals.radialSize * 2.05;
    if (o && !s.config.chart.sparkline.enabled && s.config.plotOptions.radialBar.startAngle !== 0) {
      const l = L.getBoundingClientRect(o);
      r = l.bottom;
      const c = l.bottom - l.top;
      r = Math.max(s.globals.radialSize * 2.05, c);
    }
    const n = Math.ceil(
      r + this.w.layout.translateY + i + a
    );
    this.w.dom.elLegendForeign && this.w.dom.elLegendForeign.setAttribute("height", n), !(s.config.chart.height && String(s.config.chart.height).includes("%")) && (this.w.dom.elWrap.style.height = `${n}px`, P.setAttrs(this.w.dom.Paper.node, { height: n }), B.isBrowser() && (this.w.dom.Paper.node.parentNode.parentNode.style.minHeight = `${n}px`));
  }
  coreCalculations() {
    new It(this.w).init();
  }
  resetGlobals() {
    const t = () => this.w.config.series.map(() => []), e = new de(), { globals: s } = this.w, i = {
      dataWasParsed: this.w.axisFlags.dataWasParsed,
      originalSeries: s.originalSeries
    };
    e.initGlobalVars(s), s.seriesXvalues = t(), s.seriesYvalues = t(), i.dataWasParsed && (this.w.axisFlags.dataWasParsed = i.dataWasParsed, s.originalSeries = i.originalSeries);
  }
  isMultipleY() {
    return Array.isArray(this.w.config.yaxis) && this.w.config.yaxis.length > 1 ? (this.w.globals.isMultipleYAxis = !0, !0) : !1;
  }
  xySettings() {
    const { w: t } = this;
    let e = null;
    if (t.globals.axisCharts) {
      if (t.config.xaxis.crosshairs.position === "back" && new Bt(this.w).drawXCrosshairs(), t.config.yaxis[0].crosshairs.position === "back" && new Bt(this.w).drawYCrosshairs(), t.config.xaxis.type === "datetime" && t.config.xaxis.labels.formatter === void 0) {
        this.ctx.timeScale = new je(this.w, this.ctx);
        let i = [];
        isFinite(t.globals.minX) && isFinite(t.globals.maxX) && !t.globals.isBarHorizontal ? i = this.ctx.timeScale.calculateTimeScaleTicks(
          t.globals.minX,
          t.globals.maxX
        ) : t.globals.isBarHorizontal && (i = this.ctx.timeScale.calculateTimeScaleTicks(
          t.globals.minY,
          t.globals.maxY
        )), this.ctx.timeScale.recalcDimensionsBasedOnFormat(i);
      }
      e = new V(this.w).getCalculatedRatios();
    }
    return e;
  }
  updateSourceChart(t) {
    this.ctx.w.interact.selection = void 0, this.ctx.updateHelpers._updateOptions(
      {
        chart: {
          selection: {
            xaxis: {
              min: t.w.globals.minX,
              max: t.w.globals.maxX
            }
          }
        }
      },
      !1,
      !1
    );
  }
  setupBrushHandler() {
    const { ctx: t, w: e } = this;
    if (e.config.chart.brush.enabled && typeof e.config.chart.events.selection != "function") {
      const s = Array.isArray(e.config.chart.brush.targets) ? e.config.chart.brush.targets : [e.config.chart.brush.target];
      s.forEach((i) => {
        const a = t.constructor.getChartByID(i);
        a.w.globals.brushSource = this.ctx, typeof a.w.config.chart.events.zoomed != "function" && (a.w.config.chart.events.zoomed = () => this.updateSourceChart(a)), typeof a.w.config.chart.events.scrolled != "function" && (a.w.config.chart.events.scrolled = () => this.updateSourceChart(a));
      }), e.config.chart.events.selection = (i, a) => {
        s.forEach((o) => {
          t.constructor.getChartByID(o).ctx.updateHelpers._updateOptions(
            {
              xaxis: {
                min: a.xaxis.min,
                max: a.xaxis.max
              }
            },
            !1,
            !1,
            !1,
            !1
          );
        });
      };
    }
  }
  getAccessibleChartLabel() {
    const t = this.w, e = t.config;
    let s = "";
    if (e.chart.accessibility && e.chart.accessibility.description)
      s = e.chart.accessibility.description;
    else if (e.title.text) {
      const i = e.chart.type;
      s = `${e.title.text}. ${i} chart`, e.subtitle.text && (s += `. ${e.subtitle.text}`);
    } else {
      const i = e.chart.type, a = t.seriesData.series.length || (e.series ? e.series.length : 0);
      s = `${i} chart with ${a} data series`;
    }
    return s;
  }
}
class Wt {
  constructor(t, { resetGlobals: e = () => {
  }, isMultipleY: s = () => {
  } } = {}) {
    this.w = t, this.resetGlobals = e, this.isMultipleY = s, this.twoDSeries = [], this.threeDSeries = [], this.twoDSeriesX = [], this.seriesGoals = [], this.coreUtils = new V(this.w);
  }
  // Helper to get the first valid data point from the active series
  getFirstDataPoint() {
    const t = this.w.config.series, e = new U(this.w);
    return this.activeSeriesIndex = e.getActiveConfigSeriesIndex(), t[this.activeSeriesIndex] && t[this.activeSeriesIndex].data && t[this.activeSeriesIndex].data.length > 0 && t[this.activeSeriesIndex].data[0] !== null && typeof t[this.activeSeriesIndex].data[0] < "u" ? t[this.activeSeriesIndex].data[0] : null;
  }
  isMultiFormat() {
    return this.isFormatXY() || this.isFormat2DArray();
  }
  // given format is [{x, y}, {x, y}]
  isFormatXY() {
    const t = this.getFirstDataPoint();
    return t && typeof t.x < "u";
  }
  // given format is [[x, y], [x, y]]
  isFormat2DArray() {
    const t = this.getFirstDataPoint();
    return t && Array.isArray(t);
  }
  handleFormat2DArray(t, e) {
    const s = this.w.config, i = t[e].data, a = s.chart.type === "boxPlot" || s.series[e].type === "boxPlot";
    for (let o = 0; o < i.length; o++) {
      const r = i[o], n = r[0], l = r[1], c = r[2];
      if (typeof l < "u" && (Array.isArray(l) && l.length === 4 && !a ? this.twoDSeries.push(L.parseNumber(l[3])) : r.length >= 5 ? this.twoDSeries.push(L.parseNumber(r[4])) : this.twoDSeries.push(L.parseNumber(l)), this.w.axisFlags.dataFormatXNumeric = !0), s.xaxis.type === "datetime") {
        let h = new Date(n);
        h = h.getTime(), this.twoDSeriesX.push(h);
      } else
        this.twoDSeriesX.push(n);
      typeof c < "u" && (this.threeDSeries.push(c), this.w.axisFlags.isDataXYZ = !0);
    }
  }
  handleFormatXY(t, e) {
    const s = this.w.config, i = this.w.globals, a = new q(this.w), o = t[e].data;
    let r = e;
    i.collapsedSeriesIndices.indexOf(e) > -1 && (r = this.activeSeriesIndex);
    const n = t[r].data;
    for (let l = 0; l < o.length; l++) {
      const c = o[l];
      if (typeof c.y < "u") {
        const h = Array.isArray(c.y) ? L.parseNumber(c.y[c.y.length - 1]) : L.parseNumber(c.y);
        this.twoDSeries.push(h);
      }
      typeof this.seriesGoals[e] > "u" && (this.seriesGoals[e] = []), typeof c.goals < "u" && Array.isArray(c.goals) ? this.seriesGoals[e].push(c.goals) : this.seriesGoals[e].push(null), typeof c.z < "u" && (this.threeDSeries.push(c.z), this.w.axisFlags.isDataXYZ = !0);
    }
    for (let l = 0; l < n.length; l++) {
      const h = n[l].x, d = typeof h == "string", p = Array.isArray(h), g = !p && !!a.isValidDate(h);
      if (d || g)
        if (d || s.xaxis.convertedCatToNumeric) {
          const f = i.isBarHorizontal && this.w.axisFlags.isRangeData;
          s.xaxis.type === "datetime" && !f ? this.twoDSeriesX.push(a.parseDate(h)) : (this.fallbackToCategory = !0, this.twoDSeriesX.push(h), !isNaN(h) && this.w.config.xaxis.type !== "category" && typeof h != "string" && (this.w.axisFlags.isXNumeric = !0));
        } else
          s.xaxis.type === "datetime" ? this.twoDSeriesX.push(a.parseDate(h.toString())) : (this.w.axisFlags.dataFormatXNumeric = !0, this.w.axisFlags.isXNumeric = !0, this.twoDSeriesX.push(parseFloat(h)));
      else
        p ? (this.fallbackToCategory = !0, this.twoDSeriesX.push(h)) : (this.w.axisFlags.isXNumeric = !0, this.w.axisFlags.dataFormatXNumeric = !0, this.twoDSeriesX.push(h));
    }
  }
  handleRangeData(t, e) {
    let s = {};
    return this.isFormat2DArray() ? s = this.handleRangeDataFormat("array", t, e) : this.isFormatXY() && (s = this.handleRangeDataFormat("xy", t, e)), this.w.rangeData.seriesRangeStart[e] = s.start === void 0 ? [] : s.start, this.w.rangeData.seriesRangeEnd[e] = s.end === void 0 ? [] : s.end, this.w.rangeData.seriesRange[e] = s.rangeUniques, this.w.rangeData.seriesRange.forEach((i) => {
      i && i.forEach((a) => {
        const o = a.y, r = o.length;
        if (!(r <= 1))
          for (let n = 0; n < r; n++) {
            const l = o[n], c = l.y1, h = l.y2;
            for (let d = n + 1; d < r; d++) {
              const p = o[d], g = p.y1, f = p.y2;
              c <= f && g <= h && (a.overlaps.indexOf(l.rangeName) < 0 && a.overlaps.push(l.rangeName), a.overlaps.indexOf(p.rangeName) < 0 && a.overlaps.push(p.rangeName));
            }
          }
      });
    }), s;
  }
  handleCandleStickBoxData(t, e) {
    let s = {};
    return this.isFormat2DArray() ? s = this.handleCandleStickBoxDataFormat("array", t, e) : this.isFormatXY() && (s = this.handleCandleStickBoxDataFormat("xy", t, e)), this.w.candleData.seriesCandleO[e] = s.o, this.w.candleData.seriesCandleH[e] = s.h, this.w.candleData.seriesCandleM[e] = s.m, this.w.candleData.seriesCandleL[e] = s.l, this.w.candleData.seriesCandleC[e] = s.c, s;
  }
  handleRangeDataFormat(t, e, s) {
    const i = [], a = [], o = /* @__PURE__ */ new Map(), r = [];
    if (e[s].data.forEach((n) => {
      if (!o.has(n.x)) {
        const l = {
          x: n.x,
          overlaps: [],
          y: []
        };
        o.set(n.x, l), r.push(l);
      }
    }), t === "array")
      for (let n = 0; n < e[s].data.length; n++)
        Array.isArray(e[s].data[n]) ? (i.push(e[s].data[n][1][0]), a.push(e[s].data[n][1][1])) : (i.push(e[s].data[n]), a.push(e[s].data[n]));
    else if (t === "xy")
      for (let n = 0; n < e[s].data.length; n++) {
        const l = Array.isArray(e[s].data[n].y), c = L.randomId(), h = e[s].data[n].x, d = {
          y1: l ? e[s].data[n].y[0] : e[s].data[n].y,
          y2: l ? e[s].data[n].y[1] : e[s].data[n].y,
          rangeName: c
        };
        e[s].data[n].rangeName = c;
        const p = o.get(h);
        p && p.y.push(d), i.push(d.y1), a.push(d.y2);
      }
    return {
      start: i,
      end: a,
      rangeUniques: r
    };
  }
  handleCandleStickBoxDataFormat(t, e, s) {
    const i = this.w, a = i.config.chart.type === "boxPlot" || i.config.series[s].type === "boxPlot", o = [], r = [], n = [], l = [], c = [], h = e[s].data;
    let d;
    t === "array" ? a && h[0].length === 6 || !a && h[0].length === 5 ? d = (g) => g.slice(1) : d = (g) => Array.isArray(g[1]) ? g[1] : [] : d = (p) => Array.isArray(p.y) ? p.y : [];
    for (let p = 0; p < h.length; p++) {
      const g = d(h[p]);
      g && g.length >= 2 && (o.push(g[0]), r.push(g[1]), a ? (n.push(g[2]), l.push(g[3]), c.push(g[4])) : (l.push(g[2]), c.push(g[3])));
    }
    return {
      o,
      h: r,
      m: n,
      l,
      c
    };
  }
  parseDataAxisCharts(t) {
    const e = this.w.config, s = this.w.globals, i = new q(this.w), a = e.labels.length > 0 ? e.labels.slice() : e.xaxis.categories.slice();
    this.w.axisFlags.isRangeBar = e.chart.type === "rangeBar" && s.isBarHorizontal, this.w.labelData.hasXaxisGroups = e.xaxis.type === "category" && e.xaxis.group.groups.length > 0, this.w.labelData.hasXaxisGroups && (this.w.labelData.groups = e.xaxis.group.groups), t.forEach((l, c) => {
      l.name !== void 0 ? this.w.seriesData.seriesNames.push(l.name) : this.w.seriesData.seriesNames.push("series-" + parseInt(c + 1, 10));
    }), this.coreUtils.setSeriesYAxisMappings();
    const o = [], r = [...new Set(e.series.map((l) => l.group))];
    e.series.forEach((l, c) => {
      const h = r.indexOf(l.group);
      o[h] || (o[h] = []), o[h].push(this.w.seriesData.seriesNames[c]);
    }), this.w.labelData.seriesGroups = o;
    const n = () => {
      for (let l = 0; l < a.length; l++)
        if (typeof a[l] == "string")
          if (i.isValidDate(a[l]))
            this.twoDSeriesX.push(i.parseDate(a[l]));
          else
            throw new Error(
              "You have provided invalid Date format. Please provide a valid JavaScript Date"
            );
        else
          this.twoDSeriesX.push(a[l]);
    };
    for (let l = 0; l < t.length; l++) {
      if (this.twoDSeries = [], this.twoDSeriesX = [], this.threeDSeries = [], typeof t[l].data > "u") {
        console.error(
          "It is a possibility that you may have not included 'data' property in series."
        );
        return;
      }
      if ((e.chart.type === "rangeBar" || e.chart.type === "rangeArea" || t[l].type === "rangeBar" || t[l].type === "rangeArea") && (this.w.axisFlags.isRangeData = !0, this.handleRangeData(t, l)), this.isMultiFormat())
        this.isFormat2DArray() ? this.handleFormat2DArray(t, l) : this.isFormatXY() && this.handleFormatXY(t, l), (e.chart.type === "candlestick" || t[l].type === "candlestick" || e.chart.type === "boxPlot" || t[l].type === "boxPlot") && this.handleCandleStickBoxData(t, l), this.w.seriesData.series.push(this.twoDSeries), this.w.labelData.labels.push(this.twoDSeriesX), this.w.seriesData.seriesX.push(this.twoDSeriesX), this.w.seriesData.seriesGoals = this.seriesGoals, l === this.activeSeriesIndex && !this.fallbackToCategory && (this.w.axisFlags.isXNumeric = !0);
      else {
        e.xaxis.type === "datetime" ? (this.w.axisFlags.isXNumeric = !0, n(), this.w.seriesData.seriesX.push(this.twoDSeriesX)) : e.xaxis.type === "numeric" && (this.w.axisFlags.isXNumeric = !0, a.length > 0 && (this.twoDSeriesX = a, this.w.seriesData.seriesX.push(this.twoDSeriesX))), this.w.labelData.labels.push(this.twoDSeriesX);
        const c = t[l].data.map((h) => L.parseNumber(h));
        this.w.seriesData.series.push(c);
      }
      this.w.seriesData.seriesZ.push(this.threeDSeries), t[l].color !== void 0 ? this.w.seriesData.seriesColors.push(t[l].color) : this.w.seriesData.seriesColors.push(void 0);
    }
    return this.w;
  }
  parseDataNonAxisCharts(t) {
    const e = this.w.config, s = Array.isArray(t) && t.every((o) => typeof o == "number") && e.labels.length > 0, i = Array.isArray(t) && t.some(
      (o) => o && typeof o == "object" && o.data || o && typeof o == "object" && o.parsing
    );
    if (s && i && console.warn(
      "ApexCharts: Both old format (numeric series + labels) and new format (series objects with data/parsing) detected. Using old format for backward compatibility."
    ), s) {
      this.w.seriesData.series = t.slice(), this.w.seriesData.seriesNames = e.labels.slice();
      for (let o = 0; o < this.w.seriesData.series.length; o++)
        this.w.seriesData.seriesNames[o] === void 0 && this.w.seriesData.seriesNames.push("series-" + (o + 1));
      return this.w;
    }
    if (Array.isArray(t) && t.every((o) => typeof o == "number")) {
      this.w.seriesData.series = t.slice(), this.w.seriesData.seriesNames = [];
      for (let o = 0; o < this.w.seriesData.series.length; o++)
        this.w.seriesData.seriesNames.push(e.labels[o] || `series-${o + 1}`);
      return this.w;
    }
    const a = this.extractPieDataFromSeries(t);
    this.w.seriesData.series = a.values, this.w.seriesData.seriesNames = a.labels, e.chart.type === "radialBar" && (this.w.seriesData.series = this.w.seriesData.series.map((o) => {
      const r = L.parseNumber(o);
      return r > 100 && console.warn(
        `ApexCharts: RadialBar value ${r} > 100, consider using percentage values (0-100)`
      ), r;
    }));
    for (let o = 0; o < this.w.seriesData.series.length; o++)
      this.w.seriesData.seriesNames[o] === void 0 && this.w.seriesData.seriesNames.push("series-" + (o + 1));
    return this.w;
  }
  /**
   * Reset parsing flags to allow re-parsing of data during updates
   */
  resetParsingFlags() {
    const t = this.w;
    t.axisFlags.dataWasParsed = !1, t.globals.originalSeries = null, t.config.series && t.config.series.forEach((e) => {
      e.__apexParsed && delete e.__apexParsed;
    });
  }
  extractPieDataFromSeries(t) {
    const e = [], s = [];
    if (!Array.isArray(t))
      return console.warn("ApexCharts: Expected array for series data"), { values: [], labels: [] };
    if (t.length === 0)
      return console.warn("ApexCharts: Empty series array"), { values: [], labels: [] };
    const i = t[0];
    if (typeof i == "object" && i !== null && i.data)
      this.extractPieDataFromSeriesObjects(t, e, s);
    else
      return console.warn(
        "ApexCharts: Unsupported series format for pie/donut/radialBar. Expected series objects with data property."
      ), { values: [], labels: [] };
    return { values: e, labels: s };
  }
  // Extract data from series objects: [{ data: [...], parsing: {...} }]
  extractPieDataFromSeriesObjects(t, e, s) {
    t.forEach((i, a) => {
      if (!i.data || !Array.isArray(i.data)) {
        console.warn(`ApexCharts: Series ${a} has no valid data array`);
        return;
      }
      i.data.forEach((o) => {
        typeof o == "object" && o !== null ? o.x !== void 0 && o.y !== void 0 ? (s.push(String(o.x)), e.push(L.parseNumber(o.y))) : console.warn(
          "ApexCharts: Invalid data point format for pie chart. Expected {x, y} format:",
          o
        ) : console.warn(
          "ApexCharts: Expected object data point, got:",
          typeof o
        );
      });
    });
  }
  /** User possibly set string categories in xaxis.categories or labels prop
   * Or didn't set xaxis labels at all - in which case we manually do it.
   * If user passed series data as [[3, 2], [4, 5]] or [{ x: 3, y: 55 }],
   * this shouldn't be called
   * @param {array} ser - the series which user passed to the config
   */
  handleExternalLabelsData(t) {
    const e = this.w.config;
    e.xaxis.categories.length > 0 ? this.w.labelData.labels = e.xaxis.categories : e.labels.length > 0 ? this.w.labelData.labels = e.labels.slice() : this.fallbackToCategory ? (this.w.labelData.labels = this.w.labelData.labels[0], this.w.rangeData.seriesRange.length && (this.w.rangeData.seriesRange.map((s) => {
      s.forEach((i) => {
        this.w.labelData.labels.indexOf(i.x) < 0 && i.x && this.w.labelData.labels.push(i.x);
      });
    }), this.w.labelData.labels = Array.from(
      new Set(this.w.labelData.labels.map(JSON.stringify)),
      JSON.parse
    )), e.xaxis.convertedCatToNumeric && (new bt(e).convertCatToNumericXaxis(e, this.w.seriesData.seriesX[0]), this._generateExternalLabels(t))) : this._generateExternalLabels(t);
  }
  _generateExternalLabels(t) {
    const e = this.w.globals, s = this.w.config;
    let i = [];
    if (e.axisCharts) {
      if (this.w.seriesData.series.length > 0)
        if (this.isFormatXY()) {
          const a = s.series.map((r) => r.data.filter(
            (n, l, c) => c.findIndex((h) => h.x === n.x) === l
          )), o = a.reduce(
            (r, n, l, c) => c[r].length > n.length ? r : l,
            0
          );
          for (let r = 0; r < a[o].length; r++)
            i.push(r + 1);
        } else
          for (let a = 0; a < this.w.seriesData.series[e.maxValsInArrayIndex].length; a++)
            i.push(a + 1);
      this.w.seriesData.seriesX = [];
      for (let a = 0; a < t.length; a++)
        this.w.seriesData.seriesX.push(i);
      this.w.globals.isBarHorizontal || (this.w.axisFlags.isXNumeric = !0);
    }
    if (i.length === 0) {
      i = e.axisCharts ? [] : this.w.seriesData.series.map((a, o) => o + 1);
      for (let a = 0; a < t.length; a++)
        this.w.seriesData.seriesX.push(i);
    }
    this.w.labelData.labels = i, s.xaxis.convertedCatToNumeric && (this.w.labelData.categoryLabels = i.map((a) => s.xaxis.labels.formatter(a))), this.w.axisFlags.noLabelsProvided = !0;
  }
  parseRawDataIfNeeded(t) {
    const e = this.w.config, s = this.w.globals, i = e.parsing;
    if (this.w.axisFlags.dataWasParsed || !i && !t.some((o) => o.parsing))
      return t;
    const a = t.map((o, r) => {
      var n, l, c;
      if (!o.data || !Array.isArray(o.data) || o.data.length === 0)
        return o;
      const h = {
        x: ((n = o.parsing) == null ? void 0 : n.x) || (i == null ? void 0 : i.x),
        y: ((l = o.parsing) == null ? void 0 : l.y) || (i == null ? void 0 : i.y),
        z: ((c = o.parsing) == null ? void 0 : c.z) || (i == null ? void 0 : i.z)
      };
      if (!h.x && !h.y)
        return o;
      const d = o.data[0];
      if (typeof d == "object" && d !== null && (Object.prototype.hasOwnProperty.call(d, "x") || Object.prototype.hasOwnProperty.call(d, "y")) || Array.isArray(d))
        return o;
      if (!h.x || !h.y || Array.isArray(h.y) && h.y.length === 0)
        return console.warn(
          `ApexCharts: Series ${r} has parsing config but missing x or y field specification`
        ), o;
      const p = o.data.map((g, f) => {
        if (typeof g != "object" || g === null)
          return console.warn(
            `ApexCharts: Series ${r}, data point ${f} is not an object, skipping parsing`
          ), g;
        const x = this.getNestedValue(g, h.x);
        let m, u;
        if (Array.isArray(h.y)) {
          const b = h.y.map(
            (w) => this.getNestedValue(g, w)
          );
          this.w.config.chart.type === "bubble" && b.length === 2 ? m = b[0] : m = b;
        } else
          m = this.getNestedValue(g, h.y);
        h.z && (u = this.getNestedValue(g, h.z)), x === void 0 && console.warn(
          `ApexCharts: Series ${r}, data point ${f} missing field '${h.x}'`
        ), m === void 0 && console.warn(
          `ApexCharts: Series ${r}, data point ${f} missing field '${h.y}'`
        );
        const y = { x, y: m };
        if (this.w.config.chart.type === "bubble" && Array.isArray(h.y) && h.y.length === 2) {
          const b = this.getNestedValue(g, h.y[1]);
          b !== void 0 && (y.z = b);
        }
        return u !== void 0 && (y.z = u), y;
      });
      return O(I({}, o), {
        data: p,
        __apexParsed: !0
      });
    });
    return this.w.axisFlags.dataWasParsed = !0, s.originalSeries || (s.originalSeries = L.clone(t)), a;
  }
  /**
   * Get nested object value using dot notation path
   * @param {Object} obj - The object to search in
   * @param {string} path - Dot notation path (e.g., 'user.profile.name')
   * @returns {*} The value at the path, or undefined if not found
   */
  getNestedValue(t, e) {
    if (!t || typeof t != "object" || !e)
      return;
    if (e.indexOf(".") === -1)
      return t[e];
    const s = e.split(".");
    let i = t;
    for (let a = 0; a < s.length; a++) {
      if (i == null || typeof i != "object")
        return;
      i = i[s[a]];
    }
    return i;
  }
  // Segregate user provided data into appropriate vars
  parseData(t) {
    const e = this.w, s = e.config, i = e.globals;
    if (t = this.parseRawDataIfNeeded(t), s.series = t, i.initialSeries = L.clone(t), this.excludeCollapsedSeriesInYAxis(), this.fallbackToCategory = !1, this.resetGlobals(), this.isMultipleY(), i.axisCharts ? (this.parseDataAxisCharts(t), this.coreUtils.getLargestSeries()) : this.parseDataNonAxisCharts(t), s.chart.stacked) {
      const o = new U(this.w);
      this.w.seriesData.series = o.setNullSeriesToZeroValues(
        this.w.seriesData.series
      );
    }
    this.coreUtils.getSeriesTotals(), i.axisCharts && (this.w.seriesData.stackedSeriesTotals = this.coreUtils.getStackedSeriesTotals(), this.w.seriesData.stackedSeriesTotalsByGroups = this.coreUtils.getStackedSeriesTotalsByGroups()), this.coreUtils.getPercentSeries(), !this.w.axisFlags.dataFormatXNumeric && (!this.w.axisFlags.isXNumeric || s.xaxis.type === "numeric" && s.labels.length === 0 && s.xaxis.categories.length === 0) && this.handleExternalLabelsData(t);
    const a = this.coreUtils.getCategoryLabels(this.w.labelData.labels);
    for (let o = 0; o < a.length; o++)
      if (Array.isArray(a[o])) {
        this.w.axisFlags.isMultiLineX = !0;
        break;
      }
    return {
      // w.seriesData (future slice)
      seriesData: {
        series: this.w.seriesData.series,
        seriesNames: this.w.seriesData.seriesNames,
        seriesX: this.w.seriesData.seriesX,
        seriesZ: this.w.seriesData.seriesZ,
        seriesColors: this.w.seriesData.seriesColors,
        seriesGoals: this.w.seriesData.seriesGoals,
        initialSeries: i.initialSeries,
        originalSeries: i.originalSeries,
        stackedSeriesTotals: this.w.seriesData.stackedSeriesTotals,
        stackedSeriesTotalsByGroups: this.w.seriesData.stackedSeriesTotalsByGroups,
        noLabelsProvided: this.w.axisFlags.noLabelsProvided
      },
      // w.rangeData (future slice)
      rangeData: {
        seriesRangeStart: this.w.rangeData.seriesRangeStart,
        seriesRangeEnd: this.w.rangeData.seriesRangeEnd,
        seriesRange: this.w.rangeData.seriesRange
      },
      // w.candleData (future slice)
      candleData: {
        seriesCandleO: this.w.candleData.seriesCandleO,
        seriesCandleH: this.w.candleData.seriesCandleH,
        seriesCandleM: this.w.candleData.seriesCandleM,
        seriesCandleL: this.w.candleData.seriesCandleL,
        seriesCandleC: this.w.candleData.seriesCandleC
      },
      // w.labelData (future slice)
      labelData: {
        labels: this.w.labelData.labels,
        categoryLabels: this.w.labelData.categoryLabels
      },
      // w.axisFlags (future slice)
      axisFlags: {
        isXNumeric: this.w.axisFlags.isXNumeric,
        dataFormatXNumeric: this.w.axisFlags.dataFormatXNumeric,
        isDataXYZ: this.w.axisFlags.isDataXYZ,
        isRangeData: this.w.axisFlags.isRangeData,
        isRangeBar: this.w.axisFlags.isRangeBar,
        isMultiLineX: this.w.axisFlags.isMultiLineX,
        dataWasParsed: this.w.axisFlags.dataWasParsed,
        hasXaxisGroups: this.w.labelData.hasXaxisGroups,
        groups: this.w.labelData.groups,
        seriesGroups: this.w.labelData.seriesGroups
      }
    };
  }
  excludeCollapsedSeriesInYAxis() {
    const t = this.w, e = [];
    t.globals.seriesYAxisMap.forEach((s, i) => {
      let a = 0;
      s.forEach((o) => {
        t.globals.collapsedSeriesIndices.indexOf(o) !== -1 && a++;
      }), a > 0 && a == s.length && e.push(i);
    }), t.globals.ignoreYAxisIndexes = e.map((s) => s);
  }
}
class me {
  /**
   * Invalidate all caches
   * @param {Object} w - ApexCharts globals object
   */
  static invalidateAll(t) {
    !t || !t.globals || (t.globals.cachedSelectors && (t.globals.cachedSelectors = {}), t.globals.domCache && t.globals.domCache.clear(), t.globals.dimensionCache = {});
  }
  /**
   * Invalidate dimension cache only
   * @param {Object} w - ApexCharts globals object
   */
  static invalidateDimensions(t) {
    !t || !t.globals || (t.globals.dimensionCache = {});
  }
  /**
   * Invalidate selector cache only
   * @param {Object} w - ApexCharts globals object
   */
  static invalidateSelectors(t) {
    !t || !t.globals || t.globals.cachedSelectors && (t.globals.cachedSelectors = {});
  }
  /**
   * Get cached selector result or compute and cache it
   * @param {Object} w - ApexCharts globals object
   * @param {string} key - Cache key
   * @param {Function} queryFn - Function to execute if not cached
   * @returns {*} Cached or newly computed result
   */
  static getCachedSelector(t, e, s) {
    return !t || !t.globals ? s() : (t.globals.cachedSelectors || (t.globals.cachedSelectors = {}), t.globals.cachedSelectors[e] || (t.globals.cachedSelectors[e] = s()), t.globals.cachedSelectors[e]);
  }
  /**
   * Get cached dimension or compute and cache it
   * @param {Object} w - ApexCharts globals object
   * @param {string} key - Cache key
   * @param {Function} computeFn - Function to compute dimensions
   * @param {number} maxAge - Maximum cache age in milliseconds (default: 1000ms)
   * @returns {*} Cached or newly computed dimensions
   */
  static getCachedDimension(t, e, s, i = 1e3) {
    if (!t || !t.globals)
      return s();
    t.globals.dimensionCache || (t.globals.dimensionCache = {});
    const a = t.globals.dimensionCache[e], o = Date.now();
    if (a && a.lastUpdate && o - a.lastUpdate < i)
      return a.value;
    const r = s();
    return t.globals.dimensionCache[e] = {
      value: r,
      lastUpdate: o
    }, r;
  }
  /**
   * Cache a DOM element reference
   * @param {Object} w - ApexCharts globals object
   * @param {string} key - Cache key
   * @param {Element} element - DOM element to cache
   */
  static cacheDOMElement(t, e, s) {
    !t || !t.globals || (t.globals.domCache || (t.globals.domCache = /* @__PURE__ */ new Map()), t.globals.domCache.set(e, s));
  }
  /**
   * Get cached DOM element
   * @param {Object} w - ApexCharts globals object
   * @param {string} key - Cache key
   * @returns {Element|null} Cached element or null
   */
  static getCachedDOMElement(t, e) {
    return !t || !t.globals || !t.globals.domCache ? null : t.globals.domCache.get(e) || null;
  }
}
class Qe {
  constructor(t, e) {
    this.w = t, this.ctx = e;
  }
  /**
   * private method to update Options.
   *
   * @param {object} options - A new config object can be passed which will be merged with the existing config object
   * @param {boolean} redraw - should redraw from beginning or should use existing paths and redraw from there
   * @param {boolean} animate - should animate or not on updating Options
   * @param {boolean} overwriteInitialConfig - should update the initial config or not
   */
  _updateOptions(t, e = !1, s = !0, i = !0, a = !1) {
    return new Promise((o) => {
      let r = [this.ctx];
      i && (r = this.ctx.getSyncedCharts()), this.w.globals.isExecCalled && (r = [this.ctx], this.w.globals.isExecCalled = !1), r.forEach((n, l) => {
        const c = n.w;
        if (c.globals.shouldAnimate = s, e || (c.globals.resized = !0, c.globals.dataChanged = !0, s && n.series.getPreviousPaths()), t && typeof t == "object" && (n.config = new yt(t), t = V.extendArrayProps(n.config, t, c), n.w.globals.chartID !== this.w.globals.chartID && delete t.series, c.config = L.extend(c.config, t), a && (c.globals.lastXAxis = t.xaxis ? L.clone(t.xaxis) : [], c.globals.lastYAxis = t.yaxis ? L.clone(t.yaxis) : [], c.globals.initialConfig = L.extend({}, c.config), c.globals.initialSeries = L.clone(c.config.series), t.series))) {
          for (let h = 0; h < c.globals.collapsedSeriesIndices.length; h++) {
            const d = c.config.series[c.globals.collapsedSeriesIndices[h]];
            c.globals.collapsedSeries[h].data = c.globals.axisCharts ? d.data.slice() : d;
          }
          for (let h = 0; h < c.globals.ancillaryCollapsedSeriesIndices.length; h++) {
            const d = c.config.series[c.globals.ancillaryCollapsedSeriesIndices[h]];
            c.globals.ancillaryCollapsedSeries[h].data = c.globals.axisCharts ? d.data.slice() : d;
          }
          n.series.emptyCollapsedSeries(c.config.series);
        }
        return n.update(t).then(() => {
          l === r.length - 1 && o(n);
        });
      });
    });
  }
  /**
   * Private method to update Series.
   *
   * @param {array} series - New series which will override the existing
   */
  _updateSeries(t, e, s = !1) {
    return new Promise((i) => {
      const a = this.w;
      a.globals.shouldAnimate = e, a.globals.dataChanged = !0, me.invalidateSelectors(a), e && this.ctx.series.getPreviousPaths(), this.ctx.data.resetParsingFlags();
      const o = this.ctx.data.parseData(t);
      return this.ctx._writeParsedSeriesData(o.seriesData), this.ctx._writeParsedRangeData(o.rangeData), this.ctx._writeParsedCandleData(o.candleData), this.ctx._writeParsedLabelData(o.labelData), this.ctx._writeParsedAxisFlags(o.axisFlags), s && (a.globals.initialConfig.series = L.clone(a.config.series), a.globals.initialSeries = L.clone(a.config.series)), this.ctx.update().then(() => {
        i(this.ctx);
      });
    });
  }
  _extendSeries(t, e) {
    const s = this.w, i = s.config.series[e];
    return O(I({}, s.config.series[e]), {
      name: t.name ? t.name : i == null ? void 0 : i.name,
      color: t.color ? t.color : i == null ? void 0 : i.color,
      type: t.type ? t.type : i == null ? void 0 : i.type,
      group: t.group ? t.group : i == null ? void 0 : i.group,
      hidden: typeof t.hidden < "u" ? t.hidden : i == null ? void 0 : i.hidden,
      data: t.data ? t.data : i == null ? void 0 : i.data,
      zIndex: typeof t.zIndex < "u" ? t.zIndex : e
    });
  }
  toggleDataPointSelection(t, e) {
    const s = this.w;
    let i = null;
    const a = `.apexcharts-series[data\\:realIndex='${t}']`;
    if (s.globals.axisCharts ? i = s.dom.Paper.findOne(
      `${a} path[j='${e}'], ${a} circle[j='${e}'], ${a} rect[j='${e}']`
    ) : typeof e > "u" && (i = s.dom.Paper.findOne(
      `${a} path[j='${t}']`
    ), (s.config.chart.type === "pie" || s.config.chart.type === "polarArea" || s.config.chart.type === "donut") && this.ctx.pie.pieClicked(t)), i)
      new P(this.w).pathMouseDown(i, null);
    else
      return console.warn("toggleDataPointSelection: Element not found"), null;
    return i.node ? i.node : null;
  }
  forceXAxisUpdate(t) {
    const e = this.w;
    return ["min", "max"].forEach((i) => {
      typeof t.xaxis[i] < "u" && (e.config.xaxis[i] = t.xaxis[i], e.globals.lastXAxis[i] = t.xaxis[i]);
    }), t.xaxis.categories && t.xaxis.categories.length && (e.config.xaxis.categories = t.xaxis.categories), e.config.xaxis.convertedCatToNumeric && (t = new bt(t).convertCatToNumericXaxis(t, this.ctx)), t;
  }
  forceYAxisUpdate(t) {
    return t.chart && t.chart.stacked && t.chart.stackType === "100%" && (Array.isArray(t.yaxis) ? t.yaxis.forEach((e, s) => {
      t.yaxis[s].min = 0, t.yaxis[s].max = 100;
    }) : (t.yaxis.min = 0, t.yaxis.max = 100)), t;
  }
  /**
   * This function reverts the yaxis and xaxis min/max values to what it was when the chart was defined.
   * This function fixes an important bug where a user might load a new series after zooming in/out of previous series which resulted in wrong min/max
   * Also, this should never be called internally on zoom/pan - the reset should only happen when user calls the updateSeries() function externally
   * The function also accepts an object {xaxis, yaxis} which when present is set as the new xaxis/yaxis
   */
  revertDefaultAxisMinMax(t) {
    const e = this.w;
    let s = e.globals.lastXAxis, i = e.globals.lastYAxis;
    t && t.xaxis && (s = t.xaxis), t && t.yaxis && (i = t.yaxis), e.config.xaxis.min = s.min, e.config.xaxis.max = s.max;
    const a = (o) => {
      typeof i[o] < "u" && (e.config.yaxis[o].min = i[o].min, e.config.yaxis[o].max = i[o].max);
    };
    e.config.yaxis.map((o, r) => {
      e.interact.zoomed || typeof i[r] < "u" ? a(r) : typeof this.ctx.opts.yaxis[r] < "u" && (o.min = this.ctx.opts.yaxis[r].min, o.max = this.ctx.opts.yaxis[r].max);
    });
  }
}
class be {
  constructor(t) {
    this.w = t.w, this.ttCtx = t;
  }
  /**
   ** When hovering over series, you need to capture which series is being hovered on.
   ** This function will return both capturedseries index as well as inner index of that series
   * @memberof Utils
   * @param {object}
   * - hoverArea = the rect on which user hovers
   * - elGrid = dimensions of the hover rect (it can be different than hoverarea)
   */
  getNearestValues({ hoverArea: t, elGrid: e, clientX: s, clientY: i }) {
    const a = this.w, o = e.getBoundingClientRect(), r = o.width, n = o.height;
    let l = r / (a.globals.dataPoints - 1);
    const c = n / a.globals.dataPoints, h = this.hasBars();
    (a.globals.comboCharts || h) && !a.config.xaxis.convertedCatToNumeric && (l = r / a.globals.dataPoints);
    const d = s - o.left - a.globals.barPadForNumericAxis, p = i - o.top;
    d < 0 || p < 0 || d > r || p > n ? (t.classList.remove("hovering-zoom"), t.classList.remove("hovering-pan")) : a.interact.zoomEnabled ? (t.classList.remove("hovering-pan"), t.classList.add("hovering-zoom")) : a.interact.panEnabled && (t.classList.remove("hovering-zoom"), t.classList.add("hovering-pan"));
    let f = Math.round(d / l);
    const x = Math.floor(p / c);
    h && !a.config.xaxis.convertedCatToNumeric && (f = Math.ceil(d / l), f = f - 1);
    let m = null, u = null, y = a.globals.seriesXvalues.map((w) => w.filter((v) => L.isNumber(v)));
    const b = a.globals.seriesYvalues.map((w) => w.filter((v) => L.isNumber(v)));
    if (a.axisFlags.isXNumeric) {
      const v = this.ttCtx.getElGrid().getBoundingClientRect(), C = d * (v.width / r), D = p * (v.height / n);
      u = this.closestInMultiArray(
        C,
        D,
        y,
        b
      ), m = u.index, f = u.j, m !== null && a.globals.hasNullValues && (y = a.globals.seriesXvalues[m], u = this.closestInArray(C, y), f = u.j);
    }
    return a.interact.capturedSeriesIndex = m === null ? -1 : m, (!f || f < 1) && (f = 0), a.globals.isBarHorizontal ? a.interact.capturedDataPointIndex = x : a.interact.capturedDataPointIndex = f, {
      capturedSeries: m,
      j: a.globals.isBarHorizontal ? x : f,
      hoverX: d,
      hoverY: p
    };
  }
  getFirstActiveXArray(t) {
    const e = this.w;
    let s = 0;
    const i = t.map((a, o) => a.length > 0 ? o : -1);
    for (let a = 0; a < i.length; a++)
      if (i[a] !== -1 && e.globals.collapsedSeriesIndices.indexOf(a) === -1 && e.globals.ancillaryCollapsedSeriesIndices.indexOf(a) === -1) {
        s = i[a];
        break;
      }
    return s;
  }
  closestInMultiArray(t, e, s, i) {
    const a = this.w, o = (c) => a.globals.collapsedSeriesIndices.indexOf(c) === -1 && a.globals.ancillaryCollapsedSeriesIndices.indexOf(c) === -1;
    let r = 1 / 0, n = null, l = null;
    for (let c = 0; c < s.length; c++) {
      if (!o(c))
        continue;
      const h = s[c], d = i[c], p = Math.min(h.length, d.length);
      for (let g = 0; g < p; g++) {
        const f = h[g], x = t - f;
        let m = Math.sqrt(x * x);
        if (!a.globals.allSeriesHasEqualX) {
          const u = d[g], y = e - u;
          m = Math.sqrt(x * x + y * y);
        }
        m < r && (r = m, n = c, l = g);
      }
    }
    return {
      index: n,
      j: l
    };
  }
  closestInArray(t, e) {
    const s = e[0];
    let i = null, a = Math.abs(t - s);
    for (let o = 0; o < e.length; o++) {
      const r = Math.abs(t - e[o]);
      r < a && (a = r, i = o);
    }
    return {
      j: i
    };
  }
  /**
   * When there are multiple series, it is possible to have different x values for each series.
   * But it may be possible in those multiple series, that there is same x value for 2 or more
   * series.
   * @memberof Utils
   * @param {int}
   * - j = is the inner index of series -> (series[i][j])
   * @return {bool}
   */
  isXoverlap(t) {
    const e = this.w, s = [], i = e.seriesData.seriesX.filter((a) => typeof a[0] < "u");
    if (i.length > 0)
      for (let a = 0; a < i.length - 1; a++)
        typeof i[a][t] < "u" && typeof i[a + 1][t] < "u" && i[a][t] !== i[a + 1][t] && s.push("unEqual");
    return s.length === 0;
  }
  isInitialSeriesSameLen() {
    var t, e, s;
    let i = !0;
    const a = ((t = this.w.globals.initialSeries) == null ? void 0 : t.filter(
      (o, r) => {
        var n;
        return !((n = this.w.globals.collapsedSeriesIndices) != null && n.includes(r));
      }
    )) || [];
    for (let o = 0; o < a.length - 1; o++) {
      if (!((e = a[o]) != null && e.data) || !((s = a[o + 1]) != null && s.data))
        return !0;
      if (a[o].data.length !== a[o + 1].data.length) {
        i = !1;
        break;
      }
    }
    return i;
  }
  getBarsHeight(t) {
    return [...t].reduce((i, a) => i + a.getBBox().height, 0);
  }
  getElMarkers(t) {
    return typeof t == "number" ? this.w.dom.baseEl.querySelectorAll(
      `.apexcharts-series[data\\:realIndex='${t}'] .apexcharts-series-markers-wrap > *`
    ) : this.w.dom.baseEl.querySelectorAll(
      ".apexcharts-series-markers-wrap > *"
    );
  }
  getAllMarkers(t = !1) {
    let e = this.w.dom.baseEl.querySelectorAll(
      ".apexcharts-series-markers-wrap"
    );
    e = [...e], t && (e = e.filter((i) => {
      const a = Number(i.getAttribute("data:realIndex"));
      return this.w.globals.collapsedSeriesIndices.indexOf(a) === -1;
    })), e.sort((i, a) => {
      var o = Number(i.getAttribute("data:realIndex")), r = Number(a.getAttribute("data:realIndex"));
      return r < o ? 1 : r > o ? -1 : 0;
    });
    const s = [];
    return e.forEach((i) => {
      s.push(i.querySelector(".apexcharts-marker"));
    }), s;
  }
  hasMarkers(t) {
    return this.getElMarkers(t).length > 0;
  }
  getPathFromPoint(t, e) {
    const s = Number(t.getAttribute("cx")), i = Number(t.getAttribute("cy")), a = t.getAttribute("shape");
    return new P(this.w).getMarkerPath(s, i, a, e);
  }
  getElBars() {
    return this.w.dom.baseEl.querySelectorAll(
      ".apexcharts-bar-series,  .apexcharts-candlestick-series, .apexcharts-boxPlot-series, .apexcharts-rangebar-series"
    );
  }
  hasBars() {
    return this.getElBars().length > 0;
  }
  getHoverMarkerSize(t) {
    const e = this.w;
    let s = e.config.markers.hover.size;
    return s === void 0 && (s = e.globals.markers.size[t] + e.config.markers.hover.sizeOffset), s;
  }
  toggleAllTooltipSeriesGroups(t) {
    const e = this.w, s = this.ttCtx;
    s.allTooltipSeriesGroups.length === 0 && (s.allTooltipSeriesGroups = e.dom.baseEl.querySelectorAll(
      ".apexcharts-tooltip-series-group"
    ));
    const i = s.allTooltipSeriesGroups;
    for (let a = 0; a < i.length; a++)
      t === "enable" ? (i[a].classList.add("apexcharts-active"), i[a].style.display = e.config.tooltip.items.display) : (i[a].classList.remove("apexcharts-active"), i[a].style.display = "none");
  }
}
class ts {
  constructor(t) {
    this.w = t.w, this.ttCtx = t, this.tooltipUtil = new be(t);
  }
  drawSeriesTexts({ shared: t = !0, ttItems: e, i: s = 0, j: i = null, y1: a, y2: o, e: r }) {
    const n = this.w;
    n.config.tooltip.custom !== void 0 ? this.handleCustomTooltip({ i: s, j: i, y1: a, y2: o, w: n }) : this.toggleActiveInactiveSeries(t, s);
    const l = this.getValuesToPrint({
      i: s,
      j: i
    });
    this.printLabels({
      i: s,
      j: i,
      values: l,
      ttItems: e,
      shared: t,
      e: r
    });
    const c = this.ttCtx.getElTooltip();
    this.ttCtx.tooltipRect.ttWidth = c.getBoundingClientRect().width, this.ttCtx.tooltipRect.ttHeight = c.getBoundingClientRect().height;
  }
  printLabels({ i: t, j: e, values: s, ttItems: i, shared: a, e: o }) {
    var r;
    const n = this.w;
    let l, c = [];
    const h = (m) => n.seriesData.seriesGoals[m] && n.seriesData.seriesGoals[m][e] && Array.isArray(n.seriesData.seriesGoals[m][e]), { xVal: d, zVal: p, xAxisTTVal: g } = s;
    let f = "", x = n.globals.colors[t];
    e !== null && n.config.plotOptions.bar.distributed && (x = n.globals.colors[e]);
    for (let m = 0, u = n.seriesData.series.length - 1; m < n.seriesData.series.length; m++, u--) {
      let y = this.getFormatters(t);
      f = this.getSeriesName({
        fn: y.yLbTitleFormatter,
        index: t,
        seriesIndex: t,
        j: e
      }), n.config.chart.type === "treemap" && (f = y.yLbTitleFormatter(String(n.config.series[t].data[e].x), {
        series: n.seriesData.series,
        seriesIndex: t,
        dataPointIndex: e,
        w: n
      }));
      const b = n.config.tooltip.inverseOrder ? u : m;
      if (n.globals.axisCharts) {
        const w = (v) => {
          var C, D, S, k;
          return n.axisFlags.isRangeData ? y.yLbFormatter((D = (C = n.rangeData.seriesRangeStart) == null ? void 0 : C[v]) == null ? void 0 : D[e], {
            series: n.rangeData.seriesRangeStart,
            seriesIndex: v,
            dataPointIndex: e,
            w: n
          }) + " - " + y.yLbFormatter((k = (S = n.rangeData.seriesRangeEnd) == null ? void 0 : S[v]) == null ? void 0 : k[e], {
            series: n.rangeData.seriesRangeEnd,
            seriesIndex: v,
            dataPointIndex: e,
            w: n
          }) : y.yLbFormatter(n.seriesData.series[v][e], {
            series: n.seriesData.series,
            seriesIndex: v,
            dataPointIndex: e,
            w: n
          });
        };
        if (a)
          y = this.getFormatters(b), f = this.getSeriesName({
            fn: y.yLbTitleFormatter,
            index: b,
            seriesIndex: t,
            j: e
          }), x = n.globals.colors[b], l = w(b), h(b) && (c = n.seriesData.seriesGoals[b][e].map((v) => ({
            attrs: v,
            val: y.yLbFormatter(v.value, {
              seriesIndex: b,
              dataPointIndex: e,
              w: n
            })
          })));
        else {
          const v = (r = o == null ? void 0 : o.target) == null ? void 0 : r.getAttribute("fill");
          v && (v.indexOf("url") !== -1 ? v.indexOf("Pattern") !== -1 && (x = n.dom.baseEl.querySelector(v.substr(4).slice(0, -1)).childNodes[0].getAttribute("stroke")) : x = v), l = w(t), h(t) && Array.isArray(n.seriesData.seriesGoals[t][e]) && (c = n.seriesData.seriesGoals[t][e].map((C) => ({
            attrs: C,
            val: y.yLbFormatter(C.value, {
              seriesIndex: t,
              dataPointIndex: e,
              w: n
            })
          })));
        }
      }
      e === null && (l = y.yLbFormatter(n.seriesData.series[t], O(I({}, n), {
        seriesIndex: t,
        dataPointIndex: t
      }))), this.DOMHandling({
        i: t,
        t: b,
        j: e,
        ttItems: i,
        values: {
          val: l,
          goalVals: c,
          xVal: d,
          xAxisTTVal: g,
          zVal: p
        },
        seriesName: f,
        shared: a,
        pColor: x
      });
    }
  }
  getFormatters(t) {
    const e = this.w;
    let s = e.formatters.yLabelFormatters[t], i;
    return e.formatters.ttVal !== void 0 ? Array.isArray(e.formatters.ttVal) ? (s = e.formatters.ttVal[t] && e.formatters.ttVal[t].formatter, i = e.formatters.ttVal[t] && e.formatters.ttVal[t].title && e.formatters.ttVal[t].title.formatter) : (s = e.formatters.ttVal.formatter, typeof e.formatters.ttVal.title.formatter == "function" && (i = e.formatters.ttVal.title.formatter)) : i = e.config.tooltip.y.title.formatter, typeof s != "function" && (e.formatters.yLabelFormatters[0] ? s = e.formatters.yLabelFormatters[0] : s = function(a) {
      return a;
    }), typeof i != "function" && (i = function(a) {
      return a ? a + ": " : "";
    }), {
      yLbFormatter: s,
      yLbTitleFormatter: i
    };
  }
  getSeriesName({ fn: t, index: e, seriesIndex: s, j: i }) {
    const a = this.w;
    return t(String(a.seriesData.seriesNames[e]), {
      series: a.seriesData.series,
      seriesIndex: s,
      dataPointIndex: i,
      w: a
    });
  }
  DOMHandling({ t, j: e, ttItems: s, values: i, seriesName: a, shared: o, pColor: r }) {
    const n = this.w, l = this.ttCtx, { val: c, goalVals: h, xVal: d, xAxisTTVal: p, zVal: g } = i;
    let f = null;
    f = s[t].children, n.config.tooltip.fillSeriesColor && (s[t].style.backgroundColor = r, f[0].style.display = "none"), l.showTooltipTitle && (l.tooltipTitle === null && (l.tooltipTitle = n.dom.baseEl.querySelector(
      ".apexcharts-tooltip-title"
    )), l.tooltipTitle.innerHTML = d), l.isXAxisTooltipEnabled && (l.xaxisTooltipText.innerHTML = p !== "" ? p : d);
    const x = s[t].querySelector(
      ".apexcharts-tooltip-text-y-label"
    );
    x && (x.innerHTML = a || "");
    const m = s[t].querySelector(".apexcharts-tooltip-text-y-value");
    m && (m.innerHTML = typeof c < "u" ? c : ""), f[0] && f[0].classList.contains("apexcharts-tooltip-marker") && (n.config.tooltip.marker.fillColors && Array.isArray(n.config.tooltip.marker.fillColors) && (r = n.config.tooltip.marker.fillColors[t]), n.config.tooltip.fillSeriesColor ? f[0].style.backgroundColor = r : f[0].style.color = r), n.config.tooltip.marker.show || (f[0].style.display = "none");
    const u = s[t].querySelector(
      ".apexcharts-tooltip-text-goals-label"
    ), y = s[t].querySelector(
      ".apexcharts-tooltip-text-goals-value"
    );
    if (h.length && n.seriesData.seriesGoals[t]) {
      const b = () => {
        let w = "<div>", v = "<div>";
        h.forEach((C) => {
          w += ` <div style="display: flex"><span class="apexcharts-tooltip-marker" style="background-color: ${C.attrs.strokeColor}; height: 3px; border-radius: 0; top: 5px;"></span> ${C.attrs.name}</div>`, v += `<div>${C.val}</div>`;
        }), u.innerHTML = w + "</div>", y.innerHTML = v + "</div>";
      };
      o ? n.seriesData.seriesGoals[t][e] && Array.isArray(n.seriesData.seriesGoals[t][e]) ? b() : (u.innerHTML = "", y.innerHTML = "") : b();
    } else
      u.innerHTML = "", y.innerHTML = "";
    if (g !== null) {
      const b = s[t].querySelector(
        ".apexcharts-tooltip-text-z-label"
      );
      b.innerHTML = n.config.tooltip.z.title;
      const w = s[t].querySelector(
        ".apexcharts-tooltip-text-z-value"
      );
      w.innerHTML = typeof g < "u" ? g : "";
    }
    if (o && f[0]) {
      if (n.config.tooltip.hideEmptySeries) {
        const b = s[t].querySelector(
          ".apexcharts-tooltip-marker"
        ), w = s[t].querySelector(".apexcharts-tooltip-text");
        parseFloat(c) == 0 ? (b.style.display = "none", w.style.display = "none") : (b.style.display = "block", w.style.display = "block");
      }
      typeof c > "u" || c === null || n.globals.ancillaryCollapsedSeriesIndices.indexOf(t) > -1 || n.globals.collapsedSeriesIndices.indexOf(t) > -1 || Array.isArray(l.tConfig.enabledOnSeries) && l.tConfig.enabledOnSeries.indexOf(t) === -1 ? f[0].parentNode.style.display = "none" : f[0].parentNode.style.display = n.config.tooltip.items.display;
    } else
      Array.isArray(l.tConfig.enabledOnSeries) && l.tConfig.enabledOnSeries.indexOf(t) === -1 && (f[0].parentNode.style.display = "none");
  }
  toggleActiveInactiveSeries(t, e) {
    const s = this.w;
    if (t)
      this.tooltipUtil.toggleAllTooltipSeriesGroups("enable");
    else {
      this.tooltipUtil.toggleAllTooltipSeriesGroups("disable");
      const i = s.dom.baseEl.querySelector(
        `.apexcharts-tooltip-series-group-${e}`
      );
      i && (i.classList.add("apexcharts-active"), i.style.display = s.config.tooltip.items.display);
    }
  }
  getValuesToPrint({ i: t, j: e }) {
    const s = this.w, i = s.seriesData.seriesX.map((d) => d.length > 0 ? d : []);
    let a = "", o = "", r = null, n = null;
    const l = {
      series: s.seriesData.series,
      seriesIndex: t,
      dataPointIndex: e,
      w: s
    }, c = s.formatters.ttZFormatter;
    if (e === null)
      n = s.seriesData.series[t];
    else if (s.axisFlags.isXNumeric && s.config.chart.type !== "treemap") {
      if (a = i[t][e], i[t].length === 0) {
        const d = this.tooltipUtil.getFirstActiveXArray(i);
        a = i[d][e];
      }
    } else
      new Wt(this.w).isFormatXY() ? a = typeof s.config.series[t].data[e] < "u" ? s.config.series[t].data[e].x : "" : a = typeof s.labelData.labels[e] < "u" ? s.labelData.labels[e] : "";
    const h = a;
    return s.axisFlags.isXNumeric && s.config.xaxis.type === "datetime" ? a = new vt(this.w).xLabelFormat(
      s.formatters.ttKeyFormatter,
      h,
      h,
      {
        i: void 0,
        dateFormatter: new q(this.w).formatDate,
        w: this.w
      }
    ) : s.globals.isBarHorizontal ? a = s.formatters.yLabelFormatters[0](h, l) : a = s.formatters.xLabelFormatter(h, l), s.config.tooltip.x.formatter !== void 0 && (a = s.formatters.ttKeyFormatter(h, l)), s.seriesData.seriesZ.length > 0 && s.seriesData.seriesZ[t].length > 0 && (r = c(s.seriesData.seriesZ[t][e], s)), typeof s.config.xaxis.tooltip.formatter == "function" ? o = s.formatters.xaxisTooltipFormatter(
      h,
      l
    ) : o = a, {
      val: Array.isArray(n) ? n.join(" ") : n,
      xVal: Array.isArray(a) ? a.join(" ") : a,
      xAxisTTVal: Array.isArray(o) ? o.join(" ") : o,
      zVal: r
    };
  }
  handleCustomTooltip({ i: t, j: e, y1: s, y2: i, w: a }) {
    const o = this.ttCtx.getElTooltip();
    let r = a.config.tooltip.custom;
    Array.isArray(r) && r[t] && (r = r[t]);
    const n = r({
      series: a.seriesData.series,
      seriesIndex: t,
      dataPointIndex: e,
      y1: s,
      y2: i,
      w: a
    });
    typeof n == "string" || typeof n == "number" ? o.innerHTML = n : (n instanceof Element || typeof n.nodeName == "string") && (o.innerHTML = "", o.appendChild(n.cloneNode(!0)));
  }
}
class ye {
  constructor(t) {
    this.ttCtx = t, this.w = t.w;
  }
  /**
   * This will move the crosshair (the vertical/horz line that moves along with mouse)
   * Along with this, this function also calls the xaxisMove function
   * @memberof Position
   * @param {int} - cx = point's x position, wherever point's x is, you need to move crosshair
   */
  moveXCrosshairs(t, e = null) {
    const s = this.ttCtx, i = this.w, a = s.getElXCrosshairs();
    let o = t - s.xcrosshairsWidth / 2;
    const r = i.labelData.labels.slice().length;
    if (e !== null && (o = i.layout.gridWidth / r * e), a !== null && !i.globals.isBarHorizontal && (a.setAttribute("x", o), a.setAttribute("x1", o), a.setAttribute("x2", o), a.setAttribute("y2", i.layout.gridHeight), a.classList.add("apexcharts-active")), o < 0 && (o = 0), o > i.layout.gridWidth && (o = i.layout.gridWidth), s.isXAxisTooltipEnabled) {
      let n = o;
      (i.config.xaxis.crosshairs.width === "tickWidth" || i.config.xaxis.crosshairs.width === "barWidth") && (n = o + s.xcrosshairsWidth / 2), this.moveXAxisTooltip(n);
    }
  }
  /**
   * This will move the crosshair (the vertical/horz line that moves along with mouse)
   * Along with this, this function also calls the xaxisMove function
   * @memberof Position
   * @param {int} - cx = point's x position, wherever point's x is, you need to move crosshair
   */
  moveYCrosshairs(t) {
    const e = this.ttCtx;
    e.ycrosshairs !== null && P.setAttrs(e.ycrosshairs, {
      y1: t,
      y2: t
    }), e.ycrosshairsHidden !== null && P.setAttrs(e.ycrosshairsHidden, {
      y1: t,
      y2: t
    });
  }
  /**
   ** AxisTooltip is the small rectangle which appears on x axis with x value, when user moves
   * @memberof Position
   * @param {int} - cx = point's x position, wherever point's x is, you need to move
   */
  moveXAxisTooltip(t) {
    const e = this.w, s = this.ttCtx;
    if (s.xaxisTooltip !== null && s.xcrosshairsWidth !== 0) {
      s.xaxisTooltip.classList.add("apexcharts-active");
      const i = s.xaxisOffY + e.config.xaxis.tooltip.offsetY + e.layout.translateY + 1 + e.config.xaxis.offsetY, o = s.xaxisTooltip.getBoundingClientRect().width;
      if (t = t - o / 2, !isNaN(t)) {
        t = t + e.layout.translateX;
        let r = 0;
        r = new P(this.w).getTextRects(s.xaxisTooltipText.innerHTML), s.xaxisTooltipText.style.minWidth = r.width + "px", s.xaxisTooltip.style.left = t + "px", s.xaxisTooltip.style.top = i + "px";
      }
    }
  }
  moveYAxisTooltip(t) {
    const e = this.w, s = this.ttCtx;
    s.yaxisTTEls === null && (s.yaxisTTEls = e.dom.baseEl.querySelectorAll(
      ".apexcharts-yaxistooltip"
    ));
    const i = parseInt(
      s.ycrosshairsHidden.getAttribute("y1"),
      10
    );
    let a = e.layout.translateY + i;
    const o = s.yaxisTTEls[t].getBoundingClientRect(), r = o.height;
    let n = e.globals.translateYAxisX[t] - 2;
    e.config.yaxis[t].opposite && (n = n - o.width), a = a - r / 2, e.globals.ignoreYAxisIndexes.indexOf(t) === -1 && a > 0 && a < e.layout.gridHeight ? (s.yaxisTTEls[t].classList.add("apexcharts-active"), s.yaxisTTEls[t].style.top = a + "px", s.yaxisTTEls[t].style.left = n + e.config.yaxis[t].tooltip.offsetX + "px") : s.yaxisTTEls[t].classList.remove("apexcharts-active");
  }
  /**
   ** moves the whole tooltip by changing x, y attrs
   * @memberof Position
   * @param {int} - cx = point's x position, wherever point's x is, you need to move tooltip
   * @param {int} - cy = point's y position, wherever point's y is, you need to move tooltip
   * @param {int} - markerSize = point's size
   */
  moveTooltip(t, e, s = null) {
    const i = this.w, a = this.ttCtx, o = a.getElTooltip(), r = a.tooltipRect, n = s !== null ? parseFloat(s) : 1;
    let l = parseFloat(t) + n + 5, c = parseFloat(e) + n / 2;
    if (l > i.layout.gridWidth / 2 && (l = l - r.ttWidth - n - 10), l > i.layout.gridWidth - r.ttWidth - 10 && (l = i.layout.gridWidth - r.ttWidth), l < -20 && (l = -20), i.config.tooltip.followCursor) {
      const d = a.getElGrid().getBoundingClientRect();
      l = a.e.clientX - d.left, l > i.layout.gridWidth / 2 && (l = l - a.tooltipRect.ttWidth), c = a.e.clientY + i.layout.translateY - d.top, c > i.layout.gridHeight / 2 && (c = c - a.tooltipRect.ttHeight);
    } else
      i.globals.isBarHorizontal || r.ttHeight / 2 + c > i.layout.gridHeight && (c = i.layout.gridHeight - r.ttHeight + i.layout.translateY);
    isNaN(l) || (l = l + i.layout.translateX, o.style.left = l + "px", o.style.top = c + "px");
  }
  moveMarkers(t, e) {
    const s = this.w, i = this.ttCtx;
    if (s.globals.markers.size[t] > 0) {
      const a = s.dom.baseEl.querySelectorAll(
        ` .apexcharts-series[data\\:realIndex='${t}'] .apexcharts-marker`
      );
      for (let o = 0; o < a.length; o++)
        parseInt(a[o].getAttribute("rel"), 10) === e && (i.marker.resetPointsSize(), i.marker.enlargeCurrentPoint(e, a[o]));
    } else
      i.marker.resetPointsSize(), this.moveDynamicPointOnHover(e, t);
  }
  // This function is used when you need to show markers/points only on hover -
  // DIFFERENT X VALUES in multiple series
  moveDynamicPointOnHover(t, e) {
    var s, i, a, o;
    const r = this.w, n = this.ttCtx;
    let l = 0, c = 0;
    const h = new P(this.w), d = r.globals.pointsArray, p = n.tooltipUtil.getHoverMarkerSize(e), g = r.config.series[e].type;
    if (g && (g === "column" || g === "candlestick" || g === "boxPlot"))
      return;
    l = (i = (s = d[e]) == null ? void 0 : s[t]) == null ? void 0 : i[0], c = ((o = (a = d[e]) == null ? void 0 : a[t]) == null ? void 0 : o[1]) || 0;
    const f = r.dom.baseEl.querySelector(
      `.apexcharts-series[data\\:realIndex='${e}'] .apexcharts-series-markers path`
    );
    if (f && c < r.layout.gridHeight && c > 0) {
      const x = f.getAttribute("shape"), m = h.getMarkerPath(l, c, x, p * 1.5);
      f.setAttribute("d", m);
    }
    this.moveXCrosshairs(l), n.fixedTooltip || this.moveTooltip(l, c, p);
  }
  // This function is used when you need to show markers/points only on hover -
  // SAME X VALUES in multiple series
  moveDynamicPointsOnHover(t) {
    var e;
    const s = this.ttCtx, i = s.w;
    let a = 0, o = 0, r = 0;
    const n = i.globals.pointsArray, l = new U(this.w), c = new P(this.w);
    r = l.getActiveConfigSeriesIndex("asc", [
      "line",
      "area",
      "scatter",
      "bubble"
    ]);
    const h = s.tooltipUtil.getHoverMarkerSize(r);
    if ((e = n[r]) != null && e[t] && (a = n[r][t][0], o = n[r][t][1]), isNaN(a))
      return;
    const d = s.tooltipUtil.getAllMarkers();
    if (d.length)
      for (let p = 0; p < i.seriesData.series.length; p++) {
        const g = n[p];
        if (i.globals.comboCharts && typeof g > "u" && d.splice(p, 0, null), g && g.length) {
          let f = n[p][t][1], x;
          d[p].setAttribute("cx", a);
          const m = d[p].getAttribute("shape");
          if (i.config.chart.type === "rangeArea" && !i.globals.comboCharts) {
            const u = t + i.seriesData.series[p].length;
            x = n[p][u][1];
            const y = Math.abs(f - x) / 2;
            f = f - y;
          }
          if (f !== null && !isNaN(f) && f < i.layout.gridHeight + h && f + h > 0) {
            const u = c.getMarkerPath(a, f, m, h);
            d[p].setAttribute("d", u);
          } else
            d[p].setAttribute("d", "");
        }
      }
    this.moveXCrosshairs(a), s.fixedTooltip || this.moveTooltip(a, o || i.layout.gridHeight, h);
  }
  moveStickyTooltipOverBars(t, e) {
    const s = this.w, i = this.ttCtx;
    let a = s.globals.columnSeries ? s.globals.columnSeries.length : s.seriesData.series.length;
    s.config.chart.stacked && (a = s.globals.barGroups.length);
    let o = a >= 2 && a % 2 === 0 ? Math.floor(a / 2) : Math.floor(a / 2) + 1;
    s.globals.isBarHorizontal && (o = new U(this.w).getActiveConfigSeriesIndex("desc") + 1);
    let r = s.dom.baseEl.querySelector(
      `.apexcharts-bar-series .apexcharts-series[rel='${o}'] path[j='${t}'], .apexcharts-candlestick-series .apexcharts-series[rel='${o}'] path[j='${t}'], .apexcharts-boxPlot-series .apexcharts-series[rel='${o}'] path[j='${t}'], .apexcharts-rangebar-series .apexcharts-series[rel='${o}'] path[j='${t}']`
    );
    !r && typeof e == "number" && (r = s.dom.baseEl.querySelector(
      `.apexcharts-bar-series .apexcharts-series[data\\:realIndex='${e}'] path[j='${t}'],
        .apexcharts-candlestick-series .apexcharts-series[data\\:realIndex='${e}'] path[j='${t}'],
        .apexcharts-boxPlot-series .apexcharts-series[data\\:realIndex='${e}'] path[j='${t}'],
        .apexcharts-rangebar-series .apexcharts-series[data\\:realIndex='${e}'] path[j='${t}']`
    ));
    let n = r ? parseFloat(r.getAttribute("cx")) : 0, l = r ? parseFloat(r.getAttribute("cy")) : 0;
    const c = r ? parseFloat(r.getAttribute("barWidth")) : 0, d = i.getElGrid().getBoundingClientRect(), p = r && (r.classList.contains("apexcharts-candlestick-area") || r.classList.contains("apexcharts-boxPlot-area"));
    s.axisFlags.isXNumeric ? (r && !p && (n = n - (a % 2 !== 0 ? c / 2 : 0)), r && // fixes apexcharts.js#2354
    p && (n = n - c / 2)) : s.globals.isBarHorizontal || (n = i.xAxisTicksPositions[t - 1] + i.dataPointsDividedWidth / 2, isNaN(n) && (n = i.xAxisTicksPositions[t] - i.dataPointsDividedWidth / 2)), s.globals.isBarHorizontal ? l = l - i.tooltipRect.ttHeight : s.config.tooltip.followCursor ? l = i.e.clientY - d.top - i.tooltipRect.ttHeight / 2 : l + i.tooltipRect.ttHeight + 15 > s.layout.gridHeight && (l = s.layout.gridHeight), s.globals.isBarHorizontal || this.moveXCrosshairs(n), i.fixedTooltip || this.moveTooltip(n, l || s.layout.gridHeight);
  }
}
class es {
  constructor(t) {
    this.w = t.w, this.ttCtx = t, this.ctx = t.ctx, this.tooltipPosition = new ye(t);
  }
  drawDynamicPoints() {
    const t = this.w, e = new P(this.w), s = new xt(this.w, this.ctx);
    let i = t.dom.baseEl.querySelectorAll(".apexcharts-series");
    i = [...i], t.config.chart.stacked && i.sort((a, o) => parseFloat(a.getAttribute("data:realIndex")) - parseFloat(o.getAttribute("data:realIndex")));
    for (let a = 0; a < i.length; a++) {
      const o = i[a].querySelector(
        ".apexcharts-series-markers-wrap"
      );
      if (o !== null) {
        let r = `apexcharts-marker w${(Math.random() + 1).toString(36).substring(4)}`;
        (t.config.chart.type === "line" || t.config.chart.type === "area") && !t.globals.comboCharts && !t.config.tooltip.intersect && (r += " no-pointer-events");
        const n = s.getMarkerConfig({
          cssClass: r,
          seriesIndex: Number(o.getAttribute("data:realIndex"))
          // fixes apexcharts/apexcharts.js #1427
        }), l = e.drawMarker(0, 0, n);
        l.node.setAttribute("default-marker-size", 0);
        const c = N.createElementNS(G, "g");
        c.classList.add("apexcharts-series-markers"), c.appendChild(l.node), o.appendChild(c);
      }
    }
  }
  enlargeCurrentPoint(t, e, s = null, i = null) {
    const a = this.w;
    a.config.chart.type !== "bubble" && this.newPointSize(t, e);
    let o = e.getAttribute("cx"), r = e.getAttribute("cy");
    if (s !== null && i !== null && (o = s, r = i), this.tooltipPosition.moveXCrosshairs(o), !this.fixedTooltip) {
      if (a.config.chart.type === "radar") {
        const l = this.ttCtx.getElGrid().getBoundingClientRect();
        o = this.ttCtx.e.clientX - l.left;
      }
      this.tooltipPosition.moveTooltip(o, r, a.config.markers.hover.size);
    }
  }
  enlargePoints(t) {
    const e = this.w, s = this, i = this.ttCtx, a = t, o = e.dom.baseEl.querySelectorAll(
      ".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"
    );
    let r = e.config.markers.hover.size;
    for (let n = 0; n < o.length; n++) {
      const l = o[n].getAttribute("rel"), c = o[n].getAttribute("index");
      if (r === void 0 && (r = e.globals.markers.size[c] + e.config.markers.hover.sizeOffset), a === parseInt(l, 10)) {
        s.newPointSize(a, o[n]);
        const h = o[n].getAttribute("cx"), d = o[n].getAttribute("cy");
        s.tooltipPosition.moveXCrosshairs(h), i.fixedTooltip || s.tooltipPosition.moveTooltip(h, d, r);
      } else
        s.oldPointSize(o[n]);
    }
  }
  newPointSize(t, e) {
    const s = this.w;
    let i = s.config.markers.hover.size;
    const a = t === 0 ? e.parentNode.firstChild : e.parentNode.lastChild;
    if (a.getAttribute("default-marker-size") !== "0") {
      const o = parseInt(a.getAttribute("index"), 10);
      i === void 0 && (i = s.globals.markers.size[o] + s.config.markers.hover.sizeOffset), i < 0 && (i = 0);
      const r = this.ttCtx.tooltipUtil.getPathFromPoint(e, i);
      e.setAttribute("d", r);
    }
  }
  oldPointSize(t) {
    const e = parseFloat(t.getAttribute("default-marker-size")), s = this.ttCtx.tooltipUtil.getPathFromPoint(t, e);
    t.setAttribute("d", s);
  }
  resetPointsSize() {
    const e = this.w.dom.baseEl.querySelectorAll(
      ".apexcharts-series:not(.apexcharts-series-collapsed) .apexcharts-marker"
    );
    for (let s = 0; s < e.length; s++) {
      const i = parseFloat(e[s].getAttribute("default-marker-size"));
      if (L.isNumber(i) && i > 0) {
        const a = this.ttCtx.tooltipUtil.getPathFromPoint(e[s], i);
        e[s].setAttribute("d", a);
      } else
        e[s].setAttribute("d", "M0,0");
    }
  }
}
class ss {
  constructor(t) {
    this.w = t.w;
    const e = this.w;
    this.ttCtx = t, this.isVerticalGroupedRangeBar = !e.globals.isBarHorizontal && e.config.chart.type === "rangeBar" && e.config.plotOptions.bar.rangeBarGroupRows;
  }
  // a helper function to get an element's attribute value
  getAttr(t, e) {
    return parseFloat(t.target.getAttribute(e));
  }
  // handle tooltip for heatmaps and treemaps
  handleHeatTreeTooltip({ e: t, opt: e, x: s, y: i, type: a }) {
    const o = this.ttCtx, r = this.w;
    if (t.target.classList.contains(`apexcharts-${a}-rect`)) {
      const n = this.getAttr(t, "i"), l = this.getAttr(t, "j"), c = this.getAttr(t, "cx"), h = this.getAttr(t, "cy"), d = this.getAttr(t, "width"), p = this.getAttr(t, "height");
      if (o.tooltipLabels.drawSeriesTexts({
        ttItems: e.ttItems,
        i: n,
        j: l,
        shared: !1,
        e: t
      }), r.interact.capturedSeriesIndex = n, r.interact.capturedDataPointIndex = l, s = c + o.tooltipRect.ttWidth / 2 + d, i = h + o.tooltipRect.ttHeight / 2 - p / 2, o.tooltipPosition.moveXCrosshairs(c + d / 2), s > r.layout.gridWidth / 2 && (s = c - o.tooltipRect.ttWidth / 2 + d), o.w.config.tooltip.followCursor) {
        const g = r.dom.elWrap.getBoundingClientRect();
        s = r.interact.clientX - g.left - (s > r.layout.gridWidth / 2 ? o.tooltipRect.ttWidth : 0), i = r.interact.clientY - g.top - (i > r.layout.gridHeight / 2 ? o.tooltipRect.ttHeight : 0);
      }
    }
    return {
      x: s,
      y: i
    };
  }
  /**
   * handle tooltips for line/area/scatter charts where tooltip.intersect is true
   * when user hovers over the marker directly, this function is executed
   */
  handleMarkerTooltip({ e: t, opt: e, x: s, y: i }) {
    const a = this.w, o = this.ttCtx;
    let r, n;
    if (t.target.classList.contains("apexcharts-marker")) {
      const l = parseInt(e.paths.getAttribute("cx"), 10), c = parseInt(e.paths.getAttribute("cy"), 10), h = parseFloat(e.paths.getAttribute("val"));
      if (n = parseInt(e.paths.getAttribute("rel"), 10), r = parseInt(
        e.paths.parentNode.parentNode.parentNode.getAttribute("rel"),
        10
      ) - 1, o.intersect) {
        const d = L.findAncestor(e.paths, "apexcharts-series");
        d && (r = parseInt(d.getAttribute("data:realIndex"), 10));
      }
      if (o.tooltipLabels.drawSeriesTexts({
        ttItems: e.ttItems,
        i: r,
        j: n,
        shared: o.showOnIntersect ? !1 : a.config.tooltip.shared,
        e: t
      }), t.type === "mouseup" && o.markerClick(t, r, n), a.interact.capturedSeriesIndex = r, a.interact.capturedDataPointIndex = n, s = l, i = c + a.layout.translateY - o.tooltipRect.ttHeight * 1.4, o.w.config.tooltip.followCursor) {
        const p = o.getElGrid().getBoundingClientRect();
        i = o.e.clientY + a.layout.translateY - p.top;
      }
      h < 0 && (i = c), o.marker.enlargeCurrentPoint(n, e.paths, s, i);
    }
    return {
      x: s,
      y: i
    };
  }
  /**
   * handle tooltips for bar/column charts
   */
  handleBarTooltip({ e: t, opt: e }) {
    const s = this.w, i = this.ttCtx, a = i.getElTooltip();
    let o = 0, r = 0, n = 0, l = 0, c;
    const h = this.getBarTooltipXY({
      e: t,
      opt: e
    });
    if (h.j === null && h.barHeight === 0 && h.barWidth === 0)
      return;
    l = h.i;
    const d = h.j;
    if (s.interact.capturedSeriesIndex = l, s.interact.capturedDataPointIndex = d, s.globals.isBarHorizontal && i.tooltipUtil.hasBars() || !s.config.tooltip.shared ? (r = h.x, n = h.y, c = Array.isArray(s.config.stroke.width) ? s.config.stroke.width[l] : s.config.stroke.width, o = r) : !s.globals.comboCharts && !s.config.tooltip.shared && (o = o / 2), isNaN(n) && (n = s.globals.svgHeight - i.tooltipRect.ttHeight), r + i.tooltipRect.ttWidth > s.layout.gridWidth ? r = r - i.tooltipRect.ttWidth : r < 0 && (r = 0), i.w.config.tooltip.followCursor) {
      const g = i.getElGrid().getBoundingClientRect();
      n = i.e.clientY - g.top;
    }
    i.tooltip === null && (i.tooltip = s.dom.baseEl.querySelector(".apexcharts-tooltip")), s.config.tooltip.shared || (s.globals.comboBarCount > 0 ? i.tooltipPosition.moveXCrosshairs(o + c / 2) : i.tooltipPosition.moveXCrosshairs(o)), !i.fixedTooltip && (!s.config.tooltip.shared || s.globals.isBarHorizontal && i.tooltipUtil.hasBars()) && (n = n + s.layout.translateY - i.tooltipRect.ttHeight / 2, a.style.left = r + s.layout.translateX + "px", a.style.top = n + "px");
  }
  getBarTooltipXY({ e: t, opt: e }) {
    const s = this.w;
    let i = null;
    const a = this.ttCtx;
    let o = 0, r = 0, n = 0, l = 0, c = 0;
    const h = t.target.classList;
    if (h.contains("apexcharts-bar-area") || h.contains("apexcharts-candlestick-area") || h.contains("apexcharts-boxPlot-area") || h.contains("apexcharts-rangebar-area")) {
      const d = t.target, p = d.getBoundingClientRect(), g = e.elGrid.getBoundingClientRect(), f = p.height;
      c = p.height;
      const x = p.width, m = parseInt(d.getAttribute("cx"), 10), u = parseInt(d.getAttribute("cy"), 10);
      l = parseFloat(d.getAttribute("barWidth"));
      const y = t.type === "touchmove" ? t.touches[0].clientX : t.clientX;
      i = parseInt(d.getAttribute("j"), 10), o = parseInt(d.parentNode.getAttribute("rel"), 10) - 1;
      const b = d.getAttribute("data-range-y1"), w = d.getAttribute("data-range-y2");
      s.globals.comboCharts && (o = parseInt(d.parentNode.getAttribute("data:realIndex"), 10));
      const v = (D) => (s.axisFlags.isXNumeric ? D = m - x / 2 : this.isVerticalGroupedRangeBar ? D = m + x / 2 : D = m - a.dataPointsDividedWidth + x / 2, D), C = () => u - a.dataPointsDividedHeight + f / 2 - a.tooltipRect.ttHeight / 2;
      a.tooltipLabels.drawSeriesTexts({
        ttItems: e.ttItems,
        i: o,
        j: i,
        y1: b ? parseInt(b, 10) : null,
        y2: w ? parseInt(w, 10) : null,
        shared: a.showOnIntersect ? !1 : s.config.tooltip.shared,
        e: t
      }), s.config.tooltip.followCursor ? s.globals.isBarHorizontal ? (r = y - g.left + 15, n = C()) : (r = v(r), n = t.clientY - g.top - a.tooltipRect.ttHeight / 2 - 15) : s.globals.isBarHorizontal ? (r = m, r < a.xyRatios.baseLineInvertedY && (r = m - a.tooltipRect.ttWidth), n = C()) : (r = v(r), n = u);
    }
    return {
      x: r,
      y: n,
      barHeight: c,
      barWidth: l,
      i: o,
      j: i
    };
  }
}
class is {
  constructor(t) {
    this.w = t.w, this.ttCtx = t;
  }
  /**
   * This method adds the secondary tooltip which appears below x axis
   * @memberof Tooltip
   **/
  drawXaxisTooltip() {
    const t = this.w, e = this.ttCtx, s = t.config.xaxis.position === "bottom";
    e.xaxisOffY = s ? t.layout.gridHeight + 1 : -t.layout.xAxisHeight - t.config.xaxis.axisTicks.height + 3;
    const i = s ? "apexcharts-xaxistooltip apexcharts-xaxistooltip-bottom" : "apexcharts-xaxistooltip apexcharts-xaxistooltip-top", a = t.dom.elWrap;
    e.isXAxisTooltipEnabled && t.dom.baseEl.querySelector(
      ".apexcharts-xaxistooltip"
    ) === null && (e.xaxisTooltip = N.createElementNS("http://www.w3.org/1999/xhtml", "div"), e.xaxisTooltip.setAttribute(
      "class",
      i + " apexcharts-theme-" + t.config.tooltip.theme
    ), a.appendChild(e.xaxisTooltip), e.xaxisTooltipText = N.createElementNS("http://www.w3.org/1999/xhtml", "div"), e.xaxisTooltipText.classList.add("apexcharts-xaxistooltip-text"), e.xaxisTooltipText.style.fontFamily = t.config.xaxis.tooltip.style.fontFamily || t.config.chart.fontFamily, e.xaxisTooltipText.style.fontSize = t.config.xaxis.tooltip.style.fontSize, e.xaxisTooltip.appendChild(e.xaxisTooltipText));
  }
  /**
   * This method adds the secondary tooltip which appears below x axis
   * @memberof Tooltip
   **/
  drawYaxisTooltip() {
    const t = this.w, e = this.ttCtx;
    for (let s = 0; s < t.config.yaxis.length; s++) {
      const i = t.config.yaxis[s].opposite || t.config.yaxis[s].crosshairs.opposite;
      e.yaxisOffX = i ? t.layout.gridWidth + 1 : 1;
      const a = i ? `apexcharts-yaxistooltip apexcharts-yaxistooltip-${s} apexcharts-yaxistooltip-right` : `apexcharts-yaxistooltip apexcharts-yaxistooltip-${s} apexcharts-yaxistooltip-left`, o = t.dom.elWrap;
      t.dom.baseEl.querySelector(
        `.apexcharts-yaxistooltip apexcharts-yaxistooltip-${s}`
      ) === null && (e.yaxisTooltip = N.createElementNS("http://www.w3.org/1999/xhtml", "div"), e.yaxisTooltip.setAttribute(
        "class",
        a + " apexcharts-theme-" + t.config.tooltip.theme
      ), o.appendChild(e.yaxisTooltip), s === 0 && (e.yaxisTooltipText = []), e.yaxisTooltipText[s] = N.createElementNS("http://www.w3.org/1999/xhtml", "div"), e.yaxisTooltipText[s].classList.add("apexcharts-yaxistooltip-text"), e.yaxisTooltip.appendChild(e.yaxisTooltipText[s]));
    }
  }
  /**
   * @memberof Tooltip
   **/
  setXCrosshairWidth() {
    const t = this.w, e = this.ttCtx, s = e.getElXCrosshairs();
    if (e.xcrosshairsWidth = parseInt(t.config.xaxis.crosshairs.width, 10), t.globals.comboCharts) {
      const i = t.dom.baseEl.querySelector(".apexcharts-bar-area");
      if (i !== null && t.config.xaxis.crosshairs.width === "barWidth") {
        const a = parseFloat(i.getAttribute("barWidth"));
        e.xcrosshairsWidth = a;
      } else if (t.config.xaxis.crosshairs.width === "tickWidth") {
        const a = t.labelData.labels.length;
        e.xcrosshairsWidth = t.layout.gridWidth / a;
      }
    } else if (t.config.xaxis.crosshairs.width === "tickWidth") {
      const i = t.labelData.labels.length;
      e.xcrosshairsWidth = t.layout.gridWidth / i;
    } else if (t.config.xaxis.crosshairs.width === "barWidth") {
      const i = t.dom.baseEl.querySelector(".apexcharts-bar-area");
      if (i !== null) {
        const a = parseFloat(i.getAttribute("barWidth"));
        e.xcrosshairsWidth = a;
      } else
        e.xcrosshairsWidth = 1;
    }
    t.globals.isBarHorizontal && (e.xcrosshairsWidth = 0), s !== null && e.xcrosshairsWidth > 0 && s.setAttribute("width", e.xcrosshairsWidth);
  }
  handleYCrosshair() {
    const t = this.w, e = this.ttCtx;
    e.ycrosshairs = t.dom.baseEl.querySelector(
      ".apexcharts-ycrosshairs"
    ), e.ycrosshairsHidden = t.dom.baseEl.querySelector(
      ".apexcharts-ycrosshairs-hidden"
    );
  }
  drawYaxisTooltipText(t, e, s) {
    const i = this.ttCtx, a = this.w, o = a.globals, r = o.seriesYAxisMap[t];
    if (i.yaxisTooltips[t] && r.length > 0) {
      const n = a.formatters.yLabelFormatters[t], c = i.getElGrid().getBoundingClientRect(), h = r[0];
      let d = 0;
      s.yRatio.length > 1 && (d = h);
      const p = (e - c.top) * s.yRatio[d], g = o.maxYArr[h] - o.minYArr[h];
      let f = o.minYArr[h] + (g - p);
      a.config.yaxis[t].reversed && (f = o.maxYArr[h] - (g - p)), i.tooltipPosition.moveYCrosshairs(e - c.top), i.yaxisTooltipText[t].innerHTML = n(f), i.tooltipPosition.moveYAxisTooltip(t);
    }
  }
}
class as {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.tConfig = t.config.tooltip, this.tooltipUtil = new be(this), this.tooltipLabels = new ts(this), this.tooltipPosition = new ye(this), this.marker = new es(this), this.intersect = new ss(this), this.axesTooltip = new is(this), this.showOnIntersect = this.tConfig.intersect, this.showTooltipTitle = this.tConfig.x.show, this.fixedTooltip = this.tConfig.fixed.enabled, this.xaxisTooltip = null, this.yaxisTTEls = null, this.isBarShared = !t.globals.isBarHorizontal && this.tConfig.shared, this.lastHoverTime = Date.now(), this.dimensionUpdateScheduled = !1;
  }
  setupDimensionCache() {
    const t = this.w, e = this.getElTooltip();
    e && (this.updateDimensionCache(), typeof ResizeObserver < "u" && !t.globals.resizeObserver && (t.globals.resizeObserver = new ResizeObserver(() => {
      this.dimensionUpdateScheduled || (this.dimensionUpdateScheduled = !0, requestAnimationFrame(() => {
        this.updateDimensionCache(), this.dimensionUpdateScheduled = !1;
      }));
    }), t.globals.resizeObserver.observe(e)));
  }
  updateDimensionCache() {
    const t = this.w, e = this.getElTooltip();
    if (!e)
      return;
    const s = e.getBoundingClientRect();
    t.globals.dimensionCache.tooltip = {
      width: s.width,
      height: s.height,
      lastUpdate: Date.now()
    };
  }
  getCachedDimensions() {
    const t = this.w;
    if (t.globals.dimensionCache.tooltip) {
      const s = t.globals.dimensionCache.tooltip;
      if (Date.now() - s.lastUpdate < 1e3)
        return {
          ttWidth: s.width,
          ttHeight: s.height
        };
    }
    this.updateDimensionCache();
    const e = t.globals.dimensionCache.tooltip;
    return e ? {
      ttWidth: e.width,
      ttHeight: e.height
    } : { ttWidth: 0, ttHeight: 0 };
  }
  getElTooltip(t) {
    return t || (t = this), t.w.dom.baseEl ? t.w.dom.baseEl.querySelector(".apexcharts-tooltip") : null;
  }
  getElXCrosshairs() {
    return this.w.dom.baseEl.querySelector(".apexcharts-xcrosshairs");
  }
  getElGrid() {
    return this.w.dom.baseEl.querySelector(".apexcharts-grid");
  }
  drawTooltip(t) {
    const e = this.w;
    this.xyRatios = t, this.isXAxisTooltipEnabled = e.config.xaxis.tooltip.enabled && e.globals.axisCharts, this.yaxisTooltips = e.config.yaxis.map((a) => !!(a.show && a.tooltip.enabled && e.globals.axisCharts)), this.allTooltipSeriesGroups = [], e.globals.axisCharts || (this.showTooltipTitle = !1);
    const s = N.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    );
    if (s.classList.add("apexcharts-tooltip"), e.config.tooltip.cssClass && s.classList.add(e.config.tooltip.cssClass), s.classList.add(`apexcharts-theme-${this.tConfig.theme || "light"}`), e.config.chart.accessibility.enabled && e.config.chart.accessibility.announcements.enabled && (s.setAttribute("role", "tooltip"), s.setAttribute("aria-live", "polite"), s.setAttribute("aria-atomic", "true"), s.setAttribute("aria-hidden", "true")), e.dom.elWrap.appendChild(s), e.globals.axisCharts) {
      this.axesTooltip.drawXaxisTooltip(), this.axesTooltip.drawYaxisTooltip(), this.axesTooltip.setXCrosshairWidth(), this.axesTooltip.handleYCrosshair();
      const a = new wt(this.w, this.ctx);
      this.xAxisTicksPositions = a.getXAxisTicksPositions();
    }
    if ((e.globals.comboCharts || this.tConfig.intersect || e.config.chart.type === "rangeBar") && !this.tConfig.shared && (this.showOnIntersect = !0), (e.config.markers.size === 0 || e.globals.markers.largestSize === 0) && this.marker.drawDynamicPoints(this), e.globals.collapsedSeries.length === e.seriesData.series.length)
      return;
    this.dataPointsDividedHeight = e.layout.gridHeight / e.globals.dataPoints, this.dataPointsDividedWidth = e.layout.gridWidth / e.globals.dataPoints, this.showTooltipTitle && (this.tooltipTitle = N.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "div"
    ), this.tooltipTitle.classList.add("apexcharts-tooltip-title"), this.tooltipTitle.style.fontFamily = this.tConfig.style.fontFamily || e.config.chart.fontFamily, this.tooltipTitle.style.fontSize = this.tConfig.style.fontSize, s.appendChild(this.tooltipTitle));
    let i = e.seriesData.series.length;
    (e.globals.xyCharts || e.globals.comboCharts) && this.tConfig.shared && (this.showOnIntersect ? i = 1 : i = e.seriesData.series.length), this.legendLabels = e.dom.baseEl.querySelectorAll(
      ".apexcharts-legend-text"
    ), this.ttItems = this.createTTElements(i), this.addSVGEvents(), this.setupDimensionCache();
  }
  createTTElements(t) {
    const e = this.w, s = [], i = this.getElTooltip();
    for (let a = 0; a < t; a++) {
      const o = N.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "div"
      );
      o.classList.add(
        "apexcharts-tooltip-series-group",
        `apexcharts-tooltip-series-group-${a}`
      ), o.style.order = e.config.tooltip.inverseOrder ? t - a : a + 1;
      const r = N.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "span"
      );
      r.classList.add("apexcharts-tooltip-marker"), e.config.tooltip.fillSeriesColor ? r.style.backgroundColor = e.globals.colors[a] : r.style.color = e.globals.colors[a];
      const n = e.config.markers.shape;
      let l = n;
      Array.isArray(n) && (l = n[a]), r.setAttribute("shape", l), o.appendChild(r);
      const c = N.createElementNS(
        "http://www.w3.org/1999/xhtml",
        "div"
      );
      c.classList.add("apexcharts-tooltip-text"), c.style.fontFamily = this.tConfig.style.fontFamily || e.config.chart.fontFamily, c.style.fontSize = this.tConfig.style.fontSize, ["y", "goals", "z"].forEach((h) => {
        const d = N.createElementNS(
          "http://www.w3.org/1999/xhtml",
          "div"
        );
        d.classList.add(`apexcharts-tooltip-${h}-group`);
        const p = N.createElementNS(
          "http://www.w3.org/1999/xhtml",
          "span"
        );
        p.classList.add(`apexcharts-tooltip-text-${h}-label`), d.appendChild(p);
        const g = N.createElementNS(
          "http://www.w3.org/1999/xhtml",
          "span"
        );
        g.classList.add(`apexcharts-tooltip-text-${h}-value`), d.appendChild(g), c.appendChild(d);
      }), o.appendChild(c), i.appendChild(o), s.push(o);
    }
    return s;
  }
  addSVGEvents() {
    const t = this.w, e = t.config.chart.type, s = this.getElTooltip(), i = e === "bar" || e === "candlestick" || e === "boxPlot" || e === "rangeBar", a = e === "area" || e === "line" || e === "scatter" || e === "bubble" || e === "radar", o = t.dom.Paper.node, r = this.getElGrid();
    r && (this.seriesBound = r.getBoundingClientRect());
    const n = [], l = [], c = {
      hoverArea: o,
      elGrid: r,
      tooltipEl: s,
      tooltipY: n,
      tooltipX: l,
      ttItems: this.ttItems
    };
    let h;
    if (t.globals.axisCharts && (a ? h = t.dom.baseEl.querySelectorAll(
      ".apexcharts-series[data\\:longestSeries='true'] .apexcharts-marker"
    ) : i ? h = t.dom.baseEl.querySelectorAll(
      ".apexcharts-series .apexcharts-bar-area, .apexcharts-series .apexcharts-candlestick-area, .apexcharts-series .apexcharts-boxPlot-area, .apexcharts-series .apexcharts-rangebar-area"
    ) : (e === "heatmap" || e === "treemap") && (h = t.dom.baseEl.querySelectorAll(
      ".apexcharts-series .apexcharts-heatmap, .apexcharts-series .apexcharts-treemap"
    )), h && h.length))
      for (let p = 0; p < h.length; p++)
        n.push(h[p].getAttribute("cy")), l.push(h[p].getAttribute("cx"));
    if (t.globals.xyCharts && !this.showOnIntersect || t.globals.comboCharts && !this.showOnIntersect || i && this.tooltipUtil.hasBars() && this.tConfig.shared)
      this.addPathsEventListeners([o], c);
    else if (i && !t.globals.comboCharts || a && this.showOnIntersect)
      this.addDatapointEventsListeners(c);
    else if (!t.globals.axisCharts || e === "heatmap" || e === "treemap") {
      const p = t.dom.baseEl.querySelectorAll(".apexcharts-series");
      this.addPathsEventListeners(p, c);
    }
    if (this.showOnIntersect) {
      const p = t.dom.baseEl.querySelectorAll(
        ".apexcharts-line-series .apexcharts-marker, .apexcharts-area-series .apexcharts-marker"
      );
      p.length > 0 && this.addPathsEventListeners(p, c), this.tooltipUtil.hasBars() && !this.tConfig.shared && this.addDatapointEventsListeners(c);
    }
  }
  drawFixedTooltipRect() {
    const t = this.w, e = this.getElTooltip(), s = e.getBoundingClientRect(), i = s.width + 10, a = s.height + 10;
    let o = this.tConfig.fixed.offsetX, r = this.tConfig.fixed.offsetY;
    const n = this.tConfig.fixed.position.toLowerCase();
    return n.indexOf("right") > -1 && (o = o + t.globals.svgWidth - i + 10), n.indexOf("bottom") > -1 && (r = r + t.globals.svgHeight - a - 10), e.style.left = o + "px", e.style.top = r + "px", {
      x: o,
      y: r,
      ttWidth: i,
      ttHeight: a
    };
  }
  addDatapointEventsListeners(t) {
    const s = this.w.dom.baseEl.querySelectorAll(
      ".apexcharts-series-markers .apexcharts-marker, .apexcharts-bar-area, .apexcharts-candlestick-area, .apexcharts-boxPlot-area, .apexcharts-rangebar-area"
    );
    this.addPathsEventListeners(s, t);
  }
  addPathsEventListeners(t, e) {
    const s = this;
    for (let i = 0; i < t.length; i++) {
      const a = {
        paths: t[i],
        tooltipEl: e.tooltipEl,
        tooltipY: e.tooltipY,
        tooltipX: e.tooltipX,
        elGrid: e.elGrid,
        hoverArea: e.hoverArea,
        ttItems: e.ttItems
      };
      ["mousemove", "mouseup", "touchmove", "mouseout", "touchend"].map((r) => t[i].addEventListener(
        r,
        s.onSeriesHover.bind(s, a),
        { capture: !1, passive: !0 }
      ));
    }
  }
  /*
   ** Check to see if the tooltips should be updated based on a mouse / touch event
   */
  onSeriesHover(t, e) {
    const i = Date.now() - this.lastHoverTime;
    i >= 20 ? this.seriesHover(t, e) : (clearTimeout(this.seriesHoverTimeout), this.seriesHoverTimeout = setTimeout(() => {
      this.seriesHover(t, e);
    }, 20 - i));
  }
  /*
   ** The actual series hover function
   */
  seriesHover(t, e) {
    this.lastHoverTime = Date.now();
    let s = [];
    const i = this.w;
    i.config.chart.group && (s = this.ctx.getGroupedCharts()), !(i.globals.axisCharts && (i.globals.minX === -1 / 0 && i.globals.maxX === 1 / 0 || i.globals.dataPoints === 0)) && (s.length ? s.forEach((a) => {
      const o = this.getElTooltip(a), r = {
        paths: t.paths,
        tooltipEl: o,
        tooltipY: t.tooltipY,
        tooltipX: t.tooltipX,
        elGrid: t.elGrid,
        hoverArea: t.hoverArea,
        ttItems: a.w.globals.tooltip.ttItems
      };
      a.w.globals.minX === this.w.globals.minX && a.w.globals.maxX === this.w.globals.maxX && a.w.globals.tooltip.seriesHoverByContext({
        chartCtx: a,
        ttCtx: a.w.globals.tooltip,
        opt: r,
        e
      });
    }) : this.seriesHoverByContext({
      chartCtx: this.ctx,
      ttCtx: this.w.globals.tooltip,
      opt: t,
      e
    }));
  }
  seriesHoverByContext({ chartCtx: t, ttCtx: e, opt: s, e: i }) {
    const a = t.w;
    if (!this.getElTooltip(t))
      return;
    const r = e.getCachedDimensions();
    e.tooltipRect = {
      x: 0,
      y: 0,
      ttWidth: r.ttWidth,
      ttHeight: r.ttHeight
    }, e.e = i, e.tooltipUtil.hasBars() && !a.globals.comboCharts && !e.isBarShared && this.tConfig.onDatasetHover.highlightDataSeries && new U(t.w).toggleSeriesOnHover(i, i.target.parentNode), a.globals.axisCharts ? e.axisChartsTooltips({
      e: i,
      opt: s,
      tooltipRect: e.tooltipRect
    }) : e.nonAxisChartsTooltips({
      e: i,
      opt: s,
      tooltipRect: e.tooltipRect
    }), e.fixedTooltip && e.drawFixedTooltipRect();
  }
  // tooltip handling for line/area/bar/columns/scatter
  axisChartsTooltips({ e: t, opt: e }) {
    const s = this.w;
    let i, a;
    const o = e.elGrid.getBoundingClientRect(), r = t.type === "touchmove" ? t.touches[0].clientX : t.clientX, n = t.type === "touchmove" ? t.touches[0].clientY : t.clientY;
    if (this.clientY = n, this.clientX = r, s.interact.capturedSeriesIndex = -1, s.interact.capturedDataPointIndex = -1, n < o.top || n > o.top + o.height) {
      this.handleMouseOut(e);
      return;
    }
    if (Array.isArray(this.tConfig.enabledOnSeries) && !s.config.tooltip.shared) {
      const p = parseInt(e.paths.getAttribute("index"), 10);
      if (this.tConfig.enabledOnSeries.indexOf(p) < 0) {
        this.handleMouseOut(e);
        return;
      }
    }
    const l = this.getElTooltip(), c = this.getElXCrosshairs();
    let h = [];
    s.config.chart.group && (h = this.ctx.getSyncedCharts());
    const d = s.globals.xyCharts || s.config.chart.type === "bar" && !s.globals.isBarHorizontal && this.tooltipUtil.hasBars() && this.tConfig.shared || s.globals.comboCharts && this.tooltipUtil.hasBars();
    if (t.type === "mousemove" || t.type === "touchmove" || t.type === "mouseup") {
      if (s.globals.collapsedSeries.length + s.globals.ancillaryCollapsedSeries.length === s.seriesData.series.length)
        return;
      c !== null && c.classList.add("apexcharts-active");
      const p = this.yaxisTooltips.filter((g) => g === !0);
      if (this.ycrosshairs !== null && p.length && this.ycrosshairs.classList.add("apexcharts-active"), d && !this.showOnIntersect || h.length > 1)
        this.handleStickyTooltip(t, r, n, e);
      else if (s.config.chart.type === "heatmap" || s.config.chart.type === "treemap") {
        const g = this.intersect.handleHeatTreeTooltip({
          e: t,
          opt: e,
          x: i,
          y: a,
          type: s.config.chart.type
        });
        i = g.x, a = g.y, l.style.left = i + "px", l.style.top = a + "px";
      } else
        this.tooltipUtil.hasBars() && this.intersect.handleBarTooltip({
          e: t,
          opt: e
        }), this.tooltipUtil.hasMarkers() && this.intersect.handleMarkerTooltip({
          e: t,
          opt: e,
          x: i,
          y: a
        });
      if (this.yaxisTooltips.length)
        for (let g = 0; g < s.config.yaxis.length; g++)
          this.axesTooltip.drawYaxisTooltipText(g, n, this.xyRatios);
      s.dom.baseEl.classList.add("apexcharts-tooltip-active"), e.tooltipEl.classList.add("apexcharts-active"), s.config.chart.accessibility.enabled && s.config.chart.accessibility.announcements.enabled && e.tooltipEl.removeAttribute("aria-hidden");
    } else
      (t.type === "mouseout" || t.type === "touchend") && this.handleMouseOut(e);
  }
  // tooltip handling for pie/donuts
  nonAxisChartsTooltips({ e: t, opt: e, tooltipRect: s }) {
    const i = this.w, a = e.paths.getAttribute("rel"), o = this.getElTooltip(), r = i.dom.elWrap.getBoundingClientRect();
    if (t.type === "mousemove" || t.type === "touchmove") {
      i.dom.baseEl.classList.add("apexcharts-tooltip-active"), o.classList.add("apexcharts-active"), i.config.chart.accessibility.enabled && i.config.chart.accessibility.announcements.enabled && o.removeAttribute("aria-hidden"), this.tooltipLabels.drawSeriesTexts({
        ttItems: e.ttItems,
        i: parseInt(a, 10) - 1,
        shared: !1
      });
      let n, l;
      const c = e.paths.querySelector("path[data\\:cx]") || e.paths;
      if (i.config.tooltip.intersect && c.hasAttribute("data:cx") && c.hasAttribute("data:cy")) {
        const h = i.dom.Paper.node.getBoundingClientRect();
        n = h.left - r.left + parseFloat(c.getAttribute("data:cx")) - s.ttWidth / 2, l = h.top - r.top + parseFloat(c.getAttribute("data:cy")) - s.ttHeight - 10;
      } else
        n = i.interact.clientX - r.left - s.ttWidth / 2, l = i.interact.clientY - r.top - s.ttHeight - 10;
      if (o.style.left = n + "px", o.style.top = l + "px", i.config.legend.tooltipHoverFormatter) {
        const h = i.config.legend.tooltipHoverFormatter, d = a - 1, p = this.legendLabels[d].getAttribute("data:default-text"), g = h(p, {
          seriesIndex: d,
          dataPointIndex: d,
          w: i
        });
        this.legendLabels[d].innerHTML = g;
      }
    } else
      (t.type === "mouseout" || t.type === "touchend") && (o.classList.remove("apexcharts-active"), i.dom.baseEl.classList.remove("apexcharts-tooltip-active"), i.config.legend.tooltipHoverFormatter && this.legendLabels.forEach((n) => {
        const l = n.getAttribute("data:default-text");
        n.innerHTML = decodeURIComponent(l);
      }));
  }
  handleStickyTooltip(t, e, s, i) {
    const a = this.w, o = this.tooltipUtil.getNearestValues({
      context: this,
      hoverArea: i.hoverArea,
      elGrid: i.elGrid,
      clientX: e,
      clientY: s
    }), r = o.j;
    let n = o.capturedSeries;
    a.globals.collapsedSeriesIndices.includes(n) && (n = null);
    const l = i.elGrid.getBoundingClientRect();
    if (o.hoverX < 0 || o.hoverX > l.width) {
      this.handleMouseOut(i);
      return;
    }
    if (n !== null)
      this.handleStickyCapturedSeries(t, n, i, r);
    else if (this.tooltipUtil.isXoverlap(r) || a.globals.isBarHorizontal) {
      const c = a.seriesData.series.findIndex(
        (h, d) => !a.globals.collapsedSeriesIndices.includes(d)
      );
      this.create(t, this, c, r, i.ttItems);
    }
  }
  handleStickyCapturedSeries(t, e, s, i) {
    const a = this.w;
    if (!this.tConfig.shared && a.seriesData.series[e][i] === null) {
      this.handleMouseOut(s);
      return;
    }
    if (typeof a.seriesData.series[e][i] < "u")
      this.tConfig.shared && this.tooltipUtil.isXoverlap(i) && this.tooltipUtil.isInitialSeriesSameLen() ? this.create(t, this, e, i, s.ttItems) : this.create(t, this, e, i, s.ttItems, !1);
    else if (this.tooltipUtil.isXoverlap(i)) {
      const o = a.seriesData.series.findIndex(
        (r, n) => !a.globals.collapsedSeriesIndices.includes(n)
      );
      this.create(t, this, o, i, s.ttItems);
    }
  }
  deactivateHoverFilter() {
    const t = this.w, e = new P(this.w, this.ctx), s = t.dom.Paper.find(".apexcharts-bar-area");
    for (let i = 0; i < s.length; i++)
      e.pathMouseLeave(s[i]);
  }
  handleMouseOut(t) {
    const e = this.w, s = this.getElXCrosshairs();
    if (e.dom.baseEl.classList.remove("apexcharts-tooltip-active"), t.tooltipEl.classList.remove("apexcharts-active"), e.config.chart.accessibility.enabled && e.config.chart.accessibility.announcements.enabled && t.tooltipEl.setAttribute("aria-hidden", "true"), this.deactivateHoverFilter(), e.config.chart.type !== "bubble" && this.marker.resetPointsSize(), s !== null && s.classList.remove("apexcharts-active"), this.ycrosshairs !== null && this.ycrosshairs.classList.remove("apexcharts-active"), this.isXAxisTooltipEnabled && this.xaxisTooltip.classList.remove("apexcharts-active"), this.yaxisTooltips.length) {
      this.yaxisTTEls === null && (this.yaxisTTEls = e.dom.baseEl.querySelectorAll(
        ".apexcharts-yaxistooltip"
      ));
      for (let i = 0; i < this.yaxisTTEls.length; i++)
        this.yaxisTTEls[i].classList.remove("apexcharts-active");
    }
    e.config.legend.tooltipHoverFormatter && this.legendLabels.forEach((i) => {
      const a = i.getAttribute("data:default-text");
      i.innerHTML = decodeURIComponent(a);
    });
  }
  markerClick(t, e, s) {
    const i = this.w;
    typeof i.config.chart.events.markerClick == "function" && i.config.chart.events.markerClick(t, this.ctx, {
      seriesIndex: e,
      dataPointIndex: s,
      w: i
    }), this.ctx.events.fireEvent("markerClick", [
      t,
      this.ctx,
      { seriesIndex: e, dataPointIndex: s, w: i }
    ]);
  }
  create(t, e, s, i, a, o = null) {
    var r, n, l, c, h, d, p, g, f, x, m, u, y, b, w, v;
    const C = this.w, D = e;
    t.type === "mouseup" && this.markerClick(t, s, i), o === null && (o = this.tConfig.shared);
    const S = this.tooltipUtil.hasMarkers(s), k = this.tooltipUtil.getElBars(), F = () => {
      C.globals.markers.largestSize > 0 ? D.marker.enlargePoints(i) : D.tooltipPosition.moveDynamicPointsOnHover(i);
    };
    if (C.config.legend.tooltipHoverFormatter) {
      const M = C.config.legend.tooltipHoverFormatter, E = Array.from(this.legendLabels);
      E.forEach((X) => {
        const R = X.getAttribute("data:default-text");
        X.innerHTML = decodeURIComponent(R);
      });
      for (let X = 0; X < E.length; X++) {
        const R = E[X], Y = parseInt(R.getAttribute("i"), 10), z = decodeURIComponent(
          R.getAttribute("data:default-text")
        ), H = M(z, {
          seriesIndex: o ? Y : s,
          dataPointIndex: i,
          w: C
        });
        if (o)
          R.innerHTML = C.globals.collapsedSeriesIndices.indexOf(Y) < 0 ? H : z;
        else if (R.innerHTML = Y === s ? H : z, s === Y)
          break;
      }
    }
    const T = I(I({
      ttItems: a,
      i: s,
      j: i
    }, typeof ((c = (l = (n = (r = C.rangeData.seriesRange) == null ? void 0 : r[s]) == null ? void 0 : n[i]) == null ? void 0 : l.y[0]) == null ? void 0 : c.y1) < "u" && {
      y1: (g = (p = (d = (h = C.rangeData.seriesRange) == null ? void 0 : h[s]) == null ? void 0 : d[i]) == null ? void 0 : p.y[0]) == null ? void 0 : g.y1
    }), typeof ((u = (m = (x = (f = C.rangeData.seriesRange) == null ? void 0 : f[s]) == null ? void 0 : x[i]) == null ? void 0 : m.y[0]) == null ? void 0 : u.y2) < "u" && {
      y2: (v = (w = (b = (y = C.rangeData.seriesRange) == null ? void 0 : y[s]) == null ? void 0 : b[i]) == null ? void 0 : w.y[0]) == null ? void 0 : v.y2
    });
    if (o) {
      if (D.tooltipLabels.drawSeriesTexts(O(I({}, T), {
        shared: this.showOnIntersect ? !1 : this.tConfig.shared
      })), S)
        F();
      else if (this.tooltipUtil.hasBars() && (this.barSeriesHeight = this.tooltipUtil.getBarsHeight(k), this.barSeriesHeight > 0)) {
        const M = new P(this.w, this.ctx), E = C.dom.Paper.find(`.apexcharts-bar-area[j='${i}']`);
        this.deactivateHoverFilter(), D.tooltipUtil.getAllMarkers(!0).length && !this.barSeriesHeight && F(), D.tooltipPosition.moveStickyTooltipOverBars(i, s);
        for (let R = 0; R < E.length; R++)
          M.pathMouseEnter(E[R]);
      }
    } else
      D.tooltipLabels.drawSeriesTexts(I({
        shared: !1
      }, T)), this.tooltipUtil.hasBars() && D.tooltipPosition.moveStickyTooltipOverBars(i, s), S && D.tooltipPosition.moveMarkers(s, i);
  }
}
let tt = class dt {
  constructor(t) {
    this.node = t, t && (t.instance = this), this._listeners = [], this._filter = null;
  }
  // ---- Attribute methods ----
  attr(t, e) {
    if (typeof t == "string" && e === void 0)
      return this.node.getAttribute(t);
    const s = typeof t == "string" ? { [t]: e } : t;
    for (const i in s) {
      let a = s[i];
      a === null ? this.node.removeAttribute(i) : a !== void 0 && (typeof a == "number" && isNaN(a) && (a = 0), this.node.setAttribute(i, a));
    }
    if (this.node.nodeName === "text" && s.x != null) {
      const i = this.node.querySelectorAll("tspan[data-newline]");
      for (let a = 0; a < i.length; a++)
        i[a].setAttribute("x", s.x);
    }
    return this;
  }
  css(t) {
    for (const e in t)
      this.node.style[e] = t[e];
    return this;
  }
  fill(t) {
    return typeof t == "object" ? this.attr(t) : this.attr("fill", t);
  }
  stroke(t) {
    return typeof t == "object" ? (t.color !== void 0 && this.attr("stroke", t.color), t.width !== void 0 && this.attr("stroke-width", t.width), t.dasharray !== void 0 && this.attr("stroke-dasharray", t.dasharray), t.linecap !== void 0 && this.attr("stroke-linecap", t.linecap), t.opacity !== void 0 && this.attr("stroke-opacity", t.opacity), this) : this.attr("stroke", t);
  }
  size(t, e) {
    return this.attr({ width: t, height: e });
  }
  move(t, e) {
    return this.attr({ x: t, y: e });
  }
  center(t, e) {
    if (this.node.nodeName === "g") {
      const s = this.bbox(), i = t - (s.x + s.width / 2), a = e - (s.y + s.height / 2);
      return this.attr("transform", `translate(${i}, ${a})`);
    }
    return this.attr({ cx: t, cy: e });
  }
  // ---- Tree operations ----
  add(t) {
    return this.node.appendChild(t.node || t), this;
  }
  addTo(t) {
    return (t.node || t).appendChild(this.node), this;
  }
  remove() {
    return this.node.parentNode && this.node.parentNode.removeChild(this.node), this;
  }
  clear() {
    for (; this.node.firstChild; )
      this.node.removeChild(this.node.firstChild);
    return this;
  }
  // ---- Query ----
  find(t) {
    return Array.from(this.node.querySelectorAll(t)).map(
      (e) => e.instance || new dt(e)
    );
  }
  findOne(t) {
    const e = this.node.querySelector(t);
    return e ? e.instance || new dt(e) : null;
  }
  // ---- Events ----
  on(t, e) {
    const s = t.split(".")[0];
    return this._listeners.push({ event: t, eventType: s, handler: e }), this.node.addEventListener(s, e), this;
  }
  off(t, e) {
    if (!t && !e)
      this._listeners.forEach((s) => {
        this.node.removeEventListener(s.eventType, s.handler);
      }), this._listeners = [];
    else if (t && !e) {
      const s = t.split(".")[0];
      this._listeners = this._listeners.filter((i) => i.eventType === s ? (this.node.removeEventListener(i.eventType, i.handler), !1) : !0);
    } else {
      const s = t.split(".")[0];
      this._listeners = this._listeners.filter((i) => i.eventType === s && i.handler === e ? (this.node.removeEventListener(i.eventType, i.handler), !1) : !0);
    }
    return this;
  }
  // ---- Iteration ----
  each(t, e) {
    return Array.from(this.node.children).forEach((i) => {
      const a = i.instance || new dt(i);
      t.call(a), e && a.each(t, e);
    }), this;
  }
  // ---- CSS classes ----
  removeClass(t) {
    return t === "*" ? this.node.removeAttribute("class") : this.node.classList.remove(t), this;
  }
  // ---- Children ----
  children() {
    return Array.from(this.node.childNodes).filter((t) => t.nodeType === 1).map((t) => t.instance || new dt(t));
  }
  // ---- Visibility ----
  hide() {
    return this.node.style.display = "none", this;
  }
  show() {
    return this.node.style.display = "", this;
  }
  // ---- Measurement ----
  bbox() {
    if (typeof this.node.getBBox == "function")
      try {
        return this.node.getBBox();
      } catch {
      }
    return { x: 0, y: 0, width: 0, height: 0 };
  }
  // ---- Text-specific ----
  tspan(t) {
    const e = N.createElementNS("http://www.w3.org/2000/svg", "tspan");
    return e.textContent = t, this.node.appendChild(e), new dt(e);
  }
  // ---- Path-specific ----
  plot(t) {
    return typeof t == "string" && this.attr("d", t), this;
  }
  // ---- Animation (overridden by SVGAnimation mixin) ----
  animate() {
    throw new Error("Animation module not loaded");
  }
  // ---- Filter methods (set up by SVGFilter module) ----
  filterWith() {
    throw new Error("Filter module not loaded");
  }
  unfilter(t) {
    return this._filter && (this.node.removeAttribute("filter"), t && this._filter.node && this._filter.node.parentNode && this._filter.node.parentNode.removeChild(this._filter.node), this._filter = null), this;
  }
  filterer() {
    return this._filter;
  }
}, os = 0;
class rs extends tt {
  constructor(t, e, s) {
    const i = e === "radial" ? "radialGradient" : "linearGradient", a = N.createElementNS(G, i);
    super(a), this._id = "SvgjsGradient" + ++os, this.attr("id", this._id), typeof s == "function" && s(new ns(this));
    let o = t.node.querySelector("defs");
    o || (o = N.createElementNS(G, "defs"), t.node.appendChild(o)), o.appendChild(this.node);
  }
  stop(t, e, s) {
    const i = N.createElementNS(G, "stop");
    return i.setAttribute("offset", t), i.setAttribute("stop-color", e), s !== void 0 && i.setAttribute("stop-opacity", s), this.node.appendChild(i), this;
  }
  from(t, e) {
    return this.attr({ x1: t, y1: e });
  }
  to(t, e) {
    return this.attr({ x2: t, y2: e });
  }
  url() {
    return "url(#" + this._id + ")";
  }
  toString() {
    return this.url();
  }
  valueOf() {
    return this.url();
  }
  fill() {
    return this.url();
  }
}
class ns {
  constructor(t) {
    this.gradient = t;
  }
  stop(t, e, s) {
    return this.gradient.stop(t, e, s), this;
  }
}
let ls = 0;
class cs extends tt {
  constructor(t, e, s, i) {
    const a = N.createElementNS(G, "pattern");
    if (super(a), this._id = "SvgjsPattern" + ++ls, this.attr({
      id: this._id,
      width: e,
      height: s,
      patternUnits: "userSpaceOnUse"
    }), typeof i == "function") {
      const r = new At(this.node);
      i(r);
    }
    let o = t.node.querySelector("defs");
    o || (o = N.createElementNS(G, "defs"), t.node.appendChild(o)), o.appendChild(this.node);
  }
  url() {
    return "url(#" + this._id + ")";
  }
  toString() {
    return this.url();
  }
  valueOf() {
    return this.url();
  }
  fill() {
    return this.url();
  }
}
class At extends tt {
  line(t, e, s, i) {
    const a = this._make("line");
    return t !== void 0 && a.attr({ x1: t, y1: e, x2: s, y2: i }), a;
  }
  rect(t, e) {
    const s = this._make("rect");
    return t !== void 0 && s.attr({ width: t, height: e }), s;
  }
  circle(t) {
    const e = this._make("circle");
    return t !== void 0 && e.attr({ r: t / 2, cx: t / 2, cy: t / 2 }), e;
  }
  path(t) {
    const e = this._make("path");
    return t && e.attr("d", t), e;
  }
  polygon(t) {
    const e = this._make("polygon");
    return t && e.attr("points", t), e;
  }
  group() {
    return this._makeContainer("g");
  }
  defs() {
    return this._makeContainer("defs");
  }
  plain(t) {
    const e = N.createElementNS(G, "text");
    e.textContent = t;
    const s = new tt(e);
    return this.node.appendChild(e), s;
  }
  text(t) {
    const e = N.createElementNS(G, "text"), s = new tt(e);
    return this.node.appendChild(e), typeof t == "function" && t(new hs(e)), s;
  }
  image(t, e) {
    const s = N.createElementNS(G, "image");
    s.setAttributeNS("http://www.w3.org/1999/xlink", "href", t);
    const i = new tt(s);
    if (this.node.appendChild(s), typeof e == "function") {
      const a = new Image();
      a.onload = function() {
        i.size(a.width, a.height), e.call(i, { width: a.width, height: a.height });
      }, a.src = t;
    }
    return i;
  }
  gradient(t, e) {
    return new rs(this, t, e);
  }
  pattern(t, e, s) {
    return new cs(this, t, e, s);
  }
  _make(t) {
    const e = N.createElementNS(G, t);
    return this.node.appendChild(e), new tt(e);
  }
  _makeContainer(t) {
    const e = N.createElementNS(G, t);
    return this.node.appendChild(e), new At(e);
  }
}
class hs {
  constructor(t) {
    this.textNode = t;
  }
  tspan(t) {
    const e = N.createElementNS(G, "tspan");
    return e.textContent = t, this.textNode.appendChild(e), new ds(e, this.textNode);
  }
}
class ds {
  constructor(t, e) {
    this.node = t, this.textNode = e;
  }
  newLine() {
    return this.node.setAttribute("dy", "1.1em"), this.node.dataset.newline = "1", this;
  }
}
let gs = 0;
class fs extends tt {
  constructor() {
    const t = N.createElementNS(G, "filter");
    super(t), this._id = "SvgjsFilter" + ++gs, this.attr("id", this._id);
  }
  size(t, e, s, i) {
    return this.attr({ width: t, height: e, x: s, y: i });
  }
}
class ps {
  constructor(t) {
    this.filter = t;
  }
  colorMatrix(t) {
    return this._primitive("feColorMatrix", t);
  }
  offset(t) {
    return this._primitive("feOffset", t);
  }
  gaussianBlur(t) {
    return this._primitive("feGaussianBlur", t);
  }
  flood(t) {
    return this._primitive("feFlood", t);
  }
  composite(t) {
    return this._primitive("feComposite", t);
  }
  merge(t) {
    const e = N.createElementNS(G, "feMerge");
    return t.forEach((s) => {
      const i = N.createElementNS(G, "feMergeNode");
      i.setAttribute("in", s), e.appendChild(i);
    }), this.filter.node.appendChild(e), new tt(e);
  }
  _primitive(t, e) {
    const s = N.createElementNS(G, t);
    for (const i in e)
      s.setAttribute(i, e[i]);
    return this.filter.node.appendChild(s), new tt(s);
  }
}
function us(A) {
  A.prototype.filterWith = function(t) {
    const e = new fs();
    this._filter = e;
    let s = this.node;
    for (; s && s.nodeName !== "svg"; )
      s = s.parentNode;
    if (s) {
      let i = s.querySelector("defs");
      i || (i = N.createElementNS(G, "defs"), s.insertBefore(i, s.firstChild)), i.appendChild(e.node);
    }
    return t(new ps(e)), this.attr("filter", "url(#" + e._id + ")"), this;
  }, A.prototype.unfilter = function(t) {
    return this._filter && (this.node.removeAttribute("filter"), t && this._filter.node && this._filter.node.parentNode && this._filter.node.parentNode.removeChild(this._filter.node), this._filter = null), this;
  }, A.prototype.filterer = function() {
    return this._filter;
  };
}
/*!
 * Path morphing for SVG path animations
 * Based on svg.pathmorphing.js by Ulrich-Matthias Schäfer (MIT License)
 * Refactored to be standalone (no SVG.js dependency)
 */
function qt(A) {
  if (!A || typeof A != "string")
    return [["M", 0, 0]];
  const t = [], e = /([MmLlHhVvCcSsQqTtAaZz])\s*/g, s = /[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/gi;
  let i;
  const a = [], o = [];
  for (; (i = e.exec(A)) !== null; )
    a.push(i[1]), o.push(i.index);
  for (let r = 0; r < a.length; r++) {
    const n = o[r] + a[r].length, l = r + 1 < o.length ? o[r + 1] : A.length, c = A.substring(n, l), h = [];
    let d;
    for (s.lastIndex = 0; (d = s.exec(c)) !== null; )
      h.push(parseFloat(d[0]));
    const p = a[r].toUpperCase();
    if (p === "Z")
      t.push(["Z"]);
    else if (p === "M" || p === "L" || p === "T")
      for (let g = 0; g < h.length; g += 2)
        t.push([p, h[g], h[g + 1]]);
    else if (p === "H")
      for (let g = 0; g < h.length; g++)
        t.push([p, h[g]]);
    else if (p === "V")
      for (let g = 0; g < h.length; g++)
        t.push([p, h[g]]);
    else if (p === "C")
      for (let g = 0; g < h.length; g += 6)
        t.push([
          p,
          h[g],
          h[g + 1],
          h[g + 2],
          h[g + 3],
          h[g + 4],
          h[g + 5]
        ]);
    else if (p === "S" || p === "Q")
      for (let g = 0; g < h.length; g += 4)
        t.push([p, h[g], h[g + 1], h[g + 2], h[g + 3]]);
    else if (p === "A")
      for (let g = 0; g < h.length; g += 7)
        t.push([
          p,
          h[g],
          h[g + 1],
          h[g + 2],
          h[g + 3],
          h[g + 4],
          h[g + 5],
          h[g + 6]
        ]);
  }
  return t.length === 0 && t.push(["M", 0, 0]), t;
}
function Zt(A) {
  let t = 1 / 0, e = 1 / 0, s = -1 / 0, i = -1 / 0;
  return A.forEach((a) => {
    for (let o = 1; o < a.length; o += 2)
      if (o + 1 <= a.length) {
        const r = a[o], n = a[o + 1];
        typeof r == "number" && typeof n == "number" && (r < t && (t = r), r > s && (s = r), n < e && (e = n), n > i && (i = n));
      }
  }), t === 1 / 0 ? { x: 0, y: 0, width: 0, height: 0 } : { x: t, y: e, width: s - t, height: i - e };
}
function xs(A) {
  return A.map((t) => t.join(" ")).join(" ");
}
function jt(A) {
  switch (A[0]) {
    case "z":
    case "Z":
      A[0] = "L", A[1] = this.start[0], A[2] = this.start[1];
      break;
    case "H":
      A[0] = "L", A[2] = this.pos[1];
      break;
    case "V":
      A[0] = "L", A[2] = A[1], A[1] = this.pos[0];
      break;
    case "T":
      A[0] = "Q", A[3] = A[1], A[4] = A[2], A[1] = this.reflection[1], A[2] = this.reflection[0];
      break;
    case "S":
      A[0] = "C", A[6] = A[4], A[5] = A[3], A[4] = A[2], A[3] = A[1], A[2] = this.reflection[1], A[1] = this.reflection[0];
      break;
  }
  return A;
}
function Kt(A) {
  var t = A.length;
  return this.pos = [A[t - 2], A[t - 1]], "SCQT".indexOf(A[0]) != -1 && (this.reflection = [
    2 * this.pos[0] - A[t - 4],
    2 * this.pos[1] - A[t - 3]
  ]), A;
}
function Jt(A) {
  var t = [A];
  switch (A[0]) {
    case "M":
      return this.pos = this.start = [A[1], A[2]], t;
    case "L":
      A[5] = A[3] = A[1], A[6] = A[4] = A[2], A[1] = this.pos[0], A[2] = this.pos[1];
      break;
    case "Q":
      A[6] = A[4], A[5] = A[3], A[4] = A[4] * 1 / 3 + A[2] * 2 / 3, A[3] = A[3] * 1 / 3 + A[1] * 2 / 3, A[2] = this.pos[1] * 1 / 3 + A[2] * 2 / 3, A[1] = this.pos[0] * 1 / 3 + A[1] * 2 / 3;
      break;
    case "A":
      t = ms(this.pos, A), A = t[0];
      break;
  }
  return A[0] = "C", this.pos = [A[5], A[6]], this.reflection = [2 * A[5] - A[3], 2 * A[6] - A[4]], t;
}
function Qt(A, t) {
  if (t === !1)
    return !1;
  for (var e = t, s = A.length; e < s; ++e)
    if (A[e][0] == "M")
      return e;
  return !1;
}
function ms(A, t) {
  var e = Math.abs(t[1]), s = Math.abs(t[2]), i = t[3] % 360, a = t[4], o = t[5], r = t[6], n = t[7], l = new et(A[0], A[1]), c = new et(r, n), h, d, p, g, f, x, m, u, y, b, w, v, C, D, S, k, F, T, M, E, X, R, Y = [], z, H, _, $;
  if (e === 0 || s === 0 || l.x === c.x && l.y === c.y)
    return [["C", l.x, l.y, c.x, c.y, c.x, c.y]];
  for (h = new et((l.x - c.x) / 2, (l.y - c.y) / 2).transform(
    new lt().rotate(i)
  ), d = h.x * h.x / (e * e) + h.y * h.y / (s * s), d > 1 && (d = Math.sqrt(d), e = d * e, s = d * s), p = new lt().rotate(i).scale(1 / e, 1 / s).rotate(-i), l = l.transform(p), c = c.transform(p), g = [c.x - l.x, c.y - l.y], x = g[0] * g[0] + g[1] * g[1], f = Math.sqrt(x), g[0] /= f, g[1] /= f, m = x < 4 ? Math.sqrt(1 - x / 4) : 0, a === o && (m *= -1), u = new et(
    (c.x + l.x) / 2 + m * -g[1],
    (c.y + l.y) / 2 + m * g[0]
  ), y = new et(l.x - u.x, l.y - u.y), b = new et(c.x - u.x, c.y - u.y), w = Math.acos(y.x / Math.sqrt(y.x * y.x + y.y * y.y)), y.y < 0 && (w *= -1), v = Math.acos(b.x / Math.sqrt(b.x * b.x + b.y * b.y)), b.y < 0 && (v *= -1), o && w > v && (v += 2 * Math.PI), !o && w < v && (v -= 2 * Math.PI), D = Math.ceil(Math.abs(w - v) * 2 / Math.PI), k = [], F = w, C = (v - w) / D, S = 4 * Math.tan(C / 4) / 3, X = 0; X <= D; X++)
    M = Math.cos(F), T = Math.sin(F), E = new et(u.x + M, u.y + T), k[X] = [
      new et(E.x + S * T, E.y - S * M),
      E,
      new et(E.x - S * T, E.y + S * M)
    ], F += C;
  for (k[0][0] = k[0][1].clone(), k[k.length - 1][2] = k[k.length - 1][1].clone(), p = new lt().rotate(i).scale(e, s).rotate(-i), X = 0, R = k.length; X < R; X++)
    k[X][0] = k[X][0].transform(p), k[X][1] = k[X][1].transform(p), k[X][2] = k[X][2].transform(p);
  for (X = 1, R = k.length; X < R; X++)
    E = k[X - 1][2], z = E.x, H = E.y, E = k[X][0], _ = E.x, $ = E.y, E = k[X][1], r = E.x, n = E.y, Y.push(["C", z, H, _, $, r, n]);
  return Y;
}
function bs(A, t, e, s, i, a) {
  for (var o = A.slice(
    t,
    e || void 0
  ), r = s.slice(i, a || void 0), n = 0, l = { pos: [0, 0], start: [0, 0] }, c = { pos: [0, 0], start: [0, 0] }; o[n] = jt.call(l, o[n]), r[n] = jt.call(c, r[n]), o[n][0] != r[n][0] || o[n][0] == "M" || o[n][0] == "A" && (o[n][4] != r[n][4] || o[n][5] != r[n][5]) ? (Array.prototype.splice.apply(
    o,
    [n, 1].concat(Jt.call(l, o[n]))
  ), Array.prototype.splice.apply(
    r,
    [n, 1].concat(Jt.call(c, r[n]))
  )) : (o[n] = Kt.call(l, o[n]), r[n] = Kt.call(c, r[n])), !(++n == o.length && n == r.length); )
    n == o.length && o.push([
      "C",
      l.pos[0],
      l.pos[1],
      l.pos[0],
      l.pos[1],
      l.pos[0],
      l.pos[1]
    ]), n == r.length && r.push([
      "C",
      c.pos[0],
      c.pos[1],
      c.pos[0],
      c.pos[1],
      c.pos[0],
      c.pos[1]
    ]);
  return { start: o, dest: r };
}
function ys(A, t) {
  for (var e = qt(A), s = qt(t), i = 0, a = 0, o = !1, r = !1, n; !(i === !1 && a === !1); ) {
    if (o = Qt(
      e,
      i === !1 ? !1 : i + 1
    ), r = Qt(
      s,
      a === !1 ? !1 : a + 1
    ), i === !1) {
      const l = Zt(n.start);
      l.height == 0 || l.width == 0 ? i = e.push(e[0]) - 1 : i = e.push([
        "M",
        l.x + l.width / 2,
        l.y + l.height / 2
      ]) - 1;
    }
    if (a === !1) {
      const l = Zt(n.dest);
      l.height == 0 || l.width == 0 ? a = s.push(s[0]) - 1 : a = s.push([
        "M",
        l.x + l.width / 2,
        l.y + l.height / 2
      ]) - 1;
    }
    n = bs(
      e,
      i,
      o,
      s,
      a,
      r
    ), e = e.slice(0, i).concat(
      n.start,
      o === !1 ? [] : e.slice(o)
    ), s = s.slice(0, a).concat(
      n.dest,
      r === !1 ? [] : s.slice(r)
    ), i = o === !1 ? !1 : i + n.start.length, a = r === !1 ? !1 : a + n.dest.length;
  }
  return { start: e, dest: s };
}
function ws(A, t) {
  var e = ys(A, t), s = e.start, i = e.dest;
  return function(a) {
    var o = s.map(function(r, n) {
      return i[n].map(function(l, c) {
        return c === 0 ? l : r[c] + (i[n][c] - r[c]) * a;
      });
    });
    return xs(o);
  };
}
function vs(A) {
  return -Math.cos(A * Math.PI) / 2 + 0.5;
}
function te(A) {
  if (!A || typeof A != "string")
    return null;
  if (A[0] === "#") {
    let e = A.slice(1);
    e.length === 3 && (e = e[0] + e[0] + e[1] + e[1] + e[2] + e[2]);
    const s = parseInt(e, 16);
    return [s >> 16 & 255, s >> 8 & 255, s & 255, 1];
  }
  const t = A.match(
    /rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+))?\s*\)/
  );
  return t ? [+t[1], +t[2], +t[3], t[4] !== void 0 ? +t[4] : 1] : null;
}
function As(A, t, e) {
  return `rgba(${Math.round(A[0] + (t[0] - A[0]) * e)},${Math.round(A[1] + (t[1] - A[1]) * e)},${Math.round(A[2] + (t[2] - A[2]) * e)},${A[3] + (t[3] - A[3]) * e})`;
}
class Gt {
  constructor(t, e, s) {
    this.el = t, this.duration = e ?? 300, this.delay = s || 0, this._attrTarget = null, this._plotTarget = null, this._afterCb = null, this._duringCb = null, this._next = null, this._root = null, this._scheduled = !1;
  }
  attr(t) {
    return this._attrTarget = t, this._schedule(), this;
  }
  plot(t) {
    return this._plotTarget = t, this._schedule(), this;
  }
  after(t) {
    return this._afterCb = t, this._schedule(), this;
  }
  during(t) {
    return this._duringCb = t, this._schedule(), this;
  }
  animate(t, e) {
    const s = new Gt(this.el, t, e);
    return this._next = s, s._root = this._root || this, s;
  }
  _schedule() {
    const t = this._root || this;
    t._scheduled || (t._scheduled = !0, queueMicrotask(() => t._executeChain()));
  }
  _executeChain() {
    const t = [];
    let e = this;
    for (; e; )
      t.push(e), e = e._next;
    let s = 0;
    t.forEach((i) => {
      s += i.delay, i._execute(s), s += i.duration;
    });
  }
  _execute(t) {
    const e = this.el, s = this.duration;
    if (s <= 1) {
      const a = () => {
        this._attrTarget && e.attr(this._attrTarget), this._plotTarget && e.plot(this._plotTarget), this._afterCb && this._afterCb.call(e);
      };
      t > 0 ? setTimeout(a, t) : a();
      return;
    }
    const i = () => {
      const a = {}, o = {}, r = {};
      if (this._attrTarget)
        for (const h of Object.keys(this._attrTarget)) {
          const d = e.attr(h);
          a[h] = d;
          const p = te(d), g = te(String(this._attrTarget[h]));
          p && g && (o[h] = p, r[h] = g);
        }
      let n = null;
      if (this._plotTarget) {
        const h = e.attr("d") || "";
        try {
          n = ws(h, this._plotTarget);
        } catch {
          n = null;
        }
      }
      const l = performance.now(), c = (h) => {
        const d = h - l, p = Math.min(d / s, 1), g = vs(p);
        if (this._attrTarget)
          if (p >= 1)
            e.attr(this._attrTarget);
          else {
            const f = {};
            for (const x of Object.keys(this._attrTarget))
              if (o[x] && r[x])
                f[x] = As(
                  o[x],
                  r[x],
                  g
                );
              else {
                const m = parseFloat(a[x]), u = parseFloat(this._attrTarget[x]);
                !isNaN(m) && !isNaN(u) && (f[x] = m + (u - m) * g);
              }
            e.attr(f);
          }
        n && p < 1 && e.attr("d", n(g)), this._duringCb && this._duringCb(g), p < 1 ? N.requestAnimationFrame(c) : (this._plotTarget && e.attr("d", this._plotTarget), this._afterCb && this._afterCb.call(e));
      };
      N.requestAnimationFrame(c);
    };
    t > 0 ? setTimeout(i, t) : i();
  }
}
function Cs(A) {
  A.prototype.animate = function(t, e) {
    return new Gt(this, t, e);
  };
}
function Ss(A) {
  A.prototype.draggable = function(t) {
    if (t === !1)
      return this._dragCleanup && (this._dragCleanup(), this._dragCleanup = null), this;
    const e = this, s = t || {}, i = (a) => {
      if (a.button && a.button !== 0)
        return;
      a.stopPropagation();
      const r = a.type === "touchstart" ? a.touches[0] : a, n = e.node, l = parseFloat(n.getAttribute("x")) || 0, c = parseFloat(n.getAttribute("y")) || 0, h = r.clientX, d = r.clientY, p = n.ownerSVGElement;
      let g = null;
      p && (g = p.getScreenCTM());
      const f = (m) => {
        const u = m.type === "touchmove" ? m.touches[0] : m;
        let y = u.clientX - h, b = u.clientY - d;
        g && (y = y / g.a, b = b / g.d);
        let w = l + y, v = c + b;
        const C = parseFloat(n.getAttribute("width")) || 0, D = parseFloat(n.getAttribute("height")) || 0;
        s.minX !== void 0 && w < s.minX && (w = s.minX), s.minY !== void 0 && v < s.minY && (v = s.minY), s.maxX !== void 0 && w + C > s.maxX && (w = s.maxX - C), s.maxY !== void 0 && v + D > s.maxY && (v = s.maxY - D);
        const S = {
          x: w,
          y: v,
          w: C,
          h: D,
          x2: w + C,
          y2: v + D
        }, k = new CustomEvent("dragmove", {
          detail: {
            handler: {
              move: function(F, T) {
                n.setAttribute("x", F), n.setAttribute("y", T);
              }
            },
            box: S
          }
        });
        n.dispatchEvent(k);
      }, x = () => {
        B.isBrowser() && (document.removeEventListener("mousemove", f), document.removeEventListener("touchmove", f), document.removeEventListener("mouseup", x), document.removeEventListener("touchend", x));
      };
      B.isBrowser() && (document.addEventListener("mousemove", f), document.addEventListener("touchmove", f), document.addEventListener("mouseup", x), document.addEventListener("touchend", x));
    };
    return e.node.addEventListener("mousedown", i), e.node.addEventListener("touchstart", i), e._dragCleanup = () => {
      e.node.removeEventListener("mousedown", i), e.node.removeEventListener("touchstart", i);
    }, e;
  };
}
function ks(A) {
  A.prototype.select = function(t) {
    if (t === !1)
      return this._selectCleanup && (this._selectCleanup(), this._selectCleanup = null), this;
    const e = this, { createHandle: s, updateHandle: i } = t, a = document.createElementNS(G, "g");
    a.setAttribute("class", "svg_select_points");
    const o = e.node.parentNode;
    o && o.appendChild(a);
    const r = {}, n = ["t", "b", "l", "r", "lt", "rt", "lb", "rb"];
    n.forEach((c, h) => {
      const d = new At(
        document.createElementNS(G, "g")
      );
      a.appendChild(d.node);
      const p = s(d, [0, 0], h, [], c);
      r[c] = { group: d, handle: p };
    });
    const l = () => {
      const c = parseFloat(e.attr("x")) || 0, h = parseFloat(e.attr("y")) || 0, d = parseFloat(e.attr("width")) || 0, p = parseFloat(e.attr("height")) || 0, g = e.node.getAttribute("transform");
      g ? a.setAttribute("transform", g) : a.removeAttribute("transform");
      const f = {
        t: [c + d / 2, h],
        b: [c + d / 2, h + p],
        l: [c, h + p / 2],
        r: [c + d, h + p / 2],
        lt: [c, h],
        rt: [c + d, h],
        lb: [c, h + p],
        rb: [c + d, h + p]
      };
      n.forEach((x) => {
        r[x] && f[x] && i(r[x].group, f[x]);
      });
    };
    return l(), e._selectHandles = a, e._selectHandlesMap = r, e._updateSelectPositions = l, e._selectCleanup = () => {
      a.parentNode && a.parentNode.removeChild(a), e._selectHandles = null, e._selectHandlesMap = null, e._updateSelectPositions = null;
    }, e;
  }, A.prototype.resize = function(t) {
    if (t === !1)
      return this._resizeCleanup && (this._resizeCleanup(), this._resizeCleanup = null), this;
    const e = this, s = e._selectHandlesMap;
    if (!s)
      return e;
    const i = [], a = (o) => {
      const r = s[o];
      if (!r || !r.group || !r.group.node)
        return;
      const n = r.group.node, l = (c) => {
        if (c.button && c.button !== 0)
          return;
        c.stopPropagation();
        const p = (c.type === "touchstart" ? c.touches[0] : c).clientX, g = e.node.ownerSVGElement;
        let f = null;
        g && (f = g.getScreenCTM());
        const x = parseFloat(e.attr("x")) || 0, m = parseFloat(e.attr("width")) || 0, u = (b) => {
          let v = (b.type === "touchmove" ? b.touches[0] : b).clientX - p;
          f && (v = v / f.a);
          let C = x, D = m;
          o === "l" ? (C = x + v, D = m - v) : o === "r" && (D = m + v), D < 0 && (D = 0), e.attr({ x: C, width: D }), e._updateSelectPositions && e._updateSelectPositions();
          const S = new CustomEvent("resize", {
            detail: { el: e }
          });
          e.node.dispatchEvent(S);
        }, y = () => {
          B.isBrowser() && (document.removeEventListener("mousemove", u), document.removeEventListener("touchmove", u), document.removeEventListener("mouseup", y), document.removeEventListener("touchend", y));
          const b = new CustomEvent("resize", {
            detail: { el: e }
          });
          e.node.dispatchEvent(b);
        };
        B.isBrowser() && (document.addEventListener("mousemove", u), document.addEventListener("touchmove", u), document.addEventListener("mouseup", y), document.addEventListener("touchend", y));
      };
      n.addEventListener("mousedown", l), n.addEventListener("touchstart", l), i.push(() => {
        n.removeEventListener("mousedown", l), n.removeEventListener("touchstart", l);
      });
    };
    return a("l"), a("r"), e._resizeCleanup = () => {
      i.forEach((o) => o());
    }, e;
  };
}
us(tt);
Cs(tt);
Ss(tt);
ks(tt);
function Tt() {
  const A = N.createElementNS(G, "svg"), t = new At(A);
  return t.attr({ xmlns: G }), t;
}
Tt.xlink = "http://www.w3.org/1999/xlink";
B.isBrowser() && typeof window.SVG > "u" && (window.SVG = Tt);
B.isBrowser() ? (typeof window.SVG > "u" && (window.SVG = Tt), typeof window.Apex > "u" && (window.Apex = {})) : typeof global < "u" && (typeof global.Apex > "u" && (global.Apex = {}), typeof global.SVG > "u" && (global.SVG = Tt));
const we = class zt {
  /**
   * Register one or more optional feature modules.
   *
   * @param {Record<string, new (w: object, ctx: object) => unknown>} featureMap
   *   Plain object mapping ctx property name → constructor.
   *
   * Example (called from src/features/legend.js):
   *   InitCtxVariables.registerFeatures({ legend: Legend })
   */
  static registerFeatures(t) {
    for (const [e, s] of Object.entries(t))
      zt._featureRegistry.set(e, s);
  }
  constructor(t) {
    this.ctx = t, this.w = t.w;
  }
  initModules() {
    this.ctx.publicMethods = [
      "updateOptions",
      "updateSeries",
      "appendData",
      "appendSeries",
      "isSeriesHidden",
      "highlightSeries",
      "toggleSeries",
      "showSeries",
      "hideSeries",
      "setLocale",
      "resetSeries",
      "zoomX",
      "toggleDataPointSelection",
      "dataURI",
      "exportToCSV",
      "addXaxisAnnotation",
      "addYaxisAnnotation",
      "addPointAnnotation",
      "clearAnnotations",
      "removeAnnotation",
      "paper",
      "destroy"
    ], this.ctx.eventList = [
      "click",
      "mousedown",
      "mousemove",
      "mouseleave",
      "touchstart",
      "touchmove",
      "touchleave",
      "mouseup",
      "touchend",
      "keydown",
      "keyup"
    ], this.ctx.animations = new ut(this.w, this.ctx), this.ctx.axes = new Oe(this.w, this.ctx), this.ctx.core = new Je(this.ctx.el, this.w, this.ctx), this.ctx.config = new yt({}), this.ctx.data = new Wt(this.w, {
      resetGlobals: () => this.ctx.core.resetGlobals(),
      isMultipleY: () => this.ctx.core.isMultipleY()
    }), this.ctx.grid = new fe(this.w, this.ctx), this.ctx.graphics = new P(this.w, this.ctx), this.ctx.coreUtils = new V(this.w), this.ctx.crosshairs = new Bt(this.w), this.ctx.events = new ze(this.w, this.ctx), this.ctx.fill = new st(this.w), this.ctx.localization = new He(this.w), this.ctx.options = new nt(), this.ctx.responsive = new _e(this.w), this.ctx.series = new U(this.w, {
      // legend may not be registered — guard with ?.
      toggleDataSeries: (...e) => {
        var s;
        return (s = this.ctx.legend) == null ? void 0 : s.legendHelpers.toggleDataSeries(...e);
      },
      revertDefaultAxisMinMax: () => this.ctx.updateHelpers.revertDefaultAxisMinMax(),
      updateSeries: (...e) => this.ctx.updateHelpers._updateSeries(...e)
    }), this.ctx.theme = new We(this.w), this.ctx.formatters = new vt(this.w), this.ctx.titleSubtitle = new Ge(this.w), this.ctx.dimensions = new Dt(this.w, this.ctx), this.ctx.updateHelpers = new Qe(this.w, this.ctx);
    const t = new as(this.w, this.ctx);
    this.w.globals.tooltip = t, Object.defineProperty(this.ctx, "tooltip", {
      get() {
        return this.w.globals.tooltip;
      },
      configurable: !0
    }), this._initOptionalModules();
  }
  /**
   * Instantiate optional feature modules from the registry.
   *
   * Modules that are not registered are set to null on ctx so that call sites
   * can safely use optional-chaining (ctx.tooltip?.drawTooltip(...)).
   *
   * Lazy-getter features (toolbar, zoomPanSelection, keyboardNavigation) are
   * installed as on-demand getters so they are only constructed if accessed,
   * and only if their constructor was registered.
   */
  _initOptionalModules() {
    const t = zt._featureRegistry, e = this.w, s = this.ctx, i = t.get("exports");
    s.exports = i ? new i(e, s) : null;
    const a = t.get("legend");
    s.legend = a ? new a(e, s) : null;
    const o = t.get("toolbar");
    Object.defineProperty(s, "toolbar", {
      get() {
        var l;
        return !this._toolbar && o && (this._toolbar = new o(e, this)), (l = this._toolbar) != null ? l : null;
      },
      configurable: !0
    });
    const r = t.get("zoomPanSelection");
    Object.defineProperty(s, "zoomPanSelection", {
      get() {
        var l;
        return !this._zoomPanSelection && r && (this._zoomPanSelection = new r(e, this)), (l = this._zoomPanSelection) != null ? l : null;
      },
      configurable: !0
    });
    const n = t.get("keyboardNavigation");
    Object.defineProperty(s, "keyboardNavigation", {
      get() {
        var l;
        return !this._keyboardNavigation && n && (this._keyboardNavigation = new n(e, this)), (l = this._keyboardNavigation) != null ? l : null;
      },
      configurable: !0
    });
  }
};
Ee(we, "_featureRegistry", /* @__PURE__ */ new Map());
let St = we;
class ee {
  constructor(t) {
    this.ctx = t, this.w = t.w;
  }
  clear({ isUpdating: t }) {
    this.ctx._zoomPanSelection && this.ctx._zoomPanSelection.destroy(), this.ctx._toolbar && this.ctx._toolbar.destroy(), this.w.globals.resizeObserver && typeof this.w.globals.resizeObserver.disconnect == "function" && (this.w.globals.resizeObserver.disconnect(), this.w.globals.resizeObserver = null), me.invalidateAll(this.w), this.ctx.animations = null, this.ctx.axes = null, this.ctx.annotations = null, this.ctx.core = null, this.ctx.data = null, this.ctx.grid = null, this.ctx.series = null, this.ctx.responsive = null, this.ctx.theme = null, this.ctx.formatters = null, this.ctx.titleSubtitle = null, this.ctx.legend = null, this.ctx.dimensions = null, this.ctx.options = null, this.ctx.crosshairs = null, this.ctx._zoomPanSelection = null, this.ctx.updateHelpers = null, this.ctx._toolbar = null, this.ctx.localization = null, this.ctx._keyboardNavigation = null, this.ctx.w.globals.tooltip = null, this.clearDomElements({ isUpdating: t });
  }
  killSVG(t) {
    t.each(function() {
      this.removeClass("*"), this.off();
    }, !0), t.clear();
  }
  clearDomElements({ isUpdating: t }) {
    const e = this.w.dom;
    if (B.isBrowser()) {
      const s = e.Paper.node;
      s.parentNode && s.parentNode.parentNode && !t && (s.parentNode.parentNode.style.minHeight = "unset");
      const i = e.baseEl;
      if (i && this.ctx.eventList.forEach((a) => {
        i.removeEventListener(a, this.ctx.events.documentEvent);
      }), this.ctx.el !== null)
        for (; this.ctx.el.firstChild; )
          this.ctx.el.removeChild(this.ctx.el.firstChild);
      this.killSVG(e.Paper), e.Paper.remove();
    }
    e.elWrap = null, e.elGraphical = null, e.elLegendWrap = null, e.elLegendForeign = null, e.baseEl = null, e.elGridRect = null, e.elGridRectMask = null, e.elGridRectBarMask = null, e.elGridRectMarkerMask = null, e.elForecastMask = null, e.elNonForecastMask = null, e.elDefs = null;
  }
}
const Ht = /* @__PURE__ */ new WeakMap();
function Ls(A, t) {
  if (B.isSSR())
    return;
  let e = !1;
  if (A.nodeType !== Node.DOCUMENT_FRAGMENT_NODE) {
    const i = A.getBoundingClientRect();
    (A.style.display === "none" || i.width === 0) && (e = !0);
  }
  const s = new ResizeObserver((i) => {
    e && t.call(A, i), e = !0;
  });
  A.nodeType === Node.DOCUMENT_FRAGMENT_NODE ? Array.from(A.children).forEach((i) => s.observe(i)) : s.observe(A), Ht.set(t, s);
}
function Ds(A, t) {
  if (B.isSSR())
    return;
  const e = Ht.get(t);
  e && (e.disconnect(), Ht.delete(t));
}
const Ts = `@keyframes opaque {
  0% {
    opacity: 0
  }

  to {
    opacity: 1
  }
}

@keyframes resizeanim {

  0%,
  to {
    opacity: 0
  }
}

.apexcharts-canvas {
  position: relative;
  direction: ltr !important;
  user-select: none
}

.apexcharts-canvas ::-webkit-scrollbar {
  -webkit-appearance: none;
  width: 6px
}

.apexcharts-canvas ::-webkit-scrollbar-thumb {
  border-radius: 4px;
  background-color: rgba(0, 0, 0, .5);
  box-shadow: 0 0 1px rgba(255, 255, 255, .5);
  -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, .5)
}

.apexcharts-inner {
  position: relative
}

.apexcharts-text tspan {
  font-family: inherit
}

rect.legend-mouseover-inactive,
.legend-mouseover-inactive rect,
.legend-mouseover-inactive path,
.legend-mouseover-inactive circle,
.legend-mouseover-inactive line,
.legend-mouseover-inactive text.apexcharts-yaxis-title-text,
.legend-mouseover-inactive text.apexcharts-yaxis-label {
  transition: .15s ease all;
  opacity: .2
}

.apexcharts-legend-text {
  padding-left: 15px;
  margin-left: -15px;
}

.apexcharts-legend-series[role="button"]:focus {
  outline: 2px solid #008FFB;
  outline-offset: 2px;
}

.apexcharts-legend-series[role="button"]:focus:not(:focus-visible) {
  outline: none;
}

.apexcharts-legend-series[role="button"]:focus-visible {
  outline: 2px solid #008FFB;
  outline-offset: 2px;
}

.apexcharts-series-collapsed {
  opacity: 0
}

/* Keyboard navigation focus indicator on SVG data elements.
   SVG elements don't support CSS outline, so we use stroke. */
.apexcharts-bar-area.apexcharts-keyboard-focused,
.apexcharts-candlestick-area.apexcharts-keyboard-focused,
.apexcharts-boxPlot-area.apexcharts-keyboard-focused,
.apexcharts-rangebar-area.apexcharts-keyboard-focused,
.apexcharts-pie-area.apexcharts-keyboard-focused,
.apexcharts-heatmap-rect.apexcharts-keyboard-focused,
.apexcharts-treemap-rect.apexcharts-keyboard-focused {
  stroke: #008FFB;
  stroke-width: 2;
  stroke-opacity: 1;
}

.apexcharts-tooltip {
  border-radius: 5px;
  box-shadow: 2px 2px 6px -4px #999;
  cursor: default;
  font-size: 14px;
  left: 62px;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  top: 20px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  white-space: nowrap;
  z-index: 12;
  transition: .15s ease all
}

.apexcharts-tooltip.apexcharts-active {
  opacity: 1;
  transition: .15s ease all
}

.apexcharts-tooltip.apexcharts-theme-light {
  border: 1px solid #e3e3e3;
  background: rgba(255, 255, 255, .96)
}

.apexcharts-tooltip.apexcharts-theme-dark {
  color: #fff;
  background: rgba(30, 30, 30, .8)
}

.apexcharts-tooltip * {
  font-family: inherit
}

.apexcharts-tooltip-title {
  padding: 6px;
  font-size: 15px;
  margin-bottom: 4px
}

.apexcharts-tooltip.apexcharts-theme-light .apexcharts-tooltip-title {
  background: #eceff1;
  border-bottom: 1px solid #ddd
}

.apexcharts-tooltip.apexcharts-theme-dark .apexcharts-tooltip-title {
  background: rgba(0, 0, 0, .7);
  border-bottom: 1px solid #333
}

.apexcharts-tooltip-text-goals-value,
.apexcharts-tooltip-text-y-value,
.apexcharts-tooltip-text-z-value {
  display: inline-block;
  margin-left: 5px;
  font-weight: 600
}

.apexcharts-tooltip-text-goals-label:empty,
.apexcharts-tooltip-text-goals-value:empty,
.apexcharts-tooltip-text-y-label:empty,
.apexcharts-tooltip-text-y-value:empty,
.apexcharts-tooltip-text-z-value:empty,
.apexcharts-tooltip-title:empty {
  display: none
}

.apexcharts-tooltip-text-goals-label,
.apexcharts-tooltip-text-goals-value {
  padding: 6px 0 5px
}

.apexcharts-tooltip-goals-group,
.apexcharts-tooltip-text-goals-label,
.apexcharts-tooltip-text-goals-value {
  display: flex
}

.apexcharts-tooltip-text-goals-label:not(:empty),
.apexcharts-tooltip-text-goals-value:not(:empty) {
  margin-top: -6px
}

.apexcharts-tooltip-marker {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 16px;
  font-size: 16px;
  line-height: 16px;
  margin-right: 4px;
  text-align: center;
  vertical-align: middle;
  color: inherit;
}

.apexcharts-tooltip-marker::before {
  content: "";
  display: inline-block;
  width: 100%;
  text-align: center;
  color: currentcolor;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  font-size: 26px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 14px;
  font-weight: 900;
}

.apexcharts-tooltip-marker[shape="circle"]::before {
  content: "\\25CF";
}

.apexcharts-tooltip-marker[shape="square"]::before,
.apexcharts-tooltip-marker[shape="rect"]::before {
  content: "\\25A0";
  transform: translate(-1px, -2px);
}

.apexcharts-tooltip-marker[shape="line"]::before {
  content: "\\2500";
}

.apexcharts-tooltip-marker[shape="diamond"]::before {
  content: "\\25C6";
  font-size: 28px;
}

.apexcharts-tooltip-marker[shape="triangle"]::before {
  content: "\\25B2";
  font-size: 22px;
}

.apexcharts-tooltip-marker[shape="cross"]::before {
  content: "\\2715";
  font-size: 18px;
}

.apexcharts-tooltip-marker[shape="plus"]::before {
  content: "\\2715";
  transform: rotate(45deg) translate(-1px, -1px);
  font-size: 18px;
}

.apexcharts-tooltip-marker[shape="star"]::before {
  content: "\\2605";
  font-size: 18px;
}

.apexcharts-tooltip-marker[shape="sparkle"]::before {
  content: "\\2726";
  font-size: 20px;
}

.apexcharts-tooltip-series-group {
  padding: 0 10px;
  display: none;
  text-align: left;
  justify-content: left;
  align-items: center
}

.apexcharts-tooltip-series-group.apexcharts-active .apexcharts-tooltip-marker {
  opacity: 1
}

.apexcharts-tooltip-series-group.apexcharts-active,
.apexcharts-tooltip-series-group:last-child {
  padding-bottom: 4px
}

.apexcharts-tooltip-y-group {
  padding: 6px 0 5px
}

.apexcharts-custom-tooltip,
.apexcharts-tooltip-box {
  padding: 4px 8px
}

.apexcharts-tooltip-boxPlot {
  display: flex;
  flex-direction: column-reverse
}

.apexcharts-tooltip-box>div {
  margin: 4px 0
}

.apexcharts-tooltip-box span.value {
  font-weight: 700
}

.apexcharts-tooltip-rangebar {
  padding: 5px 8px
}

.apexcharts-tooltip-rangebar .category {
  font-weight: 600;
  color: #777
}

.apexcharts-tooltip-rangebar .series-name {
  font-weight: 700;
  display: block;
  margin-bottom: 5px
}

.apexcharts-xaxistooltip,
.apexcharts-yaxistooltip {
  opacity: 0;
  pointer-events: none;
  color: #373d3f;
  font-size: 13px;
  text-align: center;
  border-radius: 2px;
  position: absolute;
  z-index: 10;
  background: #eceff1;
  border: 1px solid #90a4ae
}

.apexcharts-xaxistooltip {
  padding: 9px 10px;
  transition: .15s ease all
}

.apexcharts-xaxistooltip.apexcharts-theme-dark {
  background: rgba(0, 0, 0, .7);
  border: 1px solid rgba(0, 0, 0, .5);
  color: #fff
}

.apexcharts-xaxistooltip:after,
.apexcharts-xaxistooltip:before {
  left: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none
}

.apexcharts-xaxistooltip:after {
  border-color: transparent;
  border-width: 6px;
  margin-left: -6px
}

.apexcharts-xaxistooltip:before {
  border-color: transparent;
  border-width: 7px;
  margin-left: -7px
}

.apexcharts-xaxistooltip-bottom:after,
.apexcharts-xaxistooltip-bottom:before {
  bottom: 100%
}

.apexcharts-xaxistooltip-top:after,
.apexcharts-xaxistooltip-top:before {
  top: 100%
}

.apexcharts-xaxistooltip-bottom:after {
  border-bottom-color: #eceff1
}

.apexcharts-xaxistooltip-bottom:before {
  border-bottom-color: #90a4ae
}

.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:after,
.apexcharts-xaxistooltip-bottom.apexcharts-theme-dark:before {
  border-bottom-color: rgba(0, 0, 0, .5)
}

.apexcharts-xaxistooltip-top:after {
  border-top-color: #eceff1
}

.apexcharts-xaxistooltip-top:before {
  border-top-color: #90a4ae
}

.apexcharts-xaxistooltip-top.apexcharts-theme-dark:after,
.apexcharts-xaxistooltip-top.apexcharts-theme-dark:before {
  border-top-color: rgba(0, 0, 0, .5)
}

.apexcharts-xaxistooltip.apexcharts-active {
  opacity: 1;
  transition: .15s ease all
}

.apexcharts-yaxistooltip {
  padding: 4px 10px
}

.apexcharts-yaxistooltip.apexcharts-theme-dark {
  background: rgba(0, 0, 0, .7);
  border: 1px solid rgba(0, 0, 0, .5);
  color: #fff
}

.apexcharts-yaxistooltip:after,
.apexcharts-yaxistooltip:before {
  top: 50%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none
}

.apexcharts-yaxistooltip:after {
  border-color: transparent;
  border-width: 6px;
  margin-top: -6px
}

.apexcharts-yaxistooltip:before {
  border-color: transparent;
  border-width: 7px;
  margin-top: -7px
}

.apexcharts-yaxistooltip-left:after,
.apexcharts-yaxistooltip-left:before {
  left: 100%
}

.apexcharts-yaxistooltip-right:after,
.apexcharts-yaxistooltip-right:before {
  right: 100%
}

.apexcharts-yaxistooltip-left:after {
  border-left-color: #eceff1
}

.apexcharts-yaxistooltip-left:before {
  border-left-color: #90a4ae
}

.apexcharts-yaxistooltip-left.apexcharts-theme-dark:after,
.apexcharts-yaxistooltip-left.apexcharts-theme-dark:before {
  border-left-color: rgba(0, 0, 0, .5)
}

.apexcharts-yaxistooltip-right:after {
  border-right-color: #eceff1
}

.apexcharts-yaxistooltip-right:before {
  border-right-color: #90a4ae
}

.apexcharts-yaxistooltip-right.apexcharts-theme-dark:after,
.apexcharts-yaxistooltip-right.apexcharts-theme-dark:before {
  border-right-color: rgba(0, 0, 0, .5)
}

.apexcharts-yaxistooltip.apexcharts-active {
  opacity: 1
}

.apexcharts-yaxistooltip-hidden {
  display: none
}

.apexcharts-xcrosshairs,
.apexcharts-ycrosshairs {
  pointer-events: none;
  opacity: 0;
  transition: .15s ease all
}

.apexcharts-xcrosshairs.apexcharts-active,
.apexcharts-ycrosshairs.apexcharts-active {
  opacity: 1;
  transition: .15s ease all
}

.apexcharts-ycrosshairs-hidden {
  opacity: 0
}

.apexcharts-selection-rect {
  cursor: move
}

.svg_select_shape {
  stroke-width: 1;
  stroke-dasharray: 10 10;
  stroke: black;
  stroke-opacity: 0.1;
  pointer-events: none;
  fill: none;
}

.svg_select_handle {
  stroke-width: 3;
  stroke: black;
  fill: none;
}

.svg_select_handle_r {
  cursor: e-resize;
}

.svg_select_handle_l {
  cursor: w-resize;
}

.apexcharts-svg.apexcharts-zoomable.hovering-zoom {
  cursor: crosshair
}

.apexcharts-svg.apexcharts-zoomable.hovering-pan {
  cursor: move
}

.apexcharts-menu-icon,
.apexcharts-pan-icon,
.apexcharts-reset-icon,
.apexcharts-selection-icon,
.apexcharts-toolbar-custom-icon,
.apexcharts-zoom-icon,
.apexcharts-zoomin-icon,
.apexcharts-zoomout-icon {
  cursor: pointer;
  width: 20px;
  height: 20px;
  line-height: 24px;
  color: #6e8192;
  text-align: center
}

.apexcharts-menu-icon svg,
.apexcharts-reset-icon svg,
.apexcharts-zoom-icon svg,
.apexcharts-zoomin-icon svg,
.apexcharts-zoomout-icon svg {
  fill: #6e8192
}

.apexcharts-selection-icon svg {
  fill: #444;
  transform: scale(.76)
}

.apexcharts-theme-dark .apexcharts-menu-icon svg,
.apexcharts-theme-dark .apexcharts-pan-icon svg,
.apexcharts-theme-dark .apexcharts-reset-icon svg,
.apexcharts-theme-dark .apexcharts-selection-icon svg,
.apexcharts-theme-dark .apexcharts-toolbar-custom-icon svg,
.apexcharts-theme-dark .apexcharts-zoom-icon svg,
.apexcharts-theme-dark .apexcharts-zoomin-icon svg,
.apexcharts-theme-dark .apexcharts-zoomout-icon svg {
  fill: #f3f4f5
}

.apexcharts-canvas .apexcharts-reset-zoom-icon.apexcharts-selected svg,
.apexcharts-canvas .apexcharts-selection-icon.apexcharts-selected svg,
.apexcharts-canvas .apexcharts-zoom-icon.apexcharts-selected svg {
  fill: #008ffb
}

.apexcharts-theme-light .apexcharts-menu-icon:hover svg,
.apexcharts-theme-light .apexcharts-reset-icon:hover svg,
.apexcharts-theme-light .apexcharts-selection-icon:not(.apexcharts-selected):hover svg,
.apexcharts-theme-light .apexcharts-zoom-icon:not(.apexcharts-selected):hover svg,
.apexcharts-theme-light .apexcharts-zoomin-icon:hover svg,
.apexcharts-theme-light .apexcharts-zoomout-icon:hover svg {
  fill: #333
}

.apexcharts-menu-icon,
.apexcharts-selection-icon {
  position: relative
}

.apexcharts-reset-icon {
  margin-left: 5px
}

.apexcharts-menu-icon,
.apexcharts-reset-icon,
.apexcharts-zoom-icon {
  transform: scale(.85)
}

.apexcharts-zoomin-icon,
.apexcharts-zoomout-icon {
  transform: scale(.7)
}

.apexcharts-zoomout-icon {
  margin-right: 3px
}

.apexcharts-pan-icon {
  transform: scale(.62);
  position: relative;
  left: 1px;
  top: 0
}

.apexcharts-pan-icon svg {
  fill: #fff;
  stroke: #6e8192;
  stroke-width: 2
}

.apexcharts-pan-icon.apexcharts-selected svg {
  stroke: #008ffb
}

.apexcharts-pan-icon:not(.apexcharts-selected):hover svg {
  stroke: #333
}

.apexcharts-toolbar {
  position: absolute;
  z-index: 11;
  max-width: 176px;
  text-align: right;
  border-radius: 3px;
  padding: 0 6px 2px;
  display: flex;
  justify-content: space-between;
  align-items: center
}

.apexcharts-menu {
  background: #fff;
  position: absolute;
  top: 100%;
  border: 1px solid #ddd;
  border-radius: 3px;
  padding: 3px;
  right: 10px;
  opacity: 0;
  min-width: 110px;
  transition: .15s ease all;
  pointer-events: none
}

.apexcharts-menu.apexcharts-menu-open {
  opacity: 1;
  pointer-events: all;
  transition: .15s ease all
}

.apexcharts-menu-item {
  padding: 6px 7px;
  font-size: 12px;
  cursor: pointer
}

.apexcharts-theme-light .apexcharts-menu-item:hover {
  background: #eee
}

.apexcharts-theme-dark .apexcharts-menu {
  background: rgba(0, 0, 0, .7);
  color: #fff
}

@media screen and (min-width:768px) {
  .apexcharts-canvas:hover .apexcharts-toolbar {
    opacity: 1
  }
}

/* Toolbar keyboard accessibility: show toolbar when any button inside it is focused */
.apexcharts-toolbar:focus-within {
  opacity: 1
}

/* Focus indicator for toolbar icon buttons */
.apexcharts-menu-icon:focus-visible,
.apexcharts-pan-icon:focus-visible,
.apexcharts-reset-icon:focus-visible,
.apexcharts-selection-icon:focus-visible,
.apexcharts-toolbar-custom-icon:focus-visible,
.apexcharts-zoom-icon:focus-visible,
.apexcharts-zoomin-icon:focus-visible,
.apexcharts-zoomout-icon:focus-visible {
  outline: 2px solid #008FFB;
  outline-offset: 2px;
  border-radius: 2px
}

/* Focus indicator for hamburger menu items */
.apexcharts-menu-item:focus-visible {
  outline: 2px solid #008FFB;
  outline-offset: -2px;
  background: #eee
}

.apexcharts-canvas .apexcharts-element-hidden,
.apexcharts-datalabel.apexcharts-element-hidden,
.apexcharts-hide .apexcharts-series-points {
  opacity: 0;
}

.apexcharts-hidden-element-shown {
  opacity: 1;
  transition: 0.25s ease all;
}

.apexcharts-datalabel,
.apexcharts-datalabel-label,
.apexcharts-datalabel-value,
.apexcharts-datalabels,
.apexcharts-pie-label {
  cursor: default;
  pointer-events: none
}

.apexcharts-pie-label-delay {
  opacity: 0;
  animation-name: opaque;
  animation-duration: .3s;
  animation-fill-mode: forwards;
  animation-timing-function: ease
}

.apexcharts-radialbar-label {
  cursor: pointer;
}

.apexcharts-annotation-rect,
.apexcharts-area-series .apexcharts-area,
.apexcharts-gridline,
.apexcharts-line,
.apexcharts-point-annotation-label,
.apexcharts-radar-series path:not(.apexcharts-marker),
.apexcharts-radar-series polygon,
.apexcharts-toolbar svg,
.apexcharts-tooltip .apexcharts-marker,
.apexcharts-xaxis-annotation-label,
.apexcharts-yaxis-annotation-label,
.apexcharts-zoom-rect,
.no-pointer-events {
  pointer-events: none
}

.apexcharts-tooltip-active .apexcharts-marker {
  transition: .15s ease all
}

.apexcharts-radar-series .apexcharts-yaxis {
  pointer-events: none;
}

.resize-triggers {
  animation: 1ms resizeanim;
  visibility: hidden;
  opacity: 0;
  height: 100%;
  width: 100%;
  overflow: hidden
}

.contract-trigger:before,
.resize-triggers,
.resize-triggers>div {
  content: " ";
  display: block;
  position: absolute;
  top: 0;
  left: 0
}

.resize-triggers>div {
  height: 100%;
  width: 100%;
  background: #eee;
  overflow: auto
}

.contract-trigger:before {
  overflow: hidden;
  width: 200%;
  height: 200%
}

.apexcharts-bar-goals-markers {
  pointer-events: none
}

.apexcharts-bar-shadows {
  pointer-events: none
}

.apexcharts-rangebar-goals-markers {
  pointer-events: none
}

.apexcharts-disable-transitions * {
  transition: none !important;
}`;
class K {
  constructor(t, e) {
    this.opts = e, this.ctx = this, this.w = new Be(e).init(), this.el = t, this.w.globals.cuid = L.randomId(), this.w.globals.chartID = this.w.config.chart.id ? L.escapeString(this.w.config.chart.id) : this.w.globals.cuid, new St(this).initModules(), this.lastUpdateOptions = null, this.create = this.create.bind(this), B.isBrowser() && (this.windowResizeHandler = this._windowResizeHandler.bind(this), this.parentResizeHandler = this._parentResizeCallback.bind(this));
  }
  /**
   * The primary method user will call to render the chart.
   */
  render() {
    return new Promise((t, e) => {
      var s;
      if (L.elementExists(this.el)) {
        typeof Apex._chartInstances > "u" && (Apex._chartInstances = []), this.w.config.chart.id && Apex._chartInstances.push({
          id: this.w.globals.chartID,
          group: this.w.config.chart.group,
          chart: this
        }), this.setLocale(this.w.config.chart.defaultLocale);
        const i = this.w.config.chart.events.beforeMount;
        if (typeof i == "function" && i(this, this.w), this.events.fireEvent("beforeMount", [this, this.w]), B.isBrowser()) {
          window.addEventListener("resize", this.windowResizeHandler), Ls(this.el.parentNode, this.parentResizeHandler);
          const o = this.el.getRootNode && this.el.getRootNode(), r = L.is("ShadowRoot", o), n = this.el.ownerDocument;
          let l = r ? o.getElementById("apexcharts-css") : n.getElementById("apexcharts-css");
          if (!l) {
            l = N.createElementNS("http://www.w3.org/1999/xhtml", "style"), l.id = "apexcharts-css", l.textContent = Ts;
            const c = ((s = this.opts.chart) == null ? void 0 : s.nonce) || this.w.config.chart.nonce;
            c && l.setAttribute("nonce", c), r ? o.prepend(l) : this.w.config.chart.injectStyleSheet !== !1 && n.head.appendChild(l);
          }
        }
        const a = this.create(this.w.config.series, {});
        if (!a)
          return t(this);
        this.mount(a).then(() => {
          typeof this.w.config.chart.events.mounted == "function" && this.w.config.chart.events.mounted(this, this.w), this.events.fireEvent("mounted", [this, this.w]), t(a);
        }).catch((o) => {
          e(o);
        });
      } else
        e(new Error("Element not found"));
    });
  }
  create(t, e) {
    var s;
    const i = this.w;
    new St(this).initModules();
    const o = this.w.globals;
    if (o.noData = !1, o.animationEnded = !1, !L.elementExists(this.el) || (this.responsive.checkResponsiveConfig(e), i.config.xaxis.convertedCatToNumeric && new bt(i.config).convertCatToNumericXaxis(i.config, this.ctx), this.core.setupElements(), i.config.chart.type === "treemap" && (i.config.grid.show = !1, i.config.yaxis[0].show = !1), o.svgWidth === 0))
      return o.animationEnded = !0, null;
    let r = t;
    t.forEach((u, y) => {
      u.hidden && (r = this.legend.legendHelpers.getSeriesAfterCollapsing({
        realIndex: y
      }));
    });
    const n = V.checkComboSeries(r, i.config.chart.type);
    o.comboCharts = n.comboCharts, o.comboBarCount = n.comboBarCount;
    const l = r.every((u) => u.data && u.data.length === 0);
    (r.length === 0 || l && o.collapsedSeries.length < 1) && this.series.handleNoData(), B.isBrowser() && this.events.setupEventHandlers();
    const c = this.data.parseData(r);
    this._writeParsedSeriesData(c.seriesData), this._writeParsedRangeData(c.rangeData), this._writeParsedCandleData(c.candleData), this._writeParsedLabelData(c.labelData), this._writeParsedAxisFlags(c.axisFlags), this.theme.init(), new xt(this.w, this).setGlobalMarkerSize(), this.formatters.setLabelFormatters(), this.titleSubtitle.draw(), (!o.noData || o.collapsedSeries.length === i.seriesData.series.length || i.config.legend.showForSingleSeries) && ((s = this.legend) == null || s.init()), this.series.hasAllSeriesEqualX(), o.axisCharts && (this.core.coreCalculations(), i.config.xaxis.type !== "category" && this.formatters.setLabelFormatters(), this.ctx.toolbar && (this.ctx.toolbar.minX = i.globals.minX, this.ctx.toolbar.maxX = i.globals.maxX)), this.formatters.heatmapLabelFormatters(), new V(this.w).getLargestMarkerSize();
    const p = this.dimensions.plotCoords();
    this._writeLayoutCoords(p.layout);
    const g = this.core.xySettings();
    this.grid.createGridMask();
    const f = this.core.plotChartType(r, g), x = new gt(this.w, this);
    x.bringForward(), i.config.dataLabels.background.enabled && x.dataLabelsBackground(), this.core.shiftGraphPosition(), i.globals.dataPoints > 50 && i.dom.elWrap.classList.add("apexcharts-disable-transitions");
    const m = {
      plot: {
        left: i.layout.translateX,
        top: i.layout.translateY,
        width: i.layout.gridWidth,
        height: i.layout.gridHeight
      }
    };
    return {
      elGraph: f,
      xyRatios: g,
      dimensions: m
    };
  }
  mount(t = null) {
    const e = this, s = e.w;
    return new Promise((i, a) => {
      var o, r, n, l, c, h, d, p;
      if (e.el === null)
        return a(
          new Error("Not enough data to display or target element not found")
        );
      (t === null || s.globals.allSeriesCollapsed) && e.series.handleNoData(), e.grid = new fe(e.w, e);
      const g = e.grid.drawGrid(), f = St._featureRegistry.get("annotations");
      if (e.annotations = f ? new f(e.w, { theme: e.theme, timeScale: e.timeScale }) : null, (o = e.annotations) == null || o.drawImageAnnos(), (r = e.annotations) == null || r.drawTextAnnos(), s.config.grid.position === "back" && (g && s.dom.elGraphical.add(g.el), (n = g == null ? void 0 : g.elGridBorders) != null && n.node && s.dom.elGraphical.add(g.elGridBorders)), Array.isArray(t.elGraph))
        for (let u = 0; u < t.elGraph.length; u++)
          s.dom.elGraphical.add(t.elGraph[u]);
      else
        s.dom.elGraphical.add(t.elGraph);
      s.config.grid.position === "front" && (g && s.dom.elGraphical.add(g.el), (l = g == null ? void 0 : g.elGridBorders) != null && l.node && s.dom.elGraphical.add(g.elGridBorders)), s.config.xaxis.crosshairs.position === "front" && e.crosshairs.drawXCrosshairs(), s.config.yaxis[0].crosshairs.position === "front" && e.crosshairs.drawYCrosshairs(), s.config.chart.type !== "treemap" && e.axes.drawAxis(s.config.chart.type, g);
      const x = new wt(this.w, this.ctx, g), m = new _t(this.w, { theme: this.theme, timeScale: this.timeScale }, g);
      if (g !== null && (x.xAxisLabelCorrections(g.xAxisTickWidth), m.setYAxisTextAlignments(), s.config.yaxis.map((u, y) => {
        s.globals.ignoreYAxisIndexes.indexOf(y) === -1 && m.yAxisTitleRotate(y, u.opposite);
      })), (c = e.annotations) == null || c.drawAxesAnnotations(), !s.globals.noData) {
        if (B.isBrowser() && s.config.tooltip.enabled && !s.globals.noData && e.w.globals.tooltip.drawTooltip(t.xyRatios), s.config.chart.accessibility.enabled && s.config.chart.accessibility.keyboard.enabled && s.config.chart.accessibility.keyboard.navigation.enabled && ((h = e.keyboardNavigation) == null || h.init()), B.isBrowser() && s.globals.axisCharts && (s.axisFlags.isXNumeric || s.config.xaxis.convertedCatToNumeric || s.axisFlags.isRangeBar))
          (s.config.chart.zoom.enabled || s.config.chart.selection && s.config.chart.selection.enabled || s.config.chart.pan && s.config.chart.pan.enabled) && ((d = e.zoomPanSelection) == null || d.init({
            xyRatios: t.xyRatios
          }));
        else {
          const u = s.config.chart.toolbar.tools;
          [
            "zoom",
            "zoomin",
            "zoomout",
            "selection",
            "pan",
            "reset"
          ].forEach((b) => {
            u[b] = !1;
          });
        }
        s.config.chart.toolbar.show && !s.globals.allSeriesCollapsed && ((p = e.toolbar) == null || p.createToolbar());
      }
      s.globals.memory.methodsToExec.length > 0 && s.globals.memory.methodsToExec.forEach((u) => {
        u.method(u.params, !1, u.context);
      }), !s.globals.axisCharts && !s.globals.noData && e.core.resizeNonAxisCharts(), i(e);
    });
  }
  /**
   * Destroy the chart instance by removing all elements which also clean up event listeners on those elements.
   */
  destroy() {
    B.isBrowser() && (window.removeEventListener("resize", this.windowResizeHandler), Ds(this.el.parentNode, this.parentResizeHandler));
    const t = this.w.config.chart.id;
    t && Apex._chartInstances.forEach((e, s) => {
      e.id === L.escapeString(t) && Apex._chartInstances.splice(s, 1);
    }), this._keyboardNavigation && this._keyboardNavigation.destroy(), new ee(this.ctx).clear({ isUpdating: !1 });
  }
  /**
   * Allows users to update Options after the chart has rendered.
   *
   * @param {object} options - A new config object can be passed which will be merged with the existing config object
   * @param {boolean} redraw - should redraw from beginning or should use existing paths and redraw from there
   * @param {boolean} animate - should animate or not on updating Options
   */
  updateOptions(t, e = !1, s = !0, i = !0, a = !0) {
    const o = this.w;
    if (o.interact.selection = void 0, this.lastUpdateOptions) {
      if (L.shallowEqual(this.lastUpdateOptions, t))
        return this;
      if (t.series && this.lastUpdateOptions.series && JSON.stringify(this.lastUpdateOptions.series) === JSON.stringify(t.series)) {
        const r = I({}, t), n = I({}, this.lastUpdateOptions);
        if (delete r.series, delete n.series, L.shallowEqual(r, n))
          return this;
      }
    }
    return t.series && (this.data.resetParsingFlags(), this.series.resetSeries(!1, !0, !1), t.series.length && t.series[0].data && (t.series = t.series.map((r, n) => this.updateHelpers._extendSeries(r, n))), this.updateHelpers.revertDefaultAxisMinMax()), t.xaxis && (t = this.updateHelpers.forceXAxisUpdate(t)), t.yaxis && (t = this.updateHelpers.forceYAxisUpdate(t)), o.globals.collapsedSeriesIndices.length > 0 && this.series.clearPreviousPaths(), t.theme && (t = this.theme.updateThemeOptions(t)), this.updateHelpers._updateOptions(
      t,
      e,
      s,
      i,
      a
    );
  }
  /**
   * Allows users to update Series after the chart has rendered.
   *
   * @param {array} series - New series which will override the existing
   */
  updateSeries(t = [], e = !0, s = !0) {
    return this.data.resetParsingFlags(), this.series.resetSeries(!1), this.updateHelpers.revertDefaultAxisMinMax(), this.updateHelpers._updateSeries(
      t,
      e,
      s
    );
  }
  /**
   * Allows users to append a new series after the chart has rendered.
   *
   * @param {array} newSerie - New serie which will be appended to the existing series
   */
  appendSeries(t, e = !0, s = !0) {
    this.data.resetParsingFlags();
    const i = this.w.config.series.slice();
    return i.push(t), this.series.resetSeries(!1), this.updateHelpers.revertDefaultAxisMinMax(), this.updateHelpers._updateSeries(
      i,
      e,
      s
    );
  }
  /**
   * Allows users to append Data to series.
   *
   * @param {array} newData - New data in the same format as series
   */
  appendData(t, e = !0) {
    const s = this;
    s.data.resetParsingFlags(), s.w.globals.dataChanged = !0, s.series.getPreviousPaths();
    const i = s.w.config.series.slice();
    for (let a = 0; a < i.length; a++)
      if (t[a] !== null && typeof t[a] < "u")
        for (let o = 0; o < t[a].data.length; o++)
          i[a].data.push(t[a].data[o]);
    return s.w.config.series = i, e && (s.w.globals.initialSeries = L.clone(s.w.config.series)), this.update();
  }
  update(t) {
    return new Promise((e, s) => {
      if (this.lastUpdateOptions && JSON.stringify(this.lastUpdateOptions) === JSON.stringify(t))
        return e(this);
      this.lastUpdateOptions = L.clone(t), new ee(this.ctx).clear({ isUpdating: !0 });
      const i = this.create(this.w.config.series, t);
      if (!i)
        return e(this);
      this.mount(i).then(() => {
        typeof this.w.config.chart.events.updated == "function" && this.w.config.chart.events.updated(this, this.w), this.events.fireEvent("updated", [this, this.w]), this.w.globals.isDirty = !0, e(this);
      }).catch((a) => {
        s(a);
      });
    });
  }
  /**
   * Get all charts in the same "group" (including the instance which is called upon) to sync them when user zooms in/out or pan.
   */
  getSyncedCharts() {
    const t = this.getGroupedCharts();
    let e = [this];
    return t.length && (e = [], t.forEach((s) => {
      e.push(s);
    })), e;
  }
  /**
   * Get charts in the same "group" (excluding the instance which is called upon) to perform operations on the other charts of the same group (eg., tooltip hovering)
   */
  getGroupedCharts() {
    return Apex._chartInstances.filter((t) => {
      if (t.group)
        return !0;
    }).map((t) => this.w.config.chart.group === t.group ? t.chart : this);
  }
  static getChartByID(t) {
    const e = L.escapeString(t);
    if (!Apex._chartInstances)
      return;
    const s = Apex._chartInstances.filter((i) => i.id === e)[0];
    return s && s.chart;
  }
  /**
   * Allows the user to provide data attrs in the element and the chart will render automatically when this method is called by searching for the elements containing 'data-apexcharts' attribute
   */
  static initOnLoad() {
    const t = document.querySelectorAll("[data-apexcharts]");
    for (let e = 0; e < t.length; e++) {
      const s = t[e], i = JSON.parse(t[e].getAttribute("data-options"));
      new K(s, i).render();
    }
  }
  /**
   * This static method allows users to call chart methods without necessarily from the
   * instance of the chart in case user has assigned chartID to the targeted chart.
   * The chartID is used for mapping the instance stored in Apex._chartInstances global variable
   *
   * This is helpful in cases when you don't have reference of the chart instance
   * easily and need to call the method from anywhere.
   * For eg, in React/Vue applications when you have many parent/child components,
   * and need easy reference to other charts for performing dynamic operations
   *
   * @param {string} chartID - The unique identifier which will be used to call methods
   * on that chart instance
   * @param {function} fn - The method name to call
   * @param {object} opts - The parameters which are accepted in the original method will be passed here in the same order.
   */
  static exec(t, e, ...s) {
    const i = this.getChartByID(t);
    if (!i)
      return;
    i.w.globals.isExecCalled = !0;
    let a = null;
    return i.publicMethods.indexOf(e) !== -1 && (a = i[e](...s)), a;
  }
  static merge(t, e) {
    return L.extend(t, e);
  }
  static getThemePalettes() {
    return Yt();
  }
  /**
   * Register additional chart types. Used by sub-entry points so that only
   * the types they include are bundled.
   *
   * @param {Record<string, Function>} typeMap  e.g. { line: Line, area: Line }
   */
  static use(t) {
    Ke(t);
  }
  /**
   * Register optional feature modules (Exports, Legend, Toolbar,
   * ZoomPanSelection, KeyboardNavigation, Annotations).
   *
   * Call this before rendering any chart. Feature entry files (e.g.
   * `apexcharts/features/legend`) call this automatically when imported.
   * Note: Tooltip is part of core and does not need to be registered.
   *
   * @param {Record<string, Function>} featureMap  e.g. { legend: Legend, exports: Exports }
   */
  static registerFeatures(t) {
    St.registerFeatures(t);
  }
  toggleSeries(t) {
    return this.series.toggleSeries(t);
  }
  highlightSeriesOnLegendHover(t, e) {
    return this.series.toggleSeriesOnHover(t, e);
  }
  showSeries(t) {
    this.series.showSeries(t);
  }
  hideSeries(t) {
    this.series.hideSeries(t);
  }
  highlightSeries(t) {
    this.series.highlightSeries(t);
  }
  isSeriesHidden(t) {
    this.series.isSeriesHidden(t);
  }
  resetSeries(t = !0, e = !0) {
    this.series.resetSeries(t, e);
  }
  // Public method to add event listener on chart context
  addEventListener(t, e) {
    this.events.addEventListener(t, e);
  }
  // Public method to remove event listener on chart context
  removeEventListener(t, e) {
    this.events.removeEventListener(t, e);
  }
  addXaxisAnnotation(t, e = !0, s = void 0) {
    var i;
    let a = this;
    s && (a = s), (i = a.annotations) == null || i.addXaxisAnnotationExternal(t, e, a);
  }
  addYaxisAnnotation(t, e = !0, s = void 0) {
    var i;
    let a = this;
    s && (a = s), (i = a.annotations) == null || i.addYaxisAnnotationExternal(t, e, a);
  }
  addPointAnnotation(t, e = !0, s = void 0) {
    var i;
    let a = this;
    s && (a = s), (i = a.annotations) == null || i.addPointAnnotationExternal(t, e, a);
  }
  clearAnnotations(t = void 0) {
    var e;
    let s = this;
    t && (s = t), (e = s.annotations) == null || e.clearAnnotations(s);
  }
  removeAnnotation(t, e = void 0) {
    var s;
    let i = this;
    e && (i = e), (s = i.annotations) == null || s.removeAnnotation(i, t);
  }
  getChartArea() {
    return this.w.dom.baseEl.querySelector(".apexcharts-inner");
  }
  getSeriesTotalXRange(t, e) {
    return this.coreUtils.getSeriesTotalsXRange(t, e);
  }
  getHighestValueInSeries(t = 0) {
    return new It(this.w).getMinYMaxY(t).highestY;
  }
  getLowestValueInSeries(t = 0) {
    return new It(this.w).getMinYMaxY(t).lowestY;
  }
  getSeriesTotal() {
    return this.w.globals.seriesTotals;
  }
  /**
   * Returns a curated snapshot of chart state for use in formatters, events,
   * and external integrations. Prefer this over accessing `chart.w` directly.
   *
   * The shape of this object is stable and versioned. `chart.w` is internal
   * and will be restricted in a future major version.
   */
  getState() {
    const t = this.w, e = t.globals;
    return {
      // Series data — computed/parsed form used for rendering
      series: t.seriesData.series,
      seriesNames: t.seriesData.seriesNames,
      colors: e.colors,
      labels: t.labelData.labels,
      seriesTotals: e.seriesTotals,
      seriesPercent: e.seriesPercent,
      seriesXvalues: e.seriesXvalues,
      seriesYvalues: e.seriesYvalues,
      // Axis bounds — updated after each render
      minX: e.minX,
      maxX: e.maxX,
      minY: e.minY,
      maxY: e.maxY,
      minYArr: e.minYArr,
      maxYArr: e.maxYArr,
      minXDiff: e.minXDiff,
      dataPoints: e.dataPoints,
      // Axis scale objects — computed tick/scale results
      xAxisScale: e.xAxisScale,
      yAxisScale: e.yAxisScale,
      xTickAmount: e.xTickAmount,
      // Axis type flags
      isXNumeric: t.axisFlags.isXNumeric,
      // Multi-axis series mapping
      seriesYAxisMap: e.seriesYAxisMap,
      seriesYAxisReverseMap: e.seriesYAxisReverseMap,
      // Chart dimensions — updated after each render/resize
      svgWidth: e.svgWidth,
      svgHeight: e.svgHeight,
      gridWidth: t.layout.gridWidth,
      gridHeight: t.layout.gridHeight,
      // Interactive state
      selectedDataPoints: t.interact.selectedDataPoints,
      collapsedSeriesIndices: e.collapsedSeriesIndices,
      zoomed: t.interact.zoomed,
      // Chart-type-specific series data (null when not applicable)
      seriesX: t.seriesData.seriesX,
      seriesZ: t.seriesData.seriesZ,
      seriesCandleO: t.candleData.seriesCandleO,
      seriesCandleH: t.candleData.seriesCandleH,
      seriesCandleM: t.candleData.seriesCandleM,
      seriesCandleL: t.candleData.seriesCandleL,
      seriesCandleC: t.candleData.seriesCandleC,
      seriesRangeStart: t.rangeData.seriesRangeStart,
      seriesRangeEnd: t.rangeData.seriesRangeEnd,
      seriesGoals: t.seriesData.seriesGoals
    };
  }
  toggleDataPointSelection(t, e) {
    return this.updateHelpers.toggleDataPointSelection(
      t,
      e
    );
  }
  zoomX(t, e) {
    var s;
    (s = this.ctx.toolbar) == null || s.zoomUpdateOptions(t, e);
  }
  setLocale(t) {
    this.localization.setCurrentLocaleValues(t);
  }
  dataURI(t) {
    if (!this.ctx.exports)
      throw new Error("apexcharts: Exports feature is not registered. Import apexcharts/features/exports.");
    return this.ctx.exports.dataURI(t);
  }
  getSvgString(t) {
    if (!this.ctx.exports)
      throw new Error("apexcharts: Exports feature is not registered. Import apexcharts/features/exports.");
    return this.ctx.exports.getSvgString(t);
  }
  exportToCSV(t = {}) {
    if (!this.ctx.exports)
      throw new Error("apexcharts: Exports feature is not registered. Import apexcharts/features/exports.");
    return this.ctx.exports.exportToCSV(t);
  }
  paper() {
    return this.w.dom.Paper;
  }
  // ─── Slice write-back stubs ─────────────────────────────────────────────────
  _writeParsedSeriesData(t) {
    Object.assign(this.w.seriesData, t);
  }
  _writeParsedRangeData(t) {
    Object.assign(this.w.rangeData, t);
  }
  _writeParsedCandleData(t) {
    Object.assign(this.w.candleData, t);
  }
  _writeParsedLabelData(t) {
    Object.assign(this.w.labelData, t);
  }
  _writeParsedAxisFlags(t) {
    Object.assign(this.w.axisFlags, t);
  }
  _writeLayoutCoords(t) {
    Object.assign(this.w.layout, t);
  }
  _parentResizeCallback() {
    this.w.globals.animationEnded && this.w.config.chart.redrawOnParentResize && this._windowResize();
  }
  /**
   * Handle window resize and re-draw the whole chart.
   */
  _windowResize() {
    clearTimeout(this.w.globals.resizeTimer), this.w.globals.resizeTimer = window.setTimeout(() => {
      this.w.globals.resized = !0, this.w.globals.dataChanged = !1, this.ctx.update();
    }, 150);
  }
  _windowResizeHandler() {
    let { redrawOnWindowResize: t } = this.w.config.chart;
    typeof t == "function" && (t = t()), t && this._windowResize();
  }
}
const ve = `.apexcharts-flip-y {
  transform: scaleY(-1) translateY(-100%);
  transform-origin: top;
  transform-box: fill-box;
}
.apexcharts-flip-x {
  transform: scaleX(-1);
  transform-origin: center;
  transform-box: fill-box;
}
.apexcharts-legend {
  display: flex;
  overflow: auto;
  padding: 0 10px;
}
.apexcharts-legend.apexcharts-legend-group-horizontal {
  flex-direction: column;
}
.apexcharts-legend-group {
  display: flex;
}
.apexcharts-legend-group-vertical {
  flex-direction: column-reverse;
}
.apexcharts-legend.apx-legend-position-bottom, .apexcharts-legend.apx-legend-position-top {
  flex-wrap: wrap
}
.apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {
  flex-direction: column;
  bottom: 0;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-left, .apexcharts-legend.apx-legend-position-top.apexcharts-align-left, .apexcharts-legend.apx-legend-position-right, .apexcharts-legend.apx-legend-position-left {
  justify-content: flex-start;
  align-items: flex-start;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-center, .apexcharts-legend.apx-legend-position-top.apexcharts-align-center {
  justify-content: center;
  align-items: center;
}
.apexcharts-legend.apx-legend-position-bottom.apexcharts-align-right, .apexcharts-legend.apx-legend-position-top.apexcharts-align-right {
  justify-content: flex-end;
  align-items: flex-end;
}
.apexcharts-legend-series {
  cursor: pointer;
  line-height: normal;
  display: flex;
  align-items: center;
}
.apexcharts-legend-text {
  position: relative;
  font-size: 14px;
}
.apexcharts-legend-text *, .apexcharts-legend-marker * {
  pointer-events: none;
}
.apexcharts-legend-marker {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-right: 1px;
}

.apexcharts-legend-series.apexcharts-no-click {
  cursor: auto;
}
.apexcharts-legend .apexcharts-hidden-zero-series, .apexcharts-legend .apexcharts-hidden-null-series {
  display: none !important;
}
.apexcharts-inactive-legend {
  opacity: 0.45;
} `;
class Ae {
  constructor(t, e) {
    this.w = t, this.ctx = e;
  }
  svgStringToNode(t) {
    return new DOMParser().parseFromString(t, "image/svg+xml").documentElement;
  }
  scaleSvgNode(t, e) {
    const s = parseFloat(t.getAttributeNS(null, "width")), i = parseFloat(t.getAttributeNS(null, "height"));
    t.setAttributeNS(null, "width", s * e), t.setAttributeNS(null, "height", i * e), t.setAttributeNS(null, "viewBox", "0 0 " + s + " " + i);
  }
  getSvgString(t) {
    return new Promise((e) => {
      const s = this.w;
      let i = t || s.config.chart.toolbar.export.scale || s.config.chart.toolbar.export.width / s.globals.svgWidth;
      i || (i = 1);
      const a = s.globals.svgWidth * i, o = s.globals.svgHeight * i, r = s.dom.elWrap.cloneNode(!0);
      r.style.width = a + "px", r.style.height = o + "px";
      const n = new XMLSerializer().serializeToString(r), l = s.config.legend.show && s.dom.elLegendWrap && s.dom.elLegendWrap.children.length > 0;
      let c = `
        .apexcharts-tooltip, .apexcharts-toolbar, .apexcharts-xaxistooltip, .apexcharts-yaxistooltip, .apexcharts-xcrosshairs, .apexcharts-ycrosshairs, .apexcharts-zoom-rect, .apexcharts-selection-rect {
          display: none;
        }
      `;
      l && (c += ve);
      let h = `
        <svg xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          class="apexcharts-svg"
          xmlns:data="ApexChartsNS"
          transform="translate(0, 0)"
          width="${s.globals.svgWidth}px" height="${s.globals.svgHeight}px">
          <foreignObject width="100%" height="100%">
            <div xmlns="http://www.w3.org/1999/xhtml" style="width:${a}px; height:${o}px;">
            <style type="text/css">
              ${c}
            </style>
              ${n}
            </div>
          </foreignObject>
        </svg>
      `;
      const d = this.svgStringToNode(h);
      i !== 1 && this.scaleSvgNode(d, i), this.convertImagesToBase64(d).then(() => {
        h = new XMLSerializer().serializeToString(d), e(h.replace(/&nbsp;/g, "&#160;"));
      });
    });
  }
  convertImagesToBase64(t) {
    const e = t.getElementsByTagName("image"), s = Array.from(e).map((i) => {
      const a = i.getAttributeNS("http://www.w3.org/1999/xlink", "href");
      return a && !a.startsWith("data:") ? this.getBase64FromUrl(a).then((o) => {
        i.setAttributeNS("http://www.w3.org/1999/xlink", "href", o);
      }).catch((o) => {
        console.error("Error converting image to base64:", o);
      }) : Promise.resolve();
    });
    return Promise.all(s);
  }
  getBase64FromUrl(t) {
    return B.isSSR() ? Promise.resolve(t) : new Promise((e, s) => {
      const i = new Image();
      i.crossOrigin = "Anonymous", i.onload = () => {
        const a = document.createElement("canvas");
        a.width = i.width, a.height = i.height, a.getContext("2d").drawImage(i, 0, 0), e(a.toDataURL());
      }, i.onerror = s, i.src = t;
    });
  }
  svgUrl() {
    return new Promise((t) => {
      this.getSvgString().then((e) => {
        const s = new Blob([e], {
          type: "image/svg+xml;charset=utf-8"
        });
        t(URL.createObjectURL(s));
      });
    });
  }
  dataURI(t) {
    return B.isSSR() ? Promise.resolve({ imgURI: "" }) : new Promise((e) => {
      const s = this.w, i = t ? t.scale || t.width / s.globals.svgWidth : 1, a = document.createElement("canvas");
      a.width = s.globals.svgWidth * i, a.height = parseInt(s.dom.elWrap.style.height, 10) * i;
      const o = s.config.chart.background === "transparent" || !s.config.chart.background ? "#fff" : s.config.chart.background, r = a.getContext("2d");
      r.fillStyle = o, r.fillRect(0, 0, a.width * i, a.height * i), this.getSvgString(i).then((n) => {
        const l = "data:image/svg+xml," + encodeURIComponent(n), c = new Image();
        c.crossOrigin = "anonymous", c.onload = () => {
          if (r.drawImage(c, 0, 0), a.msToBlob) {
            const h = a.msToBlob();
            e({ blob: h });
          } else {
            const h = a.toDataURL("image/png");
            e({ imgURI: h });
          }
        }, c.src = l;
      });
    });
  }
  exportToSVG() {
    this.svgUrl().then((t) => {
      this.triggerDownload(
        t,
        this.w.config.chart.toolbar.export.svg.filename,
        ".svg"
      );
    });
  }
  exportToPng() {
    const t = this.w.config.chart.toolbar.export.scale, e = this.w.config.chart.toolbar.export.width, s = t ? { scale: t } : e ? { width: e } : void 0;
    this.dataURI(s).then(({ imgURI: i, blob: a }) => {
      a ? navigator.msSaveOrOpenBlob(a, this.w.globals.chartID + ".png") : this.triggerDownload(
        i,
        this.w.config.chart.toolbar.export.png.filename,
        ".png"
      );
    });
  }
  exportToCSV({
    series: t,
    fileName: e,
    columnDelimiter: s = ",",
    lineDelimiter: i = `
`
  }) {
    const a = this.w;
    t || (t = a.config.series);
    let o = [];
    const r = [];
    let n = "";
    const l = "\uFEFF", c = a.seriesData.series.map((b, w) => a.globals.collapsedSeriesIndices.indexOf(w) === -1 ? b : []), h = (b) => typeof a.config.chart.toolbar.export.csv.categoryFormatter == "function" ? a.config.chart.toolbar.export.csv.categoryFormatter(b) : a.config.xaxis.type === "datetime" && String(b).length >= 10 ? new Date(b).toDateString() : L.isNumber(b) ? b : b.split(s).join(""), d = (b) => typeof a.config.chart.toolbar.export.csv.valueFormatter == "function" ? a.config.chart.toolbar.export.csv.valueFormatter(b) : b, p = Math.max(
      ...t.map((b) => b.data ? b.data.length : 0)
    ), g = new Wt(this.w), f = new at(this.w, { theme: this.ctx.theme, timeScale: this.ctx.timeScale }), x = (b) => {
      let w = "";
      if (!a.globals.axisCharts)
        w = a.config.labels[b];
      else {
        if (a.config.xaxis.type === "category" || a.config.xaxis.convertedCatToNumeric)
          if (a.globals.isBarHorizontal) {
            const v = a.formatters.yLabelFormatters[0], D = new U(this.ctx.w).getActiveConfigSeriesIndex();
            w = v(a.labelData.labels[b], {
              seriesIndex: D,
              dataPointIndex: b,
              w: a
            });
          } else
            w = f.getLabel(
              a.labelData.labels,
              a.labelData.timescaleLabels,
              0,
              b
            ).text;
        a.config.xaxis.type === "datetime" && (a.config.xaxis.categories.length ? w = a.config.xaxis.categories[b] : a.config.labels.length && (w = a.config.labels[b]));
      }
      return w === null ? "nullvalue" : (Array.isArray(w) && (w = w.join(" ")), L.isNumber(w) ? w : w.split(s).join(""));
    }, m = () => [...Array(p)].map(() => ""), u = (b, w) => {
      var v;
      if (o.length && w === 0 && r.push(o.join(s)), b.data) {
        b.data = b.data.length && b.data || m();
        for (let C = 0; C < b.data.length; C++) {
          o = [];
          let D = x(C);
          if (D !== "nullvalue") {
            if (D || (g.isFormatXY() ? D = t[w].data[C].x : g.isFormat2DArray() && (D = t[w].data[C] ? t[w].data[C][0] : "")), w === 0) {
              o.push(h(D));
              for (let S = 0; S < a.seriesData.series.length; S++) {
                const k = g.isFormatXY() ? (v = t[S].data[C]) == null ? void 0 : v.y : c[S][C];
                o.push(d(k));
              }
            }
            (a.config.chart.type === "candlestick" || b.type && b.type === "candlestick") && (o.pop(), o.push(a.candleData.seriesCandleO[w][C]), o.push(a.candleData.seriesCandleH[w][C]), o.push(a.candleData.seriesCandleL[w][C]), o.push(a.candleData.seriesCandleC[w][C])), (a.config.chart.type === "boxPlot" || b.type && b.type === "boxPlot") && (o.pop(), o.push(a.candleData.seriesCandleO[w][C]), o.push(a.candleData.seriesCandleH[w][C]), o.push(a.candleData.seriesCandleM[w][C]), o.push(a.candleData.seriesCandleL[w][C]), o.push(a.candleData.seriesCandleC[w][C])), a.config.chart.type === "rangeBar" && (o.pop(), o.push(a.rangeData.seriesRangeStart[w][C]), o.push(a.rangeData.seriesRangeEnd[w][C])), o.length && r.push(o.join(s));
          }
        }
      }
    }, y = () => {
      const b = /* @__PURE__ */ new Set(), w = {};
      t.forEach((v, C) => {
        v == null || v.data.forEach((D) => {
          let S, k;
          if (g.isFormatXY())
            S = D.x, k = D.y;
          else if (g.isFormat2DArray())
            S = D[0], k = D[1];
          else
            return;
          w[S] || (w[S] = Array(t.length).fill("")), w[S][C] = d(k), b.add(S);
        });
      }), o.length && r.push(o.join(s)), Array.from(b).sort().forEach((v) => {
        r.push([
          h(v),
          w[v].join(s)
        ]);
      });
    };
    o.push(a.config.chart.toolbar.export.csv.headerCategory), a.config.chart.type === "boxPlot" ? (o.push("minimum"), o.push("q1"), o.push("median"), o.push("q3"), o.push("maximum")) : a.config.chart.type === "candlestick" ? (o.push("open"), o.push("high"), o.push("low"), o.push("close")) : a.config.chart.type === "rangeBar" ? (o.push("minimum"), o.push("maximum")) : t.map((b, w) => {
      const v = (b.name ? b.name : `series-${w}`) + "";
      a.globals.axisCharts && o.push(
        v.split(s).join("") ? v.split(s).join("") : `series-${w}`
      );
    }), a.globals.axisCharts || (o.push(a.config.chart.toolbar.export.csv.headerValue), r.push(o.join(s))), !a.globals.allSeriesHasEqualX && a.globals.axisCharts && !a.config.xaxis.categories.length && !a.config.labels.length ? y() : t.map((b, w) => {
      a.globals.axisCharts ? u(b, w) : (o = [], o.push(h(a.labelData.labels[w])), o.push(d(c[w])), r.push(o.join(s)));
    }), n += r.join(i), this.triggerDownload(
      "data:text/csv; charset=utf-8," + encodeURIComponent(l + n),
      e || a.config.chart.toolbar.export.csv.filename,
      ".csv"
    );
  }
  triggerDownload(t, e, s) {
    if (B.isSSR())
      return;
    const i = document.createElement("a");
    i.href = t, i.download = (e || this.w.globals.chartID) + s, document.body.appendChild(i), i.click(), document.body.removeChild(i);
  }
}
K.registerFeatures({ exports: Ae });
let Ms = class {
  constructor(t) {
    this.w = t.w, this.lgCtx = t;
  }
  getLegendStyles() {
    if (B.isSSR())
      return null;
    const t = document.createElement("style");
    t.setAttribute("type", "text/css");
    const e = this.w.config.chart.nonce;
    e && t.setAttribute("nonce", e);
    const s = document.createTextNode(ve);
    return t.appendChild(s), t;
  }
  getLegendDimensions() {
    const e = this.w.dom.baseEl.querySelector(".apexcharts-legend");
    if (!e)
      return { clwh: 0, clww: 0 };
    const { width: s, height: i } = e.getBoundingClientRect();
    return {
      clwh: i,
      clww: s
    };
  }
  appendToForeignObject() {
    const t = this.getLegendStyles();
    this.w.config.chart.injectStyleSheet !== !1 && t && this.w.dom.elLegendForeign.appendChild(t);
  }
  toggleDataSeries(t, e) {
    const s = this.w;
    if (s.globals.axisCharts || s.config.chart.type === "radialBar") {
      s.globals.resized = !0;
      let i = null, a = null;
      if (s.globals.risingSeries = [], s.globals.axisCharts) {
        if (i = s.dom.baseEl.querySelector(
          `.apexcharts-series[data\\:realIndex='${t}']`
        ), !i)
          return;
        a = parseInt(i.getAttribute("data:realIndex"), 10);
      } else {
        if (i = s.dom.baseEl.querySelector(
          `.apexcharts-series[rel='${t + 1}']`
        ), !i)
          return;
        a = parseInt(i.getAttribute("rel"), 10) - 1;
      }
      if (e ? [
        {
          cs: s.globals.collapsedSeries,
          csi: s.globals.collapsedSeriesIndices
        },
        {
          cs: s.globals.ancillaryCollapsedSeries,
          csi: s.globals.ancillaryCollapsedSeriesIndices
        }
      ].forEach((r) => {
        this.riseCollapsedSeries(r.cs, r.csi, a);
      }) : this.hideSeries({ seriesEl: i, realIndex: a }), s.config.chart.accessibility.enabled) {
        const o = s.dom.baseEl.querySelector(
          `.apexcharts-legend-series[rel="${t + 1}"]`
        );
        if (o) {
          const r = s.globals.collapsedSeriesIndices.includes(a) || s.globals.ancillaryCollapsedSeriesIndices.includes(a);
          o.setAttribute(
            "aria-pressed",
            r ? "true" : "false"
          );
          const n = o.querySelector(
            ".apexcharts-legend-text"
          ), l = n ? n.textContent : s.seriesData.seriesNames[t], c = r ? "hidden" : "visible";
          o.setAttribute(
            "aria-label",
            `${l}, ${c}. Press Enter or Space to toggle.`
          );
        }
      }
    } else {
      const i = s.dom.Paper.findOne(
        ` .apexcharts-series[rel='${t + 1}'] path`
      ), a = s.config.chart.type;
      if (a === "pie" || a === "polarArea" || a === "donut") {
        const o = s.config.plotOptions.pie.donut.labels;
        new P(this.w).pathMouseDown(i, null), this.lgCtx.printDataLabelsInner(i.node, o);
      }
      if (s.config.chart.accessibility.enabled) {
        const o = s.dom.baseEl.querySelector(
          `.apexcharts-legend-series[rel="${t + 1}"]`
        );
        if (o) {
          const r = s.globals.collapsedSeriesIndices.includes(t);
          o.setAttribute(
            "aria-pressed",
            r ? "true" : "false"
          );
          const n = o.querySelector(
            ".apexcharts-legend-text"
          ), l = n ? n.textContent : s.seriesData.seriesNames[t], c = r ? "hidden" : "visible";
          o.setAttribute(
            "aria-label",
            `${l}, ${c}. Press Enter or Space to toggle.`
          );
        }
      }
    }
  }
  getSeriesAfterCollapsing({ realIndex: t }) {
    const e = this.w, s = e.globals, i = L.clone(e.config.series);
    if (s.axisCharts) {
      const a = e.config.yaxis[s.seriesYAxisReverseMap[t]], o = {
        index: t,
        data: i[t].data.slice(),
        type: i[t].type || e.config.chart.type
      };
      if (a && a.show && a.showAlways)
        s.ancillaryCollapsedSeriesIndices.indexOf(t) < 0 && (s.ancillaryCollapsedSeries.push(o), s.ancillaryCollapsedSeriesIndices.push(t));
      else if (s.collapsedSeriesIndices.indexOf(t) < 0) {
        s.collapsedSeries.push(o), s.collapsedSeriesIndices.push(t);
        const r = s.risingSeries.indexOf(t);
        s.risingSeries.splice(r, 1);
      }
    } else
      s.collapsedSeries.push({
        index: t,
        data: i[t]
      }), s.collapsedSeriesIndices.push(t);
    return s.allSeriesCollapsed = s.collapsedSeries.length + s.ancillaryCollapsedSeries.length === e.config.series.length, this._getSeriesBasedOnCollapsedState(i);
  }
  hideSeries({ seriesEl: t, realIndex: e }) {
    const s = this.w, i = this.getSeriesAfterCollapsing({
      realIndex: e
    }), a = t.childNodes;
    for (let o = 0; o < a.length; o++)
      a[o].classList.contains("apexcharts-series-markers-wrap") && (a[o].classList.contains("apexcharts-hide") ? a[o].classList.remove("apexcharts-hide") : a[o].classList.add("apexcharts-hide"));
    this.lgCtx.updateSeries(
      i,
      s.config.chart.animations.dynamicAnimation.enabled
    );
  }
  riseCollapsedSeries(t, e, s) {
    const i = this.w;
    let a = L.clone(i.config.series);
    if (t.length > 0) {
      for (let o = 0; o < t.length; o++)
        t[o].index === s && (i.globals.axisCharts ? a[s].data = t[o].data.slice() : a[s] = t[o].data, typeof a[s] != "number" && (a[s].hidden = !1), t.splice(o, 1), e.splice(o, 1), i.globals.risingSeries.push(s), o--);
      a = this._getSeriesBasedOnCollapsedState(a), this.lgCtx.updateSeries(
        a,
        i.config.chart.animations.dynamicAnimation.enabled
      );
    }
  }
  _getSeriesBasedOnCollapsedState(t) {
    const e = this.w;
    let s = 0;
    return e.globals.axisCharts ? t.forEach((i, a) => {
      e.globals.collapsedSeriesIndices.indexOf(a) < 0 && e.globals.ancillaryCollapsedSeriesIndices.indexOf(a) < 0 || (t[a].data = [], s++);
    }) : t.forEach((i, a) => {
      e.globals.collapsedSeriesIndices.indexOf(a) < 0 || (t[a] = 0, s++);
    }), e.globals.allSeriesCollapsed = s === t.length, t;
  }
};
class Ps {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.printDataLabelsInner = (...s) => {
      var i;
      return (i = e.pie) == null ? void 0 : i.printDataLabelsInner(...s);
    }, this.updateSeries = (...s) => e.updateHelpers._updateSeries(...s), this.onLegendClick = this.onLegendClick.bind(this), this.onLegendHovered = this.onLegendHovered.bind(this), this.isBarsDistributed = this.w.config.chart.type === "bar" && this.w.config.plotOptions.bar.distributed && this.w.config.series.length === 1, this.legendHelpers = new Ms(this);
  }
  init() {
    const t = this.w, e = t.globals, s = t.config, i = s.legend.showForSingleSeries && this.w.seriesData.series.length === 1 || this.isBarsDistributed || this.w.seriesData.series.length > 1;
    if (this.legendHelpers.appendToForeignObject(), (i || !e.axisCharts) && s.legend.show) {
      for (; t.dom.elLegendWrap.firstChild; )
        t.dom.elLegendWrap.removeChild(t.dom.elLegendWrap.firstChild);
      this.drawLegends(), s.legend.position === "bottom" || s.legend.position === "top" ? this.legendAlignHorizontal() : (s.legend.position === "right" || s.legend.position === "left") && this.legendAlignVertical();
    }
  }
  createLegendMarker({ i: t, fillcolor: e }) {
    const s = this.w, i = N.createElement("span");
    i.classList.add("apexcharts-legend-marker");
    const a = s.config.legend.markers.shape || s.config.markers.shape;
    let o = a;
    Array.isArray(a) && (o = a[t]);
    const r = Array.isArray(s.config.legend.markers.size) ? parseFloat(s.config.legend.markers.size[t]) : parseFloat(s.config.legend.markers.size), n = Array.isArray(s.config.legend.markers.offsetX) ? parseFloat(s.config.legend.markers.offsetX[t]) : parseFloat(s.config.legend.markers.offsetX), l = Array.isArray(s.config.legend.markers.offsetY) ? parseFloat(s.config.legend.markers.offsetY[t]) : parseFloat(s.config.legend.markers.offsetY), c = Array.isArray(s.config.legend.markers.strokeWidth) ? parseFloat(s.config.legend.markers.strokeWidth[t]) : parseFloat(s.config.legend.markers.strokeWidth), h = i.style;
    if (h.height = (r + c) * 2 + "px", h.width = (r + c) * 2 + "px", h.left = n + "px", h.top = l + "px", s.config.legend.markers.customHTML)
      h.background = "transparent", h.color = e[t], Array.isArray(s.config.legend.markers.customHTML) ? s.config.legend.markers.customHTML[t] && (i.innerHTML = s.config.legend.markers.customHTML[t]()) : i.innerHTML = s.config.legend.markers.customHTML();
    else {
      const p = new xt(this.ctx.w, this.ctx).getMarkerConfig({
        cssClass: `apexcharts-legend-marker apexcharts-marker apexcharts-marker-${o}`,
        seriesIndex: t,
        strokeWidth: c,
        size: r
      }), f = (B.isBrowser() ? window.SVG : global.SVG)().addTo(i).size("100%", "100%"), x = new P(this.w).drawMarker(0, 0, O(I({}, p), {
        pointFillColor: Array.isArray(e) ? e[t] : p.pointFillColor,
        shape: o
      }));
      s.dom.Paper.find(
        ".apexcharts-legend-marker.apexcharts-marker"
      ).forEach((u) => {
        u.node.classList.contains("apexcharts-marker-triangle") ? u.node.style.transform = "translate(50%, 45%)" : u.node.style.transform = "translate(50%, 50%)";
      }), f.add(x);
    }
    return i;
  }
  drawLegends() {
    var t;
    const e = this, s = this.w, i = s.config.legend.fontFamily;
    let a = s.seriesData.seriesNames, o = s.config.legend.markers.fillColors ? s.config.legend.markers.fillColors.slice() : s.globals.colors.slice();
    if (s.config.chart.type === "heatmap") {
      const c = s.config.plotOptions.heatmap.colorScale.ranges;
      a = c.map((h) => h.name ? h.name : h.from + " - " + h.to), o = c.map((h) => h.color);
    } else
      this.isBarsDistributed && (a = s.labelData.labels.slice());
    s.config.legend.customLegendItems.length && (a = s.config.legend.customLegendItems);
    const r = s.formatters.legendFormatter, n = s.config.legend.inverseOrder, l = [];
    s.labelData.seriesGroups.length > 1 && s.config.legend.clusterGroupedSeries && s.labelData.seriesGroups.forEach((c, h) => {
      l[h] = N.createElement("div"), l[h].classList.add(
        "apexcharts-legend-group",
        `apexcharts-legend-group-${h}`
      ), s.config.legend.clusterGroupedSeriesOrientation === "horizontal" ? s.dom.elLegendWrap.classList.add(
        "apexcharts-legend-group-horizontal"
      ) : l[h].classList.add("apexcharts-legend-group-vertical");
    });
    for (let c = n ? a.length - 1 : 0; n ? c >= 0 : c <= a.length - 1; n ? c-- : c++) {
      const h = r(a[c], { seriesIndex: c, w: s });
      let d = !1, p = !1;
      if (s.globals.collapsedSeries.length > 0)
        for (let y = 0; y < s.globals.collapsedSeries.length; y++)
          s.globals.collapsedSeries[y].index === c && (d = !0);
      if (s.globals.ancillaryCollapsedSeriesIndices.length > 0)
        for (let y = 0; y < s.globals.ancillaryCollapsedSeriesIndices.length; y++)
          s.globals.ancillaryCollapsedSeriesIndices[y] === c && (p = !0);
      const g = this.createLegendMarker({ i: c, fillcolor: o });
      P.setAttrs(g, {
        rel: c + 1,
        "data:collapsed": d || p
      }), (d || p) && g.classList.add("apexcharts-inactive-legend");
      const f = N.createElement("div");
      if (s.config.chart.accessibility.enabled && s.config.chart.accessibility.keyboard.enabled) {
        f.setAttribute("role", "button"), f.setAttribute("tabindex", "0");
        const y = Array.isArray(h) ? h.join(" ") : h, b = d || p, w = b ? "hidden" : "visible";
        f.setAttribute(
          "aria-label",
          `${y}, ${w}. Press Enter or Space to toggle.`
        ), f.setAttribute("aria-pressed", b ? "true" : "false");
      }
      const x = N.createElement("span");
      x.classList.add("apexcharts-legend-text"), x.innerHTML = Array.isArray(h) ? h.join(" ") : h;
      let m = s.config.legend.labels.useSeriesColors ? s.globals.colors[c] : Array.isArray(s.config.legend.labels.colors) ? (t = s.config.legend.labels.colors) == null ? void 0 : t[c] : s.config.legend.labels.colors;
      m || (m = s.config.chart.foreColor), x.style.color = m, x.style.fontSize = s.config.legend.fontSize, x.style.fontWeight = s.config.legend.fontWeight, x.style.fontFamily = i || s.config.chart.fontFamily, P.setAttrs(x, {
        rel: c + 1,
        i: c,
        "data:default-text": encodeURIComponent(h),
        "data:collapsed": d || p
      }), f.appendChild(g), f.appendChild(x);
      const u = new V(this.w);
      s.config.legend.showForZeroSeries || u.getSeriesTotalByIndex(c) === 0 && u.seriesHaveSameValues(c) && !u.isSeriesNull(c) && s.globals.collapsedSeriesIndices.indexOf(c) === -1 && s.globals.ancillaryCollapsedSeriesIndices.indexOf(c) === -1 && f.classList.add("apexcharts-hidden-zero-series"), s.config.legend.showForNullSeries || u.isSeriesNull(c) && s.globals.collapsedSeriesIndices.indexOf(c) === -1 && s.globals.ancillaryCollapsedSeriesIndices.indexOf(c) === -1 && f.classList.add("apexcharts-hidden-null-series"), l.length ? s.labelData.seriesGroups.forEach((y, b) => {
        var w;
        y.includes((w = s.config.series[c]) == null ? void 0 : w.name) && (s.dom.elLegendWrap.appendChild(l[b]), l[b].appendChild(f));
      }) : s.dom.elLegendWrap.appendChild(f), s.dom.elLegendWrap.classList.add(
        `apexcharts-align-${s.config.legend.horizontalAlign}`
      ), s.dom.elLegendWrap.classList.add(
        "apx-legend-position-" + s.config.legend.position
      ), f.classList.add("apexcharts-legend-series"), f.style.margin = `${s.config.legend.itemMargin.vertical}px ${s.config.legend.itemMargin.horizontal}px`, s.dom.elLegendWrap.style.width = s.config.legend.width ? s.config.legend.width + "px" : "", s.dom.elLegendWrap.style.height = s.config.legend.height ? s.config.legend.height + "px" : "", P.setAttrs(f, {
        rel: c + 1,
        seriesName: L.escapeString(a[c]),
        "data:collapsed": d || p
      }), (d || p) && f.classList.add("apexcharts-inactive-legend"), s.config.legend.onItemClick.toggleDataSeries || f.classList.add("apexcharts-no-click");
    }
    s.dom.elWrap.addEventListener("click", e.onLegendClick, !0), s.config.legend.onItemHover.highlightDataSeries && s.config.legend.customLegendItems.length === 0 && (s.dom.elWrap.addEventListener(
      "mousemove",
      e.onLegendHovered,
      !0
    ), s.dom.elWrap.addEventListener(
      "mouseout",
      e.onLegendHovered,
      !0
    )), s.config.chart.accessibility.enabled && s.config.chart.accessibility.keyboard.enabled && s.dom.elWrap.addEventListener("keydown", e.onLegendKeyDown.bind(e), !0);
  }
  setLegendWrapXY(t, e) {
    const s = this.w, i = s.dom.elLegendWrap, a = i.clientHeight;
    let o = 0, r = 0;
    if (s.config.legend.position === "bottom")
      r = s.globals.svgHeight - Math.min(a, s.globals.svgHeight / 2) - 5;
    else if (s.config.legend.position === "top") {
      const l = new Dt(this.w, this.ctx), c = l.dimHelpers.getTitleSubtitleCoords("title").height, h = l.dimHelpers.getTitleSubtitleCoords("subtitle").height;
      r = (c > 0 ? c - 10 : 0) + (h > 0 ? h - 10 : 0);
    }
    i.style.position = "absolute", o = o + t + s.config.legend.offsetX, r = r + e + s.config.legend.offsetY, i.style.left = o + "px", i.style.top = r + "px", s.config.legend.position === "right" && (i.style.left = "auto", i.style.right = 25 + s.config.legend.offsetX + "px"), ["width", "height"].forEach((l) => {
      i.style[l] && (i.style[l] = parseInt(s.config.legend[l], 10) + "px");
    });
  }
  legendAlignHorizontal() {
    const t = this.w, e = t.dom.elLegendWrap;
    e.style.right = 0;
    const s = new Dt(this.w, this.ctx), i = s.dimHelpers.getTitleSubtitleCoords("title"), a = s.dimHelpers.getTitleSubtitleCoords("subtitle"), o = 20;
    let r = 0;
    t.config.legend.position === "top" && (r = i.height + a.height + t.config.title.margin + t.config.subtitle.margin - 10), this.setLegendWrapXY(o, r);
  }
  legendAlignVertical() {
    const t = this.w, e = this.legendHelpers.getLegendDimensions(), s = 20;
    let i = 0;
    t.config.legend.position === "left" && (i = 20), t.config.legend.position === "right" && (i = t.globals.svgWidth - e.clww - 10), this.setLegendWrapXY(i, s);
  }
  onLegendHovered(t) {
    const e = this.w, s = t.target.classList.contains("apexcharts-legend-series") || t.target.classList.contains("apexcharts-legend-text") || t.target.classList.contains("apexcharts-legend-marker");
    if (e.config.chart.type !== "heatmap" && !this.isBarsDistributed)
      !t.target.classList.contains("apexcharts-inactive-legend") && s && new U(this.ctx.w).toggleSeriesOnHover(t, t.target);
    else if (s) {
      const i = parseInt(t.target.getAttribute("rel"), 10) - 1;
      this.ctx.events.fireEvent("legendHover", [this.ctx, i, this.w]), new U(this.ctx.w).highlightRangeInSeries(t, t.target);
    }
  }
  onLegendKeyDown(t) {
    const e = this, s = this.w;
    if ((t.target.classList.contains("apexcharts-legend-series") || t.target.classList.contains("apexcharts-legend-text") || t.target.classList.contains("apexcharts-legend-marker")) && (t.key === "Enter" || t.key === " ")) {
      t.preventDefault();
      const a = t.target.getAttribute("rel");
      e.onLegendClick(t), a !== null && s.config.legend.onItemClick.toggleDataSeries && requestAnimationFrame(() => {
        const o = s.dom.baseEl.querySelector(
          `.apexcharts-legend-series[rel="${a}"]`
        );
        o && o.focus();
      });
    }
  }
  onLegendClick(t) {
    const e = this.w;
    if (!e.config.legend.customLegendItems.length && (t.target.classList.contains("apexcharts-legend-series") || t.target.classList.contains("apexcharts-legend-text") || t.target.classList.contains("apexcharts-legend-marker"))) {
      const s = parseInt(t.target.getAttribute("rel"), 10) - 1, i = t.target.getAttribute("data:collapsed") === "true", a = this.w.config.chart.events.legendClick;
      typeof a == "function" && a(this.ctx, s, this.w), this.ctx.events.fireEvent("legendClick", [this.ctx, s, this.w]);
      const o = this.w.config.legend.markers.onClick;
      typeof o == "function" && t.target.classList.contains("apexcharts-legend-marker") && (o(this.ctx, s, this.w), this.ctx.events.fireEvent("legendMarkerClick", [
        this.ctx,
        s,
        this.w
      ])), e.config.chart.type !== "treemap" && e.config.chart.type !== "heatmap" && !this.isBarsDistributed && e.config.legend.onItemClick.toggleDataSeries && this.legendHelpers.toggleDataSeries(s, i);
    }
  }
}
K.registerFeatures({ legend: Ps });
const Fs = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
    <defs>
        <path d="M0 0h24v24H0z" id="a"/>
    </defs>
    <clipPath id="b">
        <use overflow="visible" xlink:href="#a"/>
    </clipPath>
    <path clip-path="url(#b)" d="M23 5.5V20c0 2.2-1.8 4-4 4h-7.3c-1.08 0-2.1-.43-2.85-1.19L1 14.83s1.26-1.23 1.3-1.25c.22-.19.49-.29.79-.29.22 0 .42.06.6.16.04.01 4.31 2.46 4.31 2.46V4c0-.83.67-1.5 1.5-1.5S11 3.17 11 4v7h1V1.5c0-.83.67-1.5 1.5-1.5S15 .67 15 1.5V11h1V2.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V11h1V5.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5z"/>
</svg>`, Es = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" height="24" viewBox="0 0 24 24" width="24">
    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"/>
</svg>`, Xs = `<svg fill="#000000" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
    <path d="M0 0h24v24H0z" fill="none"/>
</svg>`, Rs = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M13 7h-2v4H7v2h4v4h2v-4h4v-2h-4V7zm-1-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
</svg>
`, Is = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M7 11v2h10v-2H7zm5-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
</svg>
`, Ys = `<svg fill="#6E8192" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h24v24H0z" fill="none"/>
    <path d="M3 5h2V3c-1.1 0-2 .9-2 2zm0 8h2v-2H3v2zm4 8h2v-2H7v2zM3 9h2V7H3v2zm10-6h-2v2h2V3zm6 0v2h2c0-1.1-.9-2-2-2zM5 21v-2H3c0 1.1.9 2 2 2zm-2-4h2v-2H3v2zM9 3H7v2h2V3zm2 18h2v-2h-2v2zm8-8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2zm0-12h2V7h-2v2zm0 8h2v-2h-2v2zm-4 4h2v-2h-2v2zm0-16h2V3h-2v2z"/>
</svg>`, Bs = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"/></svg>';
class Ce {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.ev = this.w.config.chart.events, this.selectedClass = "apexcharts-selected", this.localeValues = this.w.globals.locale.toolbar, this.minX = t.globals.minX, this.maxX = t.globals.maxX;
  }
  createToolbar() {
    const t = this.w, e = () => N.createElementNS("http://www.w3.org/1999/xhtml", "div"), s = e();
    if (s.setAttribute("class", "apexcharts-toolbar"), s.style.top = t.config.chart.toolbar.offsetY + "px", s.style.right = -t.config.chart.toolbar.offsetX + 3 + "px", t.dom.elWrap.appendChild(s), this.elZoom = e(), this.elZoomIn = e(), this.elZoomOut = e(), this.elPan = e(), this.elSelection = e(), this.elZoomReset = e(), this.elMenuIcon = e(), this.elMenu = e(), this.elCustomIcons = [], this.t = t.config.chart.toolbar.tools, Array.isArray(this.t.customIcons))
      for (let r = 0; r < this.t.customIcons.length; r++)
        this.elCustomIcons.push(e());
    const i = [], a = (r, n, l) => {
      const c = r.toLowerCase();
      this.t[c] && t.config.chart.zoom.enabled && i.push({
        el: n,
        icon: typeof this.t[c] == "string" ? this.t[c] : l,
        title: this.localeValues[r],
        class: `apexcharts-${c}-icon`
      });
    };
    a("zoomIn", this.elZoomIn, Rs), a("zoomOut", this.elZoomOut, Is);
    const o = (r) => {
      this.t[r] && t.config.chart[r].enabled && i.push({
        el: r === "zoom" ? this.elZoom : this.elSelection,
        icon: typeof this.t[r] == "string" ? this.t[r] : r === "zoom" ? Es : Ys,
        title: this.localeValues[r === "zoom" ? "selectionZoom" : "selection"],
        class: `apexcharts-${r}-icon`
      });
    };
    o("zoom"), o("selection"), this.t.pan && t.config.chart.zoom.enabled && i.push({
      el: this.elPan,
      icon: typeof this.t.pan == "string" ? this.t.pan : Fs,
      title: this.localeValues.pan,
      class: "apexcharts-pan-icon"
    }), a("reset", this.elZoomReset, Xs), this.t.download && i.push({
      el: this.elMenuIcon,
      icon: typeof this.t.download == "string" ? this.t.download : Bs,
      title: this.localeValues.menu,
      class: "apexcharts-menu-icon"
    });
    for (let r = 0; r < this.elCustomIcons.length; r++)
      i.push({
        el: this.elCustomIcons[r],
        icon: this.t.customIcons[r].icon,
        title: this.t.customIcons[r].title,
        index: this.t.customIcons[r].index,
        class: "apexcharts-toolbar-custom-icon " + this.t.customIcons[r].class
      });
    i.forEach((r, n) => {
      r.index && L.moveIndexInArray(i, n, r.index);
    });
    for (let r = 0; r < i.length; r++)
      P.setAttrs(i[r].el, {
        class: i[r].class,
        title: i[r].title,
        tabindex: "0",
        role: "button",
        "aria-label": i[r].title
      }), i[r].el.innerHTML = i[r].icon, s.appendChild(i[r].el);
    this.elZoom.parentNode && this.elZoom.setAttribute("aria-pressed", String(!!t.interact.zoomEnabled)), this.elSelection.parentNode && this.elSelection.setAttribute("aria-pressed", String(!!t.interact.selectionEnabled)), this.elPan.parentNode && this.elPan.setAttribute("aria-pressed", String(!!t.interact.panEnabled)), this.elMenuIcon.parentNode && (this.elMenuIcon.setAttribute("aria-haspopup", "true"), this.elMenuIcon.setAttribute("aria-expanded", "false")), this._createHamburgerMenu(s), t.interact.zoomEnabled ? this.elZoom.classList.add(this.selectedClass) : t.interact.panEnabled ? this.elPan.classList.add(this.selectedClass) : t.interact.selectionEnabled && this.elSelection.classList.add(this.selectedClass), this.addToolbarEventListeners();
  }
  _createHamburgerMenu(t) {
    this.elMenuItems = [], t.appendChild(this.elMenu), P.setAttrs(this.elMenu, {
      class: "apexcharts-menu",
      role: "menu"
    });
    const e = [
      {
        name: "exportSVG",
        title: this.localeValues.exportToSVG
      },
      {
        name: "exportPNG",
        title: this.localeValues.exportToPNG
      },
      {
        name: "exportCSV",
        title: this.localeValues.exportToCSV
      }
    ];
    for (let s = 0; s < e.length; s++)
      this.elMenuItems.push(N.createElementNS("http://www.w3.org/1999/xhtml", "div")), this.elMenuItems[s].innerHTML = e[s].title, P.setAttrs(this.elMenuItems[s], {
        class: `apexcharts-menu-item ${e[s].name}`,
        title: e[s].title,
        role: "menuitem",
        tabindex: "-1"
      }), this.elMenu.appendChild(this.elMenuItems[s]);
  }
  addToolbarEventListeners() {
    this.elZoomReset.addEventListener("click", this.handleZoomReset.bind(this)), this.elSelection.addEventListener(
      "click",
      this.toggleZoomSelection.bind(this, "selection")
    ), this.elZoom.addEventListener(
      "click",
      this.toggleZoomSelection.bind(this, "zoom")
    ), this.elZoomIn.addEventListener("click", this.handleZoomIn.bind(this)), this.elZoomOut.addEventListener("click", this.handleZoomOut.bind(this)), this.elPan.addEventListener("click", this.togglePanning.bind(this)), this.elMenuIcon.addEventListener("click", this.toggleMenu.bind(this)), this.elMenuItems.forEach((e) => {
      e.classList.contains("exportSVG") ? e.addEventListener("click", this.handleDownload.bind(this, "svg")) : e.classList.contains("exportPNG") ? e.addEventListener("click", this.handleDownload.bind(this, "png")) : e.classList.contains("exportCSV") && e.addEventListener("click", this.handleDownload.bind(this, "csv"));
    });
    for (let e = 0; e < this.t.customIcons.length; e++)
      this.elCustomIcons[e].addEventListener(
        "click",
        this.t.customIcons[e].click.bind(this, this.ctx, this.ctx.w)
      );
    [
      this.elZoomReset,
      this.elSelection,
      this.elZoom,
      this.elZoomIn,
      this.elZoomOut,
      this.elPan,
      this.elMenuIcon,
      ...this.elCustomIcons
    ].forEach((e) => {
      e.addEventListener("keydown", (s) => {
        if (s.key === "Enter" || s.key === " ") {
          s.preventDefault();
          const i = e.className;
          e.click(), requestAnimationFrame(() => {
            const a = this.w.dom.baseEl;
            if (!a)
              return;
            const o = i.split(" ").find((n) => n.startsWith("apexcharts-"));
            if (!o)
              return;
            const r = a.querySelector(`.${o}`);
            r && r.focus();
          });
        }
      });
    }), this.elMenuIcon.addEventListener("keydown", (e) => {
      (e.key === "ArrowDown" || e.key === "ArrowUp") && (e.preventDefault(), this.elMenu.classList.contains("apexcharts-menu-open") || this.toggleMenu(), window.setTimeout(() => {
        const s = e.key === "ArrowDown" ? 0 : this.elMenuItems.length - 1;
        this.elMenuItems[s] && this.elMenuItems[s].focus();
      }, 20));
    }), this.elMenuItems.forEach((e, s) => {
      e.addEventListener("keydown", (i) => {
        i.key === "ArrowDown" ? (i.preventDefault(), (this.elMenuItems[s + 1] || this.elMenuItems[0]).focus()) : i.key === "ArrowUp" ? (i.preventDefault(), (this.elMenuItems[s - 1] || this.elMenuItems[this.elMenuItems.length - 1]).focus()) : i.key === "Escape" || i.key === "Tab" ? (this._closeMenu(), this.elMenuIcon.focus(), i.key === "Tab" || i.preventDefault()) : (i.key === "Enter" || i.key === " ") && (i.preventDefault(), e.click());
      });
    });
  }
  toggleZoomSelection(t) {
    this.ctx.getSyncedCharts().forEach((s) => {
      s.ctx.toolbar.toggleOtherControls();
      const i = t === "selection" ? s.ctx.toolbar.elSelection : s.ctx.toolbar.elZoom, a = t === "selection" ? "selectionEnabled" : "zoomEnabled";
      s.w.globals[a] = !s.w.globals[a], i.classList.contains(s.ctx.toolbar.selectedClass) ? i.classList.remove(s.ctx.toolbar.selectedClass) : i.classList.add(s.ctx.toolbar.selectedClass), i.setAttribute("aria-pressed", String(s.w.globals[a]));
    });
  }
  getToolbarIconsReference() {
    const t = this.w;
    this.elZoom || (this.elZoom = t.dom.baseEl.querySelector(".apexcharts-zoom-icon")), this.elPan || (this.elPan = t.dom.baseEl.querySelector(".apexcharts-pan-icon")), this.elSelection || (this.elSelection = t.dom.baseEl.querySelector(
      ".apexcharts-selection-icon"
    ));
  }
  enableZoomPanFromToolbar(t) {
    this.toggleOtherControls(), t === "pan" ? this.w.interact.panEnabled = !0 : this.w.interact.zoomEnabled = !0;
    const e = t === "pan" ? this.elPan : this.elZoom, s = t === "pan" ? this.elZoom : this.elPan;
    e && e.classList.add(this.selectedClass), s && s.classList.remove(this.selectedClass);
  }
  togglePanning() {
    this.ctx.getSyncedCharts().forEach((e) => {
      e.ctx.toolbar.toggleOtherControls(), e.w.interact.panEnabled = !e.w.interact.panEnabled, e.ctx.toolbar.elPan.classList.contains(e.ctx.toolbar.selectedClass) ? e.ctx.toolbar.elPan.classList.remove(e.ctx.toolbar.selectedClass) : e.ctx.toolbar.elPan.classList.add(e.ctx.toolbar.selectedClass), e.ctx.toolbar.elPan.setAttribute(
        "aria-pressed",
        String(e.w.interact.panEnabled)
      );
    });
  }
  toggleOtherControls() {
    const t = this.w;
    t.interact.panEnabled = !1, t.interact.zoomEnabled = !1, t.interact.selectionEnabled = !1, this.getToolbarIconsReference(), [this.elPan, this.elSelection, this.elZoom].forEach((s) => {
      s && s.classList.remove(this.selectedClass);
    });
  }
  handleZoomIn() {
    const t = this.w;
    t.axisFlags.isRangeBar && (this.minX = t.globals.minY, this.maxX = t.globals.maxY);
    const e = (this.minX + this.maxX) / 2, s = (this.minX + e) / 2, i = (this.maxX + e) / 2, a = this._getNewMinXMaxX(s, i);
    t.interact.disableZoomIn || this.zoomUpdateOptions(a.minX, a.maxX);
  }
  handleZoomOut() {
    const t = this.w;
    if (t.axisFlags.isRangeBar && (this.minX = t.globals.minY, this.maxX = t.globals.maxY), t.config.xaxis.type === "datetime" && new Date(this.minX).getUTCFullYear() < 1e3)
      return;
    const e = (this.minX + this.maxX) / 2, s = this.minX - (e - this.minX), i = this.maxX - (e - this.maxX), a = this._getNewMinXMaxX(s, i);
    t.interact.disableZoomOut || this.zoomUpdateOptions(a.minX, a.maxX);
  }
  _getNewMinXMaxX(t, e) {
    const s = this.w.config.xaxis.convertedCatToNumeric;
    return {
      minX: s ? Math.floor(t) : t,
      maxX: s ? Math.floor(e) : e
    };
  }
  zoomUpdateOptions(t, e) {
    const s = this.w;
    if (t === void 0 && e === void 0) {
      this.handleZoomReset();
      return;
    }
    if (s.config.xaxis.convertedCatToNumeric && (t < 1 && (t = 1, e = s.globals.dataPoints), e - t < 2))
      return;
    let i = {
      min: t,
      max: e
    };
    const a = this.getBeforeZoomRange(i);
    a && (i = a.xaxis);
    const o = {
      xaxis: i
    }, r = L.clone(s.globals.initialConfig.yaxis);
    s.config.chart.group || (o.yaxis = r), this.w.interact.zoomed = !0, this.ctx.updateHelpers._updateOptions(
      o,
      !1,
      this.w.config.chart.animations.dynamicAnimation.enabled
    ), this.zoomCallback(i, r);
  }
  zoomCallback(t, e) {
    typeof this.ev.zoomed == "function" && (this.ev.zoomed(this.ctx, { xaxis: t, yaxis: e }), this.ctx.events.fireEvent("zoomed", { xaxis: t, yaxis: e }));
  }
  getBeforeZoomRange(t, e) {
    let s = null;
    return typeof this.ev.beforeZoom == "function" && (s = this.ev.beforeZoom(this, { xaxis: t, yaxis: e })), s;
  }
  toggleMenu() {
    window.setTimeout(() => {
      this.elMenu.classList.contains("apexcharts-menu-open") ? this._closeMenu() : (this.elMenu.classList.add("apexcharts-menu-open"), this.elMenuIcon.setAttribute("aria-expanded", "true"));
    }, 0);
  }
  _closeMenu() {
    this.elMenu.classList.remove("apexcharts-menu-open"), this.elMenuIcon.setAttribute("aria-expanded", "false");
  }
  handleDownload(t) {
    const e = this.w, s = new Ae(this.w, this.ctx);
    switch (t) {
      case "svg":
        s.exportToSVG(this.ctx);
        break;
      case "png":
        s.exportToPng(this.ctx);
        break;
      case "csv":
        s.exportToCSV({
          series: e.config.series,
          columnDelimiter: e.config.chart.toolbar.export.csv.columnDelimiter
        });
        break;
    }
  }
  handleZoomReset() {
    this.ctx.getSyncedCharts().forEach((e) => {
      const s = e.w;
      if (s.globals.lastXAxis.min = s.globals.initialConfig.xaxis.min, s.globals.lastXAxis.max = s.globals.initialConfig.xaxis.max, e.updateHelpers.revertDefaultAxisMinMax(), typeof s.config.chart.events.beforeResetZoom == "function") {
        const a = s.config.chart.events.beforeResetZoom(e, s);
        a && e.updateHelpers.revertDefaultAxisMinMax(a);
      }
      typeof s.config.chart.events.zoomed == "function" && e.ctx.toolbar.zoomCallback({
        min: s.config.xaxis.min,
        max: s.config.xaxis.max
      }), s.interact.zoomed = !1;
      const i = e.ctx.series.emptyCollapsedSeries(
        L.clone(s.globals.initialSeries)
      );
      e.updateHelpers._updateSeries(
        i,
        s.config.chart.animations.dynamicAnimation.enabled
      );
    });
  }
  destroy() {
    this.elZoom = null, this.elZoomIn = null, this.elZoomOut = null, this.elPan = null, this.elSelection = null, this.elZoomReset = null, this.elMenuIcon = null;
  }
}
class Ns extends Ce {
  constructor(t, e) {
    super(t, e), this.w = t, this.ctx = e, this.dragged = !1, this.graphics = new P(this.w), this.eventList = [
      "mousedown",
      "mouseleave",
      "mousemove",
      "touchstart",
      "touchmove",
      "mouseup",
      "touchend",
      "wheel"
    ], this.clientX = 0, this.clientY = 0, this.startX = 0, this.endX = 0, this.dragX = 0, this.startY = 0, this.endY = 0, this.dragY = 0, this.moveDirection = "none", this.debounceTimer = null, this.debounceDelay = 100, this.wheelDelay = 400;
  }
  init({ xyRatios: t }) {
    const e = this.w, s = this;
    this.xyRatios = t, this.zoomRect = this.graphics.drawRect(0, 0, 0, 0), this.selectionRect = this.graphics.drawRect(0, 0, 0, 0), this.gridRect = e.dom.baseEl.querySelector(".apexcharts-grid"), this.constraints = new Ne(0, 0, e.layout.gridWidth, e.layout.gridHeight), this.zoomRect.node.classList.add("apexcharts-zoom-rect"), this.selectionRect.node.classList.add("apexcharts-selection-rect"), e.dom.Paper.add(this.zoomRect), e.dom.Paper.add(this.selectionRect), e.config.chart.selection.type === "x" ? this.slDraggableRect = this.selectionRect.draggable({
      minX: 0,
      minY: 0,
      maxX: e.layout.gridWidth,
      maxY: e.layout.gridHeight
    }).on("dragmove.namespace", this.selectionDragging.bind(this, "dragging")) : e.config.chart.selection.type === "y" ? this.slDraggableRect = this.selectionRect.draggable({
      minX: 0,
      maxX: e.layout.gridWidth
    }).on("dragmove.namespace", this.selectionDragging.bind(this, "dragging")) : this.slDraggableRect = this.selectionRect.draggable().on("dragmove.namespace", this.selectionDragging.bind(this, "dragging")), this.preselectedSelection(), this.hoverArea = e.dom.baseEl.querySelector(
      `${e.globals.chartClass} .apexcharts-svg`
    ), this.hoverArea.classList.add("apexcharts-zoomable"), this.eventList.forEach((i) => {
      this.hoverArea.addEventListener(
        i,
        s.svgMouseEvents.bind(s, t),
        {
          capture: !1,
          passive: !0
        }
      );
    }), e.config.chart.zoom.enabled && e.config.chart.zoom.allowMouseWheelZoom && this.hoverArea.addEventListener("wheel", s.mouseWheelEvent.bind(s), {
      capture: !1,
      passive: !1
    });
  }
  // remove the event listeners which were previously added on hover area
  destroy() {
    this.slDraggableRect && (this.slDraggableRect.draggable(!1), this.slDraggableRect.off(), this.selectionRect.off()), this.selectionRect = null, this.zoomRect = null, this.gridRect = null;
  }
  svgMouseEvents(t, e) {
    const s = this.w, i = this.ctx.toolbar, a = s.interact.zoomEnabled ? s.config.chart.zoom.type : s.config.chart.selection.type, o = s.config.chart.toolbar.autoSelected;
    if (e.shiftKey ? (this.shiftWasPressed = !0, i.enableZoomPanFromToolbar(o === "pan" ? "zoom" : "pan")) : this.shiftWasPressed && (i.enableZoomPanFromToolbar(o), this.shiftWasPressed = !1), !e.target)
      return;
    const r = e.target.classList;
    let n;
    if (e.target.parentNode && e.target.parentNode !== null && (n = e.target.parentNode.classList), !(r.contains("apexcharts-legend-marker") || r.contains("apexcharts-legend-text") || n && n.contains("apexcharts-toolbar"))) {
      if (this.clientX = e.type === "touchmove" || e.type === "touchstart" ? e.touches[0].clientX : e.type === "touchend" ? e.changedTouches[0].clientX : e.clientX, this.clientY = e.type === "touchmove" || e.type === "touchstart" ? e.touches[0].clientY : e.type === "touchend" ? e.changedTouches[0].clientY : e.clientY, e.type === "mousedown" && e.which === 1 || e.type === "touchstart") {
        const c = this.gridRect.getBoundingClientRect();
        this.startX = this.clientX - c.left - s.globals.barPadForNumericAxis, this.startY = this.clientY - c.top, this.dragged = !1, this.w.interact.mousedown = !0;
      }
      (e.type === "mousemove" && e.which === 1 || e.type === "touchmove") && (this.dragged = !0, s.interact.panEnabled ? (s.interact.selection = null, this.w.interact.mousedown && this.panDragging({
        context: this,
        zoomtype: a,
        xyRatios: t
      })) : (this.w.interact.mousedown && s.interact.zoomEnabled || this.w.interact.mousedown && s.interact.selectionEnabled) && (this.selection = this.selectionDrawing({
        context: this,
        zoomtype: a
      }))), (e.type === "mouseup" || e.type === "touchend" || e.type === "mouseleave") && this.handleMouseUp({ zoomtype: a }), this.makeSelectionRectDraggable();
    }
  }
  handleMouseUp({ zoomtype: t, isResized: e }) {
    var s;
    const i = this.w, a = (s = this.gridRect) == null ? void 0 : s.getBoundingClientRect();
    a && (this.w.interact.mousedown || e) && (this.endX = this.clientX - a.left - i.globals.barPadForNumericAxis, this.endY = this.clientY - a.top, this.dragX = Math.abs(this.endX - this.startX), this.dragY = Math.abs(this.endY - this.startY), (i.interact.zoomEnabled || i.interact.selectionEnabled) && this.selectionDrawn({
      context: this,
      zoomtype: t
    })), i.interact.zoomEnabled && this.hideSelectionRect(this.selectionRect), this.dragged = !1, this.w.interact.mousedown = !1;
  }
  mouseWheelEvent(t) {
    const e = this.w;
    t.preventDefault();
    const s = Date.now();
    s - e.interact.lastWheelExecution > this.wheelDelay && (this.executeMouseWheelZoom(t), e.interact.lastWheelExecution = s), this.debounceTimer && clearTimeout(this.debounceTimer), this.debounceTimer = setTimeout(() => {
      s - e.interact.lastWheelExecution > this.wheelDelay && (this.executeMouseWheelZoom(t), e.interact.lastWheelExecution = s);
    }, this.debounceDelay);
  }
  executeMouseWheelZoom(t) {
    var e;
    const s = this.w;
    this.minX = s.axisFlags.isRangeBar ? s.globals.minY : s.globals.minX, this.maxX = s.axisFlags.isRangeBar ? s.globals.maxY : s.globals.maxX;
    const i = (e = this.gridRect) == null ? void 0 : e.getBoundingClientRect();
    if (!i)
      return;
    const a = (t.clientX - i.left) / i.width, o = this.minX, r = this.maxX, n = r - o, l = 0.5, c = 1.5;
    let h, d, p;
    if (t.deltaY < 0) {
      h = l * n;
      const f = o + a * n;
      d = f - h / 2, p = f + h / 2;
    } else
      h = c * n, d = o - h / 2, p = r + h / 2;
    if (!s.axisFlags.isRangeBar) {
      d = Math.max(d, s.globals.initialMinX), p = Math.min(p, s.globals.initialMaxX);
      const f = (s.globals.initialMaxX - s.globals.initialMinX) * 0.01;
      if (p - d < f) {
        const x = (d + p) / 2;
        d = x - f / 2, p = x + f / 2;
      }
    }
    const g = this._getNewMinXMaxX(d, p);
    !isNaN(g.minX) && !isNaN(g.maxX) && this.zoomUpdateOptions(g.minX, g.maxX);
  }
  makeSelectionRectDraggable() {
    const t = this.w;
    if (!this.selectionRect)
      return;
    const e = this.selectionRect.node.getBoundingClientRect();
    e.width > 0 && e.height > 0 && (this.selectionRect.select(!1).resize(!1), this.selectionRect.select({
      createRot: () => {
      },
      updateRot: () => {
      },
      createHandle: (s, i, a, o, r) => r === "l" || r === "r" ? s.circle(8).css({ "stroke-width": 1, stroke: "#333", fill: "#fff" }) : s.circle(0),
      updateHandle: (s, i) => s.center(i[0], i[1])
    }).resize().on("resize", () => {
      const s = t.interact.zoomEnabled ? t.config.chart.zoom.type : t.config.chart.selection.type;
      this.handleMouseUp({ zoomtype: s, isResized: !0 });
    }));
  }
  preselectedSelection() {
    const t = this.w, e = this.xyRatios;
    if (!t.interact.zoomEnabled) {
      if (typeof t.interact.selection < "u" && t.interact.selection !== null)
        this.drawSelectionRect(O(I({}, t.interact.selection), {
          translateX: t.layout.translateX,
          translateY: t.layout.translateY
        }));
      else if (t.config.chart.selection.xaxis.min !== void 0 && t.config.chart.selection.xaxis.max !== void 0) {
        let s = (t.config.chart.selection.xaxis.min - t.globals.minX) / e.xRatio, i = t.layout.gridWidth - (t.globals.maxX - t.config.chart.selection.xaxis.max) / e.xRatio - s;
        t.axisFlags.isRangeBar && (s = (t.config.chart.selection.xaxis.min - t.globals.yAxisScale[0].niceMin) / e.invertedYRatio, i = (t.config.chart.selection.xaxis.max - t.config.chart.selection.xaxis.min) / e.invertedYRatio);
        const a = {
          x: s,
          y: 0,
          width: i,
          height: t.layout.gridHeight,
          translateX: t.layout.translateX,
          translateY: t.layout.translateY,
          selectionEnabled: !0
        };
        this.drawSelectionRect(a), this.makeSelectionRectDraggable(), typeof t.config.chart.events.selection == "function" && t.config.chart.events.selection(this.ctx, {
          xaxis: {
            min: t.config.chart.selection.xaxis.min,
            max: t.config.chart.selection.xaxis.max
          },
          yaxis: {}
        });
      }
    }
  }
  drawSelectionRect({ x: t, y: e, width: s, height: i, translateX: a = 0, translateY: o = 0 }) {
    const r = this.w, n = this.zoomRect, l = this.selectionRect;
    if (this.dragged || r.interact.selection !== null) {
      const c = {
        transform: "translate(" + a + ", " + o + ")"
      };
      r.interact.zoomEnabled && this.dragged && (s < 0 && (s = 1), n.attr({
        x: t,
        y: e,
        width: s,
        height: i,
        fill: r.config.chart.zoom.zoomedArea.fill.color,
        "fill-opacity": r.config.chart.zoom.zoomedArea.fill.opacity,
        stroke: r.config.chart.zoom.zoomedArea.stroke.color,
        "stroke-width": r.config.chart.zoom.zoomedArea.stroke.width,
        "stroke-opacity": r.config.chart.zoom.zoomedArea.stroke.opacity
      }), P.setAttrs(n.node, c)), r.interact.selectionEnabled && (l.attr({
        x: t,
        y: e,
        width: s > 0 ? s : 0,
        height: i > 0 ? i : 0,
        fill: r.config.chart.selection.fill.color,
        "fill-opacity": r.config.chart.selection.fill.opacity,
        stroke: r.config.chart.selection.stroke.color,
        "stroke-width": r.config.chart.selection.stroke.width,
        "stroke-dasharray": r.config.chart.selection.stroke.dashArray,
        "stroke-opacity": r.config.chart.selection.stroke.opacity
      }), P.setAttrs(l.node, c));
    }
  }
  hideSelectionRect(t) {
    t && t.attr({
      x: 0,
      y: 0,
      width: 0,
      height: 0
    });
  }
  selectionDrawing({ context: t, zoomtype: e }) {
    const s = this.w, i = t, a = this.gridRect.getBoundingClientRect(), o = i.startX - 1, r = i.startY;
    let n = !1, l = !1;
    const c = i.clientX - a.left - s.globals.barPadForNumericAxis, h = i.clientY - a.top;
    let d = c - o, p = h - r, g = {
      translateX: s.layout.translateX,
      translateY: s.layout.translateY
    };
    return Math.abs(d + o) > s.layout.gridWidth ? d = s.layout.gridWidth - o : c < 0 && (d = o), o > c && (n = !0, d = Math.abs(d)), r > h && (l = !0, p = Math.abs(p)), e === "x" ? g = {
      x: n ? o - d : o,
      y: 0,
      width: d,
      height: s.layout.gridHeight
    } : e === "y" ? g = {
      x: 0,
      y: l ? r - p : r,
      width: s.layout.gridWidth,
      height: p
    } : g = {
      x: n ? o - d : o,
      y: l ? r - p : r,
      width: d,
      height: p
    }, g = O(I({}, g), {
      translateX: s.layout.translateX,
      translateY: s.layout.translateY
    }), i.drawSelectionRect(g), i.selectionDragging("resizing"), g;
  }
  selectionDragging(t, e) {
    const s = this.w;
    if (!e)
      return;
    e.preventDefault();
    const { handler: i, box: a } = e.detail;
    let { x: o, y: r } = a;
    o < this.constraints.x && (o = this.constraints.x), r < this.constraints.y && (r = this.constraints.y), a.x2 > this.constraints.x2 && (o = this.constraints.x2 - a.w), a.y2 > this.constraints.y2 && (r = this.constraints.y2 - a.h), i.move(o, r);
    const n = this.xyRatios, l = this.selectionRect;
    let c = 0;
    t === "resizing" && (c = 30);
    const h = (p) => parseFloat(l.node.getAttribute(p)), d = {
      x: h("x"),
      y: h("y"),
      width: h("width"),
      height: h("height")
    };
    s.interact.selection = d, typeof s.config.chart.events.selection == "function" && s.interact.selectionEnabled && (clearTimeout(this.w.globals.selectionResizeTimer), this.w.globals.selectionResizeTimer = window.setTimeout(() => {
      const p = this.gridRect.getBoundingClientRect(), g = l.node.getBoundingClientRect();
      let f, x, m, u;
      s.axisFlags.isRangeBar ? (f = s.globals.yAxisScale[0].niceMin + (g.left - p.left) * n.invertedYRatio, x = s.globals.yAxisScale[0].niceMin + (g.right - p.left) * n.invertedYRatio, m = 0, u = 1) : (f = s.globals.xAxisScale.niceMin + (g.left - p.left) * n.xRatio, x = s.globals.xAxisScale.niceMin + (g.right - p.left) * n.xRatio, m = s.globals.yAxisScale[0].niceMin + (p.bottom - g.bottom) * n.yRatio[0], u = s.globals.yAxisScale[0].niceMax - (g.top - p.top) * n.yRatio[0]);
      const y = {
        xaxis: {
          min: f,
          max: x
        },
        yaxis: {
          min: m,
          max: u
        }
      };
      s.config.chart.events.selection(this.ctx, y), s.config.chart.brush.enabled && s.config.chart.events.brushScrolled !== void 0 && s.config.chart.events.brushScrolled(this.ctx, y);
    }, c));
  }
  selectionDrawn({ context: t, zoomtype: e }) {
    const s = this.w, i = t, a = this.xyRatios, o = this.ctx.toolbar, r = s.interact.zoomEnabled ? i.zoomRect.node.getBoundingClientRect() : i.selectionRect.node.getBoundingClientRect(), n = i.gridRect.getBoundingClientRect(), l = r.left - n.left - s.globals.barPadForNumericAxis, c = r.right - n.left - s.globals.barPadForNumericAxis, h = r.top - n.top, d = r.bottom - n.top;
    let p, g;
    s.axisFlags.isRangeBar ? (p = s.globals.yAxisScale[0].niceMin + l * a.invertedYRatio, g = s.globals.yAxisScale[0].niceMin + c * a.invertedYRatio) : (p = s.globals.xAxisScale.niceMin + l * a.xRatio, g = s.globals.xAxisScale.niceMin + c * a.xRatio);
    const f = [], x = [];
    if (s.config.yaxis.forEach((m, u) => {
      const y = s.globals.seriesYAxisMap[u][0], b = s.globals.yAxisScale[u].niceMax - a.yRatio[y] * h, w = s.globals.yAxisScale[u].niceMax - a.yRatio[y] * d;
      f.push(b), x.push(w);
    }), i.dragged && (i.dragX > 10 || i.dragY > 10) && p !== g) {
      if (s.interact.zoomEnabled) {
        let m = L.clone(s.globals.initialConfig.yaxis), u = L.clone(s.globals.initialConfig.xaxis);
        if (s.interact.zoomed = !0, s.config.xaxis.convertedCatToNumeric && (p = Math.floor(p), g = Math.floor(g), p < 1 && (p = 1, g = s.globals.dataPoints), g - p < 2 && (g = p + 1)), (e === "xy" || e === "x") && (u = {
          min: p,
          max: g
        }), (e === "xy" || e === "y") && m.forEach((b, w) => {
          m[w].min = x[w], m[w].max = f[w];
        }), o) {
          const b = o.getBeforeZoomRange(u, m);
          b && (u = b.xaxis ? b.xaxis : u, m = b.yaxis ? b.yaxis : m);
        }
        const y = {
          xaxis: u
        };
        s.config.chart.group || (y.yaxis = m), i.ctx.updateHelpers._updateOptions(
          y,
          !1,
          i.w.config.chart.animations.dynamicAnimation.enabled
        ), typeof s.config.chart.events.zoomed == "function" && o.zoomCallback(u, m);
      } else if (s.interact.selectionEnabled) {
        let m = null, u = null;
        u = {
          min: p,
          max: g
        }, (e === "xy" || e === "y") && (m = L.clone(s.config.yaxis), m.forEach((y, b) => {
          m[b].min = x[b], m[b].max = f[b];
        })), s.interact.selection = i.selection, typeof s.config.chart.events.selection == "function" && s.config.chart.events.selection(i.ctx, {
          xaxis: u,
          yaxis: m
        });
      }
    }
  }
  panDragging({ context: t }) {
    const e = this.w, s = t;
    if (typeof e.interact.lastClientPosition.x < "u") {
      const o = e.interact.lastClientPosition.x - s.clientX, r = e.interact.lastClientPosition.y - s.clientY;
      Math.abs(o) > Math.abs(r) && o > 0 ? this.moveDirection = "left" : Math.abs(o) > Math.abs(r) && o < 0 ? this.moveDirection = "right" : Math.abs(r) > Math.abs(o) && r > 0 ? this.moveDirection = "up" : Math.abs(r) > Math.abs(o) && r < 0 && (this.moveDirection = "down");
    }
    e.interact.lastClientPosition = {
      x: s.clientX,
      y: s.clientY
    };
    const i = e.axisFlags.isRangeBar ? e.globals.minY : e.globals.minX, a = e.axisFlags.isRangeBar ? e.globals.maxY : e.globals.maxX;
    s.panScrolled(i, a);
  }
  // delayedPanScrolled() {
  //   const w = this.w
  //   let newMinX = w.globals.minX
  //   let newMaxX = w.globals.maxX
  //   const centerX = (w.globals.maxX - w.globals.minX) / 2
  //   if (this.moveDirection === 'left') {
  //     newMinX = w.globals.minX + centerX
  //     newMaxX = w.globals.maxX + centerX
  //   } else if (this.moveDirection === 'right') {
  //     newMinX = w.globals.minX - centerX
  //     newMaxX = w.globals.maxX - centerX
  //   }
  //   newMinX = Math.floor(newMinX)
  //   newMaxX = Math.floor(newMaxX)
  //   this.updateScrolledChart(
  //     { xaxis: { min: newMinX, max: newMaxX } },
  //     newMinX,
  //     newMaxX
  //   )
  // }
  panScrolled(t, e) {
    const s = this.w, i = this.xyRatios, a = L.clone(s.globals.initialConfig.yaxis);
    let o = i.xRatio, r = s.globals.minX, n = s.globals.maxX;
    s.axisFlags.isRangeBar && (o = i.invertedYRatio, r = s.globals.minY, n = s.globals.maxY), this.moveDirection === "left" ? (t = r + s.layout.gridWidth / 15 * o, e = n + s.layout.gridWidth / 15 * o) : this.moveDirection === "right" && (t = r - s.layout.gridWidth / 15 * o, e = n - s.layout.gridWidth / 15 * o), s.axisFlags.isRangeBar || (t < s.globals.initialMinX || e > s.globals.initialMaxX) && (t = r, e = n);
    const c = {
      xaxis: {
        min: t,
        max: e
      }
    };
    s.config.chart.group || (c.yaxis = a), this.updateScrolledChart(c, t, e);
  }
  updateScrolledChart(t, e, s) {
    const i = this.w;
    if (this.ctx.updateHelpers._updateOptions(t, !1, !1), typeof i.config.chart.events.scrolled == "function") {
      const a = {
        xaxis: {
          min: e,
          max: s
        }
      };
      i.config.chart.events.scrolled(this.ctx, a), this.ctx.events.fireEvent("scrolled", a);
    }
  }
}
K.registerFeatures({
  toolbar: Ce,
  zoomPanSelection: Ns
});
let Pt = class {
  constructor(t) {
    this.w = t.w, this.annoCtx = t;
  }
  setOrientations(t, e = null) {
    const s = this.w;
    if (t.label.orientation === "vertical") {
      const i = e !== null ? e : 0, a = s.dom.baseEl.querySelector(
        `.apexcharts-xaxis-annotations .apexcharts-xaxis-annotation-label[rel='${i}']`
      );
      if (a !== null) {
        const o = a.getBBox();
        a.setAttribute(
          "x",
          parseFloat(a.getAttribute("x")) - o.height + 4
        );
        const r = t.label.position === "top" ? o.width : -o.width;
        a.setAttribute("y", parseFloat(a.getAttribute("y")) + r);
        const { x: n, y: l } = this.annoCtx.graphics.rotateAroundCenter(a);
        a.setAttribute("transform", `rotate(-90 ${n} ${l})`);
      }
    }
  }
  addBackgroundToAnno(t, e) {
    const s = this.w;
    if (!t || !e.label.text || !String(e.label.text).trim())
      return null;
    const i = s.dom.baseEl.querySelector(".apexcharts-grid"), a = i.getBoundingClientRect(), o = i.getBBox(), r = a.width / o.width || 1, n = t.getBoundingClientRect();
    let {
      left: l,
      right: c,
      top: h,
      bottom: d
    } = e.label.style.padding;
    e.label.orientation === "vertical" && ([h, d, l, c] = [l, c, h, d]);
    const p = (n.left - a.left) / r - l, g = (n.top - a.top) / r - h, f = this.annoCtx.graphics.drawRect(
      p - s.globals.barPadForNumericAxis,
      g,
      n.width / r + l + c,
      n.height / r + h + d,
      e.label.borderRadius,
      e.label.style.background,
      1,
      e.label.borderWidth,
      e.label.borderColor,
      0
    );
    return e.id && f.node.classList.add(e.id), f;
  }
  annotationsBackground() {
    const t = this.w, e = (s, i, a) => {
      const o = t.dom.baseEl.querySelector(
        `.apexcharts-${a}-annotations .apexcharts-${a}-annotation-label[rel='${i}']`
      );
      if (o) {
        const r = o.parentNode, n = this.addBackgroundToAnno(o, s);
        n && (r.insertBefore(n.node, o), s.label.mouseEnter && n.node.addEventListener(
          "mouseenter",
          s.label.mouseEnter.bind(this, s)
        ), s.label.mouseLeave && n.node.addEventListener(
          "mouseleave",
          s.label.mouseLeave.bind(this, s)
        ), s.label.click && n.node.addEventListener(
          "click",
          s.label.click.bind(this, s)
        ));
      }
    };
    t.config.annotations.xaxis.forEach((s, i) => e(s, i, "xaxis")), t.config.annotations.yaxis.forEach((s, i) => e(s, i, "yaxis")), t.config.annotations.points.forEach((s, i) => e(s, i, "point"));
  }
  getY1Y2(t, e) {
    var s;
    const i = this.w, a = t === "y1" ? e.y : e.y2;
    let o, r = !1;
    if (this.annoCtx.invertAxis) {
      const n = i.config.xaxis.convertedCatToNumeric ? i.labelData.categoryLabels : i.labelData.labels, l = n.indexOf(a), c = i.dom.baseEl.querySelector(
        `.apexcharts-yaxis-texts-g text:nth-child(${l + 1})`
      );
      o = c ? parseFloat(c.getAttribute("y")) : (i.layout.gridHeight / n.length - 1) * (l + 1) - i.globals.barHeight, e.seriesIndex !== void 0 && i.globals.barHeight && (o -= i.globals.barHeight / 2 * (i.seriesData.series.length - 1) - i.globals.barHeight * e.seriesIndex);
    } else {
      const n = i.globals.seriesYAxisMap[e.yAxisIndex][0], l = i.config.yaxis[e.yAxisIndex].logarithmic ? new V(this.w).getLogVal(
        i.config.yaxis[e.yAxisIndex].logBase,
        a,
        n
      ) / i.globals.yLogRatio[n] : (a - i.globals.minYArr[n]) / (i.globals.yRange[n] / i.layout.gridHeight);
      o = i.layout.gridHeight - Math.min(Math.max(l, 0), i.layout.gridHeight), r = l > i.layout.gridHeight || l < 0, e.marker && (e.y === void 0 || e.y === null) && (o = 0), (s = i.config.yaxis[e.yAxisIndex]) != null && s.reversed && (o = l);
    }
    return typeof a == "string" && a.includes("px") && (o = parseFloat(a)), { yP: o, clipped: r };
  }
  getX1X2(t, e) {
    const s = this.w, i = t === "x1" ? e.x : e.x2, a = this.annoCtx.invertAxis ? s.globals.minY : s.globals.minX, o = this.annoCtx.invertAxis ? s.globals.maxY : s.globals.maxX, r = this.annoCtx.invertAxis ? s.globals.yRange[0] : s.globals.xRange;
    let n = !1, l = this.annoCtx.inversedReversedAxis ? (o - i) / (r / s.layout.gridWidth) : (i - a) / (r / s.layout.gridWidth);
    return (s.config.xaxis.type === "category" || s.config.xaxis.convertedCatToNumeric) && !this.annoCtx.invertAxis && !s.axisFlags.dataFormatXNumeric && (s.config.chart.sparkline.enabled || (l = this.getStringX(i))), typeof i == "string" && i.includes("px") && (l = parseFloat(i)), i == null && e.marker && (l = s.layout.gridWidth), e.seriesIndex !== void 0 && s.globals.barWidth && !this.annoCtx.invertAxis && (l -= s.globals.barWidth / 2 * (s.seriesData.series.length - 1) - s.globals.barWidth * e.seriesIndex), typeof l != "number" && (l = 0, n = !0), parseFloat(l.toFixed(10)) > parseFloat(s.layout.gridWidth.toFixed(10)) ? (l = s.layout.gridWidth, n = !0) : l < 0 && (l = 0, n = !0), { x: l, clipped: n };
  }
  getStringX(t) {
    const e = this.w;
    let s = t;
    e.config.xaxis.convertedCatToNumeric && e.labelData.categoryLabels.length && (t = e.labelData.categoryLabels.indexOf(t) + 1);
    const i = e.labelData.labels.map((o) => Array.isArray(o) ? o.join(" ") : o).indexOf(t), a = e.dom.baseEl.querySelector(
      `.apexcharts-xaxis-texts-g text:nth-child(${i + 1})`
    );
    return a && (s = parseFloat(a.getAttribute("x"))), s;
  }
};
class zs {
  constructor(t) {
    this.w = t.w, this.annoCtx = t, this.invertAxis = this.annoCtx.invertAxis, this.helpers = new Pt(this.annoCtx);
  }
  addXaxisAnnotation(t, e, s) {
    const i = this.w, a = this.helpers.getX1X2("x1", t);
    let o = a.x;
    const r = a.clipped;
    let n = !0, l;
    const c = t.label.text, h = t.strokeDashArray;
    if (L.isNumber(o)) {
      if (t.x2 === null || typeof t.x2 > "u") {
        if (!r) {
          const d = this.annoCtx.graphics.drawLine(
            o + t.offsetX,
            // x1
            0 + t.offsetY,
            // y1
            o + t.offsetX,
            // x2
            i.layout.gridHeight + t.offsetY,
            // y2
            t.borderColor,
            // lineColor
            h,
            //dashArray
            t.borderWidth
          );
          e.appendChild(d.node), t.id && d.node.classList.add(t.id);
        }
      } else {
        const d = this.helpers.getX1X2("x2", t);
        if (l = d.x, n = d.clipped, l < o) {
          const g = o;
          o = l, l = g;
        }
        const p = this.annoCtx.graphics.drawRect(
          o + t.offsetX,
          // x1
          0 + t.offsetY,
          // y1
          l - o,
          // x2
          i.layout.gridHeight + t.offsetY,
          // y2
          0,
          // radius
          t.fillColor,
          // color
          t.opacity,
          // opacity,
          1,
          // strokeWidth
          t.borderColor,
          // strokeColor
          h
          // stokeDashArray
        );
        p.node.classList.add("apexcharts-annotation-rect"), p.attr("clip-path", `url(#gridRectMask${i.globals.cuid})`), e.appendChild(p.node), t.id && p.node.classList.add(t.id);
      }
      if (!(r && n)) {
        const d = this.annoCtx.graphics.getTextRects(
          c,
          parseFloat(t.label.style.fontSize)
        ), p = t.label.position === "top" ? 4 : t.label.position === "center" ? i.layout.gridHeight / 2 + (t.label.orientation === "vertical" ? d.width / 2 : 0) : i.layout.gridHeight, g = this.annoCtx.graphics.drawText({
          x: o + t.label.offsetX,
          y: p + t.label.offsetY - (t.label.orientation === "vertical" ? t.label.position === "top" ? d.width / 2 - 12 : -d.width / 2 : 0),
          text: c,
          textAnchor: t.label.textAnchor,
          fontSize: t.label.style.fontSize,
          fontFamily: t.label.style.fontFamily,
          fontWeight: t.label.style.fontWeight,
          foreColor: t.label.style.color,
          cssClass: `apexcharts-xaxis-annotation-label ${t.label.style.cssClass} ${t.id ? t.id : ""}`
        });
        g.attr({
          rel: s
        }), e.appendChild(g.node), this.annoCtx.helpers.setOrientations(t, s);
      }
    }
  }
  drawXAxisAnnotations() {
    const t = this.w, e = this.annoCtx.graphics.group({
      class: "apexcharts-xaxis-annotations"
    });
    return t.config.annotations.xaxis.map((s, i) => {
      this.addXaxisAnnotation(s, e.node, i);
    }), e;
  }
}
class Hs {
  constructor(t) {
    this.w = t.w, this.annoCtx = t, this.helpers = new Pt(this.annoCtx), this.axesUtils = new at(this.annoCtx.w, { theme: this.annoCtx.theme, timeScale: this.annoCtx.timeScale });
  }
  addYaxisAnnotation(t, e, s) {
    const i = this.w, a = t.strokeDashArray;
    let o = this.helpers.getY1Y2("y1", t), r = o.yP;
    const n = o.clipped;
    let l, c = !0, h = !1;
    const d = t.label.text;
    if (t.y2 === null || typeof t.y2 > "u") {
      if (!n) {
        h = !0;
        const p = this.annoCtx.graphics.drawLine(
          0 + t.offsetX,
          // x1
          r + t.offsetY,
          // y1
          this._getYAxisAnnotationWidth(t),
          // x2
          r + t.offsetY,
          // y2
          t.borderColor,
          // lineColor
          a,
          // dashArray
          t.borderWidth
        );
        e.appendChild(p.node), t.id && p.node.classList.add(t.id);
      }
    } else {
      if (o = this.helpers.getY1Y2("y2", t), l = o.yP, c = o.clipped, l > r) {
        const p = r;
        r = l, l = p;
      }
      if (!(n && c)) {
        h = !0;
        const p = this.annoCtx.graphics.drawRect(
          0 + t.offsetX,
          // x1
          l + t.offsetY,
          // y1
          this._getYAxisAnnotationWidth(t),
          // x2
          r - l,
          // y2
          0,
          // radius
          t.fillColor,
          // color
          t.opacity,
          // opacity,
          1,
          // strokeWidth
          t.borderColor,
          // strokeColor
          a
          // stokeDashArray
        );
        p.node.classList.add("apexcharts-annotation-rect"), p.attr("clip-path", `url(#gridRectMask${i.globals.cuid})`), e.appendChild(p.node), t.id && p.node.classList.add(t.id);
      }
    }
    if (h) {
      const p = t.label.position === "right" ? i.layout.gridWidth : t.label.position === "center" ? i.layout.gridWidth / 2 : 0, g = this.annoCtx.graphics.drawText({
        x: p + t.label.offsetX,
        y: (l ?? r) + t.label.offsetY - 3,
        text: d,
        textAnchor: t.label.textAnchor,
        fontSize: t.label.style.fontSize,
        fontFamily: t.label.style.fontFamily,
        fontWeight: t.label.style.fontWeight,
        foreColor: t.label.style.color,
        cssClass: `apexcharts-yaxis-annotation-label ${t.label.style.cssClass} ${t.id ? t.id : ""}`
      });
      g.attr({
        rel: s
      }), e.appendChild(g.node);
    }
  }
  _getYAxisAnnotationWidth(t) {
    const e = this.w;
    let s = e.layout.gridWidth;
    return t.width.indexOf("%") > -1 ? s = e.layout.gridWidth * parseInt(t.width, 10) / 100 : s = parseInt(t.width, 10), s + t.offsetX;
  }
  drawYAxisAnnotations() {
    const t = this.w, e = this.annoCtx.graphics.group({
      class: "apexcharts-yaxis-annotations"
    });
    return t.config.annotations.yaxis.forEach((s, i) => {
      s.yAxisIndex = this.axesUtils.translateYAxisIndex(s.yAxisIndex), this.axesUtils.isYAxisHidden(s.yAxisIndex) && this.axesUtils.yAxisAllSeriesCollapsed(s.yAxisIndex) || this.addYaxisAnnotation(s, e.node, i);
    }), e;
  }
}
class Os {
  constructor(t) {
    this.w = t.w, this.annoCtx = t, this.helpers = new Pt(this.annoCtx);
  }
  addPointAnnotation(t, e, s) {
    if (this.w.globals.collapsedSeriesIndices.indexOf(t.seriesIndex) > -1)
      return;
    let a = this.helpers.getX1X2("x1", t);
    const o = a.x, r = a.clipped;
    a = this.helpers.getY1Y2("y1", t);
    const n = a.yP, l = a.clipped;
    if (L.isNumber(o) && !(l || r)) {
      const c = {
        pSize: t.marker.size,
        pointStrokeWidth: t.marker.strokeWidth,
        pointFillColor: t.marker.fillColor,
        pointStrokeColor: t.marker.strokeColor,
        shape: t.marker.shape,
        pRadius: t.marker.radius,
        class: `apexcharts-point-annotation-marker ${t.marker.cssClass} ${t.id ? t.id : ""}`
      };
      let h = this.annoCtx.graphics.drawMarker(
        o + t.marker.offsetX,
        n + t.marker.offsetY,
        c
      );
      e.appendChild(h.node);
      const d = t.label.text ? t.label.text : "", p = this.annoCtx.graphics.drawText({
        x: o + t.label.offsetX,
        y: n + t.label.offsetY - t.marker.size - parseFloat(t.label.style.fontSize) / 1.6,
        text: d,
        textAnchor: t.label.textAnchor,
        fontSize: t.label.style.fontSize,
        fontFamily: t.label.style.fontFamily,
        fontWeight: t.label.style.fontWeight,
        foreColor: t.label.style.color,
        cssClass: `apexcharts-point-annotation-label ${t.label.style.cssClass} ${t.id ? t.id : ""}`
      });
      if (p.attr({
        rel: s
      }), e.appendChild(p.node), t.customSVG.SVG) {
        const g = this.annoCtx.graphics.group({
          class: "apexcharts-point-annotations-custom-svg " + t.customSVG.cssClass
        });
        g.attr({
          transform: `translate(${o + t.customSVG.offsetX}, ${n + t.customSVG.offsetY})`
        }), g.node.innerHTML = t.customSVG.SVG, e.appendChild(g.node);
      }
      if (t.image.path) {
        const g = t.image.width ? t.image.width : 20, f = t.image.height ? t.image.height : 20;
        h = this.annoCtx.addImage({
          x: o + t.image.offsetX - g / 2,
          y: n + t.image.offsetY - f / 2,
          width: g,
          height: f,
          path: t.image.path,
          appendTo: ".apexcharts-point-annotations"
        });
      }
      t.mouseEnter && h.node.addEventListener(
        "mouseenter",
        t.mouseEnter.bind(this, t)
      ), t.mouseLeave && h.node.addEventListener(
        "mouseleave",
        t.mouseLeave.bind(this, t)
      ), t.click && h.node.addEventListener("click", t.click.bind(this, t));
    }
  }
  drawPointAnnotations() {
    const t = this.w, e = this.annoCtx.graphics.group({
      class: "apexcharts-point-annotations"
    });
    return t.config.annotations.points.map((s, i) => {
      this.addPointAnnotation(s, e.node, i);
    }), e;
  }
}
class _s {
  constructor(t, { theme: e = null, timeScale: s = null } = {}) {
    this.w = t, this.theme = e, this.timeScale = s, this.graphics = new P(this.w), this.w.globals.isBarHorizontal && (this.invertAxis = !0), this.helpers = new Pt(this), this.xAxisAnnotations = new zs(this), this.yAxisAnnotations = new Hs(this), this.pointsAnnotations = new Os(this), this.w.globals.isBarHorizontal && this.w.config.yaxis[0].reversed && (this.inversedReversedAxis = !0), this.xDivision = this.w.layout.gridWidth / this.w.globals.dataPoints;
  }
  drawAxesAnnotations() {
    const t = this.w;
    if (t.globals.axisCharts && t.globals.dataPoints) {
      const e = this.yAxisAnnotations.drawYAxisAnnotations(), s = this.xAxisAnnotations.drawXAxisAnnotations(), i = this.pointsAnnotations.drawPointAnnotations(), a = t.config.chart.animations.enabled, o = [e, s, i], r = [
        s.node,
        e.node,
        i.node
      ];
      for (let n = 0; n < 3; n++)
        t.dom.elGraphical.add(o[n]), a && !t.globals.resized && !t.globals.dataChanged && t.config.chart.type !== "scatter" && t.config.chart.type !== "bubble" && t.globals.dataPoints > 1 && r[n].classList.add("apexcharts-element-hidden"), t.globals.delayedElements.push({ el: r[n], index: 0 });
      this.helpers.annotationsBackground();
    }
  }
  drawImageAnnos() {
    this.w.config.annotations.images.map((e, s) => {
      this.addImage(e, s);
    });
  }
  drawTextAnnos() {
    this.w.config.annotations.texts.map((e, s) => {
      this.addText(e, s);
    });
  }
  addXaxisAnnotation(t, e, s) {
    this.xAxisAnnotations.addXaxisAnnotation(t, e, s);
  }
  addYaxisAnnotation(t, e, s) {
    this.yAxisAnnotations.addYaxisAnnotation(t, e, s);
  }
  addPointAnnotation(t, e, s) {
    this.pointsAnnotations.addPointAnnotation(t, e, s);
  }
  addText(t) {
    const {
      x: e,
      y: s,
      text: i,
      textAnchor: a,
      foreColor: o,
      fontSize: r,
      fontFamily: n,
      fontWeight: l,
      cssClass: c,
      backgroundColor: h,
      borderWidth: d,
      strokeDashArray: p,
      borderRadius: g,
      borderColor: f,
      appendTo: x = ".apexcharts-svg",
      paddingLeft: m = 4,
      paddingRight: u = 4,
      paddingBottom: y = 2,
      paddingTop: b = 2
    } = t, w = this.w, v = this.graphics.drawText({
      x: e,
      y: s,
      text: i,
      textAnchor: a || "start",
      fontSize: r || "12px",
      fontWeight: l || "regular",
      fontFamily: n || w.config.chart.fontFamily,
      foreColor: o || w.config.chart.foreColor,
      cssClass: "apexcharts-text " + c ? c : ""
    }), C = w.dom.baseEl.querySelector(x);
    C && C.appendChild(v.node);
    const D = v.bbox();
    if (i) {
      const S = this.graphics.drawRect(
        D.x - m,
        D.y - b,
        D.width + m + u,
        D.height + y + b,
        g,
        h || "transparent",
        1,
        d,
        f,
        p
      );
      C.insertBefore(S.node, v.node);
    }
  }
  addImage(t) {
    const e = this.w, {
      path: s,
      x: i = 0,
      y: a = 0,
      width: o = 20,
      height: r = 20,
      appendTo: n = ".apexcharts-svg"
    } = t, l = e.dom.Paper.image(s);
    l.size(o, r).move(i, a);
    const c = e.dom.baseEl.querySelector(n);
    return c && c.appendChild(l.node), l;
  }
  // The addXaxisAnnotation method requires a parent class, and user calling this method externally on the chart instance may not specify parent, hence a different method
  addXaxisAnnotationExternal(t, e, s) {
    return this.addAnnotationExternal({
      params: t,
      pushToMemory: e,
      context: s,
      type: "xaxis",
      contextMethod: s.addXaxisAnnotation
    }), s;
  }
  addYaxisAnnotationExternal(t, e, s) {
    return this.addAnnotationExternal({
      params: t,
      pushToMemory: e,
      context: s,
      type: "yaxis",
      contextMethod: s.addYaxisAnnotation
    }), s;
  }
  addPointAnnotationExternal(t, e, s) {
    return typeof this.invertAxis > "u" && (this.invertAxis = s.w.globals.isBarHorizontal), this.addAnnotationExternal({
      params: t,
      pushToMemory: e,
      context: s,
      type: "point",
      contextMethod: s.addPointAnnotation
    }), s;
  }
  addAnnotationExternal({
    params: t,
    pushToMemory: e,
    context: s,
    type: i,
    contextMethod: a
  }) {
    const o = s, r = o.w, n = r.dom.baseEl.querySelector(
      `.apexcharts-${i}-annotations`
    ), l = n.childNodes.length + 1, c = new nt(), h = Object.assign(
      {},
      i === "xaxis" ? c.xAxisAnnotation : i === "yaxis" ? c.yAxisAnnotation : c.pointAnnotation
    ), d = L.extend(h, t);
    switch (i) {
      case "xaxis":
        this.addXaxisAnnotation(d, n, l);
        break;
      case "yaxis":
        this.addYaxisAnnotation(d, n, l);
        break;
      case "point":
        this.addPointAnnotation(d, n, l);
        break;
    }
    const p = r.dom.baseEl.querySelector(
      `.apexcharts-${i}-annotations .apexcharts-${i}-annotation-label[rel='${l}']`
    ), g = this.helpers.addBackgroundToAnno(p, d);
    return g && n.insertBefore(g.node, p), e && r.globals.memory.methodsToExec.push({
      context: o,
      id: d.id ? d.id : L.randomId(),
      method: a,
      label: "addAnnotation",
      params: t
    }), s;
  }
  clearAnnotations(t) {
    const e = t.w;
    let s = e.dom.baseEl.querySelectorAll(
      ".apexcharts-yaxis-annotations, .apexcharts-xaxis-annotations, .apexcharts-point-annotations"
    );
    for (let i = e.globals.memory.methodsToExec.length - 1; i >= 0; i--)
      (e.globals.memory.methodsToExec[i].label === "addText" || e.globals.memory.methodsToExec[i].label === "addAnnotation") && e.globals.memory.methodsToExec.splice(i, 1);
    s = Array.from(s), Array.prototype.forEach.call(s, (i) => {
      for (; i.firstChild; )
        i.removeChild(i.firstChild);
    });
  }
  removeAnnotation(t, e) {
    const s = t.w, i = s.dom.baseEl.querySelectorAll(`.${e}`);
    i && (s.globals.memory.methodsToExec.map((a, o) => {
      a.id === e && s.globals.memory.methodsToExec.splice(o, 1);
    }), Object.keys(s.config.annotations).forEach((a) => {
      const o = s.config.annotations[a];
      Array.isArray(o) && (s.config.annotations[a] = o.filter((r) => r.id !== e));
    }), Array.prototype.forEach.call(i, (a) => {
      a.parentElement.removeChild(a);
    }));
  }
}
K.registerFeatures({ annotations: _s });
class Ws {
  constructor(t, e) {
    this.w = t, this.ctx = e, this.seriesIndex = 0, this.dataPointIndex = 0, this.active = !1, this._focusedEl = null, this._hoveredBarEl = null, this._enlargedScatterMarker = null, this._onKeyDown = this._onKeyDown.bind(this), this._onFocus = this._onFocus.bind(this), this._onBlur = this._onBlur.bind(this), this._onLegendClick = this._onLegendClick.bind(this);
  }
  // ─── Public API ───────────────────────────────────────────────────────────
  /**
   * Called after the chart and tooltip have been fully rendered.
   * Attaches event listeners and makes the SVG keyboard-focusable.
   */
  init() {
    const e = this.w.dom.Paper.node;
    e && (e.setAttribute("tabindex", "0"), e.addEventListener("focus", this._onFocus), e.addEventListener("blur", this._onBlur), e.addEventListener("keydown", this._onKeyDown, { passive: !1 }), this.ctx.events.addEventListener("legendClick", this._onLegendClick));
  }
  /**
   * Removes all event listeners. Called from chart.destroy().
   */
  destroy() {
    const t = this.w, e = t.dom.Paper && t.dom.Paper.node;
    e && (e.removeEventListener("focus", this._onFocus), e.removeEventListener("blur", this._onBlur), e.removeEventListener("keydown", this._onKeyDown), this.ctx.events.removeEventListener("legendClick", this._onLegendClick));
  }
  /**
   * Called from Events.js keydown handler. Navigation keys are already handled
   * by the direct SVG listener (which can call preventDefault). This entry
   * point is intentionally a no-op — Events.js still fires the public keyDown
   * callback and fireEvent('keydown') independently.
   */
  handleKey(t) {
  }
  // ─── Focus / blur ─────────────────────────────────────────────────────────
  _onFocus() {
    this._isNavEnabled() && (this.active = !0, this._clampCursor(), this._snapToVisibleRange(), this._showCurrentPoint());
  }
  _onBlur() {
    this.active = !1, this._hideFocus();
  }
  // Called when the user clicks a legend item (collapse/expand a series).
  // Hide the keyboard-nav tooltip — the chart is about to re-render and the
  // current position may no longer be valid.
  _onLegendClick() {
    this.active && (this.active = !1, this._hideFocus());
  }
  // ─── Key handler ──────────────────────────────────────────────────────────
  _onKeyDown(t) {
    if (!(!this._isNavEnabled() || !this.active))
      switch (t.key) {
        case "ArrowRight":
          t.preventDefault(), this._move(0, 1);
          break;
        case "ArrowLeft":
          t.preventDefault(), this._move(0, -1);
          break;
        case "ArrowUp":
          t.preventDefault(), this._move(-1, 0);
          break;
        case "ArrowDown":
          t.preventDefault(), this._move(1, 0);
          break;
        case "Home":
          t.preventDefault(), this.dataPointIndex = 0, this._skipNullForward(), this._showCurrentPoint();
          break;
        case "End":
          t.preventDefault(), this.dataPointIndex = this._getDataPointCount(this.seriesIndex) - 1, this._skipNullBackward(), this._showCurrentPoint();
          break;
        case "Enter":
        case " ":
          t.preventDefault(), this._fireClick();
          break;
        case "Escape":
          t.preventDefault(), this.active = !1, this._hideFocus();
          break;
      }
  }
  // ─── Navigation ───────────────────────────────────────────────────────────
  _move(t, e) {
    const s = this.w, i = s.config.chart.accessibility.keyboard.navigation.wrapAround;
    if (t !== 0) {
      const a = this.w.globals.tooltip;
      if (a && a.tConfig && a.tConfig.shared) {
        const c = this.dataPointIndex;
        if (a.tooltipUtil && a.tooltipUtil.isXoverlap(c) && a.tooltipUtil.isInitialSeriesSameLen())
          return;
      }
      const o = this._getSeriesCount();
      let r = this.seriesIndex + t, n = 0;
      for (; n < o && (r < 0 && (r = i ? o - 1 : 0), r >= o && (r = i ? 0 : o - 1), !!s.globals.collapsedSeriesIndices.includes(r)); )
        r += t, n++;
      this.seriesIndex = r;
      const l = this._getDataPointCount(r);
      this.dataPointIndex >= l && (this.dataPointIndex = l - 1);
    }
    if (e !== 0) {
      const a = this._getDataPointCount(this.seriesIndex);
      let o = this.dataPointIndex + e;
      o < 0 && (o = i ? a - 1 : 0), o >= a && (o = i ? 0 : a - 1), this.dataPointIndex = o, e > 0 ? this._skipNullForward() : this._skipNullBackward(), this._isDataPointVisible(this.seriesIndex, this.dataPointIndex) || this._snapToVisibleRangeInDirection(e);
    }
    this._showCurrentPoint();
  }
  /** Advance dataPointIndex forward past any nulls */
  _skipNullForward() {
    const t = this.w, e = this.seriesIndex, s = this._getDataPointCount(e);
    let i = this.dataPointIndex, a = 0;
    if (Array.isArray(t.seriesData.series[e])) {
      for (; a < s && t.seriesData.series[e][i] === null; )
        i = (i + 1) % s, a++;
      this.dataPointIndex = i;
    }
  }
  /** Retreat dataPointIndex backward past any nulls */
  _skipNullBackward() {
    const t = this.w, e = this.seriesIndex, s = this._getDataPointCount(e);
    let i = this.dataPointIndex, a = 0;
    if (Array.isArray(t.seriesData.series[e])) {
      for (; a < s && t.seriesData.series[e][i] === null; )
        i = (i - 1 + s) % s, a++;
      this.dataPointIndex = i;
    }
  }
  // ─── Display ──────────────────────────────────────────────────────────────
  _showCurrentPoint() {
    const { seriesIndex: t, dataPointIndex: e } = this, s = this.w, i = s.globals.tooltip;
    !i || !i.ttItems || (s.interact.capturedSeriesIndex = t, s.interact.capturedDataPointIndex = e, this._applyFocusClass(t, e), this._showTooltip(t, e, i));
  }
  _hideFocus() {
    const t = this.w, e = t.globals.tooltip;
    if (this._removeFocusClass(), this._leaveHoveredBar(), !e)
      return;
    e.marker && e.marker.resetPointsSize(), this._enlargedScatterMarker = null;
    const s = e.getElTooltip();
    s && (s.classList.remove("apexcharts-active"), t.config.chart.accessibility.enabled && t.config.chart.accessibility.announcements.enabled && s.setAttribute("aria-hidden", "true")), t.dom.baseEl.classList.remove("apexcharts-tooltip-active");
    const i = e.getElXCrosshairs();
    i && i.classList.remove("apexcharts-active");
  }
  // ─── Tooltip display per chart type ───────────────────────────────────────
  _showTooltip(t, e, s) {
    const i = this.w, a = i.config.chart.type, o = s.getElTooltip();
    if (!o)
      return;
    const r = s.getCachedDimensions();
    s.tooltipRect = {
      x: 0,
      y: 0,
      ttWidth: r.ttWidth || 0,
      ttHeight: r.ttHeight || 0
    }, this._setSyntheticEvent(t, e, s), i.dom.baseEl.classList.add("apexcharts-tooltip-active"), o.classList.add("apexcharts-active"), i.config.chart.accessibility.enabled && i.config.chart.accessibility.announcements.enabled && o.removeAttribute("aria-hidden"), a === "pie" || a === "donut" || a === "polarArea" ? this._showTooltipNonAxis(t, e, s, o) : a === "radialBar" ? this._showTooltipRadialBar(t, e, s, o) : a === "heatmap" || a === "treemap" ? this._showTooltipHeatTree(t, e, s, o, a) : a === "bar" || a === "candlestick" || a === "boxPlot" || a === "rangeBar" ? this._showTooltipBar(t, e, s) : this._showTooltipAxisLine(t, e, s);
  }
  /**
   * Set ttCtx.e to a synthetic mouse-event-like object whose clientX/Y point
   * to the centre of the current data-point element.  This ensures that any
   * positioning helper that reads ttCtx.e (followCursor path in moveTooltip,
   * moveStickyTooltipOverBars, moveDynamicPointsOnHover, etc.) gets valid
   * coordinates rather than crashing on undefined.
   *
   * For chart types that don't have a concrete SVG element per data point
   * (pie, radialBar) we fall back to the SVG centre.
   */
  _setSyntheticEvent(t, e, s) {
    const i = this.w, a = i.config.chart.type;
    let o = 0, r = 0;
    const n = this._getFocusableElement(t, e);
    if (n) {
      const l = n.getBoundingClientRect();
      o = l.left + l.width / 2, r = l.top + l.height / 2;
    } else if (i.globals.pointsArray && i.globals.pointsArray[t] && i.globals.pointsArray[t][e]) {
      const l = i.globals.pointsArray[t][e], c = s.getElGrid && s.getElGrid();
      if (c) {
        const h = c.getBoundingClientRect();
        o = h.left + (l[0] || 0), r = h.top + (l[1] || 0);
      }
    } else {
      const l = i.dom.Paper && i.dom.Paper.node;
      if (l) {
        const c = l.getBoundingClientRect();
        o = c.left + c.width / 2, r = c.top + c.height / 2;
      }
    }
    if ((a === "line" || a === "area" || a === "rangeArea" || a === "scatter" || a === "bubble" || a === "radar") && i.globals.pointsArray && i.globals.pointsArray[t] && i.globals.pointsArray[t][e]) {
      const l = i.globals.pointsArray[t][e], c = s.getElGrid && s.getElGrid();
      if (c) {
        const h = c.getBoundingClientRect();
        o = h.left + (l[0] || 0), r = h.top + (l[1] || 0);
      }
    }
    s.e = { type: "mousemove", clientX: o, clientY: r };
  }
  /** bar / column / candlestick / boxPlot / rangeBar */
  _showTooltipBar(t, e, s) {
    var i, a, o, r;
    const n = this.w, l = s.tConfig.shared && (s.tooltipUtil.isXoverlap(e) || n.globals.isBarHorizontal) && s.tooltipUtil.isInitialSeriesSameLen(), c = (r = (o = (a = (i = n.rangeData.seriesRange) == null ? void 0 : i[t]) == null ? void 0 : a[e]) == null ? void 0 : o.y) == null ? void 0 : r[0];
    s.tooltipLabels.drawSeriesTexts(O(I(I({
      ttItems: s.ttItems,
      i: t,
      j: e
    }, (c == null ? void 0 : c.y1) !== void 0 && { y1: c.y1 }), (c == null ? void 0 : c.y2) !== void 0 && { y2: c.y2 }), {
      shared: l
    }));
    const h = `.apexcharts-series[data\\:realIndex='${t}']`, d = n.dom.Paper.findOne(
      `${h} path[j='${e}'], ${h} circle[j='${e}'], ${h} rect[j='${e}']`
    );
    if (d && (this._leaveHoveredBar(), new P(this.w, this.ctx).pathMouseEnter(d, null), this._hoveredBarEl = d), n.globals.isBarHorizontal) {
      const p = d && d.node;
      if (p) {
        const g = n.dom.elWrap.getBoundingClientRect(), f = p.getBoundingClientRect(), x = f.left - g.left, m = f.top - g.top, u = f.height, y = f.width, b = s.tooltipRect.ttWidth || 0, w = s.tooltipRect.ttHeight || 0, v = m + u / 2 - w / 2;
        let C = x + y;
        const D = s.xyRatios && s.xyRatios.baseLineInvertedY != null ? s.xyRatios.baseLineInvertedY : g.width / 2;
        x < D && (C = x - b);
        const S = s.getElTooltip();
        S && (S.style.left = C + "px", S.style.top = v + "px");
      }
    } else
      s.tooltipPosition.moveStickyTooltipOverBars(e, t);
  }
  /** line / area / scatter / bubble / radar / rangeArea */
  _showTooltipAxisLine(t, e, s) {
    const i = this.w, a = i.config.chart.type, r = s.tConfig.shared && s.tooltipUtil.isXoverlap(e) && s.tooltipUtil.isInitialSeriesSameLen();
    s.tooltipLabels.drawSeriesTexts({
      ttItems: s.ttItems,
      i: t,
      j: e,
      shared: r
    });
    const n = a === "scatter" || a === "bubble", l = i.globals.markers.largestSize > 0;
    n ? this._showScatterBubblePoint(t, e, s) : l ? r ? s.marker.enlargePoints(e) : s.tooltipPosition.moveDynamicPointOnHover(e, t) : r ? s.tooltipPosition.moveDynamicPointsOnHover(e) : s.tooltipPosition.moveDynamicPointOnHover(e, t);
  }
  /**
   * Scatter / bubble: find the specific marker element for (seriesIndex i,
   * dataPointIndex j), resize only that element, and position the tooltip at
   * its coordinates — mirroring what Position.moveMarkers does for mouse hover.
   *
   * Unlike enlargePoints(j) which queries ALL series for rel===j (causing
   * multiple bubbles to enlarge and tooltip to land on the wrong one), this
   * method queries by both series index AND data-point index for precision.
   */
  _showScatterBubblePoint(t, e, s) {
    const i = this.w.dom.baseEl;
    this._enlargedScatterMarker && (s.marker.oldPointSize(this._enlargedScatterMarker), this._enlargedScatterMarker = null);
    const a = i.querySelector(
      `.apexcharts-series[data\\:realIndex='${t}']`
    );
    if (!a)
      return;
    const o = a.querySelector(`.apexcharts-marker[rel='${e}']`);
    o && (s.marker.enlargeCurrentPoint(e, o), this._enlargedScatterMarker = o);
  }
  /** pie / donut / polarArea */
  _showTooltipNonAxis(t, e, s, i) {
    const a = this.w;
    s.tooltipLabels.drawSeriesTexts({
      ttItems: s.ttItems,
      i: e,
      shared: !1
    });
    const o = i.getBoundingClientRect(), r = o.width || s.tooltipRect.ttWidth || 0, n = o.height || s.tooltipRect.ttHeight || 0, l = a.dom.baseEl.querySelector(
      `.apexcharts-pie-area[j='${e}']`
    );
    if (l) {
      const c = parseFloat(l.getAttribute("data:cx")), h = parseFloat(l.getAttribute("data:cy"));
      if (!isNaN(c) && !isNaN(h)) {
        const d = a.dom.Paper.node.getBoundingClientRect(), p = a.dom.elWrap.getBoundingClientRect(), g = d.left - p.left, f = d.top - p.top;
        i.style.left = g + c - r / 2 + "px", i.style.top = f + h - n - 10 + "px";
      }
    }
  }
  /** radialBar — one ring per series, single value each */
  _showTooltipRadialBar(t, e, s, i) {
    const a = this.w;
    s.tooltipLabels.drawSeriesTexts({
      ttItems: s.ttItems,
      i: t,
      shared: !1
    });
    const { ttWidth: o = 0, ttHeight: r = 0 } = s.getCachedDimensions(), n = a.dom.baseEl.querySelector(
      `.apexcharts-radialbar-series[data\\:realIndex='${t}'] path`
    );
    if (n) {
      const l = parseFloat(n.getAttribute("data:angle")) || 0, h = (a.config.plotOptions.radialBar.startAngle || 0) + l / 2, d = a.layout.gridWidth / 2, p = a.layout.gridHeight / 2, g = a.globals.radialSize || Math.min(a.layout.gridWidth, a.layout.gridHeight) / 2, f = a.seriesData.series.length, x = g / Math.max(f, 1), m = g - t * x, u = m - x, y = (m + u) / 2, b = L.polarToCartesian(d, p, y, h), w = b.x + (a.layout.translateX || 0), v = b.y + (a.layout.translateY || 0);
      i.style.left = w - o / 2 + "px", i.style.top = v - r - 10 + "px";
    }
  }
  /** heatmap / treemap — position tooltip using element bounding rect */
  _showTooltipHeatTree(t, e, s, i, a) {
    const o = this.w;
    s.tooltipLabels.drawSeriesTexts({
      ttItems: s.ttItems,
      i: t,
      j: e,
      shared: !1
    });
    const r = i.getBoundingClientRect(), n = r.width || s.tooltipRect.ttWidth || 0, l = r.height || s.tooltipRect.ttHeight || 0, c = a === "heatmap" ? "apexcharts-heatmap-rect" : "apexcharts-treemap-rect", h = o.dom.baseEl.querySelector(
      `.${c}[i='${t}'][j='${e}']`
    );
    if (h) {
      const d = o.dom.elWrap.getBoundingClientRect(), p = h.getBoundingClientRect(), g = p.left - d.left, f = p.top - d.top, x = p.width, m = p.height, u = parseFloat(h.getAttribute("cx")), y = parseFloat(h.getAttribute("width"));
      s.tooltipPosition.moveXCrosshairs(u + y / 2);
      let b = g + x + n / 2;
      const w = f + m / 2 - l / 2;
      g + x > o.layout.gridWidth / 2 && (b = g - n / 2), i.style.left = b + "px", i.style.top = w + "px";
    }
  }
  // ─── Focus class management ───────────────────────────────────────────────
  _applyFocusClass(t, e) {
    this._removeFocusClass();
    const s = this._getFocusableElement(t, e);
    s && (s.classList.add("apexcharts-keyboard-focused"), this._focusedEl = s);
  }
  _removeFocusClass() {
    this._focusedEl && (this._focusedEl.classList.remove("apexcharts-keyboard-focused"), this._focusedEl = null);
  }
  _leaveHoveredBar() {
    this._hoveredBarEl && (new P(this.w, this.ctx).pathMouseLeave(this._hoveredBarEl, null), this._hoveredBarEl = null);
  }
  _getFocusableElement(t, e) {
    const s = this.w, i = s.config.chart.type, a = s.dom.baseEl;
    return i === "pie" || i === "donut" || i === "polarArea" ? a.querySelector(`.apexcharts-pie-area[j='${e}']`) : i === "heatmap" ? a.querySelector(
      `.apexcharts-heatmap-rect[i='${t}'][j='${e}']`
    ) : i === "treemap" ? a.querySelector(
      `.apexcharts-treemap-rect[i='${t}'][j='${e}']`
    ) : i === "radialBar" ? a.querySelector(
      `.apexcharts-radialbar-series[data\\:realIndex='${t}'] path`
    ) : i === "bar" || i === "candlestick" || i === "boxPlot" || i === "rangeBar" ? a.querySelector(
      `.apexcharts-series[data\\:realIndex='${t}'] path[j='${e}']`
    ) : a.querySelector(
      `.apexcharts-series[data\\:realIndex='${t}'] .apexcharts-marker[rel='${e}']`
    ) || null;
  }
  // ─── Click / Enter ────────────────────────────────────────────────────────
  _fireClick() {
    const e = this.w.globals.tooltip;
    if (!e)
      return;
    const s = {
      type: "mouseup",
      clientX: 0,
      clientY: 0
    };
    e.markerClick(s, this.seriesIndex, this.dataPointIndex);
  }
  // ─── Helpers ──────────────────────────────────────────────────────────────
  _isNavEnabled() {
    const t = this.w.config.chart.accessibility;
    return t.enabled && t.keyboard.enabled && t.keyboard.navigation.enabled;
  }
  _getSeriesCount() {
    const t = this.w, e = t.config.chart.type;
    return e === "pie" || e === "donut" || e === "polarArea" ? 1 : t.seriesData.series.length;
  }
  _getDataPointCount(t) {
    const e = this.w, s = e.config.chart.type;
    if (s === "pie" || s === "donut" || s === "polarArea")
      return e.seriesData.series.length;
    const i = e.seriesData.series;
    return i[t] && Array.isArray(i[t]) ? i[t].length : 0;
  }
  _clampCursor() {
    const t = this._getSeriesCount();
    this.seriesIndex >= t && (this.seriesIndex = t - 1), this.seriesIndex < 0 && (this.seriesIndex = 0);
    const e = this._getDataPointCount(this.seriesIndex);
    this.dataPointIndex >= e && (this.dataPointIndex = e - 1), this.dataPointIndex < 0 && (this.dataPointIndex = 0);
  }
  /**
   * When the chart is zoomed in, the current dataPointIndex may point to a
   * data point that is outside the visible viewport. Snap the cursor to the
   * first data point whose x-value falls within [minX, maxX].
   *
   * Only adjusts when w.seriesData.seriesX is populated (numeric/datetime axes).
   * Category-only charts (seriesX entries are strings or auto-indices) are
   * unaffected — all points are always visible.
   */
  _snapToVisibleRange() {
    const t = this.w, e = t.globals, s = this.seriesIndex;
    if (!t.interact.zoomed)
      return;
    const i = t.seriesData.seriesX && t.seriesData.seriesX[s];
    if (!i || !i.length)
      return;
    const a = e.minX, o = e.maxX;
    if (a === void 0 || o === void 0)
      return;
    const r = i[this.dataPointIndex];
    if (r >= a && r <= o)
      return;
    const n = i.length;
    for (let l = 0; l < n; l++)
      if (i[l] >= a && i[l] <= o) {
        this.dataPointIndex = l;
        return;
      }
  }
  /**
   * Snap to the nearest visible data point in the given navigation direction.
   * direction > 0 → find the first visible point (left boundary of zoomed range)
   * direction < 0 → find the last visible point (right boundary of zoomed range)
   */
  _snapToVisibleRangeInDirection(t) {
    const e = this.w, s = e.globals, i = this.seriesIndex, a = e.seriesData.seriesX && e.seriesData.seriesX[i];
    if (!a || !a.length)
      return;
    const o = s.minX, r = s.maxX;
    if (o === void 0 || r === void 0)
      return;
    const n = a.length;
    if (t >= 0) {
      for (let l = 0; l < n; l++)
        if (a[l] >= o && a[l] <= r) {
          this.dataPointIndex = l;
          return;
        }
    } else
      for (let l = n - 1; l >= 0; l--)
        if (a[l] >= o && a[l] <= r) {
          this.dataPointIndex = l;
          return;
        }
  }
  /**
   * Check whether the data point at (si, di) is within the current visible
   * x-axis range. Used to skip out-of-viewport points during keyboard nav.
   */
  _isDataPointVisible(t, e) {
    const s = this.w, i = s.globals;
    if (!s.interact.zoomed)
      return !0;
    const a = s.seriesData.seriesX && s.seriesData.seriesX[t];
    if (!a)
      return !0;
    const o = a[e];
    return o === void 0 ? !0 : o >= i.minX && o <= i.maxX;
  }
}
K.registerFeatures({ keyboardNavigation: Ws });
class Gs {
  constructor(t) {
    this.w = t.w, this.barCtx = t, this.totalFormatter = this.w.config.plotOptions.bar.dataLabels.total.formatter, this.totalFormatter || (this.totalFormatter = this.w.config.dataLabels.formatter);
  }
  /** handleBarDataLabels is used to calculate the positions for the data-labels
   * It also sets the element's data attr for bars and calls drawCalculatedBarDataLabels()
   * After calculating, it also calls the function to draw data labels
   * @memberof Bar
   * @param {object} {barProps} most of the bar properties used throughout the bar
   * drawing function
   * @return {object} dataLabels node-element which you can append later
   **/
  handleBarDataLabels(t) {
    const {
      x: e,
      y: s,
      y1: i,
      y2: a,
      i: o,
      j: r,
      realIndex: n,
      columnGroupIndex: l,
      series: c,
      barHeight: h,
      barWidth: d,
      barXPosition: p,
      barYPosition: g,
      visibleSeries: f
    } = t, x = this.w, m = new P(this.barCtx.w), u = Array.isArray(this.barCtx.strokeWidth) ? this.barCtx.strokeWidth[n] : this.barCtx.strokeWidth;
    let y, b;
    x.axisFlags.isXNumeric && !x.globals.isBarHorizontal ? (y = e + parseFloat(d * (f + 1)), b = s + parseFloat(h * (f + 1)) - u) : (y = e + parseFloat(d * f), b = s + parseFloat(h * f));
    let w = null, v = null, C = e, D = s, S = {};
    const k = x.config.dataLabels, F = this.barCtx.barOptions.dataLabels, T = this.barCtx.barOptions.dataLabels.total;
    typeof g < "u" && this.barCtx.isRangeBar && (b = g, D = g), typeof p < "u" && this.barCtx.isVerticalGroupedRangeBar && (y = p, C = p);
    const M = k.offsetX, E = k.offsetY;
    let X = {
      width: 0,
      height: 0
    };
    if (x.config.dataLabels.enabled) {
      const Y = x.seriesData.series[o][r];
      X = m.getTextRects(
        x.config.dataLabels.formatter ? x.config.dataLabels.formatter(Y, O(I({}, x), {
          seriesIndex: o,
          dataPointIndex: r,
          w: x
        })) : x.formatters.yLabelFormatters[0](Y),
        parseFloat(k.style.fontSize)
      );
    }
    const R = {
      x: e,
      y: s,
      i: o,
      j: r,
      realIndex: n,
      columnGroupIndex: l,
      bcx: y,
      bcy: b,
      barHeight: h,
      barWidth: d,
      textRects: X,
      strokeWidth: u,
      dataLabelsX: C,
      dataLabelsY: D,
      dataLabelsConfig: k,
      barDataLabelsConfig: F,
      barTotalDataLabelsConfig: T,
      offX: M,
      offY: E
    };
    return this.barCtx.isHorizontal ? S = this.calculateBarsDataLabelsPosition(R) : S = this.calculateColumnsDataLabelsPosition(R), w = this.drawCalculatedDataLabels({
      x: S.dataLabelsX,
      y: S.dataLabelsY,
      val: this.barCtx.isRangeBar ? [i, a] : x.config.chart.stackType === "100%" ? c[n][r] : x.seriesData.series[n][r],
      i: n,
      j: r,
      barWidth: d,
      barHeight: h,
      textRects: X,
      dataLabelsConfig: k
    }), x.config.chart.stacked && T.enabled && (v = this.drawTotalDataLabels({
      x: S.totalDataLabelsX,
      y: S.totalDataLabelsY,
      barWidth: d,
      barHeight: h,
      realIndex: n,
      textAnchor: S.totalDataLabelsAnchor,
      val: this.getStackedTotalDataLabel({ realIndex: n, j: r }),
      dataLabelsConfig: k,
      barTotalDataLabelsConfig: T
    })), {
      dataLabelsPos: S,
      dataLabels: w,
      totalDataLabels: v
    };
  }
  getStackedTotalDataLabel({ realIndex: t, j: e }) {
    const s = this.w;
    let i = this.barCtx.stackedSeriesTotals[e];
    return this.totalFormatter && (i = this.totalFormatter(i, O(I({}, s), {
      seriesIndex: t,
      dataPointIndex: e,
      w: s
    }))), i;
  }
  calculateColumnsDataLabelsPosition(t) {
    const e = this.w;
    let {
      i: s,
      j: i,
      realIndex: a,
      y: o,
      bcx: r,
      barWidth: n,
      barHeight: l,
      textRects: c,
      dataLabelsX: h,
      dataLabelsY: d,
      dataLabelsConfig: p,
      barDataLabelsConfig: g,
      barTotalDataLabelsConfig: f,
      strokeWidth: x,
      offX: m,
      offY: u
    } = t, y, b;
    const w = "middle", v = r;
    l = Math.abs(l);
    const C = e.config.plotOptions.bar.dataLabels.orientation === "vertical", { zeroEncounters: D } = this.barCtx.barHelpers.getZeroValueEncounters({
      i: s,
      j: i
    });
    r = r - x / 2;
    const S = e.layout.gridWidth / e.globals.dataPoints;
    this.barCtx.isVerticalGroupedRangeBar ? h += n / 2 : (e.axisFlags.isXNumeric ? h = r - n / 2 + m : h = r - S + n / 2 + m, !e.config.chart.stacked && D > 0 && e.config.plotOptions.bar.hideZeroBarsWhenGrouped && (h -= n * D)), C && (h = h + c.height / 2 - x / 2 - 2);
    const k = e.seriesData.series[s][i] < 0;
    let F = o;
    switch (this.barCtx.isReversed && (F = o + (k ? l : -l)), g.position) {
      case "center":
        C ? k ? d = F - l / 2 + u : d = F + l / 2 - u : k ? d = F - l / 2 + c.height / 2 + u : d = F + l / 2 + c.height / 2 - u;
        break;
      case "bottom":
        C ? k ? d = F - l + u : d = F + l - u : k ? d = F - l + c.height + x + u : d = F + l - c.height / 2 + x - u;
        break;
      case "top":
        C ? k ? d = F + u : d = F - u : k ? d = F - c.height / 2 - u : d = F + c.height + u;
        break;
    }
    let T = F;
    if (e.labelData.seriesGroups.forEach((M) => {
      var E;
      (E = this.barCtx[M.join(",")]) == null || E.prevY.forEach((X) => {
        k ? T = Math.max(X[i], T) : T = Math.min(X[i], T);
      });
    }), this.barCtx.lastActiveBarSerieIndex === a && f.enabled) {
      const X = new P(this.barCtx.w).getTextRects(
        this.getStackedTotalDataLabel({ realIndex: a, j: i }),
        p.fontSize
      );
      k ? y = T - X.height / 2 - u - f.offsetY + 18 : y = T + X.height + u + f.offsetY - 18;
      const R = S;
      b = v + (e.axisFlags.isXNumeric ? -n * e.globals.barGroups.length / 2 : e.globals.barGroups.length * n / 2 - (e.globals.barGroups.length - 1) * n - R) + f.offsetX;
    }
    return e.config.chart.stacked || (d < 0 ? d = 0 + x : d + c.height / 3 > e.layout.gridHeight && (d = e.layout.gridHeight - x)), {
      bcx: r,
      bcy: o,
      dataLabelsX: h,
      dataLabelsY: d,
      totalDataLabelsX: b,
      totalDataLabelsY: y,
      totalDataLabelsAnchor: w
    };
  }
  calculateBarsDataLabelsPosition(t) {
    const e = this.w;
    let {
      x: s,
      i,
      j: a,
      realIndex: o,
      bcy: r,
      barHeight: n,
      barWidth: l,
      textRects: c,
      dataLabelsX: h,
      strokeWidth: d,
      dataLabelsConfig: p,
      barDataLabelsConfig: g,
      barTotalDataLabelsConfig: f,
      offX: x,
      offY: m
    } = t;
    const u = e.layout.gridHeight / e.globals.dataPoints, { zeroEncounters: y } = this.barCtx.barHelpers.getZeroValueEncounters({
      i,
      j: a
    });
    l = Math.abs(l);
    let b = r - (this.barCtx.isRangeBar ? 0 : u) + n / 2 + c.height / 2 + m - 3;
    !e.config.chart.stacked && y > 0 && e.config.plotOptions.bar.hideZeroBarsWhenGrouped && (b -= n * y);
    let w, v, C = "start";
    const D = e.seriesData.series[i][a] < 0;
    let S = s;
    switch (this.barCtx.isReversed && (S = s + (D ? -l : l), C = D ? "start" : "end"), g.position) {
      case "center":
        D ? h = S + l / 2 - x : h = Math.max(c.width / 2, S - l / 2) + x;
        break;
      case "bottom":
        D ? h = S + l - d - x : h = S - l + d + x;
        break;
      case "top":
        D ? h = S - d - x : h = S - d + x;
        break;
    }
    let k = S;
    if (e.labelData.seriesGroups.forEach((F) => {
      var T;
      (T = this.barCtx[F.join(",")]) == null || T.prevX.forEach((M) => {
        D ? k = Math.min(M[a], k) : k = Math.max(M[a], k);
      });
    }), this.barCtx.lastActiveBarSerieIndex === o && f.enabled) {
      const T = new P(this.barCtx.w).getTextRects(
        this.getStackedTotalDataLabel({ realIndex: o, j: a }),
        p.fontSize
      );
      D ? (w = k - d - x - f.offsetX, C = "end") : w = k + x + f.offsetX + (this.barCtx.isReversed ? -(l + d) : d), v = b - c.height / 2 + T.height / 2 + f.offsetY + d, e.globals.barGroups.length > 1 && (v = v - e.globals.barGroups.length / 2 * (n / 2));
    }
    return e.config.chart.stacked || (p.textAnchor === "start" ? h - c.width < 0 ? h = D ? c.width + d : d : h + c.width > e.layout.gridWidth && (h = D ? e.layout.gridWidth - d : e.layout.gridWidth - c.width - d) : p.textAnchor === "middle" ? h - c.width / 2 < 0 ? h = c.width / 2 + d : h + c.width / 2 > e.layout.gridWidth && (h = e.layout.gridWidth - c.width / 2 - d) : p.textAnchor === "end" && (h < 1 ? h = c.width + d : h + 1 > e.layout.gridWidth && (h = e.layout.gridWidth - c.width - d))), {
      bcx: s,
      bcy: r,
      dataLabelsX: h,
      dataLabelsY: b,
      totalDataLabelsX: w,
      totalDataLabelsY: v,
      totalDataLabelsAnchor: C
    };
  }
  drawCalculatedDataLabels({
    x: t,
    y: e,
    val: s,
    i,
    // = realIndex
    j: a,
    textRects: o,
    barHeight: r,
    barWidth: n,
    dataLabelsConfig: l
  }) {
    const c = this.w;
    let h = "rotate(0)";
    c.config.plotOptions.bar.dataLabels.orientation === "vertical" && (h = `rotate(-90, ${t}, ${e})`);
    const d = new gt(this.barCtx.w, this.barCtx.ctx), p = new P(this.barCtx.w), g = l.formatter;
    let f = null;
    const x = c.globals.collapsedSeriesIndices.indexOf(i) > -1;
    if (l.enabled && !x) {
      f = p.group({
        class: "apexcharts-data-labels",
        transform: h
      });
      let m = "";
      typeof s < "u" && (m = g(s, O(I({}, c), {
        seriesIndex: i,
        dataPointIndex: a,
        w: c
      }))), !s && c.config.plotOptions.bar.hideZeroBarsWhenGrouped && (m = "");
      const u = c.seriesData.series[i][a] < 0, y = c.config.plotOptions.bar.dataLabels.position;
      if (c.config.plotOptions.bar.dataLabels.orientation === "vertical" && (y === "top" && (u ? l.textAnchor = "end" : l.textAnchor = "start"), y === "center" && (l.textAnchor = "middle"), y === "bottom" && (u ? l.textAnchor = "end" : l.textAnchor = "start")), this.barCtx.isRangeBar && this.barCtx.barOptions.dataLabels.hideOverflowingLabels) {
        const w = p.getTextRects(
          m,
          parseFloat(l.style.fontSize)
        );
        n < w.width && (m = "");
      }
      c.config.chart.stacked && this.barCtx.barOptions.dataLabels.hideOverflowingLabels && (this.barCtx.isHorizontal ? o.width / 1.6 > Math.abs(n) && (m = "") : o.height / 1.6 > Math.abs(r) && (m = ""));
      const b = I({}, l);
      this.barCtx.isHorizontal && s < 0 && (l.textAnchor === "start" ? b.textAnchor = "end" : l.textAnchor === "end" && (b.textAnchor = "start")), d.plotDataLabelsText({
        x: t,
        y: e,
        text: m,
        i,
        j: a,
        parent: f,
        dataLabelsConfig: b,
        alwaysDrawDataLabel: !0,
        offsetCorrection: !0
      });
    }
    return f;
  }
  drawTotalDataLabels({
    x: t,
    y: e,
    val: s,
    realIndex: i,
    textAnchor: a,
    barTotalDataLabelsConfig: o
  }) {
    const r = new P(this.barCtx.w);
    let n;
    return o.enabled && typeof t < "u" && typeof e < "u" && this.barCtx.lastActiveBarSerieIndex === i && (n = r.drawText({
      x: t,
      y: e,
      foreColor: o.style.color,
      text: s,
      textAnchor: a,
      fontFamily: o.style.fontFamily,
      fontSize: o.style.fontSize,
      fontWeight: o.style.fontWeight
    })), n;
  }
}
let $s = class {
  constructor(t) {
    this.w = t.w, this.barCtx = t;
  }
  initVariables(t) {
    const e = this.w;
    this.barCtx.series = t, this.barCtx.totalItems = 0, this.barCtx.seriesLen = 0, this.barCtx.visibleI = -1, this.barCtx.visibleItems = 1;
    for (let s = 0; s < t.length; s++)
      if (t[s].length > 0 && (this.barCtx.seriesLen = this.barCtx.seriesLen + 1, this.barCtx.totalItems += t[s].length), e.axisFlags.isXNumeric)
        for (let i = 0; i < t[s].length; i++)
          e.seriesData.seriesX[s][i] > e.globals.minX && e.seriesData.seriesX[s][i] < e.globals.maxX && this.barCtx.visibleItems++;
      else
        this.barCtx.visibleItems = e.globals.dataPoints;
    this.arrBorderRadius = this.createBorderRadiusArr(e.seriesData.series), L.isSafari() && (this.arrBorderRadius = this.arrBorderRadius.map(
      (s) => s.map((i) => "none")
    )), this.barCtx.seriesLen === 0 && (this.barCtx.seriesLen = 1), this.barCtx.zeroSerieses = [], e.globals.comboCharts || this.checkZeroSeries({ series: t });
  }
  initialPositions(t) {
    const e = this.w;
    let s, i, a, o, r, n, l, c, h = e.globals.dataPoints;
    this.barCtx.isRangeBar && (h = e.labelData.labels.length);
    let d = this.barCtx.seriesLen;
    if (e.config.plotOptions.bar.rangeBarGroupRows && (d = 1), this.barCtx.isHorizontal)
      a = e.layout.gridHeight / h, r = a / d, e.axisFlags.isXNumeric && (a = e.layout.gridHeight / this.barCtx.totalItems, r = a / this.barCtx.seriesLen), r = r * parseInt(this.barCtx.barOptions.barHeight, 10) / 100, String(this.barCtx.barOptions.barHeight).indexOf("%") === -1 && (r = parseInt(this.barCtx.barOptions.barHeight, 10)), c = this.barCtx.baseLineInvertedY + e.globals.padHorizontal + (this.barCtx.isReversed ? e.layout.gridWidth : 0) - (this.barCtx.isReversed ? this.barCtx.baseLineInvertedY * 2 : 0), this.barCtx.isFunnel && (c = e.layout.gridWidth / 2), i = (a - r * this.barCtx.seriesLen) / 2;
    else {
      if (o = e.layout.gridWidth / this.barCtx.visibleItems, e.config.xaxis.convertedCatToNumeric && (o = e.layout.gridWidth / e.globals.dataPoints), n = o / d * parseInt(this.barCtx.barOptions.columnWidth, 10) / 100, e.axisFlags.isXNumeric) {
        const p = this.barCtx.xRatio;
        e.globals.minXDiff && e.globals.minXDiff !== 0.5 && e.globals.minXDiff / p > 0 && (o = e.globals.minXDiff / p), n = o / d * parseInt(this.barCtx.barOptions.columnWidth, 10) / 100, n < 1 && (n = 1);
      }
      String(this.barCtx.barOptions.columnWidth).indexOf("%") === -1 && (n = parseInt(this.barCtx.barOptions.columnWidth, 10)), l = e.layout.gridHeight - this.barCtx.baseLineY[this.barCtx.translationsIndex] - (this.barCtx.isReversed ? e.layout.gridHeight : 0) + (this.barCtx.isReversed ? this.barCtx.baseLineY[this.barCtx.translationsIndex] * 2 : 0), e.axisFlags.isXNumeric ? s = this.barCtx.getBarXForNumericXAxis({
        x: s,
        j: 0,
        realIndex: t,
        barWidth: n
      }).x : s = e.globals.padHorizontal + L.noExponents(o - n * this.barCtx.seriesLen) / 2;
    }
    return e.globals.barHeight = r, e.globals.barWidth = n, {
      x: s,
      y: i,
      yDivision: a,
      xDivision: o,
      barHeight: r,
      barWidth: n,
      zeroH: l,
      zeroW: c
    };
  }
  initializeStackedPrevVars(t) {
    t.w.labelData.seriesGroups.forEach((s) => {
      t[s] || (t[s] = {}), t[s].prevY = [], t[s].prevX = [], t[s].prevYF = [], t[s].prevXF = [], t[s].prevYVal = [], t[s].prevXVal = [];
    });
  }
  initializeStackedXYVars(t) {
    t.w.labelData.seriesGroups.forEach((s) => {
      t[s] || (t[s] = {}), t[s].xArrj = [], t[s].xArrjF = [], t[s].xArrjVal = [], t[s].yArrj = [], t[s].yArrjF = [], t[s].yArrjVal = [];
    });
  }
  getPathFillColor(t, e, s, i) {
    var a, o, r, n;
    const l = this.w, c = new st(this.barCtx.w);
    let h = null;
    const d = this.barCtx.barOptions.distributed ? s : e;
    let p = !1;
    return this.barCtx.barOptions.colors.ranges.length > 0 && this.barCtx.barOptions.colors.ranges.map((x) => {
      t[e][s] >= x.from && t[e][s] <= x.to && (h = x.color, p = !0);
    }), {
      color: c.fillPath({
        seriesNumber: this.barCtx.barOptions.distributed ? d : i,
        dataPointIndex: s,
        color: h,
        value: t[e][s],
        fillConfig: (a = l.config.series[e].data[s]) == null ? void 0 : a.fill,
        fillType: (r = (o = l.config.series[e].data[s]) == null ? void 0 : o.fill) != null && r.type ? (n = l.config.series[e].data[s]) == null ? void 0 : n.fill.type : Array.isArray(l.config.fill.type) ? l.config.fill.type[i] : l.config.fill.type
      }),
      useRangeColor: p
    };
  }
  getStrokeWidth(t, e, s) {
    let i = 0;
    const a = this.w;
    return typeof this.barCtx.series[t][e] > "u" || this.barCtx.series[t][e] === null || a.config.chart.type === "bar" && !this.barCtx.series[t][e] ? this.barCtx.isNullValue = !0 : this.barCtx.isNullValue = !1, a.config.stroke.show && (this.barCtx.isNullValue || (i = Array.isArray(this.barCtx.strokeWidth) ? this.barCtx.strokeWidth[s] : this.barCtx.strokeWidth)), i;
  }
  createBorderRadiusArr(t) {
    var e;
    const s = this.w, i = !this.w.config.chart.stacked || s.config.plotOptions.bar.borderRadius <= 0, a = t.length, o = ((e = t[0]) == null ? void 0 : e.length) | 0, r = Array.from(
      { length: a },
      () => Array(o).fill(i ? "top" : "none")
    );
    if (i)
      return r;
    const n = this.w.config.chart.type;
    for (let l = 0; l < o; l++) {
      const c = [], h = [];
      let d = 0;
      for (let p = 0; p < a; p++) {
        const g = t[p][l];
        g > 0 ? (c.push(p), d++) : g < 0 && (h.push(p), d++);
      }
      if (c.length > 0 && h.length === 0)
        if (c.length === 1)
          r[c[0]][l] = n === "bar" && o === 1 ? "top" : "both";
        else {
          const p = c[0], g = c[c.length - 1];
          for (const f of c)
            f === p ? r[f][l] = n === "bar" && o === 1 ? "top" : "bottom" : f === g ? r[f][l] = "top" : r[f][l] = "none";
        }
      else if (h.length > 0 && c.length === 0)
        if (h.length === 1)
          r[h[0]][l] = "both";
        else {
          const p = Math.max(...h), g = Math.min(...h);
          for (const f of h)
            f === p ? r[f][l] = "bottom" : f === g ? r[f][l] = "top" : r[f][l] = "none";
        }
      else if (c.length > 0 && h.length > 0) {
        const p = c[c.length - 1];
        for (const f of c)
          f === p ? r[f][l] = "top" : r[f][l] = "none";
        const g = Math.max(...h);
        for (const f of h)
          f === g ? r[f][l] = "bottom" : r[f][l] = "none";
      } else if (d === 1) {
        const p = c[0] || h[0];
        r[p][l] = "both";
      }
    }
    return r;
  }
  barBackground({ j: t, i: e, x1: s, x2: i, y1: a, y2: o, elSeries: r }) {
    const n = this.w, l = new P(this.barCtx.w), h = new U(this.barCtx.w).getActiveConfigSeriesIndex();
    if (this.barCtx.barOptions.colors.backgroundBarColors.length > 0 && h === e) {
      t >= this.barCtx.barOptions.colors.backgroundBarColors.length && (t %= this.barCtx.barOptions.colors.backgroundBarColors.length);
      const d = this.barCtx.barOptions.colors.backgroundBarColors[t], p = l.drawRect(
        typeof s < "u" ? s : 0,
        typeof a < "u" ? a : 0,
        typeof i < "u" ? i : n.layout.gridWidth,
        typeof o < "u" ? o : n.layout.gridHeight,
        this.barCtx.barOptions.colors.backgroundBarRadius,
        d,
        this.barCtx.barOptions.colors.backgroundBarOpacity
      );
      r.add(p), p.node.classList.add("apexcharts-backgroundBar");
    }
  }
  getColumnPaths({
    barWidth: t,
    barXPosition: e,
    y1: s,
    y2: i,
    strokeWidth: a,
    isReversed: o,
    series: r,
    seriesGroup: n,
    realIndex: l,
    i: c,
    j: h,
    w: d
  }) {
    var p;
    const g = new P(this.barCtx.w);
    a = Array.isArray(a) ? a[l] : a, a || (a = 0);
    let f = t, x = e;
    (p = d.config.series[l].data[h]) != null && p.columnWidthOffset && (x = e - d.config.series[l].data[h].columnWidthOffset / 2, f = t + d.config.series[l].data[h].columnWidthOffset);
    const m = a / 2, u = x + m, y = x + f - m, b = (r[c][h] >= 0 ? 1 : -1) * (o ? -1 : 1);
    s += 1e-3 - m * b, i += 1e-3 + m * b;
    let w = g.move(u, s), v = g.move(u, s);
    const C = g.line(y, s);
    if (d.globals.previousPaths.length > 0 && (v = this.barCtx.getPreviousPath(l, h, !1)), w = w + g.line(u, i) + g.line(y, i) + C + (d.config.plotOptions.bar.borderRadiusApplication === "around" || this.arrBorderRadius[l][h] === "both" ? " Z" : " z"), v = v + g.line(u, s) + C + C + C + C + C + g.line(u, s) + (d.config.plotOptions.bar.borderRadiusApplication === "around" || this.arrBorderRadius[l][h] === "both" ? " Z" : " z"), this.arrBorderRadius[l][h] !== "none" && (w = g.roundPathCorners(
      w,
      d.config.plotOptions.bar.borderRadius
    )), d.config.chart.stacked) {
      let D = this.barCtx;
      D = this.barCtx[n], D.yArrj.push(i - m * b), D.yArrjF.push(Math.abs(s - i + a * b)), D.yArrjVal.push(this.barCtx.series[c][h]);
    }
    return {
      pathTo: w,
      pathFrom: v
    };
  }
  getBarpaths({
    barYPosition: t,
    barHeight: e,
    x1: s,
    x2: i,
    strokeWidth: a,
    isReversed: o,
    series: r,
    seriesGroup: n,
    realIndex: l,
    i: c,
    j: h,
    w: d
  }) {
    var p;
    const g = new P(this.barCtx.w);
    a = Array.isArray(a) ? a[l] : a, a || (a = 0);
    let f = t, x = e;
    (p = d.config.series[l].data[h]) != null && p.barHeightOffset && (f = t - d.config.series[l].data[h].barHeightOffset / 2, x = e + d.config.series[l].data[h].barHeightOffset);
    const m = a / 2, u = f + m, y = f + x - m, b = (r[c][h] >= 0 ? 1 : -1) * (o ? -1 : 1);
    s += 1e-3 + m * b, i += 1e-3 - m * b;
    let w = g.move(s, u), v = g.move(s, u);
    d.globals.previousPaths.length > 0 && (v = this.barCtx.getPreviousPath(l, h, !1));
    const C = g.line(s, y);
    if (w = w + g.line(i, u) + g.line(i, y) + C + (d.config.plotOptions.bar.borderRadiusApplication === "around" || this.arrBorderRadius[l][h] === "both" ? " Z" : " z"), v = v + g.line(s, u) + C + C + C + C + C + g.line(s, u) + (d.config.plotOptions.bar.borderRadiusApplication === "around" || this.arrBorderRadius[l][h] === "both" ? " Z" : " z"), this.arrBorderRadius[l][h] !== "none" && (w = g.roundPathCorners(
      w,
      d.config.plotOptions.bar.borderRadius
    )), d.config.chart.stacked) {
      let D = this.barCtx;
      D = this.barCtx[n], D.xArrj.push(i + m * b), D.xArrjF.push(Math.abs(s - i - a * b)), D.xArrjVal.push(this.barCtx.series[c][h]);
    }
    return {
      pathTo: w,
      pathFrom: v
    };
  }
  checkZeroSeries({ series: t }) {
    const e = this.w;
    for (let s = 0; s < t.length; s++) {
      let i = 0;
      for (let a = 0; a < t[e.globals.maxValsInArrayIndex].length; a++)
        i += t[s][a];
      i === 0 && this.barCtx.zeroSerieses.push(s);
    }
  }
  getXForValue(t, e, s = !0) {
    let i = s ? e : null;
    return typeof t < "u" && t !== null && (i = e + t / this.barCtx.invertedYRatio - (this.barCtx.isReversed ? t / this.barCtx.invertedYRatio : 0) * 2), i;
  }
  getYForValue(t, e, s, i = !0) {
    let a = i ? e : null;
    return typeof t < "u" && t !== null && (a = e - t / this.barCtx.yRatio[s] + (this.barCtx.isReversed ? t / this.barCtx.yRatio[s] : 0) * 2), a;
  }
  getGoalValues(t, e, s, i, a, o) {
    const r = this.w, n = [], l = (c, h) => {
      n.push({
        [t]: t === "x" ? this.getXForValue(c, e, !1) : this.getYForValue(c, s, o, !1),
        attrs: h
      });
    };
    if (r.seriesData.seriesGoals[i] && r.seriesData.seriesGoals[i][a] && Array.isArray(r.seriesData.seriesGoals[i][a]) && r.seriesData.seriesGoals[i][a].forEach((c) => {
      l(c.value, c);
    }), this.barCtx.barOptions.isDumbbell && r.rangeData.seriesRange.length) {
      const c = this.barCtx.barOptions.dumbbellColors ? this.barCtx.barOptions.dumbbellColors : r.globals.colors, h = {
        strokeHeight: t === "x" ? 0 : r.globals.markers.size[i],
        strokeWidth: t === "x" ? r.globals.markers.size[i] : 0,
        strokeDashArray: 0,
        strokeLineCap: "round",
        strokeColor: Array.isArray(c[i]) ? c[i][0] : c[i]
      };
      l(r.rangeData.seriesRangeStart[i][a], h), l(r.rangeData.seriesRangeEnd[i][a], O(I({}, h), {
        strokeColor: Array.isArray(c[i]) ? c[i][1] : c[i]
      }));
    }
    return n;
  }
  drawGoalLine({
    barXPosition: t,
    barYPosition: e,
    goalX: s,
    goalY: i,
    barWidth: a,
    barHeight: o
  }) {
    const r = new P(this.barCtx.w), n = r.group({
      className: "apexcharts-bar-goals-groups"
    });
    n.node.classList.add("apexcharts-element-hidden"), this.barCtx.w.globals.delayedElements.push({
      el: n.node
    }), n.attr(
      "clip-path",
      `url(#gridRectMarkerMask${this.barCtx.w.globals.cuid})`
    );
    let l = null;
    return this.barCtx.isHorizontal ? Array.isArray(s) && s.forEach((c) => {
      if (c.x >= -1 && c.x <= r.w.layout.gridWidth + 1) {
        const h = typeof c.attrs.strokeHeight < "u" ? c.attrs.strokeHeight : o / 2, d = e + h + o / 2;
        l = r.drawLine(
          c.x,
          d - h * 2,
          c.x,
          d,
          c.attrs.strokeColor ? c.attrs.strokeColor : void 0,
          c.attrs.strokeDashArray,
          c.attrs.strokeWidth ? c.attrs.strokeWidth : 2,
          c.attrs.strokeLineCap
        ), n.add(l);
      }
    }) : Array.isArray(i) && i.forEach((c) => {
      if (c.y >= -1 && c.y <= r.w.layout.gridHeight + 1) {
        const h = typeof c.attrs.strokeWidth < "u" ? c.attrs.strokeWidth : a / 2, d = t + h + a / 2;
        l = r.drawLine(
          d - h * 2,
          c.y,
          d,
          c.y,
          c.attrs.strokeColor ? c.attrs.strokeColor : void 0,
          c.attrs.strokeDashArray,
          c.attrs.strokeHeight ? c.attrs.strokeHeight : 2,
          c.attrs.strokeLineCap
        ), n.add(l);
      }
    }), n;
  }
  drawBarShadow({ prevPaths: t, currPaths: e, color: s, realIndex: i, j: a }) {
    const o = this.w, { x: r, x1: n, barYPosition: l } = t, { x: c, x1: h, barYPosition: d } = e, p = l + e.barHeight, g = new P(this.barCtx.w), f = new L(), x = g.move(n, p) + g.line(r, p) + g.line(c, d) + g.line(h, d) + g.line(n, p) + (o.config.plotOptions.bar.borderRadiusApplication === "around" || this.arrBorderRadius[i][a] === "both" ? " Z" : " z");
    return g.drawPath({
      d: x,
      fill: f.shadeColor(0.5, L.rgb2hex(s)),
      stroke: "none",
      strokeWidth: 0,
      fillOpacity: 1,
      classes: "apexcharts-bar-shadow apexcharts-decoration-element"
    });
  }
  getZeroValueEncounters({ i: t, j: e }) {
    var s;
    const i = this.w;
    let a = 0, o = 0;
    return (i.config.plotOptions.bar.horizontal ? i.seriesData.series.map((n, l) => l) : ((s = i.globals.columnSeries) == null ? void 0 : s.i.map((n) => n)) || []).forEach((n) => {
      const l = i.globals.seriesPercent[n][e];
      l && a++, n < t && l === 0 && o++;
    }), {
      nonZeroColumns: a,
      zeroEncounters: o
    };
  }
  getGroupIndex(t) {
    const e = this.w, s = e.labelData.seriesGroups.findIndex(
      (o) => (
        // w.config.series[i].name may be undefined, so use
        // w.seriesData.seriesNames[i], which has default names for those
        // series. w.labelData.seriesGroups[] uses the same default naming.
        o.indexOf(e.seriesData.seriesNames[t]) > -1
      )
    ), i = this.barCtx.columnGroupIndices;
    let a = i.indexOf(s);
    return a < 0 && (i.push(s), a = i.length - 1), { groupIndex: s, columnGroupIndex: a };
  }
};
class ft {
  constructor(t, e, s) {
    this.ctx = e, this.w = t, this.barOptions = t.config.plotOptions.bar, this.isHorizontal = this.barOptions.horizontal, this.strokeWidth = t.config.stroke.width, this.isNullValue = !1, this.isRangeBar = t.rangeData.seriesRange.length && this.isHorizontal, this.isVerticalGroupedRangeBar = !t.globals.isBarHorizontal && t.rangeData.seriesRange.length && t.config.plotOptions.bar.rangeBarGroupRows, this.isFunnel = this.barOptions.isFunnel, this.xyRatios = s, this.xyRatios !== null && (this.xRatio = s.xRatio, this.yRatio = s.yRatio, this.invertedXRatio = s.invertedXRatio, this.invertedYRatio = s.invertedYRatio, this.baseLineY = s.baseLineY, this.baseLineInvertedY = s.baseLineInvertedY), this.yaxisIndex = 0, this.translationsIndex = 0, this.seriesLen = 0, this.pathArr = [];
    const i = new U(this.w);
    this.lastActiveBarSerieIndex = i.getActiveConfigSeriesIndex("desc", [
      "bar",
      "column"
    ]), this.columnGroupIndices = [];
    const a = i.getBarSeriesIndices(), o = new V(this.w);
    this.stackedSeriesTotals = o.getStackedSeriesTotals(
      this.w.config.series.map((r, n) => a.indexOf(n) === -1 ? n : -1).filter((r) => r !== -1)
    ), this.barHelpers = new $s(this);
  }
  /** primary draw method which is called on bar object
   * @memberof Bar
   * @param {array} series - user supplied series values
   * @param {int} seriesIndex - the index by which series will be drawn on the svg
   * @return {node} element which is supplied to parent chart draw method for appending
   **/
  draw(t, e) {
    var s;
    const i = this.w, a = new P(this.w), o = new V(this.w);
    t = o.getLogSeries(t), this.series = t, this.yRatio = o.getLogYRatios(this.yRatio), this.barHelpers.initVariables(t);
    const r = a.group({
      class: "apexcharts-bar-series apexcharts-plot-series"
    });
    i.config.dataLabels.enabled && this.totalItems > this.barOptions.dataLabels.maxItems && console.warn(
      "WARNING: DataLabels are enabled but there are too many to display. This may cause performance issue when rendering - ApexCharts"
    );
    for (let n = 0, l = 0; n < t.length; n++, l++) {
      let c, h;
      const d = [], p = [], g = i.globals.comboCharts ? e[n] : n, { columnGroupIndex: f } = this.barHelpers.getGroupIndex(g), x = a.group({
        class: "apexcharts-series",
        rel: n + 1,
        seriesName: L.escapeString(i.seriesData.seriesNames[g]),
        "data:realIndex": g
      });
      U.addCollapsedClassToSeries(this.w, x, g), t[n].length > 0 && (this.visibleI = this.visibleI + 1), this.yRatio.length > 1 && (this.yaxisIndex = i.globals.seriesYAxisReverseMap[g], this.translationsIndex = g);
      const m = this.translationsIndex;
      this.isReversed = i.config.yaxis[this.yaxisIndex] && i.config.yaxis[this.yaxisIndex].reversed;
      const u = this.barHelpers.initialPositions(g), {
        y,
        yDivision: b,
        // yDivision is the GRIDHEIGHT divided by number of datapoints (bars)
        zeroW: w,
        // zeroW is the baseline where 0 meets x axis
        x: v,
        xDivision: C,
        // xDivision is the GRIDWIDTH divided by number of datapoints (columns)
        zeroH: D
        // zeroH is the baseline where 0 meets y axis
      } = u;
      let S = u.barHeight, k = u.barWidth;
      h = y, c = v, this.isHorizontal || p.push(c + k / 2);
      const F = a.group({
        class: "apexcharts-datalabels",
        "data:realIndex": g
      });
      i.globals.delayedElements.push({
        el: F.node
      }), F.node.classList.add("apexcharts-element-hidden");
      const T = a.group({
        class: "apexcharts-bar-goals-markers"
      }), M = a.group({
        class: "apexcharts-bar-shadows"
      });
      i.globals.delayedElements.push({
        el: M.node
      }), M.node.classList.add("apexcharts-element-hidden");
      for (let E = 0; E < t[n].length; E++) {
        const X = this.barHelpers.getStrokeWidth(n, E, g);
        let R = null;
        const Y = {
          indexes: {
            i: n,
            j: E,
            realIndex: g,
            translationsIndex: m,
            bc: l
          },
          x: c,
          y: h,
          strokeWidth: X,
          elSeries: x
        };
        this.isHorizontal ? (R = this.drawBarPaths(O(I({}, Y), {
          barHeight: S,
          zeroW: w,
          yDivision: b
        })), k = this.series[n][E] / this.invertedYRatio) : (R = this.drawColumnPaths(O(I({}, Y), {
          xDivision: C,
          barWidth: k,
          zeroH: D
        })), S = this.series[n][E] / this.yRatio[m]);
        const z = this.barHelpers.getPathFillColor(t, n, E, g);
        if (this.isFunnel && this.barOptions.isFunnel3d && this.pathArr.length && E > 0) {
          const _ = this.barHelpers.drawBarShadow({
            color: typeof z.color == "string" && ((s = z.color) == null ? void 0 : s.indexOf("url")) === -1 ? z.color : L.hexToRgba(i.globals.colors[n]),
            prevPaths: this.pathArr[this.pathArr.length - 1],
            currPaths: R,
            realIndex: g,
            j: E
          });
          M.add(_), i.config.chart.dropShadow.enabled && new Z(this.w).dropShadow(_, i.config.chart.dropShadow, g);
        }
        this.pathArr.push(R);
        const H = this.barHelpers.drawGoalLine({
          barXPosition: R.barXPosition,
          barYPosition: R.barYPosition,
          goalX: R.goalX,
          goalY: R.goalY,
          barHeight: S,
          barWidth: k
        });
        H && T.add(H), h = R.y, c = R.x, E > 0 && p.push(c + k / 2), d.push(h), this.renderSeries(O(I({
          realIndex: g,
          pathFill: z.color
        }, z.useRangeColor ? { lineFill: z.color } : {}), {
          j: E,
          i: n,
          columnGroupIndex: f,
          pathFrom: R.pathFrom,
          pathTo: R.pathTo,
          strokeWidth: X,
          elSeries: x,
          x: c,
          y: h,
          series: t,
          barHeight: Math.abs(R.barHeight ? R.barHeight : S),
          barWidth: Math.abs(R.barWidth ? R.barWidth : k),
          elDataLabelsWrap: F,
          elGoalsMarkers: T,
          elBarShadows: M,
          visibleSeries: this.visibleI,
          type: "bar"
        }));
      }
      i.globals.seriesXvalues[g] = p, i.globals.seriesYvalues[g] = d, r.add(x);
    }
    return r;
  }
  renderSeries({
    realIndex: t,
    pathFill: e,
    lineFill: s,
    j: i,
    i: a,
    columnGroupIndex: o,
    pathFrom: r,
    pathTo: n,
    strokeWidth: l,
    elSeries: c,
    x: h,
    // x pos
    y: d,
    // y pos
    y1: p,
    // absolute value
    y2: g,
    // absolute value
    series: f,
    barHeight: x,
    barWidth: m,
    barXPosition: u,
    barYPosition: y,
    elDataLabelsWrap: b,
    elGoalsMarkers: w,
    elBarShadows: v,
    visibleSeries: C,
    type: D,
    classes: S
  }) {
    const k = this.w, F = new P(this.w, this.ctx);
    let T = !1;
    if (c._bindingsDelegated || (c._bindingsDelegated = !0, F.setupEventDelegation(
      c,
      `.apexcharts-${D}-area`
    )), !s) {
      let R = function(z) {
        const H = k.config.stroke.colors;
        let _;
        return Array.isArray(H) && H.length > 0 && (_ = H[z], _ || (_ = ""), typeof _ == "function") ? _({
          value: k.seriesData.series[z][i],
          dataPointIndex: i,
          w: k
        }) : _;
      };
      const Y = typeof k.globals.stroke.colors[t] == "function" ? R(t) : k.globals.stroke.colors[t];
      s = this.barOptions.distributed ? k.globals.stroke.colors[i] : Y;
    }
    const E = new Gs(this).handleBarDataLabels({
      x: h,
      y: d,
      y1: p,
      y2: g,
      i: a,
      j: i,
      series: f,
      realIndex: t,
      columnGroupIndex: o,
      barHeight: x,
      barWidth: m,
      barXPosition: u,
      barYPosition: y,
      visibleSeries: C
    });
    k.globals.isBarHorizontal || (E.dataLabelsPos.dataLabelsX + Math.max(m, k.globals.barPadForNumericAxis) < 0 || E.dataLabelsPos.dataLabelsX - Math.max(m, k.globals.barPadForNumericAxis) > k.layout.gridWidth) && (T = !0), k.config.series[a].data[i] && k.config.series[a].data[i].strokeColor && (s = k.config.series[a].data[i].strokeColor), this.isNullValue && (e = "none");
    const X = i / k.config.chart.animations.animateGradually.delay * (k.config.chart.animations.speed / k.globals.dataPoints) / 2.4;
    if (!T) {
      const R = F.renderPaths({
        i: a,
        j: i,
        realIndex: t,
        pathFrom: r,
        pathTo: n,
        stroke: s,
        strokeWidth: l,
        strokeLineCap: k.config.stroke.lineCap,
        fill: e,
        animationDelay: X,
        initialSpeed: k.config.chart.animations.speed,
        dataChangeSpeed: k.config.chart.animations.dynamicAnimation.speed,
        className: `apexcharts-${D}-area ${S}`,
        chartType: D,
        bindEventsOnPaths: !1
      });
      R.attr("clip-path", `url(#gridRectBarMask${k.globals.cuid})`);
      const Y = k.config.forecastDataPoints;
      Y.count > 0 && i >= k.globals.dataPoints - Y.count && (R.node.setAttribute("stroke-dasharray", Y.dashArray), R.node.setAttribute("stroke-width", Y.strokeWidth), R.node.setAttribute("fill-opacity", Y.fillOpacity)), typeof p < "u" && typeof g < "u" && (R.attr("data-range-y1", p), R.attr("data-range-y2", g)), new Z(this.w).setSelectionFilter(R, t, i), c.add(R), R.attr({
        cy: E.dataLabelsPos.bcy,
        cx: E.dataLabelsPos.bcx,
        j: i,
        val: k.seriesData.series[a][i],
        barHeight: x,
        barWidth: m
      }), E.dataLabels !== null && b.add(E.dataLabels), E.totalDataLabels && b.add(E.totalDataLabels), c.add(b), w && c.add(w), v && c.add(v);
    }
    return c;
  }
  drawBarPaths({
    indexes: t,
    barHeight: e,
    strokeWidth: s,
    zeroW: i,
    x: a,
    y: o,
    yDivision: r,
    elSeries: n
  }) {
    const l = this.w, c = t.i, h = t.j;
    let d;
    if (l.axisFlags.isXNumeric)
      o = (l.seriesData.seriesX[c][h] - l.globals.minX) / this.invertedXRatio - e, d = o + e * this.visibleI;
    else if (l.config.plotOptions.bar.hideZeroBarsWhenGrouped) {
      const { nonZeroColumns: g, zeroEncounters: f } = this.barHelpers.getZeroValueEncounters({ i: c, j: h });
      g > 0 && (e = this.seriesLen * e / g), d = o + e * this.visibleI, d -= e * f;
    } else
      d = o + e * this.visibleI;
    this.isFunnel && (i = i - (this.barHelpers.getXForValue(this.series[c][h], i) - i) / 2), a = this.barHelpers.getXForValue(this.series[c][h], i);
    const p = this.barHelpers.getBarpaths({
      barYPosition: d,
      barHeight: e,
      x1: i,
      x2: a,
      strokeWidth: s,
      isReversed: this.isReversed,
      series: this.series,
      realIndex: t.realIndex,
      i: c,
      j: h,
      w: l
    });
    return l.axisFlags.isXNumeric || (o = o + r), this.barHelpers.barBackground({
      j: h,
      i: c,
      y1: d - e * this.visibleI,
      y2: e * this.seriesLen,
      elSeries: n
    }), {
      pathTo: p.pathTo,
      pathFrom: p.pathFrom,
      x1: i,
      x: a,
      y: o,
      goalX: this.barHelpers.getGoalValues("x", i, null, c, h),
      barYPosition: d,
      barHeight: e
    };
  }
  drawColumnPaths({
    indexes: t,
    x: e,
    y: s,
    xDivision: i,
    barWidth: a,
    zeroH: o,
    strokeWidth: r,
    elSeries: n
  }) {
    const l = this.w, c = t.realIndex, h = t.translationsIndex, d = t.i, p = t.j, g = t.bc;
    let f;
    if (l.axisFlags.isXNumeric) {
      const m = this.getBarXForNumericXAxis({
        x: e,
        j: p,
        realIndex: c,
        barWidth: a
      });
      e = m.x, f = m.barXPosition;
    } else if (l.config.plotOptions.bar.hideZeroBarsWhenGrouped) {
      const { nonZeroColumns: m, zeroEncounters: u } = this.barHelpers.getZeroValueEncounters({ i: d, j: p });
      m > 0 && (a = this.seriesLen * a / m), f = e + a * this.visibleI, f -= a * u;
    } else
      f = e + a * this.visibleI;
    s = this.barHelpers.getYForValue(
      this.series[d][p],
      o,
      h
    );
    const x = this.barHelpers.getColumnPaths({
      barXPosition: f,
      barWidth: a,
      y1: o,
      y2: s,
      strokeWidth: r,
      isReversed: this.isReversed,
      series: this.series,
      realIndex: c,
      i: d,
      j: p,
      w: l
    });
    return l.axisFlags.isXNumeric || (e = e + i), this.barHelpers.barBackground({
      bc: g,
      j: p,
      i: d,
      x1: f - r / 2 - a * this.visibleI,
      x2: a * this.seriesLen + r / 2,
      elSeries: n
    }), {
      pathTo: x.pathTo,
      pathFrom: x.pathFrom,
      x: e,
      y: s,
      goalY: this.barHelpers.getGoalValues(
        "y",
        null,
        o,
        d,
        p,
        h
      ),
      barXPosition: f,
      barWidth: a
    };
  }
  getBarXForNumericXAxis({ x: t, barWidth: e, realIndex: s, j: i }) {
    const a = this.w;
    let o = s;
    return a.seriesData.seriesX[s].length || (o = a.globals.maxValsInArrayIndex), L.isNumber(a.seriesData.seriesX[o][i]) && (t = (a.seriesData.seriesX[o][i] - a.globals.minX) / this.xRatio - e * this.seriesLen / 2), {
      barXPosition: t + e * this.visibleI,
      x: t
    };
  }
  /** getPreviousPath is a common function for bars/columns which is used to get previous paths when data changes.
   * @memberof Bar
   * @param {int} realIndex - current iterating i
   * @param {int} j - current iterating series's j index
   * @return {string} pathFrom is the string which will be appended in animations
   **/
  getPreviousPath(t, e) {
    const s = this.w;
    let i = "M 0 0";
    for (let a = 0; a < s.globals.previousPaths.length; a++) {
      const o = s.globals.previousPaths[a];
      o.paths && o.paths.length > 0 && parseInt(o.realIndex, 10) === parseInt(t, 10) && typeof s.globals.previousPaths[a].paths[e] < "u" && (i = s.globals.previousPaths[a].paths[e].d);
    }
    return i;
  }
}
class Vs extends ft {
  draw(t, e) {
    const s = this.w;
    this.graphics = new P(this.w), this.bar = new ft(this.w, this.ctx, this.xyRatios);
    const i = new V(this.w);
    t = i.getLogSeries(t), this.yRatio = i.getLogYRatios(this.yRatio), this.barHelpers.initVariables(t), s.config.chart.stackType === "100%" && (t = s.globals.comboCharts ? e.map((n) => s.globals.seriesPercent[n]) : s.globals.seriesPercent.slice()), this.series = t, this.barHelpers.initializeStackedPrevVars(this);
    const a = this.graphics.group({
      class: "apexcharts-bar-series apexcharts-plot-series"
    });
    let o = 0, r = 0;
    for (let n = 0, l = 0; n < t.length; n++, l++) {
      const c = s.globals.comboCharts ? e[n] : n, { groupIndex: h, columnGroupIndex: d } = this.barHelpers.getGroupIndex(c);
      this.groupCtx = this[s.labelData.seriesGroups[h]];
      const p = [], g = [];
      let f = 0;
      this.yRatio.length > 1 && (this.yaxisIndex = s.globals.seriesYAxisReverseMap[c][0], f = c), this.isReversed = s.config.yaxis[this.yaxisIndex] && s.config.yaxis[this.yaxisIndex].reversed;
      let x = this.graphics.group({
        class: "apexcharts-series",
        seriesName: L.escapeString(s.seriesData.seriesNames[c]),
        rel: n + 1,
        "data:realIndex": c
      });
      U.addCollapsedClassToSeries(this.w, x, c);
      const m = this.graphics.group({
        class: "apexcharts-datalabels",
        "data:realIndex": c
      }), u = this.graphics.group({
        class: "apexcharts-bar-goals-markers"
      }), y = this.initialPositions(o, r, void 0, void 0, void 0, void 0, f), {
        xDivision: b,
        // xDivision is the GRIDWIDTH divided by number of datapoints (columns)
        yDivision: w,
        // yDivision is the GRIDHEIGHT divided by number of datapoints (bars)
        zeroH: v,
        // zeroH is the baseline where 0 meets y axis
        zeroW: C
        // zeroW is the baseline where 0 meets x axis
      } = y;
      let D = y.barHeight, S = y.barWidth;
      r = y.y, o = y.x, s.globals.barHeight = D, s.globals.barWidth = S, this.barHelpers.initializeStackedXYVars(this), this.groupCtx.prevY.length === 1 && this.groupCtx.prevY[0].every((k) => isNaN(k)) && (this.groupCtx.prevY[0] = this.groupCtx.prevY[0].map(() => v), this.groupCtx.prevYF[0] = this.groupCtx.prevYF[0].map(() => 0));
      for (let k = 0; k < s.globals.dataPoints; k++) {
        const F = this.barHelpers.getStrokeWidth(n, k, c), T = {
          indexes: { i: n, j: k, realIndex: c, translationsIndex: f, bc: l },
          strokeWidth: F,
          x: o,
          y: r,
          elSeries: x,
          columnGroupIndex: d,
          seriesGroup: s.labelData.seriesGroups[h]
        };
        let M = null;
        this.isHorizontal ? (M = this.drawStackedBarPaths(O(I({}, T), {
          zeroW: C,
          barHeight: D,
          yDivision: w
        })), S = this.series[n][k] / this.invertedYRatio) : (M = this.drawStackedColumnPaths(O(I({}, T), {
          xDivision: b,
          barWidth: S,
          zeroH: v
        })), D = this.series[n][k] / this.yRatio[f]);
        const E = this.barHelpers.drawGoalLine({
          barXPosition: M.barXPosition,
          barYPosition: M.barYPosition,
          goalX: M.goalX,
          goalY: M.goalY,
          barHeight: D,
          barWidth: S
        });
        E && u.add(E), r = M.y, o = M.x, p.push(o), g.push(r);
        const X = this.barHelpers.getPathFillColor(t, n, k, c);
        let R = "";
        const Y = s.globals.isBarHorizontal ? "apexcharts-flip-x" : "apexcharts-flip-y";
        (this.barHelpers.arrBorderRadius[c][k] === "bottom" && s.seriesData.series[c][k] > 0 || this.barHelpers.arrBorderRadius[c][k] === "top" && s.seriesData.series[c][k] < 0) && (R = Y), x = this.renderSeries(O(I({
          realIndex: c,
          pathFill: X.color
        }, X.useRangeColor ? { lineFill: X.color } : {}), {
          j: k,
          i: n,
          columnGroupIndex: d,
          pathFrom: M.pathFrom,
          pathTo: M.pathTo,
          strokeWidth: F,
          elSeries: x,
          x: o,
          y: r,
          series: t,
          barHeight: D,
          barWidth: S,
          elDataLabelsWrap: m,
          elGoalsMarkers: u,
          type: "bar",
          visibleSeries: d,
          classes: R
        }));
      }
      s.globals.seriesXvalues[c] = p, s.globals.seriesYvalues[c] = g, this.groupCtx.prevY.push(this.groupCtx.yArrj), this.groupCtx.prevYF.push(this.groupCtx.yArrjF), this.groupCtx.prevYVal.push(this.groupCtx.yArrjVal), this.groupCtx.prevX.push(this.groupCtx.xArrj), this.groupCtx.prevXF.push(this.groupCtx.xArrjF), this.groupCtx.prevXVal.push(this.groupCtx.xArrjVal), a.add(x);
    }
    return a;
  }
  initialPositions(t, e, s, i, a, o, r) {
    const n = this.w;
    let l, c;
    if (this.isHorizontal) {
      i = n.layout.gridHeight / n.globals.dataPoints;
      const d = n.config.plotOptions.bar.barHeight;
      String(d).indexOf("%") === -1 ? l = parseInt(d, 10) : l = i * parseInt(d, 10) / 100, o = n.globals.padHorizontal + (this.isReversed ? n.layout.gridWidth - this.baseLineInvertedY : this.baseLineInvertedY), e = (i - l) / 2;
    } else {
      s = n.layout.gridWidth / n.globals.dataPoints, c = s;
      const d = n.config.plotOptions.bar.columnWidth;
      n.axisFlags.isXNumeric && n.globals.dataPoints > 1 ? (s = n.globals.minXDiff / this.xRatio, c = s * parseInt(this.barOptions.columnWidth, 10) / 100) : String(d).indexOf("%") === -1 ? c = parseInt(d, 10) : c *= parseInt(d, 10) / 100, this.isReversed ? a = this.baseLineY[r] : a = n.layout.gridHeight - this.baseLineY[r], t = n.globals.padHorizontal + (s - c) / 2;
    }
    const h = n.globals.barGroups.length || 1;
    return {
      x: t,
      y: e,
      yDivision: i,
      xDivision: s,
      barHeight: l / h,
      barWidth: c / h,
      zeroH: a,
      zeroW: o
    };
  }
  drawStackedBarPaths({
    indexes: t,
    barHeight: e,
    strokeWidth: s,
    zeroW: i,
    x: a,
    y: o,
    columnGroupIndex: r,
    seriesGroup: n,
    yDivision: l,
    elSeries: c
  }) {
    const h = this.w, d = o + r * e;
    let p;
    const g = t.i, f = t.j, x = t.realIndex, m = t.translationsIndex;
    let u = 0;
    for (let w = 0; w < this.groupCtx.prevXF.length; w++)
      u = u + this.groupCtx.prevXF[w][f];
    let y = g;
    if (h.config.series[x].name && (y = n.indexOf(h.config.series[x].name)), y > 0) {
      let w = i;
      this.groupCtx.prevXVal[y - 1][f] < 0 ? w = this.series[g][f] >= 0 ? this.groupCtx.prevX[y - 1][f] + u - (this.isReversed ? u : 0) * 2 : this.groupCtx.prevX[y - 1][f] : this.groupCtx.prevXVal[y - 1][f] >= 0 && (w = this.series[g][f] >= 0 ? this.groupCtx.prevX[y - 1][f] : this.groupCtx.prevX[y - 1][f] - u + (this.isReversed ? u : 0) * 2), p = w;
    } else
      p = i;
    this.series[g][f] === null ? a = p : a = p + this.series[g][f] / this.invertedYRatio - (this.isReversed ? this.series[g][f] / this.invertedYRatio : 0) * 2;
    const b = this.barHelpers.getBarpaths({
      barYPosition: d,
      barHeight: e,
      x1: p,
      x2: a,
      strokeWidth: s,
      isReversed: this.isReversed,
      series: this.series,
      realIndex: t.realIndex,
      seriesGroup: n,
      i: g,
      j: f,
      w: h
    });
    return this.barHelpers.barBackground({
      j: f,
      i: g,
      y1: d,
      y2: e,
      elSeries: c
    }), o = o + l, {
      pathTo: b.pathTo,
      pathFrom: b.pathFrom,
      goalX: this.barHelpers.getGoalValues(
        "x",
        i,
        null,
        g,
        f,
        m
      ),
      barXPosition: p,
      barYPosition: d,
      x: a,
      y: o
    };
  }
  drawStackedColumnPaths({
    indexes: t,
    x: e,
    y: s,
    xDivision: i,
    barWidth: a,
    zeroH: o,
    columnGroupIndex: r,
    seriesGroup: n,
    elSeries: l
  }) {
    var c, h, d, p;
    const g = this.w, f = t.i, x = t.j, m = t.bc, u = t.realIndex, y = t.translationsIndex;
    if (g.axisFlags.isXNumeric) {
      let S = g.seriesData.seriesX[u][x];
      S || (S = 0), e = (S - g.globals.minX) / this.xRatio - a / 2 * g.globals.barGroups.length;
    }
    const b = e + r * a;
    let w, v = 0;
    for (let S = 0; S < this.groupCtx.prevYF.length; S++)
      v = v + (isNaN(this.groupCtx.prevYF[S][x]) ? 0 : this.groupCtx.prevYF[S][x]);
    let C = f;
    if (n && (C = n.indexOf(g.seriesData.seriesNames[u])), C > 0 && !g.axisFlags.isXNumeric || C > 0 && g.axisFlags.isXNumeric && g.seriesData.seriesX[u - 1][x] === g.seriesData.seriesX[u][x]) {
      let S, k;
      const F = Math.min(this.yRatio.length + 1, u + 1);
      if (this.groupCtx.prevY[C - 1] !== void 0 && this.groupCtx.prevY[C - 1].length) {
        for (let T = 1; T < F; T++)
          if (!isNaN((c = this.groupCtx.prevY[C - T]) == null ? void 0 : c[x])) {
            k = this.groupCtx.prevY[C - T][x];
            break;
          }
      }
      for (let T = 1; T < F; T++)
        if (((h = this.groupCtx.prevYVal[C - T]) == null ? void 0 : h[x]) < 0) {
          S = this.series[f][x] >= 0 ? k - v + (this.isReversed ? v : 0) * 2 : k;
          break;
        } else if (((d = this.groupCtx.prevYVal[C - T]) == null ? void 0 : d[x]) >= 0) {
          S = this.series[f][x] >= 0 ? k : k + v - (this.isReversed ? v : 0) * 2;
          break;
        }
      typeof S > "u" && (S = g.layout.gridHeight), (p = this.groupCtx.prevYF[0]) != null && p.every((T) => T === 0) && this.groupCtx.prevYF.slice(1, C).every((T) => T.every((M) => isNaN(M))) ? w = o : w = S;
    } else
      w = o;
    this.series[f][x] ? s = w - this.series[f][x] / this.yRatio[y] + (this.isReversed ? this.series[f][x] / this.yRatio[y] : 0) * 2 : s = w;
    const D = this.barHelpers.getColumnPaths({
      barXPosition: b,
      barWidth: a,
      y1: w,
      y2: s,
      yRatio: this.yRatio[y],
      strokeWidth: this.strokeWidth,
      isReversed: this.isReversed,
      series: this.series,
      seriesGroup: n,
      realIndex: t.realIndex,
      i: f,
      j: x,
      w: g
    });
    return this.barHelpers.barBackground({
      bc: m,
      j: x,
      i: f,
      x1: b,
      x2: a,
      elSeries: l
    }), {
      pathTo: D.pathTo,
      pathFrom: D.pathFrom,
      goalY: this.barHelpers.getGoalValues("y", null, o, f, x),
      barXPosition: b,
      x: g.axisFlags.isXNumeric ? e : e + i,
      y: s
    };
  }
}
class se extends ft {
  draw(t, e, s) {
    const i = this.w, a = new P(this.w), o = i.globals.comboCharts ? e : i.config.chart.type, r = new st(this.w);
    this.candlestickOptions = this.w.config.plotOptions.candlestick, this.boxOptions = this.w.config.plotOptions.boxPlot, this.isHorizontal = i.config.plotOptions.bar.horizontal, this.isOHLC = this.candlestickOptions && this.candlestickOptions.type === "ohlc", this.coreUtils = new V(this.w), t = this.coreUtils.getLogSeries(t), this.series = t, this.yRatio = this.coreUtils.getLogYRatios(this.yRatio), this.barHelpers.initVariables(t);
    const n = a.group({
      class: `apexcharts-${o}-series apexcharts-plot-series`
    });
    for (let l = 0; l < t.length; l++) {
      this.isBoxPlot = i.config.chart.type === "boxPlot" || i.config.series[l].type === "boxPlot";
      let c, h;
      const d = [], p = [], g = i.globals.comboCharts ? s[l] : l, { columnGroupIndex: f } = this.barHelpers.getGroupIndex(g), x = a.group({
        class: "apexcharts-series",
        seriesName: L.escapeString(i.seriesData.seriesNames[g]),
        rel: l + 1,
        "data:realIndex": g
      });
      U.addCollapsedClassToSeries(this.w, x, g), t[l].length > 0 && (this.visibleI = this.visibleI + 1);
      let m = 0;
      this.yRatio.length > 1 && (this.yaxisIndex = i.globals.seriesYAxisReverseMap[g][0], m = g);
      const u = this.barHelpers.initialPositions(g), {
        y,
        barHeight: b,
        yDivision: w,
        // yDivision is the GRIDHEIGHT divided by number of datapoints (bars)
        zeroW: v,
        // zeroW is the baseline where 0 meets x axis
        x: C,
        barWidth: D,
        xDivision: S,
        // xDivision is the GRIDWIDTH divided by number of datapoints (columns)
        zeroH: k
        // zeroH is the baseline where 0 meets y axis
      } = u;
      h = y, c = C, p.push(c + D / 2);
      const F = a.group({
        class: "apexcharts-datalabels",
        "data:realIndex": g
      }), T = a.group({
        class: "apexcharts-bar-goals-markers"
      });
      for (let M = 0; M < i.globals.dataPoints; M++) {
        const E = this.barHelpers.getStrokeWidth(l, M, g);
        let X = null;
        const R = {
          indexes: {
            i: l,
            j: M,
            realIndex: g,
            translationsIndex: m
          },
          x: c,
          y: h,
          strokeWidth: E,
          elSeries: x
        };
        this.isHorizontal ? X = this.drawHorizontalBoxPaths(O(I({}, R), {
          yDivision: w,
          barHeight: b,
          zeroW: v
        })) : X = this.drawVerticalBoxPaths(O(I({}, R), {
          xDivision: S,
          barWidth: D,
          zeroH: k
        })), h = X.y, c = X.x;
        const Y = this.barHelpers.drawGoalLine({
          barXPosition: X.barXPosition,
          barYPosition: X.barYPosition,
          goalX: X.goalX,
          goalY: X.goalY,
          barHeight: b,
          barWidth: D
        });
        Y && T.add(Y), M > 0 && p.push(c + D / 2), d.push(h), X.pathTo.forEach((z, H) => {
          const _ = !this.isBoxPlot && this.candlestickOptions.wick.useFillColor ? X.color[H] : i.globals.stroke.colors[l], $ = r.fillPath({
            seriesNumber: g,
            dataPointIndex: M,
            color: X.color[H],
            value: t[l][M]
          });
          this.renderSeries({
            realIndex: g,
            pathFill: $,
            lineFill: _,
            j: M,
            i: l,
            pathFrom: X.pathFrom,
            pathTo: z,
            strokeWidth: E,
            elSeries: x,
            x: c,
            y: h,
            series: t,
            columnGroupIndex: f,
            barHeight: b,
            barWidth: D,
            elDataLabelsWrap: F,
            elGoalsMarkers: T,
            visibleSeries: this.visibleI,
            type: i.config.chart.type
          });
        });
      }
      i.globals.seriesXvalues[g] = p, i.globals.seriesYvalues[g] = d, n.add(x);
    }
    return n;
  }
  drawVerticalBoxPaths({
    indexes: t,
    x: e,
    xDivision: s,
    barWidth: i,
    zeroH: a,
    strokeWidth: o
  }) {
    const r = this.w, n = new P(this.w), l = t.i, c = t.j, { colors: h } = r.config.plotOptions.candlestick, { colors: d } = this.boxOptions, p = t.realIndex, g = (T) => Array.isArray(T) ? T[p] : T, f = g(h.upward), x = g(h.downward), m = this.yRatio[t.translationsIndex], u = this.getOHLCValue(p, c);
    let y = a, b = a, w = u.o < u.c ? [f] : [x];
    this.isBoxPlot && (w = [g(d.lower), g(d.upper)]);
    let v = Math.min(u.o, u.c), C = Math.max(u.o, u.c), D = u.m;
    r.axisFlags.isXNumeric && (e = (r.seriesData.seriesX[p][c] - r.globals.minX) / this.xRatio - i / 2);
    const S = e + i * this.visibleI;
    typeof this.series[l][c] > "u" || this.series[l][c] === null ? (v = a, C = a) : (v = a - v / m, C = a - C / m, y = a - u.h / m, b = a - u.l / m, D = a - u.m / m);
    let k, F = n.move(S + i / 2, v);
    if (r.globals.previousPaths.length > 0 && (F = this.getPreviousPath(p, c, !0)), this.isOHLC) {
      const T = S + i / 2, M = a - u.o / m, E = a - u.c / m;
      k = [
        n.move(T, y) + n.line(T, b) + n.move(T, M) + n.line(S, M) + n.move(T, E) + n.line(S + i, E)
      ];
    } else
      this.isBoxPlot ? k = [
        n.move(S, v) + n.line(S + i / 2, v) + n.line(S + i / 2, y) + n.line(S + i / 4, y) + n.line(S + i - i / 4, y) + n.line(S + i / 2, y) + n.line(S + i / 2, v) + n.line(S + i, v) + n.line(S + i, D) + n.line(S, D) + n.line(S, v + o / 2),
        n.move(S, D) + n.line(S + i, D) + n.line(S + i, C) + n.line(S + i / 2, C) + n.line(S + i / 2, b) + n.line(S + i - i / 4, b) + n.line(S + i / 4, b) + n.line(S + i / 2, b) + n.line(S + i / 2, C) + n.line(S, C) + n.line(S, D) + "z"
      ] : k = [
        n.move(S, C) + n.line(S + i / 2, C) + n.line(S + i / 2, y) + n.line(S + i / 2, C) + n.line(S + i, C) + n.line(S + i, v) + n.line(S + i / 2, v) + n.line(S + i / 2, b) + n.line(S + i / 2, v) + n.line(S, v) + n.line(S, C - o / 2)
      ];
    return F = F + n.move(S, v), r.axisFlags.isXNumeric || (e = e + s), {
      pathTo: k,
      pathFrom: F,
      x: e,
      y: C,
      goalY: this.barHelpers.getGoalValues(
        "y",
        null,
        a,
        l,
        c,
        t.translationsIndex
      ),
      barXPosition: S,
      color: w
    };
  }
  drawHorizontalBoxPaths({
    indexes: t,
    y: e,
    yDivision: s,
    barHeight: i,
    zeroW: a,
    strokeWidth: o
  }) {
    const r = this.w, n = new P(this.w), l = t.i, c = t.j, h = t.realIndex, { colors: d } = r.config.plotOptions.candlestick, { colors: p } = this.boxOptions, g = (k) => Array.isArray(k) ? k[h] : k, f = this.invertedYRatio, x = this.getOHLCValue(h, c);
    let m = x.o < x.c ? [g(d.upward)] : [g(d.downward)];
    this.isBoxPlot && (m = [g(p.lower), g(p.upper)]);
    let u = a, y = a, b = Math.min(x.o, x.c), w = Math.max(x.o, x.c), v = x.m;
    r.axisFlags.isXNumeric && (e = (r.seriesData.seriesX[h][c] - r.globals.minX) / this.invertedXRatio - i / 2);
    const C = e + i * this.visibleI;
    typeof this.series[l][c] > "u" || this.series[l][c] === null ? (b = a, w = a) : (b = a + b / f, w = a + w / f, u = a + x.h / f, y = a + x.l / f, v = a + x.m / f);
    let D = n.move(b, C + i / 2);
    r.globals.previousPaths.length > 0 && (D = this.getPreviousPath(h, c, !0));
    const S = [
      n.move(b, C) + n.line(b, C + i / 2) + n.line(u, C + i / 2) + n.line(u, C + i / 2 - i / 4) + n.line(u, C + i / 2 + i / 4) + n.line(u, C + i / 2) + n.line(b, C + i / 2) + n.line(b, C + i) + n.line(v, C + i) + n.line(v, C) + n.line(b + o / 2, C),
      n.move(v, C) + n.line(v, C + i) + n.line(w, C + i) + n.line(w, C + i / 2) + n.line(y, C + i / 2) + n.line(y, C + i - i / 4) + n.line(y, C + i / 4) + n.line(y, C + i / 2) + n.line(w, C + i / 2) + n.line(w, C) + n.line(v, C) + "z"
    ];
    return D = D + n.move(b, C), r.axisFlags.isXNumeric || (e = e + s), {
      pathTo: S,
      pathFrom: D,
      x: w,
      y: e,
      goalX: this.barHelpers.getGoalValues("x", a, null, l, c),
      barYPosition: C,
      color: m
    };
  }
  getOHLCValue(t, e) {
    const s = this.w, i = this.coreUtils, a = (h) => h[t] && h[t][e] != null ? i.getLogValAtSeriesIndex(h[t][e], t) : 0, o = a(s.candleData.seriesCandleH), r = a(s.candleData.seriesCandleO), n = a(s.candleData.seriesCandleM), l = a(s.candleData.seriesCandleC), c = a(s.candleData.seriesCandleL);
    return {
      o: this.isBoxPlot ? o : r,
      h: this.isBoxPlot ? r : o,
      m: n,
      l: this.isBoxPlot ? l : c,
      c: this.isBoxPlot ? c : l
    };
  }
}
class Se {
  constructor(t, e) {
    this.ctx = e, this.w = t;
  }
  checkColorRange() {
    const t = this.w;
    let e = !1;
    const s = t.config.plotOptions[t.config.chart.type];
    return s.colorScale.ranges.length > 0 && s.colorScale.ranges.map((i) => {
      i.from <= 0 && (e = !0);
    }), e;
  }
  getShadeColor(t, e, s, i) {
    const a = this.w;
    let o = 1;
    const r = a.config.plotOptions[t].shadeIntensity, n = this.determineColor(t, e, s);
    a.globals.hasNegs || i ? a.config.plotOptions[t].reverseNegativeShade ? n.percent < 0 ? o = n.percent / 100 * (r * 1.25) : o = (1 - n.percent / 100) * (r * 1.25) : n.percent <= 0 ? o = 1 - (1 + n.percent / 100) * r : o = (1 - n.percent / 100) * r : (o = 1 - n.percent / 100, t === "treemap" && (o = (1 - n.percent / 100) * (r * 1.25)));
    let l = n.color;
    const c = new L();
    if (a.config.plotOptions[t].enableShades)
      if (this.w.config.theme.mode === "dark") {
        const h = c.shadeColor(
          o * -1,
          n.color
        );
        l = L.hexToRgba(
          L.isColorHex(h) ? h : L.rgb2hex(h),
          a.config.fill.opacity
        );
      } else {
        const h = c.shadeColor(o, n.color);
        l = L.hexToRgba(
          L.isColorHex(h) ? h : L.rgb2hex(h),
          a.config.fill.opacity
        );
      }
    return { color: l, colorProps: n };
  }
  determineColor(t, e, s) {
    const i = this.w, a = i.seriesData.series[e][s], o = i.config.plotOptions[t];
    let r = o.colorScale.inverse ? s : e;
    o.distributed && i.config.chart.type === "treemap" && (r = s);
    let n = i.globals.colors[r], l = null, c = Math.min(...i.seriesData.series[e]), h = Math.max(...i.seriesData.series[e]);
    !o.distributed && t === "heatmap" && (c = i.globals.minY, h = i.globals.maxY), typeof o.colorScale.min < "u" && (c = o.colorScale.min < i.globals.minY ? o.colorScale.min : i.globals.minY, h = o.colorScale.max > i.globals.maxY ? o.colorScale.max : i.globals.maxY);
    const d = Math.abs(h) + Math.abs(c);
    let p = 100 * a / (d === 0 ? d - 1e-6 : d);
    return o.colorScale.ranges.length > 0 && o.colorScale.ranges.map((f) => {
      if (a >= f.from && a <= f.to) {
        n = f.color, l = f.foreColor ? f.foreColor : null, c = f.from, h = f.to;
        const x = Math.abs(h) + Math.abs(c);
        p = 100 * a / (x === 0 ? x - 1e-6 : x);
      }
    }), {
      color: n,
      foreColor: l,
      percent: p
    };
  }
  calculateDataLabels({ text: t, x: e, y: s, i, j: a, colorProps: o, fontSize: r }) {
    const l = this.w.config.dataLabels, c = new P(this.w), h = new gt(this.w, this.ctx);
    let d = null;
    if (l.enabled) {
      d = c.group({
        class: "apexcharts-data-labels"
      });
      const p = l.offsetX, g = l.offsetY, f = e + p, x = s + parseFloat(l.style.fontSize) / 3 + g;
      h.plotDataLabelsText({
        x: f,
        y: x,
        text: t,
        i,
        j: a,
        color: o.foreColor,
        parent: d,
        fontSize: r,
        dataLabelsConfig: l
      });
    }
    return d;
  }
}
class Us {
  constructor(t, e, s) {
    this.ctx = e, this.w = t, this.xRatio = s.xRatio, this.yRatio = s.yRatio, this.dynamicAnim = this.w.config.chart.animations.dynamicAnimation, this.helpers = new Se(t, e), this.rectRadius = this.w.config.plotOptions.heatmap.radius, this.strokeWidth = this.w.config.stroke.show ? this.w.config.stroke.width : 0;
  }
  draw(t) {
    const e = this.w, s = new P(this.w, this.ctx), i = s.group({
      class: "apexcharts-heatmap"
    });
    i.attr("clip-path", `url(#gridRectMask${e.globals.cuid})`);
    const a = e.layout.gridWidth / e.globals.dataPoints, o = e.layout.gridHeight / e.seriesData.series.length;
    let r = 0, n = !1;
    this.negRange = this.helpers.checkColorRange();
    const l = t.slice();
    e.config.yaxis[0].reversed && (n = !0, l.reverse());
    for (let h = n ? 0 : l.length - 1; n ? h < l.length : h >= 0; n ? h++ : h--) {
      const d = s.group({
        class: "apexcharts-series apexcharts-heatmap-series",
        seriesName: L.escapeString(e.seriesData.seriesNames[h]),
        rel: h + 1,
        "data:realIndex": h
      });
      if (U.addCollapsedClassToSeries(this.w, d, h), s.setupEventDelegation(d, ".apexcharts-heatmap-rect"), e.config.chart.dropShadow.enabled) {
        const x = e.config.chart.dropShadow;
        new Z(this.w).dropShadow(d, x, h);
      }
      let p = 0;
      const g = e.config.plotOptions.heatmap.shadeIntensity;
      let f = 0;
      for (let x = 0; x < e.globals.dataPoints; x++) {
        if (e.seriesData.seriesX.length && !e.globals.allSeriesHasEqualX && e.globals.minX + e.globals.minXDiff * x < e.seriesData.seriesX[h][f]) {
          p = p + a;
          continue;
        }
        if (f >= l[h].length)
          break;
        const m = this.helpers.getShadeColor(
          e.config.chart.type,
          h,
          f,
          this.negRange
        );
        let u = m.color;
        const y = m.colorProps;
        e.config.fill.type === "image" && (u = new st(this.w).fillPath({
          seriesNumber: h,
          dataPointIndex: f,
          opacity: e.globals.hasNegs ? y.percent < 0 ? 1 - (1 + y.percent / 100) : g + y.percent / 100 : y.percent / 100,
          patternID: L.randomId(),
          width: e.config.fill.image.width ? e.config.fill.image.width : a,
          height: e.config.fill.image.height ? e.config.fill.image.height : o
        }));
        const b = this.rectRadius, w = s.drawRect(p, r, a, o, b);
        if (w.attr({
          cx: p,
          cy: r
        }), w.node.classList.add("apexcharts-heatmap-rect"), d.add(w), w.attr({
          fill: u,
          i: h,
          index: h,
          j: f,
          val: t[h][f],
          "stroke-width": this.strokeWidth,
          stroke: e.config.plotOptions.heatmap.useFillColorAsStroke ? u : e.globals.stroke.colors[0],
          color: u
        }), e.config.chart.animations.enabled && !e.globals.dataChanged) {
          let S = 1;
          e.globals.resized || (S = e.config.chart.animations.speed), this.animateHeatMap(w, p, r, a, o, S);
        }
        if (e.globals.dataChanged) {
          let S = 1;
          if (this.dynamicAnim.enabled && e.globals.shouldAnimate) {
            S = this.dynamicAnim.speed;
            let k = e.globals.previousPaths[h] && e.globals.previousPaths[h][f] && e.globals.previousPaths[h][f].color;
            k || (k = "rgba(255, 255, 255, 0)"), this.animateHeatColor(
              w,
              L.isColorHex(k) ? k : L.rgb2hex(k),
              L.isColorHex(u) ? u : L.rgb2hex(u),
              S
            );
          }
        }
        const v = e.config.dataLabels.formatter, C = v(e.seriesData.series[h][f], {
          value: e.seriesData.series[h][f],
          seriesIndex: h,
          dataPointIndex: f,
          w: e
        }), D = this.helpers.calculateDataLabels({
          text: C,
          x: p + a / 2,
          y: r + o / 2,
          i: h,
          j: f,
          colorProps: y,
          series: l
        });
        D !== null && d.add(D), p = p + a, f++;
      }
      r = r + o, i.add(d);
    }
    const c = e.globals.yAxisScale[0].result.slice();
    return e.config.yaxis[0].reversed ? c.unshift("") : c.push(""), e.globals.yAxisScale[0].result = c, i;
  }
  animateHeatMap(t, e, s, i, a, o) {
    const r = new ut(this.w);
    r.animateRect(
      t,
      {
        x: e + i / 2,
        y: s + a / 2,
        width: 0,
        height: 0
      },
      {
        x: e,
        y: s,
        width: i,
        height: a
      },
      o,
      () => {
        r.animationCompleted(t);
      }
    );
  }
  animateHeatColor(t, e, s, i) {
    t.attr({
      fill: e
    }).animate(i).attr({
      fill: s
    });
  }
}
class qs {
  constructor(t) {
    this.w = t.w, this.lineCtx = t;
  }
  sameValueSeriesFix(t, e) {
    const s = this.w;
    if ((s.config.fill.type === "gradient" || s.config.fill.type[t] === "gradient") && new V(this.lineCtx.w).seriesHaveSameValues(t)) {
      const a = e[t].slice();
      a[a.length - 1] = a[a.length - 1] + 1e-6, e[t] = a;
    }
    return e;
  }
  calculatePoints({ series: t, realIndex: e, x: s, y: i, i: a, j: o, prevY: r }) {
    const n = this.w, l = [], c = [];
    let h = this.lineCtx.categoryAxisCorrection + n.config.markers.offsetX;
    return n.axisFlags.isXNumeric && (h = (n.seriesData.seriesX[e][0] - n.globals.minX) / this.lineCtx.xRatio + n.config.markers.offsetX), o === 0 && (l.push(h), c.push(
      L.isNumber(t[a][0]) ? r + n.config.markers.offsetY : null
    )), l.push(s + n.config.markers.offsetX), c.push(
      L.isNumber(t[a][o + 1]) ? i + n.config.markers.offsetY : null
    ), {
      x: l,
      y: c
    };
  }
  checkPreviousPaths({ pathFromLine: t, pathFromArea: e, realIndex: s }) {
    const i = this.w;
    for (let a = 0; a < i.globals.previousPaths.length; a++) {
      const o = i.globals.previousPaths[a];
      (o.type === "line" || o.type === "area") && o.paths.length > 0 && parseInt(o.realIndex, 10) === parseInt(s, 10) && (o.type === "line" ? (this.lineCtx.appendPathFrom = !1, t = i.globals.previousPaths[a].paths[0].d) : o.type === "area" && (this.lineCtx.appendPathFrom = !1, e = i.globals.previousPaths[a].paths[0].d, i.config.stroke.show && i.globals.previousPaths[a].paths[1] && (t = i.globals.previousPaths[a].paths[1].d)));
    }
    return {
      pathFromLine: t,
      pathFromArea: e
    };
  }
  determineFirstPrevY({
    i: t,
    realIndex: e,
    series: s,
    prevY: i,
    lineYPosition: a,
    translationsIndex: o
  }) {
    var r, n, l;
    const c = this.w, h = c.config.chart.stacked && !c.globals.comboCharts || c.config.chart.stacked && c.globals.comboCharts && (!this.w.config.chart.stackOnlyBar || ((r = this.w.config.series[e]) == null ? void 0 : r.type) === "bar" || ((n = this.w.config.series[e]) == null ? void 0 : n.type) === "column");
    if (typeof ((l = s[t]) == null ? void 0 : l[0]) < "u")
      h ? t > 0 ? a = this.lineCtx.prevSeriesY[t - 1][0] : a = this.lineCtx.zeroY : a = this.lineCtx.zeroY, i = a - s[t][0] / this.lineCtx.yRatio[o] + (this.lineCtx.isReversed ? s[t][0] / this.lineCtx.yRatio[o] : 0) * 2;
    else if (h && t > 0 && typeof s[t][0] > "u") {
      for (let d = t - 1; d >= 0; d--)
        if (s[d][0] !== null && typeof s[d][0] < "u") {
          a = this.lineCtx.prevSeriesY[d][0], i = a;
          break;
        }
    }
    return {
      prevY: i,
      lineYPosition: a
    };
  }
}
const Zs = (A) => {
  const t = Ks(A), e = A.length - 1, s = 1e-6, i = [];
  let a, o, r, n;
  for (let l = 0; l < e; l++)
    r = Ot(A[l], A[l + 1]), Math.abs(r) < s ? t[l] = t[l + 1] = 0 : (a = t[l] / r, o = t[l + 1] / r, n = a * a + o * o, n > 9 && (n = r * 3 / Math.sqrt(n), t[l] = n * a, t[l + 1] = n * o));
  for (let l = 0; l <= e; l++)
    n = (A[Math.min(e, l + 1)][0] - A[Math.max(0, l - 1)][0]) / (6 * (1 + t[l] * t[l])), i.push([n || 0, t[l] * n || 0]);
  return i;
}, js = (A) => {
  let t = "";
  for (let e = 0; e < A.length; e++) {
    const s = A[e], i = s.length;
    i > 4 ? (t += `C${s[0]}, ${s[1]}`, t += `, ${s[2]}, ${s[3]}`, t += `, ${s[4]}, ${s[5]}`) : i > 2 && (t += `S${s[0]}, ${s[1]}`, t += `, ${s[2]}, ${s[3]}`);
  }
  return t;
}, ie = {
  /**
   * Convert 'points' to bezier
   * @param {Array} points
   * @returns {Array}
   */
  points(A) {
    const t = Zs(A), e = A[1], s = A[0], i = [], a = t[1], o = t[0];
    i.push(s, [
      s[0] + o[0],
      s[1] + o[1],
      e[0] - a[0],
      e[1] - a[1],
      e[0],
      e[1]
    ]);
    for (let r = 2, n = t.length; r < n; r++) {
      const l = A[r], c = t[r];
      i.push([l[0] - c[0], l[1] - c[1], l[0], l[1]]);
    }
    return i;
  },
  /**
   * Slice out a segment of 'points'
   * @param {Array} points
   * @param {Number} start
   * @param {Number} end
   * @returns {Array}
   */
  slice(A, t, e) {
    const s = A.slice(t, e);
    if (t) {
      if (e - t > 1 && s[1].length < 6) {
        const i = s[0].length;
        s[1] = [
          s[0][i - 2] * 2 - s[0][i - 4],
          s[0][i - 1] * 2 - s[0][i - 3]
        ].concat(s[1]);
      }
      s[0] = s[0].slice(-2);
    }
    return s;
  }
};
function Ot(A, t) {
  return (t[1] - A[1]) / (t[0] - A[0]);
}
function Ks(A) {
  const t = [];
  let e = A[0], s = A[1], i = t[0] = Ot(e, s), a = 1;
  for (let o = A.length - 1; a < o; a++)
    e = s, s = A[a + 1], t[a] = (i + (i = Ot(e, s))) * 0.5;
  return t[a] = i, t;
}
class mt {
  constructor(t, e, s, i) {
    this.ctx = e, this.w = t, this.xyRatios = s, this.pointsChart = !(this.w.config.chart.type !== "bubble" && this.w.config.chart.type !== "scatter") || i, this.scatter = new ge(this.w, this.ctx), this.noNegatives = this.w.globals.minX === Number.MAX_VALUE, this.lineHelpers = new qs(this), this.markers = new xt(this.w, this.ctx), this.prevSeriesY = [], this.categoryAxisCorrection = 0, this.yaxisIndex = 0;
  }
  draw(t, e, s, i) {
    var a;
    const o = this.w, r = new P(this.w), n = o.globals.comboCharts ? e : o.config.chart.type, l = r.group({
      class: `apexcharts-${n}-series apexcharts-plot-series`
    }), c = new V(this.w);
    this.yRatio = this.xyRatios.yRatio, this.zRatio = this.xyRatios.zRatio, this.xRatio = this.xyRatios.xRatio, this.baseLineY = this.xyRatios.baseLineY, t = c.getLogSeries(t), this.yRatio = c.getLogYRatios(this.yRatio), this.prevSeriesY = [];
    const h = [];
    for (let d = 0; d < t.length; d++) {
      t = this.lineHelpers.sameValueSeriesFix(d, t);
      const p = o.globals.comboCharts ? s[d] : d, g = this.yRatio.length > 1 ? p : 0;
      this._initSerieVariables(t, d, p);
      const f = [], x = [], m = [];
      let u = o.globals.padHorizontal + this.categoryAxisCorrection;
      const y = 1, b = [], w = [];
      U.addCollapsedClassToSeries(this.w, this.elSeries, p), o.axisFlags.isXNumeric && o.seriesData.seriesX.length > 0 && (u = (o.seriesData.seriesX[p][0] - o.globals.minX) / this.xRatio), m.push(u);
      const v = u;
      let C;
      const D = v;
      let S = this.zeroY, k = this.zeroY;
      const F = 0;
      S = this.lineHelpers.determineFirstPrevY({
        i: d,
        realIndex: p,
        series: t,
        prevY: S,
        lineYPosition: F,
        translationsIndex: g
      }).prevY, o.config.stroke.curve === "monotoneCubic" && t[d][0] === null ? f.push(null) : f.push(S);
      const M = S;
      let E;
      n === "rangeArea" && (E = this.lineHelpers.determineFirstPrevY({
        i: d,
        realIndex: p,
        series: i,
        prevY: k,
        lineYPosition: F,
        translationsIndex: g
      }), k = E.prevY, C = k, x.push(f[0] !== null ? k : null));
      const X = this._calculatePathsFrom({
        type: n,
        series: t,
        i: d,
        realIndex: p,
        translationsIndex: g,
        prevX: D,
        prevY: S,
        prevY2: k
      }), R = [f[0]], Y = [x[0]], z = {
        type: n,
        series: t,
        realIndex: p,
        translationsIndex: g,
        i: d,
        x: u,
        y,
        pX: v,
        pY: M,
        pathsFrom: X,
        linePaths: b,
        areaPaths: w,
        seriesIndex: s,
        lineYPosition: F,
        xArrj: m,
        yArrj: f,
        y2Arrj: x,
        seriesRangeEnd: i
      }, H = this._iterateOverDataPoints(O(I({}, z), {
        iterations: n === "rangeArea" ? t[d].length - 1 : void 0,
        isRangeStart: !0
      }));
      if (n === "rangeArea") {
        const _ = this._calculatePathsFrom({
          series: i,
          i: d,
          realIndex: p,
          prevX: D,
          prevY: k
        }), $ = this._iterateOverDataPoints(O(I({}, z), {
          series: i,
          xArrj: [u],
          yArrj: R,
          y2Arrj: Y,
          pY: C,
          areaPaths: H.areaPaths,
          pathsFrom: _,
          iterations: i[d].length - 1,
          isRangeStart: !1
        })), W = H.linePaths.length / 2;
        for (let J = 0; J < W; J++)
          H.linePaths[J] = $.linePaths[J + W] + H.linePaths[J];
        H.linePaths.splice(W), H.pathFromLine = $.pathFromLine + H.pathFromLine;
      } else
        H.pathFromArea += "z";
      this._handlePaths({ type: n, realIndex: p, i: d, paths: H }), this.elSeries.add(this.elPointsMain), this.elSeries.add(this.elDataLabelsWrap), h.push(this.elSeries);
    }
    if (typeof ((a = o.config.series[0]) == null ? void 0 : a.zIndex) < "u" && h.sort(
      (d, p) => Number(d.node.getAttribute("zIndex")) - Number(p.node.getAttribute("zIndex"))
    ), o.config.chart.stacked)
      for (let d = h.length - 1; d >= 0; d--)
        l.add(h[d]);
    else
      for (let d = 0; d < h.length; d++)
        l.add(h[d]);
    return l;
  }
  _initSerieVariables(t, e, s) {
    const i = this.w, a = new P(this.w);
    this.xDivision = i.layout.gridWidth / (i.globals.dataPoints - (i.config.xaxis.tickPlacement === "on" ? 1 : 0)), this.strokeWidth = Array.isArray(i.config.stroke.width) ? i.config.stroke.width[s] : i.config.stroke.width;
    let o = 0;
    if (this.yRatio.length > 1 && (this.yaxisIndex = i.globals.seriesYAxisReverseMap[s], o = s), this.isReversed = i.config.yaxis[this.yaxisIndex] && i.config.yaxis[this.yaxisIndex].reversed, this.zeroY = i.layout.gridHeight - this.baseLineY[o] - (this.isReversed ? i.layout.gridHeight : 0) + (this.isReversed ? this.baseLineY[o] * 2 : 0), this.areaBottomY = this.zeroY, (this.zeroY > i.layout.gridHeight || i.config.plotOptions.area.fillTo === "end") && (this.areaBottomY = i.layout.gridHeight), this.categoryAxisCorrection = this.xDivision / 2, this.elSeries = a.group({
      class: "apexcharts-series",
      zIndex: typeof i.config.series[s].zIndex < "u" ? i.config.series[s].zIndex : s,
      seriesName: L.escapeString(i.seriesData.seriesNames[s])
    }), this.elPointsMain = a.group({
      class: "apexcharts-series-markers-wrap",
      "data:realIndex": s
    }), i.globals.hasNullValues) {
      const n = this.markers.plotChartMarkers({
        pointsPos: {
          x: [0],
          y: [i.layout.gridHeight + i.globals.markers.largestSize]
        },
        seriesIndex: e,
        j: 0,
        pSize: 0.1,
        alwaysDrawMarker: !0,
        isVirtualPoint: !0
      });
      n !== null && this.elPointsMain.add(n);
    }
    this.elDataLabelsWrap = a.group({
      class: "apexcharts-datalabels",
      "data:realIndex": s
    });
    const r = t[e].length === i.globals.dataPoints;
    this.elSeries.attr({
      "data:longestSeries": r,
      rel: e + 1,
      "data:realIndex": s
    }), this.appendPathFrom = !0;
  }
  _calculatePathsFrom({
    type: t,
    series: e,
    i: s,
    realIndex: i,
    translationsIndex: a,
    prevX: o,
    prevY: r,
    prevY2: n
  }) {
    const l = this.w, c = new P(this.w);
    let h, d, p, g;
    if (e[s][0] === null) {
      for (let f = 0; f < e[s].length; f++)
        if (e[s][f] !== null) {
          o = this.xDivision * f, r = this.zeroY - e[s][f] / this.yRatio[a], h = c.move(o, r), d = c.move(o, this.areaBottomY);
          break;
        }
    } else
      h = c.move(o, r), t === "rangeArea" && (h = c.move(o, n) + c.line(o, r)), d = c.move(o, this.areaBottomY) + c.line(o, r);
    if (p = c.move(0, this.areaBottomY) + c.line(0, this.areaBottomY), g = c.move(0, this.areaBottomY) + c.line(0, this.areaBottomY), l.globals.previousPaths.length > 0) {
      const f = this.lineHelpers.checkPreviousPaths({
        pathFromLine: p,
        pathFromArea: g,
        realIndex: i
      });
      p = f.pathFromLine, g = f.pathFromArea;
    }
    return {
      prevX: o,
      prevY: r,
      linePath: h,
      areaPath: d,
      pathFromLine: p,
      pathFromArea: g
    };
  }
  _handlePaths({ type: t, realIndex: e, i: s, paths: i }) {
    const a = this.w, o = new P(this.w), r = new st(this.w);
    this.prevSeriesY.push(i.yArrj), a.globals.seriesXvalues[e] = i.xArrj, a.globals.seriesYvalues[e] = i.yArrj;
    const n = a.config.forecastDataPoints;
    if (n.count > 0 && t !== "rangeArea") {
      const c = a.globals.seriesXvalues[e][a.globals.seriesXvalues[e].length - n.count - 1], h = o.drawRect(
        c,
        0,
        a.layout.gridWidth,
        a.layout.gridHeight,
        0
      );
      a.dom.elForecastMask.appendChild(h.node);
      const d = o.drawRect(
        0,
        0,
        c,
        a.layout.gridHeight,
        0
      );
      a.dom.elNonForecastMask.appendChild(d.node);
    }
    this.pointsChart || a.globals.delayedElements.push({
      el: this.elPointsMain.node,
      index: e
    });
    const l = {
      i: s,
      realIndex: e,
      animationDelay: s,
      initialSpeed: a.config.chart.animations.speed,
      dataChangeSpeed: a.config.chart.animations.dynamicAnimation.speed,
      className: `apexcharts-${t}`
    };
    if (t === "area") {
      const c = r.fillPath({
        seriesNumber: e
      });
      for (let h = 0; h < i.areaPaths.length; h++) {
        const d = o.renderPaths(O(I({}, l), {
          pathFrom: i.pathFromArea,
          pathTo: i.areaPaths[h],
          stroke: "none",
          strokeWidth: 0,
          strokeLineCap: null,
          fill: c
        }));
        this.elSeries.add(d);
      }
    }
    if (a.config.stroke.show && !this.pointsChart) {
      let c = null;
      if (t === "line")
        c = r.fillPath({
          seriesNumber: e,
          i: s
        });
      else if (a.config.stroke.fill.type === "solid")
        c = a.globals.stroke.colors[e];
      else {
        const h = a.config.fill;
        a.config.fill = a.config.stroke.fill, c = r.fillPath({
          seriesNumber: e,
          i: s
        }), a.config.fill = h;
      }
      for (let h = 0; h < i.linePaths.length; h++) {
        let d = c;
        t === "rangeArea" && (d = r.fillPath({
          seriesNumber: e
        }));
        const p = O(I({}, l), {
          pathFrom: i.pathFromLine,
          pathTo: i.linePaths[h],
          stroke: c,
          strokeWidth: this.strokeWidth,
          strokeLineCap: a.config.stroke.lineCap,
          fill: t === "rangeArea" ? d : "none"
        }), g = o.renderPaths(p);
        if (this.elSeries.add(g), g.attr("fill-rule", "evenodd"), n.count > 0 && t !== "rangeArea") {
          const f = o.renderPaths(p);
          f.node.setAttribute(
            "stroke-dasharray",
            n.dashArray
          ), n.strokeWidth && f.node.setAttribute(
            "stroke-width",
            n.strokeWidth
          ), this.elSeries.add(f), f.attr(
            "clip-path",
            `url(#forecastMask${a.globals.cuid})`
          ), g.attr(
            "clip-path",
            `url(#nonForecastMask${a.globals.cuid})`
          );
        }
      }
    }
  }
  _iterateOverDataPoints({
    type: t,
    series: e,
    iterations: s,
    realIndex: i,
    translationsIndex: a,
    i: o,
    x: r,
    y: n,
    pX: l,
    pY: c,
    pathsFrom: h,
    linePaths: d,
    areaPaths: p,
    seriesIndex: g,
    lineYPosition: f,
    xArrj: x,
    yArrj: m,
    y2Arrj: u,
    isRangeStart: y,
    seriesRangeEnd: b
  }) {
    var w, v;
    const C = this.w, D = new P(this.w), S = this.yRatio;
    let { prevY: k, linePath: F, areaPath: T, pathFromLine: M, pathFromArea: E } = h;
    const X = L.isNumber(C.globals.minYArr[i]) ? C.globals.minYArr[i] : C.globals.minY;
    s || (s = C.globals.dataPoints > 1 ? C.globals.dataPoints - 1 : C.globals.dataPoints);
    const R = (W, J) => J - W / S[a] + (this.isReversed ? W / S[a] : 0) * 2;
    let Y = n;
    const z = C.config.chart.stacked && !C.globals.comboCharts || C.config.chart.stacked && C.globals.comboCharts && (!this.w.config.chart.stackOnlyBar || ((w = this.w.config.series[i]) == null ? void 0 : w.type) === "bar" || ((v = this.w.config.series[i]) == null ? void 0 : v.type) === "column");
    let H = C.config.stroke.curve;
    Array.isArray(H) && (Array.isArray(g) ? H = H[g[o]] : H = H[o]);
    let _ = 0, $;
    for (let W = 0; W < s && e[o].length !== 0; W++) {
      const J = typeof e[o][W + 1] > "u" || e[o][W + 1] === null;
      if (C.axisFlags.isXNumeric) {
        let Ct = C.seriesData.seriesX[i][W + 1];
        typeof C.seriesData.seriesX[i][W + 1] > "u" && (Ct = C.seriesData.seriesX[i][s - 1]), r = (Ct - C.globals.minX) / this.xRatio;
      } else
        r = r + this.xDivision;
      if (z)
        if (o > 0 && C.globals.collapsedSeries.length < C.config.series.length - 1) {
          const Ct = (Le) => {
            for (let ct = Le; ct > 0; ct--)
              if (C.globals.collapsedSeriesIndices.indexOf(
                (g == null ? void 0 : g[ct]) || ct
              ) > -1)
                ct--;
              else
                return ct;
            return 0;
          };
          f = this.prevSeriesY[Ct(o - 1)][W + 1];
        } else
          f = this.zeroY;
      else
        f = this.zeroY;
      J ? n = R(X, f) : (n = R(e[o][W + 1], f), t === "rangeArea" && (Y = R(b[o][W + 1], f))), x.push(e[o][W + 1] === null ? null : r), J && (C.config.stroke.curve === "smooth" || C.config.stroke.curve === "monotoneCubic") ? (m.push(null), u.push(null)) : (m.push(n), u.push(Y));
      const $t = this.lineHelpers.calculatePoints({
        series: e,
        x: r,
        y: n,
        realIndex: i,
        i: o,
        j: W,
        prevY: k
      }), it = this._createPaths({
        type: t,
        series: e,
        i: o,
        j: W,
        x: r,
        y: n,
        y2: Y,
        xArrj: x,
        yArrj: m,
        y2Arrj: u,
        pX: l,
        pY: c,
        pathState: _,
        segmentStartX: $,
        linePath: F,
        areaPath: T,
        linePaths: d,
        areaPaths: p,
        curve: H,
        isRangeStart: y
      });
      p = it.areaPaths, d = it.linePaths, l = it.pX, c = it.pY, _ = it.pathState, $ = it.segmentStartX, T = it.areaPath, F = it.linePath, this.appendPathFrom && !C.globals.hasNullValues && !(H === "monotoneCubic" && t === "rangeArea") && (M += D.line(r, this.areaBottomY), E += D.line(r, this.areaBottomY)), this.handleNullDataPoints(e, $t, o, W, i), this._handleMarkersAndLabels({
        type: t,
        pointsPos: $t,
        i: o,
        j: W,
        realIndex: i,
        isRangeStart: y
      });
    }
    return {
      yArrj: m,
      xArrj: x,
      pathFromArea: E,
      areaPaths: p,
      pathFromLine: M,
      linePaths: d,
      linePath: F,
      areaPath: T
    };
  }
  _handleMarkersAndLabels({ type: t, pointsPos: e, isRangeStart: s, i, j: a, realIndex: o }) {
    const r = this.w, n = new gt(this.w, this.ctx);
    if (this.pointsChart)
      this.scatter.draw(this.elSeries, a, {
        realIndex: o,
        pointsPos: e,
        zRatio: this.zRatio,
        elParent: this.elPointsMain
      });
    else {
      r.seriesData.series[i].length > 1 && this.elPointsMain.node.classList.add("apexcharts-element-hidden");
      const c = this.markers.plotChartMarkers({
        pointsPos: e,
        seriesIndex: o,
        j: a + 1
      });
      c !== null && this.elPointsMain.add(c);
    }
    const l = n.drawDataLabel({
      type: t,
      isRangeStart: s,
      pos: e,
      i: o,
      j: a + 1
    });
    l !== null && this.elDataLabelsWrap.add(l);
  }
  _createPaths({
    type: t,
    series: e,
    i: s,
    j: i,
    x: a,
    y: o,
    xArrj: r,
    yArrj: n,
    y2: l,
    y2Arrj: c,
    pX: h,
    pY: d,
    pathState: p,
    segmentStartX: g,
    linePath: f,
    areaPath: x,
    linePaths: m,
    areaPaths: u,
    curve: y,
    isRangeStart: b
  }) {
    const w = new P(this.w), v = this.areaBottomY, C = t === "rangeArea", D = t === "rangeArea" && b;
    switch (y) {
      case "monotoneCubic": {
        const S = b ? n : c, k = (M, E) => M.map((X, R) => [X, E[R]]).filter((X) => X[1] !== null), F = (M) => {
          const E = [];
          let X = 0;
          return M.forEach((R) => {
            R !== null ? X++ : X > 0 && (E.push(X), X = 0);
          }), X > 0 && E.push(X), E;
        }, T = (M, E) => {
          const X = F(M), R = [];
          for (let Y = 0, z = 0; Y < X.length; z += X[Y++])
            R[Y] = ie.slice(E, z, z + X[Y]);
          return R;
        };
        switch (p) {
          case 0:
            if (S[i + 1] === null)
              break;
            p = 1;
          case 1:
            if (!(C ? r.length === e[s].length : i === e[s].length - 2))
              break;
          case 2: {
            const M = b ? r : r.slice().reverse(), E = b ? S : S.slice().reverse(), X = k(M, E), R = X.length > 1 ? ie.points(X) : X;
            let Y = [];
            C && (D ? u = X : Y = u.reverse());
            let z = 0, H = 0;
            if (T(E, R).forEach((_) => {
              z++;
              const $ = js(_), W = H;
              H += _.length;
              const J = H - 1;
              D ? f = w.move(
                X[W][0],
                X[W][1]
              ) + $ : C ? f = w.move(
                Y[W][0],
                Y[W][1]
              ) + w.line(
                X[W][0],
                X[W][1]
              ) + $ + w.line(
                Y[J][0],
                Y[J][1]
              ) : (f = w.move(
                X[W][0],
                X[W][1]
              ) + $, x = f + w.line(X[J][0], v) + w.line(X[W][0], v) + "z", u.push(x)), m.push(f);
            }), C && z > 1 && !D) {
              const _ = m.slice(z).reverse();
              m.splice(z), _.forEach(($) => m.push($));
            }
            p = 0;
            break;
          }
        }
        break;
      }
      case "smooth": {
        const S = (a - h) * 0.35;
        if (e[s][i] === null)
          p = 0;
        else
          switch (p) {
            case 0:
              if (g = h, D ? f = w.move(h, c[i]) + w.line(h, d) : f = w.move(h, d), x = w.move(h, d), e[s][i + 1] === null || typeof e[s][i + 1] > "u") {
                m.push(f), u.push(x);
                break;
              }
              if (p = 1, i < e[s].length - 2) {
                const k = w.curve(h + S, d, a - S, o, a, o);
                f += k, x += k;
                break;
              }
            case 1:
              if (e[s][i + 1] === null)
                D ? f += w.line(h, l) : f += w.move(h, d), x += w.line(h, v) + w.line(g, v) + "z", m.push(f), u.push(x), p = -1;
              else {
                const k = w.curve(h + S, d, a - S, o, a, o);
                f += k, x += k, i >= e[s].length - 2 && (D && (f += w.curve(a, o, a, o, a, l) + w.move(a, l)), x += w.curve(a, o, a, o, a, v) + w.line(g, v) + "z", m.push(f), u.push(x), p = -1);
              }
              break;
          }
        h = a, d = o;
        break;
      }
      default: {
        const S = (k, F, T) => {
          let M = [];
          switch (k) {
            case "stepline":
              M = w.line(F, null, "H") + w.line(null, T, "V");
              break;
            case "linestep":
              M = w.line(null, T, "V") + w.line(F, null, "H");
              break;
            case "straight":
              M = w.line(F, T);
              break;
          }
          return M;
        };
        if (e[s][i] === null)
          p = 0;
        else
          switch (p) {
            case 0:
              if (g = h, D ? f = w.move(h, c[i]) + w.line(h, d) : f = w.move(h, d), x = w.move(h, d), e[s][i + 1] === null || typeof e[s][i + 1] > "u") {
                m.push(f), u.push(x);
                break;
              }
              if (p = 1, i < e[s].length - 2) {
                const k = S(y, a, o);
                f += k, x += k;
                break;
              }
            case 1:
              if (e[s][i + 1] === null)
                D ? f += w.line(h, l) : f += w.move(h, d), x += w.line(h, v) + w.line(g, v) + "z", m.push(f), u.push(x), p = -1;
              else {
                const k = S(y, a, o);
                f += k, x += k, i >= e[s].length - 2 && (D && (f += w.line(a, l)), x += w.line(a, v) + w.line(g, v) + "z", m.push(f), u.push(x), p = -1);
              }
              break;
          }
        h = a, d = o;
        break;
      }
    }
    return {
      linePaths: m,
      areaPaths: u,
      pX: h,
      pY: d,
      pathState: p,
      segmentStartX: g,
      linePath: f,
      areaPath: x
    };
  }
  handleNullDataPoints(t, e, s, i, a) {
    const o = this.w;
    if (t[s][i] === null && o.config.markers.showNullDataPoints || t[s].length === 1) {
      let r = this.strokeWidth - o.config.markers.strokeWidth / 2;
      r > 0 || (r = 0);
      const n = this.markers.plotChartMarkers({
        pointsPos: e,
        seriesIndex: a,
        j: i + 1,
        pSize: r,
        alwaysDrawMarker: !0
      });
      n !== null && this.elPointsMain.add(n);
    }
  }
}
class ke {
  constructor(t) {
    this.w = t;
  }
  drawYAxisTexts(t, e, s, i) {
    const a = this.w, o = a.config.yaxis[0], r = a.formatters.yLabelFormatters[0];
    return new P(this.w).drawText({
      x: t + o.labels.offsetX,
      y: e + o.labels.offsetY,
      text: r(i, s),
      textAnchor: "middle",
      fontSize: o.labels.style.fontSize,
      fontFamily: o.labels.style.fontFamily,
      foreColor: Array.isArray(o.labels.style.colors) ? o.labels.style.colors[s] : o.labels.style.colors
    });
  }
}
class kt {
  constructor(t, e) {
    this.ctx = e, this.w = t, this.chartType = this.w.config.chart.type, this.initialAnim = this.w.config.chart.animations.enabled, this.dynamicAnim = this.initialAnim && this.w.config.chart.animations.dynamicAnimation.enabled, this.animBeginArr = [0], this.animDur = 0, this.donutDataLabels = this.w.config.plotOptions.pie.donut.labels, this.lineColorArr = t.globals.stroke.colors !== void 0 ? t.globals.stroke.colors : t.globals.colors, this.defaultSize = Math.min(t.layout.gridWidth, t.layout.gridHeight), this.centerY = this.defaultSize / 2, this.centerX = t.layout.gridWidth / 2, t.config.chart.type === "radialBar" ? this.fullAngle = 360 : this.fullAngle = Math.abs(
      t.config.plotOptions.pie.endAngle - t.config.plotOptions.pie.startAngle
    ), this.initialAngle = t.config.plotOptions.pie.startAngle % this.fullAngle, t.globals.radialSize = this.defaultSize / 2.05 - t.config.stroke.width - (t.config.chart.sparkline.enabled ? 0 : t.config.chart.dropShadow.blur), this.donutSize = t.globals.radialSize * parseInt(t.config.plotOptions.pie.donut.size, 10) / 100;
    const s = t.config.plotOptions.pie.customScale, i = t.layout.gridWidth / 2, a = t.layout.gridHeight / 2;
    this.translateX = i - i * s, this.translateY = a - a * s, this.dataLabelsGroup = new P(this.w).group({
      class: "apexcharts-datalabels-group",
      transform: `translate(${this.translateX}, ${this.translateY}) scale(${s})`
    }), this.maxY = 0, this.sliceLabels = [], this.sliceSizes = [], this.prevSectorAngleArr = [];
  }
  draw(t) {
    const e = this, s = this.w, i = new P(this.w), a = i.group({
      class: "apexcharts-pie"
    });
    if (s.globals.noData)
      return a;
    let o = 0;
    for (let c = 0; c < t.length; c++)
      o += L.negToZero(t[c]);
    const r = [], n = i.group();
    o === 0 && (o = 1e-5), t.forEach((c) => {
      this.maxY = Math.max(this.maxY, c);
    }), s.config.yaxis[0].max && (this.maxY = s.config.yaxis[0].max), s.config.grid.position === "back" && this.chartType === "polarArea" && this.drawPolarElements(a);
    for (let c = 0; c < t.length; c++) {
      const h = this.fullAngle * L.negToZero(t[c]) / o;
      r.push(h), this.chartType === "polarArea" ? (r[c] = this.fullAngle / t.length, this.sliceSizes.push(s.globals.radialSize * t[c] / this.maxY)) : this.sliceSizes.push(s.globals.radialSize);
    }
    if (s.globals.dataChanged) {
      let c = 0;
      for (let d = 0; d < s.globals.previousPaths.length; d++)
        c += L.negToZero(s.globals.previousPaths[d]);
      let h;
      for (let d = 0; d < s.globals.previousPaths.length; d++)
        h = this.fullAngle * L.negToZero(s.globals.previousPaths[d]) / c, this.prevSectorAngleArr.push(h);
    }
    if (this.donutSize < 0 && (this.donutSize = 0), this.chartType === "donut") {
      const c = i.drawCircle(this.donutSize);
      c.attr({
        cx: this.centerX,
        cy: this.centerY,
        fill: s.config.plotOptions.pie.donut.background ? s.config.plotOptions.pie.donut.background : "transparent"
      }), n.add(c);
    }
    const l = e.drawArcs(r, t);
    if (this.sliceLabels.forEach((c) => {
      l.add(c);
    }), n.attr({
      transform: `translate(${this.translateX}, ${this.translateY}) scale(${s.config.plotOptions.pie.customScale})`
    }), n.add(l), a.add(n), this.donutDataLabels.show) {
      const c = this.renderInnerDataLabels(
        this.dataLabelsGroup,
        this.donutDataLabels,
        {
          hollowSize: this.donutSize,
          centerX: this.centerX,
          centerY: this.centerY,
          opacity: this.donutDataLabels.show
        }
      );
      a.add(c);
    }
    return s.config.grid.position === "front" && this.chartType === "polarArea" && this.drawPolarElements(a), a;
  }
  // core function for drawing pie arcs
  drawArcs(t, e) {
    const s = this.w, i = new Z(this.w), a = new P(this.w), o = new st(this.w), r = a.group({
      class: "apexcharts-slices"
    });
    let n = this.initialAngle, l = this.initialAngle, c = this.initialAngle, h = this.initialAngle;
    this.strokeWidth = s.config.stroke.show ? s.config.stroke.width : 0;
    for (let d = 0; d < t.length; d++) {
      const p = a.group({
        class: "apexcharts-series apexcharts-pie-series",
        seriesName: L.escapeString(s.seriesData.seriesNames[d]),
        rel: d + 1,
        "data:realIndex": d
      });
      r.add(p), n = c, l = h, c = n + t[d], h = l + this.prevSectorAngleArr[d];
      const g = c < n ? this.fullAngle + c - n : c - n, f = o.fillPath({
        seriesNumber: d,
        size: this.sliceSizes[d],
        value: e[d]
      }), x = this.getChangedPath(l, h), m = a.drawPath({
        d: x,
        stroke: Array.isArray(this.lineColorArr) ? this.lineColorArr[d] : this.lineColorArr,
        strokeWidth: 0,
        fill: f,
        fillOpacity: s.config.fill.opacity,
        classes: `apexcharts-pie-area apexcharts-${this.chartType.toLowerCase()}-slice-${d}`
      });
      if (m.attr({
        index: 0,
        j: d
      }), i.setSelectionFilter(m, 0, d), s.config.chart.dropShadow.enabled) {
        const v = s.config.chart.dropShadow;
        i.dropShadow(m, v, d);
      }
      this.addListeners(m, this.donutDataLabels);
      let u = {
        x: 0,
        y: 0
      };
      const y = (n + g / 2) % this.fullAngle;
      let b = { x: this.centerX, y: this.centerY };
      this.chartType === "pie" || this.chartType === "polarArea" ? (u = L.polarToCartesian(
        this.centerX,
        this.centerY,
        s.globals.radialSize / 1.25 + s.config.plotOptions.pie.dataLabels.offset,
        y
      ), b = L.polarToCartesian(
        this.centerX,
        this.centerY,
        s.globals.radialSize / 2,
        y
      )) : this.chartType === "donut" && (u = L.polarToCartesian(
        this.centerX,
        this.centerY,
        (s.globals.radialSize + this.donutSize) / 2 + s.config.plotOptions.pie.dataLabels.offset,
        y
      ), b = L.polarToCartesian(
        this.centerX,
        this.centerY,
        (s.globals.radialSize + this.donutSize) / 2,
        y
      )), P.setAttrs(m.node, {
        "data:angle": g,
        "data:startAngle": n,
        "data:strokeWidth": this.strokeWidth,
        "data:value": e[d],
        "data:cx": b.x,
        "data:cy": b.y
      }), p.add(m);
      let w = 0;
      if (this.initialAnim && !s.globals.resized && !s.globals.dataChanged ? (w = g / this.fullAngle * s.config.chart.animations.speed, w === 0 && (w = 1), this.animDur = w + this.animDur, this.animBeginArr.push(this.animDur)) : this.animBeginArr.push(0), this.dynamicAnim && s.globals.dataChanged ? this.animatePaths(m, {
        size: this.sliceSizes[d],
        endAngle: c,
        startAngle: n,
        prevStartAngle: l,
        prevEndAngle: h,
        animateStartingPos: !0,
        i: d,
        animBeginArr: this.animBeginArr,
        shouldSetPrevPaths: !0,
        dur: s.config.chart.animations.dynamicAnimation.speed
      }) : this.animatePaths(m, {
        size: this.sliceSizes[d],
        endAngle: c,
        startAngle: n,
        i: d,
        totalItems: t.length - 1,
        animBeginArr: this.animBeginArr,
        dur: w
      }), s.config.plotOptions.pie.expandOnClick && this.chartType !== "polarArea" && m.node.addEventListener("mouseup", this.pieClicked.bind(this, d)), typeof s.interact.selectedDataPoints[0] < "u" && s.interact.selectedDataPoints[0].indexOf(d) > -1 && this.pieClicked(d), s.config.dataLabels.enabled) {
        const v = u.x, C = u.y;
        let D = 100 * g / this.fullAngle + "%";
        if (g !== 0 && s.config.plotOptions.pie.dataLabels.minAngleToShowLabel < t[d]) {
          const S = s.config.dataLabels.formatter;
          S !== void 0 && (D = S(s.globals.seriesPercent[d][0], {
            seriesIndex: d,
            w: s
          }));
          const k = s.globals.dataLabels.style.colors[d], F = a.group({
            class: "apexcharts-datalabels"
          }), T = a.drawText({
            x: v,
            y: C,
            text: D,
            textAnchor: "middle",
            fontSize: s.config.dataLabels.style.fontSize,
            fontFamily: s.config.dataLabels.style.fontFamily,
            fontWeight: s.config.dataLabels.style.fontWeight,
            foreColor: k
          });
          if (F.add(T), s.config.dataLabels.dropShadow.enabled) {
            const M = s.config.dataLabels.dropShadow;
            i.dropShadow(T, M);
          }
          T.node.classList.add("apexcharts-pie-label"), s.config.chart.animations.animate && s.globals.resized === !1 && (T.node.classList.add("apexcharts-pie-label-delay"), T.node.style.animationDelay = s.config.chart.animations.speed / 940 + "s"), this.sliceLabels.push(F);
        }
      }
    }
    return r;
  }
  addListeners(t, e) {
    const s = new P(this.w);
    t.node.addEventListener(
      "mouseenter",
      s.pathMouseEnter.bind(this, t)
    ), t.node.addEventListener(
      "mouseleave",
      s.pathMouseLeave.bind(this, t)
    ), t.node.addEventListener(
      "mouseleave",
      this.revertDataLabelsInner.bind(this, t.node, e)
    ), t.node.addEventListener(
      "mousedown",
      s.pathMouseDown.bind(this, t)
    ), this.donutDataLabels.total.showAlways || (t.node.addEventListener(
      "mouseenter",
      this.printDataLabelsInner.bind(this, t.node, e)
    ), t.node.addEventListener(
      "mousedown",
      this.printDataLabelsInner.bind(this, t.node, e)
    ));
  }
  // This function can be used for other circle charts too
  animatePaths(t, e) {
    const s = this.w, i = this;
    let a = e.endAngle < e.startAngle ? this.fullAngle + e.endAngle - e.startAngle : e.endAngle - e.startAngle, o = a, r = e.startAngle;
    const n = e.startAngle;
    e.prevStartAngle !== void 0 && e.prevEndAngle !== void 0 && (r = e.prevEndAngle, o = e.prevEndAngle < e.prevStartAngle ? this.fullAngle + e.prevEndAngle - e.prevStartAngle : e.prevEndAngle - e.prevStartAngle), e.i === s.config.series.length - 1 && (a + n > this.fullAngle ? e.endAngle = e.endAngle - (a + n) : a + n < this.fullAngle && (e.endAngle = e.endAngle + (this.fullAngle - (a + n)))), a === this.fullAngle && (a = this.fullAngle - 0.01), i.animateArc(t, r, n, a, o, e);
  }
  animateArc(t, e, s, i, a, o) {
    const r = this, n = this.w, l = new ut(this.w), c = o.size;
    let h;
    (isNaN(e) || isNaN(a)) && (e = s, a = i, o.dur = 0);
    let d = i, p = s;
    const g = e < s ? this.fullAngle + e - s : e - s;
    n.globals.dataChanged && o.shouldSetPrevPaths && o.prevEndAngle && (h = r.getPiePath({
      me: r,
      startAngle: o.prevStartAngle,
      angle: o.prevEndAngle < o.prevStartAngle ? this.fullAngle + o.prevEndAngle - o.prevStartAngle : o.prevEndAngle - o.prevStartAngle,
      size: c
    }), t.attr({ d: h })), o.dur !== 0 ? t.animate(o.dur, o.animBeginArr[o.i]).after(function() {
      (r.chartType === "pie" || r.chartType === "donut" || r.chartType === "polarArea") && this.animate(n.config.chart.animations.dynamicAnimation.speed).attr(
        {
          "stroke-width": r.strokeWidth
        }
      ), o.i === n.config.series.length - 1 && l.animationCompleted(t);
    }).during((f) => {
      d = g + (i - g) * f, o.animateStartingPos && (d = a + (i - a) * f, p = e - a + (s - (e - a)) * f), h = r.getPiePath({
        me: r,
        startAngle: p,
        angle: d,
        size: c
      }), t.node.setAttribute("data:pathOrig", h), t.attr({
        d: h
      });
    }) : (h = r.getPiePath({
      me: r,
      startAngle: p,
      angle: i,
      size: c
    }), o.isTrack || (n.globals.animationEnded = !0), t.node.setAttribute("data:pathOrig", h), t.attr({
      d: h,
      "stroke-width": r.strokeWidth
    }));
  }
  pieClicked(t) {
    const e = this.w, s = this, i = s.sliceSizes[t] + (e.config.plotOptions.pie.expandOnClick ? 4 : 0), a = e.dom.Paper.findOne(
      `.apexcharts-${s.chartType.toLowerCase()}-slice-${t}`
    );
    if (a.attr("data:pieClicked") === "true") {
      a.attr({
        "data:pieClicked": "false"
      }), this.revertDataLabelsInner(a.node, this.donutDataLabels);
      const l = a.attr("data:pathOrig");
      a.attr({
        d: l
      });
      return;
    } else {
      const l = e.dom.baseEl.getElementsByClassName(
        "apexcharts-pie-area"
      );
      Array.prototype.forEach.call(l, (c) => {
        c.setAttribute("data:pieClicked", "false");
        const h = c.getAttribute("data:pathOrig");
        h && c.setAttribute("d", h);
      }), e.interact.capturedDataPointIndex = t, a.attr("data:pieClicked", "true");
    }
    const o = parseInt(a.attr("data:startAngle"), 10), r = parseInt(a.attr("data:angle"), 10), n = s.getPiePath({
      me: s,
      startAngle: o,
      angle: r,
      size: i
    });
    r !== 360 && a.plot(n);
  }
  getChangedPath(t, e) {
    let s = "";
    return this.dynamicAnim && this.w.globals.dataChanged && (s = this.getPiePath({
      me: this,
      startAngle: t,
      angle: e - t,
      size: this.size
    })), s;
  }
  getPiePath({ me: t, startAngle: e, angle: s, size: i }) {
    let a;
    const o = new P(this.w), r = e, n = Math.PI * (r - 90) / 180;
    let l = s + e;
    Math.ceil(l) >= this.fullAngle + this.w.config.plotOptions.pie.startAngle % this.fullAngle && (l = this.fullAngle + this.w.config.plotOptions.pie.startAngle % this.fullAngle - 0.01), Math.ceil(l) > this.fullAngle && (l -= this.fullAngle);
    const c = Math.PI * (l - 90) / 180, h = t.centerX + i * Math.cos(n), d = t.centerY + i * Math.sin(n), p = t.centerX + i * Math.cos(c), g = t.centerY + i * Math.sin(c), f = L.polarToCartesian(
      t.centerX,
      t.centerY,
      t.donutSize,
      l
    ), x = L.polarToCartesian(
      t.centerX,
      t.centerY,
      t.donutSize,
      r
    ), m = s > 180 ? 1 : 0, u = ["M", h, d, "A", i, i, 0, m, 1, p, g];
    return t.chartType === "donut" ? a = [
      ...u,
      "L",
      f.x,
      f.y,
      "A",
      t.donutSize,
      t.donutSize,
      0,
      m,
      0,
      x.x,
      x.y,
      "L",
      h,
      d,
      "z"
    ].join(" ") : t.chartType === "pie" || t.chartType === "polarArea" ? a = [...u, "L", t.centerX, t.centerY, "L", h, d].join(
      " "
    ) : a = [...u].join(" "), o.roundPathCorners(a, this.strokeWidth * 2);
  }
  drawPolarElements(t) {
    const e = this.w, s = new pe(this.w), i = new P(this.w), a = new ke(this.w), o = i.group(), r = i.group(), n = s.niceScale(0, Math.ceil(this.maxY), 0), l = n.result.reverse(), c = n.result.length;
    this.maxY = n.niceMax;
    let h = e.globals.radialSize;
    const d = h / (c - 1);
    for (let p = 0; p < c - 1; p++) {
      const g = i.drawCircle(h);
      if (g.attr({
        cx: this.centerX,
        cy: this.centerY,
        fill: "none",
        "stroke-width": e.config.plotOptions.polarArea.rings.strokeWidth,
        stroke: e.config.plotOptions.polarArea.rings.strokeColor
      }), e.config.yaxis[0].show) {
        const f = a.drawYAxisTexts(
          this.centerX,
          this.centerY - h + parseInt(e.config.yaxis[0].labels.style.fontSize, 10) / 2,
          p,
          l[p]
        );
        r.add(f);
      }
      o.add(g), h = h - d;
    }
    this.drawSpokes(t), t.add(o), t.add(r);
  }
  renderInnerDataLabels(t, e, s) {
    const i = this.w, a = new P(this.w), o = e.total.show;
    t.node.innerHTML = "", t.node.style.opacity = s.opacity;
    const r = s.centerX, n = this.donutDataLabels.total.label ? s.centerY : s.centerY - s.centerY / 6;
    let l, c;
    e.name.color === void 0 ? l = i.globals.colors[0] : l = e.name.color;
    let h = e.name.fontSize, d = e.name.fontFamily, p = e.name.fontWeight;
    e.value.color === void 0 ? c = i.config.chart.foreColor : c = e.value.color;
    const g = e.value.formatter;
    let f = "", x = "";
    if (o ? (l = e.total.color, h = e.total.fontSize, d = e.total.fontFamily, p = e.total.fontWeight, x = this.donutDataLabels.total.label ? e.total.label : "", f = e.total.formatter(i)) : i.seriesData.series.length === 1 && (f = g(i.seriesData.series[0], i), x = i.seriesData.seriesNames[0]), x && (x = e.name.formatter(
      x,
      e.total.show,
      i
    )), e.name.show) {
      const m = a.drawText({
        x: r,
        y: n + parseFloat(e.name.offsetY),
        text: x,
        textAnchor: "middle",
        foreColor: l,
        fontSize: h,
        fontWeight: p,
        fontFamily: d
      });
      m.node.classList.add("apexcharts-datalabel-label"), t.add(m);
    }
    if (e.value.show) {
      const m = e.name.show ? parseFloat(e.value.offsetY) + 16 : e.value.offsetY, u = a.drawText({
        x: r,
        y: n + m,
        text: f,
        textAnchor: "middle",
        foreColor: c,
        fontWeight: e.value.fontWeight,
        fontSize: e.value.fontSize,
        fontFamily: e.value.fontFamily
      });
      u.node.classList.add("apexcharts-datalabel-value"), t.add(u);
    }
    return t;
  }
  /**
   *
   * @param {string} name - The name of the series
   * @param {string} val - The value of that series
   * @param {object} el - Optional el (indicates which series was hovered/clicked). If this param is not present, means we need to show total
   */
  printInnerLabels(t, e, s, i) {
    const a = this.w;
    let o;
    i ? t.name.color === void 0 ? o = a.globals.colors[parseInt(i.parentNode.getAttribute("rel"), 10) - 1] : o = t.name.color : a.seriesData.series.length > 1 && t.total.show && (o = t.total.color);
    const r = a.dom.baseEl.querySelector(
      ".apexcharts-datalabel-label"
    ), n = a.dom.baseEl.querySelector(
      ".apexcharts-datalabel-value"
    ), l = t.value.formatter;
    s = l(s, a), !i && typeof t.total.formatter == "function" && (s = t.total.formatter(a));
    const c = e === t.total.label;
    e = this.donutDataLabels.total.label ? t.name.formatter(e, c, a) : "", r !== null && (r.textContent = e), n !== null && (n.textContent = s), r !== null && (r.style.fill = o);
  }
  printDataLabelsInner(t, e) {
    const s = this.w, i = t.getAttribute("data:value"), a = s.seriesData.seriesNames[parseInt(t.parentNode.getAttribute("rel"), 10) - 1];
    s.seriesData.series.length > 1 && this.printInnerLabels(e, a, i, t);
    const o = s.dom.baseEl.querySelector(
      ".apexcharts-datalabels-group"
    );
    o !== null && (o.style.opacity = 1);
  }
  drawSpokes(t) {
    const e = this.w, s = new P(this.w), i = e.config.plotOptions.polarArea.spokes;
    if (i.strokeWidth === 0)
      return;
    const a = [], o = 360 / e.seriesData.series.length;
    for (let r = 0; r < e.seriesData.series.length; r++)
      a.push(
        L.polarToCartesian(
          this.centerX,
          this.centerY,
          e.globals.radialSize,
          e.config.plotOptions.pie.startAngle + o * r
        )
      );
    a.forEach((r, n) => {
      const l = s.drawLine(
        r.x,
        r.y,
        this.centerX,
        this.centerY,
        Array.isArray(i.connectorColors) ? i.connectorColors[n] : i.connectorColors
      );
      t.add(l);
    });
  }
  revertDataLabelsInner() {
    const t = this.w;
    if (this.donutDataLabels.show) {
      const e = t.dom.Paper.findOne(
        ".apexcharts-datalabels-group"
      ), s = this.renderInnerDataLabels(
        e,
        this.donutDataLabels,
        {
          hollowSize: this.donutSize,
          centerX: this.centerX,
          centerY: this.centerY,
          opacity: this.donutDataLabels.show
        }
      );
      t.dom.Paper.findOne(
        ".apexcharts-radialbar, .apexcharts-pie"
      ).add(s);
    }
  }
}
class Js {
  constructor(t, e) {
    this.ctx = e, this.w = t, this.chartType = this.w.config.chart.type, this.initialAnim = this.w.config.chart.animations.enabled, this.dynamicAnim = this.initialAnim && this.w.config.chart.animations.dynamicAnimation.enabled, this.animDur = 0, this.graphics = new P(this.w), this.lineColorArr = t.globals.stroke.colors !== void 0 ? t.globals.stroke.colors : t.globals.colors, this.defaultSize = t.globals.svgHeight < t.globals.svgWidth ? t.layout.gridHeight : t.layout.gridWidth, this.isLog = t.config.yaxis[0].logarithmic, this.logBase = t.config.yaxis[0].logBase, this.coreUtils = new V(this.w), this.maxValue = this.isLog ? this.coreUtils.getLogVal(this.logBase, t.globals.maxY, 0) : t.globals.maxY, this.minValue = this.isLog ? this.coreUtils.getLogVal(this.logBase, this.w.globals.minY, 0) : t.globals.minY, this.polygons = t.config.plotOptions.radar.polygons, this.strokeWidth = t.config.stroke.show ? t.config.stroke.width : 0, this.size = this.defaultSize / 2.1 - this.strokeWidth - t.config.chart.dropShadow.blur, t.config.xaxis.labels.show && (this.size = this.size - t.layout.xAxisLabelsWidth / 1.75), t.config.plotOptions.radar.size !== void 0 && (this.size = t.config.plotOptions.radar.size), this.dataRadiusOfPercent = [], this.dataRadius = [], this.angleArr = [], this.yaxisLabelsTextsPos = [];
  }
  draw(t) {
    const e = this.w, s = new st(this.w), i = [], a = new gt(this.w, this.ctx);
    t.length && (this.dataPointsLen = t[e.globals.maxValsInArrayIndex].length), this.disAngle = Math.PI * 2 / this.dataPointsLen;
    const o = e.layout.gridWidth / 2, r = e.layout.gridHeight / 2, n = o + e.config.plotOptions.radar.offsetX, l = r + e.config.plotOptions.radar.offsetY, c = this.graphics.group({
      class: "apexcharts-radar-series apexcharts-plot-series",
      transform: `translate(${n || 0}, ${l || 0})`
    });
    let h = [], d = null, p = null;
    if (this.yaxisLabels = this.graphics.group({
      class: "apexcharts-yaxis"
    }), t.forEach((g, f) => {
      const x = g.length === e.globals.dataPoints, m = this.graphics.group().attr({
        class: "apexcharts-series",
        "data:longestSeries": x,
        seriesName: L.escapeString(e.seriesData.seriesNames[f]),
        rel: f + 1,
        "data:realIndex": f
      });
      this.dataRadiusOfPercent[f] = [], this.dataRadius[f] = [], this.angleArr[f] = [], g.forEach((w, v) => {
        const C = Math.abs(this.maxValue - this.minValue);
        w = w - this.minValue, this.isLog && (w = this.coreUtils.getLogVal(this.logBase, w, 0)), this.dataRadiusOfPercent[f][v] = w / C, this.dataRadius[f][v] = this.dataRadiusOfPercent[f][v] * this.size, this.angleArr[f][v] = v * this.disAngle;
      }), h = this.getDataPointsPos(
        this.dataRadius[f],
        this.angleArr[f]
      );
      const u = this.createPaths(h, {
        x: 0,
        y: 0
      });
      d = this.graphics.group({
        class: "apexcharts-series-markers-wrap apexcharts-element-hidden"
      }), p = this.graphics.group({
        class: "apexcharts-datalabels",
        "data:realIndex": f
      }), e.globals.delayedElements.push({
        el: d.node,
        index: f
      });
      const y = {
        i: f,
        realIndex: f,
        animationDelay: f,
        initialSpeed: e.config.chart.animations.speed,
        dataChangeSpeed: e.config.chart.animations.dynamicAnimation.speed,
        className: "apexcharts-radar",
        shouldClipToGrid: !1,
        bindEventsOnPaths: !1,
        stroke: e.globals.stroke.colors[f],
        strokeLineCap: e.config.stroke.lineCap
      };
      let b = null;
      e.globals.previousPaths.length > 0 && (b = this.getPreviousPath(f));
      for (let w = 0; w < u.linePathsTo.length; w++) {
        const v = this.graphics.renderPaths(O(I({}, y), {
          pathFrom: b === null ? u.linePathsFrom[w] : b,
          pathTo: u.linePathsTo[w],
          strokeWidth: Array.isArray(this.strokeWidth) ? this.strokeWidth[f] : this.strokeWidth,
          fill: "none",
          drawShadow: !1
        }));
        m.add(v);
        const C = s.fillPath({
          seriesNumber: f
        }), D = this.graphics.renderPaths(O(I({}, y), {
          pathFrom: b === null ? u.areaPathsFrom[w] : b,
          pathTo: u.areaPathsTo[w],
          strokeWidth: 0,
          fill: C,
          drawShadow: !1
        }));
        if (e.config.chart.dropShadow.enabled) {
          const S = new Z(this.w), k = e.config.chart.dropShadow;
          S.dropShadow(
            D,
            Object.assign({}, k, { noUserSpaceOnUse: !0 }),
            f
          );
        }
        m.add(D);
      }
      g.forEach((w, v) => {
        const D = new xt(this.w, this.ctx).getMarkerConfig({
          cssClass: "apexcharts-marker",
          seriesIndex: f,
          dataPointIndex: v
        }), S = this.graphics.drawMarker(
          h[v].x,
          h[v].y,
          D
        );
        S.attr("rel", v), S.attr("j", v), S.attr("index", f), S.node.setAttribute("default-marker-size", D.pSize);
        const k = this.graphics.group({
          class: "apexcharts-series-markers"
        });
        k && k.add(S), d.add(k), m.add(d);
        const F = e.config.dataLabels;
        if (F.enabled) {
          const T = F.formatter(e.seriesData.series[f][v], {
            seriesIndex: f,
            dataPointIndex: v,
            w: e
          });
          a.plotDataLabelsText({
            x: h[v].x,
            y: h[v].y,
            text: T,
            textAnchor: "middle",
            i: f,
            j: f,
            parent: p,
            offsetCorrection: !1,
            dataLabelsConfig: I({}, F)
          });
        }
        m.add(p);
      }), i.push(m);
    }), this.drawPolygons({
      parent: c
    }), e.config.xaxis.labels.show) {
      const g = this.drawXAxisTexts();
      c.add(g);
    }
    return i.forEach((g) => {
      c.add(g);
    }), c.add(this.yaxisLabels), c;
  }
  drawPolygons(t) {
    const e = this.w, { parent: s } = t, i = new ke(this.w), a = e.globals.yAxisScale[0].result.reverse(), o = a.length, r = [], n = this.size / (o - 1);
    for (let h = 0; h < o; h++)
      r[h] = n * h;
    r.reverse();
    const l = [], c = [];
    r.forEach((h, d) => {
      const p = L.getPolygonPos(h, this.dataPointsLen);
      let g = "";
      p.forEach((f, x) => {
        if (d === 0) {
          const m = this.graphics.drawLine(
            f.x,
            f.y,
            0,
            0,
            Array.isArray(this.polygons.connectorColors) ? this.polygons.connectorColors[x] : this.polygons.connectorColors
          );
          c.push(m);
        }
        x === 0 && this.yaxisLabelsTextsPos.push({
          x: f.x,
          y: f.y
        }), g += f.x + "," + f.y + " ";
      }), l.push(g);
    }), l.forEach((h, d) => {
      const p = this.polygons.strokeColors, g = this.polygons.strokeWidth, f = this.graphics.drawPolygon(
        h,
        Array.isArray(p) ? p[d] : p,
        Array.isArray(g) ? g[d] : g,
        e.globals.radarPolygons.fill.colors[d]
      );
      s.add(f);
    }), c.forEach((h) => {
      s.add(h);
    }), e.config.yaxis[0].show && this.yaxisLabelsTextsPos.forEach((h, d) => {
      const p = i.drawYAxisTexts(h.x, h.y, d, a[d]);
      this.yaxisLabels.add(p);
    });
  }
  drawXAxisTexts() {
    const t = this.w, e = t.config.xaxis.labels, s = this.graphics.group({
      class: "apexcharts-xaxis"
    }), i = L.getPolygonPos(this.size, this.dataPointsLen);
    return t.labelData.labels.forEach((a, o) => {
      const r = t.config.xaxis.labels.formatter, n = new gt(this.w, this.ctx);
      if (i[o]) {
        const l = this.getTextPos(i[o], this.size), c = r(a, {
          seriesIndex: -1,
          dataPointIndex: o,
          w: t
        });
        n.plotDataLabelsText({
          x: l.newX,
          y: l.newY,
          text: c,
          textAnchor: l.textAnchor,
          i: o,
          j: o,
          parent: s,
          className: "apexcharts-xaxis-label",
          color: Array.isArray(e.style.colors) && e.style.colors[o] ? e.style.colors[o] : "#a8a8a8",
          dataLabelsConfig: I({
            textAnchor: l.textAnchor,
            dropShadow: { enabled: !1 }
          }, e),
          offsetCorrection: !1
        }).on("click", (d) => {
          if (typeof t.config.chart.events.xAxisLabelClick == "function") {
            const p = Object.assign({}, t, {
              labelIndex: o
            });
            t.config.chart.events.xAxisLabelClick(d, this.ctx, p);
          }
        });
      }
    }), s;
  }
  createPaths(t, e) {
    const s = [];
    let i = [];
    const a = [];
    let o = [];
    if (t.length) {
      i = [this.graphics.move(e.x, e.y)], o = [this.graphics.move(e.x, e.y)];
      let r = this.graphics.move(t[0].x, t[0].y), n = this.graphics.move(t[0].x, t[0].y);
      t.forEach((l, c) => {
        r += this.graphics.line(l.x, l.y), n += this.graphics.line(l.x, l.y), c === t.length - 1 && (r += "Z", n += "Z");
      }), s.push(r), a.push(n);
    }
    return {
      linePathsFrom: i,
      linePathsTo: s,
      areaPathsFrom: o,
      areaPathsTo: a
    };
  }
  getTextPos(t, e) {
    let i = "middle", a = t.x, o = t.y;
    return Math.abs(t.x) >= 10 ? t.x > 0 ? (i = "start", a += 10) : t.x < 0 && (i = "end", a -= 10) : i = "middle", Math.abs(t.y) >= e - 10 && (t.y < 0 ? o -= 10 : t.y > 0 && (o += 10)), {
      textAnchor: i,
      newX: a,
      newY: o
    };
  }
  getPreviousPath(t) {
    const e = this.w;
    let s = null;
    for (let i = 0; i < e.globals.previousPaths.length; i++) {
      const a = e.globals.previousPaths[i];
      a.paths.length > 0 && parseInt(a.realIndex, 10) === parseInt(t, 10) && typeof e.globals.previousPaths[i].paths[0] < "u" && (s = e.globals.previousPaths[i].paths[0].d);
    }
    return s;
  }
  getDataPointsPos(t, e, s = this.dataPointsLen) {
    t = t || [], e = e || [];
    const i = [];
    for (let a = 0; a < s; a++) {
      const o = {};
      o.x = t[a] * Math.sin(e[a]), o.y = -t[a] * Math.cos(e[a]), i.push(o);
    }
    return i;
  }
}
class Qs extends kt {
  constructor(t, e) {
    super(t, e), this.ctx = e, this.w = t, this.animBeginArr = [0], this.animDur = 0, this.startAngle = t.config.plotOptions.radialBar.startAngle, this.endAngle = t.config.plotOptions.radialBar.endAngle, this.totalAngle = Math.abs(
      t.config.plotOptions.radialBar.endAngle - t.config.plotOptions.radialBar.startAngle
    ), this.trackStartAngle = t.config.plotOptions.radialBar.track.startAngle, this.trackEndAngle = t.config.plotOptions.radialBar.track.endAngle, this.barLabels = this.w.config.plotOptions.radialBar.barLabels, this.donutDataLabels = this.w.config.plotOptions.radialBar.dataLabels, this.radialDataLabels = this.donutDataLabels, this.trackStartAngle || (this.trackStartAngle = this.startAngle), this.trackEndAngle || (this.trackEndAngle = this.endAngle), this.endAngle === 360 && (this.endAngle = 359.99), this.margin = parseInt(t.config.plotOptions.radialBar.track.margin, 10), this.onBarLabelClick = this.onBarLabelClick.bind(this);
  }
  draw(t) {
    const e = this.w, s = new P(this.w), i = s.group({
      class: "apexcharts-radialbar"
    });
    if (e.globals.noData)
      return i;
    const a = s.group(), o = this.defaultSize / 2, r = e.layout.gridWidth / 2;
    let n = this.defaultSize / 2.05;
    e.config.chart.sparkline.enabled || (n = n - e.config.stroke.width - e.config.chart.dropShadow.blur);
    const l = e.globals.fill.colors;
    if (e.config.plotOptions.radialBar.track.show) {
      const p = this.drawTracks({
        size: n,
        centerX: r,
        centerY: o,
        colorArr: l,
        series: t
      });
      a.add(p);
    }
    const c = this.drawArcs({
      size: n,
      centerX: r,
      centerY: o,
      colorArr: l,
      series: t
    });
    let h = 360;
    e.config.plotOptions.radialBar.startAngle < 0 && (h = this.totalAngle);
    const d = (360 - h) / 360;
    if (e.globals.radialSize = n - n * d, this.radialDataLabels.value.show) {
      const p = Math.max(
        this.radialDataLabels.value.offsetY,
        this.radialDataLabels.name.offsetY
      );
      e.globals.radialSize += p * d;
    }
    return a.add(c.g), e.config.plotOptions.radialBar.hollow.position === "front" && (c.g.add(c.elHollow), c.dataLabels && c.g.add(c.dataLabels)), i.add(a), i;
  }
  drawTracks(t) {
    const e = this.w, s = new P(this.w), i = s.group({
      class: "apexcharts-tracks"
    }), a = new Z(this.w), o = new st(this.w), r = this.getStrokeWidth(t);
    t.size = t.size - r / 2;
    for (let n = 0; n < t.series.length; n++) {
      const l = s.group({
        class: "apexcharts-radialbar-track apexcharts-track"
      });
      i.add(l), l.attr({
        rel: n + 1
      }), t.size = t.size - r - this.margin;
      const c = e.config.plotOptions.radialBar.track, h = o.fillPath({
        seriesNumber: 0,
        size: t.size,
        fillColors: Array.isArray(c.background) ? c.background[n] : c.background,
        solid: !0
      }), d = this.trackStartAngle;
      let p = this.trackEndAngle;
      Math.abs(p) + Math.abs(d) >= 360 && (p = 360 - Math.abs(this.startAngle) - 0.1);
      const g = s.drawPath({
        d: "",
        stroke: h,
        strokeWidth: r * parseInt(c.strokeWidth, 10) / 100,
        fill: "none",
        strokeOpacity: c.opacity,
        classes: "apexcharts-radialbar-area"
      });
      if (c.dropShadow.enabled) {
        const f = c.dropShadow;
        a.dropShadow(g, f);
      }
      l.add(g), g.attr("id", "apexcharts-radialbarTrack-" + n), this.animatePaths(g, {
        centerX: t.centerX,
        centerY: t.centerY,
        endAngle: p,
        startAngle: d,
        size: t.size,
        i: n,
        totalItems: 2,
        animBeginArr: 0,
        dur: 0,
        isTrack: !0
      });
    }
    return i;
  }
  drawArcs(t) {
    const e = this.w, s = new P(this.w), i = new st(this.w), a = new Z(this.w), o = s.group(), r = this.getStrokeWidth(t);
    t.size = t.size - r / 2;
    let n = e.config.plotOptions.radialBar.hollow.background;
    const l = t.size - r * t.series.length - this.margin * t.series.length - r * parseInt(e.config.plotOptions.radialBar.track.strokeWidth, 10) / 100 / 2, c = l - e.config.plotOptions.radialBar.hollow.margin;
    e.config.plotOptions.radialBar.hollow.image !== void 0 && (n = this.drawHollowImage(t, o, l, n));
    const h = this.drawHollow({
      size: c,
      centerX: t.centerX,
      centerY: t.centerY,
      fill: n || "transparent"
    });
    if (e.config.plotOptions.radialBar.hollow.dropShadow.enabled) {
      const f = e.config.plotOptions.radialBar.hollow.dropShadow;
      a.dropShadow(h, f);
    }
    let d = 1;
    !this.radialDataLabels.total.show && e.seriesData.series.length > 1 && (d = 0);
    let p = null;
    if (this.radialDataLabels.show) {
      const f = e.dom.Paper.findOne(
        ".apexcharts-datalabels-group"
      );
      p = this.renderInnerDataLabels(
        f,
        this.radialDataLabels,
        {
          hollowSize: l,
          centerX: t.centerX,
          centerY: t.centerY,
          opacity: d
        }
      );
    }
    e.config.plotOptions.radialBar.hollow.position === "back" && (o.add(h), p && o.add(p));
    let g = !1;
    e.config.plotOptions.radialBar.inverseOrder && (g = !0);
    for (let f = g ? t.series.length - 1 : 0; g ? f >= 0 : f < t.series.length; g ? f-- : f++) {
      const x = s.group({
        class: "apexcharts-series apexcharts-radial-series",
        seriesName: L.escapeString(e.seriesData.seriesNames[f])
      });
      o.add(x), x.attr({
        rel: f + 1,
        "data:realIndex": f
      }), U.addCollapsedClassToSeries(this.w, x, f), t.size = t.size - r - this.margin;
      const m = i.fillPath({
        seriesNumber: f,
        size: t.size,
        value: t.series[f]
      }), u = this.startAngle;
      let y;
      const b = L.negToZero(t.series[f] > 100 ? 100 : t.series[f]) / 100;
      let w = Math.round(this.totalAngle * b) + this.startAngle, v;
      e.globals.dataChanged && (y = this.startAngle, v = Math.round(
        this.totalAngle * L.negToZero(e.globals.previousPaths[f]) / 100
      ) + y), Math.abs(w) + Math.abs(u) > 360 && (w = w - 0.01), Math.abs(v) + Math.abs(y) > 360 && (v = v - 0.01);
      const S = w - u, k = Array.isArray(e.config.stroke.dashArray) ? e.config.stroke.dashArray[f] : e.config.stroke.dashArray, F = s.drawPath({
        d: "",
        stroke: m,
        strokeWidth: r,
        fill: "none",
        fillOpacity: e.config.fill.opacity,
        classes: "apexcharts-radialbar-area apexcharts-radialbar-slice-" + f,
        strokeDashArray: k
      }), T = u + S / 2, M = L.polarToCartesian(
        t.centerX,
        t.centerY,
        t.size,
        T
      );
      if (P.setAttrs(F.node, {
        "data:angle": S,
        "data:value": t.series[f],
        "data:cx": M.x,
        "data:cy": M.y
      }), e.config.chart.dropShadow.enabled) {
        const X = e.config.chart.dropShadow;
        a.dropShadow(F, X, f);
      }
      if (a.setSelectionFilter(F, 0, f), this.addListeners(F, this.radialDataLabels), x.add(F), F.attr({
        index: 0,
        j: f
      }), this.barLabels.enabled) {
        const X = L.polarToCartesian(
          t.centerX,
          t.centerY,
          t.size,
          u
        ), R = this.barLabels.formatter(e.seriesData.seriesNames[f], {
          seriesIndex: f,
          w: e
        }), Y = ["apexcharts-radialbar-label"];
        this.barLabels.onClick || Y.push("apexcharts-no-click");
        let z = this.barLabels.useSeriesColors ? e.globals.colors[f] : e.config.chart.foreColor;
        z || (z = e.config.chart.foreColor);
        const H = X.x + this.barLabels.offsetX, _ = X.y + this.barLabels.offsetY, $ = s.drawText({
          x: H,
          y: _,
          text: R,
          textAnchor: "end",
          dominantBaseline: "middle",
          fontFamily: this.barLabels.fontFamily,
          fontWeight: this.barLabels.fontWeight,
          fontSize: this.barLabels.fontSize,
          foreColor: z,
          cssClass: Y.join(" ")
        });
        $.on("click", this.onBarLabelClick), $.attr({
          rel: f + 1
        }), u !== 0 && $.attr({
          "transform-origin": `${H} ${_}`,
          transform: `rotate(${u} 0 0)`
        }), x.add($);
      }
      let E = 0;
      this.initialAnim && !e.globals.resized && !e.globals.dataChanged && (E = e.config.chart.animations.speed), e.globals.dataChanged && (E = e.config.chart.animations.dynamicAnimation.speed), this.animDur = E / (t.series.length * 1.2) + this.animDur, this.animBeginArr.push(this.animDur), this.animatePaths(F, {
        centerX: t.centerX,
        centerY: t.centerY,
        endAngle: w,
        startAngle: u,
        prevEndAngle: v,
        prevStartAngle: y,
        size: t.size,
        i: f,
        totalItems: 2,
        animBeginArr: this.animBeginArr,
        dur: E,
        shouldSetPrevPaths: !0
      });
    }
    return {
      g: o,
      elHollow: h,
      dataLabels: p
    };
  }
  drawHollow(t) {
    const s = new P(this.w).drawCircle(t.size * 2);
    return s.attr({
      class: "apexcharts-radialbar-hollow",
      cx: t.centerX,
      cy: t.centerY,
      r: t.size,
      fill: t.fill
    }), s;
  }
  drawHollowImage(t, e, s, i) {
    const a = this.w, o = new st(this.w), r = L.randomId(), n = a.config.plotOptions.radialBar.hollow.image;
    if (a.config.plotOptions.radialBar.hollow.imageClipped)
      o.clippedImgArea({
        width: s,
        height: s,
        image: n,
        patternID: `pattern${a.globals.cuid}${r}`
      }), i = `url(#pattern${a.globals.cuid}${r})`;
    else {
      const l = a.config.plotOptions.radialBar.hollow.imageWidth, c = a.config.plotOptions.radialBar.hollow.imageHeight;
      if (l === void 0 && c === void 0) {
        const h = a.dom.Paper.image(n, function(d) {
          this.move(
            t.centerX - d.width / 2 + a.config.plotOptions.radialBar.hollow.imageOffsetX,
            t.centerY - d.height / 2 + a.config.plotOptions.radialBar.hollow.imageOffsetY
          );
        });
        e.add(h);
      } else {
        const h = a.dom.Paper.image(n, function() {
          this.move(
            t.centerX - l / 2 + a.config.plotOptions.radialBar.hollow.imageOffsetX,
            t.centerY - c / 2 + a.config.plotOptions.radialBar.hollow.imageOffsetY
          ), this.size(l, c);
        });
        e.add(h);
      }
    }
    return i;
  }
  getStrokeWidth(t) {
    const e = this.w;
    return t.size * (100 - parseInt(e.config.plotOptions.radialBar.hollow.size, 10)) / 100 / (t.series.length + 1) - this.margin;
  }
  onBarLabelClick(t) {
    const e = parseInt(t.target.getAttribute("rel"), 10) - 1, s = this.barLabels.onClick, i = this.w;
    s && s(i.seriesData.seriesNames[e], { w: i, seriesIndex: e });
  }
}
class ti extends ft {
  draw(t, e) {
    const s = this.w, i = new P(this.w);
    this.rangeBarOptions = this.w.config.plotOptions.rangeBar, this.series = t, this.seriesRangeStart = s.rangeData.seriesRangeStart, this.seriesRangeEnd = s.rangeData.seriesRangeEnd, this.barHelpers.initVariables(t);
    const a = i.group({
      class: "apexcharts-rangebar-series apexcharts-plot-series"
    });
    for (let o = 0; o < t.length; o++) {
      let r, n;
      const l = s.globals.comboCharts ? e[o] : o, { columnGroupIndex: c } = this.barHelpers.getGroupIndex(l), h = i.group({
        class: "apexcharts-series",
        seriesName: L.escapeString(s.seriesData.seriesNames[l]),
        rel: o + 1,
        "data:realIndex": l
      });
      U.addCollapsedClassToSeries(this.w, h, l), t[o].length > 0 && (this.visibleI = this.visibleI + 1);
      let d = 0;
      this.yRatio.length > 1 && (this.yaxisIndex = s.globals.seriesYAxisReverseMap[l][0], d = l);
      const p = this.barHelpers.initialPositions(l), {
        y: g,
        zeroW: f,
        // zeroW is the baseline where 0 meets x axis
        x,
        xDivision: m,
        // xDivision is the GRIDWIDTH divided by number of datapoints (columns)
        yDivision: u,
        // yDivision is the GRIDHEIGHT divided by number of datapoints (bars)
        zeroH: y
        // zeroH is the baseline where 0 meets y axis
      } = p;
      let b = p.barWidth, w = p.barHeight;
      n = g, r = x;
      const v = i.group({
        class: "apexcharts-datalabels",
        "data:realIndex": l
      }), C = i.group({
        class: "apexcharts-rangebar-goals-markers"
      });
      for (let D = 0; D < s.globals.dataPoints; D++) {
        const S = this.barHelpers.getStrokeWidth(o, D, l), k = this.seriesRangeStart[o][D], F = this.seriesRangeEnd[o][D];
        let T = null, M = null, E = null;
        const X = { x: r, y: n, strokeWidth: S, elSeries: h };
        let R = this.seriesLen;
        if (s.config.plotOptions.bar.rangeBarGroupRows && (R = 1), typeof s.config.series[o].data[D] > "u")
          break;
        if (this.isHorizontal) {
          E = n + w * this.visibleI;
          const H = (u - w * R) / 2;
          if (s.config.series[o].data[D].x) {
            const _ = this.detectOverlappingBars({
              i: o,
              j: D,
              barYPosition: E,
              srty: H,
              barHeight: w,
              yDivision: u,
              initPositions: p
            });
            w = _.barHeight, E = _.barYPosition;
          }
          T = this.drawRangeBarPaths(I({
            indexes: { i: o, j: D, realIndex: l },
            barHeight: w,
            barYPosition: E,
            zeroW: f,
            yDivision: u,
            y1: k,
            y2: F
          }, X)), b = T.barWidth;
        } else {
          s.axisFlags.isXNumeric && (r = (s.seriesData.seriesX[o][D] - s.globals.minX) / this.xRatio - b / 2), M = r + b * this.visibleI;
          const H = (m - b * R) / 2;
          if (s.config.series[o].data[D].x) {
            const _ = this.detectOverlappingBars({
              i: o,
              j: D,
              barXPosition: M,
              srtx: H,
              barWidth: b,
              xDivision: m,
              initPositions: p
            });
            b = _.barWidth, M = _.barXPosition;
          }
          T = this.drawRangeColumnPaths(I({
            indexes: { i: o, j: D, realIndex: l, translationsIndex: d },
            barWidth: b,
            barXPosition: M,
            zeroH: y,
            xDivision: m
          }, X)), w = T.barHeight;
        }
        const Y = this.barHelpers.drawGoalLine({
          barXPosition: T.barXPosition,
          barYPosition: E,
          goalX: T.goalX,
          goalY: T.goalY,
          barHeight: w,
          barWidth: b
        });
        Y && C.add(Y), n = T.y, r = T.x;
        const z = this.barHelpers.getPathFillColor(t, o, D, l);
        this.renderSeries({
          realIndex: l,
          pathFill: z.color,
          lineFill: z.useRangeColor ? z.color : s.globals.stroke.colors[l],
          j: D,
          i: o,
          x: r,
          y: n,
          y1: k,
          y2: F,
          pathFrom: T.pathFrom,
          pathTo: T.pathTo,
          strokeWidth: S,
          elSeries: h,
          series: t,
          barHeight: w,
          barWidth: b,
          barXPosition: M,
          barYPosition: E,
          columnGroupIndex: c,
          elDataLabelsWrap: v,
          elGoalsMarkers: C,
          visibleSeries: this.visibleI,
          type: "rangebar"
        });
      }
      a.add(h);
    }
    return a;
  }
  detectOverlappingBars({
    i: t,
    j: e,
    barYPosition: s,
    barXPosition: i,
    srty: a,
    srtx: o,
    barHeight: r,
    barWidth: n,
    yDivision: l,
    xDivision: c,
    initPositions: h
  }) {
    const d = this.w;
    let p = [];
    const g = d.config.series[t].data[e].rangeName, f = d.config.series[t].data[e].x, x = Array.isArray(f) ? f.join(" ") : f, m = d.labelData.labels.map((y) => Array.isArray(y) ? y.join(" ") : y).indexOf(x), u = d.rangeData.seriesRange[t].findIndex(
      (y) => y.x === x && y.overlaps.length > 0
    );
    return this.isHorizontal ? (d.config.plotOptions.bar.rangeBarGroupRows ? s = a + l * m : s = a + r * this.visibleI + l * m, u > -1 && !d.config.plotOptions.bar.rangeBarOverlap && (p = d.rangeData.seriesRange[t][u].overlaps, p.indexOf(g) > -1 && (r = h.barHeight / p.length, s = r * this.visibleI + l * (100 - parseInt(this.barOptions.barHeight, 10)) / 100 / 2 + r * (this.visibleI + p.indexOf(g)) + l * m))) : (m > -1 && !d.labelData.timescaleLabels.length && (d.config.plotOptions.bar.rangeBarGroupRows ? i = o + c * m : i = o + n * this.visibleI + c * m), u > -1 && !d.config.plotOptions.bar.rangeBarOverlap && (p = d.rangeData.seriesRange[t][u].overlaps, p.indexOf(g) > -1 && (n = h.barWidth / p.length, i = n * this.visibleI + c * (100 - parseInt(this.barOptions.barWidth, 10)) / 100 / 2 + n * (this.visibleI + p.indexOf(g)) + c * m))), {
      barYPosition: s,
      barXPosition: i,
      barHeight: r,
      barWidth: n
    };
  }
  drawRangeColumnPaths({
    indexes: t,
    x: e,
    xDivision: s,
    barWidth: i,
    barXPosition: a,
    zeroH: o
  }) {
    const r = this.w, { i: n, j: l, realIndex: c, translationsIndex: h } = t, d = this.yRatio[h], p = this.getRangeValue(c, l);
    let g = Math.min(p.start, p.end), f = Math.max(p.start, p.end);
    typeof this.series[n][l] > "u" || this.series[n][l] === null ? g = o : (g = o - g / d, f = o - f / d);
    const x = Math.abs(f - g), m = this.barHelpers.getColumnPaths({
      barXPosition: a,
      barWidth: i,
      y1: g,
      y2: f,
      strokeWidth: this.strokeWidth,
      series: this.seriesRangeEnd,
      realIndex: c,
      i: c,
      j: l,
      w: r
    });
    if (!r.axisFlags.isXNumeric)
      e = e + s;
    else {
      const u = this.getBarXForNumericXAxis({
        x: e,
        j: l,
        realIndex: c,
        barWidth: i
      });
      e = u.x, a = u.barXPosition;
    }
    return {
      pathTo: m.pathTo,
      pathFrom: m.pathFrom,
      barHeight: x,
      x: e,
      y: p.start < 0 && p.end < 0 ? g : f,
      goalY: this.barHelpers.getGoalValues(
        "y",
        null,
        o,
        n,
        l,
        h
      ),
      barXPosition: a
    };
  }
  preventBarOverflow(t) {
    const e = this.w;
    return t < 0 && (t = 0), t > e.layout.gridWidth && (t = e.layout.gridWidth), t;
  }
  drawRangeBarPaths({
    indexes: t,
    y: e,
    y1: s,
    y2: i,
    yDivision: a,
    barHeight: o,
    barYPosition: r,
    zeroW: n
  }) {
    const l = this.w, { realIndex: c, j: h } = t, d = this.preventBarOverflow(n + s / this.invertedYRatio), p = this.preventBarOverflow(n + i / this.invertedYRatio), g = this.getRangeValue(c, h), f = Math.abs(p - d), x = this.barHelpers.getBarpaths({
      barYPosition: r,
      barHeight: o,
      x1: d,
      x2: p,
      strokeWidth: this.strokeWidth,
      series: this.seriesRangeEnd,
      i: c,
      realIndex: c,
      j: h,
      w: l
    });
    return l.axisFlags.isXNumeric || (e = e + a), {
      pathTo: x.pathTo,
      pathFrom: x.pathFrom,
      barWidth: f,
      x: g.start < 0 && g.end < 0 ? d : p,
      goalX: this.barHelpers.getGoalValues("x", n, null, c, h),
      y: e
    };
  }
  getRangeValue(t, e) {
    const s = this.w;
    return {
      start: s.rangeData.seriesRangeStart[t][e],
      end: s.rangeData.seriesRangeEnd[t][e]
    };
  }
}
function ae(A, t) {
  let e = 0;
  for (let a = 0; a < A.length; a++)
    e += A[a];
  const s = t / e, i = new Array(A.length);
  for (let a = 0; a < A.length; a++)
    i[a] = A[a] * s;
  return i;
}
function oe(A, t, e, s) {
  const i = s * s, a = e * e;
  return Math.max(
    i * t / a,
    a / (i * A)
  );
}
function ei(A, t, e, s, i, a) {
  if (A === 0)
    return !0;
  const o = oe(t, e, s, a), r = oe(
    Math.min(t, i),
    Math.max(e, i),
    s + i,
    a
  );
  return o >= r;
}
function re(A, t, e, s, i, a, o, r) {
  if (o >= r) {
    const n = s / r;
    let l = a;
    for (let c = 0; c < e; c++) {
      const h = t[c] / n;
      A.push([i, l, i + n, l + h]), l += h;
    }
  } else {
    const n = s / o;
    let l = i;
    for (let c = 0; c < e; c++) {
      const h = t[c] / n;
      A.push([l, a, l + h, a + n]), l += h;
    }
  }
}
function ne(A, t, e, s, i) {
  const a = [], o = A.length;
  if (o === 0)
    return a;
  const r = new Array(o);
  let n = 0, l = 0, c = 1 / 0, h = -1 / 0, d = 0;
  for (; d < o; ) {
    const p = Math.min(s, i), g = A[d];
    if (ei(n, c, h, l, g, p))
      r[n] = g, n++, l += g, g < c && (c = g), g > h && (h = g), d++;
    else {
      if (re(a, r, n, l, t, e, s, i), s >= i) {
        const f = l / i;
        t += f, s -= f;
      } else {
        const f = l / s;
        e += f, i -= f;
      }
      n = 0, l = 0, c = 1 / 0, h = -1 / 0;
    }
  }
  return n > 0 && re(a, r, n, l, t, e, s, i), a;
}
function si(A, t, e) {
  const s = A.length, i = new Array(s);
  for (let r = 0; r < s; r++) {
    let n = 0;
    const l = A[r];
    for (let c = 0; c < l.length; c++)
      n += l[c];
    i[r] = n;
  }
  const a = ne(
    ae(i, t * e),
    0,
    0,
    t,
    e
  ), o = new Array(s);
  for (let r = 0; r < s; r++) {
    const n = a[r], l = n[0], c = n[1], h = n[2] - l, d = n[3] - c;
    o[r] = ne(
      ae(A[r], h * d),
      l,
      c,
      h,
      d
    );
  }
  return o;
}
const ii = { generate: si };
class ai {
  constructor(t, e) {
    this.ctx = e, this.w = t, this.strokeWidth = this.w.config.stroke.width, this.helpers = new Se(t, e), this.dynamicAnim = this.w.config.chart.animations.dynamicAnimation, this.labels = [];
  }
  draw(t) {
    const e = this.w, s = new P(this.w, this.ctx), i = new st(this.w), a = s.group({
      class: "apexcharts-treemap"
    });
    if (e.globals.noData)
      return a;
    const o = [];
    return t.forEach((n) => {
      const l = n.map((c) => Math.abs(c));
      o.push(l);
    }), this.negRange = this.helpers.checkColorRange(), e.config.series.forEach((n, l) => {
      n.data.forEach((c) => {
        Array.isArray(this.labels[l]) || (this.labels[l] = []), this.labels[l].push(c.x);
      });
    }), ii.generate(
      o,
      e.layout.gridWidth,
      e.layout.gridHeight
    ).forEach((n, l) => {
      const c = s.group({
        class: "apexcharts-series apexcharts-treemap-series",
        seriesName: L.escapeString(e.seriesData.seriesNames[l]),
        rel: l + 1,
        "data:realIndex": l
      });
      if (s.setupEventDelegation(c, ".apexcharts-treemap-rect"), e.config.chart.dropShadow.enabled) {
        const g = e.config.chart.dropShadow;
        new Z(this.w).dropShadow(a, g, l);
      }
      const h = s.group({
        class: "apexcharts-data-labels"
      }), d = {
        xMin: 1 / 0,
        yMin: 1 / 0,
        xMax: -1 / 0,
        yMax: -1 / 0
      };
      n.forEach((g, f) => {
        const x = g[0], m = g[1], u = g[2], y = g[3];
        d.xMin = Math.min(d.xMin, x), d.yMin = Math.min(d.yMin, m), d.xMax = Math.max(d.xMax, u), d.yMax = Math.max(d.yMax, y);
        const b = this.helpers.getShadeColor(
          e.config.chart.type,
          l,
          f,
          this.negRange
        ), w = b.color, v = i.fillPath({
          color: w,
          seriesNumber: l,
          dataPointIndex: f
        }), C = s.drawRect(
          x,
          m,
          u - x,
          y - m,
          e.config.plotOptions.treemap.borderRadius,
          "#fff",
          1,
          this.strokeWidth,
          e.config.plotOptions.treemap.useFillColorAsStroke ? w : e.globals.stroke.colors[l]
        );
        C.attr({
          cx: x,
          cy: m,
          index: l,
          i: l,
          j: f,
          width: u - x,
          height: y - m,
          fill: v
        }), C.node.classList.add("apexcharts-treemap-rect");
        let D = {
          x: x + (u - x) / 2,
          y: m + (y - m) / 2,
          width: 0,
          height: 0
        };
        const S = {
          x,
          y: m,
          width: u - x,
          height: y - m
        };
        if (e.config.chart.animations.enabled && !e.globals.dataChanged) {
          let M = 1;
          e.globals.resized || (M = e.config.chart.animations.speed), this.animateTreemap(C, D, S, M);
        }
        if (e.globals.dataChanged) {
          let M = 1;
          this.dynamicAnim.enabled && e.globals.shouldAnimate && (M = this.dynamicAnim.speed, e.globals.previousPaths[l] && e.globals.previousPaths[l][f] && e.globals.previousPaths[l][f].rect && (D = e.globals.previousPaths[l][f].rect), this.animateTreemap(C, D, S, M));
        }
        let k = this.getFontSize(g), F = e.config.dataLabels.formatter(this.labels[l][f], {
          value: e.seriesData.series[l][f],
          seriesIndex: l,
          dataPointIndex: f,
          w: e
        });
        e.config.plotOptions.treemap.dataLabels.format === "truncate" && (k = parseInt(e.config.dataLabels.style.fontSize, 10), F = this.truncateLabels(
          F,
          k,
          x,
          m,
          u,
          y
        ));
        let T = null;
        e.seriesData.series[l][f] && (T = this.helpers.calculateDataLabels({
          text: F,
          x: (x + u) / 2,
          y: (m + y) / 2 + this.strokeWidth / 2 + k / 3,
          i: l,
          j: f,
          colorProps: b,
          fontSize: k,
          series: t
        })), e.config.dataLabels.enabled && T && this.rotateToFitLabel(
          T,
          k,
          F,
          x,
          m,
          u,
          y
        ), c.add(C), T !== null && c.add(T);
      });
      const p = e.config.plotOptions.treemap.seriesTitle;
      if (e.config.series.length > 1 && p && p.show) {
        const g = e.config.series[l].name || "";
        if (g && d.xMin < 1 / 0 && d.yMin < 1 / 0) {
          const {
            offsetX: f,
            offsetY: x,
            borderColor: m,
            borderWidth: u,
            borderRadius: y,
            style: b
          } = p, w = b.color || e.config.chart.foreColor, v = {
            left: b.padding.left,
            right: b.padding.right,
            top: b.padding.top,
            bottom: b.padding.bottom
          }, C = s.getTextRects(
            g,
            b.fontSize,
            b.fontFamily
          ), D = C.width + v.left + v.right, S = C.height + v.top + v.bottom, k = d.xMin + (f || 0), F = d.yMin + (x || 0), T = s.drawRect(
            k,
            F,
            D,
            S,
            y,
            b.background,
            1,
            u,
            m
          ), M = s.drawText({
            x: k + v.left,
            y: F + v.top + C.height * 0.75,
            text: g,
            fontSize: b.fontSize,
            fontFamily: b.fontFamily,
            fontWeight: b.fontWeight,
            foreColor: w,
            cssClass: b.cssClass || ""
          });
          c.add(T), c.add(M);
        }
      }
      c.add(h), a.add(c);
    }), a;
  }
  // This calculates a font-size based upon
  // average label length and the size of the box
  getFontSize(t) {
    const e = this.w;
    function s(r) {
      let n, l = 0;
      if (Array.isArray(r[0]))
        for (n = 0; n < r.length; n++)
          l += s(r[n]);
      else
        for (n = 0; n < r.length; n++)
          l += r[n].length;
      return l;
    }
    function i(r) {
      let n, l = 0;
      if (Array.isArray(r[0]))
        for (n = 0; n < r.length; n++)
          l += i(r[n]);
      else
        for (n = 0; n < r.length; n++)
          l += 1;
      return l;
    }
    const a = s(this.labels) / i(this.labels);
    function o(r, n) {
      const l = r * n, c = Math.pow(l, 0.5);
      return Math.min(
        c / a,
        parseInt(e.config.dataLabels.style.fontSize, 10)
      );
    }
    return o(
      t[2] - t[0],
      t[3] - t[1]
    );
  }
  rotateToFitLabel(t, e, s, i, a, o, r) {
    const n = new P(this.w), l = n.getTextRects(s, e);
    if (l.width + this.w.config.stroke.width + 5 > o - i && l.width <= r - a) {
      const c = n.rotateAroundCenter(t.node);
      t.node.setAttribute(
        "transform",
        `rotate(-90 ${c.x} ${c.y}) translate(${l.height / 3})`
      );
    }
  }
  // This is an alternative label formatting method that uses a
  // consistent font size, and trims the edge of long labels
  truncateLabels(t, e, s, i, a, o) {
    const r = new P(this.w), l = r.getTextRects(t, e).width + this.w.config.stroke.width + 5 > a - s && o - i > a - s ? o - i : a - s, c = r.getTextBasedOnMaxWidth({
      text: t,
      maxWidth: l,
      fontSize: e
    });
    return t.length !== c.length && l / e < 5 ? "" : c;
  }
  animateTreemap(t, e, s, i) {
    const a = new ut(this.w);
    a.animateRect(t, e, s, i, () => {
      a.animationCompleted(t);
    });
  }
}
K.use({
  line: mt,
  area: mt,
  scatter: mt,
  bubble: mt,
  rangeArea: mt,
  bar: ft,
  column: ft,
  barStacked: Vs,
  rangeBar: ti,
  candlestick: se,
  boxPlot: se,
  pie: kt,
  donut: kt,
  polarArea: kt,
  radialBar: Qs,
  radar: Js,
  heatmap: Us,
  treemap: ai
});
class Mt {
  /**
   * Render chart to SVG string for server-side rendering
   *
   * @param {object} options - Chart configuration (same as ApexCharts constructor)
   * @param {object} ssrOptions - SSR-specific options
   * @param {number} ssrOptions.width - Chart width in pixels (default: 400)
   * @param {number} ssrOptions.height - Chart height in pixels (default: 300)
   * @param {number} ssrOptions.scale - SVG scale factor (default: 1)
   * @returns {Promise<string>} SVG string
   *
   * @example
   * const svgString = await SSRRenderer.renderToString({
   *   series: [{ data: [30, 40, 35] }],
   *   chart: { type: 'bar' }
   * }, {
   *   width: 500,
   *   height: 300
   * });
   */
  static renderToString(t) {
    return Ut(this, arguments, function* (e, s = {}) {
      B.isSSR() && N.init();
      const { width: i = 400, height: a = 300, scale: o = 1 } = s, r = this._createVirtualElement(i, a), n = O(I({}, e), {
        chart: O(I({}, e.chart), {
          width: i,
          height: a,
          // Disable interactive features for SSR
          toolbar: { show: !1 },
          animations: { enabled: !1 }
        })
      }), l = new K(r, n);
      try {
        yield l.render();
        const c = this._extractSVGString(l, o);
        return l.destroy(), c;
      } catch (c) {
        throw l.destroy(), new Error(`SSR rendering failed: ${c.message}`);
      }
    });
  }
  /**
   * Generate hydration-ready HTML with embedded configuration
   *
   * @param {object} options - Chart configuration
   * @param {object} ssrOptions - SSR-specific options
   * @param {number} ssrOptions.width - Chart width in pixels (default: 400)
   * @param {number} ssrOptions.height - Chart height in pixels (default: 300)
   * @param {number} ssrOptions.scale - SVG scale factor (default: 1)
   * @param {string} ssrOptions.className - Additional CSS class for wrapper (default: '')
   * @returns {Promise<string>} HTML string with SVG and hydration data
   *
   * @example
   * const html = await SSRRenderer.renderToHTML({
   *   series: [{ data: [30, 40, 35] }],
   *   chart: { type: 'bar' }
   * }, {
   *   width: 500,
   *   height: 300
   * });
   */
  static renderToHTML(t) {
    return Ut(this, arguments, function* (e, s = {}) {
      const { className: i = "" } = s, a = yield this.renderToString(e, s), o = this._encodeConfig(e);
      return `<div class="${`apexcharts-ssr-wrapper${i ? " " + i : ""}`}" data-apexcharts-hydrate data-apexcharts-config="${o}">
${a}
</div>`;
    });
  }
  /**
   * Create a virtual DOM element for SSR rendering
   * @private
   */
  static _createVirtualElement(t, e) {
    if (B.isBrowser()) {
      const s = document.createElement("div");
      return s.style.width = `${t}px`, s.style.height = `${e}px`, s;
    }
    return {
      _ssrWidth: t,
      _ssrHeight: e,
      _ssrMode: !0,
      nodeType: 1,
      nodeName: "DIV",
      children: [],
      style: {},
      classList: {
        add: () => {
        },
        remove: () => {
        },
        contains: () => !1
      },
      appendChild(s) {
        this.children.push(s);
      },
      removeChild(s) {
        const i = this.children.indexOf(s);
        i > -1 && this.children.splice(i, 1);
      },
      querySelector() {
        return null;
      },
      querySelectorAll() {
        return [];
      },
      getElementsByClassName() {
        return [];
      },
      getAttribute() {
        return null;
      },
      setAttribute() {
      },
      removeAttribute() {
      },
      hasAttribute() {
        return !1;
      },
      getBoundingClientRect() {
        return {
          width: this._ssrWidth,
          height: this._ssrHeight,
          top: 0,
          left: 0,
          right: this._ssrWidth,
          bottom: this._ssrHeight,
          x: 0,
          y: 0
        };
      },
      get parentNode() {
        return null;
      },
      get isConnected() {
        return !0;
      },
      getRootNode() {
        return this;
      }
    };
  }
  /**
   * Extract SVG string from rendered chart
   * @private
   */
  static _extractSVGString(t, e = 1) {
    const s = t.w;
    if (!s || !s.dom || !s.dom.Paper)
      throw new Error("Chart not properly initialized");
    const i = s.dom.Paper.node;
    if (B.isBrowser() && i instanceof SVGElement) {
      let o = new XMLSerializer().serializeToString(i);
      return e !== 1 && (o = this._applyScale(o, e)), o;
    }
    if (i && typeof i.toString == "function") {
      let a = i.toString();
      return e !== 1 && (a = this._applyScale(a, e)), a;
    }
    throw new Error("Unable to extract SVG string from chart");
  }
  /**
   * Apply scale transformation to SVG string
   * @private
   */
  static _applyScale(t, e) {
    const s = t.match(/width="([^"]+)"/), i = t.match(/height="([^"]+)"/);
    if (s && i) {
      const a = parseFloat(s[1]), o = parseFloat(i[1]), r = a * e, n = o * e;
      t = t.replace(/width="[^"]+"/, `width="${r}"`).replace(/height="[^"]+"/, `height="${n}"`);
    }
    return t;
  }
  /**
   * Encode configuration for client-side hydration
   * @private
   */
  static _encodeConfig(t) {
    try {
      const e = JSON.stringify(t);
      return typeof Buffer < "u" ? Buffer.from(e).toString("base64") : typeof btoa < "u" ? btoa(e) : encodeURIComponent(e);
    } catch (e) {
      throw new Error(`Failed to encode config: ${e.message}`);
    }
  }
  /**
   * Decode configuration from hydration data
   * @private
   */
  static _decodeConfig(t) {
    try {
      let e;
      return typeof Buffer < "u" ? e = Buffer.from(t, "base64").toString("utf-8") : typeof atob < "u" ? e = atob(t) : e = decodeURIComponent(t), JSON.parse(e);
    } catch (e) {
      throw new Error(`Failed to decode config: ${e.message}`);
    }
  }
}
class pt {
  /**
   * Hydrate a single server-rendered chart
   *
   * @param {HTMLElement} el - Container element with data-apexcharts-hydrate attribute
   * @param {object} clientOptions - Optional config overrides for client-side (e.g., enable animations)
   * @returns {ApexCharts} Hydrated chart instance
   *
   * @example
   * // Hydrate with default settings
   * const chart = Hydration.hydrate(document.getElementById('my-chart'));
   *
   * @example
   * // Hydrate with custom options
   * const chart = Hydration.hydrate(element, {
   *   chart: {
   *     animations: { enabled: true, speed: 800 }
   *   }
   * });
   */
  static hydrate(t, e = {}) {
    if (!B.isBrowser())
      throw new Error("Hydration can only be performed in browser environment");
    if (!t)
      throw new Error("Element is required for hydration");
    if (!t.hasAttribute("data-apexcharts-hydrate"))
      throw new Error("Element does not have data-apexcharts-hydrate attribute");
    const s = t.getAttribute("data-apexcharts-config");
    if (!s)
      throw new Error("Element is missing data-apexcharts-config attribute");
    const i = this._decodeConfig(s), a = this._mergeConfigs(i, e), o = t.innerHTML, r = new K(t, a), n = t.getBoundingClientRect();
    return t.style.width = `${n.width}px`, t.style.height = `${n.height}px`, t.innerHTML = "", t.removeAttribute("data-apexcharts-hydrate"), t.removeAttribute("data-apexcharts-config"), r.render().then(() => {
      t.setAttribute("data-apexcharts-hydrated", "true"), t.style.width = "", t.style.height = "";
      const l = new CustomEvent("apexcharts:hydrated", {
        detail: { chart: r, ssrContent: o }
      });
      t.dispatchEvent(l);
    }).catch((l) => {
      throw console.error("ApexCharts hydration failed:", l), t.innerHTML = o, t.setAttribute("data-apexcharts-hydrate", ""), t.setAttribute("data-apexcharts-config", s), l;
    }), r;
  }
  /**
   * Auto-hydrate all server-rendered charts on the page
   *
   * @param {string} selector - CSS selector for containers (default: '[data-apexcharts-hydrate]')
   * @param {object} clientOptions - Optional config overrides applied to all charts
   * @returns {ApexCharts[]} Array of hydrated chart instances
   *
   * @example
   * // Hydrate all charts on page load
   * document.addEventListener('DOMContentLoaded', () => {
   *   ApexCharts.hydrateAll();
   * });
   *
   * @example
   * // Hydrate with animations enabled
   * ApexCharts.hydrateAll('[data-apexcharts-hydrate]', {
   *   chart: { animations: { enabled: true } }
   * });
   */
  static hydrateAll(t = "[data-apexcharts-hydrate]", e = {}) {
    if (!B.isBrowser())
      throw new Error("Hydration can only be performed in browser environment");
    const s = document.querySelectorAll(t);
    if (s.length === 0)
      return console.warn(`No elements found matching selector: ${t}`), [];
    const i = [];
    return s.forEach((a) => {
      try {
        const o = this.hydrate(a, e);
        i.push(o);
      } catch (o) {
        console.error("Failed to hydrate element:", a, o);
      }
    }), i;
  }
  /**
   * Check if an element has been hydrated
   *
   * @param {HTMLElement} el - Element to check
   * @returns {boolean} True if element has been hydrated
   */
  static isHydrated(t) {
    return t ? t.hasAttribute("data-apexcharts-hydrated") : !1;
  }
  /**
   * Decode configuration from base64-encoded data attribute
   * @private
   */
  static _decodeConfig(t) {
    try {
      let e;
      return typeof atob < "u" ? e = atob(t) : typeof Buffer < "u" ? e = Buffer.from(t, "base64").toString("utf-8") : e = decodeURIComponent(t), JSON.parse(e);
    } catch (e) {
      throw new Error(`Failed to decode chart config: ${e.message}`);
    }
  }
  /**
   * Merge SSR configuration with client-side overrides
   * @private
   */
  static _mergeConfigs(t, e) {
    var s, i, a;
    const o = I(I({}, t), e);
    return (t.chart || e.chart) && (o.chart = I(I({}, t.chart), e.chart), (o.chart.animations === void 0 || o.chart.animations.enabled === !1) && (o.chart.animations = O(I({}, o.chart.animations || {}), {
      enabled: !0
    })), ((s = e.chart) == null ? void 0 : s.toolbar) === void 0 && ((a = (i = t.chart) == null ? void 0 : i.toolbar) == null ? void 0 : a.show) === !1 && (o.chart.toolbar = O(I({}, o.chart.toolbar || {}), {
      show: !0
    }))), o;
  }
}
K.renderToString = Mt.renderToString.bind(Mt);
K.renderToHTML = Mt.renderToHTML.bind(Mt);
K.hydrate = pt.hydrate.bind(pt);
K.hydrateAll = pt.hydrateAll.bind(pt);
K.isHydrated = pt.isHydrated.bind(pt);
export {
  pt as Hydration,
  Mt as SSRRenderer,
  K as default
};
