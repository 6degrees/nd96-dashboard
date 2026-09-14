import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import { useTranslation } from 'react-i18next'
import { emailRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| EmailFormItem Props
|--------------------------------------------------------------------------
|
*/
type EmailFormItemProps = {
    name: any
    label: string
    placeholder?: string
    readOnly?: boolean
    hidden?: boolean
    rules?: Rule[]
}

/*
|--------------------------------------------------------------------------
| EmailFormItem Component
|--------------------------------------------------------------------------
|
| Reusable email input component with built-in email validation.
|
*/
const EmailFormItem = (
    {
        name,
        label,
        placeholder,
        readOnly = false,
        hidden = false,
        rules = [],
    }: EmailFormItemProps,
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
            hidden={hidden}
            rules={[
                ...rules,

                emailRule(
                    t('validation.requiredEmail'),
                ),
            ].map((rule) => {
                const baseRule = { ...rule } as any
                return {...baseRule,
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

            <Input
                type="email"
                placeholder={placeholder ? t(placeholder) : undefined}
                readOnly={readOnly}
                hidden={hidden}
                className="
                    h-10
                    rounded-2xl

                    border
                    border-slate-200
                    bg-white

                    px-5

                    text-base
                    font-medium
                    text-slate-700
                    placeholder:text-slate-400

                    transition-colors
                    duration-200

                    hover:border-slate-300
                    focus:border-primary/500
                    focus:shadow-none
                    focus:ring-0

                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
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
export default EmailFormItem