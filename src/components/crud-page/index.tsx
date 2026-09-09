'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useTranslation } from "react-i18next"

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/
import PageActions from '@/components/page-action'
import PageFilter from '@/components/page-filter'
import PageTable from '@/components/page-table'
import PageGrid from '@/components/page-grid'
import { AppDrawer } from '@/components/app-drawer'

import {
    ConfirmDeleteModal,
    ConfirmStatusModal,
} from '@/components/modals'
import {toast} from "@/lib/toast/toast";

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
|
*/
interface CrudPageProps {
    title: string

    className?: string

    columns: any

    Form: any

    api: any

    formProps?: Record<string, any>

    filters?: React.ReactNode

    actions?: (props: {
        onCreate: () => void
    }) => any[]

    onView?: (record: any) => void

    dataSource: any[]

    loading: boolean

    page: number
    limit: number
    total: number

    setPage?: (page: number) => void
    setLimit?: (limit: number) => void

    onSearch: () => void
    drawerWidth?: string | null

    viewMode?: 'table' | 'grid'
    CardComponent?: React.ComponentType<{
        item: any
        onView?: (record: any) => void
        onEdit: (record: any) => void
        onDelete: (record: any) => void
        onStatusChange: (record: any) => void
    }>

    enableInfiniteScroll?: boolean
    hasMore?: boolean
    loadingMore?: boolean
    onLoadMore?: () => void
}

/*
|--------------------------------------------------------------------------
| Component
|--------------------------------------------------------------------------
|
*/
export default function CrudPage(
    {
        title,
        className = 'p-1 sm:p-3 lg:p-8 min-h-screen',
        columns,
        Form,
        formProps,
        api,
        filters,
        actions,
        onView,
        dataSource,
        loading,
        page,
        limit,
        total,
        setPage,
        setLimit,
        onSearch,
        drawerWidth,
        viewMode = 'table',
        CardComponent,
        enableInfiniteScroll,
        hasMore,
        loadingMore,
        onLoadMore,
    }: CrudPageProps) {

    /*
    |--------------------------------------------------------------------------
    | Redux & Contexts
    |--------------------------------------------------------------------------
    |
    */
    const dispatch = useDispatch()
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | States
    |--------------------------------------------------------------------------
    |
    */
    const [isFilterVisible, setFilterVisible] = useState(true)

    const [isCreateOpen, setCreateOpen] = useState(false)

    const [isEditOpen, setEditOpen] = useState(false)

    const [selectedItem, setSelectedItem] = useState<any>(null)

    /*
    |--------------------------------------------------------------------------
    | Helpers
    |--------------------------------------------------------------------------
    |
    */
    const refreshData = () => { dispatch(api.fetch() as any) }

    const closeCreateDrawer = () => { setCreateOpen(false) }

    const closeEditDrawer = () => {
        setEditOpen(false)
        setSelectedItem(null)
    }

    /*
    |--------------------------------------------------------------------------
    | CRUD Handlers
    |--------------------------------------------------------------------------
    |
    */
    const handleCreate = (values: any) => {
        dispatch(
            api.create(
                values,
                () => {
                    refreshData()
                    closeCreateDrawer()
                    toast.success({message: t('common.createdSuccessfully'),})
                },
            ) as any,
        )
    }

    const handleUpdate = (values: any) => {
        dispatch(
            api.update(
                selectedItem.id,
                values,
                () => {
                    refreshData()
                    closeEditDrawer()
                    toast.success({message: t('common.updatedSuccessfully'),})
                },
            ) as any,
        )
    }

    const handleDelete = (record: any) => {
        ConfirmDeleteModal({
            onConfirm: () => {
                dispatch(
                    api.delete(
                        record.id,
                        () => {
                            refreshData()
                            toast.success({message: t('common.deletedSuccessfully'),})
                        },
                    ) as any,
                )
            },
        })
    }

    const handleStatusChange = (record: any) => {
        if (!api.status) return

        ConfirmStatusModal({
            isActive: record.is_active,

            onConfirm: () => {
                dispatch(
                    api.status(
                        record.id,
                        record.is_active ? 'disable' : 'active',
                        () => {
                            refreshData()
                            toast.success({
                                message: record.is_active
                                    ? t('common.disabledSuccessfully')
                                    : t('common.activatedSuccessfully'),
                            })
                        },
                    ) as any,
                )
            },
        })
    }

    const handleEdit = (record: any) => {
        setSelectedItem(record)
        setEditOpen(true)
    }

    React.useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 1024px)')

        setFilterVisible(mediaQuery.matches)

        const handleChange = (event: MediaQueryListEvent) => {
            setFilterVisible(event.matches)
        }

        mediaQuery.addEventListener('change', handleChange)

        return () => {
            mediaQuery.removeEventListener('change', handleChange)
        }
    }, [])

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */
    return (
        <div className={`${className} bg-transparent`}>
            {/* Header */}
            <PageActions
                title={title}
                actions={
                    actions?.({
                        onCreate: () =>
                            setCreateOpen(true),
                    }) || []
                }
            />

            {/* Create Drawer */}
            <AppDrawer
                open={isCreateOpen}
                width={drawerWidth ?? null}
                onClose={closeCreateDrawer}>

                <Form
                    onSubmit={handleCreate}
                    {...formProps}
                />
            </AppDrawer>

            {/* Edit Drawer */}
            <AppDrawer
                open={isEditOpen}
                width={drawerWidth ?? null}
                onClose={closeEditDrawer}>
                <Form
                    isEdit

                    data={selectedItem}

                    onSubmit={handleUpdate}
                    {...formProps}
                />
            </AppDrawer>

            {/* Filters */}
            {filters && (
                <PageFilter
                    isOpen={isFilterVisible}
                    onToggle={() =>
                        setFilterVisible(!isFilterVisible)
                    }
                    onSearch={onSearch}>
                    {filters}
                </PageFilter>
            )}

            {/* View Mode Switch: Grid or Table */}
            {viewMode === 'grid' && CardComponent ? (
                <PageGrid
                    loading={loading}
                    dataSource={dataSource}
                    page={page}
                    limit={limit}
                    total={total}
                    onChange={(p, l) => {
                        setPage?.(p)
                        setLimit?.(l)
                    }}
                    CardComponent={CardComponent}
                    cardProps={{
                        onView,
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                        onStatusChange: handleStatusChange,
                    }}
                    enableInfiniteScroll={enableInfiniteScroll}
                    hasMore={hasMore}
                    loadingMore={loadingMore}
                    onLoadMore={onLoadMore}
                />
            ) : (
                /* Table */
                <PageTable
                    loading={loading}
                    columns={columns({
                        t,
                        onView,
                        onEdit: handleEdit,
                        onDelete: handleDelete,
                        onStatusChange: handleStatusChange,
                    })}
                    dataSource={dataSource}
                    page={page}
                    limit={limit}
                    total={total}
                    onChange={(
                        p: number,
                        l: number,
                    ) => {

                        setPage?.(p)

                        setLimit?.(l)
                    }}
                />
            )}

        </div>
    )
}