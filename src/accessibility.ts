'use strict';
import Accessibility from './main';
import { IAccessibility, IAccessibilityOptions, IAccessibilityIconOptions, IAccessibilityIconPositionOptions, IAccessibilityIconDimensionsOptions, IAccessibilityHotkeysOptions, IAccessibilityHotkeysKeysOptions, IAccessibilityButtonsOptions, IAccessibilityGuideOptions, IAccessibilityMenuOptions, IAccessibilityMenuDimensionsOptions, IAccessibilityMenuLabelsOptions, IAccessibilityAnimationsOptions, IAccessibilityModulesOptions, IAccessibilitySessionOptions, ISessionState, IStateValues } from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';

if (window)
    (window as any).Accessibility = Accessibility;

export { Accessibility, IMenuInterface, IAccessibility, IAccessibilityOptions, IAccessibilityIconOptions, IAccessibilityIconPositionOptions, IAccessibilityIconDimensionsOptions, IAccessibilityHotkeysOptions, IAccessibilityHotkeysKeysOptions, IAccessibilityButtonsOptions, IAccessibilityGuideOptions, IAccessibilityMenuOptions, IAccessibilityMenuDimensionsOptions, IAccessibilityMenuLabelsOptions, IAccessibilityAnimationsOptions, IAccessibilityModulesOptions, IAccessibilitySessionOptions, ISessionState, IStateValues };