"use client";
import {Form, Input} from "antd";
import {Label} from "@/components/ui/label";
import Image from "next/image";
import React, {useEffect, useRef, useState} from "react";
import {Button} from "@/components/ui/button";
import {toast} from "sonner";
import {submitLocation} from "@/app/actions/location";
import {useRouter} from "next/navigation";
import {TLocation} from "@/schemas/location.schema";

const LocationForm = ({data}: { data?: TLocation }) => {
    const [form] = Form.useForm();
    const router = useRouter();
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [locationImage, setLocationImage] = useState("") as any;
    const [isSubmitLoader, setIsSubmitLoader] = useState(false);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setLogoPreview(URL.createObjectURL(file));
            setLocationImage(file as File);
        } else {
            setLogoPreview(null);
            setLocationImage(null);
        }
    };

    useEffect(() => {
        if (data?.id) {
            form.setFieldsValue({
                name: data.name || "",
                address: data.address || "",
                lat: data.lat || "",
                lng: data.lng || "",
                maxRadius: data.maxRadius || "",
            });
            if (data.image) {
                setLogoPreview(data.image);
            }
        }
    }, [data?.id]);

    return (<div className={"p-8 bg-gray-50 border border-gray-200 rounded-lg"}>
        <Form
            form={form}
            onFinish={async (values) => {
                setIsSubmitLoader(true)
                try {
                    values.id = data?.id;
                    values.lat = parseFloat(values.lat);
                    values.lng = parseFloat(values.lng);
                    values.maxRadius = parseInt(values.maxRadius, 10);
                    const formData = new FormData();
                    formData.append("payload", JSON.stringify(values));
                    if (locationImage?.name) {
                        formData.append("file", locationImage);
                    }
                    const res: any = await submitLocation(formData);
                    if (!res?.success) {
                        toast.success(res?.msg);
                        router.push("/dashboard/locations");
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
            className={"grid grid-cols-2 gap-x-3"}
        >
            <Form.Item
                label={"Location Name"}
                name={"name"}
                rules={[{required: true, message: "Please enter the location name"}]}
            >
                <Input
                    placeholder={"Enter location name"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>
            <Form.Item
                label={"Address"}
                name={"address"}
                rules={[{required: true, message: "Please enter full address"}]}
            >
                <Input
                    placeholder={"Enter full address"}
                    size={"large"}
                    className={"w-full "}
                />
            </Form.Item>

            <Form.Item
                label={"Latitude"}
                name={"lat"}
                rules={[{required: true, message: "Please enter location latitude"}]}
            >
                <Input
                    placeholder={"Enter location latitude"}
                    size={"large"}
                    className={"w-full "}
                    type="number"
                />
            </Form.Item>
            <Form.Item
                label={"Longitude"}
                name={"lng"}
                rules={[{required: true, message: "Please enter location longitude"}]}
            >
                <Input
                    placeholder={"Enter location longitude"}
                    size={"large"}
                    className={"w-full "}
                    type="number"
                />
            </Form.Item>

            <Form.Item
                label={"Max Radius (In Meters)"}
                name={"maxRadius"}
                rules={[{required: true, message: "Please enter the max radius"}]}
                extra={"This is the maximum radius in meters from the location where the service is available."}
            >
                <Input
                    placeholder={"Enter max radius in meters"}
                    size={"large"}
                    className={"w-full "}
                    type="number"
                />
            </Form.Item>

            <Form.Item>
                <Input type={"hidden"}/>
            </Form.Item>

            <div className="space-y-3 mt-4">
                <Label>Location Image</Label>
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

export default LocationForm;

