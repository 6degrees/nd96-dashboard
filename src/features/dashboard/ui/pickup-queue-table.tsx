import React from 'react'
import { useTranslation } from 'react-i18next'
import { MapPin, Clock, CheckCircle2 } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types & Interfaces
|--------------------------------------------------------------------------
*/
interface PickupQueueTableProps {
    pickupQueue: any[]
    loading: boolean
}

/*
|--------------------------------------------------------------------------
| UI Component: Direct Pick-up Queue Table
|--------------------------------------------------------------------------
|
| Renders the latest incoming store pickup requests with order details,
| branch assignment, status, and creation time with Dark Mode support.
|
*/
export function PickupQueueTable({ pickupQueue, loading }: PickupQueueTableProps) {
    /*
    |--------------------------------------------------------------------------
    | Hooks & Translations
    |--------------------------------------------------------------------------
    */
    const { t } = useTranslation()

    return (
        <div className="rounded-3xl bg-white/80 dark:bg-neutral-950/80 border border-neutral-200/60 dark:border-neutral-800/60 p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.04)] backdrop-blur-md font-ar transition-colors duration-200">
            {/*
            |--------------------------------------------------------------------------
            | Table Header Section
            |--------------------------------------------------------------------------
            */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-neutral-100">
                        {t('dashboard.queue.title')}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-neutral-400 mt-0.5">
                        {t('dashboard.queue.subtitle')}
                    </p>
                </div>
            </div>

            {/*
            |--------------------------------------------------------------------------
            | Orders Table Section
            |--------------------------------------------------------------------------
            */}
            <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                    <thead>
                    <tr className="border-b border-neutral-100 dark:border-neutral-800/60 text-slate-400 dark:text-neutral-500 font-semibold uppercase">
                        <th className="pb-3 px-3 text-right">{t('dashboard.table.order_number')}</th>
                        <th className="pb-3 px-3 text-right">{t('dashboard.table.customer')}</th>
                        <th className="pb-3 px-3 text-right">{t('dashboard.table.branch')}</th>
                        <th className="pb-3 px-3 text-center">{t('dashboard.table.status')}</th>
                        <th className="pb-3 px-3 text-left">{t('dashboard.table.date')}</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800/60 text-slate-700 dark:text-neutral-300">
                    {loading ? (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-neutral-500">
                                {t('dashboard.loading')}
                            </td>
                        </tr>
                    ) : pickupQueue.length > 0 ? (
                        pickupQueue.map((row: any) => (
                            <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-neutral-900/50 transition-colors">
                                <td className="py-3.5 px-3 font-mono font-bold text-slate-900 dark:text-neutral-100">{row.order_number}</td>
                                <td className="py-3.5 px-3 font-medium">{row.customer_name}</td>
                                <td className="py-3.5 px-3">
                                        <span className="inline-flex items-center gap-1 text-slate-600 dark:text-neutral-400">
                                            <MapPin className="h-3 w-3 text-slate-400 dark:text-neutral-500" />
                                            {row.branch_name}
                                        </span>
                                </td>
                                <td className="py-3.5 px-3 text-center">
                                    {row.status === 'جاهز للاستلام' || row.status === 'Ready for Pickup' ? (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 dark:bg-amber-950/40 px-2.5 py-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/40">
                                                <Clock className="h-3 w-3" /> {row.status}
                                            </span>
                                    ) : (
                                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40">
                                                <CheckCircle2 className="h-3 w-3" /> {row.status}
                                            </span>
                                    )}
                                </td>
                                <td className="py-3.5 px-3 text-left text-slate-400 dark:text-neutral-500 font-mono text-[11px]">{row.created_at_human}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="py-8 text-center text-slate-400 dark:text-neutral-500">
                                {t('dashboard.no_orders')}
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}