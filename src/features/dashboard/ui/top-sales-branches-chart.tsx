import React from 'react'
import {useTranslation} from 'react-i18next'
import {ArrowUpRight, Trophy} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface SalesBranch {
    id: string
    name: string
    sales: number
}

interface TopSalesBranchesChartProps {
    branches: SalesBranch[]
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Top Sales Branches
|--------------------------------------------------------------------------
|
| Displays the highest-selling branches with a financial ranking layout.
|
*/

export function TopSalesBranchesChart({
                                          branches,
                                          loading,
                                      }: TopSalesBranchesChartProps) {

    const {t} = useTranslation()

    const chartData = branches ?? []

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const totalSales = chartData.reduce(
        (total, branch) =>
            total + Number(branch.sales || 0),
        0
    )

    const maxSales = Math.max(
        ...chartData.map(
            (branch) => Number(branch.sales || 0)
        ),
        1
    )

    /*
    |--------------------------------------------------------------------------
    | Currency Formatter
    |--------------------------------------------------------------------------
    */

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(value)
    }

    /*
    |--------------------------------------------------------------------------
    | Branch Colors
    |--------------------------------------------------------------------------
    |
    | Each branch receives a different color based on its ranking.
    |
    */

    const salesColors = [
        'bg-emerald-500 dark:bg-emerald-400',
        'bg-blue-500 dark:bg-blue-400',
        'bg-violet-500 dark:bg-violet-400',
        'bg-amber-500 dark:bg-amber-400',
        'bg-rose-500 dark:bg-rose-400',
    ]

    const salesBadgeColors = [
        'bg-emerald-500 text-white shadow-sm shadow-emerald-200 dark:shadow-none',
        'bg-blue-500 text-white shadow-sm shadow-blue-200 dark:shadow-none',
        'bg-violet-500 text-white shadow-sm shadow-violet-200 dark:shadow-none',
        'bg-amber-500 text-white shadow-sm shadow-amber-200 dark:shadow-none',
        'bg-rose-500 text-white shadow-sm shadow-rose-200 dark:shadow-none',
    ]

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
                    border border-neutral-200/60
                    dark:border-neutral-800/60
                    shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                    backdrop-blur-md
                    p-6
                    font-ar
                "
            >

                {/* Header Skeleton */}

                <div className="flex items-center justify-between">

                    <div className="space-y-2">

                        <div
                            className="
                                h-4 w-32
                                rounded-lg
                                bg-neutral-100
                                dark:bg-neutral-900
                                animate-pulse
                            "
                        />

                        <div
                            className="
                                h-3 w-44
                                rounded-lg
                                bg-neutral-100
                                dark:bg-neutral-900
                                animate-pulse
                            "
                        />

                    </div>

                    <div
                        className="
                            h-10 w-20
                            rounded-xl
                            bg-neutral-100
                            dark:bg-neutral-900
                            animate-pulse
                        "
                    />

                </div>

                {/* Branch Skeletons */}

                <div className="mt-8 space-y-5">

                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="space-y-2"
                        >

                            <div className="flex justify-between">

                                <div
                                    className="
                                        h-3 w-24
                                        rounded
                                        bg-neutral-100
                                        dark:bg-neutral-900
                                        animate-pulse
                                    "
                                />

                                <div
                                    className="
                                        h-3 w-20
                                        rounded
                                        bg-neutral-100
                                        dark:bg-neutral-900
                                        animate-pulse
                                    "
                                />

                            </div>

                            <div
                                className="
                                    h-2
                                    rounded-full
                                    bg-neutral-100
                                    dark:bg-neutral-900
                                    animate-pulse
                                "
                            />

