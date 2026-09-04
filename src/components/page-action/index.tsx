'use client'

import React from 'react'
import Link from 'next/link'
import { Dropdown } from 'antd'
import { MoreHorizontal } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import { PageActionsProps } from '@/types/action-button'

/*
|--------------------------------------------------------------------------
| Page Actions Component
|--------------------------------------------------------------------------
|
| Responsive page header.
|
| Features:
| - SATORP identity
| - Green brand accent
| - Desktop actions
| - Mobile three-dot menu
| - No font-size changes
|
*/

const PageActions = ({ actions, title }: PageActionsProps) => {

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Mobile Menu Items
    |--------------------------------------------------------------------------
    */

    const mobileMenuItems = actions.map((action, index) => ({
        key: String(index),

        label: (
            <div className="flex items-center gap-3 py-1">
                {action.icon && (
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-green/10 text-brand-green">
                        {action.icon}
                    </span>
                )}

                <span className="text-sm font-medium text-text-primary">
                    {t(action.label)}
                </span>
            </div>
        ),

        onClick: action.onClick,
    }))

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="relative mb-6 flex items-center justify-between gap-4 overflow-hidden rounded-2xl border border-border-default bg-surface-card px-5 py-4 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">

            {/* Brand Accent */}

            <div className="absolute inset-y-0 start-0 w-1.5 bg-brand-green" />

            {/* Subtle Brand Glow */}

            <div className="pointer-events-none absolute -start-12 -top-12 h-32 w-32 rounded-full bg-brand-green/5 blur-2xl" />

            {/* -------------------------------------------------------------- */}
            {/* Title */}
            {/* -------------------------------------------------------------- */}

            <div className="relative flex min-w-0 items-center gap-3">

                <div className="flex h-9 w-1 shrink-0 rounded-full bg-brand-green" />

                <div className="min-w-0">

                    <h1 className="m-0 truncate text-lg font-bold tracking-tight text-text-primary">
                        {typeof title === 'string' ? t(title) : title}
                    </h1>

                </div>

            </div>

            {/* -------------------------------------------------------------- */}
            {/* Desktop Actions */}
            {/* -------------------------------------------------------------- */}

            <div className="hidden items-center gap-2 sm:flex">

                {actions.map((action, index) => {

                    const content = (
                        <button
                            key={index}
                            type="button"
                            onClick={action.onClick}
                            className={`
                                inline-flex h-10 items-center justify-center gap-2 rounded-xl px-4 text-sm font-semibold transition-all duration-200 active:scale-[0.97] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-green/30
                                ${action.type === 'default'
                                ? 'border border-border-default bg-surface-card text-text-primary hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green'
                                : 'border border-brand-green bg-brand-green text-white shadow-[0_6px_18px_rgba(0,102,51,0.18)] hover:bg-brand-green-hover hover:shadow-[0_8px_22px_rgba(0,102,51,0.22)]'
                            }
                                ${action.className || ''}
                            `}
                        >

                            {action.icon && (
                                <span className="flex shrink-0 items-center justify-center">
                                    {action.icon}
                                </span>
                            )}

                            <span>{t(action.label)}</span>

                        </button>
                    )

                    return action.href ? (
                        <Link key={index} href={action.href} className="focus:outline-none">
                            {content}
                        </Link>
                    ) : (
                        <React.Fragment key={index}>
                            {content}
                        </React.Fragment>
                    )
                })}

            </div>

            {/* -------------------------------------------------------------- */}
            {/* Mobile Actions */}
            {/* -------------------------------------------------------------- */}

            <div className="relative sm:hidden">

                <Dropdown
                    menu={{ items: mobileMenuItems }}
                    trigger={['click']}
                    placement="bottomRight"
                >

                    <button
                        type="button"
                        aria-label={t('common.actions')}
                        className="flex h-10 w-10 items-center justify-center rounded-xl border border-border-default bg-surface-card text-text-secondary transition-all duration-200 hover:border-brand-green hover:bg-brand-green/5 hover:text-brand-green active:scale-95"
                    >
                        <MoreHorizontal size={21} strokeWidth={2} />
                    </button>

                </Dropdown>

            </div>

        </div>
    )
}

export default PageActions