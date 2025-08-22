import {
  inputController,
  checkboxController,
  radioGroupController,
  toastController,
} from "@/components/index.js";
import { blockNames } from "@/core.js";
import { element } from "@/utils/index.js";
import { useElement } from "@libs/useElement.js";

import type { BlockNamesType } from "@/core.js";

const formElement = useElement(
  <HTMLElement>document.querySelector("form.contact__form")
);

function validation({
  blockName,
  input,
  onErrorCb,
  onSuccessCb,
}: {
  blockName: BlockNamesType;
  input: any;
  onErrorCb: ({ errMsg }: { errMsg: string }) => void;
  onSuccessCb: () => void;
}) {
  const validate = blockNames[blockName].validation;
  const validateResult = validate(input);

  if (validateResult instanceof Error) {
    onErrorCb({ errMsg: validateResult.message });
  } else {
    onSuccessCb();
  }
}

function init() {
  for (const blockName in blockNames) {
    if (blockName === "query") {
      const element_ = element({ blockName });
      const fieldset = <HTMLFieldSetElement>element_.getParent();
      const radios = element_.selectorAll<HTMLInputElement>({
        query: "input[type=radio]",
      });
      const controller = radioGroupController({ blockName: blockName });

      useElement(fieldset).setEventHandler("focusout", (event) => {
        if (!fieldset.contains(event.relatedTarget as Node)) {
          const checked = Array.from(radios).find((radio) => radio.checked);
          const targetValue = checked ? checked.value : null;

          validation({
            blockName,
            input: targetValue,
            onErrorCb({ errMsg }) {
              controller.errorUI({
                isError: true,
                errMsg,
                isFocus: false,
              });
            },
            onSuccessCb() {
              controller.errorUI({});
            },
          });
        }
      });

      for (const radio of radios) {
        useElement(radio).setEventHandler("change", (event) => {
          controller.toggleActiveHandler(event);
          controller.errorUI({});
        });
      }
    } else if (blockName === "term") {
      const element_ = element({ blockName });
      const controller = checkboxController({
        blockName: blockName as BlockNamesType,
      });

      useElement(element_.getChild<HTMLInputElement>({ elementName: "input" }))
        .setEventHandler("change", (event) => {
          event.preventDefault();
          controller.defaultUI();
        })
        .done();
    } else {
      const element_ = element({ blockName });
      const controller = inputController({
        blockName: blockName as BlockNamesType,
      });

      const validateInputHandler = <K extends keyof HTMLElementEventMap>(
        event: HTMLElementEventMap[K]
      ) => {
        const target = event.target as HTMLInputElement;
        const targetValue = target.value;

        validation({
          blockName: blockName as BlockNamesType,
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

      useElement(element_.getChild<HTMLInputElement>({ elementName: "input" }))
        .setEventHandler("blur", validateInputHandler)
        .setEventHandler("input", validateInputHandler)
        .done();
    }
  }
}

function submitForm() {
  formElement.setEventHandler("submit", (event) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const formData = new FormData(target);
    const formObj = Object.fromEntries(formData.entries());

    // Needed to focus on the first error occurred
    let firstErrorField: string | null = null;

    for (const [key, value] of Object.entries(formObj)) {
      if (!value) firstErrorField = firstErrorField ? firstErrorField : key;
      type ValidationParams = Parameters<typeof validation>[0];
      let onErrorCb: ValidationParams["onErrorCb"] | null = null;
      let onSuccessCb: ValidationParams["onSuccessCb"] | null = null;

      if (key === "query") {
        const controller = radioGroupController({ blockName: key });

        onErrorCb = ({ errMsg }) => {
          controller.errorUI({
            isError: true,
            errMsg,
            isFocus: firstErrorField === "query" ? true : false,
          });
        };

        onSuccessCb = () => {
          controller.errorUI({});
        };
      } else if (key === "term") {
        const controller = checkboxController({
          blockName: key as BlockNamesType,
        });

        onErrorCb = ({ errMsg }) => {
          controller.errorUI({
            isError: true,
            errMsg,
            isFocus: firstErrorField === "term" ? true : false,
          });
        };

        onSuccessCb = () => {
          controller.errorUI({});
        };
      } else {
        const controller = inputController({
          blockName: key as BlockNamesType,
        });

        onErrorCb = ({ errMsg }) => {
          controller.errorUI({
            isError: true,
            errMsg,
            isFocus: firstErrorField === key ? true : false,
          });
        };

        onSuccessCb = () => {
          controller.errorUI({});
        };
      }

      // do validation
      validation({
        blockName: key as BlockNamesType,
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
        if (key === "query") {
          const controller = radioGroupController({
            blockName: key as BlockNamesType,
          });

          controller.defaultUI();
        } else if (key === "term") {
          const controller = checkboxController({
            blockName: key as BlockNamesType,
          });

          controller.defaultUI();
        } else {
          const controller = inputController({
            blockName: key as BlockNamesType,
          });

          controller.defaultUI();
        }
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
