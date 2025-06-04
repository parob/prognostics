import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

interface MaintenanceProps {
  selectedVessels: string[];
}

const Maintenance: React.FC<MaintenanceProps> = ({ selectedVessels }) => {
  const engineData = [
    { name: 'DG 1', date: '2022-03-31', hours: 40324, load: 62934, sfoc: 48375.27, overhaul: '2036-04-21' },
    { name: 'DG 2', date: '2017-12-18', hours: 22338, load: 43238, sfoc: 45687.3, overhaul: '2033-06-23' },
    { name: 'DG 3', date: '2017-12-18', hours: 21909, load: 43909, sfoc: 46359.37, overhaul: '2035-06-18' },
    { name: 'DG 4', date: '2016-12-03', hours: 19928, load: 39028, sfoc: 48759.36, overhaul: '2032-12-12' }
  ];

  const loadChart1 = [
    { time: '00:00', load: 40 },
    { time: '04:00', load: 35 },
    { time: '08:00', load: 38 },
    { time: '12:00', load: 42 },
    { time: '16:00', load: 45 },
    { time: '20:00', load: 40 },
    { time: '24:00', load: 38 }
  ];

  const loadChart2 = [
    { time: '00:00', load: 35 },
    { time: '04:00', load: 30 },
    { time: '08:00', load: 33 },
    { time: '12:00', load: 37 },
    { time: '16:00', load: 40 },
    { time: '20:00', load: 35 },
    { time: '24:00', load: 33 }
  ];

  const barData = [
    { name: 'DG 1', load: 35, runningHours: 28 },
    { name: 'DG 2', load: 38, runningHours: 15 },
    { name: 'DG 3', load: 40, runningHours: 5 },
    { name: 'DG 4', load: 30, runningHours: 35 }
  ];

  const thresholdData = [
    { name: 'DG 1', below: 60, above: 35 },
    { name: 'DG 2', below: 65, above: 30 },
    { name: 'DG 3', below: 20, above: 75 },
    { name: 'DG 4', below: 70, above: 25 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Condition Based Maintenance</h2>
          <p className="text-slate-600 mt-1">Engines overview for {selectedVessels.length} selected vessel(s)</p>
        </div>
        <div className="flex items-center space-x-4">
          <select className="border border-slate-300 rounded px-3 py-2 text-sm">
            <option>All modes</option>
            <option>DP</option>
            <option>Transit</option>
          </select>
          <select className="border border-slate-300 rounded px-3 py-2 text-sm">
            <option>SFOC</option>
            <option>Load</option>
            <option>Temperature</option>
          </select>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-slate-600">Load threshold (%)</span>
            <input type="number" defaultValue="40" className="border border-slate-300 rounded px-3 py-2 w-16 text-sm" />
          </div>
        </div>
      </div>

      {selectedVessels.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <p className="text-gray-500 text-center">Please select at least one vessel to view maintenance data</p>
        </div>
      )}

      {selectedVessels.length > 0 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Avg. Load / Running hours</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="load" fill="#3b82f6" name="Load" />
                  <Bar dataKey="runningHours" fill="#ef4444" name="Running Hours" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Time below/above load threshold</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={thresholdData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="below" fill="#3b82f6" name="Load below 40%" />
                  <Bar dataKey="above" fill="#ef4444" name="Load above 40%" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-200">
              <h3 className="font-semibold text-slate-900">Engine Statistics</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Engine</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Last Service</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Running Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Avg Load</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">SFOC</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Next Overhaul</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-slate-200">
                  {engineData.map((engine, index) => (
                    <tr key={index} className="hover:bg-slate-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{engine.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{engine.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{engine.hours.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{engine.load.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{engine.sfoc.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-900">{engine.overhaul}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Load distribution</h3>
              <div className="mb-4 text-sm text-slate-600">
                <div>Avg load: <span className="font-medium">42% (1260 kW)</span></div>
                <div>Max load: <span className="font-medium">100% (3000 kW)</span></div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={loadChart1}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="load" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">SFOC deviation</h3>
              <div className="mb-4 text-sm text-slate-600">
                <div>Avg SFOC: <span className="font-medium">221 g/kWh</span></div>
                <div>Max SFOC: <span className="font-medium">369 g/kWh</span></div>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={loadChart2}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="load" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Maintenance;
