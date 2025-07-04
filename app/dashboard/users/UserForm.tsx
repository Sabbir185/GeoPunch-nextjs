"use client";
import {Form, Input, Select} from "antd";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {useRouter} from "next/navigation";
import {useFetch} from "@/hooks/userAction";
import {fetchLocationList} from "@/utils/backend_helper";
import {userRegistration} from "@/app/actions/user/register";
import {TRegisterUserSchema} from "@/schemas/user.schema";

const UserForm = ({data, update}: { data?: TRegisterUserSchema, update: boolean }) => {
    const [locations, getLocations, {loading, error}] = useFetch(fetchLocationList)
    const [form] = Form.useForm();
    const router = useRouter();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [userImage, setUserImage] = useState("") as any;
    const [isSubmitLoader, setIsSubmitLoader] = useState(false);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setUserImage(file as File);
        } else {
            setLogoPreview(null);
            setUserImage(null);
        }
    };

    useEffect(() => {
        if (data?.id) {
            form.setFieldsValue({
                name: data.name,
                email: data.email,
                phone: data.phone,
                department: data.department,
                designation: data.designation,
                locationId: data.locationId,
            });
            if (data.image) {
                setLogoPreview(data.image);
            }
        }
    }, [data?.id]);

    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };

    return (<div className={"p-8 bg-gray-50 border border-gray-200 rounded-lg"}>
        <Form
            form={form}
            onFinish={async (values) => {
                values.id = data?.id;
                setIsSubmitLoader(true)
                const toastId = toast.loading("Please wait...");
                try {
                    const formData = new FormData();
                    formData.append("payload", JSON.stringify(values));
                    if (userImage?.name) {
                        formData.append("file", userImage);
                    }
                    const res: any = await userRegistration(formData);
                    if (!res?.error) {
                        toast.success(res?.msg, {
                            id: toastId,
                        });
                        router.push("/dashboard/users");
                    } else {
                        toast.error(res?.msg, {
                            id: toastId,
                        });
                    }
                } catch (error) {
                    console.error("Error submitting form:", error);
                    toast.error("Failed to submit form. Please try again.", {
                        id: toastId,
                    });
                } finally {
                    setIsSubmitLoader(false)
                }
            }}
            layout="vertical"
            className={"grid grid-cols-2 gap-x-3"}
        >
            <Form.Item
                label={"User Name"}
                name={"name"}
                rules={[{required: true, message: "Please enter the user name"}]}
            >
                <Input
                    placeholder={"Enter full name"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>
            <Form.Item
                label={"Email Address"}
                name={"email"}
                rules={[{required: true, message: "Please enter email address"}]}
            >
                <Input
                    placeholder={"Enter email address"}
                    size={"large"}
                    className={"w-full "}
                    type={"email"}
                />
            </Form.Item>

            <Form.Item
                label={"Phone Number"}
                name={"phone"}
                rules={[{required: true, message: "Please enter phone number"}]}
            >
                <Input
                    placeholder={"Phone Number, ex: +88017xxxxxxxx"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>
            <Form.Item
                label={"Password"}
                name={"password"}
                rules={[{required: !update, message: "Please the password"}]}
            >
                <Input.Password
                    placeholder={"Enter the password"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>

            <Form.Item
                label={"Department"}
                name={"department"}
                rules={[{required: true, message: "Please enter the department"}]}
            >
                <Input
                    placeholder={"Enter department, ex: IT, CSE, ECE, HR etc"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>

            <Form.Item
                label={"Designation"}
                name={"designation"}
                rules={[{required: true, message: "Please enter the designation"}]}
            >
                <Input
                    placeholder={"Enter designation, ex: Lecturer, Professor etc"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>

            <Form.Item
                label={"Location"}
                name={"locationId"}
                rules={[{required: true, message: "Please select the location"}]}
                className={"w-full"}
            >
                <Select
                    onChange={handleChange}
                    options={locations?.map((location: any) => ({
                        value: location.id,
                        label: location.name,
                    }))}
                    placeholder={"Select location"}
                    className="w-full"
                    size={"large"}
                    allowClear
                />
            </Form.Item>

            <Form.Item>
                <Input type={"hidden"}/>
            </Form.Item>

            <div className="space-y-3 mt-4">
                <Label>User Image</Label>
                <div className="flex items-center space-x-4">
                    <button
                        type="button"
                        className="w-24 h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md bg-white hover:border-blue-400 focus:outline-none cursor-pointer"
                        onClick={() => fileInputRef.current?.click()}
                    >
                        {logoPreview ? (
                            <Image
                                src={logoPreview}
                                alt="Logo Preview"
                                width={96} // 24 * 4 (w-24)
                                height={96} // 24 * 4 (h-24)
                                className="w-full h-full object-cover rounded-md"
                                style={{objectFit: "cover"}}
                            />
                        ) : (
                            <span className="text-gray-400">Upload</span>
                        )}
                    </button>
                    <input
                        id="site_logo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={fileInputRef}
                        onChange={handleLogoChange}
                    />
                </div>
            </div>

            <Form.Item>
                <Input type={"hidden"}/>
            </Form.Item>

            <Button size={"lg"} type={"submit"} className={"cursor-pointer mt-10 inline-block w-32"}>
                {isSubmitLoader ? "Submitting..." : "Submit"}
            </Button>
        </Form>
    </div>)
}

export default UserForm;

