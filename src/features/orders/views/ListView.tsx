'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect} from 'react'
import CrudPage from '@/components/crud-page'
import {useRouter} from 'next/navigation'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
    OrderStats,
} from '@/features/orders/ui'

/*
|--------------------------------------------------------------------------
| Dashboard
|--------------------------------------------------------------------------
|
*/

import {useTenantDashboard} from '@/features/dashboard'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/orders/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/

import OrderForm from '@/features/orders/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/orders/api'
import {RefreshCw} from "lucide-react";

/*
|--------------------------------------------------------------------------
| Props
|--------------------------------------------------------------------------
|
*/

interface OrdersPageProps {
    branchId?: string
    className?: string
    showFilters?: boolean
    showHeaderContent?: boolean
}

/*
|--------------------------------------------------------------------------
| View Page
|--------------------------------------------------------------------------
|
*/

export default function Page({branchId, className = 'p-8 min-h-screen', showFilters = true, showHeaderContent = true,}: OrdersPageProps) {
    /*
    |--------------------------------------------------------------------------
    | Router
    |--------------------------------------------------------------------------
    |
    */

    const router = useRouter()

    /*
    |--------------------------------------------------------------------------
    | Orders Collection
    |--------------------------------------------------------------------------
    |
    */
    const {list, loading, page, setPage, limit, setLimit, filters, setFilters, handleSearch} = useCollections(branchId)

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    |
    */

    const {tenantDashboard, loading: dashboardLoading, fetchDashboard,} = useTenantDashboard()

    /*
    |--------------------------------------------------------------------------
    | Fetch Dashboard Statistics
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {
        fetchDashboard()
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource = list?.data?.map(
        (order: any) => ({
            key: order.id,
            ...order,
        }),
    )

    /*
    |--------------------------------------------------------------------------
    | Order Statistics
    |--------------------------------------------------------------------------
    |
    */

    const orderStats =
        tenantDashboard?.stats?.orders

    /*
    |--------------------------------------------------------------------------
    | Status Statistics
    |--------------------------------------------------------------------------
    |
    */

    const newOrders = orderStats?.statuses?.find((status: any) => status.value === 'new',)?.count ?? 0
    const preparing = orderStats?.statuses?.find((status: any) => status.value === 'preparing',)?.count ?? 0

    /*
    |--------------------------------------------------------------------------
    | Stats
    |--------------------------------------------------------------------------
    |
    */

    const stats = {
        total: orderStats?.today ?? 0,
        newOrders,
        preparing,
        ready: orderStats?.ready ?? 0,
        delivered: orderStats?.completed ?? 0,
        late: orderStats?.late ?? 0,
    }

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = () => {
        handleSearch()
        fetchDashboard()
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <CrudPage
            title="order.title"
            className={className}
            columns={Columns}
            Form={OrderForm}
            actions={({}) => [
                {
                    label: dashboardLoading ? 'common.refreshing' : 'common.refresh',
                    type: 'default',
                    icon: (<RefreshCw size={15} className={dashboardLoading ? 'animate-spin' : ''}/>),
                    onClick: handleRefresh,
                    disabled: dashboardLoading,
                },
            ]}
            api={api}
            filters={showFilters ? (<Filters filters={filters} setFilters={setFilters}/>) : undefined}
            onView={(record) => router.push(`/dashboard/orders/${record.id}`,)}
            headerContent={
                showHeaderContent
                    ? (
                        <OrderStats
                            total={stats.total}
                            newOrders={stats.newOrders}
                            preparing={stats.preparing}
                            ready={stats.ready}
                            delivered={stats.delivered}
                            late={stats.late}
                            loading={dashboardLoading}
                        />
                    )
                    : undefined
            }
            dataSource={dataSource}
            loading={loading}
            page={page}
            limit={limit}
            total={list?.meta?.total || 0}
            setPage={setPage}
            setLimit={setLimit}
            onSearch={handleSearch}
            drawerWidth="80%"
        />
    )
}