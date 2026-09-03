import React from 'react'
import {useTranslation} from 'react-i18next'
import {
    CheckCircle2,
    Clock3,
    PackageCheck,
    AlertTriangle,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface OrderStatus {
    value: string
    name: string
    count: number
}

interface OrderStatusOverviewProps {
    statuses: OrderStatus[]
    total: number
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| Status Configuration
|--------------------------------------------------------------------------
|
| Defines the visual appearance for each dashboard order status.
|
*/

const statusConfig: Record<string, {
    icon: React.ElementType
    iconColor: string
    iconBackground: string
    bar: string
}> = {
    completed: {
        icon: CheckCircle2,
        iconColor: 'text-emerald-500 dark:text-emerald-400',
        iconBackground: 'bg-emerald-50 dark:bg-emerald-950/40',
        bar: 'bg-emerald-500 dark:bg-emerald-400',
    },

    preparing: {
        icon: Clock3,
        iconColor: 'text-blue-500 dark:text-blue-400',
        iconBackground: 'bg-blue-50 dark:bg-blue-950/40',
        bar: 'bg-blue-500 dark:bg-blue-400',
    },

    ready: {
        icon: PackageCheck,
        iconColor: 'text-indigo-500 dark:text-indigo-400',
        iconBackground: 'bg-indigo-50 dark:bg-indigo-950/40',
        bar: 'bg-indigo-500 dark:bg-indigo-400',
    },

    late: {
        icon: AlertTriangle,
        iconColor: 'text-red-500 dark:text-red-400',
        iconBackground: 'bg-red-50 dark:bg-red-950/40',
        bar: 'bg-red-500 dark:bg-red-400',
    },
}

/*
|--------------------------------------------------------------------------
| UI Component: Order Status Overview
|--------------------------------------------------------------------------
|
| Displays today's order status distribution.
|
*/

export function OrderStatusOverview({statuses, total, loading,}: OrderStatusOverviewProps) {
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    */

    if (loading) {
        return (
            <div
                className="
                    rounded-3xl
                    bg-white/80 dark:bg-neutral-950/80
                    border border-neutral-200/60 dark:border-neutral-800/60
                    p-6
                    shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                    backdrop-blur-md
                    font-ar
                "
            >

                {/* Header Skeleton */}

                <div className="flex items-start justify-between">

                    <div>
                        <div className="h-5 w-44 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                        <div className="mt-2 h-3 w-56 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                    </div>

                    <div className="text-end">
                        <div className="h-3 w-14 ml-auto rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                        <div className="mt-2 h-6 w-12 ml-auto rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                    </div>

                </div>

                {/* Status Skeleton */}

                <div className="mt-8 space-y-6">

                    {[1, 2, 3, 4].map((item) => (
                        <div key={item}>

                            <div className="flex items-center justify-between mb-2">

                                <div className="flex items-center gap-2">

                                    <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                                    <div className="h-3 w-24 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                                </div>

                                <div className="h-3 w-14 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                            </div>

                            <div className="h-2 rounded-full bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                        </div>
                    ))}

                </div>

            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Normalize Data
    |--------------------------------------------------------------------------
    */

    const orderStatuses = statuses ?? []

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="
                rounded-3xl
                bg-white/80 dark:bg-neutral-950/80
                border border-neutral-200/60 dark:border-neutral-800/60
                p-6
                shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                backdrop-blur-md
                font-ar
                transition-colors duration-200
            "
        >

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            */}

            <div className="flex items-start justify-between gap-4">

                <div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                        {t('dashboard.order_status.title')}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                        {t('dashboard.order_status.subtitle')}
                    </p>

                </div>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Status List
            |--------------------------------------------------------------------------
            */}

            {orderStatuses.length > 0 ? (

                <div className="mt-7 space-y-6">

                    {orderStatuses.map((status) => {

                        const count = Number(status.count || 0)

                        /*
                        |--------------------------------------------------------------------------
                        | Percentage
                        |--------------------------------------------------------------------------
                        |
                        | Percentage is calculated against today's total orders,
                        | not against the sum of the four displayed statuses.
                        |
                        */

                        const percentage =
                            total > 0
                                ? Math.round((count / total) * 100)
                                : 0

                        const config =
                            statusConfig[status.value] ?? {
                                icon: Clock3,
                                iconColor: 'text-slate-500 dark:text-neutral-400',
                                iconBackground: 'bg-slate-50 dark:bg-neutral-900',
                                bar: 'bg-slate-400 dark:bg-neutral-500',
                            }

                        const Icon = config.icon

                        return (
                            <div
                                key={status.value}
                                className="group"
                            >

                                {/*
                                |--------------------------------------------------------------------------
                                | Status Header
                                |--------------------------------------------------------------------------
                                */}

                                <div className="mb-2.5 flex items-center justify-between gap-3">

                                    <div className="flex min-w-0 items-center gap-3">

                                        {/* Icon */}

                                        <div
                                            className={`
                                                flex
                                                h-8 w-8
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                ${config.iconBackground}
                                            `}
                                        >

                                            <Icon
                                                className={`
                                                    h-4 w-4
                                                    ${config.iconColor}
                                                `}
                                            />

                                        </div>

                                        {/* Status Name */}

                                        <span
                                            className="
                                                truncate
                                                text-xs
                                                font-semibold
                                                text-slate-700
                                                dark:text-neutral-200
                                            "
                                        >
                                            {status.name}
                                        </span>

                                    </div>

                                    {/* Count */}

                                    <div className="flex shrink-0 items-baseline gap-1.5">

                                        <span
                                            className="
                                                text-sm
                                                font-bold
                                                text-slate-900
                                                dark:text-neutral-100
                                            "
                                        >
                                            {count.toLocaleString()}
                                        </span>

                                        <span
                                            className="
                                                text-[10px]
                                                font-medium
                                                text-slate-400
                                                dark:text-neutral-500
                                            "
                                        >
                                            {percentage}%
                                        </span>

                                    </div>

                                </div>

                                {/*
                                |--------------------------------------------------------------------------
                                | Progress Bar
                                |--------------------------------------------------------------------------
                                */}

                                <div
                                    className="
                                        h-2
                                        overflow-hidden
                                        rounded-full
                                        bg-slate-100
                                        dark:bg-neutral-900
                                    "
                                >

                                    <div
                                        className={`
                                            h-full
                                            rounded-full
                                            ${config.bar}
                                            transition-all
                                            duration-700
                                            ease-out
                                            group-hover:opacity-80
                                        `}
                                        style={{
                                            width: `${Math.min(percentage, 100)}%`,
                                        }}
                                    />

                                </div>

                            </div>
                        )
                    })}

                </div>

            ) : (

                /*
                |--------------------------------------------------------------------------
                | Empty State
                |--------------------------------------------------------------------------
                */

                <div className="flex min-h-[220px] items-center justify-center">

                    <p className="text-xs text-slate-400 dark:text-neutral-500">
                        {t('dashboard.no_chart_data')}
                    </p>

                </div>

            )}

        </div>
    )
}