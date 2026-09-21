import {Form, Select} from 'antd'

import {Rule} from 'antd/es/form'

import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| SelectFormItem Props
|--------------------------------------------------------------------------
|
*/

type SelectOption = {
    value: string
    label: string
}

type SelectFormItemProps = {
    name: string
    label: string
    placeholder?: string
    rules?: Rule[]
    options: SelectOption[]
}

/*
|--------------------------------------------------------------------------
| SelectFormItem Component
|--------------------------------------------------------------------------
|
| Reusable select input component.
|
*/

const SelectFormItem = (
    {
        name,
        label,
        placeholder,
        rules = [],
        options,
    }: SelectFormItemProps,
) => {

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

            <Select
                options={options}

                placeholder={
                    placeholder
                        ? t(placeholder)
                        : undefined
                }
            />

        </Form.Item>
    )
}

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
|
*/

export default SelectFormItem