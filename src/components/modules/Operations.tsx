import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface OperationsProps {
  selectedVessels: string[];
}

const Operations: React.FC<OperationsProps> = ({ selectedVessels }) => {
  const data = [
    {
      subject: 'Engine Load',
      A: 120,
      B: 110,
      fullMark: 150,
    },
    {
      subject: 'Fuel Consumption',
      A: 98,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Speed',
      A: 86,
      B: 130,
      fullMark: 150,
    },
    {
      subject: 'Efficiency',
      A: 99,
      B: 100,
      fullMark: 150,
    },
    {
      subject: 'Emissions',
      A: 85,
      B: 90,
      fullMark: 150,
    },
    {
      subject: 'Maintenance',
      A: 65,
      B: 85,
      fullMark: 150,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Vessel Operations</h2>
          <p className="text-slate-600">Real-time operational overview for selected vessels</p>
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
          <p className="text-gray-500 text-center">Please select at least one vessel to view operations data</p>
        </div>
      )}

      {selectedVessels.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Overall Performance</h3>
              <p className="text-slate-500 text-sm">Aggregated performance metrics</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Vessel A" dataKey="A" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="p-4 border-t border-slate-200 text-center">
              <span className="text-green-500 font-medium">+5% compared to last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Fuel Consumption</h3>
              <p className="text-slate-500 text-sm">Detailed fuel consumption analysis</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Vessel A" dataKey="B" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="p-4 border-t border-slate-200 text-center">
              <span className="text-red-500 font-medium">-3% compared to last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Engine Performance</h3>
              <p className="text-slate-500 text-sm">Real-time engine metrics</p>
            </div>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 150]} />
                <Radar name="Vessel A" dataKey="A" stroke="#a855f7" fill="#a855f7" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
            <div className="p-4 border-t border-slate-200 text-center">
              <span className="text-green-500 font-medium">+2% compared to last month</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Predictive Maintenance</h3>
              <p className="text-slate-500 text-sm">Potential maintenance issues</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-orange-500 font-medium">No immediate issues detected</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Voyage Analytics</h3>
              <p className="text-slate-500 text-sm">Voyage-specific data</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-blue-500 font-medium">No active voyages</p>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-slate-900 mb-2">Efficiency Metrics</h3>
              <p className="text-slate-500 text-sm">Efficiency ratings</p>
            </div>
            <div className="p-6 text-center">
              <p className="text-green-500 font-medium">Above average efficiency</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Operations;
