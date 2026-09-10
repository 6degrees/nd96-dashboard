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

import CrudPage from '@/components/crud-page'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {Filters, Columns} from '@/features/notifications/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/notifications/hooks'

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
    | Collections
    |--------------------------------------------------------------------------
    |
    */

    const {list, loading, page, setPage, limit, setLimit, filters, setFilters, handleSearch} = useCollections()

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
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = () => {
        handleSearch()
    }

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