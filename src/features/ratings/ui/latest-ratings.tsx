'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import {Star} from 'lucide-react'
import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
*/

interface LatestRatingsProps {
    ratings: any[]
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| Latest Ratings
|--------------------------------------------------------------------------
|
*/

export default function LatestRatings({
                                          ratings,
                                          loading = false,
                                      }: LatestRatingsProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Date Formatter
    |--------------------------------------------------------------------------
    |
    */

    const formatDate = (date: string) => {

        if (!date) {
            return ''
        }

        return new Intl.DateTimeFormat(
            undefined,
            {
                dateStyle: 'medium',
                timeStyle: 'short',
            },
        ).format(new Date(date))
    }

    /*
    |--------------------------------------------------------------------------
    | Rating Style
    |--------------------------------------------------------------------------
    |
    */

    const getRatingStyle = (rating: number) => {

        if (rating >= 4) {
            return 'border-emerald-100 bg-emerald-50/50 dark:border-emerald-900/40 dark:bg-emerald-950/20'
        }

        if (rating === 3) {
            return 'border-amber-100 bg-amber-50/50 dark:border-amber-900/40 dark:bg-amber-950/20'
        }

        return 'border-red-100 bg-red-50/50 dark:border-red-900/40 dark:bg-red-950/20'
    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    |
    */

    if (loading) {

        return (
            <section className="rounded-2xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">

                <div className="border-b border-slate-100 px-6 py-5 dark:border-neutral-800">

                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                        {t('rating.latest.title')}
                    </h2>

                    <p className="mt-1 text-xs text-slate-400 dark:text-neutral-500">
                        {t('rating.latest.description')}
                    </p>

                </div>

                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">

                    {Array.from({length: 6}).map((_, index) => (

                        <div
                            key={index}
                            className="animate-pulse rounded-xl border border-slate-100 bg-slate-50 p-5 dark:border-neutral-800 dark:bg-neutral-950"
                        >

                            <div className="flex items-start justify-between">

                                <div className="space-y-2">

                                    <div className="h-4 w-32 rounded bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="h-3 w-24 rounded bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                                <div className="h-4 w-20 rounded bg-slate-200 dark:bg-neutral-800"/>

                            </div>

                            <div className="mt-5 space-y-2">

                                <div className="h-3 w-full rounded bg-slate-200 dark:bg-neutral-800"/>

                                <div className="h-3 w-4/5 rounded bg-slate-200 dark:bg-neutral-800"/>

                            </div>

                        </div>

                    ))}

                </div>

            </section>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Latest Ratings
    |--------------------------------------------------------------------------
    |
    */

    const latestRatings = ratings.slice(0, 10)

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <section className="rounded-2xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">

            {/*
            |--------------------------------------------------------------------------
            | Header
            |--------------------------------------------------------------------------
            |
            */}

            <div className="border-b border-slate-100 px-6 py-5 dark:border-neutral-800">

                <h2 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('rating.latest.title')}
                </h2>

                <p className="mt-1 text-xs text-slate-400 dark:text-neutral-500">
                    {t('rating.latest.description')}
                </p>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Empty State
            |--------------------------------------------------------------------------
            |
            */}

            {latestRatings.length === 0 ? (

                <div className="px-6 py-12 text-center">

                    <p className="text-sm text-slate-400 dark:text-neutral-500">
                        {t('rating.latest.empty')}
                    </p>

                </div>

            ) : (

                <div className="grid grid-cols-1 gap-4 p-6 md:grid-cols-2 xl:grid-cols-3">

                    {latestRatings.map((rating: any) => {

                        const ratingValue = Number(rating.rating) || 0

                        return (

                            <article
                                key={rating.id}
                                className={`rounded-xl border p-5 ${getRatingStyle(ratingValue)}`}
                            >

                                {/*
                                |--------------------------------------------------------------------------
                                | Customer Information
                                |--------------------------------------------------------------------------
                                |
                                */}

                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <h3 className="truncate text-sm font-bold text-slate-900 dark:text-white">
                                            {rating.customer?.label}
                                        </h3>

                                        <p className="mt-1 truncate text-xs text-slate-500 dark:text-neutral-400">
                                            {rating.branch?.label}
                                        </p>

                                    </div>

                                    {/*
                                    |--------------------------------------------------------------------------
                                    | Rating Stars
                                    |--------------------------------------------------------------------------
                                    |
                                    */}

                                    <div className="flex shrink-0 items-center gap-0.5">

                                        {Array.from({length: 5}).map((_, index) => (

                                            <Star
                                                key={index}
                                                size={14}
                                                className={
                                                    index < ratingValue
                                                        ? 'text-amber-400'
                                                        : 'text-slate-300 dark:text-neutral-700'
                                                }
                                                fill={
                                                    index < ratingValue
                                                        ? 'currentColor'
                                                        : 'none'
                                                }
                                            />

                                        ))}

                                    </div>

                                </div>

                                {/*
                                |--------------------------------------------------------------------------
                                | Comment
                                |--------------------------------------------------------------------------
                                |
                                */}

                                {rating.comment && (

                                    <p className="mt-4 line-clamp-3 text-sm italic leading-6 text-slate-600 dark:text-neutral-300">
                                        "{rating.comment}"
                                    </p>

                                )}

                                {/*
                                |--------------------------------------------------------------------------
                                | Order Information
                                |--------------------------------------------------------------------------
                                |
                                */}

                                <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-3 dark:border-neutral-800">

                                    <span className="text-xs font-medium text-slate-500 dark:text-neutral-400">
                                        #{rating.order?.number}
                                    </span>

                                    <span className="text-xs text-slate-400 dark:text-neutral-500">
                                        {formatDate(rating.created_at)}
                                    </span>

                                </div>

                            </article>

                        )
                    })}

                </div>

            )}

        </section>
    )
}