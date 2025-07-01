import { Form } from "antd";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/context/i18n";

const FormFileInput = ({
    name,
    label,
    className,
    required,
    accept,
}: {
    name: string;
    label?: string;
    className?: string;
    required?: boolean;
    accept?: string;
}) => {
    const i18n = useI18n();

    const Component = ({ onChange }: {
        onChange?: any
    }) => {

        return (
            <>
                <div className="space-y-2">
                    <Label>{i18n?.t(label)}</Label>
                    <Input
                        type="file"
                        accept={accept}
                        onChange={e => {
                            onChange(e.target.files[0])
                        }}
                    />
                </div>
            </>
        )
    }

    const rules: any[] = [
        { required, message: `${i18n?.t(label)} ${i18n?.t("is required")}` },
    ]

    return (
        <Form.Item
            name={name}
            initialValue={""}
            className={className || "mb-4"}
            rules={rules}
        >
            <Component />
        </Form.Item>
    )
}

export default FormFileInput;

