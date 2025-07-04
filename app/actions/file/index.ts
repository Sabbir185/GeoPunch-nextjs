"use server";
import {cookies} from "next/headers";

export async function uploadFile(formData: FormData) {
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
                return response.url;
            }
        }
        return undefined;
    } catch (error) {
        console.log("registration error:", error);
        return undefined;
    }
}
