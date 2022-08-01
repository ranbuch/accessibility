'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.Accessibility = void 0;

var _common = require("./common");

var _menuInterface = require("./menu-interface");

var _storage = require("./storage");

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Accessibility = /*#__PURE__*/function () {
  // SpeechRecognition;
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

    _defineProperty(this, "_speechToTextTarget", void 0);

    _defineProperty(this, "menuInterface", void 0);

    _defineProperty(this, "options", void 0);

    this._common = new _common.Common();
    this._storage = new _storage.Storage();
    this._options = this.defaultOptions;
    options = this.deleteOppositesIfDefined(options);
    this.options = this._common.extend(this._options, options); // Consider adding this:
    // if (options) {
    //     if (!options.textToSpeechLang && document.querySelector('html').getAttribute('lang')) {
    //         this.options.textToSpeechLang = document.querySelector('html').getAttribute('lang')
    //     }
    // }

    this.disabledUnsupportedFeatures();
    this._sessionState = {
      textSize: 0,
      textSpace: 0,
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

        if (!_this.options.icon.forceFont) {
          setTimeout(function () {
            _this._common.isFontLoaded(_this.options.icon.fontFamily, function (isLoaded) {
              if (!isLoaded || hasError) {
                _this._common.warn("".concat(_this.options.icon.fontFamily, " font was not loaded, using emojis instead"));

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

  _createClass(Accessibility, [{
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
    } // Default options

  }, {
    key: "defaultOptions",
    get: function get() {
      return {
        icon: {
          position: {
            bottom: {
              size: 50,
              units: 'px'
            },
            right: {
              size: 10,
              units: 'px'
            },
            type: 'fixed'
          },
          dimensions: {
            width: {
              size: 50,
              units: 'px'
            },
            height: {
              size: 50,
              units: 'px'
            }
          },
          zIndex: '9999',
          backgroundColor: '#4054b2',
          color: '#fff',
          img: 'accessible',
          circular: false,
          circularBorder: false,
          fontFaceSrc: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
          fontFamily: this._common.getFixedFont('Material Icons'),
          fontClass: 'material-icons',
          useEmojis: false
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
            speechToText: ['ctrlKey', 'altKey', 83]
          }
        },
        buttons: {
          font: {
            size: 18,
            units: 'px'
          }
        },
        guide: {
          cBorder: '#20ff69',
          cBackground: '#000000',
          height: '12px'
        },
        menu: {
          dimensions: {
            width: {
              size: 25,
              units: 'vw'
            },
            height: {
              size: 'auto',
              units: ''
            }
          },
          fontFamily: 'RobotoDraft, Roboto, sans-serif, Arial'
        },
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
          speechToText: 'speech to text'
        },
        textToSpeechLang: 'en-US',
        speechToTextLang: 'en-US',
        textPixelMode: false,
        textEmlMode: true,
        animations: {
          buttons: true
        },
        modules: {
          increaseText: true,
          decreaseText: true,
          increaseTextSpacing: true,
          decreaseTextSpacing: true,
          invertColors: true,
          grayHues: true,
          bigCursor: true,
          readingGuide: true,
          underlineLinks: true,
          textToSpeech: true,
          speechToText: true
        },
        session: {
          persistent: true
        }
      };
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
      this.options.icon.fontFamily = null;
      this.options.icon.img = '♿';
      this.options.icon.fontClass = '';
    }
  }, {
    key: "deleteOppositesIfDefined",
    value: function deleteOppositesIfDefined(options) {
      if (options.icon && options.icon.position) {
        if (options.icon.position.left) {
          delete this._options.icon.position.right;
          this._options.icon.position.left = options.icon.position.left;
        }

        if (options.icon.position.top) {
          delete this._options.icon.position.bottom;
          this._options.icon.position.top = options.icon.position.top;
        }
      }

      return options;
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
    value: function injectCss() {
      var css = "\n        ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {\n            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);\n            background-color: #F5F5F5;\n        }\n        ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {\n            width: 6px;\n            background-color: #F5F5F5;\n        }\n        ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {\n            background-color: #999999;\n        }\n        ._access-icon {\n            position: ".concat(this.options.icon.position.type, ";\n            background-repeat: no-repeat;\n            background-size: contain;\n            cursor: pointer;\n            opacity: 0;\n            transition-duration: .5s;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            ").concat(!this.options.icon.useEmojis ? 'box-shadow: 1px 1px 5px rgba(0,0,0,.5);' : '', "\n            transform: ").concat(!this.options.icon.useEmojis ? 'scale(1)' : 'skewX(18deg)', ";\n        }\n        ._access-icon:hover {\n            ") + (this.options.animations.buttons && !this.options.icon.useEmojis ? "\n            box-shadow: 1px 1px 10px rgba(0,0,0,.9);\n            transform: scale(1.1);\n            " : '') + "\n        }\n        .circular._access-icon {\n            border-radius: 50%;\n            border: .5px solid white;\n        }\n        " + (this.options.animations.buttons && this.options.icon.circularBorder ? "\n        .circular._access-icon:hover {\n            border: 5px solid white;\n            border-style: double;\n            font-size: 35px!important;\n            vertical-align: middle;\n            padding-top: 2px;\n            text-align: center;\n        }\n        " : '') + "\n        .access_read_guide_bar{\n            box-sizing: border-box;\n            background: ".concat(this.options.guide.cBackground, ";\n            width: 100%!important;\n            min-width: 100%!important;\n            position: fixed!important;\n            height: ").concat(this.options.guide.height, " !important;\n            border: solid 3px ").concat(this.options.guide.cBorder, ";\n            border-radius: 5px;\n            top: 15px;\n            z-index: 2147483647;\n        }\n        .access-high-contrast *{\n            background-color: #000 !important;\n            background-image: none !important;\n            border-color: #fff !important;\n            -webkit-box-shadow: none !important;\n            box-shadow: none !important;\n            color: #fff !important;\n            text-indent: 0 !important;\n            text-shadow: none !important;\n        }\n        ._access-menu {\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            -ms-user-select: none;\n            user-select: none;\n            position: fixed;\n            width: ").concat(this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units, ";\n            height: ").concat(this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units, ";\n            transition-duration: .5s;\n            z-index: ").concat(this.options.icon.zIndex + 1, ";\n            opacity: 1;\n            background-color: #fff;\n            color: #000;\n            border-radius: 3px;\n            border: solid 1px #f1f0f1;\n            font-family: ").concat(this.options.menu.fontFamily, ";\n            min-width: 300px;\n            box-shadow: 0px 0px 1px #aaa;\n            max-height: 100vh;\n            ").concat(getComputedStyle(this._body).direction === 'rtl' ? 'text-indent: -5px' : '', "\n        }\n        ._access-menu.close {\n            z-index: -1;\n            width: 0;\n            opacity: 0;\n            background-color: transparent;\n        }\n        ._access-menu.bottom {\n            bottom: 0;\n        }\n        ._access-menu.top {\n            top: 0;\n        }\n        ._access-menu.left {\n            left: 0;\n        }\n        ._access-menu.close.left {\n            left: -").concat(this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units, ";\n        }\n        ._access-menu.right {\n            right: 0;\n        }\n        ._access-menu.close.right {\n            right: -").concat(this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units, ";\n        }\n        ._access-menu ._text-center {\n            text-align: center;\n        }\n        ._access-menu h3 {\n            font-size: 24px !important;\n            margin-top: 20px;\n            margin-bottom: 20px;\n            padding: 0;\n            color: rgba(0,0,0,.87);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n        }\n        ._access-menu ._menu-close-btn {\n            left: 5px;\n            color: #d63c3c;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {\n            ").concat(this.options.animations.buttons ? 'transform: rotate(180deg);' : '', "\n        }\n        ._access-menu ._menu-reset-btn {\n            right: 5px;\n            color: #4054b2;\n            transition: .3s ease;\n            transform: rotate(0deg);\n        }\n        ._access-menu ._menu-btn {\n            position: absolute;\n            top: 5px;\n            cursor: pointer;\n            font-size: 24px !important;\n            font-weight: bold;\n        }\n        ._access-menu ul {\n            padding: 0;\n            position: relative;\n            font-size: 18px !important;\n            margin: 0;\n            overflow: auto;\n            max-height: calc(100vh - 77px);\n        }\n        html._access_cursor * {\n            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;\n        }\n        ._access-menu ul li {\n            list-style-type: none;\n            cursor: pointer;\n            -ms-user-select: none;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            user-select: none;\n            border: solid 1px #f1f0f1;\n            padding: 10px 0 10px 30px;\n            margin: 5px;\n            border-radius: 4px;\n            transition-duration: .5s;\n            transition-timing-function: ease-in-out;\n            font-size: ").concat(this.options.buttons.font.size + this.options.buttons.font.units, " !important;\n            line-height: ").concat(this.options.buttons.font.size + this.options.buttons.font.units, " !important;\n            text-indent: 5px;\n            background: #f9f9f9;\n            color: rgba(0,0,0,.6);\n            letter-spacing: initial!important;\n            word-spacing: initial!important;\n        }\n        ._access-menu ul.before-collapse li {\n            opacity: 0.05;\n        }\n        ._access-menu ul li.active, ._access-menu ul li.active:hover {\n            color: #fff;\n            background-color: #000;\n        }\n        ._access-menu ul li:hover {\n            color: rgba(0,0,0,.8);\n            background-color: #eaeaea;\n        }\n        ._access-menu ul li.not-supported {\n            display: none;\n        }\n        ._access-menu ul li:before {\n            content: ' ';\n            ").concat(!this.options.icon.useEmojis ? 'font-family: ' + this._common.getFixedPseudoFont(this.options.icon.fontFamily) + ';' : '', "\n            text-rendering: optimizeLegibility;\n            font-feature-settings: \"liga\" 1;\n            font-style: normal;\n            text-transform: none;\n            line-height: ").concat(!this.options.icon.useEmojis ? '1' : '1.1', ";\n            font-size: ").concat(!this.options.icon.useEmojis ? '24px' : '20px', " !important;\n            width: 30px;\n            height: 30px;\n            display: inline-block;\n            overflow: hidden;\n            -webkit-font-smoothing: antialiased;\n            left: 8px;\n            position: absolute;\n            color: rgba(0,0,0,.6);\n            direction: ltr;\n        }\n        ._access-menu ul li svg path {\n            fill: rgba(0,0,0,.6);\n        }\n        ._access-menu ul li:hover svg path {\n            fill: rgba(0,0,0,.8);\n        }\n        ._access-menu ul li.active svg path {\n            fill: #fff;\n        }\n        ._access-menu ul li:hover:before {\n            color: rgba(0,0,0,.8);\n        }\n        ._access-menu ul li.active:before {\n            color: #fff;\n        }\n        ._access-menu ul li[data-access-action=\"increaseText\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"zoom_in"' : '"🔼"', ";\n        }\n        ._access-menu ul li[data-access-action=\"decreaseText\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"zoom_out"' : '"🔽"', ";\n        }\n        ._access-menu ul li[data-access-action=\"increaseTextSpacing\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"', ";\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._access-menu ul li[data-access-action=\"decreaseTextSpacing\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"', ";\n            transform: rotate(90deg) translate(-7px, 2px);\n        }\n        ._access-menu ul li[data-access-action=\"invertColors\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"invert_colors"' : '"🎆"', ";\n        }\n        ._access-menu ul li[data-access-action=\"grayHues\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"format_color_reset"' : '"🌫️"', ";\n        }\n        ._access-menu ul li[data-access-action=\"underlineLinks\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"format_underlined"' : '"💯"', ";\n        }\n        ._access-menu ul li[data-access-action=\"bigCursor\"]:before {\n            /*content: 'touch_app';*/\n        }\n        ._access-menu ul li[data-access-action=\"readingGuide\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"border_horizontal"' : '"↔️"', ";\n        }\n        ._access-menu ul li[data-access-action=\"textToSpeech\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"record_voice_over"' : '"⏺️"', ";\n        }\n        ._access-menu ul li[data-access-action=\"speechToText\"]:before {\n            content: ").concat(!this.options.icon.useEmojis ? '"mic"' : '"🎤"', ";\n        }");
      var className = '_access-main-css';

      this._common.injectStyle(css, {
        className: className
      });

      this._common.deployedObjects.set('.' + className, false);
    }
  }, {
    key: "injectIcon",
    value: function injectIcon() {
      var fontSize = this.options.icon.dimensions.width.size * 0.8;
      var lineHeight = this.options.icon.dimensions.width.size * 0.9;
      var textIndent = this.options.icon.dimensions.width.size * 0.1;
      var iStyle = "width: ".concat(this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units, "\n            ;height: ").concat(this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units, "\n            ;font-size: ").concat(fontSize + this.options.icon.dimensions.width.units, "\n            ;line-height: ").concat(lineHeight + this.options.icon.dimensions.width.units, "\n            ;text-indent: ").concat(textIndent + this.options.icon.dimensions.width.units, "\n            ;background-color: ").concat(!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent', ";color: ").concat(this.options.icon.color);

      for (var i in this.options.icon.position) {
        var pos = this.options.icon.position;
        pos = pos[i];
        iStyle += ';' + i + ':' + pos.size + pos.units;
      }

      iStyle += ";z-index: ".concat(this.options.icon.zIndex);
      var className = "_access-icon ".concat(this.options.icon.fontClass, " _access") + (this.options.icon.circular ? ' circular' : '');

      var iconElem = this._common.jsonToHtml({
        type: 'i',
        attrs: {
          'class': className,
          'style': iStyle,
          'title': this.options.labels.menuTitle
        },
        children: [{
          type: '#text',
          text: this.options.icon.img
        }]
      });

      this._body.appendChild(iconElem);

      this._common.deployedObjects.set('._access-icon', false);

      return iconElem;
    }
  }, {
    key: "parseKeys",
    value: function parseKeys(arr) {
      return this.options.hotkeys.enabled ? this.options.hotkeys.helpTitles ? 'Hotkey: ' + arr.map(function (val) {
        return Number.isInteger(val) ? String.fromCharCode(val).toLowerCase() : val.replace('Key', '');
      }).join('+') : '' : '';
    }
  }, {
    key: "injectMenu",
    value: function injectMenu() {
      var _this2 = this;

      var menuElem = this._common.jsonToHtml({
        type: 'div',
        attrs: {
          'class': '_access-menu close _access'
        },
        children: [{
          type: 'h3',
          attrs: {
            'class': '_text-center'
          },
          children: [{
            type: 'i',
            attrs: {
              'class': "_menu-close-btn _menu-btn ".concat(this.options.icon.fontClass),
              'title': this.options.labels.closeTitle
            },
            children: [{
              type: '#text',
              text: "".concat(!this.options.icon.useEmojis ? 'close' : 'X')
            }]
          }, {
            type: '#text',
            text: this.options.labels.menuTitle
          }, {
            type: 'i',
            attrs: {
              'class': "_menu-reset-btn _menu-btn ".concat(this.options.icon.fontClass),
              'title': this.options.labels.resetTitle
            },
            children: [{
              type: '#text',
              text: "".concat(!this.options.icon.useEmojis ? 'refresh' : '♲')
            }]
          }]
        }, {
          type: 'ul',
          attrs: {
            'class': this.options.animations.buttons ? 'before-collapse _access-scrollbar' : '_access-scrollbar'
          },
          children: [{
            type: 'li',
            attrs: {
              'data-access-action': 'increaseText'
            },
            children: [{
              type: '#text',
              text: this.options.labels.increaseText
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'decreaseText'
            },
            children: [{
              type: '#text',
              text: this.options.labels.decreaseText
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'increaseTextSpacing'
            },
            children: [{
              type: '#text',
              text: this.options.labels.increaseTextSpacing
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'decreaseTextSpacing'
            },
            children: [{
              type: '#text',
              text: this.options.labels.decreaseTextSpacing
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'invertColors',
              'title': this.parseKeys(this.options.hotkeys.keys.invertColors)
            },
            children: [{
              type: '#text',
              text: this.options.labels.invertColors
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'grayHues',
              'title': this.parseKeys(this.options.hotkeys.keys.grayHues)
            },
            children: [{
              type: '#text',
              text: this.options.labels.grayHues
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'underlineLinks',
              'title': this.parseKeys(this.options.hotkeys.keys.underlineLinks)
            },
            children: [{
              type: '#text',
              text: this.options.labels.underlineLinks
            }]
          }, {
            type: 'li',
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
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'readingGuide',
              'title': this.parseKeys(this.options.hotkeys.keys.readingGuide)
            },
            children: [{
              type: '#text',
              text: this.options.labels.readingGuide
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'textToSpeech'
            },
            children: [{
              type: '#text',
              text: this.options.labels.textToSpeech
            }]
          }, {
            type: 'li',
            attrs: {
              'data-access-action': 'speechToText'
            },
            children: [{
              type: '#text',
              text: this.options.labels.speechToText
            }]
          }]
        }]
      });

      for (var i in this.options.icon.position) {
        menuElem.classList.add(i);
      }

      this._body.appendChild(menuElem);

      setTimeout(function () {
        var ic = document.getElementById('iconBigCursor');

        if (ic) {
          ic.outerHTML = ic.outerHTML + '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;left: 17px;enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
          document.getElementById('iconBigCursor').remove();
        }
      }, 1);

      this._common.deployedObjects.set('._access-menu', false);

      var closeBtn = document.querySelector('._access-menu ._menu-close-btn');
      closeBtn.addEventListener('click', function () {
        _this2.toggleMenu();
      }, false);
      var resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
      resetBtn.addEventListener('click', function () {
        _this2.resetAll();
      }, false);
      return menuElem;
    }
  }, {
    key: "addListeners",
    value: function addListeners() {
      var _this3 = this;

      var lis = document.querySelectorAll('._access-menu ul li');

      for (var i = 0; i < lis.length; i++) {
        lis[i].addEventListener('click', function (e) {
          var evt = e || window.event;

          _this3.invoke(evt.target.getAttribute('data-access-action'));
        }, false);
      }
    }
  }, {
    key: "disableUnsupportedModules",
    value: function disableUnsupportedModules() {
      for (var i in this.options.modules) {
        var m = this.options.modules;
        m = m[i];

        if (!m) {
          var moduleLi = document.querySelector('li[data-access-action="' + i + '"]');

          if (moduleLi) {
            moduleLi.classList.add('not-supported');
          }
        }
      }
    }
  }, {
    key: "resetAll",
    value: function resetAll() {
      this.menuInterface.textToSpeech(true);
      this.menuInterface.speechToText(true);
      this.menuInterface.underlineLinks(true);
      this.menuInterface.grayHues(true);
      this.menuInterface.invertColors(true);
      this.menuInterface.bigCursor(true);
      this.menuInterface.readingGuide(true);
      this.resetTextSize();
      this.resetTextSpace();
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
      var factor = 2;
      if (!isIncrease) factor *= -1;

      if (this.options.textPixelMode) {
        var all = document.querySelectorAll('*:not(._access)');

        for (var i = 0; i < all.length; i++) {
          var fSize = getComputedStyle(all[i]).fontSize;

          if (fSize && fSize.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-font-size')) all[i].setAttribute('data-init-font-size', fSize);
            fSize = parseInt(fSize.replace('px', '')) + factor;
            all[i].style.fontSize = fSize + 'px';
          }
        }
      } else if (this.options.textEmlMode) {
        var fp = this._html.style.fontSize;

        if (fp.indexOf('%')) {
          fp = parseInt(fp.replace('%', ''));
          this._html.style.fontSize = fp + factor + '%';
        } else {
          this._common.warn('Accessibility.textEmlMode, html element is not set in %.');
        }
      } else {
        var _fSize = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);

        if (typeof this._stateValues.body.fontSize === 'undefined') this._stateValues.body.fontSize = _fSize.size + _fSize.suffix;

        if (_fSize && _fSize.suffix && !isNaN(_fSize.size * 1)) {
          this._body.style.fontSize = _fSize.size * 1 + factor + _fSize.suffix;
        }
      }
    }
  }, {
    key: "alterTextSpace",
    value: function alterTextSpace(isIncrease) {
      this._sessionState.textSpace += isIncrease ? 1 : -1;
      this.onChange(true);
      var factor = 1;
      if (!isIncrease) factor *= -1;

      if (this.options.textPixelMode) {
        var all = document.querySelectorAll('*:not(._access)');
        var exclude = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));

        for (var i = 0; i < all.length; i++) {
          if (exclude.includes(all[i])) {
            continue;
          } // wordSpacing


          var fSpacing = all[i].style.wordSpacing;

          if (fSpacing && fSpacing.indexOf('px') > -1) {
            if (!all[i].getAttribute('data-init-word-spacing')) all[i].setAttribute('data-init-word-spacing', fSpacing);
            fSpacing = fSpacing.replace('px', '') * 1 + factor;
            all[i].style.wordSpacing = fSpacing + 'px';
          } else {
            all[i].setAttribute('data-init-word-spacing', fSpacing);
            all[i].style.wordSpacing = factor + 'px';
          } // letterSpacing


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
      } else {
        // wordSpacing
        var _fSpacing = this._common.getFormattedDim(getComputedStyle(this._body).wordSpacing);

        if (typeof this._stateValues.body.wordSpacing === 'undefined') this._stateValues.body.wordSpacing = '';

        if (_fSpacing && _fSpacing.suffix && !isNaN(_fSpacing.size * 1)) {
          this._body.style.wordSpacing = _fSpacing.size * 1 + factor + _fSpacing.suffix;
        } // letterSpacing


        var _fSpacing2 = this._common.getFormattedDim(getComputedStyle(this._body).letterSpacing);

        if (typeof this._stateValues.body.letterSpacing === 'undefined') this._stateValues.body.letterSpacing = '';

        if (_fSpacing2 && _fSpacing2.sufix && !isNaN(_fSpacing2.size * 1)) {
          this._body.style.letterSpacing = _fSpacing2.size * 1 + factor + _fSpacing2.sufix;
        }
      }
    }
  }, {
    key: "speechToText",
    value: function speechToText() {
      var _this4 = this;

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        this._recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        this._recognition.continuous = true;
        this._recognition.interimResults = true;

        this._recognition.onstart = function () {
          // TODO red color on mic icon
          // console.log('listening . . .');
          // if (this.speechToTextTarget)
          //     this.speechToTextTarget.parentElement.classList.add('_access-listening');
          _this4._body.classList.add('_access-listening');
        };

        this._recognition.onend = function () {
          _this4._body.classList.remove('_access-listening');
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

          if (finalTranscript && _this4._speechToTextTarget) {
            _this4._speechToTextTarget.parentElement.classList.remove('_access-listening');

            if (_this4._speechToTextTarget.tagName.toLowerCase() === 'input' || _this4._speechToTextTarget.tagName.toLowerCase() === 'textarea') {
              _this4._speechToTextTarget.value = finalTranscript;
            } else if (_this4._speechToTextTarget.getAttribute('contenteditable') !== null) {
              _this4._speechToTextTarget.innerText = finalTranscript;
            }
          }
        };

        this._recognition.lang = this.options.speechToTextLang;

        this._recognition.start();
      }
    }
  }, {
    key: "textToSpeech",
    value: function textToSpeech(text) {
      var _this5 = this;

      var windowAny = window;
      if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) return;
      var msg = new windowAny.SpeechSynthesisUtterance(text);
      msg.lang = this.options.textToSpeechLang;

      msg.onend = function () {
        _this5._isReading = false;
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

      window.speechSynthesis.speak(msg);
      this._isReading = true;
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
          if (this.menuInterface.hasOwnProperty(name)) {
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
      var _this6 = this;

      if (this._menu.classList.contains('close')) {
        if (this.options.animations && this.options.animations.buttons) setTimeout(function () {
          _this6._menu.querySelector('ul').classList.toggle('before-collapse');
        }, 500);
        setTimeout(function () {
          _this6._menu.classList.toggle('close');
        }, 10);
      } else {
        if (this.options.animations && this.options.animations.buttons) {
          setTimeout(function () {
            _this6._menu.classList.toggle('close');
          }, 500);
          setTimeout(function () {
            _this6._menu.querySelector('ul').classList.toggle('before-collapse');
          }, 10);
        } else {
          this._menu.classList.toggle('close');
        }
      }
    }
  }, {
    key: "invoke",
    value: function invoke(action) {
      if (typeof this.menuInterface[action] === 'function') this.menuInterface[action]();
    }
  }, {
    key: "build",
    value: function build() {
      var _this7 = this;

      this._stateValues = {
        underlineLinks: false,
        textToSpeech: false,
        bigCursor: false,
        readingGuide: false,
        body: {},
        html: {}
      };
      this._body = document.body || document.getElementsByTagName('body')[0];
      this._html = document.documentElement || document.getElementsByTagName('html')[0];
      if (this.options.textEmlMode) this.initFontSize();
      this.injectCss();
      this._icon = this.injectIcon();
      this._menu = this.injectMenu();
      this.addListeners();
      this.disableUnsupportedModules();

      if (this.options.hotkeys.enabled) {
        document.onkeydown = function (e) {
          var act = Object.entries(_this7.options.hotkeys.keys).find(function (val) {
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
            _this7.runHotkey(act[0]);
          }
        };
      }

      this._icon.addEventListener('click', function () {
        _this7.toggleMenu();
      }, false);

      setTimeout(function () {
        _this7._icon.style.opacity = '1';
      }, 10);

      this.updateReadGuide = function (e) {
        var newPos = 0;

        if (e.type === 'touchmove') {
          newPos = e.changedTouches[0].clientY;
        } else {
          newPos = e.y;
        }

        document.getElementById('access_read_guide_bar').style.top = newPos - (parseInt(_this7.options.guide.height.replace('px', '')) + 5) + 'px';
      };

      this.menuInterface = new _menuInterface.MenuInterface(this);
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
    }
  }]);

  return Accessibility;
}();

exports.Accessibility = Accessibility;

Accessibility.init = function (opt) {
  console.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
  new Accessibility(opt);
};

var _default = Accessibility;
exports["default"] = _default;