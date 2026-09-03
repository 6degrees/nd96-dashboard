import React from 'react'
import Link from 'next/link'

import {useTranslation} from 'react-i18next'

import {PageActionsProps} from '@/types/action-button'

/*
|--------------------------------------------------------------------------
| Page Actions Component
|--------------------------------------------------------------------------
|
| This component is responsible for rendering action buttons inside
| page headers (e.g. Create, Export, Filter, Refresh, etc.)
|
| Features:
| - Supports multiple actions in a single row
| - Supports navigation actions via Next.js Link
| - Supports click handlers for dynamic actions
| - Supports icons per button
| - Supports different button styles
| - Supports page title rendering
| - Full dark mode support
|
| Goal:
| - Standardize action buttons across admin pages
| - Create modern consistent header UI
|
*/
const PageActions = ({actions, title}: PageActionsProps) => {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */
    return (
        <div
            className="
                flex items-center justify-between
                mb-8
                bg-white/80
                dark:bg-neutral-950/80
                p-4 px-6
                rounded-2xl
                border border-neutral-200/60
                dark:border-neutral-800/60
                shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                backdrop-blur-md
                font-ar
            "
        >

            {/* ---------------------------------------------------------------- */}
            {/* Title Section */}
            {/* ---------------------------------------------------------------- */}

            <div>

                <h1
                    className="
                        text-lg
                        font-bold
                        tracking-tight
                        text-neutral-800
                        dark:text-neutral-100
                        m-0
                    "
                >
                    {typeof title === 'string'
                        ? t(title)
                        : title
                    }
                </h1>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Actions Section */}
            {/* ---------------------------------------------------------------- */}

            <div className="flex items-center gap-2.5">

                {actions.map((action, index) => {

                    /*
                    |--------------------------------------------------------------------------
                    | Button Content Renderer
                    |--------------------------------------------------------------------------
                    |
                    | Shared UI for both:
                    | - link actions
                    | - click actions
                    |
                    */

                    const content = (
                        <button
                            type="button"
                            onClick={action.onClick}
                            className={`
                                px-5
                                h-10
                                rounded-xl
                                flex items-center
                                justify-center
                                gap-2
                                text-xs
                                font-semibold
                                transition-all
                                duration-300
                                active:scale-[0.97]
                                focus-visible:outline-none
                                cursor-pointer

                                disabled:cursor-not-allowed
                                disabled:opacity-50
                                disabled:active:scale-100

                                ${action.type === 'default'
                                ? `
                                    bg-neutral-50
                                    dark:bg-neutral-900
                                    text-neutral-700
                                    dark:text-neutral-200
                                    border
                                    border-neutral-200
                                    dark:border-neutral-800
                                    hover:bg-neutral-100
                                    dark:hover:bg-neutral-850
                                    hover:border-neutral-300
                                    dark:hover:border-neutral-700
                                `
                                : `
                                    bg-neutral-900
                                    text-white
                                    shadow-[0_4px_14px_-4px_rgba(var(--primary-rgb),0.4)]
                                    hover:opacity-95
                                    hover:scale-[1.01]
                                `}

                                ${action.className || ''}
                            `}
                        >

                            {/* ------------------------------------------------ */}
                            {/* Action Icon */}
                            {/* ------------------------------------------------ */}

                            {action.icon && (
                                <span className="flex shrink-0 items-center justify-center">
                                    {action.icon}
                                </span>
                            )}

                            {/* ------------------------------------------------ */}
                            {/* Button Label */}
                            {/* ------------------------------------------------ */}

                            <span>
                                {t(action.label)}
                            </span>

                        </button>
                    )

                    /*
                    |--------------------------------------------------------------------------
                    | Conditional Rendering
                    |--------------------------------------------------------------------------
                    |
                    | If href exists → render as Link
                    | Otherwise → render as button
                    |
                    */

                    return action.href ? (

                        <Link
                            key={index}
                            href={action.href}
                            className="focus:outline-none"
                        >
                            {content}
                        </Link>

                    ) : (

                        <React.Fragment key={index}>
                            {content}
                        </React.Fragment>

                    )
                })}

            </div>

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Export
|--------------------------------------------------------------------------
|
*/

export default PageActions