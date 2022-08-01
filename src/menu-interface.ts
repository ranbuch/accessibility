import { IAccessibility } from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';

export class MenuInterface implements IMenuInterface {
    private _acc: IAccessibility;
    private readBind: any;
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


        document.querySelector('._access-menu [data-access-action="invertColors"]').classList.toggle('active');
        this._acc.stateValues.invertColors = !this._acc.stateValues.invertColors;
        this._acc.sessionState.invertColors = this._acc.stateValues.invertColors;
        this._acc.onChange(true);
        if (this._acc.stateValues.invertColors) {
            if (this._acc.stateValues.grayHues)
                this._acc.menuInterface.grayHues(true);
            this._acc.html.style.filter = 'invert(1)';
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
        let val;
        if (this._acc.stateValues.grayHues) {
            val = 'grayscale(1)';
            if (this._acc.stateValues.invertColors)
                this._acc.menuInterface.invertColors(true);
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
        }
        else {
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
        }
    }

    textToSpeech(destroy: boolean) {
        console.log('textToSpeech', destroy);
        // this.sessionState.textToSpeech = typeof destroy === 'undefined' ? true : false;
        this._acc.onChange(false);
        const className = '_access-text-to-speech';
        let remove = () => {
            let style = document.querySelector('.' + className);
            if (style) {
                style.parentElement.removeChild(style);
                document.removeEventListener('click', this.readBind, false);
                this._acc.common.deployedObjects.remove('.' + className);
            }
            if (window.speechSynthesis)
                window.speechSynthesis.cancel();
            this._acc.isReading = false;
        };

        if (destroy) {
            document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.remove('active');
            this._acc.stateValues.textToSpeech = false;
            return remove();
        }

        document.querySelector('._access-menu [data-access-action="textToSpeech"]').classList.toggle('active');

        this._acc.stateValues.textToSpeech = !this._acc.stateValues.textToSpeech;
        if (this._acc.stateValues.textToSpeech) {
            let css = `
                *:hover {
                    box-shadow: 2px 2px 2px rgba(180,180,180,0.7);
                }
            `;
            this._acc.common.injectStyle(css, { className: className });
            this._acc.common.deployedObjects.set('.' + className, true);
            document.addEventListener('click', this.readBind, false);
        }
        else {
            remove();
        }
    }

    speechToText(destroy: boolean) {
        // this.sessionState.speechToText = typeof destroy === 'undefined' ? true : false;
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
        };

        if (destroy) {
            document.querySelector('._access-menu [data-access-action="speechToText"]').classList.remove('active');
            this._acc.stateValues.speechToText = false;
            return remove();
        }

        document.querySelector('._access-menu [data-access-action="speechToText"]').classList.toggle('active');

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
        }
        else {
            remove();
        }
    }
}