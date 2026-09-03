/*
|--------------------------------------------------------------------------
| Imports
|--------------------------------------------------------------------------
|
*/
import Swal from 'sweetalert2'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
interface Props {

    /*
    |--------------------------------------------------------------------------
    | Modal Title
    |--------------------------------------------------------------------------
    |
    */
    title: string

    /*
    |--------------------------------------------------------------------------
    | Modal Description
    |--------------------------------------------------------------------------
    |
    */
    text: string

    /*
    |--------------------------------------------------------------------------
    | Modal Icon
    |--------------------------------------------------------------------------
    |
    */
    icon?: 'warning' | 'success' | 'error' | 'info' | 'question'

    /*
    |--------------------------------------------------------------------------
    | Confirm Button Text
    |--------------------------------------------------------------------------
    |
    */
    confirmButtonText?: string

    /*
    |--------------------------------------------------------------------------
    | Cancel Button Text
    |--------------------------------------------------------------------------
    |
    */
    cancelButtonText?: string

    /*
    |--------------------------------------------------------------------------
    | Confirm Button Color
    |--------------------------------------------------------------------------
    |
    */
    confirmButtonColor?: string

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
| Confirm Modal
|--------------------------------------------------------------------------
|
| Global reusable confirmation modal.
|
| Used for:
| - delete
| - activate
| - disable
| - logout
| - destructive actions
|
*/
export const ConfirmModal = async ({ title, text, icon = 'warning', confirmButtonText = 'Confirm', cancelButtonText = 'Cancel', confirmButtonColor = 'bg-red-500 hover:bg-red-600', onConfirm, }: Props) => {
    /*
    |--------------------------------------------------------------------------
    | Open Modal
    |--------------------------------------------------------------------------
    |
    */
    const result = await Swal.fire({

        title,

        text,

        icon,

        showCancelButton: true,

        confirmButtonText,

        cancelButtonText,

        reverseButtons: true,

        cancelButtonColor: '#d1d5db',

        background: '#ffffff',

        customClass: {
            popup: 'rounded-[28px] shadow-2xl',
            title: 'text-lg text-gray-900',
            htmlContainer: 'text-base text-gray-500',
            confirmButton: `${confirmButtonColor} text-white rounded-2xl px-6 py-3 mx-2`,
            cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl px-6 py-3 mx-2',
        },

        buttonsStyling: false,
    })

    /*
    |--------------------------------------------------------------------------
    | Confirm Action
    |--------------------------------------------------------------------------
    |
    */
    if (result.isConfirmed) {
        onConfirm()
    }
}