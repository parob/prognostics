
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import Index from "./pages/Index";
import SensorData from "./pages/SensorData";
import SensorDetails from "./pages/SensorDetails";
import SensorCreate from "./pages/SensorCreate";
import SensorList from "./pages/SensorList";
import FunctionCreate from "./pages/FunctionCreate";
import FunctionList from "./pages/FunctionList";
import FunctionSandbox from "./pages/FunctionSandbox";
import WorkflowCreate from "./pages/WorkflowCreate";
import WorkflowList from "./pages/WorkflowList";
import WorkflowAutomations from "./pages/WorkflowAutomations";
import WorkflowActivity from "./pages/WorkflowActivity";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <main className="flex-1">
              <div className="p-2">
                <SidebarTrigger />
              </div>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/sensor-data" element={<SensorData />} />
                <Route path="/sensor-details/:sensorId" element={<SensorDetails />} />
                <Route path="/sensors/create" element={<SensorCreate />} />
                <Route path="/sensors/list" element={<SensorList />} />
                <Route path="/functions/create" element={<FunctionCreate />} />
                <Route path="/functions/list" element={<FunctionList />} />
                <Route path="/functions/sandbox" element={<FunctionSandbox />} />
                <Route path="/workflows/create" element={<WorkflowCreate />} />
                <Route path="/workflows/list" element={<WorkflowList />} />
                <Route path="/workflows/automations" element={<WorkflowAutomations />} />
                <Route path="/workflows/activity" element={<WorkflowActivity />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
