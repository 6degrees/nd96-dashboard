import {Tag, Tooltip} from 'antd'
import {UilTrashAlt, UilBuilding, UilStore, UilUserCheck, UilCheckCircle} from '@iconscout/react-unicons'
import {TFunction} from 'i18next'
import {useRouter} from 'next/router'
import {formatDate} from '@/utils/formatDate'

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
| Defines the invitation table columns mapped strictly to the API response.
|
*/
export const Columns = ({onDelete, t}: ColumnsProps) => {
    const router = useRouter()

    return [
        {
            title: t('invitation.inputs.invitedBy'),
            dataIndex: 'invited_by',
            align: 'center',
            render: (invitedBy: string, record: any) => {
                const isTenant = record?.type === 'tenant'
                const isBranch = record?.type === 'branch'

                return (
                    <div className="flex items-center justify-center gap-1.5 font-medium text-slate-700">
                        {isTenant && <UilBuilding size="16" className="text-slate-400" />}
                        {isBranch && <UilStore size="16" className="text-slate-400" />}
                        {!isTenant && !isBranch && <UilUserCheck size="16" className="text-slate-400" />}
                        <span>{invitedBy || '-'}</span>
                    </div>
                )
            },
        },
        {
            title: t('invitation.inputs.email'),
            dataIndex: 'email',
            align: 'center',
            render: (email: string) => (
                <span className="font-mono text-sm text-slate-800">{email}</span>
            ),
        },
        {
            title: t('invitation.inputs.role'),
            dataIndex: 'role',
            align: 'center',
            render: (role: { label: string; value: string }) => {
                let tagColor = 'blue'
                switch (role?.value?.toLowerCase()) {
                    case 'admin':
                        tagColor = 'red'
                        break
                    case 'owner':
                        tagColor = 'gold'
                        break
                    case 'employee':
                        tagColor = 'cyan'
                        break
                    default:
                        tagColor = 'geekblue'
                }
                return (
                    <div className="flex justify-center">
                        <Tag color={tagColor} className="font-medium">
                            {role?.label || role?.value || '-'}
                        </Tag>
                    </div>
                )
            },
        },
        {
            title: t('invitation.inputs.status'),
            dataIndex: 'status',
            align: 'center',
            render: (_: any, record: any) => {
                const isAccepted = !!record?.accepted_at
                const isExpired = new Date(record?.expires_at) < new Date() && !isAccepted

                if (isAccepted) {
                    return <Tag color="success">{t('invitation.status.accepted')}</Tag>
                }
                if (isExpired) {
                    return <Tag color="error">{t('invitation.status.expired')}</Tag>
                }
                return <Tag color="processing">{t('invitation.status.pending')}</Tag>
            },
        },
        {
            title: t('invitation.inputs.expiresAt'),
            dataIndex: 'expires_at',
            align: 'center',
            render: (date: string) => (
                <span className="text-xs text-slate-500">
                    {formatDate(date) || '-'}
                </span>
            ),
        },
        {
            title: t('invitation.inputs.createdAt'),
            dataIndex: 'created_at',
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
            render: (_: any, record: any) => {
                const isAccepted = !!record?.accepted_at
                const isExpired = new Date(record?.expires_at) < new Date() && !isAccepted
                const isPending = !isAccepted && !isExpired

                return (
                    <div className="flex justify-center gap-2">
                        {isPending && record?.token && (
                            <Tooltip title={t('invitation.accept.title', 'Accept Invitation')}>
                                <button onClick={() => router.push(`/auth/accept?token=${record.token}`)}
                                    className="rounded-lg p-2 text-emerald-600 transition-colors hover:bg-emerald-50">
                                    <UilCheckCircle size="18" />
                                </button>
                            </Tooltip>
                        )}

                        <Tooltip title={t('common.delete')}>
                            <button
                                onClick={() => onDelete?.(record)}
                                className="rounded-lg p-2 text-rose-600 transition-colors hover:bg-rose-50">
                                <UilTrashAlt size="18" />
                            </button>
                        </Tooltip>
                    </div>
                )
            },
        },
    ]
}