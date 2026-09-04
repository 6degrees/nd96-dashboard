'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/

import { Form } from 'antd'
import { useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
*/

import FormCard from '@/components/cards'
import {
    EmailFormItem,
    PasswordFormItem,
    SubmitButtonFormItem,
    TextFormItem,
} from '@/components/inputs'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

import { useFormErrors } from '@/hooks/useFormErrors'

/*
|--------------------------------------------------------------------------
| Shared Rules
|--------------------------------------------------------------------------
*/

import {
    matchPasswordRule,
    requiredRule,
} from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

import { FormProps } from '@/types/form-props'

/*
|--------------------------------------------------------------------------
| User Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - Create user
| - Update user
|
| Fields:
| - Name
| - Email
| - Password
| - Password confirmation
|
*/

export default function UserForm({onSubmit, data, isEdit = false,}: FormProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Ant Design Form
    |--------------------------------------------------------------------------
    */

    const [form] = Form.useForm()

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    */

    const { actionLoading, error } = useSelector(
        (state: any) => state.user
    )

    /*
    |--------------------------------------------------------------------------
    | Backend Validation Errors
    |--------------------------------------------------------------------------
    */

    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Populate Edit Data
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!data) return

        form.setFieldsValue({
            name: data.name ?? '',
            email: data.email ?? '',
        })
    }, [data, form])

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onSubmit}
            initialValues={{
                name: '',
                email: '',
                password: '',
                password_confirmation: '',
            }}
            className="space-y-6">

            {/*
            |--------------------------------------------------------------------------
            | User Information
            |--------------------------------------------------------------------------
            */}

            <FormCard title={isEdit ? 'user.edit' : 'user.create'}>

                <div className="space-y-5">

                    {/*
                    |--------------------------------------------------------------------------
                    | Name
                    |--------------------------------------------------------------------------
                    */}

                    <TextFormItem
                        name="name"
                        label="user.inputs.name"
                        placeholder="user.inputs.namePlaceholder"
                        rules={[
                            requiredRule(
                                t('validation.requiredField')
                            ),
                        ]}
                    />

                    {/*
                    |--------------------------------------------------------------------------
                    | Email
                    |--------------------------------------------------------------------------
                    */}

                    <EmailFormItem
                        name="email"
                        label="user.inputs.email"
                        placeholder="user.inputs.emailPlaceholder"
                        rules={[
                            requiredRule(
                                t('validation.requiredField')
                            ),
                        ]}
                    />

                    {/*
                    |--------------------------------------------------------------------------
                    | Password
                    |--------------------------------------------------------------------------
                    |
                    | Password is required when creating a user.
                    | During editing it can remain empty so the existing
                    | password is not changed.
                    |
                    */}

                    <PasswordFormItem
                        name="password"
                        label="user.inputs.password"
                        placeholder="user.inputs.passwordPlaceholder"
                        rules={
                            isEdit
                                ? []
                                : [
                                    requiredRule(
                                        t('validation.requiredField')
                                    ),
                                ]
                        }
                    />

                    {/*
                    |--------------------------------------------------------------------------
                    | Password Confirmation
                    |--------------------------------------------------------------------------
                    */}

                    <PasswordFormItem
                        name="password_confirmation"
                        label="user.inputs.passwordConfirmation"
                        placeholder="user.inputs.passwordConfirmationPlaceholder"
                        rules={
                            isEdit
                                ? [
                                    matchPasswordRule(
                                        form,
                                        'password',
                                        t('validation.passwordsDoNotMatch')
                                    ),
                                ]
                                : [
                                    requiredRule(
                                        t('validation.requiredField')
                                    ),
                                    matchPasswordRule(
                                        form,
                                        'password',
                                        t('validation.passwordsDoNotMatch')
                                    ),
                                ]
                        }
                    />

                </div>

            </FormCard>

            {/*
            |--------------------------------------------------------------------------
            | Actions
            |--------------------------------------------------------------------------
            */}

            <div className="flex justify-end">
                <SubmitButtonFormItem label={isEdit ? 'common.update' : 'user.create'} loading={actionLoading} background="linear-gradient(135deg, #00843D 0%, #006B35 100%)"/>
            </div>

        </Form>
    )
}