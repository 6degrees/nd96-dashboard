import { Form, Input } from 'antd'
import { Rule } from 'antd/es/form'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| TextFormItem Props
|--------------------------------------------------------------------------
*/
type TextFormItemProps = {
    name: any
    label: string
    placeholder?: string
    readOnly?: boolean
    hidden?: boolean
    rules?: Rule[]
}

/*
|--------------------------------------------------------------------------
| TextFormItem Component
|--------------------------------------------------------------------------
*/
const TextFormItem = (
    {
        name,
        label,
        placeholder,
        readOnly = false,
        hidden = false,
        rules = [],
    }: TextFormItemProps) => {
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
            hidden={hidden}
            rules={rules?.map((rule) => {
                const baseRule = { ...rule } as any
                return {
                    ...baseRule,
                    message: baseRule.message ? t(baseRule.message) : baseRule.message,
                }
            })}
            label={t(label)}
            className="
                mb-0
                [&>div>div>label]:text-sm
                [&>div>div>label]:font-semibold
                [&>div>div>label]:text-slate-700
                dark:[&>div>div>label]:text-slate-300
                [&>div>div>label]:mb-2
            "
        >
            <Input
                placeholder={placeholder ? t(placeholder) : undefined}
                hidden={hidden}
                readOnly={readOnly}
                className="
                    h-10
                    rounded-2xl

                    border
                    border-slate-200
                    bg-white

                    px-5

                    text-base
                    font-medium
                    text-slate-700
                    placeholder:text-slate-400

                    transition-colors
                    duration-200

                    hover:border-slate-300
                    focus:border-indigo-500
                    focus:shadow-none
                    focus:ring-0

                    dark:bg-slate-900
                    dark:border-slate-700
                    dark:text-white
                "
            />
        </Form.Item>
    )
}

export default TextFormItem