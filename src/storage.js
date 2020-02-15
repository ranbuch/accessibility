'use strict';

let storage = {
    has(key) {
        return window.localStorage.hasOwnProperty(key);
    },
    set(key, value) {
        window.localStorage.setItem(key, JSON.stringify(value));
    },
    get(key) {
        let item = window.localStorage.getItem(key);
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return item;
        }
    },
    clear() {
        window.localStorage.clear();
    },
    remove(key) {
        window.localStorage.removeItem(key);
    },
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

export default storage;