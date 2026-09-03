import { AsyncSelect } from '@/components/async-select'
import { useTranslation } from 'react-i18next'
import { api } from '@/redux/staff'
import { DropdownProps } from '@/types/dropdown-props'

/*
|--------------------------------------------------------------------------
| Staff Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for countries async select.
| Handles:
|
| - Staff API action
| - Translation labels
|
*/
export const StaffDropdown = ({ value, onChange, placeholder, isMulti = false, }: DropdownProps) => {
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
| Role Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for countries async select.
| Handles:
|
| - Roles API action
| - Translation labels
|
*/
export const RoleDropdown = ({ value, onChange, placeholder, isMulti = false}: DropdownProps) => {
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
            action={api.getRoles}
            isPaginated={false}
            isMulti={isMulti}
            labelKey={'label'}
            valueKey="value"
        />
    )
}