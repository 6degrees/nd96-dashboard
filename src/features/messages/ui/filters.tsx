import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'

export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('message.inputs.name')}</label>
                <FilterTextFormItem value={filters.name} onChange={(value) => setFilters({ ...filters, name: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('message.inputs.clientRef')}</label>
                <FilterTextFormItem value={filters.client_ref} onChange={(value) => setFilters({ ...filters, client_ref: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('message.inputs.department')}</label>
                <FilterTextFormItem value={filters.department_id} onChange={(value) => setFilters({ ...filters, department_id: value })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('message.inputs.createdAt')}</label>
                <RangePicker className="w-full" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })} />
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('message.inputs.updatedAt')}</label>
                <RangePicker className="w-full" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })} />
            </Col>
        </>
    )
}