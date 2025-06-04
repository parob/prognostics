import React from 'react';

interface TimelineProps {
  selectedVessels: string[];
}

const Timeline: React.FC<TimelineProps> = ({ selectedVessels }) => {
  const timelineData = [
    { start: 'Wed, Aug 7 - 06:10', end: 'Wed, Aug 7 - 04:09', mode: 'DP', duration: '3h17', efficiency: '0.34%' },
    { start: 'Tue, Aug 6 - 21:08', end: 'Wed, Aug 7 - 06:10', mode: 'Transit', duration: '9h02', efficiency: '0.54%' },
    { start: 'Tue, Aug 6 - 19:55', end: 'Tue, Aug 6 - 23:08', mode: 'DP', duration: '3h13', efficiency: '1.36%' },
    { start: 'Tue, Aug 6 - 08:41', end: 'Tue, Aug 6 - 19:55', mode: 'Transit', duration: '11h14', efficiency: '1.02%' }
  ];

  const modes = [
    { name: 'other', color: '#6b7280' },
    { name: 'eco', color: '#10b981' },
    { name: 'service', color: '#f59e0b' },
    { name: 'max', color: '#ef4444' }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">Vessel operation timeline</h2>
          <p className="text-slate-600">Timeline for {selectedVessels.length} selected vessel(s)</p>
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
          <p className="text-gray-500 text-center">Please select at least one vessel to view timeline data</p>
        </div>
      )}

      {selectedVessels.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6">
            <div className="space-y-4 mb-6">
              {timelineData.map((item, index) => (
                <div key={index} className="border border-slate-200 rounded p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 text-sm">
                        <span className="font-medium">{item.start}</span>
                        <span className="text-slate-600">→</span>
                        <span className="font-medium">{item.end}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">{item.mode}</span>
                        <span className="text-slate-600">{item.duration}</span>
                        <span className="text-green-600">{item.efficiency}</span>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-slate-600">
                      {index === 3 ? '▼' : '▶'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-slate-900 mb-2">TRANSIT MODES</h3>
              <div className="flex items-center space-x-6">
                {modes.map((mode, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`w-4 h-4 rounded`} style={{ backgroundColor: mode.color }}></div>
                    <span className="text-sm text-slate-600">{mode.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-slate-900 mb-4">Vessel operation timeline</h3>
                <div className="bg-slate-100 rounded h-64 relative overflow-hidden">
                  <div className="absolute inset-0 p-4">
                    <div className="h-full bg-gradient-to-r from-red-200 via-green-200 to-red-200 rounded"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                      <div>Aug 06, 2024, 17:48:00</div>
                      <div>🔵 DG1 Load: 69.8 % | Fuel Rate Calculated: 206.0 L/h</div>
                      <div>🔵 DG2 Load: 6.0 % | Fuel Rate Calculated: 63.9 L/h</div>
                      <div>🟢 DG3 Load: 82.3 % | Fuel Rate Calculated: 204.4 L/h</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-medium text-slate-900 mb-4">Route timeline</h3>
                <div className="bg-slate-100 rounded h-64 relative overflow-hidden">
                  <div className="absolute inset-0">
                    <div className="w-full h-full bg-blue-200 relative">
                      <div className="absolute bottom-4 left-4 w-2 h-2 bg-red-500 rounded-full"></div>
                      <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-green-500 rounded-full"></div>
                      <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-blue-500 rounded-full"></div>
                      <svg className="absolute inset-0 w-full h-full">
                        <path
                          d="M 50 200 Q 150 100 250 150"
                          stroke="#ef4444"
                          strokeWidth="2"
                          fill="none"
                          strokeDasharray="5,5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <div className="bg-slate-50 rounded p-4">
                <div className="h-32 bg-gradient-to-r from-red-200 via-green-200 to-red-200 rounded mb-2"></div>
                <div className="absolute bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                  <div>Aug 06, 2024, 17:48:00</div>
                  <div>🔵 DG1 Load: 69.8 % | Fuel Rate Calculated: 206.0 L/h</div>
                  <div>🟢 Elevation: 1 mt | Fuel Rate: 517.3 L/h</div>
                  <div>🟢 Revolution: -4.1 %</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded p-4">
                <div className="h-32 bg-gradient-to-r from-purple-200 via-green-200 to-purple-200 rounded mb-2"></div>
                <div className="absolute bg-black bg-opacity-75 text-white p-2 rounded text-xs">
                  <div>Aug 06, 2024, 17:48:00</div>
                  <div>🟡 Speed: RPM 519 L/h</div>
                  <div>🟡 Elevation: 1 mt | Fuel Rate: 517.3 L/h</div>
                  <div>🟡 Revolution: -4.1 %</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Timeline;
