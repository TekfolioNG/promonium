!(function () {
  function e(e, n) {
    for (var t = 0; t < n.length; t++) {
      var i = n[t];
      (i.enumerable = i.enumerable || !1),
        (i.configurable = !0),
        "value" in i && (i.writable = !0),
        Object.defineProperty(e, i.key, i);
    }
  }
  function n(n, t, i) {
    return (
      t && e(n.prototype, t),
      i && e(n, i),
      Object.defineProperty(n, "prototype", { writable: !1 }),
      n
    );
  }
  function t() {
    return (
      (t =
        Object.assign ||
        function (e) {
          for (var n = 1; n < arguments.length; n++) {
            var t = arguments[n];
            for (var i in t)
              Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
          }
          return e;
        }),
      t.apply(this, arguments)
    );
  }
  function i(e, n) {
    (e.prototype = Object.create(n.prototype)),
      (e.prototype.constructor = e),
      r(e, n);
  }
  function r(e, n) {
    return (
      (r =
        Object.setPrototypeOf ||
        function (e, n) {
          return (e.__proto__ = n), e;
        }),
      r(e, n)
    );
  }
  function a(e) {
    if (void 0 === e)
      throw new ReferenceError(
        "this hasn't been initialised - super() hasn't been called",
      );
    return e;
  }
  function o(e, n) {
    (null == n || n > e.length) && (n = e.length);
    for (var t = 0, i = new Array(n); t < n; t++) i[t] = e[t];
    return i;
  }
  function l(e, n) {
    var t =
      ("undefined" != typeof Symbol && e[Symbol.iterator]) || e["@@iterator"];
    if (t) return (t = t.call(e)).next.bind(t);
    if (
      Array.isArray(e) ||
      (t = (function (e, n) {
        if (e) {
          if ("string" == typeof e) return o(e, n);
          var t = Object.prototype.toString.call(e).slice(8, -1);
          return (
            "Object" === t && e.constructor && (t = e.constructor.name),
            "Map" === t || "Set" === t
              ? Array.from(e)
              : "Arguments" === t ||
                  /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)
                ? o(e, n)
                : void 0
          );
        }
      })(e)) ||
      (n && e && "number" == typeof e.length)
    ) {
      t && (e = t);
      var i = 0;
      return function () {
        return i >= e.length ? { done: !0 } : { done: !1, value: e[i++] };
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.",
    );
  }
  !(function () {
    var e,
      t = new WeakMap();
    function r(e) {
      for (var n, t = [], i = 0; i < e.length; i++)
        t[i] =
          "number" == typeof (n = e[i]) ? new CSSUnitValue(n, "number") : n;
      return t;
    }
    var a = (function () {
        function e(e, n, i, a) {
          t.set(this, {
            values: r(e),
            operator: n,
            name: i || n,
            delimiter: a || ", ",
          });
        }
        return (
          (e.prototype.toString = function () {
            var e = t.get(this);
            return e.name + "(" + e.values.join(e.delimiter) + ")";
          }),
          n(e, [
            {
              key: "operator",
              get: function () {
                return t.get(this).operator;
              },
            },
            {
              key: "values",
              get: function () {
                return t.get(this).values;
              },
            },
          ]),
          e
        );
      })(),
      o =
        ((e = {
          CSSUnitValue: (function () {
            function e(e, n) {
              t.set(this, { value: e, unit: n });
            }
            return (
              (e.prototype.toString = function () {
                var e = t.get(this);
                return (
                  "" +
                  e.value +
                  (function (e) {
                    switch (e) {
                      case "percent":
                        return "%";
                      case "number":
                        return "";
                      default:
                        return e.toLowerCase();
                    }
                  })(e.unit)
                );
              }),
              n(e, [
                {
                  key: "value",
                  get: function () {
                    return t.get(this).value;
                  },
                  set: function (e) {
                    t.get(this).value = e;
                  },
                },
                {
                  key: "unit",
                  get: function () {
                    return t.get(this).unit;
                  },
                },
              ]),
              e
            );
          })(),
          CSSKeywordValue: (function () {
            function e(e) {
              this.value = e;
            }
            return (
              (e.prototype.toString = function () {
                return this.value.toString();
              }),
              e
            );
          })(),
          CSSMathSum: (function (e) {
            function n(n) {
              return e.call(this, arguments, "sum", "calc", " + ") || this;
            }
            return i(n, e), n;
          })(a),
          CSSMathProduct: (function (e) {
            function n(n) {
              return e.call(this, arguments, "product", "calc", " * ") || this;
            }
            return i(n, e), n;
          })(a),
          CSSMathNegate: (function (e) {
            function n(n) {
              return e.call(this, [arguments[0]], "negate", "-") || this;
            }
            return i(n, e), n;
          })(a),
        }),
        (e.CSSMathNegate = (function (e) {
          function n(n) {
            return (
              e.call(this, [1, arguments[0]], "invert", "calc", " / ") || this
            );
          }
          return i(n, e), n;
        })(a)),
        (e.CSSMathMax = (function (e) {
          function n() {
            return e.call(this, arguments, "max") || this;
          }
          return i(n, e), n;
        })(a)),
        (e.CSSMathMin = (function (e) {
          function n() {
            return e.call(this, arguments, "min") || this;
          }
          return i(n, e), n;
        })(a)),
        e);
    if (!window.CSS && !Reflect.defineProperty(window, "CSS", { value: {} }))
      throw Error("Error installing CSSOM support");
    for (var l in (window.CSSUnitValue ||
      [
        "number",
        "percent",
        "em",
        "ex",
        "px",
        "cm",
        "mm",
        "in",
        "pt",
        "pc",
        "Q",
        "vw",
        "vh",
        "vmin",
        "vmax",
        "rems",
        "ch",
        "deg",
        "rad",
        "grad",
        "turn",
        "ms",
        "s",
        "Hz",
        "kHz",
        "dppx",
        "dpi",
        "dpcm",
        "fr",
      ].forEach(function (e) {
        if (
          !Reflect.defineProperty(CSS, e, {
            value: function (n) {
              return new CSSUnitValue(n, e);
            },
          })
        )
          throw Error("Error installing CSS." + e);
      }),
    o))
      if (!(l in window) && !Reflect.defineProperty(window, l, { value: o[l] }))
        throw Error("Error installing CSSOM support for " + l);
  })();
  var s = "block",
    u = new WeakMap();
  function c(e) {
    return e === document.scrollingElement ? document : e;
  }
  function m(e) {
    h(e);
    var n = u.get(e).animations;
    if (0 !== n.length)
      for (var t = e.currentTime, i = 0; i < n.length; i++)
        n[i].tickAnimation(t);
  }
  function f(e, n) {
    if (!e) return null;
    var t = "horizontal-tb" == getComputedStyle(e).writingMode,
      i = e.scrollTop;
    return (
      ("x" == n || ("inline" == n && t) || ("block" == n && !t)) &&
        (i = Math.abs(e.scrollLeft)),
      i
    );
  }
  function h(e) {
    if (e instanceof P) {
      var n = e.subject;
      n && "none" != getComputedStyle(n).display ? d(e, E(n)) : d(e, null);
    } else
      !(function (e) {
        var n = u.get(e);
        n.anonymousSource && d(e, T(n.anonymousSource, n.anonymousTarget));
      })(e);
  }
  function d(e, n) {
    var t = u.get(e),
      i = t.source,
      r = t.scrollListener;
    if (
      i != n &&
      (i && r && c(i).removeEventListener("scroll", r),
      (u.get(e).source = n),
      n)
    ) {
      var a = function () {
        m(e);
      };
      c(n).addEventListener("scroll", a), (t.scrollListener = a);
    }
  }
  function p(e, n) {
    for (var t = u.get(e).animations, i = 0; i < t.length; i++)
      t[i].animation == n && t.splice(i, 1);
  }
  function v(e, n, t) {
    for (var i = u.get(e).animations, r = 0; r < i.length; r++)
      if (i[r].animation == n) return;
    i.push({ animation: n, tickAnimation: t }), m(e);
  }
  var g = (function () {
    function e(e) {
      u.set(this, {
        source: null,
        axis: s,
        anonymousSource: e ? e.anonymousSource : null,
        anonymousTarget: e ? e.anonymousTarget : null,
        subject: null,
        inset: e ? e.inset : null,
        animations: [],
        scrollListener: null,
      }),
        d(
          this,
          e && void 0 !== e.source ? e.source : document.scrollingElement,
        ),
        e && void 0 !== e.axis && e.axis != s && (this.axis = e.axis),
        m(this);
    }
    return (
      n(e, [
        {
          key: "source",
          get: function () {
            return u.get(this).source;
          },
          set: function (e) {
            d(this, e), m(this);
          },
        },
        {
          key: "axis",
          get: function () {
            return u.get(this).axis;
          },
          set: function (e) {
            if (-1 === ["block", "inline", "x", "y"].indexOf(e))
              throw TypeError("Invalid axis");
            (u.get(this).axis = e), m(this);
          },
        },
        {
          key: "duration",
          get: function () {
            return CSS.percent(100);
          },
        },
        {
          key: "phase",
          get: function () {
            var e = this.source;
            if (!e) return "inactive";
            var n = getComputedStyle(e);
            return "none" == n.display
              ? "inactive"
              : e == document.scrollingElement ||
                  ("visible" != n.overflow && "clip" != n.overflow)
                ? "active"
                : "inactive";
          },
        },
        {
          key: "currentTime",
          get: function () {
            var e = null,
              n = this.source;
            if (!n) return e;
            if ("inactive" == this.phase) return e;
            var t = getComputedStyle(n);
            if ("inline" === t.display || "none" === t.display) return e;
            var i = this.axis,
              r = f(n, i),
              a = (function (e, n) {
                var t = "horizontal-tb" == getComputedStyle(e).writingMode;
                return (
                  "block" === n
                    ? (n = t ? "y" : "x")
                    : "inline" === n && (n = t ? "x" : "y"),
                  "y" === n
                    ? e.scrollHeight - e.clientHeight
                    : "x" === n
                      ? e.scrollWidth - e.clientWidth
                      : void 0
                );
              })(n, i);
            return a > 0 ? CSS.percent((100 * r) / a) : CSS.percent(100);
          },
        },
        {
          key: "__polyfill",
          get: function () {
            return !0;
          },
        },
      ]),
      e
    );
  })();
  function y(e, n) {
    for (var t = e.parentElement; null != t; ) {
      if (n(t)) return t;
      t = t.parentElement;
    }
  }
  function T(e, n) {
    return "root" == e ? document.scrollingElement : E(n);
  }
  function S(e) {
    switch (getComputedStyle(e).display) {
      case "block":
      case "inline-block":
      case "list-item":
      case "table":
      case "table-caption":
      case "flow-root":
      case "flex":
      case "grid":
        return !0;
    }
    return !1;
  }
  function b(e) {
    var n = getComputedStyle(e);
    return (
      "none" != n.transform ||
      "none" != n.perspective ||
      "transform" == n.willChange ||
      "perspective" == n.willChange ||
      "none" != n.filter ||
      "filter" == n.willChange ||
      "none" != n.backdropFilter
    );
  }
  function w(e) {
    return "static" != getComputedStyle(e).position || b(e);
  }
  function k(e) {
    switch (getComputedStyle(e).position) {
      case "static":
      case "relative":
      case "sticky":
        return y(e, S);
      case "absolute":
        return y(e, w);
      case "fixed":
        return y(e, b);
    }
  }
  function E(e) {
    if (e) {
      for (; (e = k(e)); )
        switch (getComputedStyle(e)["overflow-x"]) {
          case "auto":
          case "scroll":
          case "hidden":
            return e == document.body &&
              "visible" == getComputedStyle(document.scrollingElement).overflow
              ? document.scrollingElement
              : e;
        }
      return document.scrollingElement;
    }
  }
  function x(e, n) {
    var t = u.get(e);
    return "inactive" === e.phase
      ? null
      : e instanceof P
        ? I(n, e.source, e.subject, t.axis, t.inset)
        : null;
  }
  function I(e, n, t, i, r) {
    for (var a = 0, o = 0, l = t, s = n.offsetParent; l && l != s; )
      (o += l.offsetLeft), (a += l.offsetTop), (l = l.offsetParent);
    (o -= n.offsetLeft + n.clientLeft), (a -= n.offsetTop + n.clientTop);
    var u = getComputedStyle(n),
      c = "horizontal-tb" == u.writingMode,
      m = void 0,
      f = void 0,
      h = void 0;
    "x" == i || ("inline" == i && c) || ("block" == i && !c)
      ? ((m = t.clientWidth),
        (f = o),
        ("rtl" == u.direction || "vertical-rl" == u.writingMode) &&
          (f += n.scrollWidth - n.clientWidth),
        (h = n.clientWidth))
      : ((m = t.clientHeight), (f = a), (h = n.clientHeight));
    var d = (function (e, n) {
        var t = { start: 0, end: 0 };
        if (!e) return t;
        var i = e.split(" "),
          r = [];
        if (
          (i.forEach(function (e) {
            if (e.endsWith("%")) r.push((n / 100) * parseFloat(e));
            else if (e.endsWith("px")) r.push(parseFloat(e));
            else {
              if ("auto" !== e)
                throw TypeError(
                  "Unsupported inset. Only % and px values are supported (for now).",
                );
              r.push(0);
            }
          }),
          r.length > 2)
        )
          throw TypeError("Invalid inset");
        return (
          1 == r.length
            ? ((t.start = r[0]), (t.end = r[0]))
            : 2 == r.length && ((t.start = r[0]), (t.end = r[1])),
          t
        );
      })(r, h),
      p = f - h + d.end,
      v = f + m - d.start,
      g = p + m,
      y = v - m,
      T = Math.min(g, y),
      S = Math.max(g, y),
      b = void 0,
      w = void 0,
      k = m > h;
    switch (e) {
      case "cover":
        (b = p), (w = v);
        break;
      case "contain":
        (b = T), (w = S);
        break;
      case "entry":
        (b = p), (w = T);
        break;
      case "exit":
        (b = S), (w = v);
        break;
      case "entry-crossing":
        (b = p), (w = k ? S : T);
        break;
      case "exit-crossing":
        (b = k ? T : S), (w = v);
    }
    return { start: b, end: w };
  }
  function M(e, n, t) {
    return N(x(e, n), t, x(e, "cover"));
  }
  function N(e, n, t) {
    return e && t
      ? ((n.value / 100) * (e.end - e.start) + e.start - t.start) /
          (t.end - t.start)
      : 0;
  }
  var P = (function (e) {
      function t(n) {
        var t;
        return (
          (t = e.call(this, n) || this),
          (u.get(a(t)).subject = n && n.subject ? n.subject : void 0),
          h(a(t)),
          m(a(t)),
          t
        );
      }
      return (
        i(t, e),
        n(t, [
          {
            key: "source",
            get: function () {
              return h(this), u.get(this).source;
            },
            set: function (e) {
              throw new Error("Cannot set the source of a view timeline");
            },
          },
          {
            key: "subject",
            get: function () {
              return u.get(this).subject;
            },
          },
          {
            key: "axis",
            get: function () {
              return u.get(this).axis;
            },
          },
          {
            key: "currentTime",
            get: function () {
              var e = null,
                n = f(this.source, this.axis);
              if (n == e) return e;
              var t = x(this, "cover");
              return t
                ? CSS.percent(((n - t.start) / (t.end - t.start)) * 100)
                : e;
            },
          },
        ]),
        t
      );
    })(g),
    C = window.Element.prototype.animate,
    A = window.Animation,
    R = [
      "entry",
      "exit",
      "cover",
      "contain",
      "entry-crossing",
      "exit-crossing",
    ],
    O = (function () {
      function e() {
        var e = this;
        (this.state = "pending"),
          (this.nativeResolve = this.nativeReject = null),
          (this.promise = new Promise(function (n, t) {
            (e.nativeResolve = n), (e.nativeReject = t);
          }));
      }
      var n = e.prototype;
      return (
        (n.resolve = function (e) {
          (this.state = "resolved"), this.nativeResolve(e);
        }),
        (n.reject = function (e) {
          (this.state = "rejected"),
            this.promise.catch(function () {}),
            this.nativeReject(e);
        }),
        e
      );
    })();
  function L(e) {
    (e.readyPromise = new O()),
      requestAnimationFrame(function () {
        null !== e.timeline.currentTime && Y(e);
      });
  }
  function _() {
    return new DOMException("The user aborted a request", "AbortError");
  }
  function j(e, n) {
    if (null === n) return n;
    if ("number" != typeof n)
      throw new DOMException(
        "Unexpected value: " + n + ".  Cannot convert to CssNumberish",
        "InvalidStateError",
      );
    var t = q(e);
    return CSS.percent(t ? (100 * n) / t : 0);
  }
  function W(e, n) {
    if (e.timeline) {
      if (null === n) return n;
      if ("percent" === n.unit) {
        var t = q(e);
        return (n.value * t) / 100;
      }
      throw new DOMException(
        "CSSNumericValue must be a percentage for progress based animations.",
        "NotSupportedError",
      );
    }
    if (null == n || "number" == typeof n) return n;
    var i = n.to("ms");
    if (convertTime) return i.value;
    throw new DOMException(
      "CSSNumericValue must be either a number or a time value for time based animations.",
      "InvalidStateError",
    );
  }
  function V(e) {
    if (
      e.finishedPromise &&
      "pending" == e.finishedPromise.state &&
      "finished" == e.proxy.playState
    ) {
      e.finishedPromise.resolve(e.proxy), e.animation.pause();
      var n = new CustomEvent("finish", {
        detail: {
          currentTime: e.proxy.currentTime,
          timelineTime: e.proxy.timeline.currentTime,
        },
      });
      Object.defineProperty(n, "currentTime", {
        get: function () {
          return this.detail.currentTime;
        },
      }),
        Object.defineProperty(n, "timelineTime", {
          get: function () {
            return this.detail.timelineTime;
          },
        }),
        requestAnimationFrame(function () {
          queueMicrotask(function () {
            e.animation.dispatchEvent(n);
          });
        });
    }
  }
  function D(e) {
    return null !== e.pendingPlaybackRate
      ? e.pendingPlaybackRate
      : e.animation.playbackRate;
  }
  function U(e) {
    null !== e.pendingPlaybackRate &&
      ((e.animation.playbackRate = e.pendingPlaybackRate),
      (e.pendingPlaybackRate = null));
  }
  function H(e) {
    if (!e.timeline) return null;
    var n = W(e, e.timeline.currentTime);
    if (null === n) return null;
    if (null === e.startTime) return null;
    var t = (n - e.startTime) * e.animation.playbackRate;
    return -0 == t && (t = 0), t;
  }
  function F(e, n) {
    if (!e.timeline) return null;
    var t = W(e, e.timeline.currentTime);
    return null == t ? null : t - n / e.animation.playbackRate;
  }
  function z(e, n, t) {
    if (e.timeline) {
      var i = n ? W(e, e.proxy.currentTime) : H(e);
      if (i && null != e.startTime && !e.proxy.pending) {
        var r = D(e),
          a = q(e),
          o = e.previousCurrentTime;
        r > 0 && i >= a && null != e.previousCurrentTime
          ? ((null === o || o < a) && (o = a), (e.holdTime = n ? i : o))
          : r < 0 && i <= 0
            ? ((null == o || o > 0) && (o = 0), (e.holdTime = n ? i : o))
            : 0 != r &&
              (n && null !== e.holdTime && (e.startTime = F(e, e.holdTime)),
              (e.holdTime = null));
      }
      K(e),
        (e.previousCurrentTime = W(e, e.proxy.currentTime)),
        "finished" == e.proxy.playState
          ? (e.finishedPromise || (e.finishedPromise = new O()),
            "pending" == e.finishedPromise.state &&
              (t
                ? V(e)
                : Promise.resolve().then(function () {
                    V(e);
                  })))
          : (e.finishedPromise &&
              "resolved" == e.finishedPromise.state &&
              (e.finishedPromise = new O()),
            "paused" != e.animation.playState && e.animation.pause());
    }
  }
  function q(e) {
    var n = (function (e) {
      var n = e.proxy.effect.getTiming();
      return e.normalizedTiming || n;
    })(e);
    return Math.max(0, n.delay + n.endDelay + n.iterations * n.duration);
  }
  function K(e) {
    if (e.timeline)
      if (null !== e.startTime) {
        var n = e.timeline.currentTime;
        if (null == n) return;
        G(e, (W(e, n) - e.startTime) * e.animation.playbackRate);
      } else null !== e.holdTime && G(e, e.holdTime);
  }
  function G(e, n) {
    var t = e.timeline,
      i = e.animation.playbackRate;
    e.animation.currentTime =
      n +
      (t.currentTime && t.currentTime.value == (i < 0 ? 0 : 100)
        ? i < 0
          ? 0.001
          : -0.001
        : 0);
  }
  function Q(e, n) {
    if (e.timeline) {
      var t = "paused" == e.proxy.playState && e.proxy.pending,
        i = !1,
        r = null,
        a = W(e, e.proxy.currentTime);
      e.resetCurrentTimeOnResume &&
        ((a = null), (e.resetCurrentTimeOnResume = !1));
      var o = D(e),
        l = q(e);
      if (o > 0 && n && (null == a || a < 0 || a >= l)) r = 0;
      else if (o < 0 && n && (null == a || a <= 0 || a > l)) {
        if (Infinity == l) return void e.animation.play();
        r = l;
      } else 0 == o && null == a && (r = 0);
      null != r && ((e.startTime = r), (e.holdTime = null), U(e)),
        v(e.timeline, e.animation, X.bind(e.proxy)),
        e.holdTime && (e.startTime = null),
        e.pendingTask && ((e.pendingTask = null), (i = !0)),
        (null !== e.holdTime ||
          null !== r ||
          t ||
          null !== e.pendingPlaybackRate) &&
          (e.readyPromise && !i && (e.readyPromise = null),
          K(e),
          e.readyPromise || L(e),
          (e.pendingTask = "play"),
          z(e, !1, !1));
    }
  }
  function X(e) {
    var n = B.get(this);
    if (null != e) {
      n.pendingTask && Y(n);
      var t = this.playState;
      ("running" != t && "finished" != t) ||
        (G(n, (W(n, e) - W(n, this.startTime)) * this.playbackRate),
        "finished" == t && 0 != D(n) && (n.holdTime = null),
        z(n, !1, !1));
    } else "idle" != n.animation.playState && n.animation.cancel();
  }
  function Y(e) {
    "pause" == e.pendingTask
      ? (function (e) {
          var n = W(e, e.timeline.currentTime);
          null != e.startTime &&
            null == e.holdTime &&
            (e.holdTime = (n - e.startTime) * e.animation.playbackRate),
            U(e),
            (e.startTime = null),
            e.readyPromise.resolve(e.proxy),
            z(e, !1, !1),
            K(e),
            (e.pendingTask = null);
        })(e)
      : "play" == e.pendingTask &&
        (function (e) {
          var n = W(e, e.timeline.currentTime);
          if (null != e.holdTime)
            U(e),
              0 == e.animation.playbackRate
                ? (e.startTime = n)
                : ((e.startTime = n - e.holdTime / e.animation.playbackRate),
                  (e.holdTime = null));
          else if (null !== e.startTime && null !== e.pendingPlaybackRate) {
            var t = (n - e.startTime) * e.animation.playbackRate;
            U(e);
            var i = e.animation.playbackRate;
            0 == i
              ? ((e.holdTime = null), (e.startTime = n))
              : (e.startTime = n - t / i);
          }
          e.readyPromise &&
            "pending" == e.readyPromise.state &&
            e.readyPromise.resolve(e.proxy),
            z(e, !1, !1),
            K(e),
            (e.pendingTask = null);
        })(e);
  }
  var B = new WeakMap(),
    $ = (function () {
      function e(e, n, t) {
        void 0 === t && (t = {});
        var i = e instanceof A ? e : new A(e, a),
          r = n instanceof g,
          a = r ? void 0 : n;
        B.set(this, {
          animation: i,
          timeline: r ? n : void 0,
          playState: r ? "idle" : null,
          readyPromise: null,
          finishedPromise: null,
          startTime: null,
          holdTime: null,
          previousCurrentTime: null,
          resetCurrentTimeOnResume: !1,
          pendingPlaybackRate: null,
          pendingTask: null,
          specifiedTiming: null,
          normalizedTiming: null,
          effect: null,
          animationRange:
            n instanceof ViewTimeline ? ne(t["animation-range"]) : null,
          proxy: this,
        });
      }
      var t = e.prototype;
      return (
        (t.finish = function () {
          var e = B.get(this);
          if (e.timeline) {
            var n = D(e),
              t = q(e);
            if (0 == n)
              throw new DOMException(
                "Cannot finish Animation with a playbackRate of 0.",
                "InvalidStateError",
              );
            if (n > 0 && Infinity == t)
              throw new DOMException(
                "Cannot finish Animation with an infinite target effect end.",
                "InvalidStateError",
              );
            U(e);
            var i = n < 0 ? 0 : t;
            this.currentTime = j(e, i);
            var r = W(e, e.timeline.currentTime);
            null === e.startTime &&
              null !== r &&
              (e.startTime = r - i / e.animation.playbackRate),
              "pause" == e.pendingTask &&
                null !== e.startTime &&
                ((e.holdTime = null),
                (e.pendingTask = null),
                e.readyPromise.resolve(this)),
              "play" == e.pendingTask &&
                null !== e.startTime &&
                ((e.pendingTask = null), e.readyPromise.resolve(this)),
              z(e, !0, !0);
          } else e.animation.finish();
        }),
        (t.play = function () {
          var e = B.get(this);
          e.timeline ? Q(e, !0) : e.animation.play();
        }),
        (t.pause = function () {
          var e = B.get(this);
          if (e.timeline) {
            if ("paused" != this.playState) {
              var n = null,
                t = e.animation.playbackRate,
                i = q(e);
              if (null === e.animation.currentTime)
                if (t >= 0) n = 0;
                else {
                  if (Infinity == i) return void e.animation.pause();
                  n = i;
                }
              null !== n && (e.startTime = n),
                "play" == e.pendingTask
                  ? (e.pendingTask = null)
                  : (e.readyPromise = null),
                e.readyPromise || L(e),
                (e.pendingTask = "pause");
            }
          } else e.animation.pause();
        }),
        (t.reverse = function () {
          var e = B.get(this),
            n = D(e),
            t = e.resetCurrentTimeOnResume ? null : W(e, this.currentTime),
            i = Infinity == q(e),
            r = 0 != n && (n < 0 || t > 0 || !i);
          if (!e.timeline || !r)
            return (
              r && (e.pendingPlaybackRate = -D(e)), void e.animation.reverse()
            );
          if ("inactive" == e.timeline.phase)
            throw new DOMException(
              "Cannot reverse an animation with no active timeline",
              "InvalidStateError",
            );
          this.updatePlaybackRate(-n), Q(e, !0);
        }),
        (t.updatePlaybackRate = function (e) {
          var n = B.get(this);
          if (((n.pendingPlaybackRate = e), n.timeline)) {
            if (!n.readyPromise || "pending" != n.readyPromise.state)
              switch (this.playState) {
                case "idle":
                case "paused":
                  U(n);
                  break;
                case "finished":
                  var t = W(n, n.timeline.currentTime),
                    i =
                      null !== t
                        ? (t - n.startTime) * n.animation.playbackRate
                        : null;
                  (n.startTime =
                    0 == e ? t : null != t && null != i ? (t - i) / e : null),
                    U(n),
                    z(n, !1, !1),
                    K(n);
                  break;
                default:
                  Q(n, !1);
              }
          } else n.animation.updatePlaybackRate(e);
        }),
        (t.persist = function () {
          B.get(this).animation.persist();
        }),
        (t.cancel = function () {
          var e = B.get(this);
          e.timeline
            ? ("idle" != this.playState &&
                ((function (e) {
                  e.pendingTask &&
                    ((e.pendingTask = null),
                    U(e),
                    e.readyPromise.reject(_()),
                    L(e),
                    e.readyPromise.resolve(e.proxy));
                })(e),
                e.finishedPromise &&
                  "pending" == e.finishedPromise.state &&
                  e.finishedPromise.reject(_()),
                (e.finishedPromise = new O()),
                e.animation.cancel()),
              (e.startTime = null),
              (e.holdTime = null),
              p(e.timeline, e.animation))
            : e.animation.cancel();
        }),
        (t.addEventListener = function (e, n, t) {
          B.get(this).animation.addEventListener(e, n, t);
        }),
        (t.removeEventListener = function (e, n, t) {
          B.get(this).animation.removeEventListener(e, n, t);
        }),
        (t.dispatchEvent = function (e) {
          B.get(this).animation.dispatchEvent(e);
        }),
        n(e, [
          {
            key: "effect",
            get: function () {
              var e = B.get(this);
              return e.timeline
                ? (e.effect ||
                    (e.effect = (function (e) {
                      var n = e.animation.effect,
                        t = n.updateTiming,
                        i = {
                          apply: function (t) {
                            n.getTiming();
                            var i = t.apply(n);
                            if (e.timeline) {
                              (i.localTime = j(e, i.localTime)),
                                (i.endTime = j(e, i.endTime)),
                                (i.activeDuration = j(e, i.activeDuration));
                              var r = q(e);
                              (i.duration = r
                                ? CSS.percent(
                                    (100 *
                                      (i.iterations
                                        ? (r - i.delay - i.endDelay) /
                                          i.iterations
                                        : 0)) /
                                      r,
                                  )
                                : CSS.percent(0)),
                                void 0 === e.timeline.currentTime &&
                                  (i.localTime = null);
                            }
                            return i;
                          },
                        },
                        r = {
                          apply: function (i, r) {
                            var a = 1e5;
                            if (e.specifiedTiming) return e.specifiedTiming;
                            e.specifiedTiming = i.apply(n);
                            var o,
                              l,
                              s,
                              u = Object.assign({}, e.specifiedTiming),
                              c = !1;
                            return (
                              e.timeline instanceof ViewTimeline &&
                                ((o = (function (e) {
                                  if (!(e.timeline instanceof ViewTimeline))
                                    return 0;
                                  var n = e.animationRange.start;
                                  return M(e.timeline, n.rangeName, n.offset);
                                })(e)),
                                (l = (function (e) {
                                  if (!(e.timeline instanceof ViewTimeline))
                                    return 0;
                                  var n = e.animationRange.end;
                                  return (
                                    1 - M(e.timeline, n.rangeName, n.offset)
                                  );
                                })(e)),
                                (c = !0)),
                              (null === u.duration ||
                                "auto" === u.duration ||
                                c) &&
                                e.timeline &&
                                (c
                                  ? ((u.delay = o * a), (u.endDelay = l * a))
                                  : ((u.delay = 0), (u.endDelay = 0)),
                                (s = u.iterations ? a : 0),
                                (u.duration = u.iterations
                                  ? (s - u.delay - u.endDelay) / u.iterations
                                  : 0),
                                u.duration < 0 &&
                                  ((u.duration = 0),
                                  (u.endDelay = s - u.delay)),
                                t.apply(n, [u])),
                              (e.normalizedTiming = u),
                              e.specifiedTiming
                            );
                          },
                        },
                        a = {
                          apply: function (t, i, r) {
                            if (e.timeline) {
                              var a = r[0];
                              if (Infinity === a.duration)
                                throw TypeError(
                                  "Effect duration cannot be Infinity when used with Scroll Timelines",
                                );
                              if (Infinity === a.iterations)
                                throw TypeError(
                                  "Effect iterations cannot be Infinity when used with Scroll Timelines",
                                );
                            }
                            e.specifiedTiming &&
                              t.apply(n, [e.specifiedTiming]),
                              t.apply(n, r),
                              (e.specifiedTiming = null);
                          },
                        },
                        o = new Proxy(n, {
                          get: function (e, t) {
                            var i = e[t];
                            return "function" == typeof i ? i.bind(n) : i;
                          },
                          set: function (e, n, t) {
                            return (e[n] = t), !0;
                          },
                        });
                      return (
                        (o.getComputedTiming = new Proxy(
                          n.getComputedTiming,
                          i,
                        )),
                        (o.getTiming = new Proxy(n.getTiming, r)),
                        (o.updateTiming = new Proxy(n.updateTiming, a)),
                        o
                      );
                    })(e)),
                  e.effect)
                : e.animation.effect;
            },
            set: function (e) {
              var n = B.get(this);
              (n.animation.effect = e), (n.effect = null);
            },
          },
          {
            key: "timeline",
            get: function () {
              var e = B.get(this);
              return e.timeline || e.animation.timeline;
            },
            set: function (e) {
              var n = this.timeline;
              if (n != e) {
                var t = this.playState,
                  i = this.currentTime,
                  r = B.get(this),
                  a = q(r),
                  o = a > 0 ? W(r, i) / a : 0,
                  l = n instanceof g,
                  s = e instanceof g;
                r.resetCurrentTimeOnResume = !1;
                var u = this.pending;
                if ((l && p(r.timeline, r.animation), s)) {
                  (r.timeline = e), U(r);
                  var c = r.animation.playbackRate >= 0 ? 0 : q(r);
                  switch (t) {
                    case "running":
                    case "finished":
                      (r.startTime = c),
                        v(r.timeline, r.animation, X.bind(this));
                      break;
                    case "paused":
                      (r.resetCurrentTimeOnResume = !0),
                        (r.startTime = null),
                        (r.holdTime = W(r, CSS.percent(100 * o)));
                      break;
                    default:
                      (r.holdTime = null), (r.startTime = null);
                  }
                  return (
                    u &&
                      ((r.readyPromise && "resolved" != r.readyPromise.state) ||
                        L(r),
                      (r.pendingTask = "paused" == t ? "pause" : "play")),
                    null !== r.startTime && (r.holdTime = null),
                    void z(r, !1, !1)
                  );
                }
                if (r.animation.timeline != e)
                  throw TypeError("Unsupported timeline: " + e);
                if ((p(r.timeline, r.animation), (r.timeline = null), l))
                  switch (
                    (null !== i && (r.animation.currentTime = o * q(r)), t)
                  ) {
                    case "paused":
                      r.animation.pause();
                      break;
                    case "running":
                    case "finished":
                      r.animation.play();
                  }
              }
            },
          },
          {
            key: "startTime",
            get: function () {
              var e = B.get(this);
              return e.timeline ? j(e, e.startTime) : e.animation.startTime;
            },
            set: function (e) {
              var n = B.get(this);
              if (((e = W(n, e)), n.timeline)) {
                null == W(n, n.timeline.currentTime) &&
                  null != n.startTime &&
                  ((n.holdTime = null), K(n));
                var t = W(n, this.currentTime);
                U(n),
                  (n.startTime = e),
                  (n.resetCurrentTimeOnResume = !1),
                  (n.holdTime =
                    null !== n.startTime && 0 != n.animation.playbackRate
                      ? null
                      : t),
                  n.pendingTask &&
                    ((n.pendingTask = null), n.readyPromise.resolve(this)),
                  z(n, !0, !1),
                  K(n);
              } else n.animation.startTime = e;
            },
          },
          {
            key: "currentTime",
            get: function () {
              var e = B.get(this);
              return e.timeline
                ? j(e, null != e.holdTime ? e.holdTime : H(e))
                : e.animation.currentTime;
            },
            set: function (e) {
              var n = B.get(this);
              if (((e = W(n, e)), n.timeline && null != e)) {
                var t = n.timeline.phase;
                null !== n.holdTime ||
                null === n.startTime ||
                "inactive" == t ||
                0 == n.animation.playbackRate
                  ? (n.holdTime = e)
                  : (n.startTime = F(n, e)),
                  (n.resetCurrentTimeOnResume = !1),
                  "inactive" == t && (n.startTime = null),
                  (n.previousCurrentTime = null),
                  "pause" == n.pendingTask &&
                    ((n.holdTime = e),
                    U(n),
                    (n.startTime = null),
                    (n.pendingTask = null),
                    n.readyPromise.resolve(this)),
                  z(n, !0, !1);
              } else n.animation.currentTime = e;
            },
          },
          {
            key: "playbackRate",
            get: function () {
              return B.get(this).animation.playbackRate;
            },
            set: function (e) {
              var n = B.get(this);
              if (n.timeline) {
                n.pendingPlaybackRate = null;
                var t = this.currentTime;
                (n.animation.playbackRate = e),
                  null !== t && (this.currentTime = t);
              } else n.animation.playbackRate = e;
            },
          },
          {
            key: "playState",
            get: function () {
              var e = B.get(this);
              if (!e.timeline) return e.animation.playState;
              var n = W(e, this.currentTime);
              if (null === n && null === e.startTime && null == e.pendingTask)
                return "idle";
              if (
                "pause" == e.pendingTask ||
                (null === e.startTime && "play" != e.pendingTask)
              )
                return "paused";
              if (null != n) {
                if (e.animation.playbackRate > 0 && n >= q(e))
                  return "finished";
                if (e.animation.playbackRate < 0 && n <= 0) return "finished";
              }
              return "running";
            },
          },
          {
            key: "replaceState",
            get: function () {
              return B.get(this).animation.pending;
            },
          },
          {
            key: "pending",
            get: function () {
              var e = B.get(this);
              return e.timeline
                ? !!e.readyPromise && "pending" == e.readyPromise.state
                : e.animation.pending;
            },
          },
          {
            key: "id",
            get: function () {
              return B.get(this).animation.id;
            },
            set: function (e) {
              B.get(this).animation.id = e;
            },
          },
          {
            key: "onfinish",
            get: function () {
              return B.get(this).animation.onfinish;
            },
            set: function (e) {
              B.get(this).animation.onfinish = e;
            },
          },
          {
            key: "oncancel",
            get: function () {
              return B.get(this).animation.oncancel;
            },
            set: function (e) {
              B.get(this).animation.oncancel = e;
            },
          },
          {
            key: "onremove",
            get: function () {
              return B.get(this).animation.onremove;
            },
            set: function (e) {
              B.get(this).animation.onremove = e;
            },
          },
          {
            key: "finished",
            get: function () {
              var e = B.get(this);
              return e.timeline
                ? (e.finishedPromise || (e.finishedPromise = new O()),
                  e.finishedPromise.promise)
                : e.animation.finished;
            },
          },
          {
            key: "ready",
            get: function () {
              var e = B.get(this);
              return e.timeline
                ? (e.readyPromise ||
                    ((e.readyPromise = new O()), e.readyPromise.resolve(this)),
                  e.readyPromise.promise)
                : e.animation.ready;
            },
          },
        ]),
        e
      );
    })();
  function J(e, n) {
    if (!e) return n;
    var t = n.rangeName,
      i = n.offset;
    if (e instanceof Object)
      null != e.rangeName && (t = e.rangeName),
        void 0 !== e.offset && (i = e.offset);
    else {
      var r = e.split(" ");
      (t = r[0]), 2 == r.length && (i = r[1]);
    }
    if (!R.includes(t)) throw TypeError("Invalid range name");
    if (!(i instanceof Object)) {
      if (!i.endsWith("%") && !i.endsWith("px"))
        throw TypeError(
          "Invalid range offset. Only % and px are supported (for now)",
        );
      var a = parseFloat(i);
      i.endsWith("%")
        ? (i = CSS.percent(a))
        : i.endsWith("px") && (i = CSS.px(a));
    }
    return { rangeName: t, offset: i };
  }
  function Z() {
    return { rangeName: "cover", offset: CSS.percent(0) };
  }
  function ee() {
    return { rangeName: "cover", offset: CSS.percent(100) };
  }
  function ne(e) {
    var n = { start: Z(), end: ee() };
    if (!e) return n;
    var t = e.split(" "),
      i = [],
      r = [];
    if (
      (t.forEach(function (e) {
        e.endsWith("%") ? r.push(parseFloat(e)) : i.push(e);
      }),
      i.length > 2 || r.length > 2 || 1 == r.length)
    )
      throw TypeError("Invalid time range or unsupported time range format.");
    return (
      i.length &&
        ((n.start.rangeName = i[0]),
        (n.end.rangeName = i.length > 1 ? i[1] : i[0])),
      r.length > 1 &&
        ((n.start.offset = CSS.percent(r[0])),
        (n.end.offset = CSS.percent(r[1]))),
      n
    );
  }
  function te(e, n) {
    var t = n.timeline;
    t instanceof g && delete n.timeline;
    var i = C.apply(this, [e, n]),
      r = new $(i, t);
    return (
      t instanceof g &&
        (i.pause(),
        t instanceof ViewTimeline &&
          (B.get(r).animationRange = {
            start: J(n.rangeStart, Z()),
            end: J(n.rangeEnd, ee()),
          }),
        r.play()),
      r
    );
  }
  var ie = {
      IDENTIFIER: /[\w\\\@_-]+/g,
      WHITE_SPACE: /\s*/g,
      NUMBER: /^[0-9]+/,
      TIME: /^[0-9]+(s|ms)/,
      SCROLL_TIMELINE: /scroll-timeline\s*:([^;}]+)/,
      SCROLL_TIMELINE_NAME: /scroll-timeline-name\s*:([^;}]+)/,
      SCROLL_TIMELINE_AXIS: /scroll-timeline-axis\s*:([^;}]+)/,
      VIEW_TIMELINE: /view-timeline\s*:([^;}]+)/,
      VIEW_TIMELINE_NAME: /view-timeline-name\s*:([^;}]+)/,
      VIEW_TIMELINE_AXIS: /view-timeline-axis\s*:([^;}]+)/,
      VIEW_TIMELINE_INSET: /view-timeline-inset\s*:([^;}]+)/,
      ANIMATION_TIMELINE: /animation-timeline\s*:([^;}]+)/,
      ANIMATION_TIME_RANGE: /animation-range\s*:([^;}]+)/,
      ANIMATION_NAME: /animation-name\s*:([^;}]+)/,
      ANIMATION: /animation\s*:([^;}]+)/,
      ANONYMOUS_SCROLL_TIMELINE: /scroll\(([^)]*)\)/,
      ANONYMOUS_VIEW_TIMELINE: /view\(([^)]*)\)/,
    },
    re = ["block", "inline", "x", "y"],
    ae = ["nearest", "root"],
    oe = new ((function () {
      function e() {
        (this.cssRulesWithTimelineName = []),
          (this.nextAnonymousTimelineNameIndex = 0),
          (this.anonymousScrollTimelineOptions = new Map()),
          (this.anonymousViewTimelineOptions = new Map()),
          (this.sourceSelectorToScrollTimeline = []),
          (this.subjectSelectorToViewTimeline = []),
          (this.keyframeNamesSelectors = new Map());
      }
      var n = e.prototype;
      return (
        (n.transpileStyleSheet = function (e, n, t) {
          for (
            var i = { sheetSrc: e, index: 0, name: t };
            i.index < i.sheetSrc.length &&
            (this.eatWhitespace(i), !(i.index >= i.sheetSrc.length));

          )
            if (this.lookAhead("/*", i))
              for (; this.lookAhead("/*", i); )
                this.eatComment(i), this.eatWhitespace(i);
            else {
              var r = this.parseQualifiedRule(i);
              r &&
                (n
                  ? this.parseKeyframesAndSaveNameMapping(r, i)
                  : this.handleScrollTimelineProps(r, i));
            }
          return i.sheetSrc;
        }),
        (n.getAnimationTimelineOptions = function (e, n) {
          for (var t = this.cssRulesWithTimelineName.length - 1; t >= 0; t--) {
            var i = this.cssRulesWithTimelineName[t];
            if (
              n.matches(i.selector) &&
              (!i["animation-name"] || i["animation-name"] == e)
            )
              return {
                "animation-timeline": i["animation-timeline"],
                "animation-range": i["animation-range"],
              };
          }
          return null;
        }),
        (n.getAnonymousScrollTimelineOptions = function (e, n) {
          var t = this.anonymousScrollTimelineOptions.get(e);
          return t
            ? {
                anonymousSource: t.source,
                anonymousTarget: n,
                source: T(t.source, n),
                axis: t.axis ? t.axis : "block",
              }
            : null;
        }),
        (n.getScrollTimelineOptions = function (e, n) {
          var i = this.getAnonymousScrollTimelineOptions(e, n);
          if (i) return i;
          for (
            var r = this.sourceSelectorToScrollTimeline.length - 1;
            r >= 0;
            r--
          ) {
            var a = this.sourceSelectorToScrollTimeline[r];
            if (a.name == e) {
              var o = this.findPreviousSiblingOrAncestorMatchingSelector(
                n,
                a.selector,
              );
              if (o) return t({ source: o }, a.axis ? { axis: a.axis } : {});
            }
          }
          return null;
        }),
        (n.findPreviousSiblingOrAncestorMatchingSelector = function (e, n) {
          for (var t = e; t; ) {
            if (t.matches(n)) return t;
            t = t.previousElementSibling || t.parentElement;
          }
          return null;
        }),
        (n.getAnonymousViewTimelineOptions = function (e, n) {
          var t = this.anonymousViewTimelineOptions.get(e);
          return t
            ? {
                subject: n,
                axis: t.axis ? t.axis : "block",
                inset: t.inset ? t.inset : "auto",
              }
            : null;
        }),
        (n.getViewTimelineOptions = function (e, n) {
          var t = this.getAnonymousViewTimelineOptions(e, n);
          if (t) return t;
          for (
            var i = this.subjectSelectorToViewTimeline.length - 1;
            i >= 0;
            i--
          ) {
            var r = this.subjectSelectorToViewTimeline[i];
            if (r.name == e) {
              var a = this.findPreviousSiblingOrAncestorMatchingSelector(
                n,
                r.selector,
              );
              if (a) return { subject: a, axis: r.axis, inset: r.inset };
            }
          }
          return null;
        }),
        (n.handleScrollTimelineProps = function (e, n) {
          var t = this;
          if (!e.selector.includes("@keyframes")) {
            var i = e.block.contents.includes("animation-name:"),
              r = e.block.contents.includes("animation-timeline:"),
              a = e.block.contents.includes("animation:");
            this.saveSourceSelectorToScrollTimeline(e),
              this.saveSubjectSelectorToViewTimeline(e);
            var o = [],
              l = [],
              s = !1;
            r && (o = this.extractScrollTimelineNames(e.block.contents)),
              i &&
                (l = this.extractMatches(e.block.contents, ie.ANIMATION_NAME)),
              (r && i) ||
                (a &&
                  this.extractMatches(e.block.contents, ie.ANIMATION).forEach(
                    function (n) {
                      var i = t.extractAnimationName(n);
                      i && r && l.push(i),
                        r &&
                          (t.hasDuration(n) ||
                            (t.hasAutoDuration(n) &&
                              (e.block.contents = e.block.contents.replace(
                                "auto",
                                "    ",
                              )),
                            (e.block.contents = e.block.contents.replace(
                              n,
                              " 1s " + n,
                            )),
                            (s = !0)));
                    },
                  ),
                s &&
                  this.replacePart(
                    e.block.startIndex,
                    e.block.endIndex,
                    e.block.contents,
                    n,
                  )),
              this.saveRelationInList(e, o, l);
          }
        }),
        (n.saveSourceSelectorToScrollTimeline = function (e) {
          var n,
            t = e.block.contents.includes("scroll-timeline:"),
            i = e.block.contents.includes("scroll-timeline-name:"),
            r = e.block.contents.includes("scroll-timeline-axis:");
          if (t || i) {
            var a = [];
            if (t)
              for (
                var o,
                  s = l(
                    this.extractMatches(e.block.contents, ie.SCROLL_TIMELINE),
                  );
                !(o = s()).done;

              ) {
                var u = this.split(o.value),
                  c = { selector: e.selector, name: "" };
                1 == u.length
                  ? (c.name = u[0])
                  : 2 == u.length &&
                    (re.includes(u[0])
                      ? ((c.axis = u[0]), (c.name = u[1]))
                      : ((c.axis = u[1]), (c.name = u[0]))),
                  a.push(c);
              }
            if (i)
              for (
                var m = this.extractMatches(
                    e.block.contents,
                    ie.SCROLL_TIMELINE_NAME,
                  ),
                  f = 0;
                f < m.length;
                f++
              )
                f < a.length
                  ? (a[f].name = m[f])
                  : a.push({ selector: e.selector, name: m[f] });
            var h = [];
            if (r) {
              var d = this.extractMatches(
                e.block.contents,
                ie.SCROLL_TIMELINE_AXIS,
              );
              if (
                (h = d.filter(function (e) {
                  return re.includes(e);
                })).length != d.length
              )
                throw new Error("Invalid axis");
            }
            for (var p = 0; p < a.length; p++)
              h.length && (a[p].axis = h[p % a.length]);
            (n = this.sourceSelectorToScrollTimeline).push.apply(n, a);
          }
        }),
        (n.saveSubjectSelectorToViewTimeline = function (e) {
          var n,
            t = e.block.contents.includes("view-timeline:"),
            i = e.block.contents.includes("view-timeline-name:"),
            r = e.block.contents.includes("view-timeline-axis:"),
            a = e.block.contents.includes("view-timeline-inset:");
          if (t || i) {
            var o = [];
            if (t)
              for (
                var s,
                  u = l(
                    this.extractMatches(e.block.contents, ie.VIEW_TIMELINE),
                  );
                !(s = u()).done;

              ) {
                var c = this.split(s.value),
                  m = { selector: e.selector, name: "", inset: null };
                1 == c.length
                  ? (m.name = c[0])
                  : 2 == c.length &&
                    (re.includes(c[0])
                      ? ((m.axis = c[0]), (m.name = c[1]))
                      : ((m.axis = c[1]), (m.name = c[0]))),
                  o.push(m);
              }
            if (i)
              for (
                var f = this.extractMatches(
                    e.block.contents,
                    ie.VIEW_TIMELINE_NAME,
                  ),
                  h = 0;
                h < f.length;
                h++
              )
                h < o.length
                  ? (o[h].name = f[h])
                  : o.push({ selector: e.selector, name: f[h], inset: null });
            var d = [],
              p = [];
            if (
              (a &&
                (d = this.extractMatches(
                  e.block.contents,
                  ie.VIEW_TIMELINE_INSET,
                )),
              r)
            ) {
              var v = this.extractMatches(
                e.block.contents,
                ie.VIEW_TIMELINE_AXIS,
              );
              if (
                (p = v.filter(function (e) {
                  return re.includes(e);
                })).length != v.length
              )
                throw new Error("Invalid axis");
            }
            for (var g = 0; g < o.length; g++)
              d.length && (o[g].inset = d[g % o.length]),
                p.length && (o[g].axis = p[g % o.length]);
            (n = this.subjectSelectorToViewTimeline).push.apply(n, o);
          }
        }),
        (n.hasDuration = function (e) {
          return (
            e.split(" ").filter(function (e) {
              return ie.TIME.exec(e);
            }).length >= 1
          );
        }),
        (n.hasAutoDuration = function (e) {
          return (
            e.split(" ").filter(function (e) {
              return "auto" === e;
            }).length >= 1
          );
        }),
        (n.saveRelationInList = function (e, n, i) {
          var r = [];
          e.block.contents.includes("animation-range:") &&
            (r = this.extractMatches(
              e.block.contents,
              ie.ANIMATION_TIME_RANGE,
            ));
          for (
            var a = Math.max(n.length, i.length, r.length), o = 0;
            o < a;
            o++
          )
            this.cssRulesWithTimelineName.push(
              t(
                { selector: e.selector, "animation-timeline": n[o % n.length] },
                i.length ? { "animation-name": i[o % i.length] } : {},
                r.length ? { "animation-range": r[o % r.length] } : {},
              ),
            );
        }),
        (n.extractScrollTimelineNames = function (e) {
          var n = this,
            t = ie.ANIMATION_TIMELINE.exec(e)[1].trim(),
            i = [];
          return (
            t
              .split(",")
              .map(function (e) {
                return e.trim();
              })
              .forEach(function (e) {
                if (
                  (function (e) {
                    return (
                      (e.startsWith("scroll") || e.startsWith("view")) &&
                      e.includes("(")
                    );
                  })(e)
                ) {
                  var t = n.saveAnonymousTimelineName(e);
                  i.push(t);
                } else i.push(e);
              }),
            i
          );
        }),
        (n.saveAnonymousTimelineName = function (e) {
          var n = ":t" + this.nextAnonymousTimelineNameIndex++;
          return (
            e.startsWith("scroll(")
              ? this.anonymousScrollTimelineOptions.set(
                  n,
                  this.parseAnonymousScrollTimeline(e),
                )
              : this.anonymousViewTimelineOptions.set(
                  n,
                  this.parseAnonymousViewTimeline(e),
                ),
            n
          );
        }),
        (n.parseAnonymousScrollTimeline = function (e) {
          var n = ie.ANONYMOUS_SCROLL_TIMELINE.exec(e);
          if (!n) return null;
          var t = {};
          return (
            n[1].split(" ").forEach(function (e) {
              re.includes(e) ? (t.axis = e) : ae.includes(e) && (t.source = e);
            }),
            t
          );
        }),
        (n.parseAnonymousViewTimeline = function (e) {
          var n = ie.ANONYMOUS_VIEW_TIMELINE.exec(e);
          if (!n) return null;
          var t = {};
          return (
            n[1].split(" ").forEach(function (e) {
              re.includes(e)
                ? (t.axis = e)
                : (t.inset = t.inset ? t.inset + " " + e : e);
            }),
            t
          );
        }),
        (n.extractAnimationName = function (e) {
          return this.findMatchingEntryInContainer(
            e,
            this.keyframeNamesSelectors,
          );
        }),
        (n.findMatchingEntryInContainer = function (e, n) {
          var t = e.split(" ").filter(function (e) {
            return n.has(e);
          });
          return t ? t[0] : null;
        }),
        (n.parseIdentifier = function (e) {
          ie.IDENTIFIER.lastIndex = e.index;
          var n = ie.IDENTIFIER.exec(e.sheetSrc);
          if (!n) throw this.parseError(e, "Expected an identifier");
          return (e.index += n[0].length), n[0];
        }),
        (n.parseKeyframesAndSaveNameMapping = function (e, n) {
          var t = this;
          if (e.selector.startsWith("@keyframes")) {
            var i = this.replaceKeyframesAndGetMapping(e, n);
            e.selector.split(" ").forEach(function (e, n) {
              n > 0 && t.keyframeNamesSelectors.set(e, i);
            });
          }
        }),
        (n.replaceKeyframesAndGetMapping = function (e, n) {
          var t = e.block.contents,
            i = (function (e) {
              for (var n = 0, t = -1, i = [], r = 0; r < e.length; r++)
                "{" == e[r] ? n++ : "}" == e[r] && n--,
                  1 == n && "{" != e[r] && "}" != e[r] && -1 == t && (t = r),
                  2 == n &&
                    "{" == e[r] &&
                    (i.push({ start: t, end: r }), (t = -1));
              return i;
            })(t);
          if (0 == i.length) return new Map();
          var r = new Map(),
            a = !1,
            o = [];
          o.push(t.substring(0, i[0].start));
          for (
            var l = function (e) {
                var n = t.substring(i[e].start, i[e].end),
                  l = [];
                n.split(",").forEach(function (e) {
                  var n,
                    t = e
                      .split(" ")
                      .map(function (e) {
                        return e.trim();
                      })
                      .filter(function (e) {
                        return "" != e;
                      })
                      .join(" "),
                    i = r.size;
                  r.set(i, t),
                    l.push(i + "%"),
                    (n = t),
                    R.some(function (e) {
                      return n.startsWith(e);
                    }) && (a = !0);
                }),
                  o.push(l.join(",")),
                  o.push(
                    e == i.length - 1
                      ? t.substring(i[e].end)
                      : t.substring(i[e].end, i[e + 1].start),
                  );
              },
              s = 0;
            s < i.length;
            s++
          )
            l(s);
          return a
            ? ((e.block.contents = o.join("")),
              this.replacePart(
                e.block.startIndex,
                e.block.endIndex,
                e.block.contents,
                n,
              ),
              r)
            : new Map();
        }),
        (n.parseQualifiedRule = function (e) {
          var n = e.index,
            t = this.parseSelector(e).trim();
          if (t)
            return {
              selector: t,
              block: this.eatBlock(e),
              startIndex: n,
              endIndex: e.index,
            };
        }),
        (n.removeEnclosingDoubleQuotes = function (e) {
          return e.substring(
            '"' == e[0] ? 1 : 0,
            '"' == e[e.length - 1] ? e.length - 1 : e.length,
          );
        }),
        (n.assertString = function (e, n) {
          if (e.sheetSrc.substr(e.index, n.length) != n)
            throw this.parseError(e, "Did not find expected sequence " + n);
          e.index += n.length;
        }),
        (n.replacePart = function (e, n, t, i) {
          (i.sheetSrc = i.sheetSrc.slice(0, e) + t + i.sheetSrc.slice(n)),
            i.index >= n && (i.index = e + t.length + (i.index - n));
        }),
        (n.eatComment = function (e) {
          this.assertString(e, "/*"),
            this.eatUntil("*/", e, !0),
            this.assertString(e, "*/");
        }),
        (n.eatBlock = function (e) {
          var n = e.index;
          this.assertString(e, "{");
          for (var t = 1; 0 != t; )
            this.lookAhead("/*", e)
              ? this.eatComment(e)
              : ("{" === e.sheetSrc[e.index]
                  ? t++
                  : "}" === e.sheetSrc[e.index] && t--,
                this.advance(e));
          var i = e.index;
          return {
            startIndex: n,
            endIndex: i,
            contents: e.sheetSrc.slice(n, i),
          };
        }),
        (n.advance = function (e) {
          if ((e.index++, e.index > e.sheetSrc.length))
            throw this.parseError(e, "Advanced beyond the end");
        }),
        (n.parseError = function (e, n) {
          return Error(
            "(" + (e.name ? e.name : "<anonymous file>") + "): " + n,
          );
        }),
        (n.eatUntil = function (e, n, t) {
          void 0 === t && (t = !1);
          for (var i = n.index; !this.lookAhead(e, n); ) this.advance(n);
          return (
            t &&
              (n.sheetSrc =
                n.sheetSrc.slice(0, i) +
                " ".repeat(n.index - i) +
                n.sheetSrc.slice(n.index)),
            n.sheetSrc.slice(i, n.index)
          );
        }),
        (n.parseSelector = function (e) {
          var n = e.index;
          if ((this.eatUntil("{", e), n === e.index))
            throw Error("Empty selector");
          return e.sheetSrc.slice(n, e.index);
        }),
        (n.eatWhitespace = function (e) {
          ie.WHITE_SPACE.lastIndex = e.index;
          var n = ie.WHITE_SPACE.exec(e.sheetSrc);
          n && (e.index += n[0].length);
        }),
        (n.lookAhead = function (e, n) {
          return n.sheetSrc.substr(n.index, e.length) == e;
        }),
        (n.peek = function (e) {
          return e.sheetSrc[e.index];
        }),
        (n.extractMatches = function (e, n, t) {
          return (
            void 0 === t && (t = ","),
            n
              .exec(e)[1]
              .trim()
              .split(t)
              .map(function (e) {
                return e.trim();
              })
          );
        }),
        (n.split = function (e) {
          return e
            .split(" ")
            .map(function (e) {
              return e.trim();
            })
            .filter(function (e) {
              return "" != e;
            });
        }),
        e
      );
    })())();
  function le(e, n, t, i, r, a) {
    return N(I(e, n, t, i, r), a, I("cover", n, t, i, r));
  }
  !(function () {
    if (
      !(function () {
        if (CSS.supports("animation-timeline: --works")) return !0;
        !(function () {
          function e(e) {
            if (0 !== e.innerHTML.trim().length) {
              var n = oe.transpileStyleSheet(e.innerHTML, !0);
              (n = oe.transpileStyleSheet(n, !1)), (e.innerHTML = n);
            }
          }
          new MutationObserver(function (n) {
            for (var t, i = l(n); !(t = i()).done; )
              for (var r, a = l(t.value.addedNodes); !(r = a()).done; ) {
                var o = r.value;
                o instanceof HTMLStyleElement && e(o);
              }
          }).observe(document.documentElement, { childList: !0, subtree: !0 }),
            document.querySelectorAll("style").forEach(function (n) {
              return e(n);
            }),
            document.querySelectorAll("link").forEach(function (e) {});
        })();
        var e = new WeakMap();
        window.addEventListener("animationstart", function (n) {
          n.target
            .getAnimations()
            .filter(function (e) {
              return e.animationName === n.animationName;
            })
            .forEach(function (t) {
              e.has(n.target) || e.set(n.target, new Map());
              var i = e.get(n.target);
              if (!i.has(t.animationName)) {
                var r = (function (e, n, t) {
                  var i = oe.getAnimationTimelineOptions(n, t);
                  if (!i) return null;
                  var r = i["animation-timeline"];
                  if (!r) return null;
                  var a =
                    oe.getScrollTimelineOptions(r, t) ||
                    oe.getViewTimelineOptions(r, t);
                  return a
                    ? (a.subject &&
                        (function (e, n) {
                          var t = E(n.subject),
                            i = n.axis || n.axis,
                            r = oe.keyframeNamesSelectors.get(e.animationName);
                          if (r && r.size) {
                            var a = [];
                            e.effect.getKeyframes().forEach(function (e) {
                              var o = (function (e, r) {
                                for (
                                  var a, o = null, s = l(e);
                                  !(a = s()).done;

                                ) {
                                  var u = a.value,
                                    c = u[1];
                                  if (u[0] == 100 * r.offset) {
                                    if ("from" == c) o = 0;
                                    else if ("to" == c) o = 100;
                                    else {
                                      var m = c.split(" ");
                                      o =
                                        1 == m.length
                                          ? parseFloat(m[0])
                                          : 100 *
                                            le(
                                              m[0],
                                              t,
                                              n.subject,
                                              i,
                                              n.inset,
                                              CSS.percent(parseFloat(m[1])),
                                            );
                                    }
                                    break;
                                  }
                                }
                                return o;
                              })(r, e);
                              null !== o &&
                                o >= 0 &&
                                o <= 100 &&
                                ((e.offset = o / 100), a.push(e));
                            });
                            var o = a.sort(function (e, n) {
                              return e.offset < n.offset
                                ? -1
                                : e.affset > n.offset
                                  ? 1
                                  : 0;
                            });
                            e.effect.setKeyframes(o);
                          }
                        })(e, a),
                      {
                        timeline: a.source ? new g(a) : new P(a),
                        animOptions: i,
                      })
                    : null;
                })(t, t.animationName, n.target);
                i.set(
                  t.animationName,
                  r && r.timeline && t.timeline != r.timeline
                    ? new $(t, r.timeline, r.animOptions)
                    : null,
                );
              }
              var a = i.get(t.animationName);
              null !== a && (t.pause(), a.play());
            });
        }),
          window.addEventListener(
            "pagehide",
            function (n) {
              e = new WeakMap();
            },
            !1,
          );
      })()
    ) {
      if (
        ([].concat(document.styleSheets).filter(function (e) {
          return null !== e.href;
        }).length &&
          console.warn(
            "Non-Inline StyleSheets detected: ScrollTimeline polyfill currently only supports inline styles within style tags",
          ),
        !Reflect.defineProperty(window, "ScrollTimeline", { value: g }))
      )
        throw Error(
          "Error installing ScrollTimeline polyfill: could not attach ScrollTimeline to window",
        );
      if (!Reflect.defineProperty(window, "ViewTimeline", { value: P }))
        throw Error(
          "Error installing ViewTimeline polyfill: could not attach ViewTimeline to window",
        );
      if (!Reflect.defineProperty(Element.prototype, "animate", { value: te }))
        throw Error(
          "Error installing ScrollTimeline polyfill: could not attach WAAPI's animate to DOM Element",
        );
      if (!Reflect.defineProperty(window, "Animation", { value: $ }))
        throw Error("Error installing Animation constructor.");
    }
  })();
})();
