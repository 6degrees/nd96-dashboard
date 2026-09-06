import { Tag, Tooltip } from 'antd'
import {Pencil, Eye, Ban, CheckCircle2, Trash2, ListTree} from 'lucide-react'
import { formatDate } from '@/utils/formatDate'
import { TFunction } from 'i18next'

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
| Table Columns
|--------------------------------------------------------------------------
|
| Defines the timelines table columns.
|
*/

export const Columns = ({ onView, onEdit, onDelete, onStatusChange, t }: ColumnsProps) => [
    {
        title: t('timeline.inputs.name_ar'),
        dataIndex: 'name_ar',
        align: 'center',
    },
    {
        title: t('timeline.inputs.name_en'),
        dataIndex: 'name_en',
        align: 'center',
    },
    {
        title: t('timeline.inputs.sortOrder'),
        dataIndex: 'sort_order',
        align: 'center',
        render: (v: number) => (
            <div className="flex justify-center">
                <Tag color="gold" className="m-0">
                    {v}
                </Tag>
            </div>
        ),
    },
    {
        title: t('timeline.inputs.status'),
        dataIndex: 'is_active',
        align: 'center',
        render: (v: boolean) => (
            <div className="flex justify-center">
                <Tag color={v ? 'green' : 'red'} className="m-0">
                    {v ? t('common.active') : t('common.inactive')}
                </Tag>
            </div>
        ),
    },
    {
        title: t('timeline.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => formatDate(date, true),
    },
    {
        title: t('timeline.inputs.activatedAt'),
        dataIndex: 'activated_at',
        align: 'center',
        render: (date: string) => formatDate(date, true),
    },
    {
        title: t('common.actions'),
        align: 'center',
        render: (_: any, record: any) => (
            <div className="flex justify-center gap-1.5">
                {/* Edit */}
                <Tooltip title={t('common.edit')}>
                    <button
                        type="button"
                        onClick={() => onEdit?.(record)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-brand-blue/10 hover:text-brand-blue active:scale-95"
                    >
                        <Pencil size={17} strokeWidth={2} />
                    </button>
                </Tooltip>

                {/* View */}
                <Tooltip title={t('common.details')}>
                    <button
                        type="button"
                        onClick={() => onView?.(record)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-brand-blue/10 hover:text-brand-blue active:scale-95">
                        <ListTree size={17} strokeWidth={2}/>
                    </button>
                </Tooltip>

                {/* Activate / Deactivate */}

                <Tooltip title={record.is_active ? t('common.disable') : t('common.activate')}>
                    <button
                        type="button"
                        onClick={() => onStatusChange?.(record)}
                        className={`flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200 active:scale-95 ${
                            record.is_active
                                ? 'text-text-secondary hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-500/10 dark:hover:text-amber-400'
                                : 'text-text-secondary hover:bg-brand-green/10 hover:text-brand-green'
                        }`}
                    >
                        {record.is_active ? (
                            <Ban size={17} strokeWidth={2} />
                        ) : (
                            <CheckCircle2 size={18} strokeWidth={2} />
                        )}
                    </button>
                </Tooltip>

                {/* Delete */}

                <Tooltip title={t('common.delete')}>
                    <button
                        type="button"
                        onClick={() => onDelete?.(record)}
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-text-secondary transition-all duration-200 hover:bg-red-50 hover:text-red-600 active:scale-95 dark:hover:bg-red-500/10 dark:hover:text-red-400"
                    >
                        <Trash2 size={17} strokeWidth={2} />
                    </button>
                </Tooltip>

            </div>
        ),
    },
]