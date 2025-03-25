"use client";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { t } from "i18next";
import { type LucideIcon } from "lucide-react";
import Link from "next/link";

export function SidebarPages({
  sidebarPages,
}: {
  sidebarPages: {
    name: string;
    url: string;
    icon: LucideIcon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarMenu>
        {sidebarPages.map((item, idx) => (
          <SidebarMenuItem
            key={item.name}
            className={idx == 0 ? "" : "border-t "}
          >
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{t(item.name)}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
