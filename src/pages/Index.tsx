import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  // State and vessel data would be here
  
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white border-b border-slate-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">Armada Fleet</h1>
            <p className="text-slate-600 mt-1">Real-time vessel monitoring and analytics</p>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/historical-data">
              <Button variant="outline" className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4" />
                <span>Historical Data</span>
              </Button>
            </Link>
            
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
              <FileText className="h-4 w-4" />
              <span>Export</span>
            </button>
            
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

      {/* Rest of the component would be here */}
    </div>
  );
};

export default Index;
