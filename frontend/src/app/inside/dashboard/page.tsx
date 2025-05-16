"use client"

import React, { useState, useEffect } from "react"
import { fetchUserTeam } from "@/src/lib/api"
import { SectionCards } from "@/src/components/section-cards"


export default function Page() {

  const [team, setTeam] = useState<{ id: number; name: string, total_revenue: number, sales: number } | null>(null)
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
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards total_revenue={team?.total_revenue} sales={team?.sales}/>
            </div>
          </div>
  )
}