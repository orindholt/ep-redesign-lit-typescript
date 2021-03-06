/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const t =
    window.ShadowRoot &&
    (void 0 === window.ShadyCSS || window.ShadyCSS.nativeShadow) &&
    'adoptedStyleSheets' in Document.prototype &&
    'replace' in CSSStyleSheet.prototype,
  e = Symbol(),
  s = new Map();
class i {
  constructor(t, s) {
    if (((this._$cssResult$ = !0), s !== e))
      throw Error(
        'CSSResult is not constructable. Use `unsafeCSS` or `css` instead.'
      );
    this.cssText = t;
  }
  get styleSheet() {
    let e = s.get(this.cssText);
    return (
      t &&
        void 0 === e &&
        (s.set(this.cssText, (e = new CSSStyleSheet())),
        e.replaceSync(this.cssText)),
      e
    );
  }
  toString() {
    return this.cssText;
  }
}
const o = (t, ...s) => {
    const o =
      1 === t.length
        ? t[0]
        : s.reduce(
            (e, s, i) =>
              e +
              ((t) => {
                if (!0 === t._$cssResult$) return t.cssText;
                if ('number' == typeof t) return t;
                throw Error(
                  "Value passed to 'css' function must be a 'css' function result: " +
                    t +
                    ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security."
                );
              })(s) +
              t[i + 1],
            t[0]
          );
    return new i(o, e);
  },
  n = t
    ? (t) => t
    : (t) =>
        t instanceof CSSStyleSheet
          ? ((t) => {
              let s = '';
              for (const e of t.cssRules) s += e.cssText;
              return ((t) => new i('string' == typeof t ? t : t + '', e))(s);
            })(t)
          : t;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */ var r;
const l = window.trustedTypes,
  a = l ? l.emptyScript : '',
  h = window.reactiveElementPolyfillSupport,
  c = {
    toAttribute(t, e) {
      switch (e) {
        case Boolean:
          t = t ? a : null;
          break;
        case Object:
        case Array:
          t = null == t ? t : JSON.stringify(t);
      }
      return t;
    },
    fromAttribute(t, e) {
      let s = t;
      switch (e) {
        case Boolean:
          s = null !== t;
          break;
        case Number:
          s = null === t ? null : Number(t);
          break;
        case Object:
        case Array:
          try {
            s = JSON.parse(t);
          } catch (t) {
            s = null;
          }
      }
      return s;
    },
  },
  d = (t, e) => e !== t && (e == e || t == t),
  u = {attribute: !0, type: String, converter: c, reflect: !1, hasChanged: d};
