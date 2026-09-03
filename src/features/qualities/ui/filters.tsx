import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'


export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('quality.inputs.name')}</label>
                <FilterTextFormItem value={filters.name} onChange={(value) => setFilters({ ...filters, name_en: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('quality.inputs.name_en')}</label>
                <FilterTextFormItem value={filters.name_ar} onChange={(value) => setFilters({ ...filters, name_ar: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('product.inputs.createdAt')}</label>
                <RangePicker className="w-full" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('product.inputs.updatedAt')}</label>
                <RangePicker className="w-full" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })} />
            </Col>
        </>
    )
}
