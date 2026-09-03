'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React from 'react'
import CrudPage from '@/components/crud-page'
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
} from '@/features/users/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/users/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/

import CompanyForm from '@/features/users/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/users/api'

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
        (user: any) => ({
            key: user.id,
            ...user,
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
            title="user.title"
            columns={Columns}
            Form={CompanyForm}
            actions={({onCreate}) => [
                {
                    label: loading ? 'common.refreshing' : 'common.refresh',
                    type: 'default',
                    icon: (
                        <RefreshCw size={15} className={loading ? 'animate-spin' : ''}/>
                    ),
                    onClick: handleRefresh,
                    disabled: loading,
                },
                {
                    label: 'user.create',
                    type: 'primary',
                    onClick: onCreate,
                },
            ]}
            api={api}
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
            drawerWidth="30%"
        />
    )
}