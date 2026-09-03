import React from 'react'
import { Form } from 'antd'
import { useTranslation } from 'react-i18next'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useAcceptInvitation } from '../hooks'
import { TextFormItem, PasswordFormItem, SubmitButtonFormItem } from "@/components/inputs"
import { matchPasswordRule, requiredRule } from '@/shared/form/rules'

interface AcceptInvitationFormProps {
    token: string
}

/*
|--------------------------------------------------------------------------
| AcceptInvitationForm Component
|--------------------------------------------------------------------------
|
| UI component for creating password & completing profile.
| Delegates state management and side effects to useAcceptInvitation hook.
|
*/
const AcceptInvitationForm: React.FC<AcceptInvitationFormProps> = ({ token }) => {
    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Ant Design Form Instance
    |--------------------------------------------------------------------------
    */
    const [form] = Form.useForm()

    /*
    |--------------------------------------------------------------------------
    | Custom Hooks
    |--------------------------------------------------------------------------
    */
    const { acceptInvitation, actionLoading, error } = useAcceptInvitation()

    // Sync server-side validation errors directly into Ant Design form fields
    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Form Submission Handler
    |--------------------------------------------------------------------------
    */
    const onFinish = async (values: any) => {
         await acceptInvitation({
             token, name:
             values.name,
             password: values.password,
             password_confirmation: values.password_confirmation
         })
    }

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    */
    return (
        <Form
            name="accept_invitation"
            form={form}
            onFinish={onFinish}
            layout="vertical"
            requiredMark={false}
            className="space-y-4"
            initialValues={{ name: '', password: '', password_confirmation: '' }}
        >

            {/* Full Name Input */}
            <div className="ant-custom-input">
                <TextFormItem name="name" label={t("auth.name")} placeholder={t("auth.namePlaceholder")} rules={[requiredRule(t("validation.requiredField"))]}/>
            </div>

            {/* Password Input */}
            <div className="ant-custom-input">
                <PasswordFormItem name="password" label={t("auth.password")} placeholder={t("auth.passwordPlaceholder")} rules={[requiredRule(t("validation.requiredField"))]}/>
            </div>

            {/* Confirm Password Input */}
            <div className="ant-custom-input">
                <PasswordFormItem name="password_confirmation" label={t("auth.resetPasswordPage.confirmPassword")} placeholder={t("auth.resetPasswordPage.confirmPasswordPlaceholder")} rules={[
                    requiredRule(t("validation.requiredField")),
                    matchPasswordRule(
                        form,
                        "password",
                        t("validation.passwordsDoNotMatch")
                    ),
                ]}/>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
                <SubmitButtonFormItem label={t('invitation.accept.submit')} loading={actionLoading}/>
            </div>
        </Form>
    )
}

/*
|--------------------------------------------------------------------------
| Render Component
|--------------------------------------------------------------------------
|
*/
export default AcceptInvitationForm