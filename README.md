## ACCESSIBILITY
>Add **accessibility toolbar** to your website with one line of code!

![Alt text](https://raw.githubusercontent.com/ranbuch/accessibility/master/accessibility.png "accessibility icon")

### USAGE:

`npm install accessibility`

include script:
`<script type="text/javascript" src="node_modules/accessibility/dist/main.bundle.js"></script>`

or import:
`import { Accessibility } from 'accessibility';`

initialize component:
`window.addEventListener('load', function() {
    new Accessibility();
}, false);`

### Full Documentation and [demo](https://ranbuch.github.io/accessibility/site/)

>We are proud to announce that [Joomla!](https://www.joomdev.com/blog/entry/enable-joomla-4-accessibility) are now using this repo as there built-in accessibility tool.

### DESCRIPTION:
**Features:**
- [x]  increase text size
- [x]  decrease text size
- [x]  increase line height
- [x]  decrease line height
- [x]  invert colors
- [x]  gray hues
- [x]  underline links
- [x]  big cursor
- [x]  reading guide
- [x]  text to speech with 3 reading velocities
- [x]  speech to text
- [x]  suppress animations

>Does not depend any other directory (**jQuery is not required**).
Easy to use!

### LIMITATIONS & KNOWN ISSUES:
* Works with html5 browsers only (no IE8 and below)
* Text to speech & speech to text works in supported browsers and languages only

### MULTI LANGUAGE EXAMPLE:

```javascript
var labels = {
    resetTitle: 'reset (in my language)',
    closeTitle: 'close (in my language)',
    menuTitle: 'title (in my language)',
    increaseText: 'increase text size (in my language)',
    decreaseText: 'decrease text size (in my language)',
    increaseTextSpacing: 'increase text spacing (in my language)',
    decreaseTextSpacing: 'decrease text spacing (in my language)',
    increaseLineHeight: 'increase line height (in my language)',
    decreaseLineHeight: 'decrease line height (in my language)',
    invertColors: 'invert colors (in my language)',
    grayHues: 'gray hues (in my language)',
    underlineLinks: 'underline links (in my language)',
    bigCursor: 'big cursor (in my language)',
    readingGuide: 'reading guide (in my language)',
    textToSpeech: 'text to speech (in my language)',
    speechToText: 'speech to text (in my language)',
    disableAnimations: 'disable animations (in my language)',
    hotkeyPrefix: 'Hotkey: (in my language)',
};
```

```javascript
var options = { labels: labels };
options.textToSpeechLang = 'en-US'; // or any other language
options.speechToTextLang = 'en-US'; // or any other language
new Accessibility(options);
```

### DISABLE FEATURES EXAMPLE:
```javascript
options.modules = {
    decreaseText: [true/false],
    increaseText: [true/false],
    invertColors: [true/false],
    increaseTextSpacing: [true/false],
    decreaseTextSpacing: [true/false],
    increaseLineHeight: [true/false],
    decreaseLineHeight: [true/false],
    grayHues: [true/false],
    underlineLinks: [true/false],
    bigCursor: [true/false],
    readingGuide: [true/false],
    textToSpeech: [true/false],
    speechToText: [true/false],
    disableAnimations: [true/false]
};
```

>When the default is **true**

### TEXT SIZE MANIPULATION APPROACHES:
If text increase / decrease isn't working for your size your probably not using responsive font size units (such as em, rem etc.).  
In that case you can initialize the accessibility tool like this:  
```javascript
new Accessibility({textPixelMode: true})
```
You can change the factor of the font size difference between every iteration (default is 12.5):
```javascript
new Accessibility({textSizeFactor: 4})
```

### ANIMATIONS:
Cancel all buttons animations:  
```javascript
new Accessibility({animations: {buttons: false}})
```

### POSITIONING:
You can position the accessibility icon in any place on the screen. The default position is bottom right:
```css
body {
    --_access-icon-top: 50px;
    --_access-icon-left: 50px;
    --_access-icon-right: unset;
    --_access-icon-bottom: unset;
}
```


### ICON IMAGE:
You can change the default icon as described [here](https://ranbuch.github.io/accessibility/site/#icon-image)

### PERSISTENT SESSION:
From version 3.0.1 the session will be persistent even after the user will refresh the page.
To disable this feature use:
```javascript
const options = {
    session: {
        persistent: false
    }
};
new Accessibility(options);
```


### DIRECT ACCESS TO THE API:
You can toggle the menu buttons directly via the exposed API:
```javascript
var instance = new Accessibility();

instance.menuInterface.increaseText();

instance.menuInterface.decreaseText();

instance.menuInterface.increaseTextSpacing();

instance.menuInterface.decreaseTextSpacing();

instance.menuInterface.invertColors();

instance.menuInterface.grayHues();

instance.menuInterface.underlineLinks();

instance.menuInterface.bigCursor();

instance.menuInterface.readingGuide();

instance.menuInterface.textToSpeech();

instance.menuInterface.speechToText();

instance.menuInterface.disableAnimations();
```

You can also override the functionality like this:
```javascript
instance.menuInterface.increaseText = function() {
    // My own way to increase text size . . .
}
```

### ADD CUSTOM IFRAME:
You can add buttons that will open a model with custom iframes (for accessibility terms for example) like so:
```javascript
const options = {
    iframeModals: [{
        iframeUrl: 'https://github.com/ranbuch/accessibility',
        buttonText: 'terms',
        icon: 'favorite',
        emoji: '❤️'
    }
};
new Accessibility(options);
```

In case you will not provide the "icon" and the "emoji" we will use this setup:

icon: 'policy',
emoji: '⚖️'

You can find icons [here](https://mui.com/material-ui/material-icons/)

### ADD CUSTOM FUNCTIONS:
You can add buttons that will invoke custom functions like so:
```javascript
const options = {
    customFunctions: [{
        method: (cf, state) => {
            console.log('The provided customFunctions object:', cf);
            console.log('Toggle state:', state);
        },
        buttonText: 'my foo',
        id: 1,
        toggle: true,
        icon: 'psychology_alt',
        emoji: '❓'
    }
};
new Accessibility(options);
```

In case you will not provide the "icon" and the "emoji" we will use this setup:

icon: 'psychology_alt',
emoji: '❓'

You can find icons [here](https://mui.com/material-ui/material-icons/)

You have to provide the "id" parameter. This would also be your way to identify the button in case you are using more then on function while using the same custom function.

You have to provide the "toggle" parameter. This will determine whether the button will toggle his state active state (on and off) or not.







### CUSTOMIZE STYLING:
You can use CSS variables to change the styling of the menu. Here is an example of how you can change the exposed variables in order to change the theme to dark mode:
```css
:root {
    --_access-menu-background-color: #000;
    --_access-menu-item-button-background: #222;
    --_access-menu-item-color: rgba(255,255,255,.6);
    --_access-menu-header-color: rgba(255,255,255,.87);
    --_access-menu-item-button-active-color: #000;
    --_access-menu-item-button-active-background-color: #fff;
    --_access-menu-div-active-background-color: #fff;
    --_access-menu-item-button-hover-color: rgba(255,255,255,.8);
    --_access-menu-item-button-hover-background-color: #121212;
    --_access-menu-item-icon-color: rgba(255,255,255,.6);
    --_access-menu-item-hover-icon-color: rgba(255,255,255,.8);
    --_access-menu-item-active-icon-color: #000;
}
```

Alternatively, you can suppress the default CSS injection altogether (not recommended):
```javascript
new Accessibility({suppressCssInjection: true});
```
You can also replace the icons by replacing the content attribute with the CSS variables currently being used.

You can suppress the default HTML injection altogether:
```javascript
const instance = new Accessibility({suppressDomInjection: true});
```
You will need to provide your own DOM and call `menuInterface` functions.

You might need to replace the font-face-src:
```javascript
const options = {
    icon: {
        fontFaceSrc: ['https://fonts.bunny.net/icon?family=Material+Icons']
    }
};
new Accessibility(options);
```

Another example with font-awesome icons:
```javascript
const options = {
    icon: {
        fontFaceSrc: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/v4-font-face.min.css'],
        fontFamily: '"FontAwesome"',
        img: '[optional - URL for an image that will replace the menu icon]',
        closeIcon: '[optional - replacement text for the close menu icon]',
        resetIcon: '[optional - replacement text for the reset all icon]',
        closeIconElem: {
            type: 'i',
            attrs: {
                'class': 'fa fa-window-close',
                'aria-hidden': 'true'
            }
        },
        imgElem: {
            type: 'i',
            attrs: {
                'class': 'fa fa-universal-access',
                'aria-hidden': 'true'
            }
        },
        resetIconElem: {
            type: 'i',
            attrs: {
                'class': 'fa fa-refresh',
                'aria-hidden': 'true'
            }
        }
    }
};
new Accessibility(options);
```
```css
:root {
    --_access-menu-item-icon-increase-text: "\f062";
    --_access-menu-item-icon-decrease-text: "\f063";
}
```
Obviously you will need to add the missing variables for the rest of the fonts.

### CHANGE MODULES ORDER:
You can determine the order of the modules:
```javascript
new Accessibility({
    modulesOrder: [
        {
            type: AccessibilityModulesType.textToSpeech,
            order: 0
        }
    ]
});
```


### LICENSE:
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://spdx.org/licenses/MIT)
