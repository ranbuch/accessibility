'use strict';

export class Storage {
    constructor() {

    }

    has(key: string) {
        return globalThis.localStorage.hasOwnProperty(key);
    }

    set(key: string, value: any) {
        globalThis.localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string) {
        let item = globalThis.localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }

    clear() {
        globalThis.localStorage.clear();
    }

    remove(key: string) {
        globalThis.localStorage.removeItem(key);
    }

    isSupported() {
        let test = '_test';
        try {
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (e) {
            return false;
        }
    }
}
