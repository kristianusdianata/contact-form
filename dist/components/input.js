import { element } from "../utils/element.js";
import { useElement } from "../libs/useElement.js";
function UI({ blockName }) {
    function error({ isError = false, errMsg = "", isFocus = false, }) {
        const element_ = element({ blockName });
        const input = useElement(element_.getChild({
            elementName: "input",
        }));
        const errorlabel = useElement(element_.getChild({
            elementName: "error",
        }));
        input
            .toggleAttribute({ "aria-invalid": "true" }, isError)
            .toggleClass(`${blockName}__input--error`, isError);
        errorlabel.setInnerText(errMsg).done();
        if (isFocus && isError) {
            input.done().focus();
        }
        else {
            input.done();
        }
    }
    return {
        error,
    };
}
export function inputController({ blockName }) {
    const UIHelper = UI({ blockName });
    return {
        defaultUI: () => UIHelper.error({}),
        errorUI: UIHelper.error,
    };
}
//# sourceMappingURL=input.js.map