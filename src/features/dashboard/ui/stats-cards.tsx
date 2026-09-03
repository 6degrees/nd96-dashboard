import React from 'react'
import { useTranslation } from 'react-i18next'
import { Store, ShoppingBag, Users, CheckCircle2, Clock, Package, Star, BellRing } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/
interface StatsCardsProps {
    stats: any
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Dashboard Stats Cards
|--------------------------------------------------------------------------
|
| Displays top-level key metrics (Active Branches, Users, Pickup Orders, Synced Products)
| with coverage and growth indicators, fully supporting Dark Mode.
|
*/
export function StatsCards({ stats, loading }: StatsCardsProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Translations
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Helper to get notification count by value
    |--------------------------------------------------------------------------
    */
    const getNotificationCount = (value: string) => {
        if (!stats?.notifications || !Array.isArray(stats.notifications)) return 0
        const found = stats.notifications.find((n: any) => n.value === value)
        return found ? found.count : 0
    }

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    */
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 font-ar">
            {/*
            |--------------------------------------------------------------------------
            | 1. Active Branches Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-neutral-700/60">
                {/* Card Header & Icon */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.branches')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-100/50 dark:border-indigo-900/40">
                        <Store className="h-6 w-6" />
                    </div>
                </div>

                {/* Counter & Metric Badge */}
                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.branches ?? 0)}
                    </h2>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.active_branches_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 2. Users Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-neutral-700/60">
                {/* Card Header & Icon */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.users')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 border border-violet-100/50 dark:border-violet-900/40">
                        <Users className="h-6 w-6" />
                    </div>
                </div>

                {/* Counter */}
                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.users ?? 0)}
                    </h2>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {stats?.users_label || t('dashboard.users_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 3. Pickup Orders Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-neutral-700/60">
                {/* Card Header & Icon */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.orders')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/40">
                        <ShoppingBag className="h-6 w-6" />
                    </div>
                </div>

                {/* Counter & Growth Indicator */}
                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.orders?.today ?? 0)}
                    </h2>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.pickup_orders_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 4. Ready Orders Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-neutral-700/60">
                {/* Card Header & Icon */}
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.ready')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/40">
                        <CheckCircle2 className="h-6 w-6" />
                    </div>
                </div>

                {/* Counter & Source Platform */}
                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.orders?.ready ?? 0)}
                    </h2>
                </div>

                {/* Subtitle / Description */}
                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.ready_orders_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 5. Late Orders Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-rose-200/50 dark:border-rose-900/40 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-rose-700/60">
                <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-rose-500 dark:text-rose-400">
                    {t('dashboard.stats.delayed')}
                </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-100/50 dark:border-rose-900/40">
                        <Clock className="h-6 w-6" />
                    </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-rose-600 dark:text-rose-500">
                        {loading ? '...' : (stats?.orders?.late ?? 0)}
                    </h2>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.delayed_orders_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 6. Completed Orders Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-neutral-200/60 dark:border-neutral-800/60 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-neutral-700/60">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.completed')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-100/50 dark:border-emerald-900/40">
                        <Package className="h-6 w-6" />
                    </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.orders?.completed ?? 0)}
                    </h2>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.completed_orders_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 7. Rating Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-amber-200/50 dark:border-amber-900/40 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-amber-700/60">
                <div className="flex items-center justify-between">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                            {t('dashboard.stats.rating')}
                        </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 border border-amber-100/50 dark:border-amber-900/40">
                        <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
                    </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : (stats?.rating ?? 0)}
                    </h2>
                    <span className="text-xs font-medium text-slate-400 dark:text-neutral-500">/ 5.0</span>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.rating_label')}
                </p>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | 8. Sent Notifications Card
            |--------------------------------------------------------------------------
            */}
            <div className="relative overflow-hidden rounded-3xl bg-white/80 dark:bg-neutral-950/80 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] border border-sky-200/50 dark:border-sky-900/40 backdrop-blur-md transition-all hover:shadow-md dark:hover:border-sky-700/60">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-neutral-500">
                        {t('dashboard.stats.sent_notifications', 'الرسائل المرسلة')}
                    </span>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400 border border-sky-100/50 dark:border-sky-900/40">
                        <BellRing className="h-6 w-6" />
                    </div>
                </div>

                <div className="mt-4 flex items-baseline gap-2">
                    <h2 className="text-3xl font-extrabold text-slate-900 dark:text-neutral-100">
                        {loading ? '...' : getNotificationCount('sent')}
                    </h2>
                </div>

                <p className="mt-2 text-xs text-slate-500 dark:text-neutral-400">
                    {t('dashboard.sent_notifications_label', 'الإشعارات التي تم إرسالها بنجاح')}
                </p>
            </div>
        </div>
    )
}