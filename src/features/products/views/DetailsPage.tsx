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
import {Image, Tag} from 'antd'
import {useTranslation} from 'react-i18next'

import {
    UilArrowLeft,
    UilBill,
    UilCalendarAlt,
    UilCheck,
    UilCheckCircle,
    UilClock,
    UilCopy,
    UilInfoCircle,
    UilPercentage,
    UilReceiptAlt,
    UilTagAlt,
    UilTimesCircle,
} from '@iconscout/react-unicons'

import {formatDate} from '@/utils/formatDate'
import {api} from '../api'
import PageActions from '@/components/page-action'
import {toast} from '@/lib/toast/toast'

/*
|--------------------------------------------------------------------------
| Details Page
|--------------------------------------------------------------------------
|
*/

export default function DetailsPage() {

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

    const [copied, setCopied] = useState(false)

    /*
    |--------------------------------------------------------------------------
    | Redux State
    |--------------------------------------------------------------------------
    |
    */

    const {
        productData,
        loading,
    } = useSelector((state: any) => {

        const productState =
            state.product || {}

        return {
            productData:
            productState.current,
            loading:
            productState.loading,
        }
    })

    /*
    |--------------------------------------------------------------------------
    | Product Data
    |--------------------------------------------------------------------------
    |
    */

    const product = useMemo(() => {

        if (!productData) {
            return null
        }

        return 'data' in productData
            ? productData.data || null
            : productData

    }, [productData])

    /*
    |--------------------------------------------------------------------------
    | Fetch Product
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

    const actions: any = useMemo(() => [
        {
            label: 'common.back',
            onClick: () => router.back(),
        },
    ], [router])

    /*
    |--------------------------------------------------------------------------
    | Copy SKU
    |--------------------------------------------------------------------------
    |
    */

    const handleCopySku = (
        sku?: string
    ) => {

        if (!sku) {
            return
        }

        navigator.clipboard.writeText(sku)

        setCopied(true)

        toast.success({
            message: t(
                'common.copied'
            ),
        })

        setTimeout(() => {
            setCopied(false)
        }, 2000)
    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    |
    */

    if (loading || !product) {

        return (
            <div className="min-h-screen bg-slate-50 p-4 dark:bg-neutral-950 sm:p-8">

                <div className="animate-pulse space-y-6">

                    {/* Page Header */}

                    <div className="h-16 rounded-2xl bg-slate-200 dark:bg-neutral-900"/>

                    {/* Product Header */}

                    <div className="rounded-3xl border border-slate-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                            <div className="h-28 w-28 shrink-0 rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                            <div className="flex-1 space-y-4">

                                <div className="h-6 w-48 rounded-lg bg-slate-200 dark:bg-neutral-800"/>

                                <div className="h-4 w-72 rounded bg-slate-100 dark:bg-neutral-800"/>

                                <div className="h-5 w-24 rounded-full bg-slate-200 dark:bg-neutral-800"/>

                            </div>

                            <div className="h-20 w-36 rounded-2xl bg-slate-200 dark:bg-neutral-800"/>

                        </div>

                    </div>

                    {/* Content */}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                        <div className="h-72 rounded-3xl bg-slate-200 dark:bg-neutral-900"/>

                        <div className="h-72 rounded-3xl bg-slate-200 dark:bg-neutral-900 lg:col-span-2"/>

                    </div>

                    {/* Prices */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

                        {Array.from({
                            length: 3
                        }).map((_, index) => (
                            <div
                                key={index}
                                className="h-32 rounded-2xl bg-slate-200 dark:bg-neutral-900"
                            />
                        ))}

                    </div>

                    {/* Timeline */}

                    <div className="h-36 rounded-3xl bg-slate-200 dark:bg-neutral-900"/>

                </div>

            </div>
        )
    }

    /*
    |--------------------------------------------------------------------------
    | Product Status
    |--------------------------------------------------------------------------
    |
    */

    const isActive =
        Boolean(product?.activated_at)

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <div className="min-h-screen bg-slate-50 p-4 transition-colors duration-200 dark:bg-neutral-950 sm:p-8">

            <div className="space-y-6">

                {/*

                |--------------------------------------------------------------------------
                | Page Header
                |--------------------------------------------------------------------------
                |
                */}

                <PageActions
                    title={
                        product?.name ||
                        t('product.title')
                    }
                    actions={actions}
                />

                {/*

                |--------------------------------------------------------------------------
                | Product Header
                |--------------------------------------------------------------------------
                |
                */}

                <section className="rounded-3xl border border-slate-200/80 bg-white dark:border-neutral-800 dark:bg-neutral-900">

                    <div className="flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">

                        <div className="flex min-w-0 items-center gap-5">

                            {/* Product Image */}

                            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950">

                                <Image
                                    src={
                                        product?.thumbnail ||
                                        '/images/placeholder.png'
                                    }
                                    alt={
                                        product?.name ||
                                        ''
                                    }
                                    fallback="/images/placeholder.png"
                                    preview
                                    className="h-full w-full object-contain"
                                />

                            </div>

                            {/* Product Identity */}

                            <div className="min-w-0">

                                <div className="flex flex-wrap items-center gap-3">

                                    <h1 className="truncate text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                                        {product?.name || '-'}
                                    </h1>

                                    <Tag
                                        color={
                                            isActive
                                                ? 'green'
                                                : 'red'
                                        }
                                        className="m-0 rounded-lg border-0 px-2.5 py-1 text-xs font-bold"
                                    >
                                        {isActive
                                            ? t(
                                                'common.active'
                                            )
                                            : t(
                                                'common.inactive'
                                            )}
                                    </Tag>

                                </div>

                                {product?.name_en && (
                                    <p className="mt-1 text-sm text-slate-400 dark:text-neutral-500">
                                        {product.name_en}
                                    </p>
                                )}

                                <div className="mt-3 flex flex-wrap items-center gap-4">

                                    {product?.sku && (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                handleCopySku(
                                                    product.sku
                                                )
                                            }
                                            className="flex items-center gap-2 rounded-lg bg-slate-50 px-2.5 py-1.5 font-mono text-xs font-semibold text-slate-500 transition hover:bg-slate-100 hover:text-indigo-600 dark:bg-neutral-950 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-indigo-400"
                                        >

                                            <UilTagAlt
                                                size={14}
                                            />

                                            <span>
                                                {product.sku}
                                            </span>

                                            {copied ? (
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

                                    <span className="text-xs text-slate-400 dark:text-neutral-500">
                                        {t(
                                            'product.inputs.sku'
                                        )}
                                    </span>

                                </div>

                            </div>

                        </div>

                        {/* Main Price */}

                        <div className="shrink-0 border-t border-slate-100 pt-5 sm:border-s-1 sm:border-t-0 sm:ps-7 sm:pt-0 dark:border-neutral-800">

                            <span className="block text-xs font-medium text-slate-400 dark:text-neutral-500">
                                {t(
                                    'product.inputs.price'
                                )}
                            </span>

                            <div className="mt-1 flex items-baseline gap-2">

                                <span className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                                    {product?.price?.amount ?? 0}
                                </span>

                                <span className="text-sm font-semibold text-slate-400 dark:text-neutral-500">
                                    {product?.price?.currency ||
                                        'SAR'}
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

                {/*

                |--------------------------------------------------------------------------
                | Main Information
                |--------------------------------------------------------------------------
                |
                */}

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

                    {/* Description */}

                    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                <UilInfoCircle
                                    size={19}
                                />

                            </div>

                            <div>

                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                                    {t(
                                        'product.inputs.description'
                                    )}
                                </h2>

                                <p className="mt-0.5 text-[11px] text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.descriptionLabel',
                                        'وصف المنتج'
                                    )}
                                </p>

                            </div>

                        </div>

                        <p className="mt-5 whitespace-pre-wrap break-words text-sm leading-7 text-slate-600 dark:text-neutral-300">
                            {product?.description || '-'}
                        </p>

                    </section>

                    {/* Product Information */}

                    <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900 lg:col-span-2">

                        <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                                <UilReceiptAlt
                                    size={19}
                                />

                            </div>

                            <div>

                                <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                                    {t(
                                        'product.details.title',
                                        'معلومات المنتج'
                                    )}
                                </h2>

                                <p className="mt-0.5 text-[11px] text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.details.description',
                                        'تفاصيل المنتج والأسعار'
                                    )}
                                </p>

                            </div>

                        </div>

                        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">

                            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                                <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.inputs.pre_tax_price'
                                    )}
                                </span>

                                <div className="mt-2 flex items-baseline gap-2">

                                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                                        {product?.pre_tax_price?.amount ?? 0}
                                    </span>

                                    <span className="text-xs font-semibold text-slate-400">
                                        {product?.pre_tax_price?.currency ||
                                            'SAR'}
                                    </span>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                                <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.inputs.tax'
                                    )}
                                </span>

                                <div className="mt-2 flex items-baseline gap-2">

                                    <span className="font-mono text-xl font-bold text-slate-900 dark:text-white">
                                        {product?.tax?.amount ?? 0}
                                    </span>

                                    <span className="text-xs font-semibold text-slate-400">
                                        {product?.tax?.currency ||
                                            'SAR'}
                                    </span>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-4 dark:border-emerald-900/40 dark:bg-emerald-950/20 sm:col-span-2">

                                <div className="flex items-center justify-between">

                                    <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
                                        {t(
                                            'product.inputs.taxed_price'
                                        )}
                                    </span>

                                    <UilCheckCircle
                                        size={18}
                                        className="text-emerald-500"
                                    />

                                </div>

                                <div className="mt-2 flex items-baseline gap-2">

                                    <span className="font-mono text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                                        {product?.taxed_price?.amount ?? 0}
                                    </span>

                                    <span className="text-xs font-semibold text-emerald-600/70 dark:text-emerald-400/70">
                                        {product?.taxed_price?.currency ||
                                            'SAR'}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </section>

                </div>

                {/*

                |--------------------------------------------------------------------------
                | Timeline
                |--------------------------------------------------------------------------
                |
                */}

                <section className="rounded-3xl border border-slate-200/80 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">

                    <div className="flex items-center gap-3 border-b border-slate-100 pb-4 dark:border-neutral-800">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600 dark:bg-neutral-800 dark:text-neutral-300">

                            <UilCalendarAlt
                                size={19}
                            />

                        </div>

                        <div>

                            <h2 className="text-sm font-bold text-slate-900 dark:text-white">
                                {t(
                                    'common.timeline'
                                )}
                            </h2>

                            <p className="mt-0.5 text-[11px] text-slate-400 dark:text-neutral-500">
                                {t(
                                    'product.timelineDescription',
                                    'تواريخ إنشاء وتفعيل وتحديث المنتج'
                                )}
                            </p>

                        </div>

                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-3">

                        {/* Activated */}

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">

                                <UilCheckCircle
                                    size={18}
                                />

                            </div>

                            <div className="min-w-0">

                                <span className="block text-[11px] font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.inputs.activatedAt'
                                    )}
                                </span>

                                <span className="mt-1 block truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {formatDate(
                                        product?.activated_at
                                    )}
                                </span>

                            </div>

                        </div>

                        {/* Created */}

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">

                                <UilCalendarAlt
                                    size={18}
                                />

                            </div>

                            <div className="min-w-0">

                                <span className="block text-[11px] font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.inputs.createdAt'
                                    )}
                                </span>

                                <span className="mt-1 block truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {formatDate(
                                        product?.created_at
                                    )}
                                </span>

                            </div>

                        </div>

                        {/* Updated */}

                        <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-slate-50/70 p-4 dark:border-neutral-800 dark:bg-neutral-950">

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">

                                <UilClock
                                    size={18}
                                />

                            </div>

                            <div className="min-w-0">

                                <span className="block text-[11px] font-medium text-slate-400 dark:text-neutral-500">
                                    {t(
                                        'product.inputs.updatedAt'
                                    )}
                                </span>

                                <span className="mt-1 block truncate text-xs font-bold text-slate-800 dark:text-slate-200">
                                    {formatDate(
                                        product?.updated_at
                                    )}
                                </span>

                            </div>

                        </div>

                    </div>

                </section>

            </div>

        </div>
    )
}