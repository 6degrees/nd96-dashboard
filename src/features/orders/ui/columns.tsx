import { Tag, Tooltip, Avatar } from 'antd'
import { UilEye } from '@iconscout/react-unicons'
import { TFunction } from 'i18next'
import { formatDate } from '@/utils/formatDate'
import { statusColor } from '@/utils/helpers'
import { AlertTriangle, CheckCircle2, Clock, Timer } from 'lucide-react'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface ColumnsProps {
    onView?: (record: any) => void
    onEdit?: (record: any) => void
    onStatusChange?: (record: any) => void
    t: TFunction
}

/*
|--------------------------------------------------------------------------
| Table Columns
|--------------------------------------------------------------------------
*/

export const Columns = ({ onView, t }: ColumnsProps) => [
    {
        title: t('order.inputs.number'),
        dataIndex: 'number',
        key: 'number',
        align: 'center',
        render: (value: string) => (
            <div className="flex justify-center">
                <span className="font-semibold text-slate-700">#{value}</span>
            </div>
        ),
    },
    {
        title: t('order.inputs.branch'),
        dataIndex: 'branch',
        key: 'branch',
        align: 'center',
        render: (value: any) => (
            <span className="text-slate-600 font-medium">{value?.label || '-'}</span>
        ),
    },
    {
        title: t('order.inputs.customer'),
        dataIndex: 'customer',
        key: 'customer',
        align: 'center',
        render: (customer: any) => (
            <div className="flex flex-col items-center">
                <span className="font-medium text-slate-800">{customer?.label || '-'}</span>
                {customer?.mobile && (
                    <span className="text-xs text-slate-500" dir="ltr">
                        {customer?.mobile_code} {customer?.mobile}
                    </span>
                )}
            </div>
        ),
    },
    {
        title: t('order.inputs.items'),
        dataIndex: 'items',
        key: 'items',
        align: 'center',
        render: (items: any[]) => (
            <div className="flex items-center justify-center -space-x-2 overflow-hidden rtl:space-x-reverse">
                {items?.slice(0, 3).map((item, index) => (
                    <Tooltip key={item.id || index} title={`${item.name} (${item.quantity})`}>
                        <Avatar
                            src={item.product?.thumbnail}
                            shape="square"
                            size="small"
                            className="border border-white shadow-sm"
                        >
                            {item.name?.[0]}
                        </Avatar>
                    </Tooltip>
                ))}
                {items?.length > 3 && (
                    <span className="text-xs text-slate-500 font-medium mr-1">
                        +{items.length - 3}
                    </span>
                )}
            </div>
        ),
    },
    {
        title: t('order.inputs.status'),
        dataIndex: 'status',
        key: 'status',
        align: 'center',
        render: (value: any) => (
            <div className="flex justify-center">
                <Tag color={statusColor(value?.value)} className="px-2.5 py-0.5 rounded-md">
                    {value?.label || '-'}
                </Tag>
            </div>
        ),
    },
    {
        title: t('order.inputs.preparation_due_at'),
        dataIndex: 'preparation_due_at',
        key: 'preparation_due_at',
        align: 'center',
        render: (time: string) => (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-600">
                <Timer className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                <span className="whitespace-nowrap font-medium">
                    {time ? formatDate(time, true) : '-'}
                </span>
            </div>
        ),
    },
    {
        title: t('order.inputs.is_late'),
        dataIndex: 'is_late',
        key: 'is_late',
        align: 'center',
        render: (isLate: boolean) => (
            <div className="inline-flex items-center justify-center">
                {isLate ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-rose-50 text-rose-700 border border-rose-200/60">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                        {t('branch.stats.delayed')}
                    </span>
                ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                        {t('branch.stats.noDelays')}
                    </span>
                )}
            </div>
        ),
    },
    {
        title: t('order.inputs.total'),
        dataIndex: 'total',
        key: 'total',
        align: 'center',
        render: (value: any, record: any) => (
            <span className="font-semibold text-slate-900">
                {value} <span className="text-xs text-slate-500 font-normal">{record?.currency || 'SAR'}</span>
            </span>
        ),
    },
    {
        title: t('order.inputs.createdAt'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center',
        render: (date: string) => (
            <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="whitespace-nowrap font-medium">
                    {date ? formatDate(date) : '-'}
                </span>
            </div>
        ),
    },
    {
        title: t('common.actions'),
        key: 'actions',
        align: 'center',
        render: (_: any, record: any) => (
            <div className="flex justify-center gap-1">
                <Tooltip title={t('common.view')}>
                    <button
                        onClick={() => onView?.(record)}
                        className="rounded-lg p-1.5 text-blue-600 hover:bg-blue-50 transition-colors">
                        <UilEye size={18} />
                    </button>
                </Tooltip>
            </div>
        ),
    },
]