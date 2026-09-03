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
import {Avatar} from 'antd'
import {useTranslation} from 'react-i18next'

import {
    UilAt,
    UilCalendarAlt,
    UilCalling,
    UilCheck,
    UilCheckCircle,
    UilClock,
    UilCopy,
    UilExternalLinkAlt,
    UilHistory,
    UilShieldCheck,
    UilStore,
    UilSync,
    UilUser,
    UilWhatsapp,
} from '@iconscout/react-unicons'

/*
|--------------------------------------------------------------------------
| Components
|--------------------------------------------------------------------------
|
*/

import PageActions from '@/components/page-action'

/*
|--------------------------------------------------------------------------
| API
|--------------------------------------------------------------------------
|
*/

import {api} from '../api'

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
|
*/

import {formatDate} from '@/utils/formatDate'

/*
|--------------------------------------------------------------------------
| Toast
|--------------------------------------------------------------------------
|
*/

import {toast} from '@/lib/toast/toast'

/*
|--------------------------------------------------------------------------
| View Page
|--------------------------------------------------------------------------
|
*/

export default function BrandCustomerDetailsPage() {

    /*
    |--------------------------------------------------------------------------
    | Hooks & Navigation
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

    const [copiedId, setCopiedId] = useState(false)
    const [copiedPhone, setCopiedPhone] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const {
        customerData,
        loading,
    } = useSelector((state: any) => {

        const customerState =
            state.customer || {}

        return {
            customerData:
            customerState.current,
            loading:
            customerState.loading,
        }
    })

    /*
    |--------------------------------------------------------------------------
    | Customer Data
    |--------------------------------------------------------------------------
    |
    */

    const customer = useMemo(() => {

        if (!customerData) {
            return null
        }

        if ('data' in customerData) {

            return Array.isArray(
                customerData.data
            )
                ? customerData.data[0] || null
                : customerData.data || null
        }

        return customerData

    }, [customerData])

    /*
    |--------------------------------------------------------------------------
    | Fetch Customer
    |--------------------------------------------------------------------------
    |
    */

    useEffect(() => {

        if (!params?.id) {
            return
        }

        dispatch(
            api.detail(
                params.id as string
            ) as any
        )

    }, [params?.id, dispatch])

    /*
    |--------------------------------------------------------------------------
    | Page Actions
    |--------------------------------------------------------------------------
    |
    */

    const actions = useMemo(() => [
        {
            label: 'common.back',
            onClick: () => router.back(),
        },
    ], [router])

    /*
    |--------------------------------------------------------------------------
    | Copy Customer ID
    |--------------------------------------------------------------------------
    |
    */

    const handleCopyId = async (
        id?: string
    ) => {

        if (!id) {
            return
        }

        await navigator.clipboard.writeText(id)

        setCopiedId(true)

        toast.success({
            message: t(
                'common.copied',
                'تم النسخ'
            ),
        })

        setTimeout(() => {
            setCopiedId(false)
        }, 2000)
    }

    /*
    |--------------------------------------------------------------------------
    | Copy Phone
    |--------------------------------------------------------------------------
    |
    */

    const handleCopyPhone = async (
        phone?: string
    ) => {

        if (!phone) {
            return
        }

        await navigator.clipboard.writeText(phone)

        setCopiedPhone(true)

        toast.success({
            message: t(
                'common.copied',
                'تم النسخ'
            ),
        })

        setTimeout(() => {
            setCopiedPhone(false)
        }, 2000)
    }

    /*
    |--------------------------------------------------------------------------
    | WhatsApp URL
    |--------------------------------------------------------------------------
    |
    */

    const whatsappUrl = useMemo(() => {

        if (!customer?.mobile) {
            return null
        }

        const code = (
            customer?.mobile_code || ''
        )
            .replace('+', '')
            .trim()

        const mobile =
            customer.mobile
                .replace(/^0+/, '')
                .trim()

        return `https://wa.me/${code}${mobile}`

    }, [
        customer?.mobile,
        customer?.mobile_code,
    ])

    /*
    |--------------------------------------------------------------------------
    | Loading State
    |--------------------------------------------------------------------------
    |
    */

    if (loading || !customer) {

        return (
            <div className="min-h-screen bg-slate-50 p-4 dark:bg-neutral-950 sm:p-8">

                <div className="animate-pulse space-y-6">

                    {/* Page Header */}

                    <div className="h-16 rounded-2xl bg-slate-200 dark:bg-neutral-900"/>

                    {/* Customer Header */}

                    <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                            <div className="h-20 w-20 shrink-0 rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                            <div className="flex-1 space-y-3">

                                <div className="h-7 w-52 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                                <div className="h-4 w-64 rounded bg-slate-100 dark:bg-neutral-800"/>

                                <div className="h-7 w-32 rounded-full bg-slate-200 dark:bg-neutral-800"/>

                            </div>

                            <div className="h-11 w-32 rounded-xl bg-slate-200 dark:bg-neutral-800"/>

                        </div>

                    </div>

                    {/* Information */}

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">

                        {Array.from({
                            length: 6
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-36 rounded-2xl bg-slate-200 dark:bg-neutral-900"
                            />
                        ))}

                    </div>

                    {/* History */}

                    <div className="h-40 rounded-2xl bg-slate-200 dark:bg-neutral-900"/>

                </div>

            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="min-h-screen bg-slate-50 p-4 text-slate-800 dark:bg-neutral-950 dark:text-slate-100 sm:p-8">

            <div className="space-y-6">

                {/*
                |--------------------------------------------------------------------------
                | Page Header
                |--------------------------------------------------------------------------
                |
                */}

                <PageActions
                    title={t(
                        'customer.details.title',
                        'تفاصيل العميل'
                    )}
                    actions={actions}
                />

                {/*
                |--------------------------------------------------------------------------
                | Customer Header
                |--------------------------------------------------------------------------
                |
                */}

                <section className="rounded-2xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">

                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">

                        {/* Identity */}

                        <div className="flex min-w-0 items-center gap-5">

                            <Avatar
                                size={80}
                                className="flex shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-bold text-slate-600 dark:bg-neutral-800 dark:text-neutral-300"
                            >
                                {customer?.name
                                    ? customer.name
                                        .charAt(0)
                                        .toUpperCase()
                                    : (
                                        <UilUser
                                            size={32}
                                        />
                                    )}
                            </Avatar>

                            <div className="min-w-0">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {customer?.name || '-'}
                                    </h1>

                                    <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"/>

                                        {t(
                                            'customer.status.activeNow',
                                            'نشط'
                                        )}

                                    </span>

                                </div>

                                <div className="mt-2 flex flex-wrap items-center gap-3">

                                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-400 dark:text-neutral-500">

                                        <UilShieldCheck
                                            size={14}
                                        />

                                        {t(
                                            'customer.verification.verified',
                                            'موثق'
                                        )}

                                    </span>

                                    {customer?.id && (

                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCopyId(
                                                    customer.id
                                                )
                                            }
                                            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-medium text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-white"
                                        >

                                            <span>
                                                ID
                                            </span>

                                            <span className="max-w-[140px] truncate">
                                                {customer.id}
                                            </span>

                                            {copiedId ? (
                                                <UilCheck
                                                    size={14}
                                                    className="text-emerald-500"
                                                />
                                            ) : (
                                                <UilCopy
                                                    size={14}
                                                />
                                            )}

                                        </button>

                                    )}

                                </div>

                            </div>

                        </div>

                        {/* WhatsApp */}

                        {whatsappUrl && (

                            <a
                                href={whatsappUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold !text-white transition hover:bg-emerald-500"
                            >

                                <UilWhatsapp
                                    size={19}
                                />

                                <span>
                                    {t(
                                        'common.whatsapp',
                                        'واتساب'
                                    )}
                                </span>

                                <UilExternalLinkAlt
                                    size={14}
                                    className="opacity-70"
                                />

                            </a>

                        )}

                    </div>

                </section>

                {/*
                |--------------------------------------------------------------------------
                | Customer Information
                |--------------------------------------------------------------------------
                |
                */}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

                    {/* Phone */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex items-start justify-between">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                <UilCalling
                                    size={19}
                                />

                            </div>

                            {customer?.mobile && (

                                <button
                                    type="button"
                                    onClick={() =>
                                        handleCopyPhone(
                                            `${customer?.mobile_code || ''}${customer.mobile}`
                                        )
                                    }
                                    className="rounded-lg bg-slate-50 p-2 text-slate-400 transition hover:text-slate-700 dark:bg-neutral-800 dark:hover:text-white"
                                >

                                    {copiedPhone ? (
                                        <UilCheck
                                            size={15}
                                            className="text-emerald-500"
                                        />
                                    ) : (
                                        <UilCopy
                                            size={15}
                                        />
                                    )}

                                </button>

                            )}

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.inputs.mobile',
                                    'رقم الجوال'
                                )}
                            </span>

                            <p
                                dir="ltr"
                                className="mt-1 font-mono text-base font-bold text-slate-900 dark:text-white"
                            >
                                {customer?.mobile
                                    ? `${customer?.mobile_code || ''} ${customer.mobile}`
                                    : '-'}
                            </p>

                        </div>

                    </section>

                    {/* Email */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

                            <UilAt
                                size={19}
                            />

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.inputs.email',
                                    'البريد الإلكتروني'
                                )}
                            </span>

                            {customer?.email ? (
                                <p
                                    dir="ltr"
                                    className="mt-1 truncate text-sm font-bold text-slate-900 dark:text-white"
                                    title={customer.email}
                                >
                                    {customer.email}
                                </p>
                            ) : (
                                <p className="mt-1 text-sm font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'common.notAvailable',
                                        'غير متوفر'
                                    )}
                                </p>
                            )}

                        </div>

                    </section>

                    {/* Source */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                            <UilStore
                                size={19}
                            />

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.meta.source',
                                    'المصدر'
                                )}
                            </span>

                            <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                                {t(
                                    'customer.source.sallaApp',
                                    'سلة'
                                )}
                            </p>

                        </div>

                    </section>

                    {/* Sync */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex items-center justify-between">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                <UilSync
                                    size={19}
                                />

                            </div>

                            <span className="h-2 w-2 rounded-full bg-emerald-500"/>

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.meta.syncStatus',
                                    'حالة المزامنة'
                                )}
                            </span>

                            <p className="mt-1 text-base font-bold text-emerald-600 dark:text-emerald-400">
                                {t(
                                    'customer.sync.connected',
                                    'متصل'
                                )}
                            </p>

                        </div>

                    </section>

                    {/* Verification */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                            <UilShieldCheck
                                size={19}
                            />

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.meta.verification',
                                    'حالة التحقق'
                                )}
                            </span>

                            <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                                {t(
                                    'customer.verification.verified',
                                    'موثق'
                                )}
                            </p>

                        </div>

                    </section>

                    {/* Customer Status */}

                    <section className="rounded-2xl border border-slate-200/80 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                            <UilCheckCircle
                                size={19}
                            />

                        </div>

                        <div className="mt-5">

                            <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.info.title',
                                    'حالة العميل'
                                )}
                            </span>

                            <p className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                                {t(
                                    'customer.sync.status',
                                    'متزامن'
                                )}
                            </p>

                        </div>

                    </section>

                </div>

                {/*
                |--------------------------------------------------------------------------
                | Customer History
                |--------------------------------------------------------------------------
                |
                */}

                <section className="rounded-2xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                            <UilHistory
                                size={19}
                            />

                        </div>

                        <div>

                            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                                {t(
                                    'customer.history.title',
                                    'السجل الزمني'
                                )}
                            </h2>

                            <p className="mt-0.5 text-[11px] text-slate-400 dark:text-neutral-500">
                                {t(
                                    'customer.history.description',
                                    'تواريخ إنشاء وتحديث بيانات العميل'
                                )}
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">

                        {/* Created */}

                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                            <div className="flex items-center gap-3">

                                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>

                                <div>

                                    <span className="block text-xs font-medium text-slate-500 dark:text-neutral-400">
                                        {t(
                                            'customer.inputs.createdAt',
                                            'تاريخ الإنشاء'
                                        )}
                                    </span>

                                    <span className="mt-1 block font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {customer?.created_at
                                            ? formatDate(customer.created_at, true)
                                            : '-'}
                                    </span>

                                </div>

                            </div>

                            <UilCalendarAlt
                                size={18}
                                className="text-slate-400 dark:text-neutral-500"
                            />

                        </div>

                        {/* Updated */}

                        <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                            <div className="flex items-center gap-3">

                                <span className="h-2.5 w-2.5 rounded-full bg-indigo-500"/>

                                <div>

                                    <span className="block text-xs font-medium text-slate-500 dark:text-neutral-400">
                                        {t(
                                            'customer.inputs.updatedAt',
                                            'آخر تحديث'
                                        )}
                                    </span>

                                    <span className="mt-1 block font-mono text-sm font-bold text-slate-800 dark:text-slate-200">
                                        {customer?.updated_at
                                            ? formatDate(customer.updated_at, true)
                                            : '-'}
                                    </span>

                                </div>

                            </div>

                            <UilClock
                                size={18}
                                className="text-slate-400 dark:text-neutral-500"
                            />

                        </div>

                    </div>

                </section>

            </div>

        </div>
    )
}