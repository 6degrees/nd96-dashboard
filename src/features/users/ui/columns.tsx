import {Tag} from 'antd'
import {UilTrashAlt} from '@iconscout/react-unicons'
import { TFunction } from 'i18next'
import { formatDate } from '@/utils/formatDate'

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
| Defines the user table columns.
|
| Features:
| - Localized column titles
| - Status badge
| - Date formatting
| - Row actions
|
*/

export const Columns = ({onDelete, t}: ColumnsProps) => [
    {
        title: t('user.inputs.name'),
        align: 'center',
        render: (date: any) => date?.name,
    },
    {
        title: t('user.inputs.email'),
        align: 'center',
        render: (date: any) => date?.email,

    },
    {
        title: t('user.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => formatDate(date),
    },
    {
        title: t('user.inputs.createdAt'),
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
            <div className={`flex justify-center`}>
                <button onClick={() => onDelete?.(record)} >
                    <UilTrashAlt size={18} />
                </button>
            </div>
        ),
    },
]