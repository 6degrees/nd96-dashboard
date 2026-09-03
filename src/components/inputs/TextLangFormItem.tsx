'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import { useState } from 'react'

import {
    Form,
    Input,
    Button,
} from 'antd'

import { useTranslation } from 'react-i18next'

import { SUPPORTED_LANGUAGES } from '@/i18n'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
interface Language {

    /*
    |--------------------------------------------------------------------------
    | Language Code
    |--------------------------------------------------------------------------
    |
    */
    code: string

    /*
    |--------------------------------------------------------------------------
    | Language Label
    |--------------------------------------------------------------------------
    |
    */
    label: string
}

interface Props {

    /*
    |--------------------------------------------------------------------------
    | Field Name
    |--------------------------------------------------------------------------
    |
    */
    name: string | (string | number)[]

    /*
    |--------------------------------------------------------------------------
    | Field Label
    |--------------------------------------------------------------------------
    |
    */
    label?: string

    /*
    |--------------------------------------------------------------------------
    | Placeholder
    |--------------------------------------------------------------------------
    |
    */
    placeholder?: string

    /*
    |--------------------------------------------------------------------------
    | Validation Rules
    |--------------------------------------------------------------------------
    |
    */
    rules?: any[]
}

/*
|--------------------------------------------------------------------------
| Lang Form Item Component
|--------------------------------------------------------------------------
|
| Reusable multilingual form input component.
|
| Features:
| - uses current website language
| - auto detects project languages
| - expandable secondary language input
| - scalable multilingual structure
| - modern UI
| - dark mode support
| - strict auto-expands on validation failure without extra labels
|
*/
export default function TextLangFormItem({ name, label, placeholder, rules = [] }: Props) {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const { t, i18n } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Form Instance Context
    |--------------------------------------------------------------------------
    |
    */
    const form = Form.useFormInstance()

    /*
    |--------------------------------------------------------------------------
    | Expand State
    |--------------------------------------------------------------------------
    |
    */
    const [isOpen, setIsOpen] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Project Languages
    |--------------------------------------------------------------------------
    |
    | Automatically loads supported
    | languages from i18n config.
    |
    */
    const languages: Language[] =
        SUPPORTED_LANGUAGES.map(
            (language) => ({
                code: language,
                label: language === 'ar'
                    ? 'العربية'
                    : language === 'en'
                        ? 'English'
                        : language.toUpperCase(),
            }),
        )

    /*
    |--------------------------------------------------------------------------
    | Current Language
    |--------------------------------------------------------------------------
    |
    | Uses current website language
    | as the primary input language.
    |
    */
    const currentLanguage =
        languages.find((lang) => lang.code === i18n.language)
        || languages[0]

    /*
    |--------------------------------------------------------------------------
    | Secondary Language
    |--------------------------------------------------------------------------
    |
    | Uses remaining languages
    | as expandable inputs.
    |
    */
    const secondaryLanguages =
        languages.filter(
            (lang) => lang.code !== currentLanguage.code,
        )

    /*
    |--------------------------------------------------------------------------
    | Field Name Resolver
    |--------------------------------------------------------------------------
    |
    | Resolves the field name path correctly by appending the language code
    | with an underscore (e.g., full_name_en) even if nested in an array.
    |
    */
    const getFieldName = (langCode: string) => {

        if (Array.isArray(name)) {

            const lastIndex = name.length - 1

            const updatedPath = [...name]

            updatedPath[lastIndex] =
                `${name[lastIndex]}_${langCode}`

            return updatedPath
        }

        return `${name}_${langCode}`
    }

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <div className="w-full flex flex-col gap-1">

            {/* Main Input */}
            <Form.Item
                name={getFieldName(currentLanguage.code)}
                label={label}
                rules={rules}

                className="
                    mb-1

                    [&>div>div>label]:text-sm
                    [&>div>div>label]:font-medium

                    [&>div>div>label]:text-gray-700
                    dark:[&>div>div>label]:text-white/80
                "
            >

                <Input
                    size="large"

                    placeholder={
                        placeholder
                        || currentLanguage.label
                    }

                    className="
                        rounded-xl

                        border-gray-200
                        dark:border-white/10

                        bg-white
                        dark:bg-white/[0.03]

                        text-gray-700
                        dark:text-white/90

                        placeholder:text-gray-400
                        dark:placeholder:text-white/30

                        hover:border-primary/50

                        focus:border-primary

                        transition-all
                    "

                    /*
                    |--------------------------------------------------------------------------
                    | Language Toggle Button
                    |--------------------------------------------------------------------------
                    |
                    */
                    suffix={
                        secondaryLanguages.length > 0 && (

                            <Button
                                type="primary"

                                size="small"

                                onClick={() =>
                                    setIsOpen(!isOpen)
                                }

                                className="
                                    border-none

                                    bg-primary

                                    px-3

                                    text-xs
                                    font-medium

                                    h-7

                                    rounded-lg

                                    hover:bg-primary/90

                                    shadow-sm
                                    shadow-primary/20

                                    z-20
                                "
                            >
                                {
                                    secondaryLanguages.length === 1
                                        ? secondaryLanguages[0].label
                                        : `+${secondaryLanguages.length}`
                                }
                            </Button>
                        )
                    }
                />

            </Form.Item>

            {/*
                Ant Design Form.Item wrapper used as a pure listener.
                By utilizing 'shouldUpdate', it hooks into the form lifecycle and forces
                the check for errors whenever the form validates or changes.
            */}
            <Form.Item
                shouldUpdate
                className="m-0 p-0"
                noStyle
            >
                {() => {

                    if (form && !isOpen) {

                        const hasSecondaryErrors =
                            secondaryLanguages.some((lang) => {

                                const errors =
                                    form.getFieldError(
                                        getFieldName(lang.code),
                                    )

                                return errors && errors.length > 0
                            })

                        if (hasSecondaryErrors) {

                            // Delays state updates to prevent React re-render conflicts
                            setTimeout(
                                () => setIsOpen(true),
                                0,
                            )
                        }
                    }

                    return null
                }}
            </Form.Item>

            {/* Secondary Languages */}
            <div
                className={`
                    w-full
                    transition-all
                    duration-300
                    ease-in-out
                    overflow-hidden
                    ${isOpen
                    ? 'max-h-[500px] opacity-100 mt-2'
                    : 'max-h-0 opacity-0 pointer-events-none mt-0'
                }
                `}
            >

                <div
                    className="
                        w-full
                        rounded-2xl
                        border border-gray-200
                        dark:border-white/10
                        bg-gray-50/50
                        dark:bg-white/[0.03]
                        p-4
                        flex flex-col
                        gap-3
                    ">

                    {secondaryLanguages.map((language) => (

                        <Form.Item
                            key={language.code}
                            name={getFieldName(language.code)}
                            rules={rules}
                            className="mb-0 w-full">
                            <Input
                                size="large"
                                placeholder={language.label}
                                className="
                                    rounded-xl
                                    bg-white
                                    dark:bg-[#0f172a]
                                    border-gray-200
                                    dark:border-white/10
                                    text-gray-700
                                    dark:text-white/90
                                    placeholder:text-gray-400
                                    dark:placeholder:text-white/30
                                    hover:border-primary/50
                                    focus:border-primary
                                    transition-all
                               "
                            />

                        </Form.Item>
                    ))}

                </div>
            </div>

        </div>
    )
}