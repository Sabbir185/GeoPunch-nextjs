import React from "react";
import SiteSettingsForm from "./Setting";
import { getAuthCookie } from "@/lib/auth";

const fetchSettings = async () => {
  try {
    const cookieToken = await getAuthCookie();
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/setting", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookieToken}`,
      },
    });
    if (!response.ok) {
      console.log(response);
    }
    const res = await response.json();
    return res?.data;
  } catch (error) {
    console.error("Error fetching settings:", error);
    return null;
  }
};

const page = async () => {
  const settingsData = await fetchSettings();
  return (
    <div>
      <SiteSettingsForm settings={settingsData} />
    </div>
  );
};

export default page;
