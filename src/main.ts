'use strict';
// Do not delete this as it allows importing the package with other projects
import 'regenerator-runtime/runtime.js';
import { Common } from './common';
import { IAccessibility, IAccessibilityOptions, ISessionState, IStateValues, AccessibilityModulesType, IIframeModal, ICustomFunction, IAccessibilityModuleOrder } from './interfaces/accessibility.interface';
import { IFormattedDim, IJsonToHtml } from './interfaces/common.interface';
import { IMenuInterface } from './interfaces/menu.interface';
import { MenuInterface } from './menu-interface';
import { Storage } from './storage';

export class Accessibility implements IAccessibility {
    static CSS_CLASS_NAME = '_access-main-css';
    static MENU_WIDTH = '25vw';
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
    private _onKeyDownBind: any;
    private _fixedDefaultFont: string;
    public menuInterface: IMenuInterface;
    public options: IAccessibilityOptions;
    constructor(options = {} as IAccessibilityOptions) {
        this._common = new Common();
        this._storage = new Storage();
        this._fixedDefaultFont = this._common.getFixedFont('Material Icons');
        this._options = this.defaultOptions;
        this.options = this._common.extend(this._options, options);
        this.addModuleOrderIfNotDefined();
        this.addDefaultOptions(options);
        // Consider adding this:
        // if (options) {
        //     if (!options.textToSpeechLang && document.querySelector('html').getAttribute('lang')) {
        //         this.options.textToSpeechLang = document.querySelector('html').getAttribute('lang')
        //     }
        // }
        this.disabledUnsupportedFeatures();
        this._onKeyDownBind = this.onKeyDown.bind(this);
        this._sessionState = {
            textSize: 0,
            textSpace: 0,
            lineHeight: 0,
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
                if (this.options.icon.fontFamilyValidation) {
                    setTimeout(() => {
                        this._common.isFontLoaded(this.options.icon.fontFamilyValidation, (isLoaded: boolean) => {
                            if (!isLoaded || hasError) {
                                console.log('!isLoaded || hasError', !isLoaded || hasError);
                                this._common.warn(`${this.options.icon.fontFamilyValidation} font was not loaded, using emojis instead`);
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

    get fixedDefaultFont() {
        return this._fixedDefaultFont;
    }

    // Default options
    private get defaultOptions(): IAccessibilityOptions {
        const res = {
            icon: {
                img: 'accessibility',
                fontFaceSrc: ['https://fonts.googleapis.com/icon?family=Material+Icons'],
                fontClass: 'material-icons',
                useEmojis: false,
                closeIcon: 'close',
                resetIcon: 'refresh',
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
                    ],
                    disableAnimations: [
                        'ctrlKey',
                        'altKey',
                        81
                    ]
                }
            },
            guide: {
                cBorder: '#20ff69',
                cBackground: '#000000',
                height: '12px'
            },
            suppressCssInjection: false,
            suppressDomInjection: false,
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
                speechToText: 'speech to text',
                disableAnimations: 'disable animations',
                increaseLineHeight: 'increase line height',
                decreaseLineHeight: 'decrease line height',
                hotkeyPrefix: 'Hotkey: '
            },
            textPixelMode: false,
            textEmlMode: true,
            textSizeFactor: 12.5,
            animations: {
                buttons: true
            },
            modules: {
                increaseText: true,
                decreaseText: true,
                increaseTextSpacing: true,
                decreaseTextSpacing: true,
                increaseLineHeight: true,
                decreaseLineHeight: true,
                invertColors: true,
                grayHues: true,
                bigCursor: true,
                readingGuide: true,
                underlineLinks: true,
                textToSpeech: true,
                speechToText: true,
                disableAnimations: true,
                iframeModals: true,
                customFunctions: true,
            },
            modulesOrder: [] as Array<IAccessibilityModuleOrder>,
            session: {
                persistent: true
            },
            iframeModals: [] as Array<IIframeModal>,
            customFunctions: [] as Array<ICustomFunction>,
            statement: {
                url: '',
            },
            feedback: {
                url: '',
            },
            language: {
                textToSpeechLang: '',
                speechToTextLang: ''
            }
        };
        const keys = Object.keys(AccessibilityModulesType);
        keys.forEach((key, index) => {
            const keyNum  = parseInt(key);
            if (!isNaN(keyNum)) {
                res.modulesOrder.push({
                    type: keyNum,
                    order: keyNum
                });
            }
        });
        return res;
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
        this.options.icon.img = '♿';
        this.options.icon.fontClass = '';
    }

    addDefaultOptions(options: IAccessibilityOptions) {
        if (options.icon?.closeIconElem)
            this.options.icon.closeIconElem = options.icon.closeIconElem;
        if (options.icon?.resetIconElem)
            this.options.icon.resetIconElem = options.icon.resetIconElem;
        if (options.icon?.imgElem)
            this.options.icon.imgElem = options.icon.imgElem;
        if (!this.options.icon.closeIconElem)
            this.options.icon.closeIconElem = {
                type: '#text',
                text: `${!this.options.icon.useEmojis ? this.options.icon.closeIcon : 'X'}`
            };
        if (!this.options.icon.resetIconElem)
            this.options.icon.resetIconElem = {
                type: '#text',
                text: `${!this.options.icon.useEmojis ? this.options.icon.resetIcon : '♲'}`
            };
        if (!this.options.icon.imgElem)
            this.options.icon.imgElem = {
                type: '#text',
                text: this.options.icon.img
            };
    }

    addModuleOrderIfNotDefined() {
        this.defaultOptions.modulesOrder.forEach(mo => {
            if (!this.options.modulesOrder.find(imo => imo.type === mo.type))
                this.options.modulesOrder.push(mo);
        });
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

    public injectCss(injectFull: boolean) {
        const iconTop = '7px', iconLeft = '5px';
        let css;
        const mandatory = `
        html._access_cursor * {
            cursor: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz48IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiPjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSIyOS4xODhweCIgaGVpZ2h0PSI0My42MjVweCIgdmlld0JveD0iMCAwIDI5LjE4OCA0My42MjUiIGVuYWJsZS1iYWNrZ3JvdW5kPSJuZXcgMCAwIDI5LjE4OCA0My42MjUiIHhtbDpzcGFjZT0icHJlc2VydmUiPjxnPjxwb2x5Z29uIGZpbGw9IiNGRkZGRkYiIHN0cm9rZT0iI0Q5REFEOSIgc3Ryb2tlLXdpZHRoPSIxLjE0MDYiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgcG9pbnRzPSIyLjgsNC41NDkgMjYuODQ3LDE5LjkwMiAxNi45NjQsMjIuNzAxIDI0LjIzOSwzNy43NDkgMTguMjc4LDQyLjAxNyA5Ljc0MSwzMC43MjQgMS4xMzgsMzUuODA5ICIvPjxnPjxnPjxnPjxwYXRoIGZpbGw9IiMyMTI2MjciIGQ9Ik0yOS4xNzUsMjEuMTU1YzAuMDcxLTAuNjEzLTAuMTY1LTEuMjUzLTAuNjM1LTEuNTczTDIuMTY1LDAuMjU4Yy0wLjQyNC0wLjMyLTAuOTg4LTAuMzQ2LTEuNDM1LTAuMDUzQzAuMjgyLDAuNDk3LDAsMS4wMywwLDEuNjE3djM0LjE3MWMwLDAuNjEzLDAuMzA2LDEuMTQ2LDAuNzc2LDEuNDM5YzAuNDcxLDAuMjY3LDEuMDU5LDAuMjEzLDEuNDgyLTAuMTZsNy40ODItNi4zNDRsNi44NDcsMTIuMTU1YzAuMjU5LDAuNDgsMC43MjksMC43NDYsMS4yLDAuNzQ2YzAuMjM1LDAsMC40OTQtMC4wOCwwLjcwNi0wLjIxM2w2Ljk4OC00LjU4NWMwLjMyOS0wLjIxMywwLjU2NS0wLjU4NiwwLjY1OS0xLjAxM2MwLjA5NC0wLjQyNiwwLjAyNC0wLjg4LTAuMTg4LTEuMjI2bC02LjM3Ni0xMS4zODJsOC42MTEtMi43NDVDMjguNzA1LDIyLjI3NCwyOS4xMDUsMjEuNzY4LDI5LjE3NSwyMS4xNTV6IE0xNi45NjQsMjIuNzAxYy0wLjQyNCwwLjEzMy0wLjc3NiwwLjUwNi0wLjk0MSwwLjk2Yy0wLjE2NSwwLjQ4LTAuMTE4LDEuMDEzLDAuMTE4LDEuNDM5bDYuNTg4LDExLjc4MWwtNC41NDEsMi45ODVsLTYuODk0LTEyLjMxNWMtMC4yMTItMC4zNzMtMC41NDEtMC42NC0wLjk0MS0wLjcyYy0wLjA5NC0wLjAyNy0wLjE2NS0wLjAyNy0wLjI1OS0wLjAyN2MtMC4zMDYsMC0wLjU4OCwwLjEwNy0wLjg0NywwLjMyTDIuOCwzMi41OVY0LjU0OWwyMS41OTksMTUuODA2TDE2Ljk2NCwyMi43MDF6Ii8+PC9nPjwvZz48L2c+PC9nPjwvc3ZnPg==),auto!important;
        }
        @keyframes _access-dialog-backdrop {
            0% {
                background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1))
            }
            100% {
                background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5))
            }
        }
        dialog._access::backdrop, dialog._access {
            transition-duration: var(--_access-menu-dialog-backdrop-transition-duration, 0.35s);
            transition-timing-function: var(--_access-menu-dialog-backdrop-transition-timing-function, ease-in-out);
        }
        dialog._access:modal {
            border-color: transparent;
            border-width: 0;
            padding: 0;
        }
        dialog._access[open]::backdrop {
            background: var(--_access-menu-dialog-backdrop-background-end, rgba(0, 0, 0, 0.5));
            animation: _access-dialog-backdrop var(--_access-menu-dialog-backdrop-transition-duration, 0.35s) ease-in-out;
        }
        dialog._access.closing[open]::backdrop {
            background: var(--_access-menu-dialog-backdrop-background-start, rgba(0, 0, 0, 0.1));
        }
        dialog._access.closing[open] {
            opacity: 0;
        }
        .screen-reader-wrapper {
            margin: 0;
            position: absolute;
            bottom: -4px;
            width: calc(100% - 2px);
            left: 1px;
        }
        .screen-reader-wrapper-step-1, .screen-reader-wrapper-step-2,.screen-reader-wrapper-step-3 {
            float: left;
            background: var(--_access-menu-background-color, #fff);
            width: 33.33%;
            height: 3px;
            border-radius: 10px;
        }
        .screen-reader-wrapper-step-1.active, .screen-reader-wrapper-step-2.active,.screen-reader-wrapper-step-3.active {
            background: var(--_access-menu-item-button-background, #f9f9f9);
        }
        .access_read_guide_bar {
            box-sizing: border-box;
            background: var(--_access-menu-read-guide-bg, ${this.options.guide.cBackground});
            width: 100%!important;
            min-width: 100%!important;
            position: fixed!important;
            height: var(--_access-menu-read-guide-height, ${this.options.guide.height}) !important;
            border: var(--_access-menu-read-guide-border, solid 3px ${this.options.guide.cBorder});
            border-radius: 5px;
            top: 15px;
            z-index: 2147483647;
        }`;
        if (injectFull) {
        css = `
            ._access-scrollbar::-webkit-scrollbar-track, .mat-autocomplete-panel::-webkit-scrollbar-track, .mat-tab-body-content::-webkit-scrollbar-track, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-track, .mat-menu-panel::-webkit-scrollbar-track {
                -webkit-box-shadow: var(--_access-scrollbar-track-box-shadow, inset 0 0 6px rgba(0,0,0,0.3));
                background-color: var(--_access-scrollbar-track-background-color, #F5F5F5);
            }
            ._access-scrollbar::-webkit-scrollbar, .mat-autocomplete-panel::-webkit-scrollbar, .mat-tab-body-content::-webkit-scrollbar, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar, .mat-menu-panel::-webkit-scrollbar {
                width: var(--_access-scrollbar-width, 6px);
                background-color: var(--_access-scrollbar-background-color, #F5F5F5);
            }
            ._access-scrollbar::-webkit-scrollbar-thumb, .mat-autocomplete-panel::-webkit-scrollbar-thumb, .mat-tab-body-content::-webkit-scrollbar-thumb, .mat-select-panel:not([class*='mat-elevation-z'])::-webkit-scrollbar-thumb, .mat-menu-panel::-webkit-scrollbar-thumb {
                background-color: var(--_access-scrollbar-thumb-background-color, #999999);
            }
            ._access-icon {
                position: var(--_access-icon-position, fixed);
                width: var(--_access-icon-width, 50px);
                height: var(--_access-icon-height, 50px);
                bottom: var(--_access-icon-bottom, 50px);
                top: var(--_access-icon-top, unset);
                left: var(--_access-icon-left, unset);
                right: var(--_access-icon-right, 10px);
                z-index: var(--_access-icon-z-index, 9999);
                font: var(--_access-icon-font, 40px / 45px "Material Icons");
                background: var(--_access-icon-bg, #4054b2);
                color: var(--_access-icon-color, #fff);
                background-repeat: no-repeat;
                background-size: contain;
                cursor: pointer;
                opacity: 0;
                transition-duration: .35s;
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                ${!this.options.icon.useEmojis ? 'box-shadow: 1px 1px 5px rgba(0,0,0,.5);' : ''}
                transform: ${!this.options.icon.useEmojis ? 'scale(1)' : 'skewX(14deg)'};
                border-radius: var(--_access-icon-border-radius);
                border: var(--_access-icon-border);
                text-align: var(--_access-icon-text-align, center);
            }
            ._access-icon:hover {
                transform: var(--_access-icon-transform-hover, scale(1.1));
                vertical-align: var(--_access-icon-vertical-align-hover);
            }
            ._access-menu {
                -moz-user-select: none;
                -webkit-user-select: none;
                -ms-user-select: none;
                user-select: none;
                position: fixed;
                width: var(--_access-menu-width, ${Accessibility.MENU_WIDTH});
                height: var(--_access-menu-height, auto);
                transition-duration: var(--_access-menu-transition-duration, .35s);
                z-index: var(--_access-menu-z-index, 99991);
                opacity: 1;
                background-color: var(--_access-menu-background-color, #fff);
                color: var(--_access-menu-color, #000);
                border-radius: var(--_access-menu-border-radius, 3px);
                border: var(--_access-menu-border, solid 1px #f1f0f1);
                font-family: var(--_access-menu-font-family, RobotoDraft, Roboto, sans-serif, Arial);
                min-width: var(--_access-menu-min-width, 300px);
                box-shadow: var(--_access-menu-box-shadow, 0px 0px 1px #aaa);
                max-height: calc(100vh - 80px);
                ${(getComputedStyle(this._body).direction === 'rtl' ? 'text-indent: -5px' : '')}
                top: var(--_access-menu-top, unset);
                left: var(--_access-menu-left, unset);
                bottom: var(--_access-menu-bottom, 0);
                right: var(--_access-menu-right, 0);
            }
            ._access-menu.close {
                z-index: -1;
                width: 0;
                opacity: 0;
                background-color: transparent;
                left: calc(-1 * var(--_access-menu-left), unset);
                right: calc(-1 * var(--_access-menu-width, ${Accessibility.MENU_WIDTH}));
            }
            ._access-menu ._text-center {
                font-size: var(--_access-menu-header-font-size, 22px);
                font-weight: var(--_access-menu-header-font-weight, nornal);
                margin: var(--_access-menu-header-margin, 20px 0 10px);
                padding: 0;
                color: var(--_access-menu-header-color, rgba(0,0,0,.87));
                letter-spacing: var(--_access-menu-header-letter-spacing, initial);
                word-spacing: var(--_access-menu-header-word-spacing, initial);
                text-align: var(--_access-menu-header-text-align, center);
            }
            ._access-menu ._menu-close-btn {
                left: 5px;
                color: #d63c3c;
                transition: .3s ease;
                transform: rotate(0deg);
                font-style: normal !important;
            }
            ._access-menu ._menu-reset-btn:hover,._access-menu ._menu-close-btn:hover {
                transform: var(--_access-menu-header-btn-hover-rotate, rotate(180deg));
            }
            ._access-menu ._menu-reset-btn {
                right: 5px;
                color: #4054b2;
                transition: .3s ease;
                transform: rotate(0deg);
                font-style: normal !important;
            }
            ._access-menu ._menu-btn {
                position: absolute;
                top: 5px;
                cursor: pointer;
                font-size: 24px !important;
                font-weight: bold;
                background: transparent;
                border: none;
            }
            ._access-menu ul {
                padding: 0 0 5px;
                position: relative;
                font-size: var(--_access-menu-font-size, 18px);
                margin: 0;
                overflow: auto;
                max-height: var(--_access-menu-max-height, calc(100vh - 145px));
                display: flex;
                flex-flow: column;
                gap: 5px;
            }
            ${mandatory}
            ._access-menu ul li {
                position: relative;
                list-style-type: none;
                -ms-user-select: none;
                -moz-user-select: none;
                -webkit-user-select: none;
                user-select: none;
                margin: 0 5px 0 8px;
                font: { size: 18, units: 'px' }
                font-size: var(--_access-menu-item-font-size, 18px) !important;
                line-height: var(--_access-menu-item-line-height, 18px) !important;
                color: var(--_access-menu-item-color, rgba(0,0,0,.6));
                letter-spacing: var(--_access-menu-item-letter-spacing, initial);
                word-spacing: var(--_access-menu-item-word-spacing, initial);
                width: calc(100% - 17px);
            }
            ._access-menu ul li button {
                background: var(--_access-menu-item-button-background, #f9f9f9);
                padding: var(--_access-menu-item-button-padding, 10px 0);
                width: 100%;
                text-indent: var(--_access-menu-item-button-text-indent, 35px);
                text-align: start;
                position: relative;
                transition-duration: var(--_access-menu-item-button-transition-duration, .35s);
                transition-timing-function: var(--_access-menu-item-button-transition-timing-function, ease-in-out);
                border: var(--_access-menu-item-button-border, solid 1px #f1f0f1);
                border-radius: var(--_access-menu-item-button-border-radius, 4px);
                cursor: pointer;
            }
            ._access-menu ul li.position {
                display: inline-block;
                width: auto;
            }
            ._access-menu ul.before-collapse li button {
                opacity: var(--_access-menu-item-button-before-collapse-opacity, 0.05);
            }
            ._access-menu ul li button.active, ._access-menu ul li button.active:hover {
                background-color: var(--_access-menu-item-button-active-background-color, #000);
            }
            ._access-menu div.active {
                color: var(--_access-menu-div-active-color, #fff);
                background-color: var(--_access-menu-div-active-background-color, #000);
            }
            ._access-menu ul li button.active, ._access-menu ul li button.active:hover, ._access-menu ul li button.active:before, ._access-menu ul li button.active:hover:before {
                color: var(--_access-menu-item-button-active-color, #fff);
            }
            ._access-menu ul li button:hover {
                color: var(--_access-menu-item-button-hover-color, rgba(0,0,0,.8));
                background-color: var(--_access-menu-item-button-hover-background-color, #eaeaea);
            }
            ._access-menu ul li.not-supported {
                display: none;
            }
            ._access-menu ul li button:before {
                content: ' ';
                font-family: var(--_access-menu-button-font-family-before, ${this._fixedDefaultFont});
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
                top: 7px;
                left: 5px;
                position: absolute;
                color: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));
                direction: ltr;
                text-indent: 0;
                transition-duration: .35s;
                transition-timing-function: ease-in-out;
            }
            ._access-menu ul li button svg path {
                fill: var(--_access-menu-item-icon-color, rgba(0,0,0,.6));
                transition-duration: .35s;
                transition-timing-function: ease-in-out;
            }
            ._access-menu ul li button:hover svg path {
                fill: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));
            }
            ._access-menu ul li button.active svg path {
                fill: var(--_access-menu-item-active-icon-color, #fff);
            }
            ._access-menu ul li:hover button:before {
                color: var(--_access-menu-item-hover-icon-color, rgba(0,0,0,.8));
            }
            ._access-menu ul li button.active button:before {
                color: var(--_access-menu-item-active-icon-color, #fff);
            }
            ._access-menu ul li button[data-access-action="increaseText"]:before {
                content: var(--_access-menu-item-icon-increase-text, ${!this.options.icon.useEmojis ? '"zoom_in"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-text-transform, unset);
                top: var(--_access-menu-item-icon-increase-text-top, ${iconTop});
                left: var(--_access-menu-item-icon-increase-text-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="decreaseText"]:before {
                content: var(--_access-menu-item-icon-decrease-text, ${!this.options.icon.useEmojis ? '"zoom_out"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, unset);
                top: var(--_access-menu-item-icon-decrease-text-spacing-top, ${iconTop});
                left: var(--_access-menu-item-icon-decrease-text-spacing-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="increaseTextSpacing"]:before {
                content: var(--_access-menu-item-icon-increase-text-spacing, ${!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-text-spacing-transform, rotate(90deg) translate(-7px, 2px));
                top: var(--_access-menu-item-icon-increase-text-spacing-top, 14px);
                left: var(--_access-menu-item-icon-increase-text-spacing-left, 0);
            }
            ._access-menu ul li button[data-access-action="decreaseTextSpacing"]:before {
                content: var(--_access-menu-item-icon-decrease-text-spacing, ${!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-text-spacing-transform, rotate(90deg) translate(-7px, 2px));
                top: var(--_access-menu-item-icon-decrease-text-spacing-top, 14px);
                left: var(--_access-menu-item-icon-decrease-text-spacing-left, 0);
            }
            ._access-menu ul li button[data-access-action="invertColors"]:before {
                content: var(--_access-menu-item-icon-invert-colors, ${!this.options.icon.useEmojis ? '"invert_colors"' : '"🎆"'});
                transform: var(--_access-menu-item-icon-invert-colors-transform, unset);
                top: var(--_access-menu-item-icon-invert-colors-top, ${iconTop});
                left: var(--_access-menu-item-icon-invert-colors-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="grayHues"]:before {
                content: var(--_access-menu-item-icon-gray-hues, ${!this.options.icon.useEmojis ? '"format_color_reset"' : '"🌫️"'});
                transform: var(--_access-menu-item-icon-gray-hues-transform, unset);
                top: var(--_access-menu-item-icon-gray-hues-top, ${iconTop});
                left: var(--_access-menu-item-icon-gray-hues-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="underlineLinks"]:before {
                content: var(--_access-menu-item-icon-underline-links, ${!this.options.icon.useEmojis ? '"format_underlined"' : '"🔗"'});
                transform: var(--_access-menu-item-icon-underline-links-transform, unset);
                top: var(--_access-menu-item-icon-underline-links-top, ${iconTop});
                left: var(--_access-menu-item-icon-underline-links-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="bigCursor"]:before {
                /*content: 'touch_app';*/
                content: var(--_access-menu-item-icon-big-cursor, inherit);
                transform: var(--_access-menu-item-icon-big-cursor-transform, unset);
                top: var(--_access-menu-item-icon-big-cursor-top, ${iconTop});
                left: var(--_access-menu-item-icon-big-cursor-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="readingGuide"]:before {
                content: var(--_access-menu-item-icon-reading-guide, ${!this.options.icon.useEmojis ? '"border_horizontal"' : '"↔️"'});
                transform: var(--_access-menu-item-icon-reading-guide-transform, unset);
                top: var(--_access-menu-item-icon-reading-guide-top, ${iconTop});
                left: var(--_access-menu-item-icon-reading-guide-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="textToSpeech"]:before {
                content: var(--_access-menu-item-icon-text-to-speech, ${!this.options.icon.useEmojis ? '"record_voice_over"' : '"⏺️"'});
                transform: var(--_access-menu-item-icon-text-to-speech-transform, unset);
                top: var(--_access-menu-item-icon-text-to-speech-top, ${iconTop});
                left: var(--_access-menu-item-icon-text-to-speech-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="speechToText"]:before {
                content: var(--_access-menu-item-icon-speech-to-text, ${!this.options.icon.useEmojis ? '"mic"' : '"🎤"'});
                transform: var(--_access-menu-item-icon-speech-to-text-transform, unset);
                top: var(--_access-menu-item-icon-speech-to-text-top, ${iconTop});
                left: var(--_access-menu-item-icon-speech-to-text-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="disableAnimations"]:before {
                content: var(--_access-menu-item-icon-disable-animations, ${!this.options.icon.useEmojis ? '"animation"' : '"🏃‍♂️"'});
                transform: var(--_access-menu-item-icon-disable-animations-transform, unset);
                top: var(--_access-menu-item-icon-disable-animations-top, ${iconTop});
                left: var(--_access-menu-item-icon-disable-animations-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="iframeModals"]:before {
                content: var(--_access-menu-item-icon-iframe-modals, ${!this.options.icon.useEmojis ? '"policy"' : '"⚖️"'});
                transform: var(--_access-menu-item-icon-iframe-transform, unset);
                top: var(--_access-menu-item-icon-iframe-top, ${iconTop});
                left: var(--_access-menu-item-icon-iframe-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="customFunctions"]:before {
                content: var(--_access-menu-item-icon-custom-functions, ${!this.options.icon.useEmojis ? '"psychology_alt"' : '"❓"'});
                transform: var(--_access-menu-item-icon-custom-functions-transform, unset);
                top: var(--_access-menu-item-icon-custom-functions-top, ${iconTop});
                left: var(--_access-menu-item-icon-custom-functions-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="increaseLineHeight"]:before {
                content: var(--_access-menu-item-icon-increase-line-height, ${!this.options.icon.useEmojis ? '"unfold_more"' : '"🔼"'});
                transform: var(--_access-menu-item-icon-increase-line-height-transform, unset);
                top: var(--_access-menu-item-icon-increase-line-height-top, ${iconTop});
                left: var(--_access-menu-item-icon-increase-line-height-left, ${iconLeft});
            }
            ._access-menu ul li button[data-access-action="decreaseLineHeight"]:before {
                content: var(--_access-menu-item-icon-decrease-line-height, ${!this.options.icon.useEmojis ? '"unfold_less"' : '"🔽"'});
                transform: var(--_access-menu-item-icon-decrease-line-height-transform, unset);
                top: var(--_access-menu-item-icon-decrease-line-height-top, ${iconTop});
                left: var(--_access-menu-item-icon-decrease-line-height-left, ${iconLeft});
            }`;
        }
        else {
            css = mandatory;
        }
        const className = Accessibility.CSS_CLASS_NAME;
        this._common.injectStyle(css, { className: className });
        this._common.deployedObjects.set(`.${className}`, false);
    }

    public removeCSS() {
        const existing = document.querySelector(`.${Accessibility.CSS_CLASS_NAME}`);
        if (existing)
            existing.remove();
    }

    injectIcon(): HTMLElement {
        // let fontSize = (this.options.icon.dimensions.width.size as number) * 0.8;
        // let lineHeight = (this.options.icon.dimensions.width.size as number) * 0.9;
        // let textIndent = (this.options.icon.dimensions.width.size as number) * 0.1;
        // let iStyle = `width: ${this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units}
        //     ;height: ${this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units}
        //     ;font-size: ${fontSize + this.options.icon.dimensions.width.units}
        //     ;line-height: ${lineHeight + this.options.icon.dimensions.width.units}
        //     ;text-indent: ${textIndent + this.options.icon.dimensions.width.units}
        //     ;background-color: ${!this.options.icon.useEmojis ? this.options.icon.backgroundColor : 'transparent'};color: ${this.options.icon.color}`;
        // for (let i in this.options.icon.position) {
        //     let pos = this.options.icon.position as any;
        //     pos = pos[i];
        //     iStyle += ';' + i + ':' + pos.size + pos.units;
        // }
        // iStyle += `;z-index: ${this.options.icon.zIndex}`;
        let className = `_access-icon ${this.options.icon.fontClass} _access`;
        let iconElem = this._common.jsonToHtml({
            type: 'i',
            attrs: {
                'class': className,
                // 'style': iStyle,
                'title': this.options.hotkeys.enabled ? this.parseKeys(this.options.hotkeys.keys.toggleMenu) : this.options.labels.menuTitle,
                'tabIndex': 0
            },
            children: [this.options.icon.imgElem]
        });

        this._body.appendChild(iconElem);
        this._common.deployedObjects.set('._access-icon', false);
        return iconElem;
    }

    parseKeys(arr: Array<any>) {
        return (this.options.hotkeys.enabled ? (this.options.hotkeys.helpTitles ? this.options.labels.hotkeyPrefix + arr.map(function (val) { return Number.isInteger(val) ? String.fromCharCode(val).toLowerCase() : val.replace('Key', ''); }).join('+') : '') : '');
    }

    injectMenu(): HTMLElement {
        const json = {
            type: 'div',
            attrs: {
                'class': '_access-menu close _access'
            },
            children: [
                {
                    type: 'p',
                    attrs: {
                        'class': '_text-center',
                        'role': 'presentation'
                    },
                    children: [
                        {
                            type: 'button',
                            attrs: {
                                'class': `_menu-close-btn _menu-btn ${this.options.icon.fontClass}`,
                                'style': `font-family: var(--_access-menu-close-btn-font-family, ${this._fixedDefaultFont})`,
                                'title': this.options.hotkeys.enabled ? this.parseKeys(this.options.hotkeys.keys.toggleMenu) : this.options.labels.closeTitle
                            },
                            children: [this.options.icon.closeIconElem]
                        },
                        {
                            type: '#text',
                            text: this.options.labels.menuTitle
                        },
                        {
                            type: 'button',
                            attrs: {
                                'class': `_menu-reset-btn _menu-btn ${this.options.icon.fontClass}`,
                                'style': `font-family: var(--_access-menu-reset-btn-font-family, ${this._fixedDefaultFont})`,
                                'title': this.options.labels.resetTitle
                            },
                            children: [this.options.icon.resetIconElem]
                        }
                    ]
                },
                {
                    type: 'ul',
                    attrs: {
                        'class': 'before-collapse _access-scrollbar'
                    },
                    children: [
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'increaseText',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.increaseText
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'decreaseText',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.decreaseText
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'increaseTextSpacing',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.increaseTextSpacing
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'decreaseTextSpacing',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.decreaseTextSpacing
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'increaseLineHeight',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.increaseLineHeight
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'decreaseLineHeight',
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.decreaseLineHeight
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'invertColors',
                                        'title': this.parseKeys(this.options.hotkeys.keys.invertColors),
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.invertColors
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'grayHues',
                                        'title': this.parseKeys(this.options.hotkeys.keys.grayHues),
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.grayHues
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'underlineLinks',
                                        'title': this.parseKeys(this.options.hotkeys.keys.underlineLinks),
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.underlineLinks
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'bigCursor',
                                        'title': this.parseKeys(this.options.hotkeys.keys.bigCursor),
                                        'tabIndex': '-1'
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
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'readingGuide',
                                        'title': this.parseKeys(this.options.hotkeys.keys.readingGuide),
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.readingGuide
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'li',
                            children: [
                                {
                                    type: 'button',
                                    attrs: {
                                        'data-access-action': 'disableAnimations',
                                        'title': this.parseKeys(this.options.hotkeys.keys.disableAnimations),
                                        'tabIndex': '-1'
                                    },
                                    children: [
                                        {
                                            type: '#text',
                                            text: this.options.labels.disableAnimations
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        } as IJsonToHtml;
        if (this.options.iframeModals) {
            this.options.iframeModals.forEach((im, i) => {
                const btn = {
                    type: 'li',
                    children: [
                        {
                            type: 'button',
                            attrs: {
                                'data-access-action': 'iframeModals',
                                'data-access-url': im.iframeUrl,
                                'tabIndex': '-1'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: im.buttonText
                                }
                            ]
                        }
                    ]
                } as IJsonToHtml;
                let icon = null;
                if (im.icon && !this.options.icon.useEmojis)
                    icon = im.icon;
                else if (im.emoji && this.options.icon.useEmojis)
                    icon = im.emoji;
                if (icon) {
                    btn.children[0].attrs['data-access-iframe-index'] = i;
                    const css = `._access-menu ul li button[data-access-action="iframeModals"][data-access-iframe-index="${i}"]:before {
                        content: "${icon}";
                    }`;
                    let className = '_data-access-iframe-index-' + i;
                    this._common.injectStyle(css, { className: className });
                    this._common.deployedObjects.set('.' + className, false);
                }
                if (this.options.modules.textToSpeech)
                    json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);
                else
                    json.children[1].children.push(btn);
            });
        }
        if (this.options.customFunctions) {
            this.options.customFunctions.forEach((cf, i) => {
                const btn = {
                    type: 'li',
                    children: [
                        {
                            type: 'button',
                            attrs: {
                                'data-access-action': 'customFunctions',
                                'data-access-custom-id': cf.id,
                                'data-access-custom-index': i,
                                'tabIndex': '-1'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: cf.buttonText
                                }
                            ]
                        }
                    ]
                } as IJsonToHtml;
                let icon = null;
                if (cf.icon && !this.options.icon.useEmojis)
                    icon = cf.icon;
                else if (cf.emoji && this.options.icon.useEmojis)
                    icon = cf.emoji;
                if (icon) {
                    const css = `._access-menu ul li button[data-access-action="customFunctions"][data-access-custom-id="${cf.id}"]:before {
                        content: "${icon}";
                    }`;
                    let className = '_data-access-custom-id-' + cf.id;
                    this._common.injectStyle(css, { className: className });
                    this._common.deployedObjects.set('.' + className, false);
                }
                if (this.options.modules.textToSpeech)
                    json.children[1].children.splice(json.children[1].children.length - 2, 0, btn);
                else
                    json.children[1].children.push(btn);
            });
        }
        let menuElem = this._common.jsonToHtml(json);

        this._body.appendChild(menuElem);
        setTimeout(function () {
            let ic = document.getElementById('iconBigCursor');
            if (ic) {
                ic.outerHTML = ic.outerHTML + '<svg version="1.1" id="iconBigCursorSvg" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512" style="position: absolute;width: 19px;height: 19px;top: 9px; left: 9px;" xml:space="preserve"><path d="M 423.547 323.115 l -320 -320 c -3.051 -3.051 -7.637 -3.947 -11.627 -2.304 s -6.592 5.547 -6.592 9.856 V 480 c 0 4.501 2.837 8.533 7.083 10.048 c 4.224 1.536 8.981 0.192 11.84 -3.285 l 85.205 -104.128 l 56.853 123.179 c 1.792 3.883 5.653 6.187 9.685 6.187 c 1.408 0 2.837 -0.277 4.203 -0.875 l 74.667 -32 c 2.645 -1.131 4.736 -3.285 5.76 -5.973 c 1.024 -2.688 0.939 -5.675 -0.277 -8.299 l -57.024 -123.52 h 132.672 c 4.309 0 8.213 -2.603 9.856 -6.592 C 427.515 330.752 426.598 326.187 423.547 323.115 Z"/></svg>';
                document.getElementById('iconBigCursor').remove();
            }
        }, 1);
        this._common.deployedObjects.set('._access-menu', false);

        let closeBtn = document.querySelector('._access-menu ._menu-close-btn');
        ['click', 'keyup'].forEach(evt => {
            closeBtn.addEventListener(evt, (e: Event | KeyboardEvent) => {
                let et = e || window.event;
                if ((et as KeyboardEvent).detail === 0 && (et as KeyboardEvent).key !== 'Enter') return;
                this.toggleMenu();
            }, false);
        });

        let resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
        ['click', 'keyup'].forEach(evt => {
            resetBtn.addEventListener(evt, (e: Event | KeyboardEvent) => {
                let et = e || window.event;
                if ((et as KeyboardEvent).detail === 0 && (et as KeyboardEvent).key !== 'Enter') return;
                this.resetAll();
            }, false);
        });

        return menuElem;
    }

    getVoices(): Promise<SpeechSynthesisVoice[]> {
        return new Promise((resolve => {
            let synth = window.speechSynthesis;
            let id: ReturnType<typeof setInterval>;

            id = setInterval(() => {
                if (synth.getVoices().length !== 0) {
                    resolve(synth.getVoices());
                    clearInterval(id);
                }
            }, 10);
        }));
    }

    async injectTts(): Promise<void> {
        let voices = await this.getVoices();
        let isLngSupported = false;

        for (let i = 0; i < voices.length; i++) {
            if (voices[i].lang === this.options.language.textToSpeechLang) {
                isLngSupported = true;
                break;
            }
        }

        if (isLngSupported) {
            let tts = this.common.jsonToHtml(
                {
                    type: 'li',
                    children: [
                        {
                            type: 'button',
                            attrs: {
                                'data-access-action': 'textToSpeech',
                                'title': this.parseKeys(this.options.hotkeys.keys.textToSpeech),
                                'tabIndex': '-1'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: this.options.labels.textToSpeech
                                }
                            ]
                        },
                        {
                            type: 'div',
                            attrs: {
                                'class': 'screen-reader-wrapper',
                            },
                            children: [
                                {
                                    type: 'div',
                                    attrs: {
                                        'class': 'screen-reader-wrapper-step-1',
                                        'tabIndex': '-1'
                                    },
                                },
                                {
                                    type: 'div',
                                    attrs: {
                                        'class': 'screen-reader-wrapper-step-2',
                                        'tabIndex': '-1'
                                    },
                                },
                                {
                                    type: 'div',
                                    attrs: {
                                        'class': 'screen-reader-wrapper-step-3',
                                        'tabIndex': '-1'
                                    },
                                },

                            ]
                        },
                    ]
                }
            );
            let sts = this.common.jsonToHtml(
                {
                    type: 'li',
                    children: [
                        {
                            type: 'button',
                            attrs: {
                                'data-access-action': 'speechToText',
                                'title': this.parseKeys(this.options.hotkeys.keys.speechToText),
                                'tabIndex': '-1'
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
            );
            let ul = document.querySelector('._access-menu ul');
            ul.appendChild(sts);
            ul.appendChild(tts);
        }
    }

    addListeners() {
        let lis = document.querySelectorAll('._access-menu ul li');
        let step1 = document.getElementsByClassName('screen-reader-wrapper-step-1');
        let step2 = document.getElementsByClassName('screen-reader-wrapper-step-2');
        let step3 = document.getElementsByClassName('screen-reader-wrapper-step-3');

        for (let i = 0; i < lis.length; i++) {
            ['click', 'keyup'].forEach(evt =>
                lis[i].addEventListener(evt, (e: Event | KeyboardEvent) => {
                    let evt = e || window.event;
                    if ((evt as KeyboardEvent).detail === 0 && (evt as KeyboardEvent).key !== 'Enter') return;
                    this.invoke((evt.target as HTMLElement).getAttribute('data-access-action'), evt.target as HTMLElement);
                })
            );
        }

        [...Array.from(step1), ...Array.from(step2), ...Array.from(step3)].forEach(el =>
            el.addEventListener('click', (e: Event) => {
                let evt = e || window.event;
                this.invoke((evt.target as HTMLElement).parentElement.parentElement.getAttribute('data-access-action'), evt.target as HTMLElement);
            }, false)
        );
    }

    sortModuleTypes() {
        this.options.modulesOrder.sort((a: IAccessibilityModuleOrder, b: IAccessibilityModuleOrder) => {
            return a.order - b.order;
        });
    }

    disableUnsupportedModulesAndSort() {
        this.sortModuleTypes();
        let ul = document.querySelector('._access-menu ul');
        this.options.modulesOrder.forEach(item => {
            const i = item.type;
            const module = AccessibilityModulesType[i];
            let m = this.options.modules as any;
            m = m[module];
            let moduleLi = document.querySelector('button[data-access-action="' + module + '"]');
            if (moduleLi) {
                moduleLi.parentElement.remove();
                ul.appendChild(moduleLi.parentElement);
                if (!m)
                    moduleLi.parentElement.classList.add('not-supported');
            }
        });
    }

    resetAll() {
        this.menuInterface.textToSpeech(true);
        this.menuInterface.speechToText(true);
        this.menuInterface.disableAnimations(true);
        this.menuInterface.underlineLinks(true);
        this.menuInterface.grayHues(true);
        this.menuInterface.invertColors(true);
        this.menuInterface.bigCursor(true);
        this.menuInterface.readingGuide(true);
        this.resetTextSize();
        this.resetTextSpace();
        this.resetLineHeight();
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

    resetLineHeight() {
        this.resetIfDefined(this._stateValues.body.lineHeight, this.body.style, 'lineHeight');
        let all = document.querySelectorAll('[data-init-line-height]');

        for (let i = 0; i < all.length; i++) {
            (all[i] as HTMLElement).style.lineHeight = all[i].getAttribute('data-init-line-height');
            all[i].removeAttribute('data-init-line-height');
        }

        this.sessionState.lineHeight = 0;
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
        let factor = this.options.textSizeFactor;
        if (!isIncrease)
            factor *= -1;
        if (this.options.textPixelMode) {
            let all = document.querySelectorAll('*:not(._access)');

            for (let i = 0; i < all.length; i++) {
                let fSize = getComputedStyle(all[i]).fontSize;
                if (fSize && (fSize.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-font-size'))
                        all[i].setAttribute('data-init-font-size', fSize);
                }
            }
            for (let i = 0; i < all.length; i++) {
                let fSize = getComputedStyle(all[i]).fontSize;
                if (fSize && (fSize.indexOf('px') > -1)) {
                    fSize = parseInt(fSize.replace('px', '')) + factor as any;
                    (all[i] as HTMLElement).style.fontSize = fSize + 'px';
                }
                if (this._stateValues.textToSpeech) this.textToSpeech(`Text Size ${isIncrease ? 'Increased' : 'Decreased'}`);
            }

            // Also adjust the body font size
            let bodyFontSize = getComputedStyle(this._body).fontSize;
            if (bodyFontSize && (bodyFontSize.indexOf('px') > -1)) {
                if (!this._body.getAttribute('data-init-font-size'))
                    this._body.setAttribute('data-init-font-size', bodyFontSize);
                bodyFontSize = parseInt(bodyFontSize.replace('px', '')) + factor as any;
                (this._body as HTMLElement).style.fontSize = bodyFontSize + 'px';
            }
        }
        else if (this.options.textEmlMode) {
            let fp = this._html.style.fontSize;
            if (fp.indexOf('%')) {
                fp = parseInt(fp.replace('%', '')) as any;
                this._html.style.fontSize = (fp + factor) + '%';
                if (this._stateValues.textToSpeech) this.textToSpeech(`Text Size ${isIncrease ? 'Increased' : 'Decreased'}`);
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

    alterLineHeight(isIncrease: boolean) {
        this.sessionState.lineHeight += isIncrease ? 1 : -1;
        this.onChange(true);
        let factor = 2;
        if (!isIncrease)
            factor *= -1;
        if (this.options.textEmlMode)
            factor *= 10;

        let all = document.querySelectorAll('*:not(._access)');
        let exclude = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));

        for (let i = 0; i < all.length; i++) {
            if (exclude.includes(all[i])) {
                continue;
            }

            if (this.options.textPixelMode) {
                let lHeight = getComputedStyle(all[i]).lineHeight;
                if (lHeight && (lHeight.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-line-height'))
                        all[i].setAttribute('data-init-line-height', lHeight);
                    const newPixel = parseInt(lHeight.replace('px', '')) + factor;
                    (all[i] as HTMLElement).style.lineHeight = `${newPixel}px`;
                }
                if (this._stateValues.textToSpeech) this.textToSpeech(`Line Height ${isIncrease ? 'Increased' : 'Decreased'}`);
            }

            else if (this.options.textEmlMode) {
                let lTextSize = getComputedStyle(all[i]).fontSize;
                let lHeight = getComputedStyle(all[i]).lineHeight;
                if (lHeight === 'normal')
                    lHeight = (parseInt(lTextSize.replace('px', '')) * 1.2).toString() + 'px';
                let lHeight2 = lHeight.replace('px', '');
                let lTextSize2 = lTextSize.replace('px', '');
                let inPercent = (parseInt(lHeight2) * 100) / parseInt(lTextSize2);
                if (lHeight && (lHeight.indexOf('px') > -1)) {
                    if (!all[i].getAttribute('data-init-line-height'))
                        all[i].setAttribute('data-init-line-height', inPercent + '%');
                    inPercent = inPercent + factor;
                    (all[i] as HTMLElement).style.lineHeight = inPercent + '%';
                }
                if (this._stateValues.textToSpeech) this.textToSpeech(`Line height ${isIncrease ? 'Increased' : 'Decreased'}`);
            }
        }
    }

    alterTextSpace(isIncrease: boolean) {
        this._sessionState.textSpace += isIncrease ? 1 : -1;
        this.onChange(true);
        let factor = 2;
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
            if (this._stateValues.textToSpeech) this.textToSpeech(`Text Spacing ${isIncrease ? 'Increased' : 'Decreased'}`);
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
            if (this._stateValues.textToSpeech) this.textToSpeech(`Text Spacing ${isIncrease ? 'Increased' : 'Decreased'}`);
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
            this._recognition.lang = this.options.language.speechToTextLang;
            this._recognition.start();
        }
    }

    textToSpeech(text: string) {
        const windowAny = window as any;
        if (!windowAny.SpeechSynthesisUtterance || !windowAny.speechSynthesis) return;
        let msg = new windowAny.SpeechSynthesisUtterance(text);
        msg.lang = this.options.language.textToSpeechLang;
        msg.lang = this.options.textToSpeechLang;
        msg.rate = this._stateValues.speechRate;
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
        if (window.speechSynthesis.pending || window.speechSynthesis.speaking) {
            window.speechSynthesis.pause;
            window.speechSynthesis.cancel();
        }
        window.speechSynthesis.speak(msg);
        this._isReading = true;
    }

    createScreenShot(url: string): Promise<string> {
        return new Promise((resolve) => {
            let canvas = document.createElement('canvas');
            let img = new Image();
            canvas.style.position = 'fixed';
            canvas.style.top = '0';
            canvas.style.left = '0';
            canvas.style.opacity = '0';
            canvas.style.transform = 'scale(0.05)';
            img.crossOrigin = 'anonymous';
            img.onload = async () => {
                document.body.appendChild(canvas);
                const ctx = canvas.getContext('2d');
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0);
                let res;
                try {
                    res = canvas.toDataURL('image/png');
                } catch (e) { }
                resolve(res);
                canvas.remove();
            };
            img.onerror = () => {
                resolve(Common.DEFAULT_PIXEL);
            };
            img.src = url;
        });
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

        let allContent = Array.prototype.slice.call(document.querySelectorAll('._access-menu *'));
        for (const key in allContent) {
            if (allContent[key] === window.event.target && (e instanceof MouseEvent)) return;
        }
        if (e instanceof KeyboardEvent && (e.shiftKey && e.key === 'Tab' || e.key === 'Tab')) {
            this.textToSpeech((window.event.target as HTMLElement).innerText);
            return;
        }
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
                if (typeof (this.menuInterface as any)[name] === 'function') {
                    if ((this._options.modules as any)[name]) {
                        (this.menuInterface as any)[name](false);
                    }
                }
                break;
        }
    }
    toggleMenu() {
        const shouldClose = this._menu.classList.contains('close');
        setTimeout(() => {
            this._menu.querySelector('ul').classList.toggle('before-collapse');
        }, shouldClose ? 500 : 10);
        this._menu.classList.toggle('close');

        this.options.icon.tabIndex = shouldClose ? 0 : -1;
        this._menu.childNodes.forEach(child => {
            (child as HTMLElement).tabIndex = 0;
            if (child.hasChildNodes()) {
                (child as HTMLElement).tabIndex = -1;
                child.childNodes.forEach(li => {
                    (li as HTMLElement).tabIndex = shouldClose ? 0 : -1;
                });
            }
        });
    }

    invoke(action: string, button: HTMLElement) {
        if (typeof (this.menuInterface as any)[action] === 'function')
            (this.menuInterface as any)[action](undefined, button);
    }

    onKeyDown(e: KeyboardEvent) {
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
    }

    build() {
        this._stateValues = {
            underlineLinks: false,
            textToSpeech: false,
            bigCursor: false,
            readingGuide: false,
            speechRate: 1,
            body: {},
            html: {}
        };
        this._body = document.body || document.getElementsByTagName('body')[0] as any;
        this._html = document.documentElement || document.getElementsByTagName('html')[0];
        if (this.options.textEmlMode)
            this.initFontSize();
        this.injectCss(!this.options.suppressCssInjection && !this.options.suppressDomInjection);
        if (!this.options.suppressDomInjection) {
            this._icon = this.injectIcon();
            this._menu = this.injectMenu();
            this.injectTts();
            setTimeout(() => {
                this.addListeners();
                this.disableUnsupportedModulesAndSort();
            }, 10);
            if (this.options.hotkeys.enabled) {
                document.addEventListener('keydown', this._onKeyDownBind, false);
            }

            this._icon.addEventListener('click', () => {
                this.toggleMenu();
            }, false);
            this._icon.addEventListener('keyup', (event) => {
                if (event.key === 'Enter') {
                    this.toggleMenu();
                }
            }, false);
            setTimeout(() => {
                this._icon.style.opacity = '1';
            }, 10);
        }
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
            if (sessionState.lineHeight) {
                let lineHeight = sessionState.lineHeight;
                if (lineHeight > 0) {
                    while (lineHeight--) {
                        this.alterLineHeight(true);
                    }
                }
                else {
                    while (lineHeight++) {
                        this.alterLineHeight(false);
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
        document.removeEventListener('keydown', this._onKeyDownBind, false);
    }
}

(Accessibility as any).init = (opt?: IAccessibilityOptions) => {
    console.warn('"Accessibility.init()" is deprecated! Please use "new Accessibility()" instead');
    new Accessibility(opt);
};

export default Accessibility;