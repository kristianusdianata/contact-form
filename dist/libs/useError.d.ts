type FuncSync = (...args: any[]) => any;
type FuncAsync = (...args: any[]) => Promise<any>;
/**
 * Wraps a synchronous function to catch and return errors instead of throwing them.
 *
 * The argument types are inferred from the provided function, and the return type
 * is either the original return type or an Error instance.
 *
 * @template Fn - The synchronous function type to wrap.
 *
 * @param {Fn} func - The synchronous function to be wrapped.
 * @returns {(...args: Parameters<Fn>) => ReturnType<Fn> | Error} - A wrapped function that returns either the original result or an Error.
 *
 * @example
 * const risky = (x: number) => {
 *   if (x < 0) throw new Error("Negative not allowed");
 *   return Math.sqrt(x);
 * };
 *
 * const safe = useError(risky);
 *
 * console.log(safe(4)); // 2
 * console.log(safe(-1)); // Error: Negative not allowed
 */
export declare function useError<Fn extends FuncSync>(func: Fn): (...args: Parameters<Fn>) => ReturnType<Fn> | Error;
export type UseErrorType = typeof useError;
/**
 * Wraps an asynchronous function to catch and return errors instead of throwing them.
 *
 * The argument types are inferred from the provided function, and the return type
 * is a Promise that resolves to either the original return type or an Error instance.
 *
 * @template Fn - The asynchronous function type to wrap.
 *
 * @param {Fn} func - The asynchronous function to be wrapped.
 * @returns {(...args: Parameters<Fn>) => Promise<ReturnType<Fn> | Error>} - A wrapped async function that returns either the original result or an Error.
 *
 * @example
 * const riskyAsync = async (url: string) => {
 *   if (!url.startsWith("http")) throw new Error("Invalid URL");
 *   return fetch(url).then(res => res.json());
 * };
 *
 * const safeAsync = useErrorAsync(riskyAsync);
 *
 * safeAsync("https://api.example.com/data")
 *   .then(result => console.log(result))
 *   .catch(err => console.error(err));
 *
 * safeAsync("invalid-url")
 *   .then(result => console.log(result));
 *   .catch(err => console.error(err)); // Error: Invalid URL
 */
export declare function useErrorAsync<Fn extends FuncAsync>(func: Fn): (...args: Parameters<Fn>) => Promise<ReturnType<Fn> | Error>;
export type UseErrorAsyncType = typeof useErrorAsync;
export {};
//# sourceMappingURL=useError.d.ts.map