var options = {
    hotkeys: {
        enabled: true
    },
    // icon: {
    //     closeIconElem: {
    //         type: 'i',
    //         attrs: {
    //             'class': 'fa fa-window-close',
    //             'aria-hidden': 'true'
    //         }
    //     },
    //     imgElem: {
    //         type: 'i',
    //         attrs: {
    //             'class': 'fa fa-universal-access',
    //             'aria-hidden': 'true'
    //         }
    //     },
    //     fontFaceSrc: ['https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/v4-font-face.min.css'],
    //     fontFamily: "'FontAwesome'"
    // },
    language: {
        textToSpeechLang: 'en-US',
        speechToTextLang: 'en-US'
    },
    iframeModals: [{
        iframeUrl: 'https://github.com/ranbuch/accessibility',
        buttonText: 'terms'
    }],
    customFunctions: [{
        method: (cf, state) => {
            console.log(cf, state);
        },
        buttonText: 'foo',
        id: 1,
        toggle: true,
        icon: 'psychology_alt',
        emoji: '❓'
    }]
}

window.addEventListener('load', function () { new Accessibility(options); }, false);