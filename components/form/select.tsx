"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useI18n } from "@/context/i18n"
import { Form } from "antd"

const FormSelect = ({
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
  readonly,
  rules = [],
}: {
  name?: string | any[],
  label?: string
  className?: string
  required?: boolean
  readonly?: boolean
  placeholder?: string
  options?: any[],
  onChange?: (value: string) => void;
  value?: any;
  defaultValue?: any;
  initialValue?: any;
  rules?: any[]
}) => {
  const i18n = useI18n()

  const Component = ({
    value,
    defaultValue,
    onChange,
  }: {
    value?: any,
    defaultValue?: any,
    onChange?: any
    readonly?: boolean
  }) => {
    return (
      <>
        <div className="space-y-2">
          <Label>
            {i18n?.t(label)}
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <Select value={value} onValueChange={onChange} defaultValue={defaultValue} disabled={readonly}>
            <SelectTrigger>
              <div className={!!value ? "" : "opacity-70"}>
                <SelectValue placeholder={i18n?.t(placeholder) || ""} />
              </div>
            </SelectTrigger>
            { options?.length > 0 && <SelectContent>
              {options?.map((option, index) => (
                <SelectItem key={index} value={option.value || option?._id}>
                  {i18n?.t(option.label) || option?.name}
                </SelectItem>
              ))}
            </SelectContent>}
          </Select>
        </div>
      </>
    )
  }

  const initRules: any[] = [{ required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` }]

  return (
    <Form.Item
      name={name}
      initialValue={initialValue}
      className={className || "mb-4"}
      rules={[...initRules, ...rules]}
    >
      <Component onChange={onChange} value={value} defaultValue={defaultValue} readonly={readonly} />
    </Form.Item>
  )
}

export default FormSelect

