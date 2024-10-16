'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Accessibility", {
  enumerable: true,
  get: function get() {
    return _main["default"];
  }
});
Object.defineProperty(exports, "AccessibilityModulesType", {
  enumerable: true,
  get: function get() {
    return _accessibility.AccessibilityModulesType;
  }
});
Object.defineProperty(exports, "IAccessibility", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibility;
  }
});
Object.defineProperty(exports, "IAccessibilityGuideOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityGuideOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityHotkeysKeysOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityHotkeysKeysOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityHotkeysOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityHotkeysOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityIconDimensionsOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityIconDimensionsOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityIconOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityIconOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityIconPositionOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityIconPositionOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityMenuDimensionsOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityMenuDimensionsOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityMenuLabelsOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityMenuLabelsOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityModulesOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityModulesOptions;
  }
});
Object.defineProperty(exports, "IAccessibilityOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilityOptions;
  }
});
Object.defineProperty(exports, "IAccessibilitySessionOptions", {
  enumerable: true,
  get: function get() {
    return _accessibility.IAccessibilitySessionOptions;
  }
});
Object.defineProperty(exports, "IMenuInterface", {
  enumerable: true,
  get: function get() {
    return _menu.IMenuInterface;
  }
});
Object.defineProperty(exports, "ISessionState", {
  enumerable: true,
  get: function get() {
    return _accessibility.ISessionState;
  }
});
Object.defineProperty(exports, "IStateValues", {
  enumerable: true,
  get: function get() {
    return _accessibility.IStateValues;
  }
});
var _main = _interopRequireDefault(require("./main"));
var _accessibility = require("./interfaces/accessibility.interface");
var _menu = require("./interfaces/menu.interface");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
if (typeof window !== 'undefined') window.Accessibility = _main["default"];