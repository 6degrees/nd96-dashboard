'use client'

import { Form, Row, Col, Input, InputNumber, Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import FormCard from '@/components/cards'
import { SubmitButtonFormItem, TextFormItem } from '@/components/inputs'
import { useFormErrors } from '@/hooks/useFormErrors'
import { requiredRule } from '@/shared/form/rules'
import { FormProps } from '@/types/form-props'

/*
|--------------------------------------------------------------------------
| Timeline Milestone Form
|--------------------------------------------------------------------------
|
| Shared form used for:
| - create milestone
| - update milestone
|
| Timeline ID is taken from the URL.
| Image is uploaded with the milestone.
|
*/

export default function TimelineMilestoneForm({ onSubmit, data, isEdit = false }: FormProps) {
    const { t } = useTranslation()

    const [form] = Form.useForm()

    const { actionLoading, error } = useSelector((state: any) => state.timelineMilestone)

    useFormErrors(error, form)

    useEffect(() => {
        if (!data) return

        form.setFieldsValue(data)
    }, [data, form])

    return (
        <Form form={form} layout="vertical" onFinish={onSubmit} className="space-y-8">
            <FormCard title={isEdit ? 'timelineMilestone.update' : 'timelineMilestone.create'}>
                <Row gutter={[24, 24]}>
                    <Col xs={24} md={12}>
                        <TextFormItem name="title_ar" label={t('timelineMilestone.inputs.title_ar')} placeholder={t('timelineMilestone.inputs.title_ar')} rules={[requiredRule(t('validation.requiredField'))]} />
                    </Col>

                    <Col xs={24} md={12}>
                        <TextFormItem name="title_en" label={t('timelineMilestone.inputs.title_en')} placeholder={t('timelineMilestone.inputs.title_en')} />
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="year" label={t('timelineMilestone.inputs.year')} rules={[requiredRule(t('validation.requiredField'))]}>
                            <InputNumber className="!w-full" placeholder={t('timelineMilestone.inputs.year')} min={1} max={9999} />
                        </Form.Item>
                    </Col>

                    <Col xs={24} md={12}>
                        <Form.Item name="sort_order" label={t('timelineMilestone.inputs.sort')} rules={[requiredRule(t('validation.requiredField'))]}>
                            <InputNumber className="!w-full" placeholder={t('timelineMilestone.inputs.sort')} min={1} max={255} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item name="description_ar" label={t('timelineMilestone.inputs.description_ar')}>
                            <Input.TextArea placeholder={t('timelineMilestone.inputs.description_ar')} rows={4} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item name="description_en" label={t('timelineMilestone.inputs.description_en')}>
                            <Input.TextArea placeholder={t('timelineMilestone.inputs.description_en')} rows={4} />
                        </Form.Item>
                    </Col>

                    <Col xs={24}>
                        <Form.Item name="image" label={t('timelineMilestone.inputs.image')}>
                            <Upload listType="picture-card" maxCount={1} beforeUpload={() => false}>
                                <button type="button" className="border-0 bg-transparent">
                                    <PlusOutlined />
                                    <div className="mt-2">{t('common.upload')}</div>
                                </button>
                            </Upload>
                        </Form.Item>
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