'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, { useState } from 'react'

import CrudPage from '@/components/crud-page'
import { AppDrawer } from '@/components/app-drawer'

/*
|--------------------------------------------------------------------------
| Feature UI
|--------------------------------------------------------------------------
|
*/

import {
    Filters,
    Columns,
} from '@/features/messages/ui'

/*
|--------------------------------------------------------------------------
| Hooks
|--------------------------------------------------------------------------
|
*/

import { useCollections } from '@/features/messages/hooks'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import { api } from '@/features/messages/api'

/*
|--------------------------------------------------------------------------
| Icons
|--------------------------------------------------------------------------
|
*/

import { RefreshCw } from 'lucide-react'
import {CrudView} from "@/features/milestones";


/*
|--------------------------------------------------------------------------
| Timeline Page
|--------------------------------------------------------------------------
|
*/

export default function Page() {

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
    | View Drawer
    |--------------------------------------------------------------------------
    |
    */

    const [isViewOpen, setViewOpen] = useState(false)

    const [selectedTimeline, setSelectedTimeline] = useState<any>(null)

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
    | Open Timeline
    |--------------------------------------------------------------------------
    |
    */

    const handleView = (message: any) => {
        setSelectedTimeline(message)

        setViewOpen(true)
    }

    /*
    |--------------------------------------------------------------------------
    | Close Timeline
    |--------------------------------------------------------------------------
    |
    */

    const handleCloseView = () => {
        setViewOpen(false)

        setSelectedTimeline(null)
    }

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource =
        list?.data?.map(
            (message: any) => ({
                key: message.id,
                ...message,
            }),
        ) ?? []

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <>
            <CrudPage
                title="message.title"

                columns={Columns}

                Form={null}

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
                                className={
                                    loading
                                        ? 'animate-spin'
                                        : ''
                                }
                            />
                        ),

                        onClick: handleRefresh,

                        disabled: loading,
                    }
                ]}

                /*
                |--------------------------------------------------------------------------
                | View
                |--------------------------------------------------------------------------
                |
                | Opens Timeline Milestones inside a Drawer.
                |
                */

                onView={handleView}

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

            {/* ---------------------------------------------------------------- */}
            {/* Timeline View Drawer */}
            {/* ---------------------------------------------------------------- */}
            <AppDrawer
                open={isViewOpen}
                width="70%"
                onClose={handleCloseView}>
                {selectedTimeline && (<CrudView id={selectedTimeline.id}/>)}
            </AppDrawer>
        </>
    )
}