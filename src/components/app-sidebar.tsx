"use client"
import Link from "next/link"
import { SearchForm } from "@/src/components/search-form"
import * as React from "react"
import {
  AudioWaveform,
  Sparkles,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
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
import { NavProjects } from "@/src/components/nav-projects"
import { NavUser } from "@/src/components/nav-user"
import { TeamSwitcher } from "@/src/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/src/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free",
    },
  ],
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
      isActive: true,
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
  projects: [
    {
      name: "Design Engineering",
      url: "#",
      icon: Frame,
    },
    {
      name: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Travel",
      url: "#",
      icon: Map,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <SearchForm />

        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
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
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
