import { Tag, Tooltip } from 'antd'
import {
    Pencil,
    Ban,
    CheckCircle2,
    Trash2,
} from 'lucide-react'

import { formatDate } from '@/utils/formatDate'
import { TFunction } from 'i18next'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface ColumnsProps {
    onEdit?: (record: any) => void
    onDelete?: (record: any) => void
    onStatusChange?: (record: any) => void
    t: TFunction
}

/*
|--------------------------------------------------------------------------
| Table Columns
|--------------------------------------------------------------------------
|
| Defines the messages table columns.
|
*/

export const Columns = ({onDelete, onStatusChange, t,}: ColumnsProps) => [
    /*
    |--------------------------------------------------------------------------
    | Name
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.name'),
        dataIndex: 'name',
        align: 'center',
        render: (name: string) => (
            <span>{name || '-'}</span>
        ),
    },

    /*
    |--------------------------------------------------------------------------
    | Message
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.message'),
        dataIndex: 'message',
        align: 'center',
        render: (message: string) => (
            <div className="mx-auto max-w-md truncate">
                {message || '-'}
            </div>
        ),
    },

    /*
    |--------------------------------------------------------------------------
    | Department
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.department'),
        dataIndex: 'department',
        align: 'center',
        render: (department: any) => (
            <span>{department?.name || '-'}</span>
        ),
    },

    /*
    |--------------------------------------------------------------------------
    | Status
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.status'),
        dataIndex: 'activated_at',
        align: 'center',
        render: (activatedAt: string | null) => (
            <div className="flex justify-center">
                <Tag color={activatedAt ? 'green' : 'red'} className="m-0">
                    {activatedAt ? t('common.active') : t('common.inactive')}
                </Tag>
            </div>
        ),
    },

    /*
    |--------------------------------------------------------------------------
    | Updated At
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => formatDate(date, true),
    },

    /*
    |--------------------------------------------------------------------------
    | Activated At
    |--------------------------------------------------------------------------
    */

    {
        title: t('message.inputs.activatedAt'),
        dataIndex: 'activated_at',
        align: 'center',
        render: (date: string | null) => date ? formatDate(date, true) : '-',
    },

    /*
    |--------------------------------------------------------------------------
    | Actions
    |--------------------------------------------------------------------------
    */

    {
        title: t('common.actions'),
        align: 'center',

        render: (_: any, record: any) => (
            <div className="flex justify-center gap-1.5">

                {/* Activate / Deactivate */}
                <Tooltip title={record.activated_at ? t('common.disable') : t('common.activate')}>
                    <button type="button" onClick={() => onStatusChange?.(record)} className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 active:scale-95 ${record.activated_at ? 'text-text-secondary hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400' : 'text-text-secondary hover:bg-brand-green/10 hover:text-brand-green'}`}>
                        {record.activated_at ? (
                            <Ban size={17} strokeWidth={2} />
                        ) : (
                            <CheckCircle2 size={18} strokeWidth={2} />
                        )}
                    </button>
                </Tooltip>

                {/* Delete */}

                <Tooltip title={t('common.delete')}>
                    <button type="button" onClick={() => onDelete?.(record)} className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:hover:bg-red-500/10 dark:hover:text-red-400">
                        <Trash2 size={17} strokeWidth={2} />
                    </button>
                </Tooltip>

            </div>
        ),
    },
]