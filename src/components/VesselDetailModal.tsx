
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { MapPin, Navigation, Clock, Flag, Ship, Gauge, Fuel, Settings } from 'lucide-react';

interface VesselDetailModalProps {
  vessel: {
    id: string;
    name: string;
    type: string;
    status: string;
    efficiency: number;
    emissions: number;
    maintenance: number;
    operations: number;
    lastUpdate: string;
    location: string;
    coordinates: { lat: number; lng: number };
    imo: string;
    mmsi: string;
    callSign: string;
    flag: string;
    length: number;
    width: number;
    speed: number;
    course: number;
    destination: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const VesselDetailModal: React.FC<VesselDetailModalProps> = ({ vessel, isOpen, onClose }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      case 'idle': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatCoordinates = (lat: number, lng: number) => {
    const latDir = lat >= 0 ? 'N' : 'S';
    const lngDir = lng >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(4)}°${latDir}, ${Math.abs(lng).toFixed(4)}°${lngDir}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <Ship className="h-6 w-6 text-blue-600" />
            <span>{vessel.name}</span>
            <Badge className={getStatusColor(vessel.status)}>
              {vessel.status.charAt(0).toUpperCase() + vessel.status.slice(1)}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Current Position & Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <MapPin className="h-5 w-5" />
                <span>Current Position</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-slate-600">Location</span>
                  <p className="font-medium">{vessel.location}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Coordinates</span>
                  <p className="font-medium text-sm">{formatCoordinates(vessel.coordinates.lat, vessel.coordinates.lng)}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Speed</span>
                  <p className="font-medium">{vessel.speed} knots</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Course</span>
                  <p className="font-medium">{vessel.course}°</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Destination</span>
                  <p className="font-medium">{vessel.destination}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Last Update</span>
                  <p className="font-medium">{vessel.lastUpdate}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Vessel Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ship className="h-5 w-5" />
                <span>Vessel Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-slate-600">IMO</span>
                  <p className="font-medium">{vessel.imo}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">MMSI</span>
                  <p className="font-medium">{vessel.mmsi}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Call Sign</span>
                  <p className="font-medium">{vessel.callSign}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-slate-600">Flag</span>
                  <div className="flex items-center space-x-1">
                    <Flag className="h-4 w-4" />
                    <p className="font-medium">{vessel.flag}</p>
                  </div>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Length</span>
                  <p className="font-medium">{vessel.length}m</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Width</span>
                  <p className="font-medium">{vessel.width}m</p>
                </div>
                <div className="col-span-2">
                  <span className="text-sm text-slate-600">Vessel Type</span>
                  <p className="font-medium">{vessel.type}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Metrics */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gauge className="h-5 w-5" />
                <span>Performance Metrics</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <Fuel className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-900">{vessel.efficiency}%</div>
                  <div className="text-sm text-blue-700">Fuel Efficiency</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="h-8 w-8 bg-green-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">CO₂</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">{vessel.emissions}%</div>
                  <div className="text-sm text-green-700">Emissions Score</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <Settings className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-900">{vessel.maintenance}%</div>
                  <div className="text-sm text-orange-700">Maintenance</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Navigation className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-900">{vessel.operations}%</div>
                  <div className="text-sm text-purple-700">Operations</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Info */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Navigation className="h-5 w-5" />
                <span>Navigation & AIS Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <span className="text-sm text-slate-600">AIS Class</span>
                  <p className="font-medium">Class A</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Navigational Status</span>
                  <p className="font-medium">{vessel.status === 'active' ? 'Under way using engine' : vessel.status === 'idle' ? 'At anchor' : 'Not under command'}</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Rate of Turn</span>
                  <p className="font-medium">0°/min</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">True Heading</span>
                  <p className="font-medium">{vessel.course}°</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Draught</span>
                  <p className="font-medium">6.4m</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">ETA</span>
                  <p className="font-medium">-</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Data Source</span>
                  <p className="font-medium">Terrestrial AIS</p>
                </div>
                <div>
                  <span className="text-sm text-slate-600">Area</span>
                  <p className="font-medium">{vessel.location}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button>
            Track Vessel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VesselDetailModal;
