import React from 'react'
import { Row, Button } from 'antd'
import { UilPlus, UilMinus } from '@iconscout/react-unicons'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Page Filter Component
|--------------------------------------------------------------------------
|
| This component is responsible for rendering a reusable filter panel
| inside admin pages.
|
| Features:
| - Collapsible filter section
| - Reusable across all pages
| - Supports dynamic filter fields via children
| - Supports search action handler
| - Supports internationalization (i18n)
|
| Usage:
| - Used in list pages (users, supervisors, roles, etc.)
|
| Goal:
| - Standardize filter UI across the system
| - Avoid repeating filter layout in every page
|
*/

interface PageFilterProps {
    title?: string
    isOpen: boolean
    onToggle: () => void
    onSearch: () => void
    children: React.ReactNode
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
*/

const PageFilter = (
    {
        title = 'filters',
        isOpen,
        onToggle,
        onSearch,
        children,
    }: PageFilterProps) => {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    return (
        <div
            className="
            bg-white/80
            dark:bg-neutral-950/80
            rounded-2xl
            border border-neutral-200/60
            dark:border-neutral-800/60
            shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
            mb-8
            overflow-hidden
            backdrop-blur-md
            font-ar
        "
        >

            {/* ---------------------------------------------------------------- */}
            {/* Header */}
            {/* ---------------------------------------------------------------- */}
            <div
                className="
                flex items-center justify-between
                px-6 py-4
                border-b border-neutral-200/50
                dark:border-neutral-800/50
                bg-white/40
                dark:bg-neutral-900/20
            "
            >

                <h2
                    className="
                    text-base
                    font-bold
                    text-neutral-800
                    dark:text-neutral-100
                    m-0
                "
                >
                    {t(title)}
                </h2>

                <div
                    className="
                    p-2
                    cursor-pointer
                    text-neutral-500
                    dark:text-neutral-400
                    hover:text-primary
                    dark:hover:text-primary
                    transition-all
                    duration-300
                    border border-neutral-200/60
                    dark:border-neutral-800/60
                    hover:border-primary/30
                    dark:hover:border-primary/30
                    rounded-xl
                    bg-neutral-50
                    dark:bg-neutral-900
                    active:scale-95
                "
                    onClick={onToggle}
                >
                    {isOpen ? <UilMinus size="18" /> : <UilPlus size="18" />}
                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Body */}
            {/* ---------------------------------------------------------------- */}
            <div
                className={`
                transition-all
                duration-300
                ease-in-out
                overflow-hidden
                ${isOpen
                    ? 'max-h-[1000px] opacity-100'
                    : 'max-h-0 opacity-0'
                }
            `}
            >
                <div
                    className="
                    p-6
                    bg-neutral-50/50
                    dark:bg-neutral-900/10
                "
                >

                    <Row gutter={[24, 20]}>
                        {children}
                    </Row>

                    <div className="mt-6 flex justify-end">
                        <Button
                            onClick={onSearch}
                            className="
                            px-8
                            h-10
                            rounded-xl
                            border-0
                            bg-primary
                            text-white
                            font-semibold
                            shadow-[0_4px_14px_-4px_rgba(var(--primary-rgb),0.4)]
                            hover:opacity-95
                            hover:scale-[1.01]
                            transition-all
                            duration-300
                            cursor-pointer
                        "
                        >
                            {t('common.filters')}
                        </Button>

                    </div>
                </div>
            </div>

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
*/

export default PageFilter