import { useError, usePipeline } from "@libs/index.js";
import type { PipelineFunc, PipeInput, PipeOutput } from "@libs/index.js";

export function useValidator<Fns extends PipelineFunc<any, any>>(
  ...args: Fns
): (...args: PipeInput<Fns>) => PipeOutput<Fns> | Error {
  const validatorFn = usePipeline(...args);
  return function doValidate(...args) {
    const withError = useError(validatorFn);
    return withError(...args);
  };
}

export const validationRules = {
  isEmpty: <T>(val: T | null | undefined, errMsg?: string): NonNullable<T> => {
    if (val === null || val === undefined || !val) {
      throw new Error(errMsg ? errMsg : `This field is required`);
    }

    return val as NonNullable<T>;
  },
  isEmail: (val: string, errMsg?: string) => {
    const str = String(val).trim();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;

    if (!emailRegex.test(str)) {
      throw new Error(errMsg ? errMsg : `Please enter a valid email address`);
    }

    return val;
  },
} as const;
