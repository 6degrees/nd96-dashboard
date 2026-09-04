'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect} from 'react'
import {Card, Spin} from 'antd'
import {CalendarDays} from 'lucide-react'
import {useParams} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '../api'

/*
|--------------------------------------------------------------------------
| Milestones
|--------------------------------------------------------------------------
|
*/

import { CrudView } from '@/features/milestones'

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
|
*/

export default function Page() {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch()
    const params = useParams()
    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const {current, loading} = useSelector(
        (state: any) => state.timeline
    )

    /*
    |--------------------------------------------------------------------------
    | Timeline Data
    |--------------------------------------------------------------------------
    |
    | The API response is returned inside current.data.
    |
    */

    const timeline = current?.data

    /*
    |--------------------------------------------------------------------------
    | Fetch Timeline
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {

        if (!params?.id) return

        dispatch(
            api.detail(params.id as string) as any
        )

    }, [params?.id, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    |
    */

    if (loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-green/10">
                        <Spin size="small"/>
                    </div>

                    <span className="text-sm font-medium text-text-secondary">
                        {t('common.loading')}
                    </span>
                </div>
            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Empty State
    |--------------------------------------------------------------------------
    |
    */

    if (!timeline) {
        return (
            <Card className="rounded-2xl border-border-default shadow-none">
                <div className="py-10 text-center text-sm text-text-secondary">
                    {t('common.notAvailable')}
                </div>
            </Card>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="space-y-6">

            {/* ---------------------------------------------------------------- */}
            {/* Timeline Information */}
            {/* ---------------------------------------------------------------- */}

            <Card
                className="overflow-hidden rounded-2xl border-border-default shadow-none"
                styles={{
                    body: {
                        padding: 0,
                    },
                }}
            >

                {/* ------------------------------------------------------------ */}
                {/* Header */}
                {/* ------------------------------------------------------------ */}

                <div className="border-b border-border-default px-6 py-6">

                    <div className="flex items-start justify-between gap-6">

                        {/* Timeline Identity */}

                        <div className="flex min-w-0 items-center gap-4">

                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-green/10 text-brand-green">
                                <CalendarDays
                                    size={26}
                                    strokeWidth={2}
                                />
                            </div>

                            <div className="min-w-0">

                                <h1 className="m-0 truncate text-2xl font-bold text-text-primary">
                                    {timeline.name_ar}
                                </h1>

                                {timeline.name_en && (
                                    <p className="mt-1 truncate text-sm font-medium text-text-secondary">
                                        {timeline.name_en}
                                    </p>
                                )}

                            </div>

                        </div>

                        {/* Status */}

                        <span
                            className={`shrink-0 rounded-full border px-5 py-2 text-sm font-semibold ${
                                timeline.is_active
                                    ? 'border-brand-green/25 bg-brand-green/10 text-brand-green'
                                    : 'border-red-200 bg-red-50 text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400'
                            }`}
                        >
                            {timeline.is_active
                                ? t('common.active')
                                : t('common.inactive')}
                        </span>

                    </div>

                </div>

                {/* ------------------------------------------------------------ */}
                {/* Timeline Details */}
                {/* ------------------------------------------------------------ */}

                <div className="space-y-4 p-6">

                    {/* Row 1 - Names */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Arabic Name */}

                        <div className="group rounded-2xl border border-border-default bg-surface-muted px-5 py-4 transition-colors hover:border-brand-green/20">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.name_ar')}
                            </p>

                            <p className="m-0 text-base font-bold text-text-primary">
                                {timeline.name_ar || '-'}
                            </p>

                        </div>

                        {/* English Name */}

                        <div className="group rounded-2xl border border-border-default bg-surface-muted px-5 py-4 transition-colors hover:border-brand-green/20">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.name_en')}
                            </p>

                            <p className="m-0 text-base font-bold text-text-primary">
                                {timeline.name_en || '-'}
                            </p>

                        </div>

                    </div>

                    {/* Row 2 - Years */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Start Year */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.startYear')}
                            </p>

                            <p className="m-0 text-xl font-bold text-text-primary">
                                {timeline.start_year ?? '-'}
                            </p>

                        </div>

                        {/* End Year */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.endYear')}
                            </p>

                            <p className="m-0 text-xl font-bold text-text-primary">
                                {timeline.end_year ?? '-'}
                            </p>

                        </div>

                    </div>

                    {/* Row 3 - Dates */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Created At */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.createdAt')}
                            </p>

                            <p className="m-0 text-base font-semibold text-text-primary">
                                {timeline.created_at || '-'}
                            </p>

                        </div>

                        {/* Updated At */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.updatedAt')}
                            </p>

                            <p className="m-0 text-base font-semibold text-text-primary">
                                {timeline.updated_at || '-'}
                            </p>

                        </div>

                    </div>

                    {/* Row 4 - Activation & Sort */}

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Activated At */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.activatedAt')}
                            </p>

                            <p className="m-0 text-base font-semibold text-text-primary">
                                {timeline.activated_at || '-'}
                            </p>

                        </div>

                        {/* Sort Order */}

                        <div className="rounded-2xl border border-border-default bg-surface-muted px-5 py-4">

                            <p className="mb-2 text-sm font-medium text-text-secondary">
                                {t('timeline.inputs.sortOrder')}
                            </p>

                            <p className="m-0 text-base font-semibold text-text-primary">
                                {timeline.sort_order ?? '-'}
                            </p>

                        </div>

                    </div>

                </div>

            </Card>

            {/* ---------------------------------------------------------------- */}
            {/* Milestones */}
            {/* ---------------------------------------------------------------- */}
            {/*
            |
            | Milestones are displayed below the timeline details.
            | The existing milestones CRUD is reused here.
            |
            */}

            <CrudView id={timeline.id} />

        </div>
    )
}