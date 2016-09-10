# accessibility
add accessibility to your website

### alpha version!
  * first copy and past /dist/accessibility.min.js to your site (with dev tools)
  * then enter window.Accessibility.init();
  * works for your site? use it! not working? open an issue or request a feature

###DESCRIPTION:
* increase text size
* decrease text size
* invert colors
* gray hues
* underline links
* text to speech 

###USAGE:

`npm install accessibility`

include script:
`<script type="text/javascript" src="node_modules/accessibility/dist/accessibility.min.js"></script>`
initialize component:
`window.addEventListener('load', function() {
    window.Accessibility.init();
}, false);`

###multi language?
var labels = {
    menuTitle: 'title (in my language)',
    increaseText: 'increase text size (in my language)',
    decreaseText: 'decrease text size (in my language)',
    invertColors: 'invert colors (in my language)',
    grayHues: 'gray hues (in my language)',
    underlineLinks: 'underline links (in my language)',
    textToSpeech: 'text to speech (in my language)'
};
var options = {labels};
window.Accessibility.init(options);