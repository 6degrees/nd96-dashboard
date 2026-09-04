'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
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
} from '@/features/departments/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/departments/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/

import RegionForm from '@/features/departments/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/departments/api'

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
        (Department: any) => ({
            key: Department.id,
            ...Department,
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
            title="department.title"
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
                    label: 'department.create',
                    type: 'primary',
                    onClick: onCreate,
                },
            ]}
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