import { element } from "../utils/element.js";
import { useElement } from "../libs/useElement.js";
function UI({ blockName }) {
    function error({ isError, errMsg, isFocus, }) {
        const element_ = element({ blockName });
        const input = useElement(element_.getChild({
            elementName: "input",
        }));
        const errorlabel = useElement(element_.getChild({
            elementName: "error",
        }));
        input.toggleClass(`${blockName}__input--error`, isError).done();
        errorlabel.setInnerText(errMsg).done();
        if (isFocus) {
            input.done().focus();
        }
    }
    return {
        error,
    };
}
export function inputController({ blockName }) {
    const UIHelper = UI({ blockName });
    return {
        defaultUI: () => UIHelper.error({ isError: false, errMsg: "", isFocus: false }),
        errorUI: UIHelper.error,
    };
}
//# sourceMappingURL=input.js.map