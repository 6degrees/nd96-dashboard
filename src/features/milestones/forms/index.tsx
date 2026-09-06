'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import { Form, Row, Col, Input } from 'antd'

import { useTranslation } from 'react-i18next'

import { useEffect } from 'react'

import { useSelector } from 'react-redux'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import FormCard from '@/components/cards'

import {
    FloatNumberFormItem,
    SubmitButtonFormItem,
    TextFormItem,
} from '@/components/inputs'

import ImageFormItem from '@/components/inputs/ImageFormItem'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import { useFormErrors } from '@/hooks/useFormErrors'

/*
|--------------------------------------------------------------------------
| Rules
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
| Timeline ID is passed from the parent component.
| Image is uploaded with the milestone.
|
*/

interface TimelineMilestoneFormProps extends FormProps {
    timelineId?: string
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

export default function TimelineMilestoneForm({onSubmit, data, isEdit = false, timelineId,}: TimelineMilestoneFormProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    |
    */

    const [form] = Form.useForm()

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const {
        actionLoading,
        error,
    } = useSelector(
        (state: any) => state.milestone
    )

    /*
    |--------------------------------------------------------------------------
    | Form Errors
    |--------------------------------------------------------------------------
    |
    */

    useFormErrors(error, form)

    /*
    |--------------------------------------------------------------------------
    | Form Data
    |--------------------------------------------------------------------------
    |
    | Populate the form when editing an existing milestone.
    |
    */

    useEffect(() => {

        if (!data) return

        form.setFieldsValue({
            ...data,

            image: data?.image
                ? [
                    {
                        uid: '-1',
                        name: 'image.png',
                        status: 'done',
                        url: data.image,
                    },
                ]
                : [],
        })

    }, [data, form])

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    |
    | Timeline ID is injected automatically.
    |
    */

    const handleSubmit = (values: any) => {

        onSubmit({
            ...values,

            timeline_id: timelineId,
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            className="space-y-8"
        >

            <FormCard
                title={
                    isEdit
                        ? 'milestone.update'
                        : 'milestone.create'
                }
            >

                <Row gutter={[24, 24]}>

                    {/* -------------------------------------------------------- */}
                    {/* Arabic Title */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24} md={12}>

                        <TextFormItem
                            name="title_ar"
                            label={t('milestone.inputs.title_ar')}
                            placeholder={t('milestone.inputs.title_ar')}
                            rules={[
                                requiredRule(
                                    t('validation.requiredField')
                                ),
                            ]}
                        />

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* English Title */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24} md={12}>

                        <TextFormItem
                            name="title_en"
                            label={t('milestone.inputs.title_en')}
                            placeholder={t('milestone.inputs.title_en')}
                            rules={[
                                requiredRule(
                                    t('validation.requiredField')
                                ),
                            ]}
                        />

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* Year */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24} md={12}>

                        <FloatNumberFormItem
                            name="year"
                            label="milestone.inputs.year"
                            placeholder="milestone.inputs.year"
                            min={1}
                            max={9999}
                            step={1}
                            precision={0}
                            rules={[
                                requiredRule(
                                    t('validation.requiredField')
                                ),
                            ]}
                        />

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* Sort Order */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24} md={12}>

                        <FloatNumberFormItem
                            name="sort_order"
                            label="milestone.inputs.sortOrder"
                            placeholder="milestone.inputs.sortOrder"
                            min={1}
                            max={255}
                            step={1}
                            precision={0}
                            rules={[
                                requiredRule(
                                    t('validation.requiredField')
                                ),
                            ]}
                        />

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* Arabic Description */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24}>

                        <Form.Item
                            name="description_ar"
                            label={t(
                                'milestone.inputs.description_ar'
                            )}
                        >

                            <Input.TextArea
                                placeholder={t(
                                    'milestone.inputs.description_ar'
                                )}
                                rows={4}
                            />

                        </Form.Item>

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* English Description */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24}>

                        <Form.Item
                            name="description_en"
                            label={t(
                                'milestone.inputs.description_en'
                            )}
                        >

                            <Input.TextArea
                                placeholder={t(
                                    'milestone.inputs.description_en'
                                )}
                                rows={4}
                            />

                        </Form.Item>

                    </Col>

                    {/* -------------------------------------------------------- */}
                    {/* Image */}
                    {/* -------------------------------------------------------- */}

                    <Col xs={24}>

                        <ImageFormItem
                            name="image"
                            label={t(
                                'milestone.inputs.image'
                            )}
                        />

                    </Col>

                </Row>

            </FormCard>

            {/* ---------------------------------------------------------------- */}
            {/* Submit */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex">

                <div className="ms-auto">

                    <SubmitButtonFormItem
                        label={
                            isEdit
                                ? 'common.update'
                                : 'common.create'
                        }
                        loading={actionLoading}
                        background="linear-gradient(135deg, #00843D 0%, #006B35 100%)"
                    />

                </div>

            </div>

        </Form>
    )
}