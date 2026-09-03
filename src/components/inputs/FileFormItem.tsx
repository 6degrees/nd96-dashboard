'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { Form, Upload } from 'antd'

import { PlusOutlined } from '@ant-design/icons'

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
    | Accepted File Types
    |--------------------------------------------------------------------------
    |
    */
    accept?: string

    /*
    |--------------------------------------------------------------------------
    | Maximum Files Count
    |--------------------------------------------------------------------------
    |
    */
    maxCount?: number
}

/*
|--------------------------------------------------------------------------
| File Form Item Component
|--------------------------------------------------------------------------
|
| Reusable file upload component.
|
| Features:
| - file upload UI
| - supports any file type
| - integrated with Ant Design Form
|
*/
export default function FileFormItem({
                                         name,
                                         label,
                                         accept = '*',
                                         maxCount = 1,
                                     }: Props) {

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

            label={label}

            valuePropName="fileList"

            getValueFromEvent={(e) => {

                if (Array.isArray(e)) {
                    return e
                }

                return e?.fileList
            }}

            className="
                [&>div>div>label]:text-sm
                [&>div>div>label]:font-medium

                [&>div>div>label]:text-dark
                dark:[&>div>div>label]:text-white/60
            "
        >

            <Upload
                beforeUpload={() => false}

                maxCount={maxCount}

                accept={accept}

                className="
                    dark:[&_.ant-upload-list-item]:bg-white/[0.03]

                    dark:[&_.ant-upload-list-item]:border-white/10

                    dark:[&_.ant-upload-list-item-name]:text-white/80

                    dark:[&_.ant-upload-list-item-actions]:text-white/50
                "
            >

                <button
                    type="button"

                    className="
                        flex items-center
                        gap-2

                        px-4
                        py-2

                        rounded-lg

                        border

                        border-gray-200
                        dark:border-white/10

                        bg-white
                        dark:bg-white/[0.03]

                        text-gray-700
                        dark:text-white/80

                        hover:bg-gray-50
                        dark:hover:bg-white/5

                        hover:border-primary/50

                        transition-all
                    "
                >

                    <PlusOutlined />

                    <span>
                        {t('Upload File')}
                    </span>

                </button>

            </Upload>

        </Form.Item>
    )
}