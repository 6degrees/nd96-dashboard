import { Rule } from 'antd/es/form'

/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
|
*/
export interface DropdownFormItemProps {
    name: string
    label: string
    placeholder?: string
    rules?: Rule[]
    isMulti?: boolean
    component?: React.ElementType
    componentProps?: any
}