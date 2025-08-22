import type { BlockNamesType } from "../core.js";
export declare function inputController({ blockName }: {
    blockName: BlockNamesType;
}): {
    defaultUI: () => void;
    errorUI: ({ isError, errMsg, isFocus, }: {
        isError?: boolean;
        errMsg?: string;
        isFocus?: boolean;
    }) => void;
};
//# sourceMappingURL=input.d.ts.map