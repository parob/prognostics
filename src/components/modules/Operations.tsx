
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const Operations: React.FC = () => {
  const positionData = [
    { date: '2024-01-13', time: '20:37:00', lat: 67.29, lon: 14.39, event: 'Departure', distance: 0, mdo: 0.06, lng: 4.42 },
    { date: '2024-01-14', time: '12:00:00', lat: 66.02, lon: 12.04, event: 'Noon', distance: 15.38, mdo: 95.16, lng: 6.89 },
    { date: '2024-01-15', time: '12:00:00', lat: 63.25, lon: 12.44, event: 'Noon', distance: 24, mdo: 119.71, lng: 13.67 },
    { date: '2024-01-16', time: '12:00:00', lat: 66.03, lon: 12.05, event: 'Noon', distance: 24, mdo: 129.47, lng: 4.4 },
    { date: '2024-01-17', time: '01:43:00', lat: 66.68, lon: 13.4, event: 'Arrival STS', distance: 13.72, mdo: 52.22, lng: 0.16 },
  ];

  const chartData = [
    { name: 'DG 1', load: 35, runningHours: 28 },
    { name: 'DG 2', load: 38, runningHours: 15 },
    { name: 'DG 3', load: 40, runningHours: 5 },
    { name: 'DG 4', load: 30, runningHours: 35 },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="font-semibold text-blue-900 mb-2">MRV Event</h3>
        <div className="text-sm text-blue-800">
          Position tracking and fuel consumption monitoring for compliance reporting
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200">
          <h3 className="font-semibold text-slate-900">Position</h3>
          <div className="flex space-x-8 mt-2 text-sm text-slate-600">
            <span>Date (UTC)</span>
            <span>Time (UTC)</span>
            <span>Lat</span>
            <span>Lon</span>
            <span>Event</span>
            <span>Location</span>
            <span>Previous event</span>
            <span>Distance (NM)</span>
            <span>MDO (MT)</span>
            <span>LNG (MT)</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <tbody className="divide-y divide-slate-200">
              {positionData.map((row, index) => (
                <tr key={index} className="hover:bg-slate-50">
                  <td className="px-6 py-3 text-sm text-slate-900">{row.date}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.time}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.lat}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.lon}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.event}</td>
                  <td className="px-6 py-3 text-sm text-slate-600">--</td>
                  <td className="px-6 py-3 text-sm text-slate-600">--</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.distance}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.mdo}</td>
                  <td className="px-6 py-3 text-sm text-slate-900">{row.lng}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex justify-between items-center text-sm text-slate-600">
          <span>Rows per page: 10</span>
          <span>1 - 10 of 26</span>
          <span>Page 1 of 3</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <h3 className="font-semibold text-slate-900 mb-4">Avg. Load / Running hours</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
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
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="load" fill="#3b82f6" name="Load below 40%" />
              <Bar dataKey="runningHours" fill="#ef4444" name="Load above 40%" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Operations;
