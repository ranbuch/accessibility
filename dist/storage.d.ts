export declare class Storage {
    constructor();
    has(key: string): boolean;
    set(key: string, value: any): void;
    get(key: string): any;
    clear(): void;
    remove(key: string): void;
    isSupported(): boolean;
}
