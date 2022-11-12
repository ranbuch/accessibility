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

### Full Documentation [here](https://ranbuch.github.io/accessibility/site/)

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

`var labels = {`
&nbsp;&nbsp;&nbsp;&nbsp;`resetTitle: 'reset (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`closeTitle: 'close (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`menuTitle: 'title (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseText: 'increase text size (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseText: 'decrease text size (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseTextSpacing: 'increase text spacing (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseTextSpacing: 'decrease text spacing (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseLineHeight: 'increase line height (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseLineHeight: 'decrease line height (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`invertColors: 'invert colors (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`grayHues: 'gray hues (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`underlineLinks: 'underline links (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`bigCursor: 'big cursor (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`readingGuide: 'reading guide (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`textToSpeech: 'text to speech (in my language)',`
&nbsp;&nbsp;&nbsp;&nbsp;`speechToText: 'speech to text (in my language)'`
&nbsp;&nbsp;&nbsp;&nbsp;`disableAnimations: 'disable animations (in my language)'`
`};`

`var options = { labels: labels };`
`options.textToSpeechLang = 'en-US'; // or any other language`
`options.speechToTextLang = 'en-US'; // or any other language`
`new Accessibility(options);`

### DISABLE FEATURES EXAMPLE:
`options.modules = {`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseText: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseText: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`invertColors: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseTextSpacing: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseTextSpacing: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`increaseLineHeight: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`decreaseLineHeight: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`grayHues: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`underlineLinks: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`bigCursor: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`readingGuide: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`textToSpeech: [true/false],`
&nbsp;&nbsp;&nbsp;&nbsp;`speechToText: [true/false]`
&nbsp;&nbsp;&nbsp;&nbsp;`disableAnimations: [true/false]`
`};`

>When the default is **true**

### TEXT SIZE MANIPULATION APPROACHES:
If text increase / decrease isn't working for your size your probably not using responsive font size units (such as em, rem etc.).  
In that case you can initialize the accessibility tool like this:  
`new Accessibility({textPixelMode: true})`

### ANIMATIONS:
Cancel all buttons animations:  
`new Accessibility({animations: {buttons: false}})`

### POSITIONING:
You can position the accessibility icon in any place on the screen. The default position is bottom right:
`var options = {`
&nbsp;&nbsp;&nbsp;&nbsp;`icon: {`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`position: {`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`bottom: { size: 50, units: 'px' },`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`right: { size: 0, units: 'px' },`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type: 'fixed'`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`
&nbsp;&nbsp;&nbsp;&nbsp;`}`
`}`
`new Accessibility(options);`
But you can also position the icon in the upper left corner of the screen and cancel the fixed positioning:
`var options = {`
&nbsp;&nbsp;&nbsp;&nbsp;`icon: {`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`position: {`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`top: { size: 2, units: 'vh' },`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`left: { size: 2, units: '%' },`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`type: 'absolute'`
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`}`
&nbsp;&nbsp;&nbsp;&nbsp;`}`
`}`
`new Accessibility(options);`

### ICON IMAGE:
You can change the default icon as described [here](https://ranbuch.github.io/accessibility/site/#icon-image)

### LICENSE:
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://spdx.org/licenses/MIT)