class p extends HTMLElement {
  constructor() {
    super(),
      (this._$Et = new Map()),
      (this.isUpdatePending = !1),
      (this.hasUpdated = !1),
      (this._$Ei = null),
      this.o();
  }
  static addInitializer(t) {
    var e;
    (null !== (e = this.l) && void 0 !== e) || (this.l = []), this.l.push(t);
  }
  static get observedAttributes() {
    this.finalize();
    const t = [];
    return (
      this.elementProperties.forEach((e, s) => {
        const i = this._$Eh(s, e);
        void 0 !== i && (this._$Eu.set(i, s), t.push(i));
      }),
      t
    );
  }
  static createProperty(t, e = u) {
    if (
      (e.state && (e.attribute = !1),
      this.finalize(),
      this.elementProperties.set(t, e),
      !e.noAccessor && !this.prototype.hasOwnProperty(t))
    ) {
      const s = 'symbol' == typeof t ? Symbol() : '__' + t,
        i = this.getPropertyDescriptor(t, s, e);
      void 0 !== i && Object.defineProperty(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    return {
      get() {
        return this[e];
      },
      set(i) {
        const o = this[t];
        (this[e] = i), this.requestUpdate(t, o, s);
      },
      configurable: !0,
      enumerable: !0,
    };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) || u;
  }
  static finalize() {
    if (this.hasOwnProperty('finalized')) return !1;
    this.finalized = !0;
    const t = Object.getPrototypeOf(this);
    if (
      (t.finalize(),
      (this.elementProperties = new Map(t.elementProperties)),
      (this._$Eu = new Map()),
      this.hasOwnProperty('properties'))
    ) {
      const t = this.properties,
        e = [
          ...Object.getOwnPropertyNames(t),
          ...Object.getOwnPropertySymbols(t),
        ];
      for (const s of e) this.createProperty(s, t[s]);
    }
    return (this.elementStyles = this.finalizeStyles(this.styles)), !0;
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const t of s) e.unshift(n(t));
    } else void 0 !== t && e.push(n(t));
    return e;
  }
  static _$Eh(t, e) {
    const s = e.attribute;
    return !1 === s
      ? void 0
      : 'string' == typeof s
      ? s
      : 'string' == typeof t
      ? t.toLowerCase()
      : void 0;
  }
  o() {
    var t;
    (this._$Ep = new Promise((t) => (this.enableUpdating = t))),
      (this._$AL = new Map()),
      this._$Em(),
      this.requestUpdate(),
      null === (t = this.constructor.l) ||
        void 0 === t ||
        t.forEach((t) => t(this));
  }
  addController(t) {
    var e, s;
    (null !== (e = this._$Eg) && void 0 !== e ? e : (this._$Eg = [])).push(t),
      void 0 !== this.renderRoot &&
        this.isConnected &&
        (null === (s = t.hostConnected) || void 0 === s || s.call(t));
  }
  removeController(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.splice(this._$Eg.indexOf(t) >>> 0, 1);
  }
  _$Em() {
    this.constructor.elementProperties.forEach((t, e) => {
      this.hasOwnProperty(e) && (this._$Et.set(e, this[e]), delete this[e]);
    });
  }
  createRenderRoot() {
    var e;
    const s =
      null !== (e = this.shadowRoot) && void 0 !== e
        ? e
        : this.attachShadow(this.constructor.shadowRootOptions);
    return (
      ((e, s) => {
        t
          ? (e.adoptedStyleSheets = s.map((t) =>
              t instanceof CSSStyleSheet ? t : t.styleSheet
            ))
          : s.forEach((t) => {
              const s = document.createElement('style'),
                i = window.litNonce;
              void 0 !== i && s.setAttribute('nonce', i),
                (s.textContent = t.cssText),
                e.appendChild(s);
            });
      })(s, this.constructor.elementStyles),
      s
    );
  }
  connectedCallback() {
    var t;
    void 0 === this.renderRoot && (this.renderRoot = this.createRenderRoot()),
      this.enableUpdating(!0),
      null === (t = this._$Eg) ||
        void 0 === t ||
        t.forEach((t) => {
          var e;
          return null === (e = t.hostConnected) || void 0 === e
            ? void 0
            : e.call(t);
        });
  }
  enableUpdating(t) {}
  disconnectedCallback() {
    var t;
    null === (t = this._$Eg) ||
      void 0 === t ||
      t.forEach((t) => {
        var e;
        return null === (e = t.hostDisconnected) || void 0 === e
          ? void 0
          : e.call(t);
      });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$ES(t, e, s = u) {
    var i, o;
    const n = this.constructor._$Eh(t, s);
    if (void 0 !== n && !0 === s.reflect) {
      const r = (
        null !==
          (o =
            null === (i = s.converter) || void 0 === i
              ? void 0
              : i.toAttribute) && void 0 !== o
          ? o
          : c.toAttribute
      )(e, s.type);
      (this._$Ei = t),
        null == r ? this.removeAttribute(n) : this.setAttribute(n, r),
        (this._$Ei = null);
    }
  }
  _$AK(t, e) {
    var s, i, o;
    const n = this.constructor,
      r = n._$Eu.get(t);
    if (void 0 !== r && this._$Ei !== r) {
      const t = n.getPropertyOptions(r),
        l = t.converter,
        a =
          null !==
            (o =
              null !==
                (i =
                  null === (s = l) || void 0 === s
                    ? void 0
                    : s.fromAttribute) && void 0 !== i
                ? i
                : 'function' == typeof l
                ? l
                : null) && void 0 !== o
            ? o
            : c.fromAttribute;
      (this._$Ei = r), (this[r] = a(e, t.type)), (this._$Ei = null);
    }
  }
  requestUpdate(t, e, s) {
    let i = !0;
    void 0 !== t &&
      (((s = s || this.constructor.getPropertyOptions(t)).hasChanged || d)(
        this[t],
        e
      )
        ? (this._$AL.has(t) || this._$AL.set(t, e),
          !0 === s.reflect &&
            this._$Ei !== t &&
            (void 0 === this._$E_ && (this._$E_ = new Map()),
            this._$E_.set(t, s)))
        : (i = !1)),
      !this.isUpdatePending && i && (this._$Ep = this._$EC());
  }
  async _$EC() {
    this.isUpdatePending = !0;
    try {
      await this._$Ep;
    } catch (t) {
      Promise.reject(t);
    }
    const t = this.scheduleUpdate();
    return null != t && (await t), !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var t;
    if (!this.isUpdatePending) return;
    this.hasUpdated,
      this._$Et &&
        (this._$Et.forEach((t, e) => (this[e] = t)), (this._$Et = void 0));
    let e = !1;
    const s = this._$AL;
    try {
      (e = this.shouldUpdate(s)),
        e
          ? (this.willUpdate(s),
            null === (t = this._$Eg) ||
              void 0 === t ||
              t.forEach((t) => {
                var e;
                return null === (e = t.hostUpdate) || void 0 === e
                  ? void 0
                  : e.call(t);
              }),
            this.update(s))
          : this._$EU();
    } catch (t) {
      throw ((e = !1), this._$EU(), t);
    }
    e && this._$AE(s);
  }
  willUpdate(t) {}
  _$AE(t) {
    var e;
    null === (e = this._$Eg) ||
      void 0 === e ||
      e.forEach((t) => {
        var e;
        return null === (e = t.hostUpdated) || void 0 === e
          ? void 0
          : e.call(t);
      }),
      this.hasUpdated || ((this.hasUpdated = !0), this.firstUpdated(t)),
      this.updated(t);
  }
  _$EU() {
    (this._$AL = new Map()), (this.isUpdatePending = !1);
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Ep;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    void 0 !== this._$E_ &&
      (this._$E_.forEach((t, e) => this._$ES(e, this[e], t)),
      (this._$E_ = void 0)),
      this._$EU();
  }
  updated(t) {}
  firstUpdated(t) {}
}
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var f;
(p.finalized = !0),
  (p.elementProperties = new Map()),
  (p.elementStyles = []),
  (p.shadowRootOptions = {mode: 'open'}),
  null == h || h({ReactiveElement: p}),
  (null !== (r = globalThis.reactiveElementVersions) && void 0 !== r
    ? r
    : (globalThis.reactiveElementVersions = [])
  ).push('1.2.2');
