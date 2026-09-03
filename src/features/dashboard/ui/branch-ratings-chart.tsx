import React from 'react'
import {useTranslation} from 'react-i18next'
import {Star, Trophy} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/

interface BranchRating {
    branch_id: string
    name: string
    rating: number
}

interface BranchRatingsChartProps {
    ratings: BranchRating[]
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Branch Ratings Chart
|--------------------------------------------------------------------------
|
| Displays branch customer ratings ordered from highest to lowest.
| Each branch shows its rating, star indicator, and progress percentage.
|
*/

export function BranchRatingsChart({
                                       ratings,
                                       loading,
                                   }: BranchRatingsChartProps) {
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
                <div className="flex items-center justify-between">
                    <div>
                        <div className="h-5 w-40 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                        <div className="mt-2 h-3 w-56 rounded-lg bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                    </div>

                    <div className="h-9 w-9 rounded-xl bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                </div>

                <div className="mt-8 space-y-5">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="h-3 w-28 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
                                <div className="h-3 w-12 rounded bg-neutral-100 dark:bg-neutral-900 animate-pulse"/>
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

    const branchRatings = [...(ratings ?? [])]
        .sort((a, b) => Number(b.rating) - Number(a.rating))
        .slice(0, 5)

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    */

    if (!branchRatings.length) {
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
                <div className="flex items-start justify-between gap-4">

                    <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                            {t('dashboard.branch_ratings.title')}
                        </h3>

                        <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                            {t('dashboard.branch_ratings.subtitle')}
                        </p>
                    </div>

                    <div
                        className="
                            flex h-9 w-9 shrink-0
                            items-center justify-center
                            rounded-xl
                            bg-amber-50 dark:bg-amber-950/30
                            border border-amber-100 dark:border-amber-900/40
                        "
                    >
                        <Star
                            className="h-4 w-4 text-amber-500"
                            fill="currentColor"
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
                        {t('dashboard.branch_ratings.title')}
                    </h3>

                    <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                        {t('dashboard.branch_ratings.subtitle')}
                    </p>
                </div>

                <div
                    className="
                        flex h-9 w-9 shrink-0
                        items-center justify-center
                        rounded-xl
                        bg-amber-50 dark:bg-amber-950/30
                        border border-amber-100 dark:border-amber-900/40
                    "
                >
                    <Star
                        className="h-4 w-4 text-amber-500"
                        fill="currentColor"
                    />
                </div>

            </div>

            {/* Branches */}

            <div className="mt-7 space-y-5">

                {branchRatings.map((branch, index) => {

                    const rating = Math.min(
                        5,
                        Math.max(0, Number(branch.rating || 0))
                    )

                    const percentage = (rating / 5) * 100

                    const isTopBranch = index === 0

                    return (
                        <div
                            key={branch.branch_id}
                            className="group"
                        >

                            {/* Branch Header */}

                            <div className="mb-2.5 flex items-center justify-between gap-3">

                                <div className="flex min-w-0 items-center gap-3">

                                    {/* Rank */}

                                    <div
                                        className={`
                                            flex h-7 w-7 shrink-0
                                            items-center justify-center
                                            rounded-lg
                                            border
                                            text-[10px]
                                            font-bold
                                            ${
                                            isTopBranch
                                                ? `
                                                        bg-amber-50
                                                        dark:bg-amber-950/30
                                                        border-amber-200/70
                                                        dark:border-amber-800/40
                                                        text-amber-600
                                                        dark:text-amber-400
                                                    `
                                                : `
                                                        bg-slate-50
                                                        dark:bg-neutral-900
                                                        border-slate-100
                                                        dark:border-neutral-800
                                                        text-slate-500
                                                        dark:text-neutral-400
                                                    `
                                        }
                                        `}
                                    >
                                        {isTopBranch ? (
                                            <Trophy className="h-3.5 w-3.5"/>
                                        ) : (
                                            index + 1
                                        )}
                                    </div>

                                    {/* Branch Name */}

                                    <span
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

                                {/* Rating */}

                                <div className="flex shrink-0 items-center gap-1.5">

                                    <Star
                                        className="
                                            h-3.5 w-3.5
                                            text-amber-500
                                        "
                                        fill="currentColor"
                                    />

                                    <span
                                        className="
                                            text-sm
                                            font-bold
                                            text-slate-900
                                            dark:text-neutral-100
                                        "
                                    >
                                        {rating.toFixed(1)}
                                    </span>

                                    <span
                                        className="
                                            text-[10px]
                                            font-medium
                                            text-slate-400
                                            dark:text-neutral-500
                                        "
                                    >
                                        / 5
                                    </span>

                                </div>

                            </div>

                            {/* Rating Bar */}

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
                                    className="
                                        absolute
                                        inset-y-0
                                        start-0
                                        rounded-full
                                        bg-amber-400
                                        dark:bg-amber-500
                                        transition-all
                                        duration-700
                                        ease-out
                                        group-hover:opacity-80
                                    "
                                    style={{
                                        width: `${percentage}%`,
                                    }}
                                />
                            </div>

                            {/* Rating Percentage */}

                            <div className="mt-1.5 flex justify-end">

                                <span
                                    className="
                                        text-[10px]
                                        font-medium
                                        text-slate-400
                                        dark:text-neutral-500
                                    "
                                >
                                    {Math.round(percentage)}%
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
                    {t('dashboard.branch_ratings.max_rating')}
                </span>

                <div className="flex items-center gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                            key={star}
                            className="h-3 w-3 text-amber-400"
                            fill="currentColor"
                        />
                    ))}

                    <span
                        className="
                            ms-1
                            text-[10px]
                            font-bold
                            text-slate-500
                            dark:text-neutral-400
                        "
                    >
                        5.0
                    </span>

                </div>

            </div>

        </div>
    )
}