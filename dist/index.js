import { inputController, checkboxController, radioController, toastController, } from "./components/index.js";
import { blockNames } from "./core.js";
import { element } from "./utils/index.js";
import { useElement } from "./libs/useElement.js";
const formElement = useElement(document.querySelector("form.contact__form"));
function validation({ blockName, input, onErrorCb, onSuccessCb, }) {
    const validate = blockNames[blockName].validation;
    const validateResult = validate(input);
    if (validateResult instanceof Error) {
        onErrorCb({ errMsg: validateResult.message });
    }
    else {
        onSuccessCb();
    }
}
function init() {
    for (const blockName in blockNames) {
        if (blockName === "query") {
            const element_ = element({ blockName });
            const fieldset = element_.getParent();
            const radios = element_.selectorAll({
                query: "input[type=radio]",
            });
            const controller = radioController({ blockName: blockName });
            useElement(fieldset).setEventHandler("focusout", (event) => {
                if (!fieldset.contains(event.relatedTarget)) {
                    const checked = Array.from(radios).find((radio) => radio.checked);
                    const targetValue = checked ? checked.value : null;
                    validation({
                        blockName,
                        input: targetValue,
                        onErrorCb({ errMsg }) {
                            controller.errorUI({
                                errMsg,
                                isFocus: false,
                            });
                        },
                        onSuccessCb() {
                            controller.errorUI({
                                errMsg: "",
                                isFocus: false,
                            });
                        },
                    });
                }
            });
            for (const radio of radios) {
                useElement(radio).setEventHandler("change", (event) => {
                    controller.toggleActiveHandler(event);
                    controller.errorUI({
                        errMsg: "",
                        isFocus: false,
                    });
                });
            }
        }
        else if (blockName === "term") {
            const element_ = element({ blockName });
            const controller = checkboxController({
                blockName: blockName,
            });
            useElement(element_.getChild({ elementName: "input" }))
                .setEventHandler("change", (event) => {
                event.preventDefault();
                controller.defaultUI();
            })
                .done();
        }
        else {
            const element_ = element({ blockName });
            const controller = inputController({
                blockName: blockName,
            });
            const validateInputHandler = (event) => {
                const target = event.target;
                const targetValue = target.value;
                validation({
                    blockName: blockName,
                    input: targetValue,
                    onErrorCb: ({ errMsg }) => {
                        controller.errorUI({
                            isError: true,
                            errMsg: errMsg,
                            isFocus: false,
                        });
                    },
                    onSuccessCb: () => controller.defaultUI(),
                });
            };
            useElement(element_.getChild({ elementName: "input" }))
                .setEventHandler("blur", validateInputHandler)
                .setEventHandler("input", validateInputHandler)
                .done();
        }
    }
}
function submitForm() {
    formElement.setEventHandler("submit", (event) => {
        event.preventDefault();
        const target = event.target;
        const formData = new FormData(target);
        const formObj = Object.fromEntries(formData.entries());
        // Needed to focus on the first error occurred
        let firstErrorField = null;
        for (const [key, value] of Object.entries(formObj)) {
            if (!value)
                firstErrorField = firstErrorField ? firstErrorField : key;
            let onErrorCb = null;
            let onSuccessCb = null;
            if (key === "query") {
                const controller = radioController({ blockName: "query" });
                onErrorCb = ({ errMsg }) => {
                    controller.errorUI({
                        errMsg,
                        isFocus: firstErrorField === "query" ? true : false,
                    });
                };
                onSuccessCb = () => {
                    controller.errorUI({
                        errMsg: "",
                        isFocus: false,
                    });
                };
            }
            else if (key === "term") {
                const controller = checkboxController({
                    blockName: key,
                });
                onErrorCb = ({ errMsg }) => {
                    controller.errorUI({
                        errMsg,
                        isFocus: firstErrorField === "term" ? true : false,
                    });
                };
                onSuccessCb = () => {
                    controller.errorUI({
                        errMsg: "",
                        isFocus: false,
                    });
                };
            }
            else {
                const controller = inputController({
                    blockName: key,
                });
                onErrorCb = ({ errMsg }) => {
                    controller.errorUI({
                        isError: true,
                        errMsg,
                        isFocus: firstErrorField === key ? true : false,
                    });
                };
                onSuccessCb = () => {
                    controller.errorUI({
                        isError: false,
                        errMsg: "",
                        isFocus: false,
                    });
                };
            }
            // do validation
            validation({
                blockName: key,
                input: value,
                onErrorCb,
                onSuccessCb,
            });
        }
        // if no error found reset form and show toast component
        if (firstErrorField === null) {
            // reset input
            target.reset();
            // reset UI
            for (const [key, _value] of Object.entries(formObj)) {
                const controller = radioController({
                    blockName: key,
                });
                controller.defaultUI();
            }
            // show toast
            const controller = toastController();
            controller.showToast();
            // Scroll to top
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    });
}
init();
submitForm();
//# sourceMappingURL=index.js.map