const g = globalThis.trustedTypes,
  m = g ? g.createPolicy('lit-html', {createHTML: (t) => t}) : void 0,
  v = `lit$${(Math.random() + '').slice(9)}$`,
  $ = '?' + v,
  y = `<${$}>`,
  b = document,
  _ = (t = '') => b.createComment(t),
  A = (t) => null === t || ('object' != typeof t && 'function' != typeof t),
  w = Array.isArray,
  x = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,
  S = /-->/g,
  E = />/g,
  C =
    />|[ 	\n\r](?:([^\s"'>=/]+)([ 	\n\r]*=[ 	\n\r]*(?:[^ 	\n\r"'`<>=]|("|')|))|$)/g,
  k = /'/g,
  R = /"/g,
  P = /^(?:script|style|textarea|title)$/i,
  U = (
    (t) =>
    (e, ...s) => ({_$litType$: t, strings: e, values: s})
  )(1),
  T = Symbol.for('lit-noChange'),
  H = Symbol.for('lit-nothing'),
  L = new WeakMap(),
  N = b.createTreeWalker(b, 129, null, !1),
  M = (t, e) => {
    const s = t.length - 1,
      i = [];
    let o,
      n = 2 === e ? '<svg>' : '',
      r = x;
    for (let e = 0; e < s; e++) {
      const s = t[e];
      let l,
        a,
        h = -1,
        c = 0;
      for (; c < s.length && ((r.lastIndex = c), (a = r.exec(s)), null !== a); )
        (c = r.lastIndex),
          r === x
            ? '!--' === a[1]
              ? (r = S)
              : void 0 !== a[1]
              ? (r = E)
              : void 0 !== a[2]
              ? (P.test(a[2]) && (o = RegExp('</' + a[2], 'g')), (r = C))
              : void 0 !== a[3] && (r = C)
            : r === C
            ? '>' === a[0]
              ? ((r = null != o ? o : x), (h = -1))
              : void 0 === a[1]
              ? (h = -2)
              : ((h = r.lastIndex - a[2].length),
                (l = a[1]),
                (r = void 0 === a[3] ? C : '"' === a[3] ? R : k))
            : r === R || r === k
            ? (r = C)
            : r === S || r === E
            ? (r = x)
            : ((r = C), (o = void 0));
      const d = r === C && t[e + 1].startsWith('/>') ? ' ' : '';
      n +=
        r === x
          ? s + y
          : h >= 0
          ? (i.push(l), s.slice(0, h) + '$lit$' + s.slice(h) + v + d)
          : s + v + (-2 === h ? (i.push(void 0), e) : d);
    }
    const l = n + (t[s] || '<?>') + (2 === e ? '</svg>' : '');
    if (!Array.isArray(t) || !t.hasOwnProperty('raw'))
      throw Error('invalid template strings array');
    return [void 0 !== m ? m.createHTML(l) : l, i];
  };
