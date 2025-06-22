"use server";
import { cookies } from "next/headers";

export async function loginAction(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const result = await response.json();

    if (result?.error) {
      return {
        success: false,
        message: result?.msg || "Login failed. Please try again.",
      };
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const userData = await user.json();

    if (userData?.error) {
      return {
        success: false,
        message: userData?.msg || "Failed to fetch user profile",
      };
    }

    if (userData?.data?.role === "ADMIN") {
      return {
        success: true,
        data: {
          role: userData?.data?.role,
          email: userData?.data?.email,
          name: userData?.data?.name,
        },
      };
    } else {
      return {
        success: false,
        message: "You are not authorized to access this page",
      };
    }
  } catch (error) {
    console.log("Login error:", error);
    return { success: false, message: "Login failed. Please try again." };
  }
}
