import React, {useEffect, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {RefreshCw} from 'lucide-react'
import {BranchRatingsChart, RatingSentimentChart, useTenantDashboard} from '@/features/dashboard'
import {
    StatsCards,
    AnalyticsChart,
    TopSalesBranchesChart,
    OrderStatusOverview,
} from '@/features/dashboard/ui'

/*
|--------------------------------------------------------------------------
| Page Component: Dashboard Layout
|--------------------------------------------------------------------------
|
| Main view page orchestrating all tenant dashboard data
| and delegating UI rendering to dedicated dashboard components.
|
*/

export default function DashboardPage() {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Local State
    |--------------------------------------------------------------------------
    */

    const {t} = useTranslation()
    const [isSyncing, setIsSyncing] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Tenant Dashboard
    |--------------------------------------------------------------------------
    */

    const {
        tenantDashboard,
        tenantOrders,
        topSalesBranches,
        branchRatings,
        ratingSentiment,

        loading,
        ordersLoading,
        topSalesBranchesLoading,
        branchRatingsLoading,
        ratingSentimentLoading,

        fetchDashboard,
        fetchOrders,
        fetchTopSalesBranches,
        fetchBranchRatings,
        fetchRatingSentiment,
    } = useTenantDashboard()

    /*
    |--------------------------------------------------------------------------
    | Initial Dashboard Data
    |--------------------------------------------------------------------------
    |
    | Fetch all dashboard data when the page is mounted.
    |
    */

    useEffect(() => {
        fetchDashboard()
        fetchOrders()
        fetchTopSalesBranches()
        fetchBranchRatings()
        fetchRatingSentiment()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Event Handlers
    |--------------------------------------------------------------------------
    */

    const handleSyncSalla = () => {
        setIsSyncing(true)

        Promise.all([
            new Promise<void>((resolve) => {
                fetchDashboard(() => resolve())
            }),

            new Promise<void>((resolve) => {
                fetchOrders(() => resolve())
            }),

            new Promise<void>((resolve) => {
                fetchTopSalesBranches(() => resolve())
            }),

            new Promise<void>((resolve) => {
                fetchBranchRatings(() => resolve())
            }),

            new Promise<void>((resolve) => {
                fetchRatingSentiment(() => resolve())
            }),
        ]).finally(() => {
            setIsSyncing(false)
        })
    }

    /*
    |--------------------------------------------------------------------------
    | Computed Values
    |--------------------------------------------------------------------------
    */

    const stats = tenantDashboard?.stats

    /*
    |--------------------------------------------------------------------------
    | Monthly Orders
    |--------------------------------------------------------------------------
    */

    const orders = tenantOrders?.orders || []

    /*
    |--------------------------------------------------------------------------
    | Top Sales Branches
    |--------------------------------------------------------------------------
    */

    const branches = topSalesBranches?.branches || []

    /*
    |--------------------------------------------------------------------------
    | Branch Ratings
    |--------------------------------------------------------------------------
    */

    const ratings = branchRatings?.branches || []

    /*
    |--------------------------------------------------------------------------
    | Rating Sentiment
    |--------------------------------------------------------------------------
    */

    const sentiment = ratingSentiment?.sentiment || null

    /*
    |--------------------------------------------------------------------------
    | Order Status Overview
    |--------------------------------------------------------------------------
    |
    | Build the dashboard status summary from today's order statistics.
    |
    */

    const orderStats = stats?.orders

    const orderStatuses = [
        {
            value: 'completed',
            name: t('dashboard.order_status.completed'),
            count: orderStats?.completed ?? 0,
        },

        {
            value: 'preparing',
            name: t('dashboard.order_status.preparing'),
            count:
                orderStats?.statuses?.find(
                    (status: any) => status.value === 'preparing'
                )?.count ?? 0,
        },

        {
            value: 'ready',
            name: t('dashboard.order_status.ready'),
            count: orderStats?.ready ?? 0,
        },

        {
            value: 'late',
            name: t('dashboard.order_status.late'),
            count: orderStats?.late ?? 0,
        },

        {
            value: 'new',
            name: t('dashboard.order_status.new'),
            count:
                orderStats?.statuses?.find(
                    (status: any) => status.value === 'new'
                )?.count ?? 0,
        },
    ]

    /*
    |--------------------------------------------------------------------------
    | Global Dashboard Loading
    |--------------------------------------------------------------------------
    */

    const dashboardLoading =
        loading ||
        ordersLoading ||
        topSalesBranchesLoading ||
        branchRatingsLoading ||
        ratingSentimentLoading

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <div className="p-6 lg:p-8 font-ar min-h-screen transition-colors duration-200">

            {/*
            |--------------------------------------------------------------------------
            | Page Header & Action Bar
            |--------------------------------------------------------------------------
            */}

            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-neutral-100">
                        {t('dashboard.title')}
                    </h1>

                    <p className="mt-1 text-sm text-slate-500 dark:text-neutral-400">
                        {t('dashboard.subtitle')}
                    </p>
                </div>

                {/*
                |--------------------------------------------------------------------------
                | Salla Integration Controls
                |--------------------------------------------------------------------------
                */}

                <div className="flex items-center gap-3">

                    <div
                        className="
                            flex items-center gap-2
                            rounded-2xl
                            bg-emerald-50 dark:bg-emerald-950/40
                            px-3.5 py-2
                            text-xs font-semibold
                            text-emerald-700 dark:text-emerald-400
                            border border-emerald-200/60
                            dark:border-emerald-800/40
                            backdrop-blur-md
                        "
                    >

                        <span className="relative flex h-2 w-2">

                            <span
                                className="
                                    animate-ping
                                    absolute
                                    inline-flex
                                    h-full
                                    w-full
                                    rounded-full
                                    bg-emerald-400
                                    opacity-75
                                "
                            />

                            <span
                                className="
                                    relative
                                    inline-flex
                                    rounded-full
                                    h-2 w-2
                                    bg-emerald-500
                                "
                            />

                        </span>

                        <span>
                            {t('dashboard.salla_connected')}
                        </span>

                    </div>

                    <button
                        type="button"
                        onClick={handleSyncSalla}
                        disabled={isSyncing || dashboardLoading}
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-2xl
                            bg-white/80 dark:bg-neutral-900/80
                            px-4 py-2.5
                            text-xs font-semibold
                            text-slate-700 dark:text-neutral-200
                            shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)]
                            border border-neutral-200/60
                            dark:border-neutral-800/60
                            hover:bg-slate-50
                            dark:hover:bg-neutral-800/60
                            backdrop-blur-md
                            active:scale-95
                            transition-all
                            disabled:opacity-50
                            cursor-pointer
                        "
                    >

                        <RefreshCw
                            className={`
                                h-4 w-4
                                text-indigo-600
                                dark:text-indigo-400
                                ${
                                isSyncing || dashboardLoading
                                    ? 'animate-spin'
                                    : ''
                            }
                            `}
                        />

                        <span>
                            {isSyncing || dashboardLoading
                                ? t('dashboard.syncing')
                                : t('dashboard.sync_salla')}
                        </span>

                    </button>

                </div>

            </div>

            {/*
            |--------------------------------------------------------------------------
            | 1. Top Key Metric Cards
            |--------------------------------------------------------------------------
            */}

            <StatsCards
                stats={stats}
                loading={loading}
            />

            {/*
            |--------------------------------------------------------------------------
            | 2. Dashboard Analytics Cards
            |--------------------------------------------------------------------------
            |
            | - Monthly order performance
            | - Top sales branches
            |
            */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                <AnalyticsChart
                    orders={orders}
                    loading={ordersLoading}
                />

                <TopSalesBranchesChart
                    branches={branches}
                    loading={topSalesBranchesLoading}
                />

            </div>

            {/*
            |--------------------------------------------------------------------------
            | 3. Order Status Overview
            |--------------------------------------------------------------------------
            */}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">

                <OrderStatusOverview statuses={orderStatuses} total={orderStats?.today ?? 0} loading={loading}/>

                <BranchRatingsChart ratings={ratings} loading={branchRatingsLoading}/>

                <RatingSentimentChart sentiment={sentiment} loading={ratingSentimentLoading}/>
            </div>

        </div>
    )
}