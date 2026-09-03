/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import i18n from 'i18next'
import { ConfirmModal } from '@/components/modals/ConfirmActionModal'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
interface Props {

    /*
    |--------------------------------------------------------------------------
    | Entity Name
    |--------------------------------------------------------------------------
    |
    */
    entity?: string

    /*
    |--------------------------------------------------------------------------
    | Confirm Callback
    |--------------------------------------------------------------------------
    |
    */
    onConfirm: () => void
}

/*
|--------------------------------------------------------------------------
| Confirm Delete Modal
|--------------------------------------------------------------------------
|
| Reusable delete confirmation modal.
|
*/
export const ConfirmDeleteModal = ({ entity = 'common.item', onConfirm }: Props) => {
    /*
    |--------------------------------------------------------------------------
    | Open Confirm Modal
    |--------------------------------------------------------------------------
    |
    */
    void ConfirmModal({
        title: i18n.t('common.confirmDeleteTitle', {entity: i18n.t(entity),}),
        text: i18n.t('common.confirmDeleteMessage', {entity: i18n.t(entity),}),
        icon: 'warning',
        confirmButtonText: i18n.t('common.delete'),
        cancelButtonText: i18n.t('common.cancel'),
        confirmButtonColor: 'bg-red-500 hover:bg-red-600',
        onConfirm,
    })
}