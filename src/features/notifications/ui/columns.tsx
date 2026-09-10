import {Tooltip} from 'antd'
import {UilTrashAlt, UilCheckCircle, UilClock, UilBell, UilExternalLinkAlt} from '@iconscout/react-unicons'
import {TFunction} from 'i18next'
import {formatDate} from '@/utils/formatDate'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface ColumnsProps {
    onDelete?: (record: any) => void
    t: TFunction
}

/*
|--------------------------------------------------------------------------
| Table Columns
|--------------------------------------------------------------------------
|
| Modern, minimalist notification columns configuration with an emerald theme.
|
*/

export const Columns = ({onDelete, t}: ColumnsProps) => [
    {
        title: t('notification.inputs.message'),
        dataIndex: 'message',
        key: 'message',
        align: 'right' as const,
        render: (message: string, record: any) => (
            <div className="flex items-center gap-3.5 py-3">
                <div className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl transition-all ${record.read_at ? 'bg-slate-100 text-slate-400' : 'bg-emerald-50 text-emerald-600'}`}>
                    <UilBell size={20}/>
                </div>
                <div className="flex flex-col text-right gap-0.5">
                    <span className={`text-sm tracking-wide dark:text-white ${record.read_at ? 'text-slate-500 font-normal' : 'text-slate-900 font-semibold'}`}>
                        {message || '-'}
                    </span>
                    <span className="text-[11px] text-slate-400 font-mono">
                        {record.id || '-'}
                    </span>
                </div>
            </div>
        ),
    },
    {
        title: t('notification.inputs.url'),
        dataIndex: 'url',
        key: 'url',
        align: 'center' as const,
        width: 150,
        render: (url: string) => (
            url ? (
                <a href={`/dashboard/${url}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 dark:!text-white transition-all">
                    <span>{t('common.view')}</span>
                    <UilExternalLinkAlt size={14}/>
                </a>
            ) : (
                <span className="text-slate-300 font-medium">-</span>
            )
        ),
    },
    {
        title: t('notification.inputs.readAt'),
        dataIndex: 'read_at',
        key: 'read_at',
        align: 'center' as const,
        width: 190,
        render: (date: string) => (
            date ? (
                <Tooltip title={formatDate(date)}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-600 border border-emerald-100">
                        <UilCheckCircle size={14} className="text-emerald-500"/>
                        <span>{t('notification.read')}</span>
                    </span>
                </Tooltip>
            ) : (
                <Tooltip title={t('notification.unread')}>
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-600 border border-amber-100">
                        <UilClock size={14} className="text-amber-500"/>
                        <span>{t('notification.unread')}</span>
                    </span>
                </Tooltip>
            )
        ),
    },
    {
        title: t('notification.inputs.createdAt'),
        dataIndex: 'created_at',
        key: 'created_at',
        align: 'center' as const,
        width: 160,
        render: (date: string) => (
            <span className="text-xs text-slate-500 dark:!text-white font-medium">
                {formatDate(date) || '-'}
            </span>
        ),
    },
    {
        title: t('common.actions'),
        key: 'actions',
        align: 'center' as const,
        width: 90,
        render: (_: any, record: any) => (
            <div className="flex items-center justify-center">
                <Tooltip title={t('common.delete')}>
                    <button
                        onClick={() => onDelete?.(record)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-all">
                        <UilTrashAlt size={16}/>
                    </button>
                </Tooltip>
            </div>
        ),
    },
]