import { ICommon, IDeployedObjects, IFormattedDim, IInjectStyleOptions, IJsonToHtml } from './interfaces/common.interface';
export declare class Common implements ICommon {
    static DEFAULT_PIXEL: string;
    private body;
    private deployedMap;
    private _isIOS;
    private _canvas;
    constructor();
    isIOS(): boolean;
    jsonToHtml(obj: IJsonToHtml): HTMLElement;
    injectStyle(css: string, innerOptions?: IInjectStyleOptions): HTMLStyleElement;
    getFormattedDim(value: string): IFormattedDim;
    extend(src: any, dest: any): any;
    injectIconsFont(urls: Array<string>, callback: Function): void;
    getFixedFont(name: string): any;
    getFixedPseudoFont(name: string): any;
    isFontLoaded(fontFamily?: string, callback?: Function): any;
    warn(msg: string): void;
    get deployedObjects(): IDeployedObjects;
    createScreenshot(url: string): Promise<string>;
    getFileExtension(filename: string): string;
}
