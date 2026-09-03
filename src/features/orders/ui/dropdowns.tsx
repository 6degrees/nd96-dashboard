import { AsyncSelect } from '@/components/async-select'
import { useTranslation } from 'react-i18next'
import { api } from '@/redux/order'
import { DropdownProps } from '@/types/dropdown-props'

/*
|--------------------------------------------------------------------------
| Order Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for countries async select.
| Handles:
|
| - Order API action
| - Translation labels
|
*/
export const OrderDropdown = ({ value, onChange, placeholder, isMulti = false, }: DropdownProps) => {
    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <AsyncSelect
            value={value}
            onChange={onChange}
            placeholder={placeholder ? t(placeholder) : undefined}
            action={api.fetch}
            isMulti={isMulti}
            labelKey={'name'}
            valueKey="id"
        />
    )
}


/*
|--------------------------------------------------------------------------
| Statuses Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for countries async select.
| Handles:
|
| - Statuses API action
| - Translation labels
|
*/
export const StatusDropdown = ({ value, onChange, placeholder, isMulti = false}: DropdownProps) => {
    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <AsyncSelect
            value={value}
            onChange={onChange}
            placeholder={placeholder ? t(placeholder) : undefined}
            action={api.getStatuses}
            isPaginated={false}
            isMulti={isMulti}
            labelKey={'label'}
            valueKey="value"
        />
    )
}