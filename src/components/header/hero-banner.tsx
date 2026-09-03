import {
    Store,
    Globe,
    ExternalLink,
    RefreshCw,
    ShieldCheck,
    Sparkles,
    Calendar,
    CreditCard,
    Coins,
    Mail,
} from 'lucide-react'

import {formatDate} from '@/utils/helpers'
import {useTranslation} from 'react-i18next'
import {Image} from 'antd'

/*
|--------------------------------------------------------------------------
| @component HeroBanner
|--------------------------------------------------------------------------
|
| Responsive tenant hero banner.
| Supports Light and Dark modes without shadows.
|
*/

export function HeroBanner({tenant, onSync}: any) {

    /*
    |--------------------------------------------------------------------------
    | Hooks
    |--------------------------------------------------------------------------
    |
    */

    const {t, i18n} = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Data
    |--------------------------------------------------------------------------
    |
    */

    const activeAccount = tenant?.accounts?.[0]

    const metadata = activeAccount?.metadata

    const storeAvatar = metadata?.avatar

    const storeDomain =
        activeAccount?.domain ||
        metadata?.domain

    const planType = metadata?.plan

    const currency = metadata?.currency

    const isStoreActive =
        activeAccount?.status?.[0]?.value === 'active' ||
        metadata?.status === 'active'

    const storeName =
        tenant?.name ||
        metadata?.name

    const cleanDomain = storeDomain
        ? storeDomain.replace(/^https?:\/\//, '')
        : ''

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    |
    */

    return (
        <section className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-5 text-slate-900 transition-colors duration-300 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-100 sm:rounded-[2.25rem] sm:p-7 lg:p-8">

            {/* ---------------------------------------------------------------- */}
            {/* Background */}
            {/* ---------------------------------------------------------------- */}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 dark:from-neutral-950 dark:via-neutral-950 dark:to-neutral-900"/>

            {/* ---------------------------------------------------------------- */}
            {/* Content */}
            {/* ---------------------------------------------------------------- */}

            <div className="relative z-10 space-y-7">

                {/* ---------------------------------------------------------------- */}
                {/* Header */}
                {/* ---------------------------------------------------------------- */}

                <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">

                    {/* Store Information */}

                    <div className="flex min-w-0 items-center gap-4 sm:gap-5">

                        {/* Logo */}

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-900 sm:h-[72px] sm:w-[72px]">

                            {storeAvatar ? (

                                <Image
                                    src={storeAvatar}
                                    alt={storeName}
                                    className="h-full w-full object-cover"
                                />

                            ) : (

                                <Store className="size-7 text-slate-400 dark:text-neutral-500 sm:size-8"/>

                            )}

                        </div>

                        {/* Store Details */}

                        <div className="min-w-0 space-y-2">

                            <div className="flex flex-wrap items-center gap-2">

                                {isStoreActive && (

                                    <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-400">

                                        <span className="size-1.5 rounded-full bg-emerald-500"/>

                                        {t('tenant.live_active')}

                                    </span>

                                )}

                                {activeAccount?.external_id && (

                                    <span className="inline-flex max-w-[180px] items-center gap-1.5 truncate rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] text-slate-500 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-400 sm:text-xs">

                                        <ShieldCheck className="size-3 shrink-0 text-slate-400 dark:text-neutral-500"/>

                                        ID: {activeAccount.external_id}

                                    </span>

                                )}

                            </div>

                            <div className="flex items-center gap-2">

                                <h1 className="truncate text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100 sm:text-2xl lg:text-3xl">

                                    {storeName || t('tenant.your_store')}

                                </h1>

                                <Sparkles className="size-4 shrink-0 text-amber-500 sm:size-5"/>

                            </div>

                            {cleanDomain && (

                                <p className="flex items-center gap-1.5 truncate text-xs text-slate-500 dark:text-neutral-400 sm:text-sm">

                                    <Globe className="size-3.5 shrink-0 text-slate-400 dark:text-neutral-500"/>

                                    {cleanDomain}

                                </p>

                            )}

                        </div>

                    </div>

                    {/* Actions */}

                    <div className="flex w-full items-center gap-2.5 lg:w-auto">

                        {cleanDomain && (

                            <a
                                href={storeDomain}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950 dark:text-slate-200 dark:hover:bg-neutral-900 sm:flex-none sm:px-5 sm:text-sm"
                            >

                                <Globe className="size-4 text-slate-500 dark:text-neutral-400"/>

                                <span>
                                    {t('tenant.visit_store')}
                                </span>

                                <ExternalLink className="size-3.5 text-slate-400 dark:text-neutral-500"/>

                            </a>

                        )}

                        <button
                            type="button"
                            onClick={onSync}
                            className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 text-xs font-semibold text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-200 sm:flex-none sm:text-sm"
                        >

                            <RefreshCw className="size-4"/>

                            <span>
                                {t('tenant.sync_salla')}
                            </span>

                        </button>

                    </div>

                </div>

                {/* ---------------------------------------------------------------- */}
                {/* Divider */}
                {/* ---------------------------------------------------------------- */}

                <div className="h-px bg-slate-100 dark:bg-neutral-800"/>

                {/* ---------------------------------------------------------------- */}
                {/* Information Cards */}
                {/* ---------------------------------------------------------------- */}

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">

                    {/* Activation Date */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-slate-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <span className="mb-1 block text-[11px] font-medium text-slate-500 dark:text-neutral-400 sm:text-xs">

                                    {t('tenant.activation_date')}

                                </span>

                                <span className="block truncate text-sm font-bold text-slate-900 dark:text-slate-100 sm:text-base">

                                    {formatDate(
                                        tenant?.activated_at,
                                        false,
                                        i18n.language,
                                    ) || t('tenant.not_available')}

                                </span>

                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400">

                                <Calendar className="size-5"/>

                            </div>

                        </div>

                    </div>

                    {/* Subscription */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-slate-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <span className="mb-1 block text-[11px] font-medium text-slate-500 dark:text-neutral-400 sm:text-xs">

                                    {t('tenant.subscription')}

                                </span>

                                <span className="block truncate text-sm font-bold uppercase tracking-wide text-amber-600 dark:text-amber-400 sm:text-base">

                                    {planType
                                        ? t(`tenant.${planType}`)
                                        : t('tenant.not_specified')}

                                </span>

                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-amber-100 bg-amber-50 text-amber-600 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400">

                                <CreditCard className="size-5"/>

                            </div>

                        </div>

                    </div>

                    {/* Currency */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-slate-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <span className="mb-1 block text-[11px] font-medium text-slate-500 dark:text-neutral-400 sm:text-xs">

                                    {t('tenant.currency')}

                                </span>

                                <span className="block truncate text-sm font-bold tracking-wide text-emerald-600 dark:text-emerald-400 sm:text-base">

                                    {currency
                                        ? t(`tenant.${currency}`)
                                        : t('tenant.not_available')}

                                </span>

                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-emerald-100 bg-emerald-50 text-emerald-600 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-400">

                                <Coins className="size-5"/>

                            </div>

                        </div>

                    </div>

                    {/* Email */}

                    <div className="group rounded-2xl border border-slate-200 bg-white p-4 transition-colors duration-200 hover:border-slate-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-neutral-700">

                        <div className="flex items-center justify-between gap-3">

                            <div className="min-w-0">

                                <span className="mb-1 block text-[11px] font-medium text-slate-500 dark:text-neutral-400 sm:text-xs">

                                    {t('tenant.email_address')}

                                </span>

                                <span
                                    className="block truncate text-sm font-bold text-slate-800 dark:text-slate-200"
                                    title={tenant?.email}
                                >

                                    {tenant?.email || t('tenant.not_available')}

                                </span>

                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-100 bg-indigo-50 text-indigo-600 dark:border-indigo-900/50 dark:bg-indigo-950/40 dark:text-indigo-400">

                                <Mail className="size-5"/>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}