                        </div>
                    ))}

                </div>

            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!chartData.length) {
        return (
            <div
                className="
                    rounded-3xl
                    bg-white/80 dark:bg-neutral-950/80
                    border border-neutral-200/60
                    dark:border-neutral-800/60
                    shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                    backdrop-blur-md
                    p-6
                    font-ar
                "
            >

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex h-10 w-10
                            items-center justify-center
                            rounded-xl
                            bg-indigo-50
                            dark:bg-indigo-950/40
                        "
                    >

                        <Trophy
                            className="
                                h-5 w-5
                                text-indigo-600
                                dark:text-indigo-400
                            "
                        />

                    </div>

                    <div>

                        <h3
                            className="
                                text-sm
                                font-bold
                                text-slate-900
                                dark:text-neutral-100
                            "
                        >
                            {t('dashboard.top_sales_branches')}
                        </h3>

                        <p
                            className="
                                mt-0.5
                                text-xs
                                text-slate-500
                                dark:text-neutral-400
                            "
                        >
                            {t('dashboard.top_sales_branches_subtitle')}
                        </p>

                    </div>

                </div>

                <div className="flex h-48 items-center justify-center">

                    <p
                        className="
                            text-xs
                            text-slate-400
                            dark:text-neutral-500
                        "
                    >
                        {t('dashboard.no_chart_data')}
                    </p>

                </div>

            </div>
        )
    }

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
                border border-neutral-200/60
                dark:border-neutral-800/60
                shadow-[0_2px_16px_-6px_rgba(0,0,0,0.08)]
                backdrop-blur-md
                p-6
                font-ar
                transition-colors duration-200
            "
        >

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex h-10 w-10
                            shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-indigo-50
                            dark:bg-indigo-950/40
                            border border-indigo-100
                            dark:border-indigo-900/40
                        "
                    >

                        <Trophy
                            className="
                                h-5 w-5
                                text-indigo-600
                                dark:text-indigo-400
                            "
                        />

                    </div>

                    <div>

                        <div className="flex items-center gap-2">

                            <h3
                                className="
                                    text-sm
                                    font-bold
                                    text-slate-900
                                    dark:text-neutral-100
                                "
                            >
                                {t('dashboard.top_sales_branches')}
                            </h3>

                            <span
                                className="
                                    rounded-full
                                    bg-slate-100
                                    dark:bg-neutral-900
                                    px-2 py-0.5
                                    text-[9px]
                                    font-bold
                                    text-slate-500
                                    dark:text-neutral-400
                                "
                            >
                                TOP 5
                            </span>

                        </div>

                        <p
                            className="
                                mt-1
                                text-[11px]
                                text-slate-500
                                dark:text-neutral-400
                            "
                        >
                            {t('dashboard.top_sales_branches_subtitle')}
                        </p>

                    </div>

                </div>

                {/* Total Sales */}

                <div className="text-end shrink-0">

                    <p
                        className="
                            text-[9px]
                            font-medium
                            uppercase
                            tracking-wide
                            text-slate-400
                            dark:text-neutral-500
                        "
                    >
                        {t('dashboard.total_sales')}
                    </p>

                    <div
                        className="
                            mt-0.5
                            flex
                            items-baseline
                            gap-1
                        "
                    >

                        <span
                            className="
                                text-xl
                                font-bold
                                tracking-tight
                                text-slate-900
                                dark:text-neutral-100
                            "
                        >
                            {formatCurrency(totalSales)}
                        </span>

                        <span
                            className="
                                text-[10px]
                                font-semibold
                                text-slate-400
                                dark:text-neutral-500
                            "
                        >
                            ر.س
                        </span>

                    </div>

                </div>

            </div>

            {/* Branch Rankings */}

            <div className="mt-7 space-y-5">

                {chartData
                    .slice(0, 5)
                    .map((branch, index) => {

                        const sales =
                            Number(branch.sales || 0)

                        const percentage =
                            Math.max(
                                (sales / maxSales) * 100,
                                sales > 0 ? 4 : 0
                            )

                        const salesColor =
                            salesColors[index] ??
                            salesColors[
                            salesColors.length - 1
                                ]

                        const badgeColor =
                            salesBadgeColors[index] ??
                            salesBadgeColors[
                            salesBadgeColors.length - 1
                                ]

                        const salesPercentage =
                            totalSales > 0
                                ? Math.round(
                                    (sales / totalSales) * 100
                                )
                                : 0

                        return (
                            <div
                                key={branch.id}
                                className="group"
                            >

                                {/* Branch Header */}

                                <div
                                    className="
                                        mb-2
                                        flex
                                        items-center
                                        justify-between
                                        gap-3
                                    "
                                >

                                    <div
                                        className="
                                            flex
                                            min-w-0
                                            items-center
                                            gap-2.5
                                        "
                                    >

                                        {/* Rank */}

                                        <div
                                            className={`
                                                flex
                                                h-7 w-7
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-lg
                                                text-[10px]
                                                font-bold
                                                transition-transform
                                                duration-200
                                                group-hover:scale-105
                                                ${badgeColor}
                                            `}
                                        >

                                            {index === 0 ? (
                                                <Trophy
                                                    className="
                                                        h-3.5 w-3.5
                                                    "
                                                />
                                            ) : (
                                                index + 1
                                            )}

                                        </div>

                                        {/* Branch Name */}

                                        <span
                                            title={branch.name}
                                            className="
                                                truncate
                                                text-xs
                                                font-semibold
                                                text-slate-700
                                                dark:text-neutral-200
                                            "
                                        >
                                            {branch.name}
                                        </span>

                                    </div>

                                    {/* Sales */}

                                    <div
                                        className="
                                            flex
                                            shrink-0
                                            items-center
                                            gap-1
                                        "
                                    >

                                        <span
                                            className="
                                                text-xs
                                                font-bold
                                                text-slate-800
                                                dark:text-neutral-100
                                            "
                                        >
                                            {formatCurrency(sales)}
                                        </span>

                                        <span
                                            className="
                                                text-[9px]
                                                font-semibold
                                                text-slate-400
                                                dark:text-neutral-500
                                            "
                                        >
                                            ر.س
                                        </span>

                                    </div>

                                </div>

                                {/* Sales Progress */}

                                <div
                                    className="
                                        relative
                                        h-2
                                        overflow-hidden
                                        rounded-full
                                        bg-slate-100
                                        dark:bg-neutral-900
                                    "
                                >

                                    <div
                                        className={`
                                            absolute
                                            inset-y-0
                                            start-0
                                            rounded-full
                                            transition-all
                                            duration-700
                                            ease-out
                                            ${salesColor}
                                            group-hover:opacity-80
                                        `}
                                        style={{
                                            width: `${percentage}%`,
                                        }}
                                    />

                                </div>

                                {/* Percentage */}

                                <div
                                    className="
                                        mt-1.5
                                        flex
                                        justify-end
                                    "
                                >

                                    <span
                                        className="
                                            flex
                                            items-center
                                            gap-0.5
                                            text-[9px]
                                            font-medium
                                            text-slate-400
                                            dark:text-neutral-500
                                        "
                                    >

                                        <ArrowUpRight
                                            className="
                                                h-2.5 w-2.5
                                            "
                                        />

                                        {salesPercentage}%

                                    </span>

                                </div>

                            </div>
                        )
                    })}

            </div>

            {/* Footer */}

            <div
                className="
                    mt-6
                    flex
                    items-center
                    justify-between
                    border-t
                    border-neutral-100
                    dark:border-neutral-800/60
                    pt-4
                "
            >

                <span
                    className="
                        text-[10px]
                        font-medium
                        text-slate-400
                        dark:text-neutral-500
                    "
                >
                    {t('dashboard.sales_distribution')}
                </span>

                <span
                    className="
                        text-[10px]
                        font-semibold
                        text-indigo-600
                        dark:text-indigo-400
                    "
                >
                    {chartData.length}{' '}
                    {t('dashboard.branches')}
                </span>

            </div>

        </div>
    )
}