import { AsyncSelect } from '@/components/async-select'
import { useTranslation } from 'react-i18next'
import { api } from '@/redux/user'
import { DropdownProps } from '@/types/dropdown-props'

/*
|--------------------------------------------------------------------------
| User Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for countries async select.
| Handles:
|
| - User API action
| - Translation labels
|
*/
export const UserDropdown = ({ value, onChange, placeholder, isMulti = false, }: DropdownProps) => {
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