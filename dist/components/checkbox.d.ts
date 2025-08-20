import type { BlockNamesType } from "../core.js";
export declare function checkboxController({ blockName, }: {
    blockName: BlockNamesType;
}): {
    defaultUI: () => void;
    errorUI: ({ errMsg, isFocus }: {
        errMsg: string;
        isFocus: boolean;
    }) => void;
};
//# sourceMappingURL=checkbox.d.ts.map