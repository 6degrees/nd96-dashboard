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
        title: t('staff.inputs.name'),
        dataIndex: 'user',
        align: 'center',
        render: (date: any) => date?.name,
    },
    {
        title: t('staff.inputs.email'),
        dataIndex: 'user',
        align: 'center',
        render: (date: any) => date?.email,

    },
    {
        title: t('staff.inputs.role'),
        dataIndex: 'role',
        align: 'center',
        render: (value: { label: string, value: string }) => {
            let tagColor;
            switch (value?.value?.toLowerCase()) {
                case 'admin':
                    tagColor = 'red';
                    break;
                case 'owner':
                    tagColor = 'green';
                    break;
                default:
                    tagColor = 'gray';
            }
            return (
                <div className="flex justify-center">
                    <Tag color={tagColor}>{value?.label}</Tag>
                </div>
            );
        },
    },
    {
        title: t('staff.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => formatDate(date),
    },
    {
        title: t('staff.inputs.createdAt'),
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
                <button onClick={() => onDelete?.(record)} disabled={record.role.value === 'owner'} className={record.role.value === 'owner' ? 'rounded-lg p-2 hover:bg-red-50 cursor-not-allowed' : 'rounded-lg p-2 hover:bg-red-50 cursor-pointer'}>
                    <UilTrashAlt size={18} />
                </button>
            </div>
        ),
    },
]