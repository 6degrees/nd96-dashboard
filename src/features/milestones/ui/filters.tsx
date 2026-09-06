import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'

export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('milestone.inputs.title_ar')}</label>
                <FilterTextFormItem value={filters.title_ar} onChange={(value) => setFilters({ ...filters, title_ar: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('milestone.inputs.title_en')}</label>
                <FilterTextFormItem value={filters.title_en} onChange={(value) => setFilters({ ...filters, title_en: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('milestone.inputs.year')}</label>
                <FilterTextFormItem value={filters.year} onChange={(value) => setFilters({ ...filters, year: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('milestone.inputs.createdAt')}</label>
                <RangePicker className="w-full" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('milestone.inputs.updatedAt')}</label>
                <RangePicker className="w-full" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })} />
            </Col>
        </>
    )
}