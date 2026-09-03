import {AsyncSelect} from '@/components/async-select'
import {useTranslation} from 'react-i18next'
import {api} from '@/redux/branch'
import {DropdownProps} from '@/types/dropdown-props'

/*
|--------------------------------------------------------------------------
| Dropdown
|--------------------------------------------------------------------------
|
| Wrapper component for async select.
| Handles:
|
| - API action
| - Translation labels
| - Country option formatting
|
*/
export const Dropdown = ({value, onChange, placeholder, isMulti = false,}: DropdownProps) => {
    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    */
    const {t} = useTranslation()

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