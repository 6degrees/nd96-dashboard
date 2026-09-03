import { Form, Input } from "antd";

type HiddenFormItemProps = {
    name: any;
};


/*
|--------------------------------------------------------------------------
| HiddenFormItem Component
|--------------------------------------------------------------------------
|
| Reusable hidden form field component for Ant Design forms.
| Used to store values in the form state without displaying them
| in the UI (e.g., IDs, codes, tokens).
|
*/
const HiddenFormItem = ({ name }: HiddenFormItemProps) => {
    return (
        <Form.Item name={name} hidden>
            <Input type="hidden" />
        </Form.Item>
    );
};

export default HiddenFormItem;