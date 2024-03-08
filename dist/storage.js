'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Storage = void 0;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }
var Storage = /*#__PURE__*/function () {
  function Storage() {
    _classCallCheck(this, Storage);
  }
  _createClass(Storage, [{
    key: "has",
    value: function has(key) {
      return window.localStorage.hasOwnProperty(key);
    }
  }, {
    key: "set",
    value: function set(key, value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }
  }, {
    key: "get",
    value: function get(key) {
      var item = window.localStorage.getItem(key);
      try {
        return JSON.parse(item);
      } catch (e) {
        return item;
      }
    }
  }, {
    key: "clear",
    value: function clear() {
      window.localStorage.clear();
    }
  }, {
    key: "remove",
    value: function remove(key) {
      window.localStorage.removeItem(key);
    }
  }, {
    key: "isSupported",
    value: function isSupported() {
      var test = '_test';
      try {
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
      } catch (e) {
        return false;
      }
    }
  }]);
  return Storage;
}();
exports.Storage = Storage;