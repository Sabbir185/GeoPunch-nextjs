import { useI18n } from "@/context/i18n";
import { Form, Select } from "antd";
import { DefaultOptionType, SelectProps } from "antd/es/select";

interface OptionType {
    id?: string;
    value?: string;
    name?: string;
    label?: string;
    disabled?: boolean;
}

interface FormSelectProps {
    label: string;
    name: string | any[];
    className?: string;
    required?: boolean;
    onSearch?: (value: string) => void;
    initialValue?: string | string[];
    value?: string | string[];
    options?: OptionType[];
    search?: boolean;
    rules?: object[];
    multi?: boolean;
    tags?: boolean;
    placeholder?: string;
    onSelect?: SelectProps["onSelect"];
    onChange?: SelectProps["onChange"];
    allowClear?: boolean;
    disabled?: boolean;
    title?: string;
}

const FormMultiSelect: React.FC<FormSelectProps> = ({
    label,
    name,
    className = "",
    required = false,
    onSearch,
    initialValue,
    value,
    options = [],
    search = false,
    rules = [],
    multi = false,
    tags = false,
    placeholder,
    onSelect,
    onChange,
    allowClear = false,
    disabled = false,
    title,
}) => {
    const i18n = useI18n();
    const initRules = [
        {
            required: required,
            message: `${i18n?.t("Please select")} ${i18n?.t(label) || i18n?.t("an option")}`,
        },
    ];

    return (
        <Form.Item
            rootClassName="select-input"
            label={i18n.t(label)}
            name={name}
            className={`mb-3 ${className}`}
            rules={[...initRules, ...rules]}
            initialValue={initialValue}
        >
            <Select
                value={value}
                mode={multi ? "multiple" : tags ? "tags" : undefined}
                popupClassName={tags ? "d-none" : ""}
                allowClear={allowClear}
                onSelect={onSelect}
                disabled={disabled}
                onChange={onChange}
                placeholder={i18n?.t(placeholder)}
                filterOption={(input, option: DefaultOptionType) => {
                    const label = option?.label ?? option?.value;
                    return typeof label === "string" ? label.toLowerCase().includes(input.toLowerCase()) : false;
                }}
                showSearch={search}
                title={title}
                onSearch={onSearch}
                getPopupContainer={trigger => trigger.parentNode}
            >
                {options?.map((option, index) => (
                    <Select.Option key={index} disabled={option.disabled} value={option?.id || option?.value}>
                        {option?.name || i18n.t(option?.label)}
                    </Select.Option>
                ))}
            </Select>
        </Form.Item>
    );
};

export default FormMultiSelect;
