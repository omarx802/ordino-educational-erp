"use client"

import { usePathname } from "next/navigation"
import { Separator } from "@/src/components/ui/separator"
import { SidebarTrigger } from "@/src/components/ui/sidebar"
import { ModeToggle } from "@/src/components/mode-toggle"


const data = {
  navMain: [
    { title: "Ask AI", url: "/inside/askai" },
    { title: "Dashboard", url: "/inside/dashboard" },
    { title: "Discussions", url: "/inside/discussions" },
    { title: "Inbox", url: "/inside/inbox" },
    { title: "Sales", url: "/inside/sales" },
    { title: "Purchases", url: "/inside/purshases" },
    { title: "Logistics", url: "/inside/logistics" },
    { title: "Finance", url: "/inside/finance" },
    { title: "Human Ressources", url: "/inside/hr" },
    { title: "Settings", url: "/inside/settings" },
],
};

export function SiteHeader() {

  const pathname = usePathname()
  const itemTitle =
    data.navMain.find((item) => item.url === pathname)?.title || "Unknown"

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{itemTitle}</h1>
          <div className="absolute top-1 right-2 p-2">
            <ModeToggle />
          </div>
      </div>
    </header>
  )
}
