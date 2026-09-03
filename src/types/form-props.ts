/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/

export interface FormProps {
    onSubmit: (values: any) => void
    data?: any
    isEdit?: boolean
}