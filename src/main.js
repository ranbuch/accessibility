'use strict';
import common from './common';

common.injectIconsCss();

let _options = {
    icon: {
        position: {
            bottom: { size: 50, units: 'px' },
            right: { size: 0, units: 'px' },
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
        circular: false
    },
    menu: {
        dimensions: {
            width: { size: 25, units: 'vw' },
            height: { size: 'auto', units: '' }
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
        textToSpeech: 'text to speech',
        speechToText: 'speech to text'
    },
    textToSpeechLang: 'en-US',
    speechToTextLang: 'en-US',
    textPixelMode: false,
    animations: {
        buttons: true
    },
    modules: {
        increaseText: true,
        decreaseText: true,
        invertColors: true,
        grayHues: true,
        underlineLinks: true,
        textToSpeech: true,
        speechToText: true
    }
};

let self = null;

class Accessibility {
    constructor(options = {}) {
        self = this;
        options = this.deleteOppositesIfDefined(options);
        this.options = common.extend(_options, options);
        this.disabledUnsupportedFeatures();
        this.build();
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
            common.warn('speech to text isn\'t supported in this brouser or in http protocol (https required)');
            this.options.modules.speechToText = false;
        }
        if (!window.SpeechSynthesisUtterance || !window.speechSynthesis) {
            common.warn('text to speech isn\'t supported in this brouser');
            this.options.modules.textToSpeech = false;
        }
        if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
            common.warn('grayHues isn\'t supported in firefox');
            this.options.modules.grayHues = false;
        }
    }

    injectCss() {
        let css = `
        ._access-icon {
            position: `+ this.options.icon.position.type + `;
            background-repeat: no-repeat;
            background-size: contain;
            cursor: pointer;
            opacity: 0;
            transition-duration: .5s;
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }
        .circular._access-icon {
            border-radius: 50%;
        }
        ._access-menu {
            -moz-user-select: none;
            -webkit-user-select: none;
            -ms-user-select: none;
            user-select: none;
            position: fixed;
            width: ` + this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units + `;
            height: ` + this.options.menu.dimensions.height.size + this.options.menu.dimensions.height.units + `;
            transition-duration: .5s;
            z-index: ` + this.options.icon.zIndex + 1 + `;
            opacity: 1;
            background-color: #fff;
            color: #000;
            border-radius: 3px;
            border: solid 2px gray;
            font-family: ` + this.options.menu.fontFamily + `;
            min-width: 300px;
            box-shadow: -2px -2px 3px #aaa;
            max-height: 100vh;
            ` + (getComputedStyle(this.body).direction == 'rtl' ? 'text-indent: -5px' : '') + `
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
            left: -` + this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units + `;
        }
        ._access-menu.right {
            right: 0;
        }
        ._access-menu.close.right {
            right: -` + this.options.menu.dimensions.width.size + this.options.menu.dimensions.width.units + `;
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
        }
        ._access-menu ._menu-close-btn {
            left: 5px;
            color: #d63c3c;
        }
        ._access-menu ._menu-reset-btn {
            right: 5px;
            color: #4054b2;
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
        }
        ._access-menu ul li {
            list-style-type: none;
            cursor: pointer;
            -ms-user-select: none;
            -moz-user-select: none;
            -webkit-user-select: none;
            user-select: none;
            border: solid 1px black;
            padding: 10px 0 10px 30px;
            margin: 5px;
            border-radius: 4px;
            transition-duration: .5s;
            transition-timing-function: ease-in-out;
            font-size: 18px !important;
            line-height: 18px !important;
            text-indent: 5px;
            background: #E0E1E2;
            color: rgba(0,0,0,.6);
        }
        ._access-menu ul.before-collapse li {
            opacity: 0.05;
        }
        ._access-menu ul.before-collapse li:nth-child(1) {
            transform: translate3d(0px, -45px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(2) {
            transform: translate3d(0px, -90px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(3) {
            transform: translate3d(0px, -135px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(4) {
            transform: translate3d(0px, -180px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(5) {
            transform: translate3d(0px, -225px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(6) {
            transform: translate3d(0px, -270px, 0px);
        }
        ._access-menu ul.before-collapse li:nth-child(7) {
            transform: translate3d(0px, -315px, 0px);
        }
        ._access-menu ul li.active, ._access-menu ul li.active:hover {
            color: #fff;
            background-color: #000;
        }
        ._access-menu ul li:hover {
            color: rgba(0,0,0,.8);
            background-color: #CACBCD;
        }
        ._access-menu ul li.not-supported {
            display: none;
        }
        ._access-menu ul li:before {
            content: ' ';
            font-family: 'Material Icons';
            text-rendering: optimizeLegibility;
            font-feature-settings: "liga" 1;
            font-style: normal;
            text-transform: none;
            line-height: 1;
            font-size: 24px !important;
            width: 24px;
            height: 24px;
            display: inline-block;
            overflow: hidden;
            -webkit-font-smoothing: antialiased;
            left: 8px;
            position: absolute;
            color: rgba(0,0,0,.6);
        }
        ._access-menu ul li:hover:before {
            color: rgba(0,0,0,.8);
        }
        ._access-menu ul li.active:before {
            color: #fff;
        }
        ._access-menu ul li[data-access-action="increaseText"]:before {
            content: 'zoom_in';
        }
        ._access-menu ul li[data-access-action="decreaseText"]:before {
            content: 'zoom_out';
        }
        ._access-menu ul li[data-access-action="invertColors"]:before {
            content: 'invert_colors';
        }
        ._access-menu ul li[data-access-action="grayHues"]:before {
            content: 'format_color_reset';
        }
        ._access-menu ul li[data-access-action="underlineLinks"]:before {
            content: 'format_underlined';
        }
        ._access-menu ul li[data-access-action="textToSpeech"]:before {
            content: 'record_voice_over';
        }
        ._access-menu ul li[data-access-action="speechToText"]:before {
            content: 'mic';
        }
        `;
        let className = '_access-main-css';
        common.injectStyle(css, { className: className });
        common.deployedObjects.set('.' + className, false);
    }

    injectIcon() {
        //let iStyle = `background-image: url("` + options.icon.src + `"); width: ` + options.icon.dimensions.width.size +
        let iStyle = `width: ` + this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units +
            `;height: ` + this.options.icon.dimensions.height.size + this.options.icon.dimensions.height.units +
            `;font-size: ` + this.options.icon.dimensions.width.size + this.options.icon.dimensions.width.units +
            `;background-color: ` + this.options.icon.backgroundColor + `;color: ` + this.options.icon.color;
        for (let i in this.options.icon.position) {
            iStyle += ';' + i + ':' + this.options.icon.position[i].size + this.options.icon.position[i].units;
        }
        iStyle += ';z-index: ' + this.options.icon.zIndex;
        let className = '_access-icon material-icons _access' + (this.options.icon.circular ? ' circular' : '');
        let iconElem = common.jsonToHtml({
            type: 'i',
            attrs: {
                'class': className,
                'style': iStyle
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

    // injectIconsCss() {
    //     let url = 'https://fonts.googleapis.com/icon?family=Material+Icons',
    //         head = document.getElementsByTagName('head')[0],
    //         link = document.createElement('link');
    //     link.type = "text/css";
    //     link.rel = "stylesheet";
    //     link.href = url;
    //     link.id = "_access-material-icons";
    //     //deployedSelectors.push(link.id);
    //     head.appendChild(link);
    // }

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
                                'class': '_menu-close-btn _menu-btn material-icons'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: 'close'
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
                                'class': '_menu-reset-btn _menu-btn material-icons'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: 'refresh'
                                }
                            ]
                        }
                    ]
                },
                {
                    type: 'ul',
                    attrs: {
                        'class': (this.options.animations.buttons ? 'before-collapse' : '')
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
                                'data-access-action': 'invertColors'
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
                                'data-access-action': 'grayHues'
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
                                'data-access-action': 'underlineLinks'
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
        this.resetTextSize();

        // for (let i of document.querySelectorAll('._access-menu ul li.active')) {
        //     i.classList.remove('active');
        // }
        //this.destroy();
    };

    resetTextSize() {
        this.resetIfDefined(this.initialValues.body.fontSize, this.body.style, 'fontSize');
        let all = document.querySelectorAll('[data-init-font-size]')

        for (let i = 0; i < all.length; i++) {
            all[i].style.fontSize = all[i].getAttribute('data-init-font-size');
            all[i].removeAttribute('data-init-font-size');
        }
    }

    alterTextSize(isIncrease) {
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
        else {
            let fSize = common.getFormattedDim(getComputedStyle(this.body).fontSize);
            if (typeof this.initialValues.body.fontSize === 'undefined')
                this.initialValues.body.fontSize = fSize.size + fSize.sufix;
            if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
                this.body.style.fontSize = ((fSize.size * 1) + factor) + fSize.sufix;
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
            body: {}
        };
        this.body = document.body || document.getElementsByTagName('body')[0];
        this.injectCss();
        this.icon = this.injectIcon();
        this.menu = this.injectMenu();
        this.addListeners();
        this.disableUnsupportedModules();
        //setMinHeight();

        this.icon.addEventListener('click', () => {
            this.toggleMenu();
        }, false);
        setTimeout(() => {
            this.icon.style.opacity = '1';
        }, 10);

        if (window.SpeechSynthesisUtterance || window.speechSynthesis) {
            let voices = window.speechSynthesis.getVoices();
        }

        this.menuInterface = {
            increaseText: () => {
                this.alterTextSize(true);
            },
            decreaseText: () => {
                this.alterTextSize(false);
            },
            invertColors: (destroy) => {
                if (typeof this.initialValues.body.backgroundColor === 'undefined')
                    this.initialValues.body.backgroundColor = getComputedStyle(this.body).backgroundColor;
                if (typeof this.initialValues.body.color === 'undefined')
                    this.initialValues.body.color = getComputedStyle(this.body).color;

                if (destroy) {
                    this.resetIfDefined(this.initialValues.body.backgroundColor, this.body.style, 'backgroundColor');
                    this.resetIfDefined(this.initialValues.body.color, this.body.style, 'color');
                    document.querySelector('._access-menu [data-access-action="invertColors"]').classList.remove('active');
                    this.initialValues.invertColors = false;
                    return;
                }


                document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
                this.initialValues.invertColors = !this.initialValues.invertColors;
                if (this.initialValues.invertColors) {
                    this.body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                    this.body.style.color = 'rgb(255, 255, 255)';
                }
                else {
                    this.body.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                    this.body.style.color = 'rgb(0, 0, 0)';
                }
            },
            grayHues: (destroy) => {
                if (typeof this.initialValues.body.filter === 'undefined')
                    this.initialValues.body.filter = getComputedStyle(this.body).filter;
                if (typeof this.initialValues.body.webkitFilter === 'undefined')
                    this.initialValues.body.webkitFilter = getComputedStyle(this.body).webkitFilter;
                if (typeof this.initialValues.body.mozFilter === 'undefined')
                    this.initialValues.body.mozFilter = getComputedStyle(this.body).mozFilter;
                if (typeof this.initialValues.body.msFilter === 'undefined')
                    this.initialValues.body.msFilter = getComputedStyle(this.body).msFilter;

                if (destroy) {
                    document.querySelector('._access-menu [data-access-action="grayHues"]').classList.remove('active');
                    this.initialValues.grayHues = false;
                    this.resetIfDefined(this.initialValues.body.filter, this.body.style, 'filter');
                    this.resetIfDefined(this.initialValues.body.webkitFilter, this.body.style, 'webkitFilter');
                    this.resetIfDefined(this.initialValues.body.mozFilter, this.body.style, 'mozFilter');
                    this.resetIfDefined(this.initialValues.body.msFilter, this.body.style, 'msFilter');
                    return;
                }

                document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active');
                this.initialValues.grayHues = !this.initialValues.grayHues;
                let val = this.initialValues.grayHues ? 'grayscale(1)' : 'grayscale(0)';
                this.body.style.webkitFilter = val;
                this.body.style.mozFilter = val;
                this.body.style.msFilter = val;
                this.body.style.filter = val;
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
                    document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.remove('active');
                    return remove();
                }

                document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active')
                this.initialValues.underlineLinks = !this.initialValues.underlineLinks;
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
            textToSpeech: (destroy) => {
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
                            content: 'mic';
                            font-family: 'Material Icons';
                            position: fixed;
                            z-index: 1100;
                            top: 1vw;
                            right: 1vw; 
                            width: 36px;
                            height: 36px;
                            font-size: 36px;
                            line-height: 36px;
                            border-radius: 50%;
                            background: rgba(255,255,255,0.7);
                        }

                        body._access-listening:after {
                            animation: _access-listening-animation 2s infinite;
                        }

                        @keyframes _access-listening-animation {
                            0%  {background-color: transparent;}
                            50%  {background-color: red;}
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
    }

    resetIfDefined(src, dest, prop) {
        if (typeof src !== 'undefined')
            dest[prop] = src;
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