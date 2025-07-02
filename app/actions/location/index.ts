"use server";
import {cookies} from "next/headers";
import {TLocation} from "@/schemas/location.schema";

export async function submitLocation(formData: FormData) {
    const data: TLocation = JSON.parse(formData.get("payload") as string);
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Authentication token not found",
            };
        }
        const file = formData.get("file") as File | null;
        if (file?.name) {
            const formData1 = new FormData();
            formData1.append("file", file);
            const res = await fetch(
                process.env.NEXT_PUBLIC_API_URL + "/file/upload",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData1,
                }
            );
            const response = await res.json();
            if (response?.url) {
                data.image = response.url;
            }
        }
        if (data?.id) {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/location", {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            return response;
        } else {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/location", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(data),
            });
            const response = await res.json();
            return response;
        }
    } catch (error) {
        console.log("Login error:", error);
        return {success: false, message: "Failed to update. Please try again."};
    }
}
