/**
 * Creates a function pipeline where the output of each function is passed as the input to the next.
 *
 * The argument types are inferred from the first function in the list,
 * and the return type is inferred from the last function in the list.
 *
 * @template FirstArgs - The argument types of the first function in the pipeline.
 * @template LastReturn - The return type of the last function in the pipeline.
 * @template Fn - The tuple type representing all functions in the pipeline.
 *
 * @param {...Fn} funcs - The list of functions to execute in sequence.
 * @returns {(...arg: PipeInput<Fn>) => PipeOutput<Fn>} - A function that runs the pipeline.
 *
 * @example
 * const add = (a: number, b: number) => a + b;
 * const square = (n: number) => n * n;
 * const toString = (n: number) => `Result: ${n}`;
 *
 * const pipeline = usePipeline(add, square, toString);
 * console.log(pipeline(2, 3)); // "Result: 25"
 */
export function usePipeline(...funcs) {
    return function wrapper(...args) {
        const [first, ...rest] = funcs;
        const result = rest.reduce((acc, fn) => fn(acc), first(...args));
        return result;
    };
}
//# sourceMappingURL=usePipeline.js.map