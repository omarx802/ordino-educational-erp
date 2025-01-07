"use client"

import Link from "next/link"
import { SearchForm } from "@/src/components/search-form"
import { usePathname } from "next/navigation"
import * as React from "react"
import {
  Sparkles,
  Inbox,
  MessageSquareMore,
  Package,
  CircleDollarSign,
  Users,
  LayoutDashboard,
  ShoppingCart,
  Truck,

} from "lucide-react"

import { NavMain } from "@/src/components/nav-main"
import { NavUser } from "@/src/components/nav-user"
import { TeamDisplay } from "@/src/components/team-display"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"


const data = {

navMain: [
    {
      title: "Ask AI",
      url: "/inside/askai",
      icon: Sparkles,
    },
    {
      title: "Dashboard",
      url: "/inside/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Discussions",
      badge: "128",
      url: "/inside/discussions",
      icon: MessageSquareMore,

    },
    {
      title: "Inbox",
      url: "/inside/inbox",
      icon: Inbox,
      badge: "10",
    },
    {
      title: "Sales",
      url: "/inside/sales",
      icon: ShoppingCart,
      badge: "10",
    },
    {
      title: "Purchases",
      url: "/inside/purshases",
      icon: Truck,
      badge: "10",
    },
    {
      title: "Inventory",
      url: "/inside/inventory",
      icon: Package,
      badge: "10",
    },
    {
      title: "Finance",
      url: "/inside/finance",
      icon: CircleDollarSign,
      badge: "",
    },
    {
      title: "HR",
      url: "/inside/hr",
      icon: Users,
      badge: "",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamDisplay />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm />
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive: pathname === item.url,
            component: (
              <Link href={item.url} key={item.title}>
                <a className="flex items-center space-x-2">
                  <item.icon className="w-5 h-5" />
                  <span>{item.title}</span>
                  {item.badge && (
                    <span className="ml-auto text-sm text-gray-500">
                      {item.badge}
                    </span>
                  )}
                </a>
              </Link>
            ),
          }))}
        />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
