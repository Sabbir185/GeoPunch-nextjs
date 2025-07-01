import { Form } from "antd";
import { Label } from "@/components/ui/label";
import { PhoneInput } from "@/components/form/phone/input";
import parsePhoneNumberFromString, { CountryCode, isValidPhoneNumber } from "libphonenumber-js";
import { useI18n } from "@/context/i18n";

const FormPhoneInput = ({ name, label, initialValue, className, required, defaultCountry }: {
    name: string;
    label?: string;
    initialValue?: string;
    className?: string;
    required?: boolean;
    defaultCountry?: CountryCode;
}) => {
    const i18n = useI18n();

    const validatePhoneNumber = (value: string) => {
        if (!value) {
            if (!required) return Promise.resolve();
            return Promise.resolve();
        }
        if (!isValidPhoneNumber(value)) {
            return Promise.reject(
                new Error(`${i18n?.t(label)} ${i18n?.t("is invalid")}`)
            );
        }
        const phoneNumber = parsePhoneNumberFromString(value);
        if (!phoneNumber || !phoneNumber.isValid()) {
            return Promise.reject(
                new Error(`${i18n?.t(label)} ${i18n?.t("is invalid")}`)
            );
        }
        return Promise.resolve();
    };

    const Component = ({ value, onChange }: {
        value?: string;
        onChange?: any
    }) => {

        return (
            <>
                <div className="space-y-2">
                    <Label>{i18n?.t(label)}{required && <span className="text-red-500 ml-1">*</span>}</Label>
                    <PhoneInput
                        value={value}
                        onChange={onChange}
                        defaultCountry={defaultCountry || "BD"}
                    />
                </div>
            </>
        )
    }


    return (
        <Form.Item
            name={name}
            initialValue={initialValue || ""}
            className={className || "mb-4"}
            rules={[
                {
                    required: required,
                    message: `${i18n?.t(label)} ${i18n?.t("is required")}`,
                },
                {
                    validator: (_, value) => validatePhoneNumber(value),
                },
            ]}
        >
            <Component />
        </Form.Item>
    )
}

export default FormPhoneInput;