export declare function toggleErrorUI({ errMsg, isError, isFocus, blockName, inputField, errorField, }: {
    errMsg?: string;
    isError: boolean;
    blockName: string;
    isFocus: boolean;
    inputField: HTMLInputElement;
    errorField: HTMLSpanElement;
}): void;
export declare function toggleActiveUI<T extends HTMLElement>({ targetElement, blockName, isActive, }: {
    targetElement: T;
    blockName: string;
    isActive: boolean;
}): void;
//# sourceMappingURL=ui.d.ts.map