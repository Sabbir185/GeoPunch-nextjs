/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { AppSidebar } from "@/components/dashboard/AppSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Separator } from "@radix-ui/react-separator";
import { BellRing } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import dayjs from "dayjs";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState();
  const router = useRouter();

  return (
    <SidebarProvider>
      <AppSidebar profile={profile} />
      <SidebarInset>
        {/* header */}
        <header className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar backdrop-blur-sm">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbItem>
                <BreadcrumbPage>{"Control Panel"}</BreadcrumbPage>
              </BreadcrumbItem>
            </Breadcrumb>
          </div>
          <div className={"mr-5 flex justify-between items-center gap-2"}>
            {/*clock*/}
            <Clock />
            {/*notification*/}
            <div className="border py-1 px-3 rounded-lg">
              {/* show profile */}
              <BellRing size={20} />
            </div>
          </div>
        </header>
        {/*main body*/}
        <div className="flex flex-1 flex-col p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default DashboardLayout;

const Clock = () => {
  const [time, setTime] = useState(dayjs());
  useEffect(() => {
    const interval = setInterval(() => setTime(dayjs()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <p className="mb-0 text-gray-700 hidden sm:block font-normal font-inter">
      {time?.format("ddd MMM YYYY, hh:mm:ss A")}
    </p>
  );
};
