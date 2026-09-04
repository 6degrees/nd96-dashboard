import type { ActionButton, ActionsProps } from '@/types/action-button'

/*
|--------------------------------------------------------------------------
| Header Actions
|--------------------------------------------------------------------------
|
| milestones page actions.
|
*/
export const Actions = ({ onCreate }: ActionsProps): ActionButton[] => [
    {
        label: 'milestone.create',
        type: 'primary',
        onClick: onCreate,
    },
]