import { element } from "@/utils/index.js";
import { useElement } from "@/libs/index.js";

import type { BlockNamesType } from "@/core.js";

function radioState() {
  let prevActive: HTMLInputElement | null = null;
  let currActive: HTMLInputElement | null = null;

  function getState() {
    return {
      prevActive,
      currActive,
    };
  }

  function setState({ newActive }: { newActive: HTMLInputElement }) {
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

function getRadioRef(radio: HTMLInputElement) {
  return document.querySelector(`label[for=${radio.id}]`) as HTMLLabelElement;
}

function UI({ blockName }: { blockName: BlockNamesType }) {
  function toggleActive({
    radio,
    isActive,
  }: {
    radio: HTMLInputElement;
    isActive: boolean;
  }) {
    const radioLabel = useElement(getRadioRef(radio));
    radioLabel.toggleClass(`${blockName}__label--active`, isActive).done();
  }

  function error({ errMsg, isFocus }: { errMsg: string; isFocus: boolean }) {
    const element_ = element({ blockName });

    const errorLabel = useElement(
      element_.getChild<HTMLSpanElement>({ elementName: `error` })
    );
    errorLabel.setInnerText(errMsg).done();

    if (isFocus) {
      const radios = element_.selectorAll<HTMLInputElement>({
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

export function radioController({ blockName }: { blockName: BlockNamesType }) {
  const element_ = element({ blockName });
  const errorField = element_.getChild<HTMLSpanElement>({
    elementName: "error",
  });
  const radios = element_.selectorAll<HTMLInputElement>({
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
  function toggleActiveHandler<K extends keyof HTMLElementEventMap>(
    event: HTMLElementEventMap[K]
  ) {
    stateHelper.setState({
      newActive: event.target as HTMLInputElement,
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
