import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'

export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('tenant.inputs.name')}</label>
                <FilterTextFormItem value={filters.name} onChange={(value) => setFilters({ ...filters, name: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('tenant.inputs.phone')}</label>
                <FilterTextFormItem value={filters.phone} onChange={(value) => setFilters({ ...filters, phone: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('tenant.inputs.email')}</label>
                <FilterTextFormItem value={filters.email} onChange={(value) => setFilters({ ...filters, email: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('tenant.inputs.createdAt')}</label>
                <RangePicker className="w-full h-10" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('tenant.inputs.updatedAt')}</label>
                <RangePicker className="w-full h-10" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })}/>
            </Col>
        </>
    )
}