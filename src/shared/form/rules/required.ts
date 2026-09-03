import type { Rule } from "antd/es/form";

/*
|--------------------------------------------------------------------------
| requiredRule
|--------------------------------------------------------------------------
|
| Reusable validation rule for required fields.
| Supports i18n translation for error message.
|
*/
export const requiredRule = (message: string): Rule => ({
    required: true,
    message,
});