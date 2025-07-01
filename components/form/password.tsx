import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Form } from "antd";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/context/i18n";

type Rule =
    | { required: boolean; message: string; }
    | { min: number; message: string; }
    | { pattern: RegExp; message: string; }
    | { validator: (rule: any, value: any) => Promise<void> };

const useFormInstance = () => {
    return Form.useFormInstance();
};

const FormPassword = ({
    name,
    label,
    className,
    required,
    placeholder,
    confirm = false,
    min = 6,
    rules = []
}: {
    name: string;
    label?: string;
    className?: string;
    required?: boolean;
    placeholder?: string;
    confirm?: boolean;
    min?: number;
    rules?: Rule[];
}) => {

    const i18n = useI18n();
    const [show, setShow] = useState(false)
    const form = useFormInstance();

    const initRules: Rule[] = [
        { required, message: `${i18n?.t(label || 'Password')} ${i18n?.t("is required")}` },
        { min: confirm ? 0 : min, message: `${i18n?.t(label || 'Password')} ${i18n?.t(`must be at least ${min} characters`)}` }
    ]

    if (confirm) {
        initRules.push({
            validator: async (_, value) => {
                const otherPasswordValue = await form.getFieldValue("password");

                if ((!value && required) || value === otherPasswordValue) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error(i18n?.t("The two passwords that you entered do not match!")));
            },
        });
    }

    const Component = ({ value, onChange, }: {
        value?: string;
        onChange?: any;

    }) => {

        return (
            <>
                <div className="space-y-2">
                    <Label>{i18n?.t(label)}{required && <span className="text-red-500 ml-1">*</span>}</Label>
                    <div className="relative">
                        <Input
                            type={show ? 'text' : 'password'}
                            value={value}
                            className="pr-10"
                            autoFocus={false}
                            placeholder={i18n?.t(placeholder) || ""}
                            onChange={onChange}
                        />
                        <div
                            onClick={() => setShow(!show)}
                            className="absolute right-3 top-3 cursor-pointer">
                            {show ? <Eye size={16} /> : <EyeOff size={16} />}
                        </div>
                    </div>
                </div>
            </>
        )
    }

    return (
        <Form.Item
            name={name}
            initialValue={""}
            className={className || "mb-4"}
            rules={[...initRules, ...rules]}
        >
            <Component />
        </Form.Item>
    )
}

export default FormPassword;
