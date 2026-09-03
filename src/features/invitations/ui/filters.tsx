import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import { FilterTextFormItem } from '@/components/inputs'

export const Filters = ({ filters, setFilters }: any) => {
    /*
    |--------------------------------------------------------------------------
    | Translation
    |--------------------------------------------------------------------------
    |
    | Initialize translation hook for i18n support.
    |
    */
    const { t } = useTranslation()
    const { RangePicker } = DatePicker
    /*
    |--------------------------------------------------------------------------
    | Render Form
    |--------------------------------------------------------------------------
    |
    */
    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('invitation.inputs.email')}</label>
                <FilterTextFormItem value={filters.email} onChange={(value) => setFilters({ ...filters, email: value })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('invitation.inputs.expiresAt')}</label>
                <RangePicker className="w-full h-10" value={filters.expiresAt} onChange={(d) => setFilters({ ...filters, expiresAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('invitation.inputs.acceptedAt')}</label>
                <RangePicker className="w-full h-10" value={filters.acceptedAt} onChange={(d) => setFilters({ ...filters, acceptedAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('invitation.inputs.createdAt')}</label>
                <RangePicker className="w-full h-10" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('invitation.inputs.updatedAt')}</label>
                <RangePicker className="w-full h-10" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })}/>
            </Col>
        </>
    )
}