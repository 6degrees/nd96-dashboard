import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'

/*
|--------------------------------------------------------------------------
| PasswordFormItem Props
|--------------------------------------------------------------------------
*/
type PasswordFormItemProps = {
    name: any
    label: string
    placeholder?: string
    rules?: Rule[]
    forgotPasswordHref?: string
}

/*
|--------------------------------------------------------------------------
| PasswordFormItem Component
|--------------------------------------------------------------------------
|
| Reusable password input component with forgot password support.
|
*/
const PasswordFormItem = ({ name, label, placeholder, rules, forgotPasswordHref }: PasswordFormItemProps) => {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Provides localized labels, placeholders and validation messages.
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    | Renders the password input using the Saudi National Day
    | visual identity.
    |
    */
    return (
        <>
            {/*
            |--------------------------------------------------------------------------
            | Password Label
            |--------------------------------------------------------------------------
            |
            | Displays the password label and forgot password link.
            |
            */}
            <div className="mb-2 flex items-center justify-between gap-4">
                <label className="text-sm font-semibold text-text-primary">
                    {t(label)}
                </label>

                {forgotPasswordHref && (
                    <Link href={forgotPasswordHref} className="shrink-0 text-xs font-semibold text-brand-green transition-colors hover:text-brand-green-hover">
                        {t('auth.forgotPassword')}
                    </Link>
                )}
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Password Input
            |--------------------------------------------------------------------------
            |
            | Password input styled according to the Saudi National Day
            | visual identity.
            |
            */}
            <Form.Item
                name={name}
                rules={rules?.map((rule) => {
                    const baseRule = { ...rule } as any

                    return {
                        ...baseRule,
                        message: baseRule.message ? t(baseRule.message) : baseRule.message,
                    }
                })}
                className="mb-0"
            >
                <div className="identity-input-wrapper">
                    <span className="identity-input-corner identity-input-corner-tl" />
                    <span className="identity-input-corner identity-input-corner-tr" />
                    <span className="identity-input-corner identity-input-corner-bl" />
                    <span className="identity-input-corner identity-input-corner-br" />

                    <Input.Password
                        placeholder={placeholder ? t(placeholder) : undefined}
                        className="identity-password-input"
                    />
                </div>
            </Form.Item>
        </>
    )
}

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
|
*/
export default PasswordFormItem