class O {
  constructor({strings: t, _$litType$: e}, s) {
    let i;
    this.parts = [];
    let o = 0,
      n = 0;
    const r = t.length - 1,
      l = this.parts,
      [a, h] = M(t, e);
    if (
      ((this.el = O.createElement(a, s)),
      (N.currentNode = this.el.content),
      2 === e)
    ) {
      const t = this.el.content,
        e = t.firstChild;
      e.remove(), t.append(...e.childNodes);
    }
    for (; null !== (i = N.nextNode()) && l.length < r; ) {
      if (1 === i.nodeType) {
        if (i.hasAttributes()) {
          const t = [];
          for (const e of i.getAttributeNames())
            if (e.endsWith('$lit$') || e.startsWith(v)) {
              const s = h[n++];
              if ((t.push(e), void 0 !== s)) {
                const t = i.getAttribute(s.toLowerCase() + '$lit$').split(v),
                  e = /([.?@])?(.*)/.exec(s);
                l.push({
                  type: 1,
                  index: o,
                  name: e[2],
                  strings: t,
                  ctor:
                    '.' === e[1] ? I : '?' === e[1] ? V : '@' === e[1] ? W : j,
                });
              } else l.push({type: 6, index: o});
            }
          for (const e of t) i.removeAttribute(e);
        }
        if (P.test(i.tagName)) {
          const t = i.textContent.split(v),
            e = t.length - 1;
          if (e > 0) {
            i.textContent = g ? g.emptyScript : '';
            for (let s = 0; s < e; s++)
              i.append(t[s], _()), N.nextNode(), l.push({type: 2, index: ++o});
            i.append(t[e], _());
          }
        }
      } else if (8 === i.nodeType)
        if (i.data === $) l.push({type: 2, index: o});
        else {
          let t = -1;
          for (; -1 !== (t = i.data.indexOf(v, t + 1)); )
            l.push({type: 7, index: o}), (t += v.length - 1);
        }
      o++;
    }
  }
  static createElement(t, e) {
    const s = b.createElement('template');
    return (s.innerHTML = t), s;
  }
}
function B(t, e, s = t, i) {
  var o, n, r, l;
  if (e === T) return e;
  let a =
    void 0 !== i
      ? null === (o = s._$Cl) || void 0 === o
        ? void 0
        : o[i]
      : s._$Cu;
  const h = A(e) ? void 0 : e._$litDirective$;
  return (
    (null == a ? void 0 : a.constructor) !== h &&
      (null === (n = null == a ? void 0 : a._$AO) ||
        void 0 === n ||
        n.call(a, !1),
      void 0 === h ? (a = void 0) : ((a = new h(t)), a._$AT(t, s, i)),
      void 0 !== i
        ? ((null !== (r = (l = s)._$Cl) && void 0 !== r ? r : (l._$Cl = []))[
            i
          ] = a)
        : (s._$Cu = a)),
    void 0 !== a && (e = B(t, a._$AS(t, e.values), a, i)),
    e
  );
}
class q {
  constructor(t, e) {
    (this.v = []), (this._$AN = void 0), (this._$AD = t), (this._$AM = e);
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  p(t) {
    var e;
    const {
        el: {content: s},
        parts: i,
      } = this._$AD,
      o = (
        null !== (e = null == t ? void 0 : t.creationScope) && void 0 !== e
          ? e
          : b
      ).importNode(s, !0);
    N.currentNode = o;
    let n = N.nextNode(),
      r = 0,
      l = 0,
      a = i[0];
    for (; void 0 !== a; ) {
      if (r === a.index) {
        let e;
        2 === a.type
          ? (e = new z(n, n.nextSibling, this, t))
          : 1 === a.type
          ? (e = new a.ctor(n, a.name, a.strings, this, t))
          : 6 === a.type && (e = new Z(n, this, t)),
          this.v.push(e),
          (a = i[++l]);
      }
      r !== (null == a ? void 0 : a.index) && ((n = N.nextNode()), r++);
    }
    return o;
  }
  m(t) {
    let e = 0;
    for (const s of this.v)
      void 0 !== s &&
        (void 0 !== s.strings
          ? (s._$AI(t, s, e), (e += s.strings.length - 2))
          : s._$AI(t[e])),
        e++;
  }
}
class z {
  constructor(t, e, s, i) {
    var o;
    (this.type = 2),
      (this._$AH = H),
      (this._$AN = void 0),
      (this._$AA = t),
      (this._$AB = e),
      (this._$AM = s),
      (this.options = i),
      (this._$Cg =
        null === (o = null == i ? void 0 : i.isConnected) || void 0 === o || o);
  }
  get _$AU() {
    var t, e;
    return null !==
      (e = null === (t = this._$AM) || void 0 === t ? void 0 : t._$AU) &&
      void 0 !== e
      ? e
      : this._$Cg;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return void 0 !== e && 11 === t.nodeType && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    (t = B(this, t, e)),
      A(t)
        ? t === H || null == t || '' === t
          ? (this._$AH !== H && this._$AR(), (this._$AH = H))
          : t !== this._$AH && t !== T && this.$(t)
        : void 0 !== t._$litType$
        ? this.T(t)
        : void 0 !== t.nodeType
        ? this.S(t)
        : ((t) => {
            var e;
            return (
              w(t) ||
              'function' ==
                typeof (null === (e = t) || void 0 === e
                  ? void 0
                  : e[Symbol.iterator])
            );
          })(t)
        ? this.A(t)
        : this.$(t);
  }
  M(t, e = this._$AB) {
    return this._$AA.parentNode.insertBefore(t, e);
  }
  S(t) {
    this._$AH !== t && (this._$AR(), (this._$AH = this.M(t)));
  }
  $(t) {
    this._$AH !== H && A(this._$AH)
      ? (this._$AA.nextSibling.data = t)
      : this.S(b.createTextNode(t)),
      (this._$AH = t);
  }
  T(t) {
    var e;
    const {values: s, _$litType$: i} = t,
      o =
        'number' == typeof i
          ? this._$AC(t)
          : (void 0 === i.el && (i.el = O.createElement(i.h, this.options)), i);
    if ((null === (e = this._$AH) || void 0 === e ? void 0 : e._$AD) === o)
      this._$AH.m(s);
    else {
      const t = new q(o, this),
        e = t.p(this.options);
      t.m(s), this.S(e), (this._$AH = t);
    }
  }
  _$AC(t) {
    let e = L.get(t.strings);
    return void 0 === e && L.set(t.strings, (e = new O(t))), e;
  }
  A(t) {
    w(this._$AH) || ((this._$AH = []), this._$AR());
    const e = this._$AH;
    let s,
      i = 0;
    for (const o of t)
      i === e.length
        ? e.push((s = new z(this.M(_()), this.M(_()), this, this.options)))
        : (s = e[i]),
        s._$AI(o),
        i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), (e.length = i));
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for (
      null === (s = this._$AP) || void 0 === s || s.call(this, !1, !0, e);
      t && t !== this._$AB;

    ) {
      const e = t.nextSibling;
      t.remove(), (t = e);
    }
  }
  setConnected(t) {
    var e;
    void 0 === this._$AM &&
      ((this._$Cg = t),
      null === (e = this._$AP) || void 0 === e || e.call(this, t));
  }
}
class j {
  constructor(t, e, s, i, o) {
    (this.type = 1),
      (this._$AH = H),
      (this._$AN = void 0),
      (this.element = t),
      (this.name = e),
      (this._$AM = i),
      (this.options = o),
      s.length > 2 || '' !== s[0] || '' !== s[1]
        ? ((this._$AH = Array(s.length - 1).fill(new String())),
          (this.strings = s))
        : (this._$AH = H);
  }
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t, e = this, s, i) {
    const o = this.strings;
    let n = !1;
    if (void 0 === o)
      (t = B(this, t, e, 0)),
        (n = !A(t) || (t !== this._$AH && t !== T)),
        n && (this._$AH = t);
    else {
      const i = t;
      let r, l;
      for (t = o[0], r = 0; r < o.length - 1; r++)
        (l = B(this, i[s + r], e, r)),
          l === T && (l = this._$AH[r]),
          n || (n = !A(l) || l !== this._$AH[r]),
          l === H ? (t = H) : t !== H && (t += (null != l ? l : '') + o[r + 1]),
          (this._$AH[r] = l);
    }
    n && !i && this.k(t);
  }
  k(t) {
    t === H
      ? this.element.removeAttribute(this.name)
      : this.element.setAttribute(this.name, null != t ? t : '');
  }
}
class I extends j {
  constructor() {
    super(...arguments), (this.type = 3);
  }
  k(t) {
    this.element[this.name] = t === H ? void 0 : t;
  }
}
const D = g ? g.emptyScript : '';
class V extends j {
  constructor() {
    super(...arguments), (this.type = 4);
  }
  k(t) {
    t && t !== H
      ? this.element.setAttribute(this.name, D)
      : this.element.removeAttribute(this.name);
  }
}
class W extends j {
  constructor(t, e, s, i, o) {
    super(t, e, s, i, o), (this.type = 5);
  }
  _$AI(t, e = this) {
    var s;
    if ((t = null !== (s = B(this, t, e, 0)) && void 0 !== s ? s : H) === T)
      return;
    const i = this._$AH,
      o =
        (t === H && i !== H) ||
        t.capture !== i.capture ||
        t.once !== i.once ||
        t.passive !== i.passive,
      n = t !== H && (i === H || o);
    o && this.element.removeEventListener(this.name, this, i),
      n && this.element.addEventListener(this.name, this, t),
      (this._$AH = t);
  }
  handleEvent(t) {
    var e, s;
    'function' == typeof this._$AH
      ? this._$AH.call(
          null !==
            (s =
              null === (e = this.options) || void 0 === e ? void 0 : e.host) &&
            void 0 !== s
            ? s
            : this.element,
          t
        )
      : this._$AH.handleEvent(t);
  }
}
class Z {
  constructor(t, e, s) {
    (this.element = t),
      (this.type = 6),
      (this._$AN = void 0),
      (this._$AM = e),
      (this.options = s);
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    B(this, t);
  }
}
const F = window.litHtmlPolyfillSupport;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
var G, J;
null == F || F(O, z),
  (null !== (f = globalThis.litHtmlVersions) && void 0 !== f
    ? f
    : (globalThis.litHtmlVersions = [])
  ).push('2.1.3');
