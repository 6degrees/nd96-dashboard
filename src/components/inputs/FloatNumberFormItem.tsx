import { Form, InputNumber } from 'antd'

import { Rule } from 'antd/es/form'

import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| FloatNumberFormItem Props
|--------------------------------------------------------------------------
|
*/
type FloatNumberFormItemProps = {
    name: string
    label: string
    placeholder?: string
    rules?: Rule[]
    min?: number
    max?: number
    step?: number
    precision?: number
}

/*
|--------------------------------------------------------------------------
| FloatNumberFormItem Component
|--------------------------------------------------------------------------
|
| Reusable numeric input component with float number support.
|
*/
const FloatNumberFormItem = (
    {
        name,
        label,
        placeholder,
        rules = [],
        min,
        max,
        step = 0.1,
        precision,
    }: FloatNumberFormItemProps,
) => {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const { t } = useTranslation()

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

                const baseRule = { ...rule } as any

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

            <InputNumber
                min={min}

                max={max}

                step={step}

                precision={precision}

                placeholder={
                    placeholder
                        ? t(placeholder)
                        : undefined
                }

                style={{ width: '100%' }}

                className="
                    h-14

                    p-2

                    rounded-lg

                    border-gray-200
                    dark:border-white/10

                    bg-white
                    dark:bg-white/[0.03]

                    text-gray-700
                    dark:text-white/90

                    hover:border-primary

                    focus:border-primary

                    transition-all

                    [&_.ant-input-number-input]:text-gray-700
                    dark:[&_.ant-input-number-input]:text-white/90

                    [&_.ant-input-number-input]:placeholder:text-gray-400
                    dark:[&_.ant-input-number-input]:placeholder:text-white/30

                    [&_.ant-input-number-handler-wrap]:bg-white
                    dark:[&_.ant-input-number-handler-wrap]:bg-white/[0.03]

                    dark:[&_.ant-input-number-handler-wrap]:border-white/10
                "
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
export default FloatNumberFormItem