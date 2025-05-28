'use strict';
import Accessibility from './main.js';

if (typeof window !== 'undefined')
    (window as any).Accessibility = Accessibility;

export {
    Accessibility,
};


export * from './interfaces/accessibility.interface.js' 
export * from './interfaces/menu.interface.js';