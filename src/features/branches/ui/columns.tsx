import {Tooltip} from 'antd'
import {UilEye} from '@iconscout/react-unicons'
import {TFunction} from 'i18next'
import {formatDate} from '@/utils/formatDate'
import {AlertTriangle, CheckCircle2, Star, Clock, Store} from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface ColumnsProps {
    onView?: (record: any) => void
    onEdit?: (record: any) => void
    onDelete?: (record: any) => void
    onStatusChange?: (record: any) => void
    t: TFunction
}

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

const formatCurrency = (value: number) => {
    return `${Number(value || 0).toLocaleString('en-US')} ر.س`
}

/*
|--------------------------------------------------------------------------
| Table Columns
|--------------------------------------------------------------------------
*/

export const Columns = ({onView, t}: ColumnsProps) => [
    {
        title: t('branch.inputs.name'),
        dataIndex: 'name',
        align: 'right',
        render: (value: string, record: any) => (
            <div className="flex items-center gap-3.5 py-1 min-w-[200px]">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 text-blue-600 dark:from-blue-500/20 dark:to-indigo-500/20 dark:text-blue-400 font-bold shadow-sm border border-blue-100/50 dark:border-blue-950/50">
                    {value?.charAt(0) || <Store className="w-5 h-5" />}
                </div>
                <div className="flex flex-col">
                    <span className="font-bold text-slate-800 dark:text-neutral-100 text-sm tracking-tight">
                        {value || '-'}
                    </span>
                    <span className="text-xs font-medium text-slate-400 dark:text-neutral-500 mt-0.5">
                        {record.city?.label || '-'}
                    </span>
                </div>
            </div>
        ),
    },

    {
        title: t('branch.inputs.status'),
        dataIndex: 'activated_at',
        align: 'center',
        render: (value: string | null) => (
            <div className="inline-flex items-center">
                <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold shadow-2xs transition-colors ${
                        value
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200/60 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900/50'
                            : 'bg-slate-100 text-slate-600 border border-slate-200/60 dark:bg-neutral-800/80 dark:text-neutral-400 dark:border-neutral-700'
                    }`}
                >
                    <span
                        className={`h-2 w-2 rounded-full ${
                            value ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'
                        }`}
                    />
                    {value ? t('common.active') : t('common.inactive')}
                </span>
            </div>
        ),
    },

    {
        title: t('branch.stats.orders'),
        dataIndex: 'orders_count',
        align: 'center',
        render: (value: number) => (
            <div className="flex flex-col items-center">
                <span className="text-sm font-bold text-slate-800 dark:text-neutral-100">
                    {Number(value || 0).toLocaleString()}
                </span>
                <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider mt-0.5">
                    {t('branch.stats.orders')}
                </span>
            </div>
        ),
    },

    {
        title: t('branch.stats.deliveredOrders'),
        dataIndex: 'delivered_orders_count',
        align: 'center',
        render: (value: number, record: any) => {
            const delivered = Number(value || 0)
            const orders = Number(record.orders_count || 0)
            const percentage = orders > 0 ? Math.round((delivered / orders) * 100) : 0

            return (
                <div className="flex flex-col items-center min-w-[100px]">
                    <div className="flex items-center gap-1.5 bg-emerald-50/60 dark:bg-emerald-950/20 px-2.5 py-0.5 rounded-lg border border-emerald-100 dark:border-emerald-900/30">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0"/>
                        <span className="font-bold text-emerald-700 dark:text-emerald-400 text-xs">
                            {delivered}
                        </span>
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 mt-1">
                        {t('dashboard.completed_orders_label')} {percentage}%
                    </span>
                </div>
            )
        },
    },

    {
        title: t('branch.stats.lateOrders'),
        dataIndex: 'late_orders',
        align: 'center',
        render: (value: number) => {
            const lateOrders = Number(value || 0)

            if (lateOrders === 0) {
                return (
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-emerald-50/40 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400 text-xs font-medium">
                        <CheckCircle2 className="h-3.5 w-3.5"/>
                        <span>{t('branch.stats.noDelays')}</span>
                    </div>
                )
            }

            return (
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xl bg-rose-50 text-rose-700 border border-rose-100 dark:bg-rose-950/30 dark:text-rose-400 dark:border-rose-900/40">
                    <AlertTriangle className="h-4 w-4 shrink-0"/>
                    <div className="flex flex-col text-right">
                        <span className="font-bold text-xs leading-none">{lateOrders}</span>
                        <span className="text-[9px] opacity-80 mt-0.5">{t('branch.stats.delayed')}</span>
                    </div>
                </div>
            )
        },
    },

    {
        title: t('branch.stats.sales'),
        dataIndex: 'sales',
        align: 'center',
        render: (value: number) => (
            <div className="flex flex-col items-center min-w-[120px]">
                <span className="text-sm font-extrabold text-slate-900 dark:text-neutral-100 tracking-tight">
                    {formatCurrency(value)}
                </span>
                <span className="text-[10px] font-medium text-slate-400 mt-0.5">
                    {t('branch.stats.totalSales')}
                </span>
            </div>
        ),
    },

    {
        title: t('branch.stats.rating'),
        dataIndex: 'average_rating',
        align: 'center',
        render: (value: number) => {
            const rating = Number(value || 0)
            return (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-amber-50/80 border border-amber-200/50 dark:bg-amber-950/20 dark:border-amber-900/30">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400"/>
                    <span className="font-bold text-xs text-slate-800 dark:text-neutral-100">
                        {rating.toFixed(1)}
                    </span>
                    <span className="text-[10px] text-amber-600/70 dark:text-amber-400/70 font-medium">
                        /5
                    </span>
                </div>
            )
        },
    },

    {
        title: t('branch.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-neutral-400">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="whitespace-nowrap font-medium">
                    {date ? formatDate(date) : '-'}
                </span>
            </div>
        ),
    },

    {
        title: t('common.actions'),
        align: 'center',
        render: (_: any, record: any) => (
            <div className="flex justify-center">
                <Tooltip title={t('common.details')}>
                    <button
                        onClick={() => onView?.(record)}
                        className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 border border-slate-200/80 text-slate-600 transition-all duration-200 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 hover:shadow-sm dark:bg-neutral-800/60 dark:border-neutral-700 dark:text-neutral-300 dark:hover:border-blue-700 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                    >
                        <UilEye size={17}/>
                    </button>
                </Tooltip>
            </div>
        ),
    },
]