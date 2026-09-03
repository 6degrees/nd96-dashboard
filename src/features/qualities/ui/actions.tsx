import type { ActionButton, ActionsProps } from '@/types/action-button'

/*
|--------------------------------------------------------------------------
| Header Actions
|--------------------------------------------------------------------------
|
| Supervisors page actions.
|
*/
export const Actions = ({ onCreate }: ActionsProps): ActionButton[] => [
    {
        label: 'quality.create',
        type: 'primary',
        onClick: onCreate,
    },
]