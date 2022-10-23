export interface IMenuInterface {
    increaseText(): void;
    decreaseText(): void;
    increaseTextSpacing(): void;
    decreaseTextSpacing(): void;
    invertColors(destroy?: boolean): void;
    grayHues(destroy?: boolean): void;
    underlineLinks(destroy?: boolean): void;
    bigCursor(destroy?: boolean): void;
    readingGuide(destroy?: boolean): void;
    textToSpeech(destroy?: boolean): void;
    speechToText(destroy?: boolean): void;
    disableAnimations(destroy?: boolean): void;
    iframeModals(destroy?: boolean, button?: HTMLElement): void;
    customFunctions(destroy?: boolean, button?: HTMLElement): void;
}