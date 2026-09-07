import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { RefreshCw } from 'lucide-react'

import {
    DepartmentParticipationChart,
    TopDepartmentsChart,
    useDashboard,
    WeeklyMessagesChart
} from '@/features/dashboard'
import { StatsCards, MessageVisibilityChart,  } from '@/features/dashboard/ui'


/*
|--------------------------------------------------------------------------
| Page Component: Dashboard Layout
|--------------------------------------------------------------------------
|
| Main dashboard page responsible for fetching and displaying
| the main dashboard statistics.
|
*/

export default function DashboardPage() {

    /*
    |--------------------------------------------------------------------------
    | Hooks & Local State
    |--------------------------------------------------------------------------
    */

    const { t } = useTranslation()

    const [isSyncing, setIsSyncing] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    |
    | Fetch aggregated dashboard statistics.
    |
    */

    const {dashboard, loading, fetchDashboard} = useDashboard()

    /*
    |--------------------------------------------------------------------------
    | Initial Dashboard Data
    |--------------------------------------------------------------------------
    |
    | Fetch dashboard statistics when the page is mounted.
    |
    */

    useEffect(() => {
        fetchDashboard()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Refresh Dashboard
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {

        if (loading || isSyncing) {
            return
        }

        setIsSyncing(true)

        fetchDashboard(() => {
            setIsSyncing(false)
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="min-h-screen p-6 transition-colors duration-200 lg:p-8">

            {/*
            |--------------------------------------------------------------------------
            | Page Header
            |--------------------------------------------------------------------------
            */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                    <h1 className="text-2xl font-bold text-slate-900 dark:text-neutral-100 lg:text-3xl">
                        {t('dashboard.title')}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                        {t('dashboard.subtitle')}
                    </p>

                </div>

                {/*
                |--------------------------------------------------------------------------
                | Refresh Action
                |--------------------------------------------------------------------------
                */}

                <button
                    type="button"
                    onClick={handleRefresh}
                    disabled={loading || isSyncing}
                    className="
                        inline-flex
                        items-center
                        gap-2
                        self-start
                        rounded-2xl
                        border
                        border-neutral-200/70
                        bg-white
                        px-4
                        py-2.5
                        text-xs
                        font-semibold
                        text-slate-700
                        shadow-sm
                        transition-all
                        hover:bg-slate-50
                        active:scale-95
                        disabled:cursor-not-allowed
                        disabled:opacity-50
                        dark:border-neutral-800
                        dark:bg-neutral-900
                        dark:text-neutral-200
                        dark:hover:bg-neutral-800
                        sm:self-auto
                    "
                >

                    <RefreshCw
                        className={
                            loading || isSyncing
                                ? 'h-4 w-4 animate-spin'
                                : 'h-4 w-4'
                        }
                    />

                    <span>
                        {loading || isSyncing
                            ? t('common.refreshing')
                            : t('common.refresh')}
                    </span>

                </button>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | Main Statistics
            |--------------------------------------------------------------------------
            |
            | StatsCards receives the statistics returned by the API.
            | Weekly and department message statistics remain available
            | under stats.messages for future dashboard charts.
            |
            */}
            <StatsCards stats={dashboard} loading={loading}/>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <WeeklyMessagesChart weekly={dashboard?.stats?.messages?.weekly} loading={loading}/>

                <TopDepartmentsChart departments={dashboard?.stats?.messages?.departments ?? []} loading={loading}/>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                <DepartmentParticipationChart departments={dashboard?.stats?.messages?.departments ?? []} loading={loading}/>

                <MessageVisibilityChart status={dashboard?.stats?.messages?.status} loading={loading}/>
            </div>

        </div>
    )
}