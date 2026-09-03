'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {
    useEffect,
    useMemo,
    useState,
} from 'react'

import {useTranslation} from 'react-i18next'
import {useRouter} from 'next/navigation'

import {
    MessageSquareText,
    RefreshCw,
    Star,
    ThumbsDown,
    ThumbsUp,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
|
*/

import {
    BranchRatingsChart,
    RatingSentimentChart,
    useTenantDashboard,
} from '@/features/dashboard'

/*
|--------------------------------------------------------------------------
| Page Components
|--------------------------------------------------------------------------
|
*/

import PageActions from '@/components/page-action'
import {RatingSummaryCard} from '@/components/cards'

/*
|--------------------------------------------------------------------------
| Rating Components
|--------------------------------------------------------------------------
|
*/

import {LatestRatings} from '@/features/ratings/ui'

/*
|--------------------------------------------------------------------------
| Rating Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/ratings/hooks'

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
|
*/

export default function RatingsPage() {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Router
    |--------------------------------------------------------------------------
    |
    */

    const router = useRouter()

    /*
    |--------------------------------------------------------------------------
    | Local State
    |--------------------------------------------------------------------------
    |
    */

    const [isRefreshing, setIsRefreshing] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Tenant Dashboard
    |--------------------------------------------------------------------------
    |
    */

    const {
        branchRatings,
        ratingSentiment,
        branchRatingsLoading,
        ratingSentimentLoading,
        fetchBranchRatings,
        fetchRatingSentiment,
    } = useTenantDashboard()

    /*
    |--------------------------------------------------------------------------
    | Rating Collection
    |--------------------------------------------------------------------------
    |
    */

    const {list: ratingsList, loading: ratingsLoading, handleSearch} = useCollections()

    /*
    |--------------------------------------------------------------------------
    | Initial Data
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {
        fetchBranchRatings()
        fetchRatingSentiment()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = () => {

        setIsRefreshing(true)

        Promise.all([
            new Promise<void>((resolve) => {
                fetchBranchRatings(() => resolve())
            }),

            new Promise<void>((resolve) => {
                fetchRatingSentiment(() => resolve())
            }),
            new Promise<void>((resolve) => {
                handleSearch()
            }),
        ]).finally(() => {
            setIsRefreshing(false)
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Branch Ratings
    |--------------------------------------------------------------------------
    |
    */
    const ratings = branchRatings?.branches || []

    /*
    |--------------------------------------------------------------------------
    | Sentiment
    |--------------------------------------------------------------------------
    |
    */
    const sentiment = ratingSentiment?.sentiment || null

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    |
    */
    const getNumber = (...values: any[]) => {

        for (const value of values) {

            if (
                value !== undefined &&
                value !== null &&
                !Number.isNaN(Number(value))
            ) {
                return Number(value)
            }

        }

        return 0
    }

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    |
    */

    const statistics = useMemo(() => {

        /*
        |--------------------------------------------------------------------------
        | Average
        |--------------------------------------------------------------------------
        |
        */

        const averageFromBranches =
            ratings.length
                ? ratings.reduce(
                (
                    sum: number,
                    branch: any,
                ) => {
                    return sum + getNumber(
                        branch.average,
                        branch.average_rating,
                        branch.rating,
                        branch.avg_rating,
                    )
                },
                0,
            ) / ratings.length
                : 0

        const average = getNumber(
            sentiment?.average,
            sentiment?.average_rating,
            sentiment?.avg_rating,
            branchRatings?.average,
            branchRatings?.average_rating,
            averageFromBranches,
        )

        /*
        |--------------------------------------------------------------------------
        | Total
        |--------------------------------------------------------------------------
        |
        */

        const total = getNumber(
            sentiment?.total,
            sentiment?.total_ratings,
            sentiment?.count,
        )

        /*
        |--------------------------------------------------------------------------
        | Positive
        |--------------------------------------------------------------------------
        |
        */

        const positive = getNumber(
            sentiment?.positive?.count,
        )

        const positivePercentage = getNumber(
            sentiment?.positive?.percentage,
        )

        /*
        |--------------------------------------------------------------------------
        | Neutral
        |--------------------------------------------------------------------------
        |
        */

        const neutral = getNumber(
            sentiment?.neutral?.count,
        )

        const neutralPercentage = getNumber(
            sentiment?.neutral?.percentage,
        )

        /*
        |--------------------------------------------------------------------------
        | Negative
        |--------------------------------------------------------------------------
        |
        */

        const negative = getNumber(
            sentiment?.negative?.count,
        )

        const negativePercentage = getNumber(
            sentiment?.negative?.percentage,
        )

        return {
            average,
            total,
            positive,
            positivePercentage,
            neutral,
            neutralPercentage,
            negative,
            negativePercentage,
        }

    }, [
        sentiment,
        branchRatings,
        ratings,
    ])

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    |
    */

    const loading =
        branchRatingsLoading ||
        ratingSentimentLoading ||
        ratingsLoading

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="min-h-screen bg-slate-50 p-6 font-ar transition-colors duration-200 dark:bg-neutral-950 lg:p-8">

            <div className="space-y-8">

                {/*
                |--------------------------------------------------------------------------
                | Page Header
                |--------------------------------------------------------------------------
                |
                */}

                <PageActions
                    title={t('rating.overview.title')}
                    actions={[
                        {
                            label: isRefreshing || loading ? 'common.refreshing' : 'common.refresh',
                            type: 'default',
                            icon: <RefreshCw size={15} className={isRefreshing || loading ? 'animate-spin' : ''}/>,
                            onClick: handleRefresh,
                        },
                        {
                            label: 'common.back',
                            onClick: () => router.back(),
                        },
                    ]}
                />

                {/*
                |--------------------------------------------------------------------------
                | Statistics
                |--------------------------------------------------------------------------
                |
                */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    <RatingSummaryCard
                        title={t('rating.stats.average')}
                        value={statistics.average.toFixed(1)}
                        suffix="/ 5"
                        icon={<Star size={19} fill="currentColor"/>}
                        iconClass="bg-amber-50 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400"
                        loading={branchRatingsLoading}
                    />

                    <RatingSummaryCard
                        title={t('rating.stats.total')}
                        value={statistics.total.toLocaleString()}
                        icon={<MessageSquareText size={19}/>}
                        iconClass="bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400"
                        loading={ratingSentimentLoading}
                    />

                    <RatingSummaryCard
                        title={t('rating.stats.positive')}
                        value={statistics.positive.toLocaleString()}
                        percentage={statistics.positivePercentage}
                        icon={<ThumbsUp size={19}/>}
                        iconClass="bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                        loading={ratingSentimentLoading}
                    />

                    <RatingSummaryCard
                        title={t('rating.stats.neutral')}
                        value={statistics.neutral.toLocaleString()}
                        percentage={statistics.neutralPercentage}
                        icon={<MessageSquareText size={19}/>}
                        iconClass="bg-amber-50 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400"
                        loading={ratingSentimentLoading}
                    />

                    <RatingSummaryCard
                        title={t('rating.stats.negative')}
                        value={statistics.negative.toLocaleString()}
                        percentage={statistics.negativePercentage}
                        icon={<ThumbsDown size={19}/>}
                        iconClass="bg-red-50 text-red-600 dark:bg-red-500/10 dark:text-red-400"
                        loading={ratingSentimentLoading}
                    />

                </div>
                {/*
                |--------------------------------------------------------------------------
                | Rating Charts
                |--------------------------------------------------------------------------
                |
                */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    <BranchRatingsChart ratings={ratings} loading={branchRatingsLoading}/>

                    <RatingSentimentChart sentiment={sentiment} loading={ratingSentimentLoading}/>
                </div>

                {/*
                |--------------------------------------------------------------------------
                | Latest Ratings
                |--------------------------------------------------------------------------
                |
                */}
                <LatestRatings ratings={ratingsList?.data || []} loading={ratingsLoading}/>

            </div>
        </div>
    )
}