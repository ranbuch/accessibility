import { IAccessibility } from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';

export class MenuInterface implements IMenuInterface {
    private _acc: IAccessibility;
    private readBind: any;
    private _dialog: HTMLDialogElement;
    constructor(accessibility: IAccessibility) {
        this._acc = accessibility;
        this.readBind = this._acc.read.bind(this._acc);
    }

    increaseText() {
        this._acc.alterTextSize(true);
    }

    decreaseText() {
        this._acc.alterTextSize(false);
    }

    increaseTextSpacing() {
        this._acc.alterTextSpace(true);
    }

    decreaseTextSpacing() {
        this._acc.alterTextSpace(false);
    }

    invertColors(destroy: boolean) {
        if (typeof this._acc.stateValues.html.backgroundColor === 'undefined')
            this._acc.stateValues.html.backgroundColor = getComputedStyle(this._acc.html).backgroundColor;
        if (typeof this._acc.stateValues.html.color === 'undefined')
            this._acc.stateValues.html.color = getComputedStyle(this._acc.html).color;

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

        if (this._acc.stateValues.invertColors && this._acc.stateValues.textToSpeech) {
            this._acc.textToSpeech('Colors Set To Normal');
        }
        document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
        this._acc.stateValues.invertColors = !this._acc.stateValues.invertColors;
        this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
        this._acc.onChange(true);
        if (this._acc.stateValues.invertColors) {
            if (this._acc.stateValues.grayHues)
                this._acc.menuInterface.grayHues(true);
            this._acc.html.style.filter = 'invert(1)';

            if (this._acc.stateValues.textToSpeech) {
                this._acc.textToSpeech('Colors Inverted');
            }
        }
        else {
            this._acc.html.style.filter = '';
        }
    }

