'use strict';

// Do not delete this as it allows importing the package with other projects
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Accessibility = void 0;
require("regenerator-runtime/runtime.js");
var _common = require("./common");
var _accessibility = require("./interfaces/accessibility.interface");
var _menuInterface = require("./menu-interface");
var _storage = require("./storage");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Accessibility = exports.Accessibility = /*#__PURE__*/function () {
  function Accessibility() {
    var _this = this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Accessibility);
    _defineProperty(this, "_isReading", void 0);
    _defineProperty(this, "_common", void 0);
    _defineProperty(this, "_storage", void 0);
    _defineProperty(this, "_options", void 0);
    _defineProperty(this, "_sessionState", void 0);
    _defineProperty(this, "_htmlInitFS", void 0);
    _defineProperty(this, "_body", void 0);
    _defineProperty(this, "_html", void 0);
    _defineProperty(this, "_icon", void 0);
    _defineProperty(this, "_menu", void 0);
    _defineProperty(this, "_htmlOrgFontSize", void 0);
    _defineProperty(this, "_stateValues", void 0);
    _defineProperty(this, "_recognition", void 0);
    // SpeechRecognition;
    _defineProperty(this, "_speechToTextTarget", void 0);
    _defineProperty(this, "_onKeyDownBind", void 0);
    _defineProperty(this, "_fixedDefaultFont", void 0);
    _defineProperty(this, "menuInterface", void 0);
    _defineProperty(this, "options", void 0);
    this._common = new _common.Common();
    this._storage = new _storage.Storage();
    this.menuInterface = new _menuInterface.MenuInterface(this);
    this._fixedDefaultFont = this._common.getFixedFont('Material Icons');
    this._options = this.defaultOptions;
    this.options = this._common.extend(this._options, options);
    this.addModuleOrderIfNotDefined();
    this.addDefaultOptions(options);
    // Consider adding this:
    // if (options) {
    //     if (!options.textToSpeechLang && document.querySelector('html').getAttribute('lang')) {
    //         this.options.textToSpeechLang = document.querySelector('html').getAttribute('lang')
    //     }
    // }
    this.disabledUnsupportedFeatures();
    this._onKeyDownBind = this.onKeyDown.bind(this);
    this._sessionState = {
      textSize: 0,
      textSpace: 0,
      lineHeight: 0,
      invertColors: false,
      grayHues: false,
      underlineLinks: false,
      bigCursor: false,
      readingGuide: false
    };
    if (this.options.icon.useEmojis) {
      this.fontFallback();
      this.build();
    } else {
      this._common.injectIconsFont(this.options.icon.fontFaceSrc, function (hasError) {
        _this.build();
        if (_this.options.icon.fontFamilyValidation) {
          setTimeout(function () {
            _this._common.isFontLoaded(_this.options.icon.fontFamilyValidation, function (isLoaded) {
              if (!isLoaded || hasError) {
                console.log('!isLoaded || hasError', !isLoaded || hasError);
                _this._common.warn("".concat(_this.options.icon.fontFamilyValidation, " font was not loaded, using emojis instead"));
                _this.fontFallback();
                _this.destroy();
                _this.build();
              }
            });
          });
        }
      });
    }
    if (this.options.modules.speechToText) {
      window.addEventListener('beforeunload', function () {
        if (_this._isReading) {
          window.speechSynthesis.cancel();
          _this._isReading = false;
        }
      });
    }
  }
  return _createClass(Accessibility, [{
    key: "stateValues",
    get: function get() {
      return this._stateValues;
    },
    set: function set(value) {
      this._stateValues = value;
    }
  }, {
    key: "html",
    get: function get() {
      return this._html;
    }
  }, {
    key: "body",
    get: function get() {
      return this._body;
    }
  }, {
    key: "sessionState",
    get: function get() {
      return this._sessionState;
    },
    set: function set(value) {
      this._sessionState = value;
    }
  }, {
    key: "common",
    get: function get() {
      return this._common;
    }
  }, {
    key: "recognition",
    get: function get() {
      return this._recognition;
    }
  }, {
    key: "isReading",
    get: function get() {
      return this._isReading;
    },
    set: function set(value) {
      this._isReading = value;
    }
  }, {
    key: "fixedDefaultFont",
    get: function get() {
      return this._fixedDefaultFont;
    }

    // Default options
  }, {
    key: "defaultOptions",
    get: function get() {
      var res = {
        icon: {
          img: 'accessibility',
          fontFaceSrc: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
          fontClass: 'material-icons',
          useEmojis: false,
          closeIcon: 'close',
          resetIcon: 'refresh'
        },
        hotkeys: {
          enabled: false,
          helpTitles: true,
          keys: {
            toggleMenu: ['ctrlKey', 'altKey', 65],
            invertColors: ['ctrlKey', 'altKey', 73],
            grayHues: ['ctrlKey', 'altKey', 71],
            underlineLinks: ['ctrlKey', 'altKey', 85],
            bigCursor: ['ctrlKey', 'altKey', 67],
            readingGuide: ['ctrlKey', 'altKey', 82],
            textToSpeech: ['ctrlKey', 'altKey', 84],
            speechToText: ['ctrlKey', 'altKey', 83],
            disableAnimations: ['ctrlKey', 'altKey', 81]
          }
        },
        guide: {
          cBorder: '#20ff69',
          cBackground: '#000000',
          height: '12px'
        },
        suppressCssInjection: false,
        suppressDomInjection: false,
        labels: {
          resetTitle: 'Reset',
          closeTitle: 'Close',
          menuTitle: 'Accessibility Options',
          increaseText: 'increase text size',
          decreaseText: 'decrease text size',
          increaseTextSpacing: 'increase text spacing',
          decreaseTextSpacing: 'decrease text spacing',
          invertColors: 'invert colors',
          grayHues: 'gray hues',
          bigCursor: 'big cursor',
          readingGuide: 'reading guide',
          underlineLinks: 'underline links',
          textToSpeech: 'text to speech',
          speechToText: 'speech to text',
          disableAnimations: 'disable animations',
          increaseLineHeight: 'increase line height',
          decreaseLineHeight: 'decrease line height',
          hotkeyPrefix: 'Hotkey: '
        },
        textPixelMode: false,
        textEmlMode: true,
        textSizeFactor: 12.5,
        animations: {
          buttons: true
        },
        modules: {
          increaseText: true,
          decreaseText: true,
          increaseTextSpacing: true,
          decreaseTextSpacing: true,
          increaseLineHeight: true,
          decreaseLineHeight: true,
          invertColors: true,
          grayHues: true,
          bigCursor: true,
          readingGuide: true,
          underlineLinks: true,
          textToSpeech: true,
          speechToText: true,
          disableAnimations: true,
          iframeModals: true,
          customFunctions: true
        },
        modulesOrder: [],
        session: {
          persistent: true
        },
        iframeModals: [],
        customFunctions: [],
        statement: {
          url: ''
        },
        feedback: {
          url: ''
        },
        language: {
          textToSpeechLang: '',
          speechToTextLang: ''
        }
      };
      var keys = Object.keys(_accessibility.AccessibilityModulesType);
      keys.forEach(function (key, index) {
        var keyNum = parseInt(key);
        if (!isNaN(keyNum)) {
          res.modulesOrder.push({
            type: keyNum,
            order: keyNum
          });
        }
      });
      return res;
    }
  }, {
    key: "initFontSize",
    value: function initFontSize() {
      // store this values only once.
      if (!this._htmlInitFS) {
        var htmlInitFS = this._common.getFormattedDim(getComputedStyle(this._html).fontSize);
        var bodyInitFS = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
        this._html.style.fontSize = htmlInitFS.size / 16 * 100 + '%';
        this._htmlOrgFontSize = this._html.style.fontSize;
        this._body.style.fontSize = bodyInitFS.size / htmlInitFS.size + 'em';
      }
    }
  }, {
    key: "fontFallback",
    value: function fontFallback() {
      this.options.icon.useEmojis = true;
      this.options.icon.img = '♿';
      this.options.icon.fontClass = '';
    }
  }, {
    key: "addDefaultOptions",
    value: function addDefaultOptions(options) {
      var _options$icon, _options$icon2, _options$icon3;
      if ((_options$icon = options.icon) !== null && _options$icon !== void 0 && _options$icon.closeIconElem) this.options.icon.closeIconElem = options.icon.closeIconElem;
      if ((_options$icon2 = options.icon) !== null && _options$icon2 !== void 0 && _options$icon2.resetIconElem) this.options.icon.resetIconElem = options.icon.resetIconElem;
      if ((_options$icon3 = options.icon) !== null && _options$icon3 !== void 0 && _options$icon3.imgElem) this.options.icon.imgElem = options.icon.imgElem;
      if (!this.options.icon.closeIconElem) this.options.icon.closeIconElem = {
        type: '#text',
        text: "".concat(!this.options.icon.useEmojis ? this.options.icon.closeIcon : 'X')
      };
      if (!this.options.icon.resetIconElem) this.options.icon.resetIconElem = {
        type: '#text',
        text: "".concat(!this.options.icon.useEmojis ? this.options.icon.resetIcon : '♲')
      };
      if (!this.options.icon.imgElem) this.options.icon.imgElem = {
        type: '#text',
        text: this.options.icon.img
      };
    }
  }, {
    key: "addModuleOrderIfNotDefined",
    value: function addModuleOrderIfNotDefined() {
      var _this2 = this;
      this.defaultOptions.modulesOrder.forEach(function (mo) {
        if (!_this2.options.modulesOrder.find(function (imo) {
          return imo.type === mo.type;
        })) _this2.options.modulesOrder.push(mo);
      });
    }
  }, {
    key: "disabledUnsupportedFeatures",
    value: function disabledUnsupportedFeatures() {
      if (!('webkitSpeechRecognition' in window) || location.protocol !== 'https:') {
        this._common.warn('speech to text isn\'t supported in this browser or in http protocol (https required)');
        this.options.modules.speechToText = false;
      }
      var windowAny = window;
      if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) {
        this._common.warn('text to speech isn\'t supported in this browser');
        this.options.modules.textToSpeech = false;
      }
    }
  }, {
    key: "injectCss",
    value: function injectCss(injectFull) {
      var iconTop = '7px',
        iconLeft = '5px';
      var css;
      var mandatory = "\n        html._access_cursor * {\n            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;\n        }\n        @keyframes _access-dialog-backdrop {\n            0% {\n                background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1))\n            }\n            100% {\n                background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5))\n            }\n        }\n        dialog._access::backdrop, dialog._access {\n            transition-duration: var(--_access-menu-dialog-backdrop-transition-duration, 0.35s);\n            transition-timing-function: var(--_access-menu-dialog-backdrop-transition-timing-function, ease-in-out);\n        }\n        dialog._access:modal {\n            border-color: transparent;\n            border-width: 0;\n            padding: 0;\n        }\n        dialog._access[open]::backdrop {\n            background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5));\n            animation: _access-dialog-backdrop var(--_access-menu-dialog-backdrop-transition-duration, 0.35s) ease-in-out;\n        }\n        dialog._access.closing[open]::backdrop {\n            background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1));\n        }\n        dialog._access.closing[open] {\n            opacity: 0;\n        }\n        .screen-reader-wrapper {\n            margin: 0;\n            position: absolute;\n            bottom: -4px;\n            width: calc(100% - 2px);\n            left: 1px;\n        }\n        .screen-reader-wrapper-step-1, .screen-reader-wrapper-step-2,.screen-reader-wrapper-step-3 {\n            float: left;\n            background: var(--_access-menu-background-color, #fff);\n            width: 33.33%;\n            height: 3px;\n            border-radius: 10px;\n        }\n        .screen-reader-wrapper-step-1.active, .screen-reader-wrapper-step-2.active,.screen-reader-wrapper-step-3.active {\n            background: var(--_access-menu-item-button-background, #f9f9f9);\n        }\n        .access_read_guide_bar {\n            box-sizing: border-box;\n            background: var(--_access-menu-read-guide-bg, ".concat(this.options.guide.cBackground, ");\n            width: 100%!important;\n            min-width: 100%!important;\n            position: fixed!important;\n            height: var(--_access-menu-read-guide-height, ").concat(this.options.guide.height, ") !important;\n            border: var(--_access-menu-read-guide-border, solid 3px ").concat(this.options.guide.cBorder, ");\n            border-radius: 5px;\n            top: 15px;\n            z-index: 2147483647;\n        }");
      if (injectFull) {
        css = "\n            ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {\n                -webkit-box-shadow: var(--_access-scrollbar-track-box-shadow, inset 0 0 6px rgba(0,0,0,0.3));\n                background-color: var(--_access-scrollbar-track-background-color, #F5F5F5);\n            }\n            ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {\n                width: var(--_access-scrollbar-width, 6px);\n                background-color: var(--_access-scrollbar-background-color, #F5F5F5);\n            }\n            ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {\n                background-color: var(--_access-scrollbar-thumb-background-color, #999999);\n            }\n            ._access-icon {\n                position: var(--_access-icon-position, fixed);\n                width: var(--_access-icon-width, 50px);\n                height: var(--_access-icon-height, 50px);\n                bottom: var(--_access-icon-bottom, 50px);\n                top: var(--_access-icon-top, unset);\n                left: var(--_access-icon-left, unset);\n                right: var(--_access-icon-right, 10px);\n                z-index: var(--_access-icon-z-index, 9999);\n                font: var(--_access-icon-font, 40px / 45px \"Material Icons\");\n                background: var(--_access-icon-bg, #4054b2);\n                color: var(--_access-icon-color, #fff);\n                background-repeat: no-repeat;\n                background-size: contain;\n                cursor: pointer;\n                opacity: 0;\n                transition-duration: .35s;\n                -moz-user-select: none;\n                -webkit-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n                ".concat(!this.options.icon.useEmojis ? 'box-shadow: 1px 1px 5px rgba(0,0,0,.5);' : '', "\n                transform: ").concat(!this.options.icon.useEmojis ? 'scale(1)' : 'skewX(14deg)', ";\n                border-radius: var(--_access-icon-border-radius);\n                border: var(--_access-icon-border);\n                text-align: var(--_access-icon-text-align, center);\n            }\n            ._access-icon:hover {\n                transform: var(--_access-icon-transform-hover, scale(1.1));\n                vertical-align: var(--_access-icon-vertical-align-hover);\n            }\n            ._access-menu {\n                -moz-user-select: none;\n                -webkit-user-select: none;\n                -ms-user-select: none;\n                user-select: none;\n                position: fixed;\n                width: var(--_access-menu-width, ").concat(Accessibility.MENU_WIDTH, ");\n                height: var(--_access-menu-height, auto);\n                transition-duration: var(--_access-menu-transition-duration, .35s);\n                z-index: var(--_access-menu-z-index, 99991);\n                opacity: 1;\n                background-color: var(--_access-menu-background-color, #fff);\n                color: var(--_access-menu-color, #000);\n                border-radius: var(--_access-menu-border-radius, 3px);\n                border: var(--_access-menu-border, solid 1px #f1f0f1);\n                font-family: var(--_access-menu-font-family, RobotoDraft, Roboto, sans-serif, Arial);\n                min-width: var(--_access-menu-min-width, 300px);\n                box-shadow: var(--_access-menu-box-shadow, 0px 0px 1px #aaa);\n                max-height: calc(100vh - 80px);\n                ").concat(getComputedStyle(this._body).direction === 'rtl' ? 'text-indent: -5px' : '', "\n                top: var(--_access-menu-top, unset);\n                left: var(--_access-menu-left, unset);\n                bottom: var(--_access-menu-bottom, 0);\n                right: var(--_access-menu-right, 0);\n            }\n            ._access-menu.close {\n                z-index: -1;\n                width: 0;\n                opacity: 0;\n                background-color: transparent;\n                left: calc(-1 * var(--_access-menu-left), unset);\n                right: calc(-1 * var(--_access-menu-width, ").concat(Accessibility.MENU_WIDTH, "));\n            }\n            ._access-menu ._text-center {\n                font-size: var(--_access-menu-header-font-size, 22px);\n                font-weight: var(--_access-menu-header-font-weight, nornal);\n                margin: var(--_access-menu-header-margin, 20px 0 10px);\n                padding: 0;\n                color: var(--_access-menu-header-color, rgba(0,0,0,.87));\n                letter-spacing: var(--_access-menu-header-letter-spacing, initial);\n                word-spacing: var(--_access-menu-header-word-spacing, initial);\n                text-align: var(--_access-menu-header-text-align, center);\n            }\n            ._access-menu ._menu-close-btn {\n                left: 5px;\n                color: #d63c3c;\n                transition: .3s ease;\n                transform: rotate(0deg);\n                font-style: normal !important;\n            }\n            ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {\n                transform: var(--_access-menu-header-btn-hover-rotate, rotate(180deg));\n            }\n            ._access-menu ._menu-reset-btn {\n                right: 5px;\n                color: #4054b2;\n                transition: .3s ease;\n                transform: rotate(0deg);\n                font-style: normal !important;\n            }\n            ._access-menu ._menu-btn {\n                position: absolute;\n                top: 5px;\n                cursor: pointer;\n                font-size: 24px !important;\n                font-weight: bold;\n                background: transparent;\n                border: none;\n            }\n            ._access-menu ul {\n                padding: 0 0 5px;\n                position: relative;\n                font-size: var(--_access-menu-font-size, 18px);\n                margin: 0;\n                overflow: auto;\n                max-height: var(--_access-menu-max-height, calc(100vh - 145px));\n                display: flex;\n                flex-flow: column;\n                gap: 5px;\n            }\n            ").concat(mandatory, "\n            ._access-menu ul li {\n                position: relative;\n                list-style-type: none;\n                -ms-user-select: none;\n                -moz-user-select: none;\n                -webkit-user-select: none;\n                user-select: none;\n                margin: 0 5px 0 8px;\n                font: { size: 18, units: 'px' }\n                font-size: var(--_access-menu-item-font-size, 18px) !important;\n                line-height: var(--_access-menu-item-line-height, 18px) !important;\n                color: var(--_access-menu-item-color, rgba(0,0,0,.6));\n                letter-spacing: var(--_access-menu-item-letter-spacing, initial);\n                word-spacing: var(--_access-menu-item-word-spacing, initial);\n                width: calc(100% - 17px);\n            }\n            ._access-menu ul li button {\n                background: var(--_access-menu-item-button-background, #f9f9f9);\n                padding: var(--_access-menu-item-button-padding, 10px 0);\n                width: 100%;\n                text-indent: var(--_access-menu-item-button-text-indent, 35px);\n                text-align: start;\n                position: relative;\n                transition-duration: var(--_access-menu-item-button-transition-duration, .35s);\n                transition-timing-function: var(--_access-menu-item-button-transition-timing-function, ease-in-out);\n                border: var(--_access-menu-item-button-border, solid 1px #f1f0f1);\n                border-radius: var(--_access-menu-item-button-border-radius, 4px);\n                cursor: pointer;\n            }\n            ._access-menu ul li.position {\n                display: inline-block;\n                width: auto;\n            }\n            ._access-menu ul.before-collapse li button {\n                opacity: var(--_access-menu-item-button-before-collapse-opacity, 0.05);\n            }\n            ._access-menu ul li button.active, ._access-menu ul li button.active:hover {\n                background-color: var(--_access-menu-item-button-active-background-color, #000);\n            }\n            ._access-menu div.active {\n                color: var(--_access-menu-div-active-color, #fff);\n                background-color: var(--_access-menu-div-active-background-color, #000);\n            }\n            ._access-menu ul li button.active, ._access-menu ul li button.active:hover, ._access-menu ul li button.active:before, ._access-menu ul li button.active:hover:before {\n                color: var(--_access-menu-item-button-active-color, #fff);\n            }\n            ._access-menu ul li button:hover {\n                color: var(--_access-menu-item-button-hover-color, rgba(0,0,0,.8));\n                background-color: var(--_access-menu-item-button-hover-background-color, #eaeaea);\n            }\n            ._access-menu ul li.not-supported {\n                display: none;\n            }\n            ._access-menu ul li button:before {\n                content: ' ';\n                font-family: var(--_access-menu-button-font-family-before, ").concat(this._fixedDefaultFont, ");\n                text-rendering: optimizeLegibility;\n                font-feature-settings: \"liga\" 1;\n                font-style: normal;\n                text-transform: none;\n                line-height: ").concat(!this.options.icon.useEmojis ? '1' : '1.1', ";\n                font-size: ").concat(!this.options.icon.useEmojis ? '24px' : '20px', " !important;\n                width: 30px;\n                height: 30px;\n                display: inline-block;\n                overflow: hidden;\n                -webkit-font-smoothing: antialiased;\n                top: 7px;\n                left: 5px;\n                position: absolute;\n                color: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));\n                direction: ltr;\n                text-indent: 0;\n                transition-duration: .35s;\n                transition-timing-function: ease-in-out;\n            }\n            ._access-menu ul li button svg path {\n                fill: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));\n                transition-duration: .35s;\n                transition-timing-function: ease-in-out;\n            }\n            ._access-menu ul li button:hover svg path {\n                fill: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));\n            }\n            ._access-menu ul li button.active svg path {\n                fill: var(--_access-menu-item-active-icon-color, #fff);\n            }\n            ._access-menu ul li:hover button:before {\n                color: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));\n            }\n            ._access-menu ul li button.active button:before {\n                color: var(--_access-menu-item-active-icon-color, #fff);\n            }\n            ._access-menu ul li button[data-access-action=\"increaseText\"]:before {\n                content: var(--_access-menu-item-icon-increase-text, ").concat(!this.options.icon.useEmojis ? '"zoom_in"' : '"🔼"', ");\n                transform: var(--_access-menu-item-icon-increase-text-transform, unset);\n                top: var(--_access-menu-item-icon-increase-text-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-increase-text-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"decreaseText\"]:before {\n                content: var(--_access-menu-item-icon-decrease-text, ").concat(!this.options.icon.useEmojis ? '"zoom_out"' : '"🔽"', ");\n                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, unset);\n                top: var(--_access-menu-item-icon-decrease-text-spacing-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-decrease-text-spacing-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"increaseTextSpacing\"]:before {\n                content: var(--_access-menu-item-icon-increase-text-spacing, ").concat(!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"', ");\n                transform: var(--_access-menu-item-icon-increase-text-spacing-transform, rotate(90deg) translate(-7px, 2px));\n                top: var(--_access-menu-item-icon-increase-text-spacing-top, 14px);\n                left: var(--_access-menu-item-icon-increase-text-spacing-left, 0);\n            }\n            ._access-menu ul li button[data-access-action=\"decreaseTextSpacing\"]:before {\n                content: var(--_access-menu-item-icon-decrease-text-spacing, ").concat(!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"', ");\n                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, rotate(90deg) translate(-7px, 2px));\n                top: var(--_access-menu-item-icon-decrease-text-spacing-top, 14px);\n                left: var(--_access-menu-item-icon-decrease-text-spacing-left, 0);\n            }\n            ._access-menu ul li button[data-access-action=\"invertColors\"]:before {\n                content: var(--_access-menu-item-icon-invert-colors, ").concat(!this.options.icon.useEmojis ? '"invert_colors"' : '"🎆"', ");\n                transform: var(--_access-menu-item-icon-invert-colors-transform, unset);\n                top: var(--_access-menu-item-icon-invert-colors-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-invert-colors-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"grayHues\"]:before {\n                content: var(--_access-menu-item-icon-gray-hues, ").concat(!this.options.icon.useEmojis ? '"format_color_reset"' : '"🌫️"', ");\n                transform: var(--_access-menu-item-icon-gray-hues-transform, unset);\n                top: var(--_access-menu-item-icon-gray-hues-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-gray-hues-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"underlineLinks\"]:before {\n                content: var(--_access-menu-item-icon-underline-links, ").concat(!this.options.icon.useEmojis ? '"format_underlined"' : '"🔗"', ");\n                transform: var(--_access-menu-item-icon-underline-links-transform, unset);\n                top: var(--_access-menu-item-icon-underline-links-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-underline-links-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"bigCursor\"]:before {\n                /*content: 'touch_app';*/\n                content: var(--_access-menu-item-icon-big-cursor, inherit);\n                transform: var(--_access-menu-item-icon-big-cursor-transform, unset);\n                top: var(--_access-menu-item-icon-big-cursor-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-big-cursor-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"readingGuide\"]:before {\n                content: var(--_access-menu-item-icon-reading-guide, ").concat(!this.options.icon.useEmojis ? '"border_horizontal"' : '"↔️"', ");\n                transform: var(--_access-menu-item-icon-reading-guide-transform, unset);\n                top: var(--_access-menu-item-icon-reading-guide-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-reading-guide-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"textToSpeech\"]:before {\n                content: var(--_access-menu-item-icon-text-to-speech, ").concat(!this.options.icon.useEmojis ? '"record_voice_over"' : '"⏺️"', ");\n                transform: var(--_access-menu-item-icon-text-to-speech-transform, unset);\n                top: var(--_access-menu-item-icon-text-to-speech-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-text-to-speech-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"speechToText\"]:before {\n                content: var(--_access-menu-item-icon-speech-to-text, ").concat(!this.options.icon.useEmojis ? '"mic"' : '"🎤"', ");\n                transform: var(--_access-menu-item-icon-speech-to-text-transform, unset);\n                top: var(--_access-menu-item-icon-speech-to-text-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-speech-to-text-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"disableAnimations\"]:before {\n                content: var(--_access-menu-item-icon-disable-animations, ").concat(!this.options.icon.useEmojis ? '"animation"' : '"🏃‍♂️"', ");\n                transform: var(--_access-menu-item-icon-disable-animations-transform, unset);\n                top: var(--_access-menu-item-icon-disable-animations-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-disable-animations-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"iframeModals\"]:before {\n                content: var(--_access-menu-item-icon-iframe-modals, ").concat(!this.options.icon.useEmojis ? '"policy"' : '"⚖️"', ");\n                transform: var(--_access-menu-item-icon-iframe-transform, unset);\n                top: var(--_access-menu-item-icon-iframe-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-iframe-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"customFunctions\"]:before {\n                content: var(--_access-menu-item-icon-custom-functions, ").concat(!this.options.icon.useEmojis ? '"psychology_alt"' : '"❓"', ");\n                transform: var(--_access-menu-item-icon-custom-functions-transform, unset);\n                top: var(--_access-menu-item-icon-custom-functions-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-custom-functions-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"increaseLineHeight\"]:before {\n                content: var(--_access-menu-item-icon-increase-line-height, ").concat(!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"', ");\n                transform: var(--_access-menu-item-icon-increase-line-height-transform, unset);\n                top: var(--_access-menu-item-icon-increase-line-height-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-increase-line-height-left, ").concat(iconLeft, ");\n            }\n            ._access-menu ul li button[data-access-action=\"decreaseLineHeight\"]:before {\n                content: var(--_access-menu-item-icon-decrease-line-height, ").concat(!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"', ");\n                transform: var(--_access-menu-item-icon-decrease-line-height-transform, unset);\n                top: var(--_access-menu-item-icon-decrease-line-height-top, ").concat(iconTop, ");\n                left: var(--_access-menu-item-icon-decrease-line-height-left, ").concat(iconLeft, ");\n            }");
      } else {
        css = mandatory;
      }
      var className = Accessibility.CSS_CLASS_NAME;
      this._common.injectStyle(css, {
        className: className
      });
      this._common.deployedObjects.set(".".concat(className), false);
    }
  }, {
    key: "removeCSS",
    value: function removeCSS() {
      var existing = document.querySelector(".".concat(Accessibility.CSS_CLASS_NAME));
      if (existing) existing.remove();
    }
  }, {
    key: "injectIcon",
    value: function injectIcon() {
      // let fontSize = (this.options.icon.dimensions.width.size as number) * 0.8;
      // let lineHeight = (this.options.icon.dimensions.width.size as number) * 0.9;
      // let textIndent = (this.options.icon.dimensions.width.size as number) * 0.1;
      // let iStyle = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}
      //     ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}
      //     ;font-size: ${fontSize + this.options.icon.dimensions.width.units}
      //     ;line-height: ${lineHeight + this.options.icon.dimensions.width.units}
      //     ;text-indent: ${textIndent + this.options.icon.dimensions.width.units}
      //     ;background-color: ${!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent'};color: ${this.options.icon.color}`;
      // for (let i in this.options.icon.position) {
      //     let pos = this.options.icon.position as any;
      //     pos = pos[i];
      //     iStyle += ';' + i + ':' + pos.size + pos.units;
      // }
      // iStyle += `;z-index: ${this.options.icon.zIndex}`;
      var className = "_access-icon ".concat(this.options.icon.fontClass, " _access");
      var iconElem = this._common.jsonToHtml({
        type: 'i',
        attrs: {
          'class': className,
          // 'style': iStyle,
          'title': this.options.hotkeys.enabled ? this.parseKeys(this.options.hotkeys.keys.toggleMenu) : this.options.labels.menuTitle,
          'tabIndex': 0
        },
        children: [this.options.icon.imgElem]
      });
      this._body.appendChild(iconElem);
      this._common.deployedObjects.set('._access-icon', false);
      return iconElem;
    }
  }, {
    key: "parseKeys",
    value: function parseKeys(arr) {
      return this.options.hotkeys.enabled ? this.options.hotkeys.helpTitles ? this.options.labels.hotkeyPrefix + arr.map(function (val) {
        return Number.isInteger(val) ? String.fromCharCode(val).toLowerCase() : val.replace('Key', '');
      }).join('+') : '' : '';
    }
  }, {
    key: "injectMenu",
    value: function injectMenu() {
      var _this3 = this;
      var json = {
        type: 'div',
        attrs: {
          'class': '_access-menu close _access'
        },
        children: [{
          type: 'p',
          attrs: {
            'class': '_text-center',
            'role': 'presentation'
          },
          children: [{
            type: 'button',
            attrs: {
              'class': "_menu-close-btn _menu-btn ".concat(this.options.icon.fontClass),
              'style': "font-family: var(--_access-menu-close-btn-font-family, ".concat(this._fixedDefaultFont, ")"),
              'title': this.options.hotkeys.enabled ? this.parseKeys(this.options.hotkeys.keys.toggleMenu) : this.options.labels.closeTitle
            },
            children: [this.options.icon.closeIconElem]
          }, {
            type: '#text',
            text: this.options.labels.menuTitle
          }, {
            type: 'button',
            attrs: {
              'class': "_menu-reset-btn _menu-btn ".concat(this.options.icon.fontClass),
              'style': "font-family: var(--_access-menu-reset-btn-font-family, ".concat(this._fixedDefaultFont, ")"),
              'title': this.options.labels.resetTitle
            },
            children: [this.options.icon.resetIconElem]
          }]
        }, {
          type: 'ul',
          attrs: {
            'class': 'before-collapse _access-scrollbar'
          },
          children: [{
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'increaseText'
              },
              children: [{
                type: '#text',
                text: this.options.labels.increaseText
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'decreaseText'
              },
              children: [{
                type: '#text',
                text: this.options.labels.decreaseText
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'increaseTextSpacing'
              },
              children: [{
                type: '#text',
                text: this.options.labels.increaseTextSpacing
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'decreaseTextSpacing'
              },
              children: [{
                type: '#text',
                text: this.options.labels.decreaseTextSpacing
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'increaseLineHeight'
              },
              children: [{
                type: '#text',
                text: this.options.labels.increaseLineHeight
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'decreaseLineHeight'
              },
              children: [{
                type: '#text',
                text: this.options.labels.decreaseLineHeight
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'invertColors',
                'title': this.parseKeys(this.options.hotkeys.keys.invertColors)
              },
              children: [{
                type: '#text',
                text: this.options.labels.invertColors
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'grayHues',
                'title': this.parseKeys(this.options.hotkeys.keys.grayHues)
              },
              children: [{
                type: '#text',
                text: this.options.labels.grayHues
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'underlineLinks',
                'title': this.parseKeys(this.options.hotkeys.keys.underlineLinks)
              },
              children: [{
                type: '#text',
                text: this.options.labels.underlineLinks
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'bigCursor',
                'title': this.parseKeys(this.options.hotkeys.keys.bigCursor)
              },
              children: [{
                type: 'div',
                attrs: {
                  'id': 'iconBigCursor'
                }
              }, {
                type: '#text',
                text: this.options.labels.bigCursor
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'readingGuide',
                'title': this.parseKeys(this.options.hotkeys.keys.readingGuide)
              },
              children: [{
                type: '#text',
                text: this.options.labels.readingGuide
              }]
            }]
          }, {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'disableAnimations',
                'title': this.parseKeys(this.options.hotkeys.keys.disableAnimations)
              },
              children: [{
                type: '#text',
                text: this.options.labels.disableAnimations
              }]
            }]
          }]
        }]
      };
      if (this.options.iframeModals) {
        this.options.iframeModals.forEach(function (im, i) {
          var btn = {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'iframeModals',
                'data-access-url': im.iframeUrl
              },
              children: [{
                type: '#text',
                text: im.buttonText
              }]
            }]
          };
          var icon = null;
          if (im.icon && !_this3.options.icon.useEmojis) icon = im.icon;else if (im.emoji && _this3.options.icon.useEmojis) icon = im.emoji;
          if (icon) {
            btn.children[0].attrs['data-access-iframe-index'] = i;
            var css = "._access-menu ul li button[data-access-action=\"iframeModals\"][data-access-iframe-index=\"".concat(i, "\"]:before {\n                        content: \"").concat(icon, "\";\n                    }");
            var className = '_data-access-iframe-index-' + i;
            _this3._common.injectStyle(css, {
              className: className
            });
            _this3._common.deployedObjects.set('.' + className, false);
          }
          if (_this3.options.modules.textToSpeech) json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);else json.children[1].children.push(btn);
        });
      }
      if (this.options.customFunctions) {
        this.options.customFunctions.forEach(function (cf, i) {
          var btn = {
            type: 'li',
            children: [{
              type: 'button',
              attrs: {
                'data-access-action': 'customFunctions',
                'data-access-custom-id': cf.id,
                'data-access-custom-index': i
              },
              children: [{
                type: '#text',
                text: cf.buttonText
              }]
            }]
          };
          var icon = null;
          if (cf.icon && !_this3.options.icon.useEmojis) icon = cf.icon;else if (cf.emoji && _this3.options.icon.useEmojis) icon = cf.emoji;
          if (icon) {
            var css = "._access-menu ul li button[data-access-action=\"customFunctions\"][data-access-custom-id=\"".concat(cf.id, "\"]:before {\n                        content: \"").concat(icon, "\";\n                    }");
            var className = '_data-access-custom-id-' + cf.id;
            _this3._common.injectStyle(css, {
              className: className
            });
            _this3._common.deployedObjects.set('.' + className, false);
          }
          if (_this3.options.modules.textToSpeech) json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);else json.children[1].children.push(btn);
        });
      }
      var menuElem = this._common.jsonToHtml(json);
      this._body.appendChild(menuElem);
      setTimeout(function () {
        var ic = document.getElementById('iconBigCursor');
        if (ic) {
          ic.outerHTML = ic.outerHTML + '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;top: 9px; left: 9px;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
          document.getElementById('iconBigCursor').remove();
        }
      }, 1);
      this._common.deployedObjects.set('._access-menu', false);
      var closeBtn = document.querySelector('._access-menu ._menu-close-btn');
      ['click', 'keyup'].forEach(function (evt) {
        closeBtn.addEventListener(evt, function (e) {
          var et = e || window.event;
          if (et.detail === 0 && et.key !== 'Enter') return;
          _this3.toggleMenu();
        }, false);
      });
      var resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
      ['click', 'keyup'].forEach(function (evt) {
        resetBtn.addEventListener(evt, function (e) {
          var et = e || window.event;
          if (et.detail === 0 && et.key !== 'Enter') return;
          _this3.resetAll();
        }, false);
      });
      return menuElem;
    }
  }, {
    key: "getVoices",
    value: function getVoices() {
      return new Promise(function (resolve) {
        var synth = window.speechSynthesis;
        var id;
        id = setInterval(function () {
          if (synth.getVoices().length !== 0) {
            resolve(synth.getVoices());
            clearInterval(id);
          }
        }, 10);
      });
    }
  }, {
    key: "injectTts",
    value: function () {
      var _injectTts = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var voices, isLngSupported, i, tts, sts, ul;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return this.getVoices();
            case 2:
              voices = _context.sent;
              isLngSupported = false;
              i = 0;
            case 5:
              if (!(i < voices.length)) {
                _context.next = 12;
                break;
              }
              if (!(voices[i].lang === this.options.language.textToSpeechLang)) {
                _context.next = 9;
                break;
              }
              isLngSupported = true;
              return _context.abrupt("break", 12);
            case 9:
              i++;
              _context.next = 5;
              break;
            case 12:
              if (isLngSupported) {
                tts = this.common.jsonToHtml({
                  type: 'li',
                  children: [{
                    type: 'button',
                    attrs: {
                      'data-access-action': 'textToSpeech',
                      'title': this.parseKeys(this.options.hotkeys.keys.textToSpeech)
                    },
                    children: [{
                      type: '#text',
                      text: this.options.labels.textToSpeech
                    }]
                  }, {
                    type: 'div',
                    attrs: {
                      'class': 'screen-reader-wrapper'
                    },
                    children: [{
                      type: 'div',
                      attrs: {
                        'class': 'screen-reader-wrapper-step-1',
                        'tabIndex': '-1'
                      }
                    }, {
                      type: 'div',
                      attrs: {
                        'class': 'screen-reader-wrapper-step-2',
                        'tabIndex': '-1'
                      }
                    }, {
                      type: 'div',
                      attrs: {
                        'class': 'screen-reader-wrapper-step-3',
                        'tabIndex': '-1'
                      }
                    }]
                  }]
                });
                sts = this.common.jsonToHtml({
                  type: 'li',
                  children: [{
                    type: 'button',
                    attrs: {
                      'data-access-action': 'speechToText',
                      'title': this.parseKeys(this.options.hotkeys.keys.speechToText)
                    },
                    children: [{
                      type: '#text',
                      text: this.options.labels.speechToText
                    }]
                  }]
                });
                ul = document.querySelector('._access-menu ul');
                ul.appendChild(sts);
                ul.appendChild(tts);
              }
            case 13:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function injectTts() {
        return _injectTts.apply(this, arguments);
      }
      return injectTts;
    }()
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this4 = this;
      var lis = document.querySelectorAll('._access-menu ul li');
      var step1 = document.getElementsByClassName('screen-reader-wrapper-step-1');
      var step2 = document.getElementsByClassName('screen-reader-wrapper-step-2');
      var step3 = document.getElementsByClassName('screen-reader-wrapper-step-3');
      var _loop = function _loop(i) {
        ['click', 'keyup'].forEach(function (evt) {
          return lis[i].addEventListener(evt, function (e) {
            var evt = e || window.event;
            if (evt.detail === 0 && evt.key !== 'Enter') return;
            _this4.invoke(evt.target.getAttribute('data-access-action'), evt.target);
          });
        });
      };
      for (var i = 0; i < lis.length; i++) {
        _loop(i);
      }
      [].concat(_toConsumableArray(Array.from(step1)), _toConsumableArray(Array.from(step2)), _toConsumableArray(Array.from(step3))).forEach(function (el) {
        return el.addEventListener('click', function (e) {
          var evt = e || window.event;
          _this4.invoke(evt.target.parentElement.parentElement.getAttribute('data-access-action'), evt.target);
        }, false);
      });
    }
  }, {
    key: "sortModuleTypes",
    value: function sortModuleTypes() {
      this.options.modulesOrder.sort(function (a, b) {
        return a.order - b.order;
      });
    }
  }, {
    key: "disableUnsupportedModulesAndSort",
    value: function disableUnsupportedModulesAndSort() {
      var _this5 = this;
      this.sortModuleTypes();
      var ul = document.querySelector('._access-menu ul');
      this.options.modulesOrder.forEach(function (item) {
        var i = item.type;
        var module = _accessibility.AccessibilityModulesType[i];
        var m = _this5.options.modules;
        m = m[module];
        var moduleLi = document.querySelector('button[data-access-action="' + module + '"]');
        if (moduleLi) {
          moduleLi.parentElement.remove();
          ul.appendChild(moduleLi.parentElement);
          if (!m) moduleLi.parentElement.classList.add('not-supported');
        }
      });
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      this.menuInterface.textToSpeech(true);
      this.menuInterface.speechToText(true);
      this.menuInterface.disableAnimations(true);
      this.menuInterface.underlineLinks(true);
      this.menuInterface.grayHues(true);
      this.menuInterface.invertColors(true);
      this.menuInterface.bigCursor(true);
      this.menuInterface.readingGuide(true);
      this.resetTextSize();
      this.resetTextSpace();
      this.resetLineHeight();
    }
  }, {
    key: "resetTextSize",
    value: function resetTextSize() {
      this.resetIfDefined(this._stateValues.body.fontSize, this._body.style, 'fontSize');
      if (typeof this._htmlOrgFontSize !== 'undefined') this._html.style.fontSize = this._htmlOrgFontSize;
      var all = document.querySelectorAll('[data-init-font-size]');
      for (var i = 0; i < all.length; i++) {
        all[i].style.fontSize = all[i].getAttribute('data-init-font-size');
        all[i].removeAttribute('data-init-font-size');
      }
      this._sessionState.textSize = 0;
      this.onChange(true);
    }
  }, {
    key: "resetLineHeight",
    value: function resetLineHeight() {
      this.resetIfDefined(this._stateValues.body.lineHeight, this.body.style, 'lineHeight');
      var all = document.querySelectorAll('[data-init-line-height]');
      for (var i = 0; i < all.length; i++) {
        all[i].style.lineHeight = all[i].getAttribute('data-init-line-height');
        all[i].removeAttribute('data-init-line-height');
      }
      this.sessionState.lineHeight = 0;
      this.onChange(true);
    }
  }, {
    key: "resetTextSpace",
    value: function resetTextSpace() {
      this.resetIfDefined(this._stateValues.body.wordSpacing, this._body.style, 'wordSpacing');
      this.resetIfDefined(this._stateValues.body.letterSpacing, this._body.style, 'letterSpacing');
      var all = document.querySelectorAll('[data-init-word-spacing]');
      var all2 = document.querySelectorAll('[data-init-letter-spacing]');
      for (var i = 0; i < all.length; i++) {
        all[i].style.wordSpacing = all[i].getAttribute('data-init-word-spacing');
        all[i].removeAttribute('data-init-word-spacing');
      }
      for (var _i = 0; _i < all2.length; _i++) {
        all[_i].style.letterSpacing = all[_i].getAttribute('data-init-letter-spacing');
        all[_i].removeAttribute('data-init-letter-spacing');
      }
      this._sessionState.textSpace = 0;
      this.onChange(true);
    }
  }, {
    key: "alterTextSize",
    value: function alterTextSize(isIncrease) {
      this._sessionState.textSize += isIncrease ? 1 : -1;
      this.onChange(true);
      var factor = this.options.textSizeFactor;
      if (!isIncrease) factor *= -1;
      if (this.options.textPixelMode) {
        var all = document.querySelectorAll('*:not(._access)');
        for (var i = 0; i < all.length; i++) {
          var fSize = getComputedStyle(all[i]).fontSize;
          if (fSize && fSize.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-font-size')) all[i].setAttribute('data-init-font-size', fSize);
          }
        }
        for (var _i2 = 0; _i2 < all.length; _i2++) {
          var _fSize = getComputedStyle(all[_i2]).fontSize;
          if (_fSize && _fSize.indexOf('px') > -1) {
            _fSize = parseInt(_fSize.replace('px', '')) + factor;
            all[_i2].style.fontSize = _fSize + 'px';
          }
          if (this._stateValues.textToSpeech) this.textToSpeech("Text Size ".concat(isIncrease ? 'Increased' : 'Decreased'));
        }

        // Also adjust the body font size
        var bodyFontSize = getComputedStyle(this._body).fontSize;
        if (bodyFontSize && bodyFontSize.indexOf('px') > -1) {
          if (!this._body.getAttribute('data-init-font-size')) this._body.setAttribute('data-init-font-size', bodyFontSize);
          bodyFontSize = parseInt(bodyFontSize.replace('px', '')) + factor;
          this._body.style.fontSize = bodyFontSize + 'px';
        }
      } else if (this.options.textEmlMode) {
        var fp = this._html.style.fontSize;
        if (fp.indexOf('%')) {
          fp = parseInt(fp.replace('%', ''));
          this._html.style.fontSize = fp + factor + '%';
          if (this._stateValues.textToSpeech) this.textToSpeech("Text Size ".concat(isIncrease ? 'Increased' : 'Decreased'));
        } else {
          this._common.warn('Accessibility.textEmlMode, html element is not set in %.');
        }
      } else {
        var _fSize2 = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
        if (typeof this._stateValues.body.fontSize === 'undefined') this._stateValues.body.fontSize = _fSize2.size + _fSize2.suffix;
        if (_fSize2 && _fSize2.suffix && !isNaN(_fSize2.size * 1)) {
          this._body.style.fontSize = _fSize2.size * 1 + factor + _fSize2.suffix;
        }
      }
    }
  }, {
    key: "alterLineHeight",
    value: function alterLineHeight(isIncrease) {
      this.sessionState.lineHeight += isIncrease ? 1 : -1;
      this.onChange(true);
      var factor = 2;
      if (!isIncrease) factor *= -1;
      if (this.options.textEmlMode) factor *= 10;
      var all = document.querySelectorAll('*:not(._access)');
      var exclude = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));
      for (var i = 0; i < all.length; i++) {
        if (exclude.includes(all[i])) {
          continue;
        }
        if (this.options.textPixelMode) {
          var lHeight = getComputedStyle(all[i]).lineHeight;
          if (lHeight && lHeight.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-line-height')) all[i].setAttribute('data-init-line-height', lHeight);
            var newPixel = parseInt(lHeight.replace('px', '')) + factor;
            all[i].style.lineHeight = "".concat(newPixel, "px");
          }
          if (this._stateValues.textToSpeech) this.textToSpeech("Line Height ".concat(isIncrease ? 'Increased' : 'Decreased'));
        } else if (this.options.textEmlMode) {
          var lTextSize = getComputedStyle(all[i]).fontSize;
          var _lHeight = getComputedStyle(all[i]).lineHeight;
          if (_lHeight === 'normal') _lHeight = (parseInt(lTextSize.replace('px', '')) * 1.2).toString() + 'px';
          var lHeight2 = _lHeight.replace('px', '');
          var lTextSize2 = lTextSize.replace('px', '');
          var inPercent = parseInt(lHeight2) * 100 / parseInt(lTextSize2);
          if (_lHeight && _lHeight.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-line-height')) all[i].setAttribute('data-init-line-height', inPercent + '%');
            inPercent = inPercent + factor;
            all[i].style.lineHeight = inPercent + '%';
          }
          if (typeof this._stateValues.body.lineHeight === 'undefined') this._stateValues.body.lineHeight = '';
          if (this._stateValues.textToSpeech) this.textToSpeech("Line height ".concat(isIncrease ? 'Increased' : 'Decreased'));
        }
      }
    }
  }, {
    key: "alterTextSpace",
    value: function alterTextSpace(isIncrease) {
      this._sessionState.textSpace += isIncrease ? 1 : -1;
      this.onChange(true);
      var factor = 2;
      if (!isIncrease) factor *= -1;
      if (this.options.textPixelMode) {
        var all = document.querySelectorAll('*:not(._access)');
        var exclude = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));
        for (var i = 0; i < all.length; i++) {
          if (exclude.includes(all[i])) {
            continue;
          }
          // wordSpacing
          var fSpacing = all[i].style.wordSpacing;
          if (fSpacing && fSpacing.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-word-spacing')) all[i].setAttribute('data-init-word-spacing', fSpacing);
            fSpacing = fSpacing.replace('px', '') * 1 + factor;
            all[i].style.wordSpacing = fSpacing + 'px';
          } else {
            all[i].setAttribute('data-init-word-spacing', fSpacing);
            all[i].style.wordSpacing = factor + 'px';
          }

          // letterSpacing
          var fSpacing2 = all[i].style.letterSpacing;
          if (fSpacing2 && fSpacing2.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-letter-spacing')) all[i].setAttribute('data-init-letter-spacing', fSpacing2);
            fSpacing2 = fSpacing2.replace('px', '') * 1 + factor;
            all[i].style.letterSpacing = fSpacing2 + 'px';
          } else {
            all[i].setAttribute('data-init-letter-spacing', fSpacing2);
            all[i].style.letterSpacing = factor + 'px';
          }
        }
        if (this._stateValues.textToSpeech) this.textToSpeech("Text Spacing ".concat(isIncrease ? 'Increased' : 'Decreased'));
      } else {
        // wordSpacing
        var _fSpacing = this._common.getFormattedDim(getComputedStyle(this._body).wordSpacing);
        if (typeof this._stateValues.body.wordSpacing === 'undefined') this._stateValues.body.wordSpacing = '';
        if (_fSpacing && _fSpacing.suffix && !isNaN(_fSpacing.size * 1)) {
          this._body.style.wordSpacing = _fSpacing.size * 1 + factor + _fSpacing.suffix;
        }
        // letterSpacing
        var _fSpacing2 = this._common.getFormattedDim(getComputedStyle(this._body).letterSpacing);
        if (typeof this._stateValues.body.letterSpacing === 'undefined') this._stateValues.body.letterSpacing = '';
        if (_fSpacing2 && _fSpacing2.sufix && !isNaN(_fSpacing2.size * 1)) {
          this._body.style.letterSpacing = _fSpacing2.size * 1 + factor + _fSpacing2.sufix;
        }
        if (this._stateValues.textToSpeech) this.textToSpeech("Text Spacing ".concat(isIncrease ? 'Increased' : 'Decreased'));
      }
    }
  }, {
    key: "speechToText",
    value: function speechToText() {
      var _this6 = this;
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        this._recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this._recognition.continuous = true;
        this._recognition.interimResults = true;
        this._recognition.onstart = function () {
          // TODO red color on mic icon
          // console.log('listening . . .');
          // if (this.speechToTextTarget)
          //     this.speechToTextTarget.parentElement.classList.add('_access-listening');
          _this6._body.classList.add('_access-listening');
        };
        this._recognition.onend = function () {
          _this6._body.classList.remove('_access-listening');
        };
        this._recognition.onresult = function (event) {
          var finalTranscript = '';
          if (typeof event.results === 'undefined') {
            return;
          }
          for (var i = event.resultIndex; i < event.results.length; ++i) {
            if (event.results[i].isFinal) {
              finalTranscript += event.results[i][0].transcript;
            }
          }
          if (finalTranscript && _this6._speechToTextTarget) {
            _this6._speechToTextTarget.parentElement.classList.remove('_access-listening');
            if (_this6._speechToTextTarget.tagName.toLowerCase() === 'input' || _this6._speechToTextTarget.tagName.toLowerCase() === 'textarea') {
              _this6._speechToTextTarget.value = finalTranscript;
            } else if (_this6._speechToTextTarget.getAttribute('contenteditable') !== null) {
              _this6._speechToTextTarget.innerText = finalTranscript;
            }
          }
        };
        this._recognition.lang = this.options.language.speechToTextLang;
        this._recognition.start();
      }
    }
  }, {
    key: "textToSpeech",
    value: function textToSpeech(text) {
      var _this7 = this;
      var windowAny = window;
      if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) return;
      var msg = new windowAny.SpeechSynthesisUtterance(text);
      msg.lang = this.options.language.textToSpeechLang;
      msg.lang = this.options.textToSpeechLang;
      msg.rate = this._stateValues.speechRate;
      msg.onend = function () {
        _this7._isReading = false;
      };
      var voices = windowAny.speechSynthesis.getVoices();
      var isLngSupported = false;
      for (var i = 0; i < voices.length; i++) {
        if (voices[i].lang === msg.lang) {
          msg.voice = voices[i];
          isLngSupported = true;
          break;
        }
      }
      if (!isLngSupported) {
        this._common.warn('text to speech language not supported!');
      }
      if (window.speechSynthesis.pending || window.speechSynthesis.speaking) {
        window.speechSynthesis.pause;
        window.speechSynthesis.cancel();
      }
      window.speechSynthesis.speak(msg);
      this._isReading = true;
    }
  }, {
    key: "createScreenShot",
    value: function createScreenShot(url) {
      return new Promise(function (resolve) {
        var canvas = document.createElement('canvas');
        var img = new Image();
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.opacity = '0';
        canvas.style.transform = 'scale(0.05)';
        img.crossOrigin = 'anonymous';
        img.onload = /*#__PURE__*/_asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
          var ctx, res;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                document.body.appendChild(canvas);
                ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                try {
                  res = canvas.toDataURL('image/png');
                } catch (e) {}
                resolve(res);
                canvas.remove();
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        img.onerror = function () {
          resolve(_common.Common.DEFAULT_PIXEL);
        };
        img.src = url;
      });
    }
  }, {
    key: "listen",
    value: function listen() {
      if (_typeof(this._recognition) === 'object' && typeof this._recognition.stop === 'function') this._recognition.stop();
      this._speechToTextTarget = window.event.target;
      this.speechToText();
    }
  }, {
    key: "read",
    value: function read(e) {
      try {
        e = window.event || e || arguments[0];
        if (e && e.preventDefault) {
          e.preventDefault();
          e.stopPropagation();
        }
      } catch (ex) {}
      var allContent = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));
      for (var key in allContent) {
        if (allContent[key] === window.event.target && e instanceof MouseEvent) return;
      }
      if (e instanceof KeyboardEvent && (e.shiftKey && e.key === 'Tab' || e.key === 'Tab')) {
        this.textToSpeech(window.event.target.innerText);
        return;
      }
      if (this._isReading) {
        window.speechSynthesis.cancel();
        this._isReading = false;
      } else this.textToSpeech(window.event.target.innerText);
    }
  }, {
    key: "runHotkey",
    value: function runHotkey(name) {
      switch (name) {
        case 'toggleMenu':
          this.toggleMenu();
          break;
        default:
          if (typeof this.menuInterface[name] === 'function') {
            if (this._options.modules[name]) {
              this.menuInterface[name](false);
            }
          }
          break;
      }
    }
  }, {
    key: "toggleMenu",
    value: function toggleMenu() {
      var _this8 = this;
      var shouldClose = this._menu.classList.contains('close');
      setTimeout(function () {
        _this8._menu.querySelector('ul').classList.toggle('before-collapse');
      }, shouldClose ? 500 : 10);
      this._menu.classList.toggle('close');
      this.options.icon.tabIndex = shouldClose ? 0 : -1;
      this._menu.childNodes.forEach(function (child) {
        if (child.hasChildNodes()) {
          if (child.nodeType === Node.ELEMENT_NODE && child.tagName === 'P') {
            child.tabIndex = -1;
          }
        }
      });
    }
  }, {
    key: "invoke",
    value: function invoke(action, button) {
      if (typeof this.menuInterface[action] === 'function') this.menuInterface[action](undefined, button);
    }
  }, {
    key: "onKeyDown",
    value: function onKeyDown(e) {
      var act = Object.entries(this.options.hotkeys.keys).find(function (val) {
        var pass = true;
        for (var i = 0; i < val[1].length; i++) {
          if (Number.isInteger(val[1][i])) {
            if (e.keyCode !== val[1][i]) {
              pass = false;
            }
          } else {
            if (e[val[1][i]] === undefined || e[val[1][i]] === false) {
              pass = false;
            }
          }
        }
        return pass;
      });
      if (act !== undefined) {
        this.runHotkey(act[0]);
      }
    }
  }, {
    key: "build",
    value: function build() {
      var _this9 = this;
      this._stateValues = {
        underlineLinks: false,
        textToSpeech: false,
        bigCursor: false,
        readingGuide: false,
        speechRate: 1,
        body: {},
        html: {}
      };
      this._body = document.body || document.getElementsByTagName('body')[0];
      this._html = document.documentElement || document.getElementsByTagName('html')[0];
      if (this.options.textEmlMode) this.initFontSize();
      this.injectCss(!this.options.suppressCssInjection && !this.options.suppressDomInjection);
      if (!this.options.suppressDomInjection) {
        this._icon = this.injectIcon();
        this._menu = this.injectMenu();
        this.injectTts();
        setTimeout(function () {
          _this9.addListeners();
          _this9.disableUnsupportedModulesAndSort();
        }, 10);
        if (this.options.hotkeys.enabled) {
          document.addEventListener('keydown', this._onKeyDownBind, false);
        }
        this._icon.addEventListener('click', function () {
          _this9.toggleMenu();
        }, false);
        this._icon.addEventListener('keyup', function (event) {
          if (event.key === 'Enter') {
            _this9.toggleMenu();
          }
        }, false);
        setTimeout(function () {
          _this9._icon.style.opacity = '1';
        }, 10);
      }
      this.updateReadGuide = function (e) {
        var newPos = 0;
        if (e.type === 'touchmove') {
          newPos = e.changedTouches[0].clientY;
        } else {
          newPos = e.y;
        }
        document.getElementById('access_read_guide_bar').style.top = newPos - (parseInt(_this9.options.guide.height.replace('px', '')) + 5) + 'px';
      };
      if (this.options.session.persistent) this.setSessionFromCache();
    }
  }, {
    key: "updateReadGuide",
    value: function updateReadGuide(e) {
      var newPos = 0;
      if (e.type === 'touchmove') {
        newPos = e.changedTouches[0].clientY;
      } else {
        newPos = e.y;
      }
      document.getElementById('access_read_guide_bar').style.top = newPos - (parseInt(this.options.guide.height.replace('px', '')) + 5) + 'px';
    }
  }, {
    key: "resetIfDefined",
    value: function resetIfDefined(src, dest, prop) {
      if (typeof src !== 'undefined') dest[prop] = src;
    }
  }, {
    key: "onChange",
    value: function onChange(updateSession) {
      if (updateSession && this.options.session.persistent) this.saveSession();
    }
  }, {
    key: "saveSession",
    value: function saveSession() {
      this._storage.set('_accessState', this.sessionState);
    }
  }, {
    key: "setSessionFromCache",
    value: function setSessionFromCache() {
      var sessionState = this._storage.get('_accessState');
      if (sessionState) {
        if (sessionState.textSize) {
          var textSize = sessionState.textSize;
          if (textSize > 0) {
            while (textSize--) {
              this.alterTextSize(true);
            }
          } else {
            while (textSize++) {
              this.alterTextSize(false);
            }
          }
        }
        if (sessionState.textSpace) {
          var textSpace = sessionState.textSpace;
          if (textSpace > 0) {
            while (textSpace--) {
              this.alterTextSpace(true);
            }
          } else {
            while (textSpace++) {
              this.alterTextSpace(false);
            }
          }
        }
        if (sessionState.lineHeight) {
          var lineHeight = sessionState.lineHeight;
          if (lineHeight > 0) {
            while (lineHeight--) {
              this.alterLineHeight(true);
            }
          } else {
            while (lineHeight++) {
              this.alterLineHeight(false);
            }
          }
        }
        if (sessionState.invertColors) this.menuInterface.invertColors();
        if (sessionState.grayHues) this.menuInterface.grayHues();
        if (sessionState.underlineLinks) this.menuInterface.underlineLinks();
        if (sessionState.bigCursor) this.menuInterface.bigCursor();
        if (sessionState.readingGuide) this.menuInterface.readingGuide();
        this.sessionState = sessionState;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var allSelectors = this._common.deployedObjects.getAll();
      allSelectors.forEach(function (value, key) {
        var elem = document.querySelector(key);
        if (elem) elem.parentElement.removeChild(elem);
      });
      document.removeEventListener('keydown', this._onKeyDownBind, false);
    }
  }]);
}();
_defineProperty(Accessibility, "CSS_CLASS_NAME", '_access-main-css');
_defineProperty(Accessibility, "MENU_WIDTH", '25vw');
Accessibility.init = function (opt) {
  console.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
  new Accessibility(opt);
};
var _default = exports["default"] = Accessibility;