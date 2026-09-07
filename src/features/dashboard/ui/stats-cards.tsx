import React from 'react'
import {useTranslation} from 'react-i18next'
import {
    Users,
    MessageSquare,
    MessageSquareOff,
    Building2,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
|
*/

interface StatsCardsProps {
    stats: any
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Dashboard Stats Cards
|--------------------------------------------------------------------------
|
| Displays the main admin dashboard statistics:
| - Total users
| - Active messages
| - Hidden messages
| - Total departments
|
*/

export function StatsCards({stats, loading}: StatsCardsProps) {

    /*
    |--------------------------------------------------------------------------
    | Hooks & Translations
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    |
    | The dashboard API returns statistics under stats.
    |
    | messages.status contains:
    | - active
    | - inactive
    |
    */

    const users = stats?.stats?.users ?? 0

    const activeMessages =
        stats?.stats?.messages?.status?.active ?? 0

    const hiddenMessages =
        stats?.stats?.messages?.status?.inactive ?? 0

    const departments =
        stats?.stats?.departments ?? 0

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">

            {/* ---------------------------------------------------------------- */}
            {/* Users */}
            {/* ---------------------------------------------------------------- */}

            <div
                className="
                    relative overflow-hidden
                    rounded-3xl
                    border border-neutral-200/60
                    bg-white/80
                    p-6
                    shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                    backdrop-blur-md
                    transition-all
                    hover:shadow-md
                    dark:border-neutral-800/60
                    dark:bg-neutral-950/80
                    dark:hover:border-neutral-700/60
                "
            >

                <div className="flex items-center justify-between">

                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.users')}
                    </span>

                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-2xl
                            bg-violet-50
                            text-violet-600
                            dark:bg-violet-950/60
                            dark:text-violet-400
                            border border-violet-100/50
                            dark:border-violet-900/40
                        "
                    >
                        <Users className="h-6 w-6"/>
                    </div>

                </div>

                <div className="mt-4">

                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : users}
                    </h2>

                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.users_label')}
                </p>

            </div>


            {/* ---------------------------------------------------------------- */}
            {/* Active Messages */}
            {/* ---------------------------------------------------------------- */}

            <div
                className="
                    relative overflow-hidden
                    rounded-3xl
                    border border-emerald-200/50
                    bg-white/80
                    p-6
                    shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                    backdrop-blur-md
                    transition-all
                    hover:shadow-md
                    dark:border-emerald-900/40
                    dark:bg-neutral-950/80
                    dark:hover:border-emerald-700/60
                "
            >

                <div className="flex items-center justify-between">

                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                        {t('dashboard.stats.activeMessages')}
                    </span>

                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-2xl
                            bg-emerald-50
                            text-emerald-600
                            dark:bg-emerald-950/60
                            dark:text-emerald-400
                            border border-emerald-100/50
                            dark:border-emerald-900/40
                        "
                    >
                        <MessageSquare className="h-6 w-6"/>
                    </div>

                </div>

                <div className="mt-4">

                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : activeMessages}
                    </h2>

                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.active_messages_label')}
                </p>

            </div>


            {/* ---------------------------------------------------------------- */}
            {/* Hidden / Inactive Messages */}
            {/* ---------------------------------------------------------------- */}

            <div
                className="
                    relative overflow-hidden
                    rounded-3xl
                    border border-amber-200/50
                    bg-white/80
                    p-6
                    shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                    backdrop-blur-md
                    transition-all
                    hover:shadow-md
                    dark:border-amber-900/40
                    dark:bg-neutral-950/80
                    dark:hover:border-amber-700/60
                "
            >

                <div className="flex items-center justify-between">

                    <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                        {t('dashboard.stats.hiddenMessages')}
                    </span>

                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-2xl
                            bg-amber-50
                            text-amber-600
                            dark:bg-amber-950/60
                            dark:text-amber-400
                            border border-amber-100/50
                            dark:border-amber-900/40
                        "
                    >
                        <MessageSquareOff className="h-6 w-6"/>
                    </div>

                </div>

                <div className="mt-4">

                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : hiddenMessages}
                    </h2>

                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.hidden_messages_label')}
                </p>

            </div>


            {/* ---------------------------------------------------------------- */}
            {/* Departments */}
            {/* ---------------------------------------------------------------- */}

            <div
                className="
                    relative overflow-hidden
                    rounded-3xl
                    border border-blue-200/50
                    bg-white/80
                    p-6
                    shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                    backdrop-blur-md
                    transition-all
                    hover:shadow-md
                    dark:border-blue-900/40
                    dark:bg-neutral-950/80
                    dark:hover:border-blue-700/60
                "
            >

                <div className="flex items-center justify-between">

                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {t('dashboard.stats.departments')}
                    </span>

                    <div
                        className="
                            flex h-12 w-12 items-center justify-center
                            rounded-2xl
                            bg-blue-50
                            text-blue-600
                            dark:bg-blue-950/60
                            dark:text-blue-400
                            border border-blue-100/50
                            dark:border-blue-900/40
                        "
                    >
                        <Building2 className="h-6 w-6"/>
                    </div>

                </div>

                <div className="mt-4">

                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : departments}
                    </h2>

                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.departments_label')}
                </p>

            </div>

        </div>
    )
}