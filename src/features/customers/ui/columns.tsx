import { Tag, Tooltip } from 'antd'
import { UilEye, UilTrashAlt } from '@iconscout/react-unicons'
import { TFunction } from 'i18next'
import {formatDate, formatPhoneNumber} from '@/utils/formatDate'

/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

interface ColumnsProps {
    onView?: (record: any) => void
    onDelete?: (record: any) => void
    t: TFunction
}

/*
|--------------------------------------------------------------------------
| Table Columns
|--------------------------------------------------------------------------
|
| Defines the Customer table columns mapped directly to CustomerResource.
|
*/

export const Columns = ({ onView, onDelete, t }: ColumnsProps) => [
    {
        title: t('customer.inputs.name'),
        dataIndex: 'name',
        align: 'center',
        render: (name: string) => (
            <span className="font-semibold text-slate-800">
                {name || '-'}
            </span>
        ),
    },
    {
        title: t('customer.inputs.email'),
        dataIndex: 'email',
        align: 'center',
        render: (email: string) => (
            email ? (
                <span className="font-mono text-slate-600">
                    {email}
                </span>
            ) : (
                '-'
            )
        ),
    },
    {
        title: t('customer.inputs.phone'),
        align: 'center',
        render: (_: any, record: any) => (
            <span dir='ltr'>
                {record.mobile_code} {record.mobile}
            </span>
        ),
    },
    {
        title: t('customer.inputs.createdAt'),
        dataIndex: 'created_at',
        align: 'center',
        render: (date: string) => (
            <span className="text-xs text-slate-500">
                {formatDate(date) || '-'}
            </span>
        ),
    },
    {
        title: t('customer.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => (
            <span className="text-xs text-slate-500">
                {formatDate(date) || '-'}
            </span>
        ),
    },
    {
        title: t('common.actions'),
        align: 'center',
        render: (_: any, record: any) => (
            <div className="flex justify-center gap-2">
                <Tooltip title={t('common.view')}>
                    <button
                        onClick={() => onView?.(record)}
                        className="rounded-lg p-2 hover:bg-blue-50"
                    >
                        <UilEye size={18} />
                    </button>
                </Tooltip>

                <Tooltip title={t('common.delete')}>
                    <button
                        disabled
                        onClick={() => onDelete?.(record)}
                        className="rounded-lg p-2 text-slate-400 cursor-not-allowed hover:bg-slate-100"
                    >
                        <UilTrashAlt size={18} />
                    </button>
                </Tooltip>
            </div>
        ),
    },
]