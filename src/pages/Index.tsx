
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Operations from '../components/modules/Operations';
import Consumption from '../components/modules/Consumption';
import Maintenance from '../components/modules/Maintenance';
import Emissions from '../components/modules/Emissions';
import Timeline from '../components/modules/Timeline';

const Index = () => {
  const [activeModule, setActiveModule] = useState('operations');

  const moduleComponents = {
    operations: <Operations />,
    consumption: <Consumption />,
    maintenance: <Maintenance />,
    emissions: <Emissions />,
    timeline: <Timeline />
  };

  const moduleTitles = {
    operations: 'Operations',
    consumption: 'Consumption Dashboard',
    maintenance: 'Condition Based Maintenance',
    emissions: 'Emission & MRV Reporting',
    timeline: 'Vessel Operation Timeline'
  };

  const moduleSubtitles = {
    operations: 'Complete operational profile with fuel efficiency benchmarking',
    consumption: 'KPIs analysis and fuel consumption optimization',
    maintenance: 'Engine and thruster condition monitoring with load profiles',
    emissions: 'Compliance reporting and emission tracking',
    timeline: 'Detailed vessel operation timeline and route tracking'
  };

  return (
    <div className="h-screen flex bg-slate-100">
      <Sidebar activeModule={activeModule} onModuleChange={setActiveModule} />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
          title={moduleTitles[activeModule as keyof typeof moduleTitles]}
          subtitle={moduleSubtitles[activeModule as keyof typeof moduleSubtitles]}
        />
        
        <div className="flex-1 overflow-auto">
          {moduleComponents[activeModule as keyof typeof moduleComponents]}
        </div>
      </div>
    </div>
  );
};

export default Index;
