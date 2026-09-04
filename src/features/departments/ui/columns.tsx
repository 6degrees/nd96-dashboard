import {  Tag, Tooltip } from 'antd'
import { UilEdit, UilBan, UilCheckCircle, UilTrashAlt } from '@iconscout/react-unicons'
import { formatDate } from '@/utils/formatDate'
import {TFunction} from "i18next";

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
| Defines the Product table columns mapped directly to ProductResource.
| Read-only view with disabled actions.
|
*/
export const Columns = ({ onEdit, onDelete, onStatusChange, t}: ColumnsProps) => [
    {
        title: t('department.inputs.name_ar'),
        dataIndex: 'name_ar',
        align: 'center',
    },
    {
        title: t('department.inputs.name_en'),
        dataIndex: 'name_en',
        align: 'center',
    },
    {
        title: t('department.inputs.status'),
        dataIndex: 'is_active',
        align: 'center',
        render: (v: boolean) => (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Tag color={v ? 'green' : 'red'} style={{ margin: 0 }}>
                    {v ? t('common.active') : t('common.inactive')}
                </Tag>
            </div>
        ),
    },
    {
        title: t('department.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',

        render: (date: string) => formatDate(date, true),
    },
    {
        title: t('department.inputs.activatedAt'),
        dataIndex: 'created_at',
        align: 'center',

        render: (date: string) => formatDate(date, true),
    },

    {
        title: t('common.actions'),
        align: 'center',

        render: (_: any, record: any) => (
            <div className="flex justify-center gap-2">
                <Tooltip title={t('common.edit')}>
                    <button
                        onClick={() => onEdit?.(record)}
                        className="p-2 hover:bg-blue-50 rounded-lg">
                        <UilEdit size="18" />
                    </button>
                </Tooltip>

                <Tooltip title={record.is_active ? t('common.inactive') : t('common.active')}>
                    <button
                        onClick={() => onStatusChange?.(record)}
                        className="p-2 hover:bg-amber-50 rounded-lg">
                        {
                            record.is_active
                                ? <UilBan size="18" />
                                : <UilCheckCircle size="18" />
                        }
                    </button>
                </Tooltip>

                <Tooltip title={t('common.delete')}>
                    <button onClick={() => onDelete?.(record)}
                            className="p-2 hover:bg-red-50 rounded-lg">
                        <UilTrashAlt size="18" />
                    </button>
                </Tooltip>

            </div>
        ),
    },
]