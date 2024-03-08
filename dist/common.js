'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common = void 0;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
var Common = /*#__PURE__*/function () {
  function Common() {
    _classCallCheck(this, Common);
    _defineProperty(this, "body", void 0);
    _defineProperty(this, "deployedMap", void 0);
    _defineProperty(this, "_isIOS", void 0);
    _defineProperty(this, "_canvas", void 0);
    this.body = document.body || document.querySelector('body');
    this.deployedMap = new Map();
  }
  _createClass(Common, [{
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
        img.onload = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
          var ctx, res;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
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
  return Common;
}();
exports.Common = Common;
_defineProperty(Common, "DEFAULT_PIXEL", 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAA1JREFUGFdj+P///38ACfsD/QVDRcoAAAAASUVORK5CYII=');