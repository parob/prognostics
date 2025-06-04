import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

interface ConsumptionProps {
  selectedVessels: string[];
}

const Consumption: React.FC<ConsumptionProps> = ({ selectedVessels }) => {
  const monthlyData = [
    { month: 'Jan', dp: 180, standby: 140, fastManeuvering: 120, fastMoving: 110, transitOther: 160, transitOtherGreen: 90, transitWR: 250, transit: 200 },
    { month: 'Feb', dp: 160, standby: 160, fastManeuvering: 180, fastMoving: 120, transitOther: 180, transitOtherGreen: 100, transitWR: 200, transit: 180 },
    { month: 'Mar', dp: 200, standby: 120, fastManeuvering: 160, fastMoving: 140, transitOther: 200, transitOtherGreen: 110, transitWR: 240, transit: 220 },
    { month: 'Apr', dp: 170, standby: 180, fastManeuvering: 140, fastMoving: 160, transitOther: 170, transitOtherGreen: 95, transitWR: 220, transit: 190 },
    { month: 'May', dp: 190, standby: 150, fastManeuvering: 200, fastMoving: 180, transitOther: 190, transitOtherGreen: 105, transitWR: 260, transit: 210 },
    { month: 'Jun', dp: 180, standby: 170, fastManeuvering: 180, fastMoving: 170, transitOther: 180, transitOtherGreen: 100, transitWR: 240, transit: 200 },
    { month: 'Jul', dp: 160, standby: 140, fastManeuvering: 160, fastMoving: 150, transitOther: 160, transitOtherGreen: 90, transitWR: 220, transit: 180 },
    { month: 'Aug', dp: 80, standby: 60, fastManeuvering: 80, fastMoving: 70, transitOther: 80, transitOtherGreen: 45, transitWR: 110, transit: 90 }
  ];

  const fuelUsageData = [
    { mode: 'DP', value: 35 },
    { mode: 'Standby', value: 25 },
    { mode: 'Fast maneuvering', value: 15 },
    { mode: 'Fast moving', value: 10 },
    { mode: 'Transit other', value: 8 },
    { mode: 'Transit eco', value: 4 },
    { mode: 'Transit fast', value: 3 }
  ];

  const pieData = [
    { name: 'DP', value: 35, color: '#1e40af' },
    { name: 'Standby', value: 25, color: '#3b82f6' },
    { name: 'Fast maneuvering', value: 15, color: '#60a5fa' },
    { name: 'Fast moving', value: 10, color: '#93c5fd' },
    { name: 'Transit other', value: 8, color: '#22c55e' },
    { name: 'Transit eco', value: 4, color: '#84cc16' },
    { name: 'Transit fast', value: 3, color: '#ef4444' }
  ];

  const loadData = [
    { engine: 'All', avg: 42, max: 100 },
    { engine: 'Standby', avg: 35, max: 85 },
    { engine: 'Fast maneuvering', avg: 55, max: 95 },
    { engine: 'Fast moving', avg: 48, max: 88 },
    { engine: 'Transit other', avg: 38, max: 75 },
    { engine: 'Transit eco', avg: 32, max: 70 },
    { engine: 'Transit fast', avg: 65, max: 98 }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-semibold text-slate-900">Selected Vessels for comparison: {selectedVessels.length > 0 ? selectedVessels.join(', ') : 'no vessels selected'}</h3>
          {selectedVessels.length === 0 && (
            <button className="text-blue-600 hover:text-blue-800">Select vessels to compare...</button>
          )}
        </div>
      </div>

      {selectedVessels.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
          <p className="text-gray-500 text-center">Please select at least one vessel to view consumption data</p>
        </div>
      )}

      {selectedVessels.length > 0 && (
        <>
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-semibold text-slate-900">Total consumption per mode grouped by month</h3>
              <div className="flex space-x-2">
                <button className="bg-slate-700 text-white px-3 py-1 rounded text-sm">Wet</button>
                <button className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-sm">Fuel</button>
                <button className="bg-slate-200 text-slate-700 px-3 py-1 rounded text-sm">CO2</button>
                <button className="text-slate-600 hover:text-slate-800 text-sm">Hide modes</button>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-4 mb-6 text-sm">
              <div>
                <div className="text-blue-600 font-semibold">1706.5</div>
                <div className="text-slate-600">Total (m³)</div>
              </div>
              <div>
                <div className="text-blue-600 font-semibold">2505.8</div>
                <div className="text-slate-600">DP (m³)</div>
              </div>
              <div>
                <div className="text-blue-600 font-semibold">175.0</div>
                <div className="text-slate-600">Standby (m³)</div>
              </div>
              <div>
                <div className="text-blue-600 font-semibold">81.0</div>
                <div className="text-slate-600">Fast - maneuvering (m³)</div>
              </div>
              <div>
                <div className="text-slate-600 font-semibold">12.0</div>
                <div className="text-slate-600">Fast - maneuvering (m³)</div>
              </div>
              <div>
                <div className="text-slate-600 font-semibold">129.8</div>
                <div className="text-slate-600">Transit other (m³)</div>
              </div>
              <div>
                <div className="text-slate-600 font-semibold">477.5</div>
                <div className="text-slate-600">Transit other (m³)</div>
              </div>
              <div>
                <div className="text-green-600 font-semibold">255.5</div>
                <div className="text-slate-600">Transit service (m³)</div>
              </div>
              <div>
                <div className="text-green-600 font-semibold">319.7</div>
                <div className="text-slate-600">Transit eco (m³)</div>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="dp" stackId="a" fill="#1e40af" />
                <Bar dataKey="standby" stackId="a" fill="#3b82f6" />
                <Bar dataKey="fastManeuvering" stackId="a" fill="#60a5fa" />
                <Bar dataKey="fastMoving" stackId="a" fill="#93c5fd" />
                <Bar dataKey="transitOther" stackId="a" fill="#d1d5db" />
                <Bar dataKey="transitOtherGreen" stackId="a" fill="#22c55e" />
                <Bar dataKey="transitWR" stackId="a" fill="#84cc16" />
                <Bar dataKey="transit" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Fuel used per mode</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={fuelUsageData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="mode" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Percentage of time allocation</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Average load on engines in use</h3>
              <div className="space-y-2">
                {loadData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-slate-700">{item.engine}</span>
                    <span className="text-slate-900 font-medium">{item.avg}% / {item.max}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Average units of engines in use</h3>
              <div className="space-y-2">
                {loadData.map((item, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-slate-700">{item.engine}</span>
                    <span className="text-slate-900 font-medium">{(item.avg / 20).toFixed(1)} units</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Consumption;
