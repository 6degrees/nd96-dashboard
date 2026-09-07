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
| Displays the main dashboard statistics using the application
| brand design tokens for both light and dark modes.
|
*/

export function StatsCards({stats, loading,}: StatsCardsProps) {
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
        <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

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
    |
    | Uses the application's CSS design tokens instead of Tailwind's
    | default color palette.
    |
    */

    const tones = {
        purple: {
            color: 'var(--brand-purple)',
            background: 'color-mix(in srgb, var(--brand-purple) 8%, transparent)',
            border: 'color-mix(in srgb, var(--brand-purple) 22%, var(--color-border-light))',
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
                rounded-[var(--radius-xl)]
                border
                bg-[var(--color-surface-card)]
                p-5
                shadow-[var(--shadow-sm)]
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-[var(--shadow-md)]
            "
            style={{
                borderColor: currentTone.border,
            }}
        >

            {/* ================================================================
                Top Section
            ================================================================= */}

            <div className="flex items-start justify-between gap-4">

                {/* Icon */}

                <div
                    className="
                        flex
                        h-11
                        w-11
                        shrink-0
                        items-center
                        justify-center
                        rounded-[var(--radius-lg)]
                        border
                        transition-transform
                        duration-200
                        group-hover:scale-105
                    "
                    style={{
                        color: currentTone.color,
                        backgroundColor: currentTone.background,
                        borderColor: currentTone.border,
                    }}
                >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                </div>

                {/* Title */}

                <div className="min-w-0 flex-1 text-end">

                    <p
                        className="
                            truncate
                            text-sm
                            font-semibold
                            leading-6
                        "
                        style={{
                            color: 'var(--color-text-secondary)',
                        }}
                    >
                        {title}
                    </p>

                </div>

            </div>

            {/* ================================================================
                Value
            ================================================================= */}

            <div className="mt-7">

                <div
                    className="
                        text-3xl
                        font-bold
                        tracking-tight
                        leading-none
                    "
                    style={{
                        color: 'var(--color-text-primary)',
                    }}
                >
                    {loading ? (
                        <span
                            className="
                                inline-block
                                h-8
                                w-12
                                animate-pulse
                                rounded-md
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

            <div className="mt-3">

                <p
                    className="
                        text-xs
                        font-medium
                    "
                    style={{
                        color: 'var(--color-text-muted)',
                    }}
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