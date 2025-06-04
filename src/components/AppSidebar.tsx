
import { Home, ChevronDown, Plus, List, Database } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
} from "@/components/ui/sidebar";

// Navigation items
const items = [
  {
    title: "Fleet Overview",
    url: "/",
    icon: Home,
  },
];

const sensorItems = [
  {
    title: "Create",
    url: "/sensors/create",
    icon: Plus,
  },
  {
    title: "Sensor List",
    url: "/sensors/list",
    icon: List,
  },
  {
    title: "Sensor Data",
    url: "/sensor-data",
    icon: Database,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [sensorsExpanded, setSensorsExpanded] = useState(true);

  const isSensorRoute = location.pathname.startsWith('/sensor') || location.pathname.startsWith('/sensors');

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
              
              {/* Sensors Section */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setSensorsExpanded(!sensorsExpanded)}
                  className={`text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 text-sm w-full justify-between ${isSensorRoute ? 'bg-slate-700 text-white' : ''}`}
                >
                  <div className="flex items-center">
                    <Database className="h-4 w-4" />
                    <span className="ml-2">Sensors</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${sensorsExpanded ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
                
                {sensorsExpanded && (
                  <SidebarMenuSub>
                    {sensorItems.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={location.pathname === item.url}
                          className="text-slate-300 hover:text-white hover:bg-slate-600 data-[active=true]:bg-slate-600 data-[active=true]:text-white"
                        >
                          <Link to={item.url}>
                            <item.icon className="h-4 w-4" />
                            <span className="ml-2">{item.title}</span>
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
