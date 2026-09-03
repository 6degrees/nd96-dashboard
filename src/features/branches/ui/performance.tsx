'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import {useTranslation} from 'react-i18next'
import {useRouter} from 'next/router'
import {
    AlertTriangle,
    CheckCircle2,
    ChevronLeft,
    ChevronRight,
    Clock3,
    Star,
    Trophy,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface Branch {
    id: string
    name: string
    rating?: number
    late_orders?: number
    average_preparation_time?: number
    sales?: number
    orders?: number
}

interface BranchPerformanceCardsProps {
    attentionBranches?: Branch[]
    topBranches?: Branch[]
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

export function BranchPerformanceCards({attentionBranches = [], topBranches = [], loading = false,}: BranchPerformanceCardsProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */

    const {t, i18n} = useTranslation()
    const router = useRouter()

    /*
    |--------------------------------------------------------------------------
    | Localization
    |--------------------------------------------------------------------------
    |
    */

    const isArabic = i18n.language === 'ar'

    const ArrowIcon = isArabic
        ? ChevronLeft
        : ChevronRight

    /*
    |--------------------------------------------------------------------------
    | Navigation
    |--------------------------------------------------------------------------
    |
    */

    const handleBranchClick = (branchId: string) => {
        router.push(
            `/dashboard/branches/${branchId}`,
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Formatting
    |--------------------------------------------------------------------------
    |
    */

    const formatNumber = (value: number) => {
        return Number(value || 0).toLocaleString(
            isArabic ? 'ar-SA' : 'en-US',
        )
    }

    const formatRating = (value?: number) => {
        const rating = Number(value || 0)

        return rating > 0
            ? rating.toFixed(1)
            : '—'
    }

    /*
    |--------------------------------------------------------------------------
    | Sales Calculations
    |--------------------------------------------------------------------------
    |
    */

    const totalSales = topBranches.reduce(
        (total, branch) =>
            total + Number(branch.sales || 0),
        0,
    )

    const maxSales = Math.max(
        ...topBranches.map(
            branch => Number(branch.sales || 0),
        ),
        1,
    )

    const getSalesPercentage = (sales: number) => {
        if (!totalSales) {
            return 0
        }

        return Math.round(
            (sales / totalSales) * 100,
        )
    }

    const getProgressWidth = (sales: number) => {
        return Math.max(
            (sales / maxSales) * 100,
            3,
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    |
    */

    if (loading) {
        return (
            <div
                className="
                    grid
                    grid-cols-1
                    xl:grid-cols-2
                    gap-6
                "
            >
                {[1, 2].map((item) => (
                    <div
                        key={item}
                        className="
                            overflow-hidden
                            rounded-[28px]
                            border
                            border-slate-200/70
                            dark:border-neutral-800
                            bg-white
                            dark:bg-neutral-950
                            shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]
                        "
                    >
                        <div
                            className="
                                h-1
                                w-full
                                bg-slate-100
                                dark:bg-neutral-900
                                animate-pulse
                            "
                        />

                        <div className="p-6">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div
                                        className="
                                            h-11
                                            w-11
                                            rounded-2xl
                                            bg-slate-100
                                            dark:bg-neutral-900
                                            animate-pulse
                                        "
                                    />

                                    <div className="space-y-2">

                                        <div
                                            className="
                                                h-4
                                                w-36
                                                rounded
                                                bg-slate-100
                                                dark:bg-neutral-900
                                                animate-pulse
                                            "
                                        />

                                        <div
                                            className="
                                                h-3
                                                w-52
                                                rounded
                                                bg-slate-100
                                                dark:bg-neutral-900
                                                animate-pulse
                                            "
                                        />

                                    </div>

                                </div>

                                <div
                                    className="
                                        h-8
                                        w-8
                                        rounded-xl
                                        bg-slate-100
                                        dark:bg-neutral-900
                                        animate-pulse
                                    "
                                />

                            </div>

                            <div
                                className="
                                    mt-6
                                    space-y-2
                                "
                            >
                                {[1, 2, 3, 4].map((row) => (
                                    <div
                                        key={row}
                                        className="
                                            h-[76px]
                                            rounded-2xl
                                            bg-slate-50
                                            dark:bg-neutral-900/50
                                            animate-pulse
                                        "
                                    />
                                ))}
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    |
    */

    const renderEmptyState = (
        type: 'attention' | 'top',
    ) => {

        const attention = type === 'attention'

        return (
            <div
                className="
                    flex
                    min-h-[240px]
                    flex-col
                    items-center
                    justify-center
                    text-center
                "
            >
                <div
                    className={`
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        ${
                        attention
                            ? `
                                    bg-emerald-50
                                    text-emerald-500
                                    dark:bg-emerald-950/20
                                    dark:text-emerald-400
                                `
                            : `
                                    bg-slate-50
                                    text-slate-400
                                    dark:bg-neutral-900
                                    dark:text-neutral-500
                                `
                    }
                    `}
                >
                    {attention ? (
                        <CheckCircle2 className="h-6 w-6"/>
                    ) : (
                        <Trophy className="h-6 w-6"/>
                    )}
                </div>

                <p
                    className="
                        mt-4
                        text-sm
                        font-bold
                        text-slate-800
                        dark:text-neutral-100
                    "
                >
                    {t(
                        attention
                            ? 'branch.stats.no_attention_branches'
                            : 'branch.stats.no_top_branches',
                    )}
                </p>

                <p
                    className="
                        mt-1
                        max-w-xs
                        text-xs
                        leading-5
                        text-slate-400
                        dark:text-neutral-500
                    "
                >
                    {t(
                        attention
                            ? 'branch.stats.no_attention_branches_subtitle'
                            : 'branch.stats.no_top_branches_subtitle',
                    )}
                </p>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Top Branch Row
    |--------------------------------------------------------------------------
    |
    */

    const renderTopBranch = (
        branch: Branch,
        index: number,
    ) => {

        const sales = Number(branch.sales || 0)
        const orders = Number(branch.orders || 0)
        const rating = Number(branch.rating || 0)

        const percentage =
            getSalesPercentage(sales)

        const progress =
            getProgressWidth(sales)

        return (
            <button
                key={branch.id}
                type="button"
                onClick={() =>
                    handleBranchClick(branch.id)
                }
                className="
                    group
                    w-full
                    cursor-pointer
                    rounded-2xl
                    px-3
                    py-3
                    text-start
                    transition-all
                    duration-200
                    hover:bg-emerald-50/70
                    dark:hover:bg-emerald-950/10
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className={`
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            text-xs
                            font-extrabold
                            transition-all
                            ${
                            index === 0
                                ? `
                                        bg-emerald-500
                                        text-white
                                        shadow-[0_6px_16px_-8px_rgba(16,185,129,0.8)]
                                    `
                                : `
                                        bg-slate-100
                                        text-slate-500
                                        dark:bg-neutral-900
                                        dark:text-neutral-400
                                    `
                        }
                        `}
                    >
                        {index === 0 ? (
                            <Trophy className="h-4 w-4"/>
                        ) : (
                            index + 1
                        )}
                    </div>

                    <div
                        className="
                            min-w-0
                            flex-1
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >
                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-bold
                                    text-slate-800
                                    dark:text-neutral-100
                                "
                            >
                                {branch.name}
                            </p>

                            <p
                                className="
                                    shrink-0
                                    text-sm
                                    font-extrabold
                                    tracking-tight
                                    text-slate-900
                                    dark:text-neutral-100
                                "
                            >
                                {formatNumber(sales)}

                                <span
                                    className="
                                        ms-1
                                        text-[9px]
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    {t('branch.stats.currency')}
                                </span>
                            </p>
                        </div>

                        <div
                            className="
                                mt-2.5
                                h-1.5
                                overflow-hidden
                                rounded-full
                                bg-slate-100
                                dark:bg-neutral-900
                            "
                        >
                            <div
                                className="
                                    h-full
                                    rounded-full
                                    bg-emerald-500
                                    transition-all
                                    duration-700
                                "
                                style={{
                                    width: `${progress}%`,
                                }}
                            />
                        </div>

                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                justify-between
                            "
                        >
                            <div
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-[10px]
                                    font-medium
                                    text-slate-400
                                "
                            >
                                <span
                                    className="
                                        flex
                                        items-center
                                        gap-1
                                    "
                                >
                                    <Star
                                        className="
                                            h-3
                                            w-3
                                            fill-current
                                            text-amber-400
                                        "
                                    />

                                    {formatRating(rating)}
                                </span>

                                <span>
                                    {formatNumber(orders)}
                                    {' '}
                                    {t('branch.stats.orders')}
                                </span>
                            </div>

                            <span
                                className="
                                    text-[10px]
                                    font-bold
                                    text-slate-400
                                "
                            >
                                {percentage}%
                            </span>
                        </div>
                    </div>

                    <ArrowIcon
                        className="
                            h-4
                            w-4
                            shrink-0
                            text-emerald-400
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                        "
                    />
                </div>
            </button>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Attention Branch Row
    |--------------------------------------------------------------------------
    |
    */

    const renderAttentionBranch = (
        branch: Branch,
    ) => {

        const lateOrders =
            Number(branch.late_orders || 0)

        const rating =
            Number(branch.rating || 0)

        const preparationTime =
            Number(
                branch.average_preparation_time || 0,
            )

        return (
            <button
                key={branch.id}
                type="button"
                onClick={() =>
                    handleBranchClick(branch.id)
                }
                className="
                    group
                    w-full
                    cursor-pointer
                    rounded-2xl
                    px-3
                    py-3.5
                    text-start
                    transition-all
                    duration-200
                    hover:bg-red-50/60
                    dark:hover:bg-red-950/10
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className="
                            flex
                            h-9
                            w-9
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-red-50
                            text-red-400
                            dark:bg-red-950/20
                            dark:text-red-400
                        "
                    >
                        <AlertTriangle className="h-4 w-4"/>
                    </div>

                    <div
                        className="
                            min-w-0
                            flex-1
                        "
                    >
                        <div
                            className="
                                flex
                                items-center
                                justify-between
                                gap-4
                            "
                        >
                            <p
                                className="
                                    truncate
                                    text-sm
                                    font-bold
                                    text-slate-800
                                    dark:text-neutral-100
                                "
                            >
                                {branch.name}
                            </p>

                            <div
                                className="
                                    flex
                                    shrink-0
                                    items-baseline
                                    gap-1
                                "
                            >
                                <span
                                    className="
                                        text-sm
                                        font-extrabold
                                        text-red-500
                                        dark:text-red-400
                                    "
                                >
                                    {formatNumber(lateOrders)}
                                </span>

                                <span
                                    className="
                                        text-[9px]
                                        font-medium
                                        text-slate-400
                                    "
                                >
                                    {t(
                                        'branch.stats.late_orders',
                                    )}
                                </span>
                            </div>
                        </div>

                        <div
                            className="
                                mt-2
                                flex
                                items-center
                                gap-4
                                text-[10px]
                                font-medium
                                text-slate-400
                            "
                        >
                            <span
                                className="
                                    flex
                                    items-center
                                    gap-1
                                "
                            >
                                <Star
                                    className="
                                        h-3
                                        w-3
                                        fill-current
                                        text-amber-400
                                    "
                                />

                                {formatRating(rating)}
                            </span>

                            <span
                                className="
                                    flex
                                    items-center
                                    gap-1
                                "
                            >
                                <Clock3 className="h-3 w-3"/>

                                {formatNumber(
                                    preparationTime,
                                )}

                                {' '}

                                {t(
                                    'branch.stats.minutes',
                                )}
                            </span>

                            <span
                                className="
                                    ms-auto
                                    font-semibold
                                    text-red-400
                                "
                            >
                                {t(
                                    'branch.stats.requires_attention',
                                )}
                            </span>
                        </div>
                    </div>

                    <ArrowIcon
                        className="
                            h-4
                            w-4
                            shrink-0
                            text-red-300
                            opacity-0
                            transition-all
                            duration-200
                            group-hover:translate-x-0.5
                            group-hover:opacity-100
                        "
                    />
                </div>
            </button>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Card Header
    |--------------------------------------------------------------------------
    |
    */

    const renderCardHeader = (
        type: 'attention' | 'top',
        count: number,
    ) => {

        const attention =
            type === 'attention'

        return (
            <div
                className="
                    flex
                    items-start
                    justify-between
                    gap-4
                "
            >
                <div
                    className="
                        flex
                        items-center
                        gap-3
                    "
                >
                    <div
                        className={`
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            ${
                            attention
                                ? `
                                        bg-red-50
                                        text-red-400
                                        dark:bg-red-950/20
                                        dark:text-red-400
                                    `
                                : `
                                        bg-emerald-50
                                        text-emerald-600
                                        dark:bg-emerald-950/20
                                        dark:text-emerald-400
                                    `
                        }
                        `}
                    >
                        {attention ? (
                            <AlertTriangle className="h-5 w-5"/>
                        ) : (
                            <Trophy className="h-5 w-5"/>
                        )}
                    </div>

                    <div>

                        <div
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >
                            <h3
                                className="
                                    text-sm
                                    font-extrabold
                                    text-slate-900
                                    dark:text-neutral-100
                                "
                            >
                                {t(
                                    attention
                                        ? 'branch.stats.attention_title'
                                        : 'branch.stats.top_title',
                                )}
                            </h3>

                            {!attention && (
                                <span
                                    className="
                                        rounded-full
                                        bg-emerald-50
                                        px-2
                                        py-0.5
                                        text-[8px]
                                        font-extrabold
                                        tracking-wide
                                        text-emerald-600
                                        dark:bg-emerald-950/20
                                        dark:text-emerald-400
                                    "
                                >
                                    TOP 5
                                </span>
                            )}
                        </div>

                        <p
                            className="
                                mt-1
                                text-[11px]
                                font-medium
                                text-slate-400
                                dark:text-neutral-500
                            "
                        >
                            {t(
                                attention
                                    ? 'branch.stats.attention_subtitle'
                                    : 'branch.stats.top_subtitle',
                            )}
                        </p>
                    </div>
                </div>

                <span
                    className={`
                        flex
                        h-8
                        min-w-8
                        items-center
                        justify-center
                        rounded-xl
                        px-2
                        text-xs
                        font-extrabold
                        ${
                        attention
                            ? `
                                    bg-red-50
                                    text-red-500
                                    dark:bg-red-950/20
                                    dark:text-red-400
                                `
                            : `
                                    bg-emerald-50
                                    text-emerald-600
                                    dark:bg-emerald-950/20
                                    dark:text-emerald-400
                                `
                    }
                    `}
                >
                    {count}
                </span>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Performance Card
    |--------------------------------------------------------------------------
    |
    */

    const renderPerformanceCard = () => (
        <div
            className="
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/70
                dark:border-neutral-800
                bg-white
                dark:bg-neutral-950
                shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]
            "
        >
            <div
                className="
                    h-1
                    w-full
                    bg-emerald-500
                "
            />

            <div className="p-6">

                {renderCardHeader(
                    'top',
                    topBranches.length,
                )}

                <div
                    className="
                        my-5
                        h-px
                        bg-slate-100
                        dark:bg-neutral-900
                    "
                />

                {topBranches.length > 0 ? (
                    <div className="space-y-0.5">
                        {topBranches
                            .slice(0, 5)
                            .map(renderTopBranch)}
                    </div>
                ) : (
                    renderEmptyState('top')
                )}

            </div>
        </div>
    )

    /*
    |--------------------------------------------------------------------------
    | Attention Card
    |--------------------------------------------------------------------------
    |
    */

    const renderAttentionCard = () => (
        <div
            className="
                overflow-hidden
                rounded-[28px]
                border
                border-slate-200/70
                dark:border-neutral-800
                bg-white
                dark:bg-neutral-950
                shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]
            "
        >
            <div
                className="
                    h-1
                    w-full
                    bg-red-400
                "
            />

            <div className="p-6">

                {renderCardHeader(
                    'attention',
                    attentionBranches.length,
                )}

                <div
                    className="
                        my-5
                        h-px
                        bg-slate-100
                        dark:bg-neutral-900
                    "
                />

                {attentionBranches.length > 0 ? (
                    <div
                        className="
                            divide-y
                            divide-slate-100
                            dark:divide-neutral-900
                        "
                    >
                        {attentionBranches.map(
                            renderAttentionBranch,
                        )}
                    </div>
                ) : (
                    renderEmptyState('attention')
                )}

            </div>
        </div>
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {renderPerformanceCard()}

            {renderAttentionCard()}
        </div>
    )
}