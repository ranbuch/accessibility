"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuInterface = void 0;
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return r; }; var t, r = {}, e = Object.prototype, n = e.hasOwnProperty, o = "function" == typeof Symbol ? Symbol : {}, i = o.iterator || "@@iterator", a = o.asyncIterator || "@@asyncIterator", u = o.toStringTag || "@@toStringTag"; function c(t, r, e, n) { return Object.defineProperty(t, r, { value: e, enumerable: !n, configurable: !n, writable: !n }); } try { c({}, ""); } catch (t) { c = function c(t, r, e) { return t[r] = e; }; } function h(r, e, n, o) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype); return c(a, "_invoke", function (r, e, n) { var o = 1; return function (i, a) { if (3 === o) throw Error("Generator is already running"); if (4 === o) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var u = n.delegate; if (u) { var c = d(u, n); if (c) { if (c === f) continue; return c; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (1 === o) throw o = 4, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = 3; var h = s(r, e, n); if ("normal" === h.type) { if (o = n.done ? 4 : 2, h.arg === f) continue; return { value: h.arg, done: n.done }; } "throw" === h.type && (o = 4, n.method = "throw", n.arg = h.arg); } }; }(r, n, new Context(o || [])), !0), a; } function s(t, r, e) { try { return { type: "normal", arg: t.call(r, e) }; } catch (t) { return { type: "throw", arg: t }; } } r.wrap = h; var f = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var l = {}; c(l, i, function () { return this; }); var p = Object.getPrototypeOf, y = p && p(p(x([]))); y && y !== e && n.call(y, i) && (l = y); var v = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(l); function g(t) { ["next", "throw", "return"].forEach(function (r) { c(t, r, function (t) { return this._invoke(r, t); }); }); } function AsyncIterator(t, r) { function e(o, i, a, u) { var c = s(t[o], t, i); if ("throw" !== c.type) { var h = c.arg, f = h.value; return f && "object" == _typeof(f) && n.call(f, "__await") ? r.resolve(f.__await).then(function (t) { e("next", t, a, u); }, function (t) { e("throw", t, a, u); }) : r.resolve(f).then(function (t) { h.value = t, a(h); }, function (t) { return e("throw", t, a, u); }); } u(c.arg); } var o; c(this, "_invoke", function (t, n) { function i() { return new r(function (r, o) { e(t, n, r, o); }); } return o = o ? o.then(i, i) : i(); }, !0); } function d(r, e) { var n = e.method, o = r.i[n]; if (o === t) return e.delegate = null, "throw" === n && r.i["return"] && (e.method = "return", e.arg = t, d(r, e), "throw" === e.method) || "return" !== n && (e.method = "throw", e.arg = new TypeError("The iterator does not provide a '" + n + "' method")), f; var i = s(o, r.i, e.arg); if ("throw" === i.type) return e.method = "throw", e.arg = i.arg, e.delegate = null, f; var a = i.arg; return a ? a.done ? (e[r.r] = a.value, e.next = r.n, "return" !== e.method && (e.method = "next", e.arg = t), e.delegate = null, f) : a : (e.method = "throw", e.arg = new TypeError("iterator result is not an object"), e.delegate = null, f); } function w(t) { this.tryEntries.push(t); } function m(r) { var e = r[4] || {}; e.type = "normal", e.arg = t, r[4] = e; } function Context(t) { this.tryEntries = [[-1]], t.forEach(w, this), this.reset(!0); } function x(r) { if (null != r) { var e = r[i]; if (e) return e.call(r); if ("function" == typeof r.next) return r; if (!isNaN(r.length)) { var o = -1, a = function e() { for (; ++o < r.length;) if (n.call(r, o)) return e.value = r[o], e.done = !1, e; return e.value = t, e.done = !0, e; }; return a.next = a; } } throw new TypeError(_typeof(r) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, c(v, "constructor", GeneratorFunctionPrototype), c(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = c(GeneratorFunctionPrototype, u, "GeneratorFunction"), r.isGeneratorFunction = function (t) { var r = "function" == typeof t && t.constructor; return !!r && (r === GeneratorFunction || "GeneratorFunction" === (r.displayName || r.name)); }, r.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, c(t, u, "GeneratorFunction")), t.prototype = Object.create(v), t; }, r.awrap = function (t) { return { __await: t }; }, g(AsyncIterator.prototype), c(AsyncIterator.prototype, a, function () { return this; }), r.AsyncIterator = AsyncIterator, r.async = function (t, e, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(h(t, e, n, o), i); return r.isGeneratorFunction(e) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, g(v), c(v, u, "Generator"), c(v, i, function () { return this; }), c(v, "toString", function () { return "[object Generator]"; }), r.keys = function (t) { var r = Object(t), e = []; for (var n in r) e.unshift(n); return function t() { for (; e.length;) if ((n = e.pop()) in r) return t.value = n, t.done = !1, t; return t.done = !0, t; }; }, r.values = x, Context.prototype = { constructor: Context, reset: function reset(r) { if (this.prev = this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(m), !r) for (var e in this) "t" === e.charAt(0) && n.call(this, e) && !isNaN(+e.slice(1)) && (this[e] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0][4]; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(r) { if (this.done) throw r; var e = this; function n(t) { a.type = "throw", a.arg = r, e.next = t; } for (var o = e.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i[4], u = this.prev, c = i[1], h = i[2]; if (-1 === i[0]) return n("end"), !1; if (!c && !h) throw Error("try statement without catch or finally"); if (null != i[0] && i[0] <= u) { if (u < c) return this.method = "next", this.arg = t, n(c), !0; if (u < h) return n(h), !1; } } }, abrupt: function abrupt(t, r) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var n = this.tryEntries[e]; if (n[0] > -1 && n[0] <= this.prev && this.prev < n[2]) { var o = n; break; } } o && ("break" === t || "continue" === t) && o[0] <= r && r <= o[2] && (o = null); var i = o ? o[4] : {}; return i.type = t, i.arg = r, o ? (this.method = "next", this.next = o[2], f) : this.complete(i); }, complete: function complete(t, r) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && r && (this.next = r), f; }, finish: function finish(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[2] === t) return this.complete(e[4], e[3]), m(e), f; } }, "catch": function _catch(t) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var e = this.tryEntries[r]; if (e[0] === t) { var n = e[4]; if ("throw" === n.type) { var o = n.arg; m(e); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(r, e, n) { return this.delegate = { i: x(r), r: e, n: n }, "next" === this.method && (this.arg = t), f; } }, r; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var MenuInterface = exports.MenuInterface = /*#__PURE__*/function () {
  function MenuInterface(accessibility) {
    _classCallCheck(this, MenuInterface);
    _defineProperty(this, "_acc", void 0);
    _defineProperty(this, "readBind", void 0);
    _defineProperty(this, "_dialog", void 0);
    this._acc = accessibility;
    this.readBind = this._acc.read.bind(this._acc);
  }
  return _createClass(MenuInterface, [{
    key: "increaseText",
    value: function increaseText() {
      this._acc.alterTextSize(true);
    }
  }, {
    key: "decreaseText",
    value: function decreaseText() {
      this._acc.alterTextSize(false);
    }
  }, {
    key: "increaseTextSpacing",
    value: function increaseTextSpacing() {
      this._acc.alterTextSpace(true);
    }
  }, {
    key: "decreaseTextSpacing",
    value: function decreaseTextSpacing() {
      this._acc.alterTextSpace(false);
    }
  }, {
    key: "invertColors",
    value: function invertColors(destroy) {
      if (typeof this._acc.stateValues.html.backgroundColor === 'undefined') this._acc.stateValues.html.backgroundColor = getComputedStyle(this._acc.html).backgroundColor;
      if (typeof this._acc.stateValues.html.color === 'undefined') this._acc.stateValues.html.color = getComputedStyle(this._acc.html).color;
      if (destroy) {
        this._acc.resetIfDefined(this._acc.stateValues.html.backgroundColor, this._acc.html.style, 'backgroundColor');
        this._acc.resetIfDefined(this._acc.stateValues.html.color, this._acc.html.style, 'color');
        if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove('active');
        this._acc.stateValues.invertColors = false;
        this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
        this._acc.onChange(true);
        this._acc.html.style.filter = '';
        return;
      }
      if (this._acc.stateValues.invertColors && this._acc.stateValues.textToSpeech) {
        this._acc.textToSpeech('Colors Set To Normal');
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
      this._acc.stateValues.invertColors = !this._acc.stateValues.invertColors;
      this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
      this._acc.onChange(true);
      if (this._acc.stateValues.invertColors) {
        if (this._acc.stateValues.grayHues) this._acc.menuInterface.grayHues(true);
        this._acc.html.style.filter = 'invert(1)';
        if (this._acc.stateValues.textToSpeech) {
          this._acc.textToSpeech('Colors Inverted');
        }
      } else {
        this._acc.html.style.filter = '';
      }
    }
  }, {
    key: "grayHues",
    value: function grayHues(destroy) {
      if (typeof this._acc.stateValues.html.filter === 'undefined') this._acc.stateValues.html.filter = getComputedStyle(this._acc.html).filter;
      if (typeof this._acc.stateValues.html.webkitFilter === 'undefined') this._acc.stateValues.html.webkitFilter = getComputedStyle(this._acc.html).webkitFilter;
      if (typeof this._acc.stateValues.html.mozFilter === 'undefined') this._acc.stateValues.html.mozFilter = getComputedStyle(this._acc.html).mozFilter;
      if (typeof this._acc.stateValues.html.msFilter === 'undefined') this._acc.stateValues.html.msFilter = getComputedStyle(this._acc.html).msFilter;
      if (destroy) {
        if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove('active');
        this._acc.stateValues.grayHues = false;
        this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;
        this._acc.onChange(true);
        this._acc.resetIfDefined(this._acc.stateValues.html.filter, this._acc.html.style, 'filter');
        this._acc.resetIfDefined(this._acc.stateValues.html.webkitFilter, this._acc.html.style, 'webkitFilter');
        this._acc.resetIfDefined(this._acc.stateValues.html.mozFilter, this._acc.html.style, 'mozFilter');
        this._acc.resetIfDefined(this._acc.stateValues.html.msFilter, this._acc.html.style, 'msFilter');
        return;
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active');
      this._acc.stateValues.grayHues = !this._acc.stateValues.grayHues;
      this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;
      this._acc.onChange(true);
      if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.grayHues) this._acc.textToSpeech('Gray Hues Disabled.');
      var val;
      if (this._acc.stateValues.grayHues) {
        val = 'grayscale(1)';
        if (this._acc.stateValues.invertColors) {
          this.invertColors(true);
        }
        if (this._acc.stateValues.textToSpeech) {
          this._acc.textToSpeech('Gray Hues Enabled.');
        }
      } else {
        val = '';
      }
      this._acc.html.style.webkitFilter = val;
      this._acc.html.style.mozFilter = val;
      this._acc.html.style.msFilter = val;
      this._acc.html.style.filter = val;
    }
  }, {
    key: "underlineLinks",
    value: function underlineLinks(destroy) {
      var _this = this;
      var className = '_access-underline';
      var remove = function remove() {
        var style = document.querySelector('.' + className);
        if (style) {
          style.parentElement.removeChild(style);
          _this._acc.common.deployedObjects.remove('.' + className);
        }
      };
      if (destroy) {
        this._acc.stateValues.underlineLinks = false;
        this._acc.sessionState.underlineLinks = this._acc.stateValues.underlineLinks;
        this._acc.onChange(true);
        if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove('active');
        return remove();
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active');
      this._acc.stateValues.underlineLinks = !this._acc.stateValues.underlineLinks;
      this._acc.sessionState.underlineLinks = this._acc.stateValues.underlineLinks;
      this._acc.onChange(true);
      if (this._acc.stateValues.underlineLinks) {
        var css = "\n            body a {\n                text-decoration: underline !important;\n            }\n        ";
        this._acc.common.injectStyle(css, {
          className: className
        });
        this._acc.common.deployedObjects.set('.' + className, true);
        if (this._acc.stateValues.textToSpeech) {
          this._acc.textToSpeech('Links UnderLined');
        }
      } else {
        if (this._acc.stateValues.textToSpeech) {
          this._acc.textToSpeech('Links UnderLine Removed');
        }
        remove();
      }
    }
  }, {
    key: "bigCursor",
    value: function bigCursor(destroy) {
      if (destroy) {
        this._acc.html.classList.remove('_access_cursor');
        if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.remove('active');
        this._acc.stateValues.bigCursor = false;
        this._acc.sessionState.bigCursor = false;
        this._acc.onChange(true);
        return;
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.toggle('active');
      this._acc.stateValues.bigCursor = !this._acc.stateValues.bigCursor;
      this._acc.sessionState.bigCursor = this._acc.stateValues.bigCursor;
      this._acc.onChange(true);
      this._acc.html.classList.toggle('_access_cursor');
      if (this._acc.stateValues.textToSpeech && this._acc.stateValues.bigCursor) this._acc.textToSpeech('Big Cursor Enabled');
      if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.bigCursor) this._acc.textToSpeech('Big Cursor Disabled');
    }
  }, {
    key: "readingGuide",
    value: function readingGuide(destroy) {
      if (destroy) {
        if (document.getElementById('access_read_guide_bar')) {
          document.getElementById('access_read_guide_bar').remove();
        }
        if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.remove('active');
        this._acc.stateValues.readingGuide = false;
        this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;
        this._acc.onChange(true);
        document.body.removeEventListener('touchmove', this._acc.updateReadGuide, false);
        document.body.removeEventListener('mousemove', this._acc.updateReadGuide, false);
        if (this._acc.stateValues.textToSpeech) this._acc.textToSpeech('Reading Guide Enabled');
        return;
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle('active');
      this._acc.stateValues.readingGuide = !this._acc.stateValues.readingGuide;
      this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;
      this._acc.onChange(true);
      if (this._acc.stateValues.readingGuide) {
        var read = document.createElement('div');
        read.id = 'access_read_guide_bar';
        read.classList.add('access_read_guide_bar');
        document.body.append(read);
        document.body.addEventListener('touchmove', this._acc.updateReadGuide, false);
        document.body.addEventListener('mousemove', this._acc.updateReadGuide, false);
      } else {
        if (document.getElementById('access_read_guide_bar') !== undefined) {
          document.getElementById('access_read_guide_bar').remove();
        }
        document.body.removeEventListener('touchmove', this._acc.updateReadGuide, false);
        document.body.removeEventListener('mousemove', this._acc.updateReadGuide, false);
        if (this._acc.stateValues.textToSpeech) this._acc.textToSpeech('Reading Guide Disabled');
      }
    }
  }, {
    key: "textToSpeech",
    value: function textToSpeech(destroy) {
      var _this2 = this;
      // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;
      var tSpeechList = document.querySelector('._access-menu [data-access-action="textToSpeech"]');
      if (!tSpeechList) return;
      var step1 = document.getElementsByClassName('screen-reader-wrapper-step-1');
      var step2 = document.getElementsByClassName('screen-reader-wrapper-step-2');
      var step3 = document.getElementsByClassName('screen-reader-wrapper-step-3');
      this._acc.onChange(false);
      var className = '_access-text-to-speech';
      var remove = function remove() {
        var style = document.querySelector('.' + className);
        if (style) {
          style.parentElement.removeChild(style);
          document.removeEventListener('click', _this2.readBind, false);
          document.removeEventListener('keyup', _this2.readBind, false);
          _this2._acc.common.deployedObjects.remove('.' + className);
        }
        if (window.speechSynthesis) window.speechSynthesis.cancel();
        _this2._acc.isReading = false;
      };
      if (destroy) {
        tSpeechList.classList.remove('active');
        step1[0].classList.remove('active');
        step2[0].classList.remove('active');
        step3[0].classList.remove('active');
        this._acc.stateValues.textToSpeech = false;
        window.speechSynthesis.cancel();
        return remove();
      }
      if (this._acc.stateValues.speechRate === 1 && !tSpeechList.classList.contains('active')) {
        this._acc.stateValues.textToSpeech = true;
        this._acc.textToSpeech('Screen Reader enabled. Reading Pace - Normal');
        tSpeechList.classList.add('active');
        step1[0].classList.add('active');
        step2[0].classList.add('active');
        step3[0].classList.add('active');
      } else if (this._acc.stateValues.speechRate === 1 && tSpeechList.classList.contains('active')) {
        this._acc.stateValues.speechRate = 1.5;
        this._acc.textToSpeech('Reading Pace - Fast');
        step1[0].classList.remove('active');
      } else if (this._acc.stateValues.speechRate === 1.5 && tSpeechList.classList.contains('active')) {
        this._acc.stateValues.speechRate = 0.7;
        this._acc.textToSpeech('Reading Pace - Slow');
        step2[0].classList.remove('active');
      } else {
        this._acc.stateValues.speechRate = 1;
        this._acc.textToSpeech('Screen Reader - Disabled');
        tSpeechList.classList.remove('active');
        step3[0].classList.remove('active');
        var timeout = setInterval(function () {
          if (_this2._acc.isReading) {
            return;
          }
          _this2._acc.stateValues.textToSpeech = false;
          remove();
          clearTimeout(timeout);
        }, 500);
        return;
      }
      var css = "\n            *:hover {\n                box-shadow: 2px 2px 2px rgba(180,180,180,0.7);\n            }\n        ";
      if (tSpeechList.classList.contains('active') && this._acc.stateValues.speechRate === 1) {
        this._acc.common.injectStyle(css, {
          className: className
        });
        this._acc.common.deployedObjects.set('.' + className, true);
        document.addEventListener('click', this.readBind, false);
        document.addEventListener('keyup', this.readBind, false);
      }
    }
  }, {
    key: "speechToText",
    value: function speechToText(destroy) {
      var _this3 = this;
      // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
      var sTextList = document.querySelector('._access-menu [data-access-action="speechToText"]');
      if (!sTextList) return;
      this._acc.onChange(false);
      var className = '_access-speech-to-text';
      var remove = function remove() {
        if (_this3._acc.recognition) {
          _this3._acc.recognition.stop();
          _this3._acc.body.classList.remove('_access-listening');
        }
        var style = document.querySelector('.' + className);
        if (style) {
          style.parentElement.removeChild(style);
          _this3._acc.common.deployedObjects.remove('.' + className);
        }
        var inputs = document.querySelectorAll('._access-mic');
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].removeEventListener('focus', _this3._acc.listen.bind(_this3._acc), false);
          inputs[i].classList.remove('_access-mic');
        }
        sTextList.classList.remove('active');
      };
      if (destroy) {
        this._acc.stateValues.speechToText = false;
        return remove();
      }
      this._acc.stateValues.speechToText = !this._acc.stateValues.speechToText;
      if (this._acc.stateValues.speechToText) {
        var css = "\n                body:after {\n                    content: ".concat(!this._acc.options.icon.useEmojis ? '"mic"' : 'var(--_access-menu-item-icon-mic,"🎤")', ";\n                    ").concat(!this._acc.options.icon.useEmojis ? "font-family: var(--_access-menu-item-icon-font-family-after, ".concat(this._acc.fixedDefaultFont) : '', "\n                    position: fixed;\n                    z-index: 1100;\n                    top: 1vw;\n                    right: 1vw;\n                    width: 36px;\n                    height: 36px;\n                    font-size: 30px;\n                    line-height: 36px;\n                    border-radius: 50%;\n                    background: rgba(255,255,255,0.7);\n                    display: flex;\n                    justify-content: center;\n                    aling-items: center;\n                }\n\n                body._access-listening:after {\n                    animation: _access-listening-animation 2s infinite ease;\n                }\n\n                @keyframes _access-listening-animation {\n                    0%  {background-color: transparent;}\n                    50%  {background-color: #EF9A9A;}\n                }\n            ");
        this._acc.common.injectStyle(css, {
          className: className
        });
        this._acc.common.deployedObjects.set('.' + className, true);
        var inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="tel"], input[type="search"], textarea, [contenteditable]');
        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener('blur', function () {
            if (_typeof(_this3._acc.recognition) === 'object' && typeof _this3._acc.recognition.stop === 'function') _this3._acc.recognition.stop();
          }, false);
          inputs[i].addEventListener('focus', this._acc.listen.bind(this._acc), false);
          inputs[i].parentElement.classList.add('_access-mic');
        }
        sTextList.classList.add('active');
      } else remove();
    }
  }, {
    key: "disableAnimations",
    value: function disableAnimations(destroy) {
      var _this4 = this;
      var className = '_access-disable-animations',
        autoplayStopped = 'data-autoplay-stopped';
      var remove = function remove() {
        if (!_this4._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="disableAnimations"]').classList.remove('active');
        _this4._acc.stateValues.disableAnimations = false;
        var style = document.querySelector('.' + className);
        if (style) {
          style.parentElement.removeChild(style);
          _this4._acc.common.deployedObjects.remove('.' + className);
        }
        var allImages = document.querySelectorAll('[data-org-src]');
        allImages.forEach(/*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(i) {
            var screenshot;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  screenshot = i.src;
                  i.setAttribute('src', i.getAttribute('data-org-src'));
                  i.setAttribute('data-org-src', screenshot);
                case 3:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }());
        var allVideos = document.querySelectorAll("video[".concat(autoplayStopped, "]"));
        allVideos.forEach(function (v) {
          v.setAttribute('autoplay', '');
          v.removeAttribute(autoplayStopped);
          v.play();
        });
      };
      if (destroy) {
        remove();
        return;
      }
      this._acc.stateValues.disableAnimations = !this._acc.stateValues.disableAnimations;
      if (!this._acc.stateValues.disableAnimations) {
        remove();
        return;
      }
      if (!this._acc.options.suppressDomInjection) document.querySelector('._access-menu [data-access-action="disableAnimations"]').classList.add('active');
      var css = "\n                body * {\n                    animation-duration: 0.0ms !important;\n                    transition-duration: 0.0ms !important;\n                }\n        ";
      this._acc.common.injectStyle(css, {
        className: className
      });
      this._acc.common.deployedObjects.set('.' + className, true);
      var allImages = document.querySelectorAll('img');
      allImages.forEach(/*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(i) {
          var ext, screenshot;
          return _regeneratorRuntime().wrap(function _callee2$(_context2) {
            while (1) switch (_context2.prev = _context2.next) {
              case 0:
                ext = _this4._acc.common.getFileExtension(i.src);
                if (!(ext && ext.toLowerCase() === 'gif')) {
                  _context2.next = 9;
                  break;
                }
                screenshot = i.getAttribute('data-org-src');
                if (screenshot) {
                  _context2.next = 7;
                  break;
                }
                _context2.next = 6;
                return _this4._acc.common.createScreenshot(i.src);
              case 6:
                screenshot = _context2.sent;
              case 7:
                i.setAttribute('data-org-src', i.src);
                i.src = screenshot;
              case 9:
              case "end":
                return _context2.stop();
            }
          }, _callee2);
        }));
        return function (_x2) {
          return _ref2.apply(this, arguments);
        };
      }());
      var allVideos = document.querySelectorAll('video[autoplay]');
      allVideos.forEach(function (v) {
        v.setAttribute(autoplayStopped, '');
        v.removeAttribute('autoplay');
        v.pause();
      });
    }
  }, {
    key: "iframeModals",
    value: function iframeModals(destroy, button) {
      var _this5 = this;
      if (!button) destroy = true;
      var close = function close() {
        if (_this5._dialog) {
          _this5._dialog.classList.add('closing');
          setTimeout(function () {
            _this5._dialog.classList.remove('closing');
            _this5._dialog.close();
            _this5._dialog.remove();
          }, 350);
          detach();
        }
        if (button) button.classList.remove('active');
      };
      var onClose = function onClose() {
        close();
      };
      var detach = function detach() {
        _this5._dialog.querySelector('button').removeEventListener('click', onClose, false);
        _this5._dialog.removeEventListener('close', onClose);
      };
      if (destroy) {
        close();
      } else {
        button.classList.add('active');
        if (!this._dialog) this._dialog = document.createElement('dialog');
        this._dialog.classList.add('_access');
        this._dialog.innerHTML = '';
        this._dialog.appendChild(this._acc.common.jsonToHtml({
          type: 'div',
          children: [{
            type: 'div',
            children: [{
              type: 'button',
              attrs: {
                role: 'button',
                'class': this._acc.options.icon.useEmojis ? '' : this._acc.options.icon.fontClass,
                style: "position: absolute;\n                                    top: 5px;\n                                    cursor: pointer;\n                                    font-size: 24px !important;\n                                    font-weight: bold;\n                                    background: transparent;\n                                    border: none;\n                                    left: 5px;\n                                    color: #d63c3c;\n                                    padding: 0;"
              },
              children: [{
                type: '#text',
                text: this._acc.options.icon.useEmojis ? 'X' : 'close'
              }]
            }]
          }, {
            type: 'div',
            children: [{
              type: 'iframe',
              attrs: {
                src: button.getAttribute('data-access-url'),
                style: 'width: 50vw;height: 50vh;padding: 30px;'
              }
            }]
          }]
        }));
        document.body.appendChild(this._dialog);
        this._dialog.querySelector('button').addEventListener('click', onClose, false);
        this._dialog.addEventListener('close', onClose);
        this._dialog.showModal();
      }
    }
  }, {
    key: "customFunctions",
    value: function customFunctions(destroy, button) {
      if (!button) return;
      var cf = this._acc.options.customFunctions[parseInt(button.getAttribute('data-access-custom-index'))];
      if (cf.toggle && button.classList.contains('active')) destroy = true;
      if (destroy) {
        if (cf.toggle) button.classList.remove('active');
        cf.method(cf, false);
      } else {
        if (cf.toggle) button.classList.add('active');
        cf.method(cf, true);
      }
    }
  }, {
    key: "increaseLineHeight",
    value: function increaseLineHeight() {
      this._acc.alterLineHeight(true);
    }
  }, {
    key: "decreaseLineHeight",
    value: function decreaseLineHeight() {
      this._acc.alterLineHeight(false);
    }
  }]);
}();