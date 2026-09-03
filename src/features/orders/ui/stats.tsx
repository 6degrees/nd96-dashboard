'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import {useTranslation} from 'react-i18next'

import {
    AlertTriangle,
    CheckCircle2,
    Clock3,
    Package,
    Truck,
    Zap,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface OrderStatsProps {
    total: number
    newOrders: number
    preparing: number
    ready: number
    delivered: number
    late: number
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

export function OrderStats({total, newOrders, preparing, ready, delivered, late, loading = false,}: OrderStatsProps) {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Stats
    |--------------------------------------------------------------------------
    |
    */

    const stats = [
        {
            key: 'total',
            label: t(
                'order.stats.total',
                'إجمالي الطلبات'
            ),
            value: total,
            icon: Package,
            iconClass:
                'bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300',
        },
        {
            key: 'new',
            label: t(
                'order.stats.new',
                'طلبات جديدة'
            ),
            value: newOrders,
            icon: Zap,
            iconClass:
                'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400',
        },
        {
            key: 'preparing',
            label: t(
                'order.stats.preparing',
                'قيد التحضير'
            ),
            value: preparing,
            icon: Clock3,
            iconClass:
                'bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400',
        },
        {
            key: 'ready',
            label: t(
                'order.stats.ready',
                'جاهزة للاستلام'
            ),
            value: ready,
            icon: CheckCircle2,
            iconClass:
                'bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400',
        },
        {
            key: 'delivered',
            label: t(
                'order.stats.delivered',
                'وصل العميل'
            ),
            value: delivered,
            icon: Truck,
            iconClass:
                'bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400',
        },
        {
            key: 'late',
            label: t(
                'order.stats.late',
                'طلبات متأخرة'
            ),
            value: late,
            icon: AlertTriangle,
            iconClass:
                late > 0
                    ? 'bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400'
                    : 'bg-slate-100 text-slate-500 dark:bg-neutral-800 dark:text-neutral-400',
        },
    ]

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">

            {stats.map((stat) => {

                const Icon = stat.icon

                return (
                    <div
                        key={stat.key}
                        className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900"
                    >

                        {loading ? (
                            <div className="animate-pulse">

                                <div className="flex items-start justify-between">

                                    <div className="space-y-3">

                                        <div className="h-3 w-24 rounded bg-slate-200 dark:bg-neutral-800"/>

                                        <div className="h-7 w-16 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                                    </div>

                                    <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                            </div>
                        ) : (
                            <div className="flex items-start justify-between">

                                <div>

                                    <p className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                                        {stat.label}
                                    </p>

                                    <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {stat.value.toLocaleString()}
                                    </p>

                                </div>

                                <div
                                    className={`flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconClass}`}
                                >
                                    <Icon size={21}/>
                                </div>

                            </div>
                        )}

                    </div>
                )
            })}

        </div>
    )
}