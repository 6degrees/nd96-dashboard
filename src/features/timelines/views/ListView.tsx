'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import CrudPage from '@/components/crud-page'
import { useRouter } from 'next/navigation'
/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
} from '@/features/timelines/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/timelines/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/

import RegionForm from '@/features/timelines/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/timelines/api'

import {RefreshCw} from 'lucide-react'

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
    const router = useRouter()
    const {list, loading, page, setPage, limit, setLimit, filters, setFilters, handleSearch,} = useCollections()

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
        (timeline: any) => ({
            key: timeline.id,
            ...timeline,
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
            title="timeline.title"
            columns={Columns}
            Form={RegionForm}
            api={api}
            filters={
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            }
            actions={({onCreate}) => [
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
                    disabled: loading,
                },
                {
                    label: 'timeline.create',
                    type: 'primary',
                    onClick: onCreate,
                },
            ]}
            onView={(record) => {
                router.push(`/dashboard/timelines/${record.id}`)
            }}
            dataSource={dataSource}
            loading={loading}
            page={page}
            limit={limit}
            total={list?.recordsFiltered || 0}
            setPage={setPage}
            setLimit={setLimit}
            onSearch={handleSearch}
            drawerWidth="30%"
        />
    )
}