"use server";
import { cookies } from "next/headers";

export async function profileAction() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;
    if (!token) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }
    const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
      method: "GET",
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
    if (!userData?.data) {
      return {
        success: false,
        message: "User data not found",
      };
    }
    return {
      success: true,
      data: userData?.data,
    };
  } catch (error) {
    console.log("Login error:", error);
    return { success: false, message: "Login failed. Please try again." };
  }
}
