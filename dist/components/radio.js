import { element } from "../utils/index.js";
import { useElement } from "../libs/index.js";
function radioState() {
    let prevActive = null;
    let currActive = null;
    function getState() {
        return {
            prevActive,
            currActive,
        };
    }
    function setState({ newActive }) {
        prevActive = currActive;
        currActive = newActive;
    }
    function defaultState() {
        prevActive = null;
        currActive = null;
    }
    return {
        getState,
        setState,
        defaultState,
    };
}
function getRadioRef(radio) {
    return document.querySelector(`label[for=${radio.id}]`);
}
function UI({ blockName }) {
    function toggleActive({ radio, isActive, }) {
        const radioLabel = useElement(getRadioRef(radio));
        radioLabel.toggleClass(`${blockName}__label--active`, isActive).done();
    }
    function error({ errMsg, isFocus }) {
        const element_ = element({ blockName });
        const errorLabel = useElement(element_.getChild({ elementName: `error` }));
        errorLabel.setInnerText(errMsg).done();
        if (isFocus) {
            const radios = element_.selectorAll({
                query: `.${blockName}__input`,
            });
            radios[0]?.focus();
        }
    }
    return {
        toggleActive,
        error,
    };
}
export function radioController({ blockName }) {
    const element_ = element({ blockName });
    const errorField = element_.getChild({
        elementName: "error",
    });
    const radios = element_.selectorAll({
        query: `.${blockName}__input`,
    });
    const stateHelper = radioState();
    const UIHelper = UI({ blockName });
    function defaultUI() {
        useElement(errorField).setInnerText("").done();
        stateHelper.defaultState();
        for (const radio of Array.from(radios)) {
            UIHelper.toggleActive({ radio, isActive: false });
            UIHelper.error({ errMsg: "", isFocus: false });
        }
    }
    /**
     * Toggles the active state of a radio input.
     * Intended to be used inside an radio input event handler.
     */
    function toggleActiveHandler(event) {
        stateHelper.setState({
            newActive: event.target,
        });
        const { currActive, prevActive } = stateHelper.getState();
        if (prevActive !== null) {
            // remove active class
            UIHelper.toggleActive({ radio: prevActive, isActive: false });
        }
        if (currActive !== null) {
            // add active class
            UIHelper.toggleActive({ radio: currActive, isActive: true });
        }
    }
    return {
        toggleActiveHandler,
        defaultUI,
        errorUI: UIHelper.error,
    };
}
//# sourceMappingURL=radio.js.map