

import { Home, Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Navigation items
const items = [
  {
    title: "Fleet Overview",
    url: "/",
    icon: Home,
  },
  {
    title: "Sensor Data",
    url: "/sensor-data",
    icon: Database,
  },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <Sidebar className="bg-slate-800 border-slate-700">
      <SidebarContent className="bg-slate-800">
        <SidebarGroup className="py-2">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-slate-300 hover:text-white hover:bg-slate-700 data-[active=true]:bg-slate-700 data-[active=true]:text-white py-2 px-3 text-sm"
                  >
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

