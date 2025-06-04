
import React from 'react';
import { Search, Settings, Database, Gauge, TrendingUp, FileText } from 'lucide-react';

interface SidebarProps {
  activeModule: string;
  onModuleChange: (module: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeModule, onModuleChange }) => {
  const vessels = [
    { id: 'vessel-a', name: 'Vessel A', active: false },
    { id: 'vessel-b', name: 'Vessel B', active: false },
    { id: 'vessel-c', name: 'Vessel C', active: true },
    { id: 'vessel-d', name: 'Vessel D', active: false },
    { id: 'vessel-e', name: 'Vessel E', active: false },
    { id: 'vessel-f', name: 'Vessel F', active: false },
  ];

  const modules = [
    { id: 'operations', name: 'Operations', icon: Database },
    { id: 'consumption', name: 'Consumption', icon: Gauge },
    { id: 'maintenance', name: 'Condition Based Maintenance', icon: Settings },
    { id: 'emissions', name: 'Emission & Reporting', icon: TrendingUp },
    { id: 'timeline', name: 'Vessel Operation Timeline', icon: FileText },
  ];

  return (
    <div className="w-64 bg-slate-800 text-white h-full flex flex-col">
      <div className="p-4 border-b border-slate-700">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">d.</span>
          </div>
          <span className="font-semibold">Vessels</span>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search vessel..."
            className="w-full bg-slate-700 border border-slate-600 rounded px-10 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-4">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Fleet</h3>
          <div className="space-y-1">
            {vessels.map((vessel) => (
              <div
                key={vessel.id}
                className={`flex items-center space-x-3 px-3 py-2 rounded cursor-pointer transition-colors ${
                  vessel.active 
                    ? 'bg-yellow-500 text-slate-900' 
                    : 'text-slate-300 hover:bg-slate-700'
                }`}
              >
                <div className="w-2 h-2 bg-current rounded-full opacity-60"></div>
                <span className="text-sm">{vessel.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-4 border-t border-slate-700">
          <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Modules</h3>
          <div className="space-y-1">
            {modules.map((module) => {
              const Icon = module.icon;
              return (
                <button
                  key={module.id}
                  onClick={() => onModuleChange(module.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-2 rounded text-left transition-colors ${
                    activeModule === module.id
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="text-sm">{module.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
