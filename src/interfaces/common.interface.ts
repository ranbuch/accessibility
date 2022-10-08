export interface ICommon {
    deployedObjects: IDeployedObjects;
    isIOS(): boolean;
    jsonToHtml(obj: IJsonToHtml): HTMLElement;
    injectStyle(css: string, innerOptions?: IInjectStyleOptions): void;
    getFormattedDim(value: string): IFormattedDim;
    extend(src: any, dest: any): void;
    injectIconsFont(urls: Array<string>, callback: Function): void;
    getFixedFont(name: string): void;
    getFixedPseudoFont(name: string): void;
    isFontLoaded(fontFamily?: string, callback?: Function): void;
    warn(msg: string): void;
    createScreenshot(url: string): Promise<string>;
    getFileExtension(filename: string): string;
}

export interface IJsonToHtml {
    type: string;
    attrs?: any;
    children?: Array<IJsonToHtml>;
    text?: string;
}

export interface IInjectStyleOptions {
    className?: string;
}

export interface IFormattedDim {
    size: string | number;
    suffix: string;
}

export interface IUnitsDim {
    size: string | number;
    units: string;
}

export interface IDeployedObjects {
    get(key: string): boolean;
    contains(key: string): boolean;
    set(key: string, val: boolean): void;
    remove(key: string): void;
    getAll(): Map<string, boolean>;
}