class K extends p {
  constructor() {
    super(...arguments),
      (this.renderOptions = {host: this}),
      (this._$Dt = void 0);
  }
  createRenderRoot() {
    var t, e;
    const s = super.createRenderRoot();
    return (
      (null !== (t = (e = this.renderOptions).renderBefore) && void 0 !== t) ||
        (e.renderBefore = s.firstChild),
      s
    );
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected),
      super.update(t),
      (this._$Dt = ((t, e, s) => {
        var i, o;
        const n =
          null !== (i = null == s ? void 0 : s.renderBefore) && void 0 !== i
            ? i
            : e;
        let r = n._$litPart$;
        if (void 0 === r) {
          const t =
            null !== (o = null == s ? void 0 : s.renderBefore) && void 0 !== o
              ? o
              : null;
          n._$litPart$ = r = new z(
            e.insertBefore(_(), t),
            t,
            void 0,
            null != s ? s : {}
          );
        }
        return r._$AI(t), r;
      })(e, this.renderRoot, this.renderOptions));
  }
  connectedCallback() {
    var t;
    super.connectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(),
      null === (t = this._$Dt) || void 0 === t || t.setConnected(!1);
  }
  render() {
    return T;
  }
}
(K.finalized = !0),
  (K._$litElement$ = !0),
  null === (G = globalThis.litElementHydrateSupport) ||
    void 0 === G ||
    G.call(globalThis, {LitElement: K});
