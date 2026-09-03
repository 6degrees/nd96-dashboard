import React from 'react'
import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface MonthlyOrder {
    year: number
    month: number
    name: string
    count: number
}

interface AnalyticsChartProps {
    orders: MonthlyOrder[]
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Monthly Orders Analytics Chart
|--------------------------------------------------------------------------
|
| Displays monthly order volume for the last 12 months.
|
*/

export function AnalyticsChart({
                                   orders,
                                   loading,
                               }: AnalyticsChartProps) {
    const {t} = useTranslation()

    const chartData = orders ?? []

    /*
    |--------------------------------------------------------------------------
    | Chart Statistics
    |--------------------------------------------------------------------------
    */

    const totalOrders = chartData.reduce(
        (total, item) => total + item.count,
        0
    )

    const averageOrders = chartData.length
        ? Math.round(totalOrders / chartData.length)
        : 0

    const maxCount = Math.max(
        ...chartData.map((item) => item.count),
        1
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div
            className="
                lg:col-span-2
                rounded-3xl
                bg-white/80 dark:bg-neutral-950/80
                border border-neutral-200/60 dark:border-neutral-800/60
                shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                backdrop-blur-md
                p-6
                font-ar
                transition-colors duration-200
            "
        >
            {/* Header */}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                            {t('dashboard.chart.title')}
                        </h3>

                        <span className="rounded-full bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 text-[10px] font-semibold text-indigo-600 dark:text-indigo-400">
                            12M
                        </span>
                    </div>

                    <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                        {t('dashboard.chart.subtitle')}
                    </p>
                </div>

                {/* Summary */}

                <div className="flex items-center gap-6">

                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-neutral-500">
                            {t('dashboard.total_orders')}
                        </p>

                        <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-neutral-100">
                            {totalOrders.toLocaleString()}
                        </p>
                    </div>

                    <div className="h-9 w-px bg-neutral-200 dark:bg-neutral-800"/>

                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 dark:text-neutral-500">
                            {t('dashboard.monthly_average')}
                        </p>

                        <p className="mt-0.5 text-xl font-bold text-slate-900 dark:text-neutral-100">
                            {averageOrders.toLocaleString()}
                        </p>
                    </div>

                </div>
            </div>

            {/* Chart */}

            <div className="mt-8">

                {loading ? (

                    <div className="flex h-64 items-center justify-center">
                        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-indigo-600"/>
                    </div>

                ) : chartData.length > 0 ? (

                    <div className="relative h-64">

                        {/* Horizontal Grid */}

                        <div className="absolute inset-0 flex flex-col justify-between">

                            {[100, 75, 50, 25, 0].map((value) => (
                                <div
                                    key={value}
                                    className="flex items-center gap-3"
                                >
                                    <span className="w-8 text-right text-[9px] font-medium text-neutral-400 dark:text-neutral-600">
                                        {Math.round(
                                            (maxCount * value) / 100
                                        )}
                                    </span>

                                    <div className="h-px flex-1 bg-neutral-100 dark:bg-neutral-900"/>
                                </div>
                            ))}

                        </div>

                        {/* Bars */}

                        <div className="absolute inset-0 ml-11 flex items-end justify-between gap-1">

                            {chartData.map((item) => {

                                const height =
                                    item.count > 0
                                        ? Math.max(
                                            (item.count / maxCount) * 100,
                                            4
                                        )
                                        : 0

                                return (
                                    <div
                                        key={`${item.year}-${item.month}`}
                                        className="group flex h-full flex-1 flex-col items-center justify-end"
                                    >

                                        {/* Tooltip */}

                                        <div
                                            className="
                                                mb-2
                                                rounded-lg
                                                bg-neutral-900
                                                px-2.5
                                                py-1.5
                                                text-[10px]
                                                font-semibold
                                                text-white
                                                opacity-0
                                                translate-y-1
                                                transition-all
                                                duration-200
                                                group-hover:translate-y-0
                                                group-hover:opacity-100
                                                whitespace-nowrap
                                            "
                                        >
                                            {item.count.toLocaleString()}
                                        </div>

                                        {/* Bar Container */}

                                        <div className="relative flex h-[190px] w-full max-w-[38px] items-end">

                                            <div
                                                className="
                                                    w-full
                                                    rounded-t-xl
                                                    bg-indigo-500
                                                    transition-all
                                                    duration-300
                                                    group-hover:bg-indigo-600
                                                    dark:bg-indigo-500
                                                    dark:group-hover:bg-indigo-400
                                                "
                                                style={{
                                                    height: `${height}%`,
                                                }}
                                            />

                                        </div>

                                        {/* Month */}

                                        <span
                                            className="
                                                mt-3
                                                text-[10px]
                                                font-medium
                                                text-neutral-400
                                                dark:text-neutral-500
                                            "
                                        >
                                            {item.name.slice(0, 3)}
                                        </span>

                                    </div>
                                )
                            })}

                        </div>
                    </div>

                ) : (

                    <div className="flex h-64 items-center justify-center">
                        <div className="text-xs text-slate-400 dark:text-neutral-500">
                            {t('dashboard.no_chart_data')}
                        </div>
                    </div>

                )}

            </div>

            {/* Footer */}

            <div className="mt-6 flex items-center justify-between border-t border-neutral-100 pt-4 dark:border-neutral-800/60">

                <div className="flex items-center gap-2">

                    <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"/>

                    <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                        {t('dashboard.legend.orders')}
                    </span>

                </div>

                <span className="text-[10px] font-medium text-neutral-400 dark:text-neutral-600">
                    {t('dashboard.last_12_months')}
                </span>

            </div>
        </div>
    )
}