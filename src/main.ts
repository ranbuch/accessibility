'use strict';
import { Common } from './common';
import { IAccessibility, IAccessibilityOptions, ISessionState, IStateValues } from './interfaces/accessibility.interface';
import { IFormattedDim } from './interfaces/common.interface';
import { IMenuInterface } from './interfaces/menu.interface';
import { MenuInterface } from './menu-interface';
import { Storage } from './storage';

export class Accessibility implements IAccessibility {
    private _isReading: boolean;
    private _common: Common;
    private _storage: Storage;
    private _options: IAccessibilityOptions;
    private _sessionState: ISessionState;
    private _htmlInitFS: IFormattedDim;
    private _body: HTMLBodyElement;
    private _html: HTMLElement;
    private _icon: HTMLElement;
    private _menu: HTMLElement;
    private _htmlOrgFontSize: string;
    private _stateValues: IStateValues;
    private _recognition: any; // SpeechRecognition;
    private _speechToTextTarget: HTMLElement;
    public menuInterface: IMenuInterface;
    public options: IAccessibilityOptions;
    constructor(options = {} as IAccessibilityOptions) {
        this._common = new Common();
        this._storage = new Storage();
        this._options = this.defaultOptions;
        options = this.deleteOppositesIfDefined(options);
        this.options = this._common.extend(this._options, options);
        // Consider adding this:
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
        }
        else {
            this._common.injectIconsFont(this.options.icon.fontFaceSrc, (hasError: boolean) => {
                this.build();
                if (!this.options.icon.forceFont) {
                    setTimeout(() => {
                        this._common.isFontLoaded(this.options.icon.fontFamily, (isLoaded: boolean) => {
                            if (!isLoaded || hasError) {
                                this._common.warn(`${this.options.icon.fontFamily} font was not loaded, using emojis instead`);
                                this.fontFallback();
                                this.destroy();
                                this.build();
                            }
                        });
                    });
                }
            });
        }
        if (this.options.modules.speechToText) {
            window.addEventListener('beforeunload', () => {
                if (this._isReading) {
                    window.speechSynthesis.cancel();
                    this._isReading = false;
                }
            });
        }
    }

    get stateValues() {
        return this._stateValues;
    }

    set stateValues(value: IStateValues) {
        this._stateValues = value;
    }

    get html() {
        return this._html;
    }

    get body() {
        return this._body;
    }

    get sessionState() {
        return this._sessionState;
    }

    set sessionState(value: ISessionState) {
        this._sessionState = value;
    }

    get common() {
        return this._common;
    }

    get recognition() {
        return this._recognition;
    }

    get isReading() {
        return this._isReading;
    }

    set isReading(value: boolean) {
        this._isReading = value;
    }

    // Default options
    private get defaultOptions(): IAccessibilityOptions {
        return {
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
                fontFamily: this._common.getFixedFont('Material Icons'),
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
    }

    initFontSize() {
        // store this values only once.
        if (!this._htmlInitFS) {
            let htmlInitFS = this._common.getFormattedDim(getComputedStyle(this._html).fontSize);
            let bodyInitFS = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
            this._html.style.fontSize = ((htmlInitFS.size as number) / 16 * 100) + '%';
            this._htmlOrgFontSize = this._html.style.fontSize;
            this._body.style.fontSize = ((bodyInitFS.size as number) / (htmlInitFS.size as number)) + 'em';
        }
    }

    fontFallback() {
        this.options.icon.useEmojis = true;
        this.options.icon.fontFamily = null;
        this.options.icon.img = '♿';
        this.options.icon.fontClass = '';
    }

    deleteOppositesIfDefined(options: IAccessibilityOptions) {
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

    disabledUnsupportedFeatures() {
        if (!('webkitSpeechRecognition' in window) || location.protocol !== 'https:') {
            this._common.warn('speech to text isn\'t supported in this browser or in http protocol (https required)');
            this.options.modules.speechToText = false;
        }
        const windowAny = window as any;
        if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) {
            this._common.warn('text to speech isn\'t supported in this browser');
            this.options.modules.textToSpeech = false;
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
            ${(getComputedStyle(this._body).direction === 'rtl' ? 'text-indent: -5px' : '')}
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
            ${!this.options.icon.useEmojis ? 'font-family: ' + this._common.getFixedPseudoFont(this.options.icon.fontFamily) + ';' : ''}
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
        this._common.injectStyle(css, { className: className });
        this._common.deployedObjects.set('.' + className, false);
    }

    injectIcon(): HTMLElement {
        let fontSize = (this.options.icon.dimensions.width.size as number) * 0.8;
        let lineHeight = (this.options.icon.dimensions.width.size as number) * 0.9;
        let textIndent = (this.options.icon.dimensions.width.size as number) * 0.1;
        let iStyle = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}
            ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}
            ;font-size: ${fontSize + this.options.icon.dimensions.width.units}
            ;line-height: ${lineHeight + this.options.icon.dimensions.width.units}
            ;text-indent: ${textIndent + this.options.icon.dimensions.width.units}
            ;background-color: ${!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent'};color: ${this.options.icon.color}`;
        for (let i in this.options.icon.position) {
            let pos = this.options.icon.position as any;
            pos = pos[i];
            iStyle += ';' + i + ':' + pos.size + pos.units;
        }
        iStyle += `;z-index: ${this.options.icon.zIndex}`;
        let className = `_access-icon ${this.options.icon.fontClass} _access` + (this.options.icon.circular ? ' circular' : '');
        let iconElem = this._common.jsonToHtml({
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

        this._body.appendChild(iconElem);
        this._common.deployedObjects.set('._access-icon', false);
        return iconElem;
    }

    parseKeys(arr: Array<any>) {
        return (this.options.hotkeys.enabled ? (this.options.hotkeys.helpTitles ? 'Hotkey: ' + arr.map(function (val) { return Number.isInteger(val) ? String.fromCharCode(val).toLowerCase() : val.replace('Key', ''); }).join('+') : '') : '');
    }

    injectMenu(): HTMLElement {
        let menuElem = this._common.jsonToHtml({
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

        this._body.appendChild(menuElem);
        setTimeout(function () {
            let ic = document.getElementById('iconBigCursor');
            if (ic) {
                ic.outerHTML = ic.outerHTML + '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;left: 17px;enable-background:new 0 0 512 512;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
                document.getElementById('iconBigCursor').remove();
            }
        }, 1);
        this._common.deployedObjects.set('._access-menu', false);
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
                let evt = e || window.event;
                this.invoke((evt.target as HTMLElement).getAttribute('data-access-action'));
            }, false);
        }
    }

    disableUnsupportedModules() {
        for (let i in this.options.modules) {
            let m = this.options.modules as any;
            m = m[i];
            if (!m) {
                let moduleLi = document.querySelector('li[data-access-action="' + i + '"]');
                if (moduleLi) {
                    moduleLi.classList.add('not-supported');
                }
            }
        }
    }

    resetAll() {
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

    resetTextSize() {
        this.resetIfDefined(this._stateValues.body.fontSize, this._body.style, 'fontSize');
        if (typeof this._htmlOrgFontSize !== 'undefined')
            this._html.style.fontSize = this._htmlOrgFontSize;
        let all = document.querySelectorAll('[data-init-font-size]');

        for (let i = 0; i < all.length; i++) {
            (all[i] as HTMLElement).style.fontSize = all[i].getAttribute('data-init-font-size');
            all[i].removeAttribute('data-init-font-size');
        }

        this._sessionState.textSize = 0;
        this.onChange(true);
    }

    resetTextSpace() {
        this.resetIfDefined(this._stateValues.body.wordSpacing, this._body.style, 'wordSpacing');
        this.resetIfDefined(this._stateValues.body.letterSpacing, this._body.style, 'letterSpacing');
        let all = document.querySelectorAll('[data-init-word-spacing]');
        let all2 = document.querySelectorAll('[data-init-letter-spacing]');

        for (let i = 0; i < all.length; i++) {
            (all[i] as HTMLElement).style.wordSpacing = all[i].getAttribute('data-init-word-spacing');
            all[i].removeAttribute('data-init-word-spacing');
        }
        for (let i = 0; i < all2.length; i++) {
            (all[i] as HTMLElement).style.letterSpacing = all[i].getAttribute('data-init-letter-spacing');
            all[i].removeAttribute('data-init-letter-spacing');
        }

        this._sessionState.textSpace = 0;
        this.onChange(true);
    }

    alterTextSize(isIncrease: boolean) {
        this._sessionState.textSize += isIncrease ? 1 : -1;
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
                    fSize = parseInt(fSize.replace('px', '')) + factor as any;
                    (all[i] as HTMLElement).style.fontSize = fSize + 'px';
                }
            }
        }
        else if (this.options.textEmlMode) {
            let fp = this._html.style.fontSize;
            if (fp.indexOf('%')) {
                fp = parseInt(fp.replace('%', '')) as any;
                this._html.style.fontSize = (fp + factor) + '%';
            }
            else {
                this._common.warn('Accessibility.textEmlMode, html element is not set in %.');
            }
        }
        else {
            let fSize = this._common.getFormattedDim(getComputedStyle(this._body).fontSize);
            if (typeof this._stateValues.body.fontSize === 'undefined')
                this._stateValues.body.fontSize = fSize.size + fSize.suffix;
            if (fSize && fSize.suffix && !isNaN((fSize.size as number) * 1)) {
                this._body.style.fontSize = (((fSize.size as number) * 1) + factor) + fSize.suffix;
            }
        }
    }

    alterTextSpace(isIncrease: boolean) {
        this._sessionState.textSpace += isIncrease ? 1 : -1;
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
                let fSpacing = (all[i] as HTMLElement).style.wordSpacing as any;
                if (fSpacing && (fSpacing.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-word-spacing'))
                        all[i].setAttribute('data-init-word-spacing', fSpacing);
                    fSpacing = (fSpacing.replace('px', '') * 1) + factor;
                    (all[i] as HTMLElement).style.wordSpacing = fSpacing + 'px';
                } else {
                    all[i].setAttribute('data-init-word-spacing', fSpacing);
                    (all[i] as HTMLElement).style.wordSpacing = factor + 'px';
                }

                // letterSpacing
                let fSpacing2 = (all[i] as HTMLElement).style.letterSpacing as any;
                if (fSpacing2 && (fSpacing2.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-letter-spacing'))
                        all[i].setAttribute('data-init-letter-spacing', fSpacing2);
                    fSpacing2 = (fSpacing2.replace('px', '') * 1) + factor;
                    (all[i] as HTMLElement).style.letterSpacing = fSpacing2 + 'px';
                } else {
                    all[i].setAttribute('data-init-letter-spacing', fSpacing2);
                    (all[i] as HTMLElement).style.letterSpacing = factor + 'px';
                }
            }
        }
        else {
            // wordSpacing
            let fSpacing = this._common.getFormattedDim(getComputedStyle(this._body).wordSpacing) as any;
            if (typeof this._stateValues.body.wordSpacing === 'undefined')
                this._stateValues.body.wordSpacing = '';
            if (fSpacing && fSpacing.suffix && !isNaN(fSpacing.size * 1)) {
                this._body.style.wordSpacing = ((fSpacing.size * 1) + factor) + fSpacing.suffix;
            }
            // letterSpacing
            let fSpacing2 = this._common.getFormattedDim(getComputedStyle(this._body).letterSpacing) as any;
            if (typeof this._stateValues.body.letterSpacing === 'undefined')
                this._stateValues.body.letterSpacing = '';
            if (fSpacing2 && fSpacing2.sufix && !isNaN(fSpacing2.size * 1)) {
                this._body.style.letterSpacing = ((fSpacing2.size * 1) + factor) + fSpacing2.sufix;
            }
        }
    }

    speechToText() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            this._recognition = new ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition)();
            this._recognition.continuous = true;
            this._recognition.interimResults = true;
            this._recognition.onstart = () => {
                // TODO red color on mic icon
                // console.log('listening . . .');
                // if (this.speechToTextTarget)
                //     this.speechToTextTarget.parentElement.classList.add('_access-listening');
                this._body.classList.add('_access-listening');
            };

            this._recognition.onend = () => {
                this._body.classList.remove('_access-listening');
            };

            this._recognition.onresult = (event: any) => {
                let finalTranscript = '';
                if (typeof (event.results) === 'undefined') {
                    return;
                }
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript && this._speechToTextTarget) {
                    this._speechToTextTarget.parentElement.classList.remove('_access-listening');
                    if (this._speechToTextTarget.tagName.toLowerCase() === 'input' || this._speechToTextTarget.tagName.toLowerCase() === 'textarea') {
                        (this._speechToTextTarget as HTMLInputElement).value = finalTranscript;
                    }
                    else if (this._speechToTextTarget.getAttribute('contenteditable') !== null) {
                        this._speechToTextTarget.innerText = finalTranscript;
                    }
                }
            };
            this._recognition.lang = this.options.speechToTextLang;
            this._recognition.start();
        }
    }

    textToSpeech(text: string) {
        const windowAny = window as any;
        if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) return;
        let msg = new windowAny.SpeechSynthesisUtterance(text);
        msg.lang = this.options.textToSpeechLang;
        msg.onend = () => {
            this._isReading = false;
        };
        let voices = windowAny.speechSynthesis.getVoices();
        let isLngSupported = false;
        for (let i = 0; i < voices.length; i++) {
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

    listen() {
        if (typeof this._recognition === 'object' && typeof this._recognition.stop === 'function')
            this._recognition.stop();

        this._speechToTextTarget = window.event.target as HTMLElement;
        this.speechToText();
    }

    read(e: Event) {
        try {
            e = window.event || e || arguments[0];
            if (e && e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }
        }
        catch (ex) { }
        if (this._isReading) {
            window.speechSynthesis.cancel();
            this._isReading = false;
        }
        else
            this.textToSpeech((window.event.target as HTMLElement).innerText);
    }

    runHotkey(name: string) {
        switch (name) {
            case 'toggleMenu':
                this.toggleMenu();
                break;
            default:
                if (this.menuInterface.hasOwnProperty(name)) {
                    if ((this._options.modules as any)[name]) {
                        (this.menuInterface as any)[name](false);
                    }
                }
                break;
        }
    }
    toggleMenu() {
        if (this._menu.classList.contains('close')) {
            if (this.options.animations && this.options.animations.buttons)
                setTimeout(() => { this._menu.querySelector('ul').classList.toggle('before-collapse'); }, 500);
            setTimeout(() => { this._menu.classList.toggle('close'); }, 10);
        }
        else {
            if (this.options.animations && this.options.animations.buttons) {
                setTimeout(() => { this._menu.classList.toggle('close'); }, 500);
                setTimeout(() => { this._menu.querySelector('ul').classList.toggle('before-collapse'); }, 10);
            }
            else {
                this._menu.classList.toggle('close');
            }
        }
    }

    invoke(action: string) {
        if (typeof (this.menuInterface as any)[action] === 'function')
            (this.menuInterface as any)[action]();
    }

    build() {
        this._stateValues = {
            underlineLinks: false,
            textToSpeech: false,
            bigCursor: false,
            readingGuide: false,
            body: {},
            html: {}
        };
        this._body = document.body || document.getElementsByTagName('body')[0] as any;
        this._html = document.documentElement || document.getElementsByTagName('html')[0];
        if (this.options.textEmlMode)
            this.initFontSize();
        this.injectCss();
        this._icon = this.injectIcon();
        this._menu = this.injectMenu();
        this.addListeners();
        this.disableUnsupportedModules();
        if (this.options.hotkeys.enabled) {
            document.onkeydown = (e: KeyboardEvent) => {
                let act = Object.entries(this.options.hotkeys.keys).find(function (val) {
                    let pass = true;
                    for (var i = 0; i < val[1].length; i++) {
                        if (Number.isInteger((val[1])[i])) {
                            if (e.keyCode !== (val[1])[i]) {
                                pass = false;
                            }
                        } else {
                            if ((e as any)[(val[1])[i]] === undefined || (e as any)[(val[1])[i]] === false) {
                                pass = false;
                            }
                        }
                    }
                    return pass;
                });
                if (act !== undefined) {
                    this.runHotkey(act[0]);
                }
            };
        }

        this._icon.addEventListener('click', () => {
            this.toggleMenu();
        }, false);
        setTimeout(() => {
            this._icon.style.opacity = '1';
        }, 10);

        this.updateReadGuide = (e: Event | TouchEvent | any) => {
            let newPos = 0;
            if (e.type === 'touchmove') {
                newPos = e.changedTouches[0].clientY;
            } else {
                newPos = e.y;
            }
            document.getElementById('access_read_guide_bar').style.top = (newPos - (parseInt(this.options.guide.height.replace('px', '')) + 5)) + 'px';
        };
        this.menuInterface = new MenuInterface(this);
        if (this.options.session.persistent)
            this.setSessionFromCache();
    }

    updateReadGuide(e: Event | TouchEvent | any) {
        let newPos = 0;
        if (e.type === 'touchmove') {
            newPos = e.changedTouches[0].clientY;
        } else {
            newPos = e.y;
        }
        document.getElementById('access_read_guide_bar').style.top = (newPos - (parseInt(this.options.guide.height.replace('px', '')) + 5)) + 'px';
    }

    resetIfDefined(src: string, dest: any, prop: string) {
        if (typeof src !== 'undefined')
            dest[prop] = src;
    }

    onChange(updateSession: boolean) {
        if (updateSession && this.options.session.persistent)
            this.saveSession();
    }

    saveSession() {
        this._storage.set('_accessState', this.sessionState);
    }

    setSessionFromCache() {
        let sessionState = this._storage.get('_accessState');
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
        const allSelectors = this._common.deployedObjects.getAll();
        allSelectors.forEach((value: boolean, key: string) => {
            const elem = document.querySelector(key);
            if (elem)
                elem.parentElement.removeChild(elem);
        });
    }
}

(Accessibility as any).init = (opt?: IAccessibilityOptions) => {
    console.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
    new Accessibility(opt);
};

export default Accessibility;