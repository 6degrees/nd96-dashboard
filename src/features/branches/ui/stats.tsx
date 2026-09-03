import React from 'react'
import {useTranslation} from 'react-i18next'
import {
    GitBranch,
    AlertTriangle,
    ShoppingBag,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
|
| Defines the properties required by the branch statistics cards.
|
*/

interface StatsCardsProps {
    totalBranches: number
    attentionBranches: number
    totalOrders: number
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Branch Statistics Cards
|--------------------------------------------------------------------------
|
| Displays key branch-related statistics:
|
| - Total branches
| - Branches requiring attention
| - Total orders
|
*/

export function StatsCards({totalBranches, attentionBranches, totalOrders, loading = false,}: StatsCardsProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Translations
    |--------------------------------------------------------------------------
    */
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Statistics Cards Configuration
    |--------------------------------------------------------------------------
    |
    | Defines the visual configuration and translation key for each card.
    |
    */
    const cards = [
        {
            key: 'total_branches',
            title: t('branch.stats.total_branches'),
            value: totalBranches,
            icon: GitBranch,
            iconClass: 'text-indigo-600 dark:text-indigo-400',
            iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
        },
        {
            key: 'attention_branches',
            title: t('branch.stats.attention_branches'),
            value: attentionBranches,
            icon: AlertTriangle,
            iconClass: 'text-amber-600 dark:text-amber-400',
            iconBg: 'bg-amber-50 dark:bg-amber-950/40',
        },
        {
            key: 'total_orders',
            title: t('branch.stats.total_orders'),
            value: totalOrders,
            icon: ShoppingBag,
            iconClass: 'text-emerald-600 dark:text-emerald-400',
            iconBg: 'bg-emerald-50 dark:bg-emerald-950/40',
        },
    ]

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

            {cards.map((card) => {

                const Icon = card.icon

                return (
                    <div
                        key={card.key}
                        className="
                            rounded-2xl
                            bg-white/80
                            dark:bg-neutral-950/80
                            border
                            border-neutral-200/60
                            dark:border-neutral-800/60
                            p-5
                            shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                            backdrop-blur-md
                            transition-all
                            duration-200
                            hover:-translate-y-0.5
                        "
                    >

                        {/* Card Content */}

                        <div className="flex items-center justify-between">

                            {/* Statistic */}

                            <div>

                                <p
                                    className="
                                        text-xs
                                        font-medium
                                        text-slate-500
                                        dark:text-neutral-400
                                    "
                                >
                                    {card.title}
                                </p>

                                {/* Value */}

                                {loading ? (
                                    <div
                                        className="
                                            mt-2
                                            h-7
                                            w-16
                                            rounded-lg
                                            bg-neutral-100
                                            dark:bg-neutral-900
                                            animate-pulse
                                        "
                                    />
                                ) : (
                                    <p
                                        className="
                                            mt-1
                                            text-2xl
                                            font-bold
                                            tracking-tight
                                            text-slate-900
                                            dark:text-neutral-100
                                        "
                                    >
                                        {Number(
                                            card.value
                                        ).toLocaleString()}
                                    </p>
                                )}

                            </div>

                            {/* Icon */}

                            <div
                                className={`
                                    flex
                                    h-11
                                    w-11
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-xl
                                    ${card.iconBg}
                                `}
                            >

                                <Icon
                                    className={`
                                        h-5
                                        w-5
                                        ${card.iconClass}
                                    `}
                                />

                            </div>

                        </div>

                    </div>
                )
            })}

        </div>
    )
}