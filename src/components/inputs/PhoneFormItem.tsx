'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { Form } from 'antd'

import { Rule } from 'antd/es/form'

import { useTranslation } from 'react-i18next'

import {
    PhoneInput,
} from 'react-international-phone'

import 'react-international-phone/style.css'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
interface Props {
    name: any
    label?: string
    placeholder?: string
    rules?: Rule[]
    defaultCountry?: string
}

/*
|--------------------------------------------------------------------------
| Phone Form Item Component
|--------------------------------------------------------------------------
|
*/
export default function PhoneFormItem({
                                          name,
                                          label,
                                          placeholder,
                                          rules = [],
                                          defaultCountry = 'sa',
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

            label={
                label
                    ? t(label)
                    : undefined
            }

            rules={[...rules]}

            validateTrigger={[
                'onBlur',
                'onSubmit',
            ]}

            getValueProps={(value) => ({
                value:
                    value === null || value === undefined
                        ? ''
                        : value,
            })}

            normalize={(value) => {

                if (!value) {
                    return undefined
                }

                const cleanValue =
                    value.replace(/[^0-9]/g, '')

                if (cleanValue.length <= 4) {
                    return undefined
                }

                return value
            }}

            className="
                [&>div>div>label]:text-sm
                [&>div>div>label]:font-medium

                [&>div>div>label]:text-dark
                dark:[&>div>div>label]:text-white/60
            "
        >

            <PhoneInput
                defaultCountry={defaultCountry}

                placeholder={
                    placeholder
                        ? t(placeholder)
                        : t('Enter phone number')
                }

                inputClassName="
                    !w-full

                    !bg-white
                    dark:!bg-white/[0.03]

                    !text-gray-700
                    dark:!text-white/90

                    !border-gray-300
                    dark:!border-white/10

                    placeholder:!text-gray-400
                    dark:placeholder:!text-white/30

                    hover:!border-primary

                    focus:!border-primary

                    !transition-all
                "

                countrySelectorStyleProps={{
                    buttonClassName: `
                        !h-14
                        !min-w-[60px]

                        !border-gray-300
                        dark:!border-white/10

                        !bg-white
                        dark:!bg-white/[0.03]

                        !rounded-l-lg

                        hover:!border-primary

                        !transition-all
                    `,
                }}

                inputStyle={{
                    width: '100%',
                    height: '56px',

                    borderRadius: '0',
                    borderTopRightRadius: '0.5rem',
                    borderBottomRightRadius: '0.5rem',

                    borderColor: '#d1d5db',
                }}
            />

        </Form.Item>
    )
}