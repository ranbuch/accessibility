"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Greeter = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Greeter = /*#__PURE__*/function () {
  function Greeter(name) {
    _classCallCheck(this, Greeter);

    _defineProperty(this, "name", void 0);

    this.name = name;
  }

  _createClass(Greeter, [{
    key: "greet",
    value: function greet() {
      console.log("Hi, ".concat(this.name, "!"));
    }
  }]);

  return Greeter;
}();

exports.Greeter = Greeter;