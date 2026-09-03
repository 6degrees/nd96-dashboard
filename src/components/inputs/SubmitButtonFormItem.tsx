import { Form, Button, Spin } from 'antd'
import { useTranslation } from 'react-i18next'

/*
|--------------------------------------------------------------------------
| SubmitButtonFormItem Props
|--------------------------------------------------------------------------
|
| Reusable Ant Design Form.Item wrapper for submit buttons.
| Provides identity-based styling for form submit actions.
| Supports loading state and i18n translation for button text.
|
*/
type SubmitButtonFormItemProps = {
    label: string
    background?: string
    loading?: boolean
}

/*
|--------------------------------------------------------------------------
| SubmitButtonFormItem Component
|--------------------------------------------------------------------------
|
| Renders the form submit button using the Saudi National Day
| geometric visual identity.
|
*/
const SubmitButtonFormItem = (
    {
        label,
        loading,
        background,
    }: SubmitButtonFormItemProps,
) => {

    /*
    |--------------------------------------------------------------------------
    | Translation Hook
    |--------------------------------------------------------------------------
    |
    | Provides localized button text.
    |
    */
    const { t } = useTranslation()

    /*
    |--------------------------------------------------------------------------
    | Render Component
    |--------------------------------------------------------------------------
    |
    */
    return (
        <Form.Item className="mb-0">
            <Button
                htmlType="submit"
                type="primary"
                size="large"
                disabled={loading}
                className="identity-submit-button"
                style={{
                    background: background || 'var(--brand-green)',
                }}>

                <span className="identity-submit-button-frame">
                    <span className="identity-submit-button-pixel identity-submit-button-pixel-left" />
                    <span className="identity-submit-button-pixel identity-submit-button-pixel-right" />
                </span>

                <span className="identity-submit-button-content">
                    {loading ? (
                        <Spin size="small" />
                    ) : (
                        <span>{t(label)}</span>
                    )}
                </span>

            </Button>
        </Form.Item>
    )
}

export default SubmitButtonFormItem