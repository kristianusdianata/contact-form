import { useError, usePipeline } from "../libs/index.js";
export function useValidator(...args) {
    const validatorFn = usePipeline(...args);
    return function doValidate(...args) {
        const withError = useError(validatorFn);
        return withError(...args);
    };
}
export const validationRules = {
    isEmpty: (val, errMsg) => {
        if (val === null || val === undefined || !val) {
            throw new Error(errMsg ? errMsg : `This field is required`);
        }
        return val;
    },
    isEmail: (val, errMsg) => {
        const str = String(val).trim();
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/;
        if (!emailRegex.test(str)) {
            throw new Error(errMsg ? errMsg : `Please enter a valid email address`);
        }
        return val;
    },
};
//# sourceMappingURL=validator.js.map