import { Image, Tag, Tooltip } from 'antd'
import {UilEye, UilTrashAlt} from '@iconscout/react-unicons'
import { TFunction } from 'i18next'
import { formatDate } from '@/utils/formatDate'

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
| Defines the Product table columns mapped directly to ProductResource.
| Read-only view with disabled actions.
|
*/

export const Columns = ({onView, onDelete, t }: ColumnsProps) => [
    {
        title: t('product.inputs.thumbnail'),
        dataIndex: 'thumbnail',
        align: 'center',
        render: (url: string) => (
            <div className="flex justify-center">
                <Image
                    src={url || '/images/placeholder.png'}
                    alt="product-thumbnail"
                    width={42}
                    height={42}
                    className="rounded-lg object-cover border border-slate-200"
                    fallback="/images/placeholder.png"
                />
            </div>
        ),
    },
    {
        title: t('product.inputs.name'),
        dataIndex: 'name',
        align: 'center',
        render: (name: string, record: any) => (
            <div className="flex flex-col items-center">
                <span className="font-semibold text-slate-800">{name || '-'}</span>
                {record?.name_en && (
                    <span className="text-xs text-slate-400 font-mono">{record.name_en}</span>
                )}
            </div>
        ),
    },
    {
        title: t('product.inputs.sku'),
        dataIndex: 'sku',
        align: 'center',
        render: (sku: string) => (
            <div className="flex justify-center">
                <Tag color="cyan" className="font-mono font-medium">
                    {sku || '-'}
                </Tag>
            </div>
        ),
    },
    {
        title: t('product.inputs.price'),
        dataIndex: 'price',
        align: 'center',
        render: (price: { amount: number; currency: string }) => (
            <Tag color="blue" className="font-bold">
                {price?.amount ?? 0} {price?.currency ?? ''}
            </Tag>
        ),
    },
    {
        title: t('product.inputs.taxed_price'),
        dataIndex: 'taxed_price',
        align: 'center',
        render: (taxedPrice: { amount: number; currency: string }) => (
            <span className="font-semibold text-slate-700">
                {taxedPrice?.amount ?? 0} {taxedPrice?.currency ?? ''}
            </span>
        ),
    },
    {
        title: t('product.inputs.tax'),
        dataIndex: 'tax',
        align: 'center',
        render: (tax: { amount: number; currency: string }) => (
            <span className="text-xs text-slate-500">
                {tax?.amount ?? 0} {tax?.currency ?? ''}
            </span>
        ),
    },
    {
        title: t('product.inputs.createdAt'),
        dataIndex: 'created_at',
        align: 'center',
        render: (date: string) => (
            <span className="text-xs text-slate-500">{formatDate(date) || '-'}</span>
        ),
    },
    {
        title: t('product.inputs.updatedAt'),
        dataIndex: 'updated_at',
        align: 'center',
        render: (date: string) => (
            <span className="text-xs text-slate-500">{formatDate(date) || '-'}</span>
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
                        title={t('common.details')}>
                        <UilEye size={18} />
                    </button>
                </Tooltip>

                <Tooltip title={t('common.delete')}>
                    <button
                        onClick={() => onDelete?.(record)}
                        disabled={true}
                        className="rounded-lg p-2 text-slate-400 cursor-not-allowed hover:bg-slate-100">
                        <UilTrashAlt size={18} />
                    </button>
                </Tooltip>
            </div>
        ),
    },
]