'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import {Form, Row, Col} from 'antd'
import {useTranslation} from 'react-i18next'

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
import {requiredRule} from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
import FormCard from '@/components/cards'
import {SubmitButtonFormItem, TextFormItem} from '@/components/inputs'
import {useFormErrors} from '@/hooks/useFormErrors'
import {useSelector} from 'react-redux'
import {useEffect} from 'react'
import {FormProps} from '@/types/form-props'

/*
|--------------------------------------------------------------------------
| Department Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - create department
| - update department
|
*/
export default function DepartmentForm({onSubmit, data, isEdit = false,}: FormProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    | Initialize translation hook for i18n support.
    |
    */
    const {t} = useTranslation()

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
    const {actionLoading, error} = useSelector((state: any) => state.Department)
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
        <Form form={form} layout="vertical" onFinish={onSubmit} className="space-y-8">
            {/* Basic Information */}
            <FormCard title={'department.create'}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={24}>
                        <TextFormItem name="name_ar" label={t('department.inputs.name_ar')} placeholder={t('department.inputs.name_ar')} rules={[requiredRule(t('validation.requiredField'))]}/>
                    </Col>
                </Row>

                <Row gutter={[24, 24]}>
                    <Col xs={24} md={24}>
                        <TextFormItem name="name_en" label={t('department.inputs.name_en')} placeholder={t('department.inputs.name_en')} rules={[requiredRule(t('validation.requiredField'))]}/>
                    </Col>
                </Row>
            </FormCard>

            {/* Actions */}
            <div className="flex">
                <div className="ms-auto">
                    <SubmitButtonFormItem label={isEdit ? 'common.update' : 'common.create'} loading={actionLoading} background="linear-gradient(135deg, #00843D 0%, #006B35 100%)"/>
                </div>
            </div>
        </Form>

    )
}