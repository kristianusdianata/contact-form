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
export function useElement(arg) {
    const element = arg;
    const normalizeArray = (input) => Array.isArray(input) ? input : [input];
    const api = {
        addClass(classNames) {
            element.classList.add(...normalizeArray(classNames).filter(Boolean));
            return api;
        },
        removeClass(classNames) {
            element.classList.remove(...normalizeArray(classNames).filter(Boolean));
            return api;
        },
        toggleClass(className, force) {
            element.classList.toggle(className, force);
            return api;
        },
        setInnerText(text) {
            element.innerText = text;
            return api;
        },
        setAttribute(attributes) {
            for (const [key, value] of Object.entries(attributes)) {
                element.setAttribute(key.toString(), value);
            }
            return api;
        },
        removeAttribute(attrName) {
            element.removeAttribute(attrName);
            return api;
        },
        setEventHandler(event, handler, options) {
            element.addEventListener(event, handler, options);
            return api;
        },
        getAttribute(attrName) {
            return element.getAttribute(attrName) ?? "";
        },
        getDataAttribute(attrName) {
            return element.getAttribute(`data-${attrName}`) ?? "";
        },
        done() {
            return element;
        },
    };
    return api;
}
//# sourceMappingURL=useElement.js.map