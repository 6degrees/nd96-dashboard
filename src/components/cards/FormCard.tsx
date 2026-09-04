import React from 'react'
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
    | Card Title
    |--------------------------------------------------------------------------
    |
    | Main heading displayed at the top of the form card.
    |
    */
    title?: string

    /*
    |--------------------------------------------------------------------------
    | Card Description
    |--------------------------------------------------------------------------
    |
    | Optional helper text displayed below the title.
    |
    */
    description?: string

    /*
    |--------------------------------------------------------------------------
    | Card Content
    |--------------------------------------------------------------------------
    |
    | Main form content rendered inside the card.
    |
    */
    children: React.ReactNode

    /*
    |--------------------------------------------------------------------------
    | Custom Classes
    |--------------------------------------------------------------------------
    |
    | Allows extending or overriding default card styles.
    |
    */
    className?: string
}

/*
|--------------------------------------------------------------------------
| Form Card Component
|--------------------------------------------------------------------------
|
| Reusable modern card wrapper for form sections.
|
*/
export default function FormCard({ title, description, children, className = '', }: Props) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    | Initialize translation hook for i18n support.
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
        <section
            className={`
                rounded-2xl 
                border border-neutral-200/50 
                dark:border-neutral-800/65 
                bg-white 
                dark:bg-neutral-950 
                shadow-[0_1px_2px_rgba(0,0,0,0.02),0_4px_16px_-4px_rgba(0,0,0,0.02),0_12px_32px_-8px_rgba(0,0,0,0.03)] 
                hover:shadow-[0_1px_3px_rgba(0,0,0,0.02),0_8px_24px_-4px_rgba(0,0,0,0.03),0_20px_48px_-8px_rgba(0,0,0,0.04)]
                transition-all 
                duration-500 
                ease-out
                ${className}
            `}
        >
            {/* Header */}
            {(title || description) && (
                <div className="
                    px-6 py-5 md:px-8
                    border-b border-neutral-100/70
                    dark:border-neutral-900/40
                    bg-neutral-50/[0.3]
                    dark:bg-neutral-900/[0.05]
                ">

                    {/* Title */}
                    {title && (
                        <h2 className="text-[16px] font-bold text-neutral-800 dark:text-neutral-100 m-0 tracking-tight">
                            {t(title)}
                        </h2>
                    )}

                    {/* Description */}
                    {description && (
                        <p className="mt-1 text-[12px] font-normal text-neutral-400 dark:text-neutral-500 leading-relaxed m-0">
                            {t(description)}
                        </p>
                    )}
                </div>
            )}

            {/* Content */}
            <div className="px-6 py-6 md:px-8 md:py-7 w-full">
                {children}
            </div>

        </section>
    )
}