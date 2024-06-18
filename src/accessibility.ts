'use strict';
import Accessibility from './main';
import {
    IAccessibility,
    IAccessibilityOptions,
    IAccessibilityIconOptions,
    IAccessibilityIconPositionOptions,
    IAccessibilityIconDimensionsOptions,
    IAccessibilityHotkeysOptions,
    IAccessibilityHotkeysKeysOptions,
    IAccessibilityGuideOptions,
    IAccessibilityMenuDimensionsOptions,
    IAccessibilityMenuLabelsOptions,
    IAccessibilityModulesOptions,
    IAccessibilitySessionOptions,
    ISessionState,
    IStateValues,
} from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';

if (typeof window !== 'undefined')
    (window as any).Accessibility = Accessibility;

export {
    Accessibility,
    IMenuInterface,
    IAccessibility,
    IAccessibilityOptions,
    IAccessibilityIconOptions,
    IAccessibilityIconPositionOptions,
    IAccessibilityIconDimensionsOptions,
    IAccessibilityHotkeysOptions,
    IAccessibilityHotkeysKeysOptions,
    IAccessibilityGuideOptions,
    IAccessibilityMenuDimensionsOptions,
    IAccessibilityMenuLabelsOptions,
    IAccessibilityModulesOptions,
    IAccessibilitySessionOptions,
    ISessionState,
    IStateValues,
};
