'use strict';
import Accessibility from './main';

if (typeof window !== 'undefined')
    (window as any).Accessibility = Accessibility;

export {
    Accessibility,
};


export * from './interfaces/accessibility.interface' 
export * from './interfaces/menu.interface';