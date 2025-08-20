import type { BlockNamesType } from "../core.js";
export declare function radioController({ blockName }: {
    blockName: BlockNamesType;
}): {
    toggleActiveHandler: <K extends keyof HTMLElementEventMap>(event: HTMLElementEventMap[K]) => void;
    defaultUI: () => void;
    errorUI: ({ errMsg, isFocus }: {
        errMsg: string;
        isFocus: boolean;
    }) => void;
};
//# sourceMappingURL=radio.d.ts.map