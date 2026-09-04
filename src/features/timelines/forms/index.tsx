'use client'

import { Form, Row, Col } from 'antd'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { requiredRule } from '@/shared/form/rules'
import FormCard from '@/components/cards'
import { SubmitButtonFormItem, TextFormItem } from '@/components/inputs'
import { useFormErrors } from '@/hooks/useFormErrors'
import { FormProps } from '@/types/form-props'

/*
|--------------------------------------------------------------------------
| Timeline Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - create timeline
| - update timeline
|
*/

export default function TimelineForm({ onSubmit, data, isEdit = false }: FormProps) {

    const { t } = useTranslation()

    const [form] = Form.useForm()

    const { actionLoading, error } = useSelector((state: any) => state.timeline)

    useFormErrors(error, form)

    useEffect(() => {
        if (!data) return

        form.setFieldsValue(data)
    }, [data, form])

    return (
        <Form form={form} layout="vertical" onFinish={onSubmit} className="space-y-8">

            <FormCard title={isEdit ? 'timeline.update' : 'timeline.create'}>

                <Row gutter={[24, 24]}>

                    <Col xs={24} md={24}>
                        <TextFormItem name="name_ar" label={t('timeline.inputs.name_ar')} placeholder={t('timeline.inputs.name_ar')} rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>

                    <Col xs={24} md={24}>
                        <TextFormItem name="name_en" label={t('timeline.inputs.name_en')} placeholder={t('timeline.inputs.name_en')} />
                    </Col>

                    <Col xs={24} md={24}>
                        <TextFormItem name="start_year" label={t('timeline.inputs.startYear')} placeholder={t('timeline.inputs.startYear')} rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>

                    <Col xs={24} md={24}>
                        <TextFormItem name="end_year" label={t('timeline.inputs.endYear')} placeholder={t('timeline.inputs.endYear')} />
                    </Col>

                    <Col xs={24} md={24}>
                        <TextFormItem name="sort_order" label={t('timeline.inputs.sortOrder')} placeholder={t('timeline.inputs.sortOrder')} rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>

                </Row>

            </FormCard>

            <div className="flex">
                <div className="ms-auto">
                    <SubmitButtonFormItem label={isEdit ? 'common.update' : 'common.create'} loading={actionLoading} background="linear-gradient(135deg, #00843D 0%, #006B35 100%)" />
                </div>
            </div>

        </Form>
    )
}