"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import "../globals.css";
import { AppSidebar } from "@/src/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/src/components/ui/breadcrumb";
import { Progress } from "@/src/components/ui/progress";
import { Separator } from "@/src/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/src/components/ui/sidebar";
import { ModeToggle } from "@/src/components/mode-toggle";

const data = {
  navMain: [
    { title: "Ask AI", url: "/inside/askai" },
    { title: "Dashboard", url: "/inside/dashboard" },
    { title: "Discussions", url: "/inside/discussions" },
    { title: "Inbox", url: "/inside/inbox" },
    { title: "Sales", url: "/inside/sales" },
    { title: "Purchases", url: "/inside/purshases" },
    { title: "Inventory", url: "/inside/inventory" },
    { title: "Finance", url: "/inside/finance" },
    { title: "HR", url: "/inside/hr" },
  ],
};

export default function Format({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen space-y-1">
        <Progress value={70} className="w-[60%]" />
      </div>
    );

  const itemTitle =
    data.navMain.find((item) => item.url === pathname)?.title || "Unknown";

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/inside/dashboard">Platform</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>{itemTitle}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="absolute top-1 right-2 p-2">
            <ModeToggle />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
