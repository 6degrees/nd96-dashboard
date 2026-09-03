'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useMemo} from 'react'
import {useTranslation} from 'react-i18next'
import {
    CheckCircle2,
    Info,
    MapPin,
    Phone,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Utilities
|--------------------------------------------------------------------------
|
*/

import {
    buildLocationName,
    formatDate,
    getMapEmbedUrl,
} from '@/utils/helpers'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface BranchOverviewProps {
    branch: any
}

/*
|--------------------------------------------------------------------------
| Branch Overview
|--------------------------------------------------------------------------
|
| Displays the main branch overview information including:
| - General branch information
| - Contact information
| - Salla integration
| - Branch location
|
*/

export default function BranchOverview({branch,}: BranchOverviewProps) {

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t, i18n} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Branch Location
    |--------------------------------------------------------------------------
    |
    */

    const locationName = useMemo(
        () => buildLocationName(
            branch?.city?.label,
            branch?.region?.label,
            branch?.country?.label
        ),
        [
            branch?.city?.label,
            branch?.region?.label,
            branch?.country?.label,
        ]
    )

    /*
    |--------------------------------------------------------------------------
    | Map URL
    |--------------------------------------------------------------------------
    |
    */

    const mapEmbedUrl = useMemo(
        () => getMapEmbedUrl(
            branch?.address || locationName
        ),
        [
            branch?.address,
            locationName,
        ]
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="overflow-hidden">

            {/*------------------------------------------------------------------
            | General Information
            ------------------------------------------------------------------*/}

            <section className="p-6">

                <div className="mb-6 flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                        <Info size={20}/>
                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            {t('branch.generalInfo')}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                            {t('branch.generalInfoDescription')}
                        </p>

                    </div>

                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.name')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.name || '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.code')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.code || '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.status')}
                        </span>

                        <div className="mt-2 flex items-center gap-2">

                            <span
                                className={`h-2 w-2 rounded-full ${
                                    branch?.activated_at
                                        ? 'bg-emerald-500'
                                        : 'bg-slate-400'
                                }`}
                            />

                            <p className="font-semibold text-slate-800 dark:text-slate-100">
                                {branch?.activated_at
                                    ? t('common.active')
                                    : t('common.inactive')}
                            </p>

                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.country')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.country?.label || '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.region')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.region?.label || '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.city')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.city?.label || '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.activatedAt')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.activated_at
                                ? formatDate(
                                    branch.activated_at,
                                    true,
                                    i18n.language
                                )
                                : '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.createdAt')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.created_at
                                ? formatDate(
                                    branch.created_at,
                                    true,
                                    i18n.language
                                )
                                : '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.updatedAt')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.updated_at
                                ? formatDate(
                                    branch.updated_at,
                                    true,
                                    i18n.language
                                )
                                : '-'}
                        </p>
                    </div>

                    <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50 sm:col-span-2 lg:col-span-3">
                        <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                            {t('branch.inputs.address')}
                        </span>

                        <p className="mt-1.5 font-semibold text-slate-800 dark:text-slate-100">
                            {branch?.address || locationName || '-'}
                        </p>
                    </div>

                </div>

            </section>

            {/*------------------------------------------------------------------
            | Contact & Integration
            ------------------------------------------------------------------*/}

            <section className="border-t border-slate-100 p-6 dark:border-neutral-800">

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

                    {/*----------------------------------------------------------
                    | Contact Information
                    ----------------------------------------------------------*/}

                    <div>

                        <div className="mb-5 flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                                <Phone size={20}/>
                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {t('branch.contactTitle')}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                                    {t('branch.contactDescription')}
                                </p>

                            </div>

                        </div>

                        <div className="space-y-3">

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/50">

                                <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                    {t('branch.inputs.phone')}
                                </span>

                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {branch?.phone || '-'}
                                </span>

                            </div>

                            <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950/50">

                                <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                    {t('branch.inputs.email')}
                                </span>

                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                                    {branch?.email || '-'}
                                </span>

                            </div>

                        </div>

                    </div>

                    {/*----------------------------------------------------------
                    | Salla Integration
                    ----------------------------------------------------------*/}

                    <div className="border-t border-slate-100 pt-8 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0 dark:border-neutral-800">

                        <div className="mb-5 flex items-center gap-3">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                                <CheckCircle2 size={20}/>
                            </div>

                            <div>

                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {t('branch.integrationTitle')}
                                </h3>

                                <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                                    {t('branch.integrationDescription')}
                                </p>

                            </div>

                        </div>

                        <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950/50">

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-neutral-900">
                                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                                            S
                                        </span>
                                    </div>

                                    <div>

                                        <p className="font-semibold text-slate-900 dark:text-white">
                                            {t('branch.salla')}
                                        </p>

                                        <div className="mt-1.5 flex items-center gap-2">

                                            <span className="h-2 w-2 rounded-full bg-emerald-500"/>

                                            <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                                {t('branch.connected')}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="mt-4 flex items-center justify-between border-t border-slate-200/80 pt-3 dark:border-neutral-800">

                                <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                    {t('branch.lastUpdated')}
                                </span>

                                <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                                    {branch?.updated_at
                                        ? formatDate(
                                            branch.updated_at,
                                            true,
                                            i18n.language
                                        )
                                        : '-'}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </section>

            {/*------------------------------------------------------------------
            | Branch Location
            ------------------------------------------------------------------*/}

            <section className="border-t border-slate-100 p-6 dark:border-neutral-800">

                <div className="mb-5 flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                        <MapPin size={20}/>
                    </div>

                    <div>

                        <h3 className="font-semibold text-slate-900 dark:text-white">
                            {t('branch.mapTitle')}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                            {branch?.address || locationName}
                        </p>

                    </div>

                </div>

                <div className="h-[360px] overflow-hidden rounded-2xl border border-slate-200 dark:border-neutral-800">

                    <iframe
                        title={t('branch.mapTitle')}
                        src={mapEmbedUrl}
                        className="h-full w-full border-0"
                        loading="lazy"
                        allowFullScreen
                    />

                </div>

            </section>

        </div>
    )
}