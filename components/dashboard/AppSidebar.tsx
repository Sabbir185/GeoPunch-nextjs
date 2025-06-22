import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
} from "@/components/ui/sidebar";
import {
  SettingsIcon,
  LayoutDashboard,
  Users,
  FileBarChart,
  MapPin,
  Settings,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { User } from "@/schemas/user.schema";

const navItems = [
  {
    title: "Dashboard",
    icon: <LayoutDashboard size={20} />,
    href: "/dashboard",
  },
  {
    title: "Users",
    icon: <Users size={20} />,
    href: "/dashboard/users",
  },
  {
    title: "Locations",
    icon: <MapPin size={20} />,
    href: "/dashboard/locations",
  },
  {
    title: "Reports",
    icon: <FileBarChart size={20} />,
    href: "/dashboard/reports",
  },
  {
    title: "Settings",
    icon: <Settings size={20} />,
    href: "/dashboard/settings",
  },
];

export function AppSidebar({ profile }: { profile: User | null | undefined }) {
  return (
    <main className="bg-sidebar">
      <Sidebar className="h-screen w-64 p-3">
        <SidebarHeader>
          <div className="flex flex-1 justify-center items-center border-2 border-amber-500">
            <h1 className="font-bold font-syne text-lg">{process.env.NEXT_PUBLIC_APP_NAME}</h1>
          </div>
        </SidebarHeader>
        <SidebarContent className="mt-3">
          <SidebarMenu>
            {navItems.map((item) => (
              <Link
                href={item.href}
                className="hover:bg-[#EBEBE8] h-[36px] rounded-[6px] shadow-none flex items-center"
                key={item.title}
              >
                <div className="flex items-center justify-start gap-[8px] h-full ml-[6px]">
                  {item.icon}
                  <span className="font-medium hover:font-semibold text-[15px] tracking-[-.2px] text-[#2B3241] inline-block font-inter">
                    {item.title}
                  </span>
                </div>
              </Link>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          {/*profile and settings*/}
          <div className="h-[40px] flex justify-between items-center">
            <div className="flex items-center gap-[8px]">
              <Image
                src={profile?.image || "/images/profile.png"}
                className={"rounded-full border-[1px]"}
                height={40}
                width={40}
                alt="profile"
              />
              <p className="font-inter font-medium text-[15px] tracking-[-0.2px] text-[#000000]">
                {profile?.name}
              </p>
            </div>
            <span
              onClick={() => alert("Coming soon")}
              className="cursor-pointer"
            >
              <SettingsIcon />
            </span>
          </div>
        </SidebarFooter>
      </Sidebar>
    </main>
  );
}
