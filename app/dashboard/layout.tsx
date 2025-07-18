"use client";
import {AppSidebar} from "@/components/dashboard/AppSidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarShortcut,
    MenubarTrigger,
} from "@/components/ui/menubar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";
import {Separator} from "@radix-ui/react-separator";
import {LayoutList} from "lucide-react";
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import {useAuth} from "@/contexts/AuthContext";
import {User} from "@/schemas/user.schema";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";

function DashboardLayout({children}: { children: React.ReactNode }) {
    const [profile, setProfile] = useState();
    const router = useRouter();
    const {user, logout} = useAuth() as { user: User | null | undefined, logout: () => void };
    return (
        <SidebarProvider>
            <AppSidebar profile={user}/>
            <SidebarInset>
                {/* header */}
                <header
                    className="flex justify-between h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 bg-sidebar backdrop-blur-sm">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-pointer"/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbItem>
                                <BreadcrumbPage>{"Control Panel"}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </Breadcrumb>
                    </div>
                    <div className={"mr-8 flex justify-between items-center gap-2"}>
                        {/*clock*/}
                        <Clock/>
                        {/*leader board list*/}
                        <div className="border py-1 px-3 rounded-lg" title={"Activity Log"}
                             onClick={() => router.push("/activity")}>
                            <LayoutList size={20} className={"cursor-pointer text-yellow-600"}/>
                        </div>
                        {/*profile image*/}
                        <Menubar>
                            <MenubarMenu>
                                <MenubarTrigger className={"cursor-pointer"}>
                                    <Avatar>
                                        <AvatarImage src={user?.image || "https://github.com/shadcn.png"}/>
                                        <AvatarFallback>Img</AvatarFallback>
                                    </Avatar>
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem
                                        onClick={() => router.push(`/dashboard/users/update?id=${user?.id as number}`)}>
                                        Profile <MenubarShortcut>⌘P</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem onClick={() => router.push("/activity")}>
                                        Activity Log <MenubarShortcut>⌘L</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarSeparator/>
                                    <MenubarItem onClick={() => logout()}>
                                        Logout
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </header>
                {/*main body*/}
                <div className="flex flex-1 flex-col p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}

export default DashboardLayout;

const Clock = dynamic(
    () =>
        Promise.resolve(() => {
            const [time, setTime] = useState(dayjs());
            useEffect(() => {
                const interval = setInterval(() => setTime(dayjs()), 1000);
                return () => {
                    clearInterval(interval);
                };
            }, []);
            return (
                <p className="mb-0 text-gray-700 hidden sm:block font-normal font-inter">
                    {time?.format("ddd DD MMM YYYY, hh:mm:ss A")}
                </p>
            );
        }),
    {ssr: false}
);
