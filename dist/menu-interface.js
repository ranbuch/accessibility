"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuInterface = void 0;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MenuInterface = /*#__PURE__*/function () {
  function MenuInterface(accessibility) {
    _classCallCheck(this, MenuInterface);

    _defineProperty(this, "_acc", void 0);

    _defineProperty(this, "readBind", void 0);

    this._acc = accessibility;
    this.readBind = this._acc.read.bind(this._acc);
  }

  _createClass(MenuInterface, [{
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

        document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove('active');
        this._acc.stateValues.invertColors = false;
        this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;

        this._acc.onChange(true);

        this._acc.html.style.filter = '';
        return;
      }

      document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
      this._acc.stateValues.invertColors = !this._acc.stateValues.invertColors;
      this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;

      this._acc.onChange(true);

      if (this._acc.stateValues.invertColors) {
        if (this._acc.stateValues.grayHues) this._acc.menuInterface.grayHues(true);
        this._acc.html.style.filter = 'invert(1)';
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
        document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove('active');
        this._acc.stateValues.grayHues = false;
        this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;

        this._acc.onChange(true);

        this._acc.resetIfDefined(this._acc.stateValues.html.filter, this._acc.html.style, 'filter');

        this._acc.resetIfDefined(this._acc.stateValues.html.webkitFilter, this._acc.html.style, 'webkitFilter');

        this._acc.resetIfDefined(this._acc.stateValues.html.mozFilter, this._acc.html.style, 'mozFilter');

        this._acc.resetIfDefined(this._acc.stateValues.html.msFilter, this._acc.html.style, 'msFilter');

        return;
      }

      document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active');
      this._acc.stateValues.grayHues = !this._acc.stateValues.grayHues;
      this._acc.sessionState.grayHues = this._acc.stateValues.grayHues;

      this._acc.onChange(true);

      var val;

      if (this._acc.stateValues.grayHues) {
        val = 'grayscale(1)';
        if (this._acc.stateValues.invertColors) this._acc.menuInterface.invertColors(true);
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

        document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove('active');
        return remove();
      }

      document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active');
      this._acc.stateValues.underlineLinks = !this._acc.stateValues.underlineLinks;
      this._acc.sessionState.underlineLinks = this._acc.stateValues.underlineLinks;

      this._acc.onChange(true);

      if (this._acc.stateValues.underlineLinks) {
        var css = "\n            body a {\n                text-decoration: underline !important;\n            }\n        ";

        this._acc.common.injectStyle(css, {
          className: className
        });

        this._acc.common.deployedObjects.set('.' + className, true);
      } else {
        remove();
      }
    }
  }, {
    key: "bigCursor",
    value: function bigCursor(destroy) {
      if (destroy) {
        this._acc.html.classList.remove('_access_cursor');

        document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.remove('active');
        this._acc.stateValues.bigCursor = false;
        this._acc.sessionState.bigCursor = false;

        this._acc.onChange(true);

        return;
      }

      document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.toggle('active');
      this._acc.stateValues.bigCursor = !this._acc.stateValues.bigCursor;
      this._acc.sessionState.bigCursor = this._acc.stateValues.bigCursor;

      this._acc.onChange(true);

      this._acc.html.classList.toggle('_access_cursor');
    }
  }, {
    key: "readingGuide",
    value: function readingGuide(destroy) {
      if (destroy) {
        if (document.getElementById('access_read_guide_bar')) {
          document.getElementById('access_read_guide_bar').remove();
        }

        document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.remove('active');
        this._acc.stateValues.readingGuide = false;
        this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;

        this._acc.onChange(true);

        document.body.removeEventListener('touchmove', this._acc.updateReadGuide, false);
        document.body.removeEventListener('mousemove', this._acc.updateReadGuide, false);
        return;
      }

      document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle('active');
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
      }
    }
  }, {
    key: "textToSpeech",
    value: function textToSpeech(destroy) {
      var _this2 = this;

      console.log('textToSpeech', destroy); // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;

      this._acc.onChange(false);

      var className = '_access-text-to-speech';

      var remove = function remove() {
        var style = document.querySelector('.' + className);

        if (style) {
          style.parentElement.removeChild(style);
          document.removeEventListener('click', _this2.readBind, false);

          _this2._acc.common.deployedObjects.remove('.' + className);
        }

        if (window.speechSynthesis) window.speechSynthesis.cancel();
        _this2._acc.isReading = false;
      };

      if (destroy) {
        document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.remove('active');
        this._acc.stateValues.textToSpeech = false;
        return remove();
      }

      document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle('active');
      this._acc.stateValues.textToSpeech = !this._acc.stateValues.textToSpeech;

      if (this._acc.stateValues.textToSpeech) {
        var css = "\n                *:hover {\n                    box-shadow: 2px 2px 2px rgba(180,180,180,0.7);\n                }\n            ";

        this._acc.common.injectStyle(css, {
          className: className
        });

        this._acc.common.deployedObjects.set('.' + className, true);

        document.addEventListener('click', this.readBind, false);
      } else {
        remove();
      }
    }
  }, {
    key: "speechToText",
    value: function speechToText(destroy) {
      var _this3 = this;

      // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
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
      };

      if (destroy) {
        document.querySelector('._access-menu [data-access-action="speechToText"]').classList.remove('active');
        this._acc.stateValues.speechToText = false;
        return remove();
      }

      document.querySelector('._access-menu [data-access-action="speechToText"]').classList.toggle('active');
      this._acc.stateValues.speechToText = !this._acc.stateValues.speechToText;

      if (this._acc.stateValues.speechToText) {
        var css = "\n                body:after {\n                    content: ".concat(!this._acc.options.icon.useEmojis ? '"mic"' : '"🎤"', ";\n                    ").concat(!this._acc.options.icon.useEmojis ? "font-family: '" + this._acc.options.icon.fontFamily + "';" : '', "\n                    position: fixed;\n                    z-index: 1100;\n                    top: 1vw;\n                    right: 1vw;\n                    width: 36px;\n                    height: 36px;\n                    font-size: 30px;\n                    line-height: 36px;\n                    border-radius: 50%;\n                    background: rgba(255,255,255,0.7);\n                    display: flex;\n                    justify-content: center;\n                    aling-items: center;\n                }\n\n                body._access-listening:after {\n                    animation: _access-listening-animation 2s infinite ease;\n                }\n\n                @keyframes _access-listening-animation {\n                    0%  {background-color: transparent;}\n                    50%  {background-color: #EF9A9A;}\n                }\n            ");

        this._acc.common.injectStyle(css, {
          className: className
        });

        this._acc.common.deployedObjects.set('.' + className, true);

        var inputs = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');

        for (var i = 0; i < inputs.length; i++) {
          inputs[i].addEventListener('blur', function () {
            if (_typeof(_this3._acc.recognition) === 'object' && typeof _this3._acc.recognition.stop === 'function') _this3._acc.recognition.stop();
          }, false);
          inputs[i].addEventListener('focus', this._acc.listen.bind(this._acc), false);
          inputs[i].parentElement.classList.add('_access-mic');
        }
      } else {
        remove();
      }
    }
  }]);

  return MenuInterface;
}();

exports.MenuInterface = MenuInterface;