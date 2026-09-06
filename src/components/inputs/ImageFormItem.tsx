'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import {Form, Upload} from 'antd'

import {PlusOutlined} from '@ant-design/icons'

import {useTranslation} from 'react-i18next'

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
    name: any

    /*
    |--------------------------------------------------------------------------
    | Field Label
    |--------------------------------------------------------------------------
    |
    */
    label?: string

    /*
    |--------------------------------------------------------------------------
    | Accept
    |--------------------------------------------------------------------------
    |
    */
    accept?: string
}

/*
|--------------------------------------------------------------------------
| Image Form Item Component
|--------------------------------------------------------------------------
|
| Reusable image upload component.
|
| Features:
| - image preview
| - single image upload
| - auto hide upload button
| - integrated with Ant Design Form
| - returns Ant Design fileList
|
*/
export default function ImageFormItem({name, label, accept = 'image/*',}: Props) {
    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Provides i18n translation support.
    |
    */
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Form Instance
    |--------------------------------------------------------------------------
    |
    | Retrieves current Ant Design form instance.
    |
    */
    const form = Form.useFormInstance()

    /*
    |--------------------------------------------------------------------------
    | Watch Upload Field
    |--------------------------------------------------------------------------
    |
    | Watches field value changes to determine
    | whether an image has already been uploaded.
    |
    */
    const fileList = Form.useWatch(name, form) || []

    /*
    |--------------------------------------------------------------------------
    | Upload Button
    |--------------------------------------------------------------------------
    |
    | Custom upload placeholder UI.
    |
    */
    const uploadButton = (
        <div className="flex flex-col items-center">
            <PlusOutlined className="text-xl"/>

            <span className="mt-2 text-xs">
                {t('Upload')}
            </span>
        </div>
    )

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
        >
            <Upload
                listType="picture-card"
                maxCount={1}
                beforeUpload={() => false}
                accept={accept}
            >
                {fileList.length >= 1 ? null : uploadButton}
            </Upload>
        </Form.Item>
    )
}