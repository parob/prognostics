
import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Operations from '@/components/modules/Operations';
import Consumption from '@/components/modules/Consumption';
import Maintenance from '@/components/modules/Maintenance';
import Emissions from '@/components/modules/Emissions';
import Timeline from '@/components/modules/Timeline';
import DataHistory from '@/components/modules/DataHistory';

const Index = () => {
  const [activeModule, setActiveModule] = useState('operations');
  const [selectedVessels, setSelectedVessels] = useState<string[]>(['vessel-c']);

  const renderModule = () => {
    const moduleProps = { selectedVessels };
    
    switch (activeModule) {
      case 'operations':
        return <Operations {...moduleProps} />;
      case 'consumption':
        return <Consumption {...moduleProps} />;
      case 'maintenance':
        return <Maintenance {...moduleProps} />;
      case 'emissions':
        return <Emissions {...moduleProps} />;
      case 'timeline':
        return <Timeline {...moduleProps} />;
      case 'history':
        return <DataHistory {...moduleProps} />;
      default:
        return <Operations {...moduleProps} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        activeModule={activeModule} 
        onModuleChange={setActiveModule}
        selectedVessels={selectedVessels}
        onVesselSelectionChange={setSelectedVessels}
      />
      <main className="flex-1 overflow-y-auto">
        {renderModule()}
      </main>
    </div>
  );
};

export default Index;
