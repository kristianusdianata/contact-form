import { element } from "@utils/element.js";
import { useElement } from "@libs/useElement.js";

import type { BlockNamesType } from "@/core.js";

function UI({ blockName }: { blockName: BlockNamesType }) {
  function error({ errMsg, isFocus }: { errMsg: string; isFocus: boolean }) {
    const element_ = element({ blockName });
    const input = useElement(
      element_.getChild<HTMLInputElement>({
        elementName: "input",
      })
    );
    const errorlabel = useElement(
      element_.getChild<HTMLSpanElement>({
        elementName: "error",
      })
    );

    errorlabel.setInnerText(errMsg).done();

    if (isFocus) {
      input.done().focus();
    }
  }

  return {
    error,
  };
}

export function checkboxController({
  blockName,
}: {
  blockName: BlockNamesType;
}) {
  const UIHelper = UI({ blockName });

  return {
    defaultUI: () => UIHelper.error({ errMsg: "", isFocus: false }),
    errorUI: UIHelper.error,
  };
}
