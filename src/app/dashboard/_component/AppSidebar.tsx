'use client'
// import { useState } from "react";
import { usePathname } from 'next/navigation';
import {
  BriefcaseBusiness, 
  // ChevronRightIcon,
  IndianRupee, 
  Landmark, 
  LayoutDashboard, 
  User,
} from "lucide-react";
import {
  MdOutlinePhoneCallback, MdEditDocument, MdOutlineArrowDropUp,
  MdOutlineArrowDropDown, MdHeadsetMic,
} from "react-icons/md";
import { FaFolder, FaClock, FaUserCircle } from "react-icons/fa";
import { GiSmartphone } from "react-icons/gi";
import { GrPowerReset } from "react-icons/gr";
import { BsFillHouseAddFill, BsGearFill } from "react-icons/bs";
import { HiMiniUserGroup, HiUsers } from "react-icons/hi2";
import { BiSolidBriefcase } from "react-icons/bi";
import { RiNodeTree } from "react-icons/ri";
import { MdOutlineLockClock } from "react-icons/md";

import {
  Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent,
  SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem,
  SidebarMenuSub, SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    classname: "",
  },
  {
    title: "Client",
    url: "/dashboard/client",
    icon: User,
    classname: ""
  },
  {
    title: "Business",
    url: "/dashboard/business",
    icon: BriefcaseBusiness,
    classname: ""
  },
  {
    title: "Sales",
    icon: IndianRupee,
    classname: "",
    children: [
      { title: "Leads", url: "/dashboard/leads", icon: MdOutlinePhoneCallback, classname: "" },
      { title: "Projects", url: "/dashboard/projects", icon: FaFolder, classname: "" },
      { title: "Reminders", url: "/dashboard/reminders", icon: FaClock, classname: "" },
    ]
  },
  {
    title: "Financials",
    icon: Landmark,
    classname: "",
    children: [
      { title: "Invoices", url: "/dashboard/invoices", icon: MdEditDocument, classname: "" },
      { title: "Payments", url: "/dashboard/payments", icon: IndianRupee, classname: "" },
      { title: "Refund", url: "/dashboard/refund", icon: GiSmartphone, classname: "" },
      { title: "Subscriptions", url: "/dashboard/subscriptions", icon: GrPowerReset, classname: "" },
    ]
  },
  {
    title: "Franchise",
    icon: BsFillHouseAddFill,
    classname: "",
    children: [
      { title: "Retailers", url: "/dashboard/retailers", icon: HiMiniUserGroup, classname: "" }
    ]
  },
  {
    title: "Teams",
    icon: HiUsers,
    classname: "",
    children: [
      { title: "Professionals", url: "/dashboard/professionals", icon: BiSolidBriefcase, classname: "" },
      { title: "Staff", url: "/dashboard/staff", icon: FaUserCircle, classname: "" }
    ]
  },
  {
    title: "Tickets",
    url: "/dashboard/tickets",
    icon: MdHeadsetMic,
    classname: ""
  },
  {
    title: "Settings",
    icon: BsGearFill,
    classname: "",
    children: [
      { title: "Services", url: "/dashboard/services", icon: RiNodeTree, classname: "" },
      { title: "Permission", url: "/dashboard/permission", icon: MdOutlineLockClock, classname: "" }
    ]
  }
];

export function AppSidebar() {
  // const [subMenuOpen, setSubMenuOpen] = useState<boolean>(false);
  const pathname = usePathname();

  // const handleSubMenuOpen = () => {
  //   setSubMenuOpen(!subMenuOpen);
  // };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
            {items.map((item) => {
                const isSubMenuOpen = item.children?.some((child) => child.url === pathname);
                return (
                  <Collapsible key={item.title} defaultOpen={isSubMenuOpen}>
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          className={cn(
                            "hover:bg-[#FFCECE] hover:text-black font-medium",
                            pathname === item.url && "bg-[#f21300] hover:bg-[#f21300] text-white"
                          )}
                        >
                          <div className="w-full flex justify-between items-center text-[15px]">
                            <div className="inline-flex items-center space-x-2">
                            <a
                                  href={item.url}
                                  className={cn(
                                    "flex items-center space-x-2 text-[14px] focus:text-black text-[#00000080] p-1",
                                    pathname === item.url && "bg-[#f21300] text-white"
                                  )}
                                >
                              <item.icon size={18} />
                              <span>{item.title}</span>
                              </a>
                            </div>
                            {item.children && (
                              isSubMenuOpen ? (
                                <MdOutlineArrowDropUp size={24} />
                              ) : (
                                <MdOutlineArrowDropDown size={24} />
                              )
                            )}
                          </div>
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      {item.children && (
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.children.map((child) => (
                              <SidebarMenuSubItem key={child.title}>
                                <a
                                  href={child.url}
                                  className={cn(
                                    "flex items-center space-x-2 text-[14px] focus:text-black text-[#00000080] p-1",
                                    pathname === child.url && "bg-[#f21300] text-white"
                                  )}
                                >
                                  <child.icon size={16} />
                                  <span>{child.title}</span>
                                </a>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      )}
                    </SidebarMenuItem>
                  </Collapsible>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
