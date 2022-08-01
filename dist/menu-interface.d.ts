import { IAccessibility } from './interfaces/accessibility.interface';
import { IMenuInterface } from './interfaces/menu.interface';
export declare class MenuInterface implements IMenuInterface {
    private _acc;
    private readBind;
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
}
