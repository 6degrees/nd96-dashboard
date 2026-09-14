'use client'

import React from 'react'
import { useTranslation } from 'react-i18next'

import {
    Users,
    MessageSquare,
    MessageSquareOff,
    Building2,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface StatsCardsProps {
    stats: any
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Dashboard Stats Cards
|--------------------------------------------------------------------------
|
| Responsive behavior:
|
| Mobile:
| - 2 cards per row.
|
| Tablet:
| - 2 cards per row.
|
| Desktop:
| - 4 cards per row.
|
|--------------------------------------------------------------------------
*/

export function StatsCards({
                               stats,
                               loading,
                           }: StatsCardsProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const users =
        stats?.stats?.users ?? 0

    const activeMessages =
        stats?.stats?.messages?.status?.active ?? 0

    const hiddenMessages =
        stats?.stats?.messages?.status?.inactive ?? 0

    const departments =
        stats?.stats?.departments ?? 0

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="
                mb-8
                grid
                grid-cols-2
                gap-3
                sm:grid-cols-2
                sm:gap-6
                xl:grid-cols-4
            "
        >

            {/* ================================================================
                Users
            ================================================================= */}

            <StatCard
                title={t('dashboard.stats.users')}
                label={t('dashboard.users_label')}
                value={users}
                loading={loading}
                icon={Users}
                tone="purple"
            />

            {/* ================================================================
                Active Messages
            ================================================================= */}

            <StatCard
                title={t('dashboard.stats.activeMessages')}
                label={t('dashboard.active_messages_label')}
                value={activeMessages}
                loading={loading}
                icon={MessageSquare}
                tone="green"
            />

            {/* ================================================================
                Hidden Messages
            ================================================================= */}

            <StatCard
                title={t('dashboard.stats.hiddenMessages')}
                label={t('dashboard.hidden_messages_label')}
                value={hiddenMessages}
                loading={loading}
                icon={MessageSquareOff}
                tone="warning"
            />

            {/* ================================================================
                Departments
            ================================================================= */}

            <StatCard
                title={t('dashboard.stats.departments')}
                label={t('dashboard.departments_label')}
                value={departments}
                loading={loading}
                icon={Building2}
                tone="blue"
            />

        </div>
    )
}

/*
|--------------------------------------------------------------------------
| Stat Card
|--------------------------------------------------------------------------
*/

interface StatCardProps {
    title: string
    label: string
    value: number
    loading: boolean
    icon: React.ElementType
    tone: 'purple' | 'green' | 'warning' | 'blue'
}

function StatCard({
                      title,
                      label,
                      value,
                      loading,
                      icon: Icon,
                      tone,
                  }: StatCardProps) {

    /*
    |--------------------------------------------------------------------------
    | Tone Configuration
    |--------------------------------------------------------------------------
    */

    const tones = {
        purple: {
            color: 'var(--brand-purple)',
            background:
                'color-mix(in srgb, var(--brand-purple) 8%, transparent)',
            border:
                'color-mix(in srgb, var(--brand-purple) 22%, var(--color-border-light))',
        },

        green: {
            color: 'var(--brand-green)',
            background: 'var(--color-surface-green)',
            border: 'var(--color-success-border)',
        },

        warning: {
            color: 'var(--brand-brown)',
            background: 'var(--color-warning-background)',
            border: 'var(--color-warning-border)',
        },

        blue: {
            color: 'var(--brand-blue)',
            background: 'var(--color-info-background)',
            border: 'var(--color-info-border)',
        },
    }

    const currentTone = tones[tone]

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="
                group
                relative
                overflow-hidden
                rounded-2xl
                border
                bg-[var(--color-surface-card)]
                p-4
                shadow-[var(--shadow-sm)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[var(--shadow-md)]
                sm:rounded-3xl
                sm:p-6
            "
            style={{
                borderColor: currentTone.border,
            }}
        >

            {/* ================================================================
                Top Section
            ================================================================= */}

            <div
                className="
                    flex
                    items-center
                    justify-between
                    gap-2
                "
            >

                {/* Icon */}

                <div
                    className="
                        flex
                        size-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-xl
                        border
                        transition-transform
                        duration-200
                        group-hover:scale-105
                        sm:size-12
                        sm:rounded-2xl
                    "
                    style={{
                        color: currentTone.color,
                        backgroundColor: currentTone.background,
                        borderColor: currentTone.border,
                    }}
                >
                    <Icon
                        className="
                            size-5
                            sm:size-6
                        "
                        strokeWidth={1.8}
                    />
                </div>

                {/* Title */}

                <div className="min-w-0 flex-1 text-end">
                    <p
                        className="
                            min-w-0
                            truncate
                            text-[11px]
                            font-bold
                            leading-5
                            text-slate-400
                            sm:text-xs
                            dark:text-neutral-500
                        "
                    >
                        {title}
                    </p>
                </div>

            </div>

            {/* ================================================================
                Value
            ================================================================= */}

            <div className="mt-5 sm:mt-7">
                <div
                    className="
                        text-2xl
                        font-extrabold
                        leading-none
                        tracking-tight
                        text-slate-900
                        sm:text-4xl
                        dark:text-neutral-100
                    "
                >
                    {loading ? (
                        <span
                            className="
                                inline-block
                                h-7
                                w-10
                                animate-pulse
                                rounded-md
                                sm:h-8
                                sm:w-12
                            "
                            style={{
                                backgroundColor:
                                    'var(--color-surface-muted)',
                            }}
                        />
                    ) : (
                        value
                    )}
                </div>
            </div>

            {/* ================================================================
                Description
            ================================================================= */}

            <div className="mt-2 sm:mt-3">
                <p
                    className="
                        text-[10px]
                        font-medium
                        leading-5
                        text-slate-500
                        sm:text-xs
                        dark:text-neutral-400
                    "
                >
                    {label}
                </p>
            </div>

            {/* ================================================================
                Bottom Accent
            ================================================================= */}

            <div
                className="
                    absolute
                    inset-x-0
                    bottom-0
                    h-[2px]
                    opacity-0
                    transition-opacity
                    duration-200
                    group-hover:opacity-100
                "
                style={{
                    backgroundColor: currentTone.color,
                }}
            />

        </div>
    )
}