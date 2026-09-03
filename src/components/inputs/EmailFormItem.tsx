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

                return {
                    ...baseRule,
                    message: baseRule.message
                        ? t(baseRule.message)
                        : baseRule.message,
                }
            })}
            className="identity-form-item mb-0"
        >
            <div className="identity-input-wrapper">
                <span className="identity-input-corner identity-input-corner-tl" />
                <span className="identity-input-corner identity-input-corner-tr" />
                <span className="identity-input-corner identity-input-corner-bl" />
                <span className="identity-input-corner identity-input-corner-br" />

                <Input
                    type="email"
                    placeholder={placeholder ? t(placeholder) : undefined}
                    readOnly={readOnly}
                    hidden={hidden}
                    className="identity-input"
                />
            </div>
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