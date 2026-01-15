"use client";

import * as React from "react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

// This is sample data.
const data = {
    NavMain: [
        {
            title: "User Dashboard",
            url: "/dashboard",
        },
        {
            title: "Admin Dashboard",
            url: "/admin-dashboard",
        },
    ],
};

// let routes: Route[] = [];

// switch (user.role) {
//     case "admin":
//         routes = adminRoutes;
//         break;
//     case "user":
//         routes = userRoutes;
//         break;
//     default:
//         routes = [];
//         break;
// }

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent>
                {data.NavMain.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            {item.title}
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))}
                {/* {routes.map((item) => (
                    <SidebarGroup key={item.title}>
                        <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {item.items.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton asChild>
                                            <Link href={item.url}>
                                                {item.title}
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                ))} */}
            </SidebarContent>
            <SidebarRail />
        </Sidebar>
    );
}
