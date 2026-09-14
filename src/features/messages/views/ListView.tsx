'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect, useState} from 'react'

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

import {
    RefreshCw,
    User,
    Building2,
    MessageSquareText, PenLine,
} from 'lucide-react'
import {useTranslation} from "react-i18next";
import {RootState} from "@/redux/store";
import {useSelector} from "react-redux";
import {renderEmoji} from "@/utils/helpers";

/*
|--------------------------------------------------------------------------
| Messages Page
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

    const {t} = useTranslation()
    const {list, loading, page, setPage, limit, setLimit, filters, setFilters, handleSearch} = useCollections()
    const [messages, setMessages] = useState<any[]>([])
    const realtimeMessage = useSelector((state: RootState) => state.message.realtimeMessage)

    /*
    |--------------------------------------------------------------------------
    | View Drawer
    |--------------------------------------------------------------------------
    |
    */

    const [isViewOpen, setViewOpen] = useState(false)
    const [selectedMessage, setSelectedMessage] = useState<any>(null)

    /*
    |--------------------------------------------------------------------------
    | Messages Data & Realtime Updates
    |--------------------------------------------------------------------------
    |
    | Synchronizes the local messages state with API data and automatically
    | prepends newly created messages received through the realtime channel.
    | Prevents duplicate messages from being added to the list.
    |
    */

    useEffect(() => {
        if (!list?.data) return

        setMessages(list.data)
    }, [list])

    useEffect(() => {
        if (!realtimeMessage) {
            return
        }

        setMessages((prev) => {
            if (prev.some((item) => item.id === realtimeMessage.id)) {
                return prev
            }

            return [realtimeMessage, ...prev]
        })

    }, [realtimeMessage])

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
    | Open Message
    |--------------------------------------------------------------------------
    |
    */

    const handleView = (message: any) => {
        setSelectedMessage(message)

        setViewOpen(true)
    }

    /*
    |--------------------------------------------------------------------------
    | Close Message
    |--------------------------------------------------------------------------
    |
    */

    const handleCloseView = () => {
        setViewOpen(false)

        setSelectedMessage(null)
    }

    /*
    |--------------------------------------------------------------------------
    | Data Source
    |--------------------------------------------------------------------------
    |
    */

    const dataSource = messages.map((message) => ({
        key: message.id,
        ...message,
    }))

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

                        disabled: loading,
                    },
                ]}

                /*
                |--------------------------------------------------------------------------
                | View
                |--------------------------------------------------------------------------
                |
                | Opens the selected message inside a Drawer.
                |
                */
                onView={handleView}
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

            {/* ---------------------------------------------------------------- */}
            {/* Message View Drawer */}
            {/* ---------------------------------------------------------------- */}

            <AppDrawer
                open={isViewOpen}
                width="30%"
                onClose={handleCloseView}
            >
                {selectedMessage && (
                    <div className="flex h-full flex-col">

                        {/* ---------------------------------------------------- */}
                        {/* Header */}
                        {/* ---------------------------------------------------- */}

                        <div className="border-b border-border px-6 py-5">
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-green/10 text-brand-green">
                                    <MessageSquareText
                                        size={21}
                                        strokeWidth={2}
                                    />
                                </div>

                                <div>
                                    <h2 className="text-base font-semibold text-text-primary">
                                        {selectedMessage.name || '-'}
                                    </h2>

                                    <p className="mt-0.5 text-xs text-text-secondary">
                                        {selectedMessage.department?.label || '-'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* ---------------------------------------------------- */}
                        {/* Content */}
                        {/* ---------------------------------------------------- */}

                        <div className="flex-1 overflow-y-auto px-6 py-6">
                            {/* Sender */}
                            <div className="mb-5 rounded-2xl border border-border bg-bg-secondary/50 p-4">
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-secondary">
                                    <User size={15} />
                                    <span>{t('message.inputs.name')}</span>
                                </div>

                                <p className="text-sm font-medium text-text-primary">
                                    {selectedMessage.name || '-'}
                                </p>
                            </div>

                            {/* Department */}
                            <div className="mb-5 rounded-2xl border border-border bg-bg-secondary/50 p-4">
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-secondary">
                                    <Building2 size={15} />
                                    <span>{t('message.inputs.department')}</span>
                                </div>

                                <p className="text-sm font-medium text-text-primary">
                                    {selectedMessage.department?.label || '-'}
                                </p>
                            </div>

                            {/* Message */}
                            <div>
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-secondary">
                                    <MessageSquareText size={15} />
                                    <span>{t('message.inputs.message')}</span>
                                </div>

                                <div className="relative overflow-hidden rounded-2xl border border-border bg-bg-secondary p-5">
                                    <div className="absolute start-0 top-0 h-full w-1 rounded-full bg-brand-green" />

                                    <p className="whitespace-pre-wrap break-words text-sm leading-8 text-text-primary emoji-text"
                                        dangerouslySetInnerHTML={renderEmoji(selectedMessage.message || '-')}
                                    />
                                </div>
                            </div>

                            {/* Signature */}
                            <div className="mt-5 rounded-2xl border border-border bg-bg-secondary/50 p-4">
                                <div className="mb-3 flex items-center gap-2 text-xs font-medium text-text-secondary">
                                    <PenLine size={15} />
                                    <span>{t('message.inputs.signature')}</span>
                                </div>

                                {selectedMessage.signature ? (
                                    <div className="text-sm font-medium text-text-primary">
                                        <img
                                            src={selectedMessage.signature.url}
                                            alt={t('message.inputs.signature')}
                                            className="max-h-24 max-w-full object-contain"
                                        />
                                    </div>
                                ) : (
                                    <p className="text-sm font-medium text-text-primary">
                                        -
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </AppDrawer>
        </>
    )
}