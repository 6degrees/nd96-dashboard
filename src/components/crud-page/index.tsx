'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import PageActions from '@/components/page-action'
import PageFilter from '@/components/page-filter'
import PageTable from '@/components/page-table'
import {AppDrawer} from '@/components/app-drawer'

import {
    ConfirmDeleteModal,
    ConfirmStatusModal,
} from '@/components/modals'

import {useTranslation} from 'react-i18next'
import {toast} from '@/lib/toast/toast'
import {ActionsProps} from "@/types/action-button";

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

    filters?: React.ReactNode

    headerContent?: React.ReactNode

    footerContent?: React.ReactNode

    actions?: (props: ActionsProps) => any[]

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
        className = 'p-8 min-h-screen',
        columns,
        Form,
        api,
        filters,
        headerContent,
        footerContent,
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
    }: CrudPageProps) {

    /*
    |--------------------------------------------------------------------------
    | Redux
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch()

    const {t} = useTranslation()

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

    const refreshData = () => {
        dispatch(api.fetch() as any)
    }

    const closeCreateDrawer = () => {
        setCreateOpen(false)
    }

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

                    void toast.success({
                        message: t('common.createdSuccessfully'),
                    })
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

                    void toast.success({
                        message: t('common.updatedSuccessfully'),
                    })
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

                            void toast.success({
                                message: t('common.deletedSuccessfully'),
                            })
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
                        record.is_active
                            ? 'disable'
                            : 'active',
                        () => {
                            refreshData()

                            void toast.success({
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

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className={`${className} bg-transparent`}>

            <PageActions
                title={title}
                actions={
                    actions?.({
                        onCreate: () => setCreateOpen(true),
                        onRefresh: refreshData,
                    }) || []
                }
            />

            {headerContent && (
                <div className="mb-6">
                    {headerContent}
                </div>
            )}

            <AppDrawer
                open={isCreateOpen}
                width={drawerWidth ?? null}
                onClose={closeCreateDrawer}
            >
                <Form
                    onSubmit={handleCreate}
                />
            </AppDrawer>

            <AppDrawer
                open={isEditOpen}
                width={drawerWidth ?? null}
                onClose={closeEditDrawer}
            >
                <Form
                    isEdit
                    data={selectedItem}
                    onSubmit={handleUpdate}
                />
            </AppDrawer>

            {filters && (
                <PageFilter
                    title={t('common.searchInformation')}
                    isOpen={isFilterVisible}
                    onToggle={() =>
                        setFilterVisible(!isFilterVisible)
                    }
                    onSearch={onSearch}
                >
                    {filters}
                </PageFilter>
            )}

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

            {footerContent && (
                <div className="mt-6">
                    {footerContent}
                </div>
            )}

        </div>
    )
}