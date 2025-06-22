"use server";
import { setAuthCookie } from "@/lib/auth";

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
        credentials: "include",
      }
    );
    const setCookie = response.headers.get("set-cookie");
    let authToken = null;
    if (setCookie) {
      const match = setCookie.match(/auth-token=([^;]+)/);
      if (match) {
        authToken = match[1];
      }
    }
    const result = await response.json();

    if (result?.error) {
      return {
        success: false,
        message: result?.msg || "Login failed. Please try again.",
      };
    }

    if (!authToken) {
      return {
        success: false,
        message: "Authentication token not found",
      };
    }

    await setAuthCookie(authToken);

    const user = await fetch(process.env.NEXT_PUBLIC_API_URL + "/profile", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
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
        data: userData?.data,
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
