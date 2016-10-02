# Accessibility
>Add **accessibility toolbar** to your website with one line of code!

![Alt text](https://raw.githubusercontent.com/ranbuch/accessibility/master/accessibility.png "accessibility icon")

### beta version!
  * first copy and past /dist/accessibility.min.js to your site (via dev tools)
  * then enter `window.Accessibility.init();`
  * works for your site? use it! not working? open an issue or request a feature

### DESCRIPTION:
**Features:**
- [x]  increase text size
- [x]  decrease text size
- [x]  invert colors
- [x]  gray hues
- [x]  underline links
- [x]  text to speech 

>Does not depend any other directory (**jQuery is not required**).  
Easy to use!

### USAGE:

`npm install accessibility`

include script:  
`<script type="text/javascript" src="node_modules/accessibility/dist/accessibility.min.js"></script>`  
initialize component:  
`window.addEventListener('load', function() {
    window.Accessibility.init();
}, false);`

### LIMITATIONS:
* Works with html5 brousers only (no IE8 and below)
* Text to speech works in supported brousers and languages only

### multi language example:

`var labels = {`  
    `menuTitle: 'title (in my language)',
    increaseText: 'increase text size (in my language)',
    decreaseText: 'decrease text size (in my language)',
    invertColors: 'invert colors (in my language)',
    grayHues: 'gray hues (in my language)',
    underlineLinks: 'underline links (in my language)',
    textToSpeech: 'text to speech (in my language)'`  
    
`};`  

`var options = { labels: labels };`  
`options.textToSpeechLang = 'en-US'; // or any other language`  
`window.Accessibility.init(options);`

### disable features example:  
`options.modules = {`  
    `increaseText: [true/false],`  
    `decreaseText: [true/false],`  
    `invertColors: [true/false],`  
    `grayHues: [true/false],`  
    `underlineLinks: [true/false],`  
    `textToSpeech: [true/false]`
    
`};`

>When the default is **true**