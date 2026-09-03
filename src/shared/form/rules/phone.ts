import type { Rule } from 'antd/es/form'

/*
|--------------------------------------------------------------------------
| phoneRule
|--------------------------------------------------------------------------
|
*/
export const phoneRule = (message: string): Rule => ({
    validator(_, value) {

        const phone =
            value?.replace(/\D/g, '') || ''

        if (phone.length <= 3) {
            return Promise.reject(
                new Error(message),
            )
        }

        return Promise.resolve()
    },
})