'use strict';
import common from './common';
import storage from './storage';

// const fonts = ['https://fonts.googleapis.com/icon?family=Material+Icons'];
// common.injectIconsFont(fonts);
// Default options
let _options = {
    icon: {
        position: {
            bottom: { size: 50, units: 'px' },
            right: { size: 10, units: 'px' },
            type: 'fixed'
        },
        dimensions: {
            width: { size: 50, units: 'px' },
            height: { size: 50, units: 'px' }
        },
        zIndex: '9999',
        backgroundColor: '#4054b2',
        color: '#fff',
        img: 'accessible',
        circular: false,
        circularBorder: false,
        fontFaceSrc: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
        fontFamily: 'Material Icons',
        fontClass: 'material-icons',
        useEmojis: false
    },
    hotkeys: {
        enabled: false,
        helpTitles: true,
        keys: {
            toggleMenu: [
                'ctrlKey',
                'altKey',
                65
            ],
            invertColors: [
                'ctrlKey',
                'altKey',
                73
            ],
            grayHues: [
                'ctrlKey',
                'altKey',
                71
            ],
            underlineLinks: [
                'ctrlKey',
                'altKey',
                85
            ],
            bigCursor: [
                'ctrlKey',
                'altKey',
                67
            ],
            readingGuide: [
                'ctrlKey',
                'altKey',
                82
            ],
            textToSpeech: [
                'ctrlKey',
                'altKey',
                84
            ],
            speechToText: [
                'ctrlKey',
                'altKey',
                83
            ]
        }
    },
    buttons: {
        font: { size: 18, units: 'px' }
    },
    guide: {
        cBorder: '#20ff69',
        cBackground: '#000000',
        height: '12px'
    },
    menu: {
        dimensions: {
            width: { size: 25, units: 'vw' },
            height: { size: 'auto', units: '' }
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

let self = null;

class Accessibility {
    constructor(options = {}) {
        self = this;
        options = this.deleteOppositesIfDefined(options);
        this.options = common.extend(_options, options);
        this.disabledUnsupportedFeatures();
        this.sessionState = {
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
        }
        else {
            common.injectIconsFont(this.options.icon.fontFaceSrc, () => {
                this.build();
                common.isFontLoaded(this.options.icon.fontFamily, (isLoaded) => {
                    if (!isLoaded) {
                        common.warn(`${this.options.icon.fontFamily} font was not loaded, using emojis instead`);
                        this.fontFallback();
                        this.destroy();
                        this.build();
                    }
                });
            });
        }
    }

    initFontSize() {
        // store this values only once.
        if (!this.htmlInitFS) {
            let htmlInitFS = common.getFormattedDim(getComputedStyle(this.html).fontSize);
            let bodyInitFS = common.getFormattedDim(getComputedStyle(this.body).fontSize);
            this.html.style.fontSize = (htmlInitFS.size / 16 * 100) + '%';
            this.htmlOrgFontSize = this.html.style.fontSize;
            this.body.style.fontSize = (bodyInitFS.size / htmlInitFS.size) + 'em';
        }
    }

    fontFallback() {
        this.options.icon.useEmojis = true;
        this.options.icon.fontFamily = null;
        this.options.icon.img = '♿';
        this.options.icon.fontClass = '';
    }

    deleteOppositesIfDefined(options) {
        if (options.icon && options.icon.position) {
            if (options.icon.position.left) {
                delete _options.icon.position.right;
                _options.icon.position.left = options.icon.position.left;
            }
            if (options.icon.position.top) {
                delete _options.icon.position.bottom;
                _options.icon.position.top = options.icon.position.top;
            }
        }
        return options;
    }

    disabledUnsupportedFeatures() {
        if (!('webkitSpeechRecognition' in window) || location.protocol != 'https:') {
            common.warn('speech to text isn\'t supported in this browser or in http protocol (https required)');
            this.options.modules.speechToText = false;
        }
        if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
            common.warn('text to speech isn\'t supported in this browser');
            this.options.modules.textToSpeech = false;
        }
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            common.warn('grayHues isn\'t supported in firefox');
            this.options.modules.grayHues = false;
        }
    }

    injectCss() {
        let css = `
        ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
            background-color: #F5F5F5;
        }
        
        ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {
            width: 6px;
            background-color: #F5F5F5;
        }
        
        ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {
            background-color: #999999;
        }
        ._access-icon {
            position: ${this.options.icon.position.type};
            background-repeat: no-repeat;
            background-size: contain;
            cursor: pointer;
            opacity: 0;
            transition-duration: .5s;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            ${!this.options.icon.useEmojis ? 'box-shadow: 1px 1px 5px rgba(0,0,0,.5);' : ''}
            transform: ${!this.options.icon.useEmojis ? 'scale(1)' : 'skewX(18deg)'};
        }
        ._access-icon:hover {
            ` + (this.options.animations.buttons && !this.options.icon.useEmojis ? `
            box-shadow: 1px 1px 10px rgba(0,0,0,.9);
            transform: scale(1.1);
            ` : '') + `
        }
        .circular._access-icon {
            border-radius: 50%;
            border: .5px solid white;
        }
        ` + (this.options.animations.buttons && this.options.icon.circularBorder ? `
        .circular._access-icon:hover {
            border: 5px solid white;
            border-style: double;
            font-size: 35px!important;
            vertical-align: middle;
            padding-top: 2px;
            text-align: center;
        }
        ` : '') + `
        .access_read_guide_bar{
            box-sizing: border-box;
            background: ${this.options.guide.cBackground};
            width: 100%!important;
            min-width: 100%!important;
            position: fixed!important;
            height: ${this.options.guide.height} !important;
            border: solid 3px ${this.options.guide.cBorder};
            border-radius: 5px;
            top: 15px;
            z-index: 2147483647;
        }
        .access-high-contrast *{
            background-color: #000 !important;
            background-image: none !important;
            border-color: #fff !important;
            -webkit-box-shadow: none !important;
            box-shadow: none !important;
            color: #fff !important;
            text-indent: 0 !important;
            text-shadow: none !important;
        }
        ._access-menu {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: fixed;
            width: ${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
            height: ${this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units};
            transition-duration: .5s;
            z-index: ${this.options.icon.zIndex + 1};
            opacity: 1;
            background-color: #fff;
            color: #000;
            border-radius: 3px;
            border: solid 1px #f1f0f1;
            font-family: ${this.options.menu.fontFamily};
            min-width: 300px;
            box-shadow: 0px 0px 1px #aaa;
            max-height: 100vh;
            ${(getComputedStyle(this.body).direction == 'rtl' ? 'text-indent: -5px' : '')}
        }
        ._access-menu.close {
            z-index: -1;
            width: 0;
            opacity: 0;
            background-color: transparent;
        }
        ._access-menu.bottom {
            bottom: 0;
        }
        ._access-menu.top {
            top: 0;
        }
        ._access-menu.left {
            left: 0;
        }
        ._access-menu.close.left {
            left: -${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
        }
        ._access-menu.right {
            right: 0;
        }
        ._access-menu.close.right {
            right: -${this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units};
        }
        ._access-menu ._text-center {
            text-align: center;
        }
        ._access-menu h3 {
            font-size: 24px !important;
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0;
            color: rgba(0,0,0,.87);
            letter-spacing: initial!important;
            word-spacing: initial!important;
        }
        ._access-menu ._menu-close-btn {
            left: 5px;
            color: #d63c3c;
            transition: .3s ease;
            transform: rotate(0deg);
        }
        ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {
            ${(this.options.animations.buttons ? 'transform: rotate(180deg);' : '')}
        }
        ._access-menu ._menu-reset-btn {
            right: 5px;
            color: #4054b2;
            transition: .3s ease;
            transform: rotate(0deg);
        }
        ._access-menu ._menu-btn {
            position: absolute;
            top: 5px;
            cursor: pointer;
            font-size: 24px !important;
            font-weight: bold;
        }
        ._access-menu ul {
            padding: 0;
            position: relative;
            font-size: 18px !important;
            margin: 0;
            overflow: auto;
            max-height: calc(100vh - 77px);
        }
        html._access_cursor * {
            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;
        }
        ._access-menu ul li {
            list-style-type: none;
            cursor: pointer;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            border: solid 1px #f1f0f1;
            padding: 10px 0 10px 30px;
            margin: 5px;
            border-radius: 4px;
            transition-duration: .5s;
            transition-timing-function: ease-in-out;
            font-size: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
            line-height: ${this.options.buttons.font.size + this.options.buttons.font.units} !important;
            text-indent: 5px;
            background: #f9f9f9;
            color: rgba(0,0,0,.6);
            letter-spacing: initial!important;
            word-spacing: initial!important;
        }
        ._access-menu ul.before-collapse li {
            opacity: 0.05;
        }
        ._access-menu ul li.active, ._access-menu ul li.active:hover {
            color: #fff;
            background-color: #000;
        }
        ._access-menu ul li:hover {
            color: rgba(0,0,0,.8);
            background-color: #eaeaea;
        }
        ._access-menu ul li.not-supported {
            display: none;
        }
        ._access-menu ul li:before {
            content: ' ';
            ${!this.options.icon.useEmojis ? 'font-family: ' + this.options.icon.fontFamily + ';' : ''}
            text-rendering: optimizeLegibility;
            font-feature-settings: "liga" 1;
            font-style: normal;
            text-transform: none;
            line-height: ${!this.options.icon.useEmojis ? '1' : '1.1'};
            font-size: ${!this.options.icon.useEmojis ? '24px' : '20px'} !important;
            width: 30px;
            height: 30px;
            display: inline-block;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            left: 8px;
            position: absolute;
            color: rgba(0,0,0,.6);
            direction: ltr;
        }
        ._access-menu ul li svg path {
            fill: rgba(0,0,0,.6);
        }
        ._access-menu ul li:hover svg path {
            fill: rgba(0,0,0,.8);
        }
        ._access-menu ul li.active svg path {
            fill: #fff;
        }
        ._access-menu ul li:hover:before {
            color: rgba(0,0,0,.8);
        }
        ._access-menu ul li.active:before {
            color: #fff;
        }
        ._access-menu ul li[data-access-action="increaseText"]:before {
            content: ${!this.options.icon.useEmojis ? '"zoom_in"' : '"🔼"'};
        }
        ._access-menu ul li[data-access-action="decreaseText"]:before {
            content: ${!this.options.icon.useEmojis ? '"zoom_out"' : '"🔽"'};
        }
        ._access-menu ul li[data-access-action="increaseTextSpacing"]:before {
            content: ${!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"'};
            transform: rotate(90deg) translate(-7px, 2px);
        }
        ._access-menu ul li[data-access-action="decreaseTextSpacing"]:before {
            content: ${!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"'};
            transform: rotate(90deg) translate(-7px, 2px);
        }
        ._access-menu ul li[data-access-action="invertColors"]:before {
            content: ${!this.options.icon.useEmojis ? '"invert_colors"' : '"🎆"'};
        }
        ._access-menu ul li[data-access-action="grayHues"]:before {
            content: ${!this.options.icon.useEmojis ? '"format_color_reset"' : '"🌫️"'};
        }
        ._access-menu ul li[data-access-action="underlineLinks"]:before {
            content: ${!this.options.icon.useEmojis ? '"format_underlined"' : '"💯"'};
        }
        ._access-menu ul li[data-access-action="bigCursor"]:before {
            /*content: 'touch_app';*/
        }
        ._access-menu ul li[data-access-action="readingGuide"]:before {
            content: ${!this.options.icon.useEmojis ? '"border_horizontal"' : '"↔️"'};
        }
        ._access-menu ul li[data-access-action="textToSpeech"]:before {
            content: ${!this.options.icon.useEmojis ? '"record_voice_over"' : '"⏺️"'};
        }
        ._access-menu ul li[data-access-action="speechToText"]:before {
            content: ${!this.options.icon.useEmojis ? '"mic"' : '"🎤"'};
        }`;
        let className = '_access-main-css';
        common.injectStyle(css, { className: className });
        common.deployedObjects.set('.' + className, false);
    }

    injectIcon() {
        //let iStyle = `background-image: url("` + options.icon.src + `"); width: ` + options.icon.dimensions.width.size +
        let fontSize = this.options.icon.dimensions.width.size * 0.8;
        let lineHeight = this.options.icon.dimensions.width.size * 0.9;
        let textIndent = this.options.icon.dimensions.width.size * 0.1;
        let iStyle = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}
            ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}
            ;font-size: ${fontSize + this.options.icon.dimensions.width.units}
            ;line-height: ${lineHeight + this.options.icon.dimensions.width.units}
            ;text-indent: ${textIndent + this.options.icon.dimensions.width.units}
            ;background-color: ${!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent'};color: ${this.options.icon.color}`;
        for (let i in this.options.icon.position) {
            iStyle += ';' + i + ':' + this.options.icon.position[i].size + this.options.icon.position[i].units;
        }
        iStyle += `;z-index: ${this.options.icon.zIndex}`;
        let className = `_access-icon ${this.options.icon.fontClass} _access` + (this.options.icon.circular ? ' circular' : '');
        let iconElem = common.jsonToHtml({
            type: 'i',
            attrs: {
                'class': className,
                'style': iStyle,
                'title': this.options.labels.menuTitle
            },
            children: [
                {
                    type: '#text',
                    text: this.options.icon.img
                }
            ]
        });

        this.body.appendChild(iconElem);
        common.deployedObjects.set('._access-icon', false);
        return iconElem;
    }

    parseKeys(arr) {
        return (this.options.hotkeys.enabled ? (this.options.hotkeys.helpTitles ? 'Hotkey: ' + arr.map(function (val) { return Number.isInteger(val) ? String.fromCharCode(val).toLowerCase() : val.replace('Key', '') }).join('+') : '') : '')
    }

    injectMenu() {
        let menuElem = common.jsonToHtml({
            type: 'div',
            attrs: {
                'class': '_access-menu close _access'
            },
            children: [
                {
                    type: 'h3',
                    attrs: {
                        'class': '_text-center'
                    },
                    children: [
                        {
                            type: 'i',
                            attrs: {
                                'class': `_menu-close-btn _menu-btn ${this.options.icon.fontClass}`,
                                'title': this.options.labels.closeTitle
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: `${!this.options.icon.useEmojis ? 'close' : 'X'}`
                                }
                            ]
                        },
                        {
                            type: '#text',
                            text: this.options.labels.menuTitle
                        },
                        {
                            type: 'i',
                            attrs: {
                                'class': `_menu-reset-btn _menu-btn ${this.options.icon.fontClass}`,
                                'title': this.options.labels.resetTitle
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: `${!this.options.icon.useEmojis ? 'refresh' : '♲'}`
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'ul',
                    attrs: {
                        'class': (this.options.animations.buttons ? 'before-collapse _access-scrollbar' : '_access-scrollbar')
                    },
                    children: [
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'increaseText'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.increaseText
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'decreaseText'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.decreaseText
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'increaseTextSpacing'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.increaseTextSpacing
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'decreaseTextSpacing'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.decreaseTextSpacing
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'invertColors',
                                'title': this.parseKeys(this.options.hotkeys.keys.invertColors)
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.invertColors
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'grayHues',
                                'title': this.parseKeys(this.options.hotkeys.keys.grayHues)
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.grayHues
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'underlineLinks',
                                'title': this.parseKeys(this.options.hotkeys.keys.underlineLinks)
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.underlineLinks
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'bigCursor',
                                'title': this.parseKeys(this.options.hotkeys.keys.bigCursor)
                            },
                            children: [
                                {
                                    type: 'div',
                                    attrs: {
                                        'id': 'iconBigCursor',
                                    }
                                },
                                {
                                    type: '#text',
                                    text: this.options.labels.bigCursor
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'readingGuide',
                                'title': this.parseKeys(this.options.hotkeys.keys.readingGuide)
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.readingGuide
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'textToSpeech'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.textToSpeech
                                }
                            ]
                        },
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'speechToText'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.speechToText
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        for (let i in this.options.icon.position) {
            menuElem.classList.add(i);
        }

        this.body.appendChild(menuElem);
        setTimeout(function () {
            let ic = document.getElementById('iconBigCursor');
            if (ic) {
                ic.outerHTML = ic.outerHTML + '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;left: 17px;enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
                document.getElementById('iconBigCursor').remove();
            }
        }, 1);
        common.deployedObjects.set('._access-menu', false);
        let closeBtn = document.querySelector('._access-menu ._menu-close-btn');
        closeBtn.addEventListener('click', () => {
            this.toggleMenu();
        }, false);
        let resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
        resetBtn.addEventListener('click', () => { this.resetAll(); }, false);

        return menuElem;
    }

    addListeners() {
        let lis = document.querySelectorAll('._access-menu ul li');

        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', (e) => {
                let evt = e || window.event
                this.invoke(evt.target.getAttribute('data-access-action'));
            }, false);
        }
    }

    disableUnsupportedModules() {
        for (let i in this.options.modules) {
            if (!this.options.modules[i]) {
                let moduleLi = document.querySelector('li[data-access-action="' + i + '"]');
                if (moduleLi) {
                    moduleLi.classList.add('not-supported');
                }
            }
        }
    }

    resetAll() {
        //window.location.reload();
        this.menuInterface.textToSpeech(true);
        this.menuInterface.speechToText(true);
        this.menuInterface.underlineLinks(true);
        this.menuInterface.grayHues(true);
        this.menuInterface.invertColors(true);
        this.menuInterface.bigCursor(true);
        this.menuInterface.readingGuide(true);
        this.resetTextSize();
        this.resetTextSpace();
        // for (let i of document.querySelectorAll('._access-menu ul li.active')) {
        //     i.classList.remove('active');
        // }
        //this.destroy();
    };

    resetTextSize() {
        this.resetIfDefined(this.initialValues.body.fontSize, this.body.style, 'fontSize');
        if (typeof this.htmlOrgFontSize !== 'undefined')
            this.html.style.fontSize = this.htmlOrgFontSize;
        let all = document.querySelectorAll('[data-init-font-size]')

        for (let i = 0; i < all.length; i++) {
            all[i].style.fontSize = all[i].getAttribute('data-init-font-size');
            all[i].removeAttribute('data-init-font-size');
        }

        this.sessionState.textSize = 0;
        this.onChange(true);
    }

    resetTextSpace() {
        this.resetIfDefined(this.initialValues.body.wordSpacing, this.body.style, 'wordSpacing');
        this.resetIfDefined(this.initialValues.body.letterSpacing, this.body.style, 'letterSpacing');
        let all = document.querySelectorAll('[data-init-word-spacing]');
        let all2 = document.querySelectorAll('[data-init-letter-spacing]');

        for (let i = 0; i < all.length; i++) {
            all[i].style.wordSpacing = all[i].getAttribute('data-init-word-spacing');
            all[i].removeAttribute('data-init-word-spacing');
        }
        for (let i = 0; i < all2.length; i++) {
            all[i].style.letterSpacing = all[i].getAttribute('data-init-letter-spacing');
            all[i].removeAttribute('data-init-letter-spacing');
        }

        this.sessionState.textSpace = 0;
        this.onChange(true);
    }

    alterTextSize(isIncrease) {
        this.sessionState.textSize += isIncrease ? 1 : -1;
        this.onChange(true);
        let factor = 2;
        if (!isIncrease)
            factor *= -1;
        if (this.options.textPixelMode) {
            let all = document.querySelectorAll('*:not(._access)');

            for (let i = 0; i < all.length; i++) {
                let fSize = getComputedStyle(all[i]).fontSize;
                if (fSize && (fSize.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-font-size'))
                        all[i].setAttribute('data-init-font-size', fSize);
                    fSize = (fSize.replace('px', '') * 1) + factor;
                    all[i].style.fontSize = fSize + 'px';
                }
            }
        }
        else if (this.options.textEmlMode) {
            let fp = this.html.style.fontSize;
            if (fp.indexOf('%')) {
                fp = fp.replace('%', '') * 1;
                this.html.style.fontSize = (fp + factor) + '%';
            }
            else {
                common.warn('Accessibility.textEmlMode, html element is not set in %.');
            }
        }
        else {
            let fSize = common.getFormattedDim(getComputedStyle(this.body).fontSize);
            if (typeof this.initialValues.body.fontSize === 'undefined')
                this.initialValues.body.fontSize = fSize.size + fSize.sufix;
            if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
                this.body.style.fontSize = ((fSize.size * 1) + factor) + fSize.sufix;
            }
        }
    }

    alterTextSpace(isIncrease) {
        this.sessionState.textSpace += isIncrease ? 1 : -1;
        this.onChange(true);
        let factor = 1;
        if (!isIncrease)
            factor *= -1;
        if (this.options.textPixelMode) {
            let all = document.querySelectorAll('*:not(._access)');
            let exclude = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));
            for (let i = 0; i < all.length; i++) {
                if (exclude.includes(all[i])) {
                    continue;
                }
                // wordSpacing
                //let fSpacing = getComputedStyle(all[i]).wordSpacing;
                let fSpacing = all[i].style.wordSpacing;
                if (fSpacing && (fSpacing.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-word-spacing'))
                        all[i].setAttribute('data-init-word-spacing', fSpacing);
                    fSpacing = (fSpacing.replace('px', '') * 1) + factor;
                    all[i].style.wordSpacing = fSpacing + 'px';
                } else {
                    all[i].setAttribute('data-init-word-spacing', fSpacing);
                    all[i].style.wordSpacing = factor + 'px';
                }

                // letterSpacing
                //let fSpacing2 = getComputedStyle(all[i]).letterSpacing;
                let fSpacing2 = all[i].style.letterSpacing;
                if (fSpacing2 && (fSpacing2.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-letter-spacing'))
                        all[i].setAttribute('data-init-letter-spacing', fSpacing2);
                    fSpacing2 = (fSpacing2.replace('px', '') * 1) + factor;
                    all[i].style.letterSpacing = fSpacing2 + 'px';
                } else {
                    all[i].setAttribute('data-init-letter-spacing', fSpacing2);
                    all[i].style.letterSpacing = factor + 'px';
                }
            }
        }
        else {
            // wordSpacing
            let fSpacing = common.getFormattedDim(getComputedStyle(this.body).wordSpacing);
            if (typeof this.initialValues.body.wordSpacing === 'undefined')
                this.initialValues.body.wordSpacing = '';
            if (fSpacing && fSpacing.sufix && !isNaN(fSpacing.size * 1)) {
                this.body.style.wordSpacing = ((fSpacing.size * 1) + factor) + fSpacing.sufix;
            }
            // letterSpacing
            let fSpacing2 = common.getFormattedDim(getComputedStyle(this.body).letterSpacing);
            if (typeof this.initialValues.body.letterSpacing === 'undefined')
                this.initialValues.body.letterSpacing = '';
            if (fSpacing2 && fSpacing2.sufix && !isNaN(fSpacing2.size * 1)) {
                this.body.style.letterSpacing = ((fSpacing2.size * 1) + factor) + fSpacing2.sufix;
            }
        }
    }

    speechToText() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = true;
            this.recognition.interimResults = true;
            this.recognition.onstart = () => {
                // TODO red color on mic icon
                //console.log('listening . . .');
                // if (this.speechToTextTarget)
                //     this.speechToTextTarget.parentElement.classList.add('_access-listening');
                this.body.classList.add('_access-listening');
            };

            this.recognition.onend = () => {
                this.body.classList.remove('_access-listening');
                //console.log('onend listening');
            };

            this.recognition.onresult = (event) => {
                ///console.log('onresult listening');
                let finalTranscript = '';
                if (typeof (event.results) == 'undefined') {
                    return;
                }
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                    // else {
                    //     interim_transcript += event.results[i][0].transcript;
                    // }
                }
                if (finalTranscript && this.speechToTextTarget) {
                    this.speechToTextTarget.parentElement.classList.remove('_access-listening');
                    if (this.speechToTextTarget.tagName.toLowerCase() == 'input' || this.speechToTextTarget.tagName.toLowerCase() == 'textarea') {
                        this.speechToTextTarget.value = finalTranscript;
                    }
                    else if (this.speechToTextTarget.getAttribute('contenteditable') != null) {
                        this.speechToTextTarget.innerText = finalTranscript;
                    }
                }
            };
            this.recognition.lang = this.options.speechToTextLang;
            this.recognition.start();
        }
    }

    textToSpeech(text) {
        if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) return;
        let msg = new window.SpeechSynthesisUtterance(text);
        msg.lang = this.options.textToSpeechLang;
        let voices = window.speechSynthesis.getVoices();
        let isLngSupported = false;
        for (let i = 0; i < voices.length; i++) {
            if (voices[i].lang === msg.lang) {
                msg.voice = voices[i];
                isLngSupported = true;
                break;
            }
        }
        if (!isLngSupported) {
            common.warn('text to speech language not supported!');
            // let msg = 'text to speech language not supported!';
            // if (console.warn)
            //     console.warn(msg);
            // else
            //     console.log(msg);
        }
        window.speechSynthesis.speak(msg);
    }

    listen() {
        let className = '_access-speech-to-text';
        // window.event.preventDefault();
        // window.event.stopPropagation();
        if (typeof self.recognition === 'object' && typeof self.recognition.stop === 'function')
            self.recognition.stop();

        self.speechToTextTarget = window.event.target;
        self.speechToText(window.event.target.innerText);
    }

    read() {
        let className = '_access-text-to-speech';
        // let style = document.querySelector('.' + className);
        // if (style) {
        window.event.preventDefault();
        window.event.stopPropagation();
        self.textToSpeech(window.event.target.innerText);
        // }
    }
    runHotkey(name) {
        switch (name) {
            case 'toggleMenu':
                this.toggleMenu();
                break;
            default:
                if (this.menuInterface.hasOwnProperty(name)) {
                    if (this.options.modules[name]) {
                        this.menuInterface[name](false);
                    }
                }
                break;
        }
    }
    toggleMenu() {
        if (this.menu.classList.contains('close')) {
            if (this.options.animations && this.options.animations.buttons)
                setTimeout(() => { this.menu.querySelector('ul').classList.toggle('before-collapse'); }, 500);
            setTimeout(() => { this.menu.classList.toggle('close'); }, 10);
        }
        else {
            if (this.options.animations && this.options.animations.buttons) {
                setTimeout(() => { this.menu.classList.toggle('close'); }, 500);
                setTimeout(() => { this.menu.querySelector('ul').classList.toggle('before-collapse'); }, 10);
            }
            else {
                this.menu.classList.toggle('close');
            }
        }
    }

    invoke(action) {
        if (typeof this.menuInterface[action] === 'function')
            this.menuInterface[action]();
    }

    build() {
        this.initialValues = {
            underlineLinks: false,
            textToSpeech: false,
            bigCursor: false,
            readingGuide: false,
            body: {},
            html: {}
        };
        this.body = document.body || document.getElementsByTagName('body')[0];
        this.html = document.documentElement || document.getElementsByTagName('html')[0];
        if (this.options.textEmlMode)
            this.initFontSize();
        this.injectCss();
        this.icon = this.injectIcon();
        this.menu = this.injectMenu();
        this.addListeners();
        this.disableUnsupportedModules();
        if (this.options.hotkeys.enabled) {
            document.onkeydown = function (e) {
                let act = Object.entries(self.options.hotkeys.keys).find(function (val) {
                    let pass = true;
                    for (var i = 0; i < val[1].length; i++) {
                        if (Number.isInteger((val[1])[i])) {
                            if (e.keyCode != (val[1])[i]) {
                                pass = false;
                            }
                        } else {
                            if (e[(val[1])[i]] == undefined || e[(val[1])[i]] == false) {
                                pass = false;
                            }
                        }
                    }
                    return pass;
                });
                if (act != undefined) {
                    self.runHotkey(act[0]);
                }
            }
        }
        //setMinHeight();

        this.icon.addEventListener('click', () => {
            this.toggleMenu();
        }, false);
        setTimeout(() => {
            this.icon.style.opacity = '1';
        }, 10);

        // if (window.SpeechSynthesisUtterance || window.speechSynthesis) {
        //     let voices = window.speechSynthesis.getVoices();
        // }
        this.updateReadGuide = function (e) {
            let newPos = 0;
            if (e.type == 'touchmove') {
                newPos = e.changedTouches[0].clientY
            } else {
                newPos = e.y;
            }
            document.getElementById('access_read_guide_bar').style.top = (newPos - (parseInt(self.options.guide.height.replace('px')) + 5)) + 'px';
        }
        this.menuInterface = {
            increaseText: () => {
                this.alterTextSize(true);
            },
            decreaseText: () => {
                this.alterTextSize(false);
            },
            increaseTextSpacing: () => {
                this.alterTextSpace(true);
            },
            decreaseTextSpacing: () => {
                this.alterTextSpace(false);
            },
            invertColors: (destroy) => {
                if (typeof this.initialValues.html.backgroundColor === 'undefined')
                    this.initialValues.html.backgroundColor = getComputedStyle(this.html).backgroundColor;
                if (typeof this.initialValues.html.color === 'undefined')
                    this.initialValues.html.color = getComputedStyle(this.html).color;

                if (destroy) {
                    this.resetIfDefined(this.initialValues.html.backgroundColor, this.html.style, 'backgroundColor');
                    this.resetIfDefined(this.initialValues.html.color, this.html.style, 'color');
                    document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove('active');
                    this.initialValues.invertColors = false;
                    this.sessionState.invertColors = this.initialValues.invertColors;
                    this.onChange(true);
                    this.html.style.filter = '';
                    return;
                }


                document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
                this.initialValues.invertColors = !this.initialValues.invertColors;
                this.sessionState.invertColors = this.initialValues.invertColors;
                this.onChange(true);
                if (this.initialValues.invertColors) {
                    if (this.initialValues.grayHues)
                        this.menuInterface.grayHues(true);
                    this.html.style.filter = 'invert(1)';
                }
                else {
                    this.html.style.filter = '';
                }
            },
            grayHues: (destroy) => {
                if (typeof this.initialValues.html.filter === 'undefined')
                    this.initialValues.html.filter = getComputedStyle(this.html).filter;
                if (typeof this.initialValues.html.webkitFilter === 'undefined')
                    this.initialValues.html.webkitFilter = getComputedStyle(this.html).webkitFilter;
                if (typeof this.initialValues.html.mozFilter === 'undefined')
                    this.initialValues.html.mozFilter = getComputedStyle(this.html).mozFilter;
                if (typeof this.initialValues.html.msFilter === 'undefined')
                    this.initialValues.html.msFilter = getComputedStyle(this.html).msFilter;

                if (destroy) {
                    document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove('active');
                    this.initialValues.grayHues = false;
                    this.sessionState.grayHues = this.initialValues.grayHues;
                    this.onChange(true);
                    this.resetIfDefined(this.initialValues.html.filter, this.html.style, 'filter');
                    this.resetIfDefined(this.initialValues.html.webkitFilter, this.html.style, 'webkitFilter');
                    this.resetIfDefined(this.initialValues.html.mozFilter, this.html.style, 'mozFilter');
                    this.resetIfDefined(this.initialValues.html.msFilter, this.html.style, 'msFilter');
                    return;
                }

                document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active');
                this.initialValues.grayHues = !this.initialValues.grayHues;
                this.sessionState.grayHues = this.initialValues.grayHues;
                this.onChange(true);
                let val;
                if (this.initialValues.grayHues) {
                    val = 'grayscale(1)'
                    if (this.initialValues.invertColors)
                        this.menuInterface.invertColors(true)
                } else {
                    val = ''
                }
                this.html.style.webkitFilter = val;
                this.html.style.mozFilter = val;
                this.html.style.msFilter = val;
                this.html.style.filter = val;
            },
            underlineLinks: (destroy) => {
                let className = '_access-underline';
                let remove = () => {
                    let style = document.querySelector('.' + className);
                    if (style) {
                        style.parentElement.removeChild(style);
                        common.deployedObjects.remove('.' + className);
                    }
                };

                if (destroy) {
                    this.initialValues.underlineLinks = false;
                    this.sessionState.underlineLinks = this.initialValues.underlineLinks;
                    this.onChange(true);
                    document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove('active');
                    return remove();
                }

                document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active')
                this.initialValues.underlineLinks = !this.initialValues.underlineLinks;
                this.sessionState.underlineLinks = this.initialValues.underlineLinks;
                this.onChange(true);
                if (this.initialValues.underlineLinks) {
                    let css = `
                    body a {
                        text-decoration: underline !important;
                    }
                `;
                    common.injectStyle(css, { className: className });
                    common.deployedObjects.set('.' + className, true);
                }
                else {
                    remove();
                }
            },
            bigCursor: (destroy) => {
                if (destroy) {
                    this.html.classList.remove('_access_cursor');
                    document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.remove('active');
                    this.initialValues.bigCursor = false;
                    this.sessionState.bigCursor = false;
                    this.onChange(true);
                    return;
                }


                document.querySelector('._access-menu [data-access-action="bigCursor"]').classList.toggle('active');
                this.initialValues.bigCursor = !this.initialValues.bigCursor;
                this.sessionState.bigCursor = this.initialValues.bigCursor;
                this.onChange(true);
                this.html.classList.toggle('_access_cursor');
            },
            readingGuide: (destroy) => {
                if (destroy) {
                    if (document.getElementById('access_read_guide_bar') != undefined) {
                        document.getElementById('access_read_guide_bar').remove();
                    }
                    document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.remove('active');
                    this.initialValues.readingGuide = false;
                    this.sessionState.readingGuide = this.initialValues.readingGuide;
                    this.onChange(true);
                    document.body.removeEventListener('touchmove', this.updateReadGuide, false);
                    document.body.removeEventListener('mousemove', this.updateReadGuide, false);
                    return;
                }
                document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle('active');
                this.initialValues.readingGuide = !this.initialValues.readingGuide;
                this.sessionState.readingGuide = this.initialValues.readingGuide;
                this.onChange(true);
                if (this.initialValues.readingGuide) {
                    let read = document.createElement("div");
                    read.id = 'access_read_guide_bar';
                    read.classList.add('access_read_guide_bar');
                    document.body.append(read);
                    document.body.addEventListener('touchmove', this.updateReadGuide, false);
                    document.body.addEventListener('mousemove', this.updateReadGuide, false);
                } else {
                    if (document.getElementById('access_read_guide_bar') != undefined) {
                        document.getElementById('access_read_guide_bar').remove();
                    }
                    document.body.removeEventListener('touchmove', this.updateReadGuide, false);
                    document.body.removeEventListener('mousemove', this.updateReadGuide, false);
                }
            },
            textToSpeech: (destroy) => {
                // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;
                this.onChange(false);
                let className = '_access-text-to-speech';
                let remove = () => {
                    let style = document.querySelector('.' + className);
                    if (style) {
                        style.parentElement.removeChild(style);
                        document.removeEventListener('click', this.read, false);
                        common.deployedObjects.remove('.' + className);
                    }
                };

                if (destroy) {
                    document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.remove('active');
                    this.initialValues.textToSpeech = false;
                    return remove();
                }

                document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle('active');

                this.initialValues.textToSpeech = !this.initialValues.textToSpeech;
                if (this.initialValues.textToSpeech) {
                    let css = `
                        *:hover {
                            box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
                        }
                    `;
                    common.injectStyle(css, { className: className });
                    common.deployedObjects.set('.' + className, true);
                    document.addEventListener('click', this.read, false);
                }
                else {
                    remove();
                }
            },
            speechToText: (destroy) => {
                // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
                this.onChange(false);
                let className = '_access-speech-to-text';
                let remove = () => {
                    if (this.recognition) {
                        this.recognition.stop();
                        this.body.classList.remove('_access-listening');
                    }
                    let style = document.querySelector('.' + className);
                    if (style) {
                        style.parentElement.removeChild(style);
                        common.deployedObjects.remove('.' + className);
                    }
                    let inputs = document.querySelectorAll('._access-mic');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].removeEventListener('focus', this.listen, false);
                        inputs[i].classList.remove('_access-mic');
                    }
                };

                if (destroy) {
                    document.querySelector('._access-menu [data-access-action="speechToText"]').classList.remove('active');
                    this.initialValues.speechToText = false;
                    return remove();
                }

                document.querySelector('._access-menu [data-access-action="speechToText"]').classList.toggle('active');

                this.initialValues.speechToText = !this.initialValues.speechToText;
                if (this.initialValues.speechToText) {
                    let css = `
                        body:after {
                            content: ${!this.options.icon.useEmojis ? '"mic"' : '"🎤"'};
                            ${!this.options.icon.useEmojis ? "font-family: '" + this.options.icon.fontFamily + "';" : ''}
                            position: fixed;
                            z-index: 1100;
                            top: 1vw;
                            right: 1vw;
                            width: 36px;
                            height: 36px;
                            font-size: 30px;
                            line-height: 36px;
                            border-radius: 50%;
                            background: rgba(255,255,255,0.7);
                            display: flex;
                            justify-content: center;
                            aling-items: center;
                        }

                        body._access-listening:after {
                            animation: _access-listening-animation 2s infinite ease;
                        }

                        @keyframes _access-listening-animation {
                            0%  {background-color: transparent;}
                            50%  {background-color: #EF9A9A;}
                        }
                    `;
                    common.injectStyle(css, { className: className });
                    common.deployedObjects.set('.' + className, true);
                    let inputs = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].addEventListener('blur', () => {
                            if (typeof this.recognition === 'object' && typeof this.recognition.stop === 'function')
                                this.recognition.stop();
                        }, false);
                        inputs[i].addEventListener('focus', this.listen, false);
                        inputs[i].parentElement.classList.add('_access-mic');
                    }
                }
                else {
                    remove();
                }
            }
        }
        if (this.options.session.persistent)
            this.setSessionFromCache();
    }

    resetIfDefined(src, dest, prop) {
        if (typeof src !== 'undefined')
            dest[prop] = src;
    }

    onChange(updateSession) {
        if (updateSession && this.options.session.persistent)
            this.saveSession();
    }

    saveSession() {
        storage.set('_accessState', this.sessionState);
    }

    setSessionFromCache() {
        let sessionState = storage.get('_accessState');
        if (sessionState) {
            if (sessionState.textSize) {
                let textSize = sessionState.textSize;
                if (textSize > 0) {
                    while (textSize--) {
                        this.alterTextSize(true);
                    }
                }
                else {
                    while (textSize++) {
                        this.alterTextSize(false);
                    }
                }
            }
            if (sessionState.textSpace) {
                let textSpace = sessionState.textSpace;
                if (textSpace > 0) {
                    while (textSpace--) {
                        this.alterTextSpace(true);
                    }
                }
                else {
                    while (textSpace++) {
                        this.alterTextSpace(false);
                    }
                }
            }
            if (sessionState.invertColors)
                this.menuInterface.invertColors();
            if (sessionState.grayHues)
                this.menuInterface.grayHues();
            if (sessionState.underlineLinks)
                this.menuInterface.underlineLinks();
            if (sessionState.bigCursor)
                this.menuInterface.bigCursor();
            if (sessionState.readingGuide)
                this.menuInterface.readingGuide();
            this.sessionState = sessionState;
        }
    }

    destroy() {
        let allSelectors = common.deployedObjects.getAll();
        for (let i of allSelectors) {
            let elem = document.querySelector(i);
            if (elem) {
                elem.parentElement.removeChild(elem);
            }
        }
    }
}

Accessibility.init = (opt) => {
    common.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
    new Accessibility(opt);
};

export default Accessibility;
