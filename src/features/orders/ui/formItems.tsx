import { DropdownFormItemProps } from '@/types/dropdown-form-item-props'
import { DropdownFormItem as DefaultDropdownFormItem } from '@/components/inputs'
import { OrderDropdown, StatusDropdown } from '@/features/orders/ui/dropdowns'

/*
|--------------------------------------------------------------------------|
| OrderDropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const OrderDropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={OrderDropdown} />
    )
}


/*
|--------------------------------------------------------------------------|
| DropdownFormItem Component
|--------------------------------------------------------------------------|
*/
export const StatusDropdownFormItem = ({ name, label, placeholder, rules = [], isMulti = false, }: DropdownFormItemProps) => {
    /*
    |--------------------------------------------------------------------------|
    | Render Component
    |--------------------------------------------------------------------------|
    */
    return (
        <DefaultDropdownFormItem name={name} label={label} placeholder={placeholder} rules={rules} isMulti={isMulti} component={StatusDropdown} />
    )
}