
import React from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Bell } from 'lucide-react';

const AlertNode: React.FC<NodeProps> = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-md rounded-md bg-orange-50 border-2 ${selected ? 'border-orange-500' : 'border-orange-200'}`}>
      <div className="flex items-center space-x-2">
        <Bell className="h-4 w-4 text-orange-600" />
        <div className="text-sm font-medium text-orange-800">{data.label}</div>
      </div>
      {data.alertType && (
        <div className="text-xs text-orange-600 mt-1">{data.alertType}</div>
      )}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-orange-400 border-2 border-orange-600"
      />
    </div>
  );
};

export default AlertNode;
