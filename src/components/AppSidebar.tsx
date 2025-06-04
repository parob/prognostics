import { Home, ChevronDown, Plus, List, Database, Code, Workflow, Settings } from "lucide-react";
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
    title: "Sensor Explorer",
    url: "/sensor-data",
    icon: Database,
  },
];

const functionItems = [
  {
    title: "Create",
    url: "/functions/create",
    icon: Plus,
  },
  {
    title: "Functions List",
    url: "/functions/list",
    icon: List,
  },
  {
    title: "Sandbox",
    url: "/functions/sandbox",
    icon: Code,
  },
];

const workflowItems = [
  {
    title: "Create",
    url: "/workflows/create",
    icon: Plus,
  },
  {
    title: "Workflows",
    url: "/workflows/list",
    icon: List,
  },
  {
    title: "Automations",
    url: "/workflows/automations",
    icon: Settings,
  },
  {
    title: "Workflow Activity",
    url: "/workflows/activity",
    icon: Database,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [sensorsExpanded, setSensorsExpanded] = useState(true);
  const [functionsExpanded, setFunctionsExpanded] = useState(true);
  const [workflowsExpanded, setWorkflowsExpanded] = useState(true);

  const isSensorRoute = location.pathname.startsWith('/sensor') || location.pathname.startsWith('/sensors');
  const isFunctionRoute = location.pathname.startsWith('/functions');
  const isWorkflowRoute = location.pathname.startsWith('/workflows');

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

              {/* Functions Section */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setFunctionsExpanded(!functionsExpanded)}
                  className={`text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 text-sm w-full justify-between ${isFunctionRoute ? 'bg-slate-700 text-white' : ''}`}
                >
                  <div className="flex items-center">
                    <Code className="h-4 w-4" />
                    <span className="ml-2">Functions</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${functionsExpanded ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
                
                {functionsExpanded && (
                  <SidebarMenuSub>
                    {functionItems.map((item) => (
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

              {/* Workflows Section */}
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => setWorkflowsExpanded(!workflowsExpanded)}
                  className={`text-slate-300 hover:text-white hover:bg-slate-700 py-2 px-3 text-sm w-full justify-between ${isWorkflowRoute ? 'bg-slate-700 text-white' : ''}`}
                >
                  <div className="flex items-center">
                    <Workflow className="h-4 w-4" />
                    <span className="ml-2">Workflows</span>
                  </div>
                  <ChevronDown className={`h-4 w-4 transition-transform ${workflowsExpanded ? 'rotate-180' : ''}`} />
                </SidebarMenuButton>
                
                {workflowsExpanded && (
                  <SidebarMenuSub>
                    {workflowItems.map((item) => (
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
