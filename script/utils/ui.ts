import { useElement } from "@libs/index.js";

// ------------------------------ Error UI start ------------------------------
export function toggleErrorUI({
  errMsg,
  isError,
  isFocus,
  blockName,
  inputField,
  errorField,
}: {
  errMsg?: string;
  isError: boolean;
  blockName: string;
  isFocus: boolean;
  inputField: HTMLInputElement;
  errorField: HTMLSpanElement;
}) {
  const input = useElement(inputField);
  const error = useElement(errorField);

  if (isFocus) {
    input.done().focus();
  }

  if (input.done().type !== "radio" || input.done().type !== "checkbox") {
    input.toggleClass(`${blockName}__input--error`, isError).done();
  }

  error.setInnerText(errMsg ? errMsg : "").done();
}
// ------------------------------ Error UI end ------------------------------

// ------------------------------ Active UI start ------------------------------
export function toggleActiveUI<T extends HTMLElement>({
  targetElement,
  blockName,
  isActive,
}: {
  targetElement: T;
  blockName: string;
  isActive: boolean;
}) {
  const element = useElement(<T>targetElement);
  element.toggleClass(`${blockName}__label--active`, isActive).done();
}
// ------------------------------ Active UI end ------------------------------
