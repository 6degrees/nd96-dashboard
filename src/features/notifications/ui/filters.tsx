import { useTranslation } from 'react-i18next'
import { Col, DatePicker } from 'antd'
import {FilterTextFormItem} from "@/components/inputs";


export const Filters = ({ filters, setFilters }: any) => {
    const { t } = useTranslation()

    const { RangePicker } = DatePicker

    return (
        <>
            <Col xs={24} sm={12} md={8}>
                <label>{t('notification.inputs.id')}</label>
                <FilterTextFormItem value={filters.id} onChange={(value) => setFilters({ ...filters, id: value })}/>
            </Col>
            <Col xs={24} sm={12} md={8}>
                <label>{t('notification.inputs.createdAt')}</label>
                <RangePicker className="w-full h-10" value={filters.createdAt} onChange={(d) => setFilters({ ...filters, createdAt: d })}/>
            </Col>

            <Col xs={24} sm={12} md={8}>
                <label>{t('notification.inputs.updatedAt')}</label>
                <RangePicker className="w-full h-10" value={filters.updatedAt} onChange={(d) => setFilters({ ...filters, updatedAt: d })}/>
            </Col>
        </>
    )
}