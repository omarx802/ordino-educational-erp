import { AppSidebar } from "@/src/components/app-sidebar"
import { SiteHeader } from "@/src/components/site-header"
import { SidebarInset, SidebarProvider } from "@/src/components/ui/sidebar"

export default function Format({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}