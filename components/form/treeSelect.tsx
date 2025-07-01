"use client"

import { TreeSelect } from "antd"
import { Form } from "antd"
import { Label } from "@/components/ui/label"
import { useI18n } from "@/context/i18n"

interface TreeOption {
    title: string
    value: string
    children?: TreeOption[]
}

const FormTreeSelect = ({
    name,
    label,
    className,
    required,
    placeholder,
    options,
    onChange,
    value,
    defaultValue,
    initialValue,
    readonly
}: {
    name?: string | any[],
    label?: string
    className?: string
    required?: boolean
    readonly?: boolean
    placeholder?: string
    options?: TreeOption[],
    onChange?: (value: string) => void;
    value?: any;
    defaultValue?: any;
    initialValue?: any;
}) => {
    const i18n = useI18n()

    return (
        <Form.Item
            name={name}
            initialValue={initialValue}
            className={className || "mb-4"}
            rules={[{ required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` }]}
        >
            <div className="space-y-2">
                <Label>
                    {i18n?.t(label)}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </Label>
                <TreeSelect
                    style={{ width: "100%" }}
                    value={value}
                    defaultValue={defaultValue}
                    dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                    treeData={options}
                    placeholder={i18n?.t(placeholder) || ""}
                    treeDefaultExpandAll
                    allowClear
                    disabled={readonly}
                    onChange={onChange}
                />
            </div>
        </Form.Item>
    )
}

export default FormTreeSelect
