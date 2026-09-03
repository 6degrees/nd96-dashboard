import type { Rule } from 'antd/es/form'

/*
|--------------------------------------------------------------------------
| emailRule
|--------------------------------------------------------------------------
|
| Reusable validation rule for email fields.
|
*/
export const emailRule = (message: string): Rule => ({
    type: 'email',
    message,
})