import React from 'react'
import {useTranslation} from 'react-i18next'
import {
    Frown,
    Meh,
    Smile,
    MessageSquareHeart,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface RatingSentimentItem {
    count: number
    percentage: number
}

interface RatingSentiment {
    total: number
    positive: RatingSentimentItem
    neutral: RatingSentimentItem
    negative: RatingSentimentItem
}

interface RatingSentimentChartProps {
    sentiment: RatingSentiment | null
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Rating Sentiment Chart
|--------------------------------------------------------------------------
|
| Displays the distribution of customer ratings into:
|
| - Positive
| - Neutral
| - Negative
|
*/

export function RatingSentimentChart({sentiment, loading,}: RatingSentimentChartProps) {
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
                <div className="flex items-start justify-between">

                    <div>
                        <div className="h-5 w-40 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                        <div className="mt-2 h-3 w-56 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                    </div>

                    <div className="h-9 w-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>

                </div>

                <div className="mt-8 flex justify-center">
                    <div className="h-32 w-32 rounded-full border-[14px] border-neutral-100 dark:border-neutral-900 animate-pulse"/>
                </div>

                <div className="mt-8 space-y-4">

                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className="h-8 w-8 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                                <div className="h-3 w-20 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                            </div>

                            <div className="h-3 w-14 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
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

    const total = Number(sentiment?.total || 0)

    const positive = {
        count: Number(sentiment?.positive?.count || 0),
        percentage: Number(sentiment?.positive?.percentage || 0),
    }

    const neutral = {
        count: Number(sentiment?.neutral?.count || 0),
        percentage: Number(sentiment?.neutral?.percentage || 0),
    }

    const negative = {
        count: Number(sentiment?.negative?.count || 0),
        percentage: Number(sentiment?.negative?.percentage || 0),
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (total === 0) {
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
                <div className="flex items-start justify-between">

                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                            {t('dashboard.rating_sentiment.title')}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                            {t('dashboard.rating_sentiment.subtitle')}
                        </p>
                    </div>

                    <div
                        className="
                            flex h-9 w-9
                            items-center justify-center
                            rounded-xl
                            bg-indigo-50 dark:bg-indigo-950/30
                            border border-indigo-100 dark:border-indigo-900/40
                        "
                    >
                        <MessageSquareHeart
                            className="
                                h-4 w-4
                                text-indigo-500
                                dark:text-indigo-400
                            "
                        />
                    </div>

                </div>

                <div className="flex min-h-48 items-center justify-center">
                    <p className="text-xs text-slate-400 dark:text-neutral-500">
                        {t('dashboard.no_rating_data')}
                    </p>
                </div>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Sentiment Items
    |--------------------------------------------------------------------------
    */

    const sentimentItems = [
        {
            key: 'positive',
            label: t('dashboard.rating_sentiment.positive'),
            count: positive.count,
            percentage: positive.percentage,
            icon: Smile,
            iconClass:
                'text-emerald-600 dark:text-emerald-400',
            iconBackground:
                'bg-emerald-50 dark:bg-emerald-950/30',
            barClass:
                'bg-emerald-500 dark:bg-emerald-400',
        },

        {
            key: 'neutral',
            label: t('dashboard.rating_sentiment.neutral'),
            count: neutral.count,
            percentage: neutral.percentage,
            icon: Meh,
            iconClass:
                'text-amber-600 dark:text-amber-400',
            iconBackground:
                'bg-amber-50 dark:bg-amber-950/30',
            barClass:
                'bg-amber-400 dark:bg-amber-400',
        },

        {
            key: 'negative',
            label: t('dashboard.rating_sentiment.negative'),
            count: negative.count,
            percentage: negative.percentage,
            icon: Frown,
            iconClass:
                'text-rose-600 dark:text-rose-400',
            iconBackground:
                'bg-rose-50 dark:bg-rose-950/30',
            barClass:
                'bg-rose-500 dark:bg-rose-400',
        },
    ]

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

            {/* Header */}

            <div className="flex items-start justify-between gap-4">

                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                        {t('dashboard.rating_sentiment.title')}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                        {t('dashboard.rating_sentiment.subtitle')}
                    </p>
                </div>

                <div
                    className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl
                        bg-indigo-50 dark:bg-indigo-950/30
                        border border-indigo-100 dark:border-indigo-900/40
                    "
                >
                    <MessageSquareHeart
                        className="
                            h-4 w-4
                            text-indigo-500
                            dark:text-indigo-400
                        "
                    />
                </div>

            </div>

            {/* Total */}

            <div className="mt-7 flex items-center justify-center">

                <div
                    className="
                        relative
                        flex h-32 w-32
                        items-center justify-center
                        rounded-full
                        bg-slate-50
                        dark:bg-neutral-900
                    "
                >

                    {/* Decorative Ring */}

                    <div
                        className="
                            absolute
                            inset-0
                            rounded-full
                            border-[10px]
                            border-indigo-100
                            dark:border-indigo-950
                        "
                    />

                    <div className="text-center">

                        <p className="text-2xl font-bold text-slate-900 dark:text-neutral-100">
                            {total.toLocaleString()}
                        </p>

                        <p className="mt-0.5 text-[10px] font-medium text-slate-400 dark:text-neutral-500">
                            {t('dashboard.rating_sentiment.total')}
                        </p>

                    </div>

                </div>

            </div>

            {/* Sentiment Breakdown */}

            <div className="mt-8 space-y-5">

                {sentimentItems.map((item) => {

                    const Icon = item.icon

                    return (
                        <div
                            key={item.key}
                            className="group"
                        >

                            {/* Header */}

                            <div className="mb-2 flex items-center justify-between gap-3">

                                <div className="flex items-center gap-3">

                                    <div
                                        className={`
                                            flex h-8 w-8
                                            items-center justify-center
                                            rounded-xl
                                            ${item.iconBackground}
                                        `}
                                    >
                                        <Icon
                                            className={`
                                                h-4 w-4
                                                ${item.iconClass}
                                            `}
                                        />
                                    </div>

                                    <span
                                        className="
                                            text-xs
                                            font-semibold
                                            text-slate-700
                                            dark:text-neutral-200
                                        "
                                    >
                                        {item.label}
                                    </span>

                                </div>

                                <div className="flex items-center gap-2">

                                    <span
                                        className="
                                            text-xs
                                            font-bold
                                            text-slate-800
                                            dark:text-neutral-100
                                        "
                                    >
                                        {item.count.toLocaleString()}
                                    </span>

                                    <span
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-slate-400
                                            dark:text-neutral-500
                                        "
                                    >
                                        {item.percentage}%
                                    </span>

                                </div>

                            </div>

                            {/* Progress */}

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
                                        ${item.barClass}
                                        transition-all
                                        duration-700
                                        ease-out
                                        group-hover:opacity-80
                                    `}
                                    style={{
                                        width: `${Math.min(
                                            100,
                                            Math.max(
                                                0,
                                                item.percentage
                                            )
                                        )}%`,
                                    }}
                                />

                            </div>

                        </div>
                    )
                })}

            </div>

            {/* Footer */}

            <div
                className="
                    mt-6
                    pt-4
                    border-t
                    border-neutral-100
                    dark:border-neutral-800/60
                    flex
                    items-center
                    justify-between
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
                    {t('dashboard.rating_sentiment.overview')}
                </span>

                <div className="flex items-center gap-1.5">

                    <span className="h-2 w-2 rounded-full bg-emerald-500"/>
                    <span className="h-2 w-2 rounded-full bg-amber-400"/>
                    <span className="h-2 w-2 rounded-full bg-rose-500"/>

                    <span
                        className="
                            ms-1
                            text-[10px]
                            font-semibold
                            text-slate-500
                            dark:text-neutral-400
                        "
                    >
                        {t('dashboard.rating_sentiment.all_ratings')}
                    </span>

                </div>

            </div>

        </div>
    )
}