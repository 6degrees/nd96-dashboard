import Link from 'next/link'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useForgotPassword } from '@/features/auth'
import HiddenFormItem from '@/components/inputs/HiddenFormItem'
import SubmitButtonFormItem from '@/components/inputs/SubmitButtonFormItem'
import { EmailFormItem } from '@/components/inputs'
import { requiredRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| ForgotPasswordForm Component
|--------------------------------------------------------------------------
|
| Pure UI form for forgot password.
|
*/
const ForgotPasswordForm = () => {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Initializes the i18n translation function.
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Ant Design Form Instance
    |--------------------------------------------------------------------------
    |
    | Controls Ant Design form behavior and validation.
    |
    */
    const [form] = Form.useForm()

    /*
    |--------------------------------------------------------------------------
    | Forgot Password Hook
    |--------------------------------------------------------------------------
    |
    | Provides the forgot password handler and request state.
    |
    */
    const { handleSubmit, loading, error } = useForgotPassword()

    /*
    |--------------------------------------------------------------------------
    | Form Errors
    |--------------------------------------------------------------------------
    |
    | Maps backend validation errors to Ant Design form fields.
    |
    */
    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    | Renders the forgot password form using the shared
    | identity-based authentication components.
    |
    */
    return (
        <Form form={form} onFinish={handleSubmit} layout="vertical" initialValues={{ email: '', code: '0000' }}>

            {/*
            |--------------------------------------------------------------------------
            | Hidden Code
            |--------------------------------------------------------------------------
            |
            | Internal verification code value.
            |
            */}
            <HiddenFormItem name="code" />

            {/*
            |--------------------------------------------------------------------------
            | Email Input
            |--------------------------------------------------------------------------
            |
            | Reusable email input with localized validation.
            |
            */}
            <EmailFormItem
                name="email"
                label="auth.forgotPasswordPage.usernameOrEmail"
                placeholder="auth.forgotPasswordPage.usernameOrEmailPlaceholder"
                rules={[requiredRule(t('validation.requiredField'))]}
            />

            {/*
            |--------------------------------------------------------------------------
            | Submit Button
            |--------------------------------------------------------------------------
            |
            | Uses the shared National Day identity button.
            |
            */}
            <div className="mt-6 text-center">
                <SubmitButtonFormItem
                    label="auth.forgotPasswordPage.submit"
                    loading={loading}
                />
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Back To Login
            |--------------------------------------------------------------------------
            |
            | Returns the user to the login page.
            |
            */}
            <div className="mt-6 text-center">
                <Link href="/auth/login" className="text-sm font-semibold text-brand-green transition-colors hover:text-brand-green-hover">
                    {t('auth.forgotPasswordPage.backToLogin')}
                </Link>
            </div>

        </Form>
    )
}

export default ForgotPasswordForm