const Q = globalThis.litElementPolyfillSupport;
null == Q || Q({LitElement: K}),
  (null !== (J = globalThis.litElementVersions) && void 0 !== J
    ? J
    : (globalThis.litElementVersions = [])
  ).push('3.1.2');
const X = (t, e) => {
    t.name && 'tos' != t.name && t.style.color && (t.style.color = ''),
      t.style.borderColor && (t.style.borderColor = ''),
      'block' == t.style.display && (t.style.display = ''),
      t.style || t.removeAtrribute('style'),
      'block' == e.style.display && (e.style.display = ''),
      e.style || t.removeAtrribute('style');
  },
  Y = (t, e, s, i = !1) => {
    const o = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      n = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    let r = 0,
      l = !1;
    return (
      t &&
        t.forEach((t) => {
          (!t.value ||
            ('email' == t.name && !o.test(t.value)) ||
            ('password' == t.name && !n.test(t.value)) ||
            ('tos' == t.name && !t.checked)) &&
            (i ||
              ((t, e, s, i) => {
                'tos' != t.name
                  ? ((t.style.color = '#f82858'),
                    (t.style.borderColor = '#f82858'),
                    (t.oninput = (t) => {
                      t.target.style.color && (t.target.style.color = ''),
                        t.target.style.borderColor &&
                          (t.target.style.borderColor = ''),
                        t.target.style || t.target.removeAtrribute('style');
                    }))
                  : ((t.style.borderColor = '#f82858'),
                    (t.onchange = (t) => {
                      t.target.style.borderColor &&
                        (t.target.style.borderColor = ''),
                        t.target.style || t.target.removeAtrribute('style'),
                        'block' == e.style.display && (e.style.display = '');
                    }),
                    'block' != e.style.display && (e.style.display = 'block')),
                  'block' != s.style.display && (s.style.display = 'block'),
                  i ||
                    (s.textContent =
                      'tos' == t.name
                        ? '* Please agree to the terms of service'
                        : 'password' == t.name && t.value.length < 8
                        ? '* Password needs to include atleast 8 characters.'
                        : 'password' != t.name || /\d/.test(t.value)
                        ? `* Please enter a vaild ${t.name}`
                        : '* Password needs to include atleast one number');
              })(t, e, s, r),
            r++,
            (l = !0));
        }),
      console.log(l),
      l
    );
  };
