import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface EmissionsProps {
  selectedVessels: string[];
}

const Emissions: React.FC<EmissionsProps> = ({ selectedVessels }) => {
  const data = [
    {
      subject: 'CO2',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'NOx',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'SOx',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'PM',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Methane',
      A: 85,
      B: 90,
      fullMark: 150,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Emission & Reporting</h2>
          <p className="text-slate-600">Realtime emission data for {selectedVessels.length} selected vessel(s)</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">All</span>
            <select className="border border-slate-300 rounded px-3 py-2 text-sm">
              <option>Aug 2024</option>
              <option>Jul 2024</option>
              <option>Jun 2024</option>
            </select>
          </div>
        </div>
      </div>

      {selectedVessels.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <p className="text-gray-500 text-center">Please select at least one vessel to view emission data</p>
        </div>
      )}

      {selectedVessels.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="h-80">
                <h3 className="font-medium text-slate-900 mb-4">Realtime emission</h3>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={data}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={30} domain={[0, 150]} />
                    <Radar name="Vessel A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              <div>
                <h3 className="font-medium text-slate-900 mb-4">CO2 emission</h3>
                <div className="bg-slate-100 rounded h-64"></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emissions;
