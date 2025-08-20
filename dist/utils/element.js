export function element({ blockName }) {
    const getBlockName = () => {
        return blockName;
    };
    /**
     * Return a parent element
     * of given blockname from BEM
     */
    const getParent = () => {
        return document.querySelector(`.${blockName}`);
    };
    /**
     * A child element is selected from the parent element
     * by using a custom query.
     */
    const selector = ({ query }) => {
        const parent = getParent();
        return parent.querySelector(query);
    };
    /**
     * Selects all matching child elements from the parent element
     * using a custom query string.
     */
    const selectorAll = ({ query, }) => {
        const parent = getParent();
        return parent.querySelectorAll(query);
    };
    /**
     * A child element is selected from the parent element
     * by using an element name from BEM.
     */
    const getChild = ({ elementName, }) => {
        const blockname = getBlockName();
        return selector({ query: `.${blockname}__${elementName}` });
    };
    /**
     * Selects all matching child elements from the parent element
     * by using an element name from BEM.
     */
    const getChildAll = ({ elementName, }) => {
        const blockname = getBlockName();
        return selectorAll({
            query: `.${blockname}__${elementName}`,
        });
    };
    return {
        getBlockName,
        getParent,
        selector,
        selectorAll,
        getChild,
        getChildAll,
    };
}
//# sourceMappingURL=element.js.map