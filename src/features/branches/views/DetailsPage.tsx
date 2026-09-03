'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect, useState} from 'react'
import {useParams, useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {useTranslation} from 'react-i18next'

import {
    ArrowLeft,
    ShoppingBag,
    CircleDollarSign,
    Star,
    CheckCircle2,
    AlertTriangle,
    Clock3,
    CalendarCheck,
    CalendarPlus,
    LayoutDashboard,
    ReceiptText,
    UserRoundCheck,
    RefreshCw,
} from 'lucide-react'

import {Tabs} from 'antd'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '../api'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import PageActions from '@/components/page-action'
import {StatCard} from '@/components/stats'

/*
|--------------------------------------------------------------------------
| Actions & Tabs
|--------------------------------------------------------------------------
|
*/

import {switchBranchAction} from '@/redux/auth/actionCreator'

import {
    OrderTab,
    OverviewTab,
    StaffTab,
} from '@/features/branches/tabs'

/*
|--------------------------------------------------------------------------
| Main Page Component
|--------------------------------------------------------------------------
|
*/

export default function DetailsPage() {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch()
    const router = useRouter()
    const params = useParams()

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Local State
    |--------------------------------------------------------------------------
    |
    */

    const [initialized, setInitialized] = useState(false)
    const [refreshing, setRefreshing] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const branch = useSelector(
        (state: any) => state.branch?.current?.data,
    )

    const loading = useSelector(
        (state: any) => state.branch?.loading ?? true,
    )

    const error = useSelector(
        (state: any) => state.branch?.error,
    )

    /*
    |--------------------------------------------------------------------------
    | Fetch Branch
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {

        if (!params?.id) return

        const branchId = params.id as string

        dispatch<any>(
            switchBranchAction(branchId),
        )

        dispatch(
            api.detail(branchId) as any,
        ).finally(() => {
            setInitialized(true)
        })

    }, [params?.id, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = async () => {

        if (!params?.id || refreshing) return

        const branchId = params.id as string

        setRefreshing(true)

        try {

            await dispatch(
                api.detail(branchId) as any,
            )

        } finally {

            setRefreshing(false)

        }
    }

    /*
    |--------------------------------------------------------------------------
    | Error State
    |--------------------------------------------------------------------------
    |
    */

    if (initialized && (!branch || error)) {

        router.replace('/404')

        return null
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="min-h-screen bg-white p-4 font-sans text-slate-800 transition-colors duration-300 dark:bg-neutral-950 dark:text-slate-100 sm:p-8">

            <div className="space-y-6">

                {/* ---------------------------------------------------------------- */}
                {/* Page Header */}
                {/* ---------------------------------------------------------------- */}

                <PageActions
                    title={branch?.name || t('branch.title')}
                    actions={[
                        {
                            label: refreshing
                                ? 'common.refreshing'
                                : 'common.refresh',
                            icon: (
                                <RefreshCw size={18} className={refreshing ? 'animate-spin' : ''}/>
                            ),
                            type: 'default',
                            onClick: handleRefresh,
                        },
                        {
                            label: 'common.back',
                            icon: <ArrowLeft size={18}/>,
                            type: 'default',
                            onClick: () => router.back(),
                        },
                    ]}
                />

                {/* ---------------------------------------------------------------- */}
                {/* Page Content */}
                {/* ---------------------------------------------------------------- */}

                {!initialized || loading ? (

                    <div className="space-y-6">

                        {/* Statistics Skeleton */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            {Array.from({length: 8}).map((_, index) => (

                                <div key={index} className="animate-pulse rounded-2xl border border-slate-200/60 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-start justify-between">

                                        <div className="space-y-4">

                                            <div className="h-4 w-24 rounded-md bg-slate-200 dark:bg-neutral-800"/>

                                            <div className="h-8 w-20 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                                        </div>

                                        <div className="h-11 w-11 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                                    </div>

                                    <div className="mt-5 border-t border-slate-100 pt-3 dark:border-neutral-800">

                                        <div className="h-3 w-32 rounded-md bg-slate-100 dark:bg-neutral-800"/>

                                    </div>

                                </div>

                            ))}

                        </div>

                        {/* Tabs Skeleton */}

                        <div className="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">

                            <div className="flex items-center gap-8 border-b border-slate-100 px-6 dark:border-neutral-800">

                                <div className="flex items-center gap-2 py-4">

                                    <div className="h-4 w-4 rounded bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                                <div className="flex items-center gap-2 py-4">

                                    <div className="h-4 w-4 rounded bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="h-4 w-16 rounded-md bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                                <div className="flex items-center gap-2 py-4">

                                    <div className="h-4 w-4 rounded bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="h-4 w-20 rounded-md bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                            </div>

                            <div className="space-y-6 p-6">

                                <div className="flex items-center gap-3">

                                    <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="space-y-2">

                                        <div className="h-4 w-32 rounded-md bg-slate-200 dark:bg-neutral-800"/>

                                        <div className="h-3 w-56 rounded-md bg-slate-100 dark:bg-neutral-800"/>

                                    </div>

                                </div>

                                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

                                    {Array.from({length: 9}).map((_, index) => (

                                        <div key={index} className="h-20 rounded-xl border border-slate-100 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950">

                                            <div className="space-y-3 p-4">

                                                <div className="h-3 w-20 rounded bg-slate-200 dark:bg-neutral-800"/>

                                                <div className="h-4 w-32 rounded bg-slate-200 dark:bg-neutral-800"/>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                                <div className="border-t border-slate-100 pt-6 dark:border-neutral-800">

                                    <div className="mb-5 flex items-center gap-3">

                                        <div className="h-10 w-10 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                                        <div className="space-y-2">

                                            <div className="h-4 w-28 rounded bg-slate-200 dark:bg-neutral-800"/>

                                            <div className="h-3 w-48 rounded bg-slate-100 dark:bg-neutral-800"/>

                                        </div>

                                    </div>

                                    <div className="h-[360px] rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                                </div>

                            </div>

                        </div>

                    </div>

                ) : (

                    <>

                        {/* ---------------------------------------------------------------- */}
                        {/* Statistics */}
                        {/* ---------------------------------------------------------------- */}

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

                            <StatCard
                                value={Number(branch.orders_count || 0)}
                                icon={<ShoppingBag size={21}/>}
                                title={t('branch.stats.orders')}
                                subtitle={t('branch.stats.totalOrders')}
                                iconBackground="bg-blue-50 dark:bg-blue-500/10"
                                iconColor="text-blue-600 dark:text-blue-400"
                            />

                            <StatCard
                                value={`${Number(branch.sales || 0).toLocaleString()} ${t('branch.stats.currency')}`}
                                icon={<CircleDollarSign size={21}/>}
                                title={t('branch.stats.sales')}
                                subtitle={t('branch.stats.totalSales')}
                                iconBackground="bg-emerald-50 dark:bg-emerald-500/10"
                                iconColor="text-emerald-600 dark:text-emerald-400"
                            />

                            <StatCard
                                value={Number(branch.average_rating || 0).toFixed(1)}
                                icon={<Star size={21} className="fill-current"/>}
                                title={t('branch.stats.rating')}
                                subtitle={t('branch.stats.averageRating')}
                                iconBackground="bg-amber-50 dark:bg-amber-500/10"
                                iconColor="text-amber-500 dark:text-amber-400"
                            />

                            <StatCard
                                value={Number(branch.delivered_orders_count || 0)}
                                icon={<CheckCircle2 size={21}/>}
                                title={t('branch.stats.deliveredOrders')}
                                subtitle={t('branch.stats.totalDeliveredOrders')}
                                iconBackground="bg-violet-50 dark:bg-violet-500/10"
                                iconColor="text-violet-600 dark:text-violet-400"
                            />

                            <StatCard
                                value={Number(branch.late_orders || 0)}
                                icon={<AlertTriangle size={21}/>}
                                title={t('branch.stats.lateOrders')}
                                subtitle={Number(branch.late_orders || 0) > 0 ? t('branch.stats.delayed') : t('branch.stats.noDelays')}
                                iconBackground="bg-red-50 dark:bg-red-500/10"
                                iconColor="text-red-600 dark:text-red-400"
                            />

                            <StatCard
                                value={branch.preparation_time_range ? `${branch.preparation_time_range.from?.value || 0} - ${branch.preparation_time_range.to?.value || 0} ${t('branch.stats.days')}` : '-'}
                                icon={<Clock3 size={21}/>}
                                title={t('branch.stats.preparationTime')}
                                subtitle={t('branch.stats.averagePreparationTime')}
                                iconBackground="bg-cyan-50 dark:bg-cyan-500/10"
                                iconColor="text-cyan-600 dark:text-cyan-400"
                            />

                            <StatCard
                                value={branch.activated_at ? new Date(branch.activated_at).toLocaleDateString() : '-'}
                                icon={<CalendarCheck size={21}/>}
                                title={t('branch.stats.activationDate')}
                                subtitle={t('branch.stats.branchActivationDate')}
                                iconBackground="bg-indigo-50 dark:bg-indigo-500/10"
                                iconColor="text-indigo-600 dark:text-indigo-400"
                            />

                            <StatCard
                                value={branch.created_at ? new Date(branch.created_at).toLocaleDateString() : '-'}
                                icon={<CalendarPlus size={21}/>}
                                title={t('branch.stats.creationDate')}
                                subtitle={t('branch.stats.branchCreationDate')}
                                iconBackground="bg-slate-100 dark:bg-neutral-800"
                                iconColor="text-slate-600 dark:text-neutral-300"
                            />

                        </div>

                        {/* ---------------------------------------------------------------- */}
                        {/* Tabs */}
                        {/* ---------------------------------------------------------------- */}

                        <Tabs
                            items={[
                                {
                                    key: 'overview',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <LayoutDashboard size={18}/>
                                            {t('branch.tabs.overview')}
                                        </span>
                                    ),
                                    children: <OverviewTab branch={branch}/>,
                                },
                                {
                                    key: 'orders',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <ReceiptText size={18}/>
                                            {t('branch.tabs.orders')}
                                        </span>
                                    ),
                                    children: <OrderTab branchId={branch.id}/>,
                                },
                                {
                                    key: 'staff',
                                    label: (
                                        <span className="flex items-center gap-2">
                                            <UserRoundCheck size={18}/>
                                            {t('branch.tabs.staff')}
                                        </span>
                                    ),
                                    children: <StaffTab/>,
                                },
                            ]}
                        />

                    </>

                )}

            </div>

        </div>
    )
}