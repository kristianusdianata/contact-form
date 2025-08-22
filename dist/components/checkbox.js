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
        input.toggleAttribute({ "aria-invalid": "true" }, isError);
        errorlabel.setInnerText(errMsg).done();
        if (isFocus && isError) {
            input.done().focus();
        }
    }
    return {
        error,
    };
}
export function checkboxController({ blockName, }) {
    const UIHelper = UI({ blockName });
    return {
        defaultUI: () => UIHelper.error({ errMsg: "", isFocus: false, isError: false }),
        errorUI: UIHelper.error,
    };
}
//# sourceMappingURL=checkbox.js.map