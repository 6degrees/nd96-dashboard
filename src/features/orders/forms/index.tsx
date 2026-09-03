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
import { phoneRule, requiredRule } from '@/shared/form/rules'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
import FormCard from '@/components/cards'
import {
    TextFormItem,
    EmailFormItem,
    PhoneFormItem,
    SubmitButtonFormItem,
    TextLangFormItem,
    FloatNumberFormItem,
    FileFormItem,
    HiddenFormItem,
} from '@/components/inputs'
import { useFormErrors } from '@/hooks/useFormErrors'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { FormProps } from '@/types/form-props'
import { useParams } from 'next/navigation'

/*
|--------------------------------------------------------------------------
| Order Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - create region
| - update region
|
*/
export default function OrderForm({ onSubmit, data, isEdit = false }: FormProps) {
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
    const { actionLoading, error } = useSelector((state: any) => state.order)
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
        form.setFieldsValue({
            ...data,
        })
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
            {/* Company Information */}
            <HiddenFormItem name={'company'} />

            {/* Basic Information */}
            <FormCard title={'Basic Information'}>
                <Row gutter={[24, 24]}>

                    <Col xs={24} md={12}>
                        <TextLangFormItem name="number" label="order.inputs.number" rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>

                    <Col xs={24} md={12}>
                        <EmailFormItem name="email" label="Email Address" placeholder="john@example.com" rules={[requiredRule(t('Required field'))]} />
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} md={12}>
                        <PhoneFormItem name="phone_number" label="Phone Number" rules={[phoneRule(t('Required field'))]} />
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} md={12}>
                        <PhoneFormItem name="mobile_number" label="Mobile Number" rules={[]} />
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} md={12}>
                        <PhoneFormItem name="admin_mobile_number" label="Admin Mobile Number" rules={[]} />
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} md={12}>
                        <PhoneFormItem name="hotline_number" label="Hotline Number" rules={[]} />
                    </Col>

                    {/* Phone Number */}
                    <Col xs={24} md={12}>
                        <PhoneFormItem name="fax_number" label="Fax Number" rules={[]} />
                    </Col>

                </Row>
            </FormCard>

            {/* Commercial Information */}
            <FormCard title={'Commercial Information'}>
                <Row gutter={[24, 24]}>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="commercial_registration_number" label="Commercial Registration Number" precision={0} rules={[requiredRule(t('Required field'))]} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="tax_registration_number" label="Tax Registration Number" precision={0} rules={[requiredRule(t('Required field'))]} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="commercial_activity_license_number" label="Commercial Activity License Number" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FileFormItem name="commercial_registration_file" label="Commercial Registration File" />
                    </Col>

                </Row>
            </FormCard>

            {/* Tourism Information */}
            <FormCard title={'Tourism Information'}>
                <Row gutter={[24, 24]}>

                    <Col xs={24} md={12}>
                        <TextFormItem name="tourism_license_no" label="Tourism License Number" />
                    </Col>

                    <Col xs={24} md={12}>
                        <TextFormItem name="tourism_license_exp_date" label="Tourism License Expiry Date" />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="number_of_rooms" label="Number Of Rooms" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="number_of_beds" label="Number Of Beds" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FileFormItem name="tourism_license_file" label="Tourism License File" />
                    </Col>

                </Row>
            </FormCard>

            {/* Location */}
            <FormCard title={'Location'}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="latitude" label="Latitude" placeholder="Latitude" />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="longitude" label="Longitude" placeholder="Longitude" />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="building_number" label="Building Number" placeholder="Building Number" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="secondary_number" label="Secondary Number" placeholder="Secondary Number" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <FloatNumberFormItem name="postal_code" label="Postal Code" placeholder="Postal Code" precision={0} />
                    </Col>

                    <Col xs={24} md={12}>
                        <TextFormItem name="short_address" label="Short Address" placeholder="Short Address" />
                    </Col>
                </Row>
            </FormCard>


            {/* Actions */}
            <div className="flex">
                <div className="ms-auto">
                    <SubmitButtonFormItem label={isEdit ? 'UPDATE' : 'CREATE'} loading={actionLoading} />
                </div>
            </div>
        </Form>
    )
}