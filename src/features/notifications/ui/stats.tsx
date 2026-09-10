'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import {
    Bell,
    CheckCircle2,
    Clock3,
    XCircle,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/

interface NotificationStatsProps {
    notifications: any[]
    loading: boolean
    t: (key: string) => string
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/

export default function NotificationStats({
                                              notifications,
                                              loading,
                                              t,
                                          }: NotificationStatsProps) {

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    |
    */

    const pending = notifications?.find(
        (item: any) => item.value === 'pending',
    )?.count ?? 0

    const sent = notifications?.find(
        (item: any) => item.value === 'sent',
    )?.count ?? 0

    const failed = notifications?.find(
        (item: any) => item.value === 'failed',
    )?.count ?? 0

    const total = sent + pending + failed

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="grid w-full min-w-0 grid-cols-2 gap-2.5 sm:gap-4 lg:grid-cols-4">

            {/* ---------------------------------------------------------------- */}
            {/* Total Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative min-w-0 overflow-hidden rounded-xl border border-blue-200/70 bg-white p-3 transition-colors duration-300 hover:border-blue-300 dark:border-blue-900/50 dark:bg-neutral-950 dark:hover:border-blue-800 sm:rounded-2xl sm:p-5">

                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blue-500/5 blur-2xl sm:-right-8 sm:-top-8 sm:h-24 sm:w-24"/>

                <div className="relative flex min-w-0 items-center justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-[10px] font-medium leading-5 text-neutral-500 dark:text-neutral-400 sm:text-xs">
                            {t('notification.stats.total')}
                        </p>

                        {loading ? (
                            <div className="mt-1 h-6 w-12 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800 sm:mt-2 sm:h-8 sm:w-16 sm:rounded-lg"/>
                        ) : (
                            <p className="mt-0.5 text-lg font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:mt-1 sm:text-2xl">
                                {total.toLocaleString()}
                            </p>
                        )}

                        <p className="mt-1 hidden truncate text-[10px] leading-4 text-neutral-400 dark:text-neutral-500 sm:block sm:text-[11px]">
                            {t('notification.stats.totalDescription')}
                        </p>

                    </div>

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400 sm:size-12 sm:rounded-2xl">

                        <Bell className="size-4 sm:size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Sent Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative min-w-0 overflow-hidden rounded-xl border border-emerald-200/70 bg-white p-3 transition-colors duration-300 hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-neutral-950 dark:hover:border-emerald-800 sm:rounded-2xl sm:p-5">

                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-emerald-500/5 blur-2xl sm:-right-8 sm:-top-8 sm:h-24 sm:w-24"/>

                <div className="relative flex min-w-0 items-center justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-[10px] font-medium leading-5 text-neutral-500 dark:text-neutral-400 sm:text-xs">
                            {t('notification.stats.sent')}
                        </p>

                        {loading ? (
                            <div className="mt-1 h-6 w-12 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800 sm:mt-2 sm:h-8 sm:w-16 sm:rounded-lg"/>
                        ) : (
                            <p className="mt-0.5 text-lg font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:mt-1 sm:text-2xl">
                                {sent.toLocaleString()}
                            </p>
                        )}

                        <p className="mt-1 hidden truncate text-[10px] leading-4 text-neutral-400 dark:text-neutral-500 sm:block sm:text-[11px]">
                            {t('notification.stats.sentDescription')}
                        </p>

                    </div>

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400 sm:size-12 sm:rounded-2xl">

                        <CheckCircle2 className="size-4 sm:size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Pending Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative min-w-0 overflow-hidden rounded-xl border border-amber-200/70 bg-white p-3 transition-colors duration-300 hover:border-amber-300 dark:border-amber-900/50 dark:bg-neutral-950 dark:hover:border-amber-800 sm:rounded-2xl sm:p-5">

                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-amber-500/5 blur-2xl sm:-right-8 sm:-top-8 sm:h-24 sm:w-24"/>

                <div className="relative flex min-w-0 items-center justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-[10px] font-medium leading-5 text-neutral-500 dark:text-neutral-400 sm:text-xs">
                            {t('notification.stats.pending')}
                        </p>

                        {loading ? (
                            <div className="mt-1 h-6 w-12 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800 sm:mt-2 sm:h-8 sm:w-16 sm:rounded-lg"/>
                        ) : (
                            <p className="mt-0.5 text-lg font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:mt-1 sm:text-2xl">
                                {pending.toLocaleString()}
                            </p>
                        )}

                        <p className="mt-1 hidden truncate text-[10px] leading-4 text-neutral-400 dark:text-neutral-500 sm:block sm:text-[11px]">
                            {t('notification.stats.pendingDescription')}
                        </p>

                    </div>

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400 sm:size-12 sm:rounded-2xl">

                        <Clock3 className="size-4 sm:size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Failed Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative min-w-0 overflow-hidden rounded-xl border border-red-200/70 bg-white p-3 transition-colors duration-300 hover:border-red-300 dark:border-red-900/50 dark:bg-neutral-950 dark:hover:border-red-800 sm:rounded-2xl sm:p-5">

                <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-red-500/5 blur-2xl sm:-right-8 sm:-top-8 sm:h-24 sm:w-24"/>

                <div className="relative flex min-w-0 items-center justify-between gap-2 sm:gap-4">

                    <div className="min-w-0 flex-1">

                        <p className="truncate text-[10px] font-medium leading-5 text-neutral-500 dark:text-neutral-400 sm:text-xs">
                            {t('notification.stats.failed')}
                        </p>

                        {loading ? (
                            <div className="mt-1 h-6 w-12 animate-pulse rounded-md bg-neutral-100 dark:bg-neutral-800 sm:mt-2 sm:h-8 sm:w-16 sm:rounded-lg"/>
                        ) : (
                            <p className="mt-0.5 text-lg font-bold leading-tight tracking-tight text-neutral-900 dark:text-white sm:mt-1 sm:text-2xl">
                                {failed.toLocaleString()}
                            </p>
                        )}

                        <p className="mt-1 hidden truncate text-[10px] leading-4 text-neutral-400 dark:text-neutral-500 sm:block sm:text-[11px]">
                            {t('notification.stats.failedDescription')}
                        </p>

                    </div>

                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg border border-red-100 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400 sm:size-12 sm:rounded-2xl">

                        <XCircle className="size-4 sm:size-6"/>

                    </div>

                </div>

            </div>

        </div>
    )
}