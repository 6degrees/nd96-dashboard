import { DropdownFormItemProps } from '@/types/dropdown-form-item-props'
import { DropdownFormItem as DefaultDropdownFormItem } from '@/components/inputs'
import { StaffDropdown, RoleDropdown } from '@/features/staffs/ui/dropdowns'

/*
|--------------------------------------------------------------------------|
| DropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const StaffDropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={StaffDropdown} />
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