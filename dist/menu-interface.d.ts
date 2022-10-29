import { IAccessibility } from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';
export declare class MenuInterface implements IMenuInterface {
    private _acc;
    private readBind;
    private _dialog;
    constructor(accessibility: IAccessibility);
    increaseText(): void;
    decreaseText(): void;
    increaseTextSpacing(): void;
    decreaseTextSpacing(): void;
    invertColors(destroy: boolean): void;
    grayHues(destroy: boolean): void;
    underlineLinks(destroy: boolean): void;
    bigCursor(destroy: boolean): void;
    readingGuide(destroy: boolean): void;
    textToSpeech(destroy: boolean): void;
    speechToText(destroy: boolean): void;
    disableAnimations(destroy: boolean): void;
    iframeModals(destroy?: boolean, button?: HTMLElement): void;
    customFunctions(destroy?: boolean, button?: HTMLElement): void;
    increaseLineHeight(): void;
    decreaseLineHeight(): void;
}
