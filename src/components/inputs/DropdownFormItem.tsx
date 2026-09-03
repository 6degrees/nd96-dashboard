/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import {Form} from 'antd'

import {useTranslation} from 'react-i18next'

import {DropdownFormItemProps} from '@/types/dropdown-form-item-props'

/*
|--------------------------------------------------------------------------
| DropdownFormItem Component
|--------------------------------------------------------------------------
|
*/
export default function DropdownFormItem(
    {
        name,
        label,
        placeholder,
        rules = [],
        isMulti = false,
        component: Component,
        componentProps = {},
    }: DropdownFormItemProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <Form.Item
            name={name}

            label={t(label)}

            rules={rules.map((rule) => {

                const baseRule = {...rule} as any

                return {
                    ...baseRule,

                    message: baseRule.message
                        ? t(baseRule.message)
                        : baseRule.message,
                }
            })}

            className="
                [&>div>div>label]:text-sm
                [&>div>div>label]:font-medium

                [&>div>div>label]:text-dark
                dark:[&>div>div>label]:text-white/60
            "
        >

            {
                Component && (

                    <Component
                        placeholder={
                            placeholder
                                ? t(placeholder)
                                : undefined
                        }

                        isMulti={isMulti}

                        className="
                            text-gray-700
                            dark:text-white/90
                        "

                        {...componentProps}
                    />
                )
            }

        </Form.Item>
    )
}