    grayHues(destroy: boolean) {
        if (typeof this._acc.stateValues.html.filter === 'undefined')
            this._acc.stateValues.html.filter = getComputedStyle(this._acc.html).filter;
        if (typeof this._acc.stateValues.html.webkitFilter === 'undefined')
            this._acc.stateValues.html.webkitFilter = getComputedStyle(this._acc.html).webkitFilter;
        if (typeof this._acc.stateValues.html.mozFilter === 'undefined')
            this._acc.stateValues.html.mozFilter = (getComputedStyle(this._acc.html) as any).mozFilter;
        if (typeof this._acc.stateValues.html.msFilter === 'undefined')
            this._acc.stateValues.html.msFilter = (getComputedStyle(this._acc.html) as any).msFilter;

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
        if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.grayHues)
            this._acc.textToSpeech('Gray Hues Disabled.');
        let val;
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
        (this._acc.html.style as any).mozFilter = val;
        (this._acc.html.style as any).msFilter = val;
        this._acc.html.style.filter = val;
    }

    underlineLinks(destroy: boolean) {
        let className = '_access-underline';
        let remove = () => {
            let style = document.querySelector('.' + className);
            if (style) {
                style.parentElement.removeChild(style);
                this._acc.common.deployedObjects.remove('.' + className);
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
            let css = `
            body a {
                text-decoration: underline !important;
            }
        `;
            this._acc.common.injectStyle(css, { className: className });
            this._acc.common.deployedObjects.set('.' + className, true);
            if (this._acc.stateValues.textToSpeech) {
                this._acc.textToSpeech('Links UnderLined');
            }
        }
        else {
            if (this._acc.stateValues.textToSpeech) {
                this._acc.textToSpeech('Links UnderLine Removed');
            }
            remove();
        }
    }

    bigCursor(destroy: boolean) {
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
        if (this._acc.stateValues.textToSpeech && this._acc.stateValues.bigCursor) this._acc.textToSpeech('Big Cursor Enabled');
        if (this._acc.stateValues.textToSpeech && !this._acc.stateValues.bigCursor) this._acc.textToSpeech('Big Cursor Disabled');
    }

    readingGuide(destroy: boolean) {
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
            if (this._acc.stateValues.textToSpeech) this._acc.textToSpeech('Reading Guide Enabled');
            return;
        }
        document.querySelector('._access-menu [data-access-action="readingGuide"]').classList.toggle('active');
        this._acc.stateValues.readingGuide = !this._acc.stateValues.readingGuide;
        this._acc.sessionState.readingGuide = this._acc.stateValues.readingGuide;
        this._acc.onChange(true);
        if (this._acc.stateValues.readingGuide) {
            let read = document.createElement('div');
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

    textToSpeech(destroy: boolean) {
        // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;
        const tSpeechList = document.querySelector('._access-menu [data-access-action="textToSpeech"]');
        if (!tSpeechList) return;

        let step1 = document.getElementsByClassName('screen-reader-wrapper-step-1');
        let step2 = document.getElementsByClassName('screen-reader-wrapper-step-2');
        let step3 = document.getElementsByClassName('screen-reader-wrapper-step-3');
        this._acc.onChange(false);
        const className = '_access-text-to-speech';
        let remove = () => {
            let style = document.querySelector('.' + className);
            if (style) {
                style.parentElement.removeChild(style);
                document.removeEventListener('click', this.readBind, false);
                document.removeEventListener('keyup', this.readBind, false);
                this._acc.common.deployedObjects.remove('.' + className);
            }
            if (window.speechSynthesis)
                window.speechSynthesis.cancel();
            this._acc.isReading = false;
        };

        if (destroy) {
            tSpeechList.classList.remove('active');
            (step1[0] as HTMLElement).style.background = '#ffffff';
            (step2[0] as HTMLElement).style.background = '#ffffff';
            (step3[0] as HTMLElement).style.background = '#ffffff';
            this._acc.stateValues.textToSpeech = false;
            window.speechSynthesis.cancel();
            return remove();
        }

        if (this._acc.stateValues.speechRate === 1 && !tSpeechList.classList.contains('active')) {
            this._acc.stateValues.textToSpeech = true;
            this._acc.textToSpeech('Screen Reader enabled. Reading Pace - Normal');
            tSpeechList.classList.add('active');
            (step1[0] as HTMLElement).style.background = '#000000';
            (step2[0] as HTMLElement).style.background = '#000000';
            (step3[0] as HTMLElement).style.background = '#000000';
        }
        else if (this._acc.stateValues.speechRate === 1 && tSpeechList.classList.contains('active')) {
            this._acc.stateValues.speechRate = 1.5;
            this._acc.textToSpeech('Reading Pace - Fast');
            (step1[0] as HTMLElement).style.background = '#ffffff';
        }
        else if (this._acc.stateValues.speechRate === 1.5 && tSpeechList.classList.contains('active')) {
            this._acc.stateValues.speechRate = 0.7;
            this._acc.textToSpeech('Reading Pace - Slow');
            (step2[0] as HTMLElement).style.background = '#ffffff';
        } else {
            this._acc.stateValues.speechRate = 1;
            this._acc.textToSpeech('Screen Reader - Disabled');
            tSpeechList.classList.remove('active');
            (step3[0] as HTMLElement).style.background = '#ffffff';

            let timeout: ReturnType<typeof setInterval> = setInterval(() => {
                if (this._acc.isReading) {
                    return;
                }
                this._acc.stateValues.textToSpeech = false;

                remove();
                clearTimeout(timeout);
            }, 500);

            return;
        }

        let css = `
            *:hover {
                box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
            }
        `;

        if (tSpeechList.classList.contains('active') && this._acc.stateValues.speechRate === 1) {
            this._acc.common.injectStyle(css, { className: className });
            this._acc.common.deployedObjects.set('.' + className, true);
            document.addEventListener('click', this.readBind, false);
            document.addEventListener('keyup', this.readBind, false);
        }
    }

    speechToText(destroy: boolean) {
        // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
        const sTextList = document.querySelector('._access-menu [data-access-action="speechToText"]');
        if (!sTextList) return;

        this._acc.onChange(false);
        let className = '_access-speech-to-text';
        let remove = () => {
            if (this._acc.recognition) {
                this._acc.recognition.stop();
                this._acc.body.classList.remove('_access-listening');
            }
            let style = document.querySelector('.' + className);
            if (style) {
                style.parentElement.removeChild(style);
                this._acc.common.deployedObjects.remove('.' + className);
            }
            let inputs = document.querySelectorAll('._access-mic');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].removeEventListener('focus', this._acc.listen.bind(this._acc), false);
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
            let css = `
                body:after {
                    content: ${!this._acc.options.icon.useEmojis ? '"mic"' : '"🎤"'};
                    ${!this._acc.options.icon.useEmojis ? `font-family: '` + this._acc.options.icon.fontFamily + `';` : ''}
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
            this._acc.common.injectStyle(css, { className: className });
            this._acc.common.deployedObjects.set('.' + className, true);
            let inputs = document.querySelectorAll('input[type="text"], input[type="search"], textarea, [contenteditable]');
            for (let i = 0; i < inputs.length; i++) {
                inputs[i].addEventListener('blur', () => {
                    if (typeof this._acc.recognition === 'object' && typeof this._acc.recognition.stop === 'function')
                        this._acc.recognition.stop();
                }, false);
                inputs[i].addEventListener('focus', this._acc.listen.bind(this._acc), false);
                inputs[i].parentElement.classList.add('_access-mic');
            }
            sTextList.classList.add('active');
        }
        else
            remove();
    }

    disableAnimations(destroy: boolean) {
        const className = '_access-disable-animations', autoplayStopped = 'data-autoplay-stopped';

        const remove = () => {
            document.querySelector('._access-menu [data-access-action="disableAnimations"]').classList.remove('active');
            this._acc.stateValues.disableAnimations = false;
            let style = document.querySelector('.' + className);
            if (style) {
                style.parentElement.removeChild(style);
                this._acc.common.deployedObjects.remove('.' + className);
            }
            let allImages = document.querySelectorAll('[data-org-src]') as NodeListOf<HTMLImageElement>;
            allImages.forEach(async i => {
                const screenshot = i.src;
                i.setAttribute('src', i.getAttribute('data-org-src'));
                i.setAttribute('data-org-src', screenshot);
            });
            const allVideos = document.querySelectorAll(`video[${autoplayStopped}]`) as NodeListOf<HTMLVideoElement>;
            allVideos.forEach(v => {
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

        document.querySelector('._access-menu [data-access-action="disableAnimations"]').classList.add('active');
        let css = `
                body * {
                    animation-duration: 0.0ms !important;
                    transition-duration: 0.0ms !important;
                }
        `;
        this._acc.common.injectStyle(css, { className: className });
        this._acc.common.deployedObjects.set('.' + className, true);
        const allImages = document.querySelectorAll('img');
        allImages.forEach(async i => {
            let ext = this._acc.common.getFileExtension(i.src);
            if (ext && ext.toLowerCase() === 'gif') {
                let screenshot = i.getAttribute('data-org-src');
                if (!screenshot)
                    screenshot = await this._acc.common.createScreenshot(i.src);
                i.setAttribute('data-org-src', i.src);
                i.src = screenshot;
            }
        });
        const allVideos = document.querySelectorAll('video[autoplay]') as NodeListOf<HTMLVideoElement>;
        allVideos.forEach(v => {
            v.setAttribute(autoplayStopped, '');
            v.removeAttribute('autoplay');
            v.pause();
        });
    }

    iframeModals(destroy?: boolean, button?: HTMLElement) {
        if (!button)
            destroy = true;
        const close = () => {
            if (this._dialog) {
                this._dialog.classList.add('closing');
                setTimeout(() => {
                    this._dialog.classList.remove('closing');
                    this._dialog.close();
                    this._dialog.remove();
                }, 350);
                detach();
            }
            if (button)
                button.classList.remove('active');
        };
        const onClose = () => {
            close();
        };
        const detach = () => {
            this._dialog.querySelector('button').removeEventListener('click', onClose, false);
            this._dialog.removeEventListener('close', onClose);
        };
        if (destroy) {
            close();
        }
        else {
            button.classList.add('active');
            if (!this._dialog)
                this._dialog = document.createElement('dialog');
            this._dialog.classList.add('_access');
            this._dialog.innerHTML = '';
            this._dialog.appendChild(this._acc.common.jsonToHtml({
                type: 'div',
                children: [
                    {
                        type: 'div',
                        children: [
                            {
                                type: 'button',
                                attrs: {
                                    role: 'button',
                                    'class': this._acc.options.icon.useEmojis ? '' : 'material-icons',
                                    style: `position: absolute;
                                    top: 5px;
                                    cursor: pointer;
                                    font-size: 24px !important;
                                    font-weight: bold;
                                    background: transparent;
                                    border: none;
                                    left: 5px;
                                    color: #d63c3c;
                                    padding: 0;`
                                },
                                children: [
                                    {
                                        type: '#text',
                                        text: this._acc.options.icon.useEmojis ? 'X' : 'close'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        type: 'div',
                        children: [
                            {
                                type: 'iframe',
                                attrs: {
                                    src: button.getAttribute('data-access-url'),
                                    style: 'width: 50vw;height: 50vh;padding: 30px;'
                                }
                            }
                        ]
                    }
                ]
            }));
            document.body.appendChild(this._dialog);
            this._dialog.querySelector('button').addEventListener('click', onClose, false);
            this._dialog.addEventListener('close', onClose);
            this._dialog.showModal();
        }
    }

    customFunctions(destroy?: boolean, button?: HTMLElement) {
        if (!button)
            return;
        const cf = this._acc.options.customFunctions[parseInt(button.getAttribute('data-access-custom-index'))];
        if (cf.toggle && button.classList.contains('active'))
            destroy = true;
        if (destroy) {
            if (cf.toggle)
                button.classList.remove('active');
            cf.method(cf, false);
        }
        else {
            if (cf.toggle)
                button.classList.add('active');
            cf.method(cf, true);
        }
    }

    increaseLineHeight() {
        this._acc.alterLineHeight(true);
    }

    decreaseLineHeight() {
        this._acc.alterLineHeight(false);
    }
}