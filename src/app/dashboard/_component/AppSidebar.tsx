

import {LayoutDashboard,User,BriefcaseBusiness,IndianRupee,Landmark } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
    classname:""
  },
  {
    title: "Client",
    url: "#",
    icon: User,
    classname:""
  },
  {
    title: "Bussiness",
    url: "#",
    icon: BriefcaseBusiness,
    classname:""
  },
  {
    title: "Sales",
    url: "#",
    icon: IndianRupee,
    classname:""
  },
  {
    title: "Financials",
    url: "#",
    icon: Landmark,
    classname:""
  },
]

export function AppSidebar() {


  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild className={cn("hover:bg-[#FFCECE] focus:bg-[#F20101] focus:text-white", item.classname)}>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
2