import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useLogin } from '@/features/auth'
import PasswordFormItem from '@/components/inputs/PasswordFormItem'
import SubmitButtonFormItem from '@/components/inputs/SubmitButtonFormItem'
import EmailFormItem from '@/components/inputs/EmailFormItem'
import { requiredRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| SignInForm Component
|--------------------------------------------------------------------------
|
| Pure UI component for login form.
| Delegates all authentication logic to useLogin hook.
|
*/

const SignInForm = () => {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Initializes the i18n translation function.
    | Used to convert translation keys into localized UI text.
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
    | useLogin Hook
    |--------------------------------------------------------------------------
    |
    | Provides login handler and authentication state.
    | - handleLogin: triggers login action
    | - loading: indicates request state
    | - error: holds backend validation errors
    |
    */
    const { handleLogin, loading, error } = useLogin()

    /*
    |--------------------------------------------------------------------------
    | useFormErrors Hook
    |--------------------------------------------------------------------------
    |
    | Synchronizes backend validation errors with Ant Design form fields.
    |
    */
    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    | Renders the login form using the Ant Design Form system.
    |
    */
    return (
        <Form
            name="login"
            form={form}
            onFinish={handleLogin}
            layout="vertical"
            requiredMark={false}
            className="space-y-5"
            initialValues={{ email: '', password: '' }}
        >
            {/*
            |--------------------------------------------------------------------------
            | Email Input
            |--------------------------------------------------------------------------
            |
            | Collects the user's email address.
            |
            */}
            <div className="ant-custom-input">
                <EmailFormItem
                    name="email"
                    label="auth.email"
                    placeholder="auth.emailPlaceholder"
                    rules={[requiredRule(t('validation.requiredField'))]}
                />
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Password Input
            |--------------------------------------------------------------------------
            |
            | Collects the user's password and provides access to
            | the forgot password page.
            |
            */}
            <div className="ant-custom-input">
                <PasswordFormItem
                    name="password"
                    label="auth.password"
                    placeholder="auth.passwordPlaceholder"
                    forgotPasswordHref="/auth/forgot-password"
                    rules={[requiredRule(t('validation.requiredField'))]}
                />
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Session Preferences
            |--------------------------------------------------------------------------
            |
            | Provides the user with an option to keep the current
            | session active.
            |
            */}
            <div className="flex items-center">
                <label htmlFor="remember" className="identity-checkbox-label">
                    <input type="checkbox" id="remember" name="remember" className="identity-checkbox" />
                    <span className="identity-checkbox-box">
                        <span className="identity-checkbox-mark" />
                    </span>
                    <span className="identity-checkbox-text">
                        {t('auth.rememberMe')}
                    </span>
                </label>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Submit Button
            |--------------------------------------------------------------------------
            |
            | Submits the authentication form and displays the loading
            | state while the login request is being processed.
            |
            */}
            <div className="pt-1">
                <SubmitButtonFormItem
                    label={t('auth.login.submit')}
                    loading={loading}
                />
            </div>
        </Form>
    )
}

export default SignInForm