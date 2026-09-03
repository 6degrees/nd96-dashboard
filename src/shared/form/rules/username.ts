import type { Rule } from 'antd/es/form'

/*
|--------------------------------------------------------------------------
| usernameRule
|--------------------------------------------------------------------------
|
| Allows only English letters, numbers and underscore.
|
*/
export const usernameRule = (message: string): Rule => ({
    pattern: /^[a-zA-Z0-9_]+$/,
    message,
})