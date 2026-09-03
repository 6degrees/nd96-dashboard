import {Tag, Tooltip} from 'antd'
import { UilEye, UilTrashAlt } from '@iconscout/react-unicons'
import { TFunction } from 'i18next'
import { formatDate } from '@/utils/formatDate'

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
| Defines the tenant table columns.
|
| Features:
| - Localized column titles
| - Status badge
| - Date formatting
| - Row actions
|
*/

export const Columns = ({onView, onDelete, t}: ColumnsProps) => [
    {
        title: t('tenant.inputs.name'),
        dataIndex: 'name',
        align: 'center',
    },
    {
        title: t('tenant.inputs.status'),
        dataIndex: 'activated_at',
        align: 'center',
        render: (value: string | null) => (
            <div className="flex justify-center">
                <Tag color={value ? 'green' : 'red'}>
                    {value
                        ? t('common.active')
                        : t('common.inactive')}
                </Tag>
            </div>
        ),
    },
    {
        title: t('tenant.inputs.country'),
        dataIndex: 'country',
        align: 'center',
        render: (value: any | null) => value?.label || '-',
    },
    {
        title: t('tenant.inputs.region'),
        dataIndex: 'region',
        align: 'center',
        render: (value: any | null) => value?.label || '-',
    },
    {
        title: t('tenant.inputs.city'),
        dataIndex: 'city',
        align: 'center',
        render: (value: any | null) => value?.label || '-',
    },
    {
        title: t('tenant.inputs.phone'),
        dataIndex: 'phone',
        align: 'center',
        render: (value: string | null) => <span dir="ltr">{value}</span>
    },
    {
        title: t('tenant.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => formatDate(date),
    },
    {
        title: t('tenant.inputs.createdAt'),
        dataIndex: 'created_at',
        align: 'center',
        render: (date: string) => formatDate(date),
    },
    {
        title: t('common.actions'),
        align: 'center',

        /*
        |--------------------------------------------------------------------------
        | Actions
        |--------------------------------------------------------------------------
        |
        | Available actions:
        | - Edit
        | - Activate / Disable
        | - Delete
        |
        */
        render: (_: any, record: any) => (
            <div className="flex justify-center gap-2">
                <Tooltip title={t('common.view')}>
                    <button
                        onClick={() => onView?.(record)}
                        className="rounded-lg p-2 hover:bg-blue-50"
                        title={t('common.details')}>
                        <UilEye size={18} />
                    </button>
                </Tooltip>

                <Tooltip title={t('common.delete')}>
                    <button
                        onClick={() => onDelete?.(record)}
                        disabled
                        className="rounded-lg p-2 text-slate-400 cursor-not-allowed hover:bg-slate-100"
                        title={t('common.delete')}>
                        <UilTrashAlt size={18} />
                    </button>
                </Tooltip>
            </div>
        ),
    },
]