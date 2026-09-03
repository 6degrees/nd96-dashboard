'use client'

/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/

import React, {useEffect, useMemo, useState} from 'react'
import {useParams, useRouter} from 'next/navigation'
import {useDispatch, useSelector} from 'react-redux'
import {Image} from 'antd'
import {useTranslation} from 'react-i18next'

import {
    AlertTriangle,
    ArrowLeft,
    CalendarClock,
    Check,
    CheckCircle2,
    Copy,
    MapPin,
    MessageCircle,
    Package,
    Phone,
    ReceiptText,
    RefreshCw,
    Store,
    UserRound,
} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| API & Utilities
|--------------------------------------------------------------------------
|
*/

import {api} from '../api'
import PageActions from '@/components/page-action'
import {formatDate} from '@/utils/helpers'

/*
|--------------------------------------------------------------------------
| Order Status Flow
|--------------------------------------------------------------------------
|
*/

const ORDER_STATUSES = [
    'new',
    'preparing',
    'ready',
    'delivered',
]

/*
|--------------------------------------------------------------------------
| Main Component
|--------------------------------------------------------------------------
|
*/

export default function OrderDetailsPage() {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */

    const dispatch = useDispatch()
    const router = useRouter()
    const params = useParams()

    const {t} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Local State
    |--------------------------------------------------------------------------
    |
    */

    const [copied, setCopied] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const order = useSelector(
        (state: any) => state.order?.current?.data,
    )

    const loading = useSelector(
        (state: any) => state.order?.loading ?? true,
    )

    /*
    |--------------------------------------------------------------------------
    | Fetch Order
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {

        if (!params?.id) return

        dispatch(
            api.detail(params.id as string) as any,
        )

    }, [params?.id, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    |
    */

    const handleRefresh = () => {

        if (!params?.id || loading) return

        dispatch(
            api.detail(params.id as string) as any,
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Current Status
    |--------------------------------------------------------------------------
    |
    */

    const currentStatus = order?.status?.value

    /*
    |--------------------------------------------------------------------------
    | Status History
    |--------------------------------------------------------------------------
    |
    */

    const statusHistory = order?.statuses || []

    /*
    |--------------------------------------------------------------------------
    | Current Status Index
    |--------------------------------------------------------------------------
    |
    */

    const currentStatusIndex = ORDER_STATUSES.indexOf(
        currentStatus,
    )

    /*
    |--------------------------------------------------------------------------
    | Status Label
    |--------------------------------------------------------------------------
    |
    */

    const getStatusLabel = (
        statusValue: string,
    ) => {

        const historyItem = statusHistory.find(
            (status: any) =>
                status.to === statusValue,
        )

        if (historyItem?.to_label) {
            return historyItem.to_label
        }

        return t(
            `order.status.${statusValue}`,
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Status Date
    |--------------------------------------------------------------------------
    |
    */

    const getStatusDate = (
        statusValue: string,
    ) => {

        const historyItem = statusHistory.find(
            (status: any) =>
                status.to === statusValue,
        )

        return historyItem?.created_at
    }

    /*
    |--------------------------------------------------------------------------
    | Copy Order Number
    |--------------------------------------------------------------------------
    |
    */

    const handleCopy = async () => {

        if (!order?.number) return

        await navigator.clipboard.writeText(
            order.number,
        )

        setCopied(true)

        setTimeout(() => {
            setCopied(false)
        }, 1500)
    }

    /*
    |--------------------------------------------------------------------------
    | WhatsApp
    |--------------------------------------------------------------------------
    |
    */

    const whatsappUrl = useMemo(() => {

        if (!order?.customer?.mobile) {
            return null
        }

        const code = (
            order.customer.mobile_code || ''
        )
            .replace('+', '')
            .trim()

        const mobile = order.customer.mobile
            .replace(/^0+/, '')
            .trim()

        return `https://wa.me/${code}${mobile}`

    }, [
        order?.customer?.mobile,
        order?.customer?.mobile_code,
    ])

    /*
    |--------------------------------------------------------------------------
    | Currency
    |--------------------------------------------------------------------------
    |
    */

    const formatMoney = (
        value: number | undefined,
    ) => {

        return `${Number(value || 0).toLocaleString()} ${
            order?.currency || 'SAR'
        }`
    }

    /*
    |--------------------------------------------------------------------------
    | Total Tax
    |--------------------------------------------------------------------------
    |
    */

    const totalTax = useMemo(() => {

        return (order?.items || []).reduce(
            (
                total: number,
                item: any,
            ) =>
                total + Number(item.tax || 0),
            0,
        )

    }, [order?.items])

    /*
    |--------------------------------------------------------------------------
    | Delivered Status
    |--------------------------------------------------------------------------
    |
    */

    const deliveredStatus = statusHistory.find(
        (status: any) =>
            status.to === 'delivered',
    )

    /*
    |--------------------------------------------------------------------------
    | Late
    |--------------------------------------------------------------------------
    |
    */

    const isLate = Boolean(
        order?.is_late,
    )

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="min-h-screen bg-slate-50/60 p-4 text-slate-800 dark:bg-neutral-950 dark:text-slate-100 sm:p-8">

            <div className="space-y-6">

                {/* ---------------------------------------------------------------- */}
                {/* Page Header - Always Visible */}
                {/* ---------------------------------------------------------------- */}

                <PageActions
                    title={t('order.details.title')}
                    actions={[
                        {
                            label: loading
                                ? 'common.refreshing'
                                : 'common.refresh',
                            icon: (
                                <RefreshCw
                                    size={18}
                                    className={
                                        loading
                                            ? 'animate-spin'
                                            : ''
                                    }
                                />
                            ),
                            type: 'default',
                            onClick: handleRefresh,
                        },
                        {
                            label: 'common.back',
                            icon: <ArrowLeft size={18}/>,
                            onClick: () => router.back(),
                        },
                    ]}
                />

                {/* ---------------------------------------------------------------- */}
                {/* Page Content */}
                {/* ---------------------------------------------------------------- */}

                {loading || !order ? (

                    /* ---------------------------------------------------------------- */
                    /* Loading Content */
                    /* ---------------------------------------------------------------- */

                    <div className="space-y-6">

                        {/* Order Header Skeleton */}

                        <div className="animate-pulse overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="h-14 w-14 rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="space-y-3">

                                        <div className="h-7 w-40 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                                        <div className="h-4 w-56 rounded-md bg-slate-100 dark:bg-neutral-800"/>

                                    </div>

                                </div>

                                <div className="flex gap-3">

                                    <div className="h-20 w-36 rounded-2xl bg-slate-100 dark:bg-neutral-800"/>

                                    <div className="h-20 w-36 rounded-2xl bg-slate-100 dark:bg-neutral-800"/>

                                </div>

                            </div>

                        </div>

                        {/* Main Skeleton */}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                            <div className="space-y-6 lg:col-span-2">

                                {/* Status Skeleton */}

                                <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-neutral-800">

                                        <div className="space-y-2">

                                            <div className="h-5 w-32 rounded bg-slate-200 dark:bg-neutral-800"/>

                                            <div className="h-3 w-52 rounded bg-slate-100 dark:bg-neutral-800"/>

                                        </div>

                                        <div className="h-8 w-24 rounded-full bg-slate-200 dark:bg-neutral-800"/>

                                    </div>

                                    <div className="mt-8 flex items-center">

                                        {Array.from({
                                            length: 4,
                                        }).map(
                                            (_, index) => (
                                                <React.Fragment
                                                    key={index}
                                                >

                                                    <div className="flex flex-1 flex-col items-center">

                                                        <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-neutral-800"/>

                                                        <div className="mt-3 h-3 w-20 rounded bg-slate-200 dark:bg-neutral-800"/>

                                                        <div className="mt-2 h-2.5 w-24 rounded bg-slate-100 dark:bg-neutral-800"/>

                                                    </div>

                                                    {index < 3 && (
                                                        <div className="h-0.5 flex-1 bg-slate-100 dark:bg-neutral-800"/>
                                                    )}

                                                </React.Fragment>
                                            ),
                                        )}

                                    </div>

                                </div>

                                {/* Pickup Skeleton */}

                                <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center gap-4">

                                        <div className="h-12 w-12 rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                                        <div className="space-y-2">

                                            <div className="h-5 w-36 rounded bg-slate-200 dark:bg-neutral-800"/>

                                            <div className="h-3 w-56 rounded bg-slate-100 dark:bg-neutral-800"/>

                                        </div>

                                    </div>

                                    <div className="mt-6 h-20 rounded-2xl bg-slate-100 dark:bg-neutral-800"/>

                                </div>

                                {/* Items Skeleton */}

                                <div className="animate-pulse rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="mb-6 h-5 w-28 rounded bg-slate-200 dark:bg-neutral-800"/>

                                    <div className="space-y-5">

                                        {Array.from({
                                            length: 3,
                                        }).map(
                                            (_, index) => (
                                                <div
                                                    key={index}
                                                    className="flex items-center gap-4"
                                                >

                                                    <div className="h-16 w-16 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                                                    <div className="flex-1 space-y-3">

                                                        <div className="h-4 w-32 rounded bg-slate-200 dark:bg-neutral-800"/>

                                                        <div className="h-3 w-24 rounded bg-slate-100 dark:bg-neutral-800"/>

                                                    </div>

                                                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-neutral-800"/>

                                                </div>
                                            ),
                                        )}

                                    </div>

                                </div>

                            </div>

                            {/* Sidebar Skeleton */}

                            <div className="space-y-6">

                                <div className="animate-pulse h-48 rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"/>

                                <div className="animate-pulse h-32 rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"/>

                                <div className="animate-pulse h-56 rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"/>

                                <div className="animate-pulse h-32 rounded-3xl border border-slate-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"/>

                            </div>

                        </div>

                    </div>

                ) : (

                    /* ---------------------------------------------------------------- */
                    /* Order Content */
                    /* ---------------------------------------------------------------- */

                    <>

                        {/* Order Header */}

                        <section className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">

                            <div className="flex flex-col gap-6 p-6 sm:p-7 lg:flex-row lg:items-center lg:justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-700 dark:bg-neutral-800 dark:text-slate-200">

                                        <Package size={26}/>

                                    </div>

                                    <div>

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                                #{order.number}
                                            </h1>

                                            <button
                                                type="button"
                                                onClick={handleCopy}
                                                className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-neutral-800 dark:hover:text-white"
                                            >

                                                {copied ? (
                                                    <Check
                                                        size={16}
                                                        className="text-emerald-500"
                                                    />
                                                ) : (
                                                    <Copy size={16}/>
                                                )}

                                            </button>

                                        </div>

                                        <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-slate-500 dark:text-neutral-400">

                                            <span>
                                                {order.branch?.label || '-'}
                                            </span>

                                            <span className="text-slate-300 dark:text-neutral-700">
                                                •
                                            </span>

                                            <span>
                                                {order.customer?.label || '-'}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 dark:border-emerald-900/60 dark:bg-emerald-950/30">

                                        <span className="block text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                            {t('order.details.currentStatus')}
                                        </span>

                                        <span className="mt-1 block text-base font-bold text-emerald-700 dark:text-emerald-300">
                                            {order.status?.label || '-'}
                                        </span>

                                    </div>

                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-4 dark:border-neutral-800 dark:bg-neutral-950">

                                        <span className="block text-xs font-medium text-slate-500 dark:text-neutral-400">
                                            {t('order.inputs.total')}
                                        </span>

                                        <span className="mt-1 block text-xl font-bold text-slate-900 dark:text-white">
                                            {formatMoney(order.total)}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* Late Alert */}

                        {isLate && (
                            <section className="rounded-3xl border border-red-200 bg-red-50 p-5 dark:border-red-900/60 dark:bg-red-950/30">

                                <div className="flex items-start gap-4">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400">

                                        <AlertTriangle size={22}/>

                                    </div>

                                    <div>

                                        <h2 className="font-bold text-red-800 dark:text-red-300">
                                            {t('order.pickup.lateTitle')}
                                        </h2>

                                        <p className="mt-1 text-sm leading-6 text-red-700 dark:text-red-400">
                                            {t('order.pickup.lateDescription')}
                                        </p>

                                    </div>

                                </div>

                            </section>
                        )}

                        {/* Main Layout */}

                        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                            {/* Main Content */}

                            <div className="space-y-6 lg:col-span-2">

                                {/* Status */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 dark:border-neutral-800 sm:flex-row sm:items-center sm:justify-between">

                                        <div>

                                            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                {t('order.pickup.statusTitle')}
                                            </h2>

                                            <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                                                {t('order.pickup.statusDescription')}
                                            </p>

                                        </div>

                                        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-2 text-xs font-bold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/30 dark:text-emerald-400">

                                            <span className="relative flex h-2.5 w-2.5">

                                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60"/>

                                                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"/>

                                            </span>

                                            {order.status?.label || '-'}

                                        </div>

                                    </div>

                                    {/* Timeline */}

                                    <div className="mt-8 overflow-x-auto pb-2">

                                        <div className="flex min-w-[680px] items-start">

                                            {ORDER_STATUSES.map(
                                                (
                                                    statusValue,
                                                    index,
                                                ) => {

                                                    const isCompleted =
                                                        currentStatusIndex >= index &&
                                                        currentStatusIndex >= 0

                                                    const isCurrent =
                                                        statusValue === currentStatus

                                                    const isLast =
                                                        index ===
                                                        ORDER_STATUSES.length - 1

                                                    return (
                                                        <React.Fragment
                                                            key={statusValue}
                                                        >

                                                            <div className="relative flex min-w-[150px] flex-1 flex-col items-center text-center">

                                                                <div
                                                                    className={`
                                                                        relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300
                                                                        ${
                                                                        isCompleted
                                                                            ? isCurrent
                                                                                ? 'border-emerald-500 bg-emerald-500 text-white shadow-[0_0_0_5px_rgba(16,185,129,0.10)]'
                                                                                : 'border-emerald-500 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/40 dark:text-emerald-400'
                                                                            : 'border-slate-200 bg-white text-slate-300 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-600'
                                                                    }
                                                                    `}
                                                                >

                                                                    {isCompleted ? (
                                                                        <Check
                                                                            size={19}
                                                                            strokeWidth={3}
                                                                        />
                                                                    ) : (
                                                                        <span className="h-2.5 w-2.5 rounded-full bg-current"/>
                                                                    )}

                                                                </div>

                                                                <span
                                                                    className={`
                                                                        mt-3 text-sm font-bold
                                                                        ${
                                                                        isCompleted
                                                                            ? 'text-slate-800 dark:text-slate-100'
                                                                            : 'text-slate-400 dark:text-neutral-500'
                                                                    }
                                                                    `}
                                                                >
                                                                    {getStatusLabel(
                                                                        statusValue,
                                                                    )}
                                                                </span>

                                                                {getStatusDate(
                                                                    statusValue,
                                                                ) ? (
                                                                    <span className="mt-1 text-[11px] font-medium text-slate-400 dark:text-neutral-500">
                                                                        {formatDate(
                                                                            getStatusDate(
                                                                                statusValue,
                                                                            ),
                                                                            true,
                                                                        )}
                                                                    </span>
                                                                ) : (
                                                                    <span className="mt-1 text-[11px] text-slate-300 dark:text-neutral-600">
                                                                        {t('order.pickup.pending')}
                                                                    </span>
                                                                )}

                                                                {isCurrent && (
                                                                    <span className="mt-2 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-bold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                                                                        {t('order.pickup.current')}
                                                                    </span>
                                                                )}

                                                            </div>

                                                            {!isLast && (
                                                                <div
                                                                    className={`relative mt-6 h-0.5 flex-1 ${
                                                                        currentStatusIndex > index
                                                                            ? 'bg-emerald-500'
                                                                            : 'bg-slate-200 dark:bg-neutral-800'
                                                                    }`}
                                                                >

                                                                    {currentStatusIndex > index && (
                                                                        <span className="absolute -end-1 -top-1 h-2.5 w-2.5 rounded-full bg-emerald-500"/>
                                                                    )}

                                                                </div>
                                                            )}

                                                        </React.Fragment>
                                                    )
                                                },
                                            )}

                                        </div>

                                    </div>

                                </section>

                                {/* Pickup Time */}

                                <section
                                    className={`
                                        rounded-3xl border p-6
                                        ${
                                        isLate
                                            ? 'border-red-200 bg-red-50/60 dark:border-red-900/60 dark:bg-red-950/20'
                                            : 'border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900'
                                    }
                                    `}
                                >

                                    <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                                        <div className="flex items-center gap-4">

                                            <div
                                                className={`
                                                    flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl
                                                    ${
                                                    isLate
                                                        ? 'bg-red-100 text-red-600 dark:bg-red-900/50 dark:text-red-400'
                                                        : 'bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400'
                                                }
                                                `}
                                            >

                                                {isLate ? (
                                                    <AlertTriangle size={23}/>
                                                ) : (
                                                    <CalendarClock size={23}/>
                                                )}

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {t('order.pickup.expectedTitle')}
                                                </h2>

                                                <p className="mt-1 text-xs text-slate-500 dark:text-neutral-400">
                                                    {t('order.pickup.expectedDescription')}
                                                </p>

                                            </div>

                                        </div>

                                        <div className="text-start sm:text-end">

                                            <div
                                                className={`
                                                    text-xl font-bold
                                                    ${
                                                    isLate
                                                        ? 'text-red-600 dark:text-red-400'
                                                        : 'text-slate-900 dark:text-white'
                                                }
                                                `}
                                            >
                                                {order.preparation_due_at
                                                    ? formatDate(
                                                        order.preparation_due_at,
                                                        true,
                                                    )
                                                    : '-'}
                                            </div>

                                            {isLate && (
                                                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-red-600 dark:text-red-400">

                                                    <AlertTriangle size={13}/>

                                                    {t('order.pickup.late')}

                                                </span>
                                            )}

                                        </div>

                                    </div>

                                    {deliveredStatus && (
                                        <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-200 pt-4 text-sm dark:border-neutral-800">

                                            <CheckCircle2
                                                size={17}
                                                className="text-emerald-500"
                                            />

                                            <span className="text-slate-500 dark:text-neutral-400">
                                                {t('order.pickup.deliveredAt')}
                                            </span>

                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                {formatDate(
                                                    deliveredStatus.created_at,
                                                    true,
                                                )}
                                            </span>

                                        </div>
                                    )}

                                </section>

                                {/* Items */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center justify-between border-b border-slate-100 pb-5 dark:border-neutral-800">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                                                <Package size={20}/>

                                            </div>

                                            <div>

                                                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                                                    {t('order.items.title')}
                                                </h2>

                                                <p className="mt-1 text-xs text-slate-400 dark:text-neutral-500">
                                                    {order.items?.length || 0}{' '}
                                                    {t('order.items.count')}
                                                </p>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-5 divide-y divide-slate-100 dark:divide-neutral-800">

                                        {(order.items || []).map(
                                            (item: any) => {

                                                const name =
                                                    item.name ||
                                                    item.product?.label ||
                                                    '-'

                                                return (
                                                    <div
                                                        key={item.id}
                                                        className="flex items-center gap-4 py-4 first:pt-0 last:pb-0"
                                                    >

                                                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950">

                                                            {item.product?.thumbnail ? (
                                                                <Image
                                                                    src={
                                                                        item.product.thumbnail
                                                                    }
                                                                    alt={name}
                                                                    preview
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            ) : (
                                                                <div className="flex h-full w-full items-center justify-center text-slate-400">
                                                                    <Package size={22}/>
                                                                </div>
                                                            )}

                                                        </div>

                                                        <div className="min-w-0 flex-1">

                                                            <h3 className="truncate text-sm font-bold text-slate-800 dark:text-slate-100">
                                                                {name}
                                                            </h3>

                                                            <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-neutral-400">

                                                                <span>
                                                                    {t('order.items.quantity')}: {item.quantity}
                                                                </span>

                                                                <span>
                                                                    {formatMoney(
                                                                        item.unit_price,
                                                                    )}
                                                                </span>

                                                            </div>

                                                        </div>

                                                        <div className="text-end">

                                                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                                {formatMoney(
                                                                    item.total,
                                                                )}
                                                            </span>

                                                        </div>

                                                    </div>
                                                )
                                            },
                                        )}

                                    </div>

                                </section>

                            </div>

                            {/* Sidebar */}

                            <div className="space-y-6">

                                {/* Customer */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-neutral-800">

                                        <div className="flex items-center gap-3">

                                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                                                <UserRound size={19}/>

                                            </div>

                                            <h2 className="font-bold text-slate-900 dark:text-white">
                                                {t('order.customer.title')}
                                            </h2>

                                        </div>

                                        {whatsappUrl && (
                                            <a
                                                href={whatsappUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100 dark:bg-emerald-950/40 dark:text-emerald-400"
                                            >
                                                <MessageCircle size={17}/>
                                            </a>
                                        )}

                                    </div>

                                    <div className="mt-5 space-y-4">

                                        <div>

                                            <span className="text-xs font-medium text-slate-400">
                                                {t('order.customer.name')}
                                            </span>

                                            <p className="mt-1 font-bold text-slate-800 dark:text-slate-100">
                                                {order.customer?.label || '-'}
                                            </p>

                                        </div>

                                        <div>

                                            <span className="text-xs font-medium text-slate-400">
                                                {t('order.customer.mobile')}
                                            </span>

                                            <div className="mt-1 flex items-center gap-2">

                                                <Phone
                                                    size={14}
                                                    className="text-slate-400"
                                                />

                                                <span className="font-mono text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                    {order.customer?.mobile_code}{' '}
                                                    {order.customer?.mobile}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                                {/* Branch */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                                            <Store size={19}/>

                                        </div>

                                        <h2 className="font-bold text-slate-900 dark:text-white">
                                            {t('order.branch.title')}
                                        </h2>

                                    </div>

                                    <div className="mt-5">

                                        <span className="text-xs font-medium text-slate-400">
                                            {t('order.branch.name')}
                                        </span>

                                        <div className="mt-2 flex items-center gap-2">

                                            <MapPin
                                                size={15}
                                                className="text-slate-400"
                                            />

                                            <span className="font-bold text-slate-800 dark:text-slate-100">
                                                {order.branch?.label || '-'}
                                            </span>

                                        </div>

                                    </div>

                                </section>

                                {/* Summary */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                                            <ReceiptText size={19}/>

                                        </div>

                                        <h2 className="font-bold text-slate-900 dark:text-white">
                                            {t('order.payment.title')}
                                        </h2>

                                    </div>

                                    <div className="mt-5 space-y-3">

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-slate-500 dark:text-neutral-400">
                                                {t('order.payment.subtotal')}
                                            </span>

                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                {formatMoney(
                                                    order.items?.reduce(
                                                        (
                                                            total: number,
                                                            item: any,
                                                        ) =>
                                                            total +
                                                            Number(
                                                                item.subtotal || 0,
                                                            ),
                                                        0,
                                                    ),
                                                )}
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-slate-500 dark:text-neutral-400">
                                                {t('order.payment.tax')}
                                            </span>

                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                {formatMoney(totalTax)}
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between text-sm">

                                            <span className="text-slate-500 dark:text-neutral-400">
                                                {t('order.payment.discount')}
                                            </span>

                                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                                                {formatMoney(
                                                    order.items?.reduce(
                                                        (
                                                            total: number,
                                                            item: any,
                                                        ) =>
                                                            total +
                                                            Number(
                                                                item.discount || 0,
                                                            ),
                                                        0,
                                                    ),
                                                )}
                                            </span>

                                        </div>

                                        <div className="border-t border-slate-100 pt-4 dark:border-neutral-800">

                                            <div className="flex items-center justify-between">

                                                <span className="font-bold text-slate-900 dark:text-white">
                                                    {t('order.payment.total')}
                                                </span>

                                                <span className="text-xl font-bold text-emerald-600 dark:text-emerald-400">
                                                    {formatMoney(order.total)}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </section>

                                {/* Dates */}

                                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                                    <div className="space-y-4">

                                        <div>

                                            <span className="text-xs font-medium text-slate-400">
                                                {t('order.inputs.createdAt')}
                                            </span>

                                            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {formatDate(
                                                    order.created_at,
                                                    true,
                                                )}
                                            </p>

                                        </div>

                                        <div>

                                            <span className="text-xs font-medium text-slate-400">
                                                {t('order.inputs.updatedAt')}
                                            </span>

                                            <p className="mt-1 text-sm font-semibold text-slate-700 dark:text-slate-300">
                                                {formatDate(
                                                    order.updated_at,
                                                    true,
                                                )}
                                            </p>

                                        </div>

                                    </div>

                                </section>

                            </div>

                        </div>

                    </>

                )}

            </div>

        </div>
    )
}