import { FormInstance } from "antd";
import type { Rule } from "antd/es/form";

/*
|--------------------------------------------------------------------------
| confirmPasswordRule
|--------------------------------------------------------------------------
|
| Validation rule to ensure password confirmation matches the password field.
| Supports i18n translation for error messages.
|
*/
export const matchPasswordRule = (form: FormInstance, passwordField: any = "password", message: string = "Passwords do not match"): Rule => ({
    validator(_, value) {
        if (!value || form.getFieldValue(passwordField) === value) {
            return Promise.resolve();
        }

        return Promise.reject(new Error(message));
    },
});