import { Input } from 'antd'

import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| FilterTextInput Props
|--------------------------------------------------------------------------
|
*/
type FilterTextInputProps = {
    value: string
    placeholder?: string
    onChange: (value: string) => void
}

/*
|--------------------------------------------------------------------------
| FilterTextInput Component
|--------------------------------------------------------------------------
|
| Reusable text filter input component.
|
| Features:
| - translation support
| - modern UI styling
| - dark mode support
| - smooth focus states
|
*/
const FilterTextInput = (
    {
        value,
        placeholder,
        onChange,
    }: FilterTextInputProps,
) => {

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
        <Input
            value={value}

            placeholder={
                placeholder
                    ? t(placeholder)
                    : undefined
            }

            onChange={(e) =>
                onChange(e.target.value)
            }

            className="
                h-[42px]

                px-3

                rounded-xl

                border-gray-200
                dark:border-white/10

                bg-white
                dark:bg-white/[0.03]

                text-gray-700
                dark:text-white/90

                placeholder:text-gray-400
                dark:placeholder:text-white/30

                shadow-none

                transition-all
                duration-200

                hover:border-primary/50

                focus:border-primary
                focus:shadow-[0_0_0_3px_rgba(99,102,241,0.12)]

                dark:focus:border-primary

                [&_.ant-input]:bg-transparent
                dark:[&_.ant-input]:bg-transparent

                [&_.ant-input]:text-gray-700
                dark:[&_.ant-input]:text-white/90
            "
        />
    )
}

/*
|--------------------------------------------------------------------------
| Default Export
|--------------------------------------------------------------------------
|
*/
export default FilterTextInput