'use strict';

export class Storage {
    constructor() {

    }

    has(key: string) {
        return window.localStorage.hasOwnProperty(key);
    }

    set(key: string, value: any) {
        window.localStorage.setItem(key, JSON.stringify(value));
    }

    get(key: string) {
        let item = window.localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    }

    clear() {
        window.localStorage.clear();
    }

    remove(key: string) {
        window.localStorage.removeItem(key);
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