'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import CrudPage from '@/components/crud-page'
import {useRouter} from 'next/navigation'
import {RefreshCw} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
} from '@/features/customers/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/customers/hooks'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/customers/api'

/*
|--------------------------------------------------------------------------
| View Page
|--------------------------------------------------------------------------
|
*/

export default function Page() {

    /*
    |--------------------------------------------------------------------------
    | Collections Hook
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

    const router = useRouter()

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
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource = list?.data?.map(
        (customer: any) => ({
            key: customer.id,
            ...customer,
        }),
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <CrudPage
            title="customer.title"
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
                            className={loading ? 'animate-spin' : ''}
                        />
                    ),
                    onClick: handleRefresh,
                    disabled: loading,
                },
            ]}
            filters={
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            }
            onView={(record) =>
                router.push(
                    `/dashboard/customers/${record.id}`,
                )
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