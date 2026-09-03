'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/


/*
|--------------------------------------------------------------------------
| Shared Rules
|--------------------------------------------------------------------------
|
*/
import { requiredRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
import FormCard from '@/components/cards'
import {EmailFormItem, SubmitButtonFormItem} from '@/components/inputs'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useSelector } from 'react-redux'
import { FormProps } from '@/types/form-props'
import { useParams } from 'next/navigation'
import {useEffect} from "react";
import {RoleDropdownFormItem} from "@/features/users";

/*
|--------------------------------------------------------------------------
| User Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - create region
| - update region
|
*/
export default function UserForm({ onSubmit, data, isEdit = false }: FormProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    | Initialize translation hook for i18n support.
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Params
    |--------------------------------------------------------------------------
    |
    */
    const params = useParams()

    /*
    |--------------------------------------------------------------------------
    | Ant Design Form Instance
    |--------------------------------------------------------------------------
    |
    */
    const [form] = Form.useForm()

    /*
    |--------------------------------------------------------------------------
    | Form Error Handler Hook
    |--------------------------------------------------------------------------
    |
    | Syncs backend/API error messages with Ant Design form fields.
    | Automatically maps server validation errors to form inputs
    | using the provided Form instance.
    |
    */
    const { actionLoading, error } = useSelector((state: any) => state.invitation)
    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Populate Form Values
    |--------------------------------------------------------------------------
    |
    | Ant Design `initialValues` only works on first render.
    | Since edit data is loaded asynchronously from the API,
    | we manually update form fields whenever `data` changes.
    |
    | The Upload component expects images in `fileList` format,
    | so we transform the existing image URL into antd Upload
    | file object structure.
    |
    */
    /*
    |--------------------------------------------------------------------------
    | Populate Form Values
    |--------------------------------------------------------------------------
    |
    | Ant Design `initialValues` only works on first render.
    | Since edit data is loaded asynchronously from the API,
    | we manually update form fields whenever `data` changes.
    |
    | The Upload component expects images in `fileList` format,
    | so we transform the existing image URL into antd Upload
    | file object structure.
    |
    */
    useEffect(() => {
        if (!data) return
        form.setFieldsValue(data)
    }, [data, form])

    /*
    |--------------------------------------------------------------------------
    | Render Form
    |--------------------------------------------------------------------------
    |
    */
    return (
        <Form form={form} layout="vertical" onFinish={onSubmit} initialValues={{ 'company': params?.id }}
              className="space-y-8">

            {/* Basic Information */}
            <FormCard title={'user.create'}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={24}>
                        <EmailFormItem name="email" label="user.inputs.email" placeholder="user.inputs.emailPlaceholder" rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>
                </Row>

                <Col xs={24} md={24}>
                    <RoleDropdownFormItem name="role" label="user.inputs.role" placeholder="user.inputs.rolePlaceholder" rules={[requiredRule(t('validation.requiredField')),]} />
                </Col>
            </FormCard>

            {/* Actions */}
            <div className="flex">
                <div className="ms-auto">
                    <SubmitButtonFormItem label={isEdit ? 'UPDATE' : 'user.create'} loading={actionLoading} background="linear-gradient(to right, #020618, #0f172a, #1e293b)" />
                </div>
            </div>
        </Form>
    )
}