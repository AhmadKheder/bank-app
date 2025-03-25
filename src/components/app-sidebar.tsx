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
import { t } from "i18next";
import Link from "next/link";
import ERSLogo from "./ui/ERSLogo";

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
        <Link
          href="/"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex-row items-center justify-start flex gap-4 p-2 rounded-lg"
        >
          <div className="border-1 bg-gray-100 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <ERSLogo />
          </div>

          <div className="grid flex-1 text-left text-lg leading-tight">
            <span className="truncate font-bold">
              {t("Bank")} <span className="text-blue-500">ERS</span>
            </span>

            <span className="truncate text-xs ">{t(sidebarLogo.plan)}</span>
          </div>
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
