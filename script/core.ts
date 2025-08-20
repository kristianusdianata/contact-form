import { useValidator, validationRules } from "@utils/index.js";

import type { PipelineFunc } from "@libs/index.js";

export const blockNames = {
  firstname: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) => validationRules.isEmpty(val)
    ),
  },
  lastname: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) => validationRules.isEmpty(val)
    ),
  },
  email: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) => validationRules.isEmpty(val),
      (val: string) => validationRules.isEmail(val)
    ),
  },
  query: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) => validationRules.isEmpty(val, "Please select a query type")
    ),
  },
  message: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) => validationRules.isEmpty(val)
    ),
  },
  term: {
    validation: useValidator<PipelineFunc<[string | null | undefined], string>>(
      (val) =>
        validationRules.isEmpty(
          val,
          "To submit this form, please consent to being contacted"
        )
    ),
  },
} as const;

export type BlockNamesType = keyof typeof blockNames;
