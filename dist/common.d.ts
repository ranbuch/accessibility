import { ICommon, IDeployedObjects, IFormattedDim, IInjectStyleOptions, IJsonToHtml } from './interfaces/common.interface';
export declare class Common implements ICommon {
    private body;
    private deployedMap;
    private _isIOS;
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
    readonly deployedObjects: IDeployedObjects;
}
