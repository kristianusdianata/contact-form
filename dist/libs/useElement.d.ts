export interface ElementAPI<T extends HTMLElement> {
    addClass: (classNames: string[] | string) => ElementAPI<T>;
    removeClass: (classNames: string[] | string) => ElementAPI<T>;
    toggleClass: (className: string, force?: boolean) => ElementAPI<T>;
    setInnerText: (text: string) => ElementAPI<T>;
    setAttribute: (attributes: Record<string, string>) => ElementAPI<T>;
    removeAttribute: (attrName: string) => ElementAPI<T>;
    toggleAttribute: (attributes: Record<string, string>, condition: boolean) => ElementAPI<T>;
    setEventHandler: <K extends keyof HTMLElementEventMap>(event: K, handler: (ev: HTMLElementEventMap[K]) => void, options?: boolean | AddEventListenerOptions) => ElementAPI<T>;
    getAttribute: (attrName: string) => string;
    getDataAttribute: (attrName: string) => string;
    done: () => T;
}
/**
 * Creates a chainable API for manipulating a specific HTMLElement instance.
 * The provided type parameter `T` determines the element type, ensuring that methods
 * operate with the correct DOM type constraints.
 *
 * The returned API supports common DOM operations, including:
 * - Adding, removing, and toggling CSS classes.
 * - Setting or removing attributes.
 * - Managing event listeners.
 * - Retrieving attribute values.
 * - Setting inner text.
 *
 * This API is designed for method chaining, allowing multiple
 * operations to be performed in sequence.
 *
 * @template T - The type of the HTMLElement.
 * @param {T} arg - The target element to manipulate.
 * @returns {ElementAPI<T>} A chainable API for the specified element.
 *
 * @example
 * const el = document.createElement("div");
 * const api = useElement(el);
 *
 * api
 *   .addClass(["box", "highlight"])
 *   .setInnerText("Hello World")
 *   .setAttribute({ id: "main-box", role: "alert" })
 *   .toggleClass("hidden", false)
 *   .done(); // Returns the HTMLElement
 */
export declare function useElement<T extends HTMLElement>(arg: T): ElementAPI<T>;
//# sourceMappingURL=useElement.d.ts.map