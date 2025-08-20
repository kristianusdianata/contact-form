import { useValidator, validationRules } from "./utils/index.js";
export const blockNames = {
    firstname: {
        validation: useValidator((val) => validationRules.isEmpty(val)),
    },
    lastname: {
        validation: useValidator((val) => validationRules.isEmpty(val)),
    },
    email: {
        validation: useValidator((val) => validationRules.isEmpty(val), (val) => validationRules.isEmail(val)),
    },
    query: {
        validation: useValidator((val) => validationRules.isEmpty(val, "Please select a query type")),
    },
    message: {
        validation: useValidator((val) => validationRules.isEmpty(val)),
    },
    term: {
        validation: useValidator((val) => validationRules.isEmpty(val, "To submit this form, please consent to being contacted")),
    },
};
//# sourceMappingURL=core.js.map