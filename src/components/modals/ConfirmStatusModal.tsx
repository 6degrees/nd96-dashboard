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
    | Current Status
    |--------------------------------------------------------------------------
    |
    */
    isActive: boolean

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
| Confirm Status Modal
|--------------------------------------------------------------------------
|
| Reusable confirmation modal for:
| - activate
| - disable
|
*/
export const ConfirmStatusModal = ({ isActive, entity = 'common.item', onConfirm, }: Props) => {

    /*
    |--------------------------------------------------------------------------
    | Open Confirm Modal
    |--------------------------------------------------------------------------
    |
    */
    void ConfirmModal({
        title: isActive ? `${i18n.t('common.inactive')} ${i18n.t(entity)}` : `${i18n.t('common.active')} ${i18n.t(entity)}`,
        text: isActive ? i18n.t('common.confirmDisable', { entity: i18n.t(entity), },) : i18n.t('common.confirmActivate', { entity: i18n.t(entity), },),
        icon: isActive ? 'warning' : 'success',
        confirmButtonText: isActive ? i18n.t('common.inactive') : i18n.t('common.active'),
        confirmButtonColor: isActive ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600',
        onConfirm,
    })
}