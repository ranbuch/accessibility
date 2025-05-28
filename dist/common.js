'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _readOnlyError(r) { throw new TypeError('"' + r + '" is read-only'); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Common = exports.Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
    _defineProperty(this, "body", void 0);
    _defineProperty(this, "deployedMap", void 0);
    _defineProperty(this, "_isIOS", void 0);
    _defineProperty(this, "_canvas", void 0);
    this.body = document.body || document.querySelector('body');
    this.deployedMap = new Map();
  }
  return _createClass(Common, [{
    key: "isIOS",
    value: function isIOS() {
      if (typeof this._isIOS === 'boolean') return this._isIOS;
      var isIOS = function isIOS() {
        var iDevices = ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'];
        if (!!navigator.platform) {
          while (iDevices.length) {
            if (navigator.platform === iDevices.pop()) {
              return true;
            }
          }
        }
        return false;
      };
      this._isIOS = isIOS();
      return this._isIOS;
    }
  }, {
    key: "jsonToHtml",
    value: function jsonToHtml(obj) {
      var elm = document.createElement(obj.type);
      for (var i in obj.attrs) {
        elm.setAttribute(i, obj.attrs[i]);
      }
      for (var _i in obj.children) {
        var newElem = null;
        if (obj.children[_i].type === '#text') {
          newElem = document.createTextNode(obj.children[_i].text);
        } else newElem = this.jsonToHtml(obj.children[_i]);
        if (newElem && newElem.tagName && newElem.tagName.toLowerCase() !== 'undefined' || newElem.nodeType === 3) elm.appendChild(newElem);
      }
      return elm;
    }
  }, {
    key: "injectStyle",
    value: function injectStyle(css) {
      var innerOptions = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var sheet = document.createElement('style');
      sheet.appendChild(document.createTextNode(css));
      if (innerOptions.className) sheet.classList.add(innerOptions.className);
      this.body.appendChild(sheet);
      return sheet;
    }
  }, {
    key: "getFormattedDim",
    value: function getFormattedDim(value) {
      if (!value) return null;
      value = String(value);
      var returnBySuffix = function returnBySuffix(val, suffix) {
        return {
          size: val.substring(0, val.indexOf(suffix)),
          suffix: suffix
        };
      };
      if (value.indexOf('%') > -1) return returnBySuffix(value, '%');
      if (value.indexOf('px') > -1) return returnBySuffix(value, 'px');
      if (value.indexOf('em') > -1) return returnBySuffix(value, 'em');
      if (value.indexOf('rem') > -1) return returnBySuffix(value, 'rem');
      if (value.indexOf('pt') > -1) return returnBySuffix(value, 'pt');
      if (value === 'auto') return returnBySuffix(value, '');
    }
  }, {
    key: "extend",
    value: function extend(src, dest) {
      for (var i in src) {
        if (_typeof(src[i]) === 'object') {
          if (dest && dest[i]) {
            if (dest[i] instanceof Array) src[i] = dest[i];else src[i] = this.extend(src[i], dest[i]);
          }
        } else if (_typeof(dest) === 'object' && typeof dest[i] !== 'undefined') {
          src[i] = dest[i];
        }
      }
      return src;
    }
  }, {
    key: "injectIconsFont",
    value: function injectIconsFont(urls, callback) {
      var _this = this;
      if (urls && urls.length) {
        var head = document.getElementsByTagName('head')[0];
        var counter = 0;
        var hasErrors = false;
        var onload = function onload(e) {
          hasErrors = hasErrors || e.type === '';
          if (! --counter) callback(hasErrors);
        };
        urls.forEach(function (url) {
          var link = document.createElement('link');
          link.type = 'text/css';
          link.rel = 'stylesheet';
          link.href = url;
          link.className = "_access-font-icon-".concat(counter++);
          link.onload = onload;
          link.onerror = onload;
          _this.deployedObjects.set('.' + link.className, true);
          head.appendChild(link);
        });
      }
    }
  }, {
    key: "getFixedFont",
    value: function getFixedFont(name) {
      if (this.isIOS()) return name.replaceAll(' ', '+');
      return name;
    }
  }, {
    key: "getFixedPseudoFont",
    value: function getFixedPseudoFont(name) {
      if (this.isIOS()) return name.replaceAll('+', ' ');
      return name;
    }
  }, {
    key: "isFontLoaded",
    value: function isFontLoaded(fontFamily, callback) {
      try {
        var onReady = function onReady() {
          return callback(document.fonts.check("1em ".concat(fontFamily.replaceAll('+', ' '))));
          // return callback(document.fonts.check(`1em ${fontFamily}`));
        };
        document.fonts.ready.then(function () {
          onReady();
        }, function () {
          onReady();
        });
      } catch (e) {
        return callback(true);
      }
    }
  }, {
    key: "warn",
    value: function warn(msg) {
      var prefix = 'Accessibility: ';
      if (console.warn) console.warn(prefix + msg);else console.log(prefix + msg);
    }
  }, {
    key: "deployedObjects",
    get: function get() {
      var _this2 = this;
      return {
        get: function get(key) {
          return _this2.deployedMap.get(key);
        },
        contains: function contains(key) {
          return _this2.deployedMap.has(key);
        },
        set: function set(key, val) {
          _this2.deployedMap.set(key, val);
        },
        remove: function remove(key) {
          _this2.deployedMap["delete"](key);
        },
        getAll: function getAll() {
          return _this2.deployedMap;
        }
      };
    }
  }, {
    key: "createScreenshot",
    value: function createScreenshot(url) {
      var _this3 = this;
      return new Promise(function (resolve, reject) {
        if (!_this3._canvas) _this3._canvas = document.createElement('canvas');
        var img = new Image();
        _this3._canvas.style.position = 'fixed';
        _this3._canvas.style.top = '0';
        _this3._canvas.style.left = '0';
        _this3._canvas.style.opacity = '0.05';
        _this3._canvas.style.transform = 'scale(0.05)';
        img.crossOrigin = 'anonymous';
        img.onload = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
          var ctx, res;
          return _regeneratorRuntime().wrap(function _callee$(_context) {
            while (1) switch (_context.prev = _context.next) {
              case 0:
                document.body.appendChild(_this3._canvas);
                ctx = _this3._canvas.getContext('2d');
                _this3._canvas.width = img.naturalWidth;
                _this3._canvas.height = img.naturalHeight;
                ctx.clearRect(0, 0, _this3._canvas.width, _this3._canvas.height);
                // await this.setTimeout(1500);
                ctx.drawImage(img, 0, 0);
                res = Common.DEFAULT_PIXEL;
                try {
                  res = _this3._canvas.toDataURL('image/png');
                } catch (e) {}
                resolve(res);
                _this3._canvas.remove();
              case 10:
              case "end":
                return _context.stop();
            }
          }, _callee);
        }));
        img.onerror = function () {
          // Return a 1X1 pixels transparent image as a fallback
          resolve(Common.DEFAULT_PIXEL);
        };
        img.src = url;
      });
    }
  }, {
    key: "getFileExtension",
    value: function getFileExtension(filename) {
      return filename.substring(filename.lastIndexOf('.') + 1, filename.length) || filename;
    }
  }]);
}();
_defineProperty(Common, "DEFAULT_PIXEL", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=');