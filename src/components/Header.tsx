
import React from 'react';
import { Calendar, Filter, FileText } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">{title}</h1>
          {subtitle && <p className="text-slate-600 mt-1">{subtitle}</p>}
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            <FileText className="h-4 w-4" />
            <span>Export</span>
          </button>
          
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-slate-400" />
            <select className="border border-slate-300 rounded px-3 py-2 text-sm bg-white">
              <option>This year</option>
              <option>Last year</option>
              <option>Custom range</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">From</span>
            <input 
              type="date" 
              defaultValue="2024-01-01"
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
            <span className="text-sm text-slate-600">To</span>
            <input 
              type="date" 
              defaultValue="2024-06-30"
              className="border border-slate-300 rounded px-3 py-2 text-sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
