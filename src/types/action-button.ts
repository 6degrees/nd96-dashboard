/*
|--------------------------------------------------------------------------
| Types
|--------------------------------------------------------------------------
*/

export interface ActionButton {
    label: string
    href?: string
    onClick?: () => void
    icon?: React.ReactNode
    type?: 'primary' | 'default' | 'dashed' | 'danger'
    className?: string
}

export interface PageActionsProps {
    actions: ActionButton[]
    title?: string
}

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
export interface ActionsProps {
    onCreate: () => void
    onRefresh: () => void
}