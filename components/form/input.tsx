"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Form } from "antd"
import { FaInfoCircle } from "react-icons/fa"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip"
import { DatePicker } from "antd"
import {useI18n} from "@/contexts/i18n";
const { RangePicker } = DatePicker

const FormInput = ({
  name,
  label,
  type,
  initialValue,
  placeholder,
  className,
  required,
  onChange,
  onBlur,
  textArea,
  isEmail,
  autoFill,
  accept,
  readonly,
  rules = [],
  rows,
  multiple = false,
  value,
  isPrefix,
  prefixSymbol,
  hintText,
}: {
  name?: string | number | unknown,
  label?: string
  className?: string
  type?: string
  initialValue?: string | number,
  placeholder?: string
  required?: boolean
  textArea?: boolean
  onChange?: any
  onBlur?: any
  isEmail?: boolean
  autoFill?: boolean
  accept?: string
  readonly?: boolean
  rules?: any[]
  rows?: number
  multiple?: boolean
  value?: any
  isPrefix?: boolean
  prefixSymbol?: any
  hintText?: string
}) => {
  const i18n = useI18n()

  const Component = ({
    value = "",
    onChange,
    onBlur
  }: {
    value?: any
    onChange?: any,
    onBlur?: any
  }) => {
    let input = (
      <div className="relative">
        <span className="absolute left-3 top-[5px] text-lg text-gray-500 font-medium">{prefixSymbol}</span>
        <Input
          type={type}
          value={value}
          className={`block ${isPrefix && "ps-6"}`}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={i18n?.t(placeholder) || ""}
          autoComplete={autoFill ? "on" : "off"}
          readOnly={readonly}
        />
      </div>
    )

    if (type === "dateRange") {
      input = (
        <RangePicker
          value={value}
          onChange={onChange}
          style={{ width: "100%" }}
        />
      )
    } else if (textArea) {
      input = (
        <Textarea
          value={value}
          onChange={onChange}
          placeholder={i18n?.t(placeholder) || ""}
          readOnly={readonly}
          rows={rows}
        />
      )
    } else if (type === "file") {
      input = (
        <Input
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={(e: any) => {
            const files = multiple ? Array.from(e.target.files || []) : e.target.files[0]
            onChange(files)
          }}
          value={initialValue}
        />
      )
    }

    return (
      <>
        <div className="space-y-2">
          <Label>
            {i18n?.t(label)}
            {
              hintText && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="inline-flex items-center align-middle">
                        <FaInfoCircle className="ml-1 mb-0.5" />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <span>{hintText}</span>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )
            }
            {required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          {input}
        </div>
      </>
    )
  }

  const initRules: any[] = [{ required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` }]
  if (isEmail) {
    initRules.push({ type: "email", message: `${i18n?.t("Invalid email")}` })
  }

  return (
    <Form.Item
      name={name}
      initialValue={initialValue || ""}
      className={className || "mb-4"}
      rules={[...initRules, ...rules]}
    >
      <Component onChange={onChange} onBlur={onBlur} value={value} />
    </Form.Item>
  )
}

export default FormInput

export const HiddenInput = ({ name, initialValue }: { name: string | any[]; initialValue?: string }) => {
  return (
    <Form.Item name={name} initialValue={initialValue || ""} hidden>
      <Input />
    </Form.Item>
  )
}

