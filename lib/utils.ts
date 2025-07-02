/* eslint-disable prefer-const */
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const havePermission = (permission: any, roles: any) => {
  for (let role of roles || []) {
    if (role?.permissions?.includes(permission)) {
      return true;
    }
  }
  return false;
};

export const statuses = {
  pending: "Pending",
  approved: "Approved",
  cancelled: "Cancelled",
  suspended: "Suspended",
};
export const colors = {
  pending: "text-blue-600",
  approved: "text-emerald-600",
  cancelled: "text-amber-600",
  suspended: "text-red-600",
};

export const getPerDayTimes = () => {
  let times = [];
  for (let i = 1; i <= 100; i++) {
    times.push({
      value: i,
      label: `${i < 10 ? "0" : ""}${i} times`,
    });
  }
  return times;
};
