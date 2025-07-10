"use server";
import {cookies} from "next/headers";

export async function submitPlace(formData: FormData) {
    const data = JSON.parse(formData.get("payload") as string);
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;
        if (!token) {
            return {
                success: false,
                message: "Authentication token not found",
            };
        }
        if (data?.id) {
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/place-of-presence", {
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
            const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/place-of-presence", {
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
