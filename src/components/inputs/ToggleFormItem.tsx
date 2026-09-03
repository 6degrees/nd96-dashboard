'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { Form, Switch } from 'antd'
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

    /*
    |--------------------------------------------------------------------------
    | Field Description
    |--------------------------------------------------------------------------
    |
    */
    description?: string
}

/*
|--------------------------------------------------------------------------
| Toggle Form Item Component
|--------------------------------------------------------------------------
|
| Reusable toggle component.
|
| Features:
| - modern toggle design
| - true / false value
| - integrated with Ant Design Form
|
*/
export default function ToggleFormItem({ name, label, description, }: Props) {

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
        <div className="mb-4 flex items-center justify-between gap-4 p-4 rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">

            <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-800 dark:text-white/85">
                    {t(label || '')}
                </span>

                {description && (
                    <span className="text-xs text-gray-500 dark:text-white/40 mt-1">
                        {t(description)}
                    </span>
                )}

            </div>

            <Form.Item
                name={name}
                valuePropName="checked"
                noStyle
                className="
                    [&_.ant-switch]:bg-gray-300
                    dark:[&_.ant-switch]:bg-white/15
                    [&_.ant-switch.ant-switch-checked]:bg-primary
                ">
                <Switch />
            </Form.Item>

        </div>
    )
}