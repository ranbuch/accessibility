'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Common = void 0;

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
          if (dest && dest[i]) src[i] = this.extend(src[i], dest[i]);
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
          return callback(document.fonts.check("1em ".concat(fontFamily.replaceAll('+', ' ')))); // return callback(document.fonts.check(`1em ${fontFamily}`));
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
  }]);

  return Common;
}();

exports.Common = Common;