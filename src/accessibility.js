'use strict';
import common from './common';

(function () {
    let body = document.body || document.getElementsByTagName('body')[0];
    let menu = null;
    let icon = null;

    window.Accessibility = {};
    
    let options = {
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
        },
        textToSpeechLang: 'en-US',
        modules: {
            increaseText: true,
            decreaseText: true,
            invertColors: true,
            grayHues: true,
            underlineLinks: true,
            textToSpeech: true
        }
    };



    let injectCss = function () {
        let url = 'https://fonts.googleapis.com/icon?family=Material+Icons',
            head = document.getElementsByTagName('head')[0],
            link = document.createElement('link');
        link.type = "text/css";
        link.rel = "stylesheet"
        link.href = url;
        head.appendChild(link);

        let css = `
        ._access-icon {
            position: fixed;
            background-repeat: no-repeat;
            background-size: contain;
            cursor: pointer;
            opacity: 0;
            transition-duration: .5s;
        }
        ._access-menu {
            position: fixed;
            width: ` + options.menu.dimensions.width.size + options.menu.dimensions.width.units + `;
            height: ` + options.menu.dimensions.height.size + options.menu.dimensions.height.units + `;
            transition-duration: .5s;
            z-index: ` + options.icon.zIndex + 1 + `;
            opacity: 1;
            background-color: #fff;
            color: #000;
            border-radius: 3px;
            border: solid 2px gray;
            font-family: ` + options.menu.fontFamily + `;
            min-width: 300px;
            min-height: 385px;
            box-shadow: -2px -2px 3px #aaa;
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
            left: -` + options.menu.dimensions.width.size + options.menu.dimensions.width.units + `;
        }
        ._access-menu.right {
            right: 0;
        }
        ._access-menu.close.right {
            right: -` + options.menu.dimensions.width.size + options.menu.dimensions.width.units + `;
        }
        ._access-menu ._text-center {
            text-align: center;
        }
        ._access-menu h3 {
            font-size: 24px !important; 
            margin-top: 20px;
            margin-bottom: 20px;
            padding: 0;
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
            transition-duration: .3s;
            font-size: 18px !important;
            text-indent: 5px;
        }
        ._access-menu ul li.active, ._access-menu ul li.active:hover {
            color: #fff;
            background-color: #000;
        }
        ._access-menu ul li:hover {
            color: #fff;
            background-color: #444;
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
            color: rgba(100,100,100,0.7);
        }
        ._access-menu ul li:hover:before, ._access-menu ul li.active:before {
            color: rgba(200,200,200,0.7);
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
        `;
        common.injectStyle(css);
    }

    let injectIcon = function () {
        //let iStyle = `background-image: url("` + options.icon.src + `"); width: ` + options.icon.dimensions.width.size +
        let iStyle = `width: ` + options.icon.dimensions.width.size + options.icon.dimensions.width.units +
            `;height: ` + options.icon.dimensions.height.size + options.icon.dimensions.height.units +
            `;font-size: ` + options.icon.dimensions.width.size + options.icon.dimensions.width.units +
            `;background-color: ` + options.icon.backgroundColor + `;color: ` + options.icon.color;
        for (let i in options.icon.position) {
            iStyle += ';' + i + ':' + options.icon.position[i].size + options.icon.position[i].units;
        }
        iStyle += ';z-index: ' + options.icon.zIndex;
        let iconElem = common.jsonToHtml({
            type: 'i',
            attrs: {
                'class': '_access-icon material-icons _access',
                'style': iStyle
            },
            children: [
                {
                    type: '#text',
                    text: 'accessible'
                }
            ]
        });

        body.appendChild(iconElem);
        icon = iconElem;
        return iconElem;
    }

    let injectMenu = function () {
        let mStyle = ``;

        let menuElem = common.jsonToHtml({
            type: 'div',
            attrs: {
                'class': '_access-menu close _access',
                'style': mStyle
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
                            text: options.labels.menuTitle
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
                    children: [
                        {
                            type: 'li',
                            attrs: {
                                'data-access-action': 'increaseText'
                            },
                            children: [
                                {
                                    type: '#text',
                                    text: options.labels.increaseText
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
                                    text: options.labels.decreaseText
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
                                    text: options.labels.invertColors
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
                                    text: options.labels.grayHues
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
                                    text: options.labels.underlineLinks
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
                                    text: options.labels.textToSpeech
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        for (let i in options.icon.position) {
            menuElem.classList.add(i);
        }

        body.appendChild(menuElem);
        menu = menuElem;
        let closeBtn = document.querySelector('._access-menu ._menu-close-btn');
        closeBtn.addEventListener('click', toggleMenu, false);
        let resetBtn = document.querySelector('._access-menu ._menu-reset-btn');
        resetBtn.addEventListener('click', resetAll, false);

        return menuElem;
    }

    let initialValues = {
        underlineLinks: false,
        textToSpeech: false
    };

    let resetAll = () => {
        //resetTextSize();
        window.location.reload();
    };

    // TODO fix this method
    let resetTextSize = () => {
        if (!initialValues.fontSize) return;
        body.style.fontSize = initialValues.fontSize;

        // let all = document.querySelectorAll('[data-init-font-size]')

        // for (let i = 0; i < all.length; i++) {
        //     all[i].style.fontSize = all[i].getAttribute('data-init-font-size');
        //     all[i].removeAttribute('data-init-font-size');
        // }
    };

    let alterTextSize = (isIncrease) => {
        var factor = 2;
        if (!isIncrease)
            factor *= -1;
        let fSize = common.getFormattedDim(getComputedStyle(body).fontSize);
        if (!initialValues.fontSize)
            initialValues.fontSize = fSize;
        if (fSize && fSize.sufix && !isNaN(fSize.size * 1)) {
            body.style.fontSize = ((fSize.size * 1) + factor) + fSize.sufix;
        }

        // let all = document.querySelectorAll('*:not(._access)');

        // for (let i = 0; i < all.length; i++) {
        //     let fSize = getComputedStyle(all[i]).fontSize;
        //     if (fSize && (fSize.indexOf('px') > -1)) {
        //         if (!all[i].getAttribute('data-init-font-size'))
        //             all[i].setAttribute('data-init-font-size', fSize);
        //         fSize = (fSize.replace('px', '') * 1) + factor;
        //         all[i].style.fontSize = fSize + 'px';
        //     }
        // }
    };

    let textToSpeech = (text) => {
        if (!SpeechSynthesisUtterance || !window.speechSynthesis) return;
        let msg = new SpeechSynthesisUtterance(text);
        msg.lang = options.textToSpeechLang;
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
            let msg = 'text to speech language not supported!';
            if (console.warn)
                console.warn(msg);
            else
                console.log(msg);
        }
        window.speechSynthesis.speak(msg);
    };

    let read = () => {
        let className = '_access-text-to-speech';
        // let style = document.querySelector('.' + className);
        // if (style) {
        window.event.preventDefault();
        window.event.stopPropagation();
        textToSpeech(window.event.target.innerText);
        // }
    };

    let menuInterface = {
        increaseText: () => {
            alterTextSize(true);
        },
        decreaseText: () => {
            alterTextSize(false);
        },
        invertColors: () => {
            document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active')
            initialValues.invertColors = !initialValues.invertColors;
            if (initialValues.invertColors) {
                body.style.backgroundColor = 'rgba(0, 0, 0, 1)';
                body.style.color = 'rgb(255, 255, 255)';
            }
            else {
                body.style.backgroundColor = 'rgba(255, 255, 255, 1)';
                body.style.color = 'rgb(0, 0, 0)';
            }
        },
        grayHues: () => {
            document.querySelector('._access-menu [data-access-action="grayHues"]').classList.toggle('active')
            initialValues.grayHues = !initialValues.grayHues;
            let val = initialValues.grayHues ? 'grayscale(1)' : 'grayscale(0)';
            body.style.webkitFilter = val;
            body.style.mozFilter = val;
            body.style.msFilter = val;
            body.style.filter = val;
        },
        underlineLinks: () => {
            document.querySelector('._access-menu [data-access-action="underlineLinks"]').classList.toggle('active')
            let className = '_access-underline';
            initialValues.underlineLinks = !initialValues.underlineLinks;
            if (initialValues.underlineLinks) {
                let css = `
                    body a {
                        text-decoration: underline !important;
                    }
                `;
                common.injectStyle(css, { className: className });
            }
            else {
                let style = document.querySelector('.' + className);
                if (style)
                    style.parentElement.removeChild(style);
            }
        },
        textToSpeech: () => {
            document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle('active')
            let className = '_access-text-to-speech';
            let remove = () => {
                let style = document.querySelector('.' + className);
                if (style) {
                    style.parentElement.removeChild(style);
                    document.removeEventListener('click', read, false);
                }
            };

            initialValues.textToSpeech = !initialValues.textToSpeech;
            if (initialValues.textToSpeech) {
                let css = `
                    *:hover {
                        box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
                    }
                `;
                common.injectStyle(css, { className: className });
                document.addEventListener('click', read, false);
            }
            else {
                remove();
            }
        }
    };

    let toggleMenu = () => {
        menu.classList.toggle('close');
    };

    let invoke = (action) => {
        if (typeof menuInterface[action] === 'function')
            menuInterface[action]();
    };

    let addListeners = () => {
        let lis = document.querySelectorAll('._access-menu ul li');

        for (let i = 0; i < lis.length; i++) {
            lis[i].addEventListener('click', (self) => {
                invoke(window.event.target.getAttribute('data-access-action'));
            }, false);
        }
    };

    let disableUnsupportedModules = () => {
        for (let i in options.modules) {
            if (!options.modules[i]) {
                let moduleLi = document.querySelector('li[data-access-action="' + i + '"]');
                if (moduleLi) {
                    moduleLi.classList.add('not-supported');
                }
            }
        }
    };

    let setMinHeight = () => {
        try {
            let lis = document.querySelectorAll('._access-menu ul li.not-supported');
            let lih = 52 * lis.length;
            if (lih) {
                let menu = document.querySelector('._access-menu');
                let mh = getComputedStyle(menu).minHeight.replace('px', '') * 1;
                menu.style.minHeight = (mh - lih) + 'px';
            }
        }
        catch (e) { }
    };

    let init = function () {
        injectCss();
        injectIcon();
        injectMenu();
        addListeners();
        disableUnsupportedModules();
        setMinHeight();

        icon.addEventListener('click', toggleMenu, false);
        setTimeout(() => {
            icon.style.opacity = '1';
        }, 10);
    };

    window.Accessibility.init = function (_options) {
        options = common.extend(options, _options);
        init();
    };
})()