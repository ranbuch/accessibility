## ACCESSIBILITY
>Add **accessibility toolbar** to your website with one line of code!

![Alt text](https://raw.githubusercontent.com/ranbuch/accessibility/master/accessibility.png "accessibility icon")

### USAGE:

`npm install accessibility`

include script:  
`<script type="text/javascript" src="node_modules/accessibility/dist/accessibility.min.js"></script>`  

initialize component:  
`window.addEventListener('load', function() {
    new Accessibility();
}, false);`

### DESCRIPTION:
**Features:**
- [x]  increase text size
- [x]  decrease text size
- [x]  invert colors
- [x]  gray hues
- [x]  underline links
- [x]  text to speech 
- [x]  speech to text

>Does not depend any other directory (**jQuery is not required**).  
Easy to use!
  
more documentation [here](https://ranbuch.github.io/accessibility/)

### LIMITATIONS & KNOWN ISSUES:
* Works with html5 brousers only (no IE8 and below)
* Text to speech & speech to text works in supported brousers and languages only
* Gray hues is disabled in firefox due to a bug in firefox browser and will be enabled when it will be fixed

### MULTI LANGUAGE EXAMPLE:

`var labels = {`  
    `menuTitle: 'title (in my language)',
    increaseText: 'increase text size (in my language)',
    decreaseText: 'decrease text size (in my language)',
    invertColors: 'invert colors (in my language)',
    grayHues: 'gray hues (in my language)',
    underlineLinks: 'underline links (in my language)',
    textToSpeech: 'text to speech (in my language)',
    speechToText: 'speech to text (in my language)'`  
`};`  

`var options = { labels: labels };`  
`options.textToSpeechLang = 'en-US'; // or any other language`  
`options.speechToTextLang = 'en-US'; // or any other language`  
`new Accessibility(options);`

### DISABLE FEATURES EXAMPLE:  
`options.modules = {`  
    `increaseText: [true/false],`  
    `decreaseText: [true/false],`  
    `invertColors: [true/false],`  
    `grayHues: [true/false],`  
    `underlineLinks: [true/false],`  
    `textToSpeech: [true/false],`  
    `speechToText: [true/false]`  
`};`

>When the default is **true**

### TEXT SIZE MANIPULATION APPROACHES:
If text increase / decrease isn't working for your size your probablly not using responsive font size units (sutch as em, rem etc.).  
In that case you can initialize the accessibility tool like this:  
`new Accessibility({textPixelMode: true})`

### ANIMATIONS:
Cancel menu buttons animations:  
`new Accessibility({animations: {buttons: false}})`

### POSITIONING:
You can position the accessibility icon in any place on the screen. The default position is bottom right:  
`var options = {`  
    `icon: {`  
        `position: {`  
            `bottom: { size: 50, units: 'px' },`  
            `right: { size: 0, units: 'px' },`  
            `type: 'fixed'`  
        `}`  
    `}`  
`}`  
`new Accessibility(options);`  
But you can also position the icon in the upper left corner of the screen and cancel the fixed positioning:  
`var options = {`  
    `icon: {`  
        `position: {`  
            `top: { size: 2, units: 'vh' },`  
            `left: { size: 2, units: '%' },`  
            `type: 'absolute'`  
        `}`  
    `}`  
`}`  
`new Accessibility(options);`

### ICON IMAGE:
You can change the default icon as described [here](https://ranbuch.github.io/accessibility#icon-image)

### LICENSE:
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)](https://spdx.org/licenses/MIT)