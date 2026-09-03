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

export default function NotificationStats({notifications, loading, t,}: NotificationStatsProps) {
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
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {/* ---------------------------------------------------------------- */}
            {/* Total Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative overflow-hidden rounded-2xl border border-blue-200/70 bg-white p-5 transition-colors duration-300 hover:border-blue-300 dark:border-blue-900/50 dark:bg-neutral-950 dark:hover:border-blue-800">

                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-blue-500/5 blur-2xl"/>

                <div className="relative flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {t('notification.stats.total')}
                        </p>

                        {loading ? (
                            <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"/>
                        ) : (
                            <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {total}
                            </p>
                        )}

                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            {t('notification.stats.totalDescription')}
                        </p>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">

                        <Bell className="size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Sent Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative overflow-hidden rounded-2xl border border-emerald-200/70 bg-white p-5 transition-colors duration-300 hover:border-emerald-300 dark:border-emerald-900/50 dark:bg-neutral-950 dark:hover:border-emerald-800">

                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/5 blur-2xl"/>

                <div className="relative flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {t('notification.stats.sent')}
                        </p>

                        {loading ? (
                            <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"/>
                        ) : (
                            <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {sent}
                            </p>
                        )}

                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            {t('notification.stats.sentDescription')}
                        </p>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">

                        <CheckCircle2 className="size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Pending Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative overflow-hidden rounded-2xl border border-amber-200/70 bg-white p-5 transition-colors duration-300 hover:border-amber-300 dark:border-amber-900/50 dark:bg-neutral-950 dark:hover:border-amber-800">

                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-amber-500/5 blur-2xl"/>

                <div className="relative flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {t('notification.stats.pending')}
                        </p>

                        {loading ? (
                            <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"/>
                        ) : (
                            <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {pending}
                            </p>
                        )}

                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            {t('notification.stats.pendingDescription')}
                        </p>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">

                        <Clock3 className="size-6"/>

                    </div>

                </div>

            </div>

            {/* ---------------------------------------------------------------- */}
            {/* Failed Notifications */}
            {/* ---------------------------------------------------------------- */}

            <div className="group relative overflow-hidden rounded-2xl border border-red-200/70 bg-white p-5 transition-colors duration-300 hover:border-red-300 dark:border-red-900/50 dark:bg-neutral-950 dark:hover:border-red-800">

                <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-red-500/5 blur-2xl"/>

                <div className="relative flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
                            {t('notification.stats.failed')}
                        </p>

                        {loading ? (
                            <div className="mt-2 h-8 w-16 animate-pulse rounded-lg bg-neutral-100 dark:bg-neutral-800"/>
                        ) : (
                            <p className="mt-1 text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">
                                {failed}
                            </p>
                        )}

                        <p className="mt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
                            {t('notification.stats.failedDescription')}
                        </p>

                    </div>

                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400">

                        <XCircle className="size-6"/>

                    </div>

                </div>

            </div>

        </div>
    )
}