class tt extends K {
  static styles = [
    o`.tos-checkbox:checked{border-color:#ffa626!important}.tos-checkbox:checked::before{width:100%;height:100%;position:absolute;display:grid;place-content:center;padding-bottom:4px;background-color:#ffa626;border-color:#ffa626;content:url(images/check.svg)}@-moz-document url-prefix(){.backdrop{background:#eaeff7!important}}`,
  ];
  static properties = {
    magicLink: {type: Boolean},
    log: {type: Boolean},
    passReq: {type: Boolean},
    attemptSubmit: {type: Boolean},
    loading: {type: Boolean},
    done: {type: Boolean},
    _handleSubmit: {type: Function},
  };
  constructor() {
    super(),
      (this.log = !0),
      (this.passReq = !1),
      (this.loading = !1),
      (this.done = !1),
      (this.magicLink = !0),
      (this._handleSubmit = (t) => {
        const e = this.shadowRoot.querySelector('#error'),
          s = this.shadowRoot.querySelector('#error-icon'),
          i = this.shadowRoot.querySelectorAll('input'),
          o = t.submitter;
        this.done || t.preventDefault();
        (this.attemptSubmit = !0),
          o.classList.contains('social-btn')
            ? Y(this.shadowRoot.querySelectorAll('#tos'), s, e) ||
              ((this.loading = !0),
              console.log(this.loading),
              setTimeout(() => {
                (this.done = !0),
                  this.shadowRoot.querySelector('#login-form').submit();
              }, 2e3))
            : Y(i, s, e);
      });
  }
  render() {
    return U`<link rel="stylesheet" href="./assets/output-9d576b92.css"><div class="w-full h-full bg-[#00000070] fixed top-0 left-0 right-0 bottom-0 z-30 flex justify-center items-center p-4 py-6"><div class="overflow-y-scroll py-5 max-w-[28.5rem] max-h-[43.125rem] w-full h-full rounded-xl text-black pt-5 px-7 z-[5] font-sofia animate-fadeInAlt backdrop backdrop-filter backdrop-blur-3xl bg-[#ffffff90]"><div class="flex flex-col text-center h-full gap-2 sm:gap-3 relative"><slot></slot><section><h2 class="text-[3.2rem] text-left font-bold leading-snug">${
      this.log ? 'Sign in' : 'Sign up'
    }</h2><p class="font-semibold text-left text-[17px]">${
      this.log
        ? 'Sign in for your daily bonus!'
        : 'Earn 1000 ekstrapoints by signing up'
    }</p></section><form @submit="${(t) =>
      this._handleSubmit(
        t
      )}" id="login-form" method="POST" action="/" class="flex flex-col h-full gap-1 items-center"><div class="flex flex-col gap-3 mt-4 w-full"><button type="submit" class="social-btn w-full flex rounded-lg p-[0.9rem] justify-center items-center bg-[#ffffff80]"><div class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"><img src="./images/social-icons/facebook.svg" class="h-full"></div><p class="mx-auto pr-5 pb-1">Continue with Facebook</p></button> <button type="submit" class="social-btn w-full flex rounded-lg p-3 justify-center items-center bg-[#ffffff80]"><div class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"><img src="./images/social-icons/google.svg" class="h-full"></div><p class="mx-auto pr-5 pb-1">Continue with Google</p></button> <button type="submit" class="social-btn w-full flex rounded-lg p-3 justify-center items-center bg-[#ffffff80]"><div class="w-6 h-6 bg-lightBlue p-1 rounded-md flex justify-center items-center"><img src="./images/social-icons/apple.svg" class="h-full"></div><p class="mx-auto pr-5 pb-1">Continue with Apple</p></button></div><p class="text-black my-2 font-medium">Or</p><div class="flex flex-col items-center gap-2 relative w-full"><p id="error" class="text-red text-xs absolute top-[-1.3rem] hidden animate-fadeInAlt opacity-0 self-start"></p><input type="text" id="email" name="email" placeholder="Email..." class="pb-1 px-3 h-12 w-full rounded-lg bg-lightGray border-2 border-transparent transition-colors placeholder:text-inherit"> ${
      this.passReq || this.magicLink
        ? ''
        : U`<input type="password" placeholder="Password..." id="password" name="password" class="pb-1 px-3 h-12 w-full rounded-lg bg-lightGray border-2 border-transparent transition-colors placeholder:text-inherit">`
    } ${
      this.log
        ? ''
        : U`<div class="flex gap-3 items-center justify-center w-full px-5"><div class="relative w-4 h-4"><input class="tos-checkbox cursor-pointer appearance-none min-w-[1rem] min-h-[1rem] border-darkBlue before:rounded-[4px] relative before:border-2 before:absolute before:w-full before:h-full before:overflow-hidden before:border-inherit" type="checkbox" name="tos" id="tos"> <img id="error-icon" class="absolute -top-[1.2rem] w-3 left-[calc(50%-(12px/2))] hidden animate-fadeInAlt opacity-0" src="./images/error.svg" alt="Error"></div><label for="tos" class="text-xs text-darkBlue text-left">By selecting to login via Social I agree to the<br><a href="#" class="text-blue font-bold">Terms & Conditions and Privacy Policy</a></label></div>`
    }</div><button type="submit" id="submit-button" class="mt-4 rounded-md cursor-pointer shadow-md px-4 pb-1 h-12 w-full flex justify-center items-center text-lg font-medium text-white md:hover:scale-105 transition-transform active:scale-100 bg-gradient-to-bl from-orange to-yellow">${
      !this.magicLink || this.passReq || this.loading
        ? ''
        : U`<img class="-translate-x-3 h-1/2" src="./images/wand.svg">`
    } ${
      this.loading
        ? U`<img class="animate-rotate h-4/5" src="./images/arrows_circle.svg" alt="Loading icon">`
        : '' +
          (!this.log || this.passReq || this.magicLink
            ? this.log && this.passReq
              ? 'Send Recovery Mail'
              : this.magicLink
              ? 'Send link to email'
              : 'Continue'
            : 'Sign in')
    }</button> ${
      this.passReq
        ? ''
        : U`<button class="flex gap-1 items-center text-sm" @click="${() => {
            (this.magicLink = !this.magicLink), console.log(this.magicLink);
          }}" type="button">${
            this.magicLink ? '' : U`<img src="./images/wand-black.svg">`
          } ${
            !this.magicLink && this.log
              ? U`Sign in <span class="font-semibold underline">without a password</span>`
              : this.magicLink || this.log
              ? this.magicLink && this.log
                ? U`Sign in <span class="font-semibold underline">with your password</span>`
                : U`Sign up <span class="font-semibold underline">with your password</span>`
              : U`Sign up <span class="font-semibold underline">without a password</span>`
          }</button>`
    }</form><div class="leading-4 flex gap-1 mx-auto"><p class="text-base">${
      this.log ? 'Not a member?' : 'Already member?'
    }</p><button type="button" class="text-base font-bold underline" @click="${() => {
      this.passReq && (this.passReq = !1),
        this.magicLink && (this.magicLink = !0),
        (this.log = !this.log);
      const t = this.shadowRoot.querySelectorAll('input'),
        e = this.shadowRoot.querySelector('#error');
      t.forEach((t) => X(t, e));
    }}">${this.log ? 'Sign up here' : 'Sign in here'}</button></div>${
      this.log
        ? U`<button class="text-lg font-semibold" @click="${() => {
            this.passReq = !this.passReq;
            const t = this.shadowRoot.querySelectorAll('input'),
              e = this.shadowRoot.querySelector('#error');
            t.forEach((t) => X(t, e));
          }}">${
            this.passReq ? 'Remember your password?' : 'Forgot your password?'
          }</button>`
        : ''
    }</div></div></div>`;
  }
}
window.customElements.define('log-in', tt);
export {tt as Login};
