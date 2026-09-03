'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {RefreshCw} from 'lucide-react'
import {useTranslation} from 'react-i18next'

import CrudPage from '@/components/crud-page'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
    NotificationStats,
} from '@/features/notifications/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/notifications/hooks'
import {useTenantDashboard} from '@/features/dashboard'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/notifications/api'

/*
|--------------------------------------------------------------------------
| View Page
|--------------------------------------------------------------------------
|
*/

export default function Page() {

    /*
    |--------------------------------------------------------------------------
    | Redux
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch<any>()

    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    */

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Collections
    |--------------------------------------------------------------------------
    |
    */

    const {
        list,
        loading,
        page,
        setPage,
        limit,
        setLimit,
        filters,
        setFilters,
        handleSearch,
    } = useCollections()

    /*
    |--------------------------------------------------------------------------
    | Dashboard
    |--------------------------------------------------------------------------
    |
    */

    const {
        tenantDashboard,
        loading: dashboardLoading,
        fetchDashboard,
    } = useTenantDashboard()

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource = list?.data?.map(
        (notification: any) => ({
            key: notification.id,
            ...notification,
        }),
    )

    /*
    |--------------------------------------------------------------------------
    | Auto Mark Notifications As Read
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {
        dispatch(api.markAsRead() as any)
    }, [dispatch])

    /*
    |--------------------------------------------------------------------------
    | Fetch Dashboard
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {
        fetchDashboard()
    }, [])

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
    | Notification Statistics
    |--------------------------------------------------------------------------
    |
    */

    const notifications =
        tenantDashboard?.stats?.notifications ?? []

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <CrudPage
            title="notification.title"
            Form={null}
            columns={Columns}
            api={api}
            actions={() => [
                {
                    label: loading
                        ? 'common.refreshing'
                        : 'common.refresh',
                    type: 'default',
                    icon: (
                        <RefreshCw
                            size={15}
                            className={
                                loading
                                    ? 'animate-spin'
                                    : ''
                            }
                        />
                    ),
                    onClick: handleRefresh,
                },
            ]}
            headerContent={
                <NotificationStats notifications={notifications} loading={dashboardLoading} t={t}/>
            }
            filters={
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
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