import type { BlockNamesType } from "../core.js";
export declare function radioGroupController({ blockName, }: {
    blockName: BlockNamesType;
}): {
    toggleActiveHandler: <K extends keyof HTMLElementEventMap>(event: HTMLElementEventMap[K]) => void;
    defaultUI: () => void;
    errorUI: ({ isError, errMsg, isFocus, }: {
        isError?: boolean;
        errMsg?: string;
        isFocus?: boolean;
    }) => void;
};
//# sourceMappingURL=radioGroup.d.ts.map