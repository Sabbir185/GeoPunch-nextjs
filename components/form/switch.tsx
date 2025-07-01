import { Form } from 'antd'
import React, { useState } from 'react'
import { Switch } from '../ui/switch'
import { Label } from '../ui/label'
import { useI18n } from '@/context/i18n'
import { cn } from '@/lib/utils'

const FormSwitch = ({
    name,
    label,
    form,
    initialValue = false,
    className,
    required = false,
    onChange
}: {
    name: any,
    label?: string
    form?: any
    className?: string
    initialValue?: boolean
    required?: boolean
    onChange?: any
}) => {
    const i18n = useI18n()
    const [isChecked, setIsChecked] = useState(initialValue)

    const handleSwitchChange = (checked: boolean) => {
        onChange && onChange(checked)
        setIsChecked(checked)
        if (form) {
          form.setFieldsValue({ [name]: checked })
        }
      }

    return (
        <div className={cn('mb-6', className)}>
            <Label>
                {i18n?.t(label)}
                {required && <span className="text-red-500 ml-1">*</span>}
            </Label>
            <Form.Item name={name} className='mt-1 mb-0' initialValue={initialValue} valuePropName="checked">
                <Switch required={required} checked={isChecked} onCheckedChange={handleSwitchChange} />
            </Form.Item>
        </div>
    )
}

export default FormSwitch