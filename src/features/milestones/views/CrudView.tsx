'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
*/

import React from 'react'
import CrudPage from '@/components/crud-page'
import { RefreshCw } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
*/

import { Filters, Columns } from '@/features/milestones/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
*/

import { useCollections } from '@/features/milestones/hooks'

/*
|--------------------------------------------------------------------------
| Form
|--------------------------------------------------------------------------
*/

import MilestoneForm from '@/features/milestones/forms'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
*/

import { api } from '@/features/milestones/api'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface PageProps {
    id: string
}

/*
|--------------------------------------------------------------------------
| Page
|--------------------------------------------------------------------------
*/

export default function Page({ id }: PageProps) {
    const [timelineId, setTimelineId] = React.useState<string>(id)

    /*
    |--------------------------------------------------------------------------
    | Resolve Route Params
    |--------------------------------------------------------------------------
    */
    React.useEffect(() => {
        setTimelineId(id)
    }, [id])

    /*
    |--------------------------------------------------------------------------
    | Collections Hook
    |--------------------------------------------------------------------------
    */

    const {list, loading, page, setPage, limit, setLimit, filters, setFilters, handleSearch} = useCollections(timelineId)

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const handleRefresh = () => {
        handleSearch()
    }

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    */

    const dataSource = list?.data?.map(
        (milestone: any) => ({
            key: milestone.id,
            ...milestone,
        }),
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (
        <CrudPage
            title="milestone.title"
            className={'p-8 px-0 min-h-screen'}
            columns={Columns}
            Form={MilestoneForm}
            formProps={{timelineId: id,}}
            api={api}
            filters={
                <Filters
                    filters={filters}
                    setFilters={setFilters}
                />
            }
            actions={({ onCreate }) => [
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
                {
                    label: 'milestone.create',
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
            drawerWidth="60%"
            refreshData={handleRefresh}
        />
    )
}