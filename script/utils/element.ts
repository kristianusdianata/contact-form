export function element({ blockName }: { blockName: string }) {
  const getBlockName = (): string => {
    return blockName;
  };

  /**
   * Return a parent element
   * of given blockname from BEM
   */
  const getParent = <T extends HTMLElement>(): T => {
    return document.querySelector(`.${blockName}`) as T;
  };

  /**
   * A child element is selected from the parent element
   * by using a custom query.
   */
  const selector = <T extends HTMLElement>({ query }: { query: string }): T => {
    const parent = getParent();
    return parent.querySelector(query) as T;
  };

  /**
   * Selects all matching child elements from the parent element
   * using a custom query string.
   */
  const selectorAll = <T extends HTMLElement>({
    query,
  }: {
    query: string;
  }): NodeListOf<T> => {
    const parent = getParent();
    return parent.querySelectorAll(query);
  };

  /**
   * A child element is selected from the parent element
   * by using an element name from BEM.
   */
  const getChild = <T extends HTMLElement>({
    elementName,
  }: {
    elementName: string;
  }): T => {
    const blockname = getBlockName();
    return selector<T>({ query: `.${blockname}__${elementName}` });
  };

  /**
   * Selects all matching child elements from the parent element
   * by using an element name from BEM.
   */
  const getChildAll = <T extends HTMLElement>({
    elementName,
  }: {
    elementName: string;
  }): NodeListOf<T> => {
    const blockname = getBlockName();
    return selectorAll<T>({
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

export type ElementReturnType = ReturnType<typeof element>;
