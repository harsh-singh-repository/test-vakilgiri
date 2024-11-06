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

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Client",
    url: "#",
    icon: User,
  },
  {
    title: "Bussiness",
    url: "#",
    icon: BriefcaseBusiness,
  },
  {
    title: "Sales",
    url: "#",
    icon: IndianRupee,
  },
  {
    title: "Financials",
    url: "#",
    icon: Landmark,
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
                  <SidebarMenuButton asChild className="hover:bg-[#FFCECE] focus:bg-[#F20101] focus:text-white">
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
