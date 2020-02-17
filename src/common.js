'use strict';
let body = document.body || document.getElementsByTagName('body')[0];

let deployedMap = new Map();

let common = {
    jsonToHtml: (obj, reasource) => {
        let elm = document.createElement(obj.type);
        for (let i in obj.attrs) {
            if (i.indexOf('#') === 0 && reasource)
                elm.setAttribute(obj.attrs[i], reasource[i.substring(1)]);
            else
                elm.setAttribute(i, obj.attrs[i]);
        }
        for (let i in obj.children) {
            let newElem = null;
            if (obj.children[i].type == '#text') {
                if (obj.children[i].text.indexOf('#') == 0)
                    newElem = document.createTextNode(reasource[obj.children[i].text.substring(1)])
                else
                    newElem = document.createTextNode(obj.children[i].text);
            }
            else
                newElem = common.jsonToHtml(obj.children[i], reasource);
            if ((newElem && newElem.tagName && newElem.tagName.toLowerCase() !== 'undefined') || newElem.nodeType == 3)
                elm.appendChild(newElem);
        }
        return elm;
    },
    injectStyle: (css, innerOptions = {}) => {
        let sheet = document.createElement('style');
        sheet.appendChild(document.createTextNode(css));
        if (innerOptions.className)
            sheet.classList.add(innerOptions.className);
        body.appendChild(sheet);
        return sheet;
    },
    getFormattedDim: (value) => {
        if (!value) return null;

        value = String(value);

        let returnBySufix = function (val, sufix) {
            return {
                size: val.substring(0, val.indexOf(sufix)),
                sufix: sufix
            }
        }

        if (value.indexOf('%') > -1)
            return returnBySufix(value, '%');
        if (value.indexOf('px') > -1)
            return returnBySufix(value, 'px');
        if (value.indexOf('em') > -1)
            return returnBySufix(value, 'em');
        if (value.indexOf('rem') > -1)
            return returnBySufix(value, 'rem');
        if (value.indexOf('pt') > -1)
            return returnBySufix(value, 'pt');
        if (value == 'auto')
            return returnBySufix(value, '');
    },
    extend: (src, dest) => {
        for (let i in src) {
            if (typeof src[i] === 'object') {
                if (dest && dest[i])
                    src[i] = common.extend(src[i], dest[i]);
            }
            else if (typeof dest === 'object' && typeof dest[i] !== 'undefined') {
                src[i] = dest[i];
            }
        }
        return src;
    },
    injectIconsFont(urls, callback) {
        if (urls && urls.length) {
            let head = document.getElementsByTagName('head')[0];
            let counter = 0;
            let onload = () => {
                if (!--counter)
                    callback();
            }
            urls.forEach(url => {
                let link = document.createElement('link');
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = url;
                link.className = `_access-font-icon-${counter++}`;
                link.onload = onload;
                common.deployedObjects.set('.' + link.className, true);
                head.appendChild(link);
            });
        }
    },
    isFontLoaded(fontFamily, callback) {
		try {
			const onReady = () => {
				return callback(document.fonts.check(`1em ${fontFamily}`));
			}
			document.fonts.ready.then(() => {
				onReady();
			}, () => {
				onReady();
			});
		}
		catch (e) {
			return callback(true);
		}
	},
    warn(msg) {
        let prefix = 'Accessibility: ';
        if (console.warn)
            console.warn(prefix + msg);
        else
            console.log(prefix + msg);
    },
    deployedObjects: {
        get: (key) => {
            return deployedMap.get(key);
        },
        contains: (key) => {
            return deployedMap.has(key);
        },
        set: (key, val) => {
            deployedMap.set(key, val);
        },
        remove: (key) => {
            deployedMap.delete(key);
        },
        getAll: () => {
            return deployedMap;
        }
    }
};

export default common;