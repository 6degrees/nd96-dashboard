'use client'

import React from 'react'
import {
    Building2,
    Clock3,
    MessageSquareText,
    User,
    Power,
    PowerOff,
    ArrowUpLeft,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface MessageCardProps {
    message?: any
    item?: any
    onView?: (message: any) => void
    onToggleActive?: (message: any) => void
}

/*
|--------------------------------------------------------------------------
| Message Card
|--------------------------------------------------------------------------
|
| Displays a single message inside the messages grid.
| The activation/deactivation action is displayed above the card,
| matching the previous table row behavior.
|
*/

export function MessageCard({
                                message,
                                item,
                                onView,
                                onToggleActive,
                            }: MessageCardProps) {

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Message
    |--------------------------------------------------------------------------
    */

    const currentMessage = message ?? item

    const name =
        currentMessage?.name || '-'

    const department =
        currentMessage?.department?.label ||
        currentMessage?.department?.name_ar ||
        currentMessage?.department?.name_en ||
        '-'

    const content =
        currentMessage?.message || '-'

    const createdAt =
        currentMessage?.created_at ||
        currentMessage?.createdAt ||
        null

    /*
    |--------------------------------------------------------------------------
    | Active State
    |--------------------------------------------------------------------------
    */

    const isActive =
        currentMessage?.is_active ??
        currentMessage?.active ??
        currentMessage?.status === 'active'

    /*
    |--------------------------------------------------------------------------
    | Date
    |--------------------------------------------------------------------------
    */

    const formattedDate = createdAt
        ? new Intl.DateTimeFormat(
            undefined,
            {
                dateStyle: 'medium',
                timeStyle: 'short',
            },
        ).format(new Date(createdAt))
        : null

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="group flex flex-col gap-2">

            {/* ------------------------------------------------------------ */}
            {/* Card Action */}
            {/* ------------------------------------------------------------ */}

            <div className="flex items-center justify-end">

                <button
                    type="button"
                    onClick={(event) => {
                        event.stopPropagation()
                        onToggleActive?.(currentMessage)
                    }}
                    className={`
                        inline-flex
                        h-8
                        items-center
                        gap-2
                        rounded-lg
                        border
                        px-3
                        text-xs
                        font-medium
                        transition-all
                        duration-200
                        focus:outline-none
                        focus:ring-2
                        focus:ring-[var(--color-border-focus)]/20
                        ${
                        isActive
                            ? `
                                    border-[var(--color-success-border)]
                                    bg-[var(--color-success-background)]
                                    text-[var(--color-success)]
                                    hover:border-[var(--color-success)]
                                    hover:bg-[var(--color-success-background)]
                                `
                            : `
                                    border-[var(--color-border-light)]
                                    bg-[var(--color-surface-soft)]
                                    text-[var(--color-text-secondary)]
                                    hover:border-[var(--color-border)]
                                    hover:bg-[var(--color-surface-muted)]
                                `
                    }
                    `}
                >

                    {isActive ? (
                        <>
                            <Power
                                size={13}
                                strokeWidth={2}
                            />

                            <span>
                                {t('common.deactivate')}
                            </span>
                        </>
                    ) : (
                        <>
                            <PowerOff
                                size={13}
                                strokeWidth={2}
                            />

                            <span>
                                {t('common.activate')}
                            </span>
                        </>
                    )}

                </button>

            </div>

            {/* ------------------------------------------------------------ */}
            {/* Message Card */}
            {/* ------------------------------------------------------------ */}

            <article
                onClick={() => onView?.(currentMessage)}
                className="
                    group/card
                    relative
                    flex
                    min-h-[245px]
                    cursor-pointer
                    flex-col
                    overflow-hidden
                    rounded-xl
                    border
                    border-[var(--color-border-light)]
                    bg-[var(--color-surface)]
                    shadow-[var(--shadow-xs)]
                    transition-all
                    duration-300
                    hover:-translate-y-0.5
                    hover:border-[var(--color-border)]
                    hover:shadow-[var(--shadow-md)]
                    dark:border-[var(--color-border-light)]
                "
            >

                {/* -------------------------------------------------------- */}
                {/* Top Brand Line */}
                {/* -------------------------------------------------------- */}

                <div
                    className="
                        absolute
                        inset-x-0
                        top-0
                        h-1
                        bg-[var(--brand-green)]
                        opacity-80
                        transition-opacity
                        duration-300
                        group-hover/card:opacity-100
                    "
                />

                {/* -------------------------------------------------------- */}
                {/* Header */}
                {/* -------------------------------------------------------- */}

                <div className="flex items-start justify-between gap-4 p-5">

                    <div className="flex min-w-0 items-center gap-3">

                        {/* Message Icon */}

                        <div
                            className="
                                flex
                                h-11
                                w-11
                                shrink-0
                                items-center
                                justify-center
                                rounded-lg
                                border
                                border-[var(--color-success-border)]
                                bg-[var(--color-surface-green)]
                                text-[var(--brand-green)]
                                transition-all
                                duration-300
                                group-hover/card:scale-105
                                group-hover/card:border-[var(--brand-green)]
                            "
                        >
                            <MessageSquareText
                                size={20}
                                strokeWidth={1.8}
                            />
                        </div>

                        {/* Identity */}

                        <div className="min-w-0">

                            <h3
                                className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-[var(--color-text-primary)]
                                "
                            >
                                {name}
                            </h3>

                            <div
                                className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-1.5
                                    text-xs
                                    text-[var(--color-text-muted)]
                                "
                            >

                                <Building2 size={13} />

                                <span className="truncate">
                                    {department}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/* ---------------------------------------------------- */}
                    {/* Status */}
                    {/* ---------------------------------------------------- */}

                    <div
                        className={`
                            flex
                            shrink-0
                            items-center
                            gap-1.5
                            rounded-md
                            border
                            px-2.5
                            py-1
                            text-[10px]
                            font-semibold
                            ${
                            isActive
                                ? `
                                        border-[var(--color-success-border)]
                                        bg-[var(--color-success-background)]
                                        text-[var(--color-success)]
                                    `
                                : `
                                        border-[var(--color-border-light)]
                                        bg-[var(--color-surface-soft)]
                                        text-[var(--color-text-muted)]
                                    `
                        }
                        `}
                    >

                        <span
                            className={`
                                h-1.5
                                w-1.5
                                rounded-full
                                ${
                                isActive
                                    ? 'bg-[var(--color-success)]'
                                    : 'bg-[var(--color-text-disabled)]'
                            }
                            `}
                        />

                        <span>
                            {isActive
                                ? t('common.active')
                                : t('common.inactive')
                            }
                        </span>

                    </div>

                </div>

                {/* -------------------------------------------------------- */}
                {/* Divider */}
                {/* -------------------------------------------------------- */}

                <div
                    className="
                        mx-5
                        border-t
                        border-[var(--color-border-light)]
                    "
                />

                {/* -------------------------------------------------------- */}
                {/* Message */}
                {/* -------------------------------------------------------- */}

                <div className="flex-1 px-5 py-4">

                    <div
                        className="
                            relative
                            overflow-hidden
                            rounded-lg
                            border
                            border-[var(--color-border-light)]
                            bg-[var(--color-surface-soft)]
                            px-4
                            py-3.5
                            transition-all
                            duration-200
                            group-hover/card:border-[var(--color-border)]
                        "
                    >

                        {/* Logical accent */}

                        <div
                            className="
                                absolute
                                inset-y-0
                                start-0
                                w-0.5
                                bg-[var(--brand-green)]
                            "
                        />

                        <p
                            className="
                                line-clamp-4
                                whitespace-pre-wrap
                                break-words
                                text-sm
                                leading-7
                                text-[var(--color-text-primary)]
                            "
                        >
                            {content}
                        </p>

                    </div>

                </div>

                {/* -------------------------------------------------------- */}
                {/* Footer */}
                {/* -------------------------------------------------------- */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        border-t
                        border-[var(--color-border-light)]
                        px-5
                        py-3.5
                    "
                >

                    {/* Sender */}

                    <div
                        className="
                            flex
                            min-w-0
                            items-center
                            gap-2
                            text-xs
                            text-[var(--color-text-muted)]
                        "
                    >

                        <User size={13} />

                        <span className="truncate">
                            {name}
                        </span>

                    </div>

                    {/* Date */}

                    {formattedDate && (
                        <div
                            className="
                                flex
                                shrink-0
                                items-center
                                gap-1.5
                                text-[10px]
                                text-[var(--color-text-muted)]
                            "
                        >

                            <Clock3 size={12} />

                            <span>
                                {formattedDate}
                            </span>

                        </div>
                    )}

                </div>

                {/* -------------------------------------------------------- */}
                {/* View Indicator */}
                {/* -------------------------------------------------------- */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        bottom-3
                        end-3
                        flex
                        h-6
                        w-6
                        items-center
                        justify-center
                        rounded-md
                        bg-[var(--color-surface-soft)]
                        text-[var(--color-text-muted)]
                        opacity-0
                        transition-all
                        duration-200
                        group-hover/card:translate-x-0
                        group-hover/card:opacity-100
                    "
                >
                    <ArrowUpLeft
                        size={12}
                    />
                </div>

            </article>

        </div>
    )
}