"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MenuInterface = void 0;
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
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
    _defineProperty(this, "_dialog", void 0);
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
        allImages.forEach( /*#__PURE__*/function () {
          var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(i) {
            var screenshot;
            return regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    screenshot = i.src;
                    i.setAttribute('src', i.getAttribute('data-org-src'));
                    i.setAttribute('data-org-src', screenshot);
                  case 3:
                  case "end":
                    return _context.stop();
                }
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
      allImages.forEach( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(i) {
          var ext, screenshot;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
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
  return MenuInterface;
}();
exports.MenuInterface = MenuInterface;