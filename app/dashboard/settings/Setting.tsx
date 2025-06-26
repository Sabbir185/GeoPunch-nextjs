"use client";
import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { TSetting } from "@/schemas/setting.schema";

const schema = z.object({
  site_name: z.string().min(2, "Site name is required"),
  site_email: z.string().email("Invalid email address"),
  site_address: z.string().min(5, "Address is required"),
  site_footer: z.string().min(2, "Footer text is required"),
  site_logo: z
    .any()
    .refine(
      (file) => file && file.length === 1 && file[0]?.type.startsWith("image/"),
      "Logo image is required"
    )
    .optional(),
  site_phone: z
    .string()
    .min(10, "Phone number is required")
    .regex(/^[0-9+\-\s()]+$/, "Invalid phone number"),
});

type FormData = z.infer<typeof schema>;

export default function SiteSettingsForm({ settings }: { settings: TSetting }) {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      site_name: settings?.site_name || "",
      site_email: settings?.site_email || "",
      site_address: settings?.site_address || "",
      site_footer: settings?.site_footer || "",
      site_phone: settings?.site_phone || "",
    },
  });

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      reset({
        site_name: settings.site_name || "",
        site_email: settings.site_email || "",
        site_address: settings.site_address || "",
        site_footer: settings.site_footer || "",
        site_phone: settings.site_phone || "",
      });
      setLogoPreview(settings.site_logo || null);
    }
  }, [settings, reset]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setValue("site_logo", e.target.files, { shouldValidate: true });
    } else {
      setLogoPreview(null);
      setValue("site_logo", null, { shouldValidate: true });
    }
  };

  const onSubmit = (data: FormData) => {
    const payload = {
      ...data,
      site_logo: data.site_logo ? data.site_logo[0] : null,
    };
    console.log(payload);
  };

  return (
    <div>
      <Card className="bg-gray-50 shadow-none">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>GeoPunch Site Settings</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-3 grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-3">
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  className="h-12 shadow-none bg-white ring-1 ring-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter site name"
                  {...register("site_name")}
                />
                {errors.site_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.site_name.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="site_email">Email Address</Label>
                <Input
                  id="site_email"
                  className="h-12 shadow-none bg-white ring-1 ring-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter site email address"
                  {...register("site_email")}
                />
                {errors.site_email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.site_email.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="site_phone">Phone Number</Label>
                <Input
                  id="site_phone"
                  className="h-12 shadow-none bg-white ring-1 ring-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter site phone number"
                  {...register("site_phone")}
                />
                {errors.site_phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.site_phone.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="site_address">Address</Label>
                <Input
                  id="site_address"
                  className="h-12 shadow-none bg-white ring-1 ring-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                  {...register("site_address")}
                />
                {errors.site_address && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.site_address.message}
                  </p>
                )}
              </div>
              <div className="space-y-3">
                <Label htmlFor="site_footer">Footer Slogan</Label>
                <Input
                  id="site_footer"
                  className="h-12 shadow-none bg-white ring-1 ring-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter footer slogan"
                  {...register("site_footer")}
                />
                {errors.site_footer && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.site_footer.message}
                  </p>
                )}
              </div>
            </div>
            <div className="space-y-3 mt-4">
              <Label>Site Logo</Label>
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
                      style={{ objectFit: "cover" }}
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
              {errors.site_logo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.site_logo.message as string}
                </p>
              )}
            </div>
            <Button size={"lg"} type="submit" className="mt-8 cursor-pointer">
              Update
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
