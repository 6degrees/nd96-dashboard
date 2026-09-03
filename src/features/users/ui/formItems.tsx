import { DropdownFormItemProps } from '@/types/dropdown-form-item-props'
import { DropdownFormItem as DefaultDropdownFormItem } from '@/components/inputs'
import { UserDropdown, RoleDropdown } from '@/features/users/ui/dropdowns'

/*
|--------------------------------------------------------------------------|
| DropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const UserDropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={UserDropdown} />
    )
}


/*
|--------------------------------------------------------------------------|
| DropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const RoleDropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={RoleDropdown} />
    )
}