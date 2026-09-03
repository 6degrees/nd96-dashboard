import React, { useEffect } from 'react'
import Link from 'next/link'
import { Form } from 'antd'
import { useRouter } from 'next/router'
import { useTranslation } from 'react-i18next'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useResetPassword } from '@/features/auth'
import HiddenFormItem from '@/components/inputs/HiddenFormItem'
import TextFormItem from '@/components/inputs/TextFormItem'
import PasswordFormItem from '@/components/inputs/PasswordFormItem'
import SubmitButtonFormItem from '@/components/inputs/SubmitButtonFormItem'
import { EmailFormItem } from '@/components/inputs'
import { requiredRule, matchPasswordRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| ResetPasswordForm Component
|--------------------------------------------------------------------------
|
| UI only component for resetting password.
| Logic handled by useResetPassword hook.
|
*/
const ResetPasswordForm = () => {

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
    const router = useRouter()

    /*
    |--------------------------------------------------------------------------
    | Router Query Params
    |--------------------------------------------------------------------------
    |
    | Retrieves the email and OTP values from the URL.
    |
    */
    const { email, otp } = router.query as {
        email?: string
        otp?: string
    }

    /*
    |--------------------------------------------------------------------------
    | Reset Password Hook
    |--------------------------------------------------------------------------
    |
    | Handles the password reset request and its loading/error state.
    |
    */
    const { handleResetPassword, loading, error } = useResetPassword()

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
    | Set Router Values
    |--------------------------------------------------------------------------
    |
    | Populates the email and OTP fields when their values
    | become available from the router.
    |
    */
    useEffect(() => {
        if (email) {
            form.setFieldsValue({
                email,
                otp,
            })
        }
    }, [email, otp, form])

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    | Renders the reset password form.
    |
    */
    return (
        <Form
            form={form}
            onFinish={handleResetPassword}
            layout="vertical"
            initialValues={{
                email: email || '',
                otp: otp || '',
                code: '0000',
                password: '',
                password_confirmation: '',
            }}>

            {/*
            |--------------------------------------------------------------------------
            | Hidden Code
            |--------------------------------------------------------------------------
            |
            | Internal code value required by the reset password request.
            |
            */}
            <HiddenFormItem name="code" />

            {/*
            |--------------------------------------------------------------------------
            | Email
            |--------------------------------------------------------------------------
            |
            | Displays the account email as a read-only field.
            |
            */}
            <EmailFormItem
                name="email"
                label="auth.resetPasswordPage.username"
                placeholder="auth.resetPasswordPage.username"
                rules={[requiredRule(t('validation.requiredField'))]}
                readOnly={!!email}
            />

            {/*
            |--------------------------------------------------------------------------
            | OTP Code
            |--------------------------------------------------------------------------
            |
            | Displays the verification code received by the user.
            |
            */}
            <TextFormItem
                name="otp"
                label={t('auth.resetPasswordPage.otpCode')}
                placeholder={t('auth.resetPasswordPage.otpPlaceholder')}
                rules={[requiredRule(t('validation.requiredOtp'))]}
                readOnly={!!otp}
            />

            {/*
            |--------------------------------------------------------------------------
            | New Password
            |--------------------------------------------------------------------------
            |
            | Collects the new password.
            |
            */}
            <PasswordFormItem
                name="password"
                label="auth.resetPasswordPage.newPassword"
                placeholder="auth.resetPasswordPage.newPasswordPlaceholder"
                rules={[requiredRule(t('validation.requiredField'))]}
            />

            {/*
            |--------------------------------------------------------------------------
            | Confirm Password
            |--------------------------------------------------------------------------
            |
            | Confirms that the new password matches.
            |
            */}
            <PasswordFormItem
                name="password_confirmation"
                label="auth.resetPasswordPage.confirmPassword"
                placeholder="auth.resetPasswordPage.confirmPasswordPlaceholder"
                rules={[
                    requiredRule(t('validation.requiredField')),
                    matchPasswordRule(
                        form,
                        'password',
                        t('validation.passwordsDoNotMatch'),
                    ),
                ]}
            />

            {/*
            |--------------------------------------------------------------------------
            | Submit Button
            |--------------------------------------------------------------------------
            |
            | Submits the password reset request.
            |
            */}
            <div className="mt-6 text-center">
                <SubmitButtonFormItem
                    label="auth.resetPasswordPage.submit"
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
                    {t('auth.resetPasswordPage.backToLogin')}
                </Link>
            </div>

        </Form>
    )
}

export default ResetPasswordForm