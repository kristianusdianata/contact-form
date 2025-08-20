import type { PipelineFunc, PipeInput, PipeOutput } from "../libs/index.js";
export declare function useValidator<Fns extends PipelineFunc<any, any>>(...args: Fns): (...args: PipeInput<Fns>) => PipeOutput<Fns> | Error;
export declare const validationRules: {
    readonly isEmpty: <T>(val: T | null | undefined, errMsg?: string) => NonNullable<T>;
    readonly isEmail: (val: string, errMsg?: string) => string;
};
//# sourceMappingURL=validator.d.ts.map