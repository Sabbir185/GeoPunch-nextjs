"use client";
import {Form, Input, Select} from "antd";
import React, {useEffect, useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {submitPlace} from "@/app/actions/place-of-absence";

const PlaceForm = ({data}: { data?: any }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [isSubmitLoader, setIsSubmitLoader] = useState(false);

    useEffect(() => {
        if (data?.id) {
            form.setFieldsValue({
                ...data
            });
        }
    }, [data?.id]);

    return (<div className={"p-8 bg-gray-50 border border-gray-200 rounded-lg"}>
        <Form
            form={form}
            onFinish={async (values) => {
                console.log(values);
                setIsSubmitLoader(true)
                try {
                    values.id = data?.id;
                    const formData = new FormData();
                    formData.append("payload", JSON.stringify(values));
                    const res: any = await submitPlace(formData);
                    if (!res?.success) {
                        toast.success(res?.msg);
                        router.push("/dashboard/place-of-presence");
                    } else {
                        toast.error(res?.msg);
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Failed to submit form. Please try again.");
                } finally {
                    setIsSubmitLoader(false)
                }
            }}
            layout="vertical"
            className={"grid grid-cols-1 gap-x-3"}
        >
            <Form.Item
                label={"Place Name"}
                name={"name"}
                rules={[{required: true, message: "Please enter the place name"}]}
                className={"w-1/2"}
            >
                <Input
                    placeholder={"Enter place name"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>

            <Form.Item
                label={"Place Type"}
                name={"type"}
                rules={[{required: true, message: "Please select the type of place"}]}
                className={"w-1/2"}
            >
                <Select
                    options={[
                        {
                            value: 'common',
                            label: "Common",
                        },
                        {
                            value: 'additional',
                            label: "Additional",
                        },
                    ]}
                    placeholder={"Select location"}
                    className="w-full"
                    size={"large"}
                    allowClear
                />
            </Form.Item>

            <Button size={"lg"} type={"submit"} className={"cursor-pointer mt-3 inline-block w-32"}>
                {isSubmitLoader ? "Submitting..." : "Submit"}
            </Button>
        </Form>
    </div>)
}

export default PlaceForm;

