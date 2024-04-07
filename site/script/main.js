var options = {
    hotkeys: {
        enabled: true
    },
    icon: {
        circular: true
    },
    language: {
        textToSpeechLang: 'en-US',
        speechToTextLang: 'en-US'
    },
    iframeModals: [{
        iframeUrl: 'http://localhost:8080/',
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