"use client"

import React, { useState, useEffect } from "react"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/src/components/ui/sidebar"
import { fetchUserTeam } from "@/src/lib/api"
import { GalleryVerticalEnd } from "lucide-react"

export function TeamDisplay() {
  const [team, setTeam] = useState<{ id: number; name: string } | null>(null)

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

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="bg-sidebar-accent text-sidebar-accent-foreground">
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">

            <GalleryVerticalEnd className="size-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{team ? team.name : "Loading..."}</span>
            <span className="truncate text-xs">Entreprise</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
