
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Activity } from 'lucide-react';

interface SensorInputNodeData {
  label: string;
  sensorType?: string;
}

const SensorInputNode: React.FC<NodeProps<SensorInputNodeData>> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-blue-50 border-2 ${selected ? 'border-blue-500' : 'border-blue-200'}`}>
      <div className="flex items-center space-x-2">
        <Activity className="h-4 w-4 text-blue-600" />
        <div className="text-sm font-medium text-blue-800">{data?.label || 'Sensor Input'}</div>
      </div>
      {data?.sensorType && (
        <div className="text-xs text-blue-600 mt-1">{data.sensorType}</div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-blue-400 border-2 border-blue-600"
      />
    </div>
  );
};

export default SensorInputNode;
