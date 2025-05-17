"use client"

import React, { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  SettingsIcon,
  HelpCircleIcon,
  SearchIcon,
  ArrowUpCircleIcon,
  Sparkles,
  Inbox,
  MessageSquareMore,
  Package,
  CircleDollarSign,
  Users,
  LayoutDashboard,
  ShoppingCart,
  Truck
} from "lucide-react"
import { fetchUserTeam, fetchUser, User } from "@/src/lib/api"
import { NavMain } from "@/src/components/nav-main"
import { NavSecondary } from "@/src/components/nav-secondary"
import { NavUser } from "@/src/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
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
      badge: "9",
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
      badge: "2",
    },
    {
      title: "Logistics",
      url: "/inside/logistics",
      icon: Package,
      badge: "8",
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

  navSecondary: [
    {
      title: "Settings",
      url: "/inside/settings",
      icon: SettingsIcon,
    },
    {
      title: "Get Help",
      url: "/inside/help",
      icon: HelpCircleIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {

  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [team, setTeam] = useState<{ id: number; name: string } | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const loadUser = async () => {
      const userData = await fetchUser();
      if (userData) {
        setUser(userData);
      } else {
        setError("Failed to load user");

      }
    };
    loadUser();
  }, []);


  useEffect(() => {
    const fetchTeam = async () => {
      const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
      if (token) {
        try {
          const teamData = await fetchUserTeam(token)
          setTeam(teamData)
        } catch (error) {
          console.error("Failed to fetch team:", error)
        }
      }
    }

    fetchTeam()
  }, [])

  if (error) return <p>Error: {error}</p>;
  if (!user?.name || !user?.surname) return null;

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">{team ? team.name : "Loading..."}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={data.navMain.map((item) => ({
            ...item,
            isActive: pathname === item.url,
          }))}
        />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser id={user.id} name={user.name} surname={user.surname} avatar={user.avatar} email={user.email}/>
      </SidebarFooter>
    </Sidebar>
  )
}

