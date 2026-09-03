import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'
import { Dropdown as BranchesDropdown } from '@/features/branches'
import { StatusDropdown } from '@/features/orders'

export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.number')}</label>
                <FilterTextFormItem value={filters.number} onChange={(value) => setFilters({ ...filters, number: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.branch')}</label>
                <BranchesDropdown value={filters.branch} placeholder={t(' ')} onChange={(selected) => setFilters({ ...filters, branch: selected, })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.status')}</label>
                <StatusDropdown value={filters.status} placeholder={t(' ')} onChange={(selected) => setFilters({ ...filters, status: selected, })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.phone')}</label>
                <FilterTextFormItem value={filters.phone} onChange={(value) => setFilters({ ...filters, phone: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.createdAt')}</label>
                <RangePicker className="w-full h-10" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('order.inputs.updatedAt')}</label>
                <RangePicker className="w-full h-10" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })}/>
            </Col>
        </>
    )
}