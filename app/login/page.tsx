"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { useState } from "react";
import { loginAction } from "../actions/auth/login";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { User } from "@/schemas/user.schema";

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth() as { login: (user: User) => void };
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormValues) => {
    const validatedFields = loginSchema.safeParse({
      email: data.email,
      password: data.password,
    });
    if (!validatedFields.success) {
      throw new Error("Invalid input fields");
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("email", data.email);
      formData.append("password", data.password);
      const response = await loginAction(formData);
      if (response?.success === false) {
        toast.error(response?.message || "Login failed. Please try again.", {
          style: {
            background: "#f39c12",
          },
        });
      } else {
        login(response?.data as User);
        if (response?.data?.role === "ADMIN") {
          toast.success("Login successful! Redirecting...");
          router.push("/dashboard");
        } else {
          return {
            success: false,
            message: "You are not authorized to access this page",
          };
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="flex flex-1 min-h-screen border-none p-0 m-0 shadow-none bg-[#F9F9F5]">
      <CardContent className="flex flex-1 flex-col md:flex-row p-0 m-0 border-2">
        <div className="relative hidden md:block md:flex-1">
          <Image
            src="/images/ku_adommo_bangla.jpg"
            alt="Natural background"
            fill
            className="h-full w-full object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
            loading="eager"
          />
        </div>

        <div className="flex-1 flex flex-col">
          <div className="text-center mt-[37px] space-y-2">
            <h1 className="text-3xl font-bold font-syne">Control Panel</h1>
            <h1 className="text-base font-semibold font-inter text-[#4B5563]">
              {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
          </div>
          <div className="flex flex-col md:-mt-10 items-center justify-center flex-1 px-4 md:px-8 lg:px-12 pb-10 md:pb-0">
            <h1 className="text-2xl font-semibold mb-10">Login your account</h1>
            <div className="w-full max-w-md">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-6 p-6 border-gray-200 rounded-lg shadow-none bg-white"
              >
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`h-12 ${errors.email ? "border-red-500" : ""}`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password")}
                    className={`h-12 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <Button
                  type="submit"
                  className="w-full h-12"
                  disabled={isLoading}
                >
                  {isLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Login;
