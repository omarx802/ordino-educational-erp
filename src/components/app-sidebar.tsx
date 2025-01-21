"use client"
import { SearchForm } from "@/src/components/search-form"
import * as React from "react"
import {
  AudioWaveform,
  BookOpen,
  MessageSquareMore,
  Contact,
  Users ,
  Bot,
  Command,
  UserRound,
  Frame,
  GalleryVerticalEnd,
  HandCoins,
  PackageOpen,
  ShoppingCart,
  Map,
  PieChart,
  Settings2,
  CircleDollarSign,
  ClipboardMinus,
  ListChecks,
  SquareTerminal,
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
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
    },
    {
      title: "Chat",
      url: "#",
      icon: MessageSquareMore,
    },
    {
      title: "User Management",
      url: "#",
      icon: UserRound ,
    },
    {
      title: "CRM",
      url: "#",
      icon: Users,
    },
    {
      title: "Sales Management",
      url: "#",
      icon: HandCoins,
    },
    {
      title: "Inventory",
      url: "#",
      icon: PackageOpen,
    },
    {
      title: "Purchases",
      url: "#",
      icon: ShoppingCart,
    },
    {
      title: "Tasks",
      url: "#",
      icon: ListChecks,
    },
    {
      title: "Accounting",
      url: "#",
      icon: CircleDollarSign,
    },
    {
      title: "Reports",
      url: "#",
      icon: Bot,
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
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
