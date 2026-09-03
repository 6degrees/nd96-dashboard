import { DropdownFormItemProps } from '@/types/dropdown-form-item-props'
import { DropdownFormItem as DefaultDropdownFormItem } from '@/components/inputs'
import { Dropdown } from '@/features/tenants/ui/dropdowns'

/*
|--------------------------------------------------------------------------|
| DropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const DropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={Dropdown} />
    )
}