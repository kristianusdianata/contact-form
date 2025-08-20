import { element } from "@utils/element.js";
import { useElement } from "@libs/useElement.js";

export function toastController() {
  const blockName = "toast";
  const element_ = element({ blockName });
  const toast = useElement(element_.getParent());
  let timeoutId: number;

  function showToast() {
    toast.addClass(`${blockName}--show`).removeAttribute("aria-hidden").done();

    // clear timer
    clearTimeout(timeoutId);

    // hide toast after 5 seconds
    timeoutId = setTimeout(() => {
      toast
        .removeClass(`${blockName}--show`)
        .setAttribute({
          "aria-hidden": "true",
        })
        .done();
    }, 5000);
  }

  return { showToast };
}
