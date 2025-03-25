"use client";

import { Frame, GalleryVerticalEnd, Wallet } from "lucide-react";
import * as React from "react";

import { SidebarPages } from "@/components/SidebarPages";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const getIcon = (name: string) => {
  switch (name.toLowerCase()) {
    case "dashboard":
      return Frame;
    case "accounts":
      return Wallet;
    default:
      return Frame;
  }
};

const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  sidebarLogo: [
    {
      name: "Bank ERS",
      logo: GalleryVerticalEnd,
      plan: "Enterprise",
    },
  ],
  sidebarPages: [
    {
      name: "Dashboard",
      url: "/dashboard",
    },
    {
      name: "Accounts",
      url: "/accounts",
    },
    
  ],
};

const sidebarLogo = data.sidebarLogo[0];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <Link href="/">
          <button className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex-row items-center justify-start flex gap-4 p-2 rounded-lg">
            <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
              <sidebarLogo.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{sidebarLogo.name}</span>
              <span className="truncate text-xs">{sidebarLogo.plan}</span>
            </div>
          </button>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarPages
          sidebarPages={data.sidebarPages.map((page) => ({
            ...page,
            icon: getIcon(page.name),
          }))}
        />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
