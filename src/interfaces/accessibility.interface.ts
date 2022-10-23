import { ICommon, IUnitsDim } from "./common.interface";
import { IMenuInterface } from "./menu.interface";

export interface IAccessibility {
    menuInterface: IMenuInterface;
    options: IAccessibilityOptions;
    sessionState: ISessionState;
    common: ICommon;
    stateValues: IStateValues;
    isReading: boolean;
    readonly html: HTMLElement;
    readonly body: HTMLBodyElement;
    readonly recognition: any;
    alterTextSize(isIncrease: boolean): void;
    alterTextSpace(isIncrease: boolean): void;
    alterLineHeight(isIncrease: boolean): void;
    speechToText(): void;
    textToSpeech(text: string): void;
    listen(): void;
    read(e?: Event): void;
    runHotkey(name: string): void;
    toggleMenu(): void;
    invoke(action: string, button: HTMLElement): void;
    build(): void;
    updateReadGuide(e: Event | TouchEvent | any): void;
    resetIfDefined(src: string, dest: any, prop: string): void;
    onChange(updateSession: boolean): void;
    createScreenShot(url: string): Promise<string>;
}

export interface IAccessibilityOptions {
    icon?: IAccessibilityIconOptions;
    hotkeys?: IAccessibilityHotkeysOptions;
    buttons?: IAccessibilityButtonsOptions;
    guide?: IAccessibilityGuideOptions;
    menu?: IAccessibilityMenuOptions;
    labels?: IAccessibilityMenuLabelsOptions;
    textToSpeechLang?: string;
    speechToTextLang?: string;
    textPixelMode?: boolean;
    textEmlMode?: boolean;
    animations?: IAccessibilityAnimationsOptions;
    modules?: IAccessibilityModulesOptions;
    session?: IAccessibilitySessionOptions;
    iframeModals?: Array<IIframeModal>;
    customFunctions?: Array<ICustomFunction>;
    statement?: IAccessibilityUrlOptions;
    feedback?: IAccessibilityUrlOptions;
    language?: IAccessibilityLanguageOptions;
}

export interface ICustomFunction {
    method: Function;
    buttonText: string;
    id: any;
    toggle: boolean;
    icon?: string;
    emoji?: string;
}

export interface IIframeModal {
    iframeUrl: string;
    buttonText: string;
    icon?: string;
    emoji?: string;
}

export interface IAccessibilityIconOptions {
    position?: IAccessibilityIconPositionOptions;
    dimensions?: IAccessibilityIconDimensionsOptions;
    zIndex?: string;
    backgroundColor?: string;
    color?: string;
    img?: string;
    circular?: boolean;
    circularBorder?: false,
    fontFaceSrc?: Array<string>;
    fontClass?: string;
    useEmojis?: boolean;
    fontFamily?: string;
    forceFont?: boolean;
    tabIndex?: number;
}

export interface IAccessibilityIconPositionOptions {
    top?: IUnitsDim;
    bottom?: IUnitsDim;
    left?: IUnitsDim;
    right?: IUnitsDim;
    type?: string;
}

export interface IAccessibilityIconDimensionsOptions {
    width: IUnitsDim;
    height: IUnitsDim;
}

export interface IAccessibilityHotkeysOptions {
    enabled: boolean;
    helpTitles: boolean;
    keys: IAccessibilityHotkeysKeysOptions;
}

export interface IAccessibilityHotkeysKeysOptions {
    toggleMenu: Array<any>;
    invertColors: Array<any>;
    grayHues: Array<any>;
    underlineLinks: Array<any>;
    bigCursor: Array<any>;
    readingGuide: Array<any>;
    textToSpeech: Array<any>;
    speechToText: Array<any>;
    disableAnimations: Array<any>;
}

export interface IAccessibilityButtonsOptions {
    font: IUnitsDim;
}

export interface IAccessibilityGuideOptions {
    cBorder: string;
    cBackground: string;
    height: string;
}

export interface IAccessibilityMenuOptions {
    dimensions: IAccessibilityMenuDimensionsOptions;
    fontFamily: string;
}

export interface IAccessibilityMenuDimensionsOptions {
    width: IUnitsDim;
    height: IUnitsDim;
}

export interface IAccessibilityMenuLabelsOptions {
    resetTitle: string;
    closeTitle: string;
    menuTitle: string;
    increaseText: string;
    decreaseText: string;
    increaseTextSpacing: string;
    decreaseTextSpacing: string;
    invertColors: string;
    grayHues: string;
    bigCursor: string;
    readingGuide: string;
    underlineLinks: string;
    textToSpeech: string;
    speechToText: string;
    disableAnimations: string;
    increaseLineHeight: string;
    decreaseLineHeight: string;
    screenReader: string;
}

export interface IAccessibilityAnimationsOptions {
    buttons: boolean;
}

export interface IAccessibilityModulesOptions {
    increaseText: boolean;
    decreaseText: boolean;
    increaseTextSpacing: boolean;
    decreaseTextSpacing: boolean;
    invertColors: boolean;
    grayHues: boolean;
    bigCursor: boolean;
    readingGuide: boolean;
    underlineLinks: boolean;
    textToSpeech: boolean;
    speechToText: boolean;
    disableAnimations: boolean;
}

export interface IAccessibilitySessionOptions {
    persistent: boolean;
}

export interface IAccessibilityUrlOptions {
    url: string;
}

export interface IAccessibilityLanguageOptions {
    textToSpeechLang: string;
    speechToTextLang: string;
}

export interface ISessionState {
    textSize: number;
    textSpace: number;
    lineHeight: number;
    invertColors: boolean;
    grayHues: boolean;
    underlineLinks: boolean;
    bigCursor: boolean;
    readingGuide: boolean;
}

export interface IStateValues {
    underlineLinks: boolean;
    textToSpeech: boolean;
    bigCursor: boolean;
    readingGuide: boolean;
    invertColors?: boolean;
    grayHues?: boolean;
    speechToText?: boolean;
    disableAnimations?: boolean;
    speechRate?: number;
    body: any;
    html: any;
}