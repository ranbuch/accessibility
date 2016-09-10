'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

(function () {
    var body = document.body || document.getElementsByTagName('body')[0];
    var menu = null;
    var icon = null;

    window.Accessibility = {};

    var options = {
        icon: {
            position: {
                bottom: { size: 50, units: 'px' },
                right: { size: 0, units: 'px' }
            },
            dimensions: {
                width: { size: 50, units: 'px' },
                height: { size: 50, units: 'px' }
            },
            zIndex: '9999',
            backgroundColor: '#4054b2',
            color: '#fff'
        },
        menu: {
            dimensions: {
                width: { size: 25, units: 'vw' },
                height: { size: 25, units: 'vw' }
            },
            fontFamily: 'RobotoDraft, Roboto, sans-serif, Arial'
        },
        labels: {
            menuTitle: 'Accessibility Options',
            increaseText: 'increase text size',
            decreaseText: 'decrease text size',
            invertColors: 'invert colors',
            grayHues: 'gray hues',
            underlineLinks: 'underline links',
            textToSpeech: 'text to speech'
        }
    };

    var common = {
        jsonToHtml: function jsonToHtml(obj, reasource) {
            var elm = document.createElement(obj.type);
            for (var i in obj.attrs) {
                if (i.indexOf('#') === 0 && reasource) elm.setAttribute(obj.attrs[i], reasource[i.substring(1)]);else elm.setAttribute(i, obj.attrs[i]);
            }
            for (var _i in obj.children) {
                var newElem = null;
                if (obj.children[_i].type == '#text') {
                    if (obj.children[_i].text.indexOf('#') == 0) newElem = document.createTextNode(reasource[obj.children[_i].text.substring(1)]);else newElem = document.createTextNode(obj.children[_i].text);
                } else newElem = common.jsonToHtml(obj.children[_i], reasource);
                if (newElem && newElem.tagName && newElem.tagName.toLowerCase() !== 'undefined' || newElem.nodeType == 3) elm.appendChild(newElem);
            }
            return elm;
        },
        injectStyle: function injectStyle(css) {
            var innerOptions = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

            var sheet = document.createElement('style');
            sheet.appendChild(document.createTextNode(css));
            if (innerOptions.className) sheet.classList.add(innerOptions.className);
            body.appendChild(sheet);
        },
        getFormattedDim: function getFormattedDim(value) {
            if (!value) return null;

            value = String(value);

            var returnBySufix = function returnBySufix(val, sufix) {
                return {
                    size: val.substring(0, val.indexOf(sufix)),
                    sufix: sufix
                };
            };

            if (value.indexOf('%') > -1) return returnBySufix(value, '%');
            if (value.indexOf('px') > -1) return returnBySufix(value, 'px');
            if (value.indexOf('em') > -1) return returnBySufix(value, 'em');
            if (value.indexOf('rem') > -1) return returnBySufix(value, 'rem');
            if (value.indexOf('pt') > -1) return returnBySufix(value, 'pt');
            if (value == 'auto') return returnBySufix(value, '');
        },
        extend: function extend(src, dest) {
            for (var i in src) {
                if (_typeof(src[i]) === 'object') {
                    if (dest && dest[i]) src[i] = common.extend(src[i], dest[i]);
                } else if (typeof dest[i] !== 'undefined') {
                    src[i] = dest[i];
                }
            }
            return src;
        }
    };

    var injectCss = function injectCss() {
        var url = 'https://fonts.googleapis.com/icon?family=Material+Icons',
            head = document.getElementsByTagName('head')[0],
            link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = url;
        head.appendChild(link);

        var css = '\n        ._access-icon {\n            position: fixed;\n            background-repeat: no-repeat;\n            background-size: contain;\n            cursor: pointer;\n        }\n        ._access-menu {\n            position: fixed;\n            width: ' + options.menu.dimensions.width.size + options.menu.dimensions.width.units + ';\n            height: ' + options.menu.dimensions.height.size + options.menu.dimensions.height.units + ';\n            transition-duration: .5s;\n            z-index: ' + options.icon.zIndex + 1 + ';\n            opacity: 1;\n            background-color: #fff;\n            color: #000;\n            border-radius: 3px;\n            border: solid 2px gray;\n            font-family: ' + options.menu.fontFamily + ';\n            min-width: 300px;\n            min-height: 385px;\n        }\n        ._access-menu.close {\n            z-index: -1;\n            width: 0;\n            opacity: 0;\n            background-color: transparent;\n        }\n        ._access-menu.bottom {\n            bottom: 0;\n        }\n        ._access-menu.top {\n            top: 0;\n        }\n        ._access-menu.left {\n            left: 0;\n        }\n        ._access-menu.close.left {\n            left: -' + options.menu.dimensions.width.size + options.menu.dimensions.width.units + ';\n        }\n        ._access-menu.right {\n            right: 0;\n        }\n        ._access-menu.close.right {\n            right: -' + options.menu.dimensions.width.size + options.menu.dimensions.width.units + ';\n        }\n        ._access-menu ._text-center {\n            text-align: center;\n        }\n        ._access-menu h3 {\n            font-size: 24px !important; \n            margin-top: 20px;\n            margin-bottom: 20px;\n        }\n        ._access-menu ._menu-close-btn {\n            left: 5px;\n            color: #d63c3c;\n        }\n        ._access-menu ._menu-reset-btn {\n            right: 5px;\n            color: #4054b2;\n        }\n        ._access-menu ._menu-btn {\n            position: absolute;\n            top: 5px;\n            cursor: pointer;\n            font-size: 24px !important;\n            font-weight: bold;\n        }\n        ._access-menu ul {\n            padding: 0;\n            position: relative;\n            font-size: 18px !important;\n        }\n        ._access-menu ul li {\n            list-style-type: none;\n            cursor: pointer;\n            -ms-user-select: none;\n            -moz-user-select: none;\n            -webkit-user-select: none;\n            user-select: none;\n            border: solid 1px black;\n            padding: 10px 0 10px 30px;\n            margin: 5px;\n            border-radius: 4px;\n            transition-duration: .3s;\n            font-size: 18px !important;\n        }\n        ._access-menu ul li:hover, ._access-menu ul li.active {\n            color: #fff;\n            background-color: #000;\n        }\n        ._access-menu ul li:before {\n            content: \' \';\n            font-family: \'Material Icons\';\n            text-rendering: optimizeLegibility;\n            font-feature-settings: "liga" 1;\n            font-style: normal;\n            text-transform: none;\n            line-height: 1;\n            font-size: 24px !important;\n            width: 24px;\n            height: 24px;\n            display: inline-block;\n            overflow: hidden;\n            -webkit-font-smoothing: antialiased;\n            left: 8px;\n            position: absolute;\n            color: rgba(100,100,100,0.7);\n        }\n        ._access-menu ul li:hover:before, ._access-menu ul li.active:before {\n            color: rgba(200,200,200,0.7);\n        }\n        ._access-menu ul li[data-access-action="increaseText"]:before {\n            content: \'zoom_in\';\n        }\n        ._access-menu ul li[data-access-action="decreaseText"]:before {\n            content: \'zoom_out\';\n        }\n        ._access-menu ul li[data-access-action="invertColors"]:before {\n            content: \'invert_colors\';\n        }\n        ._access-menu ul li[data-access-action="grayHues"]:before {\n            content: \'format_color_reset\';\n        }\n        ._access-menu ul li[data-access-action="underlineLinks"]:before {\n            content: \'format_underlined\';\n        }\n        ._access-menu ul li[data-access-action="textToSpeech"]:before {\n            content: \'record_voice_over\';\n        }\n        ';
        common.injectStyle(css);
    };

    var injectIcon = function injectIcon() {
        //let iStyle = `background-image: url("` + options.icon.src + `"); width: ` + options.icon.dimensions.width.size +
        var iStyle = 'width: ' + options.icon.dimensions.width.size + options.icon.dimensions.width.units + ';height: ' + options.icon.dimensions.height.size + options.icon.dimensions.height.units + ';font-size: ' + options.icon.dimensions.width.size + options.icon.dimensions.width.units + ';background-color: ' + options.icon.backgroundColor + ';color: ' + options.icon.color;
        for (var i in options.icon.position) {
            iStyle += ';' + i + ':' + options.icon.position[i].size + options.icon.position[i].units;
        }
        iStyle += ';z-index: ' + options.icon.zIndex;
        var iconElem = common.jsonToHtml({
            type: 'i',
            attrs: {
                'class': '_access-icon material-icons _access',
                'style': iStyle
            },
            children: [{
                type: '#text',
                text: 'accessible'
            }]
        });

        body.appendChild(iconElem);
        icon = iconElem;
        return iconElem;
    };

    var injectMenu = function injectMenu() {
        var mStyle = '';

        var menuElem = common.jsonToHtml({
            type: 'div',
            attrs: {
                'class': '_access-menu close _access',
                'style': mStyle
            },
            children: [{
                type: 'h3',
                attrs: {
                    'class': '_text-center'
                },
                children: [{
                    type: 'i',
                    attrs: {
                        'class': '_menu-close-btn _menu-btn material-icons'
                    },
                    children: [{
                        type: '#text',
                        text: 'close'
                    }]
                }, {
                    type: '#text',
                    text: options.labels.menuTitle
                }, {
                    type: 'i',
                    attrs: {
                        'class': '_menu-reset-btn _menu-btn material-icons'
                    },
                    children: [{
                        type: '#text',
                        text: 'refresh'
                    }]
                }]
            }, {
                type: 'ul',
                children: [{
                    type: 'li',
                    attrs: {
                        'data-access-action': 'increaseText'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.increaseText
                    }]
                }, {
                    type: 'li',
                    attrs: {
                        'data-access-action': 'decreaseText'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.decreaseText
                    }]
                }, {
                    type: 'li',
                    attrs: {
                        'data-access-action': 'invertColors'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.invertColors
                    }]
                }, {
                    type: 'li',
                    attrs: {
                        'data-access-action': 'grayHues'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.grayHues
                    }]
                }, {
                    type: 'li',
                    attrs: {
                        'data-access-action': 'underlineLinks'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.underlineLinks
                    }]
                }, {
                    type: 'li',
                    attrs: {
                        'data-access-action': 'textToSpeech'
                    },
                    children: [{
                        type: '#text',
                        text: options.labels.textToSpeech
                    }]
                }]
            }]
        });

        for (var i in options.icon.position) {
            menuElem.classList.add(i);
        }

        body.appendChild(menuElem);
        menu = menuElem;
        var closeBtn = document.querySelector('._access-menu ._menu-close-btn');
        closeBtn.addEventListener('click', toggleMenu, false);
        var resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
        resetBtn.addEventListener('click', resetAll, false);

        return menuElem;
    };

    var initialValues = {
        underlineLinks: false,
        textToSpeech: false
    };

    var resetAll = function resetAll() {
        //resetTextSize();
        window.location.reload();
    };

    // TODO fix this method
    var resetTextSize = function resetTextSize() {
        if (!initialValues.fontSize) return;
        body.style.fontSize = initialValues.fontSize;

        var all = document.querySelectorAll('[data-init-font-size]');

        for (var i = 0; i < all.length; i++) {
            all[i].style.fontSize = all[i].getAttribute('data-init-font-size');
            all[i].removeAttribute('data-init-font-size');
        }
    };

    var alterTextSize = function alterTextSize(isIncrease) {
        var factor = 2;
        if (!isIncrease) factor *= -1;
        var fSize = common.getFormattedDim(getComputedStyle(body).fontSize);
        if (!initialValues.fontSize) initialValues.fontSize = fSize;
        if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
            body.style.fontSize = fSize.size * 1 + factor + fSize.sufix;
        }

        var all = document.querySelectorAll('*:not(._access)');

        for (var i = 0; i < all.length; i++) {
            var _fSize = getComputedStyle(all[i]).fontSize;
            if (_fSize && _fSize.indexOf('px') > -1) {
                if (!all[i].getAttribute('data-init-font-size')) all[i].setAttribute('data-init-font-size', _fSize);
                _fSize = _fSize.replace('px', '') * 1 + factor;
                all[i].style.fontSize = _fSize + 'px';
            }
        }
    };

    var textToSpeech = function textToSpeech(text) {
        if (!SpeechSynthesisUtterance || !window.speechSynthesis) return;
        var msg = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(msg);
    };

    var read = function read() {
        var className = '_access-text-to-speech';
        // let style = document.querySelector('.' + className);
        // if (style) {
        window.event.preventDefault();
        window.event.stopPropagation();
        textToSpeech(window.event.target.innerText);
        // }
    };

    var menuInterface = {
        increaseText: function increaseText() {
            alterTextSize(true);
        },
        decreaseText: function decreaseText() {
            alterTextSize(false);
        },
        invertColors: function invertColors() {
            document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
            initialValues.invertColors = !initialValues.invertColors;
            if (initialValues.invertColors) {
                body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                body.style.color = 'rgb(255, 255, 255)';
            } else {
                body.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                body.style.color = 'rgb(0, 0, 0)';
            }
        },
        grayHues: function grayHues() {
            document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active');
            initialValues.grayHues = !initialValues.grayHues;
            var val = initialValues.grayHues ? 'grayscale(1)' : 'grayscale(0)';
            body.style.webkitFilter = val;
            body.style.mozFilter = val;
            body.style.msFilter = val;
            body.style.filter = val;
        },
        underlineLinks: function underlineLinks() {
            document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active');
            var className = '_access-underline';
            initialValues.underlineLinks = !initialValues.underlineLinks;
            if (initialValues.underlineLinks) {
                var css = '\n                    body a {\n                        text-decoration: underline !important;\n                    }\n                ';
                common.injectStyle(css, { className: className });
            } else {
                var style = document.querySelector('.' + className);
                if (style) style.parentElement.removeChild(style);
            }
        },
        textToSpeech: function textToSpeech() {
            document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle('active');
            var className = '_access-text-to-speech';
            var remove = function remove() {
                var style = document.querySelector('.' + className);
                if (style) {
                    style.parentElement.removeChild(style);
                    document.removeEventListener('click', read, false);
                }
            };

            initialValues.textToSpeech = !initialValues.textToSpeech;
            if (initialValues.textToSpeech) {
                var css = '\n                    *:hover {\n                        box-shadow: 1px 2px 0px rgba(180,180,180,0.7);\n                    }\n                ';
                common.injectStyle(css, { className: className });
                document.addEventListener('click', read, false);
            } else {
                remove();
            }
        }
    };

    var toggleMenu = function toggleMenu() {
        menu.classList.toggle('close');
    };

    var invoke = function invoke(action) {
        if (typeof menuInterface[action] === 'function') menuInterface[action]();
    };

    var addListeners = function addListeners() {
        var lis = document.querySelectorAll('._access-menu ul li');

        for (var i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', function (self) {
                invoke(window.event.target.getAttribute('data-access-action'));
            }, false);
        }
    };

    var init = function init() {
        injectCss();
        injectIcon();
        injectMenu();
        addListeners();

        icon.addEventListener('click', toggleMenu, false);
    };

    window.Accessibility.init = function (_options) {
        options = common.extend(options, _options);
        init();
    };
})();