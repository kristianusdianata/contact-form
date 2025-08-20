export declare function element({ blockName }: {
    blockName: string;
}): {
    getBlockName: () => string;
    getParent: <T extends HTMLElement>() => T;
    selector: <T extends HTMLElement>({ query }: {
        query: string;
    }) => T;
    selectorAll: <T extends HTMLElement>({ query, }: {
        query: string;
    }) => NodeListOf<T>;
    getChild: <T extends HTMLElement>({ elementName, }: {
        elementName: string;
    }) => T;
    getChildAll: <T extends HTMLElement>({ elementName, }: {
        elementName: string;
    }) => NodeListOf<T>;
};
export type ElementReturnType = ReturnType<typeof element>;
//# sourceMappingURL=element.d.ts.map