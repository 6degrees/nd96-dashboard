'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { Checkbox, Form } from 'antd'

import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
interface Props {

    /*
    |--------------------------------------------------------------------------
    | Field Name
    |--------------------------------------------------------------------------
    |
    */
    name: string | [string, string]

    /*
    |--------------------------------------------------------------------------
    | Field Label
    |--------------------------------------------------------------------------
    |
    */
    label?: string
}

/*
|--------------------------------------------------------------------------
| Checkbox Form Item Component
|--------------------------------------------------------------------------
|
| Reusable checkbox component.
|
| Features:
| - true / false value
| - integrated with Ant Design Form
|
*/
export default function CheckboxFormItem({ name, label, }: Props) {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <Form.Item
            name={name}
            valuePropName="checked"
            className="
                [&_.ant-checkbox-inner]:border-gray-300
                dark:[&_.ant-checkbox-inner]:border-white/15
                [&_.ant-checkbox-inner]:bg-white
                dark:[&_.ant-checkbox-inner]:bg-white/[0.03]
                dark:[&_.ant-checkbox+span]:text-white/80
                [&_.ant-checkbox-checked_.ant-checkbox-inner]:bg-primary
                [&_.ant-checkbox-checked_.ant-checkbox-inner]:border-primary
            "
        >

            <Checkbox>
                {t(label || '')}
            </Checkbox>

        </Form.Item>
    )
}