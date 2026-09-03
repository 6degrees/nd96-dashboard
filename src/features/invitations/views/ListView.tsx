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
} from '@/features/invitations/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import {useCollections} from '@/features/invitations/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
|
*/

import CompanyForm from '@/features/invitations/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '@/features/invitations/api'

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
        (invitation: any) => ({
            key: invitation.id,
            ...invitation,
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
            title="invitation.title"
            columns={Columns}
            Form={CompanyForm}
            api={api}
            actions={({}) => [
                {
                    label: loading ? 'common.refreshing' : 'common.refresh',
                    type: 'default',
                    icon: (<RefreshCw size={15} className={loading ? 'animate-spin' : ''}/>),
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
            drawerWidth="30%"
        />
    )
}