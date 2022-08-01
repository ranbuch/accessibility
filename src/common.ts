'use strict';

import { ICommon, IDeployedObjects, IFormattedDim, IInjectStyleOptions, IJsonToHtml } from './interfaces/common.interface';

export class Common implements ICommon {
    private body: HTMLBodyElement;
    private deployedMap: Map<string, boolean>;
    private _isIOS: boolean;
    constructor() {
        this.body = document.body || (document.querySelector('body') as any);
        this.deployedMap = new Map<string, boolean>();
    }

    isIOS() {
        if (typeof this._isIOS === 'boolean')
            return this._isIOS;
        const isIOS = () => {
            var iDevices = [
                'iPad Simulator',
                'iPhone Simulator',
                'iPod Simulator',
                'iPad',
                'iPhone',
                'iPod'
            ];

            if (!!navigator.platform) {
                while (iDevices.length) {
                    if (navigator.platform === iDevices.pop()) { return true; }
                }
            }

            return false;
        };
        this._isIOS = isIOS();
        return this._isIOS;
    }

    jsonToHtml(obj: IJsonToHtml) {
        let elm = document.createElement(obj.type);
        for (let i in obj.attrs) {
            elm.setAttribute(i, obj.attrs[i]);
        }
        for (let i in obj.children) {
            let newElem = null as any;
            if (obj.children[i].type === '#text') {
                newElem = document.createTextNode(obj.children[i].text);
            }
            else
                newElem = this.jsonToHtml(obj.children[i]);
            if ((newElem && newElem.tagName && newElem.tagName.toLowerCase() !== 'undefined') || newElem.nodeType === 3)
                elm.appendChild(newElem);
        }
        return elm;
    }

    injectStyle(css: string, innerOptions = {} as IInjectStyleOptions) {
        let sheet = document.createElement('style');
        sheet.appendChild(document.createTextNode(css));
        if (innerOptions.className)
            sheet.classList.add(innerOptions.className);
        this.body.appendChild(sheet);
        return sheet;
    }

    getFormattedDim(value: string): IFormattedDim {
        if (!value) return null;

        value = String(value);

        let returnBySuffix = function (val: string, suffix: string): IFormattedDim {
            return {
                size: val.substring(0, val.indexOf(suffix)),
                suffix: suffix
            };
        };

        if (value.indexOf('%') > -1)
            return returnBySuffix(value, '%');
        if (value.indexOf('px') > -1)
            return returnBySuffix(value, 'px');
        if (value.indexOf('em') > -1)
            return returnBySuffix(value, 'em');
        if (value.indexOf('rem') > -1)
            return returnBySuffix(value, 'rem');
        if (value.indexOf('pt') > -1)
            return returnBySuffix(value, 'pt');
        if (value === 'auto')
            return returnBySuffix(value, '');
    }

    extend(src: any, dest: any) {
        for (let i in src) {
            if (typeof src[i] === 'object') {
                if (dest && dest[i])
                    src[i] = this.extend(src[i], dest[i]);
            }
            else if (typeof dest === 'object' && typeof dest[i] !== 'undefined') {
                src[i] = dest[i];
            }
        }
        return src;
    }

    injectIconsFont(urls: Array<string>, callback: Function) {
        if (urls && urls.length) {
            let head = document.getElementsByTagName('head')[0];
            let counter = 0;
            let hasErrors = false;
            let onload = (e: Event) => {
                hasErrors = hasErrors || e.type === '';
                if (!--counter)
                    callback(hasErrors);
            };
            urls.forEach(url => {
                let link = document.createElement('link');
                link.type = 'text/css';
                link.rel = 'stylesheet';
                link.href = url;
                link.className = `_access-font-icon-${counter++}`;
                link.onload = onload;
                link.onerror = onload;
                this.deployedObjects.set('.' + link.className, true);
                head.appendChild(link);
            });
        }
    }

    getFixedFont(name: string) {
        if (this.isIOS())
            return (name as any).replaceAll(' ', '+');
        return name;
    }

    getFixedPseudoFont(name: string) {
        if (this.isIOS())
            return (name as any).replaceAll('+', ' ');
        return name;
    }

    isFontLoaded(fontFamily?: string, callback?: Function) {
        try {
            const onReady = () => {
                return callback((document as any).fonts.check(`1em ${(fontFamily as any).replaceAll('+', ' ')}`));
                // return callback(document.fonts.check(`1em ${fontFamily}`));
            };
            (document as any).fonts.ready.then(() => {
                onReady();
            }, () => {
                onReady();
            });
        }
        catch (e) {
            return callback(true);
        }
    }

    warn(msg: string) {
        let prefix = 'Accessibility: ';
        if (console.warn)
            console.warn(prefix + msg);
        else
            console.log(prefix + msg);
    }

    get deployedObjects(): IDeployedObjects {
        return {
            get: (key: string) => {
                return this.deployedMap.get(key);
            },
            contains: (key: string) => {
                return this.deployedMap.has(key);
            },
            set: (key: string, val: boolean) => {
                this.deployedMap.set(key, val);
            },
            remove: (key: string) => {
                this.deployedMap.delete(key);
            },
            getAll: () => {
                return this.deployedMap;
            }
        };
    }
}