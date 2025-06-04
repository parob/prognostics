
import React from 'react';

const Emissions: React.FC = () => {
  const emissionData = [
    { period: '2024/01/11 - 15:23:00', departure: '2024/01/13 - 20:37:00', from: 'NORCO', to: 'NORCO', distance: 1.65, fuel: 11.99 },
    { period: '2024/01/13 - 20:37:00', departure: '2024/01/25 - 15:29:00', from: 'NORCO', to: '-', distance: '-', fuel: '-' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Emission</h2>
          <p className="text-slate-600 mt-1">MRV reporting and emission tracking</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex space-x-2">
            <button className="bg-yellow-500 text-slate-900 px-4 py-2 rounded font-medium">MRV</button>
            <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded">BUNKER REPORT</button>
            <button className="bg-slate-200 text-slate-700 px-4 py-2 rounded">CII</button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-800">
            <span>📄</span>
            <span>Export</span>
          </button>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <span>Year</span>
              <select className="border border-slate-300 rounded px-2 py-1">
                <option>2024</option>
                <option>2023</option>
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <span>from</span>
              <input type="date" defaultValue="2024-01-01" className="border border-slate-300 rounded px-2 py-1" />
              <span>to</span>
              <input type="date" defaultValue="2024-06-30" className="border border-slate-300 rounded px-2 py-1" />
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-8 mb-6">
            <div className="space-y-4">
              {emissionData.map((row, index) => (
                <div key={index} className="border border-slate-200 rounded p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div className="text-sm">
                      <div className="font-medium">{row.period}</div>
                      <div className="text-slate-600">{row.departure}</div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      {index === 0 ? '👁️' : '▼'}
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">From: </span>
                      <span className="font-medium">{row.from}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">To: </span>
                      <span className="font-medium">{row.to}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Distance: </span>
                      <span className="font-medium">{row.distance}</span>
                    </div>
                    <div>
                      <span className="text-slate-600">Fuel: </span>
                      <span className="font-medium">{row.fuel}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 mb-4">MRV Event</h3>
              <div className="space-y-4">
                <div className="bg-white rounded p-4 border">
                  <h4 className="font-medium text-slate-900 mb-2">Position</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-slate-600">Date (UTC)</div>
                      <div className="text-slate-600">Time (UTC)</div>
                      <div className="text-slate-600">Lat</div>
                      <div className="text-slate-600">Lon</div>
                      <div className="text-slate-600">Event</div>
                    </div>
                    <div>
                      <div className="text-slate-600">Location</div>
                      <div className="text-slate-600">Previous event</div>
                      <div className="text-slate-600">Distance</div>
                      <div className="text-slate-600">MDO (MT)</div>
                      <div className="text-slate-600">LNG (MT)</div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded p-4 border">
                  <h4 className="font-medium text-slate-900 mb-2">CONSUMPTION MAIN ENGINES</h4>
                  <div className="text-sm text-slate-600">
                    Engine consumption and efficiency metrics
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6">
        <h3 className="font-semibold text-slate-900 mb-4">MRV Compliance Summary</h3>
        <div className="grid grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">1,847</div>
            <div className="text-sm text-slate-600">Total Distance (NM)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">234.5</div>
            <div className="text-sm text-slate-600">Total Fuel (MT)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600">742.1</div>
            <div className="text-sm text-slate-600">CO2 Emissions (MT)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">98.2%</div>
            <div className="text-sm text-slate-600">Reporting Compliance